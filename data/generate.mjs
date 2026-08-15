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
import { CURATED_KNOWLEDGE } from "./source/curated-knowledge.mjs";
import { META_KNOWLEDGE } from "./source/meta-knowledge.mjs";
// Existing curated entries win over the cross-cutting curated module, so
// nothing already hand-authored is overridden — CURATED_KNOWLEDGE only fills
// the topics that used to fall back to generic label-aware filler.
const ALL_KNOWLEDGE = { ...CURATED_KNOWLEDGE, ...META_KNOWLEDGE, ...KNOWLEDGE };
// slugs whose objectives describe learning bullets rather than real subtopics
const META_SLUGS = new Set(Object.keys(META_KNOWLEDGE));
import { CURATED_SUBTOPICS } from "./source/subtopics.mjs";
import { LEXICON, fillLexicon, composeLabelAware, familyFor } from "./source/topic-lexicon.mjs";
import { TOPIC_RESOURCES } from "./source/topic-resources.mjs";
import { EXTRA_TOPIC_RESOURCES } from "./source/topic-resources-extra.mjs";
import { ruleResources, searchFixFor, relatedFallback } from "./source/resource-fallbacks.mjs";
import { languageResources, LANGUAGE_SLUGS } from "./source/language-resources.mjs";
import { curatedPractice, practiceRules, categoryPractice, isCoding, isAlgoUrl } from "./source/topic-practice.mjs";
import { ROADMAP_PRACTICE, CATEGORY_PRACTICE, DOMAIN_PRACTICE } from "./source/topic-practice.mjs";
import { providerFor, isOfficialUrl, typeFor, difficultyFor, estimateFor, describeResource } from "./source/resource-meta.mjs";
import { CAREER_ROOT_RESOURCES, SKILL_ROOT_RESOURCES, careerFallback, skillFallback } from "./source/root-resources.mjs";
import { URL_FIXES, FCC_FIXES, CAREER_FIXES, URL_FIXES_LATE } from "./source/url-fixes.mjs";
import { URL_FIXES_2025 } from "./source/url-fixes-2025.mjs";
import { SKILLS, SKILL_CATEGORIES, SKILL_CATEGORY_MAP } from "./source/skills.mjs";
import { SKILL_SKELETON_BUILDERS } from "./source/skill-skeletons.mjs";
import { LANGUAGE_CURRICULA, CURRICULUM_LANGS } from "./source/language-curricula.mjs";
import { LANGUAGE_SUBTOPICS } from "./source/language-subtopics.mjs";
import { LANGUAGE_KNOWLEDGE } from "./source/language-knowledge.mjs";
import { CERTIFICATIONS, CERT_BY_ID } from "./source/certifications.mjs";
import { CERT_CAREER_MAP, CERT_SKILL_MAP, CERT_TOPIC_MAP } from "./source/cert-mappings.mjs";
import { PROJECT_COMPANIONS, PROJECT_GUARDS, PROJECT_TITLE_HINTS } from "./source/project-catalog.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "generated");
// Per-roadmap JSON also lands in public/roadmaps so the client can fetch a
// single roadmap on demand (study planner) WITHOUT bundling all 130+ MB of
// roadmap data into the webpack graph — keeping builds fast and bounded.
const PUBLIC_OUT = join(__dirname, "..", "public", "roadmaps");

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

// Knowledge entries are keyed by topic slug. The curated map also carries
// language/framework-prefixed entries ("js-promises", "react-hooks",
// "css-flexbox"…) — inside that roadmap, "Promises" should resolve to
// "js-promises". This alias table maps roadmap slug → knowledge prefix.
const KNOWLEDGE_PREFIX = {
  javascript: "js", typescript: "ts", html: "html", css: "css", sass: "css",
  react: "react", vue: "vue", angular: "angular", svelte: "svelte",
  nextjs: "react", nuxtjs: "vue", nodejs: "node", expressjs: "node",
  nestjs: "node", python: "python", sql: "sql", git: "git",
  "spring-boot": "java", django: "python", flask: "python", fastapi: "python",
  "aspnet-core": "dotnet", golang: "go", rust: "rust", cpp: "cpp",
};

