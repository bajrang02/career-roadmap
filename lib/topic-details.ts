"use client";

/**
 * Canonical Topic Details model + single source of truth resolver.
 *
 * Every part of the "View Overview" experience consumes `resolveTopicDetails`.
 * It joins four datasets into ONE normalized model so the UI never has to
 * understand multiple schemas:
 *
 *   1. per-roadmap node details map  (public/roadmaps/{slug}.details.json)
 *   2. topic-mapped resources        (public/roadmaps/resources.json, v3)
 *   3. topic-mapped practice         (public/roadmaps/practice.json, v3)
 *   4. shared certification catalog  (public/roadmaps/certifications.json)
 *
 * Resolution hierarchy for resources/practice (strongest first):
 *   exact → parent (nearest ancestor) → skill (roadmap-wide) → career
 * Each result carries its `scope` so the UI can label fallbacks honestly.
 *
 * Everything is defensively normalized: no field reaches the UI without
 * validation, so `undefined.map`-class crashes are impossible by construction.
 */

import { useEffect, useState } from "react";
import type {
  Certification,
  CertificationLink,
  CertificationView,
  NodeDetails,
  PracticeItem,
  ProjectRef,
  Resource,
  RoadmapNode,
} from "./types";
import { normalizeOverview } from "./utils";
import {
  preloadResolver,
  resolveTopicResources,
  resolveTopicPractice,
  type ResolveScope,
} from "./resource-resolver";
import { getCertifications, getRoadmapDetails } from "./data-loader";

// ── Canonical model ──────────────────────────────────────────────────────────

export interface TopicDetails {
  node: RoadmapNode;

  overview: {
    whatIsIt: string;
    whatYouLearn: string[];
    whyItMatters: string[];
    howItHelps: string;
    prerequisites: string[];
    usedFor: string[];
    outcome: string;
    /** legacy fallback when no structured overview exists */
    description: string;
    objectives: string[];
    checkpoints: string[];
    exercises: string[];
    interviewQuestions: string[];
    commonMistakes: string[];
    tips: string[];
    nextTopics: string[];
  };

  resources: { items: Resource[]; scope: ResolveScope };
  practice: { items: PracticeItem[]; scope: ResolveScope };
  projects: ProjectRef[];
  certifications: CertificationView[];

  subtopics: RoadmapNode[];
  relatedTopics: RoadmapNode[];

  meta: {
    difficulty?: NodeDetails["difficulty"];
    estimatedTime?: string;
    optional: boolean;
  };
}

export interface AncestorRef {
  id: string;
  label: string;
}

// ── Certification normalization ──────────────────────────────────────────────

function toStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((s): s is string => typeof s === "string" && s.trim().length > 0) : [];
}

function toLinkArray(v: unknown): CertificationLink[] {
  if (!Array.isArray(v)) return [];
  const out: CertificationLink[] = [];
  const KINDS = new Set(["docs", "course", "practice", "article"]);
  for (const raw of v) {
    if (!raw || typeof raw !== "object") continue;
    const rec = raw as Record<string, unknown>;
    const url = typeof rec.url === "string" && /^https?:\/\//i.test(rec.url) ? rec.url : null;
    const title = typeof rec.title === "string" ? rec.title.trim() : "";
    if (!url) continue;
    out.push({
      title: title || new URL(url).hostname.replace(/^www\./, ""),
      url,
      kind: typeof rec.kind === "string" && KINDS.has(rec.kind) ? (rec.kind as CertificationLink["kind"]) : undefined,
    });
  }
  return out;
}

/**
 * Normalize a catalog record into the view model. Cost labels are derived
 * ONLY from verified fields — a credential is never called free unless the
 * catalog says so, and free preparation is only claimed when explicitly
 * flagged (rich records) — otherwise we stay silent rather than mislead.
 */
