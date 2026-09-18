"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Award,
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
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" as const },
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
    <section className="border-y border-slate-200/80 bg-slate-50/50 dark:border-slate-800/80 dark:bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <p className="eyebrow text-center">How every roadmap is structured</p>
        <div className="mt-5 flex items-center justify-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {items.map(({ type, desc }, i) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 text-[12px] shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60"
            >
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${NODE_TYPE_META[type].chip}`}>
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
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="Browse by domain"
        title={`${catalog.careers} technical careers, organized`}
        desc="Every career grouped by the work you'll actually do — software, AI, security, cloud, engineering and more."
      />
      <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
        {catalog.domains.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: (i % 3) * 0.05 }}
          >
            <Link
              href={`/careers?domain=${encodeURIComponent(c.label)}`}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition-all duration-200 hover:-translate-y-px hover:border-brand-300 hover:shadow-cardhover dark:border-slate-700/60 dark:bg-slate-800/80 dark:hover:border-brand-600/50"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-base dark:bg-brand-950/60">
                {c.icon}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold text-slate-900 dark:text-white">
                  {c.label}
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                  {c.count} careers
                </span>
              </span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-slate-600" />
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
    <section className="py-12 sm:py-16">
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
            className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 hover:gap-2.5 dark:text-brand-400"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {entries.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
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
    <section className="border-y border-slate-200/80 bg-slate-50/50 py-12 dark:border-slate-800/80 dark:bg-slate-950/40 sm:py-16">
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
            className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 hover:gap-2.5 dark:text-brand-400"
          >
            Browse all skills <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {catalog.skillCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: (i % 3) * 0.05 }}
            >
              <Link
                href={`/skills?category=${encodeURIComponent(cat.id)}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition-all duration-200 hover:-translate-y-px hover:border-brand-300 hover:shadow-cardhover dark:border-slate-700/60 dark:bg-slate-800/80 dark:hover:border-brand-600/50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-base dark:bg-brand-950/60">
                  {cat.icon}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold text-slate-900 dark:text-white">
                    {cat.label}
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                    {cat.count} roadmaps
                  </span>
                </span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-slate-600" />
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
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="How it works"
        title="From zero to career-ready in three steps"
        desc="No random tutorials. No wasted weeks. Just the right skills, in the right order."
      />
      <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-800/80"
          >
            <span className="absolute right-5 top-4 font-display text-4xl font-bold text-slate-100 dark:text-slate-800">
              {i + 1}
            </span>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display mt-3.5 text-[16px] font-semibold text-slate-900 dark:text-white">
              {s.title}
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: FolderKanban, title: "Projects at every step", desc: "Every major topic ships with hands-on projects that grow with you." },
  { icon: MessageSquare, title: "Interview prep built in", desc: "Real interview questions and tips inside every topic." },
  { icon: Award, title: "Certificates & streaks", desc: "Earn achievements and download a certificate per completed roadmap." },
  { icon: Zap, title: "Fast & responsive", desc: "Buttery zoom/pan on every device with lazy-loaded roadmaps." },
  { icon: GraduationCap, title: "Always current", desc: "Roadmaps track 2026 industry standards and modern tools." },
];

export function Features() {
  return (
    <section className="bg-slate-50/50 py-12 dark:bg-slate-950/40 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Everything included"
          title="More than a diagram"
          desc="The tools you need to actually finish what you start."
        />
        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-30px" }}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cardhover dark:border-slate-700/60 dark:bg-slate-800/80"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-sm transition-transform group-hover:scale-105">
                <f.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-3 text-[14px] font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
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
    <section className="border-y border-slate-200/80 bg-slate-50/50 py-12 dark:border-slate-800/80 dark:bg-slate-950/40 sm:py-16">
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
            className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 hover:gap-2.5 dark:text-brand-400"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {entries.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: (i % 4) * 0.05 }}
            >
              <Link
                href={`/roadmap/${c.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition-all duration-200 hover:-translate-y-px hover:border-brand-300 hover:shadow-cardhover dark:border-slate-700/60 dark:bg-slate-800/80 dark:hover:border-brand-600/50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-base dark:bg-brand-950/60">
                  {c.icon}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold text-slate-900 dark:text-white">
                    {c.title}
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] text-slate-500 dark:text-slate-400">
                    {c.kind === "career" ? "Career path" : "Skill"}
                  </span>
                </span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-slate-600" />
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
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-violet-600 px-5 py-10 text-center shadow-xl sm:px-14 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-display text-balance text-[24px] font-bold text-white sm:text-[28px] lg:text-[32px]">
            Your career is a map. Start following it.
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-pretty text-[14px] text-brand-100 sm:text-[15px]">
            Pick one career. Open the roadmap. Learn in the right order — all free.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/careers"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-5 text-[13px] font-semibold text-brand-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Browse careers <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/roadmap/full-stack-developer"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 text-[13px] font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
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
      <h2 className="section-title mt-2 text-balance text-[22px] sm:text-[26px] lg:text-[28px]">
        {title}
      </h2>
      {desc && (
        <p className={`mt-2 max-w-2xl text-pretty body-text ${align === "center" ? "mx-auto" : ""}`}>
          {desc}
        </p>
      )}
    </div>
  );
}
