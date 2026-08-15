// Light-mode palette verification pass.
// Drives an installed Chrome via puppeteer-core against the running app,
// forces light mode, screenshots each surface, and flags off-brand node/card
// colors (muddy amber/brown, fuchsia, neon).
// Coverage: home, careers, skills pages (card surfaces + accent bars), the
// roadmap canvas (root + expanded branch), the details panel, and the
// Certifications-tab cards. Plus a responsive details-panel check at 390px
// (mobile) and 768px (tablet) in BOTH light and dark themes: asserts the
// overview stacks into one column on phones, the Quick Info tiles never
// overflow the panel, and the forced theme is actually active.
// Small semantic chips (difficulty badges, bookmark stars, provider dots) are
// deliberately skipped via a size heuristic; "Advanced" nodes keep their
// deliberate orange and are excluded by type.
//
// Usage: node .freebuff/verify-palette.mjs [baseUrl]
//   CHROME_PATH env overrides the discovered Chrome executable.
import puppeteer from "puppeteer-core";
import { mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const BASE = process.argv[2] || "http://localhost:3002";
// Chrome discovery: CHROME_PATH env override, then common platform locations.
const CANDIDATES = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);
const CHROME = CANDIDATES.find((p) => existsSync(p));
if (!CHROME) {
  console.error("No Chrome/Chromium found — set CHROME_PATH to run the palette pass.");
  process.exit(2);
}
const OUT = join(dirname(fileURLToPath(import.meta.url)), "screens");
mkdirSync(OUT, { recursive: true });

// ── HSL helpers ────────────────────────────────────────────────────────────
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function parseCssColor(str) {
  if (!str) return null;
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((x) => parseFloat(x.trim()));
  if (parts.length < 3 || parts.some((x) => Number.isNaN(x))) return null;
  const a = parts.length > 3 ? parts[3] : 1;
  if (a < 0.9) return null; // skip transparent/semi-transparent layers
  return rgbToHsl(parts[0], parts[1], parts[2]);
}

// Off-brand hue bands (deliberate accents are sky/blue/violet/emerald/rose;
// "Advanced" nodes keep deliberate orange and are excluded by type).
const OFF_BRAND = [
  { name: "amber/brown (muddy)", hMin: 28, hMax: 52, sMin: 35, lMin: 12 },
  { name: "fuchsia/magenta", hMin: 283, hMax: 322, sMin: 45, lMin: 20 },
  { name: "neon yellow-green", hMin: 60, hMax: 90, sMin: 70, lMin: 25 },
];

function classify(hsl) {
  for (const band of OFF_BRAND) {
    if (
      hsl.h >= band.hMin && hsl.h <= band.hMax &&
      hsl.s >= band.sMin && hsl.l >= band.lMin
    ) {
      return band.name;
    }
  }
  return null;
}

// ── helpers ────────────────────────────────────────────────────────────────
async function forceTheme(page, theme) {
  await page.evaluateOnNewDocument((t) => {
    try {
      localStorage.setItem("cr-theme", JSON.stringify({ state: { theme: t } }));
    } catch {}
  }, theme);
}

const NODE_SEL = 'div[role="button"][class*="rounded-[14px]"]';

async function collectSurfaceColors(page, selector, { skipChips = false, skipNodeTypes = [] } = {}) {
  return page.evaluate((sel, skipChips, skipNodeTypes) => {
    const els = [...document.querySelectorAll(sel)];
    const colors = new Map(); // cssColor -> count
    const push = (c) => colors.set(c, (colors.get(c) || 0) + 1);
    for (const el of els) {
      if (skipChips) {
        const r = el.getBoundingClientRect();
        if (r.width < 160 || r.height < 44) continue; // skip small status chips/badges
      }
      if (skipNodeTypes.length) {
        const label = el.getAttribute("aria-label") || "";
        const m = label.match(/\(([^)]+)\)\s*$/);
        if (m && skipNodeTypes.includes(m[1])) continue;
      }
      const s = getComputedStyle(el);
      const bg = s.backgroundColor;
      if (bg && bg !== "transparent" && !bg.startsWith("rgba(0, 0, 0, 0)")) push(bg);
      const gi = s.backgroundImage;
      if (gi && gi.includes("gradient")) {
        for (const stop of gi.match(/rgba?\([^)]+\)/g) || []) push(stop);
      }
    }
    return [...colors.entries()].map(([c, n]) => ({ color: c, count: n }));
  }, selector, skipChips, skipNodeTypes);
}

