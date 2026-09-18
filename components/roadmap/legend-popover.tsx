"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";
import { NODE_TYPE_META, typeEmoji, cn } from "@/lib/utils";
import type { NodeType } from "@/lib/types";

// Compact node-type legend for the roadmap canvas. Mirrors the landing-page
// legend so the map's color/emoji language is decodable right where it's used.
const ITEMS: { type: NodeType; desc: string }[] = [
  { type: "career", desc: "The career itself" },
  { type: "section", desc: "Major skill areas" },
  { type: "subsection", desc: "Skill groups" },
  { type: "topic", desc: "What you learn" },
  { type: "concept", desc: "Core ideas" },
  { type: "project", desc: "Build these" },
  { type: "optional", desc: "Pick your path" },
  { type: "advanced", desc: "Go deeper" },
  { type: "interview", desc: "Prep & questions" },
  { type: "achievement", desc: "Career ready" },
];

export function LegendPopover({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="pointer-events-auto absolute bottom-4 left-4 z-20 flex flex-col items-start gap-2 sm:bottom-[88px]">
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="legend-panel"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="max-w-[230px] rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-800/95"
            role="region"
            aria-label="Node type legend"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-slate-500 dark:text-slate-400">
                Node legend
              </p>
              <button
                onClick={onToggle}
                aria-label="Close legend"
                className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <ul className="space-y-1.5">
              {ITEMS.map(({ type, desc }) => (
                <li key={type} className="flex items-center gap-2 text-[11.5px]">
                  <span
                    className={cn(
                      "flex h-5 min-w-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                      NODE_TYPE_META[type].chip
                    )}
                  >
                    <span aria-hidden="true">{typeEmoji(type)}</span>
                    <span>{NODE_TYPE_META[type].label}</span>
                  </span>
                  <span className="min-w-0 flex-1 truncate text-slate-500 dark:text-slate-400">
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-label={open ? "Hide node legend" : "Show node legend"}
        className={cn(
          "flex h-8 items-center gap-1.5 rounded-full border px-3 text-[11.5px] font-semibold shadow-lg backdrop-blur transition-colors",
          open
            ? "border-brand-300 bg-brand-600 text-white dark:border-brand-500"
            : "border-slate-200 bg-white/95 text-slate-600 hover:bg-white hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800/95 dark:text-slate-300 dark:hover:text-brand-400"
        )}
      >
        {open ? (
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        Legend
      </button>
    </div>
  );
}