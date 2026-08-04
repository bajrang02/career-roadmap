// ─────────────────────────────────────────────────────────────────────────────
// Roadmap data validator.
// Audits every generated roadmap for the content-quality issues a curated
// platform must not ship with: duplicate sibling labels, empty sections,
// missing required detail fields, broken ordering and orphan/duplicate ids.
// Run: node data/validate.mjs   → prints a report + exits non-zero on issues.
// ─────────────────────────────────────────────────────────────────────────────
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "generated");

const REQUIRED_DETAILS = [
  "description",
  "whyLearn",
  "prerequisites",
  "objectives",
  "difficulty",
  "estimatedTime",
  "resources",
  "careerRelevance",
  "commonMistakes",
  "tips",
];

// Template phrases the old generator's fallback emitted. Any of these in a
// node description means the curated pipeline was bypassed — an error.
const GENERIC_PHRASES = [
  "major pillars",
  "one of the major pillars",
  "key topic for",
  "core concept for",
  "fastest way to turn theory",
  "a crucial part of the",
  "essential for anyone pursuing",
  "This section is one of",
  "This topic is one of",
  "This is a fundamental concept that appears",
  "you will progressively master",
  "This roadmap assumes",
  "This prepares you for later topics",
  "plays a vital role in",
  "is an integral part of the",
  "covers the essential concepts",
  "This section provides a comprehensive",
  "is one of the most important aspects",
];

const isGeneric = (s) => {
  if (typeof s !== "string" || !s) return false;
  const low = s.toLowerCase();
  return GENERIC_PHRASES.some((p) => low.includes(p));
};

const issues = [];
let checked = 0;

function report(file, level, msg) {
  issues.push({ file, level, msg });
}

function walk(node, file, parentLabel, depth, path) {
  // 1. duplicate sibling labels (exact, case-insensitive)
  const kids = node.children ?? [];
  const seen = new Map();
  for (const c of kids) {
    const key = c.label.toLowerCase();
    if (seen.has(key)) {
      report(file, "warn", `duplicate sibling label "${c.label}" under "${node.label}" (both "${c.label}")`);
    }
    seen.set(key, c);
  }

  // 2. empty sections / subsections
  if ((node.type === "section" || node.type === "subsection") && kids.length === 0) {
    report(file, "error", `empty ${node.type} "${node.label}" (no children)`);
  }

  // 3. required detail fields present & non-empty
  const d = node.details;
  if (d) {
    for (const field of REQUIRED_DETAILS) {
      const v = d[field];
      const empty = v === undefined || v === null || (Array.isArray(v) && v.length === 0) || (typeof v === "string" && !v.trim());
      if (empty) {
        report(file, "warn", `node "${node.label}" (${node.type}) missing details.${field}`);
      }
    }
    // generic/template description check — no node may ship the old fallback text
    if (isGeneric(d.description)) {
      report(file, "error", `node "${node.label}" (${node.type}) has a generic/template description`);
    }
    // interview questions + projects should exist for learnable nodes (topics/concepts/projects)
    if ((node.type === "topic" || node.type === "concept" || node.type === "project") && (!d.interviewQuestions || d.interviewQuestions.length === 0)) {
      report(file, "warn", `node "${node.label}" (${node.type}) has no interview questions`);
    }
  } else {
    report(file, "error", `node "${node.label}" (${node.type}) has NO details object`);
  }

  // 4. hierarchy depth sanity (career → section → subsection → topic → concept/project)
  const depthStr = depth === 0 ? "career" : depth === 1 ? "section" : depth === 2 ? "subsection" : depth === 3 ? "topic" : depth >= 4 ? "lesson/project" : "?";
  const expected = depth === 0 ? "career" : depth === 1 ? "section" : depth === 2 ? "subsection" : depth === 3 ? "topic" : "concept/project";
  if (depth <= 3) {
    if (node.type !== expected) {
      report(file, "info", `node "${node.label}" is type "${node.type}" at depth ${depth} (expected "${expected}")`);
    }
  }

  // 5. max depth guard (should never exceed ~6: career/section/subsection/topic/concept/project)
  if (depth > 6) {
    report(file, "error", `excessive depth ${depth} at "${node.label}" (${path.join(" > ")})`);
  }

  for (const c of kids) walk(c, file, node.label, depth + 1, [...path, node.label]);
}

// Exclude meta/index files — only individual roadmaps are validated.
const SKIP = new Set(["index.json", "search-index.json", "skill-categories.json", "career-domains.json"]);
const files = readdirSync(OUT).filter((f) => f.endsWith(".json") && !SKIP.has(f));

for (const f of files) {
  const data = JSON.parse(readFileSync(join(OUT, f), "utf8"));
  checked += 1;
  if (!data.root) {
    report(f, "error", "missing root");
    continue;
  }
  // duplicate ids anywhere in the tree
  const ids = new Set();
  const dupIds = new Set();
  const collect = (n) => {
    if (ids.has(n.id)) dupIds.add(n.id);
    ids.add(n.id);
    for (const c of n.children ?? []) collect(c);
  };
  collect(data.root);
  for (const id of dupIds) report(f, "error", `duplicate node id ${id}`);

  walk(data.root, f, null, 0, [data.root.label]);
}

// summary
const byLevel = { error: 0, warn: 0, info: 0 };
for (const i of issues) byLevel[i.level] += 1;

console.log(`\nChecked ${checked} roadmaps → ${issues.length} findings (${byLevel.error} errors, ${byLevel.warn} warnings, ${byLevel.info} info)`);

// group by file, show top offenders
const perFile = new Map();
for (const i of issues) {
  if (!perFile.has(i.file)) perFile.set(i.file, []);
  perFile.get(i.file).push(i);
}
// Always print every error so no issue hides behind the display cap.
for (const i of issues) {
  if (i.level === "error") console.log(`[error] ${i.file} → ${i.msg}`);
}

const sorted = [...perFile.entries()].sort((a, b) => b[1].length - a[1].length);
for (const [file, list] of sorted.slice(0, 20)) {
  const errs = list.filter((i) => i.level === "error").length;
  console.log(`\n${file}: ${list.length} findings (${errs} errors)`);
  for (const i of list.slice(0, 6)) console.log(`  [${i.level}] ${i.msg}`);
  if (list.length > 6) console.log(`  … and ${list.length - 6} more`);
}

process.exit(byLevel.error > 0 ? 1 : 0);
