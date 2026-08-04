import type { NodeType, Roadmap, RoadmapNode } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// Roadmap-wide Study Planner engine.
// Turns an entire roadmap tree into a personalized day-by-day schedule that
// respects topic order & dependencies, balances workload, and schedules
// projects, revision, milestones, interview prep and rest days.
// Pure, deterministic, fully local — no network.
// ─────────────────────────────────────────────────────────────────────────────

export type Pace = "beginner" | "normal" | "intensive";

export type StudyDayKind =
  | "study"
  | "revision"
  | "project"
  | "interview"
  | "rest"
  | "milestone"
  | "portfolio";

export interface StudyItem {
  nodeId: string;
  label: string;
  type: NodeType;
  minutes: number;
  section: string; // nearest section/subsection label (context)
}

export interface StudyDay {
  day: number; // 1-based calendar day
  date?: string; // ISO date when startDate provided
  title: string;
  kind: StudyDayKind;
  items: StudyItem[];
  minutes: number;
}

export interface StudyPlanOptions {
  days: number;
  pace: Pace;
  /** explicit hours/day (overrides pace) — null derives from pace */
  hoursPerDay: number | null;
  weekendOnly: boolean;
  includeRevision: boolean;
  includeProjects: boolean;
  includeInterview: boolean;
  includeRest: boolean;
  startDate?: string; // ISO date
}

export interface StudyPlan {
  slug: string;
  roadmapTitle: string;
  options: StudyPlanOptions;
  days: StudyDay[];
  generatedAt: number;
  summary: {
    totalTopics: number;
    totalProjects: number;
    totalMinutes: number;
    hoursPerDay: number;
    studyDays: number;
    calendarDays: number;
  };
}

// ── estimatedTime ("2–3 hours", "45 minutes", "~1 week") → minutes ──────────
export function estimateMinutes(text: string, type: NodeType): number {
  const s = text.toLowerCase().replace(/[~≈]/g, " ");
  const range = s.match(/(\d+(?:\.\d+)?)\s*(?:-|–|—|to)\s*(\d+(?:\.\d+)?)\s*hours?/);
  if (range) return Math.round((parseFloat(range[1]) + parseFloat(range[2])) * 30);
  const hrs = s.match(/(\d+(?:\.\d+)?)\s*(?:hr|hrs|hour|hours)\b/);
  if (hrs) return Math.round(parseFloat(hrs[1]) * 60);
  const mins = s.match(/(\d+(?:\.\d+)?)\s*(?:min|mins|minute|minutes)\b/);
  if (mins) return Math.round(parseFloat(mins[1]));
  const wks = s.match(/(\d+(?:\.\d+)?)\s*(?:week|weeks)\b/);
  if (wks) return Math.round(parseFloat(wks[1]) * 60 * 5);
  // sensible fallbacks by node type
  switch (type) {
    case "project":
    case "projects":
      return 240;
    case "achievement":
      return 300;
    case "interview":
      return 45;
    case "advanced":
      return 90;
    case "optional":
      return 60;
    case "topic":
      return 90;
    case "concept":
      return 40;
    default:
      return 45;
  }
}

interface Unit {
  nodeId: string;
  label: string;
  type: NodeType;
  minutes: number;
  section: string;
}

/** Flatten the tree in roadmap order (DFS pre-order) — this IS the dependency
 *  order: parents before children, topics before their projects, interview
 *  practice and the final achievement last. "projects" containers count as a
 *  section boundary so project days land right after their topic group. */
function flattenUnits(root: RoadmapNode): Unit[] {
  const units: Unit[] = [];

  const walk = (n: RoadmapNode, parentSection: string) => {
    const mySection =
      n.type === "section" || n.type === "subsection" || n.type === "projects"
        ? n.label
        : parentSection;
    const isLeaf = (n.children?.length ?? 0) === 0;

    if (isLeaf && !["section", "subsection"].includes(n.type)) {
      units.push({
        nodeId: n.id,
        label: n.label,
        type: n.type,
        minutes: estimateMinutes(n.details.estimatedTime, n.type),
        section: mySection,
      });
    }
    for (const c of n.children ?? []) walk(c, mySection);
  };

  for (const c of root.children ?? []) walk(c, "");
  return units;
}

