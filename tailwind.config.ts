import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Semantic design tokens ───────────────────────────────────────
        // The platform palette. Each token has an explicit light and dark
        // value so both themes are designed separately (never inverted).
        //   light:  bg #F8FAFC · cards #FFFFFF · primary #2563EB
        //           accent #F59E0B · borders #E2E8F0 · text #0F172A
        //   dark:   bg #0B1220 · cards #1E293B · primary #3B82F6
        //           accent #FBBF24 · borders #334155 · text #F8FAFC
        bg: {
          light: "#f8fafc",
          dark: "#0b1220",
        },
        canvas: {
          light: "#f1f5f9",
          dark: "#111827",
        },
        card: {
          light: "#ffffff",
          dark: "#1e293b",
        },
        primary: {
          light: "#2563eb",
          dark: "#3b82f6",
        },
        accent: {
          light: "#f59e0b",
          dark: "#fbbf24",
        },
        success: {
          light: "#16a34a",
          dark: "#22c55e",
        },
        warning: {
          light: "#d97706",
          dark: "#f59e0b",
        },
        danger: {
          light: "#dc2626",
          dark: "#ef4444",
        },
        border: {
          light: "#e2e8f0",
          dark: "#334155",
        },
        text: {
          light: "#0f172a",
          dark: "#f8fafc",
        },
        muted: {
          light: "#64748b",
          dark: "#cbd5e1",
        },
        ink: {
          DEFAULT: "#0f172a",
          soft: "#475569",
          faint: "#94a3b8",
        },
        // brand blue — the single primary hue used across the app
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        cream: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
        },
        node: {
          career: "#2563eb",
          section: "#38bdf8",
          subsection: "#cbd5e1",
          topic: "#ffffff",
          concept: "#f8fafc",
          project: "#10b981",
          optional: "#8b5cf6",
          advanced: "#f97316",
          interview: "#6366f1",
          achievement: "#059669",
          completed: "#d1fae5",
          locked: "#e2e8f0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        // soft, diffused — cards float without heavy drop shadows
        card: "0 1px 2px rgba(15,23,42,.04), 0 1px 3px rgba(15,23,42,.05)",
        cardhover:
          "0 4px 8px rgba(15,23,42,.05), 0 10px 20px rgba(15,23,42,.09)",
        node: "0 1px 2px rgba(15,23,42,.04), 0 2px 5px rgba(15,23,42,.06)",
        nodehover:
          "0 2px 4px rgba(15,23,42,.05), 0 10px 18px rgba(15,23,42,.12)",
        glow: "0 0 0 4px rgba(37,99,235,.10)",
      },
      keyframes: {
        "draw-in": {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(37,99,235,.35)" },
          "70%": { boxShadow: "0 0 0 8px rgba(37,99,235,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(37,99,235,0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "draw-in": "draw-in 0.9s ease forwards",
        "fade-up": "fade-up 0.5s ease both",
        "pulse-ring": "pulse-ring 1.6s cubic-bezier(0.4,0,0.6,1) infinite",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 1.8s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
