"use client";

import { useCallback, useEffect, useMemo, useState, memo } from "react";
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
import type { Certification, NodeDetails, RoadmapNode, Resource, PracticeItem } from "@/lib/types";
import { generateSearchOptions } from "@/lib/search-utils";
import { getCertifications, getRoadmapDetails } from "@/lib/data-loader";
import { collectLearnableIds } from "@/lib/mindmap/tree-layout";
import { useProgressStore } from "@/lib/stores/progress-store";
import { useBookmarksStore } from "@/lib/stores/bookmarks-store";
import { useUiStore } from "@/lib/stores/ui-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

type TabId = "overview" | "resources" | "practice" | "projects" | "certifications";


/** Notion-style section: small caps label + clean content, separated by a thin
 *  divider. `compact` tightens vertical padding for the overview flow; `className`
 *  lets the overview grid strip padding/borders at the desktop breakpoint. */
function Section({
  icon: Icon,
  title,
  children,
  compact,
  className,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-slate-100 px-4 py-4 sm:px-5 dark:border-slate-700/50", compact && "py-3", className)}>
      <h3 className="flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-[0.09em] text-slate-500 dark:text-slate-400">
        <Icon className="h-4 w-4" /> {title}
      </h3>
      <div className="mt-2.5 min-w-0 space-y-2 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300 [overflow-wrap:anywhere]">{children}</div>
    </section>
  );
}

