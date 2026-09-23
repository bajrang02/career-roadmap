// ─────────────────────────────────────────────────────────────────────────────
// CareerRoadmaps v2 — Complete Dataset Generator
// Generates website-compatible JSON from structured source data.
// Run: node data/v2/generate-v2.mjs → writes data/v2/generated/ + public/roadmaps/
// ─────────────────────────────────────────────────────────────────────────────
import { writeFileSync, mkdirSync, existsSync, readdirSync, readFileSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GENERATED = join(__dirname, "generated");
const PUBLIC_OUT = join(__dirname, "..", "..", "public", "roadmaps");
const OUTPUT_10 = join(__dirname, "deliverables");

// ── Load source data ────────────────────────────────────────────────────────
const _careersRaw = JSON.parse(readFileSync(join(__dirname, "source", "careers-v2.json"), "utf8"));
const CAREERS = _careersRaw.careers || _careersRaw;
const _skillsRaw = JSON.parse(readFileSync(join(__dirname, "source", "skills-v2.json"), "utf8"));
const SKILLS = _skillsRaw.skills || _skillsRaw;
const _resourcesRaw = JSON.parse(readFileSync(join(__dirname, "source", "resources-v2.json"), "utf8"));
const RESOURCES = _resourcesRaw.resources || _resourcesRaw;
const _practiceRaw = JSON.parse(readFileSync(join(__dirname, "source", "practice-v2.json"), "utf8"));
const PRACTICE = _practiceRaw.practice || _practiceRaw;
import { buildNodeTasks } from "./node-tasks.mjs";
const _projectsRaw = JSON.parse(readFileSync(join(__dirname, "source", "projects-v2.json"), "utf8"));
const PROJECTS = _projectsRaw.projects || _projectsRaw;
const _certsRaw = JSON.parse(readFileSync(join(__dirname, "source", "certifications-v2.json"), "utf8"));
const CERTIFICATIONS = _certsRaw.certifications || _certsRaw;
const TAXONOMY = JSON.parse(readFileSync(join(__dirname, "taxonomy.json"), "utf8"));

// ── Roadmap → certification linkage ────────────────────────────────────────
// A roadmap's ROOT node carries the ids of certifications genuinely relevant
// to the whole domain. Mapping is EXPLICIT and many-to-many: every credential
// in the catalogue declares the roadmaps it applies to (roadmapIds), authored
// and audited in data/v2/certifications/source/*.mjs. There is deliberately no
// keyword matching, alias table or provider heuristic here — those are exactly
// how unrelated credentials leak onto the wrong roadmap. Ids are validated
// against the shipped catalogue; unknown ids are dropped.
const CERT_IDS = new Set(CERTIFICATIONS.map((c) => c.id));
const CERT_BY_ROADMAP = new Map();
for (const cert of CERTIFICATIONS) {
  for (const slug of cert.roadmapIds || []) {
    if (!CERT_BY_ROADMAP.has(slug)) CERT_BY_ROADMAP.set(slug, new Set());
    CERT_BY_ROADMAP.get(slug).add(cert.id);
  }
}

/** @param {string} slug roadmap slug; kind is retained for call-site clarity */
function resolveCertIdsFor(slug) {
  const ids = [...(CERT_BY_ROADMAP.get(slug) || [])];
  return ids.filter((id) => CERT_IDS.has(id));
}

// ── Utilities ───────────────────────────────────────────────────────────────
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/[\s_]+/g, "-");
let counter = 0;
const hashId = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  counter += 1;
  return (h >>> 0).toString(36) + "-" + counter.toString(36);
};

// ── Resource enrichment ─────────────────────────────────────────────────────
const OFFICIAL_DOMAINS = new Set([
  "docs.python.org", "developer.mozilla.org", "react.dev", "angular.io", "vuejs.org",
  "nodejs.org", "nextjs.org", "docs.docker.com", "kubernetes.io", "learn.microsoft.com",
  "docs.aws.amazon.com", "cloud.google.com/docs", "developer.apple.com", "developer.android.com",
  "flutter.dev", "dart.dev", "www.typescriptlang.org", "go.dev", "www.rust-lang.org",
  "docs.oracle.com", "spring.io", "www.djangoproject.com", "flask.palletsprojects.com",
  "fastapi.tiangolo.com", "docs.sqlalchemy.org", "www.postgresql.org", "dev.mysql.com",
  "www.mongodb.com", "redis.io", "grafana.com", "prometheus.io", "terraform.io",
  "help.autodesk.com", "help.solidworks.com", "www.mathworks.com", "ansyshelp.ansys.com",
  "www.abet.org", "www.onetonline.org", "www.bls.gov", "www.ieee.org", "www.acm.org",
  "www.isaca.org", "www.pmI.org", "www.nist.gov", "niccs.cisa.gov"
]);

