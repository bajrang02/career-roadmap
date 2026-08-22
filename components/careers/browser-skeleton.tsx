import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shown while a browser page's client bundle resolves. The old fallback was an
 * empty `h-screen` div, which read as a broken white page on a slow connection;
 * this mirrors the real layout so the content lands without a jolt.
 */
export function BrowserSkeleton({ title, cards = 8 }: { title: string; cards?: number }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading {title}…</span>
      <Skeleton className="h-3.5 w-52" />
      <Skeleton className="mt-3 h-8 w-64" />
      <Skeleton className="mt-3 h-4 w-full max-w-xl" />

      <div className="mt-6 flex flex-wrap gap-3">
        <Skeleton className="h-10 w-full max-w-sm flex-1" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-28 rounded-full" />
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: cards }).map((_, i) => (
          <Skeleton key={i} className="h-[232px] rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
