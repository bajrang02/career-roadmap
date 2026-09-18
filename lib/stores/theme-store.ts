"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeChoice = "light" | "dark" | "system";

interface ThemeState {
  theme: ThemeChoice;
  /** the ACTIVE theme after "system" resolves to the OS preference — used by
   *  toggles and icons so the button always reflects what the user sees. */
  resolved: "light" | "dark";
  toggle: () => void;
  set: (t: ThemeChoice) => void;
}

/** Resolve a stored choice to a concrete theme. Server-safe: when window is
 *  unavailable (first server render) only explicit choices are resolved. */
function resolveChoice(t: ThemeChoice): "light" | "dark" {
  if (typeof window === "undefined") return t === "dark" ? "dark" : "light";
  if (t === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return t;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      resolved: "light",
      toggle: () => {
        // Toggle from wherever you are: if the OS is dark (even under
        // "system"), flipping gives you light.
        const next: ThemeChoice = get().resolved === "light" ? "dark" : "light";
        const resolved = resolveChoice(next);
        set({ theme: next, resolved });
        applyTheme(next);
      },
      set: (theme) => {
        const resolved = resolveChoice(theme);
        set({ theme, resolved });
        applyTheme(theme);
      },
    }),
    { name: "cr-theme", skipHydration: true }
  )
);

export function applyTheme(theme: ThemeChoice) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const resolved = resolveChoice(theme);
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

