"use client";

import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Drawer } from "vaul";
import {
  Check,
  CheckCircle2,
  ListChecks,
  BookOpen,
  Target,
  Award,
  FolderKanban,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  X,
  Clock,
  Lock,
  ChevronRight,
  Dumbbell,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  PlayCircle,
  BadgeCheck,
  Search,
  FileText,
  Library,
  Layers,
  Sparkles,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { cn, nodeMeta, resourceKind, typeEmoji, isCheckableType } from "@/lib/utils";
import { generateSearchOptions } from "@/lib/search-utils";
import { useTopicDetails, type AncestorRef } from "@/lib/topic-details";
import type { CertificationView, PracticeItem, ProjectRef, Resource, RoadmapNode } from "@/lib/types";
import { collectLearnableIds } from "@/lib/mindmap/tree-layout";
import { useProgressStore } from "@/lib/stores/progress-store";
import { useUiStore } from "@/lib/stores/ui-store";
import { useBookmarksStore } from "@/lib/stores/bookmarks-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  node: RoadmapNode;
  roadmapSlug: string;
  roadmapTitle: string;
  /** full-tree DFS order so we can offer prev/next navigation */
  order: { id: string; label: string }[];
  /** nearest-first ancestor chain for dataset resolution */
  ancestors: AncestorRef[];
  /** sibling nodes (related topics) */
  siblings: RoadmapNode[];
  onClose: () => void;
  onNavigate: (id: string) => void;
  onMarkSubtree: () => void;
}

type TabId = "overview" | "resources" | "practice" | "projects" | "certifications";

/** Phone: each tab sizes to its own label and the strip scrolls, so nothing is
 *  sliced mid-word. Tablet and up: the tabs share the row evenly again. */
const TAB_CLS =
  "shrink-0 snap-start whitespace-nowrap px-3 text-xs sm:min-w-[72px] sm:flex-1 sm:shrink sm:px-1 sm:text-[13px]";

// ── Shared atoms ─────────────────────────────────────────────────────────────

function Section({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-slate-100 px-4 py-4 sm:px-5 dark:border-slate-700/50", className)}>
      <h3 className="flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-[0.09em] text-slate-500 dark:text-slate-400">
        <Icon className="h-4 w-4" /> {title}
      </h3>
      <div className="mt-2.5 min-w-0 space-y-2 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300 [overflow-wrap:anywhere]">{children}</div>
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
    difficulty === "Beginner" ? "success" : difficulty === "Advanced" || difficulty === "Expert" ? "danger" : "warning";
  return <Badge variant={variant as "success" | "warning" | "danger"}>{difficulty}</Badge>;
}

const SCOPE_META: Record<string, { label: string; cls: string }> = {
  parent: { label: "From parent topic", cls: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300" },
  skill: { label: "Roadmap-level pick", cls: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300" },
  career: { label: "Career-level", cls: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300" },
  discovery: { label: "Discovery resource", cls: "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-600 dark:bg-slate-700/40 dark:text-slate-300" },
};

/** Honest fallback labeling — exact matches stay unlabeled. */
function ScopeBadge({ scope }: { scope?: string }) {
  if (!scope || scope === "exact" || scope === "none") return null;
  const meta = SCOPE_META[scope];
  if (!meta) return null;
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-semibold", meta.cls)}>
      <Layers className="h-3 w-3" /> {meta.label}
    </span>
  );
}

// ── Cards ────────────────────────────────────────────────────────────────────

function ResourceCard({ r, scope, highlight }: { r: Resource; scope?: string; highlight?: boolean }) {
  const kind = resourceKind(r.kind);
  return (
    <div
      className={cn(
        "min-w-0 rounded-xl border p-3.5 transition",
        highlight
          ? "border-brand-300 bg-brand-50/70 dark:border-brand-500/40 dark:bg-brand-500/10"
          : "border-slate-100 bg-white dark:border-slate-700/60 dark:bg-slate-800/60"
      )}
    >
      <div className="flex items-start gap-3">
        <ProviderAvatar provider={r.provider} />
        <div className="min-w-0 flex-1">
          <p className="min-w-0 break-words text-[15px] font-semibold leading-snug text-slate-900 dark:text-white">{r.title}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium text-slate-500 dark:text-slate-400">
            <span className="min-w-0 truncate">{r.provider}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="inline-flex min-w-0 items-center gap-1">
              <span className={cn("inline-block h-1.5 w-1.5 shrink-0 rounded-full", kind.dot)} />
              {r.type}
            </span>
            {r.isOfficial && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/10 px-2 py-0.5 text-[10.5px] font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                <BadgeCheck className="h-3 w-3" /> Official
              </span>
            )}
          </p>
          {(r.difficulty || r.estimatedTime) && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <DiffBadge difficulty={r.difficulty} />
              {r.estimatedTime && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                  <Clock className="h-3 w-3" /> {r.estimatedTime}
                </span>
              )}
              <ScopeBadge scope={scope} />
            </div>
          )}
          {!r.difficulty && !r.estimatedTime && <div className="mt-2"><ScopeBadge scope={scope} /></div>}
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex max-w-full items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-600 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-brand-400"
          >
            Open resource <ExternalLink className="h-3 w-3 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}

function PracticeCard({ item }: { item: PracticeItem }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-3.5 transition hover:border-brand-200 hover:shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 dark:hover:border-brand-500/40">
      <div className="flex min-w-0 items-start gap-2.5">
        <ProviderAvatar provider={item.platform} size="md" />
        <div className="min-w-0 flex-1">
          <p className="min-w-0 break-words text-[15px] font-semibold leading-snug text-slate-900 dark:text-white">{item.title}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium text-slate-500 dark:text-slate-400">
            <span className="min-w-0 truncate">{item.platform}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <DiffBadge difficulty={item.difficulty} />
            {item.estimatedTime && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                <Clock className="h-3 w-3" /> {item.estimatedTime}
              </span>
            )}
          </p>
        </div>
      </div>
      {item.skills.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.skills.slice(0, 5).map((s) => (
            <span
              key={s}
              className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-300"
            >
              {s}
            </span>
          ))}
        </div>
      )}
      <div className="mt-3">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-500"
        >
          <PlayCircle className="h-3.5 w-3.5 shrink-0" /> Practice now
        </a>
      </div>
    </div>
  );
}

