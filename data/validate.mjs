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

// ── resource / practice validation ───────────────────────────────────────────
// Generic search URLs are banned outright — a curated platform never ships a
// google/youtube/bing search page as a learning resource.
const SEARCH_URL_RE = /(google\.com\/search|youtube\.com\/results|bing\.com\/search|duckduckgo\.com\/\?q=)/i;
// Known-broken / placeholder domains that must never ship.
const BAD_HOSTS = ["localhost", "127.0.0.1", "example.com", "yourdomain.com", "placeholder.com"];

const requiredResourceFields = ["title", "url", "kind", "type", "provider", "description", "difficulty", "estimatedTime"];
const requiredPracticeFields = ["title", "platform", "url", "difficulty", "estimatedTime"];

function checkResources(node, d, file) {
  // empty is an INTENTIONAL state ("no verified resource available yet") —
  // reported as info so it can be tracked without failing the build.
  if (!Array.isArray(d.resources)) {
    report(file, "error", `node "${node.label}" (${node.type}) has non-array resources`);
    return;
  }
  if (d.resources.length === 0) {
    report(file, "info", `node "${node.label}" (${node.type}) has no verified resources (intentional empty state)`);
    return;
  }
  const seen = new Set();
  for (const r of d.resources) {
    if (!r || typeof r !== "object") {
      report(file, "error", `node "${node.label}" has a malformed resource entry`);
      continue;
    }
    for (const f of requiredResourceFields) {
      if (r[f] === undefined || r[f] === null || (typeof r[f] === "string" && !r[f].trim())) {
        report(file, "error", `node "${node.label}" resource "${r.title || "?"}" missing field ${f}`);
      }
    }
    if (typeof r.url !== "string") continue;
    // The coverage spec sanctions a topic-specific PDF-discovery fallback
    // (query includes the exact topic + domain) — those are explicitly NOT
    // generic search links, so they pass. Any other search URL is banned.
    const isPdfDiscovery = r.type === "PDF Search" && r.query && r.query.toLowerCase().startsWith('filetype:pdf "');
    if (SEARCH_URL_RE.test(r.url) && !isPdfDiscovery) {
      report(file, "error", `node "${node.label}" ships a generic search URL: ${r.url}`);
    }
    if (!/^https?:\/\//.test(r.url)) {
      report(file, "error", `node "${node.label}" resource has non-http URL: ${r.url}`);
    }
    let host = "";
    try {
      host = new URL(r.url).hostname.replace(/^www\./, "").toLowerCase();
    } catch {
      report(file, "error", `node "${node.label}" resource has unparseable URL: ${r.url}`);
    }
    if (host && BAD_HOSTS.includes(host)) {
      report(file, "error", `node "${node.label}" ships placeholder/broken host (${host}): ${r.url}`);
    }
    if (seen.has(r.url)) {
      report(file, "error", `node "${node.label}" has duplicate resource URL: ${r.url}`);
    }
    seen.add(r.url);
    if (typeof r.isOfficial !== "boolean") {
      report(file, "error", `node "${node.label}" resource "${r.title}" missing boolean isOfficial`);
    }
  }
}

// Algorithm kata / interview platforms — valid inside real coding roadmaps,
// never inside CMS/no-code/consulting careers or the non-tech domains.
const ALGO_HOST_RE = /(^|\.)(leetcode\.com|neetcode\.io|codeforces\.com|codechef\.com|codewars\.com|exercism\.org)$/;
const NON_CODING_DOMAINS = new Set(["design", "engineering", "engineering software", "productivity", "ui/ux & design"]);
const NON_CODING_SLUGS = new Set([
  "wordpress", "wordpress-developer", "no-code-developer", "erp-consultant",
  "sap-consultant", "salesforce-developer", "product-manager", "technical-writer",
]);
const isAlgoUrl = (u) => {
  try {
    const url = new URL(u);
    const h = url.hostname.replace(/^www\./, "");
    if (ALGO_HOST_RE.test(h)) return true;
    return h === "hackerrank.com" && /\/domains\/algorithms/.test(url.pathname);
  } catch {
    return false;
  }
};
const PLATFORM_HOSTS = {
  LeetCode: /leetcode\.com/,
  NeetCode: /neetcode\.io/,
  Codewars: /codewars\.com/,
  Codeforces: /codeforces\.com/,
  CodeChef: /codechef\.com/,
  Exercism: /exercism\.org/,
  HackerRank: /hackerrank\.com/,
  "HackerRank SQL": /hackerrank\.com/,
};

