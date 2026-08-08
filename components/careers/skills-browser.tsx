"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RoadmapIndexEntry, SkillCategoryMeta } from "@/lib/types";
import { CareerCard } from "@/components/careers/career-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function SkillsBrowser({
  skills,
  categories,
  skillCount,
}: {
  skills: (RoadmapIndexEntry & { slug: string })[];
  categories: SkillCategoryMeta[];
  skillCount: number;
}) {
  const params = useSearchParams();
  const all = useMemo(() => skills, [skills]);
  const [category, setCategory] = useState<string>(params.get("category") ?? "all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [showFilters, setShowFilters] = useState(false);

  // skill categories in canonical taxonomy order (from the generated registry),
  // with live counts from the index
  const categoryChips = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of all) {
      if (r.kind !== "skill") continue;
      const c = r.skillCategory || "Other";
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    const order = new Map(categories.map((c) => [c.label, true]));
    const out: { id: string; count: number }[] = [];
    for (const c of categories) {
      if (counts.has(c.label)) out.push({ id: c.label, count: counts.get(c.label) ?? 0 });
    }
    // any category not in the registry (defensive) still shows, after canonical ones
    for (const [label, count] of counts) {
      if (!order.has(label)) out.push({ id: label, count });
    }
    return out;
  }, [all, categories]);

  const filtered = useMemo(() => {
    const list = all.filter((r) => {
      if (category !== "all" && r.skillCategory !== category) return false;
      if (difficulty !== "all" && r.difficulty !== difficulty) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.tagline.toLowerCase().includes(q) &&
          !(r.skillCategory || "").toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
    return [...list].sort((a, b) => a.title.localeCompare(b.title));
  }, [all, category, difficulty, query]);

  const hasFilters = category !== "all" || difficulty !== "all" || query.trim() !== "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">
            {all.length} skills · {all.reduce((a, r) => a + r.topicCount, 0).toLocaleString("en-US")} topics
          </p>
          <h1 className="page-title mt-1">Master any skill</h1>
          <p className="mt-2 max-w-xl body-text">
            {skillCount} structured skill roadmaps — languages, frameworks, tools and platforms —
            each following the same beginner → expert progression.
          </p>
        </div>
      </div>

      {/* search + filters */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, categories…"
            className="pl-9"
            aria-label="Search skills"
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
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters((v) => !v)}
          className={cn(showFilters && "border-brand-400 text-brand-600")}
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </Button>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setCategory("all");
              setDifficulty("all");
              setQuery("");
            }}
          >
            <X className="h-3.5 w-3.5" /> Reset
          </Button>
        )}
      </div>

      {/* category chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {[{ id: "all", count: all.length }, ...categoryChips].map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              category === c.id
                ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            )}
          >
            {c.id === "all" ? `All (${c.count})` : `${c.id} (${c.count})`}
          </button>
        ))}
      </div>

      {/* difficulty filter */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden"
        >
          <div className="mt-4 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-900/60">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Difficulty</p>
              <div className="flex flex-wrap gap-1.5">
                {["all", ...DIFFICULTIES].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition",
                      difficulty === d
                        ? "bg-brand-600 text-white"
                        : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
                    )}
                  >
                    {d === "all" ? "Any" : d}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end">
              <p className="text-xs text-slate-400">
                Showing <span className="font-semibold text-slate-600 dark:text-slate-200">{filtered.length}</span> of {all.length} skills
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-4xl">🧩</p>
          <h3 className="font-display mt-3 text-lg font-semibold text-slate-900 dark:text-white">
            No skills match your filters
          </h3>
          <p className="mt-1 text-sm text-slate-400">Try a different category or clear the filters.</p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => {
              setCategory("all");
              setDifficulty("all");
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
