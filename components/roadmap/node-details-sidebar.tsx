"use client";

import { useEffect, useMemo, useState, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Drawer } from "vaul";
import {
  Check,
  CheckCircle2,
  Bookmark,
  ListChecks,
  BookOpen,
  Target,
  Award,
  FolderKanban,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  X,
  Clock,
  Lock,
  ChevronRight,
  CheckSquare,
  Dumbbell,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  PlayCircle,
  BadgeCheck,
  Flame,
  Search,
  FileText,
  Library,
} from "lucide-react";
import { cn, nodeMeta, resourceKind, typeEmoji, isCheckableType } from "@/lib/utils";
import type { NodeDetails, RoadmapNode, Resource, PracticeItem } from "@/lib/types";
import { generateSearchOptions } from "@/lib/search-utils";
import { getRoadmapDetails } from "@/lib/data-loader";
import { collectLearnableIds } from "@/lib/mindmap/tree-layout";
import { useProgressStore } from "@/lib/stores/progress-store";
import { useBookmarksStore } from "@/lib/stores/bookmarks-store";
import { useUiStore } from "@/lib/stores/ui-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  node: RoadmapNode;
  roadmapSlug: string;
  roadmapTitle: string;
  /** full-tree DFS order so we can offer prev/next navigation */
  order: { id: string; label: string }[];
  onClose: () => void;
  onNavigate: (id: string) => void;
  onMarkSubtree: () => void;
}

type TabId = "overview" | "resources" | "practice" | "projects";


/** Notion-style section: small caps label + generous spacing + clean content */
function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <section className="px-5 py-5">
      <h3 className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
        <Icon className="h-4 w-4" /> {title}
      </h3>
      <div className="mt-3 space-y-2.5 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">{children}</div>
    </section>
  );
}

/** Deterministic brand-ish avatar color for a provider name. */
const PROVIDER_COLORS: [string, string][] = [
  ["MDN", "bg-blue-600 dark:bg-blue-500"],
  ["W3Schools", "bg-green-600 dark:bg-green-500"],
  ["GeeksforGeeks", "bg-lime-600 dark:bg-lime-500"],
  ["freeCodeCamp", "bg-slate-700 dark:bg-slate-400"],
  ["Real Python", "bg-amber-600 dark:bg-amber-500"],
  ["LeetCode", "bg-orange-600 dark:bg-orange-500"],
  ["HackerRank", "bg-emerald-600 dark:bg-emerald-500"],
  ["GitHub", "bg-slate-800 dark:bg-slate-300"],
  ["Microsoft", "bg-sky-700 dark:bg-sky-500"],
  ["AWS", "bg-orange-700 dark:bg-orange-500"],
  ["Google", "bg-blue-700 dark:bg-blue-500"],
  ["Kubernetes", "bg-blue-700 dark:bg-blue-500"],
  ["Docker", "bg-sky-700 dark:bg-sky-500"],
  ["OWASP", "bg-rose-700 dark:bg-rose-500"],
  ["PortSwigger", "bg-rose-600 dark:bg-rose-500"],
  ["TryHackMe", "bg-indigo-700 dark:bg-indigo-500"],
  ["Hack The Box", "bg-emerald-800 dark:bg-emerald-500"],
  ["Kaggle", "bg-sky-800 dark:bg-sky-500"],
  ["React", "bg-cyan-700 dark:bg-cyan-500"],
  ["Vue", "bg-green-700 dark:bg-green-500"],
  ["Angular", "bg-red-600 dark:bg-red-500"],
  ["Node.js", "bg-green-700 dark:bg-green-500"],
  ["TypeScript", "bg-blue-700 dark:bg-blue-500"],
  ["Wikipedia", "bg-slate-500 dark:bg-slate-400"],
  ["Nielsen", "bg-purple-700 dark:bg-purple-500"],
  ["Khan Academy", "bg-blue-600 dark:bg-blue-500"],
  ["Indeed", "bg-blue-700 dark:bg-blue-500"],
  ["MindTools", "bg-teal-700 dark:bg-teal-500"],
  ["Coursera", "bg-blue-700 dark:bg-blue-500"],
  ["Autodesk", "bg-red-700 dark:bg-red-500"],
  ["Python", "bg-amber-600 dark:bg-amber-500"],
  ["Java", "bg-red-700 dark:bg-red-500"],
  ["MySQL", "bg-sky-800 dark:bg-sky-500"],
  ["PostgreSQL", "bg-cyan-800 dark:bg-cyan-500"],
];

