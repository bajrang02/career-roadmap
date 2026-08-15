"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Bookmark,
  FolderKanban,
  GraduationCap,
  Map,
  MessageSquare,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";
import { NODE_TYPE_META, formatDate } from "@/lib/utils";
import type { RoadmapIndexEntry, SkillCategoryMeta } from "@/lib/types";
import { CareerCard } from "@/components/careers/career-card";

// All catalog data is computed server-side (app/page.tsx) and passed down so
// the 150 KB index JSON never ships to the client bundle.
export interface HomeCatalog {
  careers: number;
  skills: number;
  domains: SkillCategoryMeta[];
  skillCategories: SkillCategoryMeta[];
  featured: (RoadmapIndexEntry & { slug: string })[];
  recent: (RoadmapIndexEntry & { slug: string })[];
  lastUpdated: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: "easeOut" as const },
  }),
};

// ── Node legend ──────────────────────────────────────────────────────────────
export function NodeLegend() {
  const items = [
    { type: "career" as const, desc: "The career itself" },
    { type: "section" as const, desc: "Major skill areas" },
    { type: "subsection" as const, desc: "Skill groups" },
    { type: "topic" as const, desc: "What you learn" },
    { type: "project" as const, desc: "Build these" },
    { type: "optional" as const, desc: "Pick your path" },
    { type: "advanced" as const, desc: "Go deeper" },
    { type: "interview" as const, desc: "Prep & questions" },
    { type: "achievement" as const, desc: "Career ready 🎓" },
  ];
  return (
    <section className="border-y border-border-light bg-slate-50/50 dark:border-border-dark dark:bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="eyebrow text-center">How every roadmap is structured</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {items.map(({ type, desc }, i) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 rounded-full border border-border-light bg-card-light py-1.5 pl-1.5 pr-3.5 text-[13px] shadow-sm dark:border-border-dark dark:bg-card-dark"
            >
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${NODE_TYPE_META[type].chip}`}>
                {NODE_TYPE_META[type].label}
              </span>
              <span className="text-slate-500 dark:text-slate-400">{desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Categories (career domains) ─────────────────────────────────────────────
export function Categories({ catalog }: { catalog: HomeCatalog }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Browse by domain"
        title={`${catalog.careers} technical careers, organized`}
        desc="Every career grouped by the work you'll actually do — software, AI, security, cloud, engineering and more."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.domains.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: (i % 3) * 0.06 }}
          >
            <Link
              href={`/careers?domain=${encodeURIComponent(c.label)}`}
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-cardhover dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-600"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-lg dark:bg-brand-950/60">
                {c.icon}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {c.label}
                </span>
                <span className="block text-xs text-slate-400">
                  {c.count} careers · beginner → expert
                </span>
              </span>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Featured roadmaps ────────────────────────────────────────────────────────
export function FeaturedRoadmaps({ catalog }: { catalog: HomeCatalog }) {
  const entries = catalog.featured;

  return (
    <section className="bg-slate-50/60 py-16 dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Start here"
            title="Featured career roadmaps"
            desc="The most-loved paths — from first topic to first job."
            align="left"
          />
          <Link
            href="/careers"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 dark:text-brand-400"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            >
              <CareerCard slug={c.slug} entry={c} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Skill categories ─────────────────────────────────────────────────────────
export function SkillCategories({ catalog }: { catalog: HomeCatalog }) {
  return (
    <section className="border-y border-slate-100 bg-slate-50/60 py-16 dark:border-slate-800 dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Skill roadmaps"
            title={`${catalog.skills} skills, one clear path each`}
            desc="Browse by category — from programming languages and databases to design tools and engineering software."
            align="left"
          />
          <Link
            href="/skills"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 dark:text-brand-400"
          >
            Browse all skills <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.skillCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 3) * 0.06 }}
            >
              <Link
                href={`/skills?category=${encodeURIComponent(cat.id)}`}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-cardhover dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-600"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-lg dark:bg-brand-950/60">
                  {cat.icon}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {cat.label}
                  </span>
                  <span className="block text-xs text-slate-400">
                    {cat.count} roadmaps · beginner → expert
                  </span>
                </span>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How it works ─────────────────────────────────────────────────────────────
export function HowItWorks({ catalog }: { catalog: HomeCatalog }) {
  const steps = [
    {
      icon: Search,
      title: "Pick a career or skill",
      desc: `Search ${catalog.careers} careers and ${catalog.skills} skills, then open the interactive roadmap.`,
      color: "bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400",
    },
    {
      icon: Map,
      title: "Follow the map",
      desc: "Expand nodes in the correct order. Every topic has resources, projects and practice.",
      color: "bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400",
    },
    {
      icon: TrendingUp,
      title: "Track & certify",
      desc: "Mark topics complete, keep your streak, and earn a certificate when you finish.",
      color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="How it works"
        title="From zero to career-ready in three steps"
        desc="No random tutorials. No wasted weeks. Just the right skills, in the right order."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-card dark:border-slate-700 dark:bg-slate-800"
          >
            <span className="absolute right-6 top-5 font-display text-5xl font-bold text-slate-100 dark:text-slate-800">
              {i + 1}
            </span>
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              {s.title}
            </h3>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: FolderKanban, title: "Projects at every step", desc: "Every major topic ships with hands-on projects that grow with you — from a mini resume to a full app." },
  { icon: MessageSquare, title: "Interview prep built in", desc: "Real interview questions, common mistakes and tips live inside every topic's detail panel." },
  { icon: Bookmark, title: "Bookmarks & progress", desc: "Star topics while you explore — progress, favorites and streaks are stored privately on this device." },
  { icon: Award, title: "Certificates & streaks", desc: "Earn achievements, keep learning streaks alive and download a certificate per completed roadmap." },
  { icon: Zap, title: "Fast & responsive", desc: "Lazy-loaded roadmaps, virtual canvas rendering and buttery zoom/pan on every device." },
  { icon: GraduationCap, title: "Always current", desc: "Roadmaps track 2026 industry standards — modern frameworks, tools and best practices." },
];

export function Features() {
  return (
    <section className="bg-slate-50/60 py-16 dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Everything included"
          title="More than a diagram"
          desc="The tools you need to actually finish what you start."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-30px" }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-sm transition-transform group-hover:scale-110">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Recently updated ─────────────────────────────────────────────────────────
export function RecentlyUpdated({ catalog }: { catalog: HomeCatalog }) {
  const entries = catalog.recent;
  return (
    <section className="border-y border-border-light bg-slate-50/60 py-16 dark:border-border-dark dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow={`Fresh content · last updated ${formatDate(catalog.lastUpdated)}`}
            title="Recently updated roadmaps"
            desc="Kept current with the tools and skills employers actually use."
            align="left"
          />
          <Link
            href="/roadmaps"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 dark:text-brand-400"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.06 }}
            >
              <Link
                href={`/roadmap/${c.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-border-light bg-card-light p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-cardhover dark:border-border-dark dark:bg-card-dark dark:hover:border-brand-600"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-lg dark:bg-brand-950/60">
                  {c.icon}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {c.title}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">
                    {c.kind === "career" ? "Career path" : "Skill"}
                  </span>
                </span>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────────────────────────
export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-violet-600 px-6 py-16 text-center shadow-xl sm:px-16">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-balance text-3xl font-bold text-white sm:text-4xl">
            Your career is a map. Start following it.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-[15px] text-brand-100 sm:text-base">
            Pick one career. Open the roadmap. Learn in the right order — with projects,
            interview prep and progress tracking. All free.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/careers"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-brand-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Browse careers <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/roadmap/full-stack-developer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore Full Stack
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── shared heading ───────────────────────────────────────────────────────────
export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-2 text-balance text-[26px] sm:text-[32px]">
        {title}
      </h2>
      {desc && (
        <p className={`mt-2.5 max-w-2xl text-pretty body-text ${align === "center" ? "mx-auto" : ""}`}>
          {desc}
        </p>
      )}
    </div>
  );
}