const enrichResources = (rawList, topicLabel, difficulty) => {
  return (rawList || []).map(r => {
    const url = r.url || r.u;
    const isOfficial = [...OFFICIAL_DOMAINS].some(d => url.includes(d));
    return {
      title: r.title || r.t,
      url,
      kind: r.kind || r.k || (isOfficial ? "docs" : "article"),
      type: r.type || (isOfficial ? "Official Documentation" : r.kind === "course" ? "Course" : r.kind === "video" ? "Video Tutorial" : r.kind === "practice" ? "Practice Platform" : "Article"),
      provider: r.provider || new URL(url).hostname.replace("www.", ""),
      description: r.description || `Learn about ${topicLabel} with this ${r.kind || "article"} resource.`,
      difficulty: r.difficulty || difficulty || "Intermediate",
      estimatedTime: r.estimatedTime || "1-2 hours",
      isOfficial,
    };
  });
};

// ── Practice enrichment ─────────────────────────────────────────────────────
const enrichPractice = (rawList, topicLabel, difficulty) => {
  return (rawList || []).map(p => ({
    title: p.title || p.t,
    platform: p.platform || p.p,
    url: p.url || p.u,
    difficulty: p.difficulty || difficulty || "Intermediate",
    estimatedTime: p.estimatedTime || p.e || "30-60 min",
    skills: p.skills || [],
    description: p.description || p.ds || `Practice ${topicLabel} on ${p.platform || "this platform"} to build real skill.`,
  }));
};

// ── Project enrichment ──────────────────────────────────────────────────────
const enrichProjects = (rawList, topicLabel, difficulty) => {
  return (rawList || []).map(p => ({
    title: p.title || p.t,
    description: p.description || p.d || `A hands-on ${topicLabel} project to prove the skill.`,
    difficulty: p.difficulty || difficulty || "Intermediate",
    duration: p.duration || p.time || "3-6 hours",
    skills: p.skills || [topicLabel],
    goal: p.goal || p.d || `Build ${topicLabel} project to apply skills in practice.`,
    requirements: p.requirements || [],
    outcomes: p.outcomes || [],
    extensions: p.extensions || [],
  }));
};

