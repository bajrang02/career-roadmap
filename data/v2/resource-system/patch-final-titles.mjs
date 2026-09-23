// Final hygiene pass on the curated libraries: display titles must describe the
// page the student will actually open, and no curated entry may point at a
// provider root.
import fs from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));

// [file, oldLineFragment, newLineFragment]
const EDITS = [
  [
    "longtail-resources-a.mjs",
    '{ title: "Developer Relations — Hoopy (DevRel agency) resources", url: "https://en.wikipedia.org/wiki/Developer_relations"',
    '{ title: "Developer relations — Wikipedia overview", url: "https://en.wikipedia.org/wiki/Developer_relations"',
  ],
  [
    "longtail-resources-a.mjs",
    '{ title: "Pramp — free peer mock interviews", url: "https://en.wikipedia.org/wiki/Mock_interview"',
    '{ title: "Mock interviews — Wikipedia", url: "https://en.wikipedia.org/wiki/Mock_interview"',
  ],
  [
    "longtail-resources-b1.mjs",
    '{ title: "DWSIM — official documentation", url: "https://github.com/DanWBR/dwsim"',
    '{ title: "DWSIM — official source repository (GitHub)", url: "https://github.com/DanWBR/dwsim"',
  ],
  [
    "longtail-resources-b1.mjs",
    '{ title: "Aave — protocol documentation", url: "https://github.com/aave/aave-v3-core"',
    '{ title: "Aave V3 core protocol — source repository (GitHub)", url: "https://github.com/aave/aave-v3-core"',
  ],
  [
    "longtail-resources-b1.mjs",
    '{ title: "LeetCode — problems catalog", url: "https://cp-algorithms.com/index.html"',
    '{ title: "Algorithms for Competitive Programming — algorithm catalog", url: "https://cp-algorithms.com/index.html"',
  ],
  [
    "longtail-resources-b1.mjs",
    '{ title: "LeetCode — problem set", url: "https://cp-algorithms.com/index.html"',
    '{ title: "Algorithms for Competitive Programming — practice index", url: "https://cp-algorithms.com/index.html"',
  ],
  [
    "longtail-resources-b1.mjs",
    '{ title: "nf-core — community pipelines", url: "https://nf-co.re/"',
    '{ title: "nf-core — community pipelines", url: "https://nf-co.re/pipelines"',
  ],
  [
    "longtail-resources-b1.mjs",
    '{ title: "Bioinformatics algorithms — Rosalind textbook companion", url: "https://bioinformaticsalgorithms.com/"',
    '{ title: "Rosalind — bioinformatics algorithm problem set", url: "https://rosalind.info/problems/list-view/"',
  ],
  [
    "longtail-resources-b1.mjs",
    '{ title: "Biostars — bioinformatics Q&A community", url: "https://www.biostars.org/"',
    '{ title: "Bioinformatics — Wikipedia overview", url: "https://en.wikipedia.org/wiki/Bioinformatics"',
  ],
  [
    "longtail-resources-b1.mjs",
    '{ title: "dotfiles.github.io — community guide", url: "https://dotfiles.github.io/"',
    '{ title: "awesome-dotfiles — curated dotfiles resources", url: "https://github.com/webpro/awesome-dotfiles"',
  ],
  [
    "longtail-resources-c2.mjs",
    '{ title: "Running community calls — Open Source Guides", url: "https://opensource.guide/"',
    '{ title: "Building welcoming communities — Open Source Guides", url: "https://opensource.guide/building-community/"',
  ],
  [
    "longtail-resources-c1.mjs",
    '{ title: "Navigation system — Unity Manual", url: "https://en.wikipedia.org/wiki/Navigation_mesh"',
    '{ title: "Navigation mesh — pathfinding overview (Wikipedia)", url: "https://en.wikipedia.org/wiki/Navigation_mesh"',
  ],
  [
    "longtail-resources-c1.mjs",
    '{ title: "Building a NavMesh — Unity Manual", url: "https://en.wikipedia.org/wiki/Pathfinding"',
    '{ title: "Pathfinding — algorithms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Pathfinding"',
  ],
  [
    "longtail-resources-c1.mjs",
    '{ title: "pre-commit — framework for managing git hooks", url: "https://github.com/pre-commit/pre-commit"',
    '{ title: "pre-commit — framework for managing git hooks (GitHub)", url: "https://github.com/pre-commit/pre-commit"',
  ],
];

let applied = 0;
const missed = [];
for (const [file, from, to] of EDITS) {
  const p = path.join(HERE, file);
  const src = fs.readFileSync(p, "utf8");
  if (!src.includes(from)) {
    missed.push(`${file} :: ${from.slice(0, 60)}`);
    continue;
  }
  fs.writeFileSync(p, src.split(from).join(to));
  applied++;
}
console.log(`applied ${applied}/${EDITS.length} edits`);
if (missed.length) console.log("missed:\n" + missed.join("\n"));
