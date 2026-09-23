// Upgrades "career overview" resource slots that shipped a provider HOMEPAGE
// where a specific topical page exists and is verified live.
//
// Each entry is anchored on the resource title, then the nearest `"url"` to that
// title (before or after) is rewritten. That keeps the patch independent of the
// exact JSON key order / formatting used by each source file.
//
// Titles whose only live option is the site root (AIAA, AIChE, IISE, IEEE EMBS,
// Embedded Linux Wiki, Linux Journey, Android Developers) are deliberately NOT
// listed: their specific pages either 404 or sit behind an unpassable bot
// challenge, so the verified canonical root stays.

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const TARGETS = [
  // ── MIT OpenCourseWare roots -> the specific course page ──────────────────
  ["MIT OCW — Aerospace Engineering", "https://ocw.mit.edu/courses/16-01-unified-engineering-i-ii-iii-iv-fall-2005-spring-2006/"],
  ["MIT OCW — Biomedical Engineering", "https://ocw.mit.edu/courses/2-782j-design-of-medical-devices-and-implants-spring-2006/"],
  ["MIT OCW — Chemical Engineering", "https://ocw.mit.edu/courses/10-302-transport-processes-fall-2004/"],
  ["MIT OpenCourseWare — Civil Engineering", "https://ocw.mit.edu/courses/1-050-solid-mechanics-fall-2004/"],
  ["MIT OCW — Environmental Engineering", "https://ocw.mit.edu/courses/1-77-water-quality-control-spring-2006/"],
  ["MIT OCW — Materials Science", "https://ocw.mit.edu/courses/3-091sc-introduction-to-solid-state-chemistry-fall-2010/"],
  ["MIT OCW — Operations Research", "https://ocw.mit.edu/courses/15-053-optimization-methods-in-management-science-spring-2013/"],
  // ── Government / society portals -> topical pages ─────────────────────────
  ["EPA Resources", "https://www.epa.gov/environmental-topics"],
  ["ASCE Resources", "https://www.asce.org/career-growth"],
  ["ASHRAE Resources", "https://www.ashrae.org/technical-resources"],
  ["HVAC Learning — HVAC School", "https://www.hvacrschool.com/tech-tips/"],
  ["ASM International", "https://www.asminternational.org/learn"],
  // ── Course / book roots -> the actual learning path ──────────────────────
  ["Fast.ai Practical Deep Learning", "https://course.fast.ai/Lessons/lesson1.html"],
  ["Deep Learning Book (Goodfellow)", "https://www.deeplearningbook.org/contents/intro.html"],
  // ── Skill-roadmap doc roots -> specific docs pages ───────────────────────
  ["Ansible Documentation", "https://docs.ansible.com/ansible/latest/playbook_guide/index.html"],
  ["Kotlin Official", "https://kotlinlang.org/docs/getting-started.html"],
  ["React Native Docs", "https://reactnative.dev/docs/getting-started"],
  ["The Linux Documentation Project", "https://tldp.org/guides.html"],
  ["CS:APP", "https://csapp.cs.cmu.edu/3e/home.html"],
  ["Cisco Networking Academy", "https://www.netacad.com/courses/networking"],
  ["CWNP", "https://www.cwnp.com/certifications/"],
];

const FILES = [
  "data/v2/source/careers-v2.json",
  "data/v2/source/skills-v2.json",
  "data/v2/source/resources-v2.json",
];

let total = 0;
for (const file of FILES) {
  if (!existsSync(file)) continue;
  let s = readFileSync(file, "utf8");
  let n = 0;
  for (const [title, replacement] of TARGETS) {
    // A title can appear once per roadmap, so every occurrence is upgraded.
    let from = 0;
    for (;;) {
      const t = s.indexOf(`"${title}"`, from);
      if (t === -1) break;

      // Nearest "url" value within a small window on either side of the title.
      const winStart = Math.max(0, t - 400);
      const win = s.slice(winStart, t + 600);
      const m = /"url"\s*:\s*"([^"]+)"/.exec(win);

      if (!m) {
        from = t + title.length;
        continue;
      }

      const abs = winStart + m.index + m[0].indexOf(m[1]);
      const delta = replacement.length - m[1].length;
      s = s.slice(0, abs) + replacement + s.slice(abs + m[1].length);

      // Advance past this title. A url that sat before it shifts the title
      // by `delta`, so the cursor is corrected before continuing — otherwise
      // the scan could re-find the same title forever.
      from = t + title.length + (abs < t ? delta : 0);
      n += 1;
    }
  }
  if (n > 0) {
    writeFileSync(file, s);
    total += n;
    console.log(`${String(n).padStart(3)}  ${file}`);
  }
}
console.log(`\n${total} homepage resources upgraded to specific pages`);
