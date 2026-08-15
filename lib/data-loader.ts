// Client-safe data loading.
//
// Per-roadmap JSON lives in public/roadmaps (written by data/generate.mjs) and
// is fetched on demand — a single roadmap is downloaded only when it's needed
// (e.g. the study planner), and the ~130 MB of roadmap data never enters the
// webpack graph or the base client bundle. Server components that need a
// roadmap at build/request time should use lib/roadmap-server (fs read) and
// pass the data down as props.
//
// The static catalog (index/counts/categories) lives in lib/data-catalog and
// must only be imported from server components — importing it client-side
// would bundle ~150 KB of index JSON into every page.
import type { NodeDetails, Roadmap, SearchEntry } from "./types";
import { validateAndRepairRoadmap } from "@/lib/mindmap/validator";

const cache = new Map<string, Roadmap>();
const detailsCache = new Map<string, Record<string, NodeDetails>>();

// Fetch a single roadmap JSON (the slim tree) from the public/roadmaps static
// asset. Cached in-memory so repeated opens (planner, dialogs) don't refetch.
export async function getRoadmap(slug: string): Promise<Roadmap> {
  const cached = cache.get(slug);
  if (cached) return cached;
  const res = await fetch(`/roadmaps/${slug}.json`, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to load roadmap "${slug}" (${res.status})`);
  const raw = (await res.json()) as Roadmap;

  // Validate and repair roadmap data before caching and returning
  const repairedRoadmap = {
    ...raw,
    root: validateAndRepairRoadmap(raw.root),
  };

  cache.set(slug, repairedRoadmap);
  return repairedRoadmap;
}

// Lazy-load the full per-node details (resources, practice, overview, …) for a
// roadmap. This map is fetched ONCE per roadmap — the first time a details
// panel opens — and cached, so a roadmap page downloads only the slim tree and
// pulls the heavy content only when the user actually asks for it.
export async function getRoadmapDetails(slug: string): Promise<Record<string, NodeDetails>> {
  const cached = detailsCache.get(slug);
  if (cached) return cached;
  const res = await fetch(`/roadmaps/${slug}.details.json`, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to load details for "${slug}" (${res.status})`);
  const map = (await res.json()) as Record<string, NodeDetails>;
  detailsCache.set(slug, map);
  return map;
}

export async function getSearchIndex(): Promise<SearchEntry[]> {
  const mod = (await import("@/data/generated/search-index.json")) as { default: SearchEntry[] };
  return mod.default;
}
