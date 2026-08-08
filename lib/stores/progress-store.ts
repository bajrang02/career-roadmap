"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAchievementsStore } from "./achievements-store";

export interface Completion {
  roadmap: string;
  nodeId: string;
  nodeLabel: string;
  at: number;
}

export interface Certificate {
  id: string;
  roadmap: string;
  roadmapTitle: string;
  icon: string;
  name: string;
  issuedAt: number;
  pct: number;
}

interface ProgressState {
  completed: Completion[];
  completedIds: (roadmap: string) => Set<string>;
  isComplete: (roadmap: string, nodeId: string) => boolean;
  toggleNode: (roadmap: string, nodeId: string, nodeLabel: string) => void;
  completeSubtree: (roadmap: string, nodeId: string, nodeLabel: string, ids: string[]) => void;
  pctFor: (roadmap: string, learnableIds: string[]) => number;
  certificates: Certificate[];
  grantCertificate: (c: Omit<Certificate, "id">) => void;
  exportData: () => string;
  importData: (data: string) => void;
  clearAll: () => void;
}

const KEY = (d: Date) => d.toISOString().slice(0, 10);

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: [],
      certificates: [],
      completedIds: (roadmap) =>
        new Set(get().completed.filter((c) => c.roadmap === roadmap).map((c) => c.nodeId)),
      isComplete: (roadmap, nodeId) =>
        get().completed.some((c) => c.roadmap === roadmap && c.nodeId === nodeId),
      toggleNode: (roadmap, nodeId, nodeLabel) => {
        const existing = get().completed.some(
          (c) => c.roadmap === roadmap && c.nodeId === nodeId
        );
        
        if (!existing) {
          useAchievementsStore.getState().recordActivity(0.5); // Add 30 mins for completing a node
        }

        set({
          completed: existing
            ? get().completed.filter((c) => !(c.roadmap === roadmap && c.nodeId === nodeId))
            : [...get().completed, { roadmap, nodeId, nodeLabel, at: Date.now() }],
        });
      },
      completeSubtree: (roadmap, nodeId, nodeLabel, ids) => {
        // `ids` is the authoritative list of nodes to (un)mark — callers pass
        // ONLY learnable/checkable ids, so container nodes (sections, choice…)
        // can never be recorded as completed. `nodeId` is kept for the
        // signature/title but is deliberately NOT added to the set: it may be
        // a container whose id must stay out of `completed`.
        void nodeId;
        const current = new Set(
          get().completed.filter((c) => c.roadmap === roadmap).map((c) => c.nodeId)
        );
        const anyMissing = ids.some((id) => !current.has(id));
        const add = new Set<string>();
        const remove = new Set<string>();
        for (const id of ids) {
          if (anyMissing) add.add(id);
          else remove.add(id);
        }
        const additions: Completion[] = Array.from(add).map((id) => ({
          roadmap,
          nodeId: id,
          nodeLabel,
          at: Date.now(),
        }));
        
        if (anyMissing) {
          useAchievementsStore.getState().recordActivity(additions.length * 0.25); // Add time for multiple completions
        }

        set({
          completed: [
            ...get().completed.filter(
              (c) => c.roadmap !== roadmap || (!add.has(c.nodeId) && !remove.has(c.nodeId))
            ),
            ...additions,
          ],
        });
      },
      pctFor: (roadmap, learnableIds) => {
        const done = new Set(
          get().completed.filter((c) => c.roadmap === roadmap).map((c) => c.nodeId)
        );
        if (!learnableIds.length) return 0;
        return Math.round(
          (learnableIds.filter((id) => done.has(id)).length / learnableIds.length) * 100
        );
      },
      grantCertificate: (c) =>
        set({
          certificates: [...get().certificates, { ...c, id: Math.random().toString(36).slice(2) }],
        }),
      exportData: () => JSON.stringify({ completed: get().completed, certificates: get().certificates }),
      importData: (data: string) => {
        try {
          const parsed = JSON.parse(data);
          if (typeof parsed === "object" && parsed !== null) {
            set({
              completed: parsed.completed || [],
              certificates: parsed.certificates || [],
            });
          }
        } catch (e) {
          console.error("Failed to import progress", e);
        }
      },
      clearAll: () => set({ completed: [], certificates: [] }),
    }),
    { name: "cr-progress", skipHydration: true }
  )
);

// ── derived: streak & achievements ───────────────────────────────────────────
export function computeStreak(completed: Completion[]) {
  const days = new Set(completed.map((c) => KEY(new Date(c.at))));
  let streak = 0;
  const cursor = new Date();
  while (days.has(KEY(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function last7Active(completed: Completion[]) {
  const days: { day: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = KEY(d);
    const count = completed.filter((c) => KEY(new Date(c.at)) === key).length;
    // Fixed locale (not `undefined`) so server (Node) and client (browser)
    // render identical weekday labels — a locale-dependent format caused a
    // React hydration mismatch on the dashboard.
    days.push({ day: d.toLocaleDateString("en-US", { weekday: "short" }), count });
  }
  return days;
}

export function totalCompleted(completed: Completion[]) {
  return completed.length;
}
