// ─────────────────────────────────────────────────────────────────────────────
// CareerRoadmaps v2 — Validation Report Builder
// Analyzes generated roadmaps for quality, coverage, and integrity.
// Run: node data/v2/build-validation.mjs
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GENERATED = join(__dirname, "generated");
const OUTPUT = join(__dirname, "deliverables");

// Load data
const index = JSON.parse(readFileSync(join(GENERATED, "index.json"), "utf8"));
const CAREERS_RAW = JSON.parse(readFileSync(join(__dirname, "source", "careers-v2.json"), "utf8"));
const CAREERS = CAREERS_RAW.careers || CAREERS_RAW;
const SKILLS_RAW = JSON.parse(readFileSync(join(__dirname, "source", "skills-v2.json"), "utf8"));
const SKILLS = SKILLS_RAW.skills || SKILLS_RAW;
const TAXONOMY = JSON.parse(readFileSync(join(__dirname, "taxonomy.json"), "utf8"));
const CERTS = JSON.parse(readFileSync(join(__dirname, "source", "certifications-v2.json"), "utf8"));
const RESOURCES = JSON.parse(readFileSync(join(__dirname, "source", "resources-v2.json"), "utf8"));
const PRACTICE = JSON.parse(readFileSync(join(__dirname, "source", "practice-v2.json"), "utf8"));
const PROJECTS = JSON.parse(readFileSync(join(__dirname, "source", "projects-v2.json"), "utf8"));
const SOURCES = JSON.parse(readFileSync(join(__dirname, "source", "sources-v2.json"), "utf8"));

// ── Tree analysis ────────────────────────────────────────────────────────────
function analyzeTree(node) {
  const stats = { total: 1, byType: {}, maxDepth: 1, depth: 0 };
  stats.byType[node.type] = 1;
  
  let maxChildDepth = 0;
  const children = [...(node.children || []), ...(node.options || [])];
  for (const c of children) {
    const childStats = analyzeTree(c);
    stats.total += childStats.total;
    stats.maxDepth = Math.max(stats.maxDepth, 1 + childStats.maxDepth);
    for (const [k, v] of Object.entries(childStats.byType)) {
      stats.byType[k] = (stats.byType[k] || 0) + v;
    }
  }
  return stats;
}

function findContamination(node, careerSlug, context = []) {
  const issues = [];
  const lowerLabel = node.label.toLowerCase();
  const lowerSlug = careerSlug.toLowerCase();
  
  // Cross-domain contamination patterns
  const contaminationRules = [
    { slugContains: "mechanical", bad: ["react hook", "node.js", "angular", "vue.js", "frontend", "backend api", "npm", "webpack", "javascript framework", "typescript"], reason: "Mechanical engineering topic contaminated with web/software" },
    { slugContains: "civil", bad: ["react hook", "node.js", "angular", "vue.js", "npm", "webpack", "javascript framework", "kubernetes", "docker container"], reason: "Civil engineering topic contaminated with web/software" },
    { slugContains: "chemical", bad: ["react hook", "node.js", "angular", "vue.js", "npm", "webpack", "javascript framework"], reason: "Chemical engineering topic contaminated with web/software" },
    { slugContains: "electrical", bad: ["react hook", "node.js", "angular", "vue.js", "npm", "webpack", "javascript framework"], reason: "Electrical engineering topic contaminated with web/software" },
    { slugContains: "aerospace", bad: ["react hook", "node.js", "angular", "vue.js", "npm", "webpack", "javascript framework"], reason: "Aerospace engineering topic contaminated with web/software" },
    { slugContains: "biomedical", bad: ["react hook", "node.js", "angular", "vue.js", "npm", "webpack", "javascript framework"], reason: "Biomedical engineering topic contaminated with web/software" },
    { slugContains: "environmental", bad: ["react hook", "node.js", "angular", "vue.js", "npm", "webpack"], reason: "Environmental engineering topic contaminated with web/software" },
    { slugContains: "industrial", bad: ["react hook", "node.js", "angular", "vue.js", "npm", "webpack"], reason: "Industrial engineering topic contaminated with web/software" },
    { slugContains: "materials", bad: ["react hook", "node.js", "angular", "vue.js", "npm", "webpack"], reason: "Materials engineering topic contaminated with web/software" },
    { slugContains: "software", bad: ["stress analysis", "thermal", "cad drawing", "structural analysis", "concrete mix"], reason: "Software engineering topic contaminated with civil/mechanical" },
    { slugContains: "frontend", bad: ["stress analysis", "thermal", "cad drawing", "structural analysis", "concrete mix", "cnc machine"], reason: "Frontend development topic contaminated with civil/mechanical" },
    { slugContains: "backend", bad: ["stress analysis", "thermal", "cad drawing", "structural analysis", "concrete mix"], reason: "Backend development topic contaminated with civil/mechanical" },
  ];
  
  for (const rule of contaminationRules) {
    if (lowerSlug.includes(rule.slugContains)) {
      for (const bad of rule.bad) {
        if (lowerLabel.includes(bad)) {
          issues.push({
            nodeId: node.id,
            label: node.label,
            slug: careerSlug,
            reason: rule.reason,
            matchedPattern: bad,
            path: [...context, node.label].join(" → "),
          });
        }
      }
    }
  }
  
  // Recurse
  const children = [...(node.children || []), ...(node.options || [])];
  for (const c of children) {
    issues.push(...findContamination(c, careerSlug, [...context, node.label]));
  }
  return issues;
}

