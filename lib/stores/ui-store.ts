"use client";

import { create } from "zustand";

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

export const useUiStore = create<UiState>((set) => ({
  toasts: [],
  toast: (title, opts) => {
    const id = Math.random().toString(36).slice(2);
    set({
      toasts: [...useUiStore.getState().toasts, { id, title, ...opts, kind: opts?.kind ?? "success" }],
    });
    setTimeout(() => {
      set({ toasts: useUiStore.getState().toasts.filter((t) => t.id !== id) });
    }, 4200);
  },
  dismissToast: (id) => set({ toasts: useUiStore.getState().toasts.filter((t) => t.id !== id) }),
  showMinimap: true,
  setShowMinimap: (showMinimap) => set({ showMinimap }),
  showLegend: true,
  setShowLegend: (showLegend) => set({ showLegend }),
}));
