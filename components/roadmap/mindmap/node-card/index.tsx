"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { cn, nodeMeta, typeEmoji } from "@/lib/utils";
import { CompletionCheckbox, ExpandButton } from "./node-buttons";
import type { NodeAction, NodeCardProps } from "./types";

export type { NodeAction, NodeCardProps };

/**
 * Compact roadmap.sh-style node card — a single slim row:
 *
 *   [accent] [emoji] [title…] [progress] [✓] [▸/▾]
 *
 * Only the essentials live on the canvas: type icon, label, a thin completion
 * bar and the expand chevron. Descriptions, resources, difficulty, time and
 * every action live in the right-side details panel, so the roadmap reads as
 * a clean, dense map instead of a wall of cards.
 */
function NodeCardInner(props: NodeCardProps) {
  const {
    id,
    label,
    type,
    x,
    y,
    w,
    h,
    hasChildren,
    collapsed,
    selected,
    focused,
    dimmed,
    faded,
    recent,
    completed,
    locked,
    searchHit,
    flash,
    mountAnimated,
    pct,
    learnableCount,
    onSelect,
    onToggle,
    onHover,
    onAction,
  } = props;

  const meta = nodeMeta(type);
  const emoji = typeEmoji(type);
  // terminal labels (e.g. "🎓 Career Ready") sometimes already carry the type
  // emoji — don't render a duplicate chip in front of it.
  const hasLabelEmoji = label.trimStart().startsWith(emoji);

  // thin completion bar only for in-progress subtrees (never on empty or done)
  const showProgress = pct > 0 && pct < 100 && learnableCount > 1;
  const isCareer = type === "career";

  return (
    <div
      className="absolute left-0 top-0 will-change-transform"
      style={{
        width: w,
        height: h,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: selected ? 30 : 10,
      }}
    >
      <motion.div
        initial={mountAnimated ? { opacity: 0, scale: 0.94 } : false}
        animate={{
          opacity: dimmed ? 0.3 : faded ? 0.72 : 1,
          scale: selected ? 1.02 : 1,
        }}
        exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="h-full w-full"
      >
        <div
          role="button"
          tabIndex={focused ? 0 : -1}
          aria-label={`${label} (${meta.label}${completed ? ", completed" : ""}${recent ? ", recently visited" : ""})`}
          aria-expanded={hasChildren ? !collapsed : undefined}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(id);
          }}
          onMouseEnter={() => onHover(id)}
          onMouseLeave={() => onHover(null)}
          className={cn(
            // single row, roadmap.sh proportions: 10px side padding, 11px radius
            "relative flex h-full w-full cursor-pointer select-none items-center gap-1.5 overflow-hidden rounded-[11px] border px-2.5 text-left transition-[transform,box-shadow,filter,border-color] duration-150",
            "hover:-translate-y-[1px] hover:shadow-nodehover",
            meta.card,
            locked && "opacity-55 saturate-50",
            completed &&
              type !== "career" &&
              type !== "achievement" &&
              "border-emerald-500/70 shadow-[0_0_0_1px_rgba(16,185,129,.18),0_6px_14px_-10px_rgba(16,185,129,.45)]",
            selected &&
              "border-brand-500/70 ring-2 ring-brand-500/40 shadow-[0_0_18px_-6px_rgba(59,130,246,.5)]",
            focused && !selected && "ring-1 ring-brand-400/30",
            recent && !focused && !selected && "ring-1 ring-sky-300/50 dark:ring-sky-500/30",
            searchHit && "ring-2 ring-amber-400/70",
            flash && "animate-node-flash"
          )}
        >
          {/* left accent bar — a thin colored spine encoding node type */}
          <span
            aria-hidden="true"
            className={cn("pointer-events-none absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full", meta.accent)}
          />

          {/* type emoji */}
          {!hasLabelEmoji && (
            <span aria-hidden="true" className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[13px] leading-none", meta.chip)}>
              {emoji}
            </span>
          )}

          {/* title — single line, truncates; the full label is one click away */}
          <span
            title={label}
            className={cn(
              "min-w-0 flex-1 truncate leading-[1.2]",
              meta.titleSize,
              selected ? "font-bold" : "font-semibold",
              meta.text
            )}
          >
            {label}
          </span>

          {/* career % pill */}
          {isCareer && pct > 0 && (
            <span className="shrink-0 rounded-full bg-white/20 px-1.5 py-px font-mono text-[10px] font-bold text-white">
              {pct}%
            </span>
          )}

          {/* completion status */}
          <CompletionCheckbox completed={completed} label={label} id={id} onAction={onAction} className="h-4 w-4 shrink-0" />

          {/* expand chevron — right side, ▶ → ▼ */}
          {hasChildren ? (
            <ExpandButton collapsed={collapsed} label={label} onToggle={() => onToggle(id)} className="h-5 w-5 shrink-0" />
          ) : (
            <span className="w-5 shrink-0" aria-hidden="true" />
          )}

          {/* slim completion bar along the bottom edge */}
          {showProgress && (
            <span
              className="pointer-events-none absolute inset-x-2 bottom-[3px] h-[3px] overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-700/50"
              aria-hidden="true"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="block h-full rounded-full bg-brand-500"
              />
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export const NodeCard = memo(NodeCardInner);
