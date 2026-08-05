import type { Roadmap, RoadmapIndex, SearchEntry, SkillCategoryMeta } from "./types";
import { validateAndRepairRoadmap } from "@/lib/mindmap/validator";
import indexJson from "@/data/generated/index.json";
import skillCategoriesJson from "@/data/generated/skill-categories.json";
import careerDomainsJson from "@/data/generated/career-domains.json";

// Static index → instant paint on landing/careers pages (bundled once).
export const roadmapIndex: RoadmapIndex = indexJson as RoadmapIndex;

const cache = new Map<string, Roadmap>();

// Dynamic import of a single roadmap JSON → code-split per roadmap (lazy loading).
export async function getRoadmap(slug: string): Promise<Roadmap> {
  const cached = cache.get(slug);
  if (cached) return cached;
  const mod = (await import(`@/data/generated/${slug}.json`)) as { default: Roadmap };
  
  // Validate and repair roadmap data before caching and returning
  const repairedRoadmap = {
    ...mod.default,
    root: validateAndRepairRoadmap(mod.default.root),
  };
  
  cache.set(slug, repairedRoadmap);
  return repairedRoadmap;
}

export async function getSearchIndex(): Promise<SearchEntry[]> {
  const mod = (await import("@/data/generated/search-index.json")) as { default: SearchEntry[] };
  return mod.default;
}

export function listRoadmaps() {
  return Object.entries(roadmapIndex.roadmaps).map(([slug, entry]) => ({ slug, ...entry }));
}

export function listCareers() {
  return listRoadmaps().filter((r) => r.kind === "career");
}

export function listSkills() {
  return listRoadmaps().filter((r) => r.kind === "skill");
}

export function careerBySlug(slug: string) {
  const entry = roadmapIndex.roadmaps[slug];
  return entry ? { slug, ...entry } : null;
}

export const IT_COUNT = Object.values(roadmapIndex.roadmaps).filter(
  (r) => r.kind === "career" && r.category === "it"
).length;
export const NON_IT_COUNT = Object.values(roadmapIndex.roadmaps).filter(
  (r) => r.kind === "career" && r.category === "non-it"
).length;
export const SKILL_COUNT = Object.values(roadmapIndex.roadmaps).filter((r) => r.kind === "skill").length;
export const TOTAL_TOPICS = Object.values(roadmapIndex.roadmaps).reduce(
  (a, r) => a + r.topicCount,
  0
);

// Canonical browsing taxonomies emitted by the generator (source order, icons
// and live counts — single source of truth shared with data/source/*).
export const SKILL_CATEGORIES: SkillCategoryMeta[] = skillCategoriesJson as SkillCategoryMeta[];
export const CAREER_DOMAINS: SkillCategoryMeta[] = careerDomainsJson as SkillCategoryMeta[];
