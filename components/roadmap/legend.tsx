"use client";

import { useState, memo } from "react";
import { motion } from "framer-motion";
import { Columns3, X } from "lucide-react";
import { NODE_TYPE_META } from "@/lib/utils";
import type { NodeType } from "@/lib/types";

const TYPES: NodeType[] = [
  "career",
  "section",
  "subsection",
  "topic",
  "concept",
  "project",
  "optional",
  "advanced",
  "interview",
  "achievement",
];

export const Legend = memo(function Legend({ onClose }: { onClose?: () => void }) {
  // start collapsed: the expanded panel is ~370px tall and covers the
  // leftmost roadmap nodes at the fitted overview, making their action
  // buttons unreachable. The header strip stays clickable to expand it.
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      // on phones the legend floats ABOVE the bottom zoom pill (bottom-20) so
      // the two never overlap; on larger screens it sits in the corner.
      className="absolute bottom-20 left-4 z-20 w-48 rounded-xl border border-slate-200 bg-white/95 shadow-xl backdrop-blur sm:bottom-4 sm:w-52 dark:border-slate-700 dark:bg-slate-800/95"
    >
      <button
        onClick={() => {
          // collapsed → expand; open → dismiss (when wired) or collapse
          if (open && onClose) onClose();
          else setOpen((v) => !v);
        }}
        className="flex w-full items-center justify-between px-3.5 py-2.5 text-[13px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
        aria-expanded={open}
      >
        <span className="flex items-center gap-1.5">
          <Columns3 className="h-4 w-4" /> Topic legend
        </span>
        <X className="h-4 w-4 transition-transform" style={{ transform: open ? "none" : "rotate(45deg)" }} />
      </button>
      {open && (
        <div className="space-y-1.5 border-t border-slate-100 p-3 dark:border-slate-700/60">
          {TYPES.map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-xs font-semibold ${NODE_TYPE_META[t].chip}`}>
                {NODE_TYPE_META[t].label}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2 pt-1">
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
              Completed
            </span>
            <span className="rounded bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-500 dark:bg-slate-700 dark:text-slate-400">
              Locked
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
});
