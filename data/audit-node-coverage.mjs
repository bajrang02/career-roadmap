// COMPLETE per-node coverage audit for all 261 roadmaps.
//
// This does not sample. It walks every roadmap tree recursively (including
// `options` branches), then replicates the EXACT runtime resolution semantics
// used by lib/resource-resolver.ts `pickBucket` so the numbers describe what a
// student actually sees on each node — not what an aggregate says.
//
// For every meaningful learning node it records:
//   resources : EXACT / PARENT / SKILL / DISCOVERY / MISSING  (+ items)
//   practice  : same tiers
//   projects  : authored-for-this-node vs inherited-from-ancestor vs MISSING
//
// Output:
//   data/generated/node-coverage-matrix.json   (every node row)
//   data/generated/node-coverage-summary.json  (per-roadmap + global totals)
//   data/generated/node-coverage-failures.md   (human-readable failure list)
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const R = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

const index = R("data/generated/index.json");
const ROADMAPS = index.roadmaps || index;
const RES = R("public/roadmaps/resources.json").resources ?? [];
const PRAC = R("public/roadmaps/practice.json").practice ?? [];

// ── Normalization identical to the client resolver ───────────────────────────
const normalizeLabel = (s) =>
  String(s ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function makeIndex(records) {
  const bySlugTopic = new Map();
  const bySlug = new Map();
  for (const rec of records) {
    const slug = typeof rec.parentSlug === "string" ? rec.parentSlug : "";
    const topicKey = normalizeLabel(rec.topicTitle ?? "");
    if (!slug || !topicKey) continue;
    const key = `${slug}::${topicKey}`;
    let arr = bySlugTopic.get(key);
    if (!arr) bySlugTopic.set(key, (arr = []));
    if (!arr.some((r) => r.url === rec.url)) arr.push(rec);
    let slugArr = bySlug.get(slug);
    if (!slugArr) bySlug.set(slug, (slugArr = []));
    if (!slugArr.some((r) => r.url === rec.url)) slugArr.push(rec);
  }
  return { bySlugTopic, bySlug };
}

const resIndex = makeIndex(RES);
const pracIndex = makeIndex(PRAC);

const isHomepageUrl = (url) => {
  try {
    const u = new URL(url);
    const p = u.pathname.replace(/\/$/, "");
    return p === "" || p === "/en-US" || p === "/docs";
  } catch {
    return false;
  }
};

// A landing/listing page (platform root, "problemset", "playgrounds", "code",
// "tracks"…) is NOT a directly relevant activity for a specific topic — it is a
// discovery starting point. This distinction is what separates real coverage
// from "the URL is technically about the right field".
const GENERIC_PATH = /^\/(problemset|playgrounds|code|tracks|courses|domains|explore|learn|paths|challenges|library|catalog|browse|tutorials|questions|dashboard|training|university)?\/?$/i;
function directness(url) {
  try {
    const u = new URL(url);
    const p = u.pathname.replace(/\/+$/, "");
    if (p === "") return "generic";
    if (GENERIC_PATH.test(p)) return "generic";
    return "direct";
  } catch {
    return "invalid";
  }
}

/** Mirror of pickBucket(): returns {scope, items} exactly as the UI sees it. */
function pickBucket(idx, slug, labelChain) {
  const own = idx.bySlugTopic.get(`${slug}::${normalizeLabel(labelChain[0])}`);
  if (own && own.length > 0) return { scope: "exact", items: own };

  for (let i = 1; i < labelChain.length; i++) {
    const bucket = idx.bySlugTopic.get(`${slug}::${normalizeLabel(labelChain[i])}`);
    if (bucket && bucket.length > 0) {
      const filtered = bucket.filter((r) => !isHomepageUrl(r.url));
      return { scope: "parent", items: filtered.length ? filtered : bucket, via: labelChain[i] };
    }
  }

  const slugItems = idx.bySlug.get(slug) ?? [];
  const eligible = slugItems.filter((r) => r.scope === "skill" || r.scope === "discovery");
  if (eligible.length > 0) {
    const hasSkill = eligible.some((r) => r.scope === "skill");
    const skillItems = eligible.filter((r) => r.scope === "skill" && !isHomepageUrl(r.url)).slice(0, 6);
    if (skillItems.length > 0) return { scope: "skill", items: skillItems };
    return { scope: hasSkill ? "skill" : "discovery", items: eligible.slice(0, 6) };
  }
  return { scope: "missing", items: [] };
}

// ── Meaningful learning node definition ──────────────────────────────────────
// Structural containers carry no independent objective; everything else does.
// Containers carry no independent learning objective. `subsection` is NOT here:
// these roadmaps use it for real content nodes ("React", "AWS", "PostgreSQL").
const STRUCTURAL = new Set(["career", "skill", "section", "choice", "achievement", "projects"]);
const isMeaningful = (type) => !STRUCTURAL.has(type);
// Meta nodes that describe the roadmap rather than teach a topic. These are
// career-readiness / navigation nodes, not technical learning objectives.
const META_LABEL = /^(career ready|interview preparation|specializations?(&| and)? next steps|portfolio projects?|overview|next steps|resources|projects|getting started|portfolio walkthrough|portfolio & proof of work|resume & linkedin|resume (and|&) linkedin|linkedin & networking|job search strategy|salary negotiation|domain deep dives)$/i;

const DOMAIN_BY_SLUG = {};
for (const [slug, meta] of Object.entries(ROADMAPS)) DOMAIN_BY_SLUG[slug] = meta.category ?? meta.domain ?? "";

const rows = [];
const perRoadmap = new Map();
const failures = [];

for (const slug of Object.keys(ROADMAPS)) {
  const treePath = `public/roadmaps/${slug}.json`;
  const detailsPath = `public/roadmaps/${slug}.details.json`;
  if (!fs.existsSync(path.join(ROOT, treePath))) continue;
  const root = R(treePath).root;
  const details = fs.existsSync(path.join(ROOT, detailsPath)) ? R(detailsPath) : {};
  const meta = ROADMAPS[slug] ?? {};
  const stats = {
    slug,
    title: meta.title ?? root.label,
    kind: meta.kind ?? meta.type ?? root.type,
    domain: DOMAIN_BY_SLUG[slug] ?? "",
    nodes: 0,
    meaningful: 0,
    res: { exact: 0, parent: 0, skill: 0, discovery: 0, missing: 0 },
    prac: { exact: 0, parent: 0, skill: 0, discovery: 0, missing: 0 },
    proj: { own: 0, inherited: 0, missing: 0 },
  };
  perRoadmap.set(slug, stats);

  // nodeId used by the builder: <kind>.<slug>[.<slugPath>]
  const walk = (node, ancestors, slugPath) => {
    const chain = [node.label, ...ancestors.map((a) => a.label)];
    const nodeSlugPath = slugPath ? `${slugPath}.${normalizeLabel(node.label)}` : normalizeLabel(node.label);
    const fullId = `${root.type}.${slug}${slugPath ? `.${nodeSlugPath.split(".").slice(1).join(".")}` : ""}`;
    const d = details[node.id] ?? {};
    const ownProjects = Array.isArray(d.projects) ? d.projects.filter((p) => p && p.title) : [];
    const ownPractice = Array.isArray(d.practice) ? d.practice.filter((p) => p && p.title) : [];

    stats.nodes++;
    const meaningful = isMeaningful(node.type) && !META_LABEL.test(String(node.label).trim());
    if (meaningful) {
      stats.meaningful++;
      const r = pickBucket(resIndex, slug, chain);
      const p = pickBucket(pracIndex, slug, chain);
      // Directness of what the student actually sees (curated embedded first).
      const resDirect = r.items.some((x) => directness(x.url) === "direct");
      const nodeTask = ownPractice.find((x) => x.task === true) ?? null;
      const curatedPrac = ownPractice.filter((x) => x.task !== true);
      const pracDirect = !!nodeTask || curatedPrac.length > 0 || p.items.some((x) => directness(x.url) === "direct");
      const pracKind = nodeTask ? "node-task" : curatedPrac.length ? "node-curated" : pracDirect ? "platform-direct" : p.scope === "missing" ? "missing" : "platform-generic";
      // A project authored on this node counts as its own; otherwise the nearest
      // ancestor's authored project is inherited (and labelled as such).
      let projTier = ownProjects.length ? "own" : "missing";
      let inheritedFrom = null;
      if (!ownProjects.length) {
        for (let i = ancestors.length - 1; i >= 0; i--) {
          const a = ancestors[i];
          const ap = details[a.id]?.projects;
          if (Array.isArray(ap) && ap.length) {
            projTier = "inherited";
            inheritedFrom = a.label;
            break;
          }
        }
      }
      stats.res[r.scope] = (stats.res[r.scope] ?? 0) + 1;
      stats.prac[p.scope] = (stats.prac[p.scope] ?? 0) + 1;
      stats.proj[projTier]++;
      rows.push({
        roadmap: slug,
        title: meta.title ?? root.label,
        domain: stats.domain,
        nodeId: node.id,
        nodePathId: fullId,
        label: node.label,
        type: node.type,
        depth: ancestors.length,
        parent: ancestors.length ? ancestors[ancestors.length - 1].label : null,
        section: ancestors.find((a) => a.type === "section")?.label ?? null,
        resourceScope: r.scope,
        resourceDirect: resDirect,
        resourceVia: r.via ?? null,
        resourceCount: r.items.length,
        resourceUrls: r.items.map((x) => x.url),
        practiceScope: p.scope,
        practiceKind: pracKind,
        practiceDirect: pracDirect,
        practiceVia: p.via ?? null,
        practiceCount: p.items.length,
        practiceUrls: p.items.map((x) => x.url),
        projectTier: projTier,
        projectGenerated: ownProjects.some((x) => x.generated === true),
        projectCount: ownProjects.length,
        projectInheritedFrom: inheritedFrom,
        // "covered" means the student gets a DIRECTLY relevant resource, a
        // directly relevant practice activity, and a project for this node —
        // not merely something inherited from the roadmap root.
        ok: r.scope !== "missing" && resDirect && pracDirect && projTier === "own",
      });
    }

    for (const child of [...(node.children ?? []), ...(node.options ?? [])]) {
      walk(child, [...ancestors, node], nodeSlugPath);
    }
  };
  walk(root, [], "");
}

// ── Aggregates ───────────────────────────────────────────────────────────────
const totals = {
  roadmaps: perRoadmap.size,
  meaningfulNodes: rows.length,
  resources: { exact: 0, parent: 0, skill: 0, discovery: 0, missing: 0 },
  practice: { exact: 0, parent: 0, skill: 0, discovery: 0, missing: 0 },
  projects: { own: 0, inherited: 0, missing: 0 },
  fullyCovered: 0,
  missingAny: 0,
  resourceDirect: 0,
  practiceDirect: 0,
  projectOwn: 0,
};
for (const r of rows) {
  totals.resources[r.resourceScope]++;
  totals.practice[r.practiceScope]++;
  totals.projects[r.projectTier]++;
  if (r.resourceScope !== "missing" && r.resourceDirect) totals.resourceDirect++;
  if (r.practiceDirect) totals.practiceDirect++;
  if (r.projectTier === "own") totals.projectOwn++;
  if (r.ok) totals.fullyCovered++;
  else {
    totals.missingAny++;
    failures.push(r);
  }
}

const summary = {
  generatedAt: new Date().toISOString(),
  totals,
  byRoadmap: [...perRoadmap.values()],
};

fs.writeFileSync(path.join(ROOT, "data/generated/node-coverage-matrix.json"), JSON.stringify(rows));
fs.writeFileSync(path.join(ROOT, "data/generated/node-coverage-summary.json"), JSON.stringify(summary, null, 2));

const md = [
  "# Node coverage failures",
  "",
  `Generated: ${summary.generatedAt}`,
  "",
  `Meaningful learning nodes: ${totals.meaningfulNodes}`,
  `Fully covered (direct resource + direct practice + own project): ${totals.fullyCovered}`,
  `Missing at least one: ${totals.missingAny}`,
  `Direct resources: ${totals.resourceDirect} · Direct practice: ${totals.practiceDirect} · Own projects: ${totals.projectOwn}`,
  "",
  "| roadmap | node | type | section | resource | practice | project |",
  "|---|---|---|---|---|---|---|",
  ...failures
    .slice(0, 4000)
    .map(
      (r) =>
        `| ${r.roadmap} | ${String(r.label).replace(/\|/g, "/")} | ${r.type} | ${String(r.section ?? "").replace(/\|/g, "/")} | ${r.resourceScope}${r.resourceDirect ? " direct" : " generic"}${r.resourceVia ? ` (${r.resourceVia})` : ""} | ${r.practiceKind} | ${r.projectTier}${r.projectInheritedFrom ? ` (${r.projectInheritedFrom})` : ""} |`,
    ),
];
// Prioritised backlog: the roadmaps with the weakest DIRECT-resource coverage,
// and the most frequent uncovered topic labels. This exists so the residual gap
// is a concrete work queue (add a verified deep link to the concept library)
// rather than an unexplained number.
const perRoad = {};
for (const r of rows) {
  const p = perRoad[r.roadmap] ?? (perRoad[r.roadmap] = { total: 0, direct: 0, examples: [] });
  p.total++;
  if (r.resourceDirect) p.direct++;
  else if (p.examples.length < 5) p.examples.push(r.label);
}
const worstRoads = Object.entries(perRoad)
  .map(([slug, p]) => ({ slug, ...p, ratio: p.direct / p.total }))
  .sort((a, b) => a.ratio - b.ratio);

const labelFreq = {};
for (const r of rows) if (!r.resourceDirect) labelFreq[r.label] = (labelFreq[r.label] || 0) + 1;
const topLabels = Object.entries(labelFreq).sort((a, b) => b[1] - a[1]).slice(0, 60);

const backlog = [
  "# Direct-resource backlog",
  "",
  `Generated: ${summary.generatedAt}`,
  "",
  `Nodes whose best available resource is a landing page: ${totals.meaningfulNodes - totals.resourceDirect} of ${totals.meaningfulNodes}.`,
  "",
  "## Roadmaps with weakest direct-resource coverage",
  "",
  "| roadmap | direct / meaningful | sample uncovered topics |",
  "|---|---|---|",
  ...worstRoads.slice(0, 60).map((w) => `| ${w.slug} | ${w.direct} / ${w.total} | ${w.examples.join(", ").replace(/\|/g, "/")} |`),
  "",
  "## Most frequent uncovered topic labels",
  "",
  "| label | nodes |",
  "|---|---|",
  ...topLabels.map(([label, n]) => `| ${label.replace(/\|/g, "/")} | ${n} |`),
];
fs.writeFileSync(path.join(ROOT, "data/generated/node-coverage-failures.md"), md.join("\n"));
fs.writeFileSync(path.join(ROOT, "data/generated/resource-backlog.md"), backlog.join("\n"));

console.log("roadmaps:", totals.roadmaps);
console.log("meaningful nodes:", totals.meaningfulNodes);
console.log("resources:", JSON.stringify(totals.resources), "| direct:", totals.resourceDirect);
console.log("practice:", JSON.stringify(totals.practice), "| direct:", totals.practiceDirect);
console.log("projects:", JSON.stringify(totals.projects));
const kinds = rows.reduce((a, r) => { a[r.practiceKind] = (a[r.practiceKind] || 0) + 1; return a; }, {});
console.log("practice kind:", JSON.stringify(kinds));
console.log("fully covered:", totals.fullyCovered, "| missing at least one:", totals.missingAny);
const worst = [...perRoadmap.values()].map((s) => ({ slug: s.slug, m: s.meaningful, ok: s.proj.own })).sort((a, b) => a.ok / a.m - b.ok / b.m).slice(0, 8);
console.log("lowest own-project ratios:", worst.map((w) => `${w.slug} ${w.ok}/${w.m}`).join("  "));