const PROVIDER_COLOR_FALLBACKS: string[] = [
  "bg-indigo-600 dark:bg-indigo-500",
  "bg-fuchsia-600 dark:bg-fuchsia-500",
  "bg-cyan-700 dark:bg-cyan-500",
  "bg-teal-700 dark:bg-teal-500",
  "bg-amber-700 dark:bg-amber-500",
  "bg-violet-700 dark:bg-violet-500",
];

function providerColor(name: string) {
  const key = name.split(/[^A-Za-z]/)[0] ?? "";
  const exact = PROVIDER_COLORS.find(([n]) => name.toLowerCase().startsWith(n.toLowerCase()) || key.toLowerCase() === n.toLowerCase());
  if (exact) return exact[1];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PROVIDER_COLOR_FALLBACKS[h % PROVIDER_COLOR_FALLBACKS.length];
}

function ProviderAvatar({ provider, size = "md" }: { provider: string; size?: "md" | "lg" }) {
  const letter = (provider || "?").charAt(0).toUpperCase();
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg font-bold text-white",
        providerColor(provider),
        size === "lg" ? "h-11 w-11 text-lg" : "h-9 w-9 text-sm"
      )}
      aria-hidden
    >
      {letter}
    </span>
  );
}

function DiffBadge({ difficulty }: { difficulty?: string }) {
  if (!difficulty) return null;
  const variant =
    difficulty === "Beginner" ? "success" : difficulty === "Advanced" ? "danger" : difficulty === "Expert" ? "danger" : "warning";
  return <Badge variant={variant as "success" | "warning" | "danger"}>{difficulty}</Badge>;
}