export function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`;
  const h = min / 60;
  return h === Math.round(h) ? `${h} h` : `${h.toFixed(1)} h`;
}

function defaultHoursFor(pace: Pace): number {
  switch (pace) {
    case "beginner":
      return 1.5;
    case "intensive":
      return 4;
    case "normal":
    default:
      return 2.5;
  }
}

// Parse a date-only string ("2026-08-03") as a LOCAL date — appending
// "T00:00:00" makes `new Date` treat it as UTC midnight, which shifts the
// calendar day in timezones behind UTC. `new Date(y, m-1, d)` keeps the same
// day everywhere (identical to the formatDate fix in lib/utils.ts).
function parseDateOnly(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function isWeekend(d: Date) {
  const wd = d.getDay();
  return wd === 0 || wd === 6;
}

export function generateStudyPlan(roadmap: Roadmap, opts: StudyPlanOptions): StudyPlan {
  const allUnits = flattenUnits(roadmap.root);
  const unitById = new Map(allUnits.map((u) => [u.nodeId, u]));
  // single ordered queue — projects / interviews / achievements naturally
  // follow their topics, so type-aware day filling keeps dependencies intact
  const queue = [...allUnits];

  const options: StudyPlanOptions = { ...opts };
  const totalDays = Math.max(1, Math.round(opts.days));
  options.days = totalDays;

  // ── effective hours/day ────────────────────────────────────────────────────
  let hoursPerDay = opts.hoursPerDay ?? defaultHoursFor(opts.pace);
  hoursPerDay = Math.max(0.5, Math.min(8, hoursPerDay));

  // ── build the calendar: which days are study slots ────────────────────────
  const start = opts.startDate ? parseDateOnly(opts.startDate) : new Date();
  const slots: { day: number; date: Date }[] = [];
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    if (opts.weekendOnly && !isWeekend(d)) continue;
    slots.push({ day: i + 1, date: d });
  }
  if (slots.length === 0) {
    // weekend-only over a range with no weekends — fall back to daily
    for (let i = 0; i < totalDays; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      slots.push({ day: i + 1, date: d });
    }
  }

  const capacityPerDay = hoursPerDay * 60;

  // ── markers: rest / revision / milestone ──────────────────────────────────
  const kinds = new Array<StudyDayKind>(slots.length).fill("study");
  if (opts.includeRest) {
    for (let i = 6; i < kinds.length; i += 7) kinds[i] = "rest";
  }
  if (opts.includeRevision) {
    for (let i = 6; i < kinds.length; i += 7) {
      if (kinds[i] !== "rest") kinds[i] = "revision";
    }
  }
  if (opts.includeRevision && slots.length >= 12) {
    for (const p of [0.25, 0.5, 0.75]) {
      const idx = Math.round(p * (slots.length - 1));
      if (idx > 0 && idx < slots.length - 1 && kinds[idx] === "study") kinds[idx] = "milestone";
    }
  }

  // ── capacity check: scale hours/day if the roadmap can't fit ───────────────
  const studySlotCount = kinds.filter((k) => k === "study").length;
  const totalWork = allUnits.reduce((a, u) => a + u.minutes, 0);
  const available = studySlotCount * capacityPerDay;
  if (studySlotCount > 0 && available > 0 && totalWork > available) {
    const needed = Math.ceil((totalWork / studySlotCount) / 15) * 15;
    hoursPerDay = Math.min(8, needed / 60);
  }

  // ── fill days ──────────────────────────────────────────────────────────────
  const covered: Unit[] = [];
  const days: StudyDay[] = [];

  const makeDay = (kind: StudyDayKind, slot: { day: number; date: Date }, items: StudyItem[], title?: string): StudyDay => {
    const total = items.reduce((a, i) => a + i.minutes, 0);
    let dayTitle = title;
    if (!dayTitle) {
      if (kind === "rest") dayTitle = "Rest & recharge";
      else if (kind === "revision") dayTitle = "Revision day";
      else if (kind === "milestone") dayTitle = "Milestone review";
      else if (kind === "interview") dayTitle = "Interview practice";
      else if (kind === "portfolio") dayTitle = "Portfolio project";
      else {
        const sec = items[0]?.section;
        dayTitle = sec ? sec : items[0]?.label ?? "Study day";
      }
    }
    return {
      day: slot.day,
      date: slot.date.toISOString().slice(0, 10),
      title: dayTitle,
      kind,
      items,
      minutes: total,
    };
  };

  // pull items of a matching type from the front of the queue
  const pull = (types: Set<string>, maxItems: number, budget: number) => {
    const out: StudyItem[] = [];
    let remaining = budget;
    let count = 0;
    while (queue.length && count < maxItems && remaining > 15) {
      const u = queue[0];
      if (!types.has(u.type)) break;
      queue.shift();
      out.push({ nodeId: u.nodeId, label: u.label, type: u.type, minutes: u.minutes, section: u.section });
      remaining -= u.minutes;
      count++;
    }
    return out;
  };

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const kind = kinds[i];

    if (kind === "rest") {
      days.push(makeDay("rest", slot, [], "Rest & recharge"));
      continue;
    }

    if (kind === "revision") {
      const rev = covered.slice(-8).reverse().map((u) => ({
        nodeId: u.nodeId,
        label: u.label,
        type: u.type,
        minutes: Math.min(u.minutes, 20),
        section: u.section,
      }));
      days.push(makeDay("revision", slot, rev, "Revision day"));
      continue;
    }

    if (kind === "milestone") {
      const items = covered.slice(-16).reverse().map((u) => ({
        nodeId: u.nodeId,
        label: u.label,
        type: u.type,
        minutes: Math.min(u.minutes, 15),
        section: u.section,
      }));
      if (opts.includeProjects) {
        const proj = pull(new Set(["project", "projects"]), 1, capacityPerDay);
        if (proj.length) items.unshift(proj[0]);
      }
      days.push(
        makeDay("milestone", slot, items, `Milestone review · ${Math.round((i / Math.max(slots.length, 1)) * 100)}% done`)
      );
      continue;
    }

    // ── regular day: type-aware based on the next unit in order ─────────────
    const next = queue[0];

    if (!next) {
      // content exhausted — end with interview / portfolio polish
      if (opts.includeInterview) {
        days.push(
          makeDay("interview", slot, [{ nodeId: "mock", label: "Mock interview & Q&A drills", type: "interview", minutes: 60, section: "" }], "Interview practice")
        );
      } else {
        days.push(
          makeDay("portfolio", slot, [{ nodeId: "polish", label: "Polish portfolio & resume", type: "project", minutes: 120, section: "" }], "Portfolio polish & job prep")
        );
      }
      continue;
    }

    if (next.type === "interview") {
      const items = pull(new Set(["interview"]), 8, capacityPerDay);
      if (!items.length) {
        items.push({ nodeId: "mock", label: "Mock interview", type: "interview", minutes: 60, section: "" });
      }
      days.push(makeDay("interview", slot, items, "Interview practice"));
      continue;
    }

    if (next.type === "achievement") {
      const items = pull(new Set(["achievement"]), 3, capacityPerDay);
      if (!items.length) {
        items.push({ nodeId: "portfolio", label: "Build final portfolio project", type: "project", minutes: 180, section: "" });
      }
      days.push(makeDay("portfolio", slot, items, "Final portfolio project"));
      continue;
    }

    if (next.type === "project" || next.type === "projects") {
      const items = pull(new Set(["project", "projects"]), 3, capacityPerDay);
      if (!items.length) {
        items.push({ nodeId: "polish", label: "Polish portfolio & resume", type: "project", minutes: 120, section: "" });
      }
      days.push(makeDay("project", slot, items, `Project work · ${items[0]?.section ?? "Build"}`));
      continue;
    }

    // study day: topics (and any concept/topic/advanced/optional units)
    const items = pull(new Set(["topic", "concept", "advanced", "optional", "career", "section", "subsection"]), 5, capacityPerDay);
    if (items.length === 0) {
      // safety: queue head isn't one of the above — consume whatever comes next
      const u = queue.shift()!;
      items.push({ nodeId: u.nodeId, label: u.label, type: u.type, minutes: u.minutes, section: u.section });
    }
    for (const it of items) {
      const u = unitById.get(it.nodeId);
      if (u && u.type !== "project" && u.type !== "projects") covered.push(u);
    }
    days.push(makeDay("study", slot, items));
  }

  return {
    slug: roadmap.meta.slug,
    roadmapTitle: roadmap.meta.title,
    options,
    days,
    generatedAt: Date.now(),
    summary: {
      totalTopics: allUnits.filter((u) => u.type !== "project" && u.type !== "projects").length,
      totalProjects: allUnits.filter((u) => u.type === "project" || u.type === "projects").length,
      totalMinutes: days.reduce((a, d) => a + d.minutes, 0),
      hoursPerDay: Math.round(hoursPerDay * 10) / 10,
      studyDays: slots.length,
      calendarDays: totalDays,
    },
  };
}