// Language-topic knowledge takes priority so core language topics (pointers,
// malloc, closures, RAII…) never fall back to label-aware filler. Then the
// roadmap-prefixed curated entry (js-promises inside JavaScript, react-hooks
// inside React…) so framework topics resolve to their own knowledge.
const lookup = (label, ctx = {}) => {
  const slug = slugify(label);
  // Separator chars (&, /, ', +) are stripped by slugify, but curated keys
  // spell them out ("HTTP & APIs" → http-and-apis). Try the spelled-out
  // variant too so those entries resolve.
  const slugSpelled = slugify(label.replace(/&/g, " and ").replace(/\//g, " ").replace(/['+]/g, " "));
  const tryKey = (key) => {
    const lk = LANGUAGE_KNOWLEDGE[key];
    if (lk) return { kind: "exact", k: lk };
    const exact = ALL_KNOWLEDGE[key];
    if (exact) return { kind: "exact", k: exact };
    const lex = LEXICON[key];
    if (lex) return { kind: "lexicon", k: lex };
    return null;
  };
  const direct = tryKey(slug) ?? tryKey(slugSpelled);
  if (direct) return direct;
  const prefix = KNOWLEDGE_PREFIX[ctx.langSlug ?? ctx.slug];
  if (prefix) {
    const prefixed = tryKey(`${prefix}-${slug}`) ?? tryKey(`${prefix}-${slugSpelled}`);
    if (prefixed) return prefixed;
  }
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
// EXTRA_TOPIC_RESOURCES extends the hand-written map with the topics that used
// to fall through to search links. Both maps are keyed by normalized label.
const MERGED_TOPIC_RESOURCES = { ...TOPIC_RESOURCES, ...EXTRA_TOPIC_RESOURCES };

// generate lookup variants for a normalized key: try the key, then the same
// key with each "and"→" " / " "→"and" swap so "variables and constants"
// matches both spellings of "Variables & Constants".
function keyVariants(key) {
  const out = [key];
  if (key.includes("and")) out.push(key.replace(/\band\b/g, " "));
  if (key.includes(" ")) out.push(key.replace(/ (\w+)$/, " and $1"));
  return [...new Set(out)];
}

const curatedResources = (label) => {
  const key = normLabel(label);
  for (const variant of keyVariants(key)) {
    const direct = MERGED_TOPIC_RESOURCES[variant];
    if (direct) return direct;
  }
  return null;
};

// Search URLs are banned outright — a curated platform never ships a google /
// youtube search page as a learning resource.
const SEARCH_URL_RE = /(google\.com\/search|youtube\.com\/results|bing\.com\/search|duckduckgo\.com\/\?q=)/i;

// All known-broken URLs and their verified replacements, merged in priority
// order (specific fixes first, then fCC news purges, then career articles).
const ALL_URL_FIXES = { ...URL_FIXES, ...FCC_FIXES, ...CAREER_FIXES, ...URL_FIXES_LATE, ...URL_FIXES_2025 };

// If a URL is a known-broken entry, return its verified replacement resource;
// otherwise return null. Fixes may chain (a fix's replacement can itself be a
// broken entry), so resolve through the map until reaching a stable URL.
const fixForUrl = (url) => {
  const first = ALL_URL_FIXES[url];
  if (!first) return null;
  let final = first;
  const seen = new Set([url]);
  while (ALL_URL_FIXES[final.u] && !seen.has(final.u)) {
    seen.add(final.u);
    final = ALL_URL_FIXES[final.u];
  }
  return final;
};

// Clean a resource list for shipping: replace known-broken URLs with verified
// replacements, drop search URLs (replacing them with curated direct links
// when the label has a known fix), dedupe by URL.
const cleanResources = (list, label) => {
  const out = [];
  const seen = new Set();
  let hadSearch = false;
  for (let entry of list || []) {
    if (!entry || !entry.u) continue;
    if (SEARCH_URL_RE.test(entry.u)) {
      hadSearch = true;
      continue;
    }
    const fix = fixForUrl(entry.u);
    if (fix) entry = fix;
    if (seen.has(entry.u)) continue;
    seen.add(entry.u);
    out.push(entry);
  }
  // swap in curated direct links for the search entries we just removed
  if (hadSearch) {
    const fix = searchFixFor(label);
    if (fix) {
      for (let f of fix) {
        // search-fix entries can themselves carry a broken URL — run the
        // verified fix map over them too
        const ff = fixForUrl(f.u);
        if (ff) f = ff;
        if (!seen.has(f.u)) {
          seen.add(f.u);
          out.push(f);
        }
      }
    }
  }
  return out;
};

// Engineering-software roadmaps share the same skeleton labels (licensing,
// workspace, first launch…) but each tool has its own vendor. The skeleton's
// curated entries carry placeholder Autodesk URLs; rewrite them to the correct
// vendor when the roadmap is a specific tool. Keyed by roadmap slug.
const VENDOR_DOCS = {
  autocad: { docs: "https://help.autodesk.com/view/ACD/2024/ENU/", home: "https://www.autodesk.com/products/autocad", education: "https://www.autodesk.com/education/learn-software", learn: "https://www.autodesk.com/learn/org/autodesk" },
  "fusion-360": { docs: "https://help.autodesk.com/view/fusion360/ENU/", home: "https://www.autodesk.com/products/fusion-360", education: "https://www.autodesk.com/education/learn-software", learn: "https://www.autodesk.com/learn/org/autodesk" },
  revit: { docs: "https://help.autodesk.com/view/RVT/2024/ENU/", home: "https://www.autodesk.com/products/revit", education: "https://www.autodesk.com/education/learn-software", learn: "https://www.autodesk.com/learn/org/autodesk" },
  solidworks: { docs: "https://help.solidworks.com/", home: "https://www.solidworks.com/", education: "https://www.solidworks.com/education", learn: "https://my.solidworks.com/training" },
  catia: { docs: "https://help.3ds.com/2024/english/dsstoc.htm", home: "https://www.3ds.com/products-services/catia/", education: "https://www.3ds.com/education", learn: "https://www.3ds.com/learn/" },
  creo: { docs: "https://support.ptc.com/help/creo/creo_pma/r11.0/usascii/index.html", home: "https://www.ptc.com/en/products/creo", education: "https://www.ptc.com/en/education", learn: "https://learningconnector.ptc.com/" },
  ansys: { docs: "https://ansyshelp.ansys.com/", home: "https://www.ansys.com/", education: "https://www.ansys.com/academic", learn: "https://innovationspace.ansys.com/" },
  simulink: { docs: "https://www.mathworks.com/help/simulink/", home: "https://www.mathworks.com/products/simulink.html", education: "https://www.mathworks.com/academia.html", learn: "https://www.mathworks.com/learn/tutorials/simulink.html" },
  etabs: { docs: "https://wiki.csiamerica.com/display/etabs/Home", home: "https://www.csiamerica.com/products/etabs", education: "https://www.csiamerica.com/education", learn: "https://wiki.csiamerica.com/display/etabs/Tutorials" },
  "staad-pro": { docs: "https://docs.bentley.com/LiveContent/web/Bentley%20STAAD.Pro%20Help-v9/en/GUID-9F7F7C7E-7E7E-4F7F-9F7F-7C7E7E7F7F7E.html", home: "https://www.bentley.com/software/staad/", education: "https://www.bentley.com/education", learn: "https://www.bentley.com/learn" },
  sketchup: { docs: "https://help.sketchup.com/en", home: "https://www.sketchup.com/", education: "https://www.sketchup.com/education", learn: "https://learn.sketchup.com/" },
  arcgis: { docs: "https://pro.arcgis.com/en/pro-app/latest/help/main/welcome-to-the-arcgis-pro-app-help.htm", home: "https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview", education: "https://www.esri.com/en-us/industries/education/overview", learn: "https://learn.arcgis.com/" },
  qgis: { docs: "https://docs.qgis.org/latest/en/docs/user_manual/", home: "https://qgis.org/", education: "https://qgis.org/en/site/forusers/training/index.html", learn: "https://docs.qgis.org/latest/en/docs/training_manual/" },
  labview: { docs: "https://www.ni.com/docs/en-US/bundle/labview/page/labview.html", home: "https://www.ni.com/en/shop/labview.html", education: "https://www.ni.com/en/support/documentation/academic-resources.html", learn: "https://learn.ni.com/" },
  "plc-programming": { docs: "https://www.plcdev.com/", home: "https://www.plcdev.com/", education: "https://www.plcdev.com/", learn: "https://www.plcdev.com/plc_training" },
  scada: { docs: "https://en.wikipedia.org/wiki/SCADA", home: "https://www.inductiveautomation.com/scada", education: "https://www.inductiveautomation.com/resources", learn: "https://www.inductiveautomation.com/learn" },
};
const AUTODESK_URLS = ["help.autodesk.com", "www.autodesk.com", "autodesk.com"];

// Rewrite vendor-placeholder resources to the correct vendor for a tool roadmap.
const vendorizeResources = (list, ctx) => {
  const v = VENDOR_DOCS[ctx.slug];
  if (!v) return list;
  const isAutodesk = (u) => AUTODESK_URLS.some((h) => u.includes(h));
  const mapUrl = (u) => {
    if (u.includes("/education")) return v.education;
    if (u.includes("/certification")) return v.home;
    if (u.includes("youtube.com/") && v.learn) return v.learn;
    if (isAutodesk(u)) return v.docs;
    return u;
  };
  const isYt = (u) => u.includes("youtube.com/") && !u.includes("/watch");
  return (list || []).map((r) => ({
    ...r,
    u: mapUrl(r.u),
    t: isAutodesk(r.u)
      ? r.t.replace(/^The\s+/i, "").replace(/vendor's|vendor/i, "Official").replace(/^official/, "Official")
      : isYt(r.u) && v.learn
        ? r.t.replace(/YouTube\s*[—–-]?\s*/i, "").replace(/videos?/i, "").replace(/tutorials?/i, "").trim() + " — vendor tutorials"
        : r.t,
  }));
};

// Resource fallback chain (context-aware, DIRECT links only):
//   1. language resources (generic programming topics inside a language roadmap)
//   2. curated exact-topic resources (topic-resources + extras)
//   3. keyword/rule tables (direct links)
//   4. related-family fallback (e.g. "X basics" → X resources)
//   5. [] → the UI shows a clear "no verified resource yet" state
const fallbackRes = (label, ctx = {}) => {
  if (ctx.langSlug) {
    const langRes = languageResources(label, ctx.langSlug);
    if (langRes) return langRes;
  }
  const curated = curatedResources(label);
  if (curated) return curated;
  const rules = ruleResources(label);
  if (rules) return rules;
  const related = relatedFallback(label);
  if (related) return related;
  return [];
};

// ── resource enrichment ──────────────────────────────────────────────────────
// { t, u, k } → full Resource model with provider / type / description /
// difficulty / estimatedTime / isOfficial. Descriptions are concrete and
// topic-aware; official domains get the official badge.
const enrichResources = (raw, label, nodeDifficulty) => {
  return (raw || []).map((r) => {
    const provider = providerFor(r.u);
    const official = isOfficialUrl(r.u);
    const kind = r.k ?? (official ? "docs" : "article");
    return {
      title: r.t,
      url: r.u,
      kind,
      type: typeFor(kind, r.u, r.t),
      provider: provider.name,
      description: describeResource(r.t, provider.name, kind, label),
      difficulty: difficultyFor(r.t, nodeDifficulty),
      estimatedTime: estimateFor(kind, null),
      isOfficial: official,
    };
  });
};

// ── practice builder ─────────────────────────────────────────────────────────
// Curated per-topic practice wins; then label rules; then roadmap-level
// practice (slug → platforms); then skill-category practice; then career-domain
// practice. All links are direct platform pages. Deduped by URL.
const practiceDifficulty = (nodeDifficulty, fallback = "Intermediate") => {
  let diff = fallback || nodeDifficulty || "Intermediate";
  // a Beginner node never advertises an Advanced challenge
  if (nodeDifficulty === "Beginner" && diff === "Advanced") diff = "Intermediate";
  return diff;
};

const buildPractice = (label, ctx, nodeDifficulty) => {
  const out = [];
  const seen = new Set();
  const push = (list) => {
    for (let item of list || []) {
      if (!item || !item.u) continue;
      const fix = fixForUrl(item.u);
      if (fix) item = { ...item, t: fix.t, u: fix.u };
      if (seen.has(item.u)) continue;
      seen.add(item.u);
      out.push({
        title: item.t || (item.p ? `${item.p} practice` : `Practice: ${label}`),
        platform: item.p,
        url: item.u,
        difficulty: practiceDifficulty(nodeDifficulty, item.d),
        estimatedTime: item.e || "30–60 min",
        skills: Array.isArray(item.s) ? item.s : [],
        description: item.ds || `Practice ${label.toLowerCase()} on ${item.p} and build real skill.`,
      });
    }
  };

  const curated = curatedPractice(label);
  if (curated) {
    // non-coding roadmaps (WordPress, no-code, consulting…) never get algorithm
    // kata / interview platforms, even from the curated catalog. When every
    // curated option is filtered for this context, fall through to rules/slug/
    // domain so the node still gets roadmap-appropriate practice instead of an
    // empty list (e.g. DSA topics in a WordPress interview-prep section).
    push(isCoding(ctx) ? curated : curated.filter((item) => !isAlgoUrl(item.u)));
    if (out.length > 0) return out;
  }
  const rules = practiceRules(label, ctx);
  if (rules) {
    push(rules);
    return out;
  }
  const bySlug = ROADMAP_PRACTICE[ctx.slug];
  if (bySlug) {
    push(bySlug);
    return out;
  }
  // career slugs like "frontend-developer" map to the base skill's practice
  // ("frontend") so developers get platform-matched challenges, not generic ones
  const baseSlug = ctx.slug?.replace(/-(developer|engineer|specialist|analyst|consultant)$/i, "");
  const byBase = baseSlug && baseSlug !== ctx.slug ? ROADMAP_PRACTICE[baseSlug] : null;
  if (byBase) {
    push(byBase);
    return out;
  }
  const byCategory = ctx.skillCategory ? categoryPractice(ctx.skillCategory) : null;
  if (byCategory) {
    push(byCategory);
    return out;
  }
  const byDomain = ctx.domain ? DOMAIN_PRACTICE[ctx.domain] : null;
  if (byDomain) {
    push(byDomain);
    return out;
  }
  return out;
};

// ── project building ─────────────────────────────────────────────────────────
// Curated knowledge entries carry projects as compact { t, d } pairs. They are
// enriched into the full ProjectRef model (difficulty, time, skills, goal,
// requirements, outcome, extensions) via the project catalog. Context guards
// drop web-only project titles from infra/back-end roadmaps ("Shopping cart
// state" never appears in a DevOps map). When a topic has exactly one project,
// a catalog companion supplies a second — so meaningful topics offer at least
// two builds (guided + practical) and empty topics stay empty.
const enrichProjects = (rawProjects, label, ctx) => {
  const roadmapSlug = ctx.careerSlug ?? ctx.slug ?? "";
  const out = [];
  for (const p of rawProjects || []) {
    if (!p || !p.t) continue;
    // context guard — drop web-only projects from non-web roadmaps
    const guard = PROJECT_GUARDS[p.t];
    if (guard && !guard.test(roadmapSlug)) continue;
    const hint = PROJECT_TITLE_HINTS[p.t] ?? {};
    const comp = PROJECT_COMPANIONS[p.t];
    out.push({
      title: p.t,
      description: p.d || `A hands-on ${label.toLowerCase()} project to prove the skill.`,
      difficulty: hint.difficulty ?? (comp?.difficulty ?? (/\(advanced|cluster|pipeline|infrastructure|production\)/i.test(p.t) ? "Advanced" : "Intermediate")),
      duration: hint.time ?? (comp?.time ?? "3–6 hours"),
      skills: comp?.skills ?? [label],
      goal: comp?.goal ?? p.d ?? `Build ${p.t.toLowerCase()} to apply ${label.toLowerCase()} in practice.`,
      requirements: comp?.requirements ?? [],
      outcomes: comp?.outcome ? [comp.outcome] : [],
      extensions: comp?.extensions ?? [],
    });
  }
  // exactly one project → add the curated companion for a guided + practical pair
  if (out.length === 1) {
    const comp = PROJECT_COMPANIONS[out[0].title];
    if (comp) {
      out.push({
        title: comp.t,
        description: comp.d,
        difficulty: comp.difficulty ?? "Intermediate",
        duration: comp.time ?? "3–5 hours",
        skills: comp.skills ?? [],
        goal: comp.goal ?? comp.d,
        requirements: comp.requirements ?? [],
        outcomes: comp.outcome ? [comp.outcome] : [],
        extensions: comp.extensions ?? [],
      });
    }
  }
  return out;
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

// Structured overview for the Details panel — the brief's format:
// What is it? / Why it matters / What you'll learn / Where it is used /
// Prerequisites / Outcome. Never generic filler: every field is derived from
// the curated knowledge (k) or the label itself.
function composeStructuredOverview(label, type, careerTitle, k = null, parentLabel = "", kind = "none") {
  const clean = label.replace(/^Understand:\s*/i, "").replace(/—\s*(fundamentals|practice).*$/i, "").trim();
  // parentheticals carry extra context ("Pointer basics (addresses)") that reads
  // awkwardly inside sentences — drop them for prose fields
  const proseName = clean.replace(/\(.*?\)/g, "").replace(/\s+/g, " ").trim();
  const lower = proseName.toLowerCase();
  const isProject = type === "project" || /project/i.test(label);
  const isSection = type === "section";
  const isSub = type === "subsection";
  const isConcept = type === "concept" || type === "advanced";

  // ── What is it? ──────────────────────────────────────────────
  const firstTwoSentences = (text) => {
    const parts = String(text).split(". ").slice(0, 2).join(". ").trim();
    return parts.endsWith(".") ? parts : parts + ".";
  };
  let whatIsIt;
  if (k?.d) whatIsIt = firstTwoSentences(k.d);
  else whatIsIt = firstTwoSentences(composeLabelAware(clean, type, careerTitle, parentLabel));

  // Label-aware family (long-tail fallback) — reused so the fallback fields
  // stay consistent with composeLabelAware and never emit template filler.
  const fam = familyFor(clean);
  const famFill = (s) => s.replaceAll("{label}", clean).replaceAll("{career}", careerTitle);
  const famCore = fam.core.map(famFill);

  // ── Why it matters ───────────────────────────────────────────
  const whyMatters = [];
  if (k?.why) whyMatters.push(k.why);
  if (k?.tips?.length) whyMatters.push(`Watch out for: ${k.tips[0].toLowerCase()}`);
  if (k?.int?.length) whyMatters.push(`Interviewers ask about ${lower} regularly — be ready to explain it.`);
  if (!whyMatters.length) {
    whyMatters.push(isProject
      ? `This project proves you can apply ${lower} to a real deliverable.`
      : isSection
        ? `This area is foundational — later sections assume you understand it.`
        : famFill(fam.why));
  }

  // ── What you'll learn ────────────────────────────────────────
  const youWillLearn = [];
  if (k?.obj?.length) youWillLearn.push(...k.obj.slice(0, 8));
  else {
    const subs = [];
    const label = clean;
    if (isProject) subs.push("Planning and scoping the work", "Building it step by step", "Debugging and polishing", "Presenting the result");
    subs.push(...famCore.slice(0, 5));
    youWillLearn.push(...subs.slice(0, 8));
  }

  // ── Where it is used ─────────────────────────────────────────
  const whereUsed = [];
  if (k?.proj?.length) whereUsed.push(...k.proj.slice(0, 4).map((p) => (typeof p === "string" ? p : p.t)));
  if (isSection) whereUsed.push("Every later section builds on this area");
  if (isProject) whereUsed.push("Your portfolio and interviews");
  if (whereUsed.length < 2) whereUsed.push(famFill(fam.used), `Real ${careerTitle.trim()} projects and daily work`);

  // ── Prerequisites ────────────────────────────────────────────
  const prerequisites = k?.prereq?.length
    ? [...k.prereq]
    : [isProject ? "The topics that precede this project" : `The topics covered before this point in the ${careerTitle.trim()} roadmap`];

  // ── Outcome ──────────────────────────────────────────────────
  const outcome = isProject
    ? `You will have a finished, presentable ${clean.toLowerCase()} project you can show in interviews.`
    : isSection
      ? `You will have a solid mental model of ${lower} and the confidence to work through its projects.`
      : isConcept
        ? `You will understand ${lower} well enough to apply it and explain it clearly.`
        : `You will be able to use ${lower} in real work, discuss it in interviews, and build on it in later topics.`;

  return { whatIsIt, whyMatters, youWillLearn, whereUsed, prerequisites, outcome };
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

// Topic-specific PDF discovery fallback — the coverage spec's sanctioned last
// resort ("If no strong direct learning resource exists, provide a topic-
// specific PDF discovery option… the query must include the actual topic and
// relevant domain"). The query always carries the exact topic + career domain,
// never a bare `filetype:pdf <topic>` search. Marked `query` so the sidebar
// treats it as its PDF-search action instead of a card row.
const pdfDiscoveryResource = (label, careerTitle, difficulty) => {
  const topic = cleanTopic(label).replace(/["']/g, " ").replace(/\s+/g, " ").trim() || label.trim();
  const domain = (careerTitle || "").replace(/\s+/g, " ").trim();
  const query = `filetype:pdf "${topic}"${domain ? ` ${domain}` : ""} notes`;
  return {
    title: "PDF study material",
    url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    kind: "reference",
    type: "PDF Search",
    provider: "Google",
    description: `Topic-specific lecture notes, textbooks and study guides for ${label}${domain ? ` in ${domain}` : ""}.`,
    difficulty: difficulty === "Beginner" ? "Beginner" : "Intermediate",
    estimatedTime: "15–30 min",
    isOfficial: false,
    query,
  };
};

function buildNode(label, type, ctx, opts = {}) {
  const { careerTitle, parentLabel } = ctx;
  const found = lookup(label, ctx);
  let k = found.kind !== "none" ? found.k : null;
  // Lexicon entries may carry a §career§ placeholder — substitute the title.
  if (k && found.kind === "lexicon") k = fillLexicon(k, careerTitle);
  // Resource links come from curated knowledge when present; every other
  // node (lexicon-matched, sections, containers, fallback topics) gets the
  // context-aware fallback chain (language resources → curated map → rules →
  // related family → empty state). Search URLs are stripped and replaced with
  // curated direct links. Every resource is enriched into the full model
  // (provider / type / description / difficulty / time / official flag).
  const nodeDifficulty = k?.diff ?? (type === "advanced" || type === "achievement" ? "Advanced" : type === "section" ? "Beginner" : "Intermediate");
  const rawResources = k?.res?.length ? k.res : fallbackRes(label, ctx);
  const resources = enrichResources(cleanResources(vendorizeResources(rawResources, ctx), label), label, nodeDifficulty);
  // Hard coverage guarantee: EVERY node ships at least one resource. When the
  // curated/direct chain comes up empty, append the topic-specific PDF
  // discovery fallback so no node ever opens to an empty Resources tab.
  if (resources.length === 0) {
    resources.push(pdfDiscoveryResource(label, careerTitle, nodeDifficulty));
  }
  const practice = buildPractice(label, ctx, nodeDifficulty);
  const projects = k?.proj ? enrichProjects(k.proj, label, ctx) : [];
  // The structured overview is the UI's primary content, so the long prose
  // `description` (a ~700-char paragraph per node) is dead weight in the
  // shipped JSON. Nodes that carry an overview ship a compact two-sentence
  // description instead (whatIsIt + outcome); only nodes without one keep the
  // full composed paragraph. Same for whyLearn (first why-it-matters point).
  const overview = composeStructuredOverview(label, type, careerTitle, k, parentLabel, found.kind);
  const details = {
    description: overview
      ? `${overview.whatIsIt} ${overview.outcome}`
      : composeRichDescription(label, type, careerTitle, k, parentLabel, found.kind),
    overview,
    whyLearn:
      overview?.whyMatters?.[0] ??
      (k?.why ?? `This is a core part of being a ${careerTitle.toLowerCase()} — interviewers and teams expect it.`),
    prerequisites: k?.prereq ?? ["Basics of this roadmap's foundation"],
    objectives: k?.obj ?? [`Understand ${label.toLowerCase()} in depth`, `Apply it in a hands-on project`, `Be ready to discuss it in interviews`],
    difficulty: nodeDifficulty,
    estimatedTime: k?.time ?? (type === "section" ? "Varies (2–4 weeks)" : "4–8 hours"),
    resources,
    practice,
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

// Resolve the concept-level breakdown for a topic: language-specific subtopics
// win (so C's "Functions & Scope" never gets "Arrow functions"), then curated
// list, then the mined roadmap.sh catalog, then exact-knowledge objectives.
// Topics with no real breakdown stay atomic (no fabricated "fundamentals" children).
function resolveSubtopics(label, langSlug = null) {
  const slug = slugify(label);
  if (langSlug) {
    const langSubs = LANGUAGE_SUBTOPICS[langSlug]?.[slug];
    if (langSubs?.length) return cleanSubtopics(langSubs);
  }
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

  // exact knowledge entries only — regex matches may belong to a different
  // topic. Meta/skeleton topics (Official Documentation, Beginner Exercises…)
  // stay atomic: their objectives are learning bullets, not subtopics, and
  // spawning them as concept nodes would flood every roadmap with thin leaves.
  const k = ALL_KNOWLEDGE[slug];
  const fromObjectives = META_SLUGS.has(slug) ? [] : (k?.obj ?? []).slice(0, 3).map((o) => o.split(/[:(]/)[0].trim().replace(/\.$/, ""));
  const cleaned = cleanSubtopics(fromObjectives);
  return cleaned.length >= 2 ? cleaned : [];
}

// Build a topic node (with concept + project children)
function buildTopic(label, ctx) {
  const node = buildNode(label, "topic", ctx);
  const found = lookup(label, ctx);
  const k = found.kind !== "none" ? found.k : null;
  const children = [];
  // concept-level breakdown from language-aware / curated / mined catalogs
  for (const c of resolveSubtopics(label, ctx.langSlug)) children.push(buildNode(c, "concept", ctx, { seed: "c" }));
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
    resources: enrichResources(
      cleanResources([
        { t: "Resume & LinkedIn optimization", u: "https://careers.google.com/how-we-hire/resume-tips/", k: "article" },
        { t: "Salary research — Levels.fyi", u: "https://www.levels.fyi/", k: "practice" },
        { t: "Job portals to apply on", u: "https://www.linkedin.com/jobs", k: "practice" },
      ], career.title),
      career.title,
      "Advanced"
    ),
    practice: buildPractice("Career Ready", ctx, "Advanced"),
    projects: enrichProjects(
      career.portfolioIdeas.map((p) => ({ t: p, d: `A portfolio-worthy ${p.toLowerCase()} that proves your skills.` })),
      career.title,
      ctx
    ),
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

  const ctx = {
    careerTitle: career.title,
    careerSlug: career.slug,
    slug: career.slug,
    langSlug: LANGUAGE_SLUGS.has(career.slug) ? career.slug : null,
    skillCategory: null,
    domain: career.domain,
  };

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
    resources: enrichResources(
      cleanResources(CAREER_ROOT_RESOURCES[career.slug] ?? careerFallback(career.title, career.slug), career.title),
      career.title,
      career.difficulty
    ),
    practice: buildPractice(career.title, ctx, career.difficulty),
    projects: enrichProjects(
      career.portfolioIdeas.map((p) => ({ t: p, d: `A flagship ${career.title.toLowerCase()} project for your portfolio.` })),
      career.title,
      ctx
    ),
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
  // Hand-authored authentic curricula replace the generic category skeletons
  // for the 17 programming languages — no shared cross-language defaults.
  const skeleton = CURRICULUM_LANGS.has(skill.slug)
    ? LANGUAGE_CURRICULA[skill.slug]
    : (() => {
        const builder = SKILL_SKELETON_BUILDERS[skill.template];
        if (!builder) throw new Error(`Missing skeleton builder: ${skill.template} for ${skill.slug}`);
        return builder(skill.title, skill.topics);
      })();

  const primaryCat = SKILL_CATEGORY_MAP[skill.categories?.[0]];
  const primaryLabel = primaryCat?.label ?? skill.categories?.[0] ?? "Skill";
  const ctx = {
    careerTitle: skill.title,
    careerSlug: skill.slug,
    slug: skill.slug,
    langSlug: LANGUAGE_SLUGS.has(skill.slug) ? skill.slug : null,
    skillCategory: primaryLabel,
    domain: primaryLabel,
  };

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
    resources: enrichResources(
      cleanResources(SKILL_ROOT_RESOURCES[skill.slug] ?? skillFallback(skill.title), skill.title),
      skill.title,
      skill.difficulty
    ),
    practice: buildPractice(skill.title, ctx, skill.difficulty),
    projects: enrichProjects(
      (skill.topics?.projects ?? []).map((p) => ({ t: p, d: `A hands-on ${skill.title.toLowerCase()} project to prove the skill.` })),
      skill.title,
      ctx
    ),
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
mkdirSync(PUBLIC_OUT, { recursive: true });

// Clean the output directories first so roadmaps removed from the catalog
// (e.g. non-technical careers dropped by the keep-list) don't leave stale
// JSON files behind — every file is regenerated from scratch below.
for (const f of readdirSync(OUT)) {
  if (f.endsWith(".json")) unlinkSync(join(OUT, f));
}
for (const f of readdirSync(PUBLIC_OUT)) {
  if (f.endsWith(".json")) unlinkSync(join(PUBLIC_OUT, f));
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

// ── public payloads (lazy details) ──────────────────────────────────────────
// The mindmap only needs tree structure + difficulty/time to render; the
// heavy details (resources, practice, overview, interviews…) are split into a
// per-roadmap details map that the client fetches ONLY when the details panel
// first opens (Phase 20: lazy-load resources/practice).
const slimDetails = (d) => ({ difficulty: d.difficulty, estimatedTime: d.estimatedTime });

const slimNode = (n) => {
  const out = {
    id: n.id,
    label: n.label,
    type: n.type,
    optional: !!n.optional,
    details: slimDetails(n.details),
    children: (n.children || []).map(slimNode),
  };
  if (Array.isArray(n.options)) {
    out.options = n.options.map(slimNode);
    if (n.recommended) out.recommended = n.recommended;
  }
  return out;
};

const collectDetails = (n, map) => {
  map[n.id] = n.details;
  for (const c of n.children || []) collectDetails(c, map);
  for (const o of n.options || []) collectDetails(o, map);
};

// ── certifications ───────────────────────────────────────────────────────────
// Each roadmap node carries a `certIds` array (empty when no credential is
// genuinely relevant — the UI shows a "no widely recognized certification"
// empty state instead of inventing one). Roots use the curated career/skill
// maps; topic/concept nodes use the curated topic overrides plus a conservative
// token match against each cert's topics/skills so only directly relevant
// credentials appear (e.g. "IAM" → AWS SAA, never a HubSpot cert).
const CERT_TOKEN = (s) =>
  (s || "").toLowerCase().replace(/[^a-z0-9+#. ]/g, " ").replace(/\s+/g, " ").trim();

// Topic-level certifications come ONLY from the curated topic map — a fuzzy
// token matcher produced wrong matches (e.g. "Routing policies" → CCNA, "Roles"
// → Ansible), and the spec forbids showing unrelated credentials just because
// they share the same career. Keys match as whole words so "IAM & security"
// resolves "iam" while "JavaScript" never resolves "java". Nodes without a
// curated mapping get no certs and the UI shows the empty state.
//
// Some keys are ambiguous across contexts ("lambda" = AWS Lambda in a cloud
// roadmap vs. lambda functions in Python) — those keys are excluded when the
// roadmap isn't in their owning family.
const CERT_PHRASE = (s) =>
  (s || "").toLowerCase().replace(/[^a-z0-9+#. ]/g, " ").replace(/\s+/g, " ").trim();

// ambiguous key → roadmap families where it's genuinely a cloud/provider topic
const CERT_CONTEXT_KEYS = {
  lambda: new Set(["aws", "azure", "google-cloud", "cloud-engineer", "cloud-computing", "serverless", "devops", "backend"]),
};
const CERT_CONTEXT_WORDS = /cloud|serverless|devops|aws|azure|google|backend|saas/i;

const topicCertIds = (label, ctx = {}) => {
  const words = CERT_PHRASE(label).split(" ");
  const roadmapSlug = ctx.careerSlug ?? ctx.slug ?? "";
  const isCloudFamily = CERT_CONTEXT_WORDS.test(roadmapSlug);
  for (const [key, ids] of Object.entries(CERT_TOPIC_MAP)) {
    const keyWords = CERT_PHRASE(key).split(" ");
    if (!keyWords.length || !keyWords.every((w) => w.length >= 2 && words.includes(w))) continue;
    // skip ambiguous keys outside their owning family
    const family = CERT_CONTEXT_KEYS[key];
    if (family && !family.has(roadmapSlug) && !isCloudFamily) continue;
    return ids.filter((id) => CERT_BY_ID[id]).slice(0, 4);
  }
  return [];
};

// Walk a built roadmap and attach certIds to root + topic-level nodes.
function attachRoadmapCerts(root, slug, kind, ctx = {}) {
  const rootIds = (kind === "career" ? CERT_CAREER_MAP : CERT_SKILL_MAP)[slug] ?? [];
  root.details.certIds = rootIds.filter((id) => CERT_BY_ID[id]);
  const walk = (n) => {
    if (n !== root && (n.type === "topic" || n.type === "concept" || n.type === "advanced")) {
      n.details.certIds = topicCertIds(n.label, ctx);
    }
    for (const c of n.children || []) walk(c);
    for (const o of n.options || []) walk(o);
  };
  for (const c of root.children || []) walk(c);
}

const writeRoadmap = (slug, data) => {
  attachRoadmapCerts(data.root, slug, data.meta.kind, { careerSlug: slug });
  // full JSON → data/generated (build-time validation + audits)
  writeFileSync(join(OUT, `${slug}.json`), JSON.stringify(data));
  // slim tree + details map → public/roadmaps (what the app actually serves)
  writeFileSync(join(PUBLIC_OUT, `${slug}.json`), JSON.stringify({ meta: data.meta, stats: data.stats, root: slimNode(data.root) }));
  const detailsMap = {};
  collectDetails(data.root, detailsMap);
  writeFileSync(join(PUBLIC_OUT, `${slug}.details.json`), JSON.stringify(detailsMap));
};

// The certification catalog is a single shared static asset the client fetches
// lazily — only when the Certifications tab is first opened (never on initial
// page load). Roadmap nodes only ship small certIds arrays. Link fields are
// normalized from the author-friendly { t, u, k } to { title, url, kind } so
// the client model stays consistent with Resource/PracticeItem.
const normalizeCertLinks = (links) => (links || []).map(({ t, u, k }) => ({ title: t, url: u, kind: k }));
const CERT_PUBLIC = CERTIFICATIONS.map((c) => ({
  ...c,
  prep: normalizeCertLinks(c.prep),
  practice: normalizeCertLinks(c.practice),
}));
writeFileSync(join(OUT, "certifications.json"), JSON.stringify(CERT_PUBLIC));
writeFileSync(join(PUBLIC_OUT, "certifications.json"), JSON.stringify(CERT_PUBLIC));

for (const career of ALL_CAREERS) {
  try {
    const data = buildCareer(career);
    writeRoadmap(career.slug, data);
    addIndexEntry(data);
  } catch (e) {
    failures += 1;
    console.error(`✗ ${career.slug}: ${e.message}`);
  }
}

for (const skill of SKILLS) {
  try {
    const data = buildSkill(skill);
    writeRoadmap(skill.slug, data);
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
console.log(`✓ Generated ${ALL_CAREERS.length - failures}/${ALL_CAREERS.length} careers + ${skillCount} skills → data/generated/ + public/roadmaps/`);
console.log(`  Careers: ${itCount} IT, ${nonItCount} Non-IT · Skills: ${skillCount} across ${SKILL_CATEGORIES.length} categories`);
console.log(`  Total nodes across all roadmaps: ${Object.values(index.roadmaps).reduce((a, r) => a + r.nodeCount, 0)}`);
