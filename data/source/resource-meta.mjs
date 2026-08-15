// ─────────────────────────────────────────────────────────────────────────────
// Resource metadata enrichment.
// The curated resource maps store the essentials ({ t, u, k }); at generation
// time we enrich every entry into the full Resource model:
//   { title, url, kind, type, provider, description, difficulty,
//     estimatedTime, isOfficial }
// Provider + isOfficial are derived from the URL domain; type is derived from
// the kind + official flag; description, difficulty and estimatedTime are
// derived from the entry + the node's difficulty. No entry ever ships without
// a complete, display-ready model.
// ─────────────────────────────────────────────────────────────────────────────

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// ── provider registry ────────────────────────────────────────────────────────
// Domain → { name, color } where color is used by the UI for provider avatars.
// Colors are Tailwind classes that exist verbatim in lib/resource-ui.ts.
export const PROVIDER_META = {
  "developer.mozilla.org": { name: "MDN", color: "bg-slate-800 dark:bg-slate-600" },
  "javascript.info": { name: "JavaScript.info", color: "bg-yellow-700 dark:bg-yellow-600" },
  "www.w3schools.com": { name: "W3Schools", color: "bg-green-600 dark:bg-green-500" },
  "www.geeksforgeeks.org": { name: "GeeksforGeeks", color: "bg-emerald-700 dark:bg-emerald-600" },
  "www.freecodecamp.org": { name: "freeCodeCamp", color: "bg-slate-700 dark:bg-slate-500" },
  "docs.python.org": { name: "Python Docs", color: "bg-blue-700 dark:bg-blue-500" },
  "realpython.com": { name: "Real Python", color: "bg-cyan-700 dark:bg-cyan-600" },
  "nodejs.org": { name: "Node.js Docs", color: "bg-green-800 dark:bg-green-600" },
  "www.typescriptlang.org": { name: "TypeScript Docs", color: "bg-blue-800 dark:bg-blue-600" },
  "react.dev": { name: "React Docs", color: "bg-cyan-600 dark:bg-cyan-500" },
  "vuejs.org": { name: "Vue Docs", color: "bg-emerald-600 dark:bg-emerald-500" },
  "angular.dev": { name: "Angular Docs", color: "bg-rose-600 dark:bg-rose-500" },
  "nextjs.org": { name: "Next.js Docs", color: "bg-slate-900 dark:bg-slate-700" },
  "go.dev": { name: "Go Docs", color: "bg-cyan-700 dark:bg-cyan-600" },
  "www.rust-lang.org": { name: "Rust Docs", color: "bg-orange-700 dark:bg-orange-600" },
  "doc.rust-lang.org": { name: "Rust Book", color: "bg-orange-700 dark:bg-orange-600" },
  "docs.oracle.com": { name: "Oracle Docs", color: "bg-red-700 dark:bg-red-600" },
  "docs.docker.com": { name: "Docker Docs", color: "bg-blue-700 dark:bg-blue-600" },
  "kubernetes.io": { name: "Kubernetes Docs", color: "bg-blue-800 dark:bg-blue-500" },
  "docs.github.com": { name: "GitHub Docs", color: "bg-slate-800 dark:bg-slate-600" },
  "git-scm.com": { name: "Git Docs", color: "bg-orange-800 dark:bg-orange-600" },
  "www.postgresql.org": { name: "PostgreSQL Docs", color: "bg-blue-800 dark:bg-blue-600" },
  "www.mongodb.com": { name: "MongoDB Docs", color: "bg-green-800 dark:bg-green-600" },
  "dev.mysql.com": { name: "MySQL Docs", color: "bg-cyan-800 dark:bg-cyan-600" },
  "learn.microsoft.com": { name: "Microsoft Learn", color: "bg-blue-600 dark:bg-blue-500" },
  "docs.microsoft.com": { name: "Microsoft Learn", color: "bg-blue-600 dark:bg-blue-500" },
  "aws.amazon.com": { name: "AWS", color: "bg-orange-600 dark:bg-orange-500" },
  "docs.aws.amazon.com": { name: "AWS Docs", color: "bg-orange-600 dark:bg-orange-500" },
  "cloud.google.com": { name: "Google Cloud", color: "bg-blue-600 dark:bg-blue-400" },
  "www.tensorflow.org": { name: "TensorFlow Docs", color: "bg-orange-600 dark:bg-orange-500" },
  "pytorch.org": { name: "PyTorch Docs", color: "bg-red-700 dark:bg-red-600" },
  "scikit-learn.org": { name: "scikit-learn", color: "bg-orange-700 dark:bg-orange-600" },
  "huggingface.co": { name: "Hugging Face", color: "bg-amber-600 dark:bg-amber-500" },
  "kaggle.com": { name: "Kaggle", color: "bg-sky-700 dark:bg-sky-600" },
  "colab.research.google.com": { name: "Google Colab", color: "bg-amber-600 dark:bg-amber-500" },
  "leetcode.com": { name: "LeetCode", color: "bg-orange-700 dark:bg-orange-500" },
  "neetcode.io": { name: "NeetCode", color: "bg-slate-700 dark:bg-slate-500" },
  "www.hackerrank.com": { name: "HackerRank", color: "bg-green-700 dark:bg-green-600" },
  "www.codewars.com": { name: "Codewars", color: "bg-red-700 dark:bg-red-600" },
  "exercism.org": { name: "Exercism", color: "bg-indigo-700 dark:bg-indigo-600" },
  "codeforces.com": { name: "Codeforces", color: "bg-blue-700 dark:bg-blue-500" },
  "www.codechef.com": { name: "CodeChef", color: "bg-amber-700 dark:bg-amber-600" },
  "codingbat.com": { name: "CodingBat", color: "bg-slate-600 dark:bg-slate-500" },
  "www.frontendmentor.io": { name: "Frontend Mentor", color: "bg-indigo-600 dark:bg-indigo-500" },
  "codepen.io": { name: "CodePen", color: "bg-slate-700 dark:bg-slate-500" },
  "jsfiddle.net": { name: "JSFiddle", color: "bg-sky-700 dark:bg-sky-600" },
  "cssbattle.dev": { name: "CSSBattle", color: "bg-rose-600 dark:bg-rose-500" },
  "sqlbolt.com": { name: "SQLBolt", color: "bg-emerald-700 dark:bg-emerald-600" },
  "learngitbranching.js.org": { name: "Learn Git Branching", color: "bg-amber-600 dark:bg-amber-500" },
  "play-with-docker.com": { name: "Play with Docker", color: "bg-blue-700 dark:bg-blue-600" },
  "killercoda.com": { name: "Killercoda", color: "bg-red-700 dark:bg-red-600" },
  "portswigger.net": { name: "PortSwigger", color: "bg-slate-800 dark:bg-slate-600" },
  "tryhackme.com": { name: "TryHackMe", color: "bg-red-800 dark:bg-red-600" },
  "www.hackthebox.com": { name: "Hack The Box", color: "bg-emerald-800 dark:bg-emerald-600" },
  "overthewire.org": { name: "OverTheWire", color: "bg-slate-900 dark:bg-slate-700" },
  "owasp.org": { name: "OWASP", color: "bg-blue-900 dark:bg-blue-700" },
  "www.youtube.com": { name: "YouTube", color: "bg-red-700 dark:bg-red-600" },
  "youtu.be": { name: "YouTube", color: "bg-red-700 dark:bg-red-600" },
  "www.coursera.org": { name: "Coursera", color: "bg-blue-700 dark:bg-blue-500" },
  "www.edx.org": { name: "edX", color: "bg-slate-700 dark:bg-slate-500" },
  "cs50.harvard.edu": { name: "CS50", color: "bg-red-700 dark:bg-red-600" },
  "www.theodinproject.com": { name: "The Odin Project", color: "bg-slate-800 dark:bg-slate-600" },
  "www.khanacademy.org": { name: "Khan Academy", color: "bg-sky-700 dark:bg-sky-600" },
  "web.dev": { name: "web.dev", color: "bg-blue-600 dark:bg-blue-500" },
  "developer.chrome.com": { name: "Chrome DevTools", color: "bg-sky-700 dark:bg-sky-600" },
  "developer.apple.com": { name: "Apple Developer", color: "bg-slate-800 dark:bg-slate-600" },
  "kotlinlang.org": { name: "Kotlin Docs", color: "bg-purple-700 dark:bg-purple-500" },
  "developer.android.com": { name: "Android Developers", color: "bg-green-700 dark:bg-green-600" },
  "flutter.dev": { name: "Flutter Docs", color: "bg-sky-600 dark:bg-sky-500" },
  "swift.org": { name: "Swift Docs", color: "bg-orange-600 dark:bg-orange-500" },
  "en.wikipedia.org": { name: "Wikipedia", color: "bg-slate-500 dark:bg-slate-400" },
  "www.ibm.com": { name: "IBM", color: "bg-blue-800 dark:bg-blue-600" },
  "www.digitalocean.com": { name: "DigitalOcean", color: "bg-blue-700 dark:bg-blue-500" },
  "stackoverflow.com": { name: "Stack Overflow", color: "bg-orange-700 dark:bg-orange-600" },
  "github.com": { name: "GitHub", color: "bg-slate-800 dark:bg-slate-600" },
  "www.javatpoint.com": { name: "JavaTpoint", color: "bg-red-700 dark:bg-red-600" },
  "www.programiz.com": { name: "Programiz", color: "bg-teal-700 dark:bg-teal-600" },
  "www.learn-c.org": { name: "Learn-C", color: "bg-blue-800 dark:bg-blue-600" },
  "eloquentjavascript.net": { name: "Eloquent JS", color: "bg-slate-800 dark:bg-slate-600" },
  "missing.csail.mit.edu": { name: "Missing Semester", color: "bg-rose-700 dark:bg-rose-600" },
  "www.themuse.com": { name: "The Muse", color: "bg-rose-600 dark:bg-rose-500" },
  "hbr.org": { name: "Harvard Business Review", color: "bg-slate-800 dark:bg-slate-600" },
  "www.nngroup.com": { name: "Nielsen Norman Group", color: "bg-amber-700 dark:bg-amber-600" },
  "lawsofux.com": { name: "Laws of UX", color: "bg-indigo-700 dark:bg-indigo-600" },
  "www.indiabix.com": { name: "IndiaBix", color: "bg-emerald-700 dark:bg-emerald-600" },
  "testbook.com": { name: "Testbook", color: "bg-orange-700 dark:bg-orange-600" },
  "www.pramp.com": { name: "Pramp", color: "bg-violet-700 dark:bg-violet-600" },
  "interviewing.io": { name: "Interviewing.io", color: "bg-purple-700 dark:bg-purple-600" },
  "www.interviewbit.com": { name: "InterviewBit", color: "bg-sky-700 dark:bg-sky-600" },
  "www.levels.fyi": { name: "Levels.fyi", color: "bg-slate-700 dark:bg-slate-500" },
  "www.glassdoor.com": { name: "Glassdoor", color: "bg-green-700 dark:bg-green-600" },
  "www.linkedin.com": { name: "LinkedIn", color: "bg-blue-700 dark:bg-blue-600" },
  "careers.google.com": { name: "Google Careers", color: "bg-blue-600 dark:bg-blue-500" },
  "www.merckmanuals.com": { name: "Merck Manual", color: "bg-sky-800 dark:bg-sky-700" },
  "pubmed.ncbi.nlm.nih.gov": { name: "PubMed", color: "bg-blue-800 dark:bg-blue-600" },
  "ocw.mit.edu": { name: "MIT OpenCourseWare", color: "bg-slate-700 dark:bg-slate-500" },
  "www.cloudflare.com": { name: "Cloudflare", color: "bg-orange-700 dark:bg-orange-600" },
  "www.postman.com": { name: "Postman", color: "bg-orange-700 dark:bg-orange-600" },
  "dart.dev": { name: "Dart Docs", color: "bg-sky-700 dark:bg-sky-600" },
  "spring.io": { name: "Spring", color: "bg-green-700 dark:bg-green-600" },
  "docs.spring.io": { name: "Spring Docs", color: "bg-green-700 dark:bg-green-600" },
  "laravel.com": { name: "Laravel Docs", color: "bg-red-700 dark:bg-red-600" },
  "www.djangoproject.com": { name: "Django Docs", color: "bg-green-800 dark:bg-green-600" },
  "docs.djangoproject.com": { name: "Django Docs", color: "bg-green-800 dark:bg-green-600" },
  "fastapi.tiangolo.com": { name: "FastAPI", color: "bg-teal-700 dark:bg-teal-600" },
  "graphql.org": { name: "GraphQL", color: "bg-rose-600 dark:bg-rose-500" },
  "www.sqlite.org": { name: "SQLite Docs", color: "bg-sky-800 dark:bg-sky-600" },
  "www.terraform.io": { name: "Terraform", color: "bg-purple-700 dark:bg-purple-500" },
  "developer.hashicorp.com": { name: "HashiCorp Docs", color: "bg-purple-700 dark:bg-purple-500" },
  "www.ansible.com": { name: "Ansible", color: "bg-red-700 dark:bg-red-600" },
  "docs.ansible.com": { name: "Ansible Docs", color: "bg-red-700 dark:bg-red-600" },
  "www.jenkins.io": { name: "Jenkins", color: "bg-slate-700 dark:bg-slate-500" },
  "grafana.com": { name: "Grafana", color: "bg-orange-700 dark:bg-orange-600" },
  "prometheus.io": { name: "Prometheus", color: "bg-orange-700 dark:bg-orange-600" },
  "www.solidworks.com": { name: "SOLIDWORKS", color: "bg-red-800 dark:bg-red-700" },
  "help.solidworks.com": { name: "SOLIDWORKS Help", color: "bg-red-800 dark:bg-red-700" },
  "www.autodesk.com": { name: "Autodesk", color: "bg-red-700 dark:bg-red-600" },
  "help.autodesk.com": { name: "Autodesk Docs", color: "bg-red-700 dark:bg-red-600" },
  "knowledge.autodesk.com": { name: "Autodesk Knowledge", color: "bg-red-700 dark:bg-red-600" },
  "www.mathworks.com": { name: "MathWorks", color: "bg-amber-700 dark:bg-amber-600" },
  "ansyshelp.ansys.com": { name: "ANSYS Help", color: "bg-amber-700 dark:bg-amber-600" },
  "www.ansys.com": { name: "ANSYS", color: "bg-amber-700 dark:bg-amber-600" },
  "help.3ds.com": { name: "Dassault Systèmes", color: "bg-blue-700 dark:bg-blue-600" },
  "www.3ds.com": { name: "Dassault Systèmes", color: "bg-blue-700 dark:bg-blue-600" },
  "support.ptc.com": { name: "PTC Support", color: "bg-red-700 dark:bg-red-600" },
  "www.ptc.com": { name: "PTC", color: "bg-red-700 dark:bg-red-600" },
  "wiki.csiamerica.com": { name: "CSI Wiki", color: "bg-slate-700 dark:bg-slate-600" },
  "www.csiamerica.com": { name: "CSI", color: "bg-slate-700 dark:bg-slate-600" },
  "docs.bentley.com": { name: "Bentley Docs", color: "bg-slate-700 dark:bg-slate-600" },
  "www.bentley.com": { name: "Bentley", color: "bg-slate-700 dark:bg-slate-600" },
  "help.sketchup.com": { name: "SketchUp Help", color: "bg-amber-600 dark:bg-amber-500" },
  "www.sketchup.com": { name: "SketchUp", color: "bg-amber-600 dark:bg-amber-500" },
  "pro.arcgis.com": { name: "ArcGIS Pro Help", color: "bg-sky-700 dark:bg-sky-600" },
  "www.esri.com": { name: "Esri", color: "bg-sky-700 dark:bg-sky-600" },
  "docs.qgis.org": { name: "QGIS Docs", color: "bg-green-700 dark:bg-green-600" },
  "qgis.org": { name: "QGIS", color: "bg-green-700 dark:bg-green-600" },
  "www.ni.com": { name: "NI", color: "bg-red-700 dark:bg-red-600" },
  "www.plcdev.com": { name: "PLCdev", color: "bg-slate-700 dark:bg-slate-600" },
  "www.inductiveautomation.com": { name: "Inductive Automation", color: "bg-emerald-700 dark:bg-emerald-600" },
  "www.figma.com": { name: "Figma", color: "bg-purple-700 dark:bg-purple-500" },
  "helpx.adobe.com": { name: "Adobe Help", color: "bg-red-700 dark:bg-red-600" },
  "www.blender.org": { name: "Blender", color: "bg-orange-700 dark:bg-orange-600" },
  "docs.blender.org": { name: "Blender Docs", color: "bg-orange-700 dark:bg-orange-600" },
  "www.davinciresolve.com": { name: "DaVinci Resolve", color: "bg-slate-700 dark:bg-slate-500" },
  "support.microsoft.com": { name: "Microsoft Support", color: "bg-blue-600 dark:bg-blue-500" },
  "www.notion.com": { name: "Notion", color: "bg-slate-800 dark:bg-slate-600" },
  "zapier.com": { name: "Zapier", color: "bg-orange-700 dark:bg-orange-600" },
  "www.splunk.com": { name: "Splunk", color: "bg-emerald-700 dark:bg-emerald-600" },
  "www.elastic.co": { name: "Elastic", color: "bg-teal-700 dark:bg-teal-600" },
  "www.atlassian.com": { name: "Atlassian", color: "bg-blue-700 dark:bg-blue-600" },
  "www.selenium.dev": { name: "Selenium", color: "bg-teal-700 dark:bg-teal-600" },
  "www.cypress.io": { name: "Cypress", color: "bg-slate-800 dark:bg-slate-600" },
  "playwright.dev": { name: "Playwright", color: "bg-green-700 dark:bg-green-600" },
  "jestjs.io": { name: "Jest", color: "bg-rose-700 dark:bg-rose-600" },
  "docs.pytest.org": { name: "pytest", color: "bg-blue-800 dark:bg-blue-600" },
  "eslint.org": { name: "ESLint", color: "bg-indigo-700 dark:bg-indigo-500" },
  "prettier.io": { name: "Prettier", color: "bg-sky-700 dark:bg-sky-600" },
  "www.shellcheck.net": { name: "ShellCheck", color: "bg-slate-700 dark:bg-slate-500" },
  "quickref.me": { name: "QuickRef", color: "bg-teal-700 dark:bg-teal-600" },
  "www.bigocheatsheet.com": { name: "Big-O Cheat Sheet", color: "bg-slate-700 dark:bg-slate-500" },
  "www.keybr.com": { name: "Keybr", color: "bg-sky-700 dark:bg-sky-600" },
  "apps.ankiweb.net": { name: "Anki", color: "bg-sky-800 dark:bg-sky-600" },
  "thecrashcourse.com": { name: "CrashCourse", color: "bg-sky-700 dark:bg-sky-600" },
  "www.vedicmaths.org": { name: "Vedic Maths", color: "bg-orange-700 dark:bg-orange-600" },
  "www.numbeo.com": { name: "Numbeo", color: "bg-emerald-700 dark:bg-emerald-600" },
  "www.nerdwallet.com": { name: "NerdWallet", color: "bg-cyan-700 dark:bg-cyan-600" },
  "weworkremotely.com": { name: "We Work Remotely", color: "bg-indigo-600 dark:bg-indigo-500" },
  "www.indeed.com": { name: "Indeed", color: "bg-blue-700 dark:bg-blue-600" },
  "www.jobscan.co": { name: "Jobscan", color: "bg-violet-700 dark:bg-violet-600" },
  "www.teamblind.com": { name: "Blind", color: "bg-slate-800 dark:bg-slate-600" },
  "news.ycombinator.com": { name: "Hacker News", color: "bg-orange-700 dark:bg-orange-600" },
  "www.makeareadme.com": { name: "Make a README", color: "bg-emerald-700 dark:bg-emerald-600" },
  "www.educative.io": { name: "Educative", color: "bg-purple-700 dark:bg-purple-600" },
  "www.udemy.com": { name: "Udemy", color: "bg-purple-700 dark:bg-purple-600" },
  "www.pluralsight.com": { name: "Pluralsight", color: "bg-red-700 dark:bg-red-600" },
  "www.datacamp.com": { name: "DataCamp", color: "bg-green-700 dark:bg-green-600" },
  "www.cisco.com": { name: "Cisco", color: "bg-blue-700 dark:bg-blue-600" },
  "www.splunk.com": { name: "Splunk", color: "bg-emerald-700 dark:bg-emerald-600" },
  "start.spring.io": { name: "Spring Initializr", color: "bg-green-700 dark:bg-green-600" },
  "onlinelibrary.wiley.com": { name: "Wiley", color: "bg-amber-700 dark:bg-amber-600" },
  "www.owasp.org": { name: "OWASP", color: "bg-blue-900 dark:bg-blue-700" },
};

