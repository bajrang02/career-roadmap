/**
 * Resource & Practice Resolver
 *
 * Loads the topic-mapped datasets shipped at
 *   /roadmaps/resources.json · /roadmaps/practice.json
 * and builds indexed Maps so any roadmap node can resolve its resources and
 * practice activities in O(depth) without scanning arrays.
 *
 * The datasets exist in two historical shapes; BOTH are normalized here:
 *
 *   v3 "resource-system" shape (current, written by
 *   data/v2/resource-system/build-resource-system.mjs):
 *     { resources: [{ parentSlug, sectionTitle, topicTitle, title, url,
 *                     resourceType, scope, … }], … }
 *
 *   legacy shape (older builds): a plain map of normalized topic slug →
 *     [{ title, url, kind?, platform?, difficulty? … }]
 *
 * Records are indexed twice:
 *   bySlugTopic: `${parentSlug}::${normalized topicTitle}` → records[]
 *   bySlug:      parentSlug → records[]           (skill/career fallback)
 *
 * Resolution hierarchy (strongest first):
 *   1. exact   — this node's own label in its roadmap
 *  (2. parent  — nearest ancestor label — handled by the caller walking up)
 *   3. skill   — anything else mapped to this roadmap slug
 *
 * Everything is lazy-loaded once per session and cached module-level.
 */

import type { DifficultyLevel, PracticeItem, Resource, ResourceKind, ResourceType } from "./types";

// ── Raw dataset record shapes ────────────────────────────────────────────────

/** v3 resource-system record (subset of fields we consume). */
interface V3ResourceRecord {
  parentSlug?: string;
  topicTitle?: string;
  title?: string;
  url?: string;
  resourceType?: string;
  qualityScore?: number;
  scope?: string;
}

/** v3 practice record (subset). */
interface V3PracticeRecord {
  parentSlug?: string;
  topicTitle?: string;
  title?: string;
  url?: string;
  platform?: string;
  difficulty?: string;
  estimatedTime?: string;
  skills?: unknown;
  description?: string;
  scope?: string;
}

/** Legacy resource entry. */
interface LegacyResource {
  title?: string;
  url?: string;
  kind?: string;
}

/** Legacy practice entry. */
interface LegacyPractice {
  title?: string;
  url?: string;
  platform?: string;
  kind?: string;
  difficulty?: string;
}

type AnyResourceRecord = V3ResourceRecord | LegacyResource;
type AnyPracticeRecord = V3PracticeRecord | LegacyPractice;

// ── Normalized internal records ──────────────────────────────────────────────

interface NormResource {
  title: string;
  url: string;
  resourceType: string;
  isOfficial: boolean;
  /** builder-assigned scope — gates the skill-tier fallback */
  scope: RecordScope;
}

interface NormPractice {
  title: string;
  url: string;
  platform: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  skills: string[];
  description: string;
  /** builder-assigned scope — gates the skill-tier fallback */
  scope: RecordScope;
}

export type ResolveScope = "exact" | "parent" | "skill" | "career" | "discovery" | "none";

/** Builder scopes a record can carry (v3 datasets). Legacy records have none. */
type RecordScope = "exact" | "parent" | "skill" | "discovery";

export interface ResolvedResources {
  items: Resource[];
  scope: ResolveScope;
}

export interface ResolvedPractice {
  items: PracticeItem[];
  scope: ResolveScope;
}

// ── Label normalization (shared contract with the dataset builder) ──────────

