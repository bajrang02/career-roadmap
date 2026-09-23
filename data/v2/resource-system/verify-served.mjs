// Final served-dataset acceptance check.
//
// Confirms (a) every repaired URL actually shipped, and (b) the dataset still
// contains no search-style URL (Google/Bing/DuckDuckGo/YouTube/GitHub search),
// which the spec forbids as placeholder resources.

import { readFileSync, readdirSync } from "node:fs";

const DIR = "public/roadmaps";
const files = readdirSync(DIR).filter((f) => f.endsWith(".json"));
const blob = files.map((f) => readFileSync(`${DIR}/${f}`, "utf8")).join("\n");

// The six engineering roadmaps share one Engineering ToolBox cheatsheet from the
// KB map, so only the topical page that map resolves to is expected to ship.
const repaired = [
  "https://www.engineeringtoolbox.com/saturated-steam-properties-d_457.html",
  "https://www.engineeringtoolbox.com/young-modulus-d_417.html",
  "https://www.fao.org/land-water/land/en/",
  "https://control.com/textbook/programmable-logic-controllers/",
  "https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html",
  "https://www.aspentech.com/en/products/engineering/aspen-plus",
  "https://chipverify.com/verilog/verilog-tutorial",
  "https://www.hackerrank.com/skills-directory/php",
  "https://www.hackerrank.com/skills-directory/javascript",
  "https://appium.io/docs/en/latest/",
  "https://toolshed.g2.bx.psu.edu/",
  "https://www.solidworks.com/solidworks-certification-program",
  "https://www.solidworks.com/support/training",
  "https://pdos.csail.mit.edu/6.S081/2020/schedule.html",
  "https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/",
  "https://ocw.mit.edu/courses/2-51-intermediate-heat-and-mass-transfer-fall-2008/",
  "https://ocw.mit.edu/courses/1-85-water-and-wastewater-treatment-engineering-spring-2006/",
  "https://ocw.mit.edu/courses/1-050-solid-mechanics-fall-2004/",
  "https://ocw.mit.edu/courses/20-441j-biomaterials-tissue-interactions-fall-2009/",
  "https://react.dev/learn/thinking-in-react",
  "https://nowlearning.servicenow.com/lxp",
  "https://www.istqb.org/certifications/",
];

const missing = repaired.filter((u) => !blob.includes(u));
console.log(`repaired URLs shipped: ${repaired.length - missing.length}/${repaired.length}`);
if (missing.length) for (const m of missing) console.log(`  MISSING ${m}`);

const searchPatterns = [
  ["google search", /google\.[a-z.]+\/search/],
  ["bing search", /bing\.com\/search/],
  ["duckduckgo", /duckduckgo\.com\/\?q=/],
  ["youtube search", /youtube\.com\/results/],
  ["github search", /github\.com\/search/],
];
for (const [name, rx] of searchPatterns) {
  const hits = [...new Set(blob.match(new RegExp(rx.source, "g")) || [])];
  console.log(`${name}: ${hits.length ? hits.slice(0, 3).join(", ") : 0}`);
}

// A bucket whose every resource is a provider homepage would violate the
// "no homepage-as-exact" rule, so count those separately from buckets that
// merely carry a root as a secondary companion link.
const isRoot = (u) => {
  try {
    const p = new URL(u).pathname;
    return p === "/" || p === "";
  } catch {
    return false;
  }
};

const details = files.filter((f) => f.endsWith(".details.json"));
let buckets = 0;
let allRoot = 0;
let withRoot = 0;
const offenders = [];
for (const f of details) {
  const j = JSON.parse(readFileSync(`${DIR}/${f}`, "utf8"));
  for (const [id, rec] of Object.entries(j)) {
    const urls = ((rec && rec.resources) || []).map((r) => r.url).filter(Boolean);
    if (!urls.length) continue;
    buckets += 1;
    if (urls.some(isRoot)) withRoot += 1;
    if (urls.every(isRoot)) {
      allRoot += 1;
      offenders.push(`${f.replace(".details.json", "")} :: ${id} :: ${urls.join(", ")}`);
    }
  }
}
console.log(`\nnode buckets with resources: ${buckets}`);
console.log(`buckets where every resource is a provider homepage: ${allRoot}`);
console.log(`buckets carrying a root as a companion link: ${withRoot}`);
for (const o of offenders) console.log(`  ${o}`);