/** Compact Quick Info metadata tile — label over value, wraps, never overflows. */
function QuickTile({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5 dark:border-slate-700/50 dark:bg-slate-800/40">
      <p className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">{label}</p>
      <div className="mt-1 min-w-0 text-[13.5px] font-semibold leading-snug text-slate-700 dark:text-slate-200 [overflow-wrap:anywhere]">{value}</div>
    </div>
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

/** Categorized blocks for the curated resources — the section a student sees
 *  depends on the resource's kind and official flag:
 *  Official → authoritative vendor docs · Learn → tutorials/courses ·
 *  Deep Dive → in-depth articles/books · Reference → cheat sheets + practice. */
const RESOURCE_CATEGORIES: { id: "OFFICIAL" | "LEARN" | "DEEP" | "REFERENCE"; label: string; icon: React.ElementType; match: (r: Resource) => boolean }[] = [
  {
    id: "OFFICIAL",
    label: "Official Documentation",
    icon: BadgeCheck,
    // authoritative vendor sources — official docs, official courses/training,
    // official certification pages. These get the top, highlighted position.
    match: (r) => r.isOfficial,
  },
  {
    id: "LEARN",
    label: "Learn",
    icon: GraduationCap,
    // tutorials & courses that teach the topic from the ground up
    match: (r) =>
      !r.isOfficial &&
      (r.kind === "course" || r.kind === "video" || r.kind === "tutorial" ||
        r.type === "Beginner Tutorial" || r.type === "Interactive Tutorial" || r.type === "Course"),
  },
  {
    id: "DEEP",
    label: "Deep Dive",
    icon: BookOpen,
    // articles, books, repos, communities and intermediate/advanced guides
    match: (r) =>
      !r.isOfficial &&
      (r.kind === "article" || r.kind === "book" || r.kind === "repo" || r.kind === "community" ||
        r.type === "Intermediate Tutorial" || r.type === "Advanced Guide" || r.type === "Article"),
  },
  {
    id: "REFERENCE",
    label: "Reference & Practice",
    icon: Library,
    // cheat sheets, references and hands-on practice — the "look it up / try it" bucket
    match: (r) =>
      !r.isOfficial &&
      (r.kind === "cheatsheet" || r.kind === "practice" || r.kind === "reference" || r.kind === "certification" ||
        r.type === "Reference Documentation" || r.type === "Cheat Sheet" || r.type === "Practice"),
  },
];

const SEARCH_ICONS: Record<string, React.ElementType> = {
  "Web Search": Search,
  "PDF Search": FileText,
  "Book Search": BookOpen,
  "Study Search": Library,
};

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

/** One selectable certification card — name, provider, level, covers, CTA. */
function CertCard({
  cert,
  selected,
  onSelect,
}: {
  cert: Certification;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "w-full rounded-xl border p-4 text-left transition",
        selected
          ? "border-brand-300 bg-brand-50/70 shadow-sm dark:border-brand-500/50 dark:bg-brand-500/10"
          : "border-slate-100 bg-white hover:border-brand-200 hover:shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 dark:hover:border-brand-500/40"
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base",
            selected ? "bg-brand-500/15 text-brand-600 dark:text-brand-300" : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
          )}
        >
          <Award className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[15px] font-semibold leading-snug text-slate-900 dark:text-white">{cert.name}</p>
            {selected && <BadgeCheck className="h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400" />}
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-slate-500 dark:text-slate-400">
            <span>{cert.provider}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="font-medium text-slate-600 dark:text-slate-300">{cert.level}</span>
            {cert.cost === "Free" && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                <BadgeCheck className="h-3 w-3" /> Free
              </span>
            )}
            {cert.cost === "Paid exam" && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                Paid exam
              </span>
            )}
            {cert.freePrep && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-sky-500/10 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-sky-700 dark:bg-sky-500/20 dark:text-sky-300">
                Free prep
              </span>
            )}
          </p>
          {cert.validates.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {cert.validates.slice(0, 4).map((v) => (
                <span
                  key={v}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-300"
                >
                  {v}
                </span>
              ))}
            </div>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <DiffBadge difficulty={cert.difficulty} />
            <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
              <Clock className="h-3 w-3" /> {cert.prepTime}
            </span>
            <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
              {selected ? "Selected" : "Select"} <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

/** Small link row for preparation / practice resources inside a cert detail. */
function CertLinkRow({ link }: { link: { title: string; url: string; kind: string } }) {
  const Icon = link.kind === "practice" ? Dumbbell : link.kind === "course" ? GraduationCap : BookOpen;
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-white px-3 py-2.5 text-left transition hover:border-brand-200 hover:shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 dark:hover:border-brand-500/40"
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-medium text-slate-800 dark:text-slate-200">{link.title}</span>
      </span>
      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-600" />
    </a>
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
  const [showAllPractice, setShowAllPractice] = useState(false);
  const [showAllLearn, setShowAllLearn] = useState(false);

  // open a tab; used by the header CTAs (e.g. "Practice This Topic")
  const jumpTo = (t: TabId) => setTab(t);

  // ── certifications ─────────────────────────────────────────────────────────
  // The shared catalog is lazy-loaded — fetched only when the Certifications
  // tab is opened for the first time (never on initial page load).
  const [certCatalog, setCertCatalog] = useState<Certification[] | null>(null);
  const [selectedCertId, setSelectedCertId] = useState<string | null>(null);
  const [certFilter, setCertFilter] = useState<{ provider?: string; level?: string }>({});
  useEffect(() => {
    if (tab !== "certifications" || certCatalog) return;
    let alive = true;
    getCertifications()
      .then((certs) => {
        if (alive) setCertCatalog(certs);
      })
      .catch(() => {
        if (alive) setCertCatalog([]);
      });
    return () => {
      alive = false;
    };
  }, [tab, certCatalog]);

  const certIds = useMemo(() => d.certIds ?? [], [d.certIds]);
  // Projects tab is hidden entirely when the node has no projects, and the
  // Certifications tab is hidden when no credential is genuinely relevant — so
  // the panel never shows a hollow section.
  const hasProjects = (d.projects?.length ?? 0) > 0;
  const hasCerts = (d.certIds?.length ?? 0) > 0;
  const certs = useMemo(() => {
    if (!certCatalog) return [];
    const byId = new Map(certCatalog.map((c) => [c.id, c]));
    return certIds.map((id) => byId.get(id)).filter((c): c is Certification => !!c);
  }, [certCatalog, certIds]);

  // reset selection when the node changes
  useEffect(() => {
    setSelectedCertId(certIds[0] ?? null);
    setCertFilter({});
    setShowAllPractice(false);
    setShowAllLearn(false);
  }, [node.id, certIds]);

  const filteredCerts = useMemo(() => {
    if (!certFilter.provider && !certFilter.level) return certs;
    return certs.filter(
      (c) => (!certFilter.provider || c.provider === certFilter.provider) && (!certFilter.level || c.level === certFilter.level)
    );
  }, [certs, certFilter]);

  const providers = useMemo(() => [...new Set(certs.map((c) => c.provider))].sort(), [certs]);
  const levels = useMemo(() => [...new Set(certs.map((c) => c.level))].sort(), [certs]);

  const selectedCert = useMemo(
    () => certs.find((c) => c.id === selectedCertId) ?? certs[0] ?? null,
    [certs, selectedCertId]
  );

  // map cert topics → roadmap node ids so "Relevant roadmap topics" can deep-link.
  // Exact label match first; otherwise a whole-word substring match (cert topic
  // "IAM" → node "IAM & security", "SQL" → "SQL joins").
  const orderLabelMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const o of order) m.set(o.label.toLowerCase().trim(), o.id);
    return m;
  }, [order]);
  const resolveTopicId = useCallback(
    (topic: string) => {
      const t = topic.toLowerCase().trim();
      const exact = orderLabelMap.get(t);
      if (exact) return exact;
      for (const o of order) {
        const l = o.label.toLowerCase();
        if (l.split(/[^a-z0-9]+/).includes(t) || (t.length >= 3 && l.includes(t))) return o.id;
      }
      return null;
    },
    [order, orderLabelMap]
  );
  const relatedCertById = useMemo(() => {
    if (!certCatalog) return new Map<string, Certification>();
    return new Map(certCatalog.map((c) => [c.id, c]));
  }, [certCatalog]);

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

  // curated resources grouped into Official / Learn / Deep Dive / Reference
  const curatedResources = useMemo(() => d.resources.filter((r) => !r.query), [d.resources]);
  const resourceCategories = RESOURCE_CATEGORIES.map((cat) => ({
    ...cat,
    items: curatedResources.filter((r) => cat.match(r)),
  })).filter((cat) => cat.items.length > 0);
  // the primary PDF search — a single compact featured action, not a card grid
  const pdfSearch = searchOptions.find((r) => r.type === "PDF Search");
  const otherSearches = searchOptions.filter((r) => r.type !== "PDF Search");

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

  const enter = desktop ? { x: 560, opacity: 0.4 } : { y: "100%", opacity: 0.8 };
  const leave = desktop ? { x: 560, opacity: 0 } : { y: "100%", opacity: 0 };

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

      {/* primary CTAs — Learn / Practice first on every screen; secondary
          actions (mark done, subtree, bookmark) sit on their own row */}
      <div className="flex gap-2 px-4 pb-2 sm:px-5">
        <Button
          size="sm"
          className="min-w-0 flex-1 whitespace-normal min-h-[48px] text-[15px] leading-tight"
          onClick={() => jumpTo("resources")}
        >
          <GraduationCap className="h-4 w-4 shrink-0" /> Learn this topic
        </Button>
        <Button
          size="sm"
          className="min-w-0 flex-1 whitespace-normal min-h-[48px] text-[15px] leading-tight"
          onClick={() => jumpTo("practice")}
        >
          <PlayCircle className="h-4 w-4 shrink-0" /> Practice this topic
        </Button>
      </div>

      {/* secondary actions */}
      <div className="flex flex-wrap gap-2 px-4 pb-3 sm:px-5">
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

      {/* tabs — single Radix root, shared with the content below via `tab` state */}
      <div className="px-3 pb-3">
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabId)} className="w-full">
          {/* only render tabs that have content: Projects and Certifications are
              hidden entirely when empty so the panel never shows hollow sections */}
          <TabsList className="flex w-full overflow-x-auto [scrollbar-width:none]">
            <TabsTrigger value="overview" className="min-w-[72px] flex-1 px-1 text-xs sm:text-[13px]">Overview</TabsTrigger>
            <TabsTrigger value="resources" className="min-w-[72px] flex-1 px-1 text-xs sm:text-[13px]">
              Resources{d.resources.length > 0 && <span className="text-slate-400"> ({d.resources.length})</span>}
            </TabsTrigger>
            <TabsTrigger value="practice" className="min-w-[72px] flex-1 px-1 text-xs sm:text-[13px]">
              Practice{d.practice.length > 0 && <span className="text-slate-400"> ({d.practice.length})</span>}
            </TabsTrigger>
            {hasProjects && (
              <TabsTrigger value="projects" className="min-w-[72px] flex-1 px-1 text-xs sm:text-[13px]">
                Projects{d.projects.length > 0 && <span className="text-slate-400"> ({d.projects.length})</span>}
              </TabsTrigger>
            )}
            {hasCerts && (
              <TabsTrigger value="certifications" className="min-w-[72px] flex-1 px-1 text-xs sm:text-[13px]">
                Certifications{certs.length > 0 && <span className="text-slate-400"> ({certs.length})</span>}
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );

  const ov = d.overview;
  const overviewContent = (
    <div className="pb-2">
      {/* What is it? — the structured overview replaces the long paragraph.
          Mobile flow is always single-column in the learning order: What is it →
          What you'll learn → Why it matters → How it helps → Prerequisites →
          Quick Info. At lg the same blocks pair into two columns via grid
          placement (left: What is it + Why it matters + How it helps +
          Prerequisites; right: What you'll learn + Quick Info). */}
      {ov ? (
        <>
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-6 lg:px-5 lg:pt-4">
            {/* What is it? */}
            <div className="lg:col-start-1 lg:row-start-1 lg:min-w-0">
              <Section compact icon={BookOpen} title="What is it?" className="lg:border-0 lg:px-0 lg:pt-0">
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">{ov.whatIsIt}</p>
              </Section>
            </div>

            {/* What you'll learn — collapsible list; right column on desktop */}
            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:min-w-0">
              {ov.youWillLearn.length > 0 && (
                <Section
                  compact
                  icon={Target}
                  title={ov.youWillLearn.length > 4 ? `What you'll learn (${ov.youWillLearn.length})` : "What you'll learn"}
                  className="lg:border-0 lg:px-0 lg:pt-0"
                >
                  <ul className="space-y-2">
                    {(showAllLearn ? ov.youWillLearn : ov.youWillLearn.slice(0, 4)).map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-[14.5px] leading-snug">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        <span className="min-w-0 [overflow-wrap:anywhere]">{w}</span>
                      </li>
                    ))}
                  </ul>
                  {ov.youWillLearn.length > 4 && (
                    <button
                      onClick={() => setShowAllLearn((v) => !v)}
                      className="mt-2.5 inline-flex items-center gap-1 rounded-md py-1 text-[13.5px] font-semibold text-brand-600 transition hover:text-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:text-brand-400 dark:hover:text-brand-300"
                    >
                      {showAllLearn ? "Show less" : `Show ${ov.youWillLearn.length - 4} more`}
                      <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", showAllLearn && "rotate-90")} />
                    </button>
                  )}
                </Section>
              )}
            </div>

            {/* Why it matters */}
            <div className="lg:col-start-1 lg:row-start-2 lg:min-w-0">
              {ov.whyMatters.length > 0 && (
                <Section compact icon={Lightbulb} title="Why it matters" className="lg:border-0 lg:px-0">
                  <ul className="space-y-1.5">
                    {ov.whyMatters.slice(0, 4).map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-[14px] leading-snug">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        <span className="min-w-0 [overflow-wrap:anywhere]">{w}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </div>

            {/* How it helps */}
            <div className="lg:col-start-1 lg:row-start-3 lg:min-w-0">
              <Section compact icon={GraduationCap} title="How it helps" className="lg:border-0 lg:px-0">
                <p className="rounded-xl border border-emerald-200/70 bg-emerald-50 px-3.5 py-2.5 text-[14px] leading-relaxed text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                  {ov.outcome}
                </p>
                {ov.whereUsed.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ov.whereUsed.slice(0, 8).map((w, i) => (
                      <span key={i} className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[12.5px] font-medium text-slate-600 dark:border-slate-600 dark:text-slate-300">
                        {w}
                      </span>
                    ))}
                  </div>
                )}
              </Section>
            </div>

            {/* Prerequisites */}
            <div className="lg:col-start-1 lg:row-start-4 lg:min-w-0">
              {ov.prerequisites.length > 0 && (
                <Section compact icon={Lock} title="Prerequisites" className="lg:border-0 lg:px-0">
                  <div className="flex flex-wrap gap-1.5">
                    {ov.prerequisites.slice(0, 6).map((p, i) => (
                      <span key={i} className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[12.5px] font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                        <ChevronRight className="h-3 w-3 text-slate-300 dark:text-slate-500" />
                        {p}
                      </span>
                    ))}
                  </div>
                </Section>
              )}
            </div>

            {/* Quick Info — 2×2 metadata grid; right column on desktop */}
            <div className="lg:col-start-2 lg:row-start-3 lg:min-w-0">
              <div className="px-4 py-3 sm:px-5 lg:px-0 lg:py-0">
                <div className="grid grid-cols-2 gap-2.5">
                  <QuickTile label="Difficulty" value={<DiffBadge difficulty={d.difficulty} />} />
                  <QuickTile label="Level" value={<span className="capitalize">{meta.label}</span>} />
                  <QuickTile label="Time" value={d.estimatedTime} />
                  <QuickTile
                    label="Progress"
                    value={learnable.length > 0 ? `${doneCount}/${learnable.length} · ${nodePct}%` : "—"}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Section icon={BookOpen} title="Overview">
          <p className="text-[15px] leading-relaxed">{d.description}</p>
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
          <p className="rounded-xl border border-brand-200/70 bg-brand-50 p-3.5 text-brand-900 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-200 text-[15px] sm:text-[14px]">
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
                  className="rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-[14px] sm:text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-200"
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
      {/* curated resources — Official / Learn / Deep Dive / Reference */}
      {resourceCategories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center dark:border-slate-700">
          <BookOpen className="mx-auto h-7 w-7 text-slate-300 dark:text-slate-600" />
          <p className="mt-2 text-[15px] font-semibold text-slate-700 dark:text-slate-200">No curated resources yet</p>
          <p className="mx-auto mt-1 max-w-xs text-[13px] text-slate-500 dark:text-slate-400">
            We verify every curated link by hand — a match for this topic has not been added yet. Use the PDF search below to find material now.
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
                <ResourceRow key={r.url} r={r} highlight={cat.id === "OFFICIAL" && i === 0} />
              ))}
            </div>
          </div>
        ))
      )}

      {/* PDF study material — one compact featured action (never a dense grid) */}
      {pdfSearch && (
        <div className="rounded-xl border border-brand-200 bg-brand-50/60 p-4 dark:border-brand-500/30 dark:bg-brand-500/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-[14px] font-bold text-slate-900 dark:text-white">
                <FileText className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Find PDF study material
              </p>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">
                Topic-specific lecture notes, textbooks, study guides and technical PDFs.
              </p>
            </div>
            <a
              href={pdfSearch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-500"
            >
              <FileText className="h-4 w-4" /> Find PDF notes
            </a>
          </div>
          {pdfSearch.query && (
            <p className="mt-2.5 truncate rounded-md bg-white/70 px-2.5 py-1 font-mono text-[11px] text-slate-500 dark:bg-slate-900/50 dark:text-slate-400" title={pdfSearch.query}>
              {pdfSearch.query}
            </p>
          )}
        </div>
      )}

      {/* secondary study searches — web / books — small text links, not cards */}
      {otherSearches.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {otherSearches.map((r) => {
            const Icon = SEARCH_ICONS[r.type] ?? Search;
            return (
              <a
                key={r.title}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:text-brand-300"
              >
                <Icon className="h-3.5 w-3.5" /> {r.title.replace(/ Search$/, "")}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );

  const practiceContent = (
    <div className="p-4 sm:p-5">
      {d.practice.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-700">
          <Dumbbell className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="mt-3 text-[15px] font-semibold text-slate-700 dark:text-slate-200">
            No verified practice activity for this topic yet
          </p>
          <p className="mx-auto mt-1 max-w-sm text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
            No topic-specific practice platform has been verified for this topic. Use the Resources tab and its study
            searches to keep learning in the meantime.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">Practice this topic</p>
          {(showAllPractice ? d.practice : d.practice.slice(0, 4)).map((item, i) => (
            <PracticeRow key={i} item={item} />
          ))}
          {d.practice.length > 4 && (
            <button
              onClick={() => setShowAllPractice((v) => !v)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px] font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-600 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:text-brand-300"
            >
              {showAllPractice ? "Show fewer" : `View ${d.practice.length - 4} more`}
            </button>
          )}
        </div>
      )}
    </div>
  );

  const projectsContent = (
    <div className="p-4 sm:p-5 space-y-4">
      <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
        Build these to apply {node.label.toLowerCase()} in practice — each brief lists the skills it exercises and what a finished project looks like.
      </p>
      <div className="space-y-3.5">
        {d.projects.map((p, i) => (
          <article
            key={i}
            className="rounded-xl border border-emerald-200/70 bg-white p-4 dark:border-emerald-500/20 dark:bg-slate-800/60"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="flex min-w-0 items-center gap-2 text-[15px] font-semibold text-slate-900 dark:text-white">
                <span className="font-mono text-[11px] rounded-full bg-emerald-100 px-1.5 py-0.5 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p.title}
              </p>
              <Badge
                variant={p.difficulty === "Beginner" ? "success" : p.difficulty === "Advanced" ? "danger" : "warning"}
                className="shrink-0 text-[10.5px]"
              >
                {p.difficulty ?? "Intermediate"}
              </Badge>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">{p.description}</p>
            <div className="mt-3 grid grid-cols-1 gap-2 text-[13px] sm:grid-cols-2">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                <span>Estimated: <b className="text-slate-700 dark:text-slate-200">{p.duration}</b></span>
              </div>
              {p.difficulty && (
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <Target className="h-3.5 w-3.5" />
                  <span>Difficulty: <b className="text-slate-700 dark:text-slate-200">{p.difficulty}</b></span>
                </div>
              )}
            </div>
            {p.skills && p.skills.length > 0 && (
              <div className="mt-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Skills practiced</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {p.goal && (
              <div className="mt-3 rounded-lg border border-emerald-200/60 bg-emerald-50/60 px-3 py-2.5 text-[13px] leading-relaxed text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                <b>Goal:</b> {p.goal}
              </div>
            )}
            {p.requirements && p.requirements.length > 0 && (
              <div className="mt-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Key requirements</p>
                <ul className="mt-1.5 space-y-1">
                  {p.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-[13px] text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {p.outcomes && p.outcomes.length > 0 && (
              <div className="mt-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Expected outcome</p>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">{p.outcomes[0]}</p>
              </div>
            )}
            {p.extensions && p.extensions.length > 0 && (
              <div className="mt-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Optional extension</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.extensions.map((e) => (
                    <span
                      key={e}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );

  const certificationsContent = (
    <div className="p-4 sm:p-5 space-y-4">
      {certs.length === 0 ? (
        /* no widely recognized certification for this node — never invent one */
        <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-700">
          <Award className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="mt-3 text-[15px] font-semibold text-slate-700 dark:text-slate-200">
            No widely recognized certification is specifically dedicated to this topic
          </p>
          <p className="mx-auto mt-1 max-w-sm text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
            {node.type === "career" || node.type === "topic"
              ? "This area is validated by demonstrated skill and portfolio work rather than a single credential. Keep building projects and deepening the topics above."
              : "Some topics are assessed through the roadmap's full certification path rather than a dedicated exam. Keep working through the roadmap."}
          </p>
        </div>
      ) : certCatalog === null ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
        </div>
      ) : (
        <>
          {/* provider / level filters — only when there is a meaningful choice */}
          {(providers.length > 1 || levels.length > 1) && (
            <div className="space-y-2">
              {providers.length > 1 && (
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setCertFilter((f) => ({ ...f, provider: undefined }))}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                      !certFilter.provider
                        ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-500/50 dark:bg-brand-500/10 dark:text-brand-300"
                        : "border-slate-200 text-slate-500 hover:border-brand-200 dark:border-slate-700 dark:text-slate-400"
                    )}
                  >
                    All providers
                  </button>
                  {providers.map((p) => (
                    <button
                      key={p}
                      onClick={() => setCertFilter((f) => ({ ...f, provider: f.provider === p ? undefined : p }))}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition min-h-[32px]",
                        certFilter.provider === p
                          ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-500/50 dark:bg-brand-500/10 dark:text-brand-300"
                          : "border-slate-200 text-slate-500 hover:border-brand-200 dark:border-slate-700 dark:text-slate-400"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
              {levels.length > 1 && (
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setCertFilter((f) => ({ ...f, level: undefined }))}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition min-h-[32px]",
                      !certFilter.level
                        ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-500/50 dark:bg-brand-500/10 dark:text-brand-300"
                        : "border-slate-200 text-slate-500 hover:border-brand-200 dark:border-slate-700 dark:text-slate-400"
                    )}
                  >
                    All levels
                  </button>
                  {levels.map((l) => (
                    <button
                      key={l}
                      onClick={() => setCertFilter((f) => ({ ...f, level: f.level === l ? undefined : l }))}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition min-h-[32px]",
                        certFilter.level === l
                          ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-500/50 dark:bg-brand-500/10 dark:text-brand-300"
                          : "border-slate-200 text-slate-500 hover:border-brand-200 dark:border-slate-700 dark:text-slate-400"
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* choose a certification */}
          <p className="text-[13px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            {filteredCerts.length > 1 ? "Choose a certification" : "Recommended certification"}
          </p>
          <div className="space-y-2.5">
            {filteredCerts.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-200 px-4 py-3 text-[13px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No certifications match these filters.
              </p>
            ) : (
              filteredCerts.map((c) => (
                <CertCard
                  key={c.id}
                  cert={c}
                  selected={selectedCert?.id === c.id}
                  onSelect={() => setSelectedCertId(c.id)}
                />
              ))
            )}
          </div>

          {/* selected certification detail — why / who / when / learn-first / prep */}
          {selectedCert && (
            <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-700/60 dark:bg-slate-800/40">
              <h4 className="flex items-center gap-2 text-[14px] font-bold text-slate-900 dark:text-white">
                <BadgeCheck className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Why this certification
              </h4>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">{selectedCert.what}</p>

              <dl className="mt-3 space-y-2.5 text-[13.5px]">
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-semibold text-slate-500 dark:text-slate-400">Who it&apos;s for</dt>
                  <dd className="min-w-0 text-slate-700 [overflow-wrap:anywhere] dark:text-slate-200">{selectedCert.who}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-semibold text-slate-500 dark:text-slate-400">When to take</dt>
                  <dd className="min-w-0 text-slate-700 [overflow-wrap:anywhere] dark:text-slate-200">{selectedCert.when}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-semibold text-slate-500 dark:text-slate-400">Learn first</dt>
                  <dd className="min-w-0 text-slate-700 [overflow-wrap:anywhere] dark:text-slate-200">{selectedCert.learnFirst}</dd>
                </div>
              </dl>

              {selectedCert.validates.length > 0 && (
                <div className="mt-3">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Skills validated
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {selectedCert.validates.map((v) => (
                      <span
                        key={v}
                        className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-300"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* career roles */}
              {selectedCert.roles.length > 0 && (
                <div className="mt-3">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Recommended for
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {selectedCert.roles.map((r) => (
                      <span
                        key={r}
                        className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* prerequisites + exam */}
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {selectedCert.prerequisites.length > 0 && (
                  <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/60">
                    <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      Prerequisites
                    </p>
                    <ul className="mt-1 space-y-1 text-[12.5px] text-slate-600 dark:text-slate-300">
                      {selectedCert.prerequisites.map((p) => (
                        <li key={p} className="flex items-start gap-1.5">
                          <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-slate-300 dark:text-slate-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/60">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Exam & level
                  </p>
                  <p className="mt-1 text-[12.5px] text-slate-600 [overflow-wrap:anywhere] dark:text-slate-300">{selectedCert.examName}</p>
                  <p className="mt-1 text-[12.5px] text-slate-600 [overflow-wrap:anywhere] dark:text-slate-300">{selectedCert.level} · {selectedCert.difficulty}</p>
                  <p className="mt-1 text-[12.5px] text-slate-600 [overflow-wrap:anywhere] dark:text-slate-300">{selectedCert.prepTime} preparation</p>
                  <p className="mt-1.5 flex flex-wrap gap-1">
                    {selectedCert.cost === "Free" ? (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                        Free certification
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                        Exam paid
                      </span>
                    )}
                    {selectedCert.freePrep && (
                      <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-sky-700 dark:bg-sky-500/20 dark:text-sky-300">
                        Free preparation available
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-[11px] italic text-slate-400 dark:text-slate-500">
                    Visit official provider for current exam details.
                  </p>
                </div>
              </div>

              {/* relevant roadmap topics — deep-link into the mindmap */}
              {selectedCert.topics.length > 0 && (
                <div className="mt-3">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Relevant roadmap topics
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {selectedCert.topics.map((t) => {
                      const linkedId = resolveTopicId(t);
                      return linkedId ? (
                        <button
                          key={t}
                          onClick={() => onNavigate(linkedId)}
                          className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 transition hover:border-brand-300 hover:bg-brand-100 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20"
                        >
                          {t} <ChevronRight className="h-3 w-3" />
                        </button>
                      ) : (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 dark:border-slate-600 dark:text-slate-400"
                        >
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* preparation + practice resources */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Preparation resources
                  </p>
                  <div className="mt-1.5 space-y-1.5">
                    {selectedCert.prep.length > 0 ? (
                      selectedCert.prep.map((l) => <CertLinkRow key={l.url} link={l} />)
                    ) : (
                      <p className="text-[12.5px] text-slate-400 dark:text-slate-500">Official materials not listed — see the provider page.</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Practice resources
                  </p>
                  <div className="mt-1.5 space-y-1.5">
                    {selectedCert.practice.length > 0 ? (
                      selectedCert.practice.map((l) => <CertLinkRow key={l.url} link={l} />)
                    ) : (
                      <p className="text-[12.5px] text-slate-400 dark:text-slate-500">Official practice exams open from the provider page.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* related certifications */}
              {selectedCert.related.length > 0 && (
                <div className="mt-4">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Related certifications
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {selectedCert.related.map((rid) => {
                      const rel = relatedCertById.get(rid);
                      if (!rel) return null;
                      return (
                        <button
                          key={rid}
                          onClick={() => setSelectedCertId(rid)}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-600 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
                        >
                          {rel.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* official page CTA */}
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={selectedCert.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500"
                >
                  <ExternalLink className="h-4 w-4" /> Official details
                </a>
                {selectedCert.prep[0] && (
                  <a
                    href={selectedCert.prep[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-600 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
                  >
                    <GraduationCap className="h-4 w-4" /> Exam info
                  </a>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  const scrollContent = (
    <div className="min-w-0 flex-1 nice-scroll overflow-x-hidden text-[15px] sm:text-[14px]">
      {fullDetails === null ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
        </div>
      ) : (
        <>
          {tab === "overview" && overviewContent}
          {tab === "resources" && resourcesContent}
          {tab === "practice" && practiceContent}
          {tab === "projects" && hasProjects && projectsContent}
          {tab === "certifications" && hasCerts && certificationsContent}
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
            {/* plain scroll container — Radix ScrollArea's display:table viewport grows to
                content min-content and clips truncating rows at narrow widths */}
            <div
              className="nice-scroll min-w-0 flex-1 overflow-y-auto overflow-x-hidden"
              style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "contain" }}
            >
              {scrollContent}
            </div>
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
        className="fixed right-0 top-16 bottom-0 z-40 flex w-full max-w-[560px] flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
        role="dialog"
        aria-label={`${node.label} details`}
      >
        {headerContent}
        <div className="nice-scroll min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          {scrollContent}
        </div>
        {footer}
      </motion.aside>
    </AnimatePresence>
  );
});
