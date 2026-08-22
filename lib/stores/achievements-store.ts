"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: number;
}

interface AchievementsState {
  achievements: Achievement[];
  streakDays: number;
  lastActiveDate: string | null;
  dailyGoalHours: number;
  todayStudiedHours: number;
  
  // Actions
  unlockAchievement: (id: string, title: string, description: string) => void;
  recordActivity: (hours: number) => void;
  setDailyGoal: (hours: number) => void;
  
  // Import/Export
  exportData: () => string;
  importData: (data: string) => void;
  clearAll: () => void;
}

export const useAchievementsStore = create<AchievementsState>()(
  persist(
    (set, get) => ({
      achievements: [],
      streakDays: 0,
      lastActiveDate: null,
      dailyGoalHours: 1,
      todayStudiedHours: 0,

      unlockAchievement: (id, title, description) => {
        set((state) => {
          if (state.achievements.some((a) => a.id === id)) return state;
          return {
            achievements: [
              ...state.achievements,
              { id, title, description, unlockedAt: Date.now() },
            ],
          };
        });
      },

      recordActivity: (hours) => {
        const todayStr = new Date().toISOString().split("T")[0];
        set((state) => {
          let newStreak = state.streakDays;
          let newTodayStudied = state.todayStudiedHours;

          if (state.lastActiveDate !== todayStr) {
            // New day
            const lastDate = state.lastActiveDate ? new Date(state.lastActiveDate) : null;
            const todayDate = new Date(todayStr);
            if (lastDate) {
              const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              if (diffDays === 1) {
                newStreak += 1;
              } else if (diffDays > 1) {
                newStreak = 1; // streak broken
              }
            } else {
              newStreak = 1;
            }
            newTodayStudied = hours;
          } else {
            // Same day
            newTodayStudied += hours;
          }

          return {
            lastActiveDate: todayStr,
            streakDays: newStreak,
            todayStudiedHours: newTodayStudied,
          };
        });
      },

      setDailyGoal: (hours) => set({ dailyGoalHours: hours }),

      exportData: () => {
        const { achievements, streakDays, lastActiveDate, dailyGoalHours, todayStudiedHours } = get();
        return JSON.stringify({ achievements, streakDays, lastActiveDate, dailyGoalHours, todayStudiedHours });
      },

      importData: (data: string) => {
        try {
          const parsed = JSON.parse(data);
          if (typeof parsed === "object" && parsed !== null) {
            set({
              achievements: parsed.achievements || [],
              streakDays: parsed.streakDays || 0,
              lastActiveDate: parsed.lastActiveDate || null,
              dailyGoalHours: parsed.dailyGoalHours || 1,
              todayStudiedHours: parsed.todayStudiedHours || 0,
            });
          }
        } catch (e) {
          console.error("Failed to import achievements", e);
        }
      },

      clearAll: () =>
        set({
          achievements: [],
          streakDays: 0,
          lastActiveDate: null,
          todayStudiedHours: 0,
        }),
    }),
    {
      name: "cr-achievements-storage",
      storage: createJSONStorage(() => localStorage),
      // Rehydrated post-mount by <Providers>, exactly like every other
      // persisted store. Without this the store read localStorage during the
      // module's first client evaluation, so the server HTML (defaults) and
      // the first client render (saved streak/achievements) disagreed — a
      // React hydration mismatch on every page that renders streak state.
      skipHydration: true,
    }
  )
);
