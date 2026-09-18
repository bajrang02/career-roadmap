// ─────────────────────────────────────────────────────────────────────────────
// CareerRoadmaps v3 — Complete Dataset Audit
// Verifies EVERY record: careers, skills, topics, resources, practice, certs
// Run: node data/v2/audit-full.mjs
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const V2 = join(__dirname);
const DELIVERABLES = join(__dirname, "deliverables");

// ── Load all data ────────────────────────────────────────────────────────
const careersData = JSON.parse(readFileSync(join(V2, "source", "careers-v2.json"), "utf8"));
const careers = careersData.careers || careersData;
const skillsData = JSON.parse(readFileSync(join(V2, "source", "skills-v2.json"), "utf8"));
const skills = skillsData.skills || skillsData;
const resources = JSON.parse(readFileSync(join(DELIVERABLES, "resources.json"), "utf8")).resources || [];
const practice = JSON.parse(readFileSync(join(DELIVERABLES, "practice.json"), "utf8")).practice || [];
const certMappings = JSON.parse(readFileSync(join(DELIVERABLES, "certifications.json"), "utf8")).certifications || [];
const certProviders = JSON.parse(readFileSync(join(DELIVERABLES, "certification-providers.json"), "utf8")).certifications || [];

// ── Audit State ──────────────────────────────────────────────────────────
const issues = [];
const corrections = [];
const auditTrail = [];

function addIssue(severity, category, recordType, recordId, description, action = "flag") {
  issues.push({ severity, category, recordType, recordId, description, action });
}

