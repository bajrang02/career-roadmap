// Builds the ACTIVE failure queue: every meaningful node whose visible resource
// bucket contains no direct (non-landing) URL. Output:
//   data/v2/resource-system/failure-queue-active.json
// Each item carries the full context needed for research:
//   roadmap, roadmapType, section, topic, subtopic, nodeId, nodePathId,
//   nodeType, depth, domain, technology, currentMapping, failureReason
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const matrix = JSON.parse(fs.readFileSync(path.join(ROOT, "data/generated/node-coverage-matrix.json"), "utf8"));
const index = JSON.parse(fs.readFileSync(path.join(ROOT, "data/generated/index.json"), "utf8"));
const ROADMAPS = index.roadmaps || index;

// technology: nearest ancestor (or self) label when it names a concrete stack,
// else null. Derived from the node path — ancestors already in matrix rows.
const items = matrix
  .filter((r) => !(r.resourceScope !== "missing" && r.resourceDirect))
  .map((r) => {
    const meta = ROADMAPS[r.roadmap] ?? {};
    // section ancestors give topic (nearest non-section ancestor) & subtopic
    const topic = r.parent && r.parent !== r.section ? r.parent : r.section;
    const subtopic = r.parent && r.parent !== r.section && r.section ? r.parent : null;
    const isHomepage = r.resourceUrls.every((u) => {
      try {
        const p = new URL(u).pathname.replace(/\/$/, "");
        return p === "" || /^\/(docs|en-US|learn|courses)?\/?$/.test(p);
      } catch {
        return false;
      }
    });
    return {
      roadmap: r.roadmap,
      roadmapType: meta.kind ?? meta.type ?? "",
      roadmapTitle: r.title,
      section: r.section,
      topic: topic ?? null,
      subtopic,
      nodeId: r.nodeId,
      nodePathId: r.nodePathId,
      label: r.label,
      nodeType: r.type,
      depth: r.depth,
      domain: r.domain,
      technology: null, // filled by research pass when a concrete stack is involved
      currentMapping: r.resourceScope,
      currentUrls: r.resourceUrls.slice(0, 3),
      failureReason:
        r.resourceScope === "missing"
          ? "no resource bucket at all"
          : r.resourceScope === "exact"
            ? isHomepage
              ? "exact bucket exists but all URLs are landing/homepage pages"
              : "exact bucket URLs are non-direct or generic"
            : `parent-fallback bucket (${r.resourceVia ?? "?"}) is a landing/generic page`,
    };
  });

fs.writeFileSync(path.join(ROOT, "data/v2/resource-system/failure-queue-active.json"), JSON.stringify(items, null, 1));

// quick stats
const bySection = {};
for (const it of items) {
  const k = `${it.roadmap} :: ${it.section ?? "(root)"}`;
  bySection[k] = (bySection[k] || 0) + 1;
}
const sorted = Object.entries(bySection).sort((a, b) => b[1] - a[1]);
console.log(`queued: ${items.length} nodes across ${new Set(items.map((i) => i.roadmap)).size} roadmaps`);
console.log("\nTop 40 sections by gap:");
for (const [k, n] of sorted.slice(0, 40)) console.log(`  ${String(n).padStart(4)}  ${k}`);
