// ─────────────────────────────────────────────────────────────────────────────
// Curriculum audit: cross-domain contamination + depth metrics.
// Scans data/generated/*.json and reports topics that don't belong to the
// roadmap's domain (language-specific leaks, JS/Java-flavored topics inside C,
// web frameworks inside engineering, etc.) plus shallow-topic stats.
// Run: node data/audit-curriculum.mjs [--fix-report /tmp/out.txt]
// ─────────────────────────────────────────────────────────────────────────────
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "data/generated";
const files = readdirSync(DIR).filter((f) => f.endsWith(".json"));

// ── contamination lexicons ───────────────────────────────────────────────────
// topic label (lowercase) → domains/technologies it genuinely belongs to.
// A hit outside its allowlist is reported as contamination.
const TECH = {
  // JS / web-frontend flavored
  "arrow function": ["javascript", "typescript", "frontend", "web", "fullstack", "node", "react", "vue", "angular", "js"],
  "this binding": ["javascript", "typescript", "frontend", "web"],
  "iife": ["javascript", "typescript", "frontend", "web"],
  "hoisting": ["javascript", "typescript", "frontend", "web"],
  "closure": ["javascript", "typescript", "frontend", "web", "python", "swift", "kotlin", "rust", "go", "lua", "php", "ruby", "scala", "csharp", "dart", "perl"],
  "dom manipulation": ["javascript", "typescript", "frontend", "web"],
  "jsx": ["react", "frontend", "web", "fullstack"],
  "react hooks": ["react", "frontend", "web", "fullstack"],
  "redux": ["react", "frontend", "web", "fullstack"],
  "props and data flow": ["react", "vue", "frontend", "web"],
  "npm": ["node", "javascript", "typescript", "frontend", "web", "fullstack"],
  "es modules": ["javascript", "typescript", "frontend", "web", "node"],
  "package.json": ["node", "javascript", "typescript"],
  "spread and rest": ["javascript", "typescript"],
  "destructuring": ["javascript", "typescript", "python", "kotlin", "swift", "dart", "rust", "scala", "ruby", "php"],
  "promise": ["javascript", "typescript", "frontend", "web", "node", "swift", "kotlin", "dart", "scala", "csharp"],
  "async/await": ["javascript", "typescript", "python", "csharp", "rust", "swift", "kotlin", "dart", "go", "ruby", "php"],
  "fetch api": ["javascript", "typescript", "frontend", "web"],
  "event loop": ["javascript", "typescript", "node", "frontend", "web", "python", "labview", "embedded", "systems", "c", "cpp", "golang"],
  "microtask": ["javascript", "typescript"],
  // Java / JVM flavored
  "jvm": ["java", "kotlin", "scala", "groovy", "android"],
  "maven": ["java", "kotlin", "scala", "android"],
  "gradle": ["java", "kotlin", "scala", "android"],
  "junit": ["java", "kotlin", "scala"],
  "spring boot": ["java", "kotlin", "backend", "fullstack", "web"],
  "checked exception": ["java", "kotlin", "csharp"],
  "autoboxing": ["java", "kotlin"],
  "sealed class": ["java", "kotlin", "csharp", "scala", "python"],
  "generics": ["java", "kotlin", "csharp", "scala", "typescript", "swift", "rust", "dart", "go", "python", "c", "cpp"],
  "collections framework": ["java", "kotlin", "csharp", "scala", "android"],
  // C / systems flavored
  "pointer arithmetic": ["c", "cpp", "rust", "go", "embedded", "systems", "os"],
  "malloc": ["c", "cpp", "embedded", "systems", "os"],
  "calloc": ["c", "embedded", "systems"],
  "dereferencing": ["c", "cpp", "rust", "go", "embedded", "systems"],
  "structs": ["c", "cpp", "go", "rust", "embedded", "systems", "swift", "python", "csharp", "kotlin", "dart"],
  "header files": ["c", "cpp", "embedded", "systems"],
  "preprocessor": ["c", "cpp", "embedded", "systems", "css", "sass", "frontend", "web", "styling", "bootstrap", "html", "graphql", "react", "vue", "angular", "django", "flask", "fastapi", "aspnet", "nestjs", "node", "javascript", "typescript"],
  "function pointers": ["c", "cpp", "embedded", "systems"],
  "undefined behavior": ["c", "cpp", "embedded", "systems", "rust"],
  "storage classes": ["c", "cpp", "embedded", "systems"],
  "macro": ["c", "cpp", "embedded", "systems", "excel", "office", "confluence", "jira", "word", "productivity", "documentation"],
  "union": ["c", "cpp", "embedded", "systems", "rust", "typescript", "scala", "kotlin", "swift", "python"],
  "typedef": ["c", "cpp", "embedded", "systems", "go"],
  "segmentation fault": ["c", "cpp", "embedded", "systems"],
  // Python flavored
  "decorator": ["python", "typescript", "javascript", "java", "csharp", "swift", "php", "ruby"],
  "generator": ["python", "javascript", "ruby", "php", "csharp"],
  "comprehension": ["python", "ruby", "javascript", "scala", "kotlin"],
  "dunder method": ["python"],
  "virtual environment": ["python", "data", "ai"],
  "pip": ["python", "data", "ai"],
  "jupyter": ["python", "data", "ai", "ml", "datascience"],
  "venv": ["python"],
  "pandas": ["python", "data", "ai", "ml", "datascience"],
  "numpy": ["python", "data", "ai", "ml", "datascience"],
  "matplotlib": ["python", "data", "ai", "ml", "datascience"],
  "scikit-learn": ["python", "data", "ai", "ml", "datascience"],
  // Ruby flavored
  "gems": ["ruby"],
  "bundler": ["ruby", "javascript", "typescript", "frontend", "web", "fullstack", "node"],
  "rubygems": ["ruby"],
  "mixins": ["ruby", "php", "kotlin", "swift", "scala", "sass", "css", "frontend", "web", "dart", "csharp", "typescript", "fullstack"],
  // Go flavored
  "goroutine": ["go", "backend", "fullstack", "devops", "cloud"],
  "channels": ["go", "csharp", "rust", "node", "kotlin", "dart", "swift"],
  "gopath": ["go"],
  // Rust flavored
  "ownership": ["rust", "cpp", "embedded", "systems", "linux", "sysadmin", "os", "firmware", "iot", "database", "sql"],
  "borrowing": ["rust", "cpp"],
  "lifetimes": ["rust"],
  "cargo": ["rust"],
  "clippy": ["rust"],
  // Swift flavored
  "optionals": ["swift", "kotlin"],
  "swiftui": ["swift", "ios", "apple"],
  "xcode": ["swift", "ios", "apple"],
  "xcuitest": ["swift", "ios"],
  // C# / .NET flavored
  "linq": ["csharp", "dotnet", "microsoft"],
  "nuget": ["csharp", "dotnet"],
  "xunit": ["csharp", "dotnet"],
  "async/await tasks": ["csharp"],
  // web framework flavored
  "jsx syntax": ["react", "frontend", "web"],
  "virtual dom": ["react", "vue", "frontend", "web"],
  "composition api": ["vue", "frontend", "web"],
  "pinia": ["vue", "frontend", "web"],
  "vue router": ["vue", "frontend", "web"],
  "angular router": ["angular", "frontend", "web"],
  "rxjs": ["angular", "frontend", "web", "csharp"],
  "spring mvc": ["java", "backend"],
  "hibernate": ["java", "backend"],
  "django orm": ["python", "django", "backend"],
  "fastapi": ["python", "backend"],
  "flask": ["python", "backend"],
  // database flavored
  "sql joins": ["sql", "database", "backend", "data", "fullstack", "web"],
  "acid": ["sql", "database", "backend", "data", "finance", "chemistry", "chemical", "electronics", "electrical", "mining", "materials", "bi", "analytics"],
  "transactions": ["sql", "database", "backend", "data", "finance", "business", "bi", "analytics", "erp", "enterprise", "accounting"],
  // cloud / devops flavored
  "kubernetes": ["devops", "cloud", "sre", "platform", "backend", "fullstack", "sysadmin"],
  "terraform": ["devops", "cloud", "sre", "platform", "sysadmin"],
  "docker": ["devops", "cloud", "sre", "platform", "backend", "fullstack", "sysadmin"],
  "aws": ["devops", "cloud", "sre", "platform", "sysadmin", "backend", "fullstack"],
  "azure": ["devops", "cloud", "sre", "platform", "sysadmin", "dotnet", "microsoft"],
  // non-CS flavored
  "react": ["frontend", "web", "fullstack", "javascript", "typescript", "mobile", "reactnative", "ai", "llm", "agent"],
  "node.js": ["backend", "fullstack", "javascript", "typescript", "web", "devops"],
  "npm registry": ["node", "javascript", "typescript"],
};

