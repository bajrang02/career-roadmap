// ─────────────────────────────────────────────────────────────────────────────
// Curated resources — additions for high-frequency topics that were previously
// served by the google/youtube search fallback.
// Merged into the TOPIC_RESOURCES lookup by generate.mjs (extra map wins on
// ties). Keys are normalized labels: lowercase, no punctuation, spaces only,
// "&" normalized to a space (same normalization as generate.mjs normLabel).
// All links are DIRECT topic pages — no searches anywhere.
// ─────────────────────────────────────────────────────────────────────────────

const r = (t, u, k) => ({ t, u, k });

export const EXTRA_TOPIC_RESOURCES = {
  // ── soft skills & communication ────────────────────────────────────────────
  "soft skills": [
    r("Soft skills guide — freeCodeCamp", "https://www.freecodecamp.org/news/soft-skills/", "article"),
    r("Communication — Harvard Business Review", "https://hbr.org/topic/communication", "article"),
    r("Career development — The Muse", "https://www.themuse.com/advice", "article"),
  ],
  "communication collaboration": [
    r("Communication — Harvard Business Review", "https://hbr.org/topic/communication", "article"),
    r("Collaboration guide — Atlassian", "https://www.atlassian.com/work-management/collaboration", "article"),
    r("Remote collaboration — freeCodeCamp", "https://www.freecodecamp.org/news/remote-work-tools/", "article"),
  ],
  "clear written communication": [
    r("Google technical writing courses", "https://developers.google.com/tech-writing", "course"),
    r("Writing clearly — HBR", "https://hbr.org/topic/writing", "article"),
  ],
  "remote communication tools": [
    r("Remote work tools — freeCodeCamp", "https://www.freecodecamp.org/news/remote-work-tools/", "article"),
    r("Slack help center", "https://slack.com/help", "docs"),
    r("Microsoft Teams training", "https://support.microsoft.com/en-us/teams", "docs"),
  ],
  "documentation writing": [
    r("Google technical writing courses", "https://developers.google.com/tech-writing", "course"),
    r("Write the Docs", "https://www.writethedocs.org/", "community"),
    r("Microsoft style guide", "https://learn.microsoft.com/en-us/style-guide/welcome/", "docs"),
  ],
  "writing for your audience": [
    r("Google technical writing — audience", "https://developers.google.com/tech-writing/one/audience", "course"),
    r("Writing for the web — NN/g", "https://www.nngroup.com/articles/writing-for-the-web/", "article"),
  ],
  "reviewing and editing": [
    r("Technical writing review — Google", "https://developers.google.com/tech-writing/one/self-review", "course"),
    r("Editing guide — Grammarly", "https://www.grammarly.com/blog/editing/", "article"),
  ],
  "documentation tools": [
    r("Markdown guide", "https://www.markdownguide.org/", "docs"),
    r("GitHub docs — writing on GitHub", "https://docs.github.com/en/get-started/writing-on-github", "docs"),
    r("Notion help center", "https://www.notion.com/help", "docs"),
  ],
  "time management": [
    r("Time management — Harvard Business Review", "https://hbr.org/topic/time-management", "article"),
    r("Pomodoro technique — Todoist", "https://todoist.com/productivity-methods/pomodoro-technique", "article"),
    r("Getting Things Done (book)", "https://gettingthingsdone.com/", "book"),
  ],
  "planning and scheduling": [
    r("Project planning — Atlassian", "https://www.atlassian.com/agile/project-planning", "article"),
    r("How to plan your week — Todoist", "https://todoist.com/productivity-methods/time-blocking", "article"),
  ],
  "deliberate practice": [
    r("Deliberate practice — James Clear", "https://jamesclear.com/beginners-guide-deliberate-practice", "article"),
    r("How to learn — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-learn-to-code-fast/", "article"),
  ],
  "focus management": [
    r("Deep Work (book) — Cal Newport", "https://www.calnewport.com/books/deep-work/", "book"),
    r("Focus techniques — Todoist", "https://todoist.com/productivity-methods/deep-work", "article"),
  ],

  // ── job hunting & interview ────────────────────────────────────────────────
  "the negotiation conversation": [
    r("Salary negotiation — HBR", "https://hbr.org/2020/08/how-to-negotiate-your-salary", "article"),
    r("How to negotiate — The Muse", "https://www.themuse.com/advice/salary-negotiation-tips", "article"),
    r("Levels.fyi — compensation data", "https://www.levels.fyi/", "practice"),
  ],
  "company research": [
    r("Glassdoor — company reviews", "https://www.glassdoor.com/", "practice"),
    r("How to research a company — The Muse", "https://www.themuse.com/advice/how-to-research-a-company-before-an-interview", "article"),
  ],
  "common interview questions": [
    r("Common interview questions — The Muse", "https://www.themuse.com/advice/interview-questions-and-answers", "article"),
    r("30 behavioral questions — HBR", "https://hbr.org/2023/11/how-to-answer-behavioral-interview-questions", "article"),
  ],
  "resume linkedin": [
    r("Resume tips — Google Careers", "https://careers.google.com/how-we-hire/resume-tips/", "article"),
    r("LinkedIn profile optimization — The Muse", "https://www.themuse.com/advice/how-to-use-linkedin-to-get-a-job", "article"),
  ],
  "job portals networking": [
    r("LinkedIn Jobs", "https://www.linkedin.com/jobs", "practice"),
    r("Indeed", "https://www.indeed.com/", "practice"),
    r("Networking guide — The Muse", "https://www.themuse.com/advice/how-to-network", "article"),
  ],
  "job portals linkedin indeed": [
    r("LinkedIn Jobs", "https://www.linkedin.com/jobs", "practice"),
    r("Indeed", "https://www.indeed.com/", "practice"),
    r("We Work Remotely", "https://weworkremotely.com/", "practice"),
  ],
  "community certifications": [
    r("freeCodeCamp certifications", "https://www.freecodecamp.org/learn", "course"),
    r("Microsoft Learn — certifications", "https://learn.microsoft.com/en-us/credentials/", "docs"),
    r("Google Cloud certifications", "https://cloud.google.com/learn/certification", "docs"),
  ],
  "official certification path": [
    r("CompTIA certifications", "https://www.comptia.org/certifications", "docs"),
    r("Microsoft Learn — certifications", "https://learn.microsoft.com/en-us/credentials/", "docs"),
    r("AWS certifications", "https://aws.amazon.com/certification/", "docs"),
  ],
  certifications: [
    r("CompTIA certifications", "https://www.comptia.org/certifications", "docs"),
    r("Microsoft Learn — certifications", "https://learn.microsoft.com/en-us/credentials/", "docs"),
    r("Google Cloud certifications", "https://cloud.google.com/learn/certification", "docs"),
  ],
  "industry certification path": [
    r("AWS certifications", "https://aws.amazon.com/certification/", "docs"),
    r("Microsoft Learn — certifications", "https://learn.microsoft.com/en-us/credentials/", "docs"),
    r("Google Cloud certifications", "https://cloud.google.com/learn/certification", "docs"),
  ],
  "specializations next steps": [
    r("Career specializations — Coursera", "https://www.coursera.org/browse", "course"),
    r("Specialization paths — roadmap.sh", "https://roadmap.sh/", "article"),
    r("Career growth — HBR", "https://hbr.org/topic/career-development", "article"),
  ],
  "recommended courses books": [
    r("freeCodeCamp — free courses", "https://www.freecodecamp.org/learn", "course"),
    r("The Odin Project", "https://www.theodinproject.com/", "course"),
    r("CS50 — Harvard", "https://cs50.harvard.edu/x/", "course"),
  ],
  "recommended books courses": [
    r("freeCodeCamp — free courses", "https://www.freecodecamp.org/learn", "course"),
    r("The Odin Project", "https://www.theodinproject.com/", "course"),
    r("CS50 — Harvard", "https://cs50.harvard.edu/x/", "course"),
  ],
  "coding take home practice": [
    r("Take-home challenge guide — The Muse", "https://www.themuse.com/advice/take-home-coding-challenges", "article"),
    r("Practice problems — LeetCode", "https://leetcode.com/problemset/", "practice"),
  ],
  "coding practice leetcode style": [
    r("LeetCode — problems", "https://leetcode.com/problemset/", "practice"),
    r("NeetCode roadmap", "https://neetcode.io/roadmap", "practice"),
    r("HackerRank — algorithms", "https://www.hackerrank.com/domains/algorithms", "practice"),
  ],
  "build something projects": [
    r("Project ideas — freeCodeCamp", "https://www.freecodecamp.org/news/24-javascript-projects/", "article"),
    r("GitHub — start a portfolio", "https://github.com/", "practice"),
    r("Frontend Mentor challenges", "https://www.frontendmentor.io/challenges", "practice"),
  ],
  "building domain projects": [
    r("Project ideas — freeCodeCamp", "https://www.freecodecamp.org/news/project-ideas/", "article"),
    r("Build & share — GitHub", "https://github.com/", "practice"),
  ],
  "finding projects": [
    r("GitHub Explore", "https://github.com/explore", "community"),
    r("Project-based learning — freeCodeCamp", "https://www.freecodecamp.org/news/project-based-learning/", "article"),
  ],
  "portfolio walkthrough": [
    r("How to present a portfolio — The Muse", "https://www.themuse.com/advice/portfolio-interview", "article"),
    r("Build a portfolio — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-build-a-portfolio/", "article"),
  ],
  portfolio: [
    r("Build a portfolio — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-build-a-portfolio/", "article"),
    r("GitHub — build your portfolio", "https://github.com/", "practice"),
    r("Behance — portfolio examples", "https://www.behance.net/", "community"),
  ],
  "expert interviews": [
    r("Informational interviews — The Muse", "https://www.themuse.com/advice/informational-interviews", "article"),
    r("Ask great questions — HBR", "https://hbr.org/2019/08/how-to-ask-great-questions-in-an-interview", "article"),
  ],
  "case study practice": [
    r("Consulting case interviews — The Muse", "https://www.themuse.com/advice/consulting-case-interview", "article"),
    r("Case interview prep — Pramp", "https://www.pramp.com/", "practice"),
  ],
  "case studies aptitude": [
    r("IndiaBix — aptitude", "https://www.indiabix.com/", "practice"),
    r("Testbook — mock tests", "https://testbook.com/", "practice"),
  ],
  "practice cases": [
    r("Case interview practice — The Muse", "https://www.themuse.com/advice/consulting-case-interview", "article"),
    r("Mock interviews — Pramp", "https://www.pramp.com/", "practice"),
  ],
  "core concepts revision": [
    r("freeCodeCamp — curriculum", "https://www.freecodecamp.org/learn", "course"),
    r("NeetCode — practice", "https://neetcode.io/practice", "practice"),
  ],
  "fundamental principles": [
    r("The Missing Semester", "https://missing.csail.mit.edu/", "course"),
    r("Teach Yourself CS", "https://teachyourselfcs.com/", "article"),
  ],
  "study planning": [
    r("Study techniques — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-learn-to-code-fast/", "article"),
    r("Spaced repetition — Wikipedia", "https://en.wikipedia.org/wiki/Spaced_repetition", "article"),
    r("Anki — spaced repetition", "https://apps.ankiweb.net/", "practice"),
  ],
  "practice discipline": [
    r("Deliberate practice — James Clear", "https://jamesclear.com/beginners-guide-deliberate-practice", "article"),
    r("Consistency — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-learn-to-code-fast/", "article"),
  ],
  "advanced reading": [
    r("Khan Academy — reading & writing", "https://www.khanacademy.org/ela", "course"),
    r("Speed reading — IRIS reading", "https://irisreading.com/", "article"),
  ],
  "reporting misconduct": [
    r("Workplace ethics — HBR", "https://hbr.org/topic/ethics", "article"),
    r("Whistleblowing guide — SHRM", "https://www.shrm.org/resourcesandtools/hr-topics/behavioral-competencies/ethical-practice/pages/default.aspx", "article"),
  ],
  career: [
    r("Career guidance — The Muse", "https://www.themuse.com/advice", "article"),
    r("Career paths — O*NET", "https://www.onetonline.org/", "docs"),
    r("Career development — HBR", "https://hbr.org/topic/career-development", "article"),
  ],

  // ── systems & architecture ─────────────────────────────────────────────────
  "eventual consistency": [
    r("Consistency — System Design Primer", "https://github.com/donnemartin/system-design-primer", "repo"),
    r("Eventually consistent — Wikipedia", "https://en.wikipedia.org/wiki/Eventual_consistency", "article"),
    r("CAP theorem — freeCodeCamp", "https://www.freecodecamp.org/news/cap-theorem/", "article"),
  ],
  "weak consistency": [
    r("Consistency models — Wikipedia", "https://en.wikipedia.org/wiki/Consistency_model", "article"),
    r("Data consistency — Microsoft Learn", "https://learn.microsoft.com/en-us/azure/architecture/patterns/data-consistency", "docs"),
  ],
  "strong consistency": [
    r("Consistency models — Wikipedia", "https://en.wikipedia.org/wiki/Consistency_model", "article"),
    r("Data consistency — Microsoft Learn", "https://learn.microsoft.com/en-us/azure/architecture/patterns/data-consistency", "docs"),
  ],
  "availability patterns": [
    r("Availability patterns — System Design Primer", "https://github.com/donnemartin/system-design-primer#availability-patterns", "repo"),
    r("AWS — high availability", "https://aws.amazon.com/architecture/", "docs"),
  ],
  "event driven": [
    r("Event-driven architecture — AWS", "https://aws.amazon.com/event-driven-architecture/", "docs"),
    r("Event-driven design — Microsoft Learn", "https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven", "docs"),
  ],
  "schedule driven": [
    r("Scheduler pattern — Microsoft Learn", "https://learn.microsoft.com/en-us/azure/architecture/patterns/scheduler-agent-supervisor", "docs"),
    r("Cron jobs — Wikipedia", "https://en.wikipedia.org/wiki/Cron", "article"),
  ],
  "design patterns": [
    r("Design patterns — refactoring.guru", "https://refactoring.guru/design-patterns", "article"),
    r("Design patterns — GeeksforGeeks", "https://www.geeksforgeeks.org/software-design-patterns/", "article"),
    r("Head First Design Patterns (book)", "https://www.oreilly.com/library/view/head-first-design/0596007124/", "book"),
  ],
  "design systems": [
    r("Design systems — Figma", "https://www.figma.com/resource-library/design-systems/", "article"),
    r("Design systems 101 — NN/g", "https://www.nngroup.com/articles/design-systems-101/", "article"),
  ],

  // ── programming foundations (used by non-language roadmaps) ────────────────
  "operators": [
    r("Operators — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators", "docs"),
    r("Python operators — official docs", "https://docs.python.org/3/library/operator.html", "docs"),
    r("Operators — W3Schools", "https://www.w3schools.com/js/js_operators.asp", "course"),
  ],
  "operators expressions": [
    r("Operators — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators", "docs"),
    r("JavaScript.info — operators", "https://javascript.info/operators", "course"),
    r("Python expressions — official docs", "https://docs.python.org/3/reference/expressions.html", "docs"),
  ],
  "writing helpful comments": [
    r("Commenting code — Google style guide", "https://google.github.io/styleguide/docguide/comments.html", "docs"),
    r("Writing comments — freeCodeCamp", "https://www.freecodecamp.org/news/code-comments/", "article"),
  ],
  "documentation": [
    r("Technical writing — Google", "https://developers.google.com/tech-writing", "course"),
    r("README guide — GitHub", "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes", "docs"),
  ],
  "versioning": [
    r("Semantic versioning", "https://semver.org/", "docs"),
    r("Git tags & releases — GitHub", "https://docs.github.com/en/repositories/releasing-projects-on-github", "docs"),
  ],
  maintenance: [
    r("Software maintenance — Wikipedia", "https://en.wikipedia.org/wiki/Software_maintenance", "article"),
    r("Maintainable code — freeCodeCamp", "https://www.freecodecamp.org/news/clean-code-practices/", "article"),
  ],
  "input output": [
    r("Input & output — Python docs", "https://docs.python.org/3/tutorial/inputoutput.html", "docs"),
    r("Console — MDN", "https://developer.mozilla.org/en-US/docs/Web/API/console", "docs"),
    r("Input/output — W3Schools", "https://www.w3schools.com/python/python_user_input.asp", "course"),
  ],

  // ── tooling / dev environment ──────────────────────────────────────────────
  "installation setup": [
    r("Install Node.js & npm — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-install-node-js-and-npm/", "article"),
    r("Python installation — official docs", "https://docs.python.org/3/using/index.html", "docs"),
    r("VS Code setup — official docs", "https://code.visualstudio.com/docs/setup/setup-overview", "docs"),
  ],
  "basic commands": [
    r("Linux commands — The Missing Semester", "https://missing.csail.mit.edu/", "course"),
    r("Common commands — Linux Journey", "https://linuxjourney.com/lesson/the-shell", "course"),
  ],
  "command help": [
    r("man pages — Wikipedia", "https://en.wikipedia.org/wiki/Man_page", "article"),
    r("Linux help — Linux Journey", "https://linuxjourney.com/", "course"),
  ],
  "command path": [
    r("PATH variable — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-set-path-environment-variable/", "article"),
    r("which & whereis — Linux Journey", "https://linuxjourney.com/lesson/the-shell", "course"),
  ],
  redirects: [
    r("Shell redirection — The Missing Semester", "https://missing.csail.mit.edu/2020/shell-tools/", "course"),
    r("HTTP redirects — MDN", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections", "docs"),
  ],
  "secrets management": [
    r("Secrets management — AWS", "https://docs.aws.amazon.com/secretsmanager/", "docs"),
    r("Vault documentation", "https://developer.hashicorp.com/vault/docs", "docs"),
    r("GitHub — storing secrets", "https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions", "docs"),
  ],
  "linux scripting": [
    r("Bash scripting — The Missing Semester", "https://missing.csail.mit.edu/2020/shell-scripting/", "course"),
    r("Bash guide — GNU", "https://www.gnu.org/software/bash/manual/", "docs"),
    r("ShellCheck", "https://www.shellcheck.net/", "practice"),
  ],
  "processes systemd": [
    r("systemd — freedesktop docs", "https://www.freedesktop.org/software/systemd/man/systemd.html", "docs"),
    r("Processes — Linux Journey", "https://linuxjourney.com/lesson/processes", "course"),
  ],
  "shell tools piping": [
    r("Shell tools & piping — The Missing Semester", "https://missing.csail.mit.edu/2020/shell-tools/", "course"),
    r("Pipes — Linux Journey", "https://linuxjourney.com/lesson/pipe-redirection", "course"),
  ],
  "scripting patterns": [
    r("Bash scripting patterns — The Missing Semester", "https://missing.csail.mit.edu/2020/shell-scripting/", "course"),
    r("Shell scripting — Linux Journey", "https://linuxjourney.com/lesson/scripting", "course"),
  ],
  "networking commands": [
    r("Network tools — The Missing Semester", "https://missing.csail.mit.edu/", "course"),
    r("ping, curl & traceroute — freeCodeCamp", "https://www.freecodecamp.org/news/linux-networking-commands/", "article"),
  ],
  curl: [
    r("curl documentation", "https://curl.se/docs/", "docs"),
    r("curl tutorial — freeCodeCamp", "https://www.freecodecamp.org/news/curl-command-examples/", "article"),
  ],
  "package management": [
    r("npm documentation", "https://docs.npmjs.com/", "docs"),
    r("pip documentation", "https://pip.pypa.io/en/stable/", "docs"),
    r("apt — Ubuntu docs", "https://help.ubuntu.com/community/AptGet/Howto", "docs"),
  ],
  "job control": [
    r("Job control — The Missing Semester", "https://missing.csail.mit.edu/2020/course-shell/", "course"),
    r("bg, fg & jobs — Linux Journey", "https://linuxjourney.com/lesson/processes", "course"),
  ],
  "configuration management": [
    r("Ansible documentation", "https://docs.ansible.com/", "docs"),
    r("Configuration management — Red Hat", "https://www.redhat.com/en/topics/automation/what-is-configuration-management", "article"),
  ],
  "environment setup": [
    r("Python environments — official docs", "https://docs.python.org/3/tutorial/venv.html", "docs"),
    r("VS Code setup — official docs", "https://code.visualstudio.com/docs/setup/setup-overview", "docs"),
  ],
  "environment promotion": [
    r("Deployment environments — AWS", "https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/environments.html", "docs"),
    r("CI/CD environments — Microsoft Learn", "https://learn.microsoft.com/en-us/azure/devops/pipelines/", "docs"),
  ],
  "configuration files": [
    r("dotfiles — freeCodeCamp", "https://www.freecodecamp.org/news/dotfiles-what-is-a-dot-file-and-how-to-create-it-in-mac-and-linux/", "article"),
    r("Config files — Linux Journey", "https://linuxjourney.com/lesson/configuration-files", "course"),
  ],

  // ── data / ML ──────────────────────────────────────────────────────────────
  "python for data science": [
    r("Python for data science — Kaggle", "https://www.kaggle.com/learn/python", "course"),
    r("Python for Data Science — freeCodeCamp", "https://www.freecodecamp.org/learn/data-analysis-with-python/", "course"),
    r("NumPy quickstart", "https://numpy.org/doc/stable/user/quickstart.html", "docs"),
  ],
  "data science workflow": [
    r("Data science process — freeCodeCamp", "https://www.freecodecamp.org/news/data-science/", "article"),
    r("Kaggle — how data science works", "https://www.kaggle.com/learn/intro-to-data-science", "course"),
  ],
  "key functions methods": [
    r("Pandas API reference", "https://pandas.pydata.org/docs/reference/", "docs"),
    r("Pandas — Kaggle micro-course", "https://www.kaggle.com/learn/pandas", "course"),
  ],
  "loading cleaning data": [
    r("Cleaning data — Kaggle", "https://www.kaggle.com/learn/data-cleaning", "course"),
    r("Pandas — cleaning data", "https://pandas.pydata.org/docs/getting_started/intro_tutorials/", "course"),
  ],
  "transforming filtering": [
    r("Pandas — filtering", "https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html", "course"),
    r("Data wrangling — Kaggle", "https://www.kaggle.com/learn/data-cleaning", "course"),
  ],
  "training evaluation": [
    r("Model validation — Kaggle", "https://www.kaggle.com/learn/machine-learning", "course"),
    r("Cross-validation — scikit-learn", "https://scikit-learn.org/stable/modules/cross_validation.html", "docs"),
  ],
  "pipelines automation": [
    r("Pipelines — scikit-learn", "https://scikit-learn.org/stable/modules/pipeline.html", "docs"),
    r("Data pipelines — freeCodeCamp", "https://www.freecodecamp.org/news/data-engineering/", "article"),
  ],
  "ethics bias": [
    r("Responsible AI — Google", "https://ai.google/responsibility/", "docs"),
    r("Fairness — Microsoft Learn", "https://learn.microsoft.com/en-us/azure/architecture/guide/responsible-ai/", "docs"),
  ],
  "statistics ml fundamentals": [
    r("Statistics — Kaggle micro-course", "https://www.kaggle.com/learn/statistics", "course"),
    r("Statistics & probability — Khan Academy", "https://www.khanacademy.org/math/statistics-probability", "course"),
  ],
  "datasets communities": [
    r("Kaggle datasets", "https://www.kaggle.com/datasets", "practice"),
    r("Hugging Face datasets", "https://huggingface.co/datasets", "practice"),
    r("Google Dataset Search", "https://datasetsearch.research.google.com/", "practice"),
  ],
  "monitoring drift": [
    r("Model monitoring — Evidently", "https://www.evidentlyai.com/ml-system-design", "article"),
    r("Concept drift — Wikipedia", "https://en.wikipedia.org/wiki/Concept_drift", "article"),
  ],
  "reporting and tracking": [
    r("MLflow documentation", "https://mlflow.org/docs/latest/index.html", "docs"),
    r("Experiment tracking — Neptune", "https://neptune.ai/blog/ml-experiment-tracking", "article"),
  ],
  probability: [
    r("Probability — Khan Academy", "https://www.khanacademy.org/math/statistics-probability/probability-library", "course"),
    r("Probability — 3Blue1Brown (video)", "https://www.youtube.com/watch?v=r6sGWTCMz2k", "video"),
  ],
  distributions: [
    r("Probability distributions — Khan Academy", "https://www.khanacademy.org/math/statistics-probability/modeling-distributions-of-data", "course"),
    r("Common distributions — Wikipedia", "https://en.wikipedia.org/wiki/List_of_probability_distributions", "article"),
  ],
  sampling: [
    r("Sampling — Khan Academy", "https://www.khanacademy.org/math/statistics-probability/sampling-distributions-library", "course"),
    r("Sampling methods — Wikipedia", "https://en.wikipedia.org/wiki/Sampling_(statistics)", "article"),
  ],

  // ── databases ──────────────────────────────────────────────────────────────
  "sql basics": [
    r("SQL tutorial — W3Schools", "https://www.w3schools.com/sql/", "course"),
    r("SQLBolt (interactive)", "https://sqlbolt.com/", "practice"),
    r("SQL — GeeksforGeeks", "https://www.geeksforgeeks.org/sql-tutorial/", "article"),
  ],
  "select and filtering": [
    r("SELECT — W3Schools", "https://www.w3schools.com/sql/sql_select.asp", "course"),
    r("SELECT queries — SQLZoo", "https://sqlzoo.net/wiki/SELECT_basics", "course"),
    r("WHERE — PostgreSQL docs", "https://www.postgresql.org/docs/current/queries-table-expressions.html", "docs"),
  ],
  joins: [
    r("SQL JOIN — W3Schools", "https://www.w3schools.com/sql/sql_join.asp", "course"),
    r("Joins — PostgreSQL docs", "https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN", "docs"),
    r("SQL JOINs — GeeksforGeeks", "https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/", "article"),
  ],
  "aggregations and group by": [
    r("GROUP BY — W3Schools", "https://www.w3schools.com/sql/sql_groupby.asp", "course"),
    r("Aggregate functions — PostgreSQL docs", "https://www.postgresql.org/docs/current/functions-aggregate.html", "docs"),
  ],
  "subqueries and ctes": [
    r("Subqueries — W3Schools", "https://www.w3schools.com/sql/sql_subqueries.asp", "course"),
    r("WITH queries (CTEs) — PostgreSQL docs", "https://www.postgresql.org/docs/current/queries-with.html", "docs"),
  ],
  "indexes and performance": [
    r("Indexes — PostgreSQL docs", "https://www.postgresql.org/docs/current/indexes.html", "docs"),
    r("SQL performance — freeCodeCamp", "https://www.freecodecamp.org/news/sql-performance-tuning/", "article"),
  ],
  indexes: [
    r("Indexes — PostgreSQL docs", "https://www.postgresql.org/docs/current/indexes.html", "docs"),
    r("Database indexing — freeCodeCamp", "https://www.freecodecamp.org/news/database-indexing-at-a-glance/", "article"),
  ],
  "data modeling": [
    r("Data modeling — Vertabelo", "https://vertabelo.com/blog/data-modeling/", "article"),
    r("Database design — freeCodeCamp", "https://www.freecodecamp.org/news/database-design/", "article"),
  ],
  "tables schema": [
    r("CREATE TABLE — W3Schools", "https://www.w3schools.com/sql/sql_create_table.asp", "course"),
    r("Schemas — PostgreSQL docs", "https://www.postgresql.org/docs/current/ddl-schemas.html", "docs"),
  ],
  "crud operations": [
    r("SQL CRUD — W3Schools", "https://www.w3schools.com/sql/sql_insert.asp", "course"),
    r("CRUD operations — freeCodeCamp", "https://www.freecodecamp.org/news/crud-operations-explained/", "article"),
  ],
  "first connection": [
    r("Connecting to PostgreSQL — official docs", "https://www.postgresql.org/docs/current/tutorial-accessdb.html", "docs"),
    r("MongoDB connection — official docs", "https://www.mongodb.com/docs/drivers/", "docs"),
  ],
  "cli gui tools": [
    r("psql — PostgreSQL docs", "https://www.postgresql.org/docs/current/app-psql.html", "docs"),
    r("MongoDB Shell — official docs", "https://www.mongodb.com/docs/mongodb-shell/", "docs"),
  ],
  transactions: [
    r("Transactions — PostgreSQL docs", "https://www.postgresql.org/docs/current/tutorial-transactions.html", "docs"),
    r("ACID — Wikipedia", "https://en.wikipedia.org/wiki/ACID", "article"),
  ],
  "backup recovery": [
    r("Backup & restore — PostgreSQL docs", "https://www.postgresql.org/docs/current/backup.html", "docs"),
    r("MongoDB backup — official docs", "https://www.mongodb.com/docs/manual/core/backups/", "docs"),
  ],

  // ── frontend / web ─────────────────────────────────────────────────────────
  "forms validation": [
    r("Form validation — MDN", "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation", "course"),
    r("Forms — W3Schools", "https://www.w3schools.com/html/html_forms.asp", "course"),
    r("Client-side validation — web.dev", "https://web.dev/learn/forms/validation/", "course"),
  ],
  "components templates": [
    r("Components — React docs", "https://react.dev/learn/your-first-component", "docs"),
    r("Components — Vue docs", "https://vuejs.org/guide/essentials/component-basics.html", "docs"),
  ],
  "props data flow": [
    r("Passing props — React docs", "https://react.dev/learn/passing-props-to-a-component", "docs"),
    r("Props — Vue docs", "https://vuejs.org/guide/components/props.html", "docs"),
  ],
  "css preprocessors": [
    r("Sass documentation", "https://sass-lang.com/documentation/", "docs"),
    r("CSS preprocessors — freeCodeCamp", "https://www.freecodecamp.org/news/css-preprocessors/", "article"),
  ],
  "data fetching apis": [
    r("Fetch API — MDN", "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API", "docs"),
    r("Data fetching — React docs", "https://react.dev/learn/you-might-not-need-an-effect#fetching-data", "docs"),
    r("REST APIs — freeCodeCamp", "https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/", "article"),
  ],
  "url query state": [
    r("URLSearchParams — MDN", "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams", "docs"),
    r("Query parameters — Next.js docs", "https://nextjs.org/docs/app/api-reference/functions/use-search-params", "docs"),
  ],
  "caching streaming": [
    r("Caching — web.dev", "https://web.dev/articles/http-cache", "article"),
    r("Streaming — Next.js docs", "https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming", "docs"),
  ],
  "code splitting bundling": [
    r("Code splitting — web.dev", "https://web.dev/articles/reduce-javascript-payloads-with-code-splitting", "article"),
    r("Code splitting — React docs", "https://react.dev/reference/react/lazy", "docs"),
    r("Webpack documentation", "https://webpack.js.org/guides/code-splitting/", "docs"),
  ],
  breakpoints: [
    r("Media queries — MDN", "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries", "docs"),
    r("Responsive design — web.dev", "https://web.dev/learn/design/", "course"),
  ],
  "responsive images": [
    r("Responsive images — MDN", "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images", "course"),
    r("Images — web.dev", "https://web.dev/learn/images", "course"),
  ],
  "lazy loading": [
    r("Lazy loading — web.dev", "https://web.dev/articles/browser-level-image-lazy-loading", "article"),
    r("Loading performance — MDN", "https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading", "docs"),
  ],
  "cdn and caching": [
    r("CDN — Cloudflare", "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/", "article"),
    r("HTTP caching — MDN", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching", "docs"),
  ],
  compression: [
    r("Compression — web.dev", "https://web.dev/articles/compress-images", "article"),
    r("Gzip — MDN", "https://developer.mozilla.org/en-US/docs/Glossary/GZip_compression", "docs"),
  ],
  "color contrast": [
    r("Contrast — web.dev", "https://web.dev/learn/accessibility/color-and-contrast/", "course"),
    r("WCAG contrast — W3C", "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html", "docs"),
  ],
  "color theory": [
    r("Color theory — Canva", "https://www.canva.com/learn/color-theory/", "article"),
    r("Color — Adobe Color", "https://color.adobe.com/create/color-wheel", "practice"),
    r("Color basics — NN/g", "https://www.nngroup.com/articles/color/", "article"),
  ],
  typography: [
    r("Typography — NN/g", "https://www.nngroup.com/articles/typography-terms-ux/", "article"),
    r("Practical typography", "https://practicaltypography.com/", "book"),
    r("Type — Google Fonts", "https://fonts.google.com/knowledge", "article"),
  ],
  "gestalt principles": [
    r("Gestalt principles — NN/g", "https://www.nngroup.com/articles/gestalt-principles/", "article"),
    r("Gestalt theory — Interaction Design Foundation", "https://www.interaction-design.org/literature/topics/gestalt-principles", "article"),
  ],
  whitespace: [
    r("Whitespace — NN/g", "https://www.nngroup.com/articles/white-space/", "article"),
    r("Whitespace in design — Canva", "https://www.canva.com/learn/white-space-design/", "article"),
  ],
  "project scaffolding": [
    r("Create React App — Vite", "https://vitejs.dev/guide/", "docs"),
    r("Next.js create app", "https://nextjs.org/docs/app/getting-started/installation", "docs"),
  ],
  "dev server tooling": [
    r("Vite dev server", "https://vitejs.dev/guide/", "docs"),
    r("Webpack dev server", "https://webpack.js.org/configuration/dev-server/", "docs"),
  ],
  "security best practices": [
    r("Web security — MDN", "https://developer.mozilla.org/en-US/docs/Web/Security", "docs"),
    r("OWASP Top 10", "https://owasp.org/www-project-top-ten/", "docs"),
    r("Security — web.dev", "https://web.dev/learn/security/", "course"),
  ],
  injection: [
    r("Injection — OWASP Top 10", "https://owasp.org/www-project-top-ten/", "docs"),
    r("SQL injection — PortSwigger", "https://portswigger.net/web-security/sql-injection", "course"),
    r("Injection — MDN security", "https://developer.mozilla.org/en-US/docs/Web/Security", "docs"),
  ],
  "insecure design": [
    r("Insecure design — OWASP Top 10", "https://owasp.org/Top10/A04_2021-Insecure_Design/", "docs"),
    r("Threat modeling — OWASP", "https://owasp.org/www-community/Threat_Modeling", "docs"),
  ],
  "access control": [
    r("Access control — OWASP", "https://owasp.org/www-community/Access_Control", "docs"),
    r("Broken access control — PortSwigger", "https://portswigger.net/web-security/access-control", "course"),
  ],
  "post exploitation": [
    r("Post-exploitation — Wikipedia", "https://en.wikipedia.org/wiki/Post-exploitation", "article"),
    r("Privilege escalation — TryHackMe", "https://tryhackme.com/room/linuxprivesc", "practice"),
  ],
  "digital forensics": [
    r("Digital forensics — NIST", "https://www.nist.gov/cyberframework", "docs"),
    r("Forensics — TryHackMe", "https://tryhackme.com/module/cyber-defence", "practice"),
  ],
  "malware analysis": [
    r("Malware analysis — MITRE ATT&CK", "https://attack.mitre.org/", "docs"),
    r("Malware analysis — TryHackMe", "https://tryhackme.com/module/malware-analysis", "practice"),
  ],
  encryption: [
    r("Encryption — Cloudflare", "https://www.cloudflare.com/learning/ssl/what-is-encryption/", "article"),
    r("Cryptography — Khan Academy", "https://www.khanacademy.org/computing/computer-science/cryptography", "course"),
  ],
  "symmetric asymmetric crypto": [
    r("Symmetric vs asymmetric — Cloudflare", "https://www.cloudflare.com/learning/ssl/what-is-asymmetric-encryption/", "article"),
    r("Cryptography — Khan Academy", "https://www.khanacademy.org/computing/computer-science/cryptography", "course"),
  ],
  "hashing signatures": [
    r("Hashing — Cloudflare", "https://www.cloudflare.com/learning/ssl/what-is-a-cryptographic-hash/", "article"),
    r("Digital signatures — Wikipedia", "https://en.wikipedia.org/wiki/Digital_signature", "article"),
  ],
  "tls pki": [
    r("TLS — Cloudflare", "https://www.cloudflare.com/learning/ssl/what-is-ssl/", "article"),
    r("PKI — Wikipedia", "https://en.wikipedia.org/wiki/Public_key_infrastructure", "article"),
    r("HTTPS — MDN", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", "docs"),
  ],
  osint: [
    r("OSINT framework", "https://osintframework.com/", "cheatsheet"),
    r("OSINT — TryHackMe", "https://tryhackme.com/module/osint-fundamentals", "practice"),
  ],
  "information gathering": [
    r("Reconnaissance — OWASP", "https://owasp.org/www-community/Reconnaissance", "docs"),
    r("Passive recon — TryHackMe", "https://tryhackme.com/module/passive-reconnaissance", "practice"),
  ],
  "scanning enumeration": [
    r("Nmap documentation", "https://nmap.org/book/man.html", "docs"),
    r("Enumeration — TryHackMe", "https://tryhackme.com/module/intro-to-network-security", "practice"),
  ],
  "vulnerability analysis": [
    r("Vulnerability research — TryHackMe", "https://tryhackme.com/module/vulnerability-research", "practice"),
    r("CVE database — NVD", "https://nvd.nist.gov/vuln/search", "docs"),
  ],
  "exploitation techniques": [
    r("Exploitation — TryHackMe", "https://tryhackme.com/module/hacking-essentials", "practice"),
    r("ExploitDB", "https://www.exploit-db.com/", "practice"),
  ],
  "detection monitoring": [
    r("Detection — MITRE ATT&CK", "https://attack.mitre.org/", "docs"),
    r("SOC monitoring — TryHackMe", "https://tryhackme.com/module/cyber-defence", "practice"),
  ],
  hardening: [
    r("System hardening — CIS benchmarks", "https://www.cisecurity.org/cis-benchmarks", "docs"),
    r("Server hardening — OWASP", "https://owasp.org/www-project-web-security-testing-guide/", "docs"),
  ],
  "reverse engineering": [
    r("Reverse engineering resources — GitHub", "https://github.com/wtsxDev/reverse-engineering", "repo"),
    r("RE — TryHackMe", "https://tryhackme.com/module/reverse-engineering", "practice"),
  ],
  "legal ethical boundaries": [
    r("Ethics — EC-Council", "https://www.eccouncil.org/cybersecurity-exchange/", "article"),
    r("Legal & ethics — TryHackMe", "https://tryhackme.com/room/legalconsiderations", "practice"),
  ],
  "vulnerability disclosure": [
    r("Responsible disclosure — OWASP", "https://owasp.org/www-community/vulnerability_disclosure_charter", "docs"),
    r("Bug bounty programs — HackerOne", "https://www.hackerone.com/vulnerability-coordination", "article"),
  ],
  "hands on challenge practice": [
    r("TryHackMe", "https://tryhackme.com/", "practice"),
    r("Hack The Box", "https://www.hackthebox.com/", "practice"),
  ],
  "methodology walkthroughs": [
    r("PTES — Penetration Testing Execution Standard", "http://www.pentest-standard.org/", "docs"),
    r("OWASP Testing Guide", "https://owasp.org/www-project-web-security-testing-guide/", "docs"),
  ],
  "ctf platforms communities": [
    r("CTFtime", "https://ctftime.org/", "community"),
    r("Hack The Box — CTF", "https://www.hackthebox.com/hacker/ctf", "practice"),
  ],
  "beginner lab exercises": [
    r("TryHackMe — beginner paths", "https://tryhackme.com/paths", "practice"),
    r("OverTheWire wargames", "https://overthewire.org/wargames/", "practice"),
  ],
  "ctf challenges": [
    r("CTFtime — upcoming CTFs", "https://ctftime.org/", "community"),
    r("PicoCTF", "https://picoctf.org/", "practice"),
  ],
  "real world case studies": [
    r("Bug bounty write-ups — HackerOne", "https://www.hackerone.com/resources", "article"),
    r("Security case studies — Krebs", "https://krebsonsecurity.com/", "article"),
  ],
  "network security": [
    r("Network security — TryHackMe", "https://tryhackme.com/module/intro-to-network-security", "practice"),
    r("Network security — Wikipedia", "https://en.wikipedia.org/wiki/Network_security", "article"),
  ],
  security: [
    r("Web security — MDN", "https://developer.mozilla.org/en-US/docs/Web/Security", "docs"),
    r("OWASP Top 10", "https://owasp.org/www-project-top-ten/", "docs"),
    r("Security — TryHackMe", "https://tryhackme.com/", "practice"),
  ],

  // ── cloud / devops ─────────────────────────────────────────────────────────
  "cloud fundamentals": [
    r("Cloud concepts — Microsoft Learn", "https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/", "course"),
    r("What is cloud computing — AWS", "https://aws.amazon.com/what-is-cloud-computing/", "article"),
    r("Cloud computing — freeCodeCamp", "https://www.freecodecamp.org/news/cloud-computing/", "article"),
  ],
  "serverless managed services": [
    r("Serverless — AWS", "https://aws.amazon.com/serverless/", "docs"),
    r("Serverless computing — Microsoft Learn", "https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree", "docs"),
  ],
  "containerization": [
    r("Docker documentation", "https://docs.docker.com/", "docs"),
    r("Containers explained — Google", "https://cloud.google.com/learn/what-are-containers", "article"),
  ],
  orchestration: [
    r("Kubernetes documentation", "https://kubernetes.io/docs/", "docs"),
    r("Container orchestration — Google Cloud", "https://cloud.google.com/learn/what-is-container-orchestration", "article"),
  ],
  "pipeline design": [
    r("CI/CD pipelines — Microsoft Learn", "https://learn.microsoft.com/en-us/azure/devops/pipelines/", "docs"),
    r("GitHub Actions documentation", "https://docs.github.com/en/actions", "docs"),
  ],
  "build test automation": [
    r("GitHub Actions — building", "https://docs.github.com/en/actions", "docs"),
    r("Jenkins documentation", "https://www.jenkins.io/doc/", "docs"),
  ],
  "alerting incident response": [
    r("Incident response — Google SRE", "https://sre.google/sre-book/incident-response/", "book"),
    r("PagerDuty incident response", "https://response.pagerduty.com/", "docs"),
  ],
  "slos reliability": [
    r("SLOs — Google SRE", "https://sre.google/sre-book/service-level-objectives/", "book"),
    r("SLOs — Grafana", "https://grafana.com/blog/2023/04/05/what-is-an-slo/", "article"),
  ],
  observability: [
    r("Observability — Grafana", "https://grafana.com/docs/", "docs"),
    r("Observability — Honeycomb", "https://www.honeycomb.io/blog/what-is-observability", "article"),
  ],
  postmortems: [
    r("Postmortem culture — Google SRE", "https://sre.google/sre-book/postmortem-culture/", "book"),
    r("Blameless postmortems — Atlassian", "https://www.atlassian.com/incident-management/postmortem", "article"),
  ],

  // ── engineering / CAD ──────────────────────────────────────────────────────
  "core sciences": [
    r("Khan Academy — science", "https://www.khanacademy.org/science", "course"),
    r("MIT OpenCourseWare", "https://ocw.mit.edu/", "course"),
  ],
  thermodynamics: [
    r("Thermodynamics — Khan Academy", "https://www.khanacademy.org/science/physics/thermodynamics", "course"),
    r("Thermodynamics — MIT OCW", "https://ocw.mit.edu/search/?d=Mechanical%20Engineering", "course"),
  ],
  calculus: [
    r("Calculus — Khan Academy", "https://www.khanacademy.org/math/calculus-1", "course"),
    r("Calculus — MIT OCW", "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/", "course"),
  ],
  mathematics: [
    r("Math — Khan Academy", "https://www.khanacademy.org/math", "course"),
    r("Mathematics — MIT OCW", "https://ocw.mit.edu/", "course"),
  ],
  algebra: [
    r("Algebra — Khan Academy", "https://www.khanacademy.org/math/algebra", "course"),
  ],
  "physics mechanics": [
    r("Physics — Khan Academy", "https://www.khanacademy.org/science/physics", "course"),
    r("Mechanics — MIT OCW", "https://ocw.mit.edu/courses/physics/", "course"),
  ],
  kinematics: [
    r("Kinematics — Khan Academy", "https://www.khanacademy.org/science/physics/one-dimensional-motion", "course"),
  ],
  "forces and newton s laws": [
    r("Newton's laws — Khan Academy", "https://www.khanacademy.org/science/physics/forces-newtons-laws", "course"),
  ],
  fluids: [
    r("Fluids — Khan Academy", "https://www.khanacademy.org/science/physics/fluids", "course"),
    r("Fluid mechanics — MIT OCW", "https://ocw.mit.edu/courses/2-06-fluid-dynamics-spring-2013/", "course"),
  ],
  "circuit analysis": [
    r("Circuit analysis — Khan Academy", "https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic", "course"),
    r("All About Circuits", "https://www.allaboutcircuits.com/textbook/", "book"),
  ],
  "ohm s and kirchhoff s laws": [
    r("Ohm's law — Khan Academy", "https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-resistor-circuits/a/ee-ohms-law", "course"),
    r("Kirchhoff's laws — Khan Academy", "https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-dc-circuit-analysis/a/ee-kirchhoffs-laws", "course"),
  ],
  "series and parallel circuits": [
    r("Series & parallel — Khan Academy", "https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-resistor-circuits/a/ee-series-and-parallel-resistors", "course"),
  ],
  "thevenin and norton equivalents": [
    r("Thévenin's theorem — Khan Academy", "https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-resistor-circuits/a/ee-thevenin-norton", "course"),
  ],
  "ac analysis": [
    r("AC circuits — Khan Academy", "https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-ac-analysis", "course"),
  ],
  "sinusoidal steady state": [
    r("Sinusoidal steady state — MIT OCW", "https://ocw.mit.edu/courses/6-071j-introduction-to-electronics-signals-and-measurement-spring-2006/", "course"),
  ],
  "power calculations": [
    r("Power — All About Circuits", "https://www.allaboutcircuits.com/textbook/alternating-current/", "book"),
    r("Electric power — Khan Academy", "https://www.khanacademy.org/science/physics/circuits-topic", "course"),
  ],
  "signal conditioning": [
    r("Signal conditioning — NI", "https://www.ni.com/en/shop/data-acquisition/signal-conditioning.html", "docs"),
    r("Signals — Khan Academy", "https://www.khanacademy.org/science/electrical-engineering/ee-signals", "course"),
  ],
  "computer architecture": [
    r("Computer architecture — MIT OCW", "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", "course"),
    r("Nand2Tetris", "https://www.nand2tetris.org/", "course"),
  ],
  "memory management": [
    r("Memory management — Wikipedia", "https://en.wikipedia.org/wiki/Memory_management", "article"),
    r("Memory — Nand2Tetris", "https://www.nand2tetris.org/course", "course"),
  ],
  "memory hierarchy": [
    r("Memory hierarchy — Wikipedia", "https://en.wikipedia.org/wiki/Memory_hierarchy", "article"),
    r("Computer architecture — MIT OCW", "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", "course"),
  ],
  storage: [
    r("Storage — AWS", "https://aws.amazon.com/products/storage/", "docs"),
    r("Computer storage — Wikipedia", "https://en.wikipedia.org/wiki/Computer_data_storage", "article"),
  ],
  "engineering drawing": [
    r("Engineering drawing — Wikipedia", "https://en.wikipedia.org/wiki/Engineering_drawing", "article"),
    r("Technical drawing — MIT OCW", "https://ocw.mit.edu/", "course"),
  ],
  "orthographic projection": [
    r("Orthographic projection — Wikipedia", "https://en.wikipedia.org/wiki/Orthographic_projection", "article"),
    r("Engineering graphics — MIT OCW", "https://ocw.mit.edu/", "course"),
  ],
  "isometric views": [
    r("Isometric projection — Wikipedia", "https://en.wikipedia.org/wiki/Isometric_projection", "article"),
  ],
  "dimensioning and tolerancing": [
    r("GD&T basics — ASME", "https://www.asme.org/", "docs"),
    r("Dimensioning — Wikipedia", "https://en.wikipedia.org/wiki/Dimension", "article"),
  ],
  "sections and details": [
    r("Section drawings — Wikipedia", "https://en.wikipedia.org/wiki/Section_(architecture)", "article"),
  ],
  "cad practice": [
    r("CAD exercises — CADDEXpert", "https://www.cad-elearning.com/", "practice"),
    r("Autodesk Learn", "https://www.autodesk.com/learn", "course"),
  ],
  "resource modeling": [
    r("Resource modeling — Wikipedia", "https://en.wikipedia.org/wiki/Resource_modeling", "article"),
    r("GIS modeling — Esri", "https://learn.arcgis.com/", "course"),
  ],
  "installation system requirements": [
    r("Autodesk system requirements", "https://knowledge.autodesk.com/support/system-requirements", "docs"),
    r("MathWorks system requirements", "https://www.mathworks.com/support/requirements/", "docs"),
  ],
  "licensing setup": [
    r("Autodesk licensing", "https://knowledge.autodesk.com/support/manage-autodesk-software", "docs"),
    r("MathWorks licenses", "https://www.mathworks.com/help/install/", "docs"),
  ],
  "first launch configuration": [
    r("AutoCAD getting started — Autodesk", "https://knowledge.autodesk.com/support/autocad", "docs"),
    r("Fusion 360 getting started", "https://help.autodesk.com/view/fusion360/ENU/", "docs"),
  ],
  "workspace panels": [
    r("AutoCAD interface — Autodesk", "https://knowledge.autodesk.com/support/autocad/learn-explore/caas/CloudHelp/cloudhelp/2024/ENU/AutoCAD-Core/files/GUID-79A82819-D578-4B32-A7FC-6CBCEC7026A4-htm.html", "docs"),
    r("Revit interface — Autodesk", "https://knowledge.autodesk.com/support/revit", "docs"),
  ],
  "toolbars shortcuts": [
    r("AutoCAD shortcuts — Autodesk", "https://www.autodesk.com/shortcuts/autocad", "cheatsheet"),
    r("Revit shortcuts — Autodesk", "https://www.autodesk.com/shortcuts/revit", "cheatsheet"),
  ],
  "units project setup": [
    r("Setting up units — Autodesk", "https://knowledge.autodesk.com/support/autocad", "docs"),
    r("Project units — Revit", "https://knowledge.autodesk.com/support/revit", "docs"),
  ],
  "core modeling drawing tools": [
    r("Drawing tools — Autodesk", "https://knowledge.autodesk.com/support/autocad", "docs"),
    r("AutoCAD tutorials — Autodesk Learn", "https://www.autodesk.com/learn/onboarding/overview/experience/learn-autocad", "course"),
  ],
  "editing modification tools": [
    r("Modify tools — Autodesk", "https://knowledge.autodesk.com/support/autocad", "docs"),
  ],
  "beginner workflow": [
    r("AutoCAD guided tutorials", "https://www.autodesk.com/learn/onboarding/overview/experience/learn-autocad", "course"),
    r("Fusion 360 tutorials", "https://www.autodesk.com/learn/onboarding/overview/experience/learn-fusion-360", "course"),
  ],
  "templates libraries": [
    r("Templates — Autodesk", "https://knowledge.autodesk.com/support/autocad", "docs"),
  ],
  "advanced modeling techniques": [
    r("Advanced modeling — Autodesk Learn", "https://www.autodesk.com/learn", "course"),
    r("SOLIDWORKS advanced — official", "https://www.solidworks.com/support/learn", "course"),
  ],
  "automation customization": [
    r("AutoLISP — Autodesk", "https://help.autodesk.com/view/ACD/2024/ENU/?guid=GUID-73DF3B94-F06E-4A39-B739-70833CCB6E16", "docs"),
    r("Fusion API — Autodesk", "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-A92A4B10-3789-4E4A-904A-7C8F3E4A9E71", "docs"),
  ],
  "interoperability formats": [
    r("File formats — Autodesk", "https://knowledge.autodesk.com/support/autocad", "docs"),
    r("STEP/IGES — Wikipedia", "https://en.wikipedia.org/wiki/ISO_10303", "article"),
  ],
  "documentation deliverables": [
    r("Drawing sheets — Autodesk", "https://knowledge.autodesk.com/support/autocad", "docs"),
  ],
  "quality review": [
    r("Design review — Autodesk", "https://www.autodesk.com/solutions/design-review", "article"),
  ],
  "efficiency tips shortcuts": [
    r("AutoCAD shortcuts", "https://www.autodesk.com/shortcuts/autocad", "cheatsheet"),
    r("SOLIDWORKS shortcuts", "https://www.solidworks.com/support/learn", "cheatsheet"),
  ],
  "best practices": [
    r("Design best practices — Autodesk", "https://www.autodesk.com/learn", "course"),
    r("Engineering best practices — Engineering Toolbox", "https://www.engineeringtoolbox.com/", "cheatsheet"),
  ],
  "vendor training community": [
    r("Autodesk University", "https://www.autodesk.com/autodesk-university/", "course"),
    r("SOLIDWORKS community", "https://forum.solidworks.com/", "community"),
  ],
  "history philosophy": [
    r("History of computing — Wikipedia", "https://en.wikipedia.org/wiki/History_of_computing", "article"),
    r("Philosophy of CS — MIT OCW", "https://ocw.mit.edu/", "course"),
  ],

  // ── design tools ───────────────────────────────────────────────────────────
  "layers organization": [
    r("Figma layers — help center", "https://help.figma.com/hc/en-us/articles/360041488373-Layers", "docs"),
    r("Layer organization — Photoshop help", "https://helpx.adobe.com/photoshop/using/layers.html", "docs"),
  ],
  "components and variants": [
    r("Components — Figma", "https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma", "docs"),
    r("Variants — Figma", "https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants", "docs"),
  ],
  "examples and code": [
    r("CodePen", "https://codepen.io/", "practice"),
    r("Figma community files", "https://www.figma.com/community", "community"),
  ],
  budgeting: [
    r("Budgeting basics — Khan Academy", "https://www.khanacademy.org/college-careers-more/personal-finance", "course"),
    r("Personal budget — NerdWallet", "https://www.nerdwallet.com/article/finance/how-to-budget", "article"),
  ],
  "reporting and tracking": [
    r("Project tracking — Atlassian", "https://www.atlassian.com/software/jira/guides", "course"),
    r("Excel tracking — Microsoft Learn", "https://learn.microsoft.com/en-us/training/excel/", "course"),
  ],
  "collaboration": [
    r("Collaboration — Atlassian", "https://www.atlassian.com/work-management/collaboration", "article"),
    r("Figma multiplayer — help center", "https://help.figma.com/hc/en-us/articles/360039818874-Collaborate-in-Figma", "docs"),
  ],
  "evaluation": [
    r("Evaluation methods — Wikipedia", "https://en.wikipedia.org/wiki/Evaluation", "article"),
    r("Usability testing — NN/g", "https://www.nngroup.com/articles/usability-testing-101/", "article"),
  ],
  applications: [
    r("Industry applications — O*NET", "https://www.onetonline.org/", "docs"),
    r("Use cases — Wikipedia", "https://en.wikipedia.org/wiki/Use_case", "article"),
  ],
  publishing: [
    r("Web publishing — web.dev", "https://web.dev/learn/", "course"),
    r("Publishing — Vercel docs", "https://vercel.com/docs", "docs"),
  ],
  "community etiquette": [
    r("Stack Overflow etiquette", "https://stackoverflow.com/help/how-to-ask", "docs"),
    r("Open source etiquette — GitHub", "https://opensource.guide/how-to-contribute/", "docs"),
  ],
  "community tutorials": [
    r("freeCodeCamp — community tutorials", "https://www.freecodecamp.org/news/", "article"),
    r("Dev.to — tutorials", "https://dev.to/", "community"),
  ],
  "advanced scenarios": [
    r("Advanced topics — MDN", "https://developer.mozilla.org/en-US/docs/Web/Guide", "docs"),
    r("MIT OpenCourseWare", "https://ocw.mit.edu/", "course"),
  ],
  "advanced problems": [
    r("LeetCode — advanced problems", "https://leetcode.com/problemset/", "practice"),
    r("Codeforces problemset", "https://codeforces.com/problemset", "practice"),
  ],
  "advanced projects": [
    r("Project ideas — freeCodeCamp", "https://www.freecodecamp.org/news/project-ideas/", "article"),
    r("GitHub — build & share", "https://github.com/", "practice"),
  ],
  "intermediate scenarios": [
    r("Practice scenarios — HackerRank", "https://www.hackerrank.com/domains", "practice"),
    r("Killercoda scenarios", "https://killercoda.com/playgrounds", "practice"),
  ],
  "hands on scenario practice": [
    r("Killercoda playgrounds", "https://killercoda.com/playgrounds", "practice"),
    r("Play with Docker", "https://labs.play-with-docker.com/", "practice"),
  ],
  "cli terminal": [
    r("Command line — The Missing Semester", "https://missing.csail.mit.edu/", "course"),
    r("Linux Journey — command line", "https://linuxjourney.com/lesson/the-shell", "course"),
  ],
  "essential commands": [
    r("Linux commands — Linux Journey", "https://linuxjourney.com/", "course"),
    r("Command line cheat sheet", "https://quickref.me/linux", "cheatsheet"),
  ],
  "scripting bash python": [
    r("Bash scripting — The Missing Semester", "https://missing.csail.mit.edu/2020/shell-scripting/", "course"),
    r("Python scripting — official docs", "https://docs.python.org/3/tutorial/", "course"),
  ],
  "networking fundamentals": [
    r("Networking — Khan Academy", "https://www.khanacademy.org/computing/computer-science/internet-intro", "course"),
    r("How the internet works — MDN", "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works", "docs"),
  ],
  networking: [
    r("Networking — Khan Academy", "https://www.khanacademy.org/computing/computer-science/internet-intro", "course"),
    r("Computer networks — freeCodeCamp", "https://www.freecodecamp.org/news/computer-networks-and-how-to-actually-understand-them/", "article"),
  ],
  dns: [
    r("What is DNS — Cloudflare", "https://www.cloudflare.com/learning/dns/what-is-dns/", "article"),
    r("DNS — Wikipedia", "https://en.wikipedia.org/wiki/Domain_Name_System", "article"),
  ],
  "setting up a lab vms containers": [
    r("VirtualBox documentation", "https://www.virtualbox.org/manual/", "docs"),
    r("Docker documentation", "https://docs.docker.com/", "docs"),
  ],
  "linux essentials": [
    r("Linux Journey", "https://linuxjourney.com/", "course"),
    r("The Missing Semester", "https://missing.csail.mit.edu/", "course"),
  ],
  "test design": [
    r("Test design techniques — ISTQB", "https://www.istqb.org/", "docs"),
    r("Test design — freeCodeCamp", "https://www.freecodecamp.org/news/software-testing/", "article"),
  ],
  "testing fundamentals": [
    r("Testing — freeCodeCamp", "https://www.freecodecamp.org/news/software-testing/", "article"),
    r("ISTQB — testing basics", "https://www.istqb.org/", "docs"),
  ],
  "python basics": [
    r("Python tutorial — official docs", "https://docs.python.org/3/tutorial/", "course"),
    r("Python — W3Schools", "https://www.w3schools.com/python/", "course"),
    r("Python — Real Python", "https://realpython.com/", "article"),
  ],
  "installation venv": [
    r("Virtual environments — Python docs", "https://docs.python.org/3/tutorial/venv.html", "docs"),
    r("Python installation — official", "https://docs.python.org/3/using/index.html", "docs"),
  ],
  "ide setup vs code": [
    r("VS Code — Python setup", "https://code.visualstudio.com/docs/python/python-tutorial", "docs"),
    r("VS Code setup — official docs", "https://code.visualstudio.com/docs/setup/setup-overview", "docs"),
  ],
  "syntax indentation": [
    r("Python syntax — official tutorial", "https://docs.python.org/3/tutorial/introduction.html", "course"),
    r("Python indentation — W3Schools", "https://www.w3schools.com/python/python_syntax.asp", "course"),
  ],
  "variables data types": [
    r("Python variables — official tutorial", "https://docs.python.org/3/tutorial/introduction.html", "course"),
    r("Python data types — official docs", "https://docs.python.org/3/library/stdtypes.html", "docs"),
  ],
  "strings f strings": [
    r("f-strings — Python docs", "https://docs.python.org/3/tutorial/inputoutput.html#tut-f-strings", "docs"),
    r("Python strings — W3Schools", "https://www.w3schools.com/python/python_strings.asp", "course"),
  ],
  "pointers memory": [
    r("C pointers — GeeksforGeeks", "https://www.geeksforgeeks.org/c-pointers/", "article"),
    r("Rust ownership — The Book", "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html", "book"),
  ],
  "arrays strings": [
    r("Arrays — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array", "docs"),
    r("Strings — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String", "docs"),
  ],
  "problem solving practice": [
    r("LeetCode", "https://leetcode.com/problemset/", "practice"),
    r("HackerRank", "https://www.hackerrank.com/domains", "practice"),
    r("Codewars", "https://www.codewars.com/", "practice"),
  ],
  "core concepts architecture": [
    r("System Design Primer", "https://github.com/donnemartin/system-design-primer", "repo"),
    r("Architecture — Microsoft Learn", "https://learn.microsoft.com/en-us/azure/architecture/", "docs"),
  ],
  "interfacing": [
    r("Interfacing — Wikipedia", "https://en.wikipedia.org/wiki/Interface_(computing)", "article"),
    r("REST APIs — MDN", "https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps", "course"),
  ],
  debugging: [
    r("Chrome DevTools — debugging", "https://developer.chrome.com/docs/devtools/javascript/", "docs"),
    r("Python debugging (pdb) — official docs", "https://docs.python.org/3/library/pdb.html", "docs"),
  ],
  performance: [
    r("Web performance — web.dev", "https://web.dev/learn/performance", "course"),
    r("Performance — MDN", "https://developer.mozilla.org/en-US/docs/Learn/Performance", "course"),
  ],
  "ide tooling": [
    r("VS Code docs", "https://code.visualstudio.com/docs", "docs"),
    r("JetBrains IDEs", "https://www.jetbrains.com/ides/", "docs"),
  ],
  "running debugging": [
    r("Chrome DevTools — debug JS", "https://developer.chrome.com/docs/devtools/javascript/", "docs"),
    r("Python debugging — official docs", "https://docs.python.org/3/library/pdb.html", "docs"),
  ],
  "syntax basics": [
    r("JavaScript basics — MDN", "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps", "course"),
    r("Python syntax — official tutorial", "https://docs.python.org/3/tutorial/introduction.html", "course"),
  ],
  "variables constants": [
    r("Variables — MDN", "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables", "docs"),
    r("Python variables — official tutorial", "https://docs.python.org/3/tutorial/introduction.html", "course"),
  ],
  "maps sets": [
    r("Map & Set — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map", "docs"),
    r("Python dictionaries — official docs", "https://docs.python.org/3/tutorial/datastructures.html#dictionaries", "docs"),
  ],
  "classes objects": [
    r("Classes — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes", "docs"),
    r("Python classes — official tutorial", "https://docs.python.org/3/tutorial/classes.html", "docs"),
  ],
  "file handling i o": [
    r("Python file I/O — official docs", "https://docs.python.org/3/tutorial/inputoutput.html", "docs"),
    r("Node.js file system", "https://nodejs.org/api/fs.html", "docs"),
  ],
  "modules imports": [
    r("JS modules — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", "docs"),
    r("Python modules — official docs", "https://docs.python.org/3/tutorial/modules.html", "docs"),
  ],
  libraries: [
    r("npm — official docs", "https://docs.npmjs.com/", "docs"),
    r("pip — official docs", "https://pip.pypa.io/en/stable/", "docs"),
  ],
  "code quality linting": [
    r("ESLint documentation", "https://eslint.org/docs/latest/", "docs"),
    r("Prettier documentation", "https://prettier.io/docs/en/", "docs"),
    r("Google style guides", "https://google.github.io/styleguide/", "docs"),
  ],
  "code style conventions": [
    r("Google style guides", "https://google.github.io/styleguide/", "docs"),
    r("Airbnb JavaScript style guide", "https://github.com/airbnb/javascript", "repo"),
  ],
  "unit testing": [
    r("Jest documentation", "https://jestjs.io/docs/getting-started", "docs"),
    r("pytest — official docs", "https://docs.pytest.org/", "docs"),
    r("Unit testing — freeCodeCamp", "https://www.freecodecamp.org/news/unit-testing-in-javascript/", "article"),
  ],
  "collections generics": [
    r("Java generics — Oracle tutorial", "https://docs.oracle.com/javase/tutorial/java/generics/index.html", "docs"),
    r("Python collections — official docs", "https://docs.python.org/3/library/collections.html", "docs"),
  ],
  "inheritance polymorphism": [
    r("Inheritance — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain", "docs"),
    r("Python inheritance — official tutorial", "https://docs.python.org/3/tutorial/classes.html#inheritance", "docs"),
  ],
  "interfaces abstract classes": [
    r("Abstract classes & interfaces — Oracle", "https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html", "docs"),
    r("TypeScript interfaces — official docs", "https://www.typescriptlang.org/docs/handbook/interfaces.html", "docs"),
  ],
  "arrays and strings problems": [
    r("Arrays & strings — NeetCode", "https://neetcode.io/practice", "practice"),
    r("Array problems — LeetCode", "https://leetcode.com/tag/array/", "practice"),
    r("HackerRank — algorithms", "https://www.hackerrank.com/domains/algorithms", "practice"),
  ],
  "dynamic programming basics": [
    r("Dynamic programming — NeetCode", "https://neetcode.io/practice?tab=dynamicProgramming", "practice"),
    r("DP explained — freeCodeCamp", "https://www.freecodecamp.org/news/demystifying-dynamic-programming/", "article"),
    r("DP tag — LeetCode", "https://leetcode.com/tag/dynamic-programming/", "practice"),
  ],
  "git workflows": [
    r("Git workflows — Atlassian", "https://www.atlassian.com/git/tutorials/comparing-workflows", "article"),
    r("GitHub flow — GitHub Docs", "https://docs.github.com/en/get-started/using-github/github-flow", "docs"),
  ],
  rebasing: [
    r("Rebasing — Git book", "https://git-scm.com/book/en/v2/Git-Branching-Rebasing", "book"),
    r("Rebase practice — Learn Git Branching", "https://learngitbranching.js.org/", "practice"),
  ],
  branches: [
    r("Branches — Git book", "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell", "book"),
    r("Branching — GitHub Docs", "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches", "docs"),
  ],
  merging: [
    r("Merging — Git book", "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging", "book"),
    r("Merge practice — Learn Git Branching", "https://learngitbranching.js.org/", "practice"),
  ],
  github: [
    r("GitHub Docs", "https://docs.github.com/en", "docs"),
    r("GitHub Skills", "https://skills.github.com/", "course"),
  ],
  "issues and projects": [
    r("GitHub Issues docs", "https://docs.github.com/en/issues", "docs"),
    r("GitHub Projects docs", "https://docs.github.com/en/issues/planning-and-tracking-with-projects", "docs"),
  ],
  "actions basics": [
    r("GitHub Actions documentation", "https://docs.github.com/en/actions", "docs"),
    r("Actions quickstart", "https://docs.github.com/en/actions/quickstart", "course"),
  ],
  scopes: [
    r("OAuth scopes — GitHub", "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps", "docs"),
    r("OAuth 2.0 scopes — Auth0", "https://auth0.com/docs/get-started/apis/scopes", "docs"),
  ],
  changelogs: [
    r("Keep a Changelog", "https://keepachangelog.com/", "article"),
    r("Semantic versioning", "https://semver.org/", "docs"),
  ],
  "standards codes": [
    r("Standards — ISO", "https://www.iso.org/standards.html", "docs"),
    r("Building codes — ICC", "https://www.iccsafe.org/", "docs"),
  ],
  "export delivery": [
    r("Figma export — help center", "https://help.figma.com/hc/en-us/articles/360040028114-Guide-to-exports-in-Figma", "docs"),
    r("Photoshop export — Adobe help", "https://helpx.adobe.com/photoshop/using/export-artboards-layers.html", "docs"),
  ],
  "gitlab ci yml basics": [
    r("GitLab CI/CD documentation", "https://docs.gitlab.com/ee/ci/", "docs"),
    r("gitlab-ci.yml reference", "https://docs.gitlab.com/ee/ci/yaml/", "docs"),
  ],
  "reusable workflows": [
    r("Reusable workflows — GitHub Docs", "https://docs.github.com/en/actions/using-workflows/reusing-workflows", "docs"),
    r("GitHub Actions — workflows", "https://docs.github.com/en/actions/using-workflows", "docs"),
  ],
  "docker compose": [
    r("Docker Compose documentation", "https://docs.docker.com/compose/", "docs"),
    r("Compose file reference", "https://docs.docker.com/compose/compose-file/", "docs"),
  ],
  dockerfiles: [
    r("Dockerfile reference", "https://docs.docker.com/reference/dockerfile/", "docs"),
    r("Docker — get started", "https://docs.docker.com/get-started/", "course"),
  ],
};