// ── Node builder ────────────────────────────────────────────────────────────
// Some catalog keys are AMBIGUOUS template keys: "system-design",
// "data-structures-algorithms", "database-design", "configuration-management",
// "control-systems", "structural-design" hold SOFTWARE templates (URL
// Shortener, Chat System, DSA pipeline…). A career whose node merely shares
// the label (HVAC "System Design", UI/UX "Data Structures & Algorithms") must
// not inherit them — they may only back nodes on software-context roadmaps.
const AMBIGUOUS_SOFTWARE_TEMPLATE_KEYS = new Set([
  "system-design", "data-structures-algorithms", "database-design",
  "configuration-management", "control-systems", "structural-design",
  "machine-learning", "predictive-model",
]);
const SOFTWARE_CONTEXT_RE = /software|backend|frontend|full-stack|web|mobile|ios|android|devops|sre|cloud|data|analyst|ml|ai|computer|programming|developer|dsa|algorithm|system-design|database|sql|qa|sdet|security|cyber|blockchain|game|mlops|platform|infrastructure|kubernetes|docker|linux/;
function guardedCatalogLookup(dict, key, label, careerSlug) {
  const softwareCtx = SOFTWARE_CONTEXT_RE.test(String(careerSlug || ""));
  const blocked = (k) => AMBIGUOUS_SOFTWARE_TEMPLATE_KEYS.has(k) && !softwareCtx;
  if (key && dict[key] && !blocked(key)) return dict[key];
  if (label && dict[label] && !blocked(slugify(label))) return dict[label];
  return [];
}
function buildNode(label, type, ctx, opts = {}) {
  const { careerTitle, parentLabel, careerSlug, knowledgeBase } = ctx;
  const key = slugify(label);
  const k = knowledgeBase?.[key] || knowledgeBase?.[label] || null;
  const nodeDifficulty = k?.difficulty || opts.difficulty || (type === "section" ? "Beginner" : type === "advanced" ? "Advanced" : "Intermediate");

  // Resources
  const rawRes = k?.resources || guardedCatalogLookup(RESOURCES, key, label, careerSlug);
  const resources = enrichResources(rawRes, label, nodeDifficulty);

  // Practice
  const rawPractice = k?.practice || guardedCatalogLookup(PRACTICE, key, label, careerSlug);
  const practice = enrichPractice(rawPractice, label, nodeDifficulty);

  // Projects — same ambiguous-key guard (see guardedCatalogLookup above)
  const rawProjects = k?.projects || guardedCatalogLookup(PROJECTS, key, label, careerSlug);
  const projects = enrichProjects(rawProjects, label, nodeDifficulty);

  // Every meaningful learning node owns ONE concrete practice task and ONE
  // mini-project that name its own topic and its roadmap's professional domain.
  // Without this, a node with no catalog hit inherited a platform landing page
  // plus the roadmap root's projects — coverage that looked complete but was not
  // specific to the topic the student actually opened.
  const nodeTasks = buildNodeTasks({ label, type, careerTitle, careerSlug });
  // Always attach the node's own task: a platform landing page is not a
  // directly relevant practice activity, so directness must not depend on
  // whether a catalog deep-link happened to exist for this topic.
  if (nodeTasks.practice && !practice.some((p) => p.task)) practice.unshift(nodeTasks.practice);
  if (nodeTasks.project && projects.length === 0) projects.push(nodeTasks.project);

  // NOTE: no filler/search-fallback resource is injected here. Nodes without
  // curated resources stay empty at build time — the client-side resolver
  // layers topic → parent → skill → career datasets on top, and dedicated
  // study-search actions are generated in the UI (lib/search-utils.ts).

  const details = {
    description: k?.description || `${label} is a core topic in ${careerTitle}. Mastering it builds foundational competence for the role.`,
    overview: {
      whatIsIt: k?.whatIsIt || `${label} is a fundamental concept in ${careerTitle} work.`,
      whyMatters: (Array.isArray(k?.whyMatters) ? k.whyMatters : k?.whyMatters ? [k.whyMatters] : [`Understanding ${label} is essential for performing ${careerTitle} responsibilities effectively.`]),
      youWillLearn: k?.objectives || [`Understand ${label} fundamentals`, `Apply ${label} in practical scenarios`, `Demonstrate competence in interviews`],
      whereUsed: k?.whereUsed || [`Everyday ${careerTitle} work`, `Projects and interviews`, `Team discussions and code reviews`],
      prerequisites: k?.prerequisites || [`Understanding of preceding topics in this roadmap`],
      outcome: k?.outcome || `You will be able to apply ${label} knowledge in real ${careerTitle} work and discuss it confidently.`,
    },
    whyLearn: k?.whyMatters || `${label} is a core skill for ${careerTitle} — interviewers and teams expect competence here.`,
    prerequisites: k?.prerequisites || ["Fundamentals of this domain"],
    objectives: k?.objectives || [`Understand ${label} in depth`, `Apply it in hands-on projects`, `Be ready to discuss it in interviews`],
    difficulty: nodeDifficulty,
    estimatedTime: k?.estimatedTime || (type === "section" ? "Varies (2-4 weeks)" : "4-8 hours"),
    resources,
    practice,
    projects,
    interviewQuestions: k?.interviewQuestions || [
      `Explain ${label} to a beginner in simple terms.`,
      `Why does ${label} matter for a ${careerTitle.toLowerCase()}?`,
      `What is a common mistake people make with ${label}?`,
    ],
    careerRelevance: `Directly relevant to ${careerTitle} — expect this in interviews and daily work.`,
    commonMistakes: k?.commonMistakes || ["Rushing past the fundamentals", "Learning without practicing", "Not building things as you go"],
    tips: k?.tips || ["Practice a little every day", "Explain what you learn out loud or in writing", "Build something real with every topic"],
    nextTopics: [],
    optional: opts.optional || false,
    certIds: k?.certIds || [],
  };

  return {
    id: hashId(`${careerSlug}|${type}|${label}|${opts.seed || ""}`),
    label,
    type,
    optional: opts.optional || false,
    details,
    children: [],
  };
}

function linkSiblings(nodes) {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].details.nextTopics = nodes[i + 1] ? [nodes[i + 1].label] : [];
  }
}