export function normalizeLabel(label: string): string {
  return String(label ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const isV3Resource = (r: AnyResourceRecord): r is V3ResourceRecord =>
  typeof (r as V3ResourceRecord).topicTitle === "string" && typeof (r as V3ResourceRecord).parentSlug === "string";

const isV3Practice = (r: AnyPracticeRecord): r is V3PracticeRecord =>
  typeof (r as V3PracticeRecord).topicTitle === "string" && typeof (r as V3PracticeRecord).parentSlug === "string";

// ── Field mapping ────────────────────────────────────────────────────────────

function mapResourceKind(type: string): ResourceKind {
  switch (type) {
    case "official-doc":
      return "docs";
    case "course":
    case "official-learning":
      return "course";
    case "video":
    case "playlist":
      return "video";
    case "tutorial":
    case "interactive":
      return "tutorial";
    case "book":
      return "book";
    case "cheat-sheet":
      return "cheatsheet";
    case "practice":
    case "lab":
    case "simulation":
      return "practice";
    case "reference":
    case "pdf-discovery":
      return "reference";
    default:
      return "article";
  }
}

function mapResourceType(type: string): ResourceType {
  switch (type) {
    case "official-doc":
      return "Official Documentation";
    case "official-learning":
      return "Course";
    case "course":
      return "Course";
    case "video":
    case "playlist":
      return "Video";
    case "tutorial":
    case "interactive":
      return "Beginner Tutorial";
    case "book":
      return "Book";
    case "cheat-sheet":
      return "Cheat Sheet";
    case "practice":
    case "lab":
    case "simulation":
      return "Practice";
    case "reference":
      return "Reference Documentation";
    default:
      return "Article";
  }
}

function mapLegacyKind(kind: string | undefined): { k: ResourceKind; t: ResourceType } {
  switch (kind) {
    case "docs":
      return { k: "docs", t: "Official Documentation" };
    case "course":
      return { k: "course", t: "Course" };
    case "video":
      return { k: "video", t: "Video" };
    case "book":
      return { k: "book", t: "Book" };
    case "practice":
      return { k: "practice", t: "Practice" };
    case "cheatsheet":
      return { k: "cheatsheet", t: "Cheat Sheet" };
    case "reference":
      return { k: "reference", t: "Reference Documentation" };
    case "tutorial":
      return { k: "tutorial", t: "Beginner Tutorial" };
    default:
      return { k: "article", t: "Article" };
  }
}

function extractProvider(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const parts = host.split(".");
    const name = parts.length >= 2 ? parts[parts.length - 2] : host;
    const pretty: Record<string, string> = {
      mdn: "MDN",
      mozilla: "MDN",
      github: "GitHub",
      youtube: "YouTube",
      python: "Python",
      javascript: "JavaScript.info",
    };
    if (pretty[name.toLowerCase()]) return pretty[name.toLowerCase()];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return "Web";
  }
}

const BUILDER_SCOPES = new Set(["exact", "parent", "skill", "discovery"]);

/** Legacy "domain" scope (pre-discovery builds) maps to discovery. */
function toRecordScope(v: unknown): RecordScope {
  const s = typeof v === "string" ? v : "";
  if (s === "domain") return "discovery";
  return BUILDER_SCOPES.has(s) ? (s as RecordScope) : "exact";
}

function normalizeResource(rec: AnyResourceRecord): NormResource | null {
  const url = typeof rec.url === "string" ? rec.url.trim() : "";
  const title = typeof rec.title === "string" ? rec.title.trim() : "";
  if (!url || !/^https?:\/\//i.test(url)) return null;

  if (isV3Resource(rec)) {
    // v3 record — trust the builder's resourceType and scope verbatim so the
    // skill/discovery gating in pickBucket keeps working.
    const rt = typeof rec.resourceType === "string" && rec.resourceType ? rec.resourceType : "article";
    return {
      title: title || extractProvider(url),
      url,
      resourceType: rt,
      isOfficial: rt === "official-doc",
      scope: toRecordScope(rec.scope),
    };
  }

  const legacy = rec as LegacyResource;
  const { k } = mapLegacyKind(legacy.kind);
  // round-trip the legacy kind string into a v3 resourceType token
  const kindToType: Record<string, string> = {
    docs: "official-doc", course: "course", video: "video", book: "book",
    practice: "practice", cheatsheet: "cheat-sheet", reference: "reference",
    tutorial: "tutorial", article: "article",
  };
  return {
    title: title || extractProvider(url),
    url,
    resourceType: (legacy.kind && kindToType[legacy.kind]) || "article",
    isOfficial: k === "docs",
    // legacy records are topic-keyed — never eligible for the skill tier
    scope: "exact",
  };
}

function normalizeDifficulty(v: unknown): DifficultyLevel {
  if (v === "Beginner" || v === "Intermediate" || v === "Advanced") return v;
  return "Intermediate";
}

function toStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((s): s is string => typeof s === "string" && s.trim().length > 0);
}

function normalizePractice(rec: AnyPracticeRecord): NormPractice | null {
  const url = typeof rec.url === "string" ? rec.url.trim() : "";
  const title = typeof rec.title === "string" ? rec.title.trim() : "";
  if (!url || !/^https?:\/\//i.test(url)) return null;

  if (isV3Practice(rec)) {
    return {
      title: title || extractProvider(url),
      url,
      platform: typeof rec.platform === "string" && rec.platform ? rec.platform : extractProvider(url),
      difficulty: normalizeDifficulty(rec.difficulty),
      estimatedTime: typeof rec.estimatedTime === "string" && rec.estimatedTime ? rec.estimatedTime : "30–60 min",
      skills: toStringArray(rec.skills),
      description:
        typeof rec.description === "string" && rec.description.trim()
          ? rec.description.trim()
          : `Practice ${title || "this topic"} on ${rec.platform ?? "this platform"}.`,
      scope: toRecordScope(rec.scope),
    };
  }
  const legacy = rec as LegacyPractice;
  return {
    title: title || extractProvider(url),
    url,
    platform: typeof legacy.platform === "string" && legacy.platform ? legacy.platform : extractProvider(url),
    difficulty: normalizeDifficulty(legacy.difficulty),
    estimatedTime: "30–60 min",
    skills: [],
    description: `Practice ${title || "this topic"} on ${legacy.platform ?? extractProvider(url)}.`,
    scope: "exact",
  };
}

// ── Indexed stores ───────────────────────────────────────────────────────────

interface DatasetIndex<T> {
  bySlugTopic: Map<string, T[]>;
  bySlug: Map<string, T[]>;
  count: number;
}

const emptyIndex = <T,>(): DatasetIndex<T> => ({ bySlugTopic: new Map(), bySlug: new Map(), count: 0 });

let resourceIndex: DatasetIndex<NormResource> = emptyIndex();
let practiceIndex: DatasetIndex<NormPractice> = emptyIndex();

let resourcesPromise: Promise<void> | null = null;
let practicePromise: Promise<void> | null = null;

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);
  return res.json();
}

