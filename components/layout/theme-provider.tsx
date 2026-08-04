"use client";

import { useEffect, useState } from "react";
import { useThemeStore, applyTheme } from "@/lib/stores/theme-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);
  // The store is persisted with `skipHydration: true`, so `theme` is the
  // default "light" until rehydrate() finishes. Track hydration so we never
  // apply the default over a saved dark theme (which would flash light and
  // fight the pre-hydration <script> in layout.tsx).
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useThemeStore.persist.onFinishHydration(() => setHydrated(true));
    useThemeStore.persist.rehydrate();
    return unsub;
  }, []);
  useEffect(() => {
    if (hydrated) applyTheme(theme);
  }, [theme, hydrated]);
  return <>{children}</>;
}