// ── Section builder ─────────────────────────────────────────────────────────
function buildSection(section, ctx) {
  const node = buildNode(section.title, "section", ctx);
  const children = [];

  for (const item of section.topics || []) {
    if (typeof item === "string") {
      const topicNode = buildNode(item, "topic", ctx);
      // Add concepts from subtopics
      if (section.subtopics && section.subtopics[item]) {
        const concepts = [];
        for (const sub of section.subtopics[item]) {
          concepts.push(buildNode(sub, "concept", ctx, { seed: "c" }));
        }
        linkSiblings(concepts);
        topicNode.children = concepts;
      }
      children.push(topicNode);
    } else if (item && typeof item === "object") {
      if (item.choice) {
        // Choice node
        const choiceNode = buildNode(item.title, "choice", ctx, { optional: true });
        choiceNode.options = [];
        for (const opt of item.options || []) {
          if (typeof opt === "string") {
            choiceNode.options.push(buildNode(opt, "topic", ctx));
          } else {
            const sub = buildNode(opt.title, "subsection", ctx);
            const subChildren = [];
            for (const t of (opt.topics || [])) {
              subChildren.push(buildNode(typeof t === "string" ? t : t.title, "topic", ctx));
            }
            linkSiblings(subChildren);
            sub.children = subChildren;
            choiceNode.options.push(sub);
          }
        }
        if (item.recommended) {
          const recNode = choiceNode.options.find(o => o.label === item.recommended);
          if (recNode) choiceNode.recommended = recNode.id;
        }
        children.push(choiceNode);
      } else {
        const sub = buildNode(item.title, "subsection", ctx, { optional: item.optional });
        const subChildren = [];
        for (const t of (item.topics || [])) {
          subChildren.push(buildNode(typeof t === "string" ? t : t.title, "topic", ctx));
        }
        linkSiblings(subChildren);
        sub.children = subChildren;
        children.push(sub);
      }
    }
  }
  linkSiblings(children);
  node.children = children;
  return node;
}

// ── Interview preparation section ───────────────────────────────────────────
function interviewSection(career, ctx) {
  const isTech = career.category === "it";
  const node = buildNode("Interview Preparation", "section", ctx);
  const groups = [];
  groups.push({
    title: "Core Revision",
    topics: isTech
      ? ["Fundamentals revision", "Data Structures & Algorithms", "Coding practice (LeetCode)", "Problem-solving patterns"]
      : ["Core concepts revision", "Mock tests & practice", "Common interview questions", "Speed & accuracy"],
  });
  if (isTech) {
    groups.push({ title: "Technical Interview", topics: ["System design basics", "Whiteboard practice", "Behavioral questions (STAR)", "Take-home projects"] });
  } else {
    groups.push({ title: "Interview Skills", topics: ["Case studies & aptitude", "Behavioral questions (STAR)", "Domain deep dives", "Portfolio walkthrough"] });
  }
  groups.push({ title: "Job Hunting", topics: ["Resume & LinkedIn", "Portfolio & proof of work", "Job portals & networking", "Salary negotiation", "Offer evaluation"] });

  const children = [];
  for (const g of groups) {
    const sub = buildNode(g.title, "subsection", ctx);
    const subKids = [];
    for (const t of g.topics) subKids.push(buildTopic(t, ctx));
    linkSiblings(subKids);
    sub.children = subKids;
    children.push(sub);
  }
  linkSiblings(children);
  node.children = children;
  return node;
}

function buildTopic(label, ctx) {
  const node = buildNode(label, "topic", ctx);
  // Add concepts from knowledge base
  const key = slugify(label);
  const k = ctx.knowledgeBase?.[key] || ctx.knowledgeBase?.[label] || null;
  const children = [];
  if (k?.concepts?.length) {
    for (const c of k.concepts) {
      children.push(buildNode(c, "concept", ctx, { seed: "c" }));
    }
  } else if (k?.subtopics?.length) {
    for (const s of k.subtopics) {
      children.push(buildNode(s, "concept", ctx, { seed: "c" }));
    }
  }
  linkSiblings(children.filter(c => c.type === "concept"));
  node.children = children;
  return node;
}

function careerReadyNode(career, ctx) {
  const node = buildNode("🎓 Career Ready", "achievement", ctx);
  node.details = {
    description: `You've completed the ${career.title} roadmap. You now have the skills, projects and interview preparation to enter the field with confidence.`,
    whyLearn: "This milestone marks you as job-ready in this career.",
    prerequisites: ["Complete the sections above in order"],
    objectives: ["Ship your portfolio projects", "Pass mock interviews", "Apply with confidence"],
    difficulty: "Advanced",
    estimatedTime: "Ongoing",
    resources: [],
    practice: [],
    projects: (career.portfolioProjects || []).map(p => ({
      title: p, description: `A portfolio-worthy ${p.toLowerCase()} project.`, difficulty: "Advanced",
      duration: "1-2 weeks", skills: career.tools || [], goal: `Build ${p} to prove your skills.`,
      requirements: [], outcomes: [], extensions: [],
    })),
    interviewQuestions: ["Walk me through your best project", "Why did you choose this career?", "Where do you see yourself in 3 years?"],
    careerRelevance: "This milestone converts your learning into income.",
    commonMistakes: ["Waiting for perfection before applying", "Ignoring soft skills", "Not updating your portfolio"],
    tips: ["Apply to 5+ roles with a tailored resume", "Do a mock interview every week", "Keep a public log of what you build"],
    nextTopics: career.specializations || [],
    optional: false,
    certIds: [],
  };
  const sub = buildNode("Specializations & Next Steps", "subsection", ctx);
  const kids = (career.specializations || []).map(s => {
    const n = buildNode(s, "advanced", ctx, { seed: "spec" });
    n.details.nextTopics = [];
    return n;
  });
  linkSiblings(kids);
  sub.children = kids;
  node.children = kids.length ? [sub] : [];
  return node;
}

