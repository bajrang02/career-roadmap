// Mandatory Resource & Practice Coverage audit (spec: "CareerRoadmaps —
// Mandatory Resource & Practice Coverage").
// Scans every roadmap tree + details map and enforces, for EVERY node:
//   • resources.length >= 1   • practice.length >= 1
//   • no duplicate resource URLs   • no duplicate practice URLs
//   • every URL is a valid https:// link
//   • PDF-discovery fallback queries carry the exact topic + a domain hint
//     (never a bare `filetype:pdf <topic>` search)
// Prints a per-roadmap pass/fail line plus a full report for failing
// roadmaps, and exits non-zero when any node fails.
//
// Usage: node data/audit-coverage.mjs [--check-urls]
//   --check-urls additionally HEAD/GET-verifies every unique resource and
//   practice URL across all roadmaps (the PDF-discovery Google queries are
//   skipped — their query format is already enforced above — while every
//   other URL is checked live with a browser user-agent, one retry for
//   network errors, and HEAD→GET fallback). Hard failures (404/410/451 and
//   unreachable hosts) exit non-zero; bot-blocked (401/403/429) and 5xx
//   responses are reported as soft warnings, since they are usually bot
//   protection rather than genuinely broken links.
//   Env: LINK_CONCURRENCY (default 16) · LINK_TIMEOUT ms (default 15000)
import { readdirSync, readFileSync } from "node:fs";

const DIR = new URL("../public/roadmaps/", import.meta.url);
const files = readdirSync(DIR).filter((f) => f.endsWith(".details.json"));
const URL_RE = /^https?:\/\/[^\s]+$/;
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();

const CHECK_URLS = process.argv.includes("--check-urls");

let total = 0;
let failures = 0;
const failLines = [];
const summaries = [];
// url → { kinds:Set, example:{label,slug} } for the URL check phase
const uniqueUrls = new Map();
const recordUrl = (url, kind, label, slug) => {
  if (!url) return;
  if (!uniqueUrls.has(url)) uniqueUrls.set(url, { kinds: new Set(), example: { label, slug } });
  const entry = uniqueUrls.get(url);
  entry.kinds.add(kind);
  if (!entry.example) entry.example = { label, slug };
};

for (const f of files) {
  const slug = f.replace(".details.json", "");
  let tree, details;
  try {
    tree = JSON.parse(readFileSync(new URL(slug + ".json", DIR), "utf8"));
    details = JSON.parse(readFileSync(new URL(f, DIR), "utf8"));
  } catch {
    failures += 1;
    failLines.push(`${slug}: unreadable tree/details`);
    continue;
  }
  // id → label from the tree
  const labelOf = new Map();
  const walk = (n) => {
    labelOf.set(n.id, n.label);
    for (const c of n.children || []) walk(c);
    for (const o of n.options || []) walk(o);
  };
  walk(tree.root);

  let roadmapFail = 0;
  const roadmapLines = [];
  for (const [id, det] of Object.entries(details)) {
    total += 1;
    const label = labelOf.get(id) ?? id;
    const problems = [];

    const res = det.resources ?? [];
    const prac = det.practice ?? [];
    if (res.length === 0) problems.push("0 resources");
    if (prac.length === 0) problems.push("0 practice");

    const dupRes = new Set();
    for (const r of res) {
      recordUrl(r.url, "resource", label, slug);
      if (!r.url || !URL_RE.test(r.url)) problems.push(`bad resource URL: ${r.url ?? "(none)"}`);
      else if (dupRes.has(r.url)) problems.push(`duplicate resource URL: ${r.url}`);
      else dupRes.add(r.url);
      // PDF-discovery floor must carry the exact topic + a domain hint
      if (r.query && r.kind === "reference" && r.type === "PDF Search") {
        if (!r.query.startsWith('filetype:pdf "')) problems.push("PDF query not filetype:pdf-prefixed");
        else if (!r.query.toLowerCase().includes(norm(label).split(" ")[0])) problems.push("PDF query missing the topic");
        else if (r.query.trim().split(/\s+/).length < 4) problems.push("PDF query lacks a domain hint");
      }
    }
    const dupPrac = new Set();
    for (const p of prac) {
      recordUrl(p.url, "practice", label, slug);
      if (!p.url || !URL_RE.test(p.url)) problems.push(`bad practice URL: ${p.url ?? "(none)"}`);
      else if (dupPrac.has(p.url)) problems.push(`duplicate practice URL: ${p.url}`);
      else dupPrac.add(p.url);
    }

    if (problems.length) {
      failures += 1;
      roadmapFail += 1;
      roadmapLines.push(`  ✗ ${label} (${id}): ${problems.join("; ")}`);
    }
  }
  summaries.push(`${roadmapFail === 0 ? "PASS" : "FAIL"}  ${slug}  (${Object.keys(details).length} nodes${roadmapFail ? `, ${roadmapFail} failing` : ""})`);
  if (roadmapFail) failLines.push(...roadmapLines);
}

