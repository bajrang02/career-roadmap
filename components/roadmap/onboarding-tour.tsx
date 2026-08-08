"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Flame,
  HelpCircle,
  ListOrdered,
  MousePointerClick,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** localStorage key — "1" means the user has already seen the tour. */
const TOUR_SEEN_KEY = "cr-tour-seen-v1";

export function hasSeenTour(): boolean {
  try {
    return localStorage.getItem(TOUR_SEEN_KEY) === "1";
  } catch {
    return true; // storage unavailable — don't nag
  }
}

export function markTourSeen() {
  try {
    localStorage.setItem(TOUR_SEEN_KEY, "1");
  } catch {
    /* storage unavailable — skip */
  }
}

interface Step {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  icon: React.ElementType;
  iconClass: string;
}

interface OnboardingTourProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  isMobile?: boolean;
  topicCount?: number;
}

const STEPS = (
  isMobile: boolean,
  title: string,
  icon: string | undefined,
  topicCount?: number
): Step[] => [
  {
    id: "map",
    eyebrow: "Your roadmap",
    title: `Welcome to ${title}`,
    body: [
      `This is your ${icon} ${title} roadmap — every topic you need to learn, laid out in the order to learn it.`,
      `Sections group related skills. Read top to bottom: each card is one step on the path to ${title}.`,
      ...(topicCount
        ? [`There are ${topicCount} topics in total — but you learn them one card at a time.`]
        : []),
    ],
    icon: ListOrdered,
    iconClass: "from-brand-500 to-indigo-500 shadow-brand-500/30",
  },
  {
    id: "open",
    eyebrow: "Explore",
    title: isMobile ? "Tap a card to expand it" : "Click a card to expand it",
    body: [
      "Tap any card to open or close that branch of the map — sections unfold to reveal the topics inside.",
      "To dive into a topic, use the open-book button on its card: it opens a details panel with a plain-language overview, curated resources and hands-on projects.",
      isMobile
        ? "The panel slides up from the bottom — swipe down to close it."
        : "The panel slides in from the right — hit Esc to close it.",
    ],
    icon: MousePointerClick,
    iconClass: "from-emerald-500 to-teal-500 shadow-emerald-500/30",
  },
  {
    id: "progress",
    eyebrow: "Keep going",
    title: "Track your progress",
    body: [
      "Tick topics off as you learn — your progress, streaks and bookmarks are saved privately on this device.",
      "Generate a study plan to turn this map into a day-by-day schedule.",
    ],
    icon: Flame,
    iconClass: "from-amber-500 to-orange-500 shadow-amber-500/30",
  },
];

