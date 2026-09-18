"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Bookmark {
  roadmap: string;
  roadmapTitle: string;
  nodeId: string;
  nodeLabel: string;
  nodeType: string;
  addedAt: number;
}

interface BookmarksState {
  bookmarks: Bookmark[];
  add: (b: Omit<Bookmark, "addedAt">) => void;
  remove: (roadmap: string, nodeId: string) => void;
  isBookmarked: (roadmap: string, nodeId: string) => boolean;
  toggle: (b: Omit<Bookmark, "addedAt">) => void;
  clearAll: () => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      add: (b) => {
        const existing = get().bookmarks.some(
          (bk) => bk.roadmap === b.roadmap && bk.nodeId === b.nodeId
        );
        if (!existing) {
          set({ bookmarks: [...get().bookmarks, { ...b, addedAt: Date.now() }] });
        }
      },
      remove: (roadmap, nodeId) => {
        set({
          bookmarks: get().bookmarks.filter(
            (bk) => !(bk.roadmap === roadmap && bk.nodeId === nodeId)
          ),
        });
      },
      isBookmarked: (roadmap, nodeId) => {
        return get().bookmarks.some(
          (bk) => bk.roadmap === roadmap && bk.nodeId === nodeId
        );
      },
      toggle: (b) => {
        const existing = get().bookmarks.some(
          (bk) => bk.roadmap === b.roadmap && bk.nodeId === b.nodeId
        );
        if (existing) {
          set({
            bookmarks: get().bookmarks.filter(
              (bk) => !(bk.roadmap === b.roadmap && bk.nodeId === b.nodeId)
            ),
          });
        } else {
          set({ bookmarks: [...get().bookmarks, { ...b, addedAt: Date.now() }] });
        }
      },
      clearAll: () => set({ bookmarks: [] }),
    }),
    { name: "cr-bookmarks", skipHydration: true }
  )
);