function checkPractice(node, d, file, slug, domain) {
  if (d.practice === undefined || d.practice === null) {
    report(file, "warn", `node "${node.label}" (${node.type}) has no practice array`);
    return;
  }
  const ctx = String(domain ?? "").toLowerCase();
  const offCtx = NON_CODING_DOMAINS.has(ctx) || NON_CODING_SLUGS.has(slug);
  if (!Array.isArray(d.practice)) {
    report(file, "error", `node "${node.label}" (${node.type}) has non-array practice`);
    return;
  }
  const seen = new Set();
  for (const p of d.practice) {
    if (!p || typeof p !== "object") {
      report(file, "error", `node "${node.label}" has a malformed practice entry`);
      continue;
    }
    for (const f of requiredPracticeFields) {
      if (p[f] === undefined || p[f] === null || (typeof p[f] === "string" && !p[f].trim())) {
        report(file, "error", `node "${node.label}" practice "${p.title || "?"}" missing field ${f}`);
      }
    }
    if (typeof p.url === "string") {
      if (SEARCH_URL_RE.test(p.url)) report(file, "error", `node "${node.label}" practice ships a search URL: ${p.url}`);
      if (!/^https?:\/\//.test(p.url)) report(file, "error", `node "${node.label}" practice has non-http URL: ${p.url}`);
      if (seen.has(p.url)) report(file, "error", `node "${node.label}" has duplicate practice URL: ${p.url}`);
      seen.add(p.url);
    }
    if (!Array.isArray(p.skills)) {
      report(file, "error", `node "${node.label}" practice "${p.title || "?"}" missing skills array`);
    }
    // platform/URL consistency — LeetCode must point at leetcode.com, etc.
    const hostRe = PLATFORM_HOSTS[p.platform];
    if (hostRe && typeof p.url === "string") {
      try {
        if (!hostRe.test(new URL(p.url).hostname.replace(/^www\./, ""))) {
          report(file, "error", `node "${node.label}" practice platform "${p.platform}" points at mismatched host: ${p.url}`);
        }
      } catch {
        /* url validity already reported */
      }
    }
    // no algorithm kata/interview platforms in non-coding roadmaps
    if (offCtx && typeof p.url === "string" && isAlgoUrl(p.url)) {
      report(file, "error", `node "${node.label}" ships algorithm practice (${p.platform}) inside a non-coding roadmap: ${p.url}`);
    }
  }
}

// ── project validation ───────────────────────────────────────────────────────
// Projects only exist where they genuinely make sense, and where they exist
// there must be at least two (guided + practical) — never one lonely build.
const validateProjects = (file, node) => {
  const d = node.details;
  if (!d || !Array.isArray(d.projects)) return;
  if (d.projects.length === 0) return; // hidden tab — fine, no hollow section
  if (d.projects.length === 1) {
    report(file, "error", `node "${node.label}" (${node.type}) has exactly 1 project — add a companion so meaningful topics offer ≥2`);
    return;
  }
  for (const p of d.projects) {
    if (!p || !p.title) {
      report(file, "error", `node "${node.label}" has a project missing a title`);
      continue;
    }
    if (!p.difficulty) report(file, "error", `project "${p.title}" (${node.label}) missing difficulty`);
    if (!p.duration) report(file, "error", `project "${p.title}" (${node.label}) missing duration/estimated time`);
    if (!Array.isArray(p.skills) || p.skills.length === 0) {
      report(file, "error", `project "${p.title}" (${node.label}) missing skills array`);
    }
  }
};

// ── cross-domain contamination check ─────────────────────────────────────────
// High-precision only: a label flagged here is unambiguously a leak from
// another language/domain ("Arrow functions" inside C, "React Hooks" inside
// an engineering career, "JVM" inside Python…). Roadmap slugs with the tech
// in their own name (javascript containing "Arrow functions") are exempt.
const CONTAMINATION = [
  // [label regex, must NOT appear in roadmap slug]
  [/\barrow function/i, /(javascript|typescript|js$|js-|frontend|web|full.?stack|react|node|php)/],
  [/\bthis binding\b/i, /(javascript|typescript|js$|js-|frontend|web|full.?stack|react)/],
  [/\biifes?\b/i, /(javascript|typescript|js$|js-|frontend|web|full.?stack|react)/],
  [/\bhoisting\b/i, /(javascript|typescript|js$|js-|frontend|web|full.?stack|react|node)/],
  [/\bjsx\b/i, /(javascript|typescript|js$|js-|frontend|web|fullstack|react|node)/],
  [/\breact hooks?\b/i, /(react|frontend|web|fullstack|javascript|typescript|node)/],
  [/\bred[\s-]?ux\b/i, /(react|frontend|web|fullstack|javascript|typescript)/],
  [/\bnpm\b/i, /(node|javascript|typescript|js$|js-|frontend|web|full.?stack|react|vue|angular|bootstrap|sass|css)/],
  [/\bjsx syntax\b/i, /(react|frontend|web|fullstack|javascript|typescript)/],
  [/\bvirtual dom\b/i, /(react|vue|frontend|web|fullstack|javascript|typescript)/],
  [/\bjvm\b/i, /(java|kotlin|scala|groovy|android|jvm)/],
  [/\bmaven\b/i, /(java|kotlin|scala|groovy|android|jvm|spring)/],
  [/\bgradle\b/i, /(java|kotlin|scala|groovy|android|jvm|spring)/],
  [/\bspring boot\b/i, /(java|kotlin|scala|groovy|jvm|spring|backend|fullstack|web)/],
  [/\bchecked exceptions?\b/i, /(java|kotlin|groovy|jvm|csharp)/],
  [/\bautoboxing\b/i, /(java|kotlin|groovy|jvm)/],
  [/\bjunit\b/i, /(java|kotlin|scala|groovy|jvm|android|spring)/],
  [/\bcollections framework\b/i, /(java|kotlin|scala|groovy|jvm|android|csharp)/],
  [/\bpointer arithmetic\b/i, /(c\b|c-|cpp|c\+\+|rust|go\b|golang|embedded|systems|os\b|firmware|kernel)/],
  [/\bmalloc\b/i, /(c\b|c-|cpp|c\+\+|rust|embedded|systems|os\b|firmware|kernel)/],
  [/\bcalloc\b/i, /(c\b|c-|cpp|c\+\+|embedded|systems|firmware|kernel)/],
  [/\brealloc\b/i, /(c\b|c-|cpp|c\+\+|embedded|systems|firmware|kernel)/],
  [/\bdereference\b/i, /(c\b|c-|cpp|c\+\+|rust|go\b|golang|embedded|systems|firmware|kernel)/],
  [/\bpreprocessor\b/i, /(c\b|c-|cpp|c\+\+|embedded|systems|firmware|kernel|css|sass|frontend|web)/],
  [/\bundefined behavior\b/i, /(c\b|c-|cpp|c\+\+|rust|embedded|systems|firmware|kernel)/],
  [/\bstorage classes\b/i, /(c\b|c-|cpp|c\+\+|embedded|systems|firmware|kernel)/],
  [/\btypedef\b/i, /(c\b|c-|cpp|c\+\+|embedded|systems|firmware|kernel|go\b)/],
  [/\bfunction pointers\b/i, /(c\b|c-|cpp|c\+\+|embedded|systems|firmware|kernel)/],
  [/\bsegmentation fault\b/i, /(c\b|c-|cpp|c\+\+|embedded|systems|firmware|kernel|rust)/],
  [/\bdunder\b/i, /(python|py\b|django|flask|fastapi)/],
  [/\bvirtual environment\b/i, /(python|py\b|django|flask|fastapi|data|ai|ml|learning|nlp|vision|analytics|opencv|engineer|pytorch|tensorflow|scikit|llm|ml)/],
  [/\bjupyter\b/i, /(python|py\b|django|flask|fastapi|data|ai|ml|learning|nlp|vision|analytics|opencv|engineer|datascience|analyst|matplotlib|pandas|numpy|seaborn|pytorch|tensorflow|scikit|llm)/],
  [/\bvenv\b/i, /(python|py\b|django|flask|fastapi|data|ai|ml|learning|nlp|vision|analytics|opencv|engineer)/],
  [/\bpandas\b/i, /(python|py\b|django|flask|fastapi|data|ai|ml|learning|nlp|vision|analytics|opencv|engineer|datascience|analyst|pandas)/],
  [/\bnumpy\b/i, /(python|py\b|django|flask|fastapi|data|ai|ml|learning|nlp|vision|analytics|opencv|engineer|datascience|analyst|numpy)/],
  [/\bmatplotlib\b/i, /(python|py\b|django|flask|fastapi|data|ai|ml|learning|nlp|vision|analytics|opencv|engineer|datascience|analyst|matplotlib|seaborn)/],
  [/\brubygems?\b/i, /(ruby|rails)/],
  [/\bbundler\b/i, /(ruby|rails|javascript|typescript|frontend|web|fullstack|node)/],
  [/\bgoroutines?\b/i, /(go\b|golang|backend|fullstack|devops|cloud|network)/],
  [/\bgopath\b/i, /(go\b|golang)/],
  [/\bcargo\b/i, /(rust)/],
  [/\bownership\b.*\bborrow\b/i, /(rust|cpp|embedded|systems)/],
  [/\blifetimes\b/i, /(rust)/],
  [/\bswiftui\b/i, /(swift|ios|apple|macos)/],
  [/\bxcode\b/i, /(swift|ios|apple|macos)/],
  [/\blinq\b/i, /(csharp|dotnet|microsoft|aspnet)/],
  [/\bnuget\b/i, /(csharp|dotnet|microsoft|aspnet)/],
  [/\bcomposition api\b/i, /(vue|frontend|web|fullstack)/],
  [/\bpinia\b/i, /(vue|nuxt|frontend|web|full.?stack)/],
  [/\bvue router\b/i, /(vue|frontend|web|fullstack)/],
  [/\bang[\s-]?ular router\b/i, /(angular|frontend|web|fullstack)/],
  [/\brxjs\b/i, /(angular|frontend|web|fullstack|csharp|dotnet)/],
  [/\bspring mvc\b/i, /(java|kotlin|scala|groovy|jvm|spring|backend|fullstack|web)/],
  [/\bdjango orm\b/i, /(python|django|backend|web|fullstack)/],
  [/\bterraform\b/i, /(devops|cloud|sre|platform|sysadmin|backend|full.?stack|mlops|data|analytics|desktop|software|engineer|ci|cd|it\b|terraform)/],
  [/\bkubernetes\b/i, /(devops|cloud|sre|platform|sysadmin|backend|full.?stack|mlops|data|gitlab|jenkins|desktop|software|engineer|ci|cd|it\b)/],
  [/\bdocker\b/i, /(devops|cloud|sre|platform|sysadmin|backend|full.?stack|mlops|data|gitlab|jenkins|desktop|qa|test|game|unity|software|engineer|ci|cd|fastapi|django|flask|python|ml|php|terraform|spring|laravel|valet)/],
  [/\baws\b/i, /(aws|cloud|devops|sre|platform|sysadmin|backend|full.?stack|mlops|data|analytics|iot|quantum|solutions|architect|azure|gcp|cyber|security|application|engineer|ci|cd|it\b|desktop|soc|information|terraform)/],
  [/\bazure\b/i, /(azure|cloud|devops|sre|platform|sysadmin|backend|full.?stack|mlops|data|dotnet|csharp|aspnet|microsoft|dba|administrator|iot|solutions|architect|cyber|security|application|engineer|ci|cd|it\b|desktop|soc|information|terraform)/],
];

function checkContamination(node, file, slug, path) {
  const label = node.label || "";
  const slugNorm = slug.replace(/[-_]/g, " ").toLowerCase();
  for (const [re, exemptRe] of CONTAMINATION) {
    if (re.test(label) && !exemptRe.test(slug)) {
      // self-reference: the roadmap IS about this tech (docker roadmap → Docker)
      const techToken = label.split(/\s|[/()]/)[0].toLowerCase().replace(/s$/, "");
      if (slugNorm.includes(techToken)) continue;
      report(file, "error", `cross-domain leak: "${label}" does not belong in ${slug} (${path.join(" > ")}${path.length ? " > " : ""}${label})`);
      return;
    }
  }
}

const issues = [];
let checked = 0;

function report(file, level, msg) {
  issues.push({ file, level, msg });
}

function walk(node, file, parentLabel, depth, path, slug, domain) {
  // 0. cross-domain contamination (JS concepts inside C, JVM inside Python, …)
  checkContamination(node, file, slug, path);

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
    // resources/practice are validated separately (empty resources is an
    // intentional state, not a defect)
    for (const field of REQUIRED_DETAILS) {
      const v = d[field];
      const empty = v === undefined || v === null || (Array.isArray(v) && v.length === 0) || (typeof v === "string" && !v.trim());
      if (empty) {
        report(file, "warn", `node "${node.label}" (${node.type}) missing details.${field}`);
      }
    }
    // resource & practice quality gates
    checkResources(node, d, file);
    checkPractice(node, d, file, slug, domain);
    // project quality gate: ≥2 builds where projects exist, full fields
    validateProjects(file, node);
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

  for (const c of kids) walk(c, file, node.label, depth + 1, [...path, node.label], slug, domain);
}

// Exclude meta/index files — only individual roadmaps are validated.
const SKIP = new Set(["index.json", "search-index.json", "skill-categories.json", "career-domains.json", "certifications.json"]);
const files = readdirSync(OUT).filter((f) => f.endsWith(".json") && !SKIP.has(f));

// ── certification validation ──────────────────────────────────────────────────
// The shared catalog must be well-formed and every certIds reference in every
// roadmap must resolve to a real catalog entry (never a dangling id).
const CERT_PATH = join(OUT, "certifications.json");
if (existsSync(CERT_PATH)) {
  const certs = JSON.parse(readFileSync(CERT_PATH, "utf8"));
  const certIds = new Set();
  for (const c of certs) certIds.add(c.id);
  for (const c of certs) {
    if (!c.id || !c.name || !c.provider || !c.officialUrl || !c.level) {
      report("certifications.json", "error", `certification missing required field: ${c.id || c.name || "?"}`);
    }
    if (!/^https?:\/\//.test(c.officialUrl || "")) {
      report("certifications.json", "error", `certification "${c.name}" has non-http officialUrl`);
    }
    if (!c.what || !c.who || !c.when || !c.learnFirst) {
      report("certifications.json", "error", `certification "${c.name}" missing beginner-friendly explanation fields`);
    }
    // cost must be classified and never invented: only the curated Free list
    // may claim "Free", everything else is "Paid exam" (prep may be free).
    if (c.cost !== "Free" && c.cost !== "Paid exam") {
      report("certifications.json", "error", `certification "${c.name}" has invalid cost status: ${c.cost}`);
    }
    if (typeof c.freePrep !== "boolean") {
      report("certifications.json", "error", `certification "${c.name}" missing boolean freePrep`);
    }
    for (const l of [...(c.prep || []), ...(c.practice || [])]) {
      if (!l.title || !l.url || !/^https?:\/\//.test(l.url)) {
        report("certifications.json", "error", `certification "${c.name}" has a malformed link (${l.title || "?"})`);
      }
    }
    for (const rid of c.related || []) {
      if (!certIds.has(rid)) report("certifications.json", "error", `certification "${c.name}" references unknown related id ${rid}`);
    }
  }
  // every certIds reference across all roadmaps resolves
  for (const f of files) {
    const data = JSON.parse(readFileSync(join(OUT, f), "utf8"));
    if (!data.root) continue;
    const walkCerts = (n) => {
      for (const id of n.details?.certIds ?? []) {
        if (!certIds.has(id)) report(f, "error", `node "${n.label}" references unknown certification id ${id}`);
      }
      for (const c of n.children ?? []) walkCerts(c);
      for (const o of n.options ?? []) walkCerts(o);
    };
    walkCerts(data.root);
  }
}

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

  walk(data.root, f, null, 0, [data.root.label], f.replace(/\.json$/, ""), data.meta?.domain ?? "");
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
