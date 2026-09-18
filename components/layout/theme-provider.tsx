"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/lib/stores/theme-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
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

  // After rehydrate, recompute `resolved` from the persisted choice (a saved
  // "system" must initially resolve to the OS preference, not "light").
  useEffect(() => {
    if (!hydrated) return;
    useThemeStore.getState().set(useThemeStore.getState().theme);
  }, [hydrated]);

  // When the user picks "System", live-follow OS theme changes.
  useEffect(() => {
    if (!hydrated) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (useThemeStore.getState().theme === "system") {
        useThemeStore.getState().set("system");
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [hydrated]);

  return <>{children}</>;
}

