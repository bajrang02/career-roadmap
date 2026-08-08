"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RoadmapIndexEntry } from "@/lib/types";
import { CareerCard } from "@/components/careers/career-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type KindFilter = "all" | "career" | "skill";

export function RoadmapsBrowser({
  roadmaps,
  skillCount,
  totalTopics,
}: {
  roadmaps: (RoadmapIndexEntry & { slug: string })[];
  skillCount: number;
  totalTopics: number;
}) {
  const all = useMemo(() => roadmaps, [roadmaps]);
  const [kind, setKind] = useState<KindFilter>("all");
  const [query, setQuery] = useState("");

  const careerCount = all.filter((r) => r.kind === "career").length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((r) => {
      if (kind !== "all" && r.kind !== kind) return false;
      if (q) {
        const hay = `${r.title} ${r.tagline} ${r.skillCategory || ""} ${r.domain || ""} ${r.industry}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [all, kind, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">
            {all.length} roadmaps · {careerCount} careers · {skillCount} skills ·{" "}
            {totalTopics.toLocaleString("en-US")} topics
          </p>
          <h1 className="page-title mt-1">Every learning roadmap</h1>
          <p className="mt-2 max-w-xl body-text">
            One place to explore every career path and skill — search by name, category or domain.
          </p>
        </div>
      </div>

      {/* search + kind filter */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all roadmaps…"
            className="pl-9"
            aria-label="Search roadmaps"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <div className="flex rounded-full border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-900">
          {(
            [
              { key: "all", label: "All", count: all.length },
              { key: "career", label: "Careers", count: careerCount },
              { key: "skill", label: "Skills", count: skillCount },
            ] as { key: KindFilter; label: string; count: number }[]
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setKind(t.key)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                kind === t.key
                  ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              )}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>
      </div>

      {/* results */}
      {filtered.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-4xl">🗺️</p>
          <h3 className="font-display mt-3 text-lg font-semibold text-slate-900 dark:text-white">
            No roadmaps match
          </h3>
          <p className="mt-1 text-sm text-slate-400">Try a different search or clear the filters.</p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => {
              setKind("all");
              setQuery("");
            }}
          >
            Show everything
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.4) }}
            >
              <CareerCard slug={c.slug} entry={c as RoadmapIndexEntry} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
