"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight, BookOpen, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NodeAction } from "./types";

const base =
  "relative flex shrink-0 items-center justify-center rounded-lg text-slate-500 transition-[background-color,color,transform] duration-150 hover:bg-slate-100 hover:text-slate-700 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-1 dark:text-slate-400 dark:hover:bg-slate-700/60 dark:hover:text-slate-200 after:absolute after:-inset-y-[10px] after:-inset-x-[3px] after:content-['']";

/** Rotating chevron on the RIGHT of the card: ▸ when collapsed, ▾ when
 *  expanded. A real button so it exposes a proper 44px+ touch target (the
 *  ::after hit-area expansion in `base`) and an accessible label. */
export function ExpandIndicator({
  collapsed,
  label,
  onAction,
  className,
}: {
  collapsed: boolean;
  label: string;
  onAction: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      title={collapsed ? `Expand ${label}` : `Collapse ${label}`}
      aria-label={collapsed ? `Expand ${label}` : `Collapse ${label}`}
      aria-expanded={!collapsed}
      onClick={(e) => {
        e.stopPropagation();
        onAction();
      }}
      className={cn(
        base,
        "rounded-md hover:scale-110 active:scale-95 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm",
        className
      )}
    >
      <motion.span
        animate={{ rotate: collapsed ? 0 : 90 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex"
      >
        <ChevronRight className="h-5 w-5 sm:h-4 sm:w-4" />
      </motion.span>
    </button>
  );
}

/** Opens the details/overview panel for this node without expanding the subtree. */
export function OverviewButton({
  label,
  onOpen,
  className,
}: {
  label: string;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      title="View Overview"
      aria-label={`View Overview for ${label}`}
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      className={cn(base, "rounded-md hover:scale-110 active:scale-95 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm", className)}
    >
      <BookOpen className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-brand-600 dark:text-brand-400" />
    </button>
  );
}

/** Button to change a chosen framework/tool option */
export function ChangeOptionButton({
  onAction,
  className,
}: {
  onAction: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      title="Change Selection"
      aria-label="Change Selection"
      onClick={(e) => {
        e.stopPropagation();
        onAction();
      }}
      className={cn(base, "rounded-md hover:scale-110 active:scale-95 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm", className)}
    >
      <RefreshCw className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-brand-600 dark:text-brand-400" />
    </button>
  );
}

/** Tiny completion check — fills emerald with a bold check when complete. */
export function CompletionCheckbox({
  completed,
  label,
  id,
  onAction,
  className,
}: {
  completed: boolean;
  label: string;
  id: string;
  onAction: (action: NodeAction, id: string) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      title={completed ? `Mark ${label} incomplete` : `Mark ${label} complete`}
      aria-label={completed ? `Mark ${label} incomplete` : `Mark ${label} complete`}
      aria-pressed={completed}
      onClick={(e) => {
        e.stopPropagation();
        onAction("complete", id);
      }}
      className={cn(
        base,
        "rounded-[5px] border-2 p-0 transition-colors",
        completed
          ? "border-emerald-500 bg-emerald-500 text-white shadow-[0_1px_4px_rgba(16,185,129,.45)]"
          : "border-slate-300 bg-white/50 hover:border-brand-400 dark:border-slate-500 dark:bg-slate-700/50 dark:hover:border-brand-400",
        className
      )}
    >
      <motion.span
        key={completed ? "done" : "todo"}
        initial={{ scale: completed ? 0.4 : 1, opacity: 0 }}
        animate={{ scale: 1, opacity: completed ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 650, damping: 22 }}
        className="flex"
      >
        <Check className="h-3.5 w-3.5 sm:h-2.5 sm:w-2.5" strokeWidth={3.5} />
      </motion.span>
    </button>
  );
}