/** Accept either `{ resources: [...] }` or a legacy `{ slug: [...] }` map. */
function unwrapDataset(data: unknown, listKey: string): Array<[string, unknown[]]> {
  if (Array.isArray(data)) {
    // array of records — group under "" (records carry parentSlug themselves)
    return [["", data]];
  }
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    const list = obj[listKey];
    if (Array.isArray(list)) return [["", list]];
    // legacy: every value should be an array of entries
    return Object.entries(obj).flatMap(([key, value]) => {
      if (!Array.isArray(value)) {
        // legacy wrapper objects may nest one level (e.g. { topic: { resources: [] } })
        if (value && typeof value === "object") {
          const nested = (value as Record<string, unknown>)[listKey];
          return Array.isArray(nested) ? [[key, nested] as [string, unknown[]]] : [];
        }
        return [];
      }
      return [[key, value] as [string, unknown[]]];
    });
  }
  return [];
}

async function loadResources(): Promise<void> {
  try {
    const data = await fetchJson("/roadmaps/resources.json");
    const idx = emptyIndex<NormResource>();
    for (const [, list] of unwrapDataset(data, "resources")) {
      for (const raw of list) {
        const norm = normalizeResource(raw as AnyResourceRecord);
        if (!norm) continue;
        let slug = "";
        let topicKey = "";
        if (isV3Resource(raw as AnyResourceRecord)) {
          const rec = raw as V3ResourceRecord;
          slug = typeof rec.parentSlug === "string" ? rec.parentSlug : "";
          topicKey = normalizeLabel(rec.topicTitle ?? "");
        }
        if (!slug || !topicKey) continue; // unattributable record — skip
        const key = `${slug}::${topicKey}`;
        let arr = idx.bySlugTopic.get(key);
        if (!arr) idx.bySlugTopic.set(key, (arr = []));
        // dedupe by URL within the same bucket
        if (!arr.some((r) => r.url === norm.url)) arr.push(norm);
        let slugArr = idx.bySlug.get(slug);
        if (!slugArr) idx.bySlug.set(slug, (slugArr = []));
        slugArr.push(norm);
        idx.count++;
      }
    }
    resourceIndex = idx;
  } catch {
    resourceIndex = emptyIndex();
  }
}

async function loadPractice(): Promise<void> {
  try {
    const data = await fetchJson("/roadmaps/practice.json");
    const idx = emptyIndex<NormPractice>();
    for (const [, list] of unwrapDataset(data, "practice")) {
      for (const raw of list) {
        const norm = normalizePractice(raw as AnyPracticeRecord);
        if (!norm) continue;
        let slug = "";
        let topicKey = "";
        if (isV3Practice(raw as AnyPracticeRecord)) {
          const rec = raw as V3PracticeRecord;
          slug = typeof rec.parentSlug === "string" ? rec.parentSlug : "";
          topicKey = normalizeLabel(rec.topicTitle ?? "");
        }
        if (!slug || !topicKey) continue;
        const key = `${slug}::${topicKey}`;
        let arr = idx.bySlugTopic.get(key);
        if (!arr) idx.bySlugTopic.set(key, (arr = []));
        if (!arr.some((p) => p.url === norm.url)) arr.push(norm);
        let slugArr = idx.bySlug.get(slug);
        if (!slugArr) idx.bySlug.set(slug, (slugArr = []));
        slugArr.push(norm);
        idx.count++;
      }
    }
    practiceIndex = idx;
  } catch {
    practiceIndex = emptyIndex();
  }
}

