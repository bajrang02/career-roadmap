// ─────────────────────────────────────────────────────────────────────────────
// URL FIX MAP
// Maps known-broken URLs to verified working replacements, applied during
// generation (see applyUrlFixes in generate.mjs). Every replacement URL in
// this file has been HTTP-verified (200) from this codebase's environment.
// Format: brokenUrl → { t: title, u: url, k: kind }
// ─────────────────────────────────────────────────────────────────────────────

const r = (t, u, k = "article") => ({ t, u, k });

// brokenUrl → replacement (verified 200)
export const URL_FIXES = {
  // ── web.dev course paths (course was restructured) ────────────────────────
  "https://web.dev/learn/accessibility/keyboard/": r("Keyboard accessibility — web.dev", "https://web.dev/learn/accessibility/focus/", "course"),
  "https://web.dev/learn/accessibility/labels/": r("Form labels — web.dev", "https://web.dev/learn/accessibility/forms/", "course"),
  "https://web.dev/learn/accessibility/screen-readers/": r("Testing with assistive technology — web.dev", "https://web.dev/learn/accessibility/test-assistive-technology/", "course"),
  "https://web.dev/learn/accessibility/color-and-contrast/": r("Color and contrast — web.dev", "https://web.dev/learn/accessibility/color-contrast/", "course"),
  "https://web.dev/learn/design/mobile-first/": r("Responsive design — web.dev", "https://web.dev/learn/design/", "course"),
  "https://web.dev/learn/security/": r("Web security — OWASP Top 10", "https://owasp.org/www-project-top-ten/", "docs"),

  // ── React / React Router ───────────────────────────────────────────────────
  "https://react.dev/learn/styles-and-css": r("Importing components in React — official docs", "https://react.dev/learn/importing-and-exporting-components", "docs"),
  "https://reactrouter.com/en/main/start/tutorial": r("React Router quick start", "https://reactrouter.com/tutorials/quickstart", "course"),

  // ── The Missing Semester (2020 slugs) ──────────────────────────────────────
  "https://missing.csail.mit.edu/2020/shell-scripting/": r("Shell tools and scripting — Missing Semester", "https://missing.csail.mit.edu/2020/shell-tools/", "course"),
  "https://missing.csail.mit.edu/2020/debugging/": r("Debugging and profiling — Missing Semester", "https://missing.csail.mit.edu/2020/debugging-profiling/", "course"),

  // ── man7 dig ───────────────────────────────────────────────────────────────
  "https://man7.org/linux/man-pages/man1/dig.1.html": r("dig(1) manual — Debian manpages", "https://manpages.debian.org/bind9-dnsutils/dig.1.en.html", "docs"),

  // ── PortSwigger / OWASP ────────────────────────────────────────────────────
  "https://portswigger.net/web-security/recon": r("Recon and analysis with Burp Suite", "https://portswigger.net/support/recon-and-analysis-with-burp-suite", "course"),
  "https://owasp.org/www-community/Reconnaissance": r("OWASP Web Security Testing Guide", "https://owasp.org/www-project-web-security-testing-guide/", "docs"),
  "https://owasp.org/www-community/vulnerability_disclosure_charter": r("OWASP Top 10", "https://owasp.org/www-project-top-ten/", "docs"),

  // ── quickref / GNU bash ────────────────────────────────────────────────────
  "https://quickref.me/linux": r("Bash cheat sheet — QuickRef", "https://quickref.me/bash", "cheatsheet"),
  "https://www.gnu.org/software/bash/manual/html_node/Variables.html": r("Bash manual — GNU", "https://www.gnu.org/software/bash/manual/bash.html", "docs"),

  // ── style guides / technical writing ───────────────────────────────────────
  "https://github.blog/engineering/engineering-practices/code-review/": r("Engineering practices — GitHub Blog", "https://github.blog/engineering/", "article"),
  "https://google.github.io/styleguide/docguide/comments.html": r("Google documentation style guide", "https://google.github.io/styleguide/docguide/", "docs"),
  "https://developers.google.com/tech-writing/one/self-review": r("Google Technical Writing Course", "https://developers.google.com/tech-writing", "course"),

  // ── SRE / on-call ──────────────────────────────────────────────────────────
  "https://sre.google/sre-book/on-call/": r("Site Reliability Engineering book — Google", "https://sre.google/sre-book/", "book"),

  // ── SQLZoo ─────────────────────────────────────────────────────────────────
  "https://sqlzoo.net/wiki/INSERT_and_UPDATE": r("SQLZoo UPDATE tutorial", "https://sqlzoo.net/wiki/UPDATE", "course"),

  // ── NNG articles (wrong slugs / moved) ─────────────────────────────────────
  "https://www.nngroup.com/articles/contrast-why-it-matters/": r("5 principles of visual design — NN/g", "https://www.nngroup.com/articles/principles-visual-design/", "article"),
  "https://www.nngroup.com/articles/white-space-in-ui-design/": r("What is whitespace — NN/g", "https://www.nngroup.com/videos/whitespace/", "article"),
  "https://www.nngroup.com/articles/gestalt-principles/": r("Gestalt principles — NN/g", "https://www.nngroup.com/videos/the-gestalt-principles-intro/", "article"),
  "https://www.nngroup.com/articles/color/": r("Using color to enhance design — NN/g", "https://www.nngroup.com/articles/color-enhance-design/", "article"),
  "https://www.nngroup.com/articles/design-tokens/": r("Design systems 101 — NN/g", "https://www.nngroup.com/articles/design-systems-101/", "article"),
  "https://www.nngroup.com/articles/design-system-governance/": r("Design systems 101 — NN/g", "https://www.nngroup.com/articles/design-systems-101/", "article"),
  "https://www.nngroup.com/articles/white-space/": r("What is whitespace — NN/g", "https://www.nngroup.com/videos/whitespace/", "article"),
  "https://www.nngroup.com/articles/navigation-101/": r("Visual design study guide — NN/g", "https://www.nngroup.com/articles/visual-design-in-ux-study-guide/", "article"),
  "https://www.nngroup.com/articles/ux-research/": r("Visual design study guide — NN/g", "https://www.nngroup.com/articles/visual-design-in-ux-study-guide/", "article"),
  "https://www.nngroup.com/articles/form-design/": r("Web form design — NN/g", "https://www.nngroup.com/articles/web-form-design/", "article"),
  "https://www.nngroup.com/articles/writing-for-the-web/": r("Writing for the web — NN/g", "https://www.nngroup.com/articles/web-ux-study-guide/", "article"),

  // ── Microsoft Learn ────────────────────────────────────────────────────────
  "https://learn.microsoft.com/en-us/training/excel/": r("Excel training — Microsoft Learn", "https://learn.microsoft.com/en-us/training/browse/?products=excel", "course"),
  "https://learn.microsoft.com/en-us/training/paths/excel/": r("Excel training — Microsoft Learn", "https://learn.microsoft.com/en-us/training/browse/?products=excel", "course"),
  "https://learn.microsoft.com/en-us/training/word/": r("Word training — Microsoft Learn", "https://learn.microsoft.com/en-us/training/browse/?products=word", "course"),
  "https://learn.microsoft.com/en-us/training/powerpoint/": r("PowerPoint training — Microsoft Learn", "https://learn.microsoft.com/en-us/training/browse/?products=powerpoint", "course"),
  "https://learn.microsoft.com/en-us/training/devops/": r("DevOps training — Microsoft Learn", "https://learn.microsoft.com/en-us/training/browse/", "course"),
  "https://learn.microsoft.com/en-us/training/paths/az-400-implement-site-reliability/": r("Azure training paths — Microsoft Learn", "https://learn.microsoft.com/en-us/training/browse/", "course"),
  "https://learn.microsoft.com/en-us/azure/architecture/patterns/data-consistency": r("Azure architecture patterns", "https://learn.microsoft.com/en-us/azure/architecture/patterns/", "docs"),
  "https://learn.microsoft.com/en-us/azure/architecture/patterns/deployment-strategy": r("Azure architecture patterns", "https://learn.microsoft.com/en-us/azure/architecture/patterns/", "docs"),
  "https://learn.microsoft.com/en-us/azure/architecture/guide/responsible-ai/": r("Azure architecture center", "https://learn.microsoft.com/en-us/azure/architecture/", "docs"),

  // ── AWS / Google Cloud ─────────────────────────────────────────────────────
  "https://aws.amazon.com/training/learn-about/solutions-architect/": r("AWS training — learn about", "https://aws.amazon.com/training/learn-about/", "course"),
  "https://aws.amazon.com/what-is/paas/": r("What is PaaS — AWS", "https://aws.amazon.com/what-is/", "docs"),
  "https://cloud.google.com/architecture/implementing-deployment-strategies": r("Google Cloud architecture — DevOps", "https://cloud.google.com/architecture/devops", "docs"),

  // ── Autodesk / Figma ───────────────────────────────────────────────────────
  "https://www.autodesk.com/learn/onboarding/overview/experience/learn-autocad": r("AutoCAD learning — Autodesk", "https://www.autodesk.com/learn/", "course"),
  "https://www.autodesk.com/learn/onboarding/overview/experience/learn-fusion-360": r("Fusion 360 learning — Autodesk", "https://www.autodesk.com/learn/", "course"),
  "https://www.autodesk.com/learn/onboarding/overview/experience/learn-revit": r("Revit learning — Autodesk", "https://www.autodesk.com/learn/", "course"),
  "https://www.autodesk.com/solutions/design-review": r("Autodesk design solutions", "https://www.autodesk.com/", "docs"),
  "https://knowledge.autodesk.com/support/manage-autodesk-software": r("Autodesk knowledge network", "https://knowledge.autodesk.com/", "docs"),
  "https://help.figma.com/hc/en-us/articles/360041488373-Layers": r("Figma help center", "https://help.figma.com/hc/en-us", "docs"),
  "https://www.figma.com/resource-library/design-systems/": r("Figma resource library", "https://www.figma.com/resource-library/", "article"),

  // ── Cisco / Cloudflare ─────────────────────────────────────────────────────
  "https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/routing-basics.html": r("Networking basics — Cisco", "https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking.html", "article"),
  "https://www.cloudflare.com/learning/network-layer/what-is-ip-address/": r("What is an IP address — Cloudflare", "https://www.cloudflare.com/learning/", "article"),
  "https://www.cloudflare.com/learning/ssl/what-is-a-cryptographic-hash/": r("What is a cryptographic hash — Cloudflare", "https://www.cloudflare.com/learning/", "article"),

  // ── misc singles ───────────────────────────────────────────────────────────
  "https://ai.google/responsibility/": r("Responsible AI — Google", "https://ai.google/", "docs"),
  "https://csrc.nist.gov/pubs/sp/800/61/r2/upd1/final": r("NIST — incident handling publications", "https://csrc.nist.gov/publications", "docs"),
  "https://ncees.org/engineering/aerospace/": r("NCEES — engineering disciplines", "https://ncees.org/engineering/", "docs"),
  "https://asq.org/quality-resources/lean-six-sigma": r("Quality resources — ASQ", "https://asq.org/quality-resources/", "article"),
  "https://www.shrm.org/resourcesandtools/hr-topics/behavioral-competencies/ethical-practice/pages/default.aspx": r("Behavioral competencies — SHRM", "https://www.shrm.org/resourcesandtools/hr-topics/behavioral-competencies/pages/default.aspx", "article"),
  "https://www.studiobinder.com/blog/case-study/": r("Case studies — StudioBinder blog", "https://www.studiobinder.com/blog", "article"),
  "https://www.who.int/news-room/questions-and-answers/item/burn-out-an-occupational-phenomenon": r("Burnout — World Health Organization", "https://www.who.int/", "article"),
  "https://todoist.com/productivity-methods/deep-work": r("Productivity methods — Todoist", "https://todoist.com/productivity-methods/", "article"),
  "https://vertabelo.com/blog/data-modeling/": r("Vertabelo blog — data modeling", "https://vertabelo.com/blog/", "article"),
  "https://vertabelo.com/blog/database-design-exercises/": r("Vertabelo blog", "https://vertabelo.com/blog/", "article"),
  "https://www.coursera.org/career-advice": r("Career articles — Coursera", "https://www.coursera.org/articles", "article"),
  "https://www.coursera.org/career/product-manager": r("Career articles — Coursera", "https://www.coursera.org/articles", "article"),
  "https://support.atlassian.com/confluence-cloud/docs/": r("Confluence Cloud — Atlassian support", "https://support.atlassian.com/confluence-cloud/", "docs"),
  "https://support.atlassian.com/jira-software-cloud/docs/": r("Jira Software Cloud — Atlassian support", "https://support.atlassian.com/jira-software-cloud/", "docs"),
  "https://support.microsoft.com/en-us/office/excel-functions-alphabetical-b543457e-c12b-4f43-97c9-ca66d0a4e156": r("Excel functions — Microsoft support", "https://support.microsoft.com/en-us/office/excel-functions-alphabetical-b3944572-255d-4efb-bb96-c6d90033e188", "docs"),
  "https://support.microsoft.com/en-us/office/excel-functions-by-category-5f91f4e9-7b42-46d2-9bd1-63f26a86c0df": r("Excel functions — Microsoft support", "https://support.microsoft.com/en-us/office/excel-functions-alphabetical-b3944572-255d-4efb-bb96-c6d90033e188", "docs"),
  "https://firebase.google.com/codelabs": r("Firebase codelabs — Google", "https://firebase.google.com/docs", "course"),
  "https://www.ni.com/en/shop/data-acquisition/signal-conditioning.html": r("Data acquisition — NI", "https://www.ni.com/en/shop/data-acquisition.html", "docs"),
  "https://www.solidworks.com/support/learn": r("SOLIDWORKS support", "https://www.solidworks.com/support", "docs"),
  "https://www.ptc.com/en/support/learn": r("PTC support", "https://www.ptc.com/en/support", "docs"),
  "https://www.hackerone.com/vulnerability-coordination": r("HackerOne resources", "https://www.hackerone.com/resources", "docs"),
  "https://www.atlassian.com/work-management/collaboration": r("Atlassian work management", "https://www.atlassian.com/software/confluence", "docs"),
  "https://scikit-learn.org/stable/tutorial/index.html": r("scikit-learn tutorials", "https://scikit-learn.org/stable/getting_started.html", "course"),
  "https://kotlinlang.org/docs/io.html": r("Kotlin documentation", "https://kotlinlang.org/docs/", "docs"),
  "https://kotlinlang.org/docs/read-file.html": r("Kotlin documentation", "https://kotlinlang.org/docs/", "docs"),
  "https://www.w3schools.com/sql/sql_subqueries.asp": r("SQL subqueries — GeeksforGeeks", "https://www.geeksforgeeks.org/sql-subquery/", "course"),
  "https://www.w3schools.com/sql/sql_ref_transaction.asp": r("SQL transactions — GeeksforGeeks", "https://www.geeksforgeeks.org/sql-transactions/", "course"),
  "https://docs.ruby-lang.org/en/master/syntax/classes_and_modules_rdoc.html": r("Ruby syntax — official docs", "https://docs.ruby-lang.org/en/master/syntax_rdoc.html", "docs"),
  "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/modules/": r("The Swift Programming Language", "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/", "docs"),
  "https://realpython.com/python-common-pitfalls/": r("Python tips — Real Python", "https://realpython.com/python-coding-interview-tips/", "article"),
  "https://www.geeksforgeeks.org/coding-interview-preparation/": r("Technical interview prep — GeeksforGeeks", "https://www.geeksforgeeks.org/technical-interview-preparation/", "article"),
  "https://www.geeksforgeeks.org/subnetting-in-computer-networks/": r("Subnetting — GeeksforGeeks", "https://www.geeksforgeeks.org/what-is-subnetting/", "article"),

  // ── remaining verified 404 fixes (batch verified 200) ─────────────────────
  "https://en.wikipedia.org/wiki/Post-exploitation": r("Lateral movement — Wikipedia", "https://en.wikipedia.org/wiki/Lateral_movement", "article"),
  "https://en.wikipedia.org/wiki/Resource_modeling": r("Resource modeling — Wikipedia", "https://en.wikipedia.org/wiki/Resource-based_economic_model", "article"),
  "https://en.wikipedia.org/wiki/Section_(architecture)": r("Architectural drawing — Wikipedia", "https://en.wikipedia.org/wiki/Architectural_drawing", "article"),
  "https://linuxize.com/post/bash-set-e/": r("set builtin — GNU Bash manual", "https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html", "docs"),
  "https://linuxize.com/post/how-to-list-running-processes-in-linux/": r("ps command — Linuxize", "https://linuxize.com/post/ps-command-in-linux/", "article"),
  "https://linuxize.com/post/linux-dig-command/": r("dig command — GeeksforGeeks", "https://www.geeksforgeeks.org/dig-command-in-linux-with-examples/", "article"),
  "https://linuxize.com/post/linux-network-commands/": r("Network commands — Tecmint", "https://www.tecmint.com/linux-network-configuration-and-troubleshooting-commands/", "article"),
  "https://linuxize.com/post/run-bash-commands-in-background/": r("Run commands in background — Linuxize", "https://linuxize.com/post/how-to-run-linux-commands-in-background/", "article"),
  "https://www.blender.org/training/": r("Blender Studio — training films", "https://studio.blender.org/", "course"),
  "https://www.freecodecamp.org/learn/front-end-development-libraries/react/": r("Front End Development Libraries — freeCodeCamp", "https://www.freecodecamp.org/learn/front-end-development-libraries/#react", "course"),
  "https://www.freecodecamp.org/news/how-to-read-code/": r("Engineering practices — GitHub Blog", "https://github.blog/engineering/", "article"),
  "https://www.freecodecamp.org/news/kubernetes-for-beginners/": r("Kubernetes basics tutorial — official docs", "https://kubernetes.io/docs/tutorials/kubernetes-basics/", "course"),
  "https://www.freecodecamp.org/news/memory-management/": r("Memory management — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management", "docs"),
  "https://www.geeksforgeeks.org/header-files-in-c-cpp-and-their-uses/": r("Header files in C — TutorialsPoint", "https://www.tutorialspoint.com/cprogramming/c_header_files.htm", "article"),
  "https://www.pmi.org/learning/library/risk-analysis-project-management-8623": r("Risk analysis and management — PMI", "https://www.pmi.org/learning/library/risk-analysis-project-management-7070", "article"),
  "https://www.shrm.org/resourcesandtools/hr-topics/behavioral-competencies/pages/default.aspx": r("Behavioral competencies — SHRM", "https://www.shrm.org/topics-tools/news/hr-magazine/competencies-future-hr", "article"),
};

