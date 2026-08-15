"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Bookmark {
  id: string;
  roadmap: string;
  nodeId: string;
  nodeLabel: string;
  nodeType: string;
  at: number;
}

interface BookmarkState {
  bookmarks: Bookmark[];
  isBookmarked: (roadmap: string, nodeId: string) => boolean;
  toggleBookmark: (b: Omit<Bookmark, "id" | "at">) => void;
}

export const useBookmarksStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      isBookmarked: (roadmap, nodeId) =>
        get().bookmarks.some((b) => b.roadmap === roadmap && b.nodeId === nodeId),
      toggleBookmark: (b) => {
        const exists = get().bookmarks.some(
          (x) => x.roadmap === b.roadmap && x.nodeId === b.nodeId
        );
        set({
          bookmarks: exists
            ? get().bookmarks.filter(
                (x) => !(x.roadmap === b.roadmap && x.nodeId === b.nodeId)
              )
            : [
                ...get().bookmarks,
                { ...b, id: Math.random().toString(36).slice(2), at: Date.now() },
              ],
        });
      },
    }),
    { name: "cr-bookmarks", skipHydration: true }
  )
);