/** Kick off both loads once; safe to call repeatedly. */
export function preloadResolver(): void {
  if (!resourcesPromise) resourcesPromise = loadResources();
  if (!practicePromise) practicePromise = loadPractice();
}

async function ensureLoaded(): Promise<void> {
  preloadResolver();
  await Promise.all([resourcesPromise, practicePromise]);
}

// ── Public resolution API ────────────────────────────────────────────────────

function pickBucket<T extends { url: string; scope?: string }>(idx: DatasetIndex<T>, slug: string, labelChain: string[]): { items: T[]; scope: ResolveScope } {
  const topicMap = idx.bySlugTopic;
  // 1. exact — the node's own label
  const own = topicMap.get(`${slug}::${normalizeLabel(labelChain[0])}`);
  if (own && own.length > 0) return { items: own, scope: "exact" };

  // 2. nearest ancestor with a mapping (parent → grandparent → …)
  for (let i = 1; i < labelChain.length; i++) {
    const bucket = topicMap.get(`${slug}::${normalizeLabel(labelChain[i])}`);
    if (bucket && bucket.length > 0) {
      const filtered = filterHomepages(bucket);
      return { items: i === 1 ? filtered : dedupeByUrl(filtered), scope: "parent" };
    }
  }

  // 3. roadmap-wide fallback — ONLY records the builder marked skill- or
  // discovery-scoped. Topic-scoped records (exact/parent for a DIFFERENT
  // topic) must never leak onto unrelated nodes of the same roadmap — this
  // gate is what keeps "REST API Design" off "Kotlin Fundamentals".
  const slugItems = idx.bySlug.get(slug);
  const eligible = slugItems?.filter((r) => r.scope === "skill" || r.scope === "discovery") ?? [];
  if (eligible.length > 0) {
    const hasSkill = eligible.some((r) => r.scope === "skill");
    // Filter homepages from skill-level results (keep for discovery tier)
    const skillItems = eligible.filter((r) => r.scope === "skill" && !isHomepageUrl(r.url));
    if (skillItems.length > 0) {
      return { items: dedupeByUrl(skillItems), scope: "skill" };
    }
    return { items: dedupeByUrl(eligible), scope: hasSkill ? "skill" : "discovery" };
  }

  return { items: [], scope: "none" };
}

/** Detect URLs that point to a site's root/homepage rather than a topic-specific page. */
function isHomepageUrl(url: string): boolean {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/\/$/, "");
    // Empty path or just "/" or "/en-US/" means homepage
    return path === "" || path === "/en-US" || path === "/en-US/" || path === "/docs" || path === "/docs/";
  } catch {
    return false;
  }
}

function dedupeByUrl<T extends { url: string }>(items: T[], cap = 6): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items) {
    if (seen.has(item.url)) continue;
    seen.add(item.url);
    out.push(item);
    if (out.length >= cap) break;
  }
  return out;
}

/** Filter out homepage-only URLs from fallback scope results. Keep them for exact scope. */
function filterHomepages<T extends { url: string }>(items: T[]): T[] {
  const filtered = items.filter((r) => !isHomepageUrl(r.url));
  // Only filter if we still have results — never return empty
  return filtered.length > 0 ? filtered : items;
}
function toPublicResource(r: NormResource): Resource {
  return {
    title: r.title,
    url: r.url,
    kind: mapResourceKind(r.resourceType),
    type: mapResourceType(r.resourceType),
    provider: extractProvider(r.url),
    description: r.title,
    isOfficial: r.isOfficial,
  };
}

function toPublicPractice(p: NormPractice): PracticeItem {
  return {
    title: p.title,
    platform: p.platform,
    url: p.url,
    difficulty: p.difficulty,
    estimatedTime: p.estimatedTime,
    skills: p.skills,
    description: p.description,
  };
}

/**
 * Resolve learning resources for a node.
 * @param slug       roadmap slug ("python", "software-engineer"…)
 * @param labelChain node's label followed by ancestor labels, nearest first
 */
export async function resolveTopicResources(slug: string, labelChain: string[]): Promise<ResolvedResources> {
  await ensureLoaded();
  const { items, scope } = pickBucket(resourceIndex, slug, labelChain);
  return { items: items.map(toPublicResource), scope };
}

/**
 * Resolve practice activities for a node.
 */
export async function resolveTopicPractice(slug: string, labelChain: string[]): Promise<ResolvedPractice> {
  await ensureLoaded();
  const { items, scope } = pickBucket(practiceIndex, slug, labelChain);
  return { items: items.map(toPublicPractice), scope };
}

/** Test/audit helper: coverage snapshot of the loaded indexes. */
export function resolverStats(): { resources: number; practice: number } {
  return { resources: resourceIndex.count, practice: practiceIndex.count };
}