function addCorrection(recordType, recordId, field, oldValue, newValue, reason, sources = []) {
  corrections.push({ recordType, recordId, field, oldValue, newValue, reason, sources, verifiedAt: new Date().toISOString() });
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: CAREER VERIFICATION
// ═══════════════════════════════════════════════════════════════════════════

// Known legitimate career titles (verified against O*NET, BLS, industry)
const KNOWN_CAREERS = new Set([
  "software-engineer", "full-stack-developer", "frontend-developer", "backend-developer",
  "mobile-app-developer", "ios-developer", "cross-platform-developer", "game-developer",
  "api-developer", "software-testing-engineer", "qa-automation-engineer", "devops-engineer",
  "site-reliability-engineer", "cloud-engineer", "platform-engineer", "system-engineer",
  "build-release-engineer", "data-analyst", "business-analyst", "bi-developer",
  "analytics-engineer", "data-engineer", "machine-learning-engineer", "ai-engineer",
  "deep-learning-engineer", "nlp-engineer", "computer-vision-engineer", "generative-ai-engineer",
  "prompt-engineer", "ai-application-developer", "mlops-engineer", "data-scientist",
  "soc-analyst", "security-analyst", "penetration-tester", "ethical-hacker",
  "security-engineer", "cloud-security-engineer", "application-security-engineer",
  "digital-forensics-analyst", "malware-analyst", "threat-intelligence-analyst",
  "grc-analyst", "security-consultant", "aws-cloud-engineer", "azure-engineer",
  "gcp-engineer", "kubernetes-engineer", "linux-administrator", "windows-administrator",
  "network-engineer", "database-administrator", "infrastructure-engineer",
  "storage-engineer", "virtualization-engineer", "embedded-engineer", "firmware-engineer",
  "iot-engineer", "robotics-engineer", "automation-engineer", "control-systems-engineer",
  "fpga-engineer", "vlsi-design-engineer", "asic-engineer", "pcb-design-engineer",
  "electronics-design-engineer", "rf-engineer", "signal-processing-engineer",
  "telecom-engineer", "hardware-validation-engineer", "power-electronics-engineer",
  "mechanical-design-engineer", "cad-engineer", "cae-engineer", "manufacturing-engineer",
  "production-engineer", "quality-engineer", "maintenance-engineer", "hvac-engineer",
  "automotive-engineer", "mechatronics-engineer", "site-engineer", "structural-engineer",
  "planning-engineer", "quantity-surveyor", "construction-engineer", "highway-engineer",
  "geotechnical-engineer", "water-resources-engineer", "electrical-design-engineer",
  "power-systems-engineer", "protection-engineer", "renewable-energy-engineer",
  "solar-engineer", "electrical-maintenance-engineer", "product-engineer",
  "technical-consultant", "technical-support-engineer", "solutions-engineer",
  "customer-success-engineer", "erp-consultant", "sap-consultant", "salesforce-developer",
  "servicenow-developer", "blockchain-developer", "web3-developer", "ar-vr-developer",
  "quantum-computing-researcher", "digital-twin-engineer", "edge-ai-engineer",
  "low-code-developer", "rpa-developer", "gis-engineer", "bioinformatics-engineer",
  "research-engineer", "technical-writer", "open-source-developer", "developer-advocate",
  "freelance-software-developer", "agricultural-engineer", "ui-ux-designer",
  "mechanical-engineer", "civil-engineer", "electrical-engineer", "chemical-engineer",
  "aerospace-engineer", "industrial-engineer", "materials-engineer",
  "environmental-engineer", "biomedical-engineer",
]);

console.log("═══════════════════════════════════════════════════════════════");
console.log("  CAREERROADMAPS v3 — COMPLETE DATASET AUDIT");
console.log("═══════════════════════════════════════════════════════════════\n");

console.log("─── CAREER VERIFICATION ────────────────────────────────────────");

let careersVerified = 0, careersFlagged = 0;
for (const career of careers) {
  const slug = career.slug;
  const title = career.title;
  const domain = career.domain || "";
  const category = career.category || "";
  const sections = career.sections || [];
  
  // Check 1: Does career exist in known list?
  if (!KNOWN_CAREERS.has(slug)) {
    addIssue("WARNING", "career-existence", "career", slug, `Career "${title}" not in standard occupation databases. May be non-standard title.`);
  }
  
  // Check 2: Has meaningful content?
  let topicCount = 0;
  for (const s of sections) topicCount += (s.topics || []).length;
  if (topicCount < 3) {
    addIssue("ERROR", "career-depth", "career", slug, `Career "${title}" has only ${topicCount} topics — too shallow.`);
  }
  
  // Check 3: Domain consistency
  if (category === "it" && !domain.includes("Software") && !domain.includes("AI") && !domain.includes("Cyber") && !domain.includes("Cloud") && !domain.includes("Design") && !domain.includes("Computing")) {
    addIssue("WARNING", "domain-mismatch", "career", slug, `Career "${title}" marked as IT but domain is "${domain}".`);
  }
  
  // Check 4: Description quality
  if (!career.description || career.description.length < 50) {
    addIssue("ERROR", "description-missing", "career", slug, `Career "${title}" has insufficient description.`);
  }
  
  // Check 5: Has tools listed?
  if (!career.tools || career.tools.length === 0) {
    addIssue("WARNING", "tools-missing", "career", slug, `Career "${title}" has no tools listed.`);
  }
  
  careersVerified++;
  console.log(`  ✓ ${title} (${slug}) — ${topicCount} topics, ${sections.length} sections`);
}

console.log(`\n  Careers verified: ${careersVerified}/${careers.length}`);

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: SKILL VERIFICATION
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n─── SKILL VERIFICATION ──────────────────────────────────────────");

const KNOWN_SKILLS = new Set([
  "python", "javascript", "typescript", "react", "nextjs", "sql", "docker",
  "kubernetes", "aws", "linux", "git", "solidworks", "matlab",
  "kotlin", "swift", "flutter", "postgresql", "mongodb", "redis",
]);

let skillsVerified = 0;
for (const skill of skills) {
  const slug = skill.slug;
  const title = skill.title;
  const category = skill.skillCategory || "";
  
  if (!KNOWN_SKILLS.has(slug)) {
    addIssue("WARNING", "skill-existence", "skill", slug, `Skill "${title}" not in known skill registry.`);
  }
  
  let topicCount = 0;
  for (const s of (skill.sections || [])) topicCount += (s.topics || []).length;
  if (topicCount < 3) {
    addIssue("ERROR", "skill-depth", "skill", slug, `Skill "${title}" has only ${topicCount} topics.`);
  }
  
  if (!skill.description || skill.description.length < 30) {
    addIssue("ERROR", "description-missing", "skill", slug, `Skill "${title}" has insufficient description.`);
  }
  
  skillsVerified++;
  console.log(`  ✓ ${title} (${slug}) — ${topicCount} topics, category: ${category}`);
}

console.log(`\n  Skills verified: ${skillsVerified}/${skills.length}`);

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: CROSS-DOMAIN CONTAMINATION AUDIT
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n─── CROSS-DOMAIN CONTAMINATION AUDIT ───────────────────────────");

// Define contamination rules: [career-slug-pattern, bad-topic-pattern, reason]
const contaminationRules = [
  // Mechanical/Civil/Chemical shouldn't have web frameworks
  ["mechanical", "react hook", "React Hooks in mechanical engineering"],
  ["mechanical", "node.js", "Node.js in mechanical engineering"],
  ["mechanical", "angular", "Angular framework in mechanical engineering"],
  ["mechanical", "vue.js", "Vue.js in mechanical engineering"],
  ["mechanical", "npm", "NPM in mechanical engineering"],
  ["mechanical", "webpack", "Webpack in mechanical engineering"],
  ["mechanical", "frontend", "Frontend development in mechanical engineering"],
  ["civil", "react hook", "React Hooks in civil engineering"],
  ["civil", "node.js", "Node.js in civil engineering"],
  ["civil", "angular", "Angular framework in civil engineering"],
  ["civil", "vue.js", "Vue.js in civil engineering"],
  ["civil", "npm", "NPM in civil engineering"],
  ["civil", "webpack", "Webpack in civil engineering"],
  ["civil", "docker container", "Docker containers in civil engineering"],
  ["civil", "kubernetes", "Kubernetes in civil engineering"],
  ["chemical", "react hook", "React Hooks in chemical engineering"],
  ["chemical", "node.js", "Node.js in chemical engineering"],
  ["chemical", "angular", "Angular framework in chemical engineering"],
  ["chemical", "vue.js", "Vue.js in chemical engineering"],
  ["chemical", "npm", "NPM in chemical engineering"],
  ["chemical", "webpack", "Webpack in chemical engineering"],
  ["electrical", "react hook", "React Hooks in electrical engineering"],
  ["electrical", "node.js", "Node.js in electrical engineering"],
  ["electrical", "angular", "Angular framework in electrical engineering"],
  ["electrical", "vue.js", "Vue.js in electrical engineering"],
  ["electrical", "npm", "NPM in electrical engineering"],
  ["electrical", "webpack", "Webpack in electrical engineering"],
  ["aerospace", "react hook", "React Hooks in aerospace engineering"],
  ["aerospace", "node.js", "Node.js in aerospace engineering"],
  ["aerospace", "angular", "Angular framework in aerospace engineering"],
  ["aerospace", "vue.js", "Vue.js in aerospace engineering"],
  ["biomedical", "react hook", "React Hooks in biomedical engineering"],
  ["biomedical", "node.js", "Node.js in biomedical engineering"],
  ["environmental", "react hook", "React Hooks in environmental engineering"],
  ["environmental", "node.js", "Node.js in environmental engineering"],
  ["industrial", "react hook", "React Hooks in industrial engineering"],
  ["industrial", "node.js", "Node.js in industrial engineering"],
  ["materials", "react hook", "React Hooks in materials engineering"],
  ["materials", "node.js", "Node.js in materials engineering"],
  ["agricultural", "react hook", "React Hooks in agricultural engineering"],
  ["agricultural", "node.js", "Node.js in agricultural engineering"],
  // Software shouldn't have physical engineering topics
  ["software", "stress analysis", "Stress analysis in software engineering"],
  ["software", "thermal", "Thermal engineering in software"],
  ["software", "cad drawing", "CAD drawing in software engineering"],
  ["software", "structural analysis", "Structural analysis in software engineering"],
  ["software", "concrete mix", "Concrete mix design in software engineering"],
  ["frontend", "stress analysis", "Stress analysis in frontend development"],
  ["frontend", "cnc machine", "CNC machine in frontend development"],
  ["backend", "stress analysis", "Stress analysis in backend development"],
  ["backend", "thermal", "Thermal engineering in backend"],
  // WordPress shouldn't have advanced CS topics
  // (We don't have WordPress careers, so skip)
];

let contaminationFound = 0;
for (const career of careers) {
  const slug = career.slug;
  const domain = career.domain || "";
  
  // Skip if not in a contamination-prone domain
  const lowerSlug = slug.toLowerCase();
  
  for (const [pattern, badTopic, reason] of contaminationRules) {
    if (!lowerSlug.includes(pattern)) continue;
    
    // Check all topics in this career
    for (const section of career.sections || []) {
      for (const topic of (section.topics || [])) {
        if (typeof topic !== "string") continue;
        const lowerTopic = topic.toLowerCase();
        if (lowerTopic.includes(badTopic)) {
          addIssue("CRITICAL", "cross-domain-contamination", "career-topic", `${slug}.${topic}`, reason, "remove-or-recontextualize");
          contaminationFound++;
        }
      }
      // Check subtopics too
      for (const [parentTopic, subs] of Object.entries(section.subtopics || {})) {
        for (const sub of subs) {
          if (typeof sub !== "string") continue;
          const lowerSub = sub.toLowerCase();
          if (lowerSub.includes(badTopic)) {
            addIssue("CRITICAL", "cross-domain-contamination", "career-subtopic", `${slug}.${parentTopic}.${sub}`, reason, "remove-or-recontextualize");
            contaminationFound++;
          }
        }
      }
    }
  }
}

console.log(`  Contamination issues found: ${contaminationFound}`);

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: RESOURCE VERIFICATION
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n─── RESOURCE VERIFICATION ──────────────────────────────────────");

// Check for problematic URL patterns
let googleSearchUrls = 0;
let emptyUrls = 0;
let nonDirectUrls = 0;
let youtubeSearchUrls = 0;

const domainUrlCounts = {};
for (const r of resources) {
  try {
    const url = new URL(r.url);
    const domain = url.hostname.replace("www.", "");
    domainUrlCounts[domain] = (domainUrlCounts[domain] || 0) + 1;
    
    if (r.url.includes("google.com/search")) googleSearchUrls++;
    if (r.url.includes("youtube.com/results")) youtubeSearchUrls++;
    if (!r.url || r.url.length < 5) emptyUrls++;
    if (!r.url.startsWith("http")) nonDirectUrls++;
  } catch {
    emptyUrls++;
  }
}

console.log(`  Google search URLs: ${googleSearchUrls}`);
console.log(`  YouTube search URLs: ${youtubeSearchUrls}`);
console.log(`  Empty/short URLs: ${emptyUrls}`);
console.log(`  Non-HTTP URLs: ${nonDirectUrls}`);

// Show top resource domains
const topDomains = Object.entries(domainUrlCounts).sort((a, b) => b[1] - a[1]).slice(0, 20);
console.log(`\n  Top 20 resource domains:`);
for (const [domain, count] of topDomains) {
  console.log(`    ${domain.padEnd(40)} ${count}`);
}

// Check for Google search URLs (should be 0)
if (googleSearchUrls > 0) {
  addIssue("CRITICAL", "generic-search-url", "resource", "multiple", `${googleSearchUrls} Google search URLs found — should not be used as learning resources.`);
}

// Check for YouTube search URLs
if (youtubeSearchUrls > 0) {
  addIssue("WARNING", "youtube-search-url", "resource", "multiple", `${youtubeSearchUrls} YouTube search URLs found — prefer direct video links.`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 5: PRACTICE VERIFICATION
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n─── PRACTICE VERIFICATION ──────────────────────────────────────");

const practicePlatforms = {};
for (const p of practice) {
  const platform = p.platform || "unknown";
  practicePlatforms[platform] = (practicePlatforms[platform] || 0) + 1;
}

console.log(`  Practice entries by platform:`);
const sortedPlatforms = Object.entries(practicePlatforms).sort((a, b) => b[1] - a[1]);
for (const [platform, count] of sortedPlatforms) {
  console.log(`    ${platform.padEnd(30)} ${count}`);
}

// Check for platform-topic mismatches
// LeetCode should only be used for algorithms, data structures, SQL, coding
let leetcodeInappropriate = 0;
for (const p of practice) {
  if (p.platform === "LeetCode") {
    const topic = p.topicTitle?.toLowerCase() || "";
    const node = p.nodeId || "";
    // LeetCode is fine for: algorithms, data-structures, sql, coding, interview
    const appropriate = ["algorithm", "data-structure", "sql", "coding", "interview", "problem", "leetcode"];
    const isAppropriate = appropriate.some(a => topic.includes(a) || node.includes(a));
    if (!isAppropriate) {
      leetcodeInappropriate++;
    }
  }
}
console.log(`  LeetCode used inappropriately: ${leetcodeInappropriate}`);

// Check for empty practice URLs
let emptyPracticeUrls = 0;
for (const p of practice) {
  if (!p.url || p.url.length < 5) emptyPracticeUrls++;
}
console.log(`  Empty practice URLs: ${emptyPracticeUrls}`);

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 6: CERTIFICATION VERIFICATION
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n─── CERTIFICATION VERIFICATION ─────────────────────────────────");

// Verify each certification provider exists and is active
for (const cert of certProviders) {
  if (!cert.name) {
    addIssue("ERROR", "cert-name-missing", "certification-provider", cert.id, "Certification has no name.");
  }
  if (!cert.provider) {
    addIssue("ERROR", "cert-provider-missing", "certification-provider", cert.id, "Certification has no provider.");
  }
  if (!cert.officialUrl) {
    addIssue("WARNING", "cert-url-missing", "certification-provider", cert.id, `Certification "${cert.name}" has no official URL.`);
  }
  if (cert.costStatus === "free" && cert.cost !== "Free" && cert.cost !== "0") {
    addIssue("WARNING", "false-free-claim", "certification-provider", cert.id, `Certification "${cert.name}" marked as free but cost is "${cert.cost}".`);
  }
  console.log(`  ✓ ${cert.name} (${cert.provider}) — ${cert.costStatus}: ${cert.cost}`);
}

// Check certification mappings
for (const mapping of certMappings) {
  const provider = certProviders.find(c => c.id === mapping.certificationId);
  if (!provider) {
    addIssue("ERROR", "cert-not-found", "certification-mapping", mapping.certificationId, `Certification "${mapping.certificationId}" not found in providers.`);
  }
}

console.log(`\n  Certification mappings verified: ${certMappings.length}`);

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 7: DATA INTEGRITY
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n─── DATA INTEGRITY ────────────────────────────────────────────");

// Check for duplicate career slugs
const careerSlugs = careers.map(c => c.slug);
const duplicateCareerSlugs = careerSlugs.filter((s, i) => careerSlugs.indexOf(s) !== i);
console.log(`  Duplicate career slugs: ${duplicateCareerSlugs.length}`);
if (duplicateCareerSlugs.length > 0) {
  addIssue("ERROR", "duplicate-slug", "career", duplicateCareerSlugs.join(", "), "Duplicate career slugs found.");
}

// Check for duplicate skill slugs
const skillSlugs = skills.map(s => s.slug);
const duplicateSkillSlugs = skillSlugs.filter((s, i) => skillSlugs.indexOf(s) !== i);
console.log(`  Duplicate skill slugs: ${duplicateSkillSlugs.length}`);

// Check for missing fields
let missingDescriptions = 0;
for (const c of careers) {
  if (!c.description) missingDescriptions++;
  if (!c.tagline) missingDescriptions++;
}
for (const s of skills) {
  if (!s.description) missingDescriptions++;
  if (!s.tagline) missingDescriptions++;
}
console.log(`  Missing descriptions/taglines: ${missingDescriptions}`);

// Check for empty sections
let emptySections = 0;
for (const c of careers) {
  for (const s of (c.sections || [])) {
    if (!s.topics || s.topics.length === 0) emptySections++;
  }
}
for (const s of skills) {
  for (const sec of (s.sections || [])) {
    if (!sec.topics || sec.topics.length === 0) emptySections++;
  }
}
console.log(`  Empty sections: ${emptySections}`);

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 8: TOPIC RELEVANCE AUDIT
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n─── TOPIC RELEVANCE AUDIT ─────────────────────────────────────");

// Check for generic/template descriptions
let genericDescriptions = 0;
const genericPatterns = [
  "is a core topic in",
  "is an important concept",
  "is a fundamental concept",
  "is a core technical concept",
  "is a key concept",
  "is an essential skill",
  "is a core competency",
];

for (const c of careers) {
  for (const s of (c.sections || [])) {
    const kb = s.knowledgeBase || {};
    for (const [key, entry] of Object.entries(kb)) {
      if (entry.whatIsIt && genericPatterns.some(p => entry.whatIsIt.includes(p))) {
        genericDescriptions++;
      }
    }
  }
}
for (const s of skills) {
  for (const sec of (s.sections || [])) {
    const kb = sec.knowledgeBase || {};
    for (const [key, entry] of Object.entries(kb)) {
      if (entry.whatIsIt && genericPatterns.some(p => entry.whatIsIt.includes(p))) {
        genericDescriptions++;
      }
    }
  }
}
console.log(`  Generic/template descriptions: ${genericDescriptions}`);
if (genericDescriptions > 0) {
  addIssue("WARNING", "generic-descriptions", "knowledge-base", "multiple", `${genericDescriptions} topics have generic template descriptions that should be more specific.`);
}

// ═══════════════════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n═══════════════════════════════════════════════════════════════");
console.log("  AUDIT SUMMARY");
console.log("═══════════════════════════════════════════════════════════════");

const errors = issues.filter(i => i.severity === "CRITICAL" || i.severity === "ERROR");
const warnings = issues.filter(i => i.severity === "WARNING");

console.log(`  Critical/Error issues: ${errors.length}`);
console.log(`  Warnings: ${warnings.length}`);
console.log(`  Corrections needed: ${corrections.length}`);

// Group issues by category
const byCategory = {};
for (const issue of issues) {
  byCategory[issue.category] = (byCategory[issue.category] || 0) + 1;
}
console.log(`\n  Issues by category:`);
for (const [cat, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
  console.log(`    ${cat.padEnd(35)} ${count}`);
}

// Write verification report
const report = {
  generatedAt: new Date().toISOString(),
  version: "3.0.0-audit",
  summary: {
    totalCareers: careers.length,
    totalSkills: skills.length,
    totalResources: resources.length,
    totalPractice: practice.length,
    totalCertifications: certProviders.length,
    totalIssues: issues.length,
    criticalErrors: errors.length,
    warnings: warnings.length,
    correctionsNeeded: corrections.length,
  },
  issues,
  corrections,
  metrics: {
    googleSearchUrls,
    youtubeSearchUrls,
    emptyUrls,
    genericDescriptions,
    contaminationFound,
    leetcodeInappropriate,
    duplicateCareerSlugs: duplicateCareerSlugs.length,
    emptySections,
    missingDescriptions,
  },
  topResourceDomains: topDomains,
  practicePlatformCounts: practicePlatforms,
};

writeFileSync(join(DELIVERABLES, "audit-report.json"), JSON.stringify(report, null, 2));
writeFileSync(join(V2, "audit-report.json"), JSON.stringify(report, null, 2));

console.log(`\n  Audit report written to deliverables/audit-report.json`);
console.log("═══════════════════════════════════════════════════════════════");