function ProjectCard({ p, index }: { p: ProjectRef; index: number }) {
  return (
    <article className="min-w-0 rounded-xl border border-emerald-200/70 bg-white p-4 dark:border-emerald-500/20 dark:bg-slate-800/60">
      <div className="flex items-start justify-between gap-2">
        <p className="flex min-w-0 items-start gap-2 text-[15px] font-semibold leading-snug text-slate-900 dark:text-white">
          <span className="mt-0.5 shrink-0 rounded-full bg-emerald-100 px-1.5 py-0.5 font-mono text-[11px] text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0 break-words">{p.title}</span>
        </p>
        <Badge
          variant={p.difficulty === "Beginner" ? "success" : p.difficulty === "Advanced" ? "danger" : "warning"}
          className="shrink-0 text-[10.5px]"
        >
          {p.difficulty ?? "Intermediate"}
        </Badge>
      </div>
      <p className="mt-2 text-[14px] leading-relaxed text-slate-600 [overflow-wrap:anywhere] dark:text-slate-300">{p.description}</p>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-500 dark:text-slate-400">
        {p.duration && (
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> Est. <b className="font-semibold text-slate-700 dark:text-slate-200">{p.duration}</b>
          </span>
        )}
        {p.skills && p.skills.length > 0 && (
          <span className="inline-flex min-w-0 flex-wrap items-center gap-1">
            <Target className="h-3.5 w-3.5 shrink-0" />
            {p.skills.slice(0, 4).map((s) => (
              <span key={s} className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-300">
                {s}
              </span>
            ))}
          </span>
        )}
      </div>
      {p.goal && (
        <p className="mt-2.5 rounded-lg border border-emerald-200/60 bg-emerald-50/60 px-3 py-2 text-[13px] leading-relaxed text-emerald-900 [overflow-wrap:anywhere] dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
          <b>Goal:</b> {p.goal}
        </p>
      )}
    </article>
  );
}

