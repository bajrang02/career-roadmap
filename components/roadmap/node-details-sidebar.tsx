"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  Bookmark,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FolderKanban,
  Lightbulb,
  ListChecks,
  Lock,
  MessageSquare,
  NotebookPen,
  Play,
  Target,
  X,
} from "lucide-react";
import { cn, nodeMeta, resourceKind, isContainer } from "@/lib/utils";
import type { RoadmapNode } from "@/lib/types";
import { collectLearnableIds } from "@/lib/mindmap/tree-layout";
import { useProgressStore } from "@/lib/stores/progress-store";
import { useBookmarksStore } from "@/lib/stores/bookmarks-store";
import { useUiStore } from "@/lib/stores/ui-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface Props {
  node: RoadmapNode;
  roadmapSlug: string;
  roadmapTitle: string;
  /** full-tree DFS order so we can offer prev/next navigation */
  order: { id: string; label: string }[];
  onClose: () => void;
  onNavigate: (id: string) => void;
  onMarkSubtree: () => void;
  onStartLearning: () => void;
}

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

function typeEmoji(node: RoadmapNode) {
  switch (node.type) {
    case "project":
    case "projects":
      return "🛠️";
    case "interview":
      return "🎯";
    case "achievement":
      return "🎓";
    case "career":
      return "🚀";
    case "section":
      return "📦";
    case "subsection":
      return "🧩";
    case "advanced":
      return "🚀";
    case "optional":
      return "🌟";
    default:
      return "📘";
  }
}

