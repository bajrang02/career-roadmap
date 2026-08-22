import { Suspense } from "react";
import { SKILL_CATEGORIES, SKILL_COUNT, listSkills } from "@/lib/data-catalog";
import { SkillsBrowser } from "@/components/careers/skills-browser";
import { BrowserSkeleton } from "@/components/careers/browser-skeleton";

export const metadata = {
  title: "Master any skill",
  description:
    "Structured skill roadmaps for languages, frameworks, databases, tools and platforms — each following the same beginner to expert progression.",
};

export default function SkillsPage() {
  return (
    <Suspense fallback={<BrowserSkeleton title="skills" />}>
      <SkillsBrowser skills={listSkills()} categories={SKILL_CATEGORIES} skillCount={SKILL_COUNT} />
    </Suspense>
  );
}
