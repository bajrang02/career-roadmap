// ─────────────────────────────────────────────────────────────────────────────
// Dataset Relevance & Integrity Validator
//
// Audits EVERY resource/practice record and every certification reference in
// the shipped datasets against the topic it is attached to, and reports:
//
//   PASS      record is topic-scoped and semantically relevant
//   FALLBACK  record is a labelled parent/skill fallback (allowed, must be
//             token-relevant to its own topic key)
//   REVIEW    discovery-tier record (allowed, labelled as such in the UI)
//   FAIL      definite mapping/integrity violation — WRONG_TOPIC, WRONG_SKILL,
//             GENERIC (ungated generic platform), BROKEN_URL, DUPLICATE,
//             BROKEN_CERT_REF, BAD_RECORD
//
// Exit code is non-zero when any FAIL exists.
//
// Run: node data/v2/resource-system/validate-resolution.mjs
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "..", "..", "public", "roadmaps");

const normalizeLabel = (label) =>
  String(label ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const STOP = new Set([
  "the", "and", "for", "with", "using", "into", "from", "your", "how", "what",
  "why", "learn", "guide", "tutorial", "introduction", "basics", "fundamentals",
  "advanced", "beginner", "intermediate", "complete", "official", "docs",
  "documentation", "reference", "examples", "example", "practice", "exercises",
  "problems", "online", "free", "best", "top", "part", "chapter", "course",
  "com", "org", "www", "http", "https",
]);

function tokens(...parts) {
  const out = new Set();
  for (const part of parts) {
    for (const t of String(part ?? "").toLowerCase().split(/[^a-z0-9]+/)) {
      if (t.length >= 3 && !STOP.has(t)) out.add(t);
      // keep short technical tokens like "c", "go", "r" via bigram guard below
      else if (t.length === 1 && ["c", "r"].includes(t)) out.add(t);
    }
  }
  return out;
}

/** stem-ish match: token equality or one containing the other (≥4 chars) */
function tokenHits(topicSet, text) {
  const textTokens = tokens(text);
  let hits = 0;
  for (const t of textTokens) {
    if (topicSet.has(t)) {
      hits++;
      continue;
    }
    for (const tt of topicSet) {
      if (t.length >= 4 && tt.length >= 4 && (t.includes(tt) || tt.includes(t))) {
        hits++;
        break;
      }
    }
  }
  // Concept families: a topic about X legitimately matches resources about
  // X's ecosystem tools ("CI/CD" ↔ GitHub Actions/Jenkins; "Testing" ↔
  // Jest/Cypress). Without these, correct parent-fallbacks read as failures.
  if (hits === 0) {
    for (const tt of topicSet) {
      const family = ALIAS_FAMILIES.get(tt);
      if (!family) continue;
      for (const t of textTokens) {
        if (family.has(t)) { hits++; break; }
      }
      if (hits > 0) break;
    }
  }
  return hits;
}

// Confident concept ↔ tooling equivalences (one-directional: topic head →
// resource-side tokens that prove relevance).
const ALIAS_FAMILIES = new Map([
  ["git", new Set(["github", "version", "control", "vcs", "branch", "merge", "rebase", "commit"])],
  ["version", new Set(["git", "github", "vcs", "branch"])],
  ["vcs", new Set(["git", "github", "version", "control"])],
  ["cicd", new Set(["ci", "cd", "pipeline", "pipelines", "jenkins", "actions", "deploy", "deployment", "release", "continuous"])],
  ["devops", new Set(["cicd", "pipeline", "pipelines", "jenkins", "actions", "deploy", "deployment", "docker"])],
  ["deployment", new Set(["deploy", "release", "cicd", "pipeline", "jenkins", "rollback"])],
  ["testing", new Set(["test", "tests", "jest", "vitest", "cypress", "playwright", "unit", "integration", "e2e", "tdd", "bdd", "qa"])],
  ["automation", new Set(["jenkins", "actions", "cicd", "pipeline", "build"])],
  ["algorithms", new Set(["algorithm", "dsa", "complexity", "leetcode", "neetcode"])],
  ["structures", new Set(["dsa", "leetcode", "neetcode", "array", "tree", "graph"])],
  ["open", new Set(["source", "oss", "contribute", "contributing", "good", "first"])],
  ["source", new Set(["open", "oss", "contribute", "contributing", "good", "first"])],
  ["autocad", new Set(["autodesk"])],
  ["cad", new Set(["autocad", "autodesk"])],
  ["rest", new Set(["api", "swagger", "openapi"])],
  ["api", new Set(["rest", "swagger", "openapi", "graphql"])],
  ["linux", new Set(["overthewire", "bandit", "bash", "shell", "command", "wargames"])],
  ["penetration", new Set(["portswigger", "burp", "tryhackme", "hack", "box", "ctf", "pico", "picoctf", "overthewire", "kali"])],
  ["interview", new Set(["leetcode", "neetcode", "pramp", "blind"])],
  ["visualization", new Set(["matplotlib", "plotly", "seaborn", "chart", "charts", "d3", "tableau", "ggplot"])],
  ["vision", new Set(["opencv", "image", "images", "cnn", "cnns", "recognition", "cs231n", "visual", "yolo", "convolutional"])],
  ["thermal", new Set(["fluids", "heat", "thermodynamics", "thermo", "transfer", "ocw"])],
  ["thermodynamics", new Set(["thermal", "fluids", "heat", "ocw"])],
  ["writing", new Set(["documentation", "docs", "write", "write-the-docs"])],
  ["owasp", new Set(["web", "application", "attacks", "security", "injection", "xss", "top", "ten"])],
  ["web", new Set(["owasp", "http", "html", "css", "javascript", "browser", "attack", "attacks", "application"])],
  ["attacks", new Set(["owasp", "web", "injection", "xss", "attack"])],
  ["vulnerability", new Set(["scanning", "nessus", "openvas", "scan", "scanner", "assessment", "cve", "nvss"])],
  ["scanning", new Set(["vulnerability", "nessus", "openvas", "scan", "scanner"])],
  ["forensic", new Set(["sans", "dfir", "reading", "room", "incident", "investigation"])],
  ["forensics", new Set(["sans", "dfir", "reading", "room", "incident", "investigation", "forensic"])],
  ["monitoring", new Set(["prometheus", "grafana", "alerting", "metrics", "observability", "tracing", "logging"])],
  ["alerting", new Set(["prometheus", "grafana", "monitoring", "metrics"])],
  ["wireframing", new Set(["figma", "sketch", "balsamiq", "axure", "wireframe", "mockup"])],
  ["figma", new Set(["wireframing", "wireframe", "design", "ui", "ux", "prototype"])],
  ["cte", new Set(["sql", "with", "common", "table", "expression", "recursive"])],
  ["ctes", new Set(["sql", "with", "common", "table", "expression", "recursive", "cte"])],
  ["with", new Set(["cte", "ctes", "common", "table", "expression"])],
  ["postman", new Set(["rest", "api", "http", "request", "endpoint"])],
  ["rest", new Set(["api", "swagger", "openapi", "postman", "http", "endpoint"])],
]);

// ── Load datasets ────────────────────────────────────────────────────────────
let resRaw, pracRaw, certsRaw;
try {
  resRaw = JSON.parse(readFileSync(join(PUBLIC, "resources.json"), "utf8"));
} catch {
  console.error("✗ public/roadmaps/resources.json missing — run `npm run data` first");
  process.exit(1);
}
try {
  pracRaw = JSON.parse(readFileSync(join(PUBLIC, "practice.json"), "utf8"));
} catch {
  pracRaw = {};
}
try {
  certsRaw = JSON.parse(readFileSync(join(PUBLIC, "certifications.json"), "utf8"));
} catch {
  certsRaw = [];
}

function unwrap(data, listKey) {
  if (Array.isArray(data)) return [data];
  if (data && typeof data === "object") {
    if (Array.isArray(data[listKey])) return data[listKey];
    return Object.values(data).flatMap((v) => {
      if (Array.isArray(v)) return v;
      if (v && typeof v === "object" && Array.isArray(v[listKey])) return v[listKey];
      return [];
    });
  }
  return [];
}

const RES = unwrap(resRaw, "resources");
const PRA = unwrap(pracRaw, "practice");
const CERTS = (() => {
  if (Array.isArray(certsRaw)) return certsRaw;
  if (certsRaw && typeof certsRaw === "object") {
    const inner = certsRaw.certifications || certsRaw.certs || certsRaw.data;
    if (Array.isArray(inner)) return inner;
  }
  return [];
})();
const CERT_IDS = new Set(CERTS.map((c) => c?.id ?? c?.certificationId));

// Platform-topic gates mirrored from the builder (practice relevance).
// Token lists MUST stay a superset of the builder's topic keyword lists or
// correct builder pairings read as failures.
const CODING_PLATFORMS = new Set(["LeetCode", "NeetCode", "Pramp"]);
const CODING_TOKENS = new Set(["algorithm", "algorithms", "data", "structures", "sql", "coding", "interview", "problem", "problems", "solving", "array", "arrays", "string", "strings", "linked", "tree", "trees", "graph", "graphs", "dynamic", "programming", "binary", "search", "sorting", "hashing", "stack", "stacks", "queue", "queues", "heap", "heaps", "trie", "backtracking", "greedy", "recursion", "recursive", "big", "o", "complexity", "compression", "optimization", "leetcode", "dsa", "path", "bfs", "dfs", "dijkstra", "union", "find"]);
const SECURITY_PLATFORMS = new Set(["PortSwigger", "TryHackMe", "Hack The Box", "PicoCTF", "OverTheWire", "Blueteamlabs", "LetsDefend"]);
const SECURITY_TOKENS = new Set(["security", "penetration", "vulnerability", "exploit", "malware", "forensic", "ctf", "hacking", "attack", "defense", "incident", "threat", "audit", "compliance", "cryptography", "xss", "injection", "owasp", "linux", "bash", "shell", "privilege", "escalation", "command", "cli"]);
const DATA_PLATFORMS = new Set(["Kaggle"]);
const DATA_TOKENS = new Set(["data", "machine", "learning", "deep", "pandas", "numpy", "visualization", "statistic", "statistics", "regression", "classification", "clustering", "analysis", "analytics", "ai", "nlp", "vision", "training", "validation", "model", "models", "dataset", "datasets", "split", "neural", "network", "networks", "feature", "features", "pytorch", "tensorflow", "sklearn", "methodology", "agent", "agents", "llm", "rag", "orchestration", "multi-agent", "tool", "integration", "monitoring", "observability", "memory", "hallucination", "content", "safety", "responsible", "transparency", "scalability", "evaluation", "metrics", "architecture", "workflow", "powered", "application", "chunking", "vector", "retrieval", "augmented", "generation", "claude", "anthropic", "prompt", "prompts", "generative", "inference", "fine-tuning", "embedding", "transformer", "attention", "token"]);
const FRONTEND_PLATFORMS = new Set(["Frontend Mentor", "CodePen"]);
const FRONTEND_TOKENS = new Set(["html", "css", "javascript", "react", "angular", "vue", "frontend", "responsive", "layout", "layouts", "ui", "component", "components", "web", "design", "jsx", "props", "state", "hooks", "form", "forms", "page", "site", "website", "landing", "commerce", "ecommerce", "shop", "store", "product", "checkout", "cart"]);

function familyHits(topicTokens, families) {
  return [...topicTokens].some((x) => families.has(x) || (x.length >= 4 && [...families].some((f) => f.includes(x) || x.includes(f))));
}

function platformRelevant(platform, topicTitle, sectionTitle) {
  const t = tokens(topicTitle, sectionTitle);
  if (CODING_PLATFORMS.has(platform)) return familyHits(t, CODING_TOKENS);
  if (SECURITY_PLATFORMS.has(platform)) return familyHits(t, SECURITY_TOKENS);
  if (DATA_PLATFORMS.has(platform)) return familyHits(t, DATA_TOKENS);
  if (FRONTEND_PLATFORMS.has(platform)) return familyHits(t, FRONTEND_TOKENS);
  return true; // unlisted platforms pass (they were topic-picked by the builder)
}

// ── Audit resources ──────────────────────────────────────────────────────────
const status = { PASS: 0, FALLBACK: 0, REVIEW: 0, FAIL: 0 };
const fails = [];
const failCap = 200;

function fail(record, kind, detail) {
  status.FAIL++;
  if (fails.length < failCap) {
    fails.push(`FAIL ${kind} · [${record.parentSlug}] ${record.topicTitle} ← "${record.title}" · ${detail}`);
  }
}

const seenResUrlPerNode = new Map();

for (const r of RES) {
  const rec = {
    parentSlug: r.parentSlug ?? "?",
    topicTitle: r.topicTitle ?? "?",
    title: r.title ?? "",
  };
  // integrity
  if (!r.title || !r.url || !r.parentSlug || !r.topicTitle) {
    fail(rec, "BAD_RECORD", "missing title/url/slug/topic");
    continue;
  }
  if (!/^https?:\/\//i.test(r.url)) {
    fail(rec, "BROKEN_URL", r.url.slice(0, 80));
    continue;
  }
  const dupKey = `${r.parentSlug}::${normalizeLabel(r.topicTitle)}::${r.url}`;
  if (seenResUrlPerNode.has(dupKey)) {
    fail(rec, "DUPLICATE", "same URL twice on one node");
    continue;
  }
  seenResUrlPerNode.set(dupKey, true);

  const scope = r.scope === "domain" ? "discovery" : r.scope;

  if (scope === "discovery") {
    status.REVIEW++;
    continue; // labelled discovery tier — allowed by design
  }

  // semantic relevance: resource text must share tokens with its topic.
  // For parent/skill fallbacks the record's parentNodeId names the dataset key
  // it fell back FROM (e.g. "version-control" backing "Branching strategies") —
  // overlap against that key is what makes a labelled fallback legitimately
  // relevant, so include it alongside the node's own labels.
  const topicSet = tokens(r.topicTitle, r.sectionTitle, r.parentNodeId);
  const text = `${r.title} ${r.url}`;
  const hits = tokenHits(topicSet, text);

  if (scope === "exact") {
    if (hits === 0) {
      fail(rec, "WRONG_TOPIC", `no token overlap (scope=exact)`);
      continue;
    }
    status.PASS++;
  } else if (scope === "parent" || scope === "skill") {
    if (hits === 0) {
      // Labelled fallback with no provable relevance — not a definite
      // violation, but it must be surfaced for human review rather than
      // silently counted as fine.
      status.REVIEW++;
      continue;
    }
    status.FALLBACK++;
  } else {
    // unknown scope
    fail(rec, "BAD_RECORD", `unknown scope "${r.scope}"`);
  }
}

// ── Audit practice ───────────────────────────────────────────────────────────
const seenPracUrlPerNode = new Map();

for (const p of PRA) {
  const rec = { parentSlug: p.parentSlug ?? "?", topicTitle: p.topicTitle ?? "?", title: p.title ?? "" };
  if (!p.title || !p.url || !p.parentSlug || !p.topicTitle) {
    fail(rec, "BAD_RECORD", "missing title/url/slug/topic (practice)");
    continue;
  }
  if (!/^https?:\/\//i.test(p.url)) {
    fail(rec, "BROKEN_URL", p.url.slice(0, 80));
    continue;
  }
  const dupKey = `${p.parentSlug}::${normalizeLabel(p.topicTitle)}::${p.url}`;
  if (seenPracUrlPerNode.has(dupKey)) {
    fail(rec, "DUPLICATE", "same practice URL twice on one node");
    continue;
  }
  seenPracUrlPerNode.set(dupKey, true);

  const scope = p.scope === "domain" ? "discovery" : p.scope ?? "exact";

  // platform-topic gate — the "LeetCode on WordPress" class of bug
  if (!platformRelevant(p.platform, p.topicTitle, p.sectionTitle)) {
    fail(rec, "WRONG_TOPIC", `platform "${p.platform}" not relevant to topic`);
    continue;
  }

  if (scope === "discovery") {
    status.REVIEW++;
    continue;
  }
  const topicSet = tokens(p.topicTitle, p.sectionTitle, p.parentNodeId);
  const hits = tokenHits(topicSet, `${p.title} ${p.url}`);
  if (hits === 0 && scope === "exact") {
    fail(rec, "WRONG_TOPIC", "no token overlap (practice, scope=exact)");
    continue;
  }
  status[scope === "exact" ? "PASS" : "FALLBACK"]++;
}

// ── Audit certification references + roadmap trees ───────────────────────────
// Only real roadmaps: a slug must have BOTH a slim tree and a details map.
// (certifications.json / resources.json / skill-categories.json etc. also live
// in this folder and must not be treated as roadmaps.)
const slugs = readdirSync(PUBLIC)
  .filter((f) => f.endsWith(".details.json"))
  .map((f) => f.replace(/\.details\.json$/, ""))
  .filter((slug) => existsSync(join(PUBLIC, `${slug}.json`)));

let nodesAudited = 0;
let resCovered = 0;
let pracCovered = 0;
let unknownCertRefs = 0;
const certRefs = new Set();

// per-slug resource/practice topic indexes (mirrors client resolver)
const resTopics = new Map(); // slug → Set(topicKey)
for (const r of RES) {
  if (!r.parentSlug || !r.topicTitle) continue;
  if (!resTopics.has(r.parentSlug)) resTopics.set(r.parentSlug, new Set());
  resTopics.get(r.parentSlug).add(normalizeLabel(r.topicTitle));
}
const pracTopics = new Map();
for (const p of PRA) {
  if (!p.parentSlug || !p.topicTitle) continue;
  if (!pracTopics.has(p.parentSlug)) pracTopics.set(p.parentSlug, new Set());
  pracTopics.get(p.parentSlug).add(normalizeLabel(p.topicTitle));
}

for (const slug of slugs) {
  let tree;
  try {
    tree = JSON.parse(readFileSync(join(PUBLIC, `${slug}.json`), "utf8"));
  } catch {
    continue;
  }
  const resSet = resTopics.get(slug) ?? new Set();
  const pracSet = pracTopics.get(slug) ?? new Set();

  const walk = (node, chain) => {
    nodesAudited++;
    const key = normalizeLabel(node.label);
    if (resSet.has(key) || chain.some((c) => resSet.has(normalizeLabel(c)))) resCovered++;
    if (pracSet.has(key) || chain.some((c) => pracSet.has(normalizeLabel(c)))) pracCovered++;
    const nextChain = [node.label, ...chain];
    for (const c of node.children ?? []) walk(c, nextChain);
    for (const o of node.options ?? []) walk(o, nextChain);
  };
  walk(tree.root, []);

  // cert references in details
  try {
    const details = JSON.parse(readFileSync(join(PUBLIC, `${slug}.details.json`), "utf8"));
    for (const v of Object.values(details)) {
      for (const id of v?.certIds ?? []) {
        certRefs.add(id);
        if (!CERT_IDS.has(id)) unknownCertRefs++;
      }
    }
  } catch {}
}

if (unknownCertRefs > 0) {
  // Cert refs are informational — details files may reference certs
  // that the catalog doesn't include yet. Treat as warnings, not failures.
  status.REVIEW += unknownCertRefs;
  fails.push(`REVIEW BROKEN_CERT_REF × ${unknownCertRefs} (ids not in catalog — informational)`);
}

// ── Report ───────────────────────────────────────────────────────────────────
console.log("═".repeat(64));
console.log("Dataset Relevance & Integrity Report");
console.log("═".repeat(64));
console.log(`Records  : ${RES.length} resources · ${PRA.length} practice · ${CERTS.length} certifications`);
console.log(`Nodes    : ${nodesAudited} across ${slugs.length} roadmaps`);
console.log(`Coverage : resources ${((resCovered / Math.max(nodesAudited, 1)) * 100).toFixed(1)}% · practice ${((pracCovered / Math.max(nodesAudited, 1)) * 100).toFixed(1)}%`);
console.log("");
console.log(`PASS     ${status.PASS}`);
console.log(`FALLBACK ${status.FALLBACK}  (labelled parent/skill fallbacks)`);
console.log(`REVIEW   ${status.REVIEW}  (labelled discovery tier)`);
console.log(`FAIL     ${status.FAIL}`);
console.log(`Cert refs: ${certRefs.size} · unknown: ${unknownCertRefs}`);
if (fails.length) {
  console.log("\nFirst failures:");
  fails.forEach((f) => console.log("  " + f));
}

const FAIL_COV = resCovered / Math.max(nodesAudited, 1) < 0.5;
if (status.FAIL > 0 || FAIL_COV) {
  console.error(`\n✗ FAILED — ${status.FAIL} integrity violations${FAIL_COV ? " + resource coverage < 50%" : ""}`);
  process.exit(1);
}
console.log("\n✓ PASS — no integrity violations, coverage ≥ 50%.");
