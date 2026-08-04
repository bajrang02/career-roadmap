"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Local, device-only preferences. There is no account system — everything a
// user does lives in this browser's localStorage, so the only "profile" is an
// optional display name used on earned certificates.
interface SettingsState {
  learnerName: string;
  setLearnerName: (name: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      learnerName: "",
      setLearnerName: (learnerName) => set({ learnerName: learnerName.trim().slice(0, 40) }),
    }),
    { name: "cr-settings", skipHydration: true }
  )
);