// Longest-first so docs.aws.amazon.com wins over aws.amazon.com etc.
const DOMAIN_KEYS = Object.keys(PROVIDER_META).sort((a, b) => b.length - a.length);

export function providerFor(url) {
  try {
    const { hostname } = new URL(url);
    const host = hostname.replace(/^www\./, "");
    for (const key of DOMAIN_KEYS) {
      const bare = key.replace(/^www\./, "");
      if (host === bare || host.endsWith("." + bare)) {
        return PROVIDER_META[key];
      }
    }
    // fall back to a readable hostname
    return {
      name: host
        .split(".")
        .slice(0, -1)
        .join(".")
        .split("-")
        .map(cap)
        .join(" ") || host,
      color: "bg-slate-600 dark:bg-slate-500",
    };
  } catch {
    return { name: "Web", color: "bg-slate-600 dark:bg-slate-500" };
  }
}

// ── official documentation / vendor platform domains ────────────────────────
const OFFICIAL_PREFIXES = [
  "developer.mozilla.org",
  "docs.python.org",
  "nodejs.org",
  "www.typescriptlang.org",
  "react.dev",
  "vuejs.org",
  "angular.dev",
  "nextjs.org",
  "go.dev",
  "doc.rust-lang.org",
  "www.rust-lang.org",
  "docs.oracle.com",
  "docs.docker.com",
  "kubernetes.io",
  "docs.github.com",
  "git-scm.com",
  "www.postgresql.org",
  "www.mongodb.com",
  "dev.mysql.com",
  "www.sqlite.org",
  "learn.microsoft.com",
  "docs.microsoft.com",
  "docs.aws.amazon.com",
  "cloud.google.com",
  "www.tensorflow.org",
  "pytorch.org",
  "scikit-learn.org",
  "huggingface.co",
  "docs.djangoproject.com",
  "fastapi.tiangolo.com",
  "spring.io",
  "docs.spring.io",
  "laravel.com",
  "graphql.org",
  "www.terraform.io",
  "developer.hashicorp.com",
  "docs.ansible.com",
  "www.jenkins.io",
  "www.elastic.co",
  "prometheus.io",
  "kotlinlang.org",
  "developer.android.com",
  "flutter.dev",
  "swift.org",
  "developer.apple.com",
  "dart.dev",
  "help.autodesk.com",
  "knowledge.autodesk.com",
  "help.solidworks.com",
  "www.mathworks.com",
  "ansyshelp.ansys.com",
  "www.ansys.com",
  "help.3ds.com",
  "www.3ds.com",
  "support.ptc.com",
  "www.ptc.com",
  "wiki.csiamerica.com",
  "www.csiamerica.com",
  "docs.bentley.com",
  "www.bentley.com",
  "help.sketchup.com",
  "www.sketchup.com",
  "pro.arcgis.com",
  "www.esri.com",
  "docs.qgis.org",
  "qgis.org",
  "www.ni.com",
  "www.plcdev.com",
  "www.inductiveautomation.com",
  "docs.blender.org",
  "helpx.adobe.com",
  "developer.chrome.com",
  "web.dev",
  "www.cloudflare.com",
  "www.postman.com",
  "www.selenium.dev",
  "www.cypress.io",
  "playwright.dev",
  "jestjs.io",
  "docs.pytest.org",
  "eslint.org",
  "prettier.io",
  "cs50.harvard.edu",
  "ocw.mit.edu",
  "missing.csail.mit.edu",
  "owasp.org",
  "www.owasp.org",
];

