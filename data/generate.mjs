// ─────────────────────────────────────────────────────────────────────────────
// Roadmap data generator.
// Composes careers (careers.mjs) + skeletons (skeletons.mjs / nonit.mjs) +
// topic knowledge (topic-knowledge.mjs) into production-ready roadmap JSON.
// Run: node data/generate.mjs  →  writes data/generated/
// ─────────────────────────────────────────────────────────────────────────────
import { writeFileSync, mkdirSync, existsSync, readdirSync, readFileSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CAREERS } from "./source/careers.mjs";
import { NEW_CAREERS as PROFESSIONAL_CAREERS } from "./source/professional-careers.mjs";
import { CAREER_DOMAINS, CAREER_DOMAIN_MAP, NEW_CAREERS as TECH_CAREERS } from "./source/career-domains.mjs";
import { SKELETONS, B_SOFT } from "./source/skeletons.mjs";
import { NON_IT_SKELETONS } from "./source/nonit.mjs";
import { PROFESSIONAL_SKELETONS } from "./source/professional.mjs";
import { KNOWLEDGE, MATCHES } from "./source/topic-knowledge.mjs";
import { CURATED_SUBTOPICS } from "./source/subtopics.mjs";
import { LEXICON, fillLexicon, composeLabelAware } from "./source/topic-lexicon.mjs";
import { TOPIC_RESOURCES } from "./source/topic-resources.mjs";
import { SKILLS, SKILL_CATEGORIES, SKILL_CATEGORY_MAP } from "./source/skills.mjs";
import { SKILL_SKELETON_BUILDERS } from "./source/skill-skeletons.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "generated");

// Career domain lookup: id → label.
const DOMAIN_LABEL = Object.fromEntries(CAREER_DOMAINS.map((d) => [d.id, d.label]));

// Only careers present in CAREER_DOMAIN_MAP are kept (this is the removal
// keep-list). New technical careers from the brief are merged in, and each
// kept career carries its grouping domain.
const ALL_CAREERS = [...CAREERS, ...PROFESSIONAL_CAREERS, ...TECH_CAREERS]
  .filter((c) => CAREER_DOMAIN_MAP[c.slug])
  .map((c) => ({ ...c, domain: DOMAIN_LABEL[CAREER_DOMAIN_MAP[c.slug]] ?? "Other" }));
const ALL_SKELETONS = { ...SKELETONS, ...NON_IT_SKELETONS, ...PROFESSIONAL_SKELETONS };

// ── small utils ──────────────────────────────────────────────────────────────
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-");

let counter = 0;
const hashId = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  counter += 1;
  return (h >>> 0).toString(36) + "-" + counter.toString(36);
};

const lookup = (label) => {
  const slug = slugify(label);
  const exact = KNOWLEDGE[slug];
  if (exact) return { kind: "exact", k: exact };
  const lex = LEXICON[slug];
  if (lex) return { kind: "lexicon", k: lex };
  for (const m of MATCHES) {
    if (m.re.test(label)) return { kind: "match", k: m.k };
  }
  return { kind: "none", k: null };
};

