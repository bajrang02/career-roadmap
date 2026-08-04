"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StudyPlan } from "@/lib/study-planner/generator";

export interface SavedPlan extends StudyPlan {
  completedDays: number[];
}

interface StudyPlanState {
  plans: Record<string, SavedPlan>;
  getPlan: (slug: string) => SavedPlan | undefined;
  /** percent of days completed, or null when no plan exists */
  progressFor: (slug: string) => number | null;
  savePlan: (plan: StudyPlan) => void;
  regenerate: (plan: StudyPlan) => void;
  clearPlan: (slug: string) => void;
  toggleDayComplete: (slug: string, day: number) => void;
  isDayComplete: (slug: string, day: number) => boolean;
}

export const useStudyPlanStore = create<StudyPlanState>()(
  persist(
    (set, get) => ({
      plans: {},
      getPlan: (slug) => get().plans[slug],
      progressFor: (slug) => {
        const p = get().plans[slug];
        if (!p || p.days.length === 0) return null;
        return Math.round((p.completedDays.length / p.days.length) * 100);
      },
      savePlan: (plan) =>
        set((s) => ({
          plans: {
            ...s.plans,
            [plan.slug]: { ...plan, completedDays: s.plans[plan.slug]?.completedDays ?? [] },
          },
        })),
      regenerate: (plan) =>
        set((s) => ({
          plans: { ...s.plans, [plan.slug]: { ...plan, completedDays: [] } },
        })),
      clearPlan: (slug) =>
        set((s) => {
          const plans = { ...s.plans };
          delete plans[slug];
          return { plans };
        }),
      toggleDayComplete: (slug, day) =>
        set((s) => {
          const p = s.plans[slug];
          if (!p) return s;
          const has = p.completedDays.includes(day);
          return {
            plans: {
              ...s.plans,
              [slug]: {
                ...p,
                completedDays: has
                  ? p.completedDays.filter((d) => d !== day)
                  : [...p.completedDays, day],
              },
            },
          };
        }),
      isDayComplete: (slug, day) => get().plans[slug]?.completedDays.includes(day) ?? false,
    }),
    { name: "cr-study-plans", skipHydration: true }
  )
);