// roadmap slug → allowed tech domains (allowlist)
// slugs not listed = no known contamination risk from TECH terms (career-wide).
function allowlistFor(slug) {
  const s = slug.toLowerCase();
  if (s === "c" || s.startsWith("c-lang") || s.startsWith("c-programming") || /^c-/.test(s)) return ["c", "cpp", "embedded", "systems", "os", "backend", "interview"];
  if (s === "cpp" || s.includes("c++") || s.startsWith("cplus")) return ["c", "cpp", "embedded", "systems", "os", "backend", "game", "interview"];
  if (s.startsWith("csharp") || s.includes("c#") || s.includes("dotnet")) return ["csharp", "dotnet", "microsoft", "game", "backend", "interview", "cloud"];
  if (s.startsWith("javascript")) return ["javascript", "typescript", "node", "frontend", "web", "backend", "fullstack", "interview", "react", "reactnative"];
  if (s === "java" || s.startsWith("java")) return ["java", "kotlin", "scala", "jvm", "android", "backend", "interview", "microservice"];
  if (s === "kotlin" || s.includes("kotlin")) return ["kotlin", "java", "jvm", "android", "backend"];
  if (s === "scala") return ["scala", "java", "jvm", "backend", "data"];
  if (s === "typescript") return ["typescript", "javascript", "frontend", "web", "backend", "fullstack", "node"];
  // career roadmaps
  if (s.includes("frontend")) return ["frontend", "web", "javascript", "typescript", "css", "html", "react", "vue", "angular", "fullstack", "interview", "node", "mobile", "reactnative"];
  if (s.includes("fullstack") || s.includes("full-stack")) return ["fullstack", "frontend", "web", "backend", "javascript", "typescript", "python", "java", "go", "sql", "database", "devops", "cloud", "docker", "kubernetes", "interview", "react", "node", "css", "html"];
  if (s.includes("backend")) return ["backend", "web", "javascript", "typescript", "python", "java", "go", "node", "sql", "database", "devops", "cloud", "docker", "kubernetes", "interview"];
  if (s.includes("software-engineer") || s.includes("computer-science")) return ["backend", "frontend", "web", "fullstack", "javascript", "typescript", "python", "java", "go", "c", "cpp", "sql", "database", "devops", "cloud", "docker", "kubernetes", "systems", "os", "interview", "ai", "ml", "data", "mobile", "react", "node", "css", "html"];
  if (s.includes("desktop")) return ["desktop", "csharp", "cpp", "c", "rust", "go", "java", "javascript", "typescript", "electron", "dotnet", "sql", "database", "interview", "os", "systems", "react", "web", "python"];
  if (s.includes("sre") || s.includes("reliability")) return ["sre", "devops", "cloud", "platform", "sysadmin", "linux", "go", "python", "docker", "kubernetes", "terraform", "observability", "backend", "interview", "network", "os", "systems"];
  if (s.includes("platform-engineer")) return ["platform", "devops", "cloud", "sre", "sysadmin", "linux", "go", "python", "docker", "kubernetes", "terraform", "backend", "interview"];
  if (s.includes("mobile")) return ["mobile", "android", "ios", "swift", "kotlin", "java", "reactnative", "flutter", "dart", "javascript", "typescript", "interview", "web"];
  if (s.includes("test") || s.includes("qa")) return ["qa", "test", "javascript", "typescript", "python", "java", "web", "frontend", "backend", "sql", "interview", "devops", "docker", "cloud"];
  if (s.includes("mlops")) return ["mlops", "ai", "ml", "python", "data", "devops", "cloud", "docker", "kubernetes", "terraform", "backend", "interview", "datascience"];
  if (s.includes("analyst") && s.includes("data")) return ["data", "datascience", "python", "sql", "excel", "powerbi", "tableau", "interview", "ai", "ml", "statistics", "analytics"];
  if (s.includes("engineer") && (s.includes("data") || s.includes("database"))) return ["data", "python", "sql", "database", "backend", "devops", "cloud", "interview", "airflow", "spark", "docker", "kubernetes", "ai", "ml"];
  if (s.includes("solutions-architect") || s.includes("cloud-architect")) return ["cloud", "devops", "sre", "platform", "sysadmin", "backend", "aws", "azure", "gcp", "terraform", "docker", "kubernetes", "interview", "sql", "database", "network"];
  if (s.includes("solutions-architect")) return ["cloud", "devops", "sre", "platform", "sysadmin", "backend", "aws", "azure", "gcp", "terraform", "docker", "kubernetes", "interview", "sql", "database", "network"];
  if (s.includes("network")) return ["network", "sysadmin", "linux", "devops", "cloud", "python", "interview", "security", "os", "systems"];
  if (s.includes("sap")) return ["sap", "enterprise", "erp", "interview", "database", "sql", "business"];
  if (s.includes("system-design")) return ["system", "backend", "architecture", "interview", "cloud", "database", "sql", "devops", "distributed", "network", "os", "systems"];
  if (s === "python" || s.startsWith("python")) return ["python", "data", "ai", "ml", "datascience", "backend", "fullstack", "web", "devops", "interview"];
  if (s === "ruby" || s.includes("ruby")) return ["ruby", "web", "backend", "fullstack", "devops"];
  if (s === "php" || s.includes("php")) return ["php", "web", "backend", "fullstack"];
  if (s === "go" || s === "golang") return ["go", "backend", "fullstack", "devops", "cloud", "systems", "interview", "network"];
  if (s === "rust") return ["rust", "cpp", "systems", "embedded", "blockchain", "webassembly", "backend", "interview"];
  if (s === "swift" || s.includes("swift")) return ["swift", "ios", "apple", "mobile", "backend"];
  if (s === "dart" || s.includes("dart")) return ["dart", "flutter", "mobile", "frontend", "web"];
  if (s.includes("react")) return ["react", "frontend", "web", "fullstack", "javascript", "typescript", "mobile", "reactnative"];
  if (s.includes("vue")) return ["vue", "frontend", "web", "fullstack", "javascript", "typescript"];
  if (s.includes("angular")) return ["angular", "frontend", "web", "fullstack", "typescript", "javascript"];
  if (s.includes("django")) return ["python", "django", "backend", "web", "fullstack"];
  if (s.includes("flask")) return ["python", "flask", "backend", "web", "fullstack"];
  if (s.includes("fastapi")) return ["python", "fastapi", "backend", "web", "fullstack"];
  if (s.includes("sql") || s.includes("database") || s.includes("postgres") || s.includes("mysql") || s.includes("mongodb") || s.includes("redis") || s.includes("db")) return ["sql", "database", "backend", "data", "fullstack", "web"];
  if (s.includes("docker")) return ["docker", "devops", "cloud", "backend", "fullstack", "sysadmin"];
  if (s.includes("kubernetes") || s.includes("k8s")) return ["kubernetes", "devops", "cloud", "sre", "platform", "sysadmin", "backend"];
  if (s.includes("devops")) return ["devops", "cloud", "sre", "platform", "sysadmin", "backend", "fullstack"];
  if (s.includes("terraform")) return ["terraform", "devops", "cloud", "sre", "platform", "sysadmin"];
  if (s.includes("cloud") || s.includes("aws") || s.includes("azure") || s.includes("gcp")) return ["cloud", "devops", "sre", "platform", "sysadmin", "backend", "dotnet", "microsoft"];
  if (s.includes("cyber") || s.includes("security") || s.includes("pentest") || s.includes("soc") || s.includes("hacker")) return ["cyber", "security", "network", "linux", "backend", "web", "os", "systems", "interview"];
  if (s.includes("data")) return ["data", "python", "sql", "ai", "ml", "datascience", "backend", "interview"];
  if (s.includes("machine learning") || s.includes("ml") || s.includes("ai") || s.includes("llm")) return ["ai", "ml", "python", "data", "datascience", "backend", "interview"];
  if (s.includes("engineering")) return ["engineering", "cad", "mechanical", "civil", "electrical", "chemical", "aerospace", "matlab", "math"];
  if (s.includes("mechanical")) return ["mechanical", "engineering", "cad", "matlab", "math", "physics"];
  if (s.includes("civil")) return ["civil", "engineering", "cad", "math", "physics"];
  if (s.includes("electrical")) return ["electrical", "engineering", "matlab", "math", "physics", "embedded", "systems"];
  if (s.includes("game")) return ["game", "csharp", "cpp", "c", "unity", "unreal", "godot", "python", "math"];
  if (s.includes("android")) return ["android", "kotlin", "java", "jvm", "mobile"];
  if (s.includes("ios") || s.includes("apple")) return ["ios", "swift", "apple", "mobile"];
  if (s.includes("flutter")) return ["flutter", "dart", "mobile", "frontend"];
  if (s.includes("node") || s.includes("express")) return ["node", "javascript", "typescript", "backend", "fullstack", "web", "devops", "interview", "npm", "event loop"];
  if (s.includes("spring")) return ["java", "spring", "backend", "web", "fullstack", "maven", "junit", "interview", "jvm"];
  if (s.includes("aspnet") || s.includes("dotnet") || s.includes("csharp")) return ["csharp", "dotnet", "microsoft", "azure", "backend", "web", "fullstack", "xunit", "interview", "cloud"];
  if (s.includes("jenkins")) return ["jenkins", "devops", "ci", "docker", "cloud", "backend", "interview", "sysadmin"];
  if (s.includes("pandas")) return ["python", "data", "pandas", "ai", "ml", "datascience", "interview"];
  if (s.includes("numpy")) return ["python", "data", "numpy", "ai", "ml", "datascience", "interview"];
  if (s.includes("matplotlib")) return ["python", "data", "matplotlib", "ai", "ml", "datascience", "visualization", "interview"];
  if (s.includes("scikit")) return ["python", "data", "scikit-learn", "ai", "ml", "datascience", "interview"];
  if (s.includes("firebase")) return ["firebase", "google", "mobile", "web", "backend", "sql", "database", "nosql", "interview", "cloud"];
  if (s.includes("confluence") || s.includes("excel") || s.includes("sheets") || s.includes("macro")) return ["office", "productivity", "macros", "automation", "business", "data", "documentation", "interview", "excel", "google"];
  if (s.includes("sass")) return ["sass", "css", "frontend", "web", "styling", "interview", "javascript", "typescript"];
  if (s.includes("analytics-engineer")) return ["data", "sql", "python", "analytics", "devops", "cloud", "aws", "azure", "gcp", "docker", "terraform", "dbt", "interview", "airflow", "spark"];
  if (s.includes("deep-learning") || s.includes("computer-vision") || s.includes("nlp")) return ["ai", "ml", "deep", "python", "data", "datascience", "docker", "interview", "pytorch", "tensorflow", "numpy", "pandas", "cloud", "gpu"];
  if (s.includes("iot")) return ["iot", "embedded", "c", "cpp", "python", "aws", "azure", "network", "cloud", "systems", "interview", "wireless"];
  if (s.includes("information-technology")) return ["it", "network", "sysadmin", "linux", "cloud", "aws", "azure", "database", "sql", "security", "interview", "os", "systems"];
  if (s.includes("forensic") || s.includes("malware") || s.includes("hacker") || s.includes("pentest") || s.includes("ethical")) return ["cyber", "security", "forensic", "malware", "network", "linux", "os", "systems", "python", "interview", "web", "backend"];
  if (s.includes("nuxt")) return ["vue", "nuxt", "frontend", "web", "fullstack", "javascript", "typescript", "interview", "node", "css", "html"];
  if (s.includes("supabase")) return ["supabase", "database", "sql", "postgres", "backend", "web", "fullstack", "nosql", "interview", "auth", "cloud"];
  if (s.includes("graphql")) return ["graphql", "backend", "web", "fullstack", "javascript", "typescript", "node", "python", "java", "interview", "api", "sql", "database"];
  if (s.includes("gitlab")) return ["gitlab", "git", "ci", "cd", "devops", "docker", "kubernetes", "interview", "sysadmin"];
  if (s.includes("jira")) return ["jira", "project", "management", "agile", "documentation", "business", "interview", "office"];
  if (s.includes("graphics-programmer")) return ["graphics", "cpp", "c", "game", "math", "gpu", "shader", "interview", "rendering", "opengl", "vulkan", "directx", "systems"];
  if (s.includes("labview")) return ["labview", "engineering", "matlab", "embedded", "systems", "signal", "interview", "instrumentation", "control"];
  if (s.includes("quantum")) return ["quantum", "physics", "math", "python", "aws", "azure", "ibm", "interview", "science"];
  if (s.includes("erp") || s.includes("sap")) return ["erp", "sap", "enterprise", "business", "accounting", "database", "sql", "interview", "supply"];
  if (s.includes("seaborn")) return ["python", "data", "matplotlib", "seaborn", "visualization", "ai", "ml", "datascience", "interview"];
  if (s.includes("bi-developer") || s.includes("power-bi") || s.includes("tableau")) return ["data", "analytics", "sql", "excel", "powerbi", "tableau", "interview", "dax", "business"];
  if (s.includes("chemical")) return ["chemical", "engineering", "process", "piping", "matlab", "math", "physics", "cad"];
  if (s.includes("ci-cd") || s.includes("cicd")) return ["ci", "cd", "devops", "cloud", "docker", "kubernetes", "aws", "azure", "gcp", "jenkins", "gitlab", "github", "terraform", "interview", "backend", "sysadmin", "linux"];
  if (s.includes("ai-agent") || s.includes("ai-product") || s.includes("ai-engineer")) return ["ai", "ml", "llm", "python", "data", "react", "frontend", "web", "typescript", "javascript", "interview", "cloud", "docker", "node"];
  if (s === "css") return ["css", "sass", "preprocessor", "frontend", "web", "styling", "interview", "javascript", "typescript", "html"];
  if (s.includes("word") || s.includes("powerpoint")) return ["office", "productivity", "documentation", "business", "interview", "macros"];
  if (s.includes("bash") || s.includes("shell")) return ["bash", "shell", "linux", "sysadmin", "devops", "interview", "scripting", "os", "systems"];
  if (s.includes("bootstrap")) return ["bootstrap", "css", "frontend", "web", "html", "javascript", "interview", "styling"];
  if (s.includes("ar-vr") || s.includes("xr")) return ["ar", "vr", "game", "unity", "unreal", "csharp", "cpp", "3d", "graphics", "interview", "mobile", "python"];
  if (s.includes("database-administrator") || s.includes("dba")) return ["sql", "database", "azure", "aws", "gcp", "cloud", "backend", "interview", "sysadmin", "linux", "nosql"];
  if (s.includes("soc-analyst") || s.includes("security-engineer") || s.includes("application-security")) return ["cyber", "security", "network", "linux", "os", "systems", "python", "web", "backend", "interview", "cloud", "aws", "azure", "docker"];
  if (s.includes("aerospace") || s.includes("agricultural") || s.includes("biomedical") || s.includes("robotics")) return ["engineering", "cad", "matlab", "math", "physics", "embedded", "systems", "c", "cpp", "python", "interview", "mechanical", "electrical", "civil"];
  return [];
}