export function normalizeCertification(cert: Certification | undefined | null): CertificationView | null {
  if (!cert || typeof cert.id !== "string" || typeof cert.name !== "string") return null;
  const officialUrl =
    typeof cert.url === "string" && /^https?:\/\//i.test(cert.url) ? cert.url : "";

  const isFreeCredential = cert.type === "free" || /^free$/i.test(String(cert.cost ?? ""));
  // Rich future schema may flag prep freedom; the current simple catalog does
  // not, so freePrep stays false unless explicitly proven.
  const explicitFreePrep = Array.isArray(cert.prep) && cert.prep.some((p) => (p as { free?: boolean })?.free === true);
  const costLabel: CertificationView["costLabel"] = isFreeCredential
    ? "FREE"
    : explicitFreePrep
      ? "FREE PREPARATION"
      : "PAID EXAM";

  const level =
    cert.difficulty === "Beginner" ? "Foundational" : cert.difficulty === "Advanced" ? "Expert" : "Intermediate";

  return {
    id: cert.id,
    name: cert.name,
    provider: typeof cert.provider === "string" && cert.provider ? cert.provider : "—",
    level,
    officialUrl,
    description: typeof cert.description === "string" ? cert.description : "",
    costLabel: isFreeCredential ? "FREE" : cert.cost && !/^free/i.test(cert.cost) ? "PAID CERTIFICATION" : costLabel,
    costDetail: typeof cert.cost === "string" ? cert.cost : undefined,
    validity: typeof cert.validity === "string" ? cert.validity : undefined,
    freePrep: explicitFreePrep,
    difficulty: cert.difficulty,
    validates: toStringArray((cert as unknown as { skills?: unknown }).skills ?? []),
    prep: toLinkArray(cert.prep),
    practiceLinks: toLinkArray(cert.practice),
  };
}

// ── Embedded details sanitization ────────────────────────────────────────────

/** Defensive NodeDetails coercion — the deployed details map may be stale. */
function sanitizeDetails(raw: NodeDetails | undefined | null): Partial<NodeDetails> {
  const d: NodeDetails = raw && typeof raw === "object" ? raw : ({} as NodeDetails);
  const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
  return {
    ...d,
    resources: arr<Resource>(d.resources),
    practice: arr<PracticeItem>(d.practice),
    projects: arr<ProjectRef>(d.projects),
    certIds: arr<string>(d.certIds),
    interviewQuestions: arr<string>(d.interviewQuestions),
    commonMistakes: arr<string>(d.commonMistakes),
    tips: arr<string>(d.tips),
    nextTopics: arr<string>(d.nextTopics),
    prerequisites: arr<string>(d.prerequisites),
    objectives: arr<string>(d.objectives),
    exercises: arr<string>(d.exercises),
    checkpoints: arr<string>(d.checkpoints),
  };
}

/** Drop non-curated filler (e.g. legacy google-search placeholders). */
function curatedEmbeddedResources(resources: Resource[]): Resource[] {
  return resources.filter(
    (r) => r && typeof r.url === "string" && /^https?:\/\//i.test(r.url) && r.kind !== "search"
  );
}

function validProject(p: ProjectRef): boolean {
  return (
    !!p &&
    typeof p === "object" &&
    typeof p.title === "string" &&
    p.title.trim().length > 0 &&
    typeof p.description === "string" &&
    p.description.trim().length > 0
  );
}

// ── Core resolution ──────────────────────────────────────────────────────────

function resolveCertificationsForChain(
  chainCertIds: string[],
  catalog: Certification[]
): CertificationView[] {
  if (chainCertIds.length === 0 || catalog.length === 0) return [];
  const byId = new Map(catalog.map((c) => [c.id, c]));
  const out: CertificationView[] = [];
  const seen = new Set<string>();
  for (const id of chainCertIds) {
    if (seen.has(id)) continue;
    seen.add(id);
    const view = normalizeCertification(byId.get(id));
    if (view) out.push(view);
  }
  return out;
}

/**
 * Resolve the complete canonical TopicDetails for one node.
 * @param slug          roadmap slug
 * @param node          selected slim node (from the roadmap tree)
 * @param ancestors     nearest-first ancestor refs (for label + cert chains)
 * @param siblings      sibling nodes (related topics), excluding the selection
 */
