"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the unexpected error so it lands in the console instead of
    // vanishing — but the user only ever sees the friendly message below.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-6xl" aria-hidden="true">
        ⚠️
      </p>
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
        Something went wrong
      </h1>
      <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
        An unexpected error interrupted this page. Try again — if it keeps happening, the roadmap
        data may need to be regenerated.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
