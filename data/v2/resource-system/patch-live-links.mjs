// Repairs every stale/dead URL found by the served-dataset link audit.
//
// Every replacement below was verified live this session (curl probe, or a real
// browser where the host blocks automated clients). Fixes are applied at SOURCE
// so they survive `generate-v2` / resource-system regeneration instead of being
// clobbered on the next build.
//
// The Engineering ToolBox root URL is shared by six engineering roadmaps that
// each need a different topical page, so it is resolved by the nearest preceding
// `"slug"` rather than a blanket replace.

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";

const ROOT = process.cwd();

// Engineering ToolBox: root URL -> per-career topical page (all verified 200/direct).
const ET = "https://www.engineeringtoolbox.com/";
const ET_BY_CAREER = {
  "aerospace-engineer": "https://www.engineeringtoolbox.com/air-density-specific-weight-d_600.html",
  "mechanical-engineer": "https://www.engineeringtoolbox.com/saturated-steam-properties-d_457.html",
  "chemical-engineer": "https://www.engineeringtoolbox.com/water-density-specific-weight-d_595.html",
  "civil-engineer": "https://www.engineeringtoolbox.com/stress-strain-d_950.html",
  "structural-engineer": "https://www.engineeringtoolbox.com/young-modulus-d_417.html",
  "robotics-engineer": "https://www.engineeringtoolbox.com/motion-formulas-d_941.html",
};

// Plain old -> new replacements. Every `new` was verified live.
const REPLACEMENTS = [
  // Curl-blocked hosts verified in a real browser this session.
  ["https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html",
   "https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html"],
  ["https://www.solidworks.com/certification",
   "https://www.solidworks.com/solidworks-certification-program"],
  // Origin down (522 / browser timeout) -> live authoritative PLC textbook chapter.
  ["https://www.plcdev.com/plc_training",
   "https://control.com/textbook/programmable-logic-controllers/"],
  // 404s.
  ["https://www.fao.org/agriculture/crops/crops/en/", "https://www.fao.org/land-water/land/en/"],
  ["https://www.solidworks.com/support/self-paced-training", "https://www.solidworks.com/support/training"],
  ["https://www.hackerrank.com/domains/php", "https://www.hackerrank.com/skills-directory/php"],
  ["https://www.hackerrank.com/domains/javascript", "https://www.hackerrank.com/skills-directory/javascript"],
  ["https://ocw.mit.edu/courses/2-005-thermal-fluids-engineering-i-fall-2011/",
   "https://ocw.mit.edu/courses/2-51-intermediate-heat-and-mass-transfer-fall-2008/"],
  ["https://ocw.mit.edu/courses/6-08t-embedded-systems-teaching-lab-fall-2008/",
   "https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/"],
  ["https://ocw.mit.edu/courses/6-s081-operating-system-engineering-fall-2020/",
   "https://pdos.csail.mit.edu/6.S081/2020/schedule.html"],
  ["https://appium.io/docs/", "https://appium.io/docs/en/latest/"],
  // Vendor product moved off its old domain.
  ["https://www.aspenplus.com/", "https://www.aspentech.com/en/products/engineering/aspen-plus"],
  // .php suffix retired; canonical path redirects.
  ["https://www.chipverify.com/verilog/verilog-tutorial.php", "https://chipverify.com/verilog/verilog-tutorial"],
  // App no longer served.
  ["https://reactchallenges.app/", "https://react.dev/learn/thinking-in-react"],
  // Certification pages that moved or now 500.
  ["https://www.istqb.org/certifications/mobile-application-testing", "https://www.istqb.org/certifications/"],
  ["https://www.servicenow.com/services/training-and-certification.html", "https://nowlearning.servicenow.com/lxp"],
  // Galaxy "Tools" node -> the actual Galaxy tool archive.
  ["https://galaxyproject.org/tools/", "https://toolshed.g2.bx.psu.edu/"],
];

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function patchEngineeringToolbox(src) {
  let s = src;
  let count = 0;
  for (;;) {
    const idx = s.indexOf(`"${ET}"`);
    if (idx === -1) break;
    const preceding = s.slice(0, idx);
    const slugs = [...preceding.matchAll(/"slug"\s*:\s*"([a-z0-9-]+)"/g)];
    const slug = slugs.length ? slugs[slugs.length - 1][1] : null;
    const target = slug && ET_BY_CAREER[slug];
    if (!target) {
      console.log(`  !! engineeringtoolbox root with unknown owner slug=${slug}`);
      break;
    }
    s = s.slice(0, idx) + `"${target}"` + s.slice(idx + ET.length + 2);
    count += 1;
  }
  return { s, count };
}

function patchPlain(src) {
  let s = src;
  let count = 0;
  for (const [oldUrl, newUrl] of REPLACEMENTS) {
    // Only match when the URL ends where the string value ends, so the
    // singular `/certification` never corrupts `/certifications`.
    const rx = new RegExp(`${esc(oldUrl)}(?![A-Za-z0-9._~:/?#@!$&%\\-+=])`, "g");
    const hits = s.match(rx);
    if (hits) {
      s = s.replace(rx, newUrl);
      count += hits.length;
    }
  }
  return { s, count };
}

const targets = [
  "data/v2/source/careers-v2.json",
  "data/v2/source/practice-v2.json",
  "data/v2/source/certifications-v2.json",
  "data/v2/source/resources-v2.json",
  "data/v2/expand-kb.mjs",
  "data/v2/resource-system/build-resource-system.mjs",
  "data/v2/resource-system/concept-batch2.mjs",
  "data/v2/resource-system/concept-batch1.mjs",
  "data/v2/resource-system/existing-topic-resources.json",
  "data/v2/source/skills-v2.json",
  "data/v2/resource-system/candidates-meta.json",
  "data/v2/resource-system/concept-batch-verified.library.json",
  "data/v2/resource-system/dataset-todo.json",
  "data/v2/resource-system/longtail-overrides.json",
  "data/v2/certifications/source/tech.mjs",
  "data/v2/certifications/source/engineering.mjs",
  "data/v2/certifications/catalog.json",
  "data/v2/resource-system/longtail-resources-a.mjs",
  "data/v2/resource-system/longtail-resources-b1.mjs",
  "data/v2/resource-system/longtail-resources-c1.mjs",
  "data/v2/resource-system/longtail-resources-c2.mjs",
  "data/v2/resource-system/longtail-resources-c3.mjs",
  "data/v2/resource-system/longtail-resources-c4.mjs",
];

// Regenerated intermediates carry the same URLs; keep them consistent too.
const genDir = "data/v2/generated";
if (existsSync(genDir)) {
  for (const f of readdirSync(genDir).filter((f) => f.endsWith(".json"))) {
    targets.push(`${genDir}/${f}`);
  }
}

let filesChanged = 0;
let totalPatches = 0;
for (const rel of targets) {
  const abs = `${ROOT}/${rel}`;
  if (!existsSync(abs)) continue;
  const before = readFileSync(abs, "utf8");
  const a = patchEngineeringToolbox(before);
  const b = patchPlain(a.s);
  const count = a.count + b.count;
  if (count > 0 && b.s !== before) {
    writeFileSync(abs, b.s);
    filesChanged += 1;
    totalPatches += count;
    console.log(`${String(count).padStart(3)}  ${rel}`);
  }
}

console.log(`\n${totalPatches} URL fixes across ${filesChanged} files`);
