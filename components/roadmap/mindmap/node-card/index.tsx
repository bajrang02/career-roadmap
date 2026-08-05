"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { cn, nodeMeta, typeEmoji } from "@/lib/utils";
import { CompletionCheckbox, ExpandIndicator, OverviewButton } from "./node-buttons";
import type { NodeAction, NodeCardProps } from "./types";
import { useChoicesStore } from "@/lib/stores/choices-store";
import { useShallow } from "zustand/react/shallow";

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
    scale = 1,
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
    data,
  } = props;

  const { choices, setChoice, clearChoice } = useChoicesStore(
    useShallow((s) => ({
      choices: s.choices,
      setChoice: s.setChoice,
      clearChoice: s.clearChoice,
    }))
  );

  const choiceId = choices[id];
  const isChoice = type === "choice";
  const isUnselectedChoice = isChoice && !choiceId;

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
          opacity: dimmed ? 0.25 : faded ? 0.65 : 1,
          scale: scale * (selected ? 1.02 : 1),
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
            if (isUnselectedChoice) return;
            if (hasChildren) {
              onToggle(id);
            }
          }}
          onMouseEnter={() => onHover(id)}
          onMouseLeave={() => onHover(null)}
          className={cn(
            "relative w-full overflow-hidden rounded-[11px] border text-left transition-[transform,filter,border-color,opacity] duration-150",
            isUnselectedChoice ? "flex flex-col py-1.5 px-2 cursor-default" : "flex h-full items-center gap-1.5 px-2.5 cursor-pointer",
            !isUnselectedChoice && "hover:-translate-y-[1px] hover:shadow-nodehover",
            meta.card,
            locked && "opacity-55 saturate-50",
            completed &&
              type !== "career" &&
              type !== "achievement" &&
              "border-emerald-500/70 shadow-[0_0_0_1px_rgba(16,185,129,.18),0_6px_14px_-10px_rgba(16,185,129,.45)]",
            selected &&
              "border-brand-500 bg-white dark:bg-slate-800 ring-2 ring-brand-500/60 shadow-[0_0_20px_rgba(59,130,246,0.3)] z-20",
            focused && !selected && "ring-1 ring-brand-400/30",
            recent && !focused && !selected && "ring-1 ring-sky-300/50 dark:ring-sky-500/30",
            searchHit && "ring-2 ring-amber-400/70",
            flash && "animate-node-flash"
          )}
        >
          {/* Main Content Row */}
          <div className={cn("flex w-full items-center gap-1.5 shrink-0", isUnselectedChoice ? "h-9" : "h-full")}>

          {/* left accent bar — a thin colored spine encoding node type */}
          <span
            aria-hidden="true"
            className={cn("pointer-events-none absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full", meta.accent)}
          />

          {/* type emoji */}
          {!hasLabelEmoji && (
            <span aria-hidden="true" className={cn("flex shrink-0 items-center justify-center rounded-lg leading-none", selected ? "h-7 w-7 text-[15px]" : "h-6 w-6 text-[13px]", meta.chip)}>
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

          {/* Overview button */}
          <OverviewButton label={label} onOpen={() => onSelect(id)} className="h-6 w-6 shrink-0 ml-1" />

          {/* expand chevron — right side, ▶ → ▼ */}
          {!isUnselectedChoice && hasChildren ? (
            <ExpandIndicator collapsed={collapsed} className="h-5 w-5 shrink-0" />
          ) : (
            !isUnselectedChoice && !isChoice && <span className="w-5 shrink-0" aria-hidden="true" />
          )}

          {isChoice && choiceId && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearChoice(id);
              }}
              className="ml-auto flex items-center justify-center rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-brand-700 hover:bg-brand-200 dark:bg-brand-900/40 dark:text-brand-300 dark:hover:bg-brand-900/60"
            >
              Change
            </button>
          )}
          </div>

          {isUnselectedChoice && data.options && (
            <div className="mt-1 flex w-full flex-col gap-1.5 pb-1">
              {data.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setChoice(id, opt.id);
                    onSelect(id);
                  }}
                  className="group relative flex w-full items-center gap-2 rounded-md border border-slate-200 bg-white/60 px-2 py-1.5 text-left transition-colors hover:bg-white hover:shadow-sm dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:bg-slate-800"
                >
                  <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-slate-300 group-hover:border-brand-400 dark:border-slate-600 dark:group-hover:border-brand-500" />
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100">
                    {opt.label}
                  </span>
                  {data.recommended === opt.id && (
                    <span className="shrink-0 text-[11px] font-semibold text-amber-600 dark:text-amber-500">
                      ⭐ Rec
                    </span>
                  )}
                </button>
              ))}
            </div>
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
