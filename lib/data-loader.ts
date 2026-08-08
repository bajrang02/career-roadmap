// Client-safe data loading: per-roadmap JSON and the search index are both
// code-split via dynamic import, so they never enter the base client bundle.
//
// The static catalog (index/counts/categories) lives in lib/data-catalog and
// must only be imported from server components — importing it client-side
// would bundle ~150 KB of index JSON into every page.
import type { Roadmap, SearchEntry } from "./types";
import { validateAndRepairRoadmap } from "@/lib/mindmap/validator";

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
