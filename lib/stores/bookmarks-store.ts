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

export interface Note {
  id: string;
  roadmap: string;
  nodeId: string;
  text: string;
  updatedAt: number;
}

interface BookmarkState {
  bookmarks: Bookmark[];
  notes: Note[];
  isBookmarked: (roadmap: string, nodeId: string) => boolean;
  toggleBookmark: (b: Omit<Bookmark, "id" | "at">) => void;
  getNote: (roadmap: string, nodeId: string) => Note | undefined;
  setNote: (roadmap: string, nodeId: string, text: string) => void;
}

export const useBookmarksStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      notes: [],
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
      getNote: (roadmap, nodeId) =>
        get().notes.find((n) => n.roadmap === roadmap && n.nodeId === nodeId),
      setNote: (roadmap, nodeId, text) => {
        const existing = get().notes.find((n) => n.roadmap === roadmap && n.nodeId === nodeId);
        if (existing) {
          set({
            notes: get().notes.map((n) =>
              n.id === existing.id ? { ...n, text, updatedAt: Date.now() } : n
            ),
          });
        } else {
          set({
            notes: [
              ...get().notes,
              { id: Math.random().toString(36).slice(2), roadmap, nodeId, text, updatedAt: Date.now() },
            ],
          });
        }
      },
    }),
    { name: "cr-bookmarks", skipHydration: true }
  )
);
