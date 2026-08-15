"use client";

import { Download, Layers, Map, Moon, Palette, Sun, Trash2, Upload, User } from "lucide-react";
import { useThemeStore, applyTheme } from "@/lib/stores/theme-store";
import { useUiStore } from "@/lib/stores/ui-store";
import { useSettingsStore } from "@/lib/stores/settings-store";
import { useStudyPlanStore, type SavedPlan } from "@/lib/stores/study-plan-store";
import { useProgressStore } from "@/lib/stores/progress-store";
import { useBookmarksStore } from "@/lib/stores/bookmarks-store";
import { useAchievementsStore } from "@/lib/stores/achievements-store";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.set);
  const showMinimap = useUiStore((s) => s.showMinimap);
  const setShowMinimap = useUiStore((s) => s.setShowMinimap);
  const showLegend = useUiStore((s) => s.showLegend);
  const setShowLegend = useUiStore((s) => s.setShowLegend);
  const learnerName = useSettingsStore((s) => s.learnerName);
  const setLearnerName = useSettingsStore((s) => s.setLearnerName);
  const toast = useUiStore((s) => s.toast);
  const plans = useStudyPlanStore((s) => s.plans);
  const clearPlan = useStudyPlanStore((s) => s.clearPlan);
  const fileRef = useRef<HTMLInputElement>(null);

  const pickTheme = (t: "light" | "dark") => {
    setTheme(t);
    applyTheme(t);
  };

  const clearAllData = () => {
    useProgressStore.setState({ completed: [], certificates: [] });
    useBookmarksStore.setState({ bookmarks: [] });
    useAchievementsStore.getState().clearAll();
    const keys = Object.keys(plans);
    for (const k of keys) clearPlan(k);
    useSettingsStore.setState({ learnerName: "" });
    // purge persisted view state + the stores that aren't zustand-reachable here
    const prefixes = ["cr-viewport:", "cr-collapsed:", "cr-recent:"];
    const doomed = ["cr-achievements-storage", "roadmap-choices"];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && prefixes.some((p) => k.startsWith(p))) doomed.push(k);
    }
    for (const k of doomed) localStorage.removeItem(k);
    toast("All data cleared", { description: "Your progress, bookmarks, plans and view state were reset.", kind: "info" });
  };

  // Export every piece of local data as a portable JSON backup — the
  // guest-only replacement for cloud sync. Download, move to another device,
  // then import there.
  const exportData = () => {
    const data = {
      app: "career-roadmaps",
      version: 1,
      exportedAt: new Date().toISOString(),
      progress: useProgressStore.getState().completed,
      certificates: useProgressStore.getState().certificates,
      bookmarks: useBookmarksStore.getState().bookmarks,
      plans: useStudyPlanStore.getState().plans,
      achievements: {
        achievements: useAchievementsStore.getState().achievements,
        streakDays: useAchievementsStore.getState().streakDays,
        lastActiveDate: useAchievementsStore.getState().lastActiveDate,
        dailyGoalHours: useAchievementsStore.getState().dailyGoalHours,
        todayStudiedHours: useAchievementsStore.getState().todayStudiedHours,
      },
      preferences: {
        learnerName: useSettingsStore.getState().learnerName,
        theme: useThemeStore.getState().theme,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "career-roadmaps-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    toast("Backup exported", { description: "Your data was downloaded as a JSON file.", kind: "info" });
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as {
          app?: string;
          progress?: unknown;
          certificates?: unknown;
          bookmarks?: unknown;
          plans?: unknown;
          achievements?: unknown;
          preferences?: { learnerName?: string; theme?: "light" | "dark" };
        };
        if (!data || data.app !== "career-roadmaps") throw new Error("not a backup");
        useProgressStore.setState({
          completed: Array.isArray(data.progress) ? data.progress : [],
          certificates: Array.isArray(data.certificates) ? data.certificates : [],
        });
        useBookmarksStore.setState({
          bookmarks: Array.isArray(data.bookmarks) ? data.bookmarks : [],
        });
        if (data.plans && typeof data.plans === "object") {
          useStudyPlanStore.setState({ plans: data.plans as Record<string, SavedPlan> });
        }
        if (data.achievements && typeof data.achievements === "object") {
          const a = data.achievements as Record<string, unknown>;
          useAchievementsStore.setState({
            achievements: Array.isArray(a.achievements) ? a.achievements : [],
            streakDays: typeof a.streakDays === "number" ? a.streakDays : 0,
            lastActiveDate: typeof a.lastActiveDate === "string" ? a.lastActiveDate : null,
            dailyGoalHours: typeof a.dailyGoalHours === "number" ? a.dailyGoalHours : 1,
            todayStudiedHours: typeof a.todayStudiedHours === "number" ? a.todayStudiedHours : 0,
          });
        }
        if (data.preferences) {
          if (typeof data.preferences.learnerName === "string") {
            useSettingsStore.setState({ learnerName: data.preferences.learnerName });
          }
          if (data.preferences.theme === "light" || data.preferences.theme === "dark") {
            useThemeStore.setState({ theme: data.preferences.theme });
            applyTheme(data.preferences.theme);
          }
        }
        toast("Backup restored", { description: "Progress, bookmarks and plans were restored.", kind: "success" });
      } catch {
        toast("Couldn't import", { description: "That file doesn't look like a valid backup.", kind: "error" });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="eyebrow">Preferences</p>
      <h1 className="page-title mt-1">Settings</h1>
      <p className="mt-2 body-text">Make the platform comfortable for the way you learn.</p>

      <div className="mt-8 space-y-6">
        {/* appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="h-4 w-4 text-brand-500" /> Appearance
            </CardTitle>
            <CardDescription>Choose a theme that&apos;s easy on your eyes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  { key: "light", label: "Light", icon: Sun, active: "border-brand-400 bg-brand-50 dark:bg-brand-950/40" },
                  { key: "dark", label: "Dark", icon: Moon, active: "border-brand-400 bg-brand-50 dark:bg-brand-950/40" },
                ] as const
              ).map((t) => (
                <button
                  key={t.key}
                  onClick={() => pickTheme(t.key)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all",
                    theme === t.key
                      ? t.active
                      : "border-slate-200 hover:border-brand-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/60"
                  )}
                  aria-pressed={theme === t.key}
                >
                  <t.icon className={cn("h-5 w-5", theme === t.key ? "text-brand-600 dark:text-brand-400" : "text-slate-400")} />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t.label} mode</span>
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <label className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <Layers className="h-4 w-4 text-slate-400" /> Show the overview map
                  <span className="hidden text-xs text-slate-400 sm:inline">(miniature roadmap in the corner)</span>
                </span>
                <Switch checked={showMinimap} onCheckedChange={setShowMinimap} aria-label="Show overview map" />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <Map className="h-4 w-4 text-slate-400" /> Show the topic legend
                </span>
                <Switch checked={showLegend} onCheckedChange={setShowLegend} aria-label="Show topic legend" />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* profile (local only — no account) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-brand-500" /> Your name
            </CardTitle>
            <CardDescription>
              Optional — printed on certificates you earn. Stored only on this device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              aria-label="Your name on certificates"
              className="max-w-xs text-sm"
            />
            {learnerName ? (
              <p className="mt-2 text-xs text-slate-400">
                Certificates will read “Awarded to {learnerName}” — saved automatically on this device.
              </p>
            ) : (
              <p className="mt-2 text-xs text-slate-400">Saved automatically on this device.</p>
            )}
          </CardContent>
        </Card>

        {/* data: backup + reset */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Trash2 className="h-4 w-4 text-rose-500" /> Your data
            </CardTitle>
            <CardDescription>
              Everything is stored privately in this browser. Export a backup to move it to
              another device, or reset it entirely. This can&apos;t be undone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={exportData}>
                <Download className="h-4 w-4" /> Export backup
              </Button>
              <Button variant="outline" onClick={() => fileRef.current?.click()}>
                <Upload className="h-4 w-4" /> Import backup
              </Button>
              <Button variant="danger" onClick={clearAllData}>
                <Trash2 className="h-4 w-4" /> Clear all my data
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                aria-label="Import backup file"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) importData(f);
                  e.target.value = "";
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
