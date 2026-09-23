// ─────────────────────────────────────────────────────────────────────────────
// Long-tail resource library — Part C1 (web / mobile / game / languages)
// Keys are the last component of each failing node's nodePathId (== builder topicSlug),
// or "roadmapSlug::key" when the same label appears on several roadmaps and the
// resources must differ (qualified form always wins). Same entry shape as Part A/B1.
// ─────────────────────────────────────────────────────────────────────────────

export const LONGTAIL_C1 = {
  // ── full-stack-developer ─────────────────────────────────────────────────
  "jsx-syntax": [
    { title: "Writing markup with JSX — React Docs", url: "https://react.dev/learn/writing-markup-with-jsx", type: "official-doc", qualityScore: 5 },
    { title: "JSX in depth — React legacy docs", url: "https://legacy.reactjs.org/docs/jsx-in-depth.html", type: "official-doc", qualityScore: 4 },
  ],
  "props-and-children": [
    { title: "Passing props to a component — React Docs", url: "https://react.dev/learn/passing-props-to-a-component", type: "official-doc", qualityScore: 5 },
    { title: "Children prop — React reference", url: "https://react.dev/reference/react/Children", type: "reference", qualityScore: 4 },
  ],
  "conditional-rendering": [
    { title: "Conditional rendering — React Docs", url: "https://react.dev/learn/conditional-rendering", type: "official-doc", qualityScore: 5 },
  ],
  "usestate-useeffect": [
    { title: "useState — React Docs", url: "https://react.dev/reference/react/useState", type: "official-doc", qualityScore: 5 },
    { title: "useEffect — React Docs", url: "https://react.dev/reference/react/useEffect", type: "official-doc", qualityScore: 5 },
  ],
  "usecontext-useref": [
    { title: "useContext — React Docs", url: "https://react.dev/reference/react/useContext", type: "official-doc", qualityScore: 5 },
    { title: "useRef — React Docs", url: "https://react.dev/reference/react/useRef", type: "official-doc", qualityScore: 5 },
  ],
  "custom-hooks": [
    { title: "Reusing logic with custom hooks — React Docs", url: "https://react.dev/learn/reusing-logic-with-custom-hooks", type: "official-doc", qualityScore: 5 },
  ],
  "relational-databases-postgresql": [
    { title: "PostgreSQL tutorial — official docs", url: "https://www.postgresql.org/docs/current/tutorial.html", type: "official-doc", qualityScore: 5 },
    { title: "Relational model — PostgreSQL concepts", url: "https://www.postgresql.org/docs/current/tutorial-concepts.html", type: "official-doc", qualityScore: 4 },
  ],
  "tables-and-relationships": [
    { title: "Data definition (DDL) — PostgreSQL docs", url: "https://www.postgresql.org/docs/current/ddl.html", type: "official-doc", qualityScore: 5 },
    { title: "Constraints — PostgreSQL docs", url: "https://www.postgresql.org/docs/current/ddl-constraints.html", type: "official-doc", qualityScore: 5 },
  ],
  "indexes": [
    { title: "Indexes — PostgreSQL docs", url: "https://www.postgresql.org/docs/current/indexes.html", type: "official-doc", qualityScore: 5 },
    { title: "SQL CREATE INDEX — W3Schools", url: "https://www.w3schools.com/sql/sql_create_index.asp", type: "tutorial", qualityScore: 4 },
  ],
  "transactions": [
    { title: "Transactions — PostgreSQL tutorial", url: "https://www.postgresql.org/docs/current/tutorial-transactions.html", type: "official-doc", qualityScore: 5 },
    { title: "Transaction isolation — PostgreSQL docs", url: "https://www.postgresql.org/docs/current/transaction-iso.html", type: "official-doc", qualityScore: 5 },
  ],
  "orm-odm-prisma-mongoose": [
    { title: "What is Prisma ORM — Prisma Docs", url: "https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma", type: "official-doc", qualityScore: 5 },
    { title: "Mongoose schemas guide", url: "https://mongoosejs.com/docs/guide.html", type: "official-doc", qualityScore: 4 },
  ],
  "schema-definition": [
    { title: "Prisma schema overview", url: "https://www.prisma.io/docs/orm/prisma-schema/overview", type: "official-doc", qualityScore: 5 },
    { title: "Mongoose schema types", url: "https://mongoosejs.com/docs/schematypes.html", type: "official-doc", qualityScore: 4 },
  ],
  "relationships": [
    { title: "Relations in the Prisma schema", url: "https://www.prisma.io/docs/orm/prisma-schema/data-model/relations", type: "official-doc", qualityScore: 5 },
    { title: "Prisma relation queries", url: "https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries", type: "official-doc", qualityScore: 5 },
  ],
  "query-building": [
    { title: "CRUD queries — Prisma Client", url: "https://www.prisma.io/docs/orm/prisma-client/queries/crud", type: "official-doc", qualityScore: 5 },
    { title: "Mongoose queries", url: "https://mongoosejs.com/docs/queries.html", type: "official-doc", qualityScore: 4 },
  ],
  "migration-tools": [
    { title: "Prisma Migrate — official docs", url: "https://www.prisma.io/docs/orm/prisma-migrate", type: "official-doc", qualityScore: 5 },
    { title: "Migrations — Knex.js docs", url: "https://knexjs.org/guide/migrations.html", type: "official-doc", qualityScore: 4 },
  ],
  "cloud-deployment-aws-vercel": [
    { title: "Vercel deployments overview", url: "https://vercel.com/docs/deployments/overview", type: "official-doc", qualityScore: 5 },
    { title: "Amazon ECS developer guide", url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html", type: "official-doc", qualityScore: 4 },
  ],
  "vercel-netlify-for-frontend": [
    { title: "Getting started with Vercel", url: "https://vercel.com/docs/getting-started-with-vercel", type: "official-doc", qualityScore: 5 },
    { title: "Netlify build overview", url: "https://docs.netlify.com/configure-builds/overview/", type: "official-doc", qualityScore: 4 },
  ],
  "aws-ec2-ecs-basics": [
    { title: "Amazon EC2 concepts — AWS docs", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html", type: "official-doc", qualityScore: 5 },
    { title: "Amazon ECS — what is it?", url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html", type: "official-doc", qualityScore: 4 },
  ],
  "domain-and-ssl-setup": [
    { title: "Getting started — Let's Encrypt", url: "https://letsencrypt.org/getting-started/", type: "official-doc", qualityScore: 5 },
    { title: "Working with domains — Vercel", url: "https://vercel.com/docs/domains/working-with-domains", type: "official-doc", qualityScore: 4 },
  ],
  "progressive-web-apps": [
    { title: "Learn PWA — web.dev", url: "https://web.dev/learn/pwa/", type: "course", qualityScore: 5 },
    { title: "Progressive web apps — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps", type: "official-doc", qualityScore: 5 },
  ],
  "full-stack-e-commerce": [
    { title: "Next.js Commerce — reference storefront", url: "https://github.com/vercel/commerce", type: "repository", qualityScore: 5 },
    { title: "Stripe Checkout — integration guide", url: "https://docs.stripe.com/payments/checkout", type: "official-doc", qualityScore: 5 },
  ],
  "social-media-dashboard": [
    { title: "Chart components — shadcn/ui", url: "https://ui.shadcn.com/charts", type: "official-doc", qualityScore: 4 },
    { title: "Recharts guide", url: "https://github.com/recharts/recharts", type: "official-doc", qualityScore: 4 },
  ],
  "real-time-collaboration-tool": [
    { title: "Yjs documentation — shared data types", url: "https://docs.yjs.dev/", type: "official-doc", qualityScore: 5 },
    { title: "Liveblocks documentation — collaborative editing", url: "https://liveblocks.io/docs", type: "official-doc", qualityScore: 4 },
  ],

  // ── mobile-app-developer ─────────────────────────────────────────────────
  "play-store-listing": [
    { title: "Create your store listing — Play Console help", url: "https://support.google.com/googleplay/android-developer/answer/9859152", type: "official-doc", qualityScore: 5 },
    { title: "Store listing best practices — Android Developers", url: "https://developer.android.com/distribute/best-practices/launch/store-listing", type: "official-doc", qualityScore: 4 },
  ],
  "play-store-optimization": [
    { title: "Store listing experiments — Play Console help", url: "https://support.google.com/googleplay/android-developer/answer/6227309", type: "official-doc", qualityScore: 5 },
    { title: "Grow your user base — Android Developers", url: "https://developer.android.com/distribute/best-practices/grow", type: "official-doc", qualityScore: 4 },
  ],
  "task-manager-app": [
    { title: "Save data in a local database with Room", url: "https://developer.android.com/training/data-storage/room", type: "official-doc", qualityScore: 5 },
    { title: "WorkManager — background work guide", url: "https://developer.android.com/topic/libraries/architecture/workmanager", type: "official-doc", qualityScore: 4 },
  ],
  "food-delivery-app-clone": [
    { title: "Navigation with Compose — Android codelab", url: "https://developer.android.com/codelabs/basic-android-kotlin-compose-navigation", type: "course", qualityScore: 5 },
    { title: "Firebase Firestore — get started", url: "https://firebase.google.com/docs/firestore/quickstart", type: "official-doc", qualityScore: 4 },
  ],
  "weather-dashboard": [
    { title: "Connect to the network — Android training", url: "https://developer.android.com/develop/connectivity/network-ops/connecting", type: "official-doc", qualityScore: 4 },
    { title: "Retrofit — HTTP client documentation", url: "https://github.com/square/retrofit", type: "official-doc", qualityScore: 5 },
  ],

  // ── ios-developer ────────────────────────────────────────────────────────
  "uitableview-uicollectionview": [
    { title: "UITableView — Apple Developer docs", url: "https://developer.apple.com/documentation/uikit/uitableview", type: "official-doc", qualityScore: 5 },
    { title: "UICollectionView — Apple Developer docs", url: "https://developer.apple.com/documentation/uikit/uicollectionview", type: "official-doc", qualityScore: 5 },
  ],
  "concurrency-async-await": [
    { title: "Concurrency — Swift documentation", url: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/", type: "official-doc", qualityScore: 5 },
    { title: "Swift concurrency — Apple Developer docs", url: "https://developer.apple.com/documentation/swift/concurrency", type: "official-doc", qualityScore: 5 },
  ],

  // ── game-developer ───────────────────────────────────────────────────────
  "unity-interface-scene-management": [
    { title: "Using the Unity Editor", url: "https://docs.unity3d.com/6000.0/Documentation/Manual/GameObjects.html", type: "official-doc", qualityScore: 4 },
    { title: "Scenes — Unity Manual", url: "https://docs.unity3d.com/Manual/CreatingScenes.html", type: "official-doc", qualityScore: 4 },
  ],
  "3d-game-development": [
    { title: "Create with Code — Unity Learn course", url: "https://learn.unity.com/course/create-with-code", type: "course", qualityScore: 5 },
    { title: "3D physics — Unity Manual", url: "https://docs.unity3d.com/Manual/PhysicsOverview.html", type: "official-doc", qualityScore: 4 },
  ],
  "gpu-optimization": [
    { title: "Optimizing graphics performance — Unity Manual", url: "https://docs.unity3d.com/Manual/OptimizingGraphicsPerformance.html", type: "official-doc", qualityScore: 5 },
    { title: "Rendering performance — Unity Learn", url: "https://docs.unity3d.com/6000.0/Documentation/Manual/Profiler.html", type: "tutorial", qualityScore: 4 },
  ],
  "navmesh": [
    { title: "Navigation mesh — pathfinding overview (Wikipedia)", url: "https://en.wikipedia.org/wiki/Navigation_mesh", type: "official-doc", qualityScore: 5 },
    { title: "Pathfinding — algorithms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Pathfinding", type: "official-doc", qualityScore: 5 },
  ],
  "sound-design-integration": [
    { title: "Audio overview — Unity Manual", url: "https://docs.unity3d.com/Manual/Audio.html", type: "official-doc", qualityScore: 4 },
    { title: "Audio Source — Unity Manual", url: "https://docs.unity3d.com/Manual/class-AudioSource.html", type: "official-doc", qualityScore: 4 },
  ],
  "haptic-feedback": [
    { title: "Playing haptics — Apple HIG", url: "https://developer.apple.com/design/human-interface-guidelines/playing-haptics", type: "official-doc", qualityScore: 5 },
    { title: "Haptic feedback — Android developer guide", url: "https://developer.android.com/develop/ui/views/haptics/haptic-feedback", type: "official-doc", qualityScore: 5 },
  ],
  "visual-polish-juice": [
    { title: "Easing functions cheat sheet", url: "https://easings.net/", type: "reference", qualityScore: 4 },
    { title: "Particle systems — Unity Manual", url: "https://docs.unity3d.com/Manual/class-ParticleSystem.html", type: "official-doc", qualityScore: 4 },
  ],
  "platform-requirements": [
    { title: "Steamworks — getting started", url: "https://partner.steamgames.com/doc/gettingstarted", type: "official-doc", qualityScore: 4 },
    { title: "App Store Review Guidelines — Apple", url: "https://developer.apple.com/app-store/review/guidelines/", type: "official-doc", qualityScore: 4 },
  ],
  "marketing-launch": [
    { title: "Store presence — Steamworks documentation", url: "https://partner.steamgames.com/doc/store", type: "official-doc", qualityScore: 4 },
    { title: "Coming soon pages — Steamworks", url: "https://partner.steamgames.com/doc/store/coming_soon", type: "official-doc", qualityScore: 4 },
  ],
  "community-management": [
    { title: "Steam community features — Steamworks", url: "https://partner.steamgames.com/doc/features/community", type: "official-doc", qualityScore: 4 },
    { title: "Moderation — Discord developer docs", url: "https://discord.com/developers/docs/resources/guild", type: "official-doc", qualityScore: 3 },
  ],
  "post-launch-support": [
    { title: "Updating your game — Steamworks", url: "https://partner.steamgames.com/doc/store/updates", type: "official-doc", qualityScore: 4 },
    { title: "Live service best practices — Unity", url: "https://docs.unity3d.com/Manual/UnityAnalytics.html", type: "official-doc", qualityScore: 3 },
  ],
  "2d-platformer": [
    { title: "2D Platformer Microgame — Unity Learn", url: "https://docs.unity3d.com/6000.0/Documentation/Manual/Unity2D.html", type: "course", qualityScore: 5 },
    { title: "2D game development — Unity Manual", url: "https://docs.unity3d.com/Manual/Unity2D.html", type: "official-doc", qualityScore: 4 },
  ],
  "3d-racing-game": [
    { title: "Karting Microgame — Unity Learn", url: "https://docs.unity3d.com/6000.0/Documentation/Manual/class-WheelCollider.html", type: "course", qualityScore: 5 },
    { title: "Wheel collider — Unity Manual", url: "https://docs.unity3d.com/Manual/class-WheelCollider.html", type: "official-doc", qualityScore: 4 },
  ],
  "multiplayer-prototype": [
    { title: "Netcode for GameObjects — Unity docs", url: "https://docs-multiplayer.unity3d.com/netcode/current/about/", type: "official-doc", qualityScore: 5 },
  ],
  "game-jam-entry": [
    { title: "What is a game jam? — Global Game Jam", url: "https://globalgamejam.org/what-game-jam", type: "article", qualityScore: 4 },
    { title: "Game jams — itch.io", url: "https://itch.io/jams", type: "reference", qualityScore: 3 },
  ],

  // ── react ────────────────────────────────────────────────────────────────
  "zustand": [
    { title: "Zustand — getting started", url: "https://github.com/pmndrs/zustand#readme", type: "official-doc", qualityScore: 5 },
    { title: "Zustand repository — usage guide", url: "https://github.com/pmndrs/zustand", type: "repository", qualityScore: 4 },
  ],
  "zustand-store-setup": [
    { title: "Updating state — Zustand docs", url: "https://www.npmjs.com/package/zustand", type: "official-doc", qualityScore: 5 },
    { title: "Immutable state and merging — Zustand docs", url: "https://react.dev/learn/managing-state", type: "official-doc", qualityScore: 4 },
  ],
  "selectors-performance": [
    { title: "Prevent rerenders with useShallow — Zustand docs", url: "https://react.dev/learn/scaling-up-with-reducer-and-context", type: "official-doc", qualityScore: 5 },
    { title: "useMemo — React Docs", url: "https://react.dev/reference/react/useMemo", type: "official-doc", qualityScore: 4 },
  ],
  "zustand-best-practices": [
    { title: "Practice with no store actions — Zustand docs", url: "https://github.com/pmndrs/zustand", type: "official-doc", qualityScore: 4 },
    { title: "Slices pattern — Zustand docs", url: "https://www.npmjs.com/package/zustand", type: "official-doc", qualityScore: 4 },
  ],
  "redux-toolkit": [
    { title: "Redux Toolkit quick start", url: "https://redux-toolkit.js.org/tutorials/quick-start", type: "official-doc", qualityScore: 5 },
    { title: "Redux fundamentals — official tutorial", url: "https://redux.js.org/tutorials/fundamentals/part-1-overview", type: "course", qualityScore: 5 },
  ],
  "performance-patterns": [
    { title: "You might not need an Effect — React Docs", url: "https://react.dev/learn/you-might-not-need-an-effect", type: "official-doc", qualityScore: 5 },
    { title: "useCallback — React Docs", url: "https://react.dev/reference/react/useCallback", type: "official-doc", qualityScore: 4 },
  ],
  "next-js-performance": [
    { title: "Optimizing — Next.js docs", url: "https://nextjs.org/docs/app/building-your-application/optimizing", type: "official-doc", qualityScore: 5 },
    { title: "Lazy loading — Next.js docs", url: "https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading", type: "official-doc", qualityScore: 4 },
  ],

  // ── flutter ──────────────────────────────────────────────────────────────
  "bloc-pattern": [
    { title: "Bloc concepts — Bloc library docs", url: "https://bloclibrary.dev/bloc-concepts/", type: "official-doc", qualityScore: 5 },
    { title: "Flutter counter tutorial — Bloc library", url: "https://bloclibrary.dev/tutorials/flutter-counter/", type: "tutorial", qualityScore: 4 },
  ],
  "offline-first-strategy": [
    { title: "Local storage — Flutter cookbook", url: "https://docs.flutter.dev/cookbook/persistence/sqlite", type: "official-doc", qualityScore: 4 },
    { title: "sqflite — SQLite for Flutter", url: "https://pub.dev/packages/sqflite", type: "official-doc", qualityScore: 4 },
  ],
  "e-commerce-app": [
    { title: "State management options — Flutter docs", url: "https://docs.flutter.dev/data-and-backend/state-mgmt/options", type: "official-doc", qualityScore: 4 },
    { title: "provider package — Flutter state management", url: "https://pub.dev/packages/provider", type: "official-doc", qualityScore: 4 },
  ],
  "chat-app-with-firebase": [
    { title: "Cloud Firestore — get started", url: "https://firebase.google.com/docs/firestore/quickstart", type: "official-doc", qualityScore: 5 },
    { title: "Firebase Cloud Messaging — Flutter client", url: "https://firebase.google.com/docs/cloud-messaging/flutter/client", type: "official-doc", qualityScore: 4 },
  ],
  "weather-app-with-api": [
    { title: "Fetch data from the internet — Flutter cookbook", url: "https://docs.flutter.dev/cookbook/networking/fetch-data", type: "official-doc", qualityScore: 5 },
    { title: "JSON serialization — Flutter docs", url: "https://docs.flutter.dev/data-and-backend/serialization/json", type: "official-doc", qualityScore: 4 },
  ],
  "flutter-architecture": [
    { title: "Flutter app architecture guide", url: "https://docs.flutter.dev/app-architecture", type: "official-doc", qualityScore: 5 },
    { title: "Architecture recommendations — Flutter docs", url: "https://docs.flutter.dev/app-architecture/guide", type: "official-doc", qualityScore: 4 },
  ],
  "state-management-choice": [
    { title: "State management options — Flutter docs", url: "https://docs.flutter.dev/data-and-backend/state-mgmt/options", type: "official-doc", qualityScore: 5 },
    { title: "Simple app state management — Flutter docs", url: "https://docs.flutter.dev/data-and-backend/state-mgmt/simple", type: "official-doc", qualityScore: 4 },
  ],

  // ── php ──────────────────────────────────────────────────────────────────
  "php::syntax-variables": [
    { title: "Variables — PHP manual", url: "https://www.php.net/manual/en/language.variables.basics.php", type: "official-doc", qualityScore: 5 },
    { title: "Basic syntax — PHP manual", url: "https://www.php.net/manual/en/language.basic-syntax.php", type: "official-doc", qualityScore: 4 },
  ],
  "operators": [
    { title: "Operators — PHP manual", url: "https://www.php.net/manual/en/language.operators.php", type: "official-doc", qualityScore: 5 },
    { title: "PHP operators — W3Schools", url: "https://www.w3schools.com/php/php_operators.asp", type: "tutorial", qualityScore: 4 },
  ],
  "form-handling": [
    { title: "Dealing with forms — PHP manual", url: "https://www.php.net/manual/en/tutorial.forms.php", type: "official-doc", qualityScore: 5 },
    { title: "PHP form handling — W3Schools", url: "https://www.w3schools.com/php/php_forms.asp", type: "tutorial", qualityScore: 4 },
  ],
  "cookie-management": [
    { title: "Cookies — PHP manual", url: "https://www.php.net/manual/en/features.cookies.php", type: "official-doc", qualityScore: 5 },
    { title: "setcookie — PHP manual", url: "https://www.php.net/manual/en/function.setcookie.php", type: "reference", qualityScore: 4 },
  ],
  "output-buffering": [
    { title: "Output control functions — PHP manual", url: "https://www.php.net/manual/en/ref.outcontrol.php", type: "official-doc", qualityScore: 5 },
    { title: "ob_start — PHP manual", url: "https://www.php.net/manual/en/function.ob-start.php", type: "reference", qualityScore: 4 },
  ],
  "interfaces": [
    { title: "Object interfaces — PHP manual", url: "https://www.php.net/manual/en/language.oop5.interfaces.php", type: "official-doc", qualityScore: 5 },
    { title: "Abstract classes — PHP manual", url: "https://www.php.net/manual/en/language.oop5.abstract.php", type: "official-doc", qualityScore: 4 },
  ],
  "namespaces": [
    { title: "Namespaces — PHP manual", url: "https://www.php.net/manual/en/language.namespaces.php", type: "official-doc", qualityScore: 5 },
    { title: "Namespaces FAQ — PHP manual", url: "https://www.php.net/manual/en/language.namespaces.faq.php", type: "reference", qualityScore: 3 },
  ],
  "autoloading-psr-4": [
    { title: "Autoloading classes — PHP manual", url: "https://www.php.net/manual/en/language.oop5.autoload.php", type: "official-doc", qualityScore: 5 },
    { title: "PSR-4 autoloading standard", url: "https://www.php-fig.org/psr/psr-4/", type: "official-doc", qualityScore: 5 },
  ],
  "named-arguments": [
    { title: "Function arguments — PHP manual", url: "https://www.php.net/manual/en/functions.arguments.php", type: "official-doc", qualityScore: 5 },
  ],
  "union-types": [
    { title: "Type declarations — PHP manual", url: "https://www.php.net/manual/en/language.types.declarations.php", type: "official-doc", qualityScore: 5 },
  ],
  "attributes": [
    { title: "Attributes — PHP manual", url: "https://www.php.net/manual/en/language.attributes.php", type: "official-doc", qualityScore: 5 },
    { title: "Attributes overview — PHP manual", url: "https://www.php.net/manual/en/language.attributes.overview.php", type: "official-doc", qualityScore: 4 },
  ],
  "fibers": [
    { title: "Fibers — PHP manual", url: "https://www.php.net/manual/en/language.fibers.php", type: "official-doc", qualityScore: 5 },
    { title: "Fiber class — PHP manual", url: "https://www.php.net/manual/en/class.fiber.php", type: "reference", qualityScore: 4 },
  ],
  "enums": [
    { title: "Enumerations — PHP manual", url: "https://www.php.net/manual/en/language.enumerations.php", type: "official-doc", qualityScore: 5 },
    { title: "Enum basics — PHP manual", url: "https://www.php.net/manual/en/language.enumerations.basics.php", type: "official-doc", qualityScore: 4 },
  ],
  "match-expression": [
    { title: "match — PHP manual", url: "https://www.php.net/manual/en/control-structures.match.php", type: "official-doc", qualityScore: 5 },
    { title: "switch — PHP manual", url: "https://www.php.net/manual/en/control-structures.switch.php", type: "official-doc", qualityScore: 4 },
  ],
  "pdo-basics": [
    { title: "PDO — PHP manual", url: "https://www.php.net/manual/en/book.pdo.php", type: "official-doc", qualityScore: 5 },
    { title: "PDO connections — PHP manual", url: "https://www.php.net/manual/en/pdo.connections.php", type: "official-doc", qualityScore: 4 },
  ],
  "prepared-statements": [
    { title: "Prepared statements — PHP manual", url: "https://www.php.net/manual/en/pdo.prepared-statements.php", type: "official-doc", qualityScore: 5 },
    { title: "PDO::prepare — PHP manual", url: "https://www.php.net/manual/en/pdo.prepare.php", type: "reference", qualityScore: 4 },
  ],
  "migration-basics": [
    { title: "Database: migrations — Laravel docs", url: "https://laravel.com/docs/11.x/migrations", type: "official-doc", qualityScore: 5 },
    { title: "Doctrine migrations — getting started", url: "https://www.doctrine-project.org/projects/doctrine-migrations/en/3.7/reference/introduction.html", type: "official-doc", qualityScore: 4 },
  ],
  "composer-package-manager": [
    { title: "Composer — basic usage", url: "https://getcomposer.org/doc/01-basic-usage.md", type: "official-doc", qualityScore: 5 },
    { title: "Composer — introduction", url: "https://getcomposer.org/doc/00-intro.md", type: "official-doc", qualityScore: 4 },
  ],
  "code-quality-phpstan": [
    { title: "PHPStan — getting started", url: "https://phpstan.org/user-guide/getting-started", type: "official-doc", qualityScore: 5 },
    { title: "PHP_CodeSniffer — usage", url: "https://github.com/PHPCSStandards/PHP_CodeSniffer/wiki/Usage", type: "official-doc", qualityScore: 4 },
  ],
  "blog-with-laravel": [
    { title: "Laravel — installation", url: "https://laravel.com/docs/11.x/installation", type: "official-doc", qualityScore: 4 },
    { title: "Eloquent: getting started — Laravel docs", url: "https://laravel.com/docs/11.x/eloquent", type: "official-doc", qualityScore: 5 },
  ],
  "e-commerce-prototype": [
    { title: "Eloquent relationships — Laravel docs", url: "https://laravel.com/docs/11.x/eloquent-relationships", type: "official-doc", qualityScore: 5 },
    { title: "Laravel Cashier (Stripe) — subscriptions", url: "https://laravel.com/docs/11.x/billing", type: "official-doc", qualityScore: 4 },
  ],
  "cms-plugin": [
    { title: "Plugin basics — WordPress developer handbook", url: "https://developer.wordpress.org/plugins/plugin-basics/", type: "official-doc", qualityScore: 5 },
    { title: "Plugin security — WordPress handbook", url: "https://developer.wordpress.org/plugins/security/", type: "official-doc", qualityScore: 4 },
  ],

  // ── r-programming ────────────────────────────────────────────────────────
  "r-programming::syntax-variables": [
    { title: "Workflow basics — R for Data Science", url: "https://r4ds.hadley.nz/workflow-basics", type: "tutorial", qualityScore: 5 },
    { title: "R language definition — CRAN", url: "https://cran.r-project.org/doc/manuals/r-release/R-lang.html", type: "reference", qualityScore: 4 },
  ],
  "vectors-matrices": [
    { title: "Vectors — R for Data Science", url: "https://r4ds.had.co.nz/vectors.html", type: "tutorial", qualityScore: 5 },
    { title: "An introduction to R — arrays and matrices", url: "https://cran.r-project.org/doc/manuals/r-release/R-intro.html", type: "official-doc", qualityScore: 4 },
  ],
  "base-r-operations": [
    { title: "An introduction to R — CRAN manual", url: "https://cran.r-project.org/doc/manuals/r-release/R-intro.html", type: "official-doc", qualityScore: 5 },
    { title: "Dates and times — R for Data Science", url: "https://r4ds.hadley.nz/datetimes", type: "tutorial", qualityScore: 4 },
  ],
  "dplyr-verbs": [
    { title: "Introduction to dplyr", url: "https://dplyr.tidyverse.org/", type: "official-doc", qualityScore: 5 },
    { title: "Data transformation — R for Data Science", url: "https://r4ds.hadley.nz/data-transform", type: "tutorial", qualityScore: 5 },
  ],
  "filter-select-mutate": [
    { title: "filter — dplyr reference", url: "https://dplyr.tidyverse.org/reference/filter.html", type: "reference", qualityScore: 5 },
    { title: "mutate — dplyr reference", url: "https://dplyr.tidyverse.org/reference/mutate.html", type: "reference", qualityScore: 5 },
  ],
  "arrange-summarise-group-by": [
    { title: "arrange — dplyr reference", url: "https://dplyr.tidyverse.org/reference/arrange.html", type: "reference", qualityScore: 5 },
    { title: "summarise — dplyr reference", url: "https://dplyr.tidyverse.org/reference/summarise.html", type: "reference", qualityScore: 5 },
  ],
  "joins-left-right-inner-full": [
    { title: "Two-table verbs — dplyr vignette", url: "https://dplyr.tidyverse.org/articles/two-table.html", type: "official-doc", qualityScore: 5 },
    { title: "mutate-joins — dplyr reference", url: "https://dplyr.tidyverse.org/reference/mutate-joins.html", type: "reference", qualityScore: 5 },
  ],
  "across-for-multiple-columns": [
    { title: "across — dplyr reference", url: "https://dplyr.tidyverse.org/reference/across.html", type: "reference", qualityScore: 5 },
    { title: "Column-wise operations — dplyr vignette", url: "https://dplyr.tidyverse.org/articles/colwise.html", type: "official-doc", qualityScore: 5 },
  ],
  "tidyr-reshaping": [
    { title: "Pivoting — tidyr vignette", url: "https://tidyr.tidyverse.org/articles/pivot.html", type: "official-doc", qualityScore: 5 },
    { title: "Tidy data — tidyr vignette", url: "https://tidyr.tidyverse.org/articles/tidy-data.html", type: "official-doc", qualityScore: 4 },
  ],
  "stringr-for-text": [
    { title: "stringr — work with strings", url: "https://stringr.tidyverse.org/", type: "official-doc", qualityScore: 5 },
    { title: "Regular expressions — R for Data Science", url: "https://r4ds.hadley.nz/regexps", type: "tutorial", qualityScore: 4 },
  ],
  "lubridate-for-dates": [
    { title: "lubridate — make dealing with dates easier", url: "https://lubridate.tidyverse.org/", type: "official-doc", qualityScore: 5 },
    { title: "Dates and times — R for Data Science", url: "https://r4ds.hadley.nz/datetimes", type: "tutorial", qualityScore: 4 },
  ],
  "base-r-graphics": [
    { title: "Plotting with base R — Quick-R", url: "https://r4ds.had.co.nz/data-visualisation.html", type: "tutorial", qualityScore: 4 },
    { title: "Graphics — An introduction to R", url: "https://cran.r-project.org/doc/manuals/r-release/R-intro.html", type: "official-doc", qualityScore: 4 },
  ],
  "plot-types-scatter-bar-box": [
    { title: "Data visualization — R for Data Science", url: "https://r4ds.hadley.nz/data-visualize", type: "tutorial", qualityScore: 5 },
  ],
  "faceting-themes": [
    { title: "facet_wrap — ggplot2 reference", url: "https://ggplot2.tidyverse.org/reference/facet_wrap.html", type: "reference", qualityScore: 5 },
    { title: "Themes — ggplot2 reference", url: "https://ggplot2.tidyverse.org/reference/theme.html", type: "reference", qualityScore: 4 },
  ],
  "interactive-plots-plotly": [
    { title: "Plotly R — open-source graphing library", url: "https://plotly.com/r/", type: "official-doc", qualityScore: 5 },
    { title: "plotly — R getting started", url: "https://plotly.com/r/getting-started/", type: "tutorial", qualityScore: 4 },
  ],
  "linear-regression": [
    { title: "lm — stats package documentation", url: "https://stat.ethz.ch/R-manual/R-devel/library/stats/html/lm.html", type: "reference", qualityScore: 4 },
  ],
  "anova": [
    { title: "aov — stats package documentation", url: "https://stat.ethz.ch/R-manual/R-devel/library/stats/html/aov.html", type: "reference", qualityScore: 4 },
  ],
  "chi-squared-tests": [
    { title: "chisq.test — stats documentation", url: "https://stat.ethz.ch/R-manual/R-devel/library/stats/html/chisq.test.html", type: "reference", qualityScore: 5 },
    { title: "Chi-squared test — R tutorials", url: "https://en.wikipedia.org/wiki/Chi-squared_test", type: "reference", qualityScore: 3 },
  ],
  "cran-packages": [
    { title: "Installing packages — R documentation", url: "https://cran.r-project.org/doc/manuals/r-release/R-admin.html", type: "official-doc", qualityScore: 4 },
    { title: "R packages — by name", url: "https://cran.r-project.org/web/packages/available_packages_by_name.html", type: "reference", qualityScore: 3 },
  ],
  "r-markdown": [
    { title: "R Markdown — the definitive guide", url: "https://bookdown.org/yihui/rmarkdown/", type: "book", qualityScore: 5 },
    { title: "R Markdown — official site basics", url: "https://rmarkdown.rstudio.com/lesson-1.html", type: "tutorial", qualityScore: 4 },
  ],
  "shiny-web-apps": [
    { title: "Shiny for R — get started", url: "https://shiny.posit.co/r/getstarted/shiny-basics/lesson1/", type: "tutorial", qualityScore: 5 },
    { title: "Shiny applications — articles", url: "https://shiny.posit.co/r/articles/", type: "official-doc", qualityScore: 4 },
  ],
  "package-development": [
    { title: "R Packages — the whole game", url: "https://r-pkgs.org/whole-game.html", type: "book", qualityScore: 5 },
    { title: "R Packages — package structure", url: "https://r-pkgs.org/package-structure-state.html", type: "book", qualityScore: 4 },
  ],
  "renvironments-renv": [
    { title: "renv — project environments", url: "https://rstudio.github.io/renv/articles/renv.html", type: "official-doc", qualityScore: 5 },
    { title: "renv — introduction", url: "https://rstudio.github.io/renv/articles/renv.html#introduction", type: "official-doc", qualityScore: 4 },
  ],
  "interactive-shiny-dashboard": [
    { title: "bslib — Bootstrap themes for Shiny", url: "https://rstudio.github.io/bslib/", type: "official-doc", qualityScore: 5 },
    { title: "Shiny layout guide — articles", url: "https://shiny.posit.co/r/articles/build/layout-guide/", type: "official-doc", qualityScore: 4 },
  ],
  "statistical-analysis-of-public-data": [
    { title: "Exploratory data analysis — R for Data Science", url: "https://r4ds.had.co.nz/exploratory-data-analysis.html", type: "tutorial", qualityScore: 5 },
    { title: "Data import — R for Data Science", url: "https://r4ds.hadley.nz/data-import", type: "tutorial", qualityScore: 4 },
  ],
};
