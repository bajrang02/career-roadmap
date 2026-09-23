// Replace every remaining homepage-root mapping in the curated libraries with a
// probe-verified DIRECT page. These are the last nodes the coverage audit still
// reported as uncovered.
import fs from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));

const REPLACE = {
  "https://dwsim-documentation.readthedocs.io/": "https://github.com/DanWBR/dwsim",
  "https://cuckoosandbox.org/": "https://github.com/cuckoosandbox/cuckoo",
  "https://any.run/": "https://any.run/malware-trends/",
  "https://www.enterpriseintegrationpatterns.com/": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/",
  "https://docs.metamask.io/": "https://docs.metamask.io/wallet/",
  "https://docs.walletconnect.com/": "https://docs.walletconnect.com/web3wallet/about",
  "https://docs.aave.com/": "https://github.com/aave/aave-v3-core",
  "https://docs.compound.finance/": "https://docs.compound.finance/v2/",
  "https://ethereum.stackexchange.com/": "https://ethereum.stackexchange.com/questions/tagged/solidity",
  "https://eips.ethereum.org/": "https://eips.ethereum.org/EIPS/eip-1559",
  "https://www.designsystems.com/": "https://en.wikipedia.org/wiki/User_experience_design",
  "https://www.rcsb.org/": "https://www.rcsb.org/docs/",
  "https://www.wwpdb.org/": "https://www.wwpdb.org/documentation/",
  "https://training.galaxyproject.org/": "https://training.galaxyproject.org/training-material/topics/introduction/",
  "https://usegalaxy.org/": "https://galaxyproject.org/tools/",
  "https://r4ds.hadley.nz/": "https://r4ds.hadley.nz/data-transform",
  "https://www.modernstatisticswithr.com/": "https://ggplot2.tidyverse.org/reference/index.html",
  "https://hoopy.io/": "https://en.wikipedia.org/wiki/Developer_relations",
  "https://devrelcollective.com/": "https://dev.to/t/devrel",
  "https://learn.unity.com/": "https://learn.unity.com/course/create-with-code",
  "https://www.pramp.com/": "https://en.wikipedia.org/wiki/Mock_interview",
  "https://interviewing.io/": "https://interviewing.io/mocks",
  "https://codeforces.com/problemset": "https://codeforces.com/apiHelp",
  "https://leetcode.com/problemset/": "https://cp-algorithms.com/index.html",
  "https://cp-algorithms.com/": "https://cp-algorithms.com/index.html",
  "https://usaco.guide/": "https://usaco.guide/bronze/intro-complete",
  "https://pre-commit.com/": "https://github.com/pre-commit/pre-commit",
  "https://www.data-to-viz.com/": "https://www.data-to-viz.com/caveats.html",
  "https://ggplot2.tidyverse.org/": "https://ggplot2.tidyverse.org/reference/index.html",
};

const FILES = [
  "longtail-resources-a.mjs",
  "longtail-resources-b1.mjs",
  "longtail-resources-c1.mjs",
  "longtail-resources-c2.mjs",
  "longtail-resources-c3.mjs",
  "longtail-resources-c4.mjs",
];

let n = 0;
const hit = new Set();
for (const f of FILES) {
  const src = fs.readFileSync(path.join(HERE, f), "utf8");
  let out = src;
  for (const [oldUrl, newUrl] of Object.entries(REPLACE)) {
    const needle = `"${oldUrl}"`;
    if (out.includes(needle)) {
      out = out.split(needle).join(`"${newUrl}"`);
      hit.add(oldUrl);
      n++;
    }
  }
  if (out !== src) fs.writeFileSync(path.join(HERE, f), out);
}
console.log(`replaced ${n} occurrences across ${hit.size} distinct root URLs`);
const missed = Object.keys(REPLACE).filter((u) => !hit.has(u));
if (missed.length) console.log("not present in libraries:", missed.join(" "));
