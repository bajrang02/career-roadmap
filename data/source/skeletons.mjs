// IT roadmap skeletons. Each skeleton is an array of major sections.
// Section: { t: title, d: description, k: [subsections] }
// Subsection: { t: title, k: [topic labels] }  (strings resolve via KNOWLEDGE / MATCHES)
// Strings at the top level are "loose topics" placed directly under a section.
// o: true marks a subsection/topic optional (purple).

const SEC = (t, d, k) => ({ t, d, k });
const SUB = (t, k, o) => ({ t, k, o });
export const CHOICE = (t, r, k, o) => ({ c: true, t, r, k, o });

// ── Shared blocks ──────────────────────────────────────────────────────────
const B_INTERNET = SUB("Internet", [
  "How the internet works", "What is HTTP?", "HTTP & HTTPS", "DNS and how it works", "Browsers and how they work", "Hosting & Domains",
]);
const B_GIT = SUB("Version Control", [
  "Git", "GitHub", "Git workflows", "Conventional commits", "Open-source contribution",
]);
const B_TOOLS = SUB("Editors & Tooling", [
  "VS Code & extensions", "Terminal & shell", "Chrome DevTools", "npm & package managers",
]);
const B_HTML = SUB("HTML", [
  "HTML basics", "Semantic HTML", "Forms & validation", "Tables & lists", "Media & embedding", "Accessibility (a11y)", "SEO basics",
]);
const B_CSS = SUB("CSS", [
  "CSS basics", "Selectors & specificity", "Box model", "CSS Flexbox", "CSS Grid", "Responsive design", "CSS animations", "Modern CSS features", "Sass", "BEM methodology",
]);
const B_JS = SUB("JavaScript", [
  "JavaScript basics", "Functions & scope", "Objects & arrays", "DOM manipulation", "Events & event loop", "ES6+ features", "Async JavaScript", "Promises & async/await", "Fetch API & AJAX", "ES modules", "JavaScript testing",
]);
const B_TS = SUB("TypeScript", [
  "TypeScript basics", "Types & interfaces", "Generics", "Utility types", "TypeScript config & tooling",
]);
const B_REACT_BASE = SUB("React Fundamentals", [
  "React components", "Props & data flow", "State & events", "Hooks", "Conditional rendering & lists", "Forms in React", "Thinking in React",
]);
const B_REACT_ADV = SUB("React Advanced", [
  "React Context", "React Router", "Redux / Zustand", "TanStack Query", "React performance", "Testing React (Vitest & Testing Library)", "Custom hooks",
]);
const B_NEXTJS = SUB("Next.js (App Router)", [
  "Next.js basics", "Routing & layouts", "Server vs client components", "Data fetching (SSR/SSG/ISR)", "API routes", "Next.js auth & middleware", "Deploying Next.js",
]);
const B_TAILWIND = SUB("Tailwind CSS", [
  "Tailwind basics", "Design tokens & theming", "Composing layouts", "Component extraction", "Tailwind + component libraries",
]);
const B_CSS_ARCH = SUB("CSS Architecture", [
  "CSS Modules", "Styled components / CSS-in-JS", "Design systems", "Dark mode theming",
]);
const B_TEST = SUB("Testing", [
  "Testing fundamentals", "Unit testing (Vitest)", "Integration testing", "End-to-end (Playwright)", "Test-driven development",
]);
const B_BUILD = SUB("Build Tools", [
  "Vite", "Webpack essentials", "ESLint & Prettier", "Bundling & tree-shaking", "Environment variables",
]);
const B_API = SUB("APIs & Data", [
  "REST API design", "GraphQL essentials", "Postman & API testing", "OpenAPI & documentation", "Webhooks",
]);
const B_AUTH = SUB("Authentication", [
  "Sessions & cookies", "JWT & tokens", "OAuth 2.0 & SSO", "Password security (bcrypt)", "Role-based access control", "Auth libraries (NextAuth, Clerk)",
]);
const B_SECURITY = SUB("Web Security", [
  "OWASP Top 10", "XSS prevention", "CSRF protection", "CORS & HTTPS", "Security headers", "Input validation & sanitization",
]);
const B_PERF = SUB("Performance", [
  "Core Web Vitals", "Critical rendering path", "Lazy loading & code splitting", "Image optimization", "Caching strategies", "Lighthouse audits",
]);
const B_NODE = SUB("Node.js Backend", [
  "Node.js basics", "npm & modules", "Express / Fastify", "Middleware & routing", "Error handling & logging", "File system & streams",
]);
const B_PY = SUB("Python Fundamentals", [
  "Python basics", "OOP in Python", "Virtual environments & pip", "File I/O & automation", "Python testing (pytest)",
]);
const B_SQL = SUB("SQL & Databases", [
  "SQL basics", "PostgreSQL", "MySQL", "Database design & normalization", "Transactions & ACID", "Indexes & query optimization",
]);
const B_NOSQL = SUB("NoSQL Databases", [
  "MongoDB", "Redis & caching", "Document vs relational modeling", "Search (Elasticsearch/Meilisearch)",
]);
const B_ORMS = SUB("ORMs & Migrations", [
  "Prisma", "Sequelize / Drizzle", "Migrations & seeds", "Database pooling",
]);
const B_DOCKER = SUB("Containers", [
  "Docker", "Docker Compose", "Image optimization", "Container security", "Docker networking",
]);
const B_K8S = SUB("Orchestration", [
  "Kubernetes", "Helm", "Service mesh basics", "Namespaces & RBAC", "Ingress & service discovery",
]);
const B_CICD = SUB("CI/CD", [
  "GitHub Actions", "Pipelines & environments", "Automated deployments", "Blue-green & canary deploys", "GitLab CI",
]);
const B_AWS = SUB("Cloud (AWS)", [
  "AWS fundamentals", "EC2 & compute", "S3 & storage", "Lambda & serverless", "RDS & databases", "IAM & security", "VPC & networking", "Cost optimization",
]);
const B_CLOUD_OTHER = SUB("Azure & GCP", [
  "Azure fundamentals", "Google Cloud fundamentals", "Multi-cloud architecture", "Cloud certifications",
]);
const B_LINUX = SUB("Linux & Scripting", [
  "Linux", "Bash scripting", "Processes & systemd", "Shell tools & piping", "Networking commands",
]);
const B_OBS = SUB("Observability", [
  "Logging & structured logs", "Metrics & Prometheus", "Grafana dashboards", "Tracing (OpenTelemetry)", "Alerting & on-call",
]);
const B_DS = SUB("Data Structures & Algorithms", [
  "Arrays & strings", "Linked lists", "Stacks & queues", "Hash tables", "Trees & graphs", "Sorting & searching", "Recursion & dynamic programming", "Big-O analysis",
]);
const B_OO = SUB("Object-Oriented Design", [
  "OOP principles", "SOLID principles", "Design patterns", "UML & diagrams", "Refactoring",
]);
const B_SYS = SUB("Systems & Architecture", [
  "System design", "Microservices vs monolith", "Event-driven architecture", "Caching & CDN", "Load balancing", "Message queues", "API gateways", "Distributed systems concepts",
]);
export const B_SOFT = SUB("Soft Skills", [
  "Communication & collaboration", "Code review etiquette", "Documentation & writing", "Time management", "Learning how to learn",
]);

