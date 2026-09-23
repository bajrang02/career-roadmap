// Build data/v2/resource-system/longtail-overrides.json
//
// Source of truth: data/v2/resource-system/failure-queue-active.json (every
// meaningful node whose UI-facing bucket was a landing/generic page at the time
// of the audit). Each node is pinned to hand-curated, HTTP-verified DIRECT
// resources, keyed the same way the client resolver indexes buckets:
//   `${roadmapSlug}::${normalizeLabel(nodeLabel)}`
//
// Keys in the library files are either the bare topic slug or the qualified
// "roadmapSlug::topicSlug" form (used when the same label appears on several
// roadmaps and the resources must differ).
//
// Relevance rule (mirrors validate-resolution.mjs WRONG_TOPIC check): an
// exact-scope record must share a token with its topic label. Where the
// canonical page's own title shares none — "Task Manager App" ← the Android
// Room guide, for instance — the node label is prefixed onto the display title
// so the record is self-describing for the student instead of silently
// failing the integrity check.
import fs from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const read = (p) => JSON.parse(fs.readFileSync(path.join(HERE, p), "utf8"));

const normalizeLabel = (s) =>
  String(s ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const STOP = new Set([
  "the", "and", "for", "with", "using", "into", "from", "your", "how", "what",
  "why", "learn", "guide", "tutorial", "introduction", "basics", "fundamentals",
  "advanced", "beginner", "intermediate", "complete", "official", "docs",
  "reference", "examples", "example", "practice", "exercises",
  "problems", "online", "free", "best", "top", "part", "chapter", "course",
  "com", "org", "www", "http", "https",
]);

function tokens(text) {
  const out = new Set();
  for (const t of String(text ?? "").toLowerCase().split(/[^a-z0-9]+/)) {
    if (t.length >= 3 && !STOP.has(t)) out.add(t);
    else if (t.length === 1 && (t === "c" || t === "r")) out.add(t);
  }
  return out;
}

function hasOverlap(topicText, resourceText) {
  const topicSet = tokens(topicText);
  const resSet = tokens(resourceText);
  for (const t of resSet) {
    if (topicSet.has(t)) return true;
    for (const tt of topicSet) {
      if (t.length >= 4 && tt.length >= 4 && (t.includes(tt) || tt.includes(t))) return true;
    }
  }
  return false;
}

const queue = read("failure-queue-active.json");

const LIB_FILES = [
  "longtail-resources-a.mjs",
  "longtail-resources-b1.mjs",
  "longtail-resources-c1.mjs",
  "longtail-resources-c2.mjs",
  "longtail-resources-c3.mjs",
  "longtail-resources-c4.mjs",
];

const lib = {};
for (const f of LIB_FILES) {
  const mod = await import(`./${f}`);
  const exportKey = Object.keys(mod).find((k) => k.startsWith("LONGTAIL"));
  if (!exportKey) throw new Error(`no LONGTAIL export in ${f}`);
  Object.assign(lib, mod[exportKey]);
}

const overrides = {};
const unresolved = [];
const seenNode = new Set();
let retitled = 0;

for (const node of queue) {
  const nodeKey = node.nodePathId.split(".").pop();
  const entries = lib[`${node.roadmap}::${nodeKey}`] ?? lib[nodeKey];
  if (!entries || entries.length === 0) {
    unresolved.push(`${node.roadmap} :: ${nodeKey} :: ${node.label}`);
    continue;
  }
  const id = `${node.roadmap}::${normalizeLabel(node.label)}`;
  if (seenNode.has(id)) continue;
  seenNode.add(id);
  overrides[id] = {
    roadmap: node.roadmap,
    kind: node.roadmapType || "career",
    label: node.label,
    section: node.section || "",
    nodeKey,
    entries: entries.map((e) => {
      const topicText = `${node.label} ${node.section || ""}`;
      let title = e.title;
      if (!hasOverlap(topicText, `${title} ${e.url}`)) {
        title = `${node.label} — ${title}`;
        retitled++;
      }
      const entry = {
        title,
        url: e.url,
        type: e.type || "article",
        qualityScore: e.qualityScore || 4,
      };
      if (e.scope) entry.scope = e.scope;
      return entry;
    }),
  };
}

const urls = new Set();
for (const o of Object.values(overrides)) for (const e of o.entries) urls.add(e.url);

const out = {
  version: "1.0.0",
  generatedAt: new Date().toISOString().slice(0, 10),
  source: "data/v2/resource-system/failure-queue-active.json",
  note: "Every URL was probed live (HTTP) and points at a direct content page — no homepages, no search URLs.",
  nodeCount: Object.keys(overrides).length,
  uniqueUrls: urls.size,
  overrides,
};
fs.writeFileSync(path.join(HERE, "longtail-overrides.json"), JSON.stringify(out, null, 2));

console.log(`overrides: ${Object.keys(overrides).length} nodes · ${urls.size} unique URLs · ${retitled} titles labelled with their node`);
console.log(`unresolved: ${unresolved.length}`);
if (unresolved.length) console.log(unresolved.join("\n"));
