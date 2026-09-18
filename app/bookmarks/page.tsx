"use client";

import { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import type { NodeType } from "@/lib/types";
import {
  Bookmark as BookmarkIcon,
  Trash2,
  Map,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useBookmarksStore } from "@/lib/stores/bookmarks-store";
import { typeEmoji } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function BookmarksPage() {
  const bookmarks = useBookmarksStore((s) => s.bookmarks);
  const remove = useBookmarksStore((s) => s.remove);
  const clearAll = useBookmarksStore((s) => s.clearAll);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    useBookmarksStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  const grouped = useMemo(() => {
    const groups: Record<string, { roadmap: string; roadmapTitle: string; items: typeof bookmarks }> = {};
    for (const b of bookmarks) {
      const key = b.roadmap;
      if (!groups[key]) {
        groups[key] = { roadmap: b.roadmap, roadmapTitle: b.roadmapTitle, items: [] };
      }
      groups[key].items.push(b);
    }
    return Object.values(groups);
  }, [bookmarks]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Bookmarks</h1>
          <p className="mt-2 body-text">
            Save topics to revisit later — bookmarked from any roadmap.
          </p>
        </div>
        {bookmarks.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
            className="text-rose-600 hover:text-rose-700 dark:text-rose-400"
          >
            <Trash2 className="h-4 w-4" /> Clear all
          </Button>
        )}
      </div>

      {!hydrated ? (
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="mt-20 flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <BookmarkIcon className="h-7 w-7 text-slate-400 dark:text-slate-500" />
          </span>
          <h2 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
            No bookmarks yet
          </h2>
          <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Open any roadmap node and tap the bookmark icon to save it here for
            quick access later.
          </p>
          <Link
            href="/careers"
            className="btn-primary mt-6"
          >
            Browse careers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {grouped.map((group) => (
            <div key={group.roadmap}>
              <Link
                href={`/roadmap/${group.roadmap}`}
                className="group mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400"
              >
                <Map className="h-4 w-4 text-brand-500" />
                {group.roadmapTitle}
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
              <div className="grid gap-2 sm:grid-cols-2">
                {group.items.map((b) => (
                  <div
                    key={`${b.roadmap}-${b.nodeId}`}
                    className="card-base flex items-start gap-3 p-3.5"
                  >
                    <span className="mt-0.5 text-base">
                      {typeEmoji(b.nodeType as NodeType)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {b.nodeLabel}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        Added {new Date(b.addedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Link
                        href={`/roadmap/${b.roadmap}?node=${b.nodeId}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-700"
                        aria-label={`Open ${b.nodeLabel}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        onClick={() => remove(b.roadmap, b.nodeId) as void}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                        aria-label={`Remove ${b.nodeLabel} bookmark`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
