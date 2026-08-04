"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Command, CornerDownLeft, Search, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSearchIndex } from "@/lib/data-loader";
import { cn, scoreMatch } from "@/lib/utils";
import type { SearchEntry } from "@/lib/types";

export function SearchCommand() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: index } = useQuery({
    queryKey: ["search-index"],
    queryFn: getSearchIndex,
    staleTime: Infinity,
  });

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setQuery("");
      setActive(0);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("open-search", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-search", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  const results = useMemo(() => {
    if (!index) return [];
    const q = query.trim();
    if (!q) return index.slice(0, 7);
    const scored = index
      .map((entry) => ({
        entry,
        score: scoreMatch(entry.title, entry.keywords.slice(0, 40), q),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 9);
    return scored.map((r) => r.entry);
  }, [query, index]);

  const go = (slug: string) => {
    setOpen(false);
    router.push(`/roadmap/${slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      go(results[active].slug);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-slate-950/50 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            role="dialog"
            aria-modal="true"
            aria-label="Search roadmaps"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 dark:border-slate-800">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Search careers, technologies, topics…"
                className="h-12 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
                aria-label="Search"
              />
              <kbd className="flex items-center gap-0.5 rounded-md border border-border-light bg-slate-50 px-1.5 py-0.5 font-mono text-[11px] text-slate-400 dark:border-slate-700 dark:bg-slate-800">
                ESC
              </kbd>
            </div>

            <div className="max-h-[46vh] overflow-y-auto p-2 nice-scroll">
              {!query && (
                <p className="flex items-center gap-2 px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                  <Sparkles className="h-3 w-3" /> Popular roadmaps
                </p>
              )}
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-slate-400">
                  No roadmaps match “{query}”. Try “python”, “frontend”, “docker”…
                </p>
              )}
              {results.map((r: SearchEntry, i: number) => (
                <button
                  key={r.slug}
                  onClick={() => go(r.slug)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    i === active
                      ? "bg-brand-50 dark:bg-brand-950/60"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  )}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-lg dark:bg-slate-800">
                    {r.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {r.title}
                    </span>
                    <span className="block truncate text-xs text-slate-400">
                      {r.kind === "skill"
                        ? `${r.skillCategory} · Skill`
                        : `${r.domain || r.industry} · Career`}
                    </span>
                  </span>
                  {i === active ? (
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand-500" />
                  ) : (
                    <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 border-t border-slate-100 px-4 py-2.5 text-xs text-slate-500 dark:border-slate-400 dark:border-slate-800">
              <span className="flex items-center gap-1">
                <Command className="h-3 w-3" />K to search
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" /> to open
              </span>
              <span>↑↓ to navigate</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
