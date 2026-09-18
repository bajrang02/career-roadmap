"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Command,
  Compass,
  Home,
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


const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/careers", label: "Careers", icon: Compass },
  { href: "/skills", label: "Skills", icon: Zap },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const pathname = usePathname();
  const resolvedTheme = useThemeStore((s) => s.resolved);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const [mobileOpen, setMobileOpen] = useState(false);

  const openSearch = useCallback(() => window.dispatchEvent(new CustomEvent("open-search")), []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#0b1220]/90">
      <nav className="mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6" aria-label="Main">
        {/* Logo */}
        <div className="flex min-w-0 items-center gap-7">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Career Roadmaps home">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:shadow-md">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="5" cy="6" r="2.4" />
                <circle cx="19" cy="6" r="2.4" />
                <circle cx="12" cy="18" r="2.4" />
                <path d="M7.2 7.2 10.2 16M16.8 7.2 13.8 16M7.4 6h9.2" />
              </svg>
            </span>
            <span className="font-display text-[17px] font-bold tracking-tight text-slate-900 dark:text-white">
              Career<span className="text-brand-600 dark:text-brand-400">Roadmaps</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all duration-150",
                    active
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          {/* Search trigger */}
          <button
            onClick={openSearch}
            className="hidden h-8 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-3 text-[13px] text-slate-500 transition-all hover:border-slate-300 hover:bg-white sm:flex dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Search careers and topics"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1 text-left">Search…</span>
            <kbd className="hidden items-center gap-0.5 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-500 lg:flex">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>

          {/* Mobile search */}
          <button
            onClick={openSearch}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 sm:hidden dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label={resolvedTheme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={resolvedTheme}
                initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                {resolvedTheme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 md:hidden dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-200/80 bg-white md:hidden dark:border-slate-800/80 dark:bg-[#0b1220]"
          >
            <div className="space-y-0.5 p-3">
              {NAV.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-[44px] items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
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
                className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
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