// Fallback resource categories so even generated topics get real, useful links.
const FALLBACK_CATEGORIES = [
  { re: /interview/i, res: [{ t: "Interview preparation guide", u: "https://www.interviewbit.com/", k: "practice" }, { t: "Common interview questions", u: "https://github.com/priyankavergadia/technical-interview-preparation", k: "repo" }] },
  { re: /resume|linkedin|portfolio|job|salary/i, res: [{ t: "Resume guide — Google", u: "https://careers.google.com/how-we-hire/resume-tips/", k: "article" }, { t: "LinkedIn optimization guide", u: "https://www.linkedin.com/business/talent/blog", k: "article" }, { t: "Levels.fyi — salary data", u: "https://www.levels.fyi/", k: "practice" }] },
  { re: /practice|leetcode|problems|coding/i, res: [{ t: "LeetCode", u: "https://leetcode.com/", k: "practice" }, { t: "HackerRank", u: "https://www.hackerrank.com/", k: "practice" }, { t: "NeetCode roadmap", u: "https://neetcode.io/roadmap", k: "practice" }] },
  { re: /vs code|editor/i, res: [{ t: "VS Code docs", u: "https://code.visualstudio.com/docs", k: "docs" }, { t: "VS Code in 100 seconds", u: "https://www.youtube.com/watch?v=KMxo3T_MTvY", k: "video" }] },
  { re: /devtools|browser/i, res: [{ t: "Chrome DevTools docs", u: "https://developer.chrome.com/docs/devtools", k: "docs" }, { t: "DevTools in 100 seconds", u: "https://www.youtube.com/watch?v=gTVpBwqoNfs", k: "video" }] },
  { re: /terminal|shell|command/i, res: [{ t: "The Missing Semester", u: "https://missing.csail.mit.edu/", k: "course" }, { t: "Linux command line cheat sheet", u: "https://quickref.me/linux", k: "cheatsheet" }] },
  { re: /bash|scripting/i, res: [{ t: "Bash scripting guide", u: "https://www.gnu.org/software/bash/manual/", k: "docs" }, { t: "ShellCheck (linter)", u: "https://www.shellcheck.net/", k: "practice" }] },
  { re: /certification|exam|license/i, res: [{ t: "Certification paths overview", u: "https://www.coursera.org/", k: "course" }, { t: "Exam preparation resources", u: "https://www.testbook.com/", k: "practice" }] },
  { re: /current affairs|general awareness|gk/i, res: [{ t: "PIB (Press Information Bureau)", u: "https://pib.gov.in/", k: "docs" }, { t: "Current affairs daily", u: "https://www.insightsonindia.com/", k: "article" }] },
  { re: /strategy|planning|roadmap/i, res: [{ t: "Strategy frameworks — HBR", u: "https://hbr.org/", k: "article" }, { t: "The Lean Startup (book)", u: "https://theleanstartup.com/", k: "book" }] },
  { re: /communication|leadership|soft|negotiation|management/i, res: [{ t: "Crucial Conversations (book)", u: "https://www.crucialconversations.com/", k: "book" }, { t: "freeCodeCamp career tips", u: "https://www.freecodecamp.org/news/tag/careers/", k: "article" }] },
  { re: /writing|drafting|documentation|report/i, res: [{ t: "Google technical writing courses", u: "https://developers.google.com/tech-writing", k: "course" }, { t: "Grammarly (editor)", u: "https://www.grammarly.com/", k: "practice" }] },
  { re: /mock|aptitude|reasoning/i, res: [{ t: "IndiaBix practice", u: "https://www.indiabix.com/", k: "practice" }, { t: "Testbook mock tests", u: "https://testbook.com/", k: "practice" }] },
  { re: /design|principles|typography|color/i, res: [{ t: "Laws of UX", u: "https://lawsofux.com/", k: "article" }, { t: "Nielsen Norman Group", u: "https://www.nngroup.com/", k: "article" }] },
  { re: /marketing|ads|seo|content/i, res: [{ t: "Google Digital Marketing course", u: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce", k: "course" }, { t: "HubSpot Academy", u: "https://academy.hubspot.com/", k: "course" }] },
  { re: /finance|accounting|audit|tax|budget/i, res: [{ t: "Corporate Finance Institute (free)", u: "https://corporatefinanceinstitute.com/", k: "course" }, { t: "Accounting Coach", u: "https://www.accountingcoach.com/", k: "course" }] },
  { re: /recruiting|hr|talent|people/i, res: [{ t: "SHRM resources", u: "https://www.shrm.org/", k: "community" }, { t: "Lever guide to hiring", u: "https://www.lever.co/blog", k: "article" }] },
  { re: /medical|clinical|patient|nursing|pharma/i, res: [{ t: "Khan Academy Medicine", u: "https://www.khanacademy.org/science/health-and-medicine", k: "course" }, { t: "Merck Manual", u: "https://www.merckmanuals.com/", k: "docs" }] },
  { re: /legal|law|court|contract/i, res: [{ t: "Legal information — Justia", u: "https://www.justia.com/", k: "docs" }, { t: "Law.com", u: "https://www.law.com/", k: "article" }] },
  { re: /engineering|structural|civil|mechanical|electrical/i, res: [{ t: "Engineering toolbox", u: "https://www.engineeringtoolbox.com/", k: "cheatsheet" }, { t: "MIT OpenCourseWare", u: "https://ocw.mit.edu/", k: "course" }] },
  { re: /portfolio|case study|project/i, res: [{ t: "GitHub — build your portfolio", u: "https://github.com/", k: "practice" }, { t: "Behance portfolio examples", u: "https://www.behance.net/", k: "community" }] },
  { re: /photograph|camera|video|film|edit/i, res: [{ t: "Adobe tutorials", u: "https://helpx.adobe.com/", k: "course" }, { t: "Studio Binder", u: "https://www.studiobinder.com/blog", k: "article" }] },
  { re: /psycholog|counsel|therap/i, res: [{ t: "Crash Course Psychology", u: "https://thecrashcourse.com/topic/psychology/", k: "video" }, { t: "APA resources", u: "https://www.apa.org/", k: "docs" }] },
  { re: /research|science|scientific/i, res: [{ t: "MIT OpenCourseWare", u: "https://ocw.mit.edu/", k: "course" }, { t: "PubMed (research)", u: "https://pubmed.ncbi.nlm.nih.gov/", k: "docs" }] },
  { re: /teaching|lesson|curriculum|classroom/i, res: [{ t: "Khan Academy", u: "https://www.khanacademy.org/", k: "course" }, { t: "Edutopia", u: "https://www.edutopia.org/", k: "article" }] },
  { re: /exam|syllabus|upsc|ssc|banking|railways|police|defense|prelims|mains/i, res: [{ t: "Exam official sites & syllabus", u: "https://upsc.gov.in/", k: "docs" }, { t: "Mock tests & practice", u: "https://testbook.com/", k: "practice" }] },
];

// Normalize a label for curated lookup: lowercase, alphanumerics kept,
// punctuation/emoji stripped, spaces collapsed. "&" is dropped in the primary
// form and replaced with "and" in the secondary so both "Data Structures &"
// and "Data Structures and" variants hit the same curated entry.
const normLabel = (s) =>
  s
    .replace(/[^a-z0-9\s&]+/gi, " ")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Turn a raw label into a clean search phrase (strip emoji, "Understand:",
// trailing "— practice/fundamentals" and parentheticals like "(LeetCode)").
const cleanTopic = (label) =>
  label
    .replace(/^[^\p{L}\p{N}]+/u, "")
    .replace(/^Understand:\s*/i, "")
    .replace(/\s*[-–—]\s*(fundamentals|practice|basics|interview|101|projects?)$/i, "")
    .replace(/\s*\([^)]*\)\s*$/g, "")
    .trim() || label.trim();

// Curated per-topic links win first (official docs / known-good tutorials).
const curatedResources = (label) => {
  const key = normLabel(label);
  const direct = TOPIC_RESOURCES[key];
  if (direct) return direct;
  // secondary form: "&" → "and" (e.g. "Node.js & npm" → "node js and npm")
  const alt = TOPIC_RESOURCES[key.replace(/\s+/g, " ").replace(/ (\w+)$/, " and $1")];
  if (alt) return alt;
  return null;
};

// Last-resort fallback that is still *topic-direct*: every link embeds the
// topic name, so the results are about this exact subject — never a generic
// homepage or an unrelated query.
const smartFallback = (label) => {
  const topic = cleanTopic(label);
  const q = encodeURIComponent(topic);
  const wiki = encodeURIComponent(topic.replace(/\s+/g, "_"));
  return [
    { t: `${topic} — official documentation`, u: `https://www.google.com/search?q=${q}+documentation`, k: "docs" },
    { t: `${topic} — tutorial (YouTube)`, u: `https://www.youtube.com/results?search_query=${q}+tutorial`, k: "video" },
    { t: `${topic} — Stack Overflow`, u: `https://stackoverflow.com/search?q=${q}`, k: "community" },
    { t: `${topic} — Wikipedia`, u: `https://en.wikipedia.org/wiki/${wiki}`, k: "article" },
  ];
};

const fallbackRes = (label) => {
  const curated = curatedResources(label);
  if (curated) return curated;
  for (const c of FALLBACK_CATEGORIES) if (c.re.test(label)) return c.res;
  return smartFallback(label);
};

// ── node builders ────────────────────────────────────────────────────────────
const TYPES = {
  career: "career", section: "section", subsection: "subsection", topic: "topic",
  concept: "concept", project: "project", projects: "projects", optional: "optional",
  advanced: "advanced", interview: "interview", achievement: "achievement",
};

// Rich, topic-specific descriptions. Curated knowledge (k?.d) is used as the
// lead when available; structured sections always follow so every node reads
// as an educational paragraph — what it is, why it matters, where it's used,
// core concepts, prerequisites, mistakes, applications and outcomes.
function composeRichDescription(label, type, careerTitle, k = null, parentLabel = "", kind = "none") {
  const clean = label.replace(/^Understand:\s*/i, "").replace(/—\s*(fundamentals|practice).*$/i, "").trim();
  const lower = clean.toLowerCase();
  const isProject = type === "project" || /project/i.test(label);
  const isSection = type === "section";
  const isSub = type === "subsection";
  const isConcept = type === "concept" || type === "advanced";

  // Curated lexicon entries already carry a complete, self-contained paragraph.
  if (kind === "lexicon" && k?.d) return k.d;

  // No curated knowledge at all → label-aware family composer (never generic).
  if (!k?.d) return composeLabelAware(clean, type, careerTitle, parentLabel);

  // Curated KNOWLEDGE entry → assemble the structured educational paragraph.
  const lead = k.d;
  const why = k?.why
    ? ` ${k.why}`
    : ` It matters because ${lower} appears repeatedly in real projects, team discussions and interviews.`;
  const objs = k?.obj ?? [];
  const core = objs.length
    ? ` You'll cover: ${objs.slice(0, 3).join("; ")}.`
    : isSection
      ? ` You'll learn the foundational ideas first, then progressively harder material that compounds into real competence.`
      : isProject
        ? ` You'll practise planning, building, debugging and presenting your work.`
        : ` You'll progress from the foundations to usable, practical skill.`;
  const prereq = k?.prereq?.length
    ? ` Prerequisites: ${k.prereq.join("; ")}.`
    : ` The topics you've covered so far give you what you need to succeed here.`;
  const apps = isSection
    ? ` In practice, this area maps directly to job responsibilities and projects, and every later section assumes you're comfortable here.`
    : isProject
      ? ` When you finish, you'll have a portfolio artifact you can show and discuss in interviews.`
      : ` In practice, ${lower} appears throughout ${careerTitle.toLowerCase()} work — expect to apply it in exercises, projects and on the job.`;
  const mistakes = k?.tips?.length
    ? ` A common mistake is ${k.tips[0].toLowerCase()}.`
    : isProject
      ? ` The classic mistake is copying code without understanding it — make sure you can explain every line you write.`
      : ` The classic mistake is moving too fast before the deeper ideas click.`;
  const outcomes = isSection
    ? ` By the end you'll have a solid mental model of ${lower} and the confidence to tackle its projects.`
    : ` By the end you'll understand ${lower} well enough to apply it, explain it in interviews, and build on it in later sections.`;

  return `${lead}${why}${core}${prereq}${apps} ${mistakes} ${outcomes}`;
}

const genericMistakes = (type) =>
  type === "project"
    ? ["Copy-pasting without understanding", "Skipping the planning phase", "Not documenting your build"]
    : ["Rushing past the fundamentals", "Learning without practicing", "Not building things as you go"];

const genericTips = (type) =>
  type === "project"
    ? ["Plan before you code, then ship small iterations", "Read the documentation when you get stuck", "Add the project to your portfolio"]
    : ["Practice a little every day — consistency beats intensity", "Explain what you learn out loud or in writing", "Build something real with every topic"];

// Every learnable node ships with interview questions — from knowledge when
// available, otherwise a curated fallback so no node is ever empty.
const genericInterview = (label, type, careerTitle) => {
  if (type === "project" || label.toLowerCase().includes("project")) {
    return [
      `Walk me through your ${label.toLowerCase()} project — what problem did it solve?`,
      `What was the hardest bug or obstacle you hit while building ${label.toLowerCase()}?`,
      `If you rebuilt ${label.toLowerCase()}, what would you do differently?`,
    ];
  }
  if (type === "concept") {
    const clean = label.replace(/^Understand:\s*/i, "").replace(/-\s*(fundamentals|practice.*)$/i, "").trim();
    return [
      `Explain ${clean.toLowerCase()} in simple terms to a non-expert.`,
      `Why does ${clean.toLowerCase()} matter for a ${careerTitle.toLowerCase()}?`,
      `What is a common misunderstanding about ${clean.toLowerCase()}?`,
    ];
  }
  return [
    `What is ${label.toLowerCase()}, and why is it important for a ${careerTitle.toLowerCase()}?`,
    `Describe a real-world scenario where ${label.toLowerCase()} is used.`,
    `What are the key trade-offs or pitfalls with ${label.toLowerCase()}?`,
  ];
};

function buildNode(label, type, ctx, opts = {}) {
  const { careerTitle, parentLabel } = ctx;
  const found = lookup(label);
  let k = found.kind !== "none" ? found.k : null;
  // Lexicon entries may carry a §career§ placeholder — substitute the title.
  if (k && found.kind === "lexicon") k = fillLexicon(k, careerTitle);
  // Resource links come from curated knowledge when present; every other
  // node (lexicon-matched, sections, containers, fallback topics) gets the
  // label-aware fallback list (curated map → category rules → topic-aware
  // searches) so no node ever ships empty or off-topic resources.
  const resources = k?.res?.length ? k.res : fallbackRes(label);
  const projects = k?.proj ? k.proj.map((p) => ({ title: p.t, description: p.d })) : [];
  const details = {
    description: composeRichDescription(label, type, careerTitle, k, parentLabel, found.kind),
    whyLearn: k?.why ?? `This is a core part of being a ${careerTitle.toLowerCase()} — interviewers and teams expect it.`,
    prerequisites: k?.prereq ?? ["Basics of this roadmap's foundation"],
    objectives: k?.obj ?? [`Understand ${label.toLowerCase()} in depth`, `Apply it in a hands-on project`, `Be ready to discuss it in interviews`],
    difficulty: k?.diff ?? (type === "advanced" || type === "achievement" ? "Advanced" : type === "section" ? "Beginner" : "Intermediate"),
    estimatedTime: k?.time ?? (type === "section" ? "Varies (2–4 weeks)" : "4–8 hours"),
    resources: (resources ?? []).map((r) => ({ title: r.t, url: r.u, kind: r.k })),
    projects,
    interviewQuestions:
      k?.int && k.int.length > 0 ? k.int : genericInterview(label, type, careerTitle),
    careerRelevance: `Directly relevant to ${careerTitle} — expect this in interviews and daily work.`,
    commonMistakes: k?.tips ? genericMistakes(type) : genericMistakes(type),
    tips: k?.tips ?? genericTips(type),
    nextTopics: [],
    optional: opts.optional || false,
  };
  return {
    id: hashId(ctx.careerSlug + "|" + type + "|" + label + "|" + (opts.seed || "")),
    label,
    type,
    optional: opts.optional || false,
    details,
    children: [],
  };
}

function linkSiblings(nodes) {
  for (let i = 0; i < nodes.length; i++) {
    const next = nodes[i + 1] ? [nodes[i + 1].label] : [];
    nodes[i].details.nextTopics = next;
  }
}

// ── subtopic catalog ─────────────────────────────────────────────────────────
// Mined from roadmap_data/*/tree.json at generation time so the curated
// hand-written list above is complemented by real roadmap.sh hierarchies.

const ROADMAP_DATA_DIR = join(__dirname, "..", "roadmap_data");

const MINE_EXCLUDE = /^(horizontal node|vertical node|stack node)$/i;
const INTRO_FLUFF = /^(what (is|are)|why|how (to|does)|when|where|introduction|history|versions|alternatives|prerequisites?)\b/i;
// cluster wrappers that add no learning value as subtopics
const CLUSTER_NOISE = /^(learn|understand|introduction|intro|overview|getting started|pick a language|learn a framework)\b/i;
// suffixes that make a slug prefix-match a roadmap dir (e.g. "javascript-basics" → "javascript")
const GENERIC_SUFFIXES = new Set(["basics", "basic", "fundamentals", "foundations", "essentials", "core", "101", "intro", "introduction", "interview", "for-beginners", "beginner", "intermediate"]);

function buildSubtopicCatalog() {
  const catalog = new Map(); // slug → ordered subtopics[]
  if (!existsSync(ROADMAP_DATA_DIR)) return catalog;
  for (const dir of readdirSync(ROADMAP_DATA_DIR)) {
    const treePath = join(ROADMAP_DATA_DIR, dir, "tree.json");
    if (!existsSync(treePath)) continue;
    let tree;
    try {
      tree = JSON.parse(readFileSync(treePath, "utf8"));
    } catch {
      continue;
    }
    // collect topic-level clusters (topic node + its direct subtopic children)
    const clusters = [];
    const walk = (node) => {
      const kids = node.children || [];
      const labels = kids
        .map((k) => (k.label || "").trim().replace(/\s+$/, ""))
        .filter((l) => l && l.length > 1 && !MINE_EXCLUDE.test(l) && !INTRO_FLUFF.test(l) && !CLUSTER_NOISE.test(l));
      if (labels.length) {
        clusters.push({ label: (node.label || "").trim(), kids: labels });
      }
      for (const kid of kids) walk(kid);
    };
    for (const node of tree) walk(node);
    if (!clusters.length) continue;
    // basics/core clusters first, then the rest — so the head of the list is
    // always the foundational breakdown
    const score = (c) => (/basic|core|fundamental|intro|getting started|learn the/i.test(c.label) ? 0 : 1);
    clusters.sort((a, b) => score(a) - score(b));
    const seen = new Set();
    const subtopics = [];
    for (const c of clusters) {
      for (const l of c.kids) {
        const key = l.toLowerCase();
        if (!seen.has(key) && subtopics.length < 8) {
          seen.add(key);
          subtopics.push(l);
        }
      }
    }
    if (subtopics.length) catalog.set(slugify(dir), subtopics);
  }
  return catalog;
}

const SUBTOPIC_CATALOG = buildSubtopicCatalog();

const cleanSubtopics = (list) =>
  list
    .map((s) => (s || "").trim().replace(/\s+$/, ""))
    .filter((s) => s.length > 1 && !MINE_EXCLUDE.test(s) && s.length < 48)
    .slice(0, 8);

// Resolve the concept-level breakdown for a topic: curated list wins, then the
// mined roadmap.sh catalog, then exact-knowledge objectives. Topics with no
// real breakdown stay atomic (no fabricated "fundamentals" children).
function resolveSubtopics(label) {
  const slug = slugify(label);
  const curated = CURATED_SUBTOPICS[slug];
  if (curated?.length) return cleanSubtopics(curated);

  // try mined catalog: exact slug, then prefix when the remainder is a generic
  // suffix (e.g. "javascript-basics" → "javascript" but "docker-compose" → no)
  for (const [key, subtopics] of SUBTOPIC_CATALOG) {
    if (slug === key) return cleanSubtopics(subtopics);
    if (slug.length > key.length + 1 && slug.startsWith(key + "-")) {
      const rest = slug.slice(key.length + 1);
      if (GENERIC_SUFFIXES.has(rest)) return cleanSubtopics(subtopics);
    }
  }

  // exact knowledge entries only — regex matches may belong to a different topic
  const k = KNOWLEDGE[slug];
  const fromObjectives = (k?.obj ?? []).slice(0, 3).map((o) => o.split(/[:(]/)[0].trim().replace(/\.$/, ""));
  const cleaned = cleanSubtopics(fromObjectives);
  return cleaned.length >= 2 ? cleaned : [];
}

// Build a topic node (with concept + project children)
function buildTopic(label, ctx) {
  const node = buildNode(label, "topic", ctx);
  const found = lookup(label);
  const k = found.kind !== "none" ? found.k : null;
  const children = [];
  // concept-level breakdown from curated catalog / mined roadmap_data
  for (const c of resolveSubtopics(label)) children.push(buildNode(c, "concept", ctx, { seed: "c" }));
  if (k?.proj?.length) {
    const pj = buildNode("Projects", "projects", ctx);
    for (const p of k.proj) pj.children.push(buildNode(p.t, "project", ctx, { seed: "pj" }));
    children.push(pj);
  }
  linkSiblings(children.filter((c) => c.type === "concept"));
  node.children = children;
  return node;
}

// ── section / subsection building ────────────────────────────────────────────
function buildSection(section, ctx) {
  const node = buildNode(section.t, "section", ctx);
  const kids = Array.isArray(section.k) ? section.k : [];
  const children = [];
  for (const item of kids) {
    if (typeof item === "string") {
      children.push(buildTopic(item, ctx));
    } else if (item && typeof item === "object") {
      if (item.c) {
        // Choice node
        const choiceNode = buildNode(item.t, "choice", ctx, { optional: item.o });
        choiceNode.options = [];
        
        const optKids = Array.isArray(item.k) ? item.k : [];
        for (const opt of optKids) {
          if (typeof opt === "string") {
            choiceNode.options.push(buildTopic(opt, ctx));
          } else if (opt && typeof opt === "object") {
            const sub = buildNode(opt.t, "subsection", ctx, { optional: opt.o });
            const subKids = Array.isArray(opt.k) ? opt.k : [];
            const subChildren = [];
            for (const t of subKids) {
              if (typeof t === "string") subChildren.push(buildTopic(t, ctx));
              else if (t && typeof t === "object") subChildren.push(buildTopic(t.t, ctx));
            }
            linkSiblings(subChildren);
            sub.children = subChildren;
            choiceNode.options.push(sub);
          }
        }
        
        // Find recommended ID by matching label
        if (item.r) {
          const recNode = choiceNode.options.find(o => o.label.toLowerCase() === item.r.toLowerCase());
          if (recNode) choiceNode.recommended = recNode.id;
        }
        
        children.push(choiceNode);
      } else {
        const sub = buildNode(item.t, "subsection", ctx, { optional: item.o });
        const subKids = Array.isArray(item.k) ? item.k : [];
        const subChildren = [];
        for (const t of subKids) {
          if (typeof t === "string") subChildren.push(buildTopic(t, ctx));
          else if (t && typeof t === "object") subChildren.push(buildTopic(t.t, ctx));
        }
        linkSiblings(subChildren);
        sub.children = subChildren;
        children.push(sub);
      }
    }
  }
  // auto projects subsection for sections with project-heavy topics? Keep tree clean.
  linkSiblings(children);
  node.children = children;
  return node;
}

// ── auto sections: interview prep + career ready ─────────────────────────────
function interviewSection(career, ctx) {
  const isTech = career.category === "it";
  const node = buildNode("Interview Preparation", "section", ctx);
  const groups = [];
  groups.push({
    t: "Core Revision", k: isTech
      ? ["Fundamentals revision", "Data Structures & Algorithms", "Coding practice (LeetCode)", "Problem-solving patterns"]
      : ["Core concepts revision", "Mock tests & practice", "Common interview questions", "Speed & accuracy"],
  });
  if (isTech) groups.push({ t: "Technical Interview", k: ["System design basics", "Whiteboard practice", "Behavioral questions (STAR)", "Take-home projects"] });
  else groups.push({ t: "Interview Skills", k: ["Case studies & aptitude", "Behavioral questions (STAR)", "Domain deep dives", "Portfolio walkthrough"] });
  groups.push({ t: "Job Hunting", k: ["Resume & LinkedIn", "Portfolio & proof of work", "Job portals & networking", "Salary negotiation", "Offer evaluation"] });
  const children = [];
  for (const g of groups) {
    const sub = buildNode(g.t, "subsection", ctx);
    const subKids = [];
    for (const t of g.k) subKids.push(buildTopic(t, ctx));
    linkSiblings(subKids);
    sub.children = subKids;
    children.push(sub);
  }
  linkSiblings(children);
  node.children = children;
  return node;
}

function careerReadyNode(career, ctx) {
  const node = buildNode("🎓 Career Ready", "achievement", ctx);
  node.details = {
    description: `You've completed the ${career.title} roadmap. You now have the skills, projects and interview preparation to enter the field with confidence. Keep learning, keep building — and update this roadmap as the industry evolves.`,
    whyLearn: "This is the milestone that marks you as job-ready in this career.",
    prerequisites: ["Complete the sections above in order"],
    objectives: ["Ship your portfolio projects", "Pass mock interviews", "Apply with confidence"],
    difficulty: "Advanced",
    estimatedTime: "Ongoing",
    resources: [
      { title: "Resume & LinkedIn optimization", url: "https://www.linkedin.com/business/talent/blog", kind: "article" },
      { title: "Salary research — Levels.fyi", url: "https://www.levels.fyi/", kind: "practice" },
      { title: "Job portals to apply on", url: "https://www.linkedin.com/jobs", kind: "practice" },
    ],
    projects: career.portfolioIdeas.map((p) => ({ title: p, description: `A portfolio-worthy ${p.toLowerCase()} that proves your skills.` })),
    interviewQuestions: ["Walk me through your best project", "Why did you choose this career?", "Where do you see yourself in 3 years?"],
    careerRelevance: "This milestone converts your learning into income.",
    commonMistakes: ["Waiting for perfection before applying", "Ignoring soft skills in interviews", "Not updating your portfolio"],
    tips: ["Apply to 5+ roles with a tailored resume", "Do a mock interview every week", "Keep a public log of what you build"],
    nextTopics: career.specializations,
    optional: false,
  };
  const sub = buildNode("Specializations & Next Steps", "subsection", ctx);
  const kids = career.specializations.map((s) => {
    const n = buildNode(s, "advanced", ctx, { seed: "spec" });
    n.details.nextTopics = [];
    return n;
  });
  linkSiblings(kids);
  if (kids.length) {
    sub.children = kids;
    node.children = [sub];
  } else {
    // No specializations listed for this career — skip the empty subsection
    // entirely so the roadmap ends cleanly at the Career Ready milestone.
    node.children = [];
  }
  return node;
}

// ── stats ────────────────────────────────────────────────────────────────────
function collectStats(node, acc = { total: 0, byType: {} }) {
  acc.total += 1;
  acc.byType[node.type] = (acc.byType[node.type] || 0) + 1;
  for (const c of node.children || []) collectStats(c, acc);
  return acc;
}

function flattenLabels(node, out = []) {
  out.push(node.label);
  for (const c of node.children || []) flattenLabels(c, out);
  return out;
}

// ── main ─────────────────────────────────────────────────────────────────────
function buildCareer(career) {
  const skeleton = ALL_SKELETONS[career.skeleton];
  if (!skeleton) throw new Error(`Missing skeleton: ${career.skeleton} for ${career.slug}`);

  const ctx = { careerTitle: career.title, careerSlug: career.slug };

  const root = buildNode(career.title, "career", ctx);
  root.details = {
    description: career.description,
    whyLearn: career.tagline + " " + career.description,
    prerequisites: career.prerequisites,
    objectives: [
      `Build a complete foundation in ${career.title.toLowerCase()}`,
      "Complete hands-on projects for your portfolio",
      "Pass interviews with confidence",
      "Land your first role or client",
    ],
    difficulty: career.difficulty,
    estimatedTime: career.duration,
    resources: [
      { title: `${career.title} — career guide`, url: `https://www.google.com/search?q=${encodeURIComponent(career.title + " career guide")}`, kind: "article" },
      { title: `${career.title} — freeCodeCamp courses`, url: `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(career.title)}`, kind: "course" },
      { title: `${career.title} — beginner tutorials (YouTube)`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(career.title + " beginner tutorial")}`, kind: "video" },
      ...(career.certifications.map((c) => ({ title: c, url: `https://www.google.com/search?q=${encodeURIComponent(c + " certification")}`, kind: "certification" }))),
    ],
    projects: career.portfolioIdeas.map((p) => ({ title: p, description: `A flagship ${career.title.toLowerCase()} project for your portfolio.` })),
    interviewQuestions: [
      `Why do you want to become a ${career.title.toLowerCase()}?`,
      "Walk me through a project you're proud of",
      "How do you keep your skills up to date?",
    ],
    careerRelevance: `${career.title} is a ${career.demand.toLowerCase()} demand career with typical salaries of ${career.salary}.`,
    commonMistakes: ["Learning passively without building", "Jumping between topics before mastering fundamentals", "Ignoring soft skills and communication"],
    tips: ["Follow this roadmap in order — each level depends on the last", "Build and publish projects at every stage", "Join communities and network from day one"],
    nextTopics: career.specializations,
    optional: false,
  };

  const sectionNodes = skeleton.map((s) => buildSection(s, ctx));
  root.children = sectionNodes;
  root.children.push(interviewSection(career, ctx));
  root.children.push(careerReadyNode(career, ctx));

  const stats = collectStats(root);
  const labels = flattenLabels(root);
  const learnable = stats.byType.topic + (stats.byType.concept || 0) + (stats.byType.project || 0) + (stats.byType.advanced || 0) + (stats.byType.interview || 0);
  const projectCount = stats.byType.project || 0;

  return {
    meta: {
      slug: career.slug, title: career.title, tagline: career.tagline, description: career.description,
      kind: "career", category: career.category, domain: career.domain ?? "Software Development", skillCategory: "Career",
      industry: career.industry, icon: career.icon, color: career.color,
      difficulty: career.difficulty, duration: career.duration, durationHours: career.durationHours,
      salary: career.salary, demand: career.demand, demandLevel: career.demandLevel,
      prerequisites: career.prerequisites, certifications: career.certifications, tools: career.tools,
      softSkills: career.softSkills, portfolioIdeas: career.portfolioIdeas,
      specializations: career.specializations, examMeta: career.examMeta || null,
    },
    stats: {
      totalNodes: stats.total,
      sections: stats.byType.section || 0,
      subsections: stats.byType.subsection || 0,
      topics: stats.byType.topic || 0,
      concepts: stats.byType.concept || 0,
      projects: projectCount,
      advanced: stats.byType.advanced || 0,
      learnable,
      estimatedHours: career.durationHours,
      keywords: labels
        .filter(
          (l) =>
            !l.startsWith("Understand:") &&
            !l.includes("— fundamentals") &&
            !l.includes("— practice")
        )
        .slice(0, 220),
    },
    root,
  };
}

// ── skill roadmaps (individual skills / technologies / tools) ───────────────
// Skills reuse the same node builders as careers but follow category skeleton
// templates (see skill-skeletons.mjs) and carry kind="skill" metadata with a
// skillCategory for browsing. No auto interview/achievement sections — the
// skill templates already include Interview Prep / Resources / Practice.
function buildSkill(skill) {
  const builder = SKILL_SKELETON_BUILDERS[skill.template];
  if (!builder) throw new Error(`Missing skeleton builder: ${skill.template} for ${skill.slug}`);
  const skeleton = builder(skill.title, skill.topics);
  const ctx = { careerTitle: skill.title, careerSlug: skill.slug };

  const primaryCat = SKILL_CATEGORY_MAP[skill.categories?.[0]];
  const primaryLabel = primaryCat?.label ?? skill.categories?.[0] ?? "Skill";

  const root = buildNode(skill.title, "career", ctx);
  root.details = {
    description: skill.description,
    whyLearn: skill.tagline + " " + skill.description,
    prerequisites: skill.prerequisites ?? ["No prerequisites — start from scratch"],
    objectives: [
      `Build a complete foundation in ${skill.title.toLowerCase()}`,
      "Progress from fundamentals to advanced, expert-level topics",
      "Complete hands-on projects and practice problems",
      "Be interview-ready and apply the skill in real work",
    ],
    difficulty: skill.difficulty,
    estimatedTime: skill.duration,
    resources: [
      { title: `${skill.title} — official guide`, url: `https://www.google.com/search?q=${encodeURIComponent(skill.title + " official documentation")}`, kind: "docs" },
      { title: `${skill.title} — freeCodeCamp courses`, url: `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(skill.title)}`, kind: "course" },
      { title: `${skill.title} — beginner tutorials (YouTube)`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill.title + " beginner tutorial")}`, kind: "video" },
      ...(skill.certifications?.map((c) => ({ title: c, url: `https://www.google.com/search?q=${encodeURIComponent(c + " certification")}`, kind: "certification" })) ?? []),
    ],
    projects: (skill.topics?.projects ?? []).map((p) => ({ title: p, description: `A hands-on ${skill.title.toLowerCase()} project to prove the skill.` })),
    interviewQuestions: [
      `Explain ${skill.title.toLowerCase()} to a beginner in simple terms.`,
      "Walk me through a project where you used this skill.",
      "What are the common mistakes beginners make?",
    ],
    careerRelevance: `${skill.title} is a widely used ${primaryLabel.toLowerCase()} skill in high demand across the industry.`,
    commonMistakes: ["Learning passively without practicing", "Jumping to advanced topics too early", "Skipping the fundamentals"],
    tips: ["Follow this roadmap in order — each level builds on the last", "Practice daily and build small projects", "Join the community and learn from real code"],
    nextTopics: skill.roles ?? [],
    optional: false,
  };

  const sectionNodes = skeleton.map((s) => buildSection(s, ctx));
  root.children = sectionNodes;

  // Mark the Projects section's children as project nodes so stats, cards and
  // the mindmap treat them as hands-on projects (not plain topics).
  for (const sec of sectionNodes) {
    if (/^projects?$/i.test(sec.label)) {
      for (const child of sec.children) child.type = "project";
    }
  }

  const stats = collectStats(root);
  const labels = flattenLabels(root);
  const learnable = stats.byType.topic + (stats.byType.concept || 0) + (stats.byType.project || 0) + (stats.byType.advanced || 0) + (stats.byType.interview || 0);

  return {
    meta: {
      slug: skill.slug, title: skill.title, tagline: skill.tagline, description: skill.description,
      kind: "skill", category: "skill", domain: primaryLabel, skillCategory: primaryLabel,
      industry: primaryLabel, icon: skill.icon, color: skill.color,
      difficulty: skill.difficulty, duration: skill.duration, durationHours: skill.durationHours ?? 60,
      salary: "—", demand: "Widely used", demandLevel: 4,
      prerequisites: skill.prerequisites ?? [], certifications: skill.certifications ?? [],
      tools: skill.tools ?? [], softSkills: [], portfolioIdeas: [],
      specializations: skill.roles ?? [], examMeta: null,
    },
    stats: {
      totalNodes: stats.total,
      sections: stats.byType.section || 0,
      subsections: stats.byType.subsection || 0,
      topics: stats.byType.topic || 0,
      concepts: stats.byType.concept || 0,
      projects: stats.byType.project || 0,
      advanced: stats.byType.advanced || 0,
      learnable,
      estimatedHours: skill.durationHours ?? 60,
      keywords: labels
        .filter((l) => !l.startsWith("Understand:") && !l.includes("— fundamentals") && !l.includes("— practice"))
        .slice(0, 220),
    },
    root,
  };
}

// ── write output ─────────────────────────────────────────────────────────────
mkdirSync(OUT, { recursive: true });

// Clean the output directory first so roadmaps removed from the catalog
// (e.g. non-technical careers dropped by the keep-list) don't leave stale
// JSON files behind — every file is regenerated from scratch below.
for (const f of readdirSync(OUT)) {
  if (f.endsWith(".json")) unlinkSync(join(OUT, f));
}

const index = { lastUpdated: new Date().toISOString().slice(0, 10), roadmaps: {} };
const searchIndex = [];

let failures = 0;
let skillCount = 0;

const addIndexEntry = (data) => {
  index.roadmaps[data.meta.slug] = {
    title: data.meta.title, icon: data.meta.icon, color: data.meta.color,
    kind: data.meta.kind, category: data.meta.category, domain: data.meta.domain, skillCategory: data.meta.skillCategory,
    industry: data.meta.industry, difficulty: data.meta.difficulty,
    duration: data.meta.duration, durationHours: data.meta.durationHours, salary: data.meta.salary,
    demand: data.meta.demand, demandLevel: data.meta.demandLevel,
    nodeCount: data.stats.totalNodes, topicCount: data.stats.topics, projectCount: data.stats.projects,
    learnable: data.stats.learnable, estimatedHours: data.stats.estimatedHours,
    tagline: data.meta.tagline,
  };
  searchIndex.push({
    slug: data.meta.slug, title: data.meta.title, icon: data.meta.icon,
    kind: data.meta.kind, category: data.meta.category, domain: data.meta.domain, skillCategory: data.meta.skillCategory,
    industry: data.meta.industry,
    // the client scorer only reads keywords.slice(0, 40) — cap at 64 so the
    // search index stays small instead of shipping ~220 labels per roadmap
    keywords: data.stats.keywords.slice(0, 64),
  });
};

for (const career of ALL_CAREERS) {
  try {
    const data = buildCareer(career);
    writeFileSync(join(OUT, `${career.slug}.json`), JSON.stringify(data));
    addIndexEntry(data);
  } catch (e) {
    failures += 1;
    console.error(`✗ ${career.slug}: ${e.message}`);
  }
}

for (const skill of SKILLS) {
  try {
    const data = buildSkill(skill);
    writeFileSync(join(OUT, `${skill.slug}.json`), JSON.stringify(data));
    addIndexEntry(data);
    skillCount += 1;
  } catch (e) {
    failures += 1;
    console.error(`✗ ${skill.slug}: ${e.message}`);
  }
}

// Canonical category metadata for the loader — source order, icons and live
// counts, computed from the freshly generated index. Single source of truth
// so the UI never mirrors/duplicates the icon maps.
const skillCategoryCounts = new Map();
const domainCounts = new Map();
for (const entry of Object.values(index.roadmaps)) {
  if (entry.kind === "skill") {
    skillCategoryCounts.set(entry.skillCategory, (skillCategoryCounts.get(entry.skillCategory) ?? 0) + 1);
  } else {
    domainCounts.set(entry.domain, (domainCounts.get(entry.domain) ?? 0) + 1);
  }
}
writeFileSync(
  join(OUT, "skill-categories.json"),
  JSON.stringify(SKILL_CATEGORIES.map((c) => ({ ...c, count: skillCategoryCounts.get(c.label) ?? 0 })))
);
writeFileSync(
  join(OUT, "career-domains.json"),
  JSON.stringify(CAREER_DOMAINS.map((d) => ({ ...d, count: domainCounts.get(d.label) ?? 0 })))
);
writeFileSync(join(OUT, "index.json"), JSON.stringify(index, null, 2));
writeFileSync(join(OUT, "search-index.json"), JSON.stringify(searchIndex));

const itCount = ALL_CAREERS.filter((c) => c.category === "it").length;
const nonItCount = ALL_CAREERS.filter((c) => c.category === "non-it").length;
console.log(`✓ Generated ${ALL_CAREERS.length - failures}/${ALL_CAREERS.length} careers + ${skillCount} skills → data/generated/`);
console.log(`  Careers: ${itCount} IT, ${nonItCount} Non-IT · Skills: ${skillCount} across ${SKILL_CATEGORIES.length} categories`);
console.log(`  Total nodes across all roadmaps: ${Object.values(index.roadmaps).reduce((a, r) => a + r.nodeCount, 0)}`);
