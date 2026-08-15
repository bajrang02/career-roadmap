// Cross-roadmap coverage audit: for every learnable node, report whether it has
// curated knowledge (non-generic overview) and curated resources.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "data/generated");
const files = readdirSync(OUT).filter((f) => f.endsWith(".json") && !["index.json", "search-index.json", "skill-categories.json", "career-domains.json"].includes(f));

// Generic overview signals: "practical topic in", "fundamentals of X", "apply X in practice", "earlier topics in this"
const GENERIC = [
  "is a practical topic in",
  "the ideas and techniques professionals use",
  "The fundamentals of",
  "How to apply",
  "Common mistakes to avoid",
  "The earlier topics in this",
  "shows up in daily",
  "What is " + null, // placeholder, filled below
];

const counts = new Map(); // label -> {total, genericOverview, noRes}
const walk = (n) => {
  const d = n.details;
  if (d && (n.type === "topic" || n.type === "concept" || n.type === "advanced")) {
    const label = n.label.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
    const c = counts.get(label) || { total: 0, genericOverview: 0, noRes: 0 };
    c.total++;
    const ov = d.overview;
    const whatIsIt = (ov?.whatIsIt || "") + " " + (ov?.youWillLearn || []).join(" ");
    if (/is a practical topic in|the ideas and techniques professionals use|The fundamentals of|How to apply .* in practice|Common mistakes to avoid|earlier topics in this|shows up in daily/.test(whatIsIt)) c.genericOverview++;
    if (!Array.isArray(d.resources) || d.resources.length === 0) c.noRes++;
    counts.set(label, c);
  }
  for (const c of n.children || []) walk(c);
  for (const o of n.options || []) walk(o);
};

for (const f of files) {
  try {
    const data = JSON.parse(readFileSync(join(OUT, f), "utf8"));
    walk(data.root);
  } catch {}
}

const sorted = [...counts.entries()].sort((a, b) => (b[1].genericOverview + b[1].noRes) - (a[1].genericOverview + a[1].noRes));
console.log("Unique learnable labels:", counts.size);
console.log("\nTop 45 labels with generic overviews or no resources (occurrences):");
for (const [label, c] of sorted.slice(0, 45)) {
  console.log(`  ${String(c.total).padStart(4)} labels | generic:${String(c.genericOverview).padStart(4)} | noRes:${String(c.noRes).padStart(4)} | ${label}`);
}
const totGeneric = [...counts.values()].reduce((a, c) => a + c.genericOverview, 0);
const totNoRes = [...counts.values()].reduce((a, c) => a + c.noRes, 0);
console.log(`\nTotal nodes with generic overview: ${totGeneric}`);
console.log(`Total nodes with no resources: ${totNoRes}`);