/** One curated resource row — provider avatar, title, description, meta, CTA. */
function ResourceRow({ r, highlight }: { r: Resource; highlight?: boolean }) {
  const kind = resourceKind(r.kind);
  return (
    <div
      className={cn(
        "rounded-xl border p-3.5 transition",
        highlight
          ? "border-brand-300 bg-brand-50/70 dark:border-brand-500/40 dark:bg-brand-500/10"
          : "border-slate-100 bg-white dark:border-slate-700/60 dark:bg-slate-800/60"
      )}
    >
      <div className="flex items-start gap-3">
        <ProviderAvatar provider={r.provider} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="min-w-0 flex-1 truncate text-[15px] font-semibold text-slate-900 dark:text-white">{r.title}</p>
            {r.isOfficial && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/10 px-2 py-0.5 text-[11px] font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                <BadgeCheck className="h-3 w-3" /> Official
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">
            {r.provider}
            <span className="mx-1.5 text-slate-300 dark:text-slate-600">•</span>
            <span className={cn("inline-flex items-center gap-1", kind.dot && "")}>
              <span className={cn("inline-block h-1.5 w-1.5 rounded-full", kind.dot)} />
              {r.type}
            </span>
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">{r.description}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <DiffBadge difficulty={r.difficulty} />
            <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
              <Clock className="h-3 w-3" /> {r.estimatedTime}
            </span>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-600 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-brand-400"
            >
              Open resource <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Categorized blocks for the curated resources — Learn / Study / Practice. */
const RESOURCE_CATEGORIES: { id: "LEARN" | "STUDY" | "PRACTICE"; label: string; icon: React.ElementType; kinds: Set<Resource["kind"]> }[] = [
  {
    id: "LEARN",
    label: "Learn",
    icon: GraduationCap,
    kinds: new Set<Resource["kind"]>(["docs", "course", "video", "article", "certification", "repo", "community"]),
  },
  {
    id: "STUDY",
    label: "Study",
    icon: BookOpen,
    kinds: new Set<Resource["kind"]>(["book", "cheatsheet"]),
  },
  {
    id: "PRACTICE",
    label: "Practice",
    icon: Dumbbell,
    kinds: new Set<Resource["kind"]>(["practice"]),
  },
];

const SEARCH_ICONS: Record<string, React.ElementType> = {
  "Web Search": Search,
  "PDF Search": FileText,
  "Book Search": BookOpen,
  "Study Search": Library,
};

/** One generated search option — PDF notes / web / books / study material. */
function SearchActionCard({ r, primary }: { r: Resource; primary?: boolean }) {
  const Icon = SEARCH_ICONS[r.type] ?? Search;
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      title={r.description}
      className={cn(
        "group rounded-xl border p-3.5 transition",
        primary
          ? "border-brand-300 bg-brand-50/70 hover:border-brand-400 hover:shadow-sm dark:border-brand-500/40 dark:bg-brand-500/10 dark:hover:border-brand-400"
          : "border-slate-100 bg-white hover:border-brand-200 hover:shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 dark:hover:border-brand-500/40"
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            primary
              ? "bg-brand-500/15 text-brand-600 dark:text-brand-300"
              : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
          )}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[15px] font-semibold text-slate-900 dark:text-white">{r.title}</p>
            {primary && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-500/10 px-2 py-0.5 text-[11px] font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                <FileText className="h-3 w-3" /> PDF
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">
            {r.provider} · Search
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">{r.description}</p>
          {r.query && (
            <p className="mt-2 truncate rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-500 dark:bg-slate-900/50 dark:text-slate-400" title={r.query}>
              {r.query}
            </p>
          )}
          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition group-hover:bg-brand-600 dark:bg-slate-100 dark:text-slate-900 dark:group-hover:bg-brand-400">
            Open search <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

/** One practice item — platform, skills, difficulty, CTA. */
function PracticeRow({ item }: { item: PracticeItem }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3.5 transition hover:border-brand-200 hover:shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 dark:hover:border-brand-500/40">
      <div className="flex items-center justify-between gap-2">
        <p className="flex min-w-0 items-center gap-2 text-[15px] font-semibold text-slate-900 dark:text-white">
          <Flame className="h-4 w-4 shrink-0 text-brand-500" />
          <span className="truncate">{item.title}</span>
        </p>
      </div>
      <p className="mt-1 text-[13px] font-medium text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1">
          <ProviderAvatar provider={item.platform} size="md" />
          <span className="align-middle">{item.platform}</span>
        </span>
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
      {item.skills && item.skills.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {item.skills.map((s) => (
            <span
              key={s}
              className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-300"
            >
              {s}
            </span>
          ))}
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <DiffBadge difficulty={item.difficulty} />
        <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <Clock className="h-3 w-3" /> {item.estimatedTime}
        </span>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-500"
        >
          <PlayCircle className="h-3.5 w-3.5" /> Practice now
        </a>
      </div>
    </div>
  );
}

export const NodeDetailsSidebar = memo(function NodeDetailsSidebar({
  node,
  roadmapSlug,
  roadmapTitle,
  order,
  onClose,
  onNavigate,
  onMarkSubtree,
}: Props) {
  const meta = nodeMeta(node.type);
  // Full node details (resources, practice, overview, …) are lazy-loaded from
  // the per-roadmap details map the first time a panel opens — the roadmap
  // page itself only ships the slim tree. While loading, the header renders
  // from the slim details (difficulty/time) and the content shows a spinner.
  const [fullDetails, setFullDetails] = useState<NodeDetails | null>(null);
  useEffect(() => {
    let alive = true;
    setFullDetails(null);
    getRoadmapDetails(roadmapSlug)
      .then((map) => {
        if (alive) setFullDetails(map[node.id] ?? null);
      })
      .catch(() => {
        if (alive) setFullDetails(null);
      });
    return () => {
      alive = false;
    };
  }, [roadmapSlug, node.id]);
  const d = fullDetails ?? node.details;
  const isComplete = useProgressStore((s) => s.isComplete);
  const toggleNode = useProgressStore((s) => s.toggleNode);
  const completed = isComplete(roadmapSlug, node.id);
  const isBookmarked = useBookmarksStore((s) => s.isBookmarked);
  const toggleBookmark = useBookmarksStore((s) => s.toggleBookmark);
  const toast = useUiStore((s) => s.toast);

  const bookmarked = isBookmarked(roadmapSlug, node.id);

  // per-node learning progress (subtree) — O(n) via a Set of completed ids
  const learnable = collectLearnableIds(node);
  const completedList = useProgressStore((s) => s.completed);
  const completedIds = useMemo(
    () => new Set(completedList.filter((c) => c.roadmap === roadmapSlug).map((c) => c.nodeId)),
    [completedList, roadmapSlug]
  );
  const doneCount = learnable.filter((id) => completedIds.has(id)).length;
  const nodePct = learnable.length ? Math.round((doneCount / learnable.length) * 100) : 0;

  // prev / next in full-tree DFS order
  const idx = order.findIndex((o) => o.id === node.id);
  const prev = idx > 0 ? order[idx - 1] : null;
  const next = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;

  const [tab, setTab] = useState<TabId>("overview");

  // open a tab; used by the header CTAs (e.g. "Practice This Topic")
  const jumpTo = (t: TabId) => setTab(t);

  const handleToggle = () => {
    toggleNode(roadmapSlug, node.id, node.label);
    toast(completed ? "Marked incomplete" : "Topic completed 🎉", {
      description: completed ? "Undo successful." : "Keep up the streak!",
      kind: completed ? "info" : "success",
    });
  };

  const handleBookmark = () => {
    toggleBookmark({
      roadmap: roadmapSlug,
      nodeId: node.id,
      nodeLabel: node.label,
      nodeType: node.type,
    });
    toast(bookmarked ? "Bookmark removed" : "Bookmarked", {
      description: bookmarked ? "Removed from your saved nodes." : "Saved to your dashboard.",
      kind: "info",
    });
  };

  // topic-specific study searches — generated client-side from structured
  // topic data, so every node always has a "Find PDF Notes" option without
  // bloating the dataset with hundreds of hardcoded search URLs
  const searchOptions = useMemo(
    () => generateSearchOptions({ topic: node.label, roadmapTitle, roadmapSlug }),
    [node.label, roadmapTitle, roadmapSlug]
  );

  // curated resources grouped into Learn / Study / Practice buckets
  const curatedResources = useMemo(() => d.resources.filter((r) => !r.query), [d.resources]);
  const resourceCategories = RESOURCE_CATEGORIES.map((cat) => ({
    ...cat,
    items: curatedResources.filter((r) => cat.kinds.has(r.kind)),
  })).filter((cat) => cat.items.length > 0);

  const subtopics = node.children ?? [];
  // a subtree exists when the node has children (or choice options) below it,
  // which is when "mark subtree complete" is meaningful
  const hasSubtree = (node.children?.length ?? 0) > 0 || (node.options?.length ?? 0) > 0;
  // containers (sections, choice…) have no completion state of their own — the
  // primary action for them is "mark subtree" instead of "mark as done"
  const checkable = isCheckableType(node.type);

  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const onChange = (e: MediaQueryListEvent) => setDesktop(e.matches);
    setDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const enter = desktop ? { x: 440, opacity: 0.4 } : { y: "100%", opacity: 0.8 };
  const leave = desktop ? { x: 440, opacity: 0 } : { y: "100%", opacity: 0 };

  const headerContent = (
    <div className="shrink-0 flex flex-col border-b border-slate-100 dark:border-slate-700/60 bg-white dark:bg-slate-800 z-10 sticky top-0 rounded-t-3xl sm:rounded-none">
      {/* header — Notion-style doc title */}
      <div className="flex items-start gap-3.5 p-5 pb-4">
        <span className={cn("mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl", meta.chip)}>
          {typeEmoji(node.type)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-[20px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              {node.label}
            </h2>
            {completed && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Badge variant="secondary">{meta.label}</Badge>
            <DiffBadge difficulty={d.difficulty} />
            <Badge variant="outline">
              <Clock className="h-3 w-3" /> {d.estimatedTime}
            </Badge>
            {node.optional && <Badge variant="purple">Optional</Badge>}
          </div>
        </div>
        {!desktop && (
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 sm:hidden"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        {desktop && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200 hidden sm:block"
            aria-label="Close details"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* per-node progress */}
      {learnable.length > 0 && (
        <div className="flex items-center gap-3 px-5 pb-4">
          <div className="min-w-0 flex-1">
            <Progress value={nodePct} className="h-1.5" indicatorClassName="bg-brand-500" />
          </div>
          <span className="font-mono text-[13px] font-medium text-slate-500 dark:text-slate-400">
            {doneCount}/{learnable.length} · {nodePct}%
          </span>
        </div>
      )}

      {/* actions */}
      <div className="flex flex-wrap gap-2 px-5 pb-3">
        {checkable && (
          <Button variant="outline" size="sm" className="flex-1 min-w-[8rem] min-h-[48px] text-[15px]" onClick={handleToggle}>
            {completed ? <Check className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            {completed ? "Done" : "Mark as done"}
          </Button>
        )}
        {hasSubtree && (
          <Button
            variant="outline"
            size="icon-sm"
            onClick={onMarkSubtree}
            title="Mark all subtopics complete"
            aria-label="Mark all subtopics complete"
            className="min-h-[48px] min-w-[48px]"
          >
            <ListChecks className="h-5 w-5" />
          </Button>
        )}
        <Button
          variant={bookmarked ? "secondary" : "ghost"}
          size="icon-sm"
          onClick={handleBookmark}
          aria-label="Bookmark"
          className={cn("min-h-[48px] min-w-[48px]", bookmarked && "text-amber-500")}
        >
          <Bookmark className={cn("h-5 w-5", bookmarked && "fill-amber-400")} />
        </Button>
      </div>

      {/* primary CTAs — Learn This Topic / Practice This Topic — every topic gets
          both: the tabs always exist and each has a useful fallback (study
          searches / curated-practice-coming-soon state) */}
      <div className="flex gap-2 px-5 pb-4">
        <Button
          size="sm"
          className="flex-1 min-h-[48px] text-[15px]"
          onClick={() => jumpTo("resources")}
        >
          <GraduationCap className="h-4 w-4" /> Learn this topic
        </Button>
        <Button
          size="sm"
          className="flex-1 min-h-[48px] text-[15px]"
          onClick={() => jumpTo("practice")}
        >
          <PlayCircle className="h-4 w-4" /> Practice this topic
        </Button>
      </div>

      {/* tabs — single Radix root, shared with the content below via `tab` state */}
      <div className="px-3 pb-3">
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabId)} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="px-1 text-xs sm:text-[13px]">Overview</TabsTrigger>
            <TabsTrigger value="resources" className="px-1 text-xs sm:text-[13px]">
              Resources{d.resources.length > 0 && <span className="text-slate-400"> ({d.resources.length})</span>}
            </TabsTrigger>
            <TabsTrigger value="practice" className="px-1 text-xs sm:text-[13px]">
              Practice{d.practice.length > 0 && <span className="text-slate-400"> ({d.practice.length})</span>}
            </TabsTrigger>
            <TabsTrigger value="projects" className="px-1 text-xs sm:text-[13px]">
              Projects{d.projects.length > 0 && <span className="text-slate-400"> ({d.projects.length})</span>}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );

  const ov = d.overview;
  const overviewContent = (
    <div>
      {/* What is it? — the structured overview replaces the long paragraph */}
      {ov ? (
        <>
          <Section icon={BookOpen} title="What is it?">
            <p className="text-[16px] sm:text-[14px]">{ov.whatIsIt}</p>
          </Section>
          {ov.whyMatters.length > 0 && (
            <Section icon={Lightbulb} title="Why it matters">
              <ul className="space-y-2">
                {ov.whyMatters.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-[15px] sm:text-[14px]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {w}
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {ov.youWillLearn.length > 0 && (
            <Section icon={Target} title="What you'll learn">
              <ul className="space-y-2">
                {ov.youWillLearn.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-[15px] sm:text-[14px]">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 dark:text-slate-500" />
                    {w}
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {ov.whereUsed.length > 0 && (
            <Section icon={FolderKanban} title="Where it is used">
              <div className="flex flex-wrap gap-2 sm:gap-1.5">
                {ov.whereUsed.map((w, i) => (
                  <span key={i} className="rounded-full border border-slate-200 px-3 py-1 text-[13px] font-medium text-slate-600 dark:border-slate-600 dark:text-slate-300">
                    {w}
                  </span>
                ))}
              </div>
            </Section>
          )}
          {ov.prerequisites.length > 0 && (
            <Section icon={Lock} title="Prerequisites">
              <ul className="space-y-2">
                {ov.prerequisites.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-[15px] sm:text-[14px]">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 dark:text-slate-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </Section>
          )}
          <Section icon={GraduationCap} title="Outcome">
            <p className="rounded-xl border border-emerald-200/70 bg-emerald-50 p-3.5 text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200 text-[15px] sm:text-[14px]">
              {ov.outcome}
            </p>
          </Section>
        </>
      ) : (
        <Section icon={BookOpen} title="Overview">
          <p className="text-[16px] sm:text-[14px]">{d.description}</p>
        </Section>
      )}

      {/* checkpoints */}
      {d.checkpoints && d.checkpoints.length > 0 && (
        <Section icon={CheckSquare} title="Learning Checkpoints">
          <ul className="space-y-2">
            {d.checkpoints.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm text-slate-700 dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span className="leading-tight text-[15px] sm:text-[14px]">{c}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* subtopics */}
      {subtopics.length > 0 && (
        <Section icon={FolderKanban} title={`Subtopics (${subtopics.length})`}>
          <div className="flex flex-wrap gap-2 sm:gap-1.5">
            {subtopics.map((c) => (
              <button
                key={c.id}
                onClick={() => onNavigate(c.id)}
                className="rounded-full border border-slate-200 px-4 py-2 sm:px-3 sm:py-1 text-[14px] sm:text-xs font-medium text-slate-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-600 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-300 whitespace-normal text-left break-words max-w-full"
              >
                {c.label}
              </button>
            ))}
          </div>
        </Section>
      )}

      {/* The structured overview already covers why / prerequisites / objectives;
          only render the legacy sections when overview is missing (e.g. imported maps) */}
      {!ov && d.whyLearn && (
        <Section icon={Lightbulb} title="Why learn this">
          <p className="rounded-xl border border-amber-200/70 bg-amber-50 p-3.5 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200 text-[15px] sm:text-[14px]">
            {d.whyLearn}
          </p>
        </Section>
      )}

      {!ov && d.prerequisites.length > 0 && (
        <Section icon={Lock} title="Prerequisites">
          <ul className="space-y-2">
            {d.prerequisites.map((p) => (
              <li key={p} className="flex items-start gap-2 text-[15px] sm:text-[14px]">
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 dark:text-slate-500" />
                {p}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {!ov && d.objectives.length > 0 && (
        <Section icon={Target} title="Learning objectives">
          <ul className="space-y-2">
            {d.objectives.map((o) => (
              <li key={o} className="flex items-start gap-2 text-[15px] sm:text-[14px]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {o}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {d.careerRelevance && (
        <Section icon={Award} title="Career relevance">
          <p className="rounded-xl border border-brand-200/70 bg-brand-50 p-3.5 text-brand-900 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-200 text-[15px] sm:text-[14px]">
            {d.careerRelevance}
          </p>
        </Section>
      )}

      {/* exercises */}
      {d.exercises && d.exercises.length > 0 && (
        <>
          <Separator />
          <Section icon={Dumbbell} title="Practical Exercises">
            <ul className="space-y-2">
              {d.exercises.map((ex, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-amber-200/70 bg-amber-50/50 px-3.5 py-3 text-[14px] sm:text-xs font-medium text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200"
                >
                  {ex}
                </li>
              ))}
            </ul>
          </Section>
        </>
      )}

      {/* interview questions */}
      {d.interviewQuestions.length > 0 && (
        <>
          <Separator />
          <Section icon={MessageSquare} title="Interview questions">
            <ul className="space-y-2">
              {d.interviewQuestions.map((q) => (
                <li
                  key={q}
                  className="rounded-lg border border-indigo-200/70 bg-indigo-50/50 px-3.5 py-3 text-[14px] sm:text-xs font-medium text-indigo-900 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-200"
                >
                  {q}
                </li>
              ))}
            </ul>
          </Section>
        </>
      )}

      {/* mistakes + tips */}
      {(d.commonMistakes.length > 0 || d.tips.length > 0) && (
        <div className="grid gap-5 p-5 pt-0">
          {d.commonMistakes.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-[14px] sm:text-[13px] font-bold uppercase tracking-[0.08em] text-rose-500">
                <AlertTriangle className="h-4 w-4" /> Common mistakes
              </h3>
              <ul className="mt-2.5 space-y-2 sm:space-y-1.5">
                {d.commonMistakes.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-[15px] sm:text-sm text-slate-500 dark:text-slate-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {d.tips.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-[14px] sm:text-[13px] font-bold uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">
                <Lightbulb className="h-4 w-4" /> Tips
              </h3>
              <ul className="mt-2.5 space-y-2 sm:space-y-1.5">
                {d.tips.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-[15px] sm:text-sm text-slate-500 dark:text-slate-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* next topics */}
      {d.nextTopics.length > 0 && (
        <>
          <Separator />
          <div className="p-5">
            <h3 className="flex items-center gap-2 text-[14px] sm:text-[13px] font-bold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              <ArrowRight className="h-4 w-4" /> Next topics
            </h3>
            <div className="mt-3 flex flex-wrap gap-2 sm:gap-1.5">
              {d.nextTopics.map((n) => (
                <Badge key={n} variant="outline" className="cursor-default text-[14px] sm:text-xs py-1 px-3">
                  {n}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-[13px] sm:text-xs text-slate-400">
              From the <span className="font-semibold">{roadmapTitle}</span> roadmap
            </p>
          </div>
        </>
      )}
    </div>
  );

  const resourcesContent = (
    <div className="p-4 sm:p-5 space-y-6">
      {/* curated resources — Learn / Study / Practice */}
      {resourceCategories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center dark:border-slate-700">
          <BookOpen className="mx-auto h-7 w-7 text-slate-300 dark:text-slate-600" />
          <p className="mt-2 text-[15px] font-semibold text-slate-700 dark:text-slate-200">No curated resources yet</p>
          <p className="mx-auto mt-1 max-w-xs text-[13px] text-slate-500 dark:text-slate-400">
            We verify every curated link by hand — a match for this topic has not been added yet. Use the study searches below to find material now.
          </p>
        </div>
      ) : (
        resourceCategories.map((cat) => (
          <div key={cat.id}>
            <div className="mb-2 flex items-center gap-2">
              <cat.icon className="h-4 w-4 text-brand-500" />
              <p className="text-[14px] sm:text-[13px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {cat.label}
              </p>
            </div>
            <div className="space-y-2.5">
              {cat.items.map((r, i) => (
                <ResourceRow key={r.url} r={r} highlight={cat.id === "LEARN" && i === 0} />
              ))}
            </div>
          </div>
        ))
      )}

      {/* study discovery — topic-specific searches, always available */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Search className="h-4 w-4 text-brand-500" />
          <p className="text-[14px] sm:text-[13px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Find study material
          </p>
        </div>
        <p className="mb-3 -mt-1 text-[13px] text-slate-400 dark:text-slate-500">
          Search verified topic terms across PDF documents, books, lecture notes and the web.
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {searchOptions.map((r) => (
            <SearchActionCard key={r.title} r={r} primary={r.type === "PDF Search"} />
          ))}
        </div>
      </div>
    </div>
  );

  const practiceContent = (
    <div className="p-4 sm:p-5 space-y-3">
      {d.practice.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-700">
          <Dumbbell className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="mt-3 text-[15px] font-semibold text-slate-700 dark:text-slate-200">No practice challenges yet</p>
          <p className="mx-auto mt-1 max-w-xs text-[13px] text-slate-500 dark:text-slate-400">
            Hands-on exercises for this topic are being curated. Meanwhile, use the Resources tab and its study
            searches to keep learning.
          </p>
        </div>
      ) : (
        d.practice.map((item, i) => <PracticeRow key={i} item={item} />)
      )}
    </div>
  );

  const projectsContent = (
    <div className="p-4 sm:p-5">
      {d.projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-700">
          <FolderKanban className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="mt-3 text-[15px] font-semibold text-slate-700 dark:text-slate-200">No projects for this topic</p>
          <p className="mx-auto mt-1 max-w-xs text-[13px] text-slate-500 dark:text-slate-400">
            Build the subtopics above first — project briefs appear on the topics that need them.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {d.projects.map((p, i) => (
            <div key={i} className="rounded-xl border border-emerald-200/70 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-[15px] sm:text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                  <span className="font-mono text-[11px] sm:text-[10px] rounded-full bg-emerald-100 px-1.5 py-0.5 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">0{i + 1}</span>
                  {p.title}
                </p>
                {p.difficulty && (
                  <Badge variant="outline" className="border-emerald-200 text-[11px] sm:text-[10px] text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
                    {p.difficulty}
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-[14px] sm:text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-300/70">{p.description}</p>
              {p.goal && (
                <div className="mt-2 text-[14px] sm:text-xs text-emerald-700 dark:text-emerald-400">
                  <strong>Goal:</strong> {p.goal}
                </div>
              )}
              {p.skills && p.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-1">
                  {p.skills.map((s) => (
                    <span key={s} className="rounded border border-emerald-200 bg-emerald-100/50 px-2 py-1 sm:px-1.5 sm:py-0.5 text-[11px] sm:text-[10px] text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const scrollContent = (
    <div className="flex-1 nice-scroll text-[15px] sm:text-[14px]">
      {fullDetails === null ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
        </div>
      ) : (
        <>
          {tab === "overview" && overviewContent}
          {tab === "resources" && resourcesContent}
          {tab === "practice" && practiceContent}
          {tab === "projects" && projectsContent}
        </>
      )}
      <div className="h-[env(safe-area-inset-bottom,20px)] sm:h-8" />
    </div>
  );

  const footer = (
    <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-slate-700/60 bg-white dark:bg-slate-800">
      <Button
        variant="outline"
        size="sm"
        className="min-w-0 flex-1 justify-start min-h-[48px] sm:min-h-0"
        disabled={!prev}
        onClick={() => prev && onNavigate(prev.id)}
      >
        <ArrowLeft className="h-4 w-4 sm:h-3.5 sm:w-3.5 shrink-0" />
        <span className="truncate text-[14px] sm:text-xs">{prev?.label ?? "Start"}</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="min-w-0 flex-1 justify-end min-h-[48px] sm:min-h-0"
        disabled={!next}
        onClick={() => next && onNavigate(next.id)}
      >
        <span className="truncate text-[14px] sm:text-xs">{next?.label ?? "End"}</span>
        <ArrowRight className="h-4 w-4 sm:h-3.5 sm:w-3.5 shrink-0" />
      </Button>
    </div>
  );

  if (!desktop) {
    return (
      <Drawer.Root
        open={true}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        snapPoints={[0.35, 0.7, 1]}
        activeSnapPoint={1}
        setActiveSnapPoint={() => {}}
        fadeFromIndex={0}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px]" />
          <Drawer.Content
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-[20px] bg-white outline-none dark:bg-slate-800"
            style={{ maxHeight: "100dvh", height: "100dvh" }}
          >
            <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600 mb-2" />
            {headerContent}
            <ScrollArea className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "contain" }}>
              {scrollContent}
            </ScrollArea>
            {footer}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <AnimatePresence>
      <motion.aside
        key="sidebar-desktop"
        initial={enter}
        animate={{ x: 0, opacity: 1 }}
        exit={leave}
        transition={{ type: "spring", stiffness: 380, damping: 38 }}
        className="fixed right-0 top-16 bottom-0 z-40 flex w-full max-w-[440px] flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
        role="dialog"
        aria-label={`${node.label} details`}
      >
        {headerContent}
        <ScrollArea className="flex-1 overflow-y-auto">
          {scrollContent}
        </ScrollArea>
        {footer}
      </motion.aside>
    </AnimatePresence>
  );
});
