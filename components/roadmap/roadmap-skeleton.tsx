import { Skeleton } from "@/components/ui/skeleton";

/**
 * Placeholder for the mindmap page while its client bundle loads. It reserves
 * the same toolbar height and canvas surface the real viewer uses, so nothing
 * jumps when the interactive canvas takes over.
 */
export function RoadmapSkeleton() {
  return (
    <div
      className="flex h-[calc(100vh-4rem)] flex-col supports-[height:100dvh]:h-[calc(100dvh-4rem)]"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading roadmap…</span>
      <div className="flex min-h-[52px] flex-wrap items-center gap-2 border-b border-slate-200/70 px-3 py-2 dark:border-slate-700/60">
        <Skeleton className="h-7 w-7 rounded-lg" />
        <Skeleton className="h-5 w-40" />
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="h-9 w-32 rounded-xl" />
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </div>
      <div className="canvas-dots relative flex-1">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
        </div>
      </div>
    </div>
  );
}
