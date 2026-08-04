"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Bookmark,
  BookOpen,
  CalendarDays,
  Flame,
  NotebookPen,
  Sparkles,
  Target,
} from "lucide-react";
import { roadmapIndex } from "@/lib/data-loader";
import {
  computeStreak,
  last7Active,
  useProgressStore,
  type Certificate,
} from "@/lib/stores/progress-store";
import { useBookmarksStore } from "@/lib/stores/bookmarks-store";
import { useSettingsStore } from "@/lib/stores/settings-store";
import { timeAgo, formatDate, cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerCard } from "@/components/careers/career-card";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/dashboard/empty-state";

type AchievementCheck = (
  n: number,
  done: Record<string, { done: number; total: number }>,
  streak: number,
  bookmarks: number,
  notes: number
) => boolean;

const ACHIEVEMENT_DEFS: {
  key: string;
  icon: string;
  title: string;
  desc: string;
  check: AchievementCheck;
}[] = [
  { key: "first", icon: "🌱", title: "First Step", desc: "Complete your first topic", check: (n) => n >= 1 },
  { key: "ten", icon: "⚡", title: "Getting Going", desc: "Complete 10 topics", check: (n) => n >= 10 },
  { key: "fifty", icon: "🚀", title: "Deep Dive", desc: "Complete 50 topics", check: (n) => n >= 50 },
  { key: "roadmap", icon: "🎓", title: "Roadmap Graduate", desc: "Finish one roadmap 100%", check: (_n, done) => Object.values(done).some((r) => r.total > 0 && r.done >= r.total) },
  { key: "three", icon: "🔥", title: "On Fire", desc: "3-day learning streak", check: (_n, _d, streak) => streak >= 3 },
  { key: "week", icon: "📅", title: "Week Warrior", desc: "7-day learning streak", check: (_n, _d, streak) => streak >= 7 },
  { key: "starter", icon: "🗺️", title: "Explorer", desc: "Start 3 roadmaps", check: (_n, done) => Object.keys(done).length >= 3 },
  { key: "bookmark", icon: "🔖", title: "Curator", desc: "Save your first bookmark", check: (_n, _d, _s, bookmarks) => bookmarks >= 1 },
  { key: "notes", icon: "📝", title: "Note Taker", desc: "Write your first note", check: (_n, _d, _s, _b, notes) => notes >= 1 },
];

