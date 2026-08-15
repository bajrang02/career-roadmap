// ─────────────────────────────────────────────────────────────────────────────
// Resource fallbacks.
// Replaces the old google/youtube search fallback. Three layers, all DIRECT
// links only:
//   1. RESOURCE_RULES — ordered keyword/regex rules that map a topic label to
//      curated, topic-appropriate direct resources (never searches).
//   2. SEARCH_URL_FIXES — replaces legacy youtube.com/results and
//      stackoverflow.com/search entries inside the curated topic-resources map
//      with direct resources, keyed by normalized label.
//   3. RELATED_FALLBACKS — topic families whose resources can be reused for
//      closely-related labels (e.g. every "X basics" topic gets X resources).
// Anything still unmatched ships an EMPTY list — the UI shows a clear
// "no verified resource" state instead of a bad link.
// ─────────────────────────────────────────────────────────────────────────────

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// helper: quick entries
const r = (t, u, k) => ({ t, u, k });

// ── ordered rule table (first match wins) ────────────────────────────────────
export const RESOURCE_RULES = [
  // specific clusters first so broad rules never steal them
  { re: /^communities forums$|^communities and forums$|^community tutorials$|^forums$/i, res: () => [
    r("freeCodeCamp — community tutorials", "https://www.freecodecamp.org/news/", "article"),
    r("Dev.to — developer community", "https://dev.to/", "community"),
    r("GitHub Explore", "https://github.com/explore", "community"),
    r("Stack Overflow", "https://stackoverflow.com/", "community"),
  ]},
  { re: /^(clustering|regression|classification|model evaluation|data pipelines|feature engineering)$/i, res: () => [
    r("scikit-learn documentation", "https://scikit-learn.org/stable/", "docs"),
    r("Intro to ML — Kaggle", "https://www.kaggle.com/learn/intro-to-machine-learning", "course"),
    r("Machine learning — freeCodeCamp", "https://www.freecodecamp.org/learn/machine-learning-with-python/", "course"),
  ]},
  { re: /^selecting filtering$|^joins relationships$|^aggregations grouping$|^explain profiling$|^transactions concurrency$|^replication clustering$|^monitoring maintenance$|^drivers connection pools$|^orm integration$|^migration workflows$|^cost capacity planning$|^intermediate queries$|^real world workloads$|^data types casting$/i, res: () => [
    r("SQL tutorial — W3Schools", "https://www.w3schools.com/sql/", "course"),
    r("SQL — GeeksforGeeks", "https://www.geeksforgeeks.org/sql-tutorial/", "article"),
    r("PostgreSQL documentation", "https://www.postgresql.org/docs/", "docs"),
    r("PGExercises (practice)", "https://pgexercises.com/", "practice"),
  ]},
  { re: /^energy and enthalpy$|^entropy$|^cycles and efficiency$|^phase diagrams$|^materials science$|^crystal structures$|^stress and strain$|^material selection$|^thermodynamics$|^heat transfer$/i, res: () => [
    r("Thermodynamics — Khan Academy", "https://www.khanacademy.org/science/physics/thermodynamics", "course"),
    r("Materials science — MIT OCW", "https://ocw.mit.edu/search/?d=Materials%20Science%20and%20Engineering", "course"),
    r("Physics — Khan Academy", "https://www.khanacademy.org/science/physics", "course"),
  ]},
  { re: /^stack vs heap$|^pointers and references$|^garbage collection$|^leaks and profiling$|^ownership models$/i, res: () => [
    r("Memory management — freeCodeCamp", "https://www.freecodecamp.org/news/memory-management/", "article"),
    r("Rust ownership — The Book", "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html", "book"),
  ]},
  { re: /^instance profiles$|^assuming roles$|^routing policies$|^hosted zones$|^health checks$/i, res: () => [
    r("AWS IAM documentation", "https://docs.aws.amazon.com/iam/", "docs"),
    r("Amazon Route 53 documentation", "https://docs.aws.amazon.com/route53/", "docs"),
  ]},
  { re: /^pods and workloads$|^deploy a cluster$|^volumes and networks$|^scaling and health checks$|^networks and volumes$|^scheduling$|^service networking$/i, res: () => [
    r("Kubernetes documentation — workloads", "https://kubernetes.io/docs/concepts/workloads/", "docs"),
    r("Kubernetes networking — official docs", "https://kubernetes.io/docs/concepts/services-networking/", "docs"),
  ]},
  { re: /^terragrunt$|^provision infrastructure$|^drift detection$/i, res: () => [
    r("Terraform documentation", "https://developer.hashicorp.com/terraform/docs", "docs"),
    r("Terragrunt documentation", "https://terragrunt.gruntwork.io/docs/", "docs"),
  ]},
  { re: /^sensors actuators$|^actuators motors solenoids$|^calibration$|^embedded systems$/i, res: () => [
    r("Arduino documentation", "https://docs.arduino.cc/", "docs"),
    r("SparkFun tutorials", "https://learn.sparkfun.com/tutorials", "course"),
    r("Embedded systems — freeCodeCamp", "https://www.freecodecamp.org/news/embedded-systems/", "article"),
  ]},
  { re: /^vectors and matrices$|^matrix operations$|^eigenvalues and eigenvectors$|^linear algebra$/i, res: () => [
    r("Linear algebra — Khan Academy", "https://www.khanacademy.org/math/linear-algebra", "course"),
    r("Essence of linear algebra — 3Blue1Brown (video)", "https://www.youtube.com/watch?v=fNk_zzaMoSs", "video"),
  ]},
  { re: /^identifying risks$|^impact and likelihood$|^mitigation strategies$|^monitoring and review$|^escalation paths$|^risk assessment$/i, res: () => [
    r("Risk management — PMI", "https://www.pmi.org/learning/library/risk-analysis-project-management-8623", "article"),
    r("Risk management — HBR", "https://hbr.org/topic/risk-management", "article"),
  ]},
  { re: /^professional licensure$|^renewal and cpd$|^engineering ethics$|^licensing$/i, res: () => [
    r("NCEES — licensure information", "https://ncees.org/licensure/", "docs"),
    r("Professional ethics — NSPE", "https://www.nspe.org/resources/ethics/code-ethics", "docs"),
  ]},
  { re: /^interface workspace$|^project setup$|^core tools panels$|^selection transformation$|^beginner project$|^automation actions$|^file organization$|^naming conventions$|^prototyping$|^design process$|^export delivery$/i, res: () => [
    r("Figma Learn — resource library", "https://www.figma.com/resource-library/", "course"),
    r("Adobe Help Center", "https://helpx.adobe.com/", "docs"),
    r("Design process — NN/g", "https://www.nngroup.com/articles/", "article"),
  ]},
  { re: /^first document project$|^formatting layout$|^saving sharing$|^advanced functions features$|^templates styles$|^data formulas$|^automation macros$|^integrations add ons$|^efficiency tips$|^organization$|^task automator$/i, res: () => [
    r("Microsoft Learn — Office training", "https://learn.microsoft.com/en-us/training/browse/?products=office", "course"),
    r("Microsoft 365 support", "https://support.microsoft.com/en-us/microsoft-365", "docs"),
    r("Zapier Learn — automation", "https://learn.zapier.com/", "course"),
  ]},
  { re: /^stack queue tree graph$|^common syntax$|^standard libraries$|^program structure$|^syntax variables$|^variables and types$|^naming conventions$/i, res: () => [
    r("Data structures — freeCodeCamp", "https://www.freecodecamp.org/news/data-structures-101-an-introduction-to-data-structures-and-algorithms/", "article"),
    r("JavaScript — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript", "docs"),
    r("Python tutorial — official docs", "https://docs.python.org/3/tutorial/", "course"),
  ]},
  { re: /^blue green strategy$|^canary releases$|^feature flags$|^traffic shifting$|^monitoring during rollout$|^blue green canary deploys$|^zero downtime deploys$|^rolling and canary$|^rollback strategies$|^rollback procedures$|^deployment verification$|^deployment workflow$|^deployment triggers$|^stages and gates$|^environment promotion$/i, res: () => [
    r("Deployment strategies — Microsoft Learn", "https://learn.microsoft.com/en-us/azure/architecture/patterns/deployment-strategy", "docs"),
    r("Deployment strategies — Google Cloud", "https://cloud.google.com/architecture/implementing-deployment-strategies", "docs"),
    r("Feature flags — LaunchDarkly", "https://launchdarkly.com/blog/what-are-feature-flags/", "article"),
  ]},
  { re: /^workflow files and syntax$|^actions marketplace$|^runners$|^registry and ci$|^ci integration$|^reusable workflows$/i, res: () => [
    r("GitHub Actions documentation", "https://docs.github.com/en/actions", "docs"),
    r("GitLab CI/CD documentation", "https://docs.gitlab.com/ee/ci/", "docs"),
  ]},
  { re: /^on call rotations$|^escalation paths$/i, res: () => [
    r("On-call — Google SRE", "https://sre.google/sre-book/on-call/", "book"),
    r("Incident response — PagerDuty", "https://response.pagerduty.com/", "docs"),
  ]},
  { re: /^pki certificates$|^certificates and pki$/i, res: () => [
    r("PKI — Cloudflare", "https://www.cloudflare.com/learning/ssl/how-does-ssl-work/", "article"),
    r("Digital certificates — Wikipedia", "https://en.wikipedia.org/wiki/Public_key_certificate", "article"),
  ]},
  { re: /^splitting large state$|^parallelism$/i, res: () => [
    r("Concurrency — freeCodeCamp", "https://www.freecodecamp.org/news/concurrency-and-parallelism/", "article"),
    r("Go concurrency — official docs", "https://go.dev/doc/effective_go#concurrency", "docs"),
  ]},
  { re: /^generics$/i, res: () => [
    r("Java generics — Oracle tutorial", "https://docs.oracle.com/javase/tutorial/java/generics/index.html", "docs"),
    r("TypeScript generics — official docs", "https://www.typescriptlang.org/docs/handbook/2/generics.html", "docs"),
    r("Python type hints — official docs", "https://docs.python.org/3/library/typing.html", "docs"),
  ]},
  { re: /^section wise strategy$|^exam strategy$|^revision plan$|^preparation strategy$|^study strategy$/i, res: () => [
    r("IndiaBix — aptitude practice", "https://www.indiabix.com/", "practice"),
    r("Testbook — mock tests", "https://testbook.com/", "practice"),
    r("Exam strategy — Testbook blog", "https://testbook.com/blog/", "article"),
  ]},
  { re: /^environment configuration$|^compose files and services$|^compose files$/i, res: () => [
    r("Docker Compose documentation", "https://docs.docker.com/compose/", "docs"),
    r("Compose file reference", "https://docs.docker.com/compose/compose-file/", "docs"),
    r("Environment variables — Docker docs", "https://docs.docker.com/compose/environment-variables/", "docs"),
  ]},
  { re: /^iaas vs paas vs saas$|^iaas paas saas$|^cloud service models$|^iaas saas paas$/i, res: () => [
    r("IaaS vs PaaS vs SaaS — Microsoft Learn", "https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/", "course"),
    r("Cloud service models — AWS", "https://aws.amazon.com/what-is/paas/", "article"),
  ]},
  { re: /^utility types$|^satisfies operator$|^template literal types$|^conditional types$|^mapped types$/i, res: () => [
    r("TypeScript utility types — official docs", "https://www.typescriptlang.org/docs/handbook/utility-types.html", "docs"),
    r("TypeScript advanced types — official docs", "https://www.typescriptlang.org/docs/handbook/2/types-from-types.html", "docs"),
  ]},
  // web platform
  { re: /^html$|html\b|hypertext/i, res: () => [
    r("HTML — MDN", "https://developer.mozilla.org/en-US/docs/Web/HTML", "docs"),
    r("HTML tutorial — W3Schools", "https://www.w3schools.com/html/", "course"),
    r("HTML forms & inputs — MDN", "https://developer.mozilla.org/en-US/docs/Learn/Forms", "course"),
    r("HTML practice — freeCodeCamp", "https://www.freecodecamp.org/learn/2022/responsive-web-design/", "course"),
  ]},
  { re: /^css$|css\b|stylesheet|styling/i, res: () => [
    r("CSS — MDN", "https://developer.mozilla.org/en-US/docs/Web/CSS", "docs"),
    r("CSS tutorial — W3Schools", "https://www.w3schools.com/css/", "course"),
    r("Learn CSS — web.dev", "https://web.dev/learn/css", "course"),
    r("CSS reference — MDN", "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference", "cheatsheet"),
  ]},
  { re: /javascript\b|js\b|ecmascript|node\.?js|dom\b/i, res: () => [
    r("JavaScript — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript", "docs"),
    r("Modern JavaScript — JavaScript.info", "https://javascript.info/", "course"),
    r("JavaScript tutorial — W3Schools", "https://www.w3schools.com/js/", "course"),
    r("Eloquent JavaScript (free book)", "https://eloquentjavascript.net/", "book"),
  ]},
  { re: /typescript\b|ts\b/i, res: () => [
    r("TypeScript official docs", "https://www.typescriptlang.org/docs/", "docs"),
    r("TypeScript handbook", "https://www.typescriptlang.org/docs/handbook/intro.html", "docs"),
    r("TypeScript tutorial — W3Schools", "https://www.w3schools.com/typescript/", "course"),
    r("TypeScript — freeCodeCamp", "https://www.freecodecamp.org/news/learn-typescript-beginners-guide/", "course"),
  ]},
  { re: /react\b|jsx|hooks?/i, res: () => [
    r("React official docs", "https://react.dev/learn", "docs"),
    r("React hooks reference", "https://react.dev/reference/react", "docs"),
    r("React — W3Schools", "https://www.w3schools.com/react/", "course"),
    r("React — freeCodeCamp", "https://www.freecodecamp.org/learn/front-end-development-libraries/react/", "course"),
  ]},
  { re: /vue\b|nuxt/i, res: () => [
    r("Vue official docs", "https://vuejs.org/guide/introduction.html", "docs"),
    r("Vue tutorial — W3Schools", "https://www.w3schools.com/vue/", "course"),
    r("Vue Mastery free courses", "https://www.vuemastery.com/courses/", "course"),
  ]},
  { re: /angular\b|ng[a-z]/i, res: () => [
    r("Angular official docs", "https://angular.dev/overview", "docs"),
    r("Angular tutorial", "https://angular.dev/tutorials", "course"),
    r("Angular — W3Schools", "https://www.w3schools.com/angular/", "course"),
  ]},
  { re: /next\.?js|ssr|server side rendering|static site generation|ssg/i, res: () => [
    r("Next.js official docs", "https://nextjs.org/docs", "docs"),
    r("Learn Next.js", "https://nextjs.org/learn", "course"),
  ]},
  { re: /python\b|django\b|flask\b|pandas\b|numpy\b|jupyter/i, res: () => [
    r("Python official docs", "https://docs.python.org/3/", "docs"),
    r("Python tutorial — official", "https://docs.python.org/3/tutorial/", "course"),
    r("Python tutorial — W3Schools", "https://www.w3schools.com/python/", "course"),
    r("Python — Real Python", "https://realpython.com/", "article"),
    r("Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python-programming-language/", "article"),
  ]},
  { re: /java\b|jvm|spring\b|maven|gradle/i, res: () => [
    r("Java tutorials — Oracle", "https://docs.oracle.com/javase/tutorial/", "docs"),
    r("Java — W3Schools", "https://www.w3schools.com/java/", "course"),
    r("Java — GeeksforGeeks", "https://www.geeksforgeeks.org/java/", "article"),
    r("Spring official docs", "https://spring.io/guides", "docs"),
  ]},
  { re: /sql\b|database\b|postgres|mysql|sqlite|mongo|nosql|query|selecting|filtering|joins|aggregations|grouping|explain|profiling|indexes|transactions|replication|orm|migration|schema|crud/i, res: () => [
    r("SQL tutorial — W3Schools", "https://www.w3schools.com/sql/", "course"),
    r("SQL — GeeksforGeeks", "https://www.geeksforgeeks.org/sql-tutorial/", "article"),
    r("SQLBolt — interactive SQL", "https://sqlbolt.com/", "practice"),
    r("PostgreSQL documentation", "https://www.postgresql.org/docs/", "docs"),
    r("MongoDB documentation", "https://www.mongodb.com/docs/", "docs"),
  ]},
  { re: /git\b|version control|commit|branching|github\b|versioning|changelogs|workflows/i, res: () => [
    r("Git documentation", "https://git-scm.com/doc", "docs"),
    r("GitHub Docs", "https://docs.github.com/en", "docs"),
    r("Learn Git Branching (interactive)", "https://learngitbranching.js.org/", "practice"),
    r("Git — GeeksforGeeks", "https://www.geeksforgeeks.org/git-tutorial/", "article"),
  ]},
  { re: /docker\b|container/i, res: () => [
    r("Docker documentation", "https://docs.docker.com/", "docs"),
    r("Docker curriculum — Docker Docs", "https://docs.docker.com/get-started/", "course"),
    r("Play with Docker (labs)", "https://labs.play-with-docker.com/", "practice"),
  ]},
  { re: /kubernetes\b|k8s|helm\b/i, res: () => [
    r("Kubernetes documentation", "https://kubernetes.io/docs/", "docs"),
    r("Kubernetes basics tutorial", "https://kubernetes.io/docs/tutorials/kubernetes-basics/", "course"),
    r("Kubernetes — freeCodeCamp", "https://www.freecodecamp.org/news/kubernetes-for-beginners/", "article"),
  ]},
  { re: /terraform\b|infrastructure as code|iac/i, res: () => [
    r("Terraform documentation", "https://developer.hashicorp.com/terraform/docs", "docs"),
    r("Terraform tutorials", "https://developer.hashicorp.com/terraform/tutorials", "course"),
  ]},
  { re: /aws\b|lambda|ec2|s3\b|cloud practitioner|iam\b/i, res: () => [
    r("AWS documentation", "https://docs.aws.amazon.com/", "docs"),
    r("AWS Skill Builder", "https://skillbuilder.aws/", "course"),
    r("AWS Cloud Practitioner — freeCodeCamp", "https://www.freecodecamp.org/news/aws-cloud-practitioner-study-guide/", "article"),
  ]},
  { re: /azure\b|microsoft cloud/i, res: () => [
    r("Microsoft Learn — Azure", "https://learn.microsoft.com/en-us/training/azure/", "course"),
    r("Azure documentation", "https://learn.microsoft.com/en-us/azure/", "docs"),
  ]},
  { re: /google cloud|gcp|bigquery/i, res: () => [
    r("Google Cloud documentation", "https://cloud.google.com/docs", "docs"),
    r("Google Cloud Skills Boost", "https://www.cloudskillsboost.google/", "course"),
  ]},
  { re: /linux\b|ubuntu|unix|shell|bash\b|terminal|command line|cli\b|systemd|commands?|redirects?/i, res: () => [
    r("Linux command line — The Missing Semester", "https://missing.csail.mit.edu/", "course"),
    r("Linux journey — interactive", "https://linuxjourney.com/", "course"),
    r("Bash manual — GNU", "https://www.gnu.org/software/bash/manual/", "docs"),
    r("Linux commands cheat sheet", "https://quickref.me/linux", "cheatsheet"),
  ]},
  { re: /machine learning|deep learning|neural|ml\b|tensorflow|pytorch|scikit|hugging|llm|transformers?/i, res: () => [
    r("Machine Learning — freeCodeCamp", "https://www.freecodecamp.org/learn/machine-learning-with-python/", "course"),
    r("Intro to ML — Kaggle", "https://www.kaggle.com/learn/intro-to-machine-learning", "course"),
    r("PyTorch documentation", "https://pytorch.org/docs/", "docs"),
    r("Hugging Face Learn", "https://huggingface.co/learn", "course"),
  ]},
  { re: /data science|data analysis|pandas|numpy|statistic|data visualization|cleaning|feature engineering/i, res: () => [
    r("Data analysis with Python — freeCodeCamp", "https://www.freecodecamp.org/learn/data-analysis-with-python/", "course"),
    r("Pandas micro-course — Kaggle", "https://www.kaggle.com/learn/pandas", "course"),
    r("NumPy documentation", "https://numpy.org/doc/stable/", "docs"),
    r("Pandas documentation", "https://pandas.pydata.org/docs/", "docs"),
  ]},
  { re: /security|hacking|pentest|owasp|exploit|vulnerab|forensic|malware|crypto(graphy)?\b|ctf|osint|injection|xss|csrf|ssrf/i, res: () => [
    r("OWASP Top 10", "https://owasp.org/www-project-top-ten/", "docs"),
    r("PortSwigger Web Security Academy", "https://portswigger.net/web-security", "course"),
    r("TryHackMe", "https://tryhackme.com/", "practice"),
    r("OWASP Cheat Sheet Series", "https://cheatsheetseries.owasp.org/", "cheatsheet"),
  ]},
  { re: /autocad|cad\b|drafting|solidworks|revit|bim\b|ansys|fea\b|matlab|simulink|etabs|staad|catia|creo|fusion 360/i, res: () => [
    r("Autodesk Learn & Training", "https://www.autodesk.com/learn", "course"),
    r("Autodesk documentation", "https://help.autodesk.com/", "docs"),
    r("MATLAB & Simulink documentation", "https://www.mathworks.com/help/", "docs"),
    r("Engineering Toolbox", "https://www.engineeringtoolbox.com/", "cheatsheet"),
  ]},
  { re: /figma\b|photoshop|illustrator|blender|after effects|premiere|davinci|design tool|sketch\b/i, res: () => [
    r("Figma Learn", "https://www.figma.com/resource-library/", "course"),
    r("Adobe Help Center", "https://helpx.adobe.com/", "docs"),
    r("Blender documentation", "https://docs.blender.org/manual/en/latest/", "docs"),
  ]},
  { re: /excel\b|spreadsheet|powerpoint|word\b|outlook|office\b/i, res: () => [
    r("Microsoft Learn — Excel", "https://learn.microsoft.com/en-us/training/excel/", "course"),
    r("Excel documentation — Microsoft Support", "https://support.microsoft.com/en-us/excel", "docs"),
  ]},
  { re: /networking|tcp\/ip|dns\b|http\b|https\b|protocol/i, res: () => [
    r("Computer networking — freeCodeCamp", "https://www.freecodecamp.org/news/computer-networks-and-how-to-actually-understand-them/", "article"),
    r("An overview of HTTP — MDN", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", "docs"),
    r("How DNS works — Cloudflare", "https://www.cloudflare.com/learning/dns/what-is-dns/", "article"),
  ]},
  { re: /api\b|rest\b|graphql|http methods|endpoint/i, res: () => [
    r("REST APIs — MDN", "https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps", "course"),
    r("GraphQL official docs", "https://graphql.org/learn/", "docs"),
    r("REST API tutorial — freeCodeCamp", "https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/", "article"),
    r("Postman learning center", "https://learning.postman.com/", "docs"),
  ]},
  { re: /algorithm|data structure|complexity|big o|recursion|dynamic programming|sorting|searching|leetcode|competitive/i, res: () => [
    r("Data structures & algorithms — freeCodeCamp", "https://www.freecodecamp.org/news/learn-data-structures-and-algorithms/", "article"),
    r("NeetCode roadmap", "https://neetcode.io/roadmap", "practice"),
    r("Khan Academy — algorithms", "https://www.khanacademy.org/computing/computer-science/algorithms", "course"),
    r("Big-O cheat sheet", "https://www.bigocheatsheet.com/", "cheatsheet"),
  ]},
  { re: /interview|resume|linkedin|salary|negotiation|job|career|portfolio|networking|behavioral|star method|offer/i, res: () => [
    r("Coding interview — freeCodeCamp", "https://www.freecodecamp.org/news/coding-interviews-for-dummies/", "article"),
    r("STAR method — The Muse", "https://www.themuse.com/advice/star-interview-method", "article"),
    r("Resume tips — Google Careers", "https://careers.google.com/how-we-hire/resume-tips/", "article"),
    r("Levels.fyi — salary research", "https://www.levels.fyi/", "practice"),
    r("Pramp — free mock interviews", "https://www.pramp.com/", "practice"),
  ]},
  { re: /exam|aptitude|reasoning|mock test|gk|current affairs|quantitative/i, res: () => [
    r("IndiaBix — aptitude practice", "https://www.indiabix.com/", "practice"),
    r("Testbook — mock tests", "https://testbook.com/", "practice"),
  ]},
  { re: /documentation|technical writing|readme|writing/i, res: () => [
    r("Google technical writing courses", "https://developers.google.com/tech-writing", "course"),
    r("GitHub README guide", "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes", "docs"),
    r("Make a README", "https://www.makeareadme.com/", "article"),
  ]},
  { re: /testing|qa\b|selenium|cypress|playwright|junit|pytest|jest/i, res: () => [
    r("Quality assurance — freeCodeCamp", "https://www.freecodecamp.org/learn/quality-assurance/", "course"),
    r("Selenium documentation", "https://www.selenium.dev/documentation/", "docs"),
    r("Cypress docs", "https://docs.cypress.io/", "docs"),
    r("Playwright docs", "https://playwright.dev/docs/intro", "docs"),
  ]},
  { re: /system design|architecture|scalability|microservice|load balancing|caching|consistency|availability/i, res: () => [
    r("System Design Primer — GitHub", "https://github.com/donnemartin/system-design-primer", "repo"),
    r("System design — freeCodeCamp", "https://www.freecodecamp.org/news/systems-design-for-interviews/", "article"),
    r("AWS architecture center", "https://aws.amazon.com/architecture/", "docs"),
    r("Microsoft Learn — architecture", "https://learn.microsoft.com/en-us/training/browse/?products=azure&resource_type=learning%20path", "course"),
  ]},
  { re: /design|ux\b|ui\b|typography|color|accessibility|a11y|figma/i, res: () => [
    r("Laws of UX", "https://lawsofux.com/", "article"),
    r("Nielsen Norman Group", "https://www.nngroup.com/articles/", "article"),
    r("Learn Accessibility — web.dev", "https://web.dev/learn/accessibility", "course"),
    r("Learn UI Design", "https://www.learnui.design/", "article"),
  ]},
  { re: /communication|leadership|management|soft skills|collaboration|teamwork|presentation|time management/i, res: () => [
    r("Communication — Harvard Business Review", "https://hbr.org/topic/communication", "article"),
    r("Crucial Conversations (book)", "https://www.crucialconversations.com/", "book"),
    r("Presentation skills — HBR", "https://hbr.org/topic/presentations", "article"),
  ]},
  { re: /project management|agile|scrum|kanban|jira|delivery/i, res: () => [
    r("Agile — Atlassian", "https://www.atlassian.com/agile", "article"),
    r("Scrum guide", "https://scrumguides.org/", "docs"),
    r("PMI resources", "https://www.pmi.org/", "community"),
  ]},
  { re: /cloud|virtualization|vmware|hypervisor/i, res: () => [
    r("Cloud computing — Microsoft Learn", "https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/", "course"),
    r("Cloud computing — AWS", "https://aws.amazon.com/what-is-cloud-computing/", "article"),
  ]},
];

// ── fixes for legacy search URLs inside the curated map ──────────────────────
// Keys are normalized labels; values replace the youtube/stackoverflow search
// entries those labels ship today. One entry per label — the whole search-y
// block gets swapped for these direct resources.
export const SEARCH_URL_FIXES = {
  "language specific gotchas": [
    r("JavaScript quirks — JavaScript.info", "https://javascript.info/", "course"),
    r("Python common pitfalls — Real Python", "https://realpython.com/python-common-pitfalls/", "article"),
  ],
  "installation and setup": [
    r("How to install Node.js & npm — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-install-node-js-and-npm/", "article"),
    r("Python installation guide — official", "https://docs.python.org/3/using/index.html", "docs"),
  ],
  "thinking out loud": [
    r("How to think out loud — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-ace-your-coding-interview/", "article"),
    r("Interview communication — Pramp blog", "https://www.pramp.com/blog/", "article"),
  ],
  "clarifying requirements": [
    r("System design primer — requirements", "https://github.com/donnemartin/system-design-primer", "repo"),
    r("Requirements gathering — Atlassian", "https://www.atlassian.com/agile/requirements", "article"),
  ],
  "testing your solution": [
    r("Coding interview cheatsheet — freeCodeCamp", "https://www.freecodecamp.org/news/coding-interview-cheatsheet/", "article"),
    r("Testing edge cases — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-think-like-a-programmer/", "article"),
  ],
  "core concepts refresher": [
    r("freeCodeCamp — core concepts", "https://www.freecodecamp.org/news/", "article"),
    r("MDN — learn web development", "https://developer.mozilla.org/en-US/docs/Learn", "course"),
  ],
  "understanding requirements": [
    r("System Design Primer — requirements", "https://github.com/donnemartin/system-design-primer", "repo"),
    r("Requirement gathering — Atlassian", "https://www.atlassian.com/agile/requirements", "article"),
  ],
  "practice and delivery": [
    r("Pramp — free mock interviews", "https://www.pramp.com/", "practice"),
    r("STAR method — The Muse", "https://www.themuse.com/advice/star-interview-method", "article"),
  ],
  "presentation quality": [
    r("Presentation skills — HBR", "https://hbr.org/topic/presentations", "article"),
    r("Presentation — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-give-a-presentation/", "article"),
  ],
  "quick calculation techniques": [
    r("Vedic mathematics", "https://www.vedicmaths.org/", "course"),
    r("Mental math — Khan Academy", "https://www.khanacademy.org/math/arithmetic", "course"),
  ],
  "avoiding careless errors": [
    r("Test-taking strategies — Testbook", "https://testbook.com/", "practice"),
    r("Exam strategies — IndiaBix", "https://www.indiabix.com/", "practice"),
  ],
  "guessing strategies": [
    r("IndiaBix — practice", "https://www.indiabix.com/", "practice"),
    r("Testbook — mock tests", "https://testbook.com/", "practice"),
  ],
  "presentation skills": [
    r("Presentation skills — HBR", "https://hbr.org/topic/presentations", "article"),
    r("Public speaking — Coursera", "https://www.coursera.org/learn/public-speaking", "course"),
  ],
  "domain deep dives": [
    r("Industry reports — HBR", "https://hbr.org/", "article"),
    r("MIT OpenCourseWare", "https://ocw.mit.edu/", "course"),
  ],
  "rehearsing the demo": [
    r("Demo skills — The Muse", "https://www.themuse.com/advice/", "article"),
    r("Presentation skills — HBR", "https://hbr.org/topic/presentations", "article"),
  ],
  "writing clean code by hand": [
    r("Coding interview cheatsheet — freeCodeCamp", "https://www.freecodecamp.org/news/coding-interview-cheatsheet/", "article"),
    r("Clean code practices — freeCodeCamp", "https://www.freecodecamp.org/news/clean-code-practices/", "article"),
  ],
  "designing the approach": [
    r("System Design Primer", "https://github.com/donnemartin/system-design-primer", "repo"),
    r("How to plan code — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-think-like-a-programmer/", "article"),
  ],
  "weak spots audit": [
    r("NeetCode — practice", "https://neetcode.io/practice", "practice"),
    r("InterviewBit — practice", "https://www.interviewbit.com/", "practice"),
  ],
  "core concepts and architecture": [
    r("System Design Primer", "https://github.com/donnemartin/system-design-primer", "repo"),
    r("AWS architecture center", "https://aws.amazon.com/architecture/", "docs"),
  ],
  "key frameworks": [
    r("System Design Primer — frameworks", "https://github.com/donnemartin/system-design-primer", "repo"),
    r("Design patterns — refactoring.guru", "https://refactoring.guru/design-patterns", "article"),
  ],
  "improving speed": [
    r("Keybr — typing practice", "https://www.keybr.com/", "practice"),
    r("How to think like a programmer — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-think-like-a-programmer/", "article"),
  ],
  "server side validation": [
    r("Form data validation — MDN", "https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps", "docs"),
    r("Express validation — MDN tutorial", "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms", "course"),
  ],
  "framework specific gotchas": [
    r("React pitfalls — React docs", "https://react.dev/learn/thinking-in-react", "docs"),
    r("Vue style guide", "https://vuejs.org/style-guide/", "docs"),
    r("Angular best practices", "https://angular.dev/best-practices", "docs"),
  ],
  troubleshooting: [
    r("Chrome DevTools", "https://developer.chrome.com/docs/devtools/", "docs"),
    r("MDN — cross-browser testing", "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing", "course"),
  ],
  tools: [
    r("VS Code docs", "https://code.visualstudio.com/docs", "docs"),
    r("Chrome DevTools", "https://developer.chrome.com/docs/devtools/", "docs"),
  ],
  "reading a codebase": [
    r("How to read code — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-read-code/", "article"),
    r("GitHub — explore open source", "https://github.com/explore", "community"),
  ],
  "presenting ideas": [
    r("Presentation skills — HBR", "https://hbr.org/topic/presentations", "article"),
    r("Communication — HBR", "https://hbr.org/topic/communication", "article"),
  ],
  "industry applications": [
    r("Industry reports — HBR", "https://hbr.org/", "article"),
    r("Career paths — Glassdoor", "https://www.glassdoor.com/", "community"),
  ],
  "advanced topics": [
    r("MDN — advanced web development", "https://developer.mozilla.org/en-US/docs/Web/Guide", "docs"),
    r("MIT OpenCourseWare", "https://ocw.mit.edu/", "course"),
  ],
  "performance optimization": [
    r("Web performance — web.dev", "https://web.dev/learn/performance", "course"),
    r("Learn performance — MDN", "https://developer.mozilla.org/en-US/docs/Learn/Performance", "course"),
  ],
  "configuration and files": [
    r("VS Code settings docs", "https://code.visualstudio.com/docs/getstarted/settings", "docs"),
    r("Linux filesystem — The Missing Semester", "https://missing.csail.mit.edu/", "course"),
  ],
  "essential tools": [
    r("VS Code docs", "https://code.visualstudio.com/docs", "docs"),
    r("The Missing Semester", "https://missing.csail.mit.edu/", "course"),
  ],
  "advanced features": [
    r("MDN — web API reference", "https://developer.mozilla.org/en-US/docs/Web/API", "docs"),
    r("Microsoft Learn", "https://learn.microsoft.com/training/", "course"),
  ],
  "common pitfalls": [
    r("JavaScript quirks — JavaScript.info", "https://javascript.info/", "course"),
    r("Python pitfalls — Real Python", "https://realpython.com/python-common-pitfalls/", "article"),
  ],
  "layers and organization": [
    r("CSS cascade & specificity — MDN", "https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade", "docs"),
    r("Figma layers — Figma help", "https://help.figma.com/hc/en-us/articles/360041488373-Layers", "docs"),
  ],
  "core skills": [
    r("freeCodeCamp curriculum", "https://www.freecodecamp.org/learn", "course"),
    r("The Odin Project", "https://www.theodinproject.com/", "course"),
  ],
  "professional tips": [
    r("HBR — career development", "https://hbr.org/topic/career-development", "article"),
    r("The Muse — career advice", "https://www.themuse.com/advice", "article"),
  ],
  "efficiency tips and shortcuts": [
    r("VS Code keyboard shortcuts", "https://code.visualstudio.com/docs/getstarted/keybindings", "docs"),
    r("Productivity — The Muse", "https://www.themuse.com/advice", "article"),
  ],
  "tools and shortcuts": [
    r("VS Code keyboard shortcuts", "https://code.visualstudio.com/docs/getstarted/keybindings", "docs"),
    r("Windows keyboard shortcuts — Microsoft", "https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec", "docs"),
  ],
  "from concept to deliverable": [
    r("Design process — Nielsen Norman Group", "https://www.nngroup.com/articles/", "article"),
    r("Project workflow — Atlassian", "https://www.atlassian.com/agile/project-management", "article"),
  ],
};

// ── related-family fallbacks ─────────────────────────────────────────────────
// Ordered pairs: [test, resources(cleanLabel)]. Used when a label matches a
// family (e.g. "... basics") and we have a strong family-level resource set.
// Related-family fallback for labels like "X basics". Only emits URLs that are
// guaranteed to resolve (never fabricated Wikipedia slugs — those 404).
export const RELATED_FALLBACKS = [
  {
    re: /(basics|fundamentals|foundations|essentials|intro|101|getting started|core concepts|principles|overview)$/i,
    res: (label) => [
      r(`${cap(label)} — freeCodeCamp`, "https://www.freecodecamp.org/news/", "article"),
      r(`${cap(label)} — GeeksforGeeks`, "https://www.geeksforgeeks.org/", "article"),
    ],
  },
];

// ── lookup ───────────────────────────────────────────────────────────────────
const norm = (s) =>
  String(s)
    .replace(/[^a-z0-9\s&]+/gi, " ")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function ruleResources(label) {
  // normalize before matching so anchored ^…$ patterns work on raw labels
  // like "Communities & Forums" → "communities forums"
  const key = norm(label);
  for (const rule of RESOURCE_RULES) {
    if (rule.re.test(key)) return rule.res();
  }
  return null;
}

export function searchFixFor(label) {
  return SEARCH_URL_FIXES[norm(label)] ?? null;
}

export function relatedFallback(label) {
  for (const f of RELATED_FALLBACKS) {
    if (f.re.test(label)) return f.res(label);
  }
  return null;
}