// ── Stats collection ────────────────────────────────────────────────────────
function collectStats(node, acc = { total: 0, byType: {} }) {
  acc.total += 1;
  acc.byType[node.type] = (acc.byType[node.type] || 0) + 1;
  for (const c of node.children || []) collectStats(c, acc);
  for (const o of node.options || []) collectStats(o, acc);
  return acc;
}

function flattenLabels(node, out = []) {
  out.push(node.label);
  for (const c of node.children || []) flattenLabels(c, out);
  for (const o of node.options || []) flattenLabels(o, out);
  return out;
}

// ── Build career roadmap ────────────────────────────────────────────────────
function buildCareer(career) {
  const ctx = {
    careerTitle: career.title,
    careerSlug: career.slug,
    slug: career.slug,
    knowledgeBase: career.knowledgeBase || {},
  };

  const root = buildNode(career.title, "career", ctx);
  root.details = {
    description: career.description,
    whyLearn: career.tagline + " " + career.description,
    prerequisites: career.prerequisites || [],
    objectives: [
      `Build a complete foundation in ${career.title.toLowerCase()}`,
      "Complete hands-on projects for your portfolio",
      "Pass interviews with confidence",
      "Land your first role",
    ],
    difficulty: career.difficulty || "Intermediate",
    estimatedTime: career.duration || "6-12 months",
    resources: enrichResources(career.rootResources || [], career.title, career.difficulty),
    practice: [],
    projects: (career.portfolioProjects || []).slice(0, 3).map(p => ({
      title: p, description: `A flagship ${career.title.toLowerCase()} project.`,
      difficulty: "Intermediate", duration: "1-2 weeks", skills: career.tools || [],
      goal: p, requirements: [], outcomes: [], extensions: [],
    })),
    interviewQuestions: [
      `Why do you want to become a ${career.title.toLowerCase()}?`,
      "Walk me through a project you're proud of",
      "How do you keep your skills up to date?",
    ],
    careerRelevance: `${career.title} is a ${career.demand || "high"} demand career with typical salaries of ${career.salary || "$70k-$150k+"}.`,
    commonMistakes: ["Learning passively without building", "Jumping between topics too fast", "Ignoring soft skills"],
    tips: ["Follow this roadmap in order", "Build and publish projects at every stage", "Join communities and network"],
    nextTopics: career.specializations || [],
    optional: false,
    certIds: resolveCertIdsFor(career.slug),
  };

  const sectionNodes = (career.sections || []).map(s => buildSection(s, ctx));
  root.children = sectionNodes;
  // Only append the generated Interview Preparation section when the career's
  // own curriculum doesn't already include one — appending unconditionally
  // produced TWO "Interview Preparation" sections per roadmap (111 careers
  // have their own authored section) and inflated topic counts.
  const hasAuthoredInterviewSection = (career.sections || []).some(
    (s) => s && typeof s.title === "string" && s.title.toLowerCase().includes("interview")
  );
  if (!hasAuthoredInterviewSection) {
    root.children.push(interviewSection(career, ctx));
  }
  root.children.push(careerReadyNode(career, ctx));

  const stats = collectStats(root);
  const labels = flattenLabels(root);
  const learnable = (stats.byType.topic || 0) + (stats.byType.concept || 0) + (stats.byType.project || 0) + (stats.byType.advanced || 0) + (stats.byType.interview || 0);

  return {
    meta: {
      slug: career.slug, title: career.title, tagline: career.tagline, description: career.description,
      kind: "career", category: career.category || "it",
      domain: career.domain || "Software Development",
      skillCategory: "Career", industry: career.industry || "Technology",
      icon: career.icon, color: career.color,
      difficulty: career.difficulty || "Intermediate",
      duration: career.duration || "6-12 months",
      durationHours: career.durationHours || 320,
      salary: career.salary || "$70k-$150k+",
      demand: career.demand || "High",
      demandLevel: career.demandLevel || 4,
      prerequisites: career.prerequisites || [],
      certifications: career.certifications || [],
      tools: career.tools || [],
      softSkills: career.softSkills || [],
      portfolioIdeas: career.portfolioProjects || [],
      specializations: career.specializations || [],
      examMeta: null,
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
      estimatedHours: career.durationHours || 320,
      keywords: labels.filter(l => !l.startsWith("Understand:") && !l.includes("— fundamentals")).slice(0, 220),
    },
    root,
  };
}

