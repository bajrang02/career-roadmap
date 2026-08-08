"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  type ReactNode,
} from "react";
import { AnimatePresence } from "framer-motion";
import type { LayoutResult, LayoutNode } from "@/lib/mindmap/tree-layout";
import { RoadmapEdge } from "./roadmap-edge";

export interface Viewport {
  x: number;
  y: number;
  k: number;
}

interface MindmapCanvasProps {
  layout: LayoutResult;
  renderNode: (node: LayoutNode, mountAnimated: boolean) => ReactNode;
  edgeActive: (edge: LayoutResult["edges"][number]) => boolean;
  edgeDimmed: (edge: LayoutResult["edges"][number]) => boolean;
  viewport: Viewport;
  onViewportChange: (v: Viewport) => void;
  onBackgroundClick?: () => void;
  onBackgroundDoubleClick?: () => void;
  padding?: number;
  /** change this value to force a fresh fit-to-view (e.g. mobile ↔ desktop
   *  breakpoint flip or orientation change re-lays-out with new sizes) */
  fitKey?: string | number;
}

const MIN_K = 0.2;
const MAX_K = 2;
const ZOOM_STEP = 1.4;
// Movement (px) before a press becomes a pan. Below this, the press is a
// click and must reach the node/button underneath — the canvas must NOT
// capture the pointer, or the browser retargets the click to the container
// and every node interaction silently dies.
const PAN_THRESHOLD = 4;

interface Gesture {
  x: number;
  y: number;
  k: number;
  startClientX: number;
  startClientY: number;
  startDist: number;
  startMid: { x: number; y: number };
}

