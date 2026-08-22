"use client";

import Link from "next/link";
import { useState } from "react";
import { Bookmark, BookOpen, Trash2 } from "lucide-react";
import { useBookmarksStore } from "@/lib/stores/bookmarks-store";
import { useUiStore } from "@/lib/stores/ui-store";
import { timeAgo } from "@/lib/utils";
import type { RoadmapIndexEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useHydrated } from "@/lib/stores/hydration-store";

export function BookmarksView({ roadmaps }: { roadmaps: Record<string, RoadmapIndexEntry> }) {
  const bookmarks = useBookmarksStore((s) => s.bookmarks);
  const toggleBookmark = useBookmarksStore((s) => s.toggleBookmark);
  const toast = useUiStore((s) => s.toast);
  const hydrated = useHydrated();
  const [confirmClear, setConfirmClear] = useState(false);

  // group bookmarks by roadmap so the page reads as a tidy reading list
  const grouped = Object.entries(
    bookmarks.reduce<Record<string, typeof bookmarks>>((acc, b) => {
      (acc[b.roadmap] ??= []).push(b);
      return acc;
    }, {})
  )
    .map(([slug, items]) => {
      const entry = roadmaps[slug];
      return { slug, items: items.sort((a, b) => b.at - a.at), entry };
    })
    .sort((a, b) => b.items[0]!.at - a.items[0]!.at);

  const remove = (roadmap: string, nodeId: string, label: string) => {
    toggleBookmark({ roadmap, nodeId, nodeLabel: label, nodeType: "topic" });
    toast("Bookmark removed", { description: "Removed from your saved topics.", kind: "info" });
  };

  const clearAll = () => {
    useBookmarksStore.setState({ bookmarks: [] });
    toast("Bookmarks cleared", { description: "All saved topics were removed from this device.", kind: "info" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">
            {bookmarks.length} saved {bookmarks.length === 1 ? "topic" : "topics"}
          </p>
          <h1 className="page-title mt-1">Saved topics</h1>
        </div>
        {bookmarks.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => setConfirmClear(true)}>
            <Trash2 className="h-4 w-4" /> Clear all bookmarks
          </Button>
        )}
      </div>
      <p className="mt-2 max-w-xl body-text">
        Everything you&apos;ve bookmarked while exploring — jump straight back in.
      </p>

      {!hydrated ? (
        <div className="mt-8 grid gap-2 sm:grid-cols-2" aria-busy="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[68px] rounded-xl" />
          ))}
        </div>
      ) : grouped.length === 0 ? (
        <Card className="mt-8">
          <CardContent className="p-8">
            <EmptyState
              icon={Bookmark}
              title="Nothing saved yet"
              desc="Open a topic on any roadmap and hit the bookmark icon in its details panel — saved topics show up here."
              action={{ label: "Browse careers", href: "/careers" }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 space-y-8">
          {grouped.map((g) => (
            <section key={g.slug} aria-label={g.entry?.title ?? g.slug}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{g.entry?.icon ?? "🗺️"}</span>
                <Link
                  href={`/roadmap/${g.slug}`}
                  className="font-display text-base font-bold text-slate-900 transition hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
                >
                  {g.entry?.title ?? g.slug}
                </Link>
                <span className="text-xs text-slate-500 dark:text-slate-400">{g.items.length}</span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {g.items.map((b) => (
                  <div
                    key={b.id}
                    className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-card transition hover:border-brand-300 hover:shadow-cardhover dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700"
                  >
                    <BookOpen className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-brand-500" />
                    <Link
                      href={`/roadmap/${b.roadmap}?node=${b.nodeId}`}
                      className="min-w-0 flex-1"
                    >
                      <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {b.nodeLabel}
                      </span>
                      <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                        saved {timeAgo(b.at)}
                      </span>
                    </Link>
                    <button
                      onClick={() => remove(b.roadmap, b.nodeId, b.nodeLabel)}
                      className="rounded-lg p-2 text-slate-300 transition hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/40"
                      aria-label={`Remove ${b.nodeLabel} bookmark`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirmClear}
        onOpenChange={setConfirmClear}
        title="Clear all bookmarks?"
        confirmLabel="Clear bookmarks"
        description={
          <>
            This removes all {bookmarks.length} saved{" "}
            {bookmarks.length === 1 ? "topic" : "topics"} from this device. Your progress and study
            plans are not affected.
          </>
        }
        onConfirm={clearAll}
      />
    </div>
  );
}
