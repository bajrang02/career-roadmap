// Validator for the per-node guided tasks and mini-projects.
//
// Checks, across ALL 261 roadmaps and every node entry:
//   1. every meaningful learning node has a node-level practice task AND a project
//   2. no unresolved placeholders or empty copy anywhere in generated content
//   3. NO CROSS-DOMAIN VOCABULARY: a software node must not receive engineering
//      wording (CAD, tolerance, flowsheet…) and an engineering node must not
//      receive software wording (repository, DevTools, notebook…). This is the
//      same class of contamination the dataset audit guards against, applied to
//      generated per-node content.
//   4. structural/meta nodes carry no generated task (containers are not lessons)
//
// Exit code 1 on any violation.
import fs from "node:fs";
import path from "node:path";
import { fieldForRoadmap } from "./node-tasks.mjs";

const ROOT = process.cwd();
const index = JSON.parse(fs.readFileSync(path.join(ROOT, "data/generated/index.json"), "utf8"));
const ROADMAPS = index.roadmaps || index;

// A `subsection` in these roadmaps is a real learning node (a technology
// choice such as "React", "AWS", "PostgreSQL"), so it is learnable, not a
// container — containers are career/skill/section/choice/achievement/projects.
const META_LABEL = /^(career ready|interview preparation|specializations?\s*(&|and)?\s*next steps|portfolio projects?|overview|next steps|getting started|resources|projects|portfolio walkthrough|portfolio & proof of work|resume\s*(&|and)\s*linkedin|linkedin & networking|job search strategy|salary negotiation|domain deep dives)$/i;
const LEARNABLE = new Set(["topic", "concept", "advanced", "subsection", "project"]);
const STRUCTURAL = new Set(["career", "skill", "section", "choice", "achievement", "projects"]);

// Vocabulary that must never appear on a node from the opposite family. Only
// unambiguous, field-exclusive phrases belong here — generic business or
// project-management wording ("process map", "simulation") is deliberately
// excluded because it is legitimate in several fields.
const SOFTWARE_ONLY = /scratch repository|browser DevTools|sandbox project|notebook with a fixed random seed|infrastructure-as-code|lab VM\/container|app screen|rendered component|Packet Tracer|GNS3/i;
const ENGINEERING_ONLY = /\bCAD\b|dimensioned model|flowsheet|mass and energy balance|load takedown|code clause|hand-calculation sheet|field sampling data|device test rig|schematic and its simulated|S-parameter/i;

// Domain isolation is checked against the SAME classifier the generator uses,
// so the test can never disagree with the thing it is testing. Software-family
// fields must not receive engineering wording and vice versa.
const SOFTWARE_FAMILY = new Set(["software", "frontend", "mobile", "cloud", "data", "security", "network"]);
const ENGINEERING_FAMILY = new Set(["mechanical", "civil", "electrical", "chemical", "rf", "agriculture", "biomedical", "bioinformatics", "industrial", "design"]);

const problems = [];
const stats = { roadmaps: 0, entries: 0, meaningful: 0, tasks: 0, projects: 0, structuralWithTask: 0 };