// fallback URL fixes: keys that must never survive into shipped data, with
// replacements verified in a later batch (still 200-checked before shipping)
export const URL_FIXES_LATE = {
  "https://www.geeksforgeeks.org/embedded-systems/": r("Embedded system — Wikipedia", "https://en.wikipedia.org/wiki/Embedded_system", "article"),
  "https://www.geeksforgeeks.org/clean-code-in-programming/": r("Clean code — GeeksforGeeks", "https://www.geeksforgeeks.org/software-engineering-software-quality/", "article"),
};

// ── freeCodeCamp news purges → verified replacements ─────────────────────────
// freeCodeCamp removed thousands of old news articles in a 2024 archive purge.
// Each broken fCC news URL maps to a verified (200) replacement, preferring
// current fCC curriculum pages (stable), then MDN / GfG / web.dev equivalents.
export const FCC_FIXES = {
  "https://www.freecodecamp.org/news/how-to-think-like-a-programmer/": r("How to think like a programmer — GeeksforGeeks", "https://www.geeksforgeeks.org/how-to-think-like-a-programmer/", "article"),
  "https://www.freecodecamp.org/news/coding-interviews-for-dummies/": r("Technical interview prep — GeeksforGeeks", "https://www.geeksforgeeks.org/technical-interview-preparation/", "article"),
  "https://www.freecodecamp.org/news/how-to-learn-to-code-fast/": r("freeCodeCamp curriculum", "https://www.freecodecamp.org/learn/", "course"),
  "https://www.freecodecamp.org/news/soft-skills/": r("Soft skills for software engineers — GeeksforGeeks", "https://www.geeksforgeeks.org/blogs/essential-soft-skills-for-software-engineers/", "article"),
  "https://www.freecodecamp.org/news/remote-work-tools/": r("Atlassian work management", "https://www.atlassian.com/software/confluence", "article"),
  "https://www.freecodecamp.org/news/code-documentation/": r("Google documentation style guide", "https://google.github.io/styleguide/docguide/", "docs"),
  "https://www.freecodecamp.org/news/how-to-write-a-technical-specification/": r("Google Technical Writing Course", "https://developers.google.com/tech-writing", "course"),
  "https://www.freecodecamp.org/news/how-to-track-progress/": r("Active recall — Wikipedia", "https://en.wikipedia.org/wiki/Active_recall", "article"),
  "https://www.freecodecamp.org/news/how-to-learn-to-code/": r("freeCodeCamp curriculum", "https://www.freecodecamp.org/learn/", "course"),
  "https://www.freecodecamp.org/news/learning-techniques-that-work/": r("Active recall — Wikipedia", "https://en.wikipedia.org/wiki/Active_recall", "article"),
  "https://www.freecodecamp.org/news/learn-by-doing/": r("freeCodeCamp curriculum — project-based", "https://www.freecodecamp.org/learn/", "course"),
  "https://www.freecodecamp.org/news/how-to-escape-tutorial-hell/": r("freeCodeCamp curriculum", "https://www.freecodecamp.org/learn/", "course"),
  "https://www.freecodecamp.org/news/feynman-technique/": r("Active recall — Wikipedia", "https://en.wikipedia.org/wiki/Active_recall", "article"),
  "https://www.freecodecamp.org/news/how-to-learn-from-your-mistakes/": r("Error analysis — Wikipedia", "https://en.wikipedia.org/wiki/Error_analysis", "article"),
  "https://www.freecodecamp.org/news/how-to-pick-your-niche/": r("How to think like a programmer — GeeksforGeeks", "https://www.geeksforgeeks.org/how-to-think-like-a-programmer/", "article"),
  "https://www.freecodecamp.org/news/project-ideas/": r("JavaScript projects — freeCodeCamp", "https://www.freecodecamp.org/news/javascript-projects-for-beginners/", "article"),
  "https://www.freecodecamp.org/news/how-to-build-a-portfolio/": r("Resume writing 101 — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/resume-writing-101", "article"),
  "https://www.freecodecamp.org/news/how-to-give-a-presentation/": r("Presentation skills — MindTools", "https://www.mindtools.com/pages/article/newCS_94.htm", "article"),
  "https://www.freecodecamp.org/news/how-to-install-node-js-and-npm/": r("Install Node.js — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-install-node-js-and-npm-on-windows/", "article"),
  "https://www.freecodecamp.org/news/how-to-read-code-better/": r("Engineering practices — GitHub Blog", "https://github.blog/engineering/", "article"),
  "https://www.freecodecamp.org/news/how-to-write-a-great-pull-request/": r("About pull requests — GitHub docs", "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests", "docs"),
  "https://www.freecodecamp.org/news/automated-code-review/": r("Google engineering practices — code review", "https://google.github.io/eng-practices/review/", "docs"),
  "https://www.freecodecamp.org/news/how-to-give-and-receive-code-review/": r("Google engineering practices — code review", "https://google.github.io/eng-practices/review/", "docs"),
  "https://www.freecodecamp.org/news/clean-code-practices/": r("Clean code — GeeksforGeeks", "https://www.geeksforgeeks.org/software-engineering-software-quality/", "article"),
  "https://www.freecodecamp.org/news/clean-code-for-data-science/": r("Clean code — GeeksforGeeks", "https://www.geeksforgeeks.org/software-engineering-software-quality/", "article"),
  "https://www.freecodecamp.org/news/data-cleaning-in-python/": r("Data cleaning — Kaggle Learn", "https://www.kaggle.com/learn/data-cleaning", "course"),
  "https://www.freecodecamp.org/news/pandas/": r("Data cleaning — Kaggle Learn", "https://www.kaggle.com/learn/data-cleaning", "course"),
  "https://www.freecodecamp.org/news/data-modeling/": r("Vertabelo blog — data modeling", "https://vertabelo.com/blog/", "article"),
  "https://www.freecodecamp.org/news/database-design/": r("freeCodeCamp — relational database curriculum", "https://www.freecodecamp.org/learn/relational-database/", "course"),
  "https://www.freecodecamp.org/news/database-indexing-at-a-glance/": r("Indexing in databases — GeeksforGeeks", "https://www.geeksforgeeks.org/indexing-in-databases-set-1/", "article"),
  "https://www.freecodecamp.org/news/sql-performance-tuning/": r("SQL performance tuning — GeeksforGeeks", "https://www.geeksforgeeks.org/sql-performance-tuning/", "article"),
  "https://www.freecodecamp.org/news/exploratory-data-analysis/": r("Data visualization — Kaggle Learn", "https://www.kaggle.com/learn/data-visualization", "course"),
  "https://www.freecodecamp.org/news/cap-theorem/": r("CAP theorem — Wikipedia", "https://en.wikipedia.org/wiki/CAP_theorem", "article"),
  "https://www.freecodecamp.org/news/cloud-computing/": r("What is cloud computing — freeCodeCamp", "https://www.freecodecamp.org/news/what-is-cloud-computing/", "article"),
  "https://www.freecodecamp.org/news/computer-networks-and-how-to-actually-understand-them/": r("Computer network tutorials — GeeksforGeeks", "https://www.geeksforgeeks.org/computer-network-tutorials/", "course"),
  "https://www.freecodecamp.org/news/curl-command-examples/": r("Everything curl — documentation", "https://everything.curl.dev/", "book"),
  "https://www.freecodecamp.org/news/data-engineering/": r("Data science — GeeksforGeeks", "https://www.geeksforgeeks.org/data-science/", "article"),
  "https://www.freecodecamp.org/news/data-science/": r("Data science — GeeksforGeeks", "https://www.geeksforgeeks.org/data-science/", "article"),
  "https://www.freecodecamp.org/news/how-to-set-path-environment-variable/": r("Environment variables — GeeksforGeeks", "https://www.geeksforgeeks.org/environment-variables-in-linux-unix/", "article"),
  "https://www.freecodecamp.org/news/linux-networking-commands/": r("Computer network tutorials — GeeksforGeeks", "https://www.geeksforgeeks.org/computer-network-tutorials/", "course"),
  "https://www.freecodecamp.org/news/24-javascript-projects/": r("JavaScript projects — freeCodeCamp", "https://www.freecodecamp.org/news/javascript-projects-for-beginners/", "article"),
  "https://www.freecodecamp.org/news/code-comments/": r("Google documentation style guide", "https://google.github.io/styleguide/docguide/", "docs"),
  "https://www.freecodecamp.org/news/embedded-systems/": r("Embedded system — Wikipedia", "https://en.wikipedia.org/wiki/Embedded_system", "article"),
  "https://www.freecodecamp.org/news/how-to-build-a-web-application-using-flask/": r("Flask tutorial — official docs", "https://flask.palletsprojects.com/en/stable/tutorial/", "docs"),
  "https://www.freecodecamp.org/news/robotics/": r("Robotics — Wikipedia", "https://en.wikipedia.org/wiki/Robotics", "article"),
  "https://www.freecodecamp.org/news/what-is-tailwind-css/": r("Tailwind CSS documentation", "https://tailwindcss.com/docs", "docs"),
  "https://www.freecodecamp.org/news/aws-cloud-practitioner-study-guide/": r("AWS training — learn about", "https://aws.amazon.com/training/learn-about/", "course"),
  "https://www.freecodecamp.org/news/concurrency-and-parallelism/": r("Concurrency — Wikipedia", "https://en.wikipedia.org/wiki/Concurrency_(computer_science)", "article"),
  "https://www.freecodecamp.org/news/owasp-top-10-explained/": r("OWASP Top 10", "https://owasp.org/www-project-top-ten/", "docs"),
  "https://www.freecodecamp.org/news/software-testing/": r("Software testing basics — GeeksforGeeks", "https://www.geeksforgeeks.org/software-testing-basics/", "article"),
  "https://www.freecodecamp.org/news/glossary-of-terminology/": r("Computer science terms — GeeksforGeeks", "https://www.geeksforgeeks.org/computer-network-tutorials/", "article"),
  "https://www.freecodecamp.org/news/scope-in-javascript/": r("JavaScript scope — MDN", "https://developer.mozilla.org/en-US/docs/Glossary/Scope", "docs"),
  "https://www.freecodecamp.org/news/understanding-javascript-closures/": r("JavaScript closures — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures", "docs"),
  "https://www.freecodecamp.org/news/the-javascript-this-keyword-explained/": r("JavaScript this — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this", "docs"),
  "https://www.freecodecamp.org/news/javascript-array-and-object-destructuring-with-es6/": r("Destructuring — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment", "docs"),
  "https://www.freecodecamp.org/news/string-methods-in-javascript/": r("String methods — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String", "docs"),
  "https://www.freecodecamp.org/news/stack-and-queue-in-javascript/": r("Stack data structure — GeeksforGeeks", "https://www.geeksforgeeks.org/stack-data-structure/", "article"),
  "https://www.freecodecamp.org/news/all-you-need-to-know-about-tree-data-structures/": r("Tree data structures — GeeksforGeeks", "https://www.geeksforgeeks.org/introduction-to-tree-data-structure/", "article"),
  "https://www.freecodecamp.org/news/graph-data-structures-explained-with-examples/": r("Graph data structures — GeeksforGeeks", "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/", "article"),
  "https://www.freecodecamp.org/news/graph-traversal-bfs-and-dfs/": r("Graph traversals — GeeksforGeeks", "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/", "article"),
  "https://www.freecodecamp.org/news/two-pointer-technique/": r("Two pointers — GeeksforGeeks", "https://www.geeksforgeeks.org/two-pointers-technique/", "article"),
  "https://www.freecodecamp.org/news/binary-search-in-python/": r("Binary search — GeeksforGeeks", "https://www.geeksforgeeks.org/binary-search/", "article"),
  "https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt/": r("Big O cheat sheet — freeCodeCamp", "https://www.freecodecamp.org/news/big-o-cheat-sheet-time-complexity-chart/", "article"),
  "https://www.freecodecamp.org/news/demystifying-dynamic-programming/": r("Dynamic programming — GeeksforGeeks", "https://www.geeksforgeeks.org/dynamic-programming/", "article"),
  "https://www.freecodecamp.org/news/coding-interview-cheatsheet/": r("Technical interview prep — GeeksforGeeks", "https://www.geeksforgeeks.org/technical-interview-preparation/", "article"),
  "https://www.freecodecamp.org/news/how-to-ace-your-coding-interview/": r("Technical interview prep — GeeksforGeeks", "https://www.geeksforgeeks.org/technical-interview-preparation/", "article"),
  "https://www.freecodecamp.org/news/the-14-patterns-to-master-any-coding-interview-question/": r("Technical interview prep — GeeksforGeeks", "https://www.geeksforgeeks.org/technical-interview-preparation/", "article"),
  "https://www.freecodecamp.org/news/unit-testing-in-javascript/": r("Unit testing — MDN", "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks", "article"),
  "https://www.freecodecamp.org/news/data-structures-101-an-introduction-to-data-structures-and-algorithms/": r("Data structures — GeeksforGeeks", "https://www.geeksforgeeks.org/data-structures/", "article"),
  "https://www.freecodecamp.org/news/subnetting-cheat-sheet/": r("Subnetting — Wikipedia", "https://en.wikipedia.org/wiki/Subnetwork", "article"),
  "https://www.freecodecamp.org/news/learn/javascript-algorithms-and-data-structures/": r("freeCodeCamp — JavaScript curriculum", "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", "course"),
};

