import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Note {
  id: string;
  nodeId: string;
  roadmapSlug: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

interface NotesState {
  notes: Record<string, Note[]>; // Keyed by nodeId for quick access
  
  // Actions
  addNote: (roadmapSlug: string, nodeId: string, content: string) => void;
  updateNote: (nodeId: string, noteId: string, content: string) => void;
  deleteNote: (nodeId: string, noteId: string) => void;
  getNotesForNode: (nodeId: string) => Note[];
  
  // Import/Export support
  exportNotes: () => string;
  importNotes: (data: string) => void;
  clearAll: () => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: {},

      addNote: (roadmapSlug, nodeId, content) => {
        const newNote: Note = {
          id: crypto.randomUUID(),
          nodeId,
          roadmapSlug,
          content,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => {
          const existing = state.notes[nodeId] || [];
          return {
            notes: {
              ...state.notes,
              [nodeId]: [...existing, newNote],
            },
          };
        });
      },

      updateNote: (nodeId, noteId, content) => {
        set((state) => {
          const existing = state.notes[nodeId] || [];
          return {
            notes: {
              ...state.notes,
              [nodeId]: existing.map((n) =>
                n.id === noteId ? { ...n, content, updatedAt: Date.now() } : n
              ),
            },
          };
        });
      },

      deleteNote: (nodeId, noteId) => {
        set((state) => {
          const existing = state.notes[nodeId] || [];
          return {
            notes: {
              ...state.notes,
              [nodeId]: existing.filter((n) => n.id !== noteId),
            },
          };
        });
      },

      getNotesForNode: (nodeId) => {
        return get().notes[nodeId] || [];
      },

      exportNotes: () => {
        return JSON.stringify(get().notes);
      },

      importNotes: (data: string) => {
        try {
          const parsed = JSON.parse(data);
          if (typeof parsed === "object" && parsed !== null) {
            set({ notes: parsed });
          }
        } catch (e) {
          console.error("Failed to import notes", e);
        }
      },

      clearAll: () => set({ notes: {} }),
    }),
    {
      name: "cr-notes-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// One-time migration from the legacy bookmarks-store notes (the format the
// roadmap sidebar used before notes-store existed). The old store held a
// single note per node with {roadmap, text}; the new store is keyed by
// nodeId with {roadmapSlug, content} and supports multiple notes per node.
// Legacy entries are merged in — only when a node has no newer note yet.
interface LegacyNote {
  id?: string;
  roadmap?: string;
  nodeId?: string;
  text?: string;
  updatedAt?: number;
}

// Convert legacy bookmarks-store notes ({roadmap, nodeId, text, …}) into the
// keyed record the notes store uses. Shared by the one-time localStorage
// migration AND v1 backup imports so the shape-mapping can never drift.
export function legacyNotesToRecord(legacy: unknown): Record<string, Note[]> {
  const record: Record<string, Note[]> = {};
  if (!Array.isArray(legacy)) return record;
  for (const n of legacy as LegacyNote[]) {
    if (!n || typeof n.nodeId !== "string") continue;
    if (record[n.nodeId]?.length) continue;
    record[n.nodeId] = [
      {
        id: n.id ?? crypto.randomUUID(),
        nodeId: n.nodeId,
        roadmapSlug: n.roadmap ?? "",
        content: n.text ?? "",
        createdAt: n.updatedAt ?? Date.now(),
        updatedAt: n.updatedAt ?? Date.now(),
      },
    ];
  }
  return record;
}

export function migrateLegacyNotes() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem("cr-bookmarks");
    if (!raw) return;
    const data = JSON.parse(raw) as { state?: { notes?: unknown } };
    const legacy = Array.isArray(data?.state?.notes) ? data.state.notes : [];
    if (legacy.length === 0) return;

    const converted = legacyNotesToRecord(legacy);
    const current = useNotesStore.getState().notes;
    const merged: Record<string, Note[]> = { ...current };
    let changed = false;
    for (const [nodeId, list] of Object.entries(converted)) {
      if ((current[nodeId] ?? []).length) continue; // newer note already exists
      merged[nodeId] = list;
      changed = true;
    }
    if (changed) useNotesStore.setState({ notes: merged });
  } catch {
    /* storage unavailable — skip */
  }
}