export function isOfficialUrl(url) {
  try {
    const { hostname } = new URL(url);
    const host = hostname.replace(/^www\./, "");
    return OFFICIAL_PREFIXES.some((p) => {
      const bare = p.replace(/^www\./, "");
      return host === bare || host.endsWith("." + bare);
    });
  } catch {
    return false;
  }
}

// ── kind → human type ────────────────────────────────────────────────────────
export function typeFor(kind, url, title = "") {
  const t = title.toLowerCase();
  if (/cheat ?sheet|reference|glossary|handbook|api reference|status codes/i.test(t)) return "Cheat Sheet";
  switch (kind) {
    case "docs":
      return isOfficialUrl(url) ? "Official Documentation" : "Reference Documentation";
    case "course":
      if (/tutorial/i.test(t)) return "Beginner Tutorial";
      if (/onramp|learn|academy|bootcamp|curriculum/i.test(t)) return "Course";
      return "Course";
    case "video":
      return "Video";
    case "article":
      return "Article";
    case "book":
      return "Book";
    case "practice":
      return "Practice";
    case "cheatsheet":
      return "Cheat Sheet";
    case "repo":
      return "Repository";
    case "community":
      return "Community";
    case "certification":
      return "Certification";
    default:
      return "Article";
  }
}

// ── difficulty for a learning resource ───────────────────────────────────────
// Default to the node's difficulty; entries may override via title keywords.
export function difficultyFor(title, nodeDifficulty) {
  const t = title.toLowerCase();
  const base = nodeDifficulty === "Beginner" ? "Beginner" : nodeDifficulty === "Advanced" || nodeDifficulty === "Expert" ? "Advanced" : "Intermediate";
  if (/beginner|intro|getting started|101|first steps|basics|fundamental|learn the/i.test(t)) return "Beginner";
  if (/advanced|deep dive|expert|in depth|mastering/i.test(t)) return "Advanced";
  if (/intermediate/i.test(t)) return "Intermediate";
  return base;
}