export async function resolveTopicDetails(
  slug: string,
  node: RoadmapNode,
  ancestors: AncestorRef[],
  siblings: RoadmapNode[] = []
): Promise<TopicDetails> {
  // warm every dataset in parallel; each loader caches module-level
  preloadResolver();
  const [detailsMap, resolvedRes, resolvedPrac, certCatalog] = await Promise.all([
    getRoadmapDetails(slug).catch(() => ({}) as Record<string, NodeDetails>),
    resolveTopicResources(slug, [node.label, ...ancestors.map((a) => a.label)]).catch(
      () => ({ items: [] as Resource[], scope: "none" as ResolveScope })
    ),
    resolveTopicPractice(slug, [node.label, ...ancestors.map((a) => a.label)]).catch(
      () => ({ items: [] as PracticeItem[], scope: "none" as ResolveScope })
    ),
    getCertifications().catch(() => [] as Certification[]),
  ]);

  const d = sanitizeDetails(detailsMap[node.id]);

  // embedded curated resources first (topic-specific by definition), then
  // dataset-resolved ones — deduped by URL, official sources floated up
  const mergedResources: Resource[] = [];
  const seenUrls = new Set<string>();
  for (const r of [...curatedEmbeddedResources(d.resources ?? []), ...resolvedRes.items]) {
    if (seenUrls.has(r.url)) continue;
    seenUrls.add(r.url);
    mergedResources.push(r);
  }
  mergedResources.sort((a, b) => Number(b.isOfficial ?? false) - Number(a.isOfficial ?? false));

  // practice: embedded first (curated per-node), then resolved
  const mergedPractice: PracticeItem[] = [];
  const seenPracticeUrls = new Set<string>();
  for (const p of [...(d.practice ?? []), ...resolvedPrac.items]) {
    if (!p || typeof p.url !== "string" || seenPracticeUrls.has(p.url)) continue;
    seenPracticeUrls.add(p.url);
    mergedPractice.push({
      title: p.title,
      platform: p.platform || "Practice platform",
      url: p.url,
      difficulty: p.difficulty ?? "Intermediate",
      estimatedTime: p.estimatedTime ?? "30–60 min",
      skills: toStringArray(p.skills),
      description: typeof p.description === "string" && p.description.trim() ? p.description : p.title,
    });
  }

  // projects exist only when genuinely authored for this node
  const projects = (d.projects ?? []).filter(validProject);

  // certifications: node's own ids, then inherited from the ancestor chain
  // (ancestor certIds live in the details map — the slim tree doesn't ship them)
  const chainCertIds = [
    ...(d.certIds ?? []),
    ...ancestors.flatMap((a) => {
      const ad = detailsMap[a.id];
      return Array.isArray(ad?.certIds) ? (ad!.certIds as string[]) : [];
    }),
  ];
  const certifications = resolveCertificationsForChain(chainCertIds, certCatalog);

  const ov = normalizeOverview(d.overview);

  return {
    node,
    overview: {
      whatIsIt: ov?.whatIsIt ?? d.description ?? "",
      whatYouLearn: ov?.youWillLearn ?? [],
      whyItMatters: ov?.whyMatters ?? [],
      howItHelps:
        ov?.outcome ??
        (typeof d.careerRelevance === "string" ? d.careerRelevance : ""),
      prerequisites: ov?.prerequisites ?? d.prerequisites ?? [],
      usedFor: ov?.whereUsed ?? [],
      outcome: ov?.outcome ?? "",
      description: typeof d.description === "string" ? d.description : "",
      objectives: d.objectives ?? [],
      checkpoints: d.checkpoints ?? [],
      exercises: d.exercises ?? [],
      interviewQuestions: d.interviewQuestions ?? [],
      commonMistakes: d.commonMistakes ?? [],
      tips: d.tips ?? [],
      nextTopics: d.nextTopics ?? [],
    },
    // if curated embedded (node-authored) items exist, the effective scope is
    // exact regardless of what the dataset layer contributed
    resources: {
      items: mergedResources,
      scope: curatedEmbeddedResources(d.resources ?? []).length > 0 ? "exact" : resolvedRes.scope,
    },
    practice: {
      items: mergedPractice,
      scope: (d.practice ?? []).length > 0 ? "exact" : resolvedPrac.scope,
    },
    projects,
    certifications,
    subtopics: Array.isArray(node.children) ? node.children : [],
    relatedTopics: siblings,
    meta: {
      difficulty: d.difficulty,
      estimatedTime: d.estimatedTime,
      optional: !!node.optional,
    },
  };
}

// ── React hook ───────────────────────────────────────────────────────────────

const detailsMemo = new Map<string, Promise<TopicDetails>>();

/**
 * Resolve + memoize TopicDetails for the selected node. One resolution round
 * per node (revisits hit the memo map); only the selected node ever resolves,
 * so the roadmap canvas never re-renders because of it.
 */
export function useTopicDetails(
  slug: string,
  node: RoadmapNode,
  ancestors: AncestorRef[],
  siblings: RoadmapNode[]
): { details: TopicDetails | null; loading: boolean } {
  const key = `${slug}::${node.id}`;
  const [details, setDetails] = useState<TopicDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setDetails(null);
    setLoading(true);

    let promise = detailsMemo.get(key);
    if (!promise) {
      promise = resolveTopicDetails(slug, node, ancestors, siblings);
      detailsMemo.set(key, promise);
      promise.catch(() => detailsMemo.delete(key)); // allow retry after failure
    }

    promise.then(
      (result) => {
        if (alive) {
          setDetails(result);
          setLoading(false);
        }
      },
      () => {
        if (alive) setLoading(false);
      }
    );
    return () => {
      alive = false;
    };
    // ancestors/siblings are derived per selection; identity churn is fine —
    // the memoized promise keeps re-resolution cheap.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { details, loading };
}
