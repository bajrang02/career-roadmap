"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock, DollarSign, Flame, FolderKanban } from "lucide-react";
import { cn, formatHours } from "@/lib/utils";
import type { RoadmapIndexEntry } from "@/lib/types";
import { useProgressStore } from "@/lib/stores/progress-store";
import { Badge } from "@/components/ui/badge";

function categoryLabel(entry: RoadmapIndexEntry) {
  if (entry.kind === "skill") return entry.skillCategory || "Skill";
  return entry.domain || (entry.category === "it" ? "Career" : "Career");
}

export function CareerCard({
  slug,
  entry,
  compact,
}: {
  slug: string;
  entry: RoadmapIndexEntry;
  compact?: boolean;
}) {
  const completed = useProgressStore((s) => s.completed);
  const roadmapCompleted = completed.filter((c) => c.roadmap === slug).length;
  // clamp: legacy data or edge cases can never exceed 100%
  const pct = entry.learnable ? Math.min(100, Math.round((roadmapCompleted / entry.learnable) * 100)) : 0;
  const started = roadmapCompleted > 0;

  return (
    <Link
      href={`/roadmap/${slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-px hover:border-brand-300 hover:shadow-cardhover dark:border-slate-700/60 dark:bg-slate-800/80 dark:hover:border-brand-600/50",
        compact && "p-3.5"
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-60"
        style={{ background: `linear-gradient(90deg, ${entry.color}, transparent)` }}
      />
      <div className="flex items-start justify-between">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-lg text-lg shadow-sm"
          style={{ backgroundColor: `${entry.color}1a` }}
        >
          {entry.icon}
        </span>
        <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-500" />
      </div>

      <h3 className="font-display mt-3 line-clamp-1 text-[15px] font-semibold text-slate-900 dark:text-white">
        {entry.title}
      </h3>
      <p className="mt-0.5 line-clamp-1 text-[12px] text-slate-500 dark:text-slate-400">{entry.tagline}</p>

      <div className="mb-3 mt-2.5 flex flex-wrap gap-1">
        <Badge variant="secondary">{categoryLabel(entry)}</Badge>
        <Badge variant={entry.difficulty === "Beginner" ? "success" : entry.difficulty === "Intermediate" ? "warning" : "danger"}>
          {entry.difficulty}
        </Badge>
        {entry.kind !== "skill" && entry.demandLevel >= 4 && (
          <Badge variant="purple">
            <Flame className="h-3 w-3" /> High demand
          </Badge>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-3 text-[12px] text-slate-500 dark:border-slate-700/50 dark:text-slate-400">
        <span className="flex items-center gap-1 whitespace-nowrap">
          <Clock className="h-3 w-3 shrink-0" aria-hidden="true" /> {entry.duration}
        </span>
        <span className="flex items-center gap-1 whitespace-nowrap">
          <FolderKanban className="h-3 w-3 shrink-0" aria-hidden="true" /> {entry.projectCount} projects
        </span>
        {entry.kind === "skill" ? (
          <span className="flex items-center gap-1 whitespace-nowrap">
            <BookOpen className="h-3 w-3 shrink-0" aria-hidden="true" /> {entry.topicCount} topics
          </span>
        ) : (
          <span className="flex items-center gap-1 whitespace-nowrap">
            <DollarSign className="h-3 w-3 shrink-0" aria-hidden="true" /> {entry.salary}
          </span>
        )}
      </div>

      {started && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[13px] font-medium">
            <span className="text-brand-600 dark:text-brand-400">{pct}% complete</span>
            <span className="text-slate-500 dark:text-slate-400">{formatHours(entry.estimatedHours)} total</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500"
            />
          </div>
        </div>
      )}
    </Link>
  );
}
