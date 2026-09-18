"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Search, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export interface HeroStats {
  careers: number;
  skills: number;
  roadmaps: number;
  topics: number;
}

function HeroMindmap() {
  const reduced = useReducedMotion();
  const nodes = [
    { id: "c", x: 20, y: 170, w: 108, h: 44, type: "career" as const, label: "Career" },
    { id: "s1", x: 220, y: 40, w: 100, h: 38, type: "section" as const, label: "Frontend" },
    { id: "s2", x: 220, y: 170, w: 100, h: 38, type: "section" as const, label: "Backend" },
    { id: "s3", x: 220, y: 300, w: 100, h: 38, type: "section" as const, label: "DevOps" },
    { id: "t1", x: 402, y: 12, w: 92, h: 30, type: "topic" as const, label: "HTML" },
    { id: "t2", x: 402, y: 58, w: 92, h: 30, type: "topic" as const, label: "CSS" },
    { id: "t3", x: 402, y: 104, w: 92, h: 30, type: "topic" as const, label: "React" },
    { id: "t4", x: 402, y: 150, w: 92, h: 30, type: "topic" as const, label: "Node.js" },
    { id: "t5", x: 402, y: 196, w: 92, h: 30, type: "topic" as const, label: "APIs" },
    { id: "t6", x: 402, y: 278, w: 92, h: 30, type: "topic" as const, label: "Docker" },
    { id: "t7", x: 402, y: 324, w: 92, h: 30, type: "topic" as const, label: "CI/CD" },
    { id: "p1", x: 566, y: 2, w: 74, h: 24, type: "concept" as const, label: "Semantics" },
    { id: "p2", x: 566, y: 36, w: 74, h: 24, type: "concept" as const, label: "Flexbox" },
    { id: "p3", x: 566, y: 92, w: 74, h: 24, type: "concept" as const, label: "Hooks" },
    { id: "p4", x: 566, y: 140, w: 74, h: 24, type: "concept" as const, label: "Express" },
    { id: "p5", x: 566, y: 186, w: 74, h: 24, type: "concept" as const, label: "REST" },
    { id: "p6", x: 566, y: 268, w: 74, h: 24, type: "concept" as const, label: "Images" },
    { id: "p7", x: 566, y: 314, w: 74, h: 24, type: "concept" as const, label: "Pipelines" },
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
    <svg viewBox="0 0 660 360" className="h-auto w-full" role="img" aria-label="Animated example of a career roadmap">
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
              className={`${card} drop-shadow-sm`}
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

  const go = useCallback(
    (raw: string) => {
      const query = raw.trim();
      if (!query) return;
      const needle = query.toLowerCase();
      const candidates: [string, string][] = [
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
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-100/60 blur-3xl dark:bg-brand-950/40" />
        <div className="absolute -right-32 top-24 h-[380px] w-[380px] rounded-full bg-violet-100/50 blur-3xl dark:bg-violet-950/30" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 pb-12 pt-10 sm:px-6 sm:gap-10 sm:pb-16 sm:pt-14 lg:grid-cols-2 lg:pt-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50/80 px-3 py-1 text-[11px] font-semibold text-brand-700 dark:border-brand-800 dark:bg-brand-950/60 dark:text-brand-300"
          >
            <Sparkles className="h-3 w-3" />
            {stats.roadmaps} roadmaps · careers + skills · free forever
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="page-title text-[28px] leading-[1.1] sm:text-[40px] lg:text-[48px]"
          >
            Master any career,{" "}
            <span className="text-brand-600 dark:text-brand-400">one skill</span>{" "}
            at a time.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3 max-w-lg text-[14px] leading-relaxed text-slate-500 sm:mt-4 sm:text-[16px] dark:text-slate-400"
          >
            Step-by-step roadmaps for {stats.careers} careers and {stats.skills} skills —
            with curated resources, projects and progress tracking.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            onSubmit={submit}
            className="mt-5 flex w-full max-w-md items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 pl-4 shadow-sm focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-400/20 sm:mt-6 dark:border-slate-700 dark:bg-slate-800"
          >
            <Search className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${stats.careers} careers…`}
              className="h-9 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
              aria-label="Search careers"
            />
            <button
              type="submit"
              className="flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition-all hover:bg-brand-700 active:scale-95"
            >
              Go <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 flex flex-wrap items-center gap-1.5 text-[12px] text-slate-500 dark:text-slate-400"
          >
            <span className="font-medium">Popular:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { setQ(s); go(s); }}
                className="rounded-full border border-slate-200 px-2 py-0.5 transition-all hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:hover:text-brand-400"
              >
                {s}
              </button>
            ))}
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 grid max-w-md grid-cols-3 gap-3 sm:mt-8 sm:gap-4"
          >
            {[
              { v: `${stats.roadmaps}`, l: "Roadmaps" },
              { v: `${stats.skills}`, l: "Skill paths" },
              { v: `${(stats.topics / 1000).toFixed(1)}k+`, l: "Topics" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <dd className="font-display text-[20px] font-bold leading-tight text-slate-900 sm:text-[22px] dark:text-white">
                  {s.v}
                </dd>
                <dt className="mt-0.5 text-[11px] text-slate-500 sm:text-[12px] dark:text-slate-400">{s.l}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 shadow-lg backdrop-blur-sm dark:border-slate-700/70 dark:bg-slate-800/50">
            <div className="mb-2 flex items-center justify-between px-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Full Stack Developer
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                ● interactive
              </span>
            </div>
            <div className="canvas-dots rounded-xl border border-slate-100 p-2 dark:border-slate-800">
              <HeroMindmap />
            </div>
            <p className="mt-2 px-2 text-center font-mono text-[10px] text-slate-500 dark:text-slate-400">
              click any topic → learn why, how and what to build
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-4 -left-3 hidden rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-lg sm:block dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[12px] font-semibold text-slate-900 dark:text-white">Progress tracked</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">streaks · certificates · plans</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <Link
          href="/careers"
          className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 transition-all hover:gap-2.5 dark:text-brand-400"
        >
          Browse all {stats.careers} career roadmaps
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
