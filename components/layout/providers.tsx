"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./theme-provider";
import { useThemeStore } from "@/lib/stores/theme-store";
import { useProgressStore } from "@/lib/stores/progress-store";
import { useBookmarksStore } from "@/lib/stores/bookmarks-store";
import { useSettingsStore } from "@/lib/stores/settings-store";
import { useStudyPlanStore } from "@/lib/stores/study-plan-store";
import { useChoicesStore } from "@/lib/stores/choices-store";

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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  useEffect(() => {
    // Rehydrate persisted stores only after the browser has mounted, so the
    // first client render matches the server render exactly (no hydration
    // mismatch), then persisted state is applied as a post-mount update.
    for (const store of PERSISTED_STORES) {
      store.persist.rehydrate();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={120}>
        <ThemeProvider>{children}</ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