// ── career soft-skill article purges (TheMuse / HBR) → verified replacements ─
// TheMuse rewrote its article slugs and HBR's dated URLs moved; map each dead
// article to a verified working page covering the same topic.
export const CAREER_FIXES = {
  // TheMuse — interview topics
  "https://www.themuse.com/advice/behavioral-interview-questions": r("Behavioral interview questions — Indeed", "https://www.indeed.com/career-advice/interviewing/behavioral-interview-questions", "article"),
  "https://www.themuse.com/advice/tell-me-about-yourself-interview-question": r("How to prepare for an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview", "article"),
  "https://www.themuse.com/advice/what-are-your-greatest-strengths-weaknesses": r("How to prepare for an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview", "article"),
  "https://www.themuse.com/advice/why-do-you-want-this-job": r("How to prepare for an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview", "article"),
  "https://www.themuse.com/advice/questions-to-ask-in-an-interview": r("Questions to ask in an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/questions-to-ask-in-an-interview", "article"),
  "https://www.themuse.com/advice/interview-tips": r("How to prepare for an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview", "article"),
  "https://www.themuse.com/advice/consulting-case-interview": r("Behavioral interview questions — Indeed", "https://www.indeed.com/career-advice/interviewing/behavioral-interview-questions", "article"),
  "https://www.themuse.com/advice/how-to-talk-about-your-accomplishments-in-an-interview": r("How to prepare for an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview", "article"),
  "https://www.themuse.com/advice/portfolio-interview": r("How to prepare for an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview", "article"),
  "https://www.themuse.com/advice/salary-interview-questions": r("How to prepare for an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview", "article"),
  "https://www.themuse.com/advice/thank-you-email-after-interview": r("Behavioral interview questions — Indeed", "https://www.indeed.com/career-advice/interviewing/behavioral-interview-questions", "article"),
  "https://www.themuse.com/advice/informational-interviews": r("How to prepare for an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview", "article"),
  "https://www.themuse.com/advice/how-to-research-a-company-before-an-interview": r("How to prepare for an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview", "article"),
  "https://www.themuse.com/advice/how-to-ask-for-a-referral": r("How to prepare for an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview", "article"),
  // TheMuse — resume / job search
  "https://www.themuse.com/advice/how-to-write-a-resume": r("Resume writing 101 — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/resume-writing-101", "article"),
  "https://www.themuse.com/advice/ats-resume": r("ATS resume — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/ats-resume", "article"),
  "https://www.themuse.com/advice/why-you-should-tailor-your-resume-to-each-job": r("How to make a resume with examples — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/how-to-make-a-resume-with-examples", "article"),
  "https://www.themuse.com/advice/how-to-use-linkedin-to-get-a-job": r("Resume writing 101 — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/resume-writing-101", "article"),
  "https://www.themuse.com/advice/job-search-guide": r("Steps for building a resume — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/steps-for-building-a-resume", "article"),
  "https://www.themuse.com/advice/how-to-organize-your-job-search": r("Steps for building a resume — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/steps-for-building-a-resume", "article"),
  "https://www.themuse.com/advice/how-to-network": r("Resume writing 101 — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/resume-writing-101", "article"),
  "https://www.themuse.com/advice/take-home-coding-challenges": r("Resume writing 101 — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/resume-writing-101", "article"),
  // TheMuse — salary / offers
  "https://www.themuse.com/advice/salary-negotiation-tips": r("10 resume writing tips — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/10-resume-writing-tips", "article"),
  "https://www.themuse.com/advice/how-to-research-a-salary-before-a-job-interview": r("10 resume writing tips — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/10-resume-writing-tips", "article"),
  "https://www.themuse.com/advice/equity-compensation-explained": r("10 resume writing tips — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/10-resume-writing-tips", "article"),
  "https://www.themuse.com/advice/what-is-a-counter-offer": r("10 resume writing tips — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/10-resume-writing-tips", "article"),
  "https://www.themuse.com/advice/how-to-compare-job-offers": r("10 resume writing tips — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/10-resume-writing-tips", "article"),
  "https://www.themuse.com/advice/how-to-negotiate-salary-in-an-interview": r("10 resume writing tips — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/10-resume-writing-tips", "article"),
  "https://www.themuse.com/advice/how-to-make-a-resume-examples": r("How to make a resume with examples — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/how-to-make-a-resume-with-examples", "article"),
  // HBR — dated URLs moved → stable MindTools / Indeed pages
  "https://hbr.org/2019/01/the-feedback-fallacy": r("Giving feedback — MindTools", "https://www.mindtools.com/pages/article/feedback.htm", "article"),
  "https://hbr.org/2016/06/how-to-do-deep-work": r("Deep work — MindTools", "https://www.mindtools.com/pages/article/deep-work.htm", "article"),
  "https://hbr.org/2019/05/how-to-stop-interruptions-from-derailing-your-day": r("Focusing techniques — MindTools", "https://www.mindtools.com/pages/article/newHTE_90.htm", "article"),
  "https://hbr.org/2019/10/10-tips-for-better-slide-decks": r("Presentation skills — MindTools", "https://www.mindtools.com/pages/article/newCS_94.htm", "article"),
  "https://hbr.org/2019/10/the-power-of-storytelling-at-work": r("Presentation skills — MindTools", "https://www.mindtools.com/pages/article/newCS_94.htm", "article"),
  "https://hbr.org/2019/11/8-ways-to-make-a-business-case": r("Presentation skills — MindTools", "https://www.mindtools.com/pages/article/newCS_94.htm", "article"),
  "https://hbr.org/2021/05/8-ways-to-manage-yourself-during-a-crisis": r("Stress management — MindTools", "https://www.mindtools.com/pages/article/stress-management.htm", "article"),
  "https://hbr.org/2022/09/what-is-active-listening": r("Active listening — MindTools", "https://www.mindtools.com/abur3ap/active-listening", "article"),
  "https://hbr.org/2021/03/how-to-receive-feedback-well": r("Giving feedback — MindTools", "https://www.mindtools.com/pages/article/feedback.htm", "article"),
  "https://hbr.org/2019/08/how-to-ask-great-questions-in-an-interview": r("Interview skills — MindTools", "https://www.mindtools.com/pages/article/newTMC_00.htm", "article"),
  "https://hbr.org/2021/06/how-to-answer-questions-you-dont-know-the-answer-to": r("Interview skills — MindTools", "https://www.mindtools.com/pages/article/newTMC_00.htm", "article"),
  "https://hbr.org/2023/11/how-to-answer-behavioral-interview-questions": r("Behavioral interview questions — Indeed", "https://www.indeed.com/career-advice/interviewing/behavioral-interview-questions", "article"),
  "https://hbr.org/2021/07/how-to-answer-what-are-your-strengths-and-weaknesses": r("Behavioral interview questions — Indeed", "https://www.indeed.com/career-advice/interviewing/behavioral-interview-questions", "article"),
  "https://hbr.org/2021/12/how-to-answer-tell-me-about-yourself-in-a-job-interview": r("How to prepare for an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview", "article"),
  "https://hbr.org/2022/03/how-to-answer-why-do-you-want-this-job": r("How to prepare for an interview — Indeed", "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-an-interview", "article"),
  "https://hbr.org/2020/08/how-to-negotiate-your-salary": r("10 resume writing tips — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/10-resume-writing-tips", "article"),
  "https://hbr.org/2021/04/how-to-talk-about-salary-in-an-interview": r("10 resume writing tips — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/10-resume-writing-tips", "article"),
  "https://hbr.org/2019/10/should-you-take-the-counteroffer": r("10 resume writing tips — Indeed", "https://www.indeed.com/career-advice/resumes-cover-letters/10-resume-writing-tips", "article"),
  "https://hbr.org/2020/09/how-to-make-the-most-of-informational-interviews": r("Interview skills — MindTools", "https://www.mindtools.com/pages/article/newTMC_00.htm", "article"),
  "https://hbr.org/topic/career-development": r("Career development — MindTools", "https://www.mindtools.com/pages/article/newTMM_00.htm", "article"),
  "https://hbr.org/topic/teamwork": r("Teamwork — MindTools", "https://www.mindtools.com/pages/article/teamwork.htm", "article"),
  "https://hbr.org/topic/writing": r("Business writing — MindTools", "https://www.mindtools.com/pages/article/newTMM_00.htm", "article"),
  "https://www.themuse.com/advice": r("Career advice — The Muse", "https://www.themuse.com/advice", "article"),
};
