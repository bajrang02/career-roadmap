"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getRoadmap } from "@/lib/data-loader";
import {
  collectLearnableIds,
  collectNodeIds,
  computeLayout,
  dfsOrder,
  findNode,
  pathToNode,
  getActiveChildren,
} from "@/lib/mindmap/tree-layout";
import type { RoadmapNode } from "@/lib/types";
import { useProgressStore } from "@/lib/stores/progress-store";
import { useBookmarksStore } from "@/lib/stores/bookmarks-store";
import { useUiStore } from "@/lib/stores/ui-store";
import { useStudyPlanStore } from "@/lib/stores/study-plan-store";
import { useChoicesStore } from "@/lib/stores/choices-store";
import { useShallow } from "zustand/react/shallow";
import { Skeleton } from "@/components/ui/skeleton";
import { RoadmapToolbar } from "./roadmap-toolbar";
import { NodeCard, type NodeAction } from "./mindmap/node-card";
import { Minimap } from "./mindmap/minimap";
import type { Viewport } from "./mindmap/mindmap-canvas";
import { Legend } from "./legend";
import { cn } from "@/lib/utils";
import { Plus, Minus, Maximize, Crosshair, X } from "lucide-react";
import type { LayoutNode } from "@/lib/mindmap/tree-layout";

// Lazy-loaded panels: the mindmap is the critical path, so heavy dialogs and
// sidebars only download their code when first opened (code splitting).
const NodeDetailsSidebar = dynamic(() => import("./node-details-sidebar").then((m) => m.NodeDetailsSidebar), {
  ssr: false,
  loading: () => null,
});
const StudyPlannerDialog = dynamic(
  () => import("@/components/study-planner/study-planner-dialog").then((m) => m.StudyPlannerDialog),
  { ssr: false, loading: () => null }
);

/** Debounce a fast-changing value (search input) so expensive work only runs
 *  after the user pauses typing. */
function useDebounced<T>(value: T, delay = 150): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/** Reactive media-query hook — true when the viewport is narrow (mobile).
 *  Used to switch the roadmap into its compact layout and re-fit the canvas. */
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches);
    setMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mobile;
}

const MindmapCanvas = dynamic(() => import("./mindmap/mindmap-canvas").then((m) => m.MindmapCanvas), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
    </div>
  ),
});

const VIEWPORT_STORAGE = "cr-viewport";
const COLLAPSED_STORAGE = "cr-collapsed";
const RECENT_STORAGE = "cr-recent";

/** load a persisted Set<string> from localStorage (expand/collapse state) */
function loadCollapsed(slug: string): Set<string> | null {
  try {
    const raw = localStorage.getItem(COLLAPSED_STORAGE + ":" + slug);
    if (!raw) return null;
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return null;
    return new Set(arr.filter((x): x is string => typeof x === "string"));
  } catch {
    return null;
  }
}

