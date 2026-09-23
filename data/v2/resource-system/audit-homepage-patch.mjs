// Reviews the homepage-patch edits: diffs every `{title,url}` record between the
// committed version and the working tree, keyed by its full JSON path.
//
// The first version of that patch searched a window around the title and took
// the FIRST url in it, which could belong to a sibling record listed above the
// title. This report surfaces exactly which records changed so each one can be
// confirmed or corrected.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

function collect(node, path, out) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => collect(v, `${path}[${i}]`, out));
    return;
  }
  if (node && typeof node === "object") {
    if (typeof node.title === "string" && typeof node.url === "string") {
      out.push({ path, title: node.title, url: node.url, kind: node.kind });
    }
    for (const [k, v] of Object.entries(node)) collect(v, `${path}.${k}`, out);
  }
}

for (const file of process.argv.slice(2)) {
  const head = execFileSync("git", ["show", `HEAD:${file}`], { maxBuffer: 1024 * 1024 * 256 }).toString();
  const now = readFileSync(file, "utf8");

  const a = [];
  const b = [];
  collect(JSON.parse(head), "", a);
  collect(JSON.parse(now), "", b);

  const byPath = new Map(a.map((r) => [r.path, r]));
  const changes = [];
  for (const r of b) {
    const prev = byPath.get(r.path);
    if (!prev) continue;
    if (prev.url !== r.url) changes.push({ title: r.title, from: prev.url, to: r.url, kind: r.kind });
  }

  console.log(`\n=== ${file} — ${changes.length} url change(s) ===`);
  for (const c of changes) console.log(`  [${c.title}]\n      - ${c.from}\n      + ${c.to}`);
}