export function OnboardingTour({
  open,
  onClose,
  title,
  icon,
  isMobile = false,
  topicCount,
}: OnboardingTourProps) {
  const [step, setStep] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const steps = STEPS(isMobile, title, icon, topicCount);
  const current = steps[step];
  const isLast = step === steps.length - 1;

  // reset to the first step each time the tour is (re)opened
  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  // modal focus management: move focus into the dialog on open (so the viewer's
  // global arrow-key handler ignores keys while the tour is up) and restore it
  // to whatever the user was focused on when the tour closes.
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    cardRef.current?.focus();
    return () => prev?.focus?.();
  }, [open]);

  const close = useCallback(() => {
    markTourSeen();
    onClose();
  }, [onClose]);

  const next = useCallback(() => {
    if (isLast) close();
    else setStep((s) => s + 1);
  }, [isLast, close]);

  // Esc closes the tour; ← / → move between steps
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") setStep((s) => Math.max(0, s - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next]);

  const stepDots = (
    <div className="flex items-center gap-1.5" role="group" aria-label={`Step ${step + 1} of ${steps.length}`}>
      {steps.map((s, i) => (
        <button
          key={s.id}
          onClick={() => setStep(i)}
          aria-label={`Go to step ${i + 1}`}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            i === step ? "w-6 bg-brand-600" : "w-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
          )}
        />
      ))}
    </div>
  );

  // The overlay mounts/unmounts through plain conditional rendering (no
  // exit animation): dismissing the tour must never be blocked by an
  // animation that could stall (background tab, heavy load). Entry uses a
  // compositor-driven CSS fade that stays smooth regardless.
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-sm animate-in fade-in-0"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Getting started tour"
    >
      <div
        ref={cardRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative m-auto w-full max-w-[400px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 animate-in fade-in-0 outline-none dark:border-slate-700 dark:bg-slate-900"
      >
              {/* top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-brand-500 via-indigo-500 to-violet-500" />

              <button
                onClick={close}
                aria-label="Close tour"
                className="absolute right-3 top-4 z-10 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-6 pb-5 sm:p-7 sm:pb-5">
                {/* keyed remount + compositor-driven CSS fade: the new step is
                    always rendered immediately (no exit-gated swap that could
                    stall), and the fade itself runs on the compositor thread
                    so it stays smooth even when JS is busy. */}
                <div key={current.id} className="animate-in fade-in-0">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                      current.iconClass
                    )}
                  >
                    <current.icon className="h-6 w-6" />
                  </span>

                  <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-400">
                    {current.eyebrow}
                  </p>
                  <h2 className="font-display mt-1 text-[22px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                    {current.title}
                  </h2>

                  <div className="mt-3 space-y-2">
                    {current.body.map((line, i) => (
                      <p key={i} className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* step visuals — small, self-drawn illustrations of the actual UI */}
                <div className="mt-5 flex min-h-[110px] items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                  <div key={`visual-${current.id}`} className="animate-in fade-in-0 flex w-full items-center justify-center">
                      {current.id === "map" && (
                        <div className="relative flex flex-col items-center py-1">
                          <span className="absolute bottom-2 top-2 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
                          {[
                            { label: "Section 1 · start here", done: true },
                            { label: "Section 2 · build", done: false },
                            { label: "Your first project", done: false },
                          ].map((c) => (
                            <div key={c.label} className="relative flex items-center gap-2">
                              <span
                                className={cn(
                                  "flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold",
                                  c.done
                                    ? "border-emerald-400 bg-emerald-500 text-white"
                                    : "border-slate-300 bg-white text-slate-300 dark:border-slate-600 dark:bg-slate-800"
                                )}
                              >
                                {c.done ? <Check className="h-3 w-3" /> : c.label.split(" ").filter((w) => /^[a-z]/i.test(w)).map((w) => w[0]).slice(0, 2).join("")}
                              </span>
                              <span
                                className={cn(
                                  "rounded-lg border px-2.5 py-1 text-[11px] font-semibold",
                                  c.done
                                    ? "border-emerald-200 bg-white text-emerald-700 dark:border-emerald-700/50 dark:bg-slate-800 dark:text-emerald-300"
                                    : "border-slate-200 bg-white text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                )}
                              >
                                {c.label}
                              </span>
                              <span className="absolute bottom-[-6px] left-[10px] h-1.5 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
                            </div>
                          ))}
                        </div>
                      )}

                      {current.id === "open" && (
                        <div className="w-full max-w-[250px] rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm dark:border-slate-600 dark:bg-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm dark:bg-slate-700">
                              📘
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="h-2 w-24 rounded-full bg-slate-200 dark:bg-slate-600" />
                              <div className="mt-1.5 h-1.5 w-16 rounded-full bg-slate-100 dark:bg-slate-700" />
                            </div>
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                              <Check className="h-3 w-3 text-white" />
                            </span>
                          </div>
                          <div className="mt-3 space-y-1.5">
                            <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700" />
                            <div className="h-1.5 w-4/5 rounded-full bg-slate-100 dark:bg-slate-700" />
                            <div className="h-1.5 w-3/5 rounded-full bg-slate-100 dark:bg-slate-700" />
                          </div>
                          <div className="mt-3 flex gap-1.5">
                            <span className="rounded-md bg-brand-600 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
                              Resources
                            </span>
                            <span className="rounded-md bg-emerald-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                              Projects
                            </span>
                            <span className="rounded-md bg-indigo-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                              Interview
                            </span>
                          </div>
                        </div>
                      )}

                      {current.id === "progress" && (
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          {[
                            { icon: CheckCircle2, label: "12 topics done", cls: "text-emerald-500" },
                            { icon: Flame, label: "3-day streak", cls: "text-orange-500" },
                            { icon: CalendarDays, label: "Study plan", cls: "text-violet-500" },
                          ].map((s) => (
                            <span
                              key={s.label}
                              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            >
                              <s.icon className={cn("h-3.5 w-3.5", s.cls)} />
                              {s.label}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                </div>

                {/* footer controls */}
                <div className="mt-5 flex items-center justify-between gap-2">
                  {stepDots}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={close} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
                      Skip
                    </Button>
                    {!isLast && (
                      <Button
                        size="sm"
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={step === 0}
                        variant="outline"
                        className="px-2.5"
                        aria-label="Previous step"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" onClick={next} className="gap-1.5 bg-brand-600 hover:bg-brand-700">
                      {isLast ? (
                        <>
                          <HelpCircle className="h-4 w-4" /> Start exploring
                        </>
                      ) : (
                        <>
                          Next <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
    </div>
    </div>
  );
}