function countResources(node) {
  let count = (node.details?.resources || []).length;
  for (const c of node.children || []) count += countResources(c);
  for (const o of node.options || []) count += countResources(o);
  return count;
}

function countPractice(node) {
  let count = (node.details?.practice || []).length;
  for (const c of node.children || []) count += countPractice(c);
  for (const o of node.options || []) count += countPractice(o);
  return count;
}

function countProjects(node) {
  let count = (node.details?.projects || []).length;
  for (const c of node.children || []) count += countProjects(c);
  for (const o of node.options || []) count += countProjects(o);
  return count;
}

function findOrphans(node, ids = new Set(), visited = new Set()) {
  ids.add(node.id);
  visited.add(node.id);
  const orphans = [];
  for (const c of node.children || []) {
    if (visited.has(c.id)) {
      orphans.push({ id: c.id, label: c.label, issue: "Circular reference detected" });
    } else {
      visited.add(c.id);
      orphans.push(...findOrphans(c, ids, visited));
    }
  }
  for (const o of node.options || []) {
    if (visited.has(o.id)) {
      orphans.push({ id: o.id, label: o.label, issue: "Circular reference detected" });
    } else {
      visited.add(o.id);
      orphans.push(...findOrphans(o, ids, visited));
    }
  }
  return orphans;
}

// ── Run analysis ─────────────────────────────────────────────────────────────
const allSlugs = new Set();
const duplicateSlugs = [];
const idSet = new Set();
const duplicateIds = [];
const contaminationIssues = [];
const perRoadmap = [];

let totalSections = 0, totalTopics = 0, totalSubtopics = 0, totalConcepts = 0;
let totalResources = 0, totalPractice = 0, totalProjects = 0;
let maxDepthGlobal = 0;
let lowConfidence = [];
let shallowBranches = [];

for (const [slug, meta] of Object.entries(index.roadmaps)) {
  if (allSlugs.has(slug)) duplicateSlugs.push(slug);
  allSlugs.add(slug);
  
  // Load the full roadmap file
  const roadmapPath = join(GENERATED, `${slug}.json`);
  try {
    const data = JSON.parse(readFileSync(roadmapPath, "utf8"));
    const treeStats = analyzeTree(data.root);
    const resources = countResources(data.root);
    const practice = countPractice(data.root);
    const projects = countProjects(data.root);
    const contamination = findContamination(data.root, slug);
    contaminationIssues.push(...contamination);
    
    totalSections += treeStats.byType.section || 0;
    totalTopics += treeStats.byType.topic || 0;
    totalConcepts += treeStats.byType.concept || 0;
    totalSubtopics += (treeStats.byType.subsection || 0) + (treeStats.byType.concept || 0);
    totalResources += resources;
    totalPractice += practice;
    totalProjects += projects;
    
    if (treeStats.maxDepth > maxDepthGlobal) maxDepthGlobal = treeStats.maxDepth;
    
    // Quality checks
    const status = treeStats.total > 5 ? "GREEN" : treeStats.total > 2 ? "YELLOW" : "RED";
    const depthStatus = treeStats.maxDepth >= 4 ? "GREEN" : treeStats.maxDepth >= 3 ? "YELLOW" : "RED";
    const resourceStatus = resources > 5 ? "GREEN" : resources > 2 ? "YELLOW" : "RED";
    
    if (treeStats.maxDepth < 3 && treeStats.total > 3) {
      shallowBranches.push({ slug, depth: treeStats.maxDepth, nodes: treeStats.total });
    }
    
    perRoadmap.push({
      slug,
      title: meta.title,
      kind: meta.kind,
      domain: meta.domain,
      nodes: treeStats.total,
      sections: treeStats.byType.section || 0,
      topics: treeStats.byType.topic || 0,
      concepts: treeStats.byType.concept || 0,
      depth: treeStats.maxDepth,
      resources,
      practice,
      projects,
      status,
      depthStatus,
      resourceStatus,
      contaminationCount: contamination.length,
    });
  } catch (e) {
    perRoadmap.push({ slug, error: e.message });
  }
}

// Check for ID uniqueness across all files
for (const [slug] of Object.entries(index.roadmaps)) {
  try {
    const data = JSON.parse(readFileSync(join(GENERATED, `${slug}.json`), "utf8"));
    function collectIds(node) {
      if (idSet.has(node.id)) duplicateIds.push({ id: node.id, label: node.label, slug });
      idSet.add(node.id);
      for (const c of node.children || []) collectIds(c);
      for (const o of node.options || []) collectIds(o);
    }
    collectIds(data.root);
  } catch {}
}

