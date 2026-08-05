import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChoicesState {
  choices: Record<string, string>;
  setChoice: (nodeId: string, optionId: string) => void;
  clearChoice: (nodeId: string) => void;
}

export const useChoicesStore = create<ChoicesState>()(
  persist(
    (set) => ({
      choices: {},
      setChoice: (nodeId, optionId) =>
        set((state) => ({
          choices: { ...state.choices, [nodeId]: optionId },
        })),
      clearChoice: (nodeId) =>
        set((state) => {
          const next = { ...state.choices };
          delete next[nodeId];
          return { choices: next };
        }),
    }),
    {
      name: "roadmap-choices",
      skipHydration: true,
    }
  )
);
