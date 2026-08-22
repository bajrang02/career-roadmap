"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useUiStore } from "@/lib/stores/ui-store";
import { cn } from "@/lib/utils";

const ICONS = {
  success: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  error: <XCircle className="h-4 w-4 text-rose-500" />,
  info: <Info className="h-4 w-4 text-brand-500" />,
};

export function Toaster() {
  const toasts = useUiStore((s) => s.toasts);
  const dismiss = useUiStore((s) => s.dismissToast);
  return (
    // Anchored top-right, clear of the sticky navbar. The previous
    // bottom-right position sat exactly on top of the roadmap minimap and the
    // mobile zoom pill, so every "topic completed" toast hid the controls the
    // user was about to press next.
    <div
      className="pointer-events-none fixed inset-x-3 top-[4.5rem] z-[90] flex flex-col items-end gap-2 sm:inset-x-auto sm:right-4"
      role="region"
      aria-label="Notifications"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, transition: { duration: 0.18 } }}
            className={cn(
              "pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xl",
              "dark:border-slate-700 dark:bg-slate-800"
            )}
          >
            <div className="mt-0.5 shrink-0">{ICONS[t.kind]}</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.title}</p>
              {t.description && (
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="-m-1 shrink-0 rounded p-1 text-slate-500 dark:text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
