// Repairs the first homepage patch.
//
// That version searched a window around the resource title and took the FIRST
// url in it, which for some records was the sibling listed above the title. This
// pass anchors strictly on the url that FOLLOWS the title (the order both source
// files use) so every write lands on the record it names.
//
// Entries marked RESTORE were collateral damage and go back to their committed
// value; the rest are the intended, probe-verified upgrades.

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const R = "RESTORE";
const MAP = [
  // ── careers-v2.json ───────────────────────────────────────────────────────
  ["data/v2/source/careers-v2.json", [
    ["Machine Learning — Andrew Ng (Coursera)", "https://www.coursera.org/learn/machine-learning", R],
    ["IISE Resources", "https://www.iise.org/", R],
    ["fast.ai Practical Deep Learning", "https://course.fast.ai/Lessons/lesson1.html"],
    ["Fast.ai Practical Deep Learning", "https://course.fast.ai/Lessons/lesson1.html"],
    ["Deep Learning Book (Goodfellow)", "https://www.deeplearningbook.org/contents/intro.html"],
    ["MIT OpenCourseWare — Civil Engineering", "https://ocw.mit.edu/courses/1-050-solid-mechanics-fall-2004/"],
    ["MIT OCW — Materials Science", "https://ocw.mit.edu/courses/3-091sc-introduction-to-solid-state-chemistry-fall-2010/"],
    ["MIT OCW — Operations Research", "https://ocw.mit.edu/courses/15-053-optimization-methods-in-management-science-spring-2013/"],
    ["ASM International", "https://www.asminternational.org/learn"],
    ["ASHRAE Resources", "https://www.ashrae.org/technical-resources"],
    ["HVAC Learning — HVAC School", "https://www.hvacrschool.com/tech-tips/"],
  ]],
  // ── skills-v2.json ────────────────────────────────────────────────────────
  ["data/v2/source/skills-v2.json", [
    ["Android Developers", "https://developer.android.com/", R],
    ["Kotlin Official", "https://kotlinlang.org/docs/getting-started.html"],
  ]],
  // ── resources-v2.json ─────────────────────────────────────────────────────
  ["data/v2/source/resources-v2.json", [
    ["Google Cloud Documentation", "https://cloud.google.com/docs", R],
    ["Machine Learning — Andrew Ng (Coursera)", "https://www.coursera.org/learn/machine-learning", R],
    ["JavaScript.info Closures", "https://javascript.info/closure", R],
    ["MDN Promises", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises", R],
    ["ASHRAE Resources", "https://www.ashrae.org/technical-resources"],
    ["HVAC Learning — HVAC School", "https://www.hvacrschool.com/tech-tips/"],
    ["Fast.ai Practical Deep Learning", "https://course.fast.ai/Lessons/lesson1.html"],
    ["fast.ai Practical Deep Learning", "https://course.fast.ai/Lessons/lesson1.html"],
    ["Deep Learning Book (Goodfellow)", "https://www.deeplearningbook.org/contents/intro.html"],
  ]],
];

for (const [file, entries] of MAP) {
  if (!existsSync(file)) continue;
  let s = readFileSync(file, "utf8");
  let n = 0;
  const missing = [];

  for (const [title, url, mode] of entries) {
    let from = 0;
    let hit = 0;
    for (;;) {
      const t = s.indexOf(`"${title}"`, from);
      if (t === -1) break;

      // The url that follows this title, within the same small record.
      const win = s.slice(t, t + 300);
      const m = /"url"\s*:\s*"([^"]+)"/.exec(win);
      if (!m) {
        from = t + title.length;
        continue;
      }
      const abs = t + m.index + m[0].indexOf(m[1]);
      s = s.slice(0, abs) + url + s.slice(abs + m[1].length);
      from = abs + url.length;
      n += 1;
      hit += 1;
    }
    if (hit === 0) missing.push(`${title}${mode === R ? " (restore)" : ""}`);
  }

  writeFileSync(file, s);
  console.log(`${String(n).padStart(3)}  ${file}`);
  if (missing.length) console.log(`     not found: ${missing.join(" · ")}`);
}
console.log("\nhomepage patch repaired");
