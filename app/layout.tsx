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

// Absolute base for canonical + Open Graph URLs. Without it Next emits
// relative OG URLs, which most social/link-preview crawlers reject.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://career-roadmaps.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
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
        {/* Scroll-reveal sections are framer-motion elements: their "hidden"
            state ships in the server HTML as an inline opacity:0, and only the
            client animation clears it. With scripting off that leaves the whole
            landing page below the hero permanently blank, so reveal everything
            up front instead. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '[style*="opacity:0"],[style*="opacity: 0"],[opacity="0"]{opacity:1!important;transform:none!important}[stroke-dasharray]{stroke-dasharray:none!important;stroke-dashoffset:0!important}',
            }}
          />
        </noscript>
      </head>
      <body className={`${display.variable} ${sans.variable} ${mono.variable} min-h-screen`}>
        {/* Keyboard users land on the nav first; this lets them jump straight
            past six nav links to the page content. Visible only on focus. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <Footer />
          <SearchCommand />
          <Toaster />
          <AchievementNotifier />
        </Providers>
      </body>
    </html>
  );
}