// ── Build skill roadmap ─────────────────────────────────────────────────────
function buildSkill(skill) {
  const ctx = {
    careerTitle: skill.title,
    careerSlug: skill.slug,
    slug: skill.slug,
    knowledgeBase: skill.knowledgeBase || {},
  };

  const root = buildNode(skill.title, "career", ctx);
  root.details = {
    description: skill.description,
    whyLearn: skill.tagline + " " + skill.description,
    prerequisites: skill.prerequisites || ["No prerequisites — start from scratch"],
    objectives: [
      `Build a complete foundation in ${skill.title.toLowerCase()}`,
      "Progress from fundamentals to advanced topics",
      "Complete hands-on projects and practice",
      "Be interview-ready",
    ],
    difficulty: skill.difficulty || "Beginner",
    estimatedTime: skill.duration || "3-6 months",
    resources: enrichResources(skill.rootResources || [], skill.title, skill.difficulty),
    practice: [],
    projects: (skill.portfolioProjects || skill.topics?.projects || []).map(p => ({
      title: p, description: `A hands-on ${skill.title.toLowerCase()} project.`,
      difficulty: "Intermediate", duration: "2-4 hours", skills: [skill.title],
      goal: `Apply ${skill.title.toLowerCase()} in practice.`, requirements: [], outcomes: [], extensions: [],
    })),
    interviewQuestions: [
      `Explain ${skill.title.toLowerCase()} to a beginner.`,
      "Walk me through a project where you used this skill.",
      "What are common mistakes beginners make?",
    ],
    careerRelevance: `${skill.title} is widely used across the industry.`,
    commonMistakes: ["Learning passively", "Skipping fundamentals", "Jumping to advanced too early"],
    tips: ["Practice daily", "Build small projects", "Read the official docs"],
    nextTopics: skill.roles || [],
    optional: false,
    certIds: resolveCertIdsFor(skill.slug),
  };

  const sectionNodes = (skill.sections || []).map(s => buildSection(s, ctx));
  root.children = sectionNodes;

  const stats = collectStats(root);
  const labels = flattenLabels(root);
  const learnable = (stats.byType.topic || 0) + (stats.byType.concept || 0) + (stats.byType.project || 0) + (stats.byType.advanced || 0);

  return {
    meta: {
      slug: skill.slug, title: skill.title, tagline: skill.tagline, description: skill.description,
      kind: "skill", category: "skill", domain: skill.domain || "Technology",
      skillCategory: skill.skillCategory || "Skill", industry: skill.skillCategory || "Technology",
      icon: skill.icon, color: skill.color,
      difficulty: skill.difficulty || "Beginner",
      duration: skill.duration || "3-6 months",
      durationHours: skill.durationHours || 120,
      salary: "—", demand: "Widely used", demandLevel: 4,
      prerequisites: skill.prerequisites || [],
      certifications: skill.certifications || [],
      tools: skill.tools || [], softSkills: [],
      portfolioIdeas: skill.portfolioProjects || skill.topics?.projects || [], specializations: skill.roles || [],
      examMeta: null,
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
      estimatedHours: skill.durationHours || 120,
      keywords: labels.filter(l => !l.startsWith("Understand:")).slice(0, 220),
    },
    root,
  };
}

// ── Output writers ──────────────────────────────────────────────────────────
const slimDetails = (d) => ({ difficulty: d.difficulty, estimatedTime: d.estimatedTime });
const slimNode = (n) => {
  const out = { id: n.id, label: n.label, type: n.type, optional: !!n.optional, details: slimDetails(n.details), children: (n.children || []).map(slimNode) };
  if (Array.isArray(n.options)) { out.options = n.options.map(slimNode); if (n.recommended) out.recommended = n.recommended; }
  return out;
};
const collectDetails = (n, map) => { map[n.id] = n.details; for (const c of n.children || []) collectDetails(c, map); for (const o of n.options || []) collectDetails(o, map); };

// ── Main ────────────────────────────────────────────────────────────────────
mkdirSync(GENERATED, { recursive: true });
mkdirSync(PUBLIC_OUT, { recursive: true });
mkdirSync(OUTPUT_10, { recursive: true });

// Clean outputs
for (const f of readdirSync(GENERATED)) if (f.endsWith(".json")) unlinkSync(join(GENERATED, f));
for (const f of readdirSync(PUBLIC_OUT)) if (f.endsWith(".json")) unlinkSync(join(PUBLIC_OUT, f));

