"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./theme-provider";
import { useThemeStore } from "@/lib/stores/theme-store";
import { useProgressStore } from "@/lib/stores/progress-store";
import { useBookmarksStore } from "@/lib/stores/bookmarks-store";
import { useSettingsStore } from "@/lib/stores/settings-store";
import { useStudyPlanStore } from "@/lib/stores/study-plan-store";
import { useChoicesStore } from "@/lib/stores/choices-store";
import { useAchievementsStore } from "@/lib/stores/achievements-store";
import { useUiStore } from "@/lib/stores/ui-store";
import { useHydrationStore } from "@/lib/stores/hydration-store";

// Every persisted zustand store is created with `skipHydration: true`, so its
// initial state (the defaults) is what both the server and the client's first
// render see. Persisted localStorage state is only applied AFTER mount here —
// this is what keeps server HTML and client HTML identical at hydration time.
// The app is fully guest-only: all of these stores persist to this device.
const PERSISTED_STORES = [
  useThemeStore,
  useProgressStore,
  useBookmarksStore,
  useSettingsStore,
  useStudyPlanStore,
  useChoicesStore,
  useAchievementsStore,
  useUiStore,
] as const;

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Rehydrate persisted stores only after the browser has mounted, so the
    // first client render matches the server render exactly (no hydration
    // mismatch), then persisted state is applied as a post-mount update.
    for (const store of PERSISTED_STORES) {
      store.persist.rehydrate();
    }
    // Progress-driven screens wait on this flag so a returning learner never
    // sees a flash of the "nothing here yet" empty state before their saved
    // data lands.
    useHydrationStore.getState().markHydrated();
  }, []);

  return (
    <TooltipProvider delayDuration={120}>
      {/* framer-motion runs JS-driven animations the CSS reduced-motion rule
          can't reach — MotionConfig turns them off for users who ask */}
      <MotionConfig reducedMotion="user">
        <ThemeProvider>{children}</ThemeProvider>
      </MotionConfig>
    </TooltipProvider>
  );
}
