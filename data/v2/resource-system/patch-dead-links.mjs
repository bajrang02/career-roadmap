// Dead-link cleanup: swap every remaining 404 URL for a probe-verified live
// page, and delete entries whose link could not be rescued (safe: the link
// audit confirmed no node depends on a dead link alone — every affected bucket
// keeps at least one live resource).
import fs from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const V2 = path.join(HERE, "..");

const FILES = [
  path.join(HERE, "build-resource-system.mjs"),
  path.join(HERE, "concept-resources.mjs"),
  path.join(HERE, "concept-batch2.mjs"),
  path.join(HERE, "new-resources.mjs"),
  ...["a", "b1", "c1", "c2", "c3", "c4"].map((p) => path.join(HERE, `longtail-resources-${p}.mjs`)),
];

const REPLACE = {
  "https://cloud.google.com/sql/docs/mysql/backup-recovery": "https://cloud.google.com/sql/docs/mysql/backup-recovery/backups",
  "https://cloud.google.com/sql/docs/mysql/migrate": "https://cloud.google.com/database-migration/docs/mysql/quickstart",
  "https://cp-algorithms.com/algorithm/binary_search.html": "https://cp-algorithms.com/num_methods/binary_search.html",
  "https://cp-algorithms.com/data_structures/heap.html": "https://en.cppreference.com/w/cpp/container/priority_queue",
  "https://developer.apple.com/documentation/arkit/tracking_the_device_orientation_and_position": "https://developer.apple.com/documentation/arkit/arsession",
  "https://docs.aws.amazon.com/twinmaker/": "https://docs.aws.amazon.com/iot-twinmaker/latest/guide/what-is-twinmaker.html",
  "https://docs.llamaindex.ai/en/stable/module_guides/models/multimodal/": "https://docs.llamaindex.ai/en/stable/module_guides/models/multi_modal/",
  "https://docs.trychroma.com/getting-started": "https://docs.trychroma.com/docs/overview/getting-started",
  "https://docs.unity3d.com/Manual/MultiplayerInformation.html": "https://docs-multiplayer.unity3d.com/netcode/current/about/",
  "https://docs.unity3d.com/Manual/xr-optimization.html": "https://docs.unity3d.com/Manual/XR.html",
  "https://en.wikipedia.org/wiki/Metadata_management_and_data_catalogs": "https://en.wikipedia.org/wiki/Data_catalog",
  "https://github.com/fdefelici/libsrt": "https://github.com/Haivision/srt",
  "https://learn.microsoft.com/en-us/azure/architecture/data-guide/big-data/stream-processing": "https://learn.microsoft.com/en-us/azure/architecture/data-guide/big-data/real-time-processing",
  "https://learn.microsoft.com/en-us/azure/architecture/example-scenario/data/enterprise-bi-synapse": "https://learn.microsoft.com/en-us/azure/architecture/example-scenario/data/data-warehouse",
  "https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-financial-reporting": "https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-overview",
  "https://learn.microsoft.com/en-us/power-bi/fundamentals/service-compare-looker-tableau": "https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-overview",
  "https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/mock-with-api-examples/": "https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/setting-up-mock/",
  "https://platform.openai.com/docs/guides/evaluations": "https://platform.openai.com/docs/guides/evals",
  "https://usaco.guide/gold/DSU?lang=cpp": "https://usaco.guide/gold/dsu",
  "https://usaco.guide/gold/graph-traversal?lang=cpp": "https://usaco.guide/gold/toposort",
  "https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/17-malloc.pdf": "https://csapp.cs.cmu.edu/3e/students.html",
  "https://www.designgurus.io/course-play/grokking-the-coding-interview/doc/two-heaps": "https://www.designgurus.io/course/grokking-the-coding-interview",
  "https://www.ebi.ac.uk/training/online/courses/clustal-omega/": "https://www.ebi.ac.uk/training/online/",
  "https://www.ebi.ac.uk/training/online/courses/phylogenetics/": "https://www.ebi.ac.uk/training/online/",
  "https://www.malware-traffic-analysis.net/training.html": "https://www.malware-traffic-analysis.net/training-exercises.html",
  "https://www.pinecone.io/learn/indexes/": "https://www.pinecone.io/learn/vector-indexes/",
};

// Unrescuable after two probe rounds — removed rather than shipped dead.
const DROP = [
  "https://cloud.google.com/architecture/data-pipelines",
  "https://cloud.google.com/architecture/transformers-on-gcp-explained",
  "https://docs.unity3d.com/Manual/Rendering.html",
  "https://learn.microsoft.com/en-us/azure/architecture/example-scenario/ai/predictive-maintenance-iot",
  "https://learn.microsoft.com/en-us/power-bi/create-reports/service-real-time-dashboards",
  "https://usaco.guide/gold/intro-backtracking?lang=cpp",
  "https://usaco.guide/gold/time-complexity?lang=cpp",
  "https://wiki.postgresql.org/wiki/Backup_And_Restore_Basics",
  "https://www.fda.gov/food",
  "https://www.fda.gov/medical-devices",
  "https://www.geeksforgeeks.org/data-warehouse-interview-questions/",
  "https://www.geeksforgeeks.org/makefile-in-c/amp/",
  "https://www.geeksforgeeks.org/multicore-multiprocessor-systems/",
  "https://www.geeksforgeeks.org/web-api-design-interview-questions/",
  "https://www.linuxserver.io/blog/2020-08-21-running-gui-apps-in-docker",
];

const dropSet = new Set(DROP);
let replaced = 0;
let dropped = 0;

for (const file of FILES) {
  if (!fs.existsSync(file)) continue;
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const out = [];
  for (const line of lines) {
    const m = line.match(/url:\s*"([^"]+)"/);
    if (m && dropSet.has(m[1])) {
      dropped++;
      continue; // remove the whole entry line
    }
    let next = line;
    for (const [oldUrl, newUrl] of Object.entries(REPLACE)) {
      if (next.includes(`"${oldUrl}"`)) {
        next = next.split(`"${oldUrl}"`).join(`"${newUrl}"`);
        replaced++;
      }
    }
    out.push(next);
  }
  fs.writeFileSync(file, out.join("\n"));
}

console.log(`replaced ${replaced} occurrences · dropped ${dropped} dead entries`);
