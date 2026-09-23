// Finds every local file the data pipeline expects, then reports which ones git
// does not track.
//
// A clone only contains tracked files, so anything referenced but untracked is a
// build blocker (or, worse, silently changes the generated dataset).

import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, normalize } from "node:path";

const ROOT = process.cwd();
const SCRIPTS = [
  "data/v2/resource-system/build-resource-system.mjs",
  "data/v2/resource-system/concept-resources.mjs",
  "data/v2/resource-system/concept-batch2.mjs",
  "data/v2/generate-v2.mjs",
  "data/v2/node-tasks.mjs",
  "data/v2/resource-system/validate-resolution.mjs",
  "data/v2/expand-kb.mjs",
];

// Bases the scripts resolve paths against.
const BASES = {
  __dirname: null, // per-script directory
  V2: "data/v2",
  ROOT: ".",
  GENERATED: "data/v2/generated",
};

const isTracked = (p) => {
  try {
    execFileSync("git", ["ls-files", "--error-unmatch", p], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

const found = new Map(); // path -> Set(scripts referencing it)

for (const script of SCRIPTS) {
  if (!existsSync(script)) continue;
  const src = readFileSync(script, "utf8");
  const scriptDir = dirname(script);

  // Literal filenames, e.g. "taxonomy.json" or "longtail-overrides.json".
  for (const m of src.matchAll(/["'`]([\w./-]+\.(?:json|mjs))["'`]/g)) {
    const name = m[1];
    if (name.startsWith("http")) continue;

    const candidates = [];
    if (name.startsWith("./") || name.startsWith("../")) {
      candidates.push(normalize(join(scriptDir, name)));
    } else if (name.includes("/")) {
      candidates.push(normalize(name));
      candidates.push(normalize(join("data/v2", name)));
      candidates.push(normalize(join("data/v2/resource-system", name)));
    } else {
      candidates.push(normalize(join(scriptDir, name)));
      candidates.push(normalize(join("data/v2", name)));
      candidates.push(normalize(join("data/v2/resource-system", name)));
      candidates.push(normalize(join("data/v2/source", name)));
    }

    for (const c of candidates) {
      if (!existsSync(c)) continue;
      if (!found.has(c)) found.set(c, new Set());
      found.get(c).add(script);
      break;
    }
  }
}

const missing = [...found.keys()].filter((p) => !isTracked(p)).sort();
const ok = [...found.keys()].filter((p) => isTracked(p)).sort();

console.log(`referenced local inputs found on disk: ${found.size}`);
console.log(`tracked:   ${ok.length}`);
console.log(`UNTRACKED: ${missing.length}  <-- absent from any clone`);
for (const p of missing) {
  const users = [...found.get(p)].map((s) => s.replace("data/v2/", "")).join(", ");
  console.log(`  ${p}\n      used by: ${users}`);
}
