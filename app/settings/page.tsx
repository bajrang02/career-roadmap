"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Download,
  Upload,
  Trash2,
  Sun,
  Moon,
  Monitor,
  Check,
} from "lucide-react";
import { useThemeStore } from "@/lib/stores/theme-store";
import { useProgressStore } from "@/lib/stores/progress-store";
import { useBookmarksStore } from "@/lib/stores/bookmarks-store";
import { useUiStore } from "@/lib/stores/ui-store";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.set);
  const showMinimap = useUiStore((s) => s.showMinimap);
  const setShowMinimap = useUiStore((s) => s.setShowMinimap);
  const exportData = useProgressStore((s) => s.exportData);
  const importData = useProgressStore((s) => s.importData);
  const clearProgress = useProgressStore((s) => s.clearAll);
  const clearBookmarks = useBookmarksStore((s) => s.clearAll);
  const completed = useProgressStore((s) => s.completed);
  const bookmarks = useBookmarksStore((s) => s.bookmarks);
  const certificates = useProgressStore((s) => s.certificates);

  const fileRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    useProgressStore.persist.rehydrate();
    useBookmarksStore.persist.rehydrate();
  }, []);

  const handleExport = useCallback(() => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `career-roadmaps-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [exportData]);

  const handleImport = useCallback(() => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importData(reader.result as string);
        setImportStatus("success");
        setTimeout(() => setImportStatus("idle"), 3000);
      } catch {
        setImportStatus("error");
        setTimeout(() => setImportStatus("idle"), 3000);
      }
    };
    reader.readAsText(file);
  }, [importData]);

  const handleClearAll = useCallback(() => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 5000);
      return;
    }
    clearProgress();
    clearBookmarks();
    setConfirmClear(false);
  }, [confirmClear, clearProgress, clearBookmarks]);

  const themes = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "system" as const, label: "System", icon: Monitor },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="page-title">Settings</h1>
      <p className="mt-2 body-text">
        Customize your learning experience and manage your data.
      </p>

      <div className="mt-10 space-y-8">
        {/* Appearance */}
        <section>
          <h2 className="section-title mb-3 text-lg">Appearance</h2>
          <div className="card-base p-4">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Theme</p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Choose how the app looks — System follows your device theme.
            </p>
            <div className="mt-3 flex gap-2">
              {themes.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                    theme === value
                      ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-600 dark:bg-brand-950/60 dark:text-brand-300"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {label}
                  {theme === value && <Check className="h-3.5 w-3.5 text-brand-500" />}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Display */}
        <section>
          <h2 className="section-title mb-3 text-lg">Roadmap Display</h2>
          <div className="card-base divide-y divide-slate-100 dark:divide-slate-700/50">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Minimap</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Show the minimap in the roadmap view.
                </p>
              </div>
              <button
                onClick={() => setShowMinimap(!showMinimap)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  showMinimap ? "bg-brand-600" : "bg-slate-300 dark:bg-slate-600"
                }`}
                role="switch"
                aria-checked={showMinimap}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    showMinimap ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

          </div>
        </section>

        {/* Your Data */}
        <section>
          <h2 className="section-title mb-3 text-lg">Your Data</h2>
          <div className="card-base divide-y divide-slate-100 dark:divide-slate-700/50">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 text-center">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{completed.length}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Topics completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{bookmarks.length}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Bookmarks</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{certificates.length}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Certificates</p>
              </div>
            </div>

            {/* Export */}
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Export progress</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Download your progress as a JSON file.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>

            {/* Import */}
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Import progress</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Restore from a previously exported file.
                </p>
                {importStatus === "success" && (
                  <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">Import successful!</p>
                )}
                {importStatus === "error" && (
                  <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">Invalid file format.</p>
                )}
              </div>
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                  aria-label="Import progress file"
                />
                <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                  <Upload className="h-4 w-4" /> Import
                </Button>
              </div>
            </div>

            {/* Clear all */}
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Clear all data</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Remove all progress, bookmarks, and certificates. This cannot be undone.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className={confirmClear ? "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-300" : "text-rose-600 hover:text-rose-700 dark:text-rose-400"}
              >
                <Trash2 className="h-4 w-4" /> {confirmClear ? "Confirm clear" : "Clear all"}
              </Button>
            </div>
          </div>
        </section>

        {/* About */}
        <section>
          <h2 className="section-title mb-3 text-lg">About</h2>
          <div className="card-base p-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Career Roadmaps is a free, open educational platform. All data is stored locally in your browser — nothing is sent to any server.
            </p>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              Version 1.0.0 · Built with Next.js, React, Tailwind CSS
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
