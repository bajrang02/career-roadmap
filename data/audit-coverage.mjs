// Mandatory Resource & Practice Coverage audit (spec: "CareerRoadmaps —
// Mandatory Resource & Practice Coverage").
// Scans every roadmap tree + details map and enforces, for EVERY node:
//   • resources.length >= 1   • practice.length >= 1
//   • no duplicate resource URLs   • no duplicate practice URLs
//   • every URL is a valid https:// link
//   • PDF-discovery fallback queries carry the exact topic + a domain hint
//     (never a bare `filetype:pdf <topic>` search)
// Prints a per-roadmap pass/fail line plus a full report for failing
// roadmaps, and exits non-zero when any node fails.
//
// Usage: node data/audit-coverage.mjs
import { readdirSync, readFileSync } from "node:fs";

const DIR = new URL("../public/roadmaps/", import.meta.url);
const files = readdirSync(DIR).filter((f) => f.endsWith(".details.json"));
const URL_RE = /^https?:\/\/[^\s]+$/;
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();

let total = 0;
let failures = 0;
const failLines = [];
const summaries = [];

for (const f of files) {
  const slug = f.replace(".details.json", "");
  let tree, details;
  try {
    tree = JSON.parse(readFileSync(new URL(slug + ".json", DIR), "utf8"));
    details = JSON.parse(readFileSync(new URL(f, DIR), "utf8"));
  } catch {
    failures += 1;
    failLines.push(`${slug}: unreadable tree/details`);
    continue;
  }
  // id → label from the tree
  const labelOf = new Map();
  const walk = (n) => {
    labelOf.set(n.id, n.label);
    for (const c of n.children || []) walk(c);
    for (const o of n.options || []) walk(o);
  };
  walk(tree.root);

  let roadmapFail = 0;
  const roadmapLines = [];
  for (const [id, det] of Object.entries(details)) {
    total += 1;
    const label = labelOf.get(id) ?? id;
    const problems = [];

    const res = det.resources ?? [];
    const prac = det.practice ?? [];
    if (res.length === 0) problems.push("0 resources");
    if (prac.length === 0) problems.push("0 practice");

    const dupRes = new Set();
    for (const r of res) {
      if (!r.url || !URL_RE.test(r.url)) problems.push(`bad resource URL: ${r.url ?? "(none)"}`);
      else if (dupRes.has(r.url)) problems.push(`duplicate resource URL: ${r.url}`);
      else dupRes.add(r.url);
      // PDF-discovery floor must carry the exact topic + a domain hint
      if (r.query && r.kind === "reference" && r.type === "PDF Search") {
        if (!r.query.startsWith('filetype:pdf "')) problems.push("PDF query not filetype:pdf-prefixed");
        else if (!r.query.toLowerCase().includes(norm(label).split(" ")[0])) problems.push("PDF query missing the topic");
        else if (r.query.trim().split(/\s+/).length < 4) problems.push("PDF query lacks a domain hint");
      }
    }
    const dupPrac = new Set();
    for (const p of prac) {
      if (!p.url || !URL_RE.test(p.url)) problems.push(`bad practice URL: ${p.url ?? "(none)"}`);
      else if (dupPrac.has(p.url)) problems.push(`duplicate practice URL: ${p.url}`);
      else dupPrac.add(p.url);
    }

    if (problems.length) {
      failures += 1;
      roadmapFail += 1;
      roadmapLines.push(`  ✗ ${label} (${id}): ${problems.join("; ")}`);
    }
  }
  summaries.push(`${roadmapFail === 0 ? "PASS" : "FAIL"}  ${slug}  (${Object.keys(details).length} nodes${roadmapFail ? `, ${roadmapFail} failing` : ""})`);
  if (roadmapFail) failLines.push(...roadmapLines);
}

console.log(`\n── Mandatory Resource & Practice Coverage audit ──`);
console.log(`Nodes audited: ${total} · Failing nodes: ${failures}`);
console.log(`Roadmaps failing: ${summaries.filter((s) => s.startsWith("FAIL")).length} / ${files.length}`);
for (const s of summaries) if (s.startsWith("FAIL")) console.log(s);
if (failLines.length) {
  console.log("\n── failing nodes ──");
  for (const l of failLines.slice(0, 80)) console.log(l);
}
console.log(failures ? `\nRESULT: ${failures} FAILURE(S)` : "\nRESULT: PASS — every node ships ≥1 resource and ≥1 practice");
process.exit(failures ? 1 : 0);