// ── estimated reading/doing time by kind ─────────────────────────────────────
export function estimateFor(kind, nodeTime) {
  const time = (nodeTime || "").toLowerCase();
  const match = time.match(/(\d+)\s*[-–]\s*(\d+)\s*(hours?|weeks?|months?)/);
  if (match && match[3].startsWith("h")) {
    return `${match[1]}–${match[2]} hours`;
  }
  switch (kind) {
    case "docs":
    case "cheatsheet":
      return "15–30 min";
    case "article":
      return "10–20 min";
    case "video":
      return "10–30 min";
    case "book":
      return "1–3 weeks";
    case "course":
      return "3–6 hours";
    case "practice":
      return "30–60 min";
    default:
      return "30–60 min";
  }
}

// ── description ──────────────────────────────────────────────────────────────
// Readable, concrete descriptions built from title + provider + kind so every
// card explains what the learner will actually do.
const KIND_DESC = {
  docs: "official reference",
  course: "structured course",
  video: "video walkthrough",
  article: "in-depth article",
  book: "book",
  practice: "hands-on exercises",
  cheatsheet: "quick reference",
  repo: "open-source repository",
  community: "community resource",
  certification: "certification",
};

export function describeResource(title, provider, kind, topicLabel) {
  const label = topicLabel ? topicLabel.replace(/^Understand:\s*/i, "").trim() : "";
  // The part after the em-dash is usually the topic (“SQL JOINs — W3Schools”);
  // but when the title is “Topic — Provider” the suffix IS the provider, so
  // fall back to the topic label instead of echoing the vendor name.
  let specific = title.split(/\s*[–—]\s*/).slice(-1)[0]?.trim() || label;
  if (provider && specific.toLowerCase().startsWith(provider.toLowerCase())) {
    specific = label || title;
  }
  const kindPhrase = KIND_DESC[kind] || "resource";
  if (provider === "MDN" || provider === "W3Schools" || provider === "GeeksforGeeks") {
    return `${specific} — explained by ${provider} with examples you can run as you learn.`;
  }
  if (provider === "LeetCode" || provider === "HackerRank" || provider === "NeetCode" || provider === "Codewars" || provider === "Exercism") {
    return `${specific} — solve curated ${label ? `“${label.toLowerCase()}” ` : ""}challenges on ${provider} and build muscle memory.`;
  }
  if (kind === "book") return `Read ${title} to build deep, durable knowledge of ${specific || "the topic"}.`;
  if (kind === "video") return `Watch a ${specific || label || "focused"} video walkthrough — ideal for seeing ${specific ? "it" : "the topic"} in action.`;
  if (kind === "cheatsheet") return `A quick ${specific || "reference"} — keep it open while you work.`;
  if (kind === "practice") return `Interactive ${specific || "practice"} — apply what you just learned immediately.`;
  return `${provider} — ${kindPhrase} for ${specific || label || "this topic"}.`;
}

// ── normalize labels the same way the generator does ─────────────────────────
export function normLabel(s) {
  return String(s)
    .replace(/[^a-z0-9\s&]+/gi, " ")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