/** Whole-page surface sampler: solid card surfaces (>=160x44) plus gradient
 *  stops from any element (catches thin accent bars). Skips small chips. */
async function collectPageSurfaces(page) {
  return page.evaluate(() => {
    const colors = new Map();
    const push = (c) => colors.set(c, (colors.get(c) || 0) + 1);
    const els = document.querySelectorAll("div, a, span, section, li");
    for (const el of els) {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (r.width >= 160 && r.height >= 44) {
        const bg = s.backgroundColor;
        if (bg && bg !== "transparent" && !bg.startsWith("rgba(0, 0, 0, 0)")) push(bg);
      }
      if (s.backgroundImage && s.backgroundImage.includes("gradient")) {
        for (const stop of s.backgroundImage.match(/rgba?\([^)]+\)/g) || []) push(stop);
      }
    }
    return [...colors.entries()].map(([c, n]) => ({ color: c, count: n }));
  });
}

let failures = [];
let infos = [];

function report(name, ok, detail) {
  console.log(`${ok ? "  ✓" : "  ✗ FAIL"} ${name}${detail ? " — " + detail : ""}`);
  if (!ok) failures.push(name);
}

function flagSurfaces(name, surfaces) {
  const flagged = [];
  for (const { color, count } of surfaces) {
    const hsl = parseCssColor(color);
    if (!hsl) continue;
    const band = classify(hsl);
    if (band) flagged.push({ color, count, hsl, band });
  }
  if (flagged.length) {
    report(name, false, flagged
      .map((f) => `${f.band} hsl(${f.hsl.h},${f.hsl.s}%,${f.hsl.l}%) x${f.count}`).join("; "));
    for (const f of flagged) {
      console.log(`      off-brand surface: ${f.color} (${f.band}, hsl ${f.hsl.h}/${f.hsl.s}/${f.hsl.l}) on ${f.count} element(s)`);
    }
  } else {
    report(name, true, `${surfaces.length} distinct surfaces, none off-brand`);
  }
  return flagged.length === 0;
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,900"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await forceTheme(page, "light");

  // ── 1. Home / careers / skills pages ─────────────────────────────────
  for (const [path, label] of [["/", "home"], ["/careers", "careers"], ["/skills", "skills"]]) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1800));
    const lightMode = await page.evaluate(() => !document.documentElement.classList.contains("dark"));
    if (path === "/") {
      report("Light mode active on home", lightMode, lightMode ? "html has no .dark class" : "dark class present!");
    }
    await page.screenshot({ path: join(OUT, `light-${label}.png`) });
    console.log(`  saved: .freebuff/screens/light-${label}.png`);
    flagSurfaces(`${label} page card surfaces on-brand (light)`, await collectPageSurfaces(page));
  }

  // ── 2. Roadmap root nodes ────────────────────────────────────────────
  await page.goto(`${BASE}/roadmap/full-stack-developer`, { waitUntil: "networkidle0", timeout: 60000 });
  try {
    await page.waitForSelector(NODE_SEL, { timeout: 20000 });
  } catch {
    report("Roadmap nodes rendered", false, "no node cards found in 20s");
  }
  await new Promise((r) => setTimeout(r, 3500));
  await page.screenshot({ path: join(OUT, "light-roadmap-fullstack.png"), fullPage: false });
  console.log("  saved: .freebuff/screens/light-roadmap-fullstack.png");

  const rootCount = await page.evaluate((s) => document.querySelectorAll(s).length, NODE_SEL);
  report("Roadmap root nodes rendered", rootCount > 5, `${rootCount} node cards`);
  flagSurfaces(
    "Root node surfaces on-brand (light)",
    await collectSurfaceColors(page, NODE_SEL, { skipNodeTypes: ["Advanced"] })
  );
  infos.push(`root view: ${rootCount} nodes`);

  // ── 3. Expand a section → module/topic/concept nodes ─────────────────
  const expanded = await page.evaluate((sel) => {
    const cards = [...document.querySelectorAll(sel)];
    for (const c of cards) {
      if (c.hasAttribute("aria-expanded") && c.getAttribute("aria-expanded") === "false") {
        c.click();
        return c.getAttribute("aria-label") || "";
      }
    }
    return null;
  }, NODE_SEL);
  if (expanded) {
    await new Promise((r) => setTimeout(r, 2500));
    const deepCount = await page.evaluate((s) => document.querySelectorAll(s).length, NODE_SEL);
    report("Expanded branch renders deeper nodes", deepCount > rootCount, `${deepCount} nodes now (was ${rootCount})`);
    flagSurfaces(
      "Expanded-branch surfaces on-brand (light)",
      await collectSurfaceColors(page, NODE_SEL, { skipNodeTypes: ["Advanced"] })
    );
    await page.screenshot({ path: join(OUT, "light-roadmap-expanded.png"), fullPage: false });
    console.log("  saved: .freebuff/screens/light-roadmap-expanded.png");
  } else {
    report("Expanded branch renders deeper nodes", false, "no collapsible section found");
  }

  // ── 4. Details panel + Certifications tab cards ──────────────────────
  const opened = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label^="View Overview for"]');
    if (!btn) return null;
    btn.click();
    return btn.getAttribute("aria-label");
  });
  if (opened) {
    await new Promise((r) => setTimeout(r, 2200));
    const panelVisible = await page.evaluate(
      () => !!document.querySelector('[role="dialog"]') || document.body.innerText.includes("WHAT IS IT")
    );
    report("Details panel opened", panelVisible, `via ${(opened || "").slice(0, 60)}`);
    await page.screenshot({ path: join(OUT, "light-details-panel.png") });
    console.log("  saved: .freebuff/screens/light-details-panel.png");

    flagSurfaces(
      "Details-panel card surfaces on-brand (light)",
      await collectSurfaceColors(page, '[role="dialog"] [class*="border"], [role="dialog"] [class*="rounded"]', { skipChips: true })
    );

    // switch to the Certifications tab with a real mouse-event sequence
    const certClicked = await page.evaluate(() => {
      const btns = [...document.querySelectorAll('[role="dialog"] button')];
      const b = btns.find((x) => (x.textContent || "").trim().startsWith("Certifications"));
      if (!b) return false;
      const r = b.getBoundingClientRect();
      const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
      for (const type of ["pointerdown", "mousedown", "pointerup", "mouseup", "click"]) {
        b.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, clientX: cx, clientY: cy }));
      }
      return true;
    });
    if (certClicked) {
      await new Promise((r) => setTimeout(r, 2500));
      const certState = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]');
        const t = dlg ? dlg.innerText : "";
        return {
          switched: t.includes("Choose a Certification") || t.includes("CHOOSE A") || t.includes("All providers"),
          preview: t.slice(0, 120).replace(/\s+/g, " "),
        };
      });
      report("Certifications tab renders cards", certState.switched, certState.preview);
      flagSurfaces(
        "Certification card surfaces on-brand (light)",
        await collectSurfaceColors(page, '[role="dialog"] [class*="border"], [role="dialog"] [class*="rounded"]', { skipChips: true })
      );
      await page.screenshot({ path: join(OUT, "light-certifications-tab.png") });
      console.log("  saved: .freebuff/screens/light-certifications-tab.png");
    } else {
      report("Certifications tab renders cards", false, "no Certifications tab button found");
    }
  } else {
    report("Details panel opened", false, "no Overview button found");
  }

  // ── 5. Responsive details panel — mobile + tablet ─────────────────────
  // Opens a section's structured overview at 390px and 768px, asserting the
  // overview stacks into one column on phones and the Quick Info tiles never
  // overflow the panel (no horizontal scroll, tiles inside the dialog).
  async function dismissTour(page) {
    // mobile shows a "YOUR ROADMAP" tour overlay that blocks node clicks
    await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      if (!dlg) return false;
      const b = [...dlg.querySelectorAll("button")].find((x) => {
        const a = (x.getAttribute("aria-label") || "").toLowerCase();
        const t = (x.innerText || "").trim().toLowerCase();
        return a.includes("close tour") || t === "skip";
      });
      if (b) {
        b.click();
        return true;
      }
      return false;
    });
  }

  async function openStructuredOverview(page) {
    // try the first few section nodes until one renders a structured overview
    for (let i = 1; i <= 5; i++) {
      const opened = await page.evaluate((idx) => {
        const btns = [...document.querySelectorAll('button[aria-label^="View Overview for"]')];
        const b = btns[idx];
        if (!b) return null;
        b.click();
        return b.getAttribute("aria-label");
      }, i);
      await new Promise((r) => setTimeout(r, 1800));
      const hasStructured = await page.evaluate(
        () => !!document.querySelector('[role="dialog"]') && document.querySelector('[role="dialog"]').innerText.includes("WHAT IS IT")
      );
      if (hasStructured) return opened;
    }
    return null;
  }

  async function measureOverviewLayout(page) {
    return page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      if (!dlg) return { open: false };
      const h3 = [...dlg.querySelectorAll("h3")].map((el) => ({
        t: el.innerText,
        x: Math.round(el.getBoundingClientRect().x),
      }));
      const whatIs = h3.find((h) => h.t.includes("WHAT IS IT"));
      const learn = h3.find((h) => h.t.includes("WHAT YOU"));
      const tiles = [...dlg.querySelectorAll("p")].filter((p) =>
        ["DIFFICULTY", "TIME", "LEVEL"].includes(p.innerText.trim())
      );
      const rects = tiles.map((t) => {
        const r = t.getBoundingClientRect();
        return { x: Math.round(r.x), right: Math.round(r.right) };
      });
      const dlgRect = dlg.getBoundingClientRect();
      return {
        open: true,
        whatIsX: whatIs ? whatIs.x : null,
        learnX: learn ? learn.x : null,
        stacked: !!(whatIs && learn && Math.abs(whatIs.x - learn.x) < 8),
        hasTiles: rects.length >= 3,
        tileRight: rects.length ? Math.max(...rects.map((t) => t.right)) : null,
        dlgRight: Math.round(dlgRect.right),
        dlgScrollOverflow: dlg.scrollWidth - dlg.clientWidth,
        bodyScrollOverflow: document.documentElement.scrollWidth - window.innerWidth,
      };
    });
  }

  async function checkResponsivePanel(page, theme, width, height, dsf, tag) {
    const scope = `${tag} (${theme})`;
    const slug = tag.toLowerCase().replace(/\s+/g, "-");
    await page.setViewport({ width, height, deviceScaleFactor: dsf });
    await page.goto(`${BASE}/roadmap/full-stack-developer`, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));
    const themeActive = await page.evaluate(
      (wantDark) => document.documentElement.classList.contains("dark") === wantDark,
      theme === "dark"
    );
    report(`${scope} theme active`, themeActive, themeActive ? `${theme} mode confirmed` : `${theme} mode NOT active`);
    await dismissTour(page);
    await new Promise((r) => setTimeout(r, 500));
    const opened = await openStructuredOverview(page);
    report(`${scope} details panel opened`, !!opened, opened ? opened.slice(0, 60) : "no section overview button");
    if (!opened) return;
    const m = await measureOverviewLayout(page);
    const fits = m.open && m.hasTiles && m.tileRight !== null && m.tileRight <= m.dlgRight + 1 && m.dlgScrollOverflow <= 1 && m.bodyScrollOverflow <= 1;
    if (width <= 400) {
      report(
        `${scope} overview stacks into one column`,
        !!m.stacked && m.open,
        m.open ? `What is it? x=${m.whatIsX} · What you'll learn x=${m.learnX}` : "dialog closed"
      );
    }
    report(
      `${scope} Quick Info tiles fit the panel`,
      fits,
      m.open
        ? `tiles right=${m.tileRight} ≤ panel right=${m.dlgRight}; dialog overflow=${m.dlgScrollOverflow}px, page overflow=${m.bodyScrollOverflow}px`
        : "dialog closed"
    );
    await page.screenshot({ path: join(OUT, `${theme}-details-${slug}.png`) });
    console.log(`  saved: .freebuff/screens/${theme}-details-${slug}.png`);
    flagSurfaces(
      `${scope} details-panel surfaces on-brand`,
      await collectSurfaceColors(page, '[role="dialog"] [class*="border"], [role="dialog"] [class*="rounded"]', { skipChips: true })
    );
  }

  // ── 5a. responsive details panel — light mode ─────────────────────────
  await checkResponsivePanel(page, "light", 390, 844, 2, "Mobile 390px");
  await checkResponsivePanel(page, "light", 768, 1024, 1, "Tablet 768px");
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // ── 5b. responsive details panel — dark mode ──────────────────────────
  // Same stacking / tile-fit assertions with the dark theme forced, so the
  // compact overview is verified in both themes at both widths.
  const darkPage = await browser.newPage();
  try {
    await forceTheme(darkPage, "dark");
    await checkResponsivePanel(darkPage, "dark", 390, 844, 2, "Mobile 390px");
    await checkResponsivePanel(darkPage, "dark", 768, 1024, 1, "Tablet 768px");
  } finally {
    await darkPage.close();
  }

  // ── summary ──────────────────────────────────────────────────────────
  console.log("");
  console.log("── Light-mode palette verification ──");
  for (const i of infos) console.log("  • " + i);
  console.log(failures.length ? `\nRESULT: ${failures.length} FAILURE(S)` : "\nRESULT: PASS — all surfaces on-brand in light mode");
  process.exit(failures.length ? 1 : 0);
} finally {
  await browser.close();
}