export const MindmapCanvas = memo(function MindmapCanvas({
  layout,
  renderNode,
  edgeActive,
  edgeDimmed,
  viewport,
  onViewportChange,
  onBackgroundClick,
  onBackgroundDoubleClick,
  padding = 60,
  fitKey = "",
}: MindmapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<Gesture | null>(null);
  const hasFitted = useRef(false);
  const mountedIds = useRef(new Set<string>());
  const [isPanning, setIsPanning] = useState(false);
  // true once the pointer has moved past PAN_THRESHOLD (i.e. this press is a
  // drag, not a click) — used to suppress the background-click that the
  // browser synthesizes at the end of a captured drag.
  const dragStarted = useRef(false);
  const rafId = useRef<number | null>(null);

  // Keep a stable ref of the latest viewport to avoid re-binding event listeners on every frame
  const viewportRef = useRef(viewport);
  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);

  const scheduleViewportChange = useCallback((v: Viewport) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      onViewportChange(v);
      rafId.current = null;
    });
  }, [onViewportChange]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const fitTo = useCallback(
    (width: number, height: number) => {
      const el = containerRef.current;
      if (!el || !el.clientWidth) return;
      const bw = width + padding * 2;
      const bh = height + padding * 2;
      const k = Math.min(el.clientWidth / bw, el.clientHeight / bh, 1);
      scheduleViewportChange({
        x: (el.clientWidth - width * k) / 2,
        y: (el.clientHeight - height * k) / 2,
        k: Math.max(k, 0.2),
      });
    },
    [padding, scheduleViewportChange]
  );

  // fit once on mount, and again whenever the layout's size class changes
  // (mobile ↔ desktop breakpoint flip, orientation change). The viewer bumps
  // fitKey exactly when compact/desktop sizing switches.
  useEffect(() => {
    hasFitted.current = false;
  }, [fitKey]);

  useEffect(() => {
    if (hasFitted.current || !size.w) return;
    hasFitted.current = true;
    fitTo(layout.width, layout.height);
  }, [layout.width, layout.height, size.w, fitTo]);

  const applyZoomAt = useCallback(
    (mx: number, my: number, factor: number) => {
      const v = viewportRef.current;
      const k = Math.min(MAX_K, Math.max(MIN_K, v.k * factor));
      const ratio = k / v.k;
      scheduleViewportChange({
        x: mx - (mx - v.x) * ratio,
        y: my - (my - v.y) * ratio,
        k,
      });
    },
    [scheduleViewportChange]
  );

  // non-passive wheel listener so we can preventDefault reliably
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const factor = Math.exp(-e.deltaY * 0.0016);
      applyZoomAt(e.clientX - rect.left, e.clientY - rect.top, factor);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [applyZoomAt]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return; // only primary button pans (right-click opens context menu)
      const el = containerRef.current;
      if (!el) return;
      // A new press is a fresh interaction: clear the drag flag so the first
      // click after a drag is never wrongly suppressed.
      dragStarted.current = false;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const pts = Array.from(pointers.current.values());
      if (pts.length >= 2) {
        // pinch — a second finger is down, capture both and pan/zoom now
        const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
        gesture.current = {
          x: viewportRef.current.x,
          y: viewportRef.current.y,
          k: viewportRef.current.k,
          startClientX: e.clientX,
          startClientY: e.clientY,
          startDist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1,
          startMid: mid,
        };
        for (const id of pointers.current.keys()) el.setPointerCapture(id);
        dragStarted.current = true;
        setIsPanning(true);
      } else {
        // single pointer — record the gesture but DON'T capture yet. Pointer
        // capture retargets the click to this container, so capturing on
        // pointerdown would make every click on a node/button fall through to
        // the background. Capture only once real movement is detected below.
        gesture.current = {
          x: viewportRef.current.x,
          y: viewportRef.current.y,
          k: viewportRef.current.k,
          startClientX: e.clientX,
          startClientY: e.clientY,
          startDist: 1,
          startMid: { x: 0, y: 0 },
        };
      }
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const prev = pointers.current.get(e.pointerId);
      if (!prev || !gesture.current) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const pts = Array.from(pointers.current.values());
      const g = gesture.current;

      if (pts.length >= 2) {
        const curMid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
        const k = Math.min(MAX_K, Math.max(MIN_K, g.k * (dist / g.startDist)));
        const ratio = k / g.k;
        scheduleViewportChange({
          x: curMid.x - (g.startMid.x - g.x) * ratio,
          y: curMid.y - (g.startMid.y - g.y) * ratio,
          k,
        });
        return;
      }

      const dx = e.clientX - g.startClientX;
      const dy = e.clientY - g.startClientY;
      // only start panning once the pointer actually moves past the threshold
      // — until then the press is still a candidate click
      if (!dragStarted.current && Math.hypot(dx, dy) > PAN_THRESHOLD) {
        dragStarted.current = true;
        setIsPanning(true);
        containerRef.current?.setPointerCapture(e.pointerId);
      }
      if (dragStarted.current) {
        scheduleViewportChange({ x: g.x + dx, y: g.y + dy, k: g.k });
      }
    },
    [scheduleViewportChange]
  );

  const endPointer = useCallback(
    (e: React.PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.delete(e.pointerId);
      if (pointers.current.size < 2) {
        const first = pointers.current.values().next().value;
        if (first) {
          gesture.current = {
            x: viewportRef.current.x,
            y: viewportRef.current.y,
            k: viewportRef.current.k,
            startClientX: first.x,
            startClientY: first.y,
            startDist: 1,
            startMid: { x: 0, y: 0 },
          };
        }
      }
      if (pointers.current.size === 0) setIsPanning(false);
    },
    []
  );

  const onDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).dataset?.canvasBg) {
        if (onBackgroundDoubleClick) {
          onBackgroundDoubleClick();
        } else {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return;
          applyZoomAt(e.clientX - rect.left, e.clientY - rect.top, ZOOM_STEP);
        }
      }
    },
    [applyZoomAt, onBackgroundDoubleClick]
  );

  // viewport culling (virtual rendering — only mount nodes/edges near the viewport)
  const visible = useMemo(() => {
    const margin = 360;
    const left = -viewport.x / viewport.k - margin;
    const top = -viewport.y / viewport.k - margin;
    const right = left + size.w / viewport.k + margin * 2;
    const bottom = top + size.h / viewport.k + margin * 2;
    const nodeVisible = new Set<string>();
    for (const n of layout.nodes) {
      if (n.x + n.w >= left && n.x <= right && n.y + n.h >= top && n.y <= bottom) {
        nodeVisible.add(n.id);
      }
    }
    return nodeVisible;
  }, [layout.nodes, viewport, size]);

  const visibleNodes = useMemo(() => layout.nodes.filter((n) => visible.has(n.id)), [layout.nodes, visible]);

  const visibleEdges = useMemo(
    () => layout.edges.filter((e) => visible.has(e.target.id) || visible.has(e.source.id)),
    [layout.edges, visible]
  );

  // Track ids already mounted so panning back doesn't replay the fade-in animation.
  // We only forget ids when the FULL layout's node count changes (expand/collapse/
  // search) — pure pans keep the set intact so re-entering nodes stay silent.
  const nodeCount = layout.nodes.length;
  const lastLayoutCount = useRef(0);
  useEffect(() => {
    if (lastLayoutCount.current !== nodeCount) {
      lastLayoutCount.current = nodeCount;
      mountedIds.current.clear();
    }
    for (const n of visibleNodes) mountedIds.current.add(n.id);
  }, [nodeCount, visibleNodes]);

  return (
    <div
      ref={containerRef}
      className="canvas-dots absolute inset-0 cursor-grab overflow-hidden touch-none active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onDoubleClick={onDoubleClick}
      onClick={(e) => {
        // a captured drag ends with a click retargeted to this container —
        // swallow it so panning never deselects the focused node
        if (dragStarted.current) {
          dragStarted.current = false;
          return;
        }
        if ((e.target as HTMLElement).dataset?.canvasBg) onBackgroundClick?.();
      }}
      data-canvas-bg="true"
    >
      <div
        className="absolute top-0 left-0 will-change-transform"
        data-canvas-bg="true"
        style={{ transform: `translate3d(${viewport.x}px, ${viewport.y}px, 0) scale(${viewport.k})` }}
      >
        {/* edges layer */}
        <svg
          width={layout.width}
          height={layout.height}
          className="pointer-events-none absolute top-0 left-0"
          aria-hidden="true"
        >
          {visibleEdges.map((e, i) => (
            <RoadmapEdge
              key={`${e.source.id}-${e.target.id}`}
              d={e.d}
              active={edgeActive(e)}
              dimmed={edgeDimmed(e)}
              index={i}
            />
          ))}
        </svg>

        {/* nodes layer (virtualized) */}
        <AnimatePresence>
          {visibleNodes.map((n) => renderNode(n, mountedIds.current.has(n.id)))}
        </AnimatePresence>
      </div>

      {isPanning && (
        <div className="pointer-events-none absolute inset-0 z-20 cursor-grabbing bg-slate-900/[0.02] dark:bg-white/[0.02]" />
      )}
    </div>
  );
});
