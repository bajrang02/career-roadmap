// Server-only roadmap loader.
//
// Reads a single roadmap's generated JSON straight from disk instead of a
// dynamic import. This is deliberate: `import(\`@/data/generated/${slug}.json\`)`
// makes webpack create a context module containing ALL ~130 MB of roadmap
// data, which blows up build memory and bloats every client bundle. Reading
// via fs keeps the per-roadmap JSONs entirely out of the webpack graph —
// they're only parsed on demand, one at a time, during static generation.
//
// The payload served to the client is the SLIM tree (structure + difficulty/
// estimatedTime) written to public/roadmaps by data/generate.mjs; the heavy
// node details (resources/practice/overview) ship in a separate details map
// that the client fetches lazily when the details panel opens.
//
// Only import this from server components / route handlers (it uses node:fs).
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Roadmap } from "./types";
import { validateAndRepairRoadmap } from "@/lib/mindmap/validator";

const cache = new Map<string, Roadmap>();

export function getRoadmapServer(slug: string): Roadmap {
  const cached = cache.get(slug);
  if (cached) return cached;
  const raw = JSON.parse(
    readFileSync(join(process.cwd(), "public/roadmaps", `${slug}.json`), "utf8")
  ) as Roadmap;

  // Validate and repair roadmap data before caching and returning
  const repairedRoadmap = {
    ...raw,
    root: validateAndRepairRoadmap(raw.root),
  };

  cache.set(slug, repairedRoadmap);
  return repairedRoadmap;
}
