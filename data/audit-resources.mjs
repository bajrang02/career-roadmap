// ─────────────────────────────────────────────────────────────────────────────
// Resource & Practice dataset audit.
//   node data/audit-resources.mjs              → static audit (no network)
//   node data/audit-resources.mjs --http 800   → also HEAD-check the 800 most
//                                                used unique URLs
// Reports: generic-search URLs (must be 0), broken/placeholder hosts, missing
// resource metadata, empty-resource coverage, practice coverage, provider
// distribution and — with --http — every checked URL's status.
// ─────────────────────────────────────────────────────────────────────────────
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import http from "node:http";
import https from "node:https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "generated");

const SEARCH_RE = /(google\.com\/search|youtube\.com\/results|bing\.com\/search|duckduckgo\.com\/\?q=)/i;
const BAD_HOSTS = ["localhost", "127.0.0.1", "example.com", "yourdomain.com", "placeholder.com"];
const HTTP_LIMIT = parseInt(process.argv[2] === "--http" ? process.argv[3] : "0", 10) || 0;

const files = readdirSync(OUT).filter(
  (f) => f.endsWith(".json") && !["index.json", "search-index.json", "skill-categories.json", "career-domains.json"].includes(f)
);

let resources = 0;
let practice = 0;
let learnable = 0;
let emptyRes = 0;
let withPractice = 0;
let genericSearches = 0;
let badHosts = 0;
let missingMeta = 0;
const urlCount = new Map();
const providerCount = new Map();
const emptyLabels = new Map();

for (const f of files) {
  const data = JSON.parse(readFileSync(join(OUT, f), "utf8"));
  const walk = (n) => {
    const d = n.details;
    if (d) {
      const res = Array.isArray(d.resources) ? d.resources : [];
      const practiceList = Array.isArray(d.practice) ? d.practice : [];
      if (n.type === "topic" || n.type === "concept" || n.type === "advanced" || n.type === "project") {
        learnable++;
        if (res.length === 0) {
          emptyRes++;
          const key = n.label.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
          emptyLabels.set(key, (emptyLabels.get(key) || 0) + 1);
        }
        if (practiceList.length) withPractice++;
      }
      resources += res.length;
      practice += practiceList.length;
      for (const r of res) {
        if (SEARCH_RE.test(r.url)) genericSearches++;
        try {
          const host = new URL(r.url).hostname.replace(/^www\./, "").toLowerCase();
          if (BAD_HOSTS.includes(host)) badHosts++;
        } catch {
          /* counted below */
        }
        if (!r.type || !r.provider || !r.description || typeof r.isOfficial !== "boolean") missingMeta++;
        urlCount.set(r.url, (urlCount.get(r.url) || 0) + 1);
        providerCount.set(r.provider || "?", (providerCount.get(r.provider || "?") || 0) + 1);
      }
    }
    for (const c of n.children || []) walk(c);
    for (const o of n.options || []) walk(o);
  };
  walk(data.root);
}

console.log("══ Resource & Practice audit ══");
console.log(`Roadmaps audited        : ${files.length}`);
console.log(`Learnable nodes         : ${learnable}`);
console.log(`Resources shipped       : ${resources} (${new Set(urlCount.keys()).size} unique URLs)`);
console.log(`Practice items shipped  : ${practice}`);
console.log(`Generic search URLs     : ${genericSearches} ${genericSearches > 0 ? "❌ FAIL" : "✓"}`);
console.log(`Placeholder/broken hosts: ${badHosts} ${badHosts > 0 ? "❌ FAIL" : "✓"}`);
console.log(`Resources missing meta  : ${missingMeta} ${missingMeta > 0 ? "❌ FAIL" : "✓"}`);
console.log(`Nodes with no resources : ${emptyRes} (${((100 * emptyRes) / learnable).toFixed(1)}% — intentional empty state)`);
console.log(`Nodes with practice     : ${withPractice} (${((100 * withPractice) / learnable).toFixed(1)}%)`);
console.log("");

const sortedProviders = [...providerCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 18);
console.log("Top providers:");
for (const [p, c] of sortedProviders) console.log(`  ${String(c).padStart(6)}  ${p}`);
console.log("");

const topEmpty = [...emptyLabels.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25);
console.log("Most common topics with no verified resources yet:");
for (const [k, v] of topEmpty) console.log(`  ${String(v).padStart(5)}  ${k}`);

// ── HTTP link checking (opt-in) ─────────────────────────────────────────────
if (HTTP_LIMIT > 0) {
  const top = [...urlCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, HTTP_LIMIT);
  console.log(`\n══ Checking ${top.length} most-used URLs (HEAD) ══`);
  const bad = [];
  const agent = "Mozilla/5.0 (compatible; CareerRoadmapsAudit/1.0)";
  const check = (url) =>
    new Promise((resolve) => {
      const t = setTimeout(() => resolve({ url, status: "TIMEOUT" }), 8000);
      const req = (method) => {
        const lib = url.startsWith("https") ? https : http;
        const u = new URL(url);
        const r = lib.request(
          { hostname: u.hostname, path: u.pathname + u.search, method, headers: { "user-agent": agent, accept: "*/*" } },
          (res) => {
            res.resume();
            clearTimeout(t);
            // some servers reject HEAD — fall back to GET with a small body read
            if (res.statusCode >= 400 && res.statusCode < 500 && res.statusCode !== 403 && res.statusCode !== 404 && method === "HEAD") {
              return req("GET");
            }
            resolve({ url, status: res.statusCode });
          }
        );
        r.on("error", () => {
          clearTimeout(t);
          if (method === "HEAD") req("GET");
          else resolve({ url, status: "ERROR" });
        });
      };
      req("HEAD");
    });

  const concurrency = 32;
  let i = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (i < top.length) {
      const [url] = top[i++];
      const result = await check(url);
      const ok = result.status >= 200 && result.status < 400;
      if (!ok) bad.push({ ...result, uses: urlCount.get(url) });
    }
  });
  await Promise.all(workers);

  bad.sort((a, b) => b.uses - a.uses);
  console.log(`Checked ${top.length} URLs → ${top.length - bad.length} OK, ${bad.length} problematic`);
  const BROKEN = bad.filter((b) => [404, 410, 500, 502, 503, "ERROR", "TIMEOUT"].includes(b.status));
  const REDIRECTS = bad.filter((b) => !BROKEN.includes(b));
  console.log(`\nLikely broken (${BROKEN.length}):`);
  for (const b of BROKEN.slice(0, 60)) console.log(`  [${b.status}] ×${b.uses} ${b.url}`);
  console.log(`\nOther (redirects/403 — review) (${REDIRECTS.length}):`);
  for (const b of REDIRECTS.slice(0, 30)) console.log(`  [${b.status}] ×${b.uses} ${b.url}`);
}

process.exit(genericSearches > 0 || badHosts > 0 || missingMeta > 0 ? 1 : 0);
