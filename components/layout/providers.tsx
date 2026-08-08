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
import { migrateLegacyNotes } from "@/lib/stores/notes-store";

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
] as const;

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Rehydrate persisted stores only after the browser has mounted, so the
    // first client render matches the server render exactly (no hydration
    // mismatch), then persisted state is applied as a post-mount update.
    for (const store of PERSISTED_STORES) {
      store.persist.rehydrate();
    }
    // Fold the pre-notes-store bookmarks notes into the notes store (once) so
    // existing users don't lose notes written before the migration.
    migrateLegacyNotes();
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
