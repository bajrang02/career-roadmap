import type { Resource } from "@/lib/types";

// ── Domain context for search queries ────────────────────────────────────────
// Search queries must never be generic ("filetype:pdf programming") — every
// query carries the quoted topic plus a career/domain-specific context word so
// results are directly relevant to the learner's roadmap.

const FIELD_CONTEXT: Array<[RegExp, string]> = [
  [/full ?stack/i, "web development"],
  [/mechanical/i, "mechanical engineering"],
  [/civil/i, "civil engineering"],
  [/electrical/i, "electrical engineering"],
  [/electronics|ece/i, "electronics communication"],
  [/agriculture|agri/i, "agricultural engineering"],
  [/cyber/i, "cybersecurity"],
  [/data scien|data analyst|data engineer|analytics/i, "data science"],
  [/machine learning|artificial|deep learning|ai\b/i, "machine learning"],
  [/devops|sre|site reliability/i, "devops"],
  [/cloud/i, "cloud computing"],
  [/network/i, "computer networks"],
  [/database|sql/i, "database"],
  [/web|frontend|front-end|ui\/?ux/i, "web development"],
  [/backend|back-end/i, "backend development"],
  [/mobile|android|ios|flutter|react native/i, "mobile development"],
  [/game/i, "game development"],
  [/embedded|firmware|iot|robotics/i, "embedded systems"],
  [/programming|developer|engineer|software|computer/i, "software engineering"],
];

const SLUG_CONTEXT: Record<string, string> = {
  c: "programming",
  cpp: "programming",
  "c-plus-plus": "programming",
  "c-sharp": "programming",
  csharp: "programming",
  java: "programming",
  python: "programming",
  javascript: "programming",
  js: "programming",
  typescript: "programming",
  rust: "programming",
  go: "programming",
  ruby: "programming",
  php: "programming",
  swift: "programming",
  kotlin: "programming",
  scala: "programming",
  perl: "programming",
  dart: "programming",
  sql: "database",
  postgres: "database",
  postgresql: "database",
  mysql: "database",
  mongodb: "database",
  git: "version control",
  docker: "devops",
  kubernetes: "devops",
  k8s: "devops",
  aws: "cloud computing",
  azure: "cloud computing",
  gcp: "cloud computing",
  react: "web development",
  vue: "web development",
  angular: "web development",
  html: "web development",
  css: "web development",
  node: "backend development",
  nodejs: "backend development",
  "node-js": "backend development",
  "machine-learning": "machine learning",
  "deep-learning": "machine learning",
  "data-science": "data science",
  cybersecurity: "cybersecurity",
  "cyber-security": "cybersecurity",
  networking: "computer networks",
};

/** A field/domain context word that keeps search results on-topic for this roadmap. */
export function searchContext(roadmapTitle: string, roadmapSlug: string): string {
  const slug = (roadmapSlug || "").toLowerCase();
  // exact skill slug first (e.g. "c" → programming, "sql" → database, "react" → web development)
  if (SLUG_CONTEXT[slug]) return SLUG_CONTEXT[slug];
  const title = roadmapTitle || "";
  for (const [re, ctx] of FIELD_CONTEXT) {
    if (re.test(title)) return ctx;
  }
  const base = slug.replace(/[-_](developer|engineer|specialist|analyst|consultant|roadmap)$/i, "");
  if (SLUG_CONTEXT[base]) return SLUG_CONTEXT[base];
  const clean = title.trim();
  return clean ? clean.toLowerCase() : "programming";
}

/** Topic label → searchable terms (strip emoji, prefixes and decorative suffixes). */
export function cleanTopic(label: string): string {
  return (label || "")
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu, "")
    .replace(/^Understand:\s*/i, "")
    .replace(/\s*[—–-]\s*(fundamentals|practice|overview|basics|core|interview).*$/i, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const googleSearch = (query: string) => `https://www.google.com/search?q=${encodeURIComponent(query)}`;

export interface SearchOptionInput {
  topic: string;
  roadmapTitle: string;
  roadmapSlug: string;
}

/**
 * Four topic-specific search options for a node: web, PDF notes (filetype:pdf),
 * books and study material. URLs are generated from structured topic data and
 * safely encoded — nothing here is hardcoded or validated as a live PDF; the
 * queries are the discovery tool.
 */
export function generateSearchOptions(input: SearchOptionInput): Resource[] {
  const topic = cleanTopic(input.topic) || input.topic;
  const context = searchContext(input.roadmapTitle, input.roadmapSlug);
  const lower = topic.toLowerCase();
  const q = (s: string) => s.replace(/\s+/g, " ").trim();

  const make = (title: string, type: Resource["type"], query: string, description: string): Resource => ({
    title,
    type,
    kind: "search",
    provider: "Google",
    query,
    url: googleSearch(query),
    description,
    isOfficial: false,
  });

  return [
    make(
      "Search Web",
      "Web Search",
      q(`"${topic}" ${context}`),
      `Search the web for ${lower} tutorials, documentation and examples.`
    ),
    make(
      "Find PDF Notes",
      "PDF Search",
      q(`filetype:pdf "${topic}" ${context} notes`),
      `Find lecture notes, textbooks, technical references and study guides for ${lower}.`
    ),
    make(
      "Find Books",
      "Book Search",
      q(`"${topic}" ${context} book`),
      `Find books and e-books that cover ${lower} in depth.`
    ),
    make(
      "Find Study Material",
      "Study Search",
      q(`"${topic}" ${context} notes`),
      `Find study material, cheat sheets and lecture notes for ${lower}.`
    ),
  ];
}
