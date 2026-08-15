// ─────────────────────────────────────────────────────────────────────────────
// Curated knowledge for recurring frontend performance / software testing /
// database multi-tenancy concept labels. One entry per label applies in every
// roadmap where that label appears. Merged into ALL_KNOWLEDGE in generate.mjs
// (KNOWLEDGE wins). Entries stay atomic: META_SLUGS keeps their objectives
// from spawning thin concept children.
// ─────────────────────────────────────────────────────────────────────────────

const res = (t, u, k) => ({ t, u, k });

export const META_RECURRING_D = {
  // ── Frontend performance ───────────────────────────────────────────────────
  "image-optimization": {
    d: "Image optimization is shrinking image file size without visible quality loss — choosing the right format (WebP, AVIF), compressing, resizing to need and serving responsive variants — because images are usually the largest part of a page.",
    why: "Images are typically 40–60% of a page's weight; optimizing them is the highest-leverage performance win available to most sites.",
    obj: ["Choose the right format (WebP/AVIF/PNG/JPEG)", "Compress and resize to actual display size", "Serve responsive variants with srcset", "Measure the weight saved"],
    prereq: ["HTML/CSS basics", "Core Web Vitals awareness"],
    res: [
      res("Image optimization — web.dev", "https://web.dev/learn/performance/image-optimization", "tutorial"),
      res("WebP — MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types", "docs"),
      res("Responsive images — MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images", "tutorial"),
    ],
    int: ["Why are images the biggest performance lever?", "When should you use WebP instead of PNG?", "What does srcset do?"],
    tips: ["Compress to the largest size the layout will actually display"],
    diff: "Intermediate", time: "3–4 hours",
  },
  "responsive-images": {
    d: "Responsive images serve different image files based on viewport and device — srcset and sizes attributes, plus art direction with the picture element — so phones don't download desktop-sized files.",
    why: "One image can't serve every screen efficiently; responsive images cut mobile bandwidth dramatically without losing quality on large screens.",
    obj: ["Use srcset with width descriptors", "Use sizes to match layout width", "Art-direct with the picture element", "Verify the right file loads per viewport"],
    prereq: ["HTML basics", "Image optimization"],
    res: [
      res("Responsive images — web.dev", "https://web.dev/learn/design/responsive-images", "tutorial"),
      res("Responsive images — MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images", "tutorial"),
      res("srcset and sizes — CSS-Tricks", "https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/", "article"),
    ],
    int: ["How does srcset decide which image to load?", "What is the difference between srcset and picture?", "Why do mobile users need smaller images?"],
    tips: ["Test with a throttled connection — DevTools shows exactly what downloads"],
    diff: "Intermediate", time: "2–3 hours",
  },
  "lazy-loading": {
    d: "Lazy loading defers off-screen content — images, iframes, video — until the user scrolls near it, using the loading attribute, IntersectionObserver or libraries, so initial page load only fetches what's visible.",
    why: "Lazy loading cuts initial page weight and improves Core Web Vitals, especially on image-heavy and long pages.",
    obj: ["Use loading=lazy for images and iframes", "Implement IntersectionObserver-based lazy loading", "Avoid lazy-loading above-the-fold content", "Measure LCP impact"],
    prereq: ["HTML/JS basics"],
    res: [
      res("Lazy loading — web.dev", "https://web.dev/articles/browser-level-image-lazy-loading", "tutorial"),
      res("IntersectionObserver — MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API", "docs"),
      res("Lazy loading best practices — web.dev", "https://web.dev/learn/performance/lazy-loading", "article"),
    ],
    int: ["When should you NOT lazy load?", "What is the difference between loading=lazy and IntersectionObserver?", "How does lazy loading affect LCP?"],
    tips: ["Never lazy-load the hero image — it hurts LCP"],
    diff: "Intermediate", time: "2–3 hours",
  },
  "cdn-and-caching": {
    d: "CDNs and caching are the two ways to stop repeat downloads: a CDN (Content Delivery Network) serves static assets from servers near the user, and HTTP caching (Cache-Control, ETag) lets browsers reuse responses without re-fetching.",
    why: "CDNs and caching are the biggest infrastructure-level performance wins — they reduce latency and bandwidth for every user on every visit.",
    obj: ["Explain how CDNs reduce latency", "Set Cache-Control headers correctly", "Use ETags and conditional requests", "Version assets for cache busting"],
    prereq: ["HTTP basics", "Web performance awareness"],
    res: [
      res("HTTP caching — web.dev", "https://web.dev/articles/http-caching", "tutorial"),
      res("What is a CDN? — Cloudflare", "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/", "article"),
      res("Cache-Control — MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control", "docs"),
    ],
    int: ["How does a CDN speed up a site?", "What is the difference between public and private cache?", "Why append a hash to asset filenames?"],
    tips: ["Cache immutable assets forever and use content hashes to bust the cache"],
    diff: "Intermediate", time: "3–4 hours",
  },

  // ── Software testing ───────────────────────────────────────────────────────
  "testing-fundamentals": {
    d: "Testing fundamentals are the core ideas of verifying software: test cases, assertions, test isolation, and the testing pyramid — many fast unit tests, fewer integration tests, fewest end-to-end tests.",
    why: "A test suite is the safety net that makes refactoring and shipping fast; understanding what to test and how is a baseline professional skill.",
    obj: ["Write test cases with assertions", "Understand unit, integration and e2e tests", "Keep tests isolated and deterministic", "Run tests automatically in CI"],
    prereq: ["One programming language"],
    res: [
      res("Testing your code — The Odin Project", "https://www.theodinproject.com/lessons/node-path-javascript-testing-basics", "tutorial"),
      res("Testing pyramid — Martin Fowler", "https://martinfowler.com/articles/practical-test-pyramid.html", "article"),
      res("Test driven development — freeCodeCamp", "https://www.freecodecamp.org/news/test-driven-development-what-it-is-and-what-it-is-not/", "article"),
    ],
    int: ["What is the testing pyramid?", "What makes a good unit test?", "Why should tests run in CI?"],
    tips: ["Write the test for the behaviour, not the implementation"],
    diff: "Intermediate", time: "6–8 hours",
  },
  "test-types-unit-integration-e2e": {
    d: "The three test types operate at different levels: unit tests verify single functions in isolation, integration tests verify components working together (DB, APIs), and end-to-end tests drive the full user flow through a real browser.",
    why: "Each level catches different failures — unit tests find logic bugs, integration tests find wiring bugs, e2e tests find workflow breaks — and the pyramid guides how many of each.",
    obj: ["Write unit tests for pure logic", "Test integration with real dependencies", "Write a few e2e flows", "Choose the right level for each behaviour"],
    prereq: ["Testing fundamentals"],
    res: [
      res("Unit vs integration vs e2e — freeCodeCamp", "https://www.freecodecamp.org/news/unit-vs-integration-vs-e2e-testing/", "article"),
      res("Testing levels — ISTQB", "https://www.istqb.org/certification/certified-tester-foundation-level.html", "docs"),
      res("Testing pyramid — Martin Fowler", "https://martinfowler.com/articles/practical-test-pyramid.html", "article"),
    ],
    int: ["What is the difference between unit and integration tests?", "When is an e2e test worth its cost?", "Why do most tests belong at the unit level?"],
    tips: ["Cover business logic with units, flows with a few e2e tests"],
    diff: "Intermediate", time: "4–6 hours",
  },
  "test-coverage": {
    d: "Test coverage measures what percentage of code is exercised by tests — line, branch and function coverage — reported by tools like c8, Istanbul and JaCoCo, and used as a quality signal.",
    why: "Coverage reveals untested code, but it measures quantity not quality — the skill is using it to find gaps, not chasing 100% as a number.",
    obj: ["Run coverage tools and read reports", "Interpret line vs branch coverage", "Target high-risk code first", "Set meaningful coverage goals"],
    prereq: ["Testing fundamentals"],
    res: [
      res("Code coverage — Wikipedia", "https://en.wikipedia.org/wiki/Code_coverage", "reference"),
      res("Coverage with c8 — Node docs", "https://nodejs.org/api/test.html#test-coverage", "docs"),
      res("JaCoCo — official docs", "https://www.jacoco.org/jacoco/trunk/doc/", "docs"),
    ],
    int: ["What is the difference between line and branch coverage?", "Why is 100% coverage not enough?", "What should a coverage gate protect?"],
    tips: ["Raise coverage on the code most likely to break — parsing, auth, money logic"],
    diff: "Intermediate", time: "2–3 hours",
  },
  "reporting-and-triage": {
    d: "Reporting and triage is managing test results and defects: running suites, collecting failures, prioritizing bugs by severity, and reporting status to the team so issues get fixed in order of impact.",
    why: "A failing suite is only useful if someone acts on it — triage and reporting turn test output into fixed bugs and informed releases.",
    obj: ["Read and interpret test reports", "Triage failures by severity and impact", "Write clear defect reports with repro steps", "Communicate test status to the team"],
    prereq: ["Testing fundamentals", "Bug tracking basics"],
    res: [
      res("Bug triage — Atlassian", "https://www.atlassian.com/agile/project-management/bug-triage", "article"),
      res("Writing good bug reports — Mozilla", "https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines", "docs"),
      res("Test reporting — Software Testing Help", "https://www.softwaretestinghelp.com/test-reporting/", "article"),
    ],
    int: ["How do you prioritize defects?", "What must a bug report contain?", "When is a test failure a blocker?"],
    tips: ["Reproduce every bug before reporting it — unreproducible bugs waste everyone's time"],
    diff: "Intermediate", time: "2–3 hours",
  },
  "writing-tests": {
    d: "Writing tests is the craft of turning behaviours into automated checks: arrange the state, act on the code, assert the result, and keep tests fast, isolated and readable.",
    why: "Good tests document behaviour and prevent regressions for years; poorly written tests break on every change and get deleted — the craft is what makes the difference.",
    obj: ["Structure tests with arrange-act-assert", "Name tests by the behaviour they verify", "Mock external dependencies deliberately", "Keep tests fast and deterministic"],
    prereq: ["Testing fundamentals", "One language"],
    res: [
      res("How to write good tests — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-write-good-tests/", "article"),
      res("Unit testing best practices — Microsoft Learn", "https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices", "docs"),
      res("Test names — Kent C. Dodds", "https://kentcdodds.com/blog/", "article"),
    ],
    int: ["What is arrange-act-assert?", "How do you name a test well?", "When should you mock?"],
    tips: ["Mock at the boundary (network, DB, clock) — not everything"],
    diff: "Intermediate", time: "4–6 hours",
  },

  // ── Multi-tenancy (RLS) ────────────────────────────────────────────────────
  "rls-concepts": {
    d: "Row-Level Security (RLS) is a database feature that restricts which rows a query can see based on policies evaluated against the current user or session — the foundation of multi-tenant database isolation.",
    why: "RLS enforces tenant isolation at the database layer so application code can't accidentally leak one customer's data to another — a core SaaS security pattern.",
    obj: ["Create RLS policies on tables", "Use USING and WITH CHECK clauses", "Enable RLS for tenant isolation", "Test that tenants can't cross boundaries"],
    prereq: ["SQL basics", "Database design"],
    res: [
      res("Row Security Policies — PostgreSQL docs", "https://www.postgresql.org/docs/current/ddl-rowsecurity.html", "docs"),
      res("RLS in Supabase — Supabase docs", "https://supabase.com/docs/guides/database/postgres/row-level-security", "tutorial"),
      res("Multi-tenant data isolation — Microsoft Learn", "https://learn.microsoft.com/en-us/azure/architecture/patterns/multitenant-saas", "docs"),
    ],
    int: ["What problem does RLS solve?", "What is the difference between USING and WITH CHECK?", "Why is DB-layer isolation better than app-layer only?"],
    tips: ["Enable RLS on every tenant table from day one — retrofitting is painful"],
    diff: "Advanced", time: "3–4 hours",
  },
  "policies-and-predicates": {
    d: "Policies and predicates are the rules of Row-Level Security: each policy binds a table to a predicate (USING for read, WITH CHECK for write) that filters rows based on the current user or session context.",
    why: "Well-written predicates are the mechanism of tenant isolation — a predicate that references the tenant ID column is what keeps every query scoped.",
    obj: ["Write USING and WITH CHECK predicates", "Set session context for the tenant", "Combine multiple policies correctly", "Verify policies with security tests"],
    prereq: ["RLS concepts"],
    res: [
      res("CREATE POLICY — PostgreSQL docs", "https://www.postgresql.org/docs/current/sql-createpolicy.html", "docs"),
      res("Setting session context — Supabase docs", "https://supabase.com/docs/guides/database/postgres/custom-claims", "docs"),
      res("RLS policies — Neon docs", "https://neon.tech/docs/guides/row-level-security", "tutorial"),
    ],
    int: ["What is the difference between USING and WITH CHECK?", "How do policies compose?", "Where does the tenant context come from?"],
    tips: ["Test the policy with two tenants in the same session — not just one"],
    diff: "Advanced", time: "3 hours",
  },
  "tenant-isolation": {
    d: "Tenant isolation is keeping each customer's data separate in a shared system — via separate databases, separate schemas, or shared tables with tenant-id scoping (often RLS) — balancing cost, complexity and compliance.",
    why: "Isolation failures are data breaches; choosing the isolation model is one of the first and most consequential decisions in any SaaS architecture.",
    obj: ["Compare database, schema and row-level isolation", "Choose the model by data sensitivity and scale", "Guarantee no cross-tenant access", "Handle migrations and shared infrastructure"],
    prereq: ["Database design", "RLS concepts"],
    res: [
      res("Multi-tenant isolation — Microsoft Learn", "https://learn.microsoft.com/en-us/azure/architecture/patterns/multitenant-saas", "docs"),
      res("SaaS tenant isolation — AWS", "https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/tenant-isolation.html", "docs"),
      res("Tenant isolation patterns — Supabase", "https://supabase.com/docs/guides/database/tenants", "article"),
    ],
    int: ["What are the three tenant isolation models?", "When is row-level isolation enough?", "What compliance requirements force stronger isolation?"],
    tips: ["Pick isolation strength by data sensitivity — not all tenants need databases"],
    diff: "Advanced", time: "4–5 hours",
  },
  "performance-impact": {
    d: "Performance impact is measuring how a feature or decision affects speed — profiling before and after, comparing baselines, and understanding the cost of every added abstraction, query or network call.",
    why: "Most performance problems are incremental: each decision looks harmless alone, but they compound — measuring impact keeps the accumulation visible.",
    obj: ["Establish a performance baseline", "Profile and measure before and after changes", "Attribute latency to queries, renders and calls", "Set budgets that catch regressions"],
    prereq: ["Profiling basics", "Performance awareness"],
    res: [
      res("Measuring performance — web.dev", "https://web.dev/learn/performance/measuring", "tutorial"),
      res("Performance budgets — web.dev", "https://web.dev/articles/performance-budgets-101", "article"),
      res("Query performance — PostgreSQL docs", "https://www.postgresql.org/docs/current/performance-tips.html", "docs"),
    ],
    int: ["Why measure before optimizing?", "How do you attribute slow page loads?", "What is a performance budget?"],
    tips: ["Track performance in CI with budgets so regressions fail the build"],
    diff: "Advanced", time: "3–4 hours",
  },
};
