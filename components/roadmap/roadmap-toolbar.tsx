"use client";

import { memo } from "react";
import Link from "next/link";
import {
  Bookmark,
  CalendarDays,
  ChevronRight,
  Columns3,
  Copy,
  Crosshair,
  Focus,
  HelpCircle,
  Home,
  Layers,
  Maximize,
  Minimize,
  Minus,
  MoreHorizontal,
  Moon,
  Plus,
  RefreshCcw,
  Search,
  Sun,
  X,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUiStore } from "@/lib/stores/ui-store";
import { useThemeStore, applyTheme } from "@/lib/stores/theme-store";
import { useAchievementsStore } from "@/lib/stores/achievements-store";
import { cn } from "@/lib/utils";
import type { RoadmapNode } from "@/lib/types";

interface ToolbarProps {
  slug: string;
  title: string;
  icon: string;
  color: string;
  breadcrumbs: RoadmapNode[];
  pct: number;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onReset: () => void;
  onFit: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomSlider: (k: number) => void;
  onCenterView: () => void;
  zoom: number;
  zoomLabel: string;
  focusMode: boolean;
  onToggleFocus: () => void;
  onToggleMinimap: () => void;
  onToggleLegend: () => void;
  showMinimap: boolean;
  showLegend: boolean;
  searchOpen: boolean;
  onToggleSearch: () => void;
  searchQuery: string;
  onSearchQuery: (q: string) => void;
  /** jump to the next search match (Enter in the search box) */
  onSearchNext: () => void;
  bookmarked: boolean;
  onToggleBookmark: () => void;
  onBreadcrumbClick: (id: string) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  /** opens the roadmap-wide study planner wizard */
  onOpenPlanner: () => void;
  /** percent complete of the saved study plan, or null when none exists */
  planProgress: number | null;
  onRandomTopic?: () => void;
  /** reopens the first-visit getting-started tour */
  onShowTour?: () => void;
}

