import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { IT_COUNT, NON_IT_COUNT, SKILL_COUNT } from "@/lib/data-catalog";

const TOTAL_CAREERS = IT_COUNT + NON_IT_COUNT;
const TOTAL_ROADMAPS = TOTAL_CAREERS + SKILL_COUNT;
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toast";
import { SearchCommand } from "@/components/layout/search-command";
import { AchievementNotifier } from "@/components/achievements/achievement-notifier";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Mobile-safe viewport: fit-cover lets the roadmap + bottom sheets extend
// under notched/rounded displays; user-scalable stays enabled for a11y.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Career Roadmaps — Learn any career, step by step",
    template: "%s · Career Roadmaps",
  },
  description:
    `Step-by-step learning roadmaps for ${TOTAL_ROADMAPS} technical careers & skills. Learn every topic in the right order — with resources, projects, interview prep and progress tracking. Free forever.`,
  keywords: [
    "career roadmap",
    "skill roadmap",
    "learning path",
    "python roadmap",
    "react roadmap",
    "frontend developer roadmap",
    "full stack roadmap",
    "data science roadmap",
  ],
  openGraph: {
    title: "Career Roadmaps — Learn any career or skill, step by step",
    description:
      `${TOTAL_ROADMAPS} interactive career & skill roadmaps as clear, step-by-step maps. Learn every topic in the right order, track progress, earn certificates.`,
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

const themeInit = `
try{var t=localStorage.getItem('cr-theme');var theme=t?JSON.parse(t).state.theme:'light';var d=document.documentElement;d.classList.toggle('dark',theme==='dark');d.style.colorScheme=theme;}catch(e){}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${display.variable} ${sans.variable} ${mono.variable} min-h-screen`}>
        <Providers>
          <Navbar />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <SearchCommand />
          <Toaster />
          <AchievementNotifier />
        </Providers>
      </body>
    </html>
  );
}