// ── Skeletons ──────────────────────────────────────────────────────────────
export const SKELETONS = {
  "web-frontend": [
    SEC("Foundations", "The mental model of the web and the tools of the trade.", [B_INTERNET, B_GIT, B_TOOLS]),
    SEC("Core Languages", "The three languages that build the web — plus TypeScript on top.", [B_HTML, B_CSS, B_JS, B_TS]),
    SEC("Styling & Frameworks", "Write styles the way modern teams do.", [B_TAILWIND, B_CSS_ARCH, SUB("Component Libraries", ["shadcn/ui", "Radix UI primitives", "MUI", "Headless UI"], true)]),
    SEC("Frontend Framework", "Choose your primary UI library.", [
      CHOICE("Choose Frontend Framework", "React", [
        SUB("React", ["React components", "Props & data flow", "State & events", "Hooks", "React Router", "TanStack Query"]),
        SUB("Vue", ["Vue instances", "Directives", "Vue Router", "Pinia", "Composition API", "Vue performance"]),
        SUB("Angular", ["TypeScript", "Components & templates", "Services & DI", "RxJS", "Angular Router"]),
      ])
    ]),
    SEC("Modern Tooling", "Everything that makes code fast, safe and pleasant to ship.", [B_TEST, B_BUILD, SUB("Monorepos", ["Turborepo", "pnpm workspaces", "Nx"], true)]),
    SEC("APIs & Integration", "Talk to servers, authenticate users, stay secure.", [B_API, B_AUTH, B_SECURITY]),
    SEC("Performance & Quality", "Ship fast, accessible, discoverable experiences.", [B_PERF, SUB("Accessibility in Depth", ["ARIA & roles", "Keyboard navigation", "Screen reader testing", "WCAG 2.2"]), SUB("SEO & Analytics", ["Meta & structured data", "Analytics (GA4)", "Search console", "Content strategy"])]),
    SEC("Deployment", "From localhost to production.", [SUB("Hosting Platforms", ["Vercel", "Netlify", "Static site generation", "Edge functions"], true), SUB("CI for Frontend", ["Preview deployments", "Lighthouse CI", "Dependency updates"], true)]),
  ],

  "web-backend": [
    SEC("Foundations", "The server-side mental model: HTTP, systems and the terminal.", [B_INTERNET, B_LINUX, B_GIT]),
    SEC("Programming Language", "Choose one language and master it deeply.", [
      CHOICE("Choose Backend Language", "Node.js", [
        SUB("Node.js", ["Node.js basics", "Express / Fastify", "npm & modules", "Middleware", "Streams"]),
        SUB("Python", ["Python basics", "OOP in Python", "Virtual environments & pip", "Django", "FastAPI"]),
        SUB("Java", ["Java basics", "OOP & Design patterns", "Spring Boot", "Maven / Gradle", "JVM internals"]),
        SUB("Go", ["Go basics", "Goroutines & concurrency", "Go modules", "Standard library (net/http)", "Gin / Echo"]),
      ])
    ]),
    SEC("APIs & Services", "Design and build the interfaces other software consumes.", [SUB("REST Services", ["REST API design", "Serialization (JSON/XML)", "Versioning", "Rate limiting"]), B_API, B_AUTH]),
    SEC("Databases", "Store, query and model data at scale.", [
      CHOICE("Choose Database", "PostgreSQL", [
        SUB("PostgreSQL", ["SQL basics", "PostgreSQL", "Database design", "Indexes & query optimization"]),
        SUB("MySQL", ["SQL basics", "MySQL", "Database design", "Indexes & query optimization"]),
        SUB("MongoDB", ["MongoDB basics", "Document modeling", "Aggregations", "Indexes"]),
      ]),
      B_ORMS
    ]),
    SEC("Caching & Queues", "Speed up responses and decouple work.", [SUB("Caching", ["Redis", "HTTP caching", "Cache invalidation", "CDN basics"]), SUB("Message Queues", ["RabbitMQ", "Pub/sub patterns", "Dead-letter queues", "Background jobs"])]),
    SEC("Testing & Quality", "Ship services that don't break.", [B_TEST, SUB("API Testing", ["Postman collections", "Contract testing", "Load testing (k6)"]), B_SOFT]),
    SEC("Containers & Deployment", "Package and run your service anywhere.", [B_DOCKER, B_CICD, SUB("Servers & Hosting", ["Linux deployment", "Nginx & reverse proxy", "Process managers", "Environment & secrets"])]),
    SEC("Scaling & Reliability", "From one server to a distributed system.", [B_SYS, B_OBS]),
  ],

  fullstack: [
    SEC("Frontend", "Everything the user sees and touches.", [
      B_HTML, B_CSS, B_JS, B_TS,
      SUB("Frontend Tooling", ["Vite", "Tailwind CSS", "ESLint & Prettier", "Package managers"]),
      SUB("Styling", ["CSS Flexbox", "CSS Grid", "Responsive design", "CSS animations", "Sass", "Design systems"]),
      CHOICE("Choose Frontend Framework", "React", [
        SUB("React", ["React components", "Props & state", "Hooks", "React Router", "Context & state libraries", "Testing React"]),
        SUB("Vue", ["Vue instances", "Directives", "Vue Router", "Pinia", "Composition API"]),
        SUB("Angular", ["TypeScript", "Components & templates", "Services & DI", "RxJS", "Angular Router"]),
      ]),
    ]),
    SEC("Backend", "The brains and the logic behind the app.", [
      CHOICE("Choose Backend Language", "Node.js", [
        SUB("Node.js", ["Node.js basics", "Express / Fastify", "Middleware & routing"]),
        SUB("Python", ["Python basics", "Django", "FastAPI"]),
        SUB("Java", ["Java basics", "Spring Boot", "Maven / Gradle"]),
        SUB("Go", ["Go basics", "Goroutines & concurrency", "Gin / Echo"]),
      ]),
      SUB("REST APIs", ["REST API design", "Validation & serialization", "OpenAPI docs"]),
      B_AUTH,
      SUB("GraphQL", ["GraphQL basics", "Schema & resolvers", "Apollo", "Queries & mutations"]),
      SUB("Web Security", ["OWASP Top 10", "XSS & CSRF", "CORS & HTTPS", "Security headers"]),
    ]),
    SEC("Database", "Persist, query and model your data.", [
      CHOICE("Choose Database", "PostgreSQL", [
        SUB("PostgreSQL", ["SQL basics", "PostgreSQL", "Transactions & ACID", "Indexes & performance"]),
        SUB("MySQL", ["SQL basics", "MySQL", "Transactions & ACID", "Indexes & performance"]),
        SUB("MongoDB", ["MongoDB basics", "Document modeling", "Aggregations", "Indexes"]),
      ]),
      B_ORMS,
    ]),
    SEC("DevOps", "Build, ship and run — automatically.", [
      B_GIT, B_DOCKER, B_CICD,
      CHOICE("Choose Cloud", "AWS", [
        SUB("AWS", ["AWS fundamentals", "EC2 & compute", "S3 & storage", "Lambda & serverless", "RDS & databases"]),
        SUB("Azure", ["Azure fundamentals", "Azure Virtual Machines", "Blob storage", "Azure Functions"]),
        SUB("GCP", ["Google Cloud fundamentals", "Compute Engine", "Cloud Storage", "Cloud Functions"]),
      ]),
      SUB("Cloud Deployment", ["Vercel / Netlify", "Environment variables & secrets", "Domains & SSL"]),
      SUB("Monitoring", ["Logging", "Error tracking (Sentry)", "Uptime monitoring", "Analytics"]),
    ]),
    SEC("Career & Craft", "Go from building features to building products.", [
      B_DS, B_SOFT,
      SUB("Interview Prep", ["Coding problems", "System design basics", "Behavioral stories", "Take-home projects"]),
    ]),
  ],

  "software-engineer": [
    SEC("Foundations", "CS fundamentals that transfer to every language.", [SUB("Programming", ["Programming basics", "Data types & control flow", "Functions & recursion", "OOP principles"]), B_DS, SUB("Computer Science Core", ["Operating systems basics", "Computer architecture", "Networking basics", "Databases basics"])]),
    SEC("Core Engineering", "Write software the way senior engineers do.", [SUB("Language Mastery", ["Pick Python, Java or Go", "Standard library fluency", "Concurrency", "Testing your code"]), B_OO, B_GIT, B_SOFT]),
    SEC("Building Software", "Turn requirements into shipped features.", [SUB("Web Development", ["HTTP & APIs", "REST & GraphQL", "Databases (SQL)", "Frontend basics"]), B_SYS, SUB("Software Quality", ["Code review", "Refactoring", "Debugging strategies", "Performance profiling"])]),
    SEC("Tooling & Delivery", "The machinery of modern software teams.", [B_DOCKER, B_CICD, B_LINUX, SUB("IDEs & Productivity", ["VS Code / JetBrains", "Debuggers", "GitHub workflows", "AI-assisted development"])]),
    SEC("Specialize", "Go deep in the direction you love.", [SUB("Backend Systems", ["Node/Python/Java services", "Caching", "Message queues", "Reliability"]), SUB("Frontend", ["React", "TypeScript", "Web performance", "Accessibility"]), SUB("Data & ML", ["Python data stack", "ML fundamentals", "LLM applications", "MLOps"]), SUB("Cloud & Infrastructure", ["AWS", "Kubernetes", "Terraform", "Observability"])]),
    SEC("Career Growth", "Earn the title, then level up.", [SUB("Interview Mastery", ["Coding interviews", "System design interviews", "Behavioral interviews", "Salary negotiation"]), SUB("Senior Track", ["Architecture ownership", "Mentoring", "Technical writing", "Cross-team leadership"])]),
  ],

  "mobile-general": [
    SEC("Foundations", "Mobile fundamentals that apply to any platform.", [SUB("Programming", ["Programming basics", "OOP & data structures", "Asynchronous programming", "Git"]), SUB("Platform Awareness", ["iOS vs Android differences", "App store ecosystems", "Mobile UX patterns", "Accessibility on mobile"])]),
    SEC("Cross-Platform Framework", "One codebase, two stores.", [SUB("React Native", ["React Native basics", "Components & navigation", "State management", "Native modules", "Expo"]), SUB("Flutter", ["Dart basics", "Widgets & layout", "State (Riverpod/Provider)", "Animations", "Platform channels"], true), SUB("Shared Skills", ["Offline storage", "Push notifications", "REST & GraphQL clients", "Deep links"])]),
    SEC("UI & Polish", "Make it feel native.", [SUB("Design & Styling", ["Design systems", "Theming & dark mode", "Responsive layouts", "Custom animations"]), SUB("Performance", ["Profiling tools", "List performance", "Memory management", "Startup time"])]),
    SEC("Data & Backend", "Connect your app to the world.", [B_API, SUB("Backend Services", ["Firebase", "Supabase", "Custom APIs", "Auth & sessions"]), SUB("Storage", ["Local databases", "File & media upload", "Caching", "Sync strategies"])]),
    SEC("Testing & Quality", "Ship without shame.", [SUB("Mobile Testing", ["Unit & widget tests", "E2E with Detox/Maestro", "Device testing", "Beta programs"]), B_SOFT]),
    SEC("Publishing & Growth", "Get your app into users' hands.", [SUB("App Store Publishing", ["Play Store setup", "App Store Connect", "Store listings & screenshots", "Review guidelines"]), SUB("Analytics & Monetization", ["Analytics SDKs", "Crash reporting", "In-app purchases & ads", "ASO basics"])]),
  ],

  android: [
    SEC("Foundations", "Kotlin, tooling and Android fundamentals.", [SUB("Kotlin", ["Kotlin basics", "Coroutines & flows", "OOP & functional Kotlin", "Testing Kotlin"]), SUB("Android Platform", ["Android Studio", "Activities & the lifecycle", "Intents & navigation", "Manifest & resources", "Gradle build system"]), B_GIT]),
    SEC("UI Development", "Build modern Android UIs.", [SUB("Jetpack Compose", ["Compose basics", "State & recomposition", "Layouts & Material 3", "Theming & dark mode", "Compose navigation"]), SUB("Views (legacy)", ["XML layouts", "RecyclerView", "View binding", "Fragments"], true)]),
    SEC("Architecture", "Apps that scale with your team.", [SUB("App Architecture", ["MVVM & Clean Architecture", "ViewModel & StateFlow", "Repository pattern", "Dependency injection (Hilt)", "Navigation component"]), SUB("Data Layer", ["Room database", "Retrofit & OkHttp", "DataStore & preferences", "WorkManager"])]),
    SEC("Features & Polish", "The details users feel.", [SUB("Core Features", ["Notifications", "Background work", "Permissions", "Deep links", "Widgets"]), SUB("Performance", ["Profiling with Studio", "Memory leaks", "App size optimization", "Startup performance"]), SUB("Security", ["Keystore & encryption", "Secure networking", "ProGuard/R8"])]),
    SEC("Quality & Release", "Ship to the Play Store.", [SUB("Testing", ["Unit tests (JUnit)", "Compose UI tests", "Instrumented tests", "Test doubles"]), SUB("Publishing", ["Play Console setup", "App signing", "Release tracks", "Play policy compliance"]), SUB("Analytics", ["Firebase Analytics", "Crashlytics", "A/B testing"])]),
  ],

  ios: [
    SEC("Foundations", "Swift, Xcode and Apple platform fundamentals.", [SUB("Swift", ["Swift basics", "Optionals & types", "Closures & protocols", "Concurrency (async/await)", "Testing Swift"]), SUB("Xcode & Tooling", ["Xcode workflow", "Swift Package Manager", "Debugging & Instruments", "Simulators & devices"]), B_GIT]),
    SEC("UI Development", "Build with SwiftUI, Apple's modern UI framework.", [SUB("SwiftUI", ["Views & modifiers", "State & bindings", "Layout & stacks", "Navigation & sheets", "Animations & transitions"]), SUB("UIKit (legacy)", ["View controllers", "Auto Layout", "Table & collection views", "Delegation patterns"], true)]),
    SEC("Architecture", "Clean, testable iOS apps.", [SUB("App Architecture", ["MVVM & Coordinator", "Combine & Observation", "Dependency injection", "Modular app structure"]), SUB("Data & Persistence", ["Core Data & SwiftData", "URLSession & networking", "Codable & JSON", "Keychain & security"])]),
    SEC("Features & Polish", "Apple-grade details.", [SUB("Platform Features", ["Push notifications", "Background tasks", "App Intents & widgets", "Accessibility", "Localization"]), SUB("Performance", ["Instruments profiling", "Memory & leaks", "App size & startup", "Offline first"])]),
    SEC("Quality & Release", "Pass App Review, delight users.", [SUB("Testing", ["Unit & UI tests", "Snapshot testing", "TestFlight betas", "XCUITest"]), SUB("Publishing", ["App Store Connect", "App Review guidelines", "App Privacy labels", "Release management"])]),
  ],

  flutter: [
    SEC("Foundations", "Dart and the Flutter toolchain.", [SUB("Dart", ["Dart basics", "OOP & collections", "Async & isolates", "Testing Dart"]), SUB("Flutter Setup", ["Flutter SDK & CLI", "Widgets & rendering", "Hot reload workflow", "Project structure"]), B_GIT]),
    SEC("UI Development", "Widgets are your building blocks.", [SUB("Core Widgets", ["Layout widgets", "Stateful & stateless", "Lists & scrolling", "Forms & inputs", "Navigation & routes"]), SUB("Styling & Theming", ["Material 3 & Cupertino", "Themes & dark mode", "Custom painting", "Responsive layouts"])]),
    SEC("State & Data", "Manage state like a pro.", [SUB("State Management", ["setState & inherited widgets", "Provider & Riverpod", "Bloc / Cubit", "Repository pattern"]), SUB("Data & Networking", ["HTTP & Dio", "JSON serialization", "Local storage (Hive/SQLite)", "Firebase integration"])]),
    SEC("Animations & Polish", "Make it feel alive.", [SUB("Animations", ["Implicit & explicit", "Custom animations", "Hero & stagger", "Rive & Lottie"]), SUB("Performance", ["Widget rebuild optimization", "Raster & layer performance", "App size", "Memory profiling"])]),
    SEC("Platform & Release", "Ship everywhere.", [SUB("Platform Integration", ["Platform channels", "Permissions & sensors", "Push notifications", "Payments (in-app)"]), SUB("Testing & Publishing", ["Widget tests", "Integration tests", "Play Store & App Store", "CI for Flutter"])]),
  ],

  "react-native": [
    SEC("Foundations", "React skills meet native mobile.", [SUB("JavaScript & React", ["JavaScript fundamentals", "React components & hooks", "TypeScript", "Git & tooling"]), SUB("React Native Core", ["RN environment (Expo)", "Core components", "StyleSheet & flexbox", "Navigation (React Navigation)"])]),
    SEC("Building Features", "Real app features on real devices.", [SUB("State & Data", ["State management (Zustand)", "TanStack Query", "AsyncStorage & SQLite", "REST & GraphQL clients"]), SUB("Native Capabilities", ["Camera & media", "Permissions", "Push notifications", "Deep links", "Sensors & haptics"])]),
    SEC("UI & Experience", "Native feel, React speed.", [SUB("Animations & Gestures", ["Reanimated", "Gesture Handler", "Skeleton & loading states", "Lottie"]), SUB("Theming & Design", ["Dark mode", "Design systems", "Responsive layouts", "Accessibility"])]),
    SEC("Quality & Performance", "Apps that never stutter.", [SUB("Performance", ["JS vs native threads", "List optimization", "Memory management", "Profiling with flipper/React DevTools"]), SUB("Testing", ["Jest unit tests", "React Native Testing Library", "Detox E2E", "Device farms"])]),
    SEC("Release & Growth", "Ship to both stores.", [SUB("Publishing", ["Expo EAS builds", "App Store & Play Store", "CodePush & OTA updates", "App icons & splash"]), SUB("Analytics & Monetization", ["Analytics SDKs", "Crash reporting (Sentry)", "IAP & ads", "ASO"])]),
  ],

  game: [
    SEC("Foundations", "The math, logic and craft behind games.", [SUB("Programming", ["Programming basics", "C# or C++", "Data structures & algorithms", "Git"]), SUB("Math & Physics", ["Vectors & matrices", "Physics & collision", "Trigonometry for movement", "Probability & randomness"])]),
    SEC("Game Engines", "Build with industry-standard engines.", [SUB("Unity", ["Unity editor", "C# scripting", "Scenes & prefabs", "Physics & collisions", "UI & input"]), SUB("Unreal", ["Unreal editor", "Blueprints", "C++ in Unreal", "Materials & lighting"], true), SUB("Godot", ["Godot editor", "GDScript", "Scenes & nodes", "2D/3D features"], true)]),
    SEC("Gameplay Programming", "Make the game fun.", [SUB("Core Systems", ["Game loop & time", "Player movement & controls", "State machines", "Save systems", "Audio & VFX"]), SUB("Game AI", ["Pathfinding (A*)", "Behavior trees", "Navigation meshes", "Enemy & NPC logic"]), SUB("Procedural Content", ["Noise & generation", "Level design tools", "Modular systems"], true)]),
    SEC("Art & Sound", "Make it look and sound amazing.", [SUB("Game Art Basics", ["2D sprites & animation", "3D modeling (Blender)", "Texturing", "Animation rigging"], true), SUB("Sound & Music", ["Sound design", "Music composition", "FMOD / Wwise", "Audio implementation"])]),
    SEC("Multiplayer & Netcode", "Play with the world.", [SUB("Networking", ["Client-server architecture", "Authoritative servers", "Latency & prediction", "Matchmaking"], true)]),
    SEC("Production & Ship", "Finish and launch your game.", [SUB("Game Design", ["Core loops", "Level design", "Balancing", "Player psychology"]), SUB("Publishing", ["Steam & itch.io", "Mobile stores", "Playtesting", "Marketing & wishlists"]), SUB("Performance & Optimize", ["Profiling", "Draw calls & rendering", "Memory budgets", "Target platforms"])]),
  ],

  "ai-engineer": [
    SEC("Foundations", "The math and code behind modern AI.", [SUB("Programming", ["Python basics", "OOP & data structures", "Virtual environments", "Git & notebooks"]), SUB("Mathematics", ["Linear algebra", "Calculus essentials", "Probability & statistics", "Optimization basics"])]),
    SEC("Data & Experimentation", "AI runs on data.", [SUB("Data Handling", ["NumPy & Pandas", "Data cleaning & feature engineering", "SQL for ML", "Data pipelines"]), SUB("Experimentation", ["Train/test splits", "Metrics & evaluation", "Hyperparameter tuning", "Experiment tracking (MLflow)"])]),
    SEC("Machine Learning", "Classical ML before the hype.", [SUB("Supervised Learning", ["Regression", "Classification", "Decision trees & ensembles", "Model evaluation"]), SUB("Unsupervised & Beyond", ["Clustering", "Dimensionality reduction", "Anomaly detection", "Recommenders"])]),
    SEC("Deep Learning", "Neural networks that power modern AI.", [SUB("Neural Networks", ["PyTorch", "Backpropagation & gradients", "CNNs for vision", "RNNs & sequences"]), SUB("Transformer Architecture", ["Attention mechanisms", "Tokenization & embeddings", "Pretraining vs fine-tuning", "Hugging Face ecosystem"])]),
    SEC("LLM Engineering", "Build with foundation models.", [SUB("Prompting & RAG", ["Prompt engineering", "RAG pipelines", "Embeddings & vector databases", "Context & chunking"]), SUB("Agents & Tools", ["Agent frameworks (LangChain)", "Tool use & function calling", "Multi-agent systems", "Guardrails & safety"]), SUB("Fine-tuning & Evals", ["Fine-tuning strategies", "Evaluation suites", "LLM observability", "Cost & latency optimization"])]),
    SEC("Production AI", "Ship AI that people rely on.", [SUB("MLOps & Serving", ["Model serving", "A/B testing models", "Monitoring & drift", "MLflow & registries"]), SUB("Product & Ethics", ["AI product design", "Bias & fairness", "Privacy & compliance", "Responsible AI"])]),
  ],

  "ml-engineer": [
    SEC("Foundations", "Math, Python and data fluency.", [SUB("Programming", ["Python basics", "OOP & data structures", "Git & Docker", "Notebooks to scripts"]), SUB("Math & Stats", ["Linear algebra", "Calculus", "Probability", "Statistical inference"])]),
    SEC("Data Engineering for ML", "Models are only as good as their data.", [SUB("Data Wrangling", ["NumPy & Pandas", "Feature engineering", "Data validation", "Labeling & quality"]), SUB("Pipelines", ["SQL & BigQuery", "Feature stores", "Data pipelines (Airflow)", "Data versioning (DVC)"])]),
    SEC("Machine Learning", "The algorithms and how to use them.", [SUB("Classical ML", ["scikit-learn", "Regression & classification", "Ensembles & boosting", "Cross-validation"]), SUB("Evaluation", ["Metrics selection", "Bias-variance tradeoff", "Confidence intervals", "Model cards"])]),
    SEC("Deep Learning", "Scale up to neural networks.", [SUB("Deep Learning", ["PyTorch", "Training loops & GPUs", "CNNs & vision", "Transformers & LLMs"]), SUB("Modern Techniques", ["Transfer learning", "Distributed training", "Quantization & pruning", "Gradient accumulation"])]),
    SEC("MLOps & Serving", "The MLE owns production.", [SUB("Deployment", ["Model serving (TorchServe/SageMaker)", "Containers & K8s", "Online vs batch inference", "Feature & model registries"]), SUB("Monitoring", ["Drift detection", "Model performance monitoring", "Retraining triggers", "A/B tests & canaries"])]),
    SEC("Career & Impact", "From model to business value.", [SUB("Applied ML", ["Recommendation systems", "NLP applications", "Forecasting", "Computer vision products"]), B_SOFT]),
  ],

  "data-scientist": [
    SEC("Foundations", "The toolkit every data scientist starts with.", [SUB("Programming & Tools", ["Python basics", "Jupyter notebooks", "Git", "SQL basics"]), SUB("Statistics & Math", ["Descriptive statistics", "Probability", "Distributions", "Linear algebra essentials"])]),
    SEC("Data Analysis", "Clean, explore and understand.", [SUB("Data Wrangling", ["Pandas", "Data cleaning", "Merging & reshaping", "Handling missing data"]), SUB("Exploratory Analysis", ["EDA workflows", "Correlation & relationships", "Outlier detection", "Hypothesis generation"])]),
    SEC("Statistics & Experimentation", "Prove it with data.", [SUB("Inferential Statistics", ["Hypothesis testing", "Confidence intervals", "p-values & errors", "Bayesian basics"]), SUB("Experiments", ["A/B testing", "Sample size & power", "Experiment design", "Causal inference basics"])]),
    SEC("Machine Learning", "Predictive models as part of your toolkit.", [SUB("Modeling", ["scikit-learn", "Regression & classification", "Tree-based models", "Model evaluation & selection"]), SUB("Advanced Modeling", ["Feature engineering", "Ensembles", "Time series forecasting", "Clustering"])]),
    SEC("Communication & Visualization", "Insights only matter if they're understood.", [SUB("Data Visualization", ["Matplotlib & Seaborn", "Plotly", "Chart selection", "Dashboard design"]), SUB("Storytelling", ["Executive presentations", "Data narratives", "Visual reports", "Reproducible analysis"])]),
    SEC("Domain & Career", "Apply data science for real impact.", [SUB("Applied Domains", ["Product analytics", "Marketing analytics", "Finance & risk", "Healthcare & bio"], true), SUB("Industry Tools", ["BigQuery & SQL", "Airflow basics", "MLflow", "dbt basics"], true), B_SOFT]),
  ],

  "data-analyst": [
    SEC("Foundations", "The analyst's core toolkit.", [SUB("Excel", ["Excel basics", "Formulas & functions", "Pivot tables", "Charts & dashboards", "XLOOKUP & Power Query"]), SUB("SQL", ["SQL basics", "Joins & aggregations", "Window functions", "CTEs & subqueries"])]),
    SEC("Data Skills", "Get, clean and explore data.", [SUB("Python for Analysis", ["Python basics", "Pandas", "Data cleaning", "Jupyter notebooks"]), SUB("Data Exploration", ["EDA techniques", "Descriptive analysis", "Segmentation", "KPI design"])]),
    SEC("Visualization & BI", "Turn numbers into dashboards.", [SUB("BI Tools", ["Power BI", "Tableau", "Google Looker Studio", "Dashboard best practices"]), SUB("Visualization Craft", ["Chart selection", "Color & typography", "Executive dashboards", "Data storytelling"])]),
    SEC("Business Analytics", "Answer real business questions.", [SUB("Analytics Methods", ["Cohort analysis", "Funnel analysis", "A/B test analysis", "Forecasting basics"]), SUB("Business Context", ["Marketing metrics", "Sales & revenue analysis", "Product analytics", "Unit economics"])]),
    SEC("Tools & Automation", "Work smarter.", [SUB("Advanced Tooling", ["Google Analytics 4", "Airtable & Sheets", "Automation (Zapier/Sheets API)", "Basic Python automation"]), B_SOFT]),
    SEC("Career Portfolio", "Show what you can do.", [SUB("Portfolio Projects", ["End-to-end dashboard project", "Cleaning case study", "Business question analysis", "Public portfolio"])]),
  ],

  "data-engineer": [
    SEC("Foundations", "SQL, Python and the data platform mindset.", [SUB("Core Skills", ["SQL mastery", "Python basics", "Linux & command line", "Git & CI"]), SUB("Data Concepts", ["Data modeling", "OLTP vs OLAP", "Star & snowflake schemas", "Data governance basics"])]),
    SEC("Data Warehousing", "The analytical storehouse.", [SUB("Warehouses", ["Snowflake", "BigQuery", "Redshift", "Warehouse design"]), SUB("Modeling", ["dbt", "Incremental models", "Testing & documentation", "Data contracts"])]),
    SEC("Pipelines & Orchestration", "Move and transform data reliably.", [SUB("Orchestration", ["Airflow", "DAG design", "Retries & observability", "Scheduling"]), SUB("ELT/ETL", ["Extraction patterns", "Transformations", "Loading strategies", "Batch vs streaming"])]),
    SEC("Big Data & Streaming", "Handle data at planet scale.", [SUB("Distributed Processing", ["Spark", "Spark SQL & DataFrames", "Partitioning & shuffles", "Cluster management"]), SUB("Streaming", ["Kafka", "Streaming pipelines", "Event schemas", "Exactly-once semantics"])]),
    SEC("Cloud & Infrastructure", "The platform under the pipelines.", [SUB("Cloud Data Services", ["AWS (S3/Redshift/EMR)", "GCP (BigQuery/Dataflow)", "Azure Synapse", "Object storage patterns"]), SUB("Infrastructure", ["Terraform for data", "Docker & containers", "Permissions & security", "Cost optimization"])]),
    SEC("Data Quality & Career", "Trustworthy data, growing career.", [SUB("Quality & Ops", ["Data quality checks", "Observability & alerting", "Backfills & restores", "Runbooks"]), B_SOFT]),
  ],

  cloud: [
    SEC("Foundations", "Cloud starts with core systems knowledge.", [B_LINUX, SUB("Networking", ["Networking basics", "IP & DNS", "VPNs & VPCs", "Load balancing"]), B_GIT]),
    SEC("Core Cloud Services", "The building blocks of everything.", [SUB("Compute", ["Virtual machines", "Auto scaling", "Serverless functions", "Container services"]), SUB("Storage", ["Object storage (S3)", "Block & file storage", "CDN & edge", "Backup & lifecycle"]), SUB("Databases", ["Managed SQL", "NoSQL databases", "Data warehouses", "Database migration"])]),
    SEC("Architecture & Security", "Design and protect.", [SUB("Architecture", ["Well-architected frameworks", "High availability", "Disaster recovery", "Cost optimization"]), SUB("Security", ["IAM & least privilege", "Encryption", "Security groups & firewalls", "Compliance frameworks"])]),
    SEC("Automation & IaC", "Cloud as code.", [SUB("Infrastructure as Code", ["Terraform", "CloudFormation", "Modules & state", "Policy as code"]), SUB("CI/CD on Cloud", ["Pipeline services", "Deployment strategies", "Preview environments", "GitOps"])]),
    SEC("Certifications & Career", "Prove it, then grow.", [SUB("Certification Paths", ["AWS Solutions Architect", "Azure Administrator", "Google Associate Cloud Engineer", "Practice exams"]), B_SOFT]),
  ],

  devops: [
    SEC("Foundations", "The operator's toolbox.", [B_LINUX, B_GIT, SUB("Scripting", ["Bash scripting", "Python for automation", "Regex & text processing", "Makefiles & task runners"])]),
    SEC("Containers & Orchestration", "Package and run at scale.", [B_DOCKER, B_K8S]),
    SEC("CI/CD & Automation", "From commit to production automatically.", [B_CICD, SUB("Automation Tools", ["Ansible", "Automating everything", "Secrets management", "Environment promotion"])]),
    SEC("Infrastructure as Code", "Define infrastructure in code.", [SUB("IaC Tools", ["Terraform", "Pulumi", "Modules & workspaces", "State management"]), SUB("GitOps", ["Argo CD", "Flux", "Declarative delivery", "Drift detection"], true)]),
    SEC("Observability & Reliability", "Know everything, fail gracefully.", [B_OBS, SUB("Reliability", ["SLOs & error budgets", "Incident management", "Postmortems", "Chaos engineering"], true)]),
    SEC("Cloud Platforms", "Run it on the big three.", [B_AWS, B_CLOUD_OTHER]),
    SEC("Security in DevOps", "DevSecOps mindset.", [SUB("Secure Delivery", ["Shift-left security", "Image scanning", "SAST/DAST basics", "Supply chain security"])]),
  ],

  sre: [
    SEC("Foundations", "Software engineering meets operations.", [B_LINUX, B_GIT, SUB("Scripting & Go", ["Python for ops", "Go essentials", "Automation mindset", "Reliability math"])]),
    SEC("Container Platforms", "Run workloads reliably at scale.", [B_DOCKER, B_K8S]),
    SEC("Observability", "The SRE's superpower.", [B_OBS, SUB("Deep Observability", ["Distributed tracing", "SLO & burn rate alerts", "Dashboards that matter", "Log aggregation (Loki/ELK)"])]),
    SEC("Reliability Engineering", "Design for failure.", [SUB("Reliability Practices", ["Error budgets", "Capacity planning", "Load testing", "Disaster recovery drills"]), SUB("Incident Management", ["On-call rotations", "Incident command", "Blameless postmortems", "Runbooks & playbooks"])]),
    SEC("Automation & IaC", "Eliminate toil.", [SUB("Automation", ["Terraform", "Deploy automation", "Self-healing systems", "Toil reduction"])]),
    SEC("Career Growth", "From SRE to leader.", [B_SOFT, SUB("SRE Career", ["SLO-driven culture", "Platform reliability", "Tech leadership", "Interview prep (SRE)"])]),
  ],

  platform: [
    SEC("Foundations", "The platform engineer's core.", [B_LINUX, B_GIT, SUB("Programming", ["Go for platforms", "Python for tooling", "APIs & SDKs", "CLI development"])]),
    SEC("Kubernetes Platform", "The internal cloud.", [B_K8S, SUB("Platform Services", ["Ingress & gateways", "Service meshes", "Namespaces & quotas", "Cluster ops"])]),
    SEC("Developer Experience", "Build golden paths.", [SUB("IDP & Portals", ["Backstage", "Self-service catalog", "Scaffolding templates", "Developer portals"]), SUB("Golden Paths", ["Standardized stacks", "Templates & boilerplates", "Guardrails & policies", "Documentation as code"])]),
    SEC("CI/CD at Scale", "Pipelines that teams depend on.", [B_CICD, SUB("Platform CI/CD", ["Pipeline templates", "Caching & parallelism", "Matrix builds", "Argo CD & GitOps"])]),
    SEC("Observability & Cost", "Run platforms efficiently.", [B_OBS, SUB("FinOps & Efficiency", ["Cost allocation", "Resource optimization", "Capacity planning", "Budget alerts"])]),
    SEC("Career Growth", "Platform engineering leadership.", [B_SOFT, SUB("Product Mindset", ["Internal customer research", "Adoption metrics", "Roadmaps & SLAs", "Platform teams org design"])]),
  ],

  "security-analyst": [
    SEC("Foundations", "The defender's core knowledge.", [B_LINUX, SUB("Networking", ["Networking basics", "TCP/IP & protocols", "Packet analysis (Wireshark)", "DNS & email security"]), SUB("OS & Systems", ["Windows security", "Active Directory", "Endpoint hardening", "Logging & auditing"])]),
    SEC("Security Fundamentals", "Think like a defender.", [SUB("Core Concepts", ["CIA triad", "Risk management", "Threat modeling", "Security frameworks (NIST, ISO)"]), SUB("Cryptography", ["Hashing & encryption", "PKI & certificates", "TLS in practice", "Key management"])]),
    SEC("Defensive Operations", "Monitor, detect, respond.", [SUB("SOC Skills", ["SIEM (Splunk/Sentinel)", "Log analysis", "Alert triage", "Incident response"]), SUB("Threat Intelligence", ["Threat hunting", "IOC & TTPs", "OSINT", "Malware analysis basics"])]),
    SEC("Security Testing", "Validate the defenses.", [SUB("Vulnerability Management", ["Vulnerability scanning", "Patch management", "Assessment reporting", "Remediation tracking"]), SUB("Offensive Basics", ["Nmap & enumeration", "Web app testing basics", "Exploitation fundamentals", "Report writing"], true)]),
    SEC("Cloud & App Security", "Modern attack surfaces.", [SUB("Cloud Security", ["AWS/Azure security", "IAM & least privilege", "Cloud posture (CSPM)", "Container security"]), SUB("App Security", ["OWASP Top 10", "Secure SDLC", "SAST/DAST", "Security in CI/CD"])]),
    SEC("Certifications & Career", "Prove your skills.", [SUB("Certifications", ["CompTIA Security+", "CySA+", "CISSP", "Practical labs (Blue Team Labs, LetsDefend)"]), B_SOFT]),
  ],

  pentester: [
    SEC("Foundations", "The attacker's essential toolkit.", [B_LINUX, SUB("Networking", ["Networking basics", "TCP/IP deep dive", "Subnetting & routing", "Network scanning"]), SUB("Programming", ["Python for hacking", "Bash scripting", "Web technologies (HTML/JS)", "Databases & SQL"])]),
    SEC("Core Hacking Skills", "The fundamentals of exploitation.", [SUB("Reconnaissance", ["OSINT & recon", "Subdomain enumeration", "Port scanning (Nmap)", "Service fingerprinting"]), SUB("Exploitation", ["Vulnerability research", "Exploit basics", "Metasploit", "Privilege escalation"]), SUB("Cryptography for Hackers", ["Password cracking", "Hash attacks", "Wireless attacks", "Cryptographic weaknesses"])]),
    SEC("Web Application Attacks", "The most common target.", [SUB("Web Exploitation", ["OWASP Top 10", "SQL injection", "XSS & CSRF", "SSRF & IDOR", "Authentication bypasses", "Burp Suite mastery"]), SUB("API Security", ["API enumeration", "JWT attacks", "Rate limiting bypass", "Business logic flaws"])]),
    SEC("Network & Active Directory", "Move like an attacker.", [SUB("Network Attacks", ["MITM attacks", "SMB & NTLM", "Relay attacks", "Wireless pentesting"]), SUB("Active Directory", ["AD enumeration", "Kerberoasting", "Lateral movement", "Domain compromise (BloodHound)"])]),
    SEC("Labs & Practice", "Practice makes the hacker.", [SUB("Practice Platforms", ["TryHackMe", "Hack The Box", "PortSwigger Academy", "CTF competitions"]), B_SOFT]),
    SEC("Professional Pentesting", "Do it legally, do it well.", [SUB("Methodology & Reporting", ["PTES & OWASP testing guides", "Scoping & rules of engagement", "Pentest reports", "Remediation guidance"]), SUB("Certifications", ["eJPT", "OSCP", "PNPT", "CEH"]), SUB("Career Paths", ["Bug bounty hunting", "Red team", "AppSec engineer", "Security consulting"])]),
  ],

  network: [
    SEC("Foundations", "The fundamentals of connectivity.", [SUB("Networking Fundamentals", ["Networking basics", "OSI & TCP/IP models", "IP addressing & subnetting", "Ethernet & switching"]), SUB("Protocols", ["TCP & UDP", "ARP & DHCP", "DNS & HTTP", "Routing protocols basics"])]),
    SEC("Routing & Switching", "The craft of the network engineer.", [SUB("Switching", ["VLANs & trunking", "STP & redundancy", "Link aggregation", "Switching security"]), SUB("Routing", ["Static & dynamic routing", "OSPF", "EIGRP & BGP basics", "Route redistribution"])]),
    SEC("Network Services & Security", "Make it fast and safe.", [SUB("Services", ["NAT & PAT", "DHCP & DNS servers", "VPNs & tunnels", "QoS basics"]), SUB("Security", ["ACLs & firewall rules", "Network segmentation", "802.1X & NAC", "Security monitoring"])]),
    SEC("Automation & Modern Networking", "Networks are software now.", [SUB("Automation", ["Python for networks", "Ansible for network", "Netmiko & NAPALM", "API-driven network"]), SUB("Cloud & SDN", ["SD-WAN", "AWS VPC & networking", "Azure networking", "Zero-trust networking"])]),
    SEC("Certifications & Career", "Prove your craft.", [SUB("Certifications", ["CompTIA Network+", "Cisco CCNA", "JNCIA", "Cloud networking certs"]), B_SOFT]),
  ],

  blockchain: [
    SEC("Foundations", "The building blocks of decentralized systems.", [SUB("Cryptography & CS", ["Cryptography", "Hashing & Merkle trees", "Public key cryptography", "Distributed systems basics"]), SUB("Blockchain Fundamentals", ["How blockchains work", "Consensus mechanisms", "Blocks & transactions", "Wallets & keys"])]),
    SEC("Smart Contracts", "Code that runs on-chain.", [SUB("Solidity", ["Solidity basics", "Storage & gas", "Modifiers & events", "Token standards (ERC-20/721)"]), SUB("Security & Testing", ["Reentrancy & exploits", "Smart contract audits", "Testing (Hardhat)", "Safe dev patterns"])]),
    SEC("Web3 Development", "Connect contracts to users.", [SUB("DApp Tooling", ["ethers.js / viem", "Hardhat & Foundry", "Frontend integration", "IPFS & storage"]), SUB("DeFi & Protocols", ["DeFi primitives", "DEX & AMMs", "Lending protocols", "Oracles"])]),
    SEC("Ethereum & Beyond", "The ecosystem you'll build in.", [SUB("Ethereum", ["EVM & accounts", "Layer 2 solutions", "Gas optimization", "EIPs & standards"]), SUB("Other Chains", ["Solana basics", "Polygon & sidechains", "Bitcoin scripting", "Cross-chain bridges"], true)]),
    SEC("Career & Portfolio", "Build and ship.", [SUB("Portfolio Projects", ["Deploy a dApp to testnet", "An audited contract", "A DeFi dashboard", "An NFT collection"], true), B_SOFT]),
  ],

  embedded: [
    SEC("Foundations", "C, electronics and computer architecture.", [SUB("Programming", ["C programming", "Pointers & memory", "Bit manipulation", "C++ essentials"]), SUB("Electronics & Hardware", ["Circuit basics", "Digital logic", "Datasheets & schematics", "Oscilloscope & tools"]), SUB("Computer Architecture", ["CPU & registers", "Memory hierarchy", "Interrupts & exceptions", "Boot process"])]),
    SEC("Microcontrollers", "The heart of embedded systems.", [SUB("MCU Platforms", ["Arduino", "STM32", "ESP32", "Register-level programming"]), SUB("Interfacing", ["GPIO & peripherals", "ADC & PWM", "I2C & SPI & UART", "Sensors & actuators"])]),
    SEC("Real-Time Systems", "Meet deadlines, always.", [SUB("RTOS & Concurrency", ["FreeRTOS", "Tasks & scheduling", "Semaphores & queues", "Real-time constraints"])]),
    SEC("Firmware Development", "Professional firmware craft.", [SUB("Development", ["Toolchains & debuggers (JTAG)", "Memory management", "Bootloaders", "Firmware updates (OTA)"]), SUB("Quality & Testing", ["Unit testing (Unity/CMock)", "HIL testing", "Static analysis", "Safety standards (MISRA)"])]),
    SEC("Advanced & Career", "Go deeper, go further.", [SUB("Advanced Topics", ["Linux kernel & drivers", "RTOS internals", "Power optimization", "Functional safety"], true), B_SOFT]),
  ],

  iot: [
    SEC("Foundations", "The IoT stack head to toe.", [SUB("Embedded Basics", ["C programming", "Microcontrollers (ESP32)", "Sensors & actuators", "Circuit basics"]), SUB("Networking", ["Networking basics", "Wireless protocols", "IP & MQTT", "Edge vs cloud"])]),
    SEC("Device Development", "Build the thing that senses.", [SUB("Firmware", ["ESP-IDF & Arduino", "Sensor drivers", "Power management", "OTA updates"]), SUB("Communication", ["MQTT", "CoAP & HTTP", "BLE & Zigbee", "LoRaWAN"])]),
    SEC("IoT Platforms & Cloud", "Connect devices to the world.", [SUB("IoT Cloud", ["AWS IoT Core", "Azure IoT Hub", "Device shadows & twins", "Device management"]), SUB("Data Pipeline", ["Ingestion & storage", "Time-series databases", "Rules engines", "Dashboards (Grafana)"])]),
    SEC("Integration & Security", "Real products, real risks.", [SUB("Integration", ["Raspberry Pi & Linux devices", "Protocol gateways", "Edge computing", "ML on the edge"], true), SUB("Security", ["Device authentication", "Secure boot", "Encryption in transit", "OTA security"])]),
    SEC("Career & Portfolio", "Ship connected products.", [SUB("Portfolio Projects", ["Smart home system", "Environmental monitor", "Fleet of sensors", "Edge ML device"], true), B_SOFT]),
  ],

  qa: [
    SEC("Foundations", "What quality really means.", [SUB("Testing Fundamentals", ["Testing fundamentals", "Test types & levels", "Test cases & design", "Bug lifecycle & reporting"]), SUB("SDLC & Agile", ["SDLC & STLC", "Agile & Scrum", "Requirements analysis", "Risk-based testing"])]),
    SEC("Manual Testing", "The art of finding bugs.", [SUB("Manual Skills", ["Exploratory testing", "Functional & regression", "UAT & acceptance", "Test documentation"]), SUB("Tools", ["Jira & test management", "Browser DevTools", "Database testing", "Postman basics"])]),
    SEC("Test Automation", "Test once, run forever.", [SUB("Automation Foundations", ["JavaScript/Python basics", "Automation frameworks", "Selectors & waits", "Page object model"]), SUB("Automation Tools", ["Playwright", "Cypress", "Selenium", "Visual regression"]), SUB("API Testing", ["API testing", "Postman collections", "Contract testing", "GraphQL testing"])]),
    SEC("Advanced QA", "Scale quality across teams.", [SUB("CI/CD & Testing", ["Testing in CI/CD", "Test environments", "Data & test fixtures", "Test reporting"]), SUB("Performance & Security", ["Performance testing (k6/JMeter)", "Load & stress testing", "Security testing basics", "Accessibility testing"])]),
    SEC("Career & Certification", "From tester to quality leader.", [SUB("Certifications", ["ISTQB Foundation", "ISTQB Advanced", "Test Automation University"]), B_SOFT]),
  ],

  "qa-automation": [
    SEC("Foundations", "Programming + testing basics.", [SUB("Programming", ["JavaScript or Python", "Git", "HTTP & APIs", "CLI & CI basics"]), SUB("Testing Core", ["Testing fundamentals", "Test design", "Bug reporting", "Test environments"])]),
    SEC("Automation Frameworks", "Build the test machinery.", [SUB("E2E Frameworks", ["Playwright", "Cypress", "Test data & fixtures", "Visual testing"]), SUB("Framework Design", ["Page objects", "Custom commands", "Retries & resilience", "Reporting & artifacts"])]),
    SEC("API & Integration Testing", "Test below the UI.", [SUB("API Testing", ["API testing", "Postman + Newman", "Contract testing", "Test doubles & mocks"]), SUB("Integration", ["CI integration", "Test data management", "Database testing", "Cross-browser testing"])]),
    SEC("Advanced Automation", "Test at scale.", [SUB("Performance & Mobile", ["Performance testing basics", "Mobile automation", "Visual & accessibility checks", "Test orchestration"]), B_SOFT]),
    SEC("Career", "SDET and beyond.", [SUB("Growth Paths", ["SDET roles", "Test architecture", "QA lead", "Interview prep"]), SUB("Certifications", ["ISTQB Test Automation", "Test Automation University"])]),
  ],

  "qa-manual": [
    SEC("Foundations", "Start with the testing mindset.", [SUB("Testing Fundamentals", ["Testing fundamentals", "Test cases & checklists", "Test data", "Bug lifecycle"]), SUB("Process", ["SDLC & STLC", "Agile basics", "Requirements review", "Defect management (Jira)"])]),
    SEC("Manual Testing Skills", "The craft of finding bugs.", [SUB("Core Techniques", ["Functional testing", "Exploratory testing", "Regression testing", "UAT & smoke tests"]), SUB("Tools", ["DevTools", "Postman basics", "Test management tools", "Trackers & docs"])]),
    SEC("Specialized Testing", "Go beyond happy paths.", [SUB("Specializations", ["Mobile testing", "Database testing", "Accessibility checks", "Cross-browser testing"]), B_SOFT]),
    SEC("Career Path", "Grow into automation.", [SUB("Growth", ["Introduction to automation", "ISTQB certification", "QA career paths", "Resume & interview prep"])]),
  ],

  dba: [
    SEC("Foundations", "Databases start with core data concepts.", [
      SUB("Data Fundamentals", ["SQL basics", "Database design & normalization", "Data modeling", "ACID & transactions", "Data types & constraints"]),
      B_LINUX,
      B_GIT,
    ]),
    SEC("Database Systems", "Master the engines you'll administer.", [
      SUB("Relational", ["PostgreSQL", "MySQL", "SQL Server", "Oracle basics"], true),
      SUB("NoSQL", ["MongoDB", "Redis", "Elasticsearch", "Cassandra"], true),
      SUB("Administration", ["Installation & configuration", "Users & permissions", "Backup & restore strategies", "Replication & high availability"]),
    ]),
    SEC("Performance & Tuning", "Fast queries, happy users.", [
      SUB("Optimization", ["Indexes & query plans", "Query optimization", "Monitoring & metrics", "Capacity planning"]),
      SUB("Maintenance", ["Vacuum & reindexing", "Partitioning & sharding", "Storage management", "Patching & upgrades"]),
    ]),
    SEC("Cloud & Automation", "Modern DBA territory.", [
      SUB("Cloud Databases", ["AWS RDS & Aurora", "Cloud SQL", "Azure SQL", "Managed services vs self-managed"]),
      SUB("Automation", ["Terraform for databases", "CI for schema changes", "Flyway / Liquibase migrations", "IaC best practices"]),
      SUB("Security", ["Encryption at rest & transit", "Row-level security", "Audit logging", "Compliance (GDPR/SOX)"]),
    ]),
    SEC("Career & Certifications", "Prove your craft.", [
      SUB("Certifications", ["PostgreSQL Professional", "Oracle OCP", "Microsoft Azure Database Administrator", "AWS Database Specialty"]),
      B_SOFT,
    ]),
  ],

  "solutions-architect": [
    SEC("Foundations", "Architecture starts with fundamentals.", [SUB("Technical Core", ["Networking basics", "Linux", "Databases & data modeling", "System design"]), B_GIT]),
    SEC("Cloud Architecture", "Design on the big platforms.", [SUB("AWS Architecture", ["AWS well-architected", "Compute & storage patterns", "Serverless architectures", "Cost optimization"]), SUB("Multi-Cloud", ["Azure architecture", "GCP architecture", "Hybrid & migration", "Cloud-native patterns"], true)]),
    SEC("Design & Patterns", "The architect's toolkit.", [SUB("Architecture Patterns", ["Microservices & event-driven", "Layered & clean architecture", "Caching & CDN patterns", "Data architecture"]), SUB("Non-Functional Design", ["Scalability & HA", "Security architecture", "Disaster recovery", "Performance & SLAs"])]),
    SEC("Enterprise Skills", "Architects talk to business.", [SUB("Business & Stakeholders", ["Requirements to architecture", "TOGAF basics", "TCO & ROI analysis", "Executive communication"]), SUB("Delivery", ["Architecture reviews", "Reference architectures", "Proofs of concept", "Documentation & diagrams"])]),
    SEC("Certifications & Career", "Credentials that open doors.", [SUB("Certifications", ["AWS Solutions Architect Pro", "Azure Solutions Architect Expert", "Google Professional Cloud Architect", "TOGAF 9"]), B_SOFT]),
  ],

  systems: [
    SEC("Foundations", "Systems engineering starts with the OS.", [SUB("Operating Systems", ["Linux", "Windows Server", "Filesystems & storage", "Processes & services"]), SUB("Hardware & Virtualization", ["Server hardware", "Virtualization (VMware/KVM)", "Storage arrays & SAN", "Bare metal vs cloud"])]),
    SEC("Administration", "Run the servers reliably.", [SUB("Linux Administration", ["User & permission management", "Systemd & services", "Networking & firewalls", "Package management"]), SUB("Windows Administration", ["Active Directory", "Group policy", "Powershell automation", "WSUS & patching"])]),
    SEC("Automation & Monitoring", "Do less, see more.", [SUB("Automation", ["Bash & PowerShell", "Ansible", "Cron & scheduled tasks", "Configuration management"]), SUB("Monitoring & Ops", ["Monitoring basics", "Log management", "Backup & restore", "Incident handling"])]),
    SEC("Security & Compliance", "Harden everything.", [SUB("Security", ["System hardening", "Patch management", "Access control", "Audit & compliance"])]),
    SEC("Career & Certifications", "Prove your skills.", [SUB("Certifications", ["RHCSA", "CompTIA Server+", "Azure Administrator", "LPIC"]), B_SOFT]),
  ],

  "product-manager": [
    SEC("Foundations", "What product management actually is.", [SUB("PM Fundamentals", ["Product lifecycle", "PM vs PO vs PMM", "Stakeholder management", "Product strategy basics"]), SUB("User Understanding", ["Customer discovery", "User research basics", "Personas & jobs-to-be-done", "Problem framing"])]),
    SEC("Discovery & Strategy", "Decide what to build and why.", [SUB("Strategy", ["Market analysis", "Competitive analysis", "Roadmapping", "OKRs & KPIs"]), SUB("Prioritization", ["Prioritization frameworks", "Effort vs impact", "RICE & value scoring", "Saying no"])]),
    SEC("Delivery", "Ship products that work.", [SUB("Product Delivery", ["PRDs & requirements", "Agile & scrum for PMs", "Backlog management", "Launch planning"]), SUB("Data & Metrics", ["Product analytics", "North star metrics", "A/B testing", "Funnel analysis"])]),
    SEC("Design & Tech Fluency", "Speak the language.", [SUB("Design Collaboration", ["UX principles", "Wireframes & prototypes", "Design reviews", "Usability testing"]), SUB("Technical Fluency", ["How software is built", "APIs & architecture basics", "AI product fundamentals", "Technical debt tradeoffs"])]),
    SEC("Career & Portfolio", "Show your product thinking.", [SUB("Portfolio", ["Product teardowns", "A full PRD", "A metrics framework", "Case studies"], true), B_SOFT, SUB("Specializations", ["Growth PM", "AI product manager", "Platform PM", "B2B product"])]),
  ],

  "ui-ux": [
    SEC("Foundations", "The principles behind every good design.", [SUB("Design Principles", ["Design principles", "Color theory", "Typography", "Layout & grid systems", "Visual hierarchy"]), SUB("Tools", ["Figma", "Design files & components", "Prototyping", "Collaboration workflow"])]),
    SEC("UX Design", "Design for how people think.", [SUB("UX Fundamentals", ["UX research", "User personas & journeys", "Information architecture", "Wireframing", "Usability testing"]), SUB("UX Methods", ["User flows", "Sitemaps", "Heuristic evaluation", "Accessibility (WCAG)"])]),
    SEC("UI Design", "Make it look and feel premium.", [SUB("UI Craft", ["UI design", "Component design", "Design tokens & theming", "Micro-interactions", "States & motion"]), SUB("Design Systems", ["Design systems", "Component libraries", "Documentation", "Handoff to engineers"])]),
    SEC("Portfolio & Career", "Land the role.", [SUB("Portfolio", ["Case studies", "Process storytelling", "Visual polish", "Portfolio site"]), B_SOFT, SUB("Specializations", ["Product design", "Design systems", "UX research", "Mobile design"])]),
  ],

  "ux-design": [
    SEC("Foundations", "The UX mindset.", [SUB("UX Fundamentals", ["What is UX", "Design thinking", "User-centered design", "UX principles"]), SUB("Research Basics", ["UX research", "User interviews", "Surveys & questionnaires", "Contextual inquiry"])]),
    SEC("Research & Strategy", "Understand before you design.", [SUB("Research Methods", ["Usability testing", "A/B testing", "Analytics & heatmaps", "Synthesis & insights"]), SUB("Strategy", ["Personas & JTBD", "Journey maps", "Service blueprints", "Problem statements"])]),
    SEC("Design & Prototyping", "Turn insight into design.", [SUB("Design Skills", ["Information architecture", "Wireframing", "Figma prototyping", "Interaction design"]), SUB("Evaluation", ["Heuristic evaluation", "Usability metrics", "Accessibility audits", "Iteration loops"])]),
    SEC("Portfolio & Career", "Show the process, not just pixels.", [SUB("Portfolio", ["UX case studies", "Process storytelling", "Impact metrics", "Portfolio review"]), B_SOFT]),
  ],

  "graphic-design": [
    SEC("Foundations", "The grammar of visual design.", [SUB("Design Fundamentals", ["Design principles", "Color theory", "Typography", "Composition & layout", "Branding basics"]), SUB("Tools", ["Adobe Illustrator", "Photoshop", "InDesign", "Figma & Canva"])]),
    SEC("Core Design Skills", "Make the work.", [SUB("Visual Skills", ["Logo design", "Poster & print design", "Editorial layout", "Icon design", "Social media graphics"]), SUB("Brand Identity", ["Brand identity", "Brand guidelines", "Mood boards", "Logo systems"])]),
    SEC("Production & Client Work", "Ship like a professional.", [SUB("Production", ["Print vs digital", "File prep & formats", "Color management", "Working with printers"]), SUB("Client Work", ["Briefs & feedback", "Presentations", "Pricing & scoping", "Portfolio development"]), B_SOFT]),
    SEC("Career & Growth", "Specialize and level up.", [SUB("Specializations", ["Branding", "Packaging", "Editorial", "Advertising", "Motion"]), SUB("Freelance & Career", ["Freelancing basics", "Agency vs in-house", "Building a studio", "Marketing yourself"])]),
  ],

  "motion-design": [
    SEC("Foundations", "Design + motion fundamentals.", [SUB("Design Basics", ["Design principles", "Composition & color", "Typography in motion", "Storyboarding"]), SUB("Animation Basics", ["Keyframes & easing", "Timing & rhythm", "12 principles of animation", "After Effects basics"])]),
    SEC("Core Motion Skills", "The craft.", [SUB("After Effects Mastery", ["Shape & text animation", "Masks & mattes", "Expressions basics", "3D in AE"]), SUB("Motion Craft", ["Logo animation", "Kinetic typography", "Explainer videos", "UI animation"])]),
    SEC("Tools & Pipeline", "Work like a pro.", [SUB("Extended Toolset", ["Cinema 4D basics", "Premiere Pro", "Lottie & web animation", "Sound design basics"]), SUB("Production", ["Client briefs", "Style frames", "Deliverables & formats", "File management"])]),
    SEC("Portfolio & Career", "Show your movement.", [SUB("Portfolio", ["Showreel", "Case studies", "Style exploration", "Personal projects"]), B_SOFT]),
  ],

  "ar-vr": [
    SEC("Foundations", "The math and craft of spatial computing.", [SUB("Programming & Math", ["C# or C++", "3D math (vectors & matrices)", "Linear algebra for XR", "Unity basics"]), SUB("3D Fundamentals", ["3D graphics concepts", "Rendering basics", "Modeling basics (Blender)", "Scene & lighting"])]),
    SEC("XR Development", "Build immersive experiences.", [SUB("VR Development", ["VR concepts & presence", "Unity XR toolkit", "Room-scale VR", "Hand tracking"]), SUB("AR Development", ["ARCore & ARKit", "Image & plane tracking", "Spatial anchors", "Occlusion & lighting"])]),
    SEC("Interaction & UX", "Design for 3D space.", [SUB("Interaction Design", ["Spatial UX", "Gaze & controller input", "Hand interactions", "Comfort & locomotion"]), B_SOFT]),
    SEC("Performance & Ship", "Smooth or sick.", [SUB("Performance", ["Frame budgets", "GPU optimization", "Occlusion culling", "Profiling XR apps"]), SUB("Publishing", ["App Store/Play XR rules", "Meta & Steam stores", "WebXR", "Enterprise XR"])]),
    SEC("Career & Portfolio", "Build your XR career.", [SUB("Portfolio", ["A VR experience", "An AR visualizer", "An XR demo reel", "Open-source contributions"], true)]),
  ],

  "technical-writer": [
    SEC("Foundations", "Writing that engineers respect.", [SUB("Writing Fundamentals", ["Technical writing basics", "Clear & concise prose", "Information architecture", "Style guides (Google, Microsoft)"]), SUB("Tools", ["Markdown", "Git & docs-as-code", "Docs generators", "Diagrams as code"])]),
    SEC("Core Documentation", "The docs every product needs.", [SUB("Doc Types", ["Getting started guides", "How-to guides", "API reference docs", "Tutorials & examples", "Troubleshooting"]), SUB("Audience & Research", ["Understanding users", "Technical interviews", "Reading code", "Working with engineers"])]),
    SEC("API & Developer Docs", "The specialty that pays.", [SUB("API Docs", ["OpenAPI/Swagger", "Endpoint documentation", "SDK docs", "Changelogs & release notes"]), SUB("Developer Experience", ["DX best practices", "Code samples", "Quickstarts", "Docs metrics"])]),
    SEC("Career & Community", "Grow the craft.", [SUB("Community", ["Write the Docs", "Open-source docs contributions", "Tech comm conferences", "Content reviews"]), B_SOFT]),
  ],

  "business-analyst": [
    SEC("Foundations", "The BA mindset.", [SUB("Core Skills", ["Business analysis fundamentals", "Systems thinking", "Excel & data literacy", "Process modeling"]), SUB("Stakeholder Skills", ["Stakeholder management", "Facilitation", "Communication", "Requirements elicitation"])]),
    SEC("Requirements & Analysis", "The heart of the role.", [SUB("Requirements", ["Requirement types", "User stories & acceptance criteria", "BRDs & FRDs", "Traceability"]), SUB("Analysis", ["Gap analysis", "Process mapping (BPMN)", "Data analysis (SQL)", "Root cause analysis"])]),
    SEC("Delivery & Change", "From analysis to impact.", [SUB("Delivery", ["Agile for BAs", "UAT coordination", "Change management", "Training & rollout"]), SUB("Tools", ["Jira & Confluence", "SQL", "Power BI", "Lucidchart/Miro"])]),
    SEC("Certifications & Career", "Prove and grow.", [SUB("Certifications", ["IIBA ECBA", "CCBA/CBAP", "Google Data Analytics", "Agile BA"]), B_SOFT]),
  ],

  erp: [
    SEC("Foundations", "ERP starts with business processes.", [SUB("Business Processes", ["Core business functions", "Finance & accounting flows", "Supply chain flows", "HR & payroll flows"]), SUB("ERP Concepts", ["What is ERP", "ERP modules & integration", "Data & master data", "ERP project lifecycle"])]),
    SEC("Platform Skills", "The systems you'll implement.", [SUB("ERP Platforms", ["SAP overview", "Oracle ERP", "Microsoft Dynamics", "NetSuite", "Tally/Zoho for SMB"], true), SUB("Data Skills", ["SQL basics", "Data migration", "Data quality", "Reporting & BI"]), SUB("Config & Tech", ["Configuration vs customization", "Workflows & automation", "Integrations & APIs", "Testing (UAT)"])]),
    SEC("Implementation", "The consultant's craft.", [SUB("Project Delivery", ["Requirements workshops", "Fit-gap analysis", "Blueprint & design", "Cutover & go-live"]), SUB("Change & Training", ["Change management", "User training", "Documentation", "Post-go-live support"])]),
    SEC("Career & Certifications", "Consulting career.", [SUB("Certifications", ["SAP certifications", "Microsoft Dynamics", "Oracle certs", "NetSuite certs"]), B_SOFT]),
  ],

  sap: [
    SEC("Foundations", "SAP starts with business + ABAP basics.", [SUB("Business Foundation", ["Business processes", "Finance (FI) basics", "Logistics (MM/SD) basics", "Master data concepts"]), SUB("SAP Platform", ["SAP landscape", "S/4HANA basics", "Fiori & UX", "BTP overview"])]),
    SEC("Module Specialization", "Go deep in one area.", [SUB("Core Modules", ["SAP FI/CO", "SAP SD", "SAP MM", "SAP HCM", "SAP PP"]), SUB("Configuration", ["IMG & configuration", "Organizational structures", "Document types & numbers", "Customizing flows"])]),
    SEC("Technical Skills", "The developer track.", [SUB("ABAP", ["ABAP basics", "Reports & forms", "ALV & OO ABAP", "ABAP on HANA"], true), SUB("Integration", ["IDocs & RFC", "API & OData", "Data migration (LSMW)", "Integration tools"])]),
    SEC("Implementation & Career", "Deliver and grow.", [SUB("Project Work", ["Blueprinting", "Configuration workshops", "Testing & UAT", "Training & go-live"]), SUB("Certifications", ["SAP Certified Application Associate", "S/4HANA certs", "Fiori/UI5"]), B_SOFT]),
  ],

  salesforce: [
    SEC("Foundations", "CRM + platform fundamentals.", [SUB("Salesforce Platform", ["What is Salesforce", "Objects & fields", "Records & security model", "Salesforce licenses & editions"]), SUB("Admin Foundations", ["Users & profiles", "Roles & permission sets", "Sharing rules", "Data management"])]),
    SEC("Administration", "The admin track.", [SUB("Admin Skills", ["Object configuration", "Flows & automation", "Reports & dashboards", "App builder", "Security settings"]), SUB("Data", ["Data import/export", "Data quality", "Duplicate management", "Data migration"])]),
    SEC("Development", "The developer track.", [SUB("Apex & LWC", ["Apex basics", "SOQL & DML", "Lightning Web Components", "JavaScript in Salesforce"]), SUB("Development Tools", ["VS Code + Salesforce CLI", "Dev hubs & scratch orgs", "Testing & deployments", "Git integration"])]),
    SEC("Certifications & Career", "The ecosystem rewards credentials.", [SUB("Certifications", ["Salesforce Administrator", "Platform Developer I", "Platform Developer II", "Salesforce AI Associate"]), SUB("Career Paths", ["Admin to architect", "Technical architect", "Consulting", "Boutique agencies"]), B_SOFT]),
  ],

  powerbi: [
    SEC("Foundations", "Excel + data modeling first.", [SUB("Data Foundations", ["Excel proficiency", "SQL basics", "Data types & quality", "Business metrics"]), SUB("Power BI Basics", ["Power BI Desktop", "Data sources & connectors", "Query editor (Power Query)", "Report canvas"])]),
    SEC("Data Modeling", "The heart of Power BI.", [SUB("Modeling", ["Star schemas", "Relationships", "Measures & calculated columns", "DAX fundamentals", "Row-level security"])]),
    SEC("Visualization & Reports", "Dashboards people use.", [SUB("Visuals", ["Core visualizations", "Custom visuals", "Bookmarks & drill-through", "Report design best practices"]), SUB("DAX Deep Dive", ["Time intelligence", "Filter context", "CALCULATE mastery", "Performance tuning"])]),
    SEC("Service & Deployment", "Share and govern.", [SUB("Power BI Service", ["Workspaces & sharing", "Dataflows & datasets", "Gateways", "Usage metrics"]), SUB("Enterprise", ["Row-level security", "Certification & endorsement", "Automation & alerts", "Power BI + Fabric"])]),
    SEC("Certifications & Career", "Prove your skills.", [SUB("Certifications", ["Microsoft PL-300", "PL-900", "DAX courses"]), B_SOFT]),
  ],

  "data-viz": [
    SEC("Foundations", "Data + design fundamentals.", [SUB("Data Skills", ["Data literacy", "Excel & SQL basics", "Data cleaning", "Statistics basics"]), SUB("Design Skills", ["Design principles", "Chart selection", "Color & perception", "Typography for data"])]),
    SEC("Visualization Craft", "The core skill.", [SUB("Chart Types", ["Bar & line charts", "Scatter & distributions", "Maps & geospatial", "Hierarchies & networks"]), SUB("Tools", ["Tableau", "Power BI", "Python (Plotly)", "D3.js basics"])]),
    SEC("Dashboards & Storytelling", "Make data memorable.", [SUB("Dashboards", ["Dashboard design", "KPI frameworks", "Executive dashboards", "Iteration & feedback"]), SUB("Data Storytelling", ["Narrative structure", "Annotation & context", "Presentations", "Data journalism"])]),
    SEC("Career & Portfolio", "Show your work.", [SUB("Portfolio", ["Tableau Public portfolio", "A data story project", "A dashboard redesign", "Critique series"], true), B_SOFT]),
  ],

  wordpress: [
    SEC("Foundations", "HTML, CSS, PHP and WordPress basics.", [SUB("Web Foundations", ["HTML basics", "CSS basics", "PHP basics", "JavaScript basics", "Git"]), SUB("WordPress Core", ["WordPress basics", "Posts vs pages", "Themes & plugins", "Admin & settings", "Local development"])]),
    SEC("Theme Development", "Build custom sites.", [SUB("Theme Craft", ["Theme anatomy", "Template hierarchy", "Customizer & settings", "Enqueueing assets", "Block themes & FSE"]), SUB("Block Development", ["Gutenberg blocks", "Block patterns", "Custom block development", "ACF fields"])]),
    SEC("Plugin & WooCommerce", "Extend and sell.", [SUB("Plugins", ["Plugin architecture", "Hooks & filters", "Custom post types", "Shortcodes & widgets"]), SUB("WooCommerce", ["WooCommerce setup", "Products & variants", "Payments & shipping", "Store optimization"])]),
    SEC("Performance & Security", "Sites that survive traffic.", [SUB("Performance", ["Caching & CDN", "Image optimization", "Database optimization", "Core Web Vitals"]), SUB("Security", ["WordPress security", "Hardening & backups", "Updates & maintenance", "Malware response"])]),
    SEC("Career & Business", "From freelancer to agency.", [SUB("Career", ["Client work", "Pricing & scoping", "Portfolio sites", "Maintenance retainers"]), B_SOFT]),
  ],

  "no-code": [
    SEC("Foundations", "Think like a builder without code.", [SUB("Product Thinking", ["Problem solving", "User flows", "Logic & data modeling", "Rapid iteration"]), SUB("Tool Landscape", ["No-code ecosystem", "Choosing the right tool", "AI no-code tools", "Tool stacks"])]),
    SEC("Core Tools", "The stack you'll ship with.", [SUB("App Builders", ["Bubble", "Softr", "Glide", "Framer"]), SUB("Data & Automation", ["Airtable", "Notion databases", "Zapier / Make", "Supabase basics"])]),
    SEC("Websites & Commerce", "Ship the web without code.", [SUB("Websites", ["Webflow", "Framer sites", "SEO basics", "Analytics"]), SUB("Commerce", ["Shopify basics", "Checkout & payments", "Memberships", "Marketing sites"])]),
    SEC("Shipping & Scaling", "Real products, real users.", [SUB("Production", ["Auth & users", "Payments (Stripe)", "API integrations", "Testing & QA"]), B_SOFT]),
    SEC("Career & Portfolio", "The no-code career.", [SUB("Portfolio", ["A shipped MVP", "A marketplace prototype", "An automation playbook", "Client case studies"], true)]),
  ],

  "prompt-engineer": [
    SEC("Foundations", "How LLMs actually work.", [SUB("LLM Fundamentals", ["How LLMs work", "Tokens & context windows", "Capabilities & limits", "Model landscape (GPT, Claude, Gemini, Llama)"]), SUB("AI Literacy", ["AI product basics", "Ethics & safety", "Hallucination awareness", "Evaluation mindset"])]),
    SEC("Prompt Craft", "The core skill.", [SUB("Techniques", ["Prompt engineering", "Role & context prompts", "Few-shot & chain-of-thought", "Structured outputs", "System prompts"]), SUB("Workflows", ["Prompt frameworks", "Personas & constraints", "Iterative refinement", "Versioning prompts"])]),
    SEC("Evaluation & Reliability", "Make AI dependable.", [SUB("Evaluation", ["Output evaluation", "Bias & safety checks", "Red-teaming basics", "Quality metrics"]), SUB("Integration", ["APIs & function calling", "RAG basics", "Agent workflows", "Human-in-the-loop"])]),
    SEC("Career & Portfolio", "From prompting to building.", [SUB("Portfolio", ["A prompt library", "An eval suite", "An AI automation", "A case study"], true), B_SOFT]),
  ],

  "ai-product": [
    SEC("Foundations", "Full-stack + AI fundamentals.", [SUB("Engineering Base", ["JavaScript & React", "TypeScript", "Backend basics (Node)", "Git & deployment"]), SUB("AI Base", ["How LLMs work", "Prompt engineering", "RAG fundamentals", "Model APIs"])]),
    SEC("AI Features", "The patterns that ship.", [SUB("LLM App Patterns", ["RAG pipelines", "Agents & tool use", "Chat & copilots", "Streaming UX"]), SUB("Data & Evaluation", ["Embeddings & vector DBs", "Evaluation suites", "Guardrails & safety", "Cost & latency"])]),
    SEC("Product & UX for AI", "Design AI people trust.", [SUB("AI UX", ["AI product design", "Uncertainty & feedback", "Personalization", "Ethics & transparency"]), SUB("Product Craft", ["Prototyping fast", "Metrics for AI", "Iteration loops", "Launch strategies"])]),
    SEC("Ship & Scale", "Production AI products.", [SUB("Engineering", ["Full-stack integration", "Observability for AI", "Security & privacy", "Performance"]), B_SOFT]),
    SEC("Career & Portfolio", "Build your AI portfolio.", [SUB("Portfolio", ["A shipped AI app", "An agent project", "An eval-driven iteration", "An AI case study"], true)]),
  ],
};