export function RoadmapViewer({ slug }: { slug: string }) {
  const { data: roadmap, isLoading, error } = useQuery({
    queryKey: ["roadmap", slug],
    queryFn: () => getRoadmap(slug),
    // roadmap JSON is static content + module-cached; never refetch
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // recently visited nodes — a light-blue ring marks the last few nodes you
  // opened, so you can find your way back (persisted per roadmap)
  const [recentIds, setRecentIds] = useState<Set<string>>(() => new Set());
  const [focusMode, setFocusMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [flashId, setFlashId] = useState<string | null>(null);
  const [deepLinkId, setDeepLinkId] = useState<string | null>(null);
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, k: 1 });
  const [containerSize, setContainerSize] = useState({ w: 1200, h: 600 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const isMobile = useIsMobile();

  // The mobile floating zoom pill auto-hides after a moment of inactivity so
  // it never sits over (and swallows taps on) the nodes beneath it. Any canvas
  // interaction — pan/zoom, a node tap, a node action — wakes it again.
  const [pillVisible, setPillVisible] = useState(true);
  const pillTimer = useRef<number | null>(null);
  const showPill = useCallback(() => {
    setPillVisible(true);
    if (pillTimer.current) window.clearTimeout(pillTimer.current);
    pillTimer.current = window.setTimeout(() => setPillVisible(false), 2800);
  }, []);
  // clear the idle timer on unmount so we never setState after death
  useEffect(
    () => () => {
      if (pillTimer.current) window.clearTimeout(pillTimer.current);
    },
    []
  );
  // stable wrapper so the canvas doesn't re-subscribe its listeners every render
  const handleViewportChange = useCallback(
    (v: Viewport) => {
      setViewport(v);
      showPill();
    },
    [showPill]
  );

  const showMinimap = useUiStore((s) => s.showMinimap);
  const showLegend = useUiStore((s) => s.showLegend);
  const toast = useUiStore((s) => s.toast);
  // subscribe to the raw completion array (not function refs) so toggling a
  // node re-renders the canvas checkmarks + progress immediately.
  // useShallow prevents re-renders when other roadmaps are updated.
  const completedArray = useProgressStore(
    useShallow((s) => s.completed.filter((c) => c.roadmap === slug).map((c) => c.nodeId))
  );
  const toggleNode = useProgressStore((s) => s.toggleNode);
  const completeSubtree = useProgressStore((s) => s.completeSubtree);
  const planProgress = useStudyPlanStore((s) => s.progressFor(slug));
  const bookmarks = useBookmarksStore((s) => s.bookmarks);
  const toggleBookmark = useBookmarksStore((s) => s.toggleBookmark);
  const choices = useChoicesStore(useShallow((s) => s.choices));

  const canvasRef = useRef<HTMLDivElement>(null);
  const flashTimer = useRef<number | null>(null);

  // measure the canvas container so the minimap + centering math is accurate
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setContainerSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setContainerSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  // deep link support: /roadmap/<slug>?node=<id> opens + centers that node
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      setDeepLinkId(params.get("node"));
    } catch {
      /* ignore */
    }
  }, []);

  // default: sections expanded, deeper collapsed — unless the user has a
  // saved expand/collapse layout for this roadmap (remember expanded state)
  useEffect(() => {
    if (!roadmap) return;
    const saved = loadCollapsed(slug);
    const set = saved ?? (() => {
      const s = new Set<string>();
      const walk = (n: RoadmapNode, depth: number) => {
        if (depth >= 1 && n.children?.length) s.add(n.id);
        for (const c of n.children ?? []) walk(c, depth + 1);
      };
      for (const c of roadmap.root.children ?? []) walk(c, 1);
      return s;
    })();
    setCollapsed(set);
    setSelectedId(null);
    setHoveredId(null);
    setFocusMode(false);
    setSearchQuery("");
    setSearchOpen(false);
    setFlashId(null);
    setViewport({ x: 0, y: 0, k: 1 });
  }, [roadmap, slug]);

  // persist expand/collapse layout so returning to the roadmap restores it
  useEffect(() => {
    if (!roadmap) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(COLLAPSED_STORAGE + ":" + slug, JSON.stringify([...collapsed]));
      } catch {
        /* storage unavailable — skip */
      }
    }, 250);
    return () => clearTimeout(t);
  }, [collapsed, roadmap, slug]);

  // restore the recently-visited ring from the last session
  useEffect(() => {
    if (!roadmap) return;
    try {
      const raw = localStorage.getItem(RECENT_STORAGE + ":" + slug);
      if (!raw) return;
      const arr = JSON.parse(raw) as unknown;
      if (Array.isArray(arr)) {
        const ids = arr.filter((x): x is string => typeof x === "string");
        setRecentIds(new Set(ids.slice(-8)));
      }
    } catch {
      /* storage unavailable — skip */
    }
  }, [roadmap, slug]);

  // persist the recently-visited ring
  useEffect(() => {
    if (!roadmap) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(RECENT_STORAGE + ":" + slug, JSON.stringify([...recentIds]));
      } catch {
        /* storage unavailable — skip */
      }
    }, 250);
    return () => clearTimeout(t);
  }, [recentIds, roadmap, slug]);

  // apply deep link AFTER the reset effect above (which clears selection on
  // roadmap load) so the expansion + selection + centering actually stick
  useEffect(() => {
    if (!deepLinkId || !roadmap) return;
    const target = findNode(roadmap.root, deepLinkId);
    if (!target) return;
    const ancestors = pathToNode(roadmap.root, deepLinkId);
    setCollapsed((prev) => {
      const next = new Set(prev);
      for (const a of ancestors) next.delete(a.id);
      return next;
    });
    setSelectedId(deepLinkId);
    setFlashId(deepLinkId);
    setDeepLinkId(null); // only handle once
    const t = window.setTimeout(() => setFlashId(null), 2300);
    return () => window.clearTimeout(t);
  }, [deepLinkId, roadmap]);

  const focusRoot: RoadmapNode = useMemo(() => {
    if (!roadmap) return null as unknown as RoadmapNode;
    if (!focusMode || !selectedId) return roadmap.root;
    return findNode(roadmap.root, selectedId) ?? roadmap.root;
  }, [roadmap, focusMode, selectedId]);

  const layout = useMemo(() => {
    if (!roadmap) return null;
    return computeLayout(focusRoot, collapsed, isMobile, selectedId, choices);
  }, [roadmap, focusRoot, collapsed, isMobile, selectedId, choices]);

  const learnableIds = useMemo(
    () => (roadmap ? collectLearnableIds(roadmap.root, choices) : []),
    [roadmap, choices]
  );

  // derived from the completed array — O(total completions), recomputed only
  // when completion state or the roadmap itself changes
  const doneIds = useMemo(() => new Set(completedArray), [completedArray]);

  const pct = useMemo(() => {
    if (!roadmap) return 0;
    return learnableIds.length
      ? Math.round((learnableIds.filter((id) => doneIds.has(id)).length / learnableIds.length) * 100)
      : 0;
  }, [roadmap, learnableIds, doneIds]);


  // per-node subtree completion — one O(n) post-order walk, recomputed only
  // when completion state or the roadmap changes (not per hover/render)
  const nodeProgress = useMemo(() => {
    const map = new Map<string, { pct: number; count: number }>();
    if (!roadmap) return map;
    const walk = (n: RoadmapNode): { done: number; total: number } => {
      const learnable = !["section", "subsection", "projects", "choice"].includes(n.type);
      let done = doneIds.has(n.id) ? 1 : 0;
      let total = learnable ? 1 : 0;
      for (const c of getActiveChildren(n, choices)) {
        const r = walk(c);
        done += r.done;
        total += r.total;
      }
      if (total > 0) map.set(n.id, { pct: Math.round((done / total) * 100), count: total });
      return { done, total };
    };
    walk(roadmap.root);
    return map;
  }, [roadmap, doneIds, choices]);

  // keyboard navigation
  const order = useMemo(() => (layout ? dfsOrder(layout) : []), [layout]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("input, textarea, select, [contenteditable=true]")) return;
      if (!layout || !order.length) return;
      const active = order.find((n) => n.id === (selectedId ?? hoveredId));
      const idx = active ? order.indexOf(active) : -1;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedId(order[Math.min(idx + 1, order.length - 1)]?.id ?? order[0].id);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedId(order[Math.max(idx - 1, 0)]?.id ?? order[order.length - 1].id);
          break;
        case "ArrowRight": {
          const n = order[idx];
          if (n && n.childCount > 0) {
            e.preventDefault();
            if (collapsed.has(n.id)) {
              setCollapsed((prev) => {
                const next = new Set(prev);
                next.delete(n.id);
                return next;
              });
            } else if (n.children[0]) {
              setSelectedId(n.children[0].id);
            }
          }
          break;
        }
        case "ArrowLeft": {
          const n = order[idx];
          if (n) {
            e.preventDefault();
            if (n.data.children?.length && !collapsed.has(n.id)) {
              setCollapsed((prev) => new Set(prev).add(n.id));
            } else if (n.parent) {
              setSelectedId(n.parent.id);
            }
          }
          break;
        }
        case "Enter":
        case " ":
          if (active) {
            e.preventDefault();
            if (active.childCount > 0) {
              setCollapsed((prev) => {
                const next = new Set(prev);
                if (next.has(active.id)) next.delete(active.id);
                else next.add(active.id);
                return next;
              });
            }
          }
          break;
        case "Escape":
          setSelectedId(null);
          setSearchOpen(false);
          setFocusMode(false);
          break;
      }
    },
    [layout, order, selectedId, hoveredId, collapsed]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // search highlighting (full tree) — computed from the DEBOUNCED query so
  // typing never triggers a full-tree walk per keystroke
  const debouncedSearch = useDebounced(searchQuery, 150);
  const searchHits = useMemo(() => {
    if (!debouncedSearch.trim() || !roadmap) return new Set<string>();
    const q = debouncedSearch.toLowerCase();
    const hits = new Set<string>();
    const walk = (n: RoadmapNode) => {
      if (n.label.toLowerCase().includes(q)) hits.add(n.id);
      for (const c of n.children ?? []) walk(c);
    };
    walk(roadmap.root);
    return hits;
  }, [debouncedSearch, roadmap]);

  // first hit in DFS order (full tree, not just visible)
  const firstSearchHit = useMemo(() => {
    if (!roadmap || searchHits.size === 0) return null;
    const stack = [roadmap.root];
    while (stack.length) {
      const n = stack.pop()!;
      if (searchHits.has(n.id)) return n;
      for (let i = (n.children ?? []).length - 1; i >= 0; i--) stack.push(n.children[i]!);
    }
    return null;
  }, [roadmap, searchHits]);

  // when searching: expand ancestors of the first hit, center it, flash it, open sidebar
  useEffect(() => {
    if (!debouncedSearch.trim() || !roadmap || !firstSearchHit) return;
    const hit = firstSearchHit;
    const ancestors = pathToNode(roadmap.root, hit.id);
    setCollapsed((prev) => {
      const next = new Set(prev);
      for (const a of ancestors) next.delete(a.id);
      return next;
    });
    setSelectedId(hit.id);
    setFlashId(hit.id);
    const t = window.setTimeout(() => setFlashId(null), 2300);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, roadmap]);

  // center the flashed/search-selected node once it exists in the layout
  const centeredFor = useRef<string | null>(null);
  useEffect(() => {
    if (!flashId || !layout || !containerSize.w) return;
    if (centeredFor.current === flashId) return;
    const n = layout.nodes.find((x) => x.id === flashId);
    if (!n) return;
    centeredFor.current = flashId;
    setViewport((v) => ({
      ...v,
      x: containerSize.w / 2 - (n.x + n.w / 2) * v.k,
      y: containerSize.h / 2 - (n.y + n.h / 2) * v.k,
    }));
  }, [flashId, layout, containerSize]);

  useEffect(() => {
    if (!debouncedSearch.trim()) centeredFor.current = null;
  }, [debouncedSearch]);

  const selectedNode = useMemo(
    () => (roadmap && selectedId ? findNode(roadmap.root, selectedId) : null),
    [roadmap, selectedId]
  );

  const breadcrumbs = useMemo(
    () => (roadmap && selectedId ? pathToNode(roadmap.root, selectedId) : []),
    [roadmap, selectedId]
  );

  // hover path (ancestors + descendants)
  const hoverPath = useMemo(() => {
    if (!roadmap || !hoveredId) return new Set<string>();
    const set = new Set<string>();
    const ancestors = pathToNode(roadmap.root, hoveredId).map((n) => n.id);
    ancestors.forEach((id) => set.add(id));
    const walk = (n: RoadmapNode) => {
      set.add(n.id);
      for (const c of n.children ?? []) walk(c);
    };
    const node = findNode(roadmap.root, hoveredId);
    if (node) walk(node);
    return set;
  }, [roadmap, hoveredId]);

  // active learning path: when a node is selected, the edges from the root
  // down to it (and its direct children) stay lit while unrelated branches fade
  const learningPath = useMemo(() => {
    if (!roadmap || !selectedId) return new Set<string>();
    return new Set(pathToNode(roadmap.root, selectedId).map((n) => n.id));
  }, [roadmap, selectedId]);

  const handleToggle = useCallback(
    (id: string) => {
      showPill();
      setCollapsed((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    },
    [showPill]
  );

  // keep a short memory of opened nodes (most recent 8) so the light-blue
  // "recently visited" ring never grows unbounded
  const markRecent = useCallback((id: string) => {
    setRecentIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      if (next.size > 8) {
        for (const oldest of [...next].slice(0, next.size - 8)) next.delete(oldest);
      }
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      showPill();
      markRecent(id);
      setSelectedId(id);
      setHoveredId(null);
    },
    [showPill, markRecent]
  );

  const expandAll = useCallback(() => {
    setCollapsed(new Set());
    toast("Expanded", { description: "Showing the full roadmap.", kind: "info" });
  }, [toast]);

  const collapseAll = useCallback(() => {
    if (!roadmap) return;
    const set = new Set<string>();
    const walk = (n: RoadmapNode) => {
      if (n.children?.length) set.add(n.id);
      for (const c of n.children ?? []) walk(c);
    };
    for (const c of roadmap.root.children ?? []) walk(c);
    setCollapsed(set);
    setViewport({ x: 0, y: 0, k: 1 });
  }, [roadmap]);

  const handleFit = useCallback(() => {
    if (!layout || !canvasRef.current) return;
    const el = canvasRef.current;
    const pad = isMobile ? 24 : 70;
    const bw = layout.width + pad * 2;
    const bh = layout.height + pad * 2;
    const k = Math.min(el.clientWidth / bw, el.clientHeight / bh, 1);
    setViewport({
      x: (el.clientWidth - layout.width * k) / 2,
      y: (el.clientHeight - layout.height * k) / 2,
      k: Math.max(k, 0.2),
    });
  }, [layout, isMobile]);

  const zoomBy = useCallback(
    (factor: number) => {
      if (!canvasRef.current) return;
      const el = canvasRef.current;
      setViewport((v) => {
        const k = Math.min(2, Math.max(0.2, v.k * factor));
        const cx = el.clientWidth / 2;
        const cy = el.clientHeight / 2;
        const ratio = k / v.k;
        return { x: cx - (cx - v.x) * ratio, y: cy - (cy - v.y) * ratio, k };
      });
    },
    []
  );

  const handleZoomSlider = useCallback((k: number) => {
    if (!canvasRef.current) return;
    const el = canvasRef.current;
    setViewport((v) => {
      const clamped = Math.min(2, Math.max(0.2, k));
      const ratio = clamped / v.k;
      const cx = el.clientWidth / 2;
      const cy = el.clientHeight / 2;
      return { x: cx - (cx - v.x) * ratio, y: cy - (cy - v.y) * ratio, k: clamped };
    });
  }, []);

  const centerOnNode = useCallback(
    (id: string) => {
      if (!layout || !canvasRef.current) return;
      const n = layout.nodes.find((x) => x.id === id);
      if (!n) return;
      const el = canvasRef.current;
      setViewport((v) => ({
        ...v,
        x: el.clientWidth / 2 - (n.x + n.w / 2) * v.k,
        y: el.clientHeight / 2 - (n.y + n.h / 2) * v.k,
      }));
    },
    [layout]
  );

  const ensureNodeVisible = useCallback(
    (id: string) => {
      if (!layout || !canvasRef.current) return;
      const n = layout.nodes.find((x) => x.id === id);
      if (!n) return;
      const el = canvasRef.current;
      setViewport((v) => {
        const nx = n.x * v.k + v.x;
        const ny = n.y * v.k + v.y;
        const nw = n.w * v.k;
        const nh = n.h * v.k;

        const marginX = el.clientWidth * 0.25;
        const marginY = el.clientHeight * 0.25;
        const safeLeft = marginX;
        const safeRight = el.clientWidth - marginX;
        const safeTop = marginY;
        const safeBottom = el.clientHeight - marginY;

        let dx = 0;
        let dy = 0;

        if (nx < safeLeft) dx = safeLeft - nx;
        else if (nx + nw > safeRight) dx = safeRight - (nx + nw);

        if (ny < safeTop) dy = safeTop - ny;
        else if (ny + nh > safeBottom) dy = safeBottom - (ny + nh);

        if (dx === 0 && dy === 0) return v;
        return { ...v, x: v.x + dx, y: v.y + dy };
      });
    },
    [layout]
  );

  useEffect(() => {
    if (selectedId) {
      const t = setTimeout(() => ensureNodeVisible(selectedId), 60);
      return () => clearTimeout(t);
    }
  }, [selectedId, ensureNodeVisible]);

  const handleCenterView = useCallback(() => {
    if (selectedId) {
      centerOnNode(selectedId);
    } else {
      handleFit();
    }
  }, [selectedId, centerOnNode, handleFit]);

  const handleStartLearning = useCallback(() => {
    if (!selectedId) return;
    // expand the node's children + center on it
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.delete(selectedId);
      return next;
    });
    centerOnNode(selectedId);
  }, [selectedId, centerOnNode]);

  const handleReset = useCallback(() => {
    if (!roadmap) return;
    // collapse to default (sections open, deeper collapsed) + fit + clear selection
    const set = new Set<string>();
    const walk = (n: RoadmapNode, depth: number) => {
      if (depth >= 1 && n.children?.length) set.add(n.id);
      for (const c of n.children ?? []) walk(c, depth + 1);
    };
    for (const c of roadmap.root.children ?? []) walk(c, 1);
    setCollapsed(set);
    setSelectedId(null);
    setHoveredId(null);
    setFocusMode(false);
    setSearchQuery("");
    setSearchOpen(false);
    setTimeout(handleFit, 60);
  }, [roadmap, handleFit]);

  const handleToggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // full-tree DFS order for prev/next navigation in the details panel
  const fullOrder = useMemo(() => {
    if (!roadmap) return [];
    const out: { id: string; label: string }[] = [];
    const walk = (n: RoadmapNode) => {
      out.push({ id: n.id, label: n.label });
      for (const c of n.children ?? []) walk(c);
    };
    walk(roadmap.root);
    return out;
  }, [roadmap]);

  const navigateFromSidebar = useCallback(
    (id: string) => {
      // expand ancestors so the target is visible, select it, then center on it
      markRecent(id);
      setSelectedId(id);
      if (roadmap) {
        const ancestors = pathToNode(roadmap.root, id);
        setCollapsed((prev) => {
          const next = new Set(prev);
          for (const a of ancestors) next.delete(a.id);
          return next;
        });
        centeredFor.current = null;
        setFlashId(id);
        if (flashTimer.current) window.clearTimeout(flashTimer.current);
        flashTimer.current = window.setTimeout(() => setFlashId(null), 2300);
      }
    },
    [roadmap, markRecent]
  );

  const bookmarkedCareer = bookmarks.some((b) => b.roadmap === slug && b.nodeId === roadmap?.root.id);

  const handleBookmarkCareer = useCallback(() => {
    if (!roadmap) return;
    toggleBookmark({ roadmap: slug, nodeId: roadmap.root.id, nodeLabel: roadmap.root.label, nodeType: "career" });
    toast(bookmarkedCareer ? "Bookmark removed" : "Roadmap bookmarked", {
      kind: "info",
      description: bookmarkedCareer ? "Removed from your saved roadmaps." : "Find it on your dashboard.",
    });
  }, [roadmap, slug, toggleBookmark, bookmarkedCareer, toast]);

  const handleMarkSubtree = useCallback(
    (node: RoadmapNode) => {
      const ids = collectNodeIds(node);
      completeSubtree(slug, node.id, node.label, ids);
      toast("Marked as complete", {
        description: `${ids.length} ${ids.length > 1 ? "topics updated" : "topic updated"}.`,
      });
    },
    [slug, completeSubtree, toast]
  );

  // quick-action handler — the compact card only dispatches "complete" (the
  // checkbox). Bookmark, copy-link, subtree completion and everything else
  // moved into the details panel, which has its own dedicated callbacks.
  const handleNodeAction = useCallback(
    async (action: NodeAction, id: string) => {
      if (!roadmap || action !== "complete") return;
      const n = findNode(roadmap.root, id);
      if (!n) return;
      showPill();
      const wasComplete = useProgressStore.getState().isComplete(slug, id);
      toggleNode(slug, id, n.label);
      toast(wasComplete ? "Marked incomplete" : "Topic completed 🎉", {
        description: wasComplete ? "Progress updated." : "Keep up the streak!",
        kind: wasComplete ? "info" : "success",
      });
    },
    [roadmap, slug, toggleNode, toast, showPill]
  );

  // persist viewport for "continue where you left off"
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(VIEWPORT_STORAGE + ":" + slug, JSON.stringify(viewport));
      } catch {}
    }, 400);
    return () => clearTimeout(t);
  }, [viewport, slug]);

  const edgeActive = useCallback(
    (e: { source: LayoutNode; target: LayoutNode }) =>
      hoverPath.size > 0
        ? hoverPath.has(e.source.id) && hoverPath.has(e.target.id)
        : selectedId
          ? learningPath.has(e.source.id) && learningPath.has(e.target.id)
          : false,
    [hoverPath, selectedId, learningPath]
  );
  const edgeDimmed = useCallback(
    (e: { source: LayoutNode; target: LayoutNode }) =>
      hoverPath.size > 0
        ? !(hoverPath.has(e.source.id) && hoverPath.has(e.target.id))
        : selectedId
          ? !(learningPath.has(e.source.id) && learningPath.has(e.target.id))
          : false,
    [hoverPath, selectedId, learningPath]
  );

  const renderNode = useCallback(
    (n: LayoutNode, mountAnimated: boolean) => (
      <NodeCard
        key={n.id}
        id={n.id}
        label={n.label}
        type={n.type}
        x={n.x}
        y={n.y}
        w={n.w}
        h={n.h}
        scale={n.scale}
        hasChildren={n.childCount > 0}
        collapsed={collapsed.has(n.id)}
        selected={selectedId === n.id}
        focused={hoveredId === n.id}
        dimmed={hoverPath.size > 0 ? !hoverPath.has(n.id) : selectedId ? !learningPath.has(n.id) : false}
        faded={selectedId && !learningPath.has(n.id) ? true : false}
        recent={recentIds.has(n.id)}
        completed={doneIds.has(n.id)}
        locked={false}
        searchHit={searchHits.has(n.id)}
        bookmarked={bookmarks.some((b) => b.nodeId === n.id)}
        flash={flashId === n.id}
        mountAnimated={mountAnimated}
        pct={nodeProgress.get(n.id)?.pct ?? 0}
        learnableCount={nodeProgress.get(n.id)?.count ?? 0}
        data={n.data}
        onSelect={handleSelect}
        onToggle={handleToggle}
        onHover={setHoveredId}
        onAction={handleNodeAction}
      />
    ),
    [
      collapsed,
      selectedId,
      hoveredId,
      hoverPath,
      learningPath,
      recentIds,
      doneIds,
      searchHits,
      bookmarks,
      flashId,
      nodeProgress,
      handleSelect,
      handleToggle,
      handleNodeAction,
    ]
  );

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col supports-[height:100dvh]:h-[calc(100dvh-4rem)]">
        <div className="flex gap-3 border-b border-slate-200 p-4 dark:border-slate-800">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-9 w-40" />
        </div>
        <div className="flex flex-1 gap-6 p-8">
          <div className="flex-1 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-12" style={{ width: `${80 - (i % 4) * 12}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !roadmap || !layout) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <p className="text-4xl">🗺️</p>
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          Roadmap not found
        </h2>
        <p className="text-sm text-slate-400">This career roadmap doesn&apos;t exist (yet).</p>
      </div>
    );
  }



  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col supports-[height:100dvh]:h-[calc(100dvh-4rem)]">
      <RoadmapToolbar
        slug={slug}
        title={roadmap.meta.title}
        icon={roadmap.meta.icon}
        color={roadmap.meta.color}
        breadcrumbs={breadcrumbs}
        pct={pct}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
        onReset={handleReset}
        onFit={handleFit}
        onZoomIn={() => zoomBy(1.25)}
        onZoomOut={() => zoomBy(0.8)}
        onZoomSlider={handleZoomSlider}
        onCenterView={handleCenterView}
        zoom={viewport.k}
        zoomLabel={`${Math.round(viewport.k * 100)}%`}
        focusMode={focusMode}
        onToggleFocus={() => {
          setFocusMode((v) => !v);
          if (!focusMode && selectedId) setTimeout(handleFit, 60);
        }}
        onToggleMinimap={() => useUiStore.getState().setShowMinimap(!showMinimap)}
        onToggleLegend={() => useUiStore.getState().setShowLegend(!showLegend)}
        showMinimap={showMinimap}
        showLegend={showLegend}
        searchOpen={searchOpen}
        onToggleSearch={() => setSearchOpen((v) => !v)}
        searchQuery={searchQuery}
        onSearchQuery={setSearchQuery}
        bookmarked={bookmarkedCareer}
        onToggleBookmark={handleBookmarkCareer}
        onBreadcrumbClick={(id) => {
          setSelectedId(id);
          setFocusMode(false);
        }}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        onOpenPlanner={() => setPlannerOpen(true)}
        planProgress={planProgress}
      />

      <div ref={canvasRef} className="relative flex-1 overflow-hidden">
        <MindmapCanvas
          layout={layout}
          viewport={viewport}
          onViewportChange={handleViewportChange}
          onBackgroundClick={() => {
            setSelectedId(null);
          }}
          padding={isMobile ? 24 : 70}
          fitKey={isMobile ? "mobile" : "desktop"}
          renderNode={renderNode}
          edgeActive={edgeActive}
          edgeDimmed={edgeDimmed}
        />

        {/* search result count */}
        {debouncedSearch.trim() && (
          <div className="absolute left-3 top-3 z-20 rounded-lg border border-slate-200 bg-white/95 px-3 py-1.5 text-xs text-slate-500 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-800/95 dark:text-slate-300">
            {searchHits.size} match{searchHits.size === 1 ? "" : "es"} — branch auto-expanded
          </div>
        )}

        {/* minimap */}
        {showMinimap && (
          <div className="absolute bottom-4 right-4 z-20">
            <Minimap
              layout={layout}
              viewport={viewport}
              containerSize={containerSize}
              selectedId={selectedId}
              onJump={setViewport}
            />
          </div>
        )}

        {/* legend */}
        {showLegend && <Legend onClose={() => useUiStore.getState().setShowLegend(false)} />}

        {/* mobile floating zoom controls — auto-hides when idle so it never
            blocks taps on the nodes beneath it; any interaction wakes it */}
        <div
          className={cn(
            "absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 p-1 shadow-lg backdrop-blur transition-all duration-300 sm:hidden dark:border-slate-700 dark:bg-slate-800/95",
            pillVisible ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
          )}
          aria-hidden={!pillVisible}
        >
          <button onClick={() => { zoomBy(0.8); showPill(); }} className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-700" aria-label="Zoom out">
            <Minus className="h-4 w-4" />
          </button>
          <button onClick={() => { handleFit(); showPill(); }} className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-700" aria-label="Fit to view">
            <Maximize className="h-4 w-4" />
          </button>
          <button onClick={() => { handleCenterView(); showPill(); }} className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-700" aria-label="Center view">
            <Crosshair className="h-4 w-4" />
          </button>
          <button onClick={() => { zoomBy(1.25); showPill(); }} className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-700" aria-label="Zoom in">
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setSelectedId(null);
              showPill();
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-700"
            aria-label="Close selection"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* keyboard hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="pointer-events-none absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-border-light bg-white/95 px-4 py-1.5 text-xs text-slate-400 shadow-lg backdrop-blur md:flex dark:border-border-dark dark:bg-slate-800/95"
        >
          <span><b className="font-mono">↑↓</b> navigate</span>
          <span><b className="font-mono">←→</b> collapse / expand</span>
          <span><b className="font-mono">↵</b> open details</span>
        </motion.div>
      </div>

      {selectedNode && (
        <NodeDetailsSidebar
          node={selectedNode}
          roadmapSlug={slug}
          roadmapTitle={roadmap.meta.title}
          order={fullOrder}
          onClose={() => setSelectedId(null)}
          onNavigate={navigateFromSidebar}
          onMarkSubtree={() => handleMarkSubtree(selectedNode)}
          onStartLearning={handleStartLearning}
        />
      )}

      {plannerOpen && (
        <StudyPlannerDialog
          slug={slug}
          roadmap={roadmap}
          onClose={() => setPlannerOpen(false)}
        />
      )}
    </div>
  );
}
