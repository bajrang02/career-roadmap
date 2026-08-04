"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  ListChecks,
  Pencil,
  RefreshCcw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { listRoadmaps, getRoadmap } from "@/lib/data-loader";
import type { Roadmap } from "@/lib/types";
import {
  generateStudyPlan,
  type Pace,
  type StudyDay,
  type StudyPlan,
  type StudyPlanOptions,
  formatMinutes,
} from "@/lib/study-planner/generator";
import { useStudyPlanStore } from "@/lib/stores/study-plan-store";
import { useProgressStore } from "@/lib/stores/progress-store";
import { useUiStore } from "@/lib/stores/ui-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | "plan";

const DAY_PRESETS = [30, 45, 60, 90, 120, 180];

const PACES: { key: Pace; label: string; hint: string; hours: number }[] = [
  { key: "beginner", label: "Beginner", hint: "~1.5 h/day", hours: 1.5 },
  { key: "normal", label: "Normal", hint: "~2.5 h/day", hours: 2.5 },
  { key: "intensive", label: "Intensive", hint: "~4 h/day", hours: 4 },
];

const HOUR_CHOICES = [1, 1.5, 2, 2.5, 3, 4, 5, 6];

const KIND_STYLE: Record<StudyDay["kind"], { label: string; cls: string }> = {
  study: { label: "Study", cls: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300" },
  revision: { label: "Revision", cls: "bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300" },
  project: { label: "Project", cls: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" },
  interview: { label: "Interview", cls: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300" },
  rest: { label: "Rest", cls: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300" },
  milestone: { label: "Milestone", cls: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300" },
  portfolio: { label: "Portfolio", cls: "bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300" },
};

// synthetic items that don't map to real roadmap nodes — skip progress sync
const SYNTHETIC_IDS = new Set(["mock", "polish", "portfolio"]);

const STEP_META: { n: number; label: string }[] = [
  { n: 1, label: "Roadmap" },
  { n: 2, label: "Duration" },
  { n: 3, label: "Preferences" },
];

function formatDate(iso: string) {
  try {
    // parse date-only strings as LOCAL dates ("T00:00:00" would be UTC
    // midnight and shift the day in negative-offset timezones)
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, (m ?? 1) - 1, d ?? 1).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function StudyPlannerDialog({
  slug,
  roadmap,
  onClose,
}: {
  slug: string;
  roadmap: Roadmap;
  onClose: () => void;
}) {
  const toast = useUiStore((s) => s.toast);
  const saved = useStudyPlanStore((s) => s.getPlan(slug));
  const progressFor = useStudyPlanStore((s) => s.progressFor);
  const savePlan = useStudyPlanStore((s) => s.savePlan);
  const regenerate = useStudyPlanStore((s) => s.regenerate);
  const toggleDayComplete = useStudyPlanStore((s) => s.toggleDayComplete);
  const isDayComplete = useStudyPlanStore((s) => s.isDayComplete);
  const toggleNode = useProgressStore((s) => s.toggleNode);

  const [step, setStep] = useState<Step>(() => (saved ? "plan" : 1));
  const [plan, setPlan] = useState<StudyPlan | null>(() => saved ?? null);

  const [selectedSlug, setSelectedSlug] = useState(slug);
  const [roadmapFilter, setRoadmapFilter] = useState("");
  const [days, setDays] = useState(60);
  const [customDays, setCustomDays] = useState("60");
  const [pace, setPace] = useState<Pace>("normal");
  const [hoursPerDay, setHoursPerDay] = useState<number | null>(null);
  const [weekendOnly, setWeekendOnly] = useState(false);
  const [includeRevision, setIncludeRevision] = useState(true);
  const [includeProjects, setIncludeProjects] = useState(true);
  const [includeInterview, setIncludeInterview] = useState(true);
  const [includeRest, setIncludeRest] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(() => new Set([1]));
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const progressCompleted = useProgressStore((s) => s.completed);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const roadmaps = useMemo(() => listRoadmaps().sort((a, b) => a.title.localeCompare(b.title)), []);
  const filteredRoadmaps = useMemo(() => {
    const q = roadmapFilter.trim().toLowerCase();
    if (!q) return roadmaps;
    return roadmaps.filter((r) => r.title.toLowerCase().includes(q));
  }, [roadmaps, roadmapFilter]);

  // focus + Escape + scroll lock
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    panelRef.current?.focus({ preventScroll: true });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, []);

  const generate = async () => {
    setLoading(true);
    try {
      let data: Roadmap = roadmap;
      if (selectedSlug !== roadmap.meta.slug) {
        data = await getRoadmap(selectedSlug);
      }
      const opts: StudyPlanOptions = {
        days: days || 30,
        pace,
        hoursPerDay,
        weekendOnly,
        includeRevision,
        includeProjects,
        includeInterview,
        includeRest,
        startDate: startDate || undefined,
      };
      const p = generateStudyPlan(data, opts);
      savePlan(p);
      setPlan(p);
      setExpandedDays(new Set([1]));
      setStep("plan");
      toast("Study plan generated", {
        description: `A ${p.days.length}-day schedule for ${data.meta.title} is ready.`,
      });
    } catch {
      toast("Couldn't generate plan", { description: "Try again in a moment.", kind: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!plan) return;
    setLoading(true);
    try {
      let data: Roadmap = roadmap;
      if (plan.slug !== roadmap.meta.slug) {
        data = await getRoadmap(plan.slug);
      }
      const p = generateStudyPlan(data, plan.options);
      regenerate(p); // fresh schedule + reset marks
      setPlan(p);
      setExpandedDays(new Set([1]));
      toast("Plan regenerated", {
        description: "A fresh schedule was generated and day marks were reset.",
      });
    } catch {
      toast("Couldn't regenerate plan", { description: "Try again in a moment.", kind: "error" });
    } finally {
      setLoading(false);
    }
  };

  const doneProgressIds = useMemo(() => {
    const set = new Set<string>();
    for (const c of progressCompleted) {
      if (c.roadmap === selectedSlug) set.add(c.nodeId);
    }
    return set;
  }, [progressCompleted, selectedSlug]);

  const toggleDay = (d: StudyDay) => {
    const becomingDone = !isDayComplete(selectedSlug, d.day);
    toggleDayComplete(selectedSlug, d.day);
    // sync with progress tracking — only flip topics whose state actually
    // changes (idempotent), so already-completed items are never unmarked
    for (const it of d.items) {
      if (!it.nodeId || SYNTHETIC_IDS.has(it.nodeId)) continue;
      const isDone = doneProgressIds.has(it.nodeId);
      if (becomingDone && !isDone) toggleNode(selectedSlug, it.nodeId, it.label);
      if (!becomingDone && isDone) toggleNode(selectedSlug, it.nodeId, it.label);
    }
    toast(becomingDone ? `Day ${d.day} complete 🎉` : `Day ${d.day} reopened`, {
      description: becomingDone
        ? "Topics synced to your progress."
        : "Topics marked incomplete again.",
      kind: becomingDone ? "success" : "info",
    });
  };

  const toggleExpand = (day: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const currentPlan = plan && plan.slug === selectedSlug ? plan : null;
  const planProgress = currentPlan ? progressFor(selectedSlug) ?? 0 : 0;

  const renderRoadmapRow = (r: (typeof roadmaps)[number]) => {
    const active = r.slug === selectedSlug;
    return (
      <button
        key={r.slug}
        onClick={() => setSelectedSlug(r.slug)}
        className={cn(
          "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all",
          active
            ? "border-brand-300 bg-brand-50/70 ring-1 ring-brand-300 dark:border-brand-700 dark:bg-brand-950/40"
            : "border-slate-200 hover:border-brand-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-brand-800 dark:hover:bg-slate-800/60"
        )}
      >
        <span className="text-lg">{r.icon}</span>
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800 dark:text-slate-100">
          {r.title}
        </span>
        {r.nodeCount > 0 && (
          <span className="shrink-0 font-mono text-[10px] text-slate-400">{r.learnable} topics</span>
        )}
        {active && <Check className="h-4 w-4 shrink-0 text-brand-600" />}
      </button>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Generate study plan"
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="document"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl outline-none sm:max-h-[86vh] sm:max-w-3xl sm:rounded-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        {/* header */}
        <div className="flex items-center gap-3 border-b border-slate-100 p-4 sm:p-5 dark:border-slate-800">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-md">
            <CalendarDays className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-bold text-slate-900 dark:text-white">
              {step === "plan" ? "Your study plan" : "Generate study plan"}
            </p>
            <p className="text-[11px] text-slate-400">
              A personalized day-by-day schedule for the whole roadmap.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Close planner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* step indicator */}
        {step !== "plan" && (
          <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-2.5 sm:px-5 dark:border-slate-800">
            {STEP_META.map((s, i) => {
              const active = step === s.n;
              const done = (step as number) > s.n;
              return (
                <div key={s.n} className="flex items-center gap-1.5">
                  {i > 0 && <span className="h-px w-4 bg-slate-200 dark:bg-slate-700" />}
                  <button
                    onClick={() => (step as number) > s.n && setStep(s.n as Step)}
                    disabled={(step as number) <= s.n}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition",
                      active
                        ? "bg-brand-600 text-white shadow-sm"
                        : done
                          ? "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-950/60 dark:text-brand-300"
                          : "text-slate-400"
                    )}
                  >
                    {done ? <Check className="h-3 w-3" /> : <span className="font-mono">{s.n}</span>}
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* body */}
        <div ref={bodyRef} className="nice-scroll flex-1 overflow-y-auto">
          <AnimatePresence mode="wait" initial={false}>
            {/* ── STEP 1: roadmap ─────────────────────────────────────────── */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.18 }}
                className="p-4 sm:p-5"
              >
                <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                  Which roadmap do you want to learn?
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Topics are scheduled in roadmap order so dependencies come first.
                </p>
                <div className="relative mt-3">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    value={roadmapFilter}
                    onChange={(e) => setRoadmapFilter(e.target.value)}
                    placeholder="Filter roadmaps…"
                    aria-label="Filter roadmaps"
                    className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
                <div className="nice-scroll mt-3 max-h-[46vh] space-y-1.5 overflow-y-auto pr-1">
                  {filteredRoadmaps.length === 0 && (
                    <p className="py-6 text-center text-xs text-slate-400">No roadmaps match.</p>
                  )}
                  {filteredRoadmaps.map(renderRoadmapRow)}
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: duration ────────────────────────────────────────── */}
            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.18 }}
                className="p-4 sm:p-5"
              >
                <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                  How many days do you want to complete this roadmap?
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {DAY_PRESETS.map((d) => (
                    <button
                      key={d}
                      onClick={() => {
                        setDays(d);
                        setCustomDays(String(d));
                      }}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-center transition-all",
                        days === d && customDays === String(d)
                          ? "border-brand-400 bg-brand-50 ring-1 ring-brand-300 dark:border-brand-600 dark:bg-brand-950/40"
                          : "border-slate-200 hover:border-brand-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-brand-800 dark:hover:bg-slate-800/60"
                      )}
                    >
                      <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
                        {d}
                      </span>
                      <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        Days
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Custom
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={730}
                    value={customDays}
                    onChange={(e) => {
                      setCustomDays(e.target.value);
                      const v = parseInt(e.target.value, 10);
                      if (v >= 1) setDays(v);
                    }}
                    aria-label="Custom number of days"
                    className="h-9 w-24 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-800 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                  <span className="text-xs text-slate-400">days</span>
                  <div className="ml-auto flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      aria-label="Start date (optional)"
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-600 focus:border-brand-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: preferences ─────────────────────────────────────── */}
            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.18 }}
                className="space-y-5 p-4 sm:p-5"
              >
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    Pick your pace
                  </h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {PACES.map((p) => (
                      <button
                        key={p.key}
                        onClick={() => setPace(p.key)}
                        className={cn(
                          "rounded-xl border px-3 py-3 text-left transition-all",
                          pace === p.key
                            ? "border-brand-400 bg-brand-50 ring-1 ring-brand-300 dark:border-brand-600 dark:bg-brand-950/40"
                            : "border-slate-200 hover:border-brand-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-brand-800 dark:hover:bg-slate-800/60"
                        )}
                      >
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{p.label}</p>
                        <p className="mt-0.5 text-[11px] text-slate-400">{p.hint}</p>
                      </button>
                    ))}
                  </div>
                  {hoursPerDay === null && (
                    <p className="mt-2 text-[11px] text-slate-400">
                      Pace sets hours/day. Set an exact budget below to override it.
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    Hours per day
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setHoursPerDay(null)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                        hoursPerDay === null
                          ? "border-brand-400 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
                          : "border-slate-200 text-slate-500 hover:border-brand-200 dark:border-slate-700 dark:text-slate-400"
                      )}
                    >
                      Auto
                    </button>
                    {HOUR_CHOICES.map((h) => (
                      <button
                        key={h}
                        onClick={() => setHoursPerDay(h)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                          hoursPerDay === h
                            ? "border-brand-400 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
                            : "border-slate-200 text-slate-500 hover:border-brand-200 dark:border-slate-700 dark:text-slate-400"
                        )}
                      >
                        {h} h
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    Structure
                  </h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {[
                      { key: "weekendOnly" as const, label: "Weekends only", hint: "Schedule only on Saturdays & Sundays", value: weekendOnly, set: setWeekendOnly },
                      { key: "includeRevision" as const, label: "Revision days", hint: "Regular spaced review sessions", value: includeRevision, set: setIncludeRevision },
                      { key: "includeProjects" as const, label: "Project days", hint: "Dedicated days for hands-on projects", value: includeProjects, set: setIncludeProjects },
                      { key: "includeInterview" as const, label: "Interview prep", hint: "Practice common interview questions", value: includeInterview, set: setIncludeInterview },
                      { key: "includeRest" as const, label: "Rest days", hint: "Weekly rest to avoid burnout", value: includeRest, set: setIncludeRest },
                    ].map((t) => (
                      <button
                        key={t.key}
                        onClick={() => t.set(!t.value)}
                        aria-pressed={t.value}
                        className={cn(
                          "flex items-start gap-2.5 rounded-xl border p-3 text-left transition-all",
                          t.value
                            ? "border-brand-300 bg-brand-50/60 dark:border-brand-700 dark:bg-brand-950/30"
                            : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/60"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition",
                            t.value
                              ? "border-brand-500 bg-brand-600 text-white"
                              : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                          )}
                        >
                          {t.value && <Check className="h-3 w-3" strokeWidth={3} />}
                        </span>
                        <span>
                          <span className="block text-xs font-semibold text-slate-800 dark:text-slate-100">
                            {t.label}
                          </span>
                          <span className="block text-[10px] text-slate-400">{t.hint}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── PLAN VIEW ───────────────────────────────────────────────── */}
            {step === "plan" && currentPlan && (
              <motion.div
                key="plan"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-5"
              >
                {/* summary */}
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-50/80 to-violet-50/60 p-4 dark:border-slate-700 dark:from-brand-950/40 dark:to-violet-950/30">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg">{roadmaps.find((r) => r.slug === currentPlan.slug)?.icon ?? "🗺️"}</span>
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      {currentPlan.roadmapTitle}
                    </h3>
                    <Badge variant="outline" className="ml-auto">
                      <Clock className="h-3 w-3" /> ~{currentPlan.summary.hoursPerDay} h/day
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <span><b className="font-mono text-slate-700 dark:text-slate-200">{currentPlan.days.length}</b> days</span>
                    <span><b className="font-mono text-slate-700 dark:text-slate-200">{currentPlan.summary.totalTopics}</b> topics</span>
                    <span><b className="font-mono text-slate-700 dark:text-slate-200">{currentPlan.summary.totalProjects}</b> projects</span>
                    <span><b className="font-mono text-slate-700 dark:text-slate-200">{formatMinutes(currentPlan.summary.totalMinutes)}</b> total</span>
                    {currentPlan.options.weekendOnly && <Badge variant="secondary">Weekends only</Badge>}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/80 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-500"
                        style={{ width: `${planProgress}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                      {planProgress}%
                    </span>
                  </div>
                </div>

                {/* actions */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setStep(1)}
                    aria-label="Edit plan settings"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleRegenerate} disabled={loading}>
                    {loading ? (
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-brand-600" />
                    ) : (
                      <RefreshCcw className="h-3.5 w-3.5" />
                    )}{" "}
                    Regenerate
                  </Button>
                </div>

                {/* day list */}
                <div className="mt-4 space-y-2">
                  {currentPlan.days.map((d) => {
                    const done = isDayComplete(selectedSlug, d.day);
                    const open = expandedDays.has(d.day);
                    const kind = KIND_STYLE[d.kind];
                    return (
                      <div
                        key={d.day}
                        className={cn(
                          "rounded-xl border transition-colors",
                          done
                            ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/60 dark:bg-emerald-950/20"
                            : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                        )}
                      >
                        <div className="flex items-center gap-3 p-3">
                          <button
                            onClick={() => toggleDay(d)}
                            aria-label={done ? `Mark day ${d.day} incomplete` : `Mark day ${d.day} complete`}
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all",
                              done
                                ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                                : "border-slate-300 bg-white text-transparent hover:border-emerald-400 dark:border-slate-600 dark:bg-slate-800"
                            )}
                          >
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </button>
                          <button
                            onClick={() => toggleExpand(d.day)}
                            className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                            aria-expanded={open}
                          >
                            <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-200">
                              Day {d.day}
                            </span>
                            {d.date && (
                              <span className="hidden text-[10px] text-slate-400 sm:inline">
                                {formatDate(d.date)}
                              </span>
                            )}
                            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", kind.cls)}>
                              {kind.label}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                              {d.title}
                            </span>
                            <span className="shrink-0 font-mono text-[10px] text-slate-400">
                              {formatMinutes(d.minutes)}
                            </span>
                            {open ? (
                              <ChevronUp className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                            )}
                          </button>
                        </div>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.18, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              {d.items.length > 0 ? (
                                <ul className="space-y-1 border-t border-slate-100 px-4 py-3 dark:border-slate-800">
                                  {d.items.map((it, i) => (
                                    <li
                                      key={`${d.day}-${i}`}
                                      className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                                    >
                                      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", done ? "bg-emerald-400" : "bg-brand-400")} />
                                      <span className="min-w-0 flex-1 truncate">{it.label}</span>
                                      {it.section && it.section !== d.title && (
                                        <span className="hidden shrink-0 text-[10px] text-slate-400 md:inline">
                                          {it.section}
                                        </span>
                                      )}
                                      <span className="shrink-0 font-mono text-[10px] text-slate-400">
                                        {formatMinutes(it.minutes)}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="border-t border-slate-100 px-4 py-2.5 text-[11px] italic text-slate-400 dark:border-slate-800">
                                  {d.kind === "rest"
                                    ? "Take a break — your brain consolidates while you rest."
                                    : "Light day — catch up or go deeper on anything from the week."}
                                </p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Sparkles className="h-3 w-3" />
                  Your plan is saved automatically — close and come back anytime to resume.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* footer */}
        <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 p-3.5 sm:px-5 dark:border-slate-800">
          {step === "plan" ? (
            <>
              <Button variant="ghost" size="sm" onClick={onClose}>
                Done
              </Button>
              <Button size="sm" className="ml-auto" onClick={() => bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" })}>
                <ListChecks className="h-3.5 w-3.5" /> Overview
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (step > 1 ? setStep((step - 1) as Step) : onClose())}
                disabled={loading}
              >
                <ArrowLeft className="h-3.5 w-3.5" /> {step > 1 ? "Back" : "Cancel"}
              </Button>
              {step < 3 ? (
                <Button
                  size="sm"
                  className="ml-auto"
                  onClick={() => setStep((step + 1) as Step)}
                  disabled={step === 1 && !selectedSlug}
                >
                  Continue <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              ) : (
                <Button size="sm" className="ml-auto" onClick={generate} disabled={loading}>
                  {loading ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <FileText className="h-3.5 w-3.5" /> Generate Study Plan
                    </>
                  )}
                </Button>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
