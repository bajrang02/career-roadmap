"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpDown, Search, SlidersHorizontal, X } from "lucide-react";
import { listCareers, CAREER_DOMAINS } from "@/lib/data-loader";
import { cn } from "@/lib/utils";
import type { RoadmapIndexEntry } from "@/lib/types";
import { CareerCard } from "@/components/careers/career-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortKey = "popular" | "hours-asc" | "hours-desc" | "topics";
type PathLength = "all" | "short" | "mid" | "long";
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced", "Expert"];

function CareersInner() {
  const params = useSearchParams();
  const all = useMemo(() => listCareers(), []);
  const [domain, setDomain] = useState<string>(params.get("domain") ?? "all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [beginnerFriendly, setBeginnerFriendly] = useState(false);
  const [pathLength, setPathLength] = useState<PathLength>("all");
  const [sort, setSort] = useState<SortKey>("popular");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = all.filter((r) => {
      if (domain !== "all" && r.domain !== domain) return false;
      if (difficulty !== "all" && r.difficulty !== difficulty) return false;
      if (beginnerFriendly && r.difficulty !== "Beginner") return false;
      if (pathLength === "short" && r.durationHours >= 260) return false;
      if (pathLength === "mid" && (r.durationHours < 260 || r.durationHours > 520)) return false;
      if (pathLength === "long" && r.durationHours <= 520) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.industry.toLowerCase().includes(q) &&
          !r.tagline.toLowerCase().includes(q) &&
          !(r.domain || "").toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
    switch (sort) {
      case "hours-asc":
        list = [...list].sort((a, b) => a.durationHours - b.durationHours);
        break;
      case "hours-desc":
        list = [...list].sort((a, b) => b.durationHours - a.durationHours);
        break;
      case "topics":
        list = [...list].sort((a, b) => b.topicCount - a.topicCount);
        break;
      default:
        list = [...list].sort((a, b) => b.demandLevel - a.demandLevel || b.nodeCount - a.nodeCount);
    }
    return list;
  }, [all, domain, difficulty, pathLength, beginnerFriendly, query, sort]);

  // group the *filtered* list by domain for the sectioned browse view
  const grouped = useMemo(() => {
    if (domain !== "all") return null;
    return CAREER_DOMAINS.map((d) => ({
      ...d,
      items: filtered.filter((r) => r.domain === d.label),
    })).filter((g) => g.items.length > 0);
  }, [filtered, domain]);

  const hasFilters =
    domain !== "all" ||
    difficulty !== "all" ||
    pathLength !== "all" ||
    beginnerFriendly ||
    query.trim() !== "";

  const clear = () => {
    setDomain("all");
    setDifficulty("all");
    setPathLength("all");
    setBeginnerFriendly(false);
    setQuery("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">
            {all.length} careers · {CAREER_DOMAINS.length} categories ·{" "}
            {all.reduce((a, r) => a + r.topicCount, 0).toLocaleString("en-US")} topics
          </p>
          <h1 className="page-title mt-1">Explore every career</h1>
          <p className="mt-2 max-w-xl body-text">
            {all.length} technical careers across {CAREER_DOMAINS.length} domains — software,
            AI, security, cloud, engineering and more.
          </p>
        </div>
      </div>

      {/* search + sort */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search careers, domains, skills…"
            className="pl-9"
            aria-label="Search careers"
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4" />
              {sort === "popular"
                ? "Most in demand"
                : sort === "hours-asc"
                  ? "Shortest first"
                  : sort === "hours-desc"
                    ? "Longest first"
                    : "Most topics"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setSort("popular")}>Most in demand</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSort("hours-asc")}>Shortest to longest</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSort("hours-desc")}>Longest to shortest</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSort("topics")}>Most topics</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clear}>
            <X className="h-3.5 w-3.5" /> Reset
          </Button>
        )}
      </div>

      {/* domain chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setDomain("all")}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
            domain === "all"
              ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          )}
        >
          All ({all.length})
        </button>
        {CAREER_DOMAINS.map((d) => (
          <button
            key={d.id}
            onClick={() => setDomain(d.label === domain ? "all" : d.label)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              domain === d.label
                ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            )}
          >
            {d.icon} {d.label} ({d.count})
          </button>
        ))}
      </div>

      {/* filter row */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden"
        >
          <div className="mt-4 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-900/60">
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
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Path length</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: "all", label: "Any", fn: () => true },
                  { key: "short", label: "Under 6 months", fn: (h: number) => h < 260 },
                  { key: "mid", label: "6–12 months", fn: (h: number) => h >= 260 && h <= 520 },
                  { key: "long", label: "1 year +", fn: (h: number) => h > 520 },
                ].map((b) => (
                  <button
                    key={b.key}
                    onClick={() => setPathLength(b.key as PathLength)}
                    aria-pressed={pathLength === b.key}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition",
                      pathLength === b.key
                        ? "bg-brand-600 text-white"
                        : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
                    )}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={beginnerFriendly}
                  onChange={(e) => setBeginnerFriendly(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                Beginner friendly only
              </label>
              <p className="ml-auto text-xs text-slate-400">
                {filtered.length} shown
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* empty state */}
      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-4xl">🔍</p>
          <h3 className="font-display mt-3 text-lg font-semibold text-slate-900 dark:text-white">
            No careers match your filters
          </h3>
          <p className="mt-1 text-sm text-slate-400">Try clearing a filter or searching differently.</p>
          <Button className="mt-4" variant="outline" onClick={clear}>
            Show everything
          </Button>
        </div>
      )}

      {/* grouped browse */}
      {grouped ? (
        <div className="mt-8 space-y-12">
          {grouped.map((g) => (
            <section key={g.id} aria-label={g.label}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-xl dark:bg-brand-950/60">
                  {g.icon}
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {g.label}
                  </h2>
                  <p className="text-xs text-slate-400">{g.items.length} careers</p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {g.items.map((c, i) => (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                  >
                    <CareerCard slug={c.slug} entry={c as RoadmapIndexEntry} />
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
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

export default function CareersPage() {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <CareersInner />
    </Suspense>
  );
}