function CertificationCard({ cert }: { cert: CertificationView }) {
  const costCls =
    cert.costLabel === "FREE"
      ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
      : cert.costLabel === "PAID EXAM"
        ? "bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
        : "bg-sky-500/10 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300";
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-700/60 dark:bg-slate-800/60">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300">
          <Award className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="break-words text-[15px] font-semibold leading-snug text-slate-900 dark:text-white">{cert.name}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-slate-500 dark:text-slate-400">
            <span className="min-w-0 truncate">{cert.provider}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="font-medium text-slate-600 dark:text-slate-300">{cert.level}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide", costCls)}>
              {cert.costLabel}
            </span>
            {cert.freePrep && (
              <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-sky-700 dark:bg-sky-500/20 dark:text-sky-300">
                Free preparation
              </span>
            )}
            {cert.validity && (
              <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[10.5px] font-semibold text-slate-500 dark:border-slate-600 dark:text-slate-400">
                Validity: {cert.validity}
              </span>
            )}
          </div>
          {cert.description && (
            <p className="mt-2 text-[13px] leading-relaxed text-slate-600 [overflow-wrap:anywhere] dark:text-slate-300">{cert.description}</p>
          )}
          {cert.validates.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {cert.validates.slice(0, 4).map((v) => (
                <span key={v} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-300">
                  {v}
                </span>
              ))}
            </div>
          )}
          {(cert.prep.length > 0 || cert.practiceLinks.length > 0) && (
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {cert.prep.length > 0 && (
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Prepare</p>
                  <div className="mt-1.5 space-y-1.5">
                    {cert.prep.slice(0, 2).map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/70 px-2.5 py-2 transition hover:border-brand-200 dark:border-slate-700/60 dark:bg-slate-800 dark:hover:border-brand-500/40"
                      >
                        <GraduationCap className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                        <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-slate-700 dark:text-slate-200">{l.title}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 text-slate-300 dark:text-slate-600" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {cert.practiceLinks.length > 0 && (
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Practice exam</p>
                  <div className="mt-1.5 space-y-1.5">
                    {cert.practiceLinks.slice(0, 2).map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/70 px-2.5 py-2 transition hover:border-brand-200 dark:border-slate-700/60 dark:bg-slate-800 dark:hover:border-brand-500/40"
                      >
                        <Dumbbell className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                        <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-slate-700 dark:text-slate-200">{l.title}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 text-slate-300 dark:text-slate-600" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <DiffBadge difficulty={cert.difficulty} />
            {cert.officialUrl && (
              <a
                href={cert.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex max-w-full items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-500"
              >
                Official details <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Skeletons ────────────────────────────────────────────────────────────────

function SummarySkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-[64px] rounded-xl" />
      ))}
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <div className="space-y-4 p-4 sm:p-5">
      <SummarySkeleton />
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-16 w-full" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2.5">
          <Skeleton className="h-5 w-40" />
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </div>
        <div className="space-y-2.5">
          <Skeleton className="h-5 w-36" />
          {[0, 1].map((i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </div>
      </div>
      <div className="space-y-2.5">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}

// ── Bookmark toggle ──────────────────────────────────────────────────────────

function BookmarkToggle({
  roadmap,
  roadmapTitle,
  nodeId,
  nodeLabel,
  nodeType,
}: {
  roadmap: string;
  roadmapTitle: string;
  nodeId: string;
  nodeLabel: string;
  nodeType: string;
}) {
  const toggle = useBookmarksStore((s) => s.toggle);
  const isBookmarked = useBookmarksStore((s) => s.isBookmarked(roadmap, nodeId));
  const toast = useUiStore((s) => s.toast);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggle({ roadmap, roadmapTitle, nodeId, nodeLabel, nodeType });
    toast(isBookmarked ? "Bookmark removed" : "Topic bookmarked", {
      description: isBookmarked ? "Removed from your bookmarks." : "Saved to your bookmarks.",
      kind: isBookmarked ? "info" : "success",
    });
  }, [toggle, roadmap, roadmapTitle, nodeId, nodeLabel, nodeType, isBookmarked, toast]);

  return (
    <button
      onPointerDown={(e) => e.stopPropagation()}
      onClick={handleToggle}
      className={cn(
        "rounded-lg p-2 transition",
        isBookmarked
          ? "text-amber-500 hover:bg-amber-50 hover:text-amber-600 dark:text-amber-400 dark:hover:bg-amber-950/40"
          : "text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
      )}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      title={isBookmarked ? "Remove bookmark" : "Bookmark this topic"}
    >
      {isBookmarked ? <BookmarkCheck className="h-5 w-5 sm:h-4 sm:w-4" /> : <Bookmark className="h-5 w-5 sm:h-4 sm:w-4" />}
    </button>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export const NodeDetailsSidebar = memo(function NodeDetailsSidebar({
  node,
  roadmapSlug,
  roadmapTitle,
  order,
  ancestors,
  siblings,
  onClose,
  onNavigate,
  onMarkSubtree,
}: Props) {
  const meta = nodeMeta(node.type);
  const slimDifficulty = node.details?.difficulty as string | undefined;
  const slimTime = node.details?.estimatedTime as string | undefined;

  // ── canonical resolution (single source of truth) ────────────────────────
  const { details, loading } = useTopicDetails(roadmapSlug, node, ancestors, siblings);

  const isComplete = useProgressStore((s) => s.isComplete);
  const toggleNode = useProgressStore((s) => s.toggleNode);
  const completed = isComplete(roadmapSlug, node.id);
  const toast = useUiStore((s) => s.toast);

  // per-node learning progress (subtree)
  const learnable = collectLearnableIds(node);
  const completedList = useProgressStore((s) => s.completed);
  const completedIds = useMemo(
    () => new Set(completedList.filter((c) => c.roadmap === roadmapSlug).map((c) => c.nodeId)),
    [completedList, roadmapSlug]
  );
  const doneCount = learnable.filter((id) => completedIds.has(id)).length;
  const nodePct = learnable.length ? Math.round((doneCount / learnable.length) * 100) : 0;

  const idx = order.findIndex((o) => o.id === node.id);
  const prev = idx > 0 ? order[idx - 1] : null;
  const next = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;

  const subtopics = useMemo(() => [...(node.children ?? []), ...(node.options ?? [])], [node.children, node.options]);
  const hasSubtree = subtopics.length > 0;
  const checkable = isCheckableType(node.type);

  // accurate counts drive the summary cards + which tabs exist at all
  const resourceCount = details?.resources.items.length ?? 0;
  const practiceCount = details?.practice.items.length ?? 0;
  const projectCount = details?.projects.length ?? 0;
  const certCount = details?.certifications.length ?? 0;

  const [tab, setTab] = useState<TabId>("overview");
  // Projects / Certifications tabs only exist when content exists — when a
  // selection changes and the current tab disappears, fall back to Overview.
  useEffect(() => {
    if ((tab === "projects" && projectCount === 0) || (tab === "certifications" && certCount === 0)) {
      setTab("overview");
    }
  }, [tab, projectCount, certCount]);

  const jumpTo = useCallback((t: TabId) => {
    setTab(t);
    const scroller = document.getElementById("details-scroll");
    if (scroller) scroller.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleToggle = () => {
    toggleNode(roadmapSlug, node.id, node.label);
    toast(completed ? "Marked incomplete" : "Topic completed 🎉", {
      description: completed ? "Undo successful." : "Keep up the streak!",
      kind: completed ? "info" : "success",
    });
  };


  // topic-specific study searches — generated client-side from structured
  // topic data, so every node always has a "Find PDF Notes" option without
  // bloating the dataset with hardcoded search URLs
  const searchOptions = useMemo(
    () => generateSearchOptions({ topic: node.label, roadmapTitle, roadmapSlug }),
    [node.label, roadmapTitle, roadmapSlug]
  );
  const pdfSearch = searchOptions.find((r) => r.type === "PDF Search");
  const otherSearches = searchOptions.filter((r) => r.type !== "PDF Search");
  const SEARCH_ICONS: Record<string, React.ElementType> = {
    "Web Search": Search,
    "PDF Search": FileText,
    "Book Search": BookOpen,
    "Study Search": Library,
  };

  // curated resources grouped into Official / Learn / Deep Dive / Reference
  const resourceCategories = useMemo(() => {
    if (!details) return [];
    const cats: { id: string; label: string; icon: React.ElementType; match: (r: Resource) => boolean }[] = [
      { id: "OFFICIAL", label: "Official Documentation", icon: BadgeCheck, match: (r) => r.isOfficial },
      {
        id: "LEARN",
        label: "Learn",
        icon: GraduationCap,
        match: (r) =>
          !r.isOfficial &&
          (r.kind === "course" || r.kind === "video" || r.kind === "tutorial" ||
            r.type === "Beginner Tutorial" || r.type === "Interactive Tutorial" || r.type === "Course"),
      },
      {
        id: "DEEP",
        label: "Deep Dive",
        icon: BookOpen,
        match: (r) =>
          !r.isOfficial &&
          (r.kind === "article" || r.kind === "book" || r.kind === "repo" || r.kind === "community" ||
            r.type === "Intermediate Tutorial" || r.type === "Advanced Guide"),
      },
      {
        id: "REFERENCE",
        label: "Reference & Practice",
        icon: Library,
        match: (r) =>
          !r.isOfficial &&
          (r.kind === "cheatsheet" || r.kind === "practice" || r.kind === "reference" ||
            r.type === "Reference Documentation" || r.type === "Cheat Sheet" || r.type === "Practice"),
      },
    ];
    return cats
      .map((cat) => ({ ...cat, items: details.resources.items.filter(cat.match) }))
      .filter((cat) => cat.items.length > 0);
  }, [details]);

  // ── responsive shell state (unchanged behavior) ───────────────────────────
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const onChange = (e: MediaQueryListEvent) => setDesktop(e.matches);
    setDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const panelRef = useRef<HTMLElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    if (!desktop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [desktop]);

  useEffect(() => {
    if (!desktop) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    panelRef.current?.focus({ preventScroll: true });
    return () => prevFocus?.focus?.({ preventScroll: true });
  }, [desktop]);

  const enter = desktop ? { x: 880, opacity: 0.4 } : { y: "100%", opacity: 0.8 };
  const leave = desktop ? { x: 880, opacity: 0 } : { y: "100%", opacity: 0 };

  // ── drawer-interaction guard ──────────────────────────────────────────────
  // Radix DismissableLayer uses a deferred (setTimeout(0)) native document
  // ── Drawer interaction guard ─────────────────────────────────────────────
  // Vaul/Radix's DismissableLayer registers a native document-level
  // pointerdown listener that fires OUTSIDE React's event system. When
  // CDP-dispatched pointer events don't trigger React's
  // onPointerDownCapture, Radix thinks the interaction is "outside" and
  // fires POINTER_DOWN_OUTSIDE → drawer closes.
  //
  // Fix: attach native capture-phase listeners directly to the
  // Drawer.Content element. stopPropagation() at this level prevents the
  // event from reaching Radix's document-level handler.
  // Vaul's Drawer.Content fires onPointerDownOutside when Radix detects
  // a click outside the drawer. The default behavior closes the drawer.
  // We intercept it to prevent closure when the interaction is inside the
  // drawer content — this handles cases where CDP-dispatched events or
  // focus transitions cause Radix to misidentify the interaction as outside.
  const handlePointerDownOutside = useCallback((e: Event) => {
    const originalEvent = (e as CustomEvent).detail?.originalEvent as PointerEvent | undefined;
    if (originalEvent) {
      const drawer = document.querySelector("[data-vaul-drawer]");
      if (drawer && drawer.contains(originalEvent.target as Node)) {
        e.preventDefault();
      }
    }
  }, []);

  const headerContent = (      <div className="sticky top-0 z-10 flex shrink-0 flex-col rounded-t-3xl border-b border-slate-100 bg-white sm:rounded-none dark:border-slate-700/60 dark:bg-slate-800">
      <div className="flex items-start gap-3 p-4 pb-3 sm:gap-3.5 sm:p-5 sm:pb-4">
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
            <DiffBadge difficulty={details?.meta.difficulty ?? slimDifficulty} />
            <Badge variant="outline">
              <Clock className="h-3 w-3" /> {details?.meta.estimatedTime ?? slimTime ?? "—"}
            </Badge>
            {node.optional && <Badge variant="purple">Optional</Badge>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <BookmarkToggle
            roadmap={roadmapSlug}
            roadmapTitle={roadmapTitle}
            nodeId={node.id}
            nodeLabel={node.label}
            nodeType={node.type}
          />
          <button
            onClick={onClose}
            className="rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            aria-label="Close details"
          >
            <X className="h-5 w-5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>

      {learnable.length > 0 && (
        <div className="flex items-center gap-3 px-4 pb-3 sm:px-5 sm:pb-4">
          <div className="min-w-0 flex-1">
            <Progress value={nodePct} className="h-1.5" indicatorClassName="bg-brand-500" />
          </div>
          <span className="font-mono text-[13px] font-medium text-slate-500 dark:text-slate-400">
            {doneCount}/{learnable.length} · {nodePct}%
          </span>
        </div>
      )}

      {/* actions */}
      <div className="flex gap-2 px-4 pb-2 sm:px-5">
        <Button size="sm" className="min-h-[46px] min-w-0 flex-1 whitespace-normal text-[14.5px] leading-tight" onClick={() => jumpTo("resources")}>
          <GraduationCap className="h-4 w-4 shrink-0" /> Learn
        </Button>
        <Button size="sm" className="min-h-[46px] min-w-0 flex-1 whitespace-normal text-[14.5px] leading-tight" onClick={() => jumpTo("practice")}>
          <PlayCircle className="h-4 w-4 shrink-0" /> Practice
        </Button>
        {checkable && (
          <Button variant="outline" size="sm" className="min-h-[46px] whitespace-normal px-3 text-[14px]" onClick={handleToggle}>
            {completed ? <Check className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            {completed ? "Done" : "Mark done"}
          </Button>
        )}
        {hasSubtree && (
          <Button
            variant="outline"
            size="icon-sm"
            onClick={onMarkSubtree}
            title="Mark all subtopics complete"
            aria-label="Mark all subtopics complete"
            className="min-h-[46px] min-w-[46px]"
          >
            <ListChecks className="h-5 w-5" />
          </Button>
        )}

      </div>

      {/* tabs */}        <div className="px-3 pb-3">
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabId)} className="w-full">
          <TabsList className="flex w-full snap-x snap-mandatory gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TabsTrigger value="overview" className={TAB_CLS}>Overview</TabsTrigger>
            <TabsTrigger value="resources" className={TAB_CLS}>
              Resources{resourceCount > 0 && <span className="text-slate-500 dark:text-slate-400"> ({resourceCount})</span>}
            </TabsTrigger>
            <TabsTrigger value="practice" className={TAB_CLS}>
              Practice{practiceCount > 0 && <span className="text-slate-500 dark:text-slate-400"> ({practiceCount})</span>}
            </TabsTrigger>
            {projectCount > 0 && (
              <TabsTrigger value="projects" className={TAB_CLS}>
                Projects ({projectCount})
              </TabsTrigger>
            )}
            {certCount > 0 && (
              <TabsTrigger value="certifications" className={TAB_CLS}>
                Certifications ({certCount})
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );

  // ── summary cards ─────────────────────────────────────────────────────────
  const summaryCards = loading ? (
    <SummarySkeleton />
  ) : (
    <div className={cn("grid grid-cols-2 gap-2", certCount > 0 || projectCount > 0 ? "lg:grid-cols-4" : "")}>
      <button onClick={() => jumpTo("resources")} className="group min-w-0 rounded-xl border border-blue-200/70 bg-gradient-to-b from-blue-50 to-white p-3 text-left transition hover:border-blue-300 hover:shadow-sm dark:border-blue-500/25 dark:from-blue-950/40 dark:to-slate-800/60 dark:hover:border-blue-500/50">
        <p className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-300">
          <BookOpen className="h-3.5 w-3.5" /> Resources
        </p>
        <p className="mt-0.5 text-xl font-bold text-slate-900 dark:text-white">{resourceCount}</p>
      </button>
      <button onClick={() => jumpTo("practice")} className="min-w-0 rounded-xl border border-emerald-200/70 bg-gradient-to-b from-emerald-50 to-white p-3 text-left transition hover:border-emerald-300 hover:shadow-sm dark:border-emerald-500/25 dark:from-emerald-950/40 dark:to-slate-800/60 dark:hover:border-emerald-500/50">
        <p className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
          <Dumbbell className="h-3.5 w-3.5" /> Practice
        </p>
        <p className="mt-0.5 text-xl font-bold text-slate-900 dark:text-white">{practiceCount}</p>
      </button>
      {projectCount > 0 && (
        <button onClick={() => jumpTo("projects")} className="min-w-0 rounded-xl border border-teal-200/70 bg-gradient-to-b from-teal-50 to-white p-3 text-left transition hover:border-teal-300 hover:shadow-sm dark:border-teal-500/25 dark:from-teal-950/40 dark:to-slate-800/60 dark:hover:border-teal-500/50">
          <p className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wide text-teal-600 dark:text-teal-300">
            <FolderKanban className="h-3.5 w-3.5" /> Projects
          </p>
          <p className="mt-0.5 text-xl font-bold text-slate-900 dark:text-white">{projectCount}</p>
        </button>
      )}
      {certCount > 0 && (
        <button onClick={() => jumpTo("certifications")} className="min-w-0 rounded-xl border border-violet-200/70 bg-gradient-to-b from-violet-50 to-white p-3 text-left transition hover:border-violet-300 hover:shadow-sm dark:border-violet-500/25 dark:from-violet-950/40 dark:to-slate-800/60 dark:hover:border-violet-500/50">
          <p className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wide text-violet-600 dark:text-violet-300">
            <Award className="h-3.5 w-3.5" /> Certifications
          </p>
          <p className="mt-0.5 text-xl font-bold text-slate-900 dark:text-white">{certCount}</p>
        </button>
      )}
    </div>
  );

  // ── overview dashboard ────────────────────────────────────────────────────
  const ov = details?.overview;
  const overviewContent = (
    <div className="pb-2">
      {/* summary */}
      <div className="px-4 pt-4 sm:px-5">{summaryCards}</div>

      {loading || !ov ? (
        <OverviewSkeleton />
      ) : (
        <>
          {/* what is it */}
          {ov.whatIsIt && (
            <Section icon={Sparkles} title="What is it?" className="lg:border-0 lg:px-0 lg:pt-0 mt-4 lg:mt-5">
              <div className="lg:px-0">
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">{ov.whatIsIt}</p>
              </div>
            </Section>
          )}

          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-6 lg:px-5">
            {/* left column */}
            <div className="min-w-0">
              {ov.whatYouLearn.length > 0 && (
                <Section icon={Target} title={`What you'll learn${ov.whatYouLearn.length > 6 ? ` (${ov.whatYouLearn.length})` : ""}`} className="lg:border-0 lg:px-0 lg:pt-0">
                  <ul className="space-y-2">
                    {ov.whatYouLearn.slice(0, 8).map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-[14.5px] leading-snug">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        <span className="min-w-0 [overflow-wrap:anywhere]">{w}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {ov.whyItMatters.length > 0 && (
                <Section icon={Lightbulb} title="Why it matters" className="lg:border-0 lg:px-0">
                  <ul className="space-y-1.5">
                    {ov.whyItMatters.slice(0, 5).map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-[14px] leading-snug">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        <span className="min-w-0 [overflow-wrap:anywhere]">{w}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

            </div>

            {/* right column — practical context (no learning-material duplication:
               full resources/practice/projects/certs live ONLY in their tabs) */}
            <div className="min-w-0">
              {ov.howItHelps && (
                <Section icon={GraduationCap} title="How it helps" className="lg:border-0 lg:px-0 lg:pt-0">
                  <p className="rounded-xl border border-emerald-200/70 bg-emerald-50 px-3.5 py-2.5 text-[14px] leading-relaxed text-emerald-900 [overflow-wrap:anywhere] dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                    {ov.howItHelps}
                  </p>
                  {ov.usedFor.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ov.usedFor.slice(0, 8).map((w, i) => (
                        <span key={i} className="max-w-full rounded-full border border-slate-200 px-2.5 py-0.5 text-[12.5px] font-medium text-slate-600 [overflow-wrap:anywhere] dark:border-slate-600 dark:text-slate-300">
                          {w}
                        </span>
                      ))}
                    </div>
                  )}
                </Section>
              )}

              {ov.prerequisites.length > 0 && (
                <Section icon={Lock} title="Prerequisites" className="lg:border-0 lg:px-0">
                  <div className="flex flex-wrap gap-1.5">
                    {ov.prerequisites.slice(0, 6).map((p, i) => (
                      <span key={i} className="inline-flex max-w-full items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[12.5px] font-medium text-slate-600 [overflow-wrap:anywhere] dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                        <ChevronRight className="h-3 w-3 shrink-0 text-slate-300 dark:text-slate-500" />
                        {p}
                      </span>
                    ))}
                  </div>
                </Section>
              )}
            </div>
          </div>

          {/* checkpoints */}
          {ov.checkpoints.length > 0 && (
            <Section icon={CheckCircle2} title="Learning checkpoints">
              <ul className="space-y-2">
                {ov.checkpoints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2 text-sm text-slate-700 dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    <span className="min-w-0 leading-tight text-[14.5px] [overflow-wrap:anywhere] sm:text-[14px]">{c}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* mistakes + tips */}
          {(ov.commonMistakes.length > 0 || ov.tips.length > 0) && (
            <div className="grid gap-5 p-5 sm:grid-cols-2">
              {ov.commonMistakes.length > 0 && (
                <div className="min-w-0">
                  <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-rose-500">
                    <AlertTriangle className="h-4 w-4" /> Common mistakes
                  </h3>
                  <ul className="mt-2.5 space-y-1.5">
                    {ov.commonMistakes.slice(0, 4).map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13.5px] text-slate-500 [overflow-wrap:anywhere] dark:text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {ov.tips.length > 0 && (
                <div className="min-w-0">
                  <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">
                    <Lightbulb className="h-4 w-4" /> Tips
                  </h3>
                  <ul className="mt-2.5 space-y-1.5">
                    {ov.tips.slice(0, 4).map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13.5px] text-slate-500 [overflow-wrap:anywhere] dark:text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* interview questions */}
          {ov.interviewQuestions.length > 0 && (
            <Section icon={FileText} title="Interview questions">
              <ul className="space-y-2">
                {ov.interviewQuestions.slice(0, 4).map((q, i) => (
                  <li key={i} className="rounded-lg border border-indigo-200/70 bg-indigo-50/50 px-3.5 py-3 text-[13.5px] font-medium text-indigo-900 [overflow-wrap:anywhere] dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-200">
                    {q}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </>
      )}

      {/* subtopics */}
      {!loading && subtopics.length > 0 && (
        <Section icon={FolderKanban} title={`Subtopics (${subtopics.length})`}>
          <div className="flex flex-wrap gap-1.5">
            {subtopics.map((c) => (
              <button
                key={c.id}
                onClick={() => onNavigate(c.id)}
                className="max-w-full whitespace-normal break-words rounded-full border border-slate-200 px-3 py-1.5 text-left text-[13px] font-medium text-slate-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-600 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
              >
                {typeEmoji(c.type)} {c.label}
              </button>
            ))}
          </div>
        </Section>
      )}

      {/* related topics (siblings in the roadmap) */}
      {!loading && siblings.length > 0 && (
        <Section icon={ArrowRight} title="Related topics">
          <div className="flex flex-wrap gap-1.5">
            {siblings.slice(0, 10).map((s) => (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className="max-w-full whitespace-normal break-words rounded-full border border-slate-200 px-3 py-1.5 text-left text-[13px] font-medium text-slate-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-600 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
              >
                {s.label}
              </button>
            ))}
          </div>
        </Section>
      )}
    </div>
  );

  // ── resources tab ─────────────────────────────────────────────────────────
  const resourcesContent = (
    <div className="space-y-6 p-4 sm:p-5">
      {loading ? (
        <>
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </>
      ) : details && resourceCount > 0 ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <ScopeBadge scope={details.resources.scope} />
            <p className="text-[13px] text-slate-500 dark:text-slate-400">
              {resourceCount} verified {resourceCount === 1 ? "resource" : "resources"} for this topic
            </p>
          </div>
          {resourceCategories.map((cat) => (
            <div key={cat.id}>
              <div className="mb-2 flex items-center gap-2">
                <cat.icon className="h-4 w-4 text-brand-500" />
                <p className="text-[13px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{cat.label}</p>
              </div>
              <div className="space-y-2.5">
                {cat.items.map((r) => (
                  <ResourceCard key={r.url} r={r} highlight={false} />
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center dark:border-slate-700">
          <BookOpen className="mx-auto h-7 w-7 text-slate-300 dark:text-slate-600" />
          <p className="mt-2 text-[15px] font-semibold text-slate-700 dark:text-slate-200">No curated resources yet</p>
          <p className="mx-auto mt-1 max-w-xs text-[13px] text-slate-500 dark:text-slate-400">
            We verify every link by hand — no hand-picked match for this topic yet. Try the searches below, or check a parent topic for resources.
          </p>
        </div>
      )}

      {/* PDF study material — one compact featured action */}
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

  // ── practice tab ──────────────────────────────────────────────────────────
  const practiceContent = (
    <div className="space-y-3 p-4 sm:p-5">
      {loading ? (
        [0, 1].map((i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
      ) : details && practiceCount > 0 ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <ScopeBadge scope={details.practice.scope} />
            <p className="text-[13px] text-slate-500 dark:text-slate-400">
              Hands-on activities matched to this topic
            </p>
          </div>
          {details.practice.items.map((p) => (
            <PracticeCard key={p.url} item={p} />
          ))}
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-700">
          <Dumbbell className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="mt-3 text-[15px] font-semibold text-slate-700 dark:text-slate-200">
            No verified practice for this topic yet
          </p>
          <p className="mx-auto mt-1 max-w-sm text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
            Nothing relevant has been verified for this exact topic — we don&apos;t list platforms that don&apos;t fit.
            Try the Resources tab for learning material, or check a parent topic for practice activities.
          </p>
        </div>
      )}
    </div>
  );

  // ── projects tab ──────────────────────────────────────────────────────────
  const projectsContent = details ? (
    <div className="space-y-3.5 p-4 sm:p-5">
      <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
        Build these to apply {node.label.toLowerCase()} in practice — each brief lists the skills it exercises and what a finished project looks like.
      </p>
      {details.projects.map((p, i) => (
        <ProjectCard key={`${p.title}-${i}`} p={p} index={i} />
      ))}
    </div>
  ) : null;

  // ── certifications tab ────────────────────────────────────────────────────
  const certificationsContent = details ? (
    <div className="space-y-3 p-4 sm:p-5">
      {details.certifications.length > 1 && (
        <p className="text-[13px] text-slate-500 dark:text-slate-400">
          Credentials recognized for this area — compare level and cost before committing.
        </p>
      )}
      {details.certifications.map((c) => (
        <CertificationCard key={c.id} cert={c} />
      ))}
    </div>
  ) : null;

  const scrollContent = (
    <div className="nice-scroll min-w-0 flex-1 overflow-x-hidden text-[15px] sm:text-[14px]">
      {tab === "overview" && overviewContent}
      {tab === "resources" && resourcesContent}
      {tab === "practice" && practiceContent}
      {tab === "projects" && projectCount > 0 && projectsContent}
      {tab === "certifications" && certCount > 0 && certificationsContent}
      <div className="h-[env(safe-area-inset-bottom,20px)] sm:h-8" />
    </div>
  );

  const footer = (
    <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-slate-700/60 dark:bg-slate-800">
      <Button variant="outline" size="sm" className="min-h-[48px] min-w-0 flex-1 justify-start sm:min-h-0" disabled={!prev} onClick={() => prev && onNavigate(prev.id)}>
        <ArrowLeft className="h-4 w-4 shrink-0 sm:h-3.5 sm:w-3.5" />
        <span className="truncate text-[14px] sm:text-xs">{prev?.label ?? "Start"}</span>
      </Button>
      <Button variant="outline" size="sm" className="min-h-[48px] min-w-0 flex-1 justify-end sm:min-h-0" disabled={!next} onClick={() => next && onNavigate(next.id)}>
        <span className="truncate text-[14px] sm:text-xs">{next?.label ?? "End"}</span>
        <ArrowRight className="h-4 w-4 shrink-0 sm:h-3.5 sm:w-3.5" />
      </Button>
    </div>
  );

  if (!desktop) {
    return (
      <Drawer.Root open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px]" />
          <Drawer.Content
            onPointerDownOutside={handlePointerDownOutside}
            aria-label={`${node.label} details`}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-[20px] bg-white outline-none dark:bg-slate-800"
            style={{ height: "94dvh", maxHeight: "94dvh" }}
          >
            <div className="mx-auto mb-2 mt-3 h-1.5 w-12 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
            {headerContent}
            <div id="details-scroll" className="nice-scroll min-w-0 flex-1 overflow-y-auto overflow-x-hidden" style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "contain" }}>
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
        ref={panelRef}
        tabIndex={-1}
        initial={enter}
        animate={{ x: 0, opacity: 1 }}
        exit={leave}
        transition={{ type: "spring", stiffness: 380, damping: 38 }}
        className="absolute inset-y-0 right-0 z-40 flex w-full max-w-[560px] flex-col border-l border-slate-200 bg-white shadow-2xl outline-none 2xl:max-w-[640px] dark:border-slate-700 dark:bg-slate-800"
        role="dialog"
        aria-label={`${node.label} details`}
      >
        {headerContent}
        <div id="details-scroll" className="nice-scroll min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          {scrollContent}
        </div>
        {footer}
      </motion.aside>
    </AnimatePresence>
  );
});