const index = { lastUpdated: new Date().toISOString().slice(0, 10), roadmaps: {} };
const searchIndex = [];
let failures = 0;
let skillCount = 0;

const addIndexEntry = (data, projectRecords) => {
  index.roadmaps[data.meta.slug] = {
    title: data.meta.title, icon: data.meta.icon, color: data.meta.color,
    kind: data.meta.kind, category: data.meta.category, domain: data.meta.domain,
    skillCategory: data.meta.skillCategory, industry: data.meta.industry,
    difficulty: data.meta.difficulty, duration: data.meta.duration,
    durationHours: data.meta.durationHours, salary: data.meta.salary,
    demand: data.meta.demand, demandLevel: data.meta.demandLevel,
    nodeCount: data.stats.totalNodes, topicCount: data.stats.topics,
    projectCount: projectRecords ?? data.stats.projects, learnable: data.stats.learnable,
    estimatedHours: data.stats.estimatedHours, tagline: data.meta.tagline,
  };
  searchIndex.push({
    slug: data.meta.slug, title: data.meta.title, icon: data.meta.icon,
    kind: data.meta.kind, category: data.meta.category, domain: data.meta.domain,
    skillCategory: data.meta.skillCategory, industry: data.meta.industry,
    keywords: data.stats.keywords.slice(0, 64),
  });
};

const writeRoadmap = (slug, data) => {
  writeFileSync(join(GENERATED, `${slug}.json`), JSON.stringify(data));
  const detailsMap = {};
  collectDetails(data.root, detailsMap);
  // Real project-record count (details.projects entries). The old value was
  // stats.byType.project — a TREE NODE type count that is 0 for most roadmaps,
  // making every card display "0 projects" while 1,486 real projects ship.
  const projectRecords = Object.values(detailsMap).reduce((n, d) => n + ((d && Array.isArray(d.projects)) ? d.projects.length : 0), 0);
  const stats = { ...data.stats, projects: projectRecords };
  writeFileSync(join(PUBLIC_OUT, `${slug}.json`), JSON.stringify({ meta: data.meta, stats, root: slimNode(data.root) }));
  writeFileSync(join(PUBLIC_OUT, `${slug}.details.json`), JSON.stringify(detailsMap));
  return projectRecords;
};

// Process careers
for (const career of CAREERS) {
  try {
    const data = buildCareer(career);
    const projectRecords = writeRoadmap(career.slug, data);
    addIndexEntry(data, projectRecords);
  } catch (e) {
    failures += 1;
    console.error(`✗ career ${career.slug}: ${e.message}`);
  }
}

// Process skills
for (const skill of SKILLS) {
  try {
    const data = buildSkill(skill);
    const projectRecords = writeRoadmap(skill.slug, data);
    addIndexEntry(data, projectRecords);
    skillCount += 1;
  } catch (e) {
    failures += 1;
    console.error(`✗ skill ${skill.slug}: ${e.message}`);
  }
}

// ── Write index and metadata ────────────────────────────────────────────────
const domainCounts = new Map();
const skillCategoryCounts = new Map();
for (const entry of Object.values(index.roadmaps)) {
  if (entry.kind === "skill") skillCategoryCounts.set(entry.skillCategory, (skillCategoryCounts.get(entry.skillCategory) || 0) + 1);
  else domainCounts.set(entry.domain, (domainCounts.get(entry.domain) || 0) + 1);
}

writeFileSync(join(GENERATED, "index.json"), JSON.stringify(index, null, 2));
writeFileSync(join(GENERATED, "search-index.json"), JSON.stringify(searchIndex));
writeFileSync(join(GENERATED, "skill-categories.json"), JSON.stringify(TAXONOMY.skillCategories.map(c => ({ id: c.id, label: c.name, icon: c.icon, description: c.description, count: skillCategoryCounts.get(c.name) || 0 }))));
writeFileSync(join(GENERATED, "career-domains.json"), JSON.stringify(TAXONOMY.domains.map(d => ({ id: d.id, label: d.name, icon: d.icon, description: d.description, count: domainCounts.get(d.name) || 0 }))));
writeFileSync(join(GENERATED, "certifications.json"), JSON.stringify(CERTIFICATIONS));
writeFileSync(join(PUBLIC_OUT, "certifications.json"), JSON.stringify(CERTIFICATIONS));

