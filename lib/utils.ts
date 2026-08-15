import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { NodeType, ResourceKind } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatHours(hours: number) {
  if (hours >= 1000) return `${(hours / 1000).toFixed(1)}k+ hrs`;
  return `${hours} hrs`;
}

export function formatDate(ts: string | number) {
  // Date-only strings ("2026-08-03") must be parsed as LOCAL dates — `new
  // Date("2026-08-03")` treats them as UTC midnight, so in a timezone behind
  // UTC the server (usually UTC) renders "Aug 3" while the client renders
  // "Aug 2": a hydration mismatch on every load. Parsing the parts as local
  // keeps both sides on the same calendar day regardless of timezone.
  let d: Date;
  if (typeof ts === "string" && /^\d{4}-\d{2}-\d{2}$/.test(ts)) {
    const [y, m, day] = ts.split("-").map(Number);
    d = new Date(y, m - 1, day);
  } else {
    d = new Date(ts);
  }
  if (isNaN(d.getTime())) return "recently";
  // Fixed locale (not `undefined`) so server (Node) and client (browser)
  // render identical output — a locale-dependent format caused a React
  // hydration mismatch on every homepage load.
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  // Fixed locale so server (Node) and client render identical output.
  return new Date(ts).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

// ── Node type → small emoji icon (shown at the left of every node card) ─────
export function typeEmoji(type: NodeType) {
  switch (type) {
    case "career":
      return "🚀";
    case "section":
      return "📦";
    case "subsection":
      return "🧩";
    case "topic":
      return "📘";
    case "concept":
      return "💡";
    case "projects":
      return "🛠️";
    case "project":
      return "🧱";
    case "optional":
      return "🌟";
    case "advanced":
      return "⚡";
    case "interview":
      return "🎯";
    case "achievement":
      return "🎓";
    case "choice":
      return "🔀";
    default:
      return "📘";
  }
}

// ── Node type → visual identity (compact, roadmap.sh-style hierarchy) ───────
// Cards are slim single-row surfaces: a thin left accent bar, muted tinted
// background, subtle gradient and quiet text. Saturation is kept low so the
// canvas reads calm at density; type is encoded by hue + accent, never by
// loud fills. Career is the single hero card (royal blue).
// Completed = green border + check, Locked = muted gray.
//   card       — surface + border + shadow
//   titleSize  — heading font size (career largest → leaf compact)
//   accent     — left accent bar color
//   muted      — description / metadata color
//   pill       — in-card metadata chip
//   bar        — action button bg/hover
//   chip       — outside pills (legend…)
//   text/ring  — legacy label/focus tokens
export const NODE_TYPE_META: Record<
  NodeType,
  {
    label: string;
    card: string;
    chip: string;
    text: string;
    ring: string;
    muted: string;
    pill: string;
    bar: string;
    titleSize: string;
    accent: string;
  }
> = {
  career: {
    label: "Career",
    card: "border-blue-600/30 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-[0_4px_14px_-10px_rgba(37,99,235,.55)]",
    chip: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200",
    text: "text-white",
    ring: "ring-blue-400",
    muted: "text-blue-100/80",
    pill: "bg-white/15 text-white",
    bar: "bg-white/15 text-white hover:bg-white/25",
    titleSize: "text-[15px]",
    accent: "bg-blue-300/90",
  },
  section: {
    label: "Section",
    card: "border-amber-500/25 bg-gradient-to-b from-amber-50 to-amber-100/60 text-amber-950 dark:border-amber-500/20 dark:from-amber-900/50 dark:to-amber-900/25 dark:text-amber-50",
    chip: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200",
    text: "text-amber-950 dark:text-amber-50",
    ring: "ring-amber-400",
    muted: "text-amber-800/70 dark:text-amber-200/70",
    pill: "bg-amber-100/80 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200",
    bar: "bg-amber-100/70 text-amber-800 hover:bg-amber-200/80 dark:bg-amber-900/40 dark:text-amber-200 dark:hover:bg-amber-800/60",
    titleSize: "text-[15px]",
    accent: "bg-amber-500",
  },
  subsection: {
    label: "Module",
    card: "border-stone-200 bg-gradient-to-b from-[#fbf8f1] to-[#f4eee1] text-stone-800 dark:border-stone-700 dark:from-stone-800 dark:to-stone-800/50 dark:text-stone-100",
    chip: "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-200",
    text: "text-stone-800 dark:text-stone-100",
    ring: "ring-stone-400",
    muted: "text-stone-500/80 dark:text-stone-300/70",
    pill: "bg-stone-200/70 text-stone-700 dark:bg-stone-700/60 dark:text-stone-200",
    bar: "bg-stone-200/60 text-stone-700 hover:bg-stone-300/70 dark:bg-stone-700/50 dark:text-stone-200 dark:hover:bg-stone-600/60",
    titleSize: "text-[16px]",
    accent: "bg-fuchsia-400 dark:bg-fuchsia-500",
  },
  choice: {
    label: "Choice",
    card: "border-indigo-200 bg-gradient-to-b from-indigo-50 to-indigo-100/60 text-indigo-900 dark:border-indigo-800/40 dark:from-indigo-900/50 dark:to-indigo-900/30 dark:text-indigo-100",
    chip: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300",
    text: "text-indigo-900 dark:text-indigo-100",
    ring: "ring-indigo-400",
    muted: "text-indigo-600/80 dark:text-indigo-300/80",
    pill: "bg-indigo-200/60 text-indigo-800 dark:bg-indigo-800/60 dark:text-indigo-200",
    bar: "bg-indigo-200/50 text-indigo-800 hover:bg-indigo-300/70 dark:bg-indigo-800/50 dark:text-indigo-200 dark:hover:bg-indigo-700/60",
    titleSize: "text-[14px]",
    accent: "bg-indigo-400 dark:bg-indigo-500",
  },
  topic: {
    label: "Topic",
    card: "border-slate-200 bg-white text-slate-800 shadow-[0_1px_3px_-1px_rgba(15,23,42,.06)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",
    chip: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200",
    text: "text-slate-800 dark:text-slate-100",
    ring: "ring-brand-400",
    muted: "text-slate-500 dark:text-slate-400",
    pill: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
    bar: "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600",
    titleSize: "text-[14px]",
    accent: "bg-slate-300 dark:bg-slate-500",
  },
  concept: {
    label: "Lesson",
    card: "border-violet-500/20 bg-violet-50/70 text-violet-900 dark:border-violet-500/20 dark:bg-violet-950/40 dark:text-violet-100",
    chip: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-200",
    text: "text-violet-900 dark:text-violet-100",
    ring: "ring-violet-400",
    muted: "text-violet-800/70 dark:text-violet-200/70",
    pill: "bg-violet-100/80 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200",
    bar: "bg-violet-100/70 text-violet-800 hover:bg-violet-200/80 dark:bg-violet-900/40 dark:text-violet-200 dark:hover:bg-violet-800/60",
    titleSize: "text-[14px]",
    accent: "bg-violet-400",
  },
  projects: {
    label: "Projects",
    card: "border-emerald-500/25 bg-emerald-50/70 text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-100",
    chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
    text: "text-emerald-900 dark:text-emerald-100",
    ring: "ring-emerald-400",
    muted: "text-emerald-800/70 dark:text-emerald-200/70",
    pill: "bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
    bar: "bg-emerald-100/70 text-emerald-800 hover:bg-emerald-200/80 dark:bg-emerald-900/40 dark:text-emerald-200 dark:hover:bg-emerald-800/60",
    titleSize: "text-[14px]",
    accent: "bg-emerald-500",
  },
  project: {
    label: "Project",
    card: "border-emerald-600/25 bg-gradient-to-b from-emerald-50 to-emerald-100/60 text-emerald-900 dark:border-emerald-500/20 dark:from-emerald-950/50 dark:to-emerald-900/30 dark:text-emerald-100",
    chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
    text: "text-emerald-900 dark:text-emerald-100",
    ring: "ring-emerald-400",
    muted: "text-emerald-800/70 dark:text-emerald-200/70",
    pill: "bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
    bar: "bg-emerald-100/70 text-emerald-800 hover:bg-emerald-200/80 dark:bg-emerald-900/40 dark:text-emerald-200 dark:hover:bg-emerald-800/60",
    titleSize: "text-[14px]",
    accent: "bg-emerald-500",
  },
  optional: {
    label: "Optional",
    card: "border-purple-500/20 bg-purple-50/60 text-purple-900 dark:border-purple-500/20 dark:bg-purple-950/35 dark:text-purple-100",
    chip: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-200",
    text: "text-purple-900 dark:text-purple-100",
    ring: "ring-purple-400",
    muted: "text-purple-800/70 dark:text-purple-200/70",
    pill: "bg-purple-100/80 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200",
    bar: "bg-purple-100/70 text-purple-800 hover:bg-purple-200/80 dark:bg-purple-900/40 dark:text-purple-200 dark:hover:bg-purple-800/60",
    titleSize: "text-[13px]",
    accent: "bg-purple-400",
  },
  advanced: {
    label: "Advanced",
    card: "border-orange-500/20 bg-orange-50/60 text-orange-900 dark:border-orange-500/20 dark:bg-orange-950/35 dark:text-orange-100",
    chip: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-200",
    text: "text-orange-900 dark:text-orange-100",
    ring: "ring-orange-400",
    muted: "text-orange-800/70 dark:text-orange-200/70",
    pill: "bg-orange-100/80 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200",
    bar: "bg-orange-100/70 text-orange-800 hover:bg-orange-200/80 dark:bg-orange-900/40 dark:text-orange-200 dark:hover:bg-orange-800/60",
    titleSize: "text-[13px]",
    accent: "bg-orange-400",
  },
  interview: {
    label: "Interview",
    card: "border-rose-500/20 bg-rose-50/60 text-rose-900 dark:border-rose-500/20 dark:bg-rose-950/35 dark:text-rose-100",
    chip: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-200",
    text: "text-rose-900 dark:text-rose-100",
    ring: "ring-rose-400",
    muted: "text-rose-800/70 dark:text-rose-200/70",
    pill: "bg-rose-100/80 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
    bar: "bg-rose-100/70 text-rose-800 hover:bg-rose-200/80 dark:bg-rose-900/40 dark:text-rose-200 dark:hover:bg-rose-800/60",
    titleSize: "text-[13px]",
    accent: "bg-rose-500",
  },
  achievement: {
    label: "Career Ready",
    card: "border-cyan-500/25 bg-gradient-to-b from-cyan-50 to-teal-50/70 text-cyan-900 dark:border-cyan-500/20 dark:from-cyan-950/45 dark:to-teal-950/30 dark:text-cyan-100",
    chip: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200",
    text: "text-cyan-900 dark:text-cyan-100",
    ring: "ring-cyan-400",
    muted: "text-cyan-800/70 dark:text-cyan-200/70",
    pill: "bg-cyan-100/80 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200",
    bar: "bg-cyan-100/70 text-cyan-800 hover:bg-cyan-200/80 dark:bg-cyan-900/40 dark:text-cyan-200 dark:hover:bg-cyan-800/60",
    titleSize: "text-[14px]",
    accent: "bg-cyan-500",
  },
};

export function nodeMeta(type: NodeType) {
  return NODE_TYPE_META[type] ?? NODE_TYPE_META.topic;
}

export function isContainer(type: NodeType) {
  return ["section", "subsection", "projects"].includes(type);
}

// Node types that carry a completion checkbox and count toward progress —
// exactly the set tree-layout's collectLearnableIds uses. Container nodes
// (sections, subsection, projects and choice) never get marked complete;
// marking their subtree is handled by the details panel's "mark subtree".
export function isCheckableType(type: NodeType) {
  return !["section", "subsection", "projects", "choice"].includes(type);
}

// ── Resource kind → label & icon style ───────────────────────────────────────
export const RESOURCE_KIND_META: Record<ResourceKind, { label: string; dot: string }> = {
  docs: { label: "Official docs", dot: "bg-blue-500" },
  course: { label: "Course", dot: "bg-emerald-500" },
  video: { label: "Video", dot: "bg-rose-500" },
  article: { label: "Article", dot: "bg-amber-500" },
  book: { label: "Book", dot: "bg-purple-500" },
  practice: { label: "Practice", dot: "bg-teal-500" },
  cheatsheet: { label: "Cheat sheet", dot: "bg-orange-500" },
  repo: { label: "Repo", dot: "bg-slate-500" },
  community: { label: "Community", dot: "bg-pink-500" },
  certification: { label: "Certification", dot: "bg-indigo-500" },
  search: { label: "Search", dot: "bg-cyan-500" },
  tutorial: { label: "Tutorial", dot: "bg-emerald-500" },
  reference: { label: "Reference", dot: "bg-sky-500" },
  guide: { label: "Guide", dot: "bg-violet-500" },
  paper: { label: "Paper", dot: "bg-slate-500" },
  project: { label: "Project", dot: "bg-teal-500" },
  template: { label: "Template", dot: "bg-fuchsia-500" },
};

export function resourceKind(kind: ResourceKind) {
  return RESOURCE_KIND_META[kind] ?? { label: kind, dot: "bg-slate-400" };
}

// ── search scoring ───────────────────────────────────────────────────────────
export function scoreMatch(title: string, keywords: string[], q: string) {
  const query = q.toLowerCase().trim();
  if (!query) return 0;
  const titleLower = title.toLowerCase();
  if (titleLower === query) return 100;
  if (titleLower.startsWith(query)) return 90;
  if (titleLower.includes(query)) return 80;
  let best = 0;
  for (const kw of keywords) {
    const k = kw.toLowerCase();
    if (k === query) return 95;
    if (k.startsWith(query)) best = Math.max(best, 70);
    else if (k.includes(query)) best = Math.max(best, 55);
  }
  return best;
}
