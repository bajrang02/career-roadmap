import { Hero } from "@/components/landing/hero";
import {
  Categories,
  CTA,
  FeaturedRoadmaps,
  Features,
  HowItWorks,
  NodeLegend,
  RecentlyUpdated,
  SkillCategories,
  type HomeCatalog,
} from "@/components/landing/sections";
import {
  CAREER_DOMAINS,
  IT_COUNT,
  NON_IT_COUNT,
  SKILL_CATEGORIES,
  SKILL_COUNT,
  TOTAL_TOPICS,
  listRoadmaps,
  roadmapIndex,
} from "@/lib/data-catalog";
import type { RoadmapIndexEntry } from "@/lib/types";

const FEATURED = [
  "frontend-developer",
  "full-stack-developer",
  "ai-engineer",
  "data-scientist",
  "devops-engineer",
  "cybersecurity-analyst",
  "python",
  "react",
];

export default function HomePage() {
  const careers = IT_COUNT + NON_IT_COUNT;
  const roadmaps = careers + SKILL_COUNT;

  const catalog: HomeCatalog = {
    careers,
    skills: SKILL_COUNT,
    domains: CAREER_DOMAINS,
    skillCategories: SKILL_CATEGORIES,
    featured: FEATURED.map((slug) => {
      const entry = roadmapIndex.roadmaps[slug];
      return entry ? { slug, ...entry } : null;
    }).filter((e): e is RoadmapIndexEntry & { slug: string } => e !== null),
    recent: listRoadmaps().slice(0, 8),
    lastUpdated: roadmapIndex.lastUpdated,
  };

  return (
    <>
      <Hero stats={{ careers, skills: SKILL_COUNT, roadmaps, topics: TOTAL_TOPICS }} />
      <NodeLegend />
      <FeaturedRoadmaps catalog={catalog} />
      <Categories catalog={catalog} />
      <SkillCategories catalog={catalog} />
      <RecentlyUpdated catalog={catalog} />
      <HowItWorks catalog={catalog} />
      <Features />
      <CTA />
    </>
  );
}