// word-boundary matcher: "pip" must not hit "pipes"/"piping", "aws" must not
// hit "flaws", "react" must not hit "reacting". Explicit plural lists.
const wordRe = (w) => new RegExp("(^|[^a-z])" + w + "(s|es)?([^a-z]|$)", "i");
// stems whose plural forms are also common English words — "pip" → "pipes"
const PLURAL_BLOCK = { pip: /pipes?\b/i };
const blockedPlural = (w, label) => PLURAL_BLOCK[w]?.test(label) ?? false;
const COMPILED = Object.entries(TECH).map(([tech, allowed]) => [tech, wordRe(tech), allowed]);

// ── scan ─────────────────────────────────────────────────────────────────────
const report = { byFile: [], techHits: new Map() };
let totalHits = 0;

function walk(node, slug, allow, out, path) {
  const label = (node.label || "").toLowerCase();
  // skip self-references: a nodejs roadmap mentioning "Node.js" is expected
  const self = slug.replace(/[-_]/g, " ");
  for (const [tech, re, allowed] of COMPILED) {
    if (re.test(label) && !blockedPlural(tech, label)) {
      if (self.includes(tech)) break; // roadmap is literally about this tech
      const ok = allowed.some((a) => allow.includes(a));
      if (!ok) {
        totalHits++;
        const key = `${tech} @ ${slug}`;
        report.techHits.set(key, (report.techHits.get(key) || 0) + 1);
        out.push({ path: path.join(" → ") + " → " + node.label, tech, label: node.label });
      }
      break; // one tech per label
    }
  }
  for (const c of node.children || []) walk(c, slug, allow, out, path.concat([node.label]));
}

