import { Suspense } from "react";
import { SKILL_CATEGORIES, SKILL_COUNT, listSkills } from "@/lib/data-catalog";
import { SkillsBrowser } from "@/components/careers/skills-browser";

export default function SkillsPage() {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <SkillsBrowser skills={listSkills()} categories={SKILL_CATEGORIES} skillCount={SKILL_COUNT} />
    </Suspense>
  );
}
