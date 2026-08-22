"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  kind: "success" | "error" | "info";
}

interface UiState {
  toasts: Toast[];
  toast: (title: string, opts?: { description?: string; kind?: Toast["kind"] }) => void;
  dismissToast: (id: string) => void;
  showMinimap: boolean;
  setShowMinimap: (v: boolean) => void;
  showLegend: boolean;
  setShowLegend: (v: boolean) => void;
}

/** Never stack more than this many toasts — beyond it the oldest is dropped so
 *  a burst (e.g. "mark subtree complete") can't wallpaper the canvas. */
const MAX_TOASTS = 3;
const TOAST_MS = 4200;

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      toasts: [],
      toast: (title, opts) => {
        const id = Math.random().toString(36).slice(2);
        set((s) => ({
          toasts: [...s.toasts, { id, title, ...opts, kind: opts?.kind ?? "success" }].slice(
            -MAX_TOASTS
          ),
        }));
        setTimeout(() => {
          set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
        }, TOAST_MS);
      },
      dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
      showMinimap: true,
      setShowMinimap: (showMinimap) => set({ showMinimap }),
      showLegend: true,
      setShowLegend: (showLegend) => set({ showLegend }),
    }),
    {
      name: "cr-ui-prefs",
      // Only the canvas preferences persist — they're presented as settings on
      // /settings, so they have to survive a reload. Toasts are ephemeral and
      // must never be restored from a previous session.
      partialize: (s) => ({ showMinimap: s.showMinimap, showLegend: s.showLegend }),
      skipHydration: true,
    }
  )
);
