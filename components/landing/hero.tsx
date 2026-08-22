"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Search, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Static stats are computed server-side (app/page.tsx) and passed down so the
// 150 KB catalog index never ships to the client bundle.
export interface HeroStats {
  careers: number;
  skills: number;
  roadmaps: number;
  topics: number;
}

function HeroMindmap() {
  const reduced = useReducedMotion();
  const nodes = [
    // career
    { id: "c", x: 20, y: 170, w: 108, h: 44, type: "career", label: "Career" },
    // sections
    { id: "s1", x: 220, y: 40, w: 100, h: 38, type: "section", label: "Frontend" },
    { id: "s2", x: 220, y: 170, w: 100, h: 38, type: "section", label: "Backend" },
    { id: "s3", x: 220, y: 300, w: 100, h: 38, type: "section", label: "DevOps" },
    // subsections
    { id: "t1", x: 402, y: 12, w: 92, h: 30, type: "topic", label: "HTML" },
    { id: "t2", x: 402, y: 58, w: 92, h: 30, type: "topic", label: "CSS" },
    { id: "t3", x: 402, y: 104, w: 92, h: 30, type: "topic", label: "React" },
    { id: "t4", x: 402, y: 150, w: 92, h: 30, type: "topic", label: "Node.js" },
    { id: "t5", x: 402, y: 196, w: 92, h: 30, type: "topic", label: "APIs" },
    { id: "t6", x: 402, y: 278, w: 92, h: 30, type: "topic", label: "Docker" },
    { id: "t7", x: 402, y: 324, w: 92, h: 30, type: "topic", label: "CI/CD" },
    // concepts
    { id: "p1", x: 566, y: 2, w: 74, h: 24, type: "concept", label: "Semantics" },
    { id: "p2", x: 566, y: 36, w: 74, h: 24, type: "concept", label: "Flexbox" },
    { id: "p3", x: 566, y: 92, w: 74, h: 24, type: "concept", label: "Hooks" },
    { id: "p4", x: 566, y: 140, w: 74, h: 24, type: "concept", label: "Express" },
    { id: "p5", x: 566, y: 186, w: 74, h: 24, type: "concept", label: "REST" },
    { id: "p6", x: 566, y: 268, w: 74, h: 24, type: "concept", label: "Images" },
    { id: "p7", x: 566, y: 314, w: 74, h: 24, type: "concept", label: "Pipelines" },
  ];
  const edges = [
    ["c", "s1"], ["c", "s2"], ["c", "s3"],
    ["s1", "t1"], ["s1", "t2"], ["s1", "t3"],
    ["s2", "t4"], ["s2", "t5"],
    ["s3", "t6"], ["s3", "t7"],
    ["t1", "p1"], ["t2", "p2"], ["t3", "p3"], ["t4", "p4"], ["t5", "p5"], ["t6", "p6"], ["t7", "p7"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const duration = reduced ? 0 : 0.8;

  return (
    <svg
      viewBox="0 0 660 360"
      className="h-auto w-full"
      role="img"
      aria-label="Animated example of a career roadmap"
    >
      {/* edges */}
      {edges.map(([a, b], i) => {
        const s = byId[a];
        const t = byId[b];
        const x1 = s.x + s.w;
        const y1 = s.y + s.h / 2;
        const x2 = t.x;
        const y2 = t.y + t.h / 2;
        const mx = (x1 + x2) / 2;
        const d = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
        return (
          <motion.path
            key={i}
            d={d}
            fill="none"
            className={i < 3 ? "stroke-[#3b82f6]" : "stroke-[#93c5fd] dark:stroke-[#475569]"}
            strokeWidth={i < 3 ? 2 : 1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration, delay: 0.15 + i * 0.03, ease: "easeOut" }}
          />
        );
      })}
      {/* nodes */}
      {nodes.map((n, i) => {
        const card =
          n.type === "career"
            ? "fill-[#2563eb] dark:fill-[#3b82f6]"
            : n.type === "section"
              ? "fill-[#fbbf24]"
              : n.type === "topic"
                ? "fill-white stroke-[#e2e8f0] dark:fill-[#1e293b] dark:stroke-[#334155]"
                : "fill-[#f8fafc] stroke-[#e2e8f0] dark:fill-[#172033] dark:stroke-[#334155]";
        const text =
          n.type === "career"
            ? "fill-white font-semibold"
            : n.type === "section"
              ? "fill-[#78350f] font-semibold"
              : n.type === "topic"
                ? "fill-[#334155] font-medium dark:fill-[#e2e8f0]"
                : "fill-[#64748b] dark:fill-[#94a3b8]";
        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, y: reduced ? 0 : 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.2 + i * 0.04, ease: "backOut" }}
            className="group"
          >
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx={n.type === "career" ? 14 : n.type === "section" ? 12 : 9}
              className={`${card} drop-shadow-sm transition-transform duration-200 group-hover:scale-105`}
              style={{ transformOrigin: `${n.x + n.w / 2}px ${n.y + n.h / 2}px` }}
            />
            <text
              x={n.x + n.w / 2}
              y={n.y + n.h / 2 + 4}
              textAnchor="middle"
              className={`${text} text-[11px]`}
              pointerEvents="none"
            >
              {n.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

export function Hero({ stats }: { stats: HeroStats }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const suggestions = ["Full Stack Developer", "AI Engineer", "Cybersecurity Analyst", "Cloud Engineer"];
  const totalCareers = stats.careers;
  const totalRoadmaps = stats.roadmaps;

  const go = useCallback(
    (raw: string) => {
      const query = raw.trim();
      if (!query) return;
      const needle = query.toLowerCase();
      const candidates = [
        ["frontend-developer", "frontend"],
        ["full-stack-developer", "full stack"],
        ["backend-developer", "backend"],
        ["ai-engineer", "ai engineer"],
        ["machine-learning-engineer", "machine learning"],
        ["data-scientist", "data sci"],
        ["data-analyst", "data ana"],
        ["cybersecurity-analyst", "cyber"],
        ["cloud-engineer", "cloud engineer"],
        ["devops-engineer", "devops"],
        ["software-engineer", "software engineer"],
      ];
      const hit = candidates.find(([, k]) => needle.includes(k));
      // Anything without an exact career match goes to /roadmaps, which
      // searches careers AND skills — /careers alone returned "no results"
      // for every skill query ("python", "react", "docker").
      router.push(hit ? `/roadmap/${hit[0]}` : `/roadmaps?q=${encodeURIComponent(query)}`);
    },
    [router]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    go(q);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-100/60 blur-3xl dark:bg-brand-950/40" />
        <div className="absolute -right-32 top-24 h-[380px] w-[380px] rounded-full bg-violet-100/50 blur-3xl dark:bg-violet-950/30" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:pt-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:border-brand-900 dark:bg-brand-950/60 dark:text-brand-300"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            {totalRoadmaps} roadmaps · careers + skills · updated weekly
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="page-title text-balance text-[36px] sm:text-[44px] lg:text-[52px]"
          >
            Master any career,{" "}
            <span className="text-brand-600 dark:text-brand-400">one skill</span>{" "}
            at a time.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-5 max-w-lg text-pretty text-base text-slate-500 sm:text-lg dark:text-slate-400"
          >
            Step-by-step roadmaps for {totalCareers} careers and {stats.skills} individual skills —
            languages, frameworks, tools and platforms. Learn every topic in the right order with
            curated resources, projects, interview prep and progress tracking.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            onSubmit={submit}
            className="mt-7 flex max-w-md items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 pl-4 shadow-card focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-400/30 dark:border-slate-700 dark:bg-slate-900"
          >
            <Search className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${totalCareers} careers…`}
              className="h-9 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
              aria-label="Search careers"
            />
            <button
              type="submit"
              className="flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-95"
            >
              Go <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
          >
            <span>Popular:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setQ(s);
                  go(s);
                }}
                className="rounded-full border border-slate-200 px-2.5 py-1 transition hover:border-brand-300 hover:text-brand-600 focus-visible:border-brand-400 dark:border-slate-700 dark:hover:text-brand-400"
              >
                {s}
              </button>
            ))}
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-4"
          >
            {[
              { v: `${totalRoadmaps}`, l: "Roadmaps" },
              { v: `${stats.skills}`, l: "Skill roadmaps" },
              { v: `${(stats.topics / 1000).toFixed(1)}k+`, l: "Learning topics" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <dd className="font-display order-first text-2xl font-bold text-slate-900 dark:text-white">
                  {s.v}
                </dd>
                <dt className="mt-1 text-xs text-slate-500 dark:text-slate-400">{s.l}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative"
        >
          <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/60">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Full Stack Developer
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                ● interactive
              </span>
            </div>
            <div className="canvas-dots rounded-2xl border border-slate-100 p-3 dark:border-slate-800">
              <HeroMindmap />
            </div>
            <p className="mt-3 px-1 text-center font-mono text-xs text-slate-500 dark:text-slate-400">
              click any topic → learn why, how and what to build
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:block dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Progress tracked</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">streaks · bookmarks · certificates</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <Link
          href="/careers"
          className={cn(
            "group inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 transition",
            "hover:gap-2.5 dark:text-brand-400"
          )}
        >
          Browse all {totalCareers} career roadmaps
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
