import Link from "next/link";
import { IT_COUNT, NON_IT_COUNT, SKILL_COUNT, TOTAL_TOPICS } from "@/lib/data-catalog";

const TOTAL = IT_COUNT + NON_IT_COUNT + SKILL_COUNT;

const IT = [
  { slug: "frontend-developer", label: "Frontend" },
  { slug: "full-stack-developer", label: "Full Stack" },
  { slug: "ai-engineer", label: "AI Engineer" },
  { slug: "data-scientist", label: "Data Science" },
  { slug: "devops-engineer", label: "DevOps" },
  { slug: "cybersecurity-analyst", label: "Cybersecurity" },
];

const ENGINEERING = [
  { slug: "mechanical-engineer", label: "Mechanical" },
  { slug: "civil-engineer", label: "Civil" },
  { slug: "electrical-engineer", label: "Electrical" },
  { slug: "aerospace-engineer", label: "Aerospace" },
  { slug: "biomedical-engineer", label: "Biomedical" },
  { slug: "robotics-engineer", label: "Robotics" },
];

const SKILLS = [
  { slug: "python", label: "Python" },
  { slug: "javascript", label: "JavaScript" },
  { slug: "react", label: "React" },
  { slug: "docker", label: "Docker" },
  { slug: "sql", label: "SQL" },
  { slug: "machine-learning", label: "ML" },
];

const linkCls = "text-[13px] text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/60 dark:border-slate-800/80 dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="5" cy="6" r="2.4" />
                  <circle cx="19" cy="6" r="2.4" />
                  <circle cx="12" cy="18" r="2.4" />
                  <path d="M7.2 7.2 10.2 16M16.8 7.2 13.8 16M7.4 6h9.2" />
                </svg>
              </span>
              <span className="font-display text-[15px] font-bold text-slate-900 dark:text-white">
                Career<span className="text-brand-600 dark:text-brand-400">Roadmaps</span>
              </span>
            </div>
            <p className="mt-2.5 max-w-[240px] text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
              Step-by-step roadmaps for {TOTAL} technical careers & skills. Free, forever.
            </p>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-900 dark:text-white">IT Careers</h4>
            <ul className="mt-2.5 space-y-1.5">
              {IT.map((c) => (
                <li key={c.slug}>
                  <Link href={`/roadmap/${c.slug}`} className={linkCls}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Engineering</h4>
            <ul className="mt-2.5 space-y-1.5">
              {ENGINEERING.map((c) => (
                <li key={c.slug}>
                  <Link href={`/roadmap/${c.slug}`} className={linkCls}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Skills</h4>
            <ul className="mt-2.5 space-y-1.5">
              {SKILLS.map((c) => (
                <li key={c.slug}>
                  <Link href={`/roadmap/${c.slug}`} className={linkCls}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Platform</h4>
            <ul className="mt-2.5 space-y-1.5">
              <li><Link href="/roadmaps" className={linkCls}>Browse all roadmaps</Link></li>
              <li><Link href="/careers" className={linkCls}>Browse all careers</Link></li>
              <li><Link href="/skills" className={linkCls}>Browse all skills</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-center sm:flex-row sm:text-left dark:border-slate-800">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Career Roadmaps. Built for learners everywhere.
          </p>
          <p className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
            {TOTAL} roadmaps · {SKILL_COUNT} skills · {(TOTAL_TOPICS / 1000).toFixed(1)}k+ topics · 100% free
          </p>
        </div>
      </div>
    </footer>
  );
}