export function NodeDetailsSidebar({
  node,
  roadmapSlug,
  roadmapTitle,
  order,
  onClose,
  onNavigate,
  onMarkSubtree,
  onStartLearning,
}: Props) {
  const meta = nodeMeta(node.type);
  const d = node.details;
  const isComplete = useProgressStore((s) => s.isComplete);
  const toggleNode = useProgressStore((s) => s.toggleNode);
  const completed = isComplete(roadmapSlug, node.id);
  const isBookmarked = useBookmarksStore((s) => s.isBookmarked);
  const toggleBookmark = useBookmarksStore((s) => s.toggleBookmark);
  const getNote = useBookmarksStore((s) => s.getNote);
  const setNote = useBookmarksStore((s) => s.setNote);
  const toast = useUiStore((s) => s.toast);
  const [note, setNoteText] = useState(getNote(roadmapSlug, node.id)?.text ?? "");

  useEffect(() => {
    setNoteText(getNote(roadmapSlug, node.id)?.text ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node.id]);

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

  const saveNote = () => {
    setNote(roadmapSlug, node.id, note);
    toast("Note saved", { description: "Saved on this device." });
  };

  const groupResources = (() => {
    const groups = new Map<string, typeof d.resources>();
    for (const r of d.resources) {
      const kind = resourceKind(r.kind).label;
      if (!groups.has(kind)) groups.set(kind, []);
      groups.get(kind)!.push(r);
    }
    return Array.from(groups.entries());
  })();

  const isCareer = node.type === "career";
  const subtopics = node.children ?? [];

  // bottom sheet on mobile (slide up), right-side panel on desktop (slide in).
  // Browser-only: default to the mobile variant and resolve the media query in
  // an effect (never during render) so server and first client render match.
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

  // mobile: swipe down on the handle to dismiss; the ScrollArea scrolls
  // freely because drag only starts from the handle (dragControls.start)
  const dragControls = useDragControls();

  return (
    <AnimatePresence>
      {/* mobile backdrop — tap outside to close; hidden on desktop where the
          panel is a persistent sidebar that never blocks the canvas */}
      <motion.div
        key="sidebar-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-[2px] sm:hidden"
        aria-hidden="true"
      />
      <motion.aside
        key="sidebar"
        initial={enter}
        animate={{ x: 0, y: 0, opacity: 1 }}
        exit={leave}
        transition={{ type: "spring", stiffness: 380, damping: 38 }}
        drag={desktop ? false : "y"}
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.45 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 700) onClose();
        }}
        className="fixed inset-x-0 bottom-0 z-40 flex max-h-[85dvh] flex-col rounded-t-3xl border border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl sm:inset-x-auto sm:bottom-0 sm:right-0 sm:top-16 sm:h-auto sm:max-h-none sm:w-full sm:max-w-[440px] sm:rounded-none sm:border-y-0 sm:border-r-0 sm:border-l sm:pb-0 sm:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
        role="dialog"
        aria-modal={!desktop}
        aria-label={`${node.label} details`}
      >
        {/* mobile drag handle — starting a drag here dismisses the sheet */}
        <div
          className="flex shrink-0 cursor-grab touch-none justify-center pt-2.5 active:cursor-grabbing sm:hidden"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <span className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* header — Notion-style doc title */}
        <div className="flex items-start gap-3.5 border-b border-slate-100 p-5 dark:border-slate-700/60">
          <span className={cn("mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl", meta.chip)}>
            {typeEmoji(node)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                {node.label}
              </h2>
              {completed && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <Badge variant="secondary">{meta.label}</Badge>
              <Badge variant={d.difficulty === "Beginner" ? "success" : d.difficulty === "Intermediate" ? "warning" : "danger"}>
                {d.difficulty}
              </Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3" /> {d.estimatedTime}
              </Badge>
              {node.optional && <Badge variant="purple">Optional</Badge>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            aria-label="Close details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* per-node progress */}
        {learnable.length > 0 && (
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3 dark:border-slate-700/60">
            <div className="min-w-0 flex-1">
              <Progress value={nodePct} className="h-1.5" indicatorClassName="bg-brand-500" />
            </div>
            <span className="font-mono text-[13px] font-medium text-slate-500 dark:text-slate-400">
              {doneCount}/{learnable.length} · {nodePct}%
            </span>
          </div>
        )}

        <ScrollArea className="flex-1 nice-scroll">
          {/* actions */}
          <div className="flex flex-wrap gap-2 border-b border-slate-100 p-4 dark:border-slate-700/60">
            <Button size="sm" className="flex-1 min-w-[8rem]" onClick={onStartLearning}>
              <Play className="h-4 w-4" /> Start Learning
            </Button>
            <Button variant="outline" size="sm" className="min-w-[8rem]" onClick={handleToggle}>
              {completed ? <Check className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              {completed ? "Done" : "Mark as done"}
            </Button>
            <Button
              variant={bookmarked ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={handleBookmark}
              aria-label="Bookmark"
              className={cn(bookmarked && "text-amber-500")}
            >
              <Bookmark className={cn("h-4 w-4", bookmarked && "fill-amber-400")} />
            </Button>
            {!isCareer && !isContainer(node.type) && (
              <Button variant="outline" size="sm" onClick={onMarkSubtree}>
                <ListChecks className="h-4 w-4" /> Mark all complete
              </Button>
            )}
          </div>

          {/* description */}
          <Section icon={BookOpen} title="Overview">
            <p>{d.description}</p>
          </Section>

          {/* subtopics */}
          {subtopics.length > 0 && (
            <Section icon={FolderKanban} title={`Subtopics (${subtopics.length})`}>
              <div className="flex flex-wrap gap-1.5">
                {subtopics.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onNavigate(c.id)}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-600 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </Section>
          )}

          {d.whyLearn && (
            <Section icon={Lightbulb} title="Why learn this">
              <p className="rounded-xl border border-amber-200/70 bg-amber-50 p-3.5 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
                {d.whyLearn}
              </p>
            </Section>
          )}

          {d.prerequisites.length > 0 && (
            <Section icon={Lock} title="Prerequisites">
              <ul className="space-y-2">
                {d.prerequisites.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {d.objectives.length > 0 && (
            <Section icon={Target} title="Learning objectives">
              <ul className="space-y-2">
                {d.objectives.map((o) => (
                  <li key={o} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                    {o}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {d.careerRelevance && (
            <Section icon={Award} title="Career relevance">
              <p className="rounded-xl border border-brand-200/70 bg-brand-50 p-3.5 text-brand-900 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-200">
                {d.careerRelevance}
              </p>
            </Section>
          )}

          {/* resources */}
          {d.resources.length > 0 && (
            <>
              <Separator />
              <Section icon={BookOpen} title={`Resources (${d.resources.length})`}>
                <div className="space-y-4">
                  {groupResources.map(([kind, res]) => (
                    <div key={kind}>
                      <p className="mb-2 text-[13px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{kind}</p>
                      <ul className="space-y-1.5">
                        {res.map((r, i) => (
                          <li key={i}>
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-2.5 rounded-lg border border-slate-100 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-brand-200 hover:bg-brand-50/50 hover:text-brand-700 dark:border-slate-700/60 dark:text-slate-300 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
                            >
                              <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", resourceKind(r.kind).dot)} />
                              <span className="min-w-0 flex-1 truncate">{r.title}</span>
                              <ExternalLink className="h-3 w-3 shrink-0 text-slate-300 group-hover:text-brand-500" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>
            </>
          )}

          {/* projects */}
          {d.projects.length > 0 && (
            <>
              <Separator />
              <Section icon={FolderKanban} title={`Projects (${d.projects.length})`}>
                <div className="space-y-2">
                  {d.projects.map((p, i) => (
                    <div key={i} className="rounded-xl border border-emerald-200/70 bg-emerald-50/60 p-3.5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                        <span className="font-mono text-[10px] text-emerald-500">0{i + 1}</span>
                        {p.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-300/70">
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>
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
                      className="rounded-lg border border-indigo-200/70 bg-indigo-50/50 px-3.5 py-2.5 text-xs font-medium text-indigo-900 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-200"
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
                  <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-rose-500">
                    <AlertTriangle className="h-4 w-4" /> Common mistakes
                  </h3>
                  <ul className="mt-2.5 space-y-1.5">
                    {d.commonMistakes.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-400" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {d.tips.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">
                    <Lightbulb className="h-4 w-4" /> Tips
                  </h3>
                  <ul className="mt-2.5 space-y-1.5">
                    {d.tips.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* notes */}
          <Separator />
          <div className="p-5">
            <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              <NotebookPen className="h-4 w-4" /> Your notes
            </h3>
            <textarea
              value={note}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your own summary, doubts, or links…"
              rows={4}
              className="nice-scroll mt-3 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
            />
            <Button size="sm" variant="outline" className="mt-2" onClick={saveNote}>
              Save note
            </Button>
          </div>

          {/* next topics */}
          {d.nextTopics.length > 0 && (
            <>
              <Separator />
              <div className="p-5">
                <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                  <ArrowRight className="h-4 w-4" /> Next topics
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {d.nextTopics.map((n) => (
                    <Badge key={n} variant="outline" className="cursor-default">
                      {n}
                    </Badge>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  From the <span className="font-semibold">{roadmapTitle}</span> roadmap
                </p>
              </div>
            </>
          )}

          <div className="h-8" />
        </ScrollArea>

        {/* prev / next footer */}
        <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 p-3 dark:border-slate-700/60">
          <Button
            variant="outline"
            size="sm"
            className="min-w-0 flex-1 justify-start"
            disabled={!prev}
            onClick={() => prev && onNavigate(prev.id)}
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate text-xs">{prev?.label ?? "Start"}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="min-w-0 flex-1 justify-end"
            disabled={!next}
            onClick={() => next && onNavigate(next.id)}
          >
            <span className="truncate text-xs">{next?.label ?? "End"}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </Button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