for (const [slug, meta] of Object.entries(ROADMAPS)) {
  const treePath = path.join(ROOT, `public/roadmaps/${slug}.json`);
  const detailsPath = path.join(ROOT, `public/roadmaps/${slug}.details.json`);
  if (!fs.existsSync(treePath)) continue;
  stats.roadmaps++;
  const tree = JSON.parse(fs.readFileSync(treePath, "utf8")).root;
  const details = fs.existsSync(detailsPath) ? JSON.parse(fs.readFileSync(detailsPath, "utf8")) : {};

  const walk = (node, ancestors) => {
    const d = details[node.id];
    if (!d) {
      problems.push({ slug, node: node.label, rule: "missing-details-entry", detail: node.id });
      return;
    }
    stats.entries++;
    const practice = Array.isArray(d.practice) ? d.practice : [];
    const projects = Array.isArray(d.projects) ? d.projects : [];
    const tasks = practice.filter((p) => p.task === true);
    const generatedProjects = projects.filter((p) => p.generated === true);
    const learnable = LEARNABLE.has(node.type) && !META_LABEL.test(String(node.label).trim());
    const structural = STRUCTURAL.has(node.type);

    if (learnable) {
      stats.meaningful++;
      if (tasks.length === 0) problems.push({ slug, node: node.label, rule: "no-node-task", detail: node.type });
      if (projects.length === 0) problems.push({ slug, node: node.label, rule: "no-project", detail: node.type });
      if (tasks.length > 0) stats.tasks++;
      if (projects.length > 0) stats.projects++;
    }
    if (structural && tasks.length > 0) {
      stats.structuralWithTask++;
      problems.push({ slug, node: node.label, rule: "task-on-structural-node", detail: node.type });
    }

    // placeholder / emptiness checks on every generated payload
    const blob = JSON.stringify({ tasks, generatedProjects });
    // `${}` on its own is a legitimate topic name (Kotlin string templates), so
    // only real interpolation leftovers are flagged.
    if (/undefined|\[object Object\]|\$\{[A-Za-z_]/.test(blob)) {
      problems.push({ slug, node: node.label, rule: "unresolved-placeholder", detail: blob.slice(0, 120) });
    }
    for (const t of tasks) {
      if (!Array.isArray(t.steps) || t.steps.length < 2) problems.push({ slug, node: node.label, rule: "task-without-steps", detail: t.title });
      if ((t.steps || []).some((s) => typeof s !== "string" || s.trim().length < 15)) problems.push({ slug, node: node.label, rule: "thin-task-step", detail: t.title });
    }
    for (const p of generatedProjects) {
      if (!p.description || String(p.description).length < 40) problems.push({ slug, node: node.label, rule: "thin-project", detail: p.title });
      if (!Array.isArray(p.requirements) || p.requirements.length < 2) problems.push({ slug, node: node.label, rule: "project-without-requirements", detail: p.title });
    }

    // ── domain isolation ────────────────────────────────────────────────────
    const field = fieldForRoadmap(slug, meta.title ?? node.label);
    const text = [...tasks.flatMap((t) => [t.title, t.description, ...(t.steps || [])]), ...generatedProjects.flatMap((p) => [p.title, p.description, p.goal, ...(p.requirements || [])])].join(" ");
    if (SOFTWARE_FAMILY.has(field) && ENGINEERING_ONLY.test(text)) {
      problems.push({ slug, node: node.label, rule: "engineering-vocab-on-software-roadmap", detail: (text.match(ENGINEERING_ONLY) || [])[0] });
    }
    // The RF field shares physical-bench vocabulary with electronics on purpose,
    // and design/industrial fields legitimately reference both, so only the
    // strictly engineering fields are checked for software contamination.
    if (["mechanical", "civil", "electrical", "chemical", "rf", "agriculture", "bioinformatics"].includes(field) && SOFTWARE_ONLY.test(text)) {
      problems.push({ slug, node: node.label, rule: "software-vocab-on-engineering-roadmap", detail: (text.match(SOFTWARE_ONLY) || [])[0] });
    }

    for (const child of [...(node.children ?? []), ...(node.options ?? [])]) walk(child, [...ancestors, node]);
  };
  walk(tree, []);
}

const byRule = problems.reduce((a, p) => { a[p.rule] = (a[p.rule] || 0) + 1; return a; }, {});
fs.writeFileSync(
  path.join(ROOT, "data/generated/node-task-validation.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), stats, byRule, problems }, null, 2),
);

console.log("Node-task validator");
console.log(`  roadmaps:            ${stats.roadmaps}`);
console.log(`  detail entries:      ${stats.entries}`);
console.log(`  meaningful nodes:    ${stats.meaningful}`);
console.log(`  with node task:      ${stats.tasks}`);
console.log(`  with own project:    ${stats.projects}`);
console.log(`  structural w/ task:  ${stats.structuralWithTask}`);
console.log(`  problems:            ${problems.length} ${problems.length ? JSON.stringify(byRule) : ""}`);
for (const p of problems.slice(0, 40)) console.log(`   - [${p.rule}] ${p.slug} :: ${p.node} — ${p.detail}`);
if (problems.length > 40) console.log(`   … and ${problems.length - 40} more`);

if (problems.length) {
  console.error("\n✗ FAIL — node task coverage/quality violations.");
  process.exit(1);
}
console.log("\n✓ PASS — every meaningful node has its own task and project, with domain-correct wording.");