for (const f of files) {
  const slug = f.replace(/\.json$/, "");
  const d = JSON.parse(readFileSync(join(DIR, f), "utf8"));
  const root = d.root;
  if (!root) continue;
  const allow = allowlistFor(slug);
  const out = [];
  walk(root, slug, allow, out, []);
  if (out.length) report.byFile.push({ slug, allow: allow.length ? allow : "unclassified", hits: out.slice(0, 12), count: out.length });
}

report.byFile.sort((a, b) => b.count - a.count);
console.log("=== CONTAMINATION BY ROADMAP (top 40) ===");
for (const r of report.byFile.slice(0, 40)) {
  console.log(`\n[${r.count}] ${r.slug}  (allow: ${r.allow})`);
  for (const h of r.hits) console.log(`   ❌ ${h.tech} ← ${h.label}`);
}
console.log("\n=== TOTAL hits:", totalHits, "across", report.byFile.length, "files ===");
console.log("\n=== TOP TECH LEAKS ===");
const sorted = [...report.techHits.entries()].sort((a, b) => b[1] - a[1]);
for (const [k, v] of sorted.slice(0, 30)) console.log(`   ${v}× ${k}`);

if (process.argv[2] === "--fix-report") {
  writeFileSync(process.argv[2], JSON.stringify(report, null, 1));
  console.log("\nWrote", process.argv[2]);
}