export const RoadmapToolbar = memo(function RoadmapToolbar(props: ToolbarProps) {
  const toast = useUiStore((s) => s.toast);
  const theme = useThemeStore((s) => s.theme);
  const streakDays = useAchievementsStore((s) => s.streakDays);
  const {
    slug, title, icon, breadcrumbs, pct, onExpandAll, onCollapseAll, onReset, onFit,
    onZoomIn, onZoomOut, onZoomSlider, onCenterView, zoom, zoomLabel, focusMode, onToggleFocus,
    onToggleMinimap, onToggleLegend,
    showMinimap, showLegend, searchOpen, onToggleSearch, searchQuery, onSearchQuery, onSearchNext,
    bookmarked, onToggleBookmark, onBreadcrumbClick,
    isFullscreen, onToggleFullscreen,
    onOpenPlanner, planProgress,
    onRandomTopic,
    onShowTour,
  } = props;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("Link copied", { description: "Share this roadmap with friends." });
    } catch {
      toast("Could not copy link", { kind: "error" });
    }
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
    useThemeStore.getState().set(next);
  };

  const zoomGroup = (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" onClick={onZoomOut} aria-label="Zoom out">
            <Minus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Zoom out</TooltipContent>
      </Tooltip>
      <input
        type="range"
        min={20}
        max={200}
        step={5}
        value={Math.round(zoom * 100)}
        onChange={(e) => onZoomSlider(parseInt(e.target.value, 10) / 100)}
        aria-label="Zoom level"
        className="zoom-slider hidden h-1.5 w-16 cursor-pointer appearance-none rounded-full bg-slate-200 lg:block dark:bg-slate-700"
      />
      <span className="hidden w-9 text-center font-mono text-xs text-slate-500 md:block dark:text-slate-400">{zoomLabel}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" onClick={onZoomIn} aria-label="Zoom in">
            <Plus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Zoom in</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" onClick={onFit} aria-label="Fit to view">
            <Maximize className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Fit to view</TooltipContent>
      </Tooltip>
      {onRandomTopic && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" onClick={onRandomTopic} aria-label="Random Topic">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Random Topic</TooltipContent>
        </Tooltip>
      )}
    </>
  );

  return (
    <div className="flex min-h-[52px] flex-wrap items-center gap-1 border-b border-slate-200/70 bg-white/80 px-3 py-2 backdrop-blur-xl sm:gap-1.5 dark:border-slate-700/60 dark:bg-[#0b1220]/80">
      <Link href="/careers" className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 transition hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800 dark:hover:text-brand-400" aria-label="All careers">
        <Home className="h-4 w-4" />
      </Link>

      <div className="flex min-w-0 items-center gap-1 text-sm">
        <span className="text-base">{icon}</span>
        <Link
          href={`/roadmap/${slug}`}
          className="font-display truncate font-semibold text-slate-900 transition hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
        >
          {title}
        </Link>
        {breadcrumbs.length > 1 && (
          <span className="mx-0.5 hidden min-w-0 items-center gap-0.5 text-slate-500 dark:text-slate-400 lg:flex">
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
              {breadcrumbs.slice(1).map((b, i) => (
                <span key={b.id}>
                  {i > 0 && <span className="mx-1 text-slate-300">/</span>}
                  <button
                    onClick={() => onBreadcrumbClick(b.id)}
                    className="hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    {b.label}
                  </button>
                </span>
              ))}
            </span>
          </span>
        )}
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-1 sm:gap-1.5">
        {/* progress */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="mr-1 flex items-center gap-2"
              role="img"
              aria-label={`Roadmap ${pct} percent complete`}
            >
              <Progress
                value={pct}
                className="hidden h-1 w-14 md:block lg:w-16"
                indicatorClassName="bg-brand-500"
              />
              <span className="font-mono text-[13px] font-medium text-slate-500 dark:text-slate-400">
                {pct}%
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>{pct}% of this roadmap complete</TooltipContent>
        </Tooltip>

        {/* Streak Display */}
        {streakDays > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex cursor-default items-center gap-1 rounded-md px-2 py-1 text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-500/10"
                role="img"
                aria-label={`${streakDays} day learning streak`}
              >
                <Flame className="h-4 w-4 fill-current" aria-hidden="true" />
                <span className="font-mono text-xs font-bold">{streakDays}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {streakDays}-day learning streak — keep it alive
            </TooltipContent>
          </Tooltip>
        )}

        {/* Generate study plan — the headline action */}
        <Button
          size="sm"
          onClick={onOpenPlanner}
          aria-label="Generate study plan"
          className={cn(
            "relative gap-1.5 font-semibold shadow-sm transition-all",
            planProgress !== null &&
              "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/25"
          )}
        >
          <CalendarDays className="h-4 w-4" />
          <span className="hidden sm:inline">{planProgress !== null ? "Study Plan" : "Generate Study Plan"}</span>
          <span className="sm:hidden">Plan</span>
          {planProgress !== null && (
            <span className="rounded-full bg-white/20 px-1.5 py-0.5 font-mono text-[11px] font-bold">
              {planProgress}%
            </span>
          )}
        </Button>

        {/* roadmap search */}
        {searchOpen ? (
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 dark:border-slate-700 dark:bg-slate-900/60">
            <Search className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSearchNext();
                }
              }}
              placeholder="Find a topic…"
              className="h-9 w-32 bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none sm:w-44 dark:text-slate-200"
              aria-label="Search topics in this roadmap"
            />
            <button onClick={onToggleSearch} className="text-slate-500 dark:text-slate-400 hover:text-slate-600" aria-label="Close search">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={onToggleSearch} aria-label="Search topics">
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Search topics</TooltipContent>
          </Tooltip>
        )}

        {/* theme toggle — duplicated by the site header, so it only earns its
            place from sm up (and in fullscreen, where the header is gone) */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleTheme}
              className="hidden sm:inline-flex"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{theme === "light" ? "Dark mode" : "Light mode"}</TooltipContent>
        </Tooltip>

        {/* expand / collapse + zoom (desktop) */}
        <span className="mx-0.5 hidden h-5 w-px bg-slate-200/80 md:block dark:bg-slate-700" />
        <div className="hidden items-center gap-1 rounded-lg bg-slate-50/80 p-0.5 md:flex dark:bg-slate-800/60">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={onExpandAll} aria-label="Show all topics">
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Show all topics</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={onCollapseAll} aria-label="Hide topics">
                <Minus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Hide topics</TooltipContent>
          </Tooltip>
          {zoomGroup}
        </div>

        <span className="mx-0.5 hidden h-5 w-px bg-slate-200/80 sm:block dark:bg-slate-700" />
        {/* More menu — everything else, one click away */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="More tools">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {onShowTour && (
              <>
                <DropdownMenuLabel>Getting started</DropdownMenuLabel>
                <DropdownMenuItem onSelect={onShowTour}>
                  <HelpCircle className="h-4 w-4" /> How this works
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuItem onSelect={onExpandAll}>
              <Plus className="h-4 w-4" /> Show all topics
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onCollapseAll}>
              <Minus className="h-4 w-4" /> Hide topics
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onToggleFocus} className={cn(focusMode && "text-brand-600 dark:text-brand-400")}>
              <Focus className="h-4 w-4" /> Focus on this topic
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onCenterView}>
              <Crosshair className="h-4 w-4" /> Center the map
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onToggleMinimap} className={cn(!showMinimap && "opacity-50")}>
              <Layers className="h-4 w-4" /> Overview map
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onToggleLegend} className={cn(!showLegend && "opacity-50")}>
              <Columns3 className="h-4 w-4" /> Topic legend
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Share & save</DropdownMenuLabel>
            <DropdownMenuItem onSelect={copyLink}>
              <Copy className="h-4 w-4" /> Copy link
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onToggleBookmark} className={cn(bookmarked && "text-amber-500")}>
              <Bookmark className={cn("h-4 w-4", bookmarked && "fill-amber-400")} />
              {bookmarked ? "Remove bookmark" : "Bookmark roadmap"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Screen</DropdownMenuLabel>
            <DropdownMenuItem onSelect={onToggleFullscreen}>
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onReset}>
              <RefreshCcw className="h-4 w-4" /> Reset view
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
});