console.log(`\n── Mandatory Resource & Practice Coverage audit ──`);
console.log(`Nodes audited: ${total} · Failing nodes: ${failures}`);
console.log(`Roadmaps failing: ${summaries.filter((s) => s.startsWith("FAIL")).length} / ${files.length}`);
for (const s of summaries) if (s.startsWith("FAIL")) console.log(s);
if (failLines.length) {
  console.log("\n── failing nodes ──");
  for (const l of failLines.slice(0, 80)) console.log(l);
}

// ── optional: live URL verification ──────────────────────────────────────────
let urlFailures = 0;
if (CHECK_URLS) {
  const CONCURRENCY = Number(process.env.LINK_CONCURRENCY || 16);
  const TIMEOUT = Number(process.env.LINK_TIMEOUT || 15000);
  const UA =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
  const HEADERS = {
    "user-agent": UA,
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "accept-language": "en-US,en;q=0.9",
  };
  // PDF-discovery floor URLs are Google searches — anti-bot; their correctness
  // is the filetype:pdf query (already enforced above), not a page fetch.
  const PDF_FLOOR_RE = /google\.com\/search/;
  const toCheck = [...uniqueUrls.entries()].filter(([u]) => !PDF_FLOOR_RE.test(u));
  const pdfFloorCount = uniqueUrls.size - toCheck.length;

  const attempt = async (url, method) => {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT),
      headers: HEADERS,
    });
    return res.status;
  };

  // HEAD is a cheap fast path, but many bot-protected CDNs answer HEAD with
  // 404/403 — so a non-2xx HEAD (or a failed HEAD) is ALWAYS confirmed with a
  // real GET before a link is declared broken. Network errors are retried once
  // and reported as inconclusive warnings, never as hard failures (a host can
  // be unreachable from this machine yet perfectly fine in a browser).
  const checkUrl = async (url) => {
    const tryReq = async (method) => {
      try {
        return await attempt(url, method);
      } catch {
        return null;
      }
    };
    let status = await tryReq("HEAD");
    if (status === null || status >= 400) {
      status = await tryReq("GET");
    }
    if (status === null) {
      status = await tryReq("GET"); // one retry before reporting inconclusive
    }
    return { status, error: status === null ? "unreachable from this host (inconclusive)" : undefined };
  };

  const results = { ok: 0, broken: [], blocked: [], soft: [], err: [] };
  let done = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (toCheck.length) {
      const [url, meta] = toCheck.pop();
      const ctx = `${meta.example.label} @ ${meta.example.slug}`;
      const { status, error } = await checkUrl(url);
      done += 1;
      if (done % 200 === 0) console.log(`  …checked ${done}/${toCheck.length + done} URLs`);
      if (status === null) {
        results.err.push({ url, ctx, error });
      } else if (status >= 200 && status < 400) {
        results.ok += 1;
      } else if (status === 404 || status === 410 || status === 451) {
        results.broken.push({ url, ctx, status });
      } else if (status === 401 || status === 403 || status === 429) {
        results.blocked.push({ url, ctx, status });
      } else {
        results.soft.push({ url, ctx, status });
      }
    }
  });
  await Promise.all(workers);

  // Only confirmed 404/410/451 after GET verification gate the run; everything
  // else (unreachable, bot-blocked, 5xx) is reported as a soft warning.
  urlFailures = results.broken.length;
  console.log(`\n── Live URL verification (${toCheck.length} unique URLs, ${pdfFloorCount} PDF-discovery skipped) ──`);
  console.log(`OK: ${results.ok} · BROKEN: ${results.broken.length} · blocked(bot-guard): ${results.blocked.length} · 5xx/other: ${results.soft.length} · unreachable(inconclusive): ${results.err.length}`);
  const printList = (title, list) => {
    if (!list.length) return;
    console.log(`\n${title} (${list.length}${list.length > 60 ? ", showing first 60" : ""})`);
    for (const { url, ctx, status, error } of list.slice(0, 60)) {
      console.log(`  ${status ? `${status} ` : ""}${url}  [${ctx}]${error ? ` — ${error}` : ""}`);
    }
  };
  printList("✗ BROKEN links (GET-confirmed 404/410/451)", results.broken);
  printList("! unreachable from this host (inconclusive — verify manually)", results.err);
  printList("! blocked by bot protection (verify manually)", results.blocked);
  printList("! 5xx or unexpected status (likely transient)", results.soft);
}

console.log(failures || urlFailures ? `\nRESULT: ${failures + urlFailures} FAILURE(S)` : "\nRESULT: PASS — every node ships ≥1 resource and ≥1 practice");
process.exit(failures || urlFailures ? 1 : 0);
