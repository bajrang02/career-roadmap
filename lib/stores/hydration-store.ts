"use client";

import { create } from "zustand";

interface HydrationState {
  /** true once <Providers> has replayed localStorage into every persisted store */
  hydrated: boolean;
  markHydrated: () => void;
}

/**
 * Persisted stores are deliberately rehydrated *after* mount so the server HTML
 * and the first client render match. That leaves a window where the UI would
 * otherwise render "you have no progress" to a user who does — this flag lets
 * progress-driven screens show a skeleton for that one frame instead.
 */
export const useHydrationStore = create<HydrationState>((set) => ({
  hydrated: false,
  markHydrated: () => set({ hydrated: true }),
}));

export const useHydrated = () => useHydrationStore((s) => s.hydrated);
