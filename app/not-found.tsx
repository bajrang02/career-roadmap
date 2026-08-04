import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-6xl" aria-hidden="true">
        🗺️
      </p>
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
        Page not found
      </h1>
      <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
        This route doesn&apos;t exist — the URL may be mistyped, or the roadmap may have been
        renamed. Browse the full catalog to find what you&apos;re looking for.
      </p>
      <div className="mt-2 flex gap-3">
        <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
          Back to home
        </Link>
        <Link href="/roadmaps" className={cn(buttonVariants({ variant: "outline" }))}>
          Browse roadmaps
        </Link>
      </div>
    </div>
  );
}