// Copy the v3 topic-mapped resource/practice datasets from the
// resource-system deliverables into public/roadmaps so the client resolver can
// lazy-load them. This runs AFTER build-resource-system.mjs in `npm run data`
// (see package.json) — the previous order shipped stale legacy-shaped files,
// which was the root cause of empty Resources/Practice panels.
const resDeliverables = join(__dirname, "deliverables");
for (const fname of ["resources.json", "practice.json"]) {
  const src = join(resDeliverables, fname);
  if (existsSync(src)) {
    writeFileSync(join(PUBLIC_OUT, fname), readFileSync(src));
  }
}

// ── Write 10 deliverables ──────────────────────────────────────────────────
console.log("Writing 10 deliverables...");

// 1. careers.json
const careersOutput = CAREERS.map(c => ({
  slug: c.slug, title: c.title, description: c.description,
  domain: c.domain, category: c.category, industry: c.industry,
  difficulty: c.difficulty, duration: c.duration, salary: c.salary,
  demand: c.demand, prerequisites: c.prerequisites, tools: c.tools,
  certifications: c.certifications, specializations: c.specializations,
  sections: c.sections?.map(s => ({
    title: s.title, topics: s.topics, subtopics: s.subtopics,
  })) || [],
}));
writeFileSync(join(OUTPUT_10, "careers.json"), JSON.stringify(careersOutput, null, 2));

// 2. skills.json
writeFileSync(join(OUTPUT_10, "skills.json"), JSON.stringify(SKILLS.map(s => ({
  slug: s.slug, title: s.title, description: s.description,
  domain: s.domain, skillCategory: s.skillCategory, difficulty: s.difficulty,
  duration: s.duration, sections: s.sections?.map(sec => ({
    title: sec.title, topics: sec.topics, subtopics: sec.subtopics,
  })) || [],
})), null, 2));

// 3. taxonomy.json
writeFileSync(join(OUTPUT_10, "taxonomy.json"), JSON.stringify(TAXONOMY, null, 2));

// NOTE: resources.json / practice.json in deliverables/ are OWNED by
// data/v2/resource-system/build-resource-system.mjs (the v3 topic-mapped
// datasets). generate-v2 must never overwrite them with the legacy
// slug-keyed RESOURCES/PRACTICE maps — doing so was the root cause of the
// client resolver's schema mismatch.

// 6. projects.json
writeFileSync(join(OUTPUT_10, "projects.json"), JSON.stringify(PROJECTS, null, 2));

// 7. certifications.json
writeFileSync(join(OUTPUT_10, "certifications.json"), JSON.stringify(CERTIFICATIONS, null, 2));

// 8. sources.json — loaded from sources-v2.json
const sourcesData = JSON.parse(readFileSync(join(__dirname, "source", "sources-v2.json"), "utf8"));
const SOURCES = sourcesData.sources || sourcesData.SOURCES || sourcesData;
writeFileSync(join(OUTPUT_10, "sources.json"), JSON.stringify(SOURCES, null, 2));

// 9. validation-report.json — will be computed after generation
// 10. README.md — written separately

const careerCount = CAREERS.length;
const itCount = CAREERS.filter(c => (c.category || "it") === "it").length;
const nonItCount = careerCount - itCount;
console.log(`✓ Generated ${careerCount - failures}/${careerCount} careers + ${skillCount} skills`);
console.log(`  Careers: ${itCount} IT/Tech, ${nonItCount} Non-IT · Skills: ${skillCount}`);
console.log(`  Total nodes: ${Object.values(index.roadmaps).reduce((a, r) => a + r.nodeCount, 0)}`);
// Sync generated files to data/generated/ so the app's @/data/generated imports work.
// Remove any stale per-roadmap files from retired slugs — without this, files
// for roadmaps no longer in the source (129 of them: adobe-xd, autocad, ci-cd,
// …) lingered alongside the authoritative 261 and shipped dead search-index
// keywords. Only metadata files plus slugs present in the current index remain.
const LEGACY_GEN = join(__dirname, "..", "generated");
mkdirSync(LEGACY_GEN, { recursive: true });
const META_FILES = new Set(["index.json", "search-index.json", "skill-categories.json", "career-domains.json", "certifications.json"]);
for (const fname of readdirSync(LEGACY_GEN)) {
  if (!fname.endsWith(".json")) continue;
  if (!META_FILES.has(fname) && !index.roadmaps[fname.replace(".json", "")]) {
    unlinkSync(join(LEGACY_GEN, fname));
  }
}
for (const fname of readdirSync(GENERATED)) {
  if (fname.endsWith(".json")) {
    writeFileSync(join(LEGACY_GEN, fname), readFileSync(join(GENERATED, fname)));
  }
}
console.log(`  Output: data/v2/generated/ + data/generated/ + public/roadmaps/ + data/v2/deliverables/`);