export default function DashboardPage() {
  const learnerName = useSettingsStore((s) => s.learnerName);
  const completed = useProgressStore((s) => s.completed);
  const certificates = useProgressStore((s) => s.certificates);
  const grantCertificate = useProgressStore((s) => s.grantCertificate);
  const bookmarks = useBookmarksStore((s) => s.bookmarks);
  const notes = useBookmarksStore((s) => s.notes);

  const perRoadmap = useMemo(() => {
    const map: Record<string, { done: number; total: number }> = {};
    for (const [slug, entry] of Object.entries(roadmapIndex.roadmaps)) {
      const done = completed.filter((c) => c.roadmap === slug).length;
      if (done > 0) map[slug] = { done, total: entry.learnable };
    }
    return map;
  }, [completed]);

  const streak = useMemo(() => computeStreak(completed), [completed]);
  const week = useMemo(() => last7Active(completed), [completed]);

  const totalDone = completed.length;

  const achievements = useMemo(() => {
    const bookmarksCount = bookmarks.length;
    const notesCount = notes.length;
    return ACHIEVEMENT_DEFS.map((a) => {
      const earned = a.check(totalDone, perRoadmap, streak, bookmarksCount, notesCount);
      return { ...a, earned };
    });
  }, [totalDone, perRoadmap, streak, bookmarks, notes]);

  const earnedCount = achievements.filter((a) => a.earned).length;

  // auto-grant certificates for completed roadmaps
  useEffect(() => {
    const grantable = Object.entries(perRoadmap).filter(([, r]) => r.total > 0 && Math.round((r.done / r.total) * 100) >= 100);
    for (const [slug] of grantable) {
      const entry = roadmapIndex.roadmaps[slug];
      if (!entry) continue;
      const exists = certificates.some((c) => c.roadmap === slug);
      if (!exists) {
        grantCertificate({
          roadmap: slug,
          roadmapTitle: entry.title,
          icon: entry.icon,
          name: learnerName || "Learner",
          issuedAt: Date.now(),
          pct: 100,
        });
      }
    }
  }, [perRoadmap, certificates, grantCertificate, learnerName]);

  const startedRoadmaps = Object.entries(perRoadmap)
    .map(([slug, r]) => ({ slug, ...roadmapIndex.roadmaps[slug], done: r.done, total: r.total }))
    .sort((a, b) => b.done - a.done);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* header */}
      <div>
        <p className="eyebrow">Your learning</p>
        <h1 className="page-title mt-1">Dashboard</h1>
        <p className="mt-1 body-text">
          Progress, streaks and certificates — saved privately on this device.
        </p>
      </div>

      {/* stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Target, label: "Topics completed", value: totalDone, color: "text-brand-600 bg-brand-50 dark:bg-brand-950/60 dark:text-brand-400" },
          { icon: Flame, label: "Day streak", value: `${streak}`, color: "text-orange-600 bg-orange-50 dark:bg-orange-950/60 dark:text-orange-400", suffix: " days" },
          { icon: BookOpen, label: "Roadmaps started", value: Object.keys(perRoadmap).length, color: "text-violet-600 bg-violet-50 dark:bg-violet-950/60 dark:text-violet-400" },
          { icon: Award, label: "Certificates earned", value: certificates.length, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-0">
              <CardContent className="flex items-center gap-4 p-5">
                <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", s.color)}>
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    {s.value}
                    {"suffix" in s && <span className="text-sm font-normal text-slate-400">{s.suffix}</span>}
                  </p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* continue learning */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Continue learning
          </h2>
          {startedRoadmaps.length === 0 ? (
            <Card className="mt-3">
              <CardContent className="p-8">
                <EmptyState
                  icon={BookOpen}
                  title="No progress yet"
                  desc="Open any career roadmap and start checking off topics — your progress will appear here."
                  action={{ label: "Browse careers", href: "/careers" }}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {startedRoadmaps.slice(0, 6).map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <CareerCard slug={c.slug} entry={c} />
                </motion.div>
              ))}
            </div>
          )}

          {/* bookmarks */}
          <h2 className="font-display mt-8 text-lg font-bold text-slate-900 dark:text-white">
            Saved nodes
          </h2>
          {bookmarks.length === 0 ? (
            <p className="mt-2 text-sm text-slate-400">
              Bookmark topics while exploring — they&apos;ll show up here.
            </p>
          ) : (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {bookmarks.slice(0, 8).map((b) => {
                const entry = roadmapIndex.roadmaps[b.roadmap];
                return (
                  <Link
                    key={b.id}
                    href={`/roadmap/${b.roadmap}`}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-card transition hover:border-brand-300 hover:shadow-cardhover dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-600"
                  >
                    <Bookmark className="h-4 w-4 shrink-0 text-amber-500" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {b.nodeLabel}
                      </span>
                      <span className="block truncate text-xs text-slate-400">
                        {entry?.icon} {entry?.title} · saved {timeAgo(b.at)}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* right column */}
        <div className="space-y-6">
          {/* streak */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <CalendarDays className="h-4 w-4 text-orange-500" /> This week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-1.5">
                {week.map((d, i) => {
                  const max = Math.max(...week.map((w) => w.count), 1);
                  const h = 24 + (d.count / max) * 40;
                  return (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                      <div className="flex h-16 items-end">
                        <motion.div
                          initial={{ height: 6 }}
                          animate={{ height: d.count > 0 ? h : 6 }}
                          transition={{ delay: i * 0.04, duration: 0.4 }}
                          className={cn(
                            "w-full max-w-6 rounded-full",
                            d.count > 0
                              ? "bg-gradient-to-t from-orange-500 to-amber-400"
                              : "bg-slate-100 dark:bg-slate-800"
                          )}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-slate-400">{d.day}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-orange-50 px-3 py-2 dark:bg-orange-950/40">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-orange-700 dark:text-orange-300">
                  <Flame className="h-3.5 w-3.5" /> {streak}-day streak
                </span>
                <span className="text-[11px] text-orange-500">
                  {streak === 0 ? "Start today!" : "Keep it alive!"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* achievements */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-violet-500" /> Achievements
                <Badge variant="purple" className="ml-auto">{earnedCount}/{achievements.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {achievements.map((a) => (
                  <div
                    key={a.key}
                    title={`${a.title} — ${a.desc}`}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl border p-2.5 text-center transition",
                      a.earned
                        ? "border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/50"
                        : "border-slate-100 opacity-45 grayscale dark:border-slate-800"
                    )}
                  >
                    <span className="text-xl">{a.icon}</span>
                    <span className="text-[10px] font-semibold leading-tight text-slate-600 dark:text-slate-300">
                      {a.title}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* certificates */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="h-4 w-4 text-emerald-500" /> Certificates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {certificates.length === 0 ? (
                <p className="text-sm text-slate-400">
                  Finish a roadmap at 100% to earn a certificate.
                </p>
              ) : (
                certificates.slice(0, 4).map((c: Certificate) => (
                  <div
                    key={c.id}
                    className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-3.5 dark:border-emerald-900 dark:from-emerald-950/40 dark:to-teal-950/40"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-emerald-900 dark:text-emerald-200">
                          {c.roadmapTitle}
                        </p>
                        <p className="text-[11px] text-emerald-700/70 dark:text-emerald-300/60">
                          Awarded to {c.name} · {formatDate(c.issuedAt)}
                        </p>
                      </div>
                      <Award className="h-5 w-5 shrink-0 text-emerald-500" />
                    </div>
                    <div className="mt-2">
                      <Progress value={100} className="h-1" indicatorClassName="bg-emerald-500" />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* notes */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <NotebookPen className="h-4 w-4 text-amber-500" /> Recent notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {notes.length === 0 ? (
                <p className="text-sm text-slate-400">
                  Open a topic and write a note — they show up here.
                </p>
              ) : (
                notes.slice(0, 3).map((n) => {
                  const entry = roadmapIndex.roadmaps[n.roadmap];
                  return (
                    <div key={n.id} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50">
                      <p className="line-clamp-2 text-xs text-slate-600 dark:text-slate-300">{n.text}</p>
                      <p className="mt-1.5 text-[10px] text-slate-400">
                        {entry?.title} · updated {timeAgo(n.updatedAt)}
                      </p>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
