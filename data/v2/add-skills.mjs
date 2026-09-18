import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PATH = join(__dirname, "source", "skills-v2.json");
const data = JSON.parse(readFileSync(PATH, "utf8"));
const skills = data.skills || data;
const existingSlugs = new Set(skills.map(s => s.slug));

const newSkills = [
  {
    slug: "kotlin", title: "Kotlin", icon: "🟣", color: "#7F52FF",
    skillCategory: "Programming Languages", difficulty: "Beginner", duration: "3-6 months", durationHours: 180,
    description: "Kotlin is a modern, statically-typed language that runs on the JVM. It is the preferred language for Android development, offering concise syntax, null safety, coroutines for concurrency and full Java interoperability.",
    tagline: "Modern, concise JVM language — the official language for Android.",
    prerequisites: ["Basic programming concepts", "Object-oriented programming basics"],
    tools: ["Kotlin compiler", "IntelliJ IDEA", "Android Studio", "Gradle", "Kotlin Playground"],
    certifications: ["JetBrains Certified Kotlin Developer"],
    roles: ["Android Developer", "Backend Developer (Ktor/Spring)", "Multiplatform Developer"],
    sections: [
      { title: "Kotlin Fundamentals", topics: ["Variables & Types", "Functions & Lambdas", "Control Flow", "Null Safety", "String Templates"], subtopics: {
        "Variables & Types": ["val vs var", "Basic types (Int, String, Boolean, Double)", "Type inference", "Collections (List, Map, Set)", "Arrays"],
        "Functions & Lambdas": ["Function declaration", "Default & named parameters", "Single-expression functions", "Lambda expressions", "Higher-order functions", "Trailing lambdas"],
        "Control Flow": ["if/else expressions", "when expressions", "for/while loops", "Range expressions", "Break/continue with labels"],
        "Null Safety": ["Nullable types (?)", "Safe calls (?.)", "Elvis operator (?:)", "Not-null assertion (!!)", "Safe casts (as?)", "let block for nullables"],
        "String Templates": ["Variable interpolation ($var)", "Expressions in strings (${})", "Raw strings (triple quotes)", "String manipulation methods"]
      }},
      { title: "Object-Oriented Kotlin", topics: ["Classes & Objects", "Inheritance & Interfaces", "Data Classes", "Sealed Classes", "Enum Classes"], subtopics: {
        "Classes & Objects": ["Primary & secondary constructors", "Init blocks", "Properties (val/var)", "Custom getters/setters", "Companion objects", "Object declarations (singletons)"],
        "Inheritance & Interfaces": ["Open modifier", "Override keyword", "Abstract classes", "Interface default implementations", "Multiple interface implementation", "Super calls"],
        "Data Classes": ["auto-generated equals/hashCode/toString", "copy() function", "Destructuring declarations", "Component functions", "When to use data classes"],
        "Sealed Classes": ["Restricted class hierarchies", "When exhaustiveness", "Sealed interfaces", "Use in state management", "vs enum classes"],
        "Enum Classes": ["Basic enum declaration", "Properties in enums", "Abstract methods in enums", "Enum as anonymous classes", "Enum with interfaces"]
      }},
      { title: "Advanced Kotlin", topics: ["Coroutines", "Generics", "Extension Functions", "DSL Building", "Kotlin Multiplatform"], subtopics: {
        "Coroutines": ["Suspending functions", "CoroutineScope", "launch vs async", "withContext", "Structured concurrency", "Flow (cold streams)", "StateFlow & SharedFlow", "Exception handling in coroutines"],
        "Generics": ["Generic functions", "Generic classes", "Type constraints", "Variance (in/out)", "Star projections", "Reified type parameters"],
        "Extension Functions": ["Defining extensions", "Extension properties", "Companion object extensions", "Scope functions (let, run, with, apply, also)", "DSL-idiomatic usage"],
        "DSL Building": ["Type-safe builders", "Lambdas with receiver", "HTML DSL", "Kotlin DSL for configuration", "Practical DSL examples"],
        "Kotlin Multiplatform": ["KMM project setup", "expect/actual declarations", "Shared code strategies", "Platform-specific code", "KMP for Android/iOS"]
      }},
      { title: "Kotlin for Android", topics: ["Jetpack Compose", "ViewModel & State", "Room Database", "Retrofit Networking", "Dependency Injection (Hilt)"], subtopics: {
        "Jetpack Compose": ["Composable functions", "State management (@State)", "Recomposition", "Material Design 3", "Lists & LazyColumn", "Navigation Compose"],
        "ViewModel & State": ["ViewModel lifecycle", "StateFlow in ViewModel", "UiState pattern", "SavedStateHandle", "Testing ViewModels"],
        "Room Database": ["@Entity, @Dao, @Database", "CRUD operations", "Type converters", "Relationships (1:N, M:N)", "Migrations", "Flow queries"],
        "Retrofit Networking": ["Retrofit setup with Kotlin", "Coroutines for API calls", "Moshi/Gson serialization", "Error handling", "Auth interceptors"],
        "Dependency Injection (Hilt)": ["@HiltAndroidApp", "@HiltViewModel", "Modules & Provides", "Binds", "Testing with Hilt"]
      }},
      { title: "Kotlin for Backend", topics: ["Ktor Framework", "Spring Boot with Kotlin", "Exposed ORM", "Kotlin Serialization", "Testing in Kotlin"], subtopics: {} },
      { title: "Testing & Tooling", topics: ["JUnit 5 with Kotlin", "MockK Mocking", "Kotest Framework", "Detekt Linting", "Kotlin Code Style"], subtopics: {} },
      { title: "Portfolio Projects", topics: ["Android App with Compose", "Ktor REST API", "Multiplatform Library", "Kotlin DSL for Config"], subtopics: {} },
      { title: "Interview Preparation", topics: ["Kotlin Language Features", "Coroutines Deep Dive", "Null Safety Scenarios", "OOP Design Questions"], subtopics: {} },
    ]
  },
  {
    slug: "swift", title: "Swift", icon: "🍎", color: "#FA7343",
    skillCategory: "Programming Languages", difficulty: "Beginner", duration: "3-6 months", durationHours: 180,
    description: "Swift is Apple's modern programming language for iOS, macOS, watchOS and tvOS development. It offers safety features like optionals, powerful type system, protocol-oriented programming and seamless Apple framework integration.",
    tagline: "Apple's modern language for iOS, macOS and beyond.",
    prerequisites: ["Basic programming concepts", "Mac with Xcode installed"],
    tools: ["Swift compiler", "Xcode", "SwiftUI", "Swift Playgrounds", "CocoaPods/SPM"],
    certifications: ["Apple Certified Swift Developer"],
    roles: ["iOS Developer", "macOS Developer", "watchOS Developer", "Server-Side Swift Developer"],
    sections: [
      { title: "Swift Fundamentals", topics: ["Variables & Constants", "Optionals & Nil Safety", "Functions & Closures", "Control Flow", "String Manipulation"], subtopics: {
        "Variables & Constants": ["let vs var", "Type annotations", "Type inference", "Tuple types", "Type aliases"],
        "Optionals & Nil Safety": ["Optional declaration (?)", "Optional binding (if let / guard let)", "Force unwrapping (dangerous)", "Optional chaining", "Nil coalescing (??)", "Implicitly unwrapped optionals"],
        "Functions & Closures": ["Function syntax", "Parameter labels", "Return values", " inout parameters", "Closure expressions", "Trailing closures", "Escaping closures", "Autoclosures"],
        "Control Flow": ["if/else", "switch with pattern matching", "for-in loops", "while/repeat-while", "where clauses", "Labeled statements"],
        "String Manipulation": ["String interpolation", "Multiline strings", "Character operations", "String indexing", "Regular expressions"]
      }},
      { title: "Object-Oriented Swift", topics: ["Classes vs Structs", "Properties & Methods", "Inheritance", "Protocols", "Extensions"], subtopics: {
        "Classes vs Structs": ["Reference vs value types", "When to use which", "Copy-on-write semantics", "Deinitializers (deinit)", "Identity operator (===)"],
        "Properties & Methods": ["Stored vs computed properties", "Property observers (willSet/didSet)", "Static properties/methods", "Mutating methods", "Subscripts"],
        "Inheritance": ["Class inheritance", "Method overriding", "Designated vs convenience initializers", "Required initializers", "Final keyword"],
        "Protocols": ["Protocol definition", "Protocol conformance", "Protocol inheritance", "Protocol extensions", "Associated types", "Protocol-oriented programming"],
        "Extensions": ["Adding methods", "Adding computed properties", "Protocol conformance via extensions", "Generic extensions", "Nested types"]
      }},
      { title: "Advanced Swift", topics: ["Generics", "Error Handling", "Memory Management", "Concurrency (async/await)", "Property Wrappers"], subtopics: {
        "Generics": ["Generic functions", "Generic types", "Type constraints", "Where clauses", "Opaque types (some)", "Existential types (any)"],
        "Error Handling": ["Error protocol", "throw/throws", "do-catch blocks", "try?", "try!", "Custom error types", "Result type"],
        "Memory Management": ["Strong/weak/unowned references", "Retain cycles", "Delegate pattern with weak", "Capture lists in closures", "Memory debugging in Instruments"],
        "Concurrency (async/await)": ["async functions", "await keyword", "Task creation", "TaskGroup", "Actor model", "Sendable protocol", "@MainActor"],
        "Property Wrappers": ["@State, @Binding", "@Published", "@ObservedObject / @StateObject", "Custom property wrappers", "Project wrappers (@AppStorage)"]
      }},
      { title: "SwiftUI", topics: ["View Composition", "State Management", "List & Navigation", "Animations", "Gesture Handling"], subtopics: {
        "View Composition": ["View protocol", "some View return type", "@ViewBuilder", "Conditional views", "ForEach", "Group vs VStack"],
        "State Management": ["@State", "@Binding", "@ObservedObject / @StateObject", "@EnvironmentObject", "@Environment"],
        "List & Navigation": ["List & ListStyle", "NavigationStack", "NavigationLink", "NavigationPath", "Sheet & FullScreenCover"],
        "Animations": ["withAnimation", "transition modifiers", "matchedGeometryEffect", "spring animations", "PhaseAnimator"],
        "Gesture Handling": ["TapGesture", "DragGesture", "LongPressGesture", "SimultaneousGesture", "gesture modifiers"]
      }},
      { title: "UIKit Essentials", topics: ["UIViewController Lifecycle", "UITableView & UICollectionView", "Storyboard vs Programmatic", "Auto Layout", "Delegate Pattern"], subtopics: {} },
      { title: "Data & Networking", topics: ["Core Data / SwiftData", "URLSession", "Codable JSON", "Async/Await Networking", "Local Storage"], subtopics: {} },
      { title: "Testing & Distribution", topics: ["XCTest Unit Tests", "XCUITest UI Tests", "TestFlight", "App Store Guidelines", "CI/CD with Xcode Cloud"], subtopics: {} },
      { title: "Portfolio Projects", topics: ["Photo Gallery App", "Weather App", "Recipe Finder", "Fitness Tracker"], subtopics: {} },
      { title: "Interview Preparation", topics: ["Swift Coding Challenges", "Value vs Reference Types", "Memory Management Q&A", "Architecture Discussion"], subtopics: {} },
    ]
  },
  {
    slug: "flutter", title: "Flutter", icon: "💙", color: "#02569B",
    skillCategory: "Mobile Development", difficulty: "Beginner", duration: "4-8 months", durationHours: 250,
    description: "Flutter is Google's open-source UI toolkit for building natively compiled applications for mobile, web and desktop from a single Dart codebase. It uses a widget-based architecture with hot reload for rapid development.",
    tagline: "Build beautiful cross-platform apps from a single codebase.",
    prerequisites: ["Basic programming concepts", "Dart basics (or willingness to learn)", "UI design interest"],
    tools: ["Flutter SDK", "Dart language", "VS Code / Android Studio", "Flutter DevTools", "Firebase"],
    certifications: ["Google Associate Android Developer (useful)"],
    roles: ["Flutter Developer", "Cross-platform Mobile Developer", "Flutter Web Developer", "Desktop App Developer"],
    sections: [
      { title: "Dart Fundamentals", topics: ["Dart Syntax & Types", "Functions & Lambdas", "Null Safety", "Async Programming", "Collections"], subtopics: {
        "Dart Syntax & Types": ["var, final, const", "Basic types (int, double, String, bool)", "Type inference", "Type casting", "Enum types"],
        "Functions & Lambdas": ["Named parameters", "Optional parameters", "Arrow functions", "First-class functions", "Closures"],
        "Null Safety": ["Nullable types (?)", "Late variables", "Required named parameters", "Null-aware operators (??, ?.)", "Non-null assertion (!)"],
        "Async Programming": ["Future", "async/await", "Stream", "StreamSubscription", "Error handling in async"],
        "Collections": ["List, Set, Map", "Spread operator (...)", "Collection if/for", "Iterable methods (map, where, reduce)"]
      }},
      { title: "Flutter Fundamentals", topics: ["Widget Tree & Element Tree", "StatelessWidget vs StatefulWidget", "Built-in Widgets", "Layout System", "Styling & Theming"], subtopics: {
        "Widget Tree & Element Tree": ["Widget composition", "BuildContext", "Widget lifecycle", "InheritedWidget", "Key types (ValueKey, ObjectKey)"],
        "StatelessWidget vs StatefulWidget": ["When to use which", "State lifecycle (initState, dispose)", "setState calls", "Performance implications"],
        "Built-in Widgets": ["Text, Image, Icon", "Container, Padding, Margin", "Row, Column, Flex", "Stack & Positioned", "Card, ListTile, AppBar"],
        "Layout System": ["MainAxisAlignment & CrossAxisAlignment", "Expanded & Flexible", "Wrap & Flow", "GridView", "CustomMultiChildLayout"],
        "Styling & Theming": ["ThemeData", "ColorScheme", "TextTheme", "Dark mode support", "Custom decorations"]
      }},
      { title: "State Management", topics: ["Provider", "Riverpod", "BLoC Pattern", "GetX", "State Management Comparison"], subtopics: {
        "Provider": ["ChangeNotifierProvider", "Consumer & ConsumerWidget", "Provider.of context", "MultiProvider", "Selector for performance"],
        "Riverpod": ["Provider types", "StateProvider", "StateNotifierProvider", "AsyncValue", "Code generation (@riverpod)"],
        "BLoC Pattern": ["BLoC classes", "Events & States", "flutter_bloc package", "MultiBlocProvider", "Testing BLoCs"],
        "GetX": ["Reactive state (Obx)", "Controller lifecycle", "Dependency injection", "Route management", "When to use / avoid"],
        "State Management Comparison": ["Provider vs Riverpod vs BLoC vs GetX", "Project size considerations", "Team experience", "Testing ease", "Community support"]
      }},
      { title: "Navigation & Routing", topics: ["Navigator 1.0", "Navigator 2.0", "GoRouter", "Deep Linking", "Nested Navigation"], subtopics: {} },
      { title: "Networking & Data", topics: ["HTTP (Dio/http)", "REST API Integration", "JSON Serialization (json_serializable)", "Local Storage (Hive/SharedPreferences)", "Offline-first Strategy"], subtopics: {} },
      { title: "Advanced Flutter", topics: ["Custom Painters & Animations", "Platform Channels", "Firebase Integration", "Performance Optimization", "Internationalization"], subtopics: {} },
      { title: "Testing", topics: ["Widget Tests", "Unit Tests", "Integration Tests", "Golden Tests", "Test Coverage"], subtopics: {} },
      { title: "Portfolio Projects", notes: "", topics: ["Todo App with BLoC", "E-commerce App", "Chat App with Firebase", "Weather App with API"], subtopics: {} },
      { title: "Interview Preparation", topics: ["Flutter Architecture", "State Management Choice", "Performance Optimization", "Platform Integration"], subtopics: {} },
    ]
  },
  {
    slug: "postgresql", title: "PostgreSQL", icon: "🐘", color: "#336791",
    skillCategory: "Databases", difficulty: "Intermediate", duration: "3-6 months", durationHours: 180,
    description: "PostgreSQL is the world's most advanced open-source relational database. It offers ACID compliance, extensibility, rich data types (JSONB, arrays, hstore), powerful indexing and proven reliability for production workloads.",
    tagline: "The most advanced open-source relational database.",
    prerequisites: ["Basic SQL knowledge", "Database concepts"],
    tools: ["PostgreSQL", "pgAdmin", "psql CLI", "DBeaver", "pg_dump/pg_restore", "PostGIS (extension)"],
    certifications: ["PostgreSQL Certified Professional (EDB)"],
    roles: ["Database Administrator", "Backend Developer", "Data Engineer", "DBA"],
    sections: [
      { title: "PostgreSQL Fundamentals", topics: ["Installation & Configuration", "psql Command Line", "Data Types", "Database & Schema Design", "CRUD Operations"], subtopics: {
        "Installation & Configuration": ["PostgreSQL versions", "postgresql.conf key settings", "pg_hba.conf (authentication)", "Initializing a database cluster", "Starting/stopping the server"],
        "psql Command Line": ["Connecting to databases", "Meta-commands (\\d, \\l, \\c)", "Running queries", "Formatting output", "Script execution"],
        "Data Types": ["Numeric (INTEGER, BIGINT, NUMERIC)", "Text (VARCHAR, TEXT)", "Date/Time (TIMESTAMP, INTERVAL)", "BOOLEAN", "UUID", "JSON/JSONB", "Array types", "HStore"],
        "Database & Schema Design": ["Creating databases", "Schema organization", "Naming conventions", "Normalization", "When to denormalize"],
        "CRUD Operations": ["INSERT (single, bulk, ON CONFLICT)", "SELECT (filtering, sorting, limiting)", "UPDATE (with joins)", "DELETE vs TRUNCATE", "RETURNING clause"]
      }},
      { title: "Advanced SQL", topics: ["Joins & Subqueries", "Window Functions", "CTEs & Recursive Queries", "Aggregations & GROUPING SETS", "Pivot & Unpivot"], subtopics: {
        "Joins & Subqueries": ["INNER, LEFT, RIGHT, FULL joins", "Cross joins", "Self joins", "Correlated subqueries", "LATERAL joins", "EXISTS vs IN"],
        "Window Functions": ["ROW_NUMBER, RANK, DENSE_RANK", "LAG, LEAD", "SUM/AVG OVER", "NTILE", "Frame clauses (ROWS, RANGE)", "Named windows"],
        "CTEs & Recursive Queries": ["WITH clause", "Recursive CTEs (hierarchical data)", "CTE performance", "Materialized CTEs", "Multiple CTEs"],
        "Aggregations & GROUPING SETS": ["GROUP BY extensions", "ROLLUP", "CUBE", "GROUPING SETS", "FILTER clause", "Ordered-set aggregates"],
        "Pivot & Unpivot": ["CROSSTAB (tablefunc)", "Conditional aggregation", "JSON aggregation for pivot", "Dynamic pivoting"]
      }},
      { title: "Indexing & Performance", topics: ["Index Types", "Query Optimization", "EXPLAIN & ANALYZE", "Partitioning", "Connection Pooling"], subtopics: {
        "Index Types": ["B-tree (default)", "Hash indexes", "GIN (inverted, for JSONB/array)", "GiST (geospatial)", "BRIN (block range)", "Partial indexes", "Expression indexes", "Multi-column indexes"],
        "Query Optimization": ["Query planner basics", "Statistics (ANALYZE)", "Sequential vs index scan", "Join strategies", "Work_mem tuning", "Effective_cache_size"],
        "EXPLAIN & ANALYZE": ["EXPLAIN basics", "EXPLAIN ANALYZE", "Reading query plans", "Identifying bottlenecks", "Common plan patterns"],
        "Partitioning": ["Range partitioning", "List partitioning", "Hash partitioning", "Declarative partitioning", "Partition pruning", "Managing partitions"],
        "Connection Pooling": ["PgBouncer setup", "Transaction vs session pooling", "Connection limits", "Pgpool-II", "Application-level pooling"]
      }},
      { title: "Transactions & Concurrency", topics: ["ACID Properties", "Transaction Isolation Levels", "MVCC", "Locking Mechanisms", "Deadlock Prevention"], subtopics: {
        "ACID Properties": ["Atomicity", "Consistency", "Isolation", "Durability", "WAL (Write-Ahead Logging)"],
        "Transaction Isolation Levels": ["Read Uncommitted", "Read Committed (default)", "Repeatable Read", "Serializable", "Snapshot isolation"],
        "MVCC": ["How MVCC works", "Visibility rules", "Transaction IDs", "Vacuum and dead tuples", "Autovacuum tuning"],
        "Locking Mechanisms": ["Row-level locks", "Table-level locks", "Advisory locks", "Lock timeouts", "NOWAIT and SKIP LOCKED"],
        "Deadlock Prevention": ["Lock ordering", "Deadlock detection", "Deadlock resolution", "Monitoring locks", "Best practices"]
      }},
      { title: "PostgreSQL Extensions & Advanced", topics: ["JSONB Operations", "Full-Text Search", "PostGIS (Spatial)", "Logical Replication", "Stored Procedures & Functions"], subtopics: {} },
      { title: "Security", topics: ["Role-based Access Control", "Row-Level Security", "SSL/TLS Connections", "Encryption at Rest", "Audit Logging"], subtopics: {} },
      { title: "Backup & Recovery", topics: ["pg_dump / pg_restore", "Continuous Archiving (WAL)", "pg_basebackup", "Point-in-Time Recovery", "Barman / pgBackRest"], subtopics: {} },
      { title: "Portfolio Projects", topics: ["Design a normalized schema", "Query optimization challenge", "JSONB-powered API backend", "PostGIS mapping application"], subtopics: {} },
      { title: "Interview Preparation", topics: ["SQL Query Challenges", "Indexing Strategy", "MVCC Deep Dive", "Performance Tuning Scenarios"], subtopics: {} },
    ]
  },
  {
    slug: "mongodb", title: "MongoDB", icon: "🍃", color: "#47A248",
    skillCategory: "Databases", difficulty: "Beginner", duration: "2-4 months", durationHours: 120,
    description: "MongoDB is a leading NoSQL document database that stores data in flexible JSON-like BSON documents. It offers horizontal scaling, rich queries, aggregation pipelines and Atlas cloud hosting for modern applications.",
    tagline: "The most popular document database for modern applications.",
    prerequisites: ["Basic programming", "JSON understanding", "Database concepts"],
    tools: ["MongoDB", "MongoDB Atlas", "MongoDB Compass", "mongosh", "Mongoose (Node.js)", "PyMongo (Python)"],
    certifications: ["MongoDB Certified Developer Associate", "MongoDB Certified DBA Associate"],
    roles: ["Backend Developer", "Database Administrator", "Data Engineer", "Full Stack Developer"],
    sections: [
      { title: "MongoDB Fundamentals", topics: ["Document Model", "Collections & Documents", "CRUD Operations", "Data Modeling", "MongoDB Atlas"], subtopics: {
        "Document Model": ["BSON format", "Document structure", "Nested documents", "Arrays in documents", "Data types"],
        "Collections & Documents": ["Creating collections", "Schema validation", "Document size limits", "Naming conventions", "Capped collections"],
        "CRUD Operations": ["insertOne/insertMany", "find/findOne with filters", "updateOne/updateMany with operators", "deleteOne/deleteMany", "Aggregation basics"],
        "Data Modeling": ["Embedding vs referencing", "One-to-one, one-to-many patterns", "Polymorphic schema", "Schema design patterns", "When to denormalize"],
        "MongoDB Atlas": ["Creating clusters", "Connection strings", "Database users & IP whitelist", "Atlas Search", "Serverless instances"]
      }},
      { title: "Querying & Indexing", topics: ["Query Operators", "Index Types", "Compound Indexes", "Text Search", "Geospatial Queries"], subtopics: {
        "Query Operators": ["Comparison ($eq, $gt, $in)", "Logical ($and, $or, $not)", "Element ($exists, $type)", "Array ($all, $elemMatch)", "Evaluation ($regex, $text)"],
        "Index Types": ["Single field index", "Compound index", "Multikey index (arrays)", "TTL index", "Unique index", "Hashed index"],
        "Compound Indexes": ["Index field order", "Covered queries", "Sort order", "Prefix rules", "Index intersection"],
        "Text Search": ["Creating text indexes", "Text search queries", "Text score ranking", "Language support", "Atlas Search (Lucene)"],
        "Geospatial Queries": ["2dsphere index", "$geoWithin, $near", "GeoJSON objects", "Geospatial aggregation", "Location-based queries"]
      }},
      { title: "Aggregation Framework", topics: ["Pipeline Stages", "$match, $group, $project", "$lookup (joins)", "$unwind", "Window Functions"], subtopics: {
        "Pipeline Stages": ["Pipeline concept", "Stage ordering", "Performance considerations", "AllowDiskUse", "Explain for aggregation"],
        "$match, $group, $project": ["Filtering with $match", "Grouping with $sum, $avg, $push", "Reshaping with $project", "Conditional expressions ($cond)", "Accumulator operators"],
        "$lookup (joins)": ["Simple lookup", "Lookup with pipeline", "Multiple lookups", "Performance considerations", "When to use references"],
        "$unwind": ["Deconstructing arrays", "Preserve array with includeArrayIndex", "Empty array handling", "Performance implications", "Alternative: $push with $filter"],
        "Window Functions": ["$setWindowFields", "Running totals", "Ranking within groups", "Moving averages", "Lead/Lag in aggregation"]
      }},
      { title: "Mongoose ODM", topics: ["Schema Definition", "Validation & Middleware", "Virtual Properties", "Population (References)", "Plugin System"], subtopics: {} },
      { title: "Transactions & Security", topics: ["Multi-document Transactions", "ACID in MongoDB", "Role-based Access Control", "Encryption", "Network Security"], subtopics: {} },
      { title: "Performance & Scaling", topics: ["Replica Sets", "Sharding", "Read/Write Concerns", "Profiling & Monitoring", "Connection Pooling"], subtopics: {} },
      { title: "Portfolio Projects", topics: ["Blog with Mongoose", "Real-time Chat Backend", "E-commerce Product Catalog", "Geospatial Application"], subtopics: {} },
      { title: "Interview Preparation", topics: ["Data Modeling Decisions", "Aggregation Pipeline Design", "Indexing Strategy", "SQL vs NoSQL Discussion"], subtopics: {} },
    ]
  },
  {
    slug: "redis", title: "Redis", icon: "🔴", color: "#DC382D",
    skillCategory: "Databases", difficulty: "Intermediate", duration: "2-4 months", durationHours: 120,
    description: "Redis is an in-memory data store used as a database, cache, message broker and streaming engine. It offers sub-millisecond latency, rich data structures, pub/sub messaging and modules for search, time series and more.",
    tagline: "In-memory data store for caching, messaging and real-time applications.",
    prerequisites: ["Basic database concepts", "Command-line familiarity", "Programming basics"],
    tools: ["Redis", "redis-cli", "RedisInsight", "Redis Cloud", "RedisJSON", "RediSearch"],
    certifications: ["Redis Certified Associate"],
    roles: ["Backend Developer", "DevOps Engineer", "Database Engineer", "Platform Engineer"],
    sections: [
      { title: "Redis Fundamentals", topics: ["Redis Architecture", "Data Types", "String Operations", "Key Management", "Persistence"], subtopics: {
        "Redis Architecture": ["Single-threaded event loop", "In-memory design", "Client-server model", "RESP protocol", "Redis vs traditional databases"],
        "Data Types": ["Strings", "Lists", "Sets", "Sorted Sets (ZSET)", "Hashes", "Bitmaps", "HyperLogLogs", "Streams", "Geospatial"],
        "String Operations": ["GET/SET/DEL", "INCR/DECR", "MGET/MSET", "SET with expiry (EX/PX)", "SETNX (distributed lock)", "APPEND, STRLEN"],
        "Key Management": ["Key naming conventions", "TTL (EXPIRE/PEXPIRE)", "Key scanning (SCAN)", "Key space notifications", "Memory analysis (MEMORY USAGE)"],
        "Persistence": ["RDB snapshots", "AOF (Append Only File)", "RDB + AOF hybrid", "Persistence trade-offs", "Redis persistence best practices"]
      }},
      { title: "Caching Patterns", topics: ["Cache-Aside", "Write-Through", "Write-Behind", "Cache Invalidation", "TTL Strategies"], subtopics: {
        "Cache-Aside": ["Read path", "Write path", "Cache miss handling", "Stampede protection", "Implementation examples"],
        "Write-Through": ["Synchronous write to cache + DB", "Consistency guarantees", "When to use", "Performance impact", "Implementation"],
        "Write-Behind": ["Asynchronous write-back", "Batching writes", "Durability risks", "Use cases", "Queue-based implementation"],
        "Cache Invalidation": ["Time-based invalidation", "Event-based invalidation", "Tag-based invalidation", "Cache versioning", "Hard vs soft invalidation"],
        "TTL Strategies": ["Fixed TTL", "Sliding TTL", "Jittered TTL (preventing thundering herd)", "TTL best practices", "Monitoring expired keys"]
      }},
      { title: "Advanced Data Structures", topics: ["Sorted Sets (leaderboards)", "Streams (message queues)", "HyperLogLogs (counting)", "Bitmaps (feature flags)", "Geospatial (location)"], subtopics: {} },
      { title: "Pub/Sub & Messaging", topics: ["Publish/Subscribe", "Redis Streams (consumer groups)", "Reliable Messaging", "Message Ordering", "Redis as Message Broker"], subtopics: {} },
      { title: "Distributed Systems Patterns", topics: ["Distributed Locking (Redlock)", "Rate Limiting", "Session Management", "Job Queues", "Leader Election"], subtopics: {} },
      { title: "Performance & Operations", topics: ["Redis Memory Optimization", "Pipeline & Transactions", "Cluster Mode", "Sentinel (HA)", "Monitoring (INFO, SLOWLOG)"], subtopics: {} },
      { title: "Redis Modules", topics: ["RediSearch (full-text search)", "RedisJSON", "RedisTimeSeries", "RedisGraph", "RedisBloom"], subtopics: {} },
      { title: "Portfolio Projects", topics: ["Caching layer for API", "Real-time Leaderboard", "Rate Limiter Service", "Session Store"], subtopics: {} },
      { title: "Interview Preparation", topics: ["Caching Strategy Design", "Data Structure Selection", "Distributed Lock Discussion", "Performance Optimization"], subtopics: {} },
    ]
  },
];

let added = 0;
for (const skill of newSkills) {
  if (existingSlugs.has(skill.slug)) continue;
  skills.push(skill);
  added++;
}
data.skills = skills;
writeFileSync(PATH, JSON.stringify(data, null, 2));
console.log(`✓ Added ${added} new skills. Total: ${skills.length}`);
