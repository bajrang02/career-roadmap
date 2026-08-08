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
  ArrowRight
} from "lucide-react";
import { cn, nodeMeta, resourceKind, typeEmoji, isCheckableType } from "@/lib/utils";
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
  const d = node.details;
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

  const groupResources = (() => {
    const groups = new Map<string, typeof d.resources>();
    for (const r of d.resources) {
      const kind = resourceKind(r.kind).label;
      if (!groups.has(kind)) groups.set(kind, []);
      groups.get(kind)!.push(r);
    }
    return Array.from(groups.entries());
  })();

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
            <Badge variant={d.difficulty === "Beginner" ? "success" : d.difficulty === "Intermediate" ? "warning" : "danger"}>
              {d.difficulty}
            </Badge>
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

      {/* actions (moved to sticky header) */}
      <div className="flex flex-wrap gap-2 px-5 pb-4">
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
    </div>
  );

  const scrollContent = (
    <div className="flex-1 nice-scroll">
      <div className="text-[15px] sm:text-[14px]">
          {/* description */}
          <Section icon={BookOpen} title="Overview">
            <p className="text-[16px] sm:text-[14px]">{d.description}</p>
          </Section>

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

          {d.whyLearn && (
            <Section icon={Lightbulb} title="Why learn this">
              <p className="rounded-xl border border-amber-200/70 bg-amber-50 p-3.5 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200 text-[15px] sm:text-[14px]">
                {d.whyLearn}
              </p>
            </Section>
          )}

          {d.prerequisites.length > 0 && (
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

          {d.objectives.length > 0 && (
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

          {/* resources */}
          {d.resources.length > 0 && (
            <>
              <Separator />
              <Section icon={BookOpen} title={`Resources (${d.resources.length})`}>
                <div className="space-y-4">
                  {groupResources.map(([kind, res]) => (
                    <div key={kind}>
                      <p className="mb-2 text-[14px] sm:text-[13px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{kind}</p>
                      <ul className="space-y-2 sm:space-y-1.5">
                        {res.map((r, i) => (
                          <li key={i}>
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-2.5 rounded-lg border border-slate-100 px-3 py-3 sm:py-2 text-[14px] sm:text-xs font-medium text-slate-700 transition hover:border-brand-200 hover:bg-brand-50/50 hover:text-brand-700 dark:border-slate-700/60 dark:text-slate-300 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
                            >
                              <span className={cn("h-2 w-2 sm:h-1.5 sm:w-1.5 shrink-0 rounded-full", resourceKind(r.kind).dot)} />
                              <span className="min-w-0 flex-1 truncate">{r.title}</span>
                              <ExternalLink className="h-4 w-4 sm:h-3 sm:w-3 shrink-0 text-slate-300 group-hover:text-brand-500" />
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
                      <p className="mt-2 text-[14px] sm:text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-300/70">
                        {p.description}
                      </p>
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
              </Section>
            </>
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
            </div>          )}
      </div>

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