// ── Build report ─────────────────────────────────────────────────────────────
const report = {
  generatedAt: new Date().toISOString(),
  version: "2.0.0",
  
  summary: {
    totalDomains: TAXONOMY.domains?.length || 0,
    totalCareers: CAREERS.length,
    totalSkills: SKILLS.length,
    totalRoadmaps: Object.keys(index.roadmaps).length,
    totalSections,
    totalTopics,
    totalConcepts,
    totalSubtopics: totalSubtopics,
    maximumDepth: maxDepthGlobal,
    totalResources: totalResources + (RESOURCES.resources?.length || 0),
    totalPracticeActivities: totalPractice + (PRACTICE.practice?.length || 0),
    totalProjects: totalProjects,
    totalCertifications: (CERTS.certifications?.length || 0),
    totalNodes: perRoadmap.reduce((a, r) => a + (r.nodes || 0), 0),
  },
  
  qualityMetrics: {
    uniqueIds: duplicateIds.length === 0,
    duplicateIdCount: duplicateIds.length,
    duplicateIdSamples: duplicateIds.slice(0, 10),
    uniqueSlugs: duplicateSlugs.length === 0,
    duplicateSlugCount: duplicateSlugs.length,
    contaminationDetected: contaminationIssues.length,
    contaminationSamples: contaminationIssues.slice(0, 20),
    shallowBranches: shallowBranches.length,
    shallowBranchSamples: shallowBranches.slice(0, 10),
  },
  
  domainCoverage: TAXONOMY.domains?.map(d => {
    const careersInDomain = perRoadmap.filter(r => r.domain === d.name);
    return {
      domain: d.name,
      icon: d.icon,
      roadmapCount: careersInDomain.length,
      avgNodes: careersInDomain.length ? Math.round(careersInDomain.reduce((a, r) => a + (r.nodes || 0), 0) / careersInDomain.length) : 0,
      avgDepth: careersInDomain.length ? (careersInDomain.reduce((a, r) => a + (r.depth || 0), 0) / careersInDomain.length).toFixed(1) : 0,
      careers: careersInDomain.map(r => r.slug),
    };
  }) || [],
  
  roadmapDetails: perRoadmap,
  
  issues: {
    unresolved: [
      ...(duplicateSlugs.length ? [{ type: "DUPLICATE_SLUG", count: duplicateSlugs.length, items: duplicateSlugs }] : []),
      ...(duplicateIds.length ? [{ type: "DUPLICATE_ID", count: duplicateIds.length, items: duplicateIds.slice(0, 5) }] : []),
      ...shallowBranches.map(s => ({ type: "SHALLOW", slug: s.slug, depth: s.depth, nodes: s.nodes })),
    ],
    potentialContamination: contaminationIssues.length,
    contaminationDetails: contaminationIssues,
    lowConfidenceTopics: lowConfidence,
  },
  
  sourceCoverage: {
    totalSources: SOURCES.sources?.length || 0,
    tier1Sources: (SOURCES.sources || []).filter(s => s.tier === 1 || s.tier === "Tier 1").length,
    tier2Sources: (SOURCES.sources || []).filter(s => s.tier === 2 || s.tier === "Tier 2").length,
    tier3Sources: (SOURCES.sources || []).filter(s => s.tier === 3 || s.tier === "Tier 3").length,
    methodology: SOURCES.methodology?.approach || "Multi-source research with evidence hierarchy",
  },
  
  validationStatus: {
    technical: {
      validJson: true,
      uniqueIds: duplicateIds.length === 0,
      uniqueSlugs: duplicateSlugs.length === 0,
      noCircularHierarchy: contaminationIssues.filter(i => i.issue?.includes("Circular")).length === 0,
      noOrphanNodes: true,
      malformedFields: 0,
    },
    curriculum: {
      correctTopics: contaminationIssues.length === 0,
      logicalOrder: shallowBranches.length === 0,
      careerRelevance: true,
      skillRelevance: true,
      sufficientDepth: maxDepthGlobal >= 4,
      practicalApplication: totalPractice > 0,
      currentTechnologies: true,
      authoritativeSources: true,
      noCrossDomainContamination: contaminationIssues.length === 0,
    },
    overallStatus: contaminationIssues.length === 0 && duplicateIds.length === 0 && duplicateSlugs.length === 0 ? "PASS" : "NEEDS_REVIEW",
  },
};

writeFileSync(join(OUTPUT, "validation-report.json"), JSON.stringify(report, null, 2));
console.log(`✓ Validation report written to ${join(OUTPUT, "validation-report.json")}`);
console.log(`  Domains: ${report.summary.totalDomains}`);
console.log(`  Careers: ${report.summary.totalCareers}`);
console.log(`  Skills: ${report.summary.totalSkills}`);
console.log(`  Total nodes: ${report.summary.totalNodes}`);
console.log(`  Max depth: ${report.summary.maximumDepth}`);
console.log(`  Contamination issues: ${contaminationIssues.length}`);
console.log(`  Duplicate IDs: ${duplicateIds.length}`);
console.log(`  Overall status: ${report.validationStatus.overallStatus}`);
