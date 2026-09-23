// Parallel curl candidate prober.
//
// probe-url-set.mjs is sequential (one fetch at a time), which is fine for a
// dozen candidates but unusable for the long-tail backlog where each batch is
// 100+ URLs. This variant shells out to `curl` with a process pool, captures
// status + <title> + final URL per candidate, and writes the SAME
// `<file>.probed.json` shape that consolidate-batches.mjs already consumes — so
// the merge path stays identical and verified titles still come from the live
// page rather than a guess.
//
// Usage: node data/v2/resource-system/probe-curl.mjs <candidates.json> [--jobs 12]

import { readFileSync, writeFileSync, mkdtempSync, readFileSync as rf, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFile } from "node:child_process";

const file = process.argv[2];
if (!file) {
  console.error("usage: node data/v2/resource-system/probe-curl.mjs <candidates.json> [--jobs N]");
  process.exit(1);
}
const jobsIdx = process.argv.indexOf("--jobs");
const JOBS = jobsIdx > 0 ? Number(process.argv[jobsIdx + 1]) || 12 : 12;

// Mirrors the directness rule used by probe-url-set.mjs and audit-node-coverage.
const GENERIC_PATH = /^\/(problemset|playgrounds|code|tracks|courses|domains|explore|learn|paths|challenges|library|catalog|browse|tutorials|questions|dashboard|training|university)?\/?$/i;
function directness(url) {
  try {
    const u = new URL(url);
    if (u.pathname === "" || u.pathname === "/en-US" || u.pathname === "/docs") return "generic";
    const p = u.pathname.replace(/\/+$/, "");
    if (p === "" || GENERIC_PATH.test(p)) return "generic";
    return "direct";
  } catch {
    return "invalid";
  }
}

const raw = JSON.parse(readFileSync(file, "utf8"));
const entries = Array.isArray(raw) ? raw : Object.entries(raw).map(([label, url]) => ({ label, url }));
const decoded = (s) =>
  String(s || "")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const dir = mkdtempSync(join(tmpdir(), "probe-curl-"));

function probeOne({ label, url }, idx) {
  return new Promise((resolve) => {
    const body = join(dir, `b${idx}.html`);
    const meta = join(dir, `m${idx}.txt`);
    // -L follow redirects; -sS quiet but show errors; --max-time 25, retry once.
    execFile(
      "curl",
      ["-sSL", "--max-time", "25", "--retry", "1", "--retry-delay", "1",
        "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "-H", "accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "-H", "accept-language: en-US,en;q=0.9",
        "-o", body, "-w", "%{http_code}\t%{url_effective}", url],
      { maxBuffer: 4 * 1024 * 1024 },
      (err, stdout) => {
        let status = 0;
        let finalUrl = url;
        if (stdout) {
          const [code, eff] = String(stdout).split("\t");
          status = Number(code) || 0;
          if (eff) finalUrl = eff.trim();
        }
        let title = "";
        try {
          const html = rf(body, "utf8");
          title = decoded((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]).slice(0, 140);
        } catch {
          /* body missing — page may be non-HTML (e.g. PDF) */
        }
        const state = status >= 200 && status < 300 ? "OK"
          : status >= 300 && status < 400 ? "REDIRECT"
            : status === 403 || status === 429 ? "BLOCKED"
              : status === 404 || status === 410 ? "DEAD"
                : status === 0 ? "TEMPORARY" : "TEMPORARY";
        resolve({ label, url, state, status, title, finalUrl, directness: directness(url), curlError: err && !status ? String(err.message || err) : undefined });
      },
    );
  });
}

const results = new Array(entries.length);
let next = 0;
async function worker() {
  while (next < entries.length) {
    const i = next++;
    const e = entries[i];
    try {
      results[i] = await probeOne(e, i);
    } catch (err) {
      results[i] = { label: e.label, url: e.url, state: "TEMPORARY", status: 0, title: "", finalUrl: e.url, directness: directness(e.url), curlError: String(err.message || err) };
    }
  }
}
await Promise.all(Array.from({ length: Math.min(JOBS, entries.length) }, worker));

try { rmSync(dir, { recursive: true, force: true }); } catch { /* best effort */ }

for (const r of results) {
  const flag = r.state === "OK" ? "OK    " : r.state.padEnd(6);
  console.log(`${flag} ${String(r.status).padStart(3)} ${r.directness.padEnd(7)} ${r.label}  →  ${r.title || "(no title)"}  ${r.state === "OK" ? "" : r.url}`);
}

const outPath = file.replace(/\.json$/, ".probed.json");
writeFileSync(outPath, JSON.stringify(results, null, 2));
const accepted = results.filter((r) => (r.state === "OK" || r.state === "REDIRECT") && r.directness === "direct");
const dead = results.filter((r) => r.state === "DEAD" || r.state === "TEMPORARY");
console.log(`\naccepted ${accepted.length}/${results.length}  ·  dead/temp ${dead.length}  → ${outPath}`);
if (dead.length) console.log("needs replacement:\n" + dead.map((d) => `  ${d.state} ${d.label} → ${d.url}`).join("\n"));
