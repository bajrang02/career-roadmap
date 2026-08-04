"use client";

// Root-layout error boundary — the ONLY error file that catches failures in
// app/layout.tsx itself. Must render its own <html>/<body> (the root layout
// may be the thing that crashed). Page-level errors are caught by app/error.tsx.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error; // Next requires the prop; the user only needs the reset action.
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-[#0b1220]">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-6xl" aria-hidden="true">
            ⚠️
          </p>
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
            An unexpected error interrupted the app. Try again — if it keeps happening, the roadmap
            data may need to be regenerated.
          </p>
          <button
            onClick={reset}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-700 active:scale-[0.98]"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
