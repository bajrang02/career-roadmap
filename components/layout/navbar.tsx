"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  BookOpen,
  Command,
  Home,
  LayoutDashboard,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/lib/stores/theme-store";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/careers", label: "Careers", icon: BookOpen },
  { href: "/skills", label: "Skills", icon: Zap },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/settings", label: "Settings", icon: Settings },
];

/** One rule for the desktop bar and the mobile sheet. They used to disagree:
 *  a nested route highlighted on desktop and nothing at all on mobile. */
function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const pathname = usePathname();
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const [mobileOpen, setMobileOpen] = useState(false);

  const openSearch = useCallback(() => window.dispatchEvent(new CustomEvent("open-search")), []);

  // Close the sheet once navigation happens. Tapping the entry for the page you
  // are already on used to leave the menu hanging open over the content.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Escape closes the sheet, and the page behind it cannot scroll while it is up.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  return (
    <header className="glass sticky top-0 z-40">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6" aria-label="Main">
        <div className="flex min-w-0 items-center gap-8">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Career Roadmaps home">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="5" cy="6" r="2.4" />
                <circle cx="19" cy="6" r="2.4" />
                <circle cx="12" cy="18" r="2.4" />
                <path d="M7.2 7.2 10.2 16M16.8 7.2 13.8 16M7.4 6h9.2" />
              </svg>
            </span>
            <span className="font-display hidden text-lg font-bold tracking-tight text-slate-900 sm:block dark:text-white">
              Career<span className="text-brand-600 dark:text-brand-400">Roadmaps</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href);
              return (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors lg:px-3",
                        active
                          ? "bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden lg:inline">{label}</span>
                      <span className="sr-only lg:hidden">{label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="lg:hidden">{label}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openSearch}
            className="hidden h-9 w-64 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 transition-colors hover:border-slate-300 hover:bg-white sm:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Search careers and topics"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1 text-left">Search careers, topics…</span>
            <kbd className="flex items-center gap-0.5 rounded-md border border-border-light bg-white px-1.5 py-0.5 font-mono text-[11px] font-medium text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
              <Command className="h-3 w-3" />K
            </kbd>
          </button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -60, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 60, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {theme === "light" ? (
                  <Moon className="h-[18px] w-[18px]" />
                ) : (
                  <Sun className="h-[18px] w-[18px]" />
                )}
              </motion.span>
            </AnimatePresence>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl md:hidden dark:border-slate-800 dark:bg-bg-dark/95"
          >
            <div className="space-y-1 p-4">
              {NAV.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-[44px] items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium",
                      active
                        ? "bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openSearch();
                }}
                className="flex min-h-[44px] w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Search className="h-4 w-4" aria-hidden="true" /> Search
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
