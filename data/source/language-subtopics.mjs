// ─────────────────────────────────────────────────────────────────────────────
// Per-language subtopic overrides.
// The shared CURATED_SUBTOPICS map is keyed by generic slugs (e.g.
// "functions-scope") and returns JS-flavored concepts ("Arrow functions",
// "this binding", "IIFEs") regardless of language. When a roadmap's language
// matches one of these, resolveSubtopics checks this map FIRST so C gets C
// concepts, Java gets Java concepts, etc.
// Keys: language slug → topic slug → concept list.
// ─────────────────────────────────────────────────────────────────────────────

export const LANGUAGE_SUBTOPICS = {
  c: {
    "functions-scope": [
      "Function declarations & definitions",
      "Parameters & return values",
      "Local vs global scope",
      "Storage classes (auto, static, extern)",
      "Recursion",
      "Function pointers",
    ],
    "classes-objects": [
      "Structures (struct)",
      "Unions",
      "Typedef",
      "Bit fields",
      "Nested structures",
    ],
    "collections-generics": [
      "Arrays",
      "Strings (char arrays)",
      "Linked lists",
      "Stacks & queues in C",
      "Manual data structures",
    ],
    "maps-sets": [
      "Hash tables in C",
      "Implementing sets with arrays",
      "Open addressing",
      "Chaining",
    ],
    "exception-handling": [
      "Error codes & errno",
      "Return-code checking",
      "assert()",
      "Signal handling basics",
    ],
    "modules-imports": [
      "Header files",
      "Include guards",
      "Multiple translation units",
      "Linking & symbols",
    ],
    "package-management": [
      "Static libraries (ar)",
      "Shared libraries (.so)",
      "Make & CMake builds",
      "Linker flags",
    ],
    "interfaces-abstract-classes": [
      "Function pointers as interfaces",
      "Structs of function pointers",
      "Opaque types (pimpl pattern)",
    ],
    "inheritance-polymorphism": [
      "Function pointers for polymorphism",
      "Vtables by hand",
      "Struct embedding",
    ],
    "unit-testing": [
      "Unity / CMock testing",
      "Assert macros",
      "Test harnesses in C",
      "Test-driven C",
    ],
    "code-quality-linting": [
      "Compiler warnings (-Wall -Wextra)",
      "Static analysis (cppcheck)",
      "const correctness",
      "Naming conventions",
    ],
    "design-patterns": [
      "Object-based patterns in C",
      "Function pointer tables",
      "Opaque types & data hiding",
    ],
    "performance-optimization": [
      "Compiler optimizations (-O2)",
      "Cache-friendly data layout",
      "Loop unrolling & vectorization",
      "Profiling (gprof, perf)",
    ],
    "scope-closures": [
      "Block vs function scope",
      "Storage classes",
      "Static variables",
      "Lifetime & visibility",
    ],
    "async-javascript": [
      "Async I/O in C",
      "Signals & handlers",
      "poll/select for I/O multiplexing",
      "Threads with pthreads",
    ],
  },

  cpp: {
    "functions-scope": [
      "Function declarations & definitions",
      "Parameters & return values",
      "Overloading & default arguments",
      "Namespaces & scope resolution",
      "Lambdas",
      "Recursion",
    ],
    "classes-objects": [
      "Classes & objects",
      "Constructors & destructors",
      "Access specifiers",
      "Friend functions",
      "Operator overloading",
    ],
    "collections-generics": [
      "std::vector",
      "std::list & std::deque",
      "std::map & std::set",
      "std::unordered_map",
      "Iterators & ranges",
    ],
    "maps-sets": [
      "std::map & std::set",
      "std::unordered_map",
      "std::multimap",
      "Custom comparators",
    ],
    "exception-handling": [
      "try/catch/throw",
      "Exception safety guarantees",
      "RAII & exceptions",
      "std::exception hierarchy",
    ],
    "modules-imports": [
      "Header files & #include",
      "Forward declarations",
      "C++20 modules",
      "Namespaces",
    ],
    "package-management": [
      "vcpkg & Conan",
      "CMake packages",
      "Dependency management",
    ],
    "interfaces-abstract-classes": [
      "Pure virtual functions",
      "Abstract base classes",
      "Interfaces in C++",
    ],
    "inheritance-polymorphism": [
      "Inheritance & access control",
      "Virtual functions & vtable",
      "Multiple inheritance",
      "Dynamic cast",
    ],
    "unit-testing": [
      "GoogleTest",
      "Test fixtures",
      "Mocking with GoogleMock",
      "Catch2",
    ],
    "code-quality-linting": [
      "clang-tidy",
      "cppcheck",
      "Core Guidelines checks",
      "Code formatting (clang-format)",
    ],
    "design-patterns": [
      "CRTP & policy-based design",
      "Factory & singleton",
      "Observer patterns",
      "RAII as a pattern",
    ],
    "performance-optimization": [
      "Move semantics & copy elision",
      "Inline & constexpr",
      "Cache locality",
      "Profiling (perf, VTune)",
    ],
    "scope-closures": [
      "Scopes & namespaces",
      "Lambdas & capture",
      "Static & thread-local storage",
    ],
  },

  java: {
    "functions-scope": [
      "Method declarations",
      "Parameters & return values",
      "Method overloading",
      "Variable scope & shadowing",
      "Recursion",
      "Static methods",
    ],
    "arrow-function": [
      "Lambdas & functional interfaces",
      "Method references",
      "Streams with lambdas",
    ],
    "collections-generics": [
      "ArrayList & LinkedList",
      "HashSet & TreeSet",
      "HashMap & TreeMap",
      "Queue & Deque",
      "Sorting & comparators",
    ],
    "maps-sets": [
      "HashMap & LinkedHashMap",
      "TreeMap & NavigableMap",
      "HashSet & TreeSet",
      "ConcurrentHashMap",
    ],
    "modules-imports": [
      "Packages & imports",
      "Java modules (JPMS)",
      "Classpath & jars",
    ],
    "package-management": [
      "Maven dependencies",
      "Gradle dependencies",
      "Central repository",
    ],
    "inheritance-polymorphism": [
      "Inheritance & extends",
      "Method overriding",
      "Polymorphism & dynamic dispatch",
      "Object class methods",
    ],
    "scope-closures": [
      "Variable scope in Java",
      "Inner & anonymous classes",
      "Lambda capture",
    ],
    "async-javascript": [
      "Threads & Runnable",
      "ExecutorService",
      "CompletableFuture",
      "Virtual threads",
    ],
    "unit-testing": [
      "JUnit 5",
      "AssertJ assertions",
      "Parameterized tests",
    ],
    "code-quality-linting": [
      "Checkstyle",
      "SpotBugs",
      "IntelliJ inspections",
    ],
    "design-patterns": [
      "Creational patterns (Factory, Builder)",
      "Structural patterns (Adapter, Decorator)",
      "Behavioral patterns (Observer, Strategy)",
    ],
    "performance-optimization": [
      "JVM tuning flags",
      "Garbage collection tuning",
      "Profiling with JFR/JMC",
      "Avoiding allocations",
    ],
  },

  javascript: {
    "functions-scope": [
      "Declarations vs expressions",
      "Arrow functions",
      "Scope and closures",
      "Hoisting",
      "this binding",
      "IIFEs and modules",
    ],
    "exception-handling": [
      "try/catch/finally",
      "Error types",
      "Custom errors",
      "Error boundaries in async code",
    ],
    "collections-generics": [
      "Arrays",
      "Objects",
      "Map & Set",
      "WeakMap & WeakSet",
    ],
    "maps-sets": [
      "Map & Set",
      "WeakMap & WeakSet",
      "Object vs Map",
    ],
    "modules-imports": [
      "ES modules (import/export)",
      "CommonJS",
      "Dynamic import",
    ],
    "package-management": [
      "npm & package.json",
      "Semver",
      "Yarn & pnpm",
      "Publishing packages",
    ],
    "inheritance-polymorphism": [
      "Prototypes & prototype chain",
      "Classes & extends",
      "Object.create",
    ],
    "interfaces-abstract-classes": [
      "Duck typing",
      "Shape interfaces in TypeScript",
      "Abstract classes in JS",
    ],
    "unit-testing": [
      "Jest & Vitest",
      "Testing Library",
      "Mocking & spies",
    ],
    "code-quality-linting": [
      "ESLint",
      "Prettier",
      "Type checking with tsc",
    ],
    "design-patterns": [
      "Module pattern",
      "Factory functions",
      "Observer (EventEmitter)",
      "Singleton via modules",
    ],
    "performance-optimization": [
      "Avoiding reflows",
      "Debouncing & throttling",
      "Code splitting",
      "Profiling with DevTools",
    ],
    "scope-closures": [
      "Lexical scope",
      "Closures in depth",
      "Hoisting & TDZ",
      "Module scope",
    ],
  },

  python: {
    "functions-scope": [
      "def statements",
      "Parameters & keyword arguments",
      "Default arguments",
      "*args & **kwargs",
      "Return values",
      "Scope (LEGB rule)",
      "lambda functions",
      "Recursion",
    ],
    "classes-objects": [
      "Classes & instances",
      "Instance & class methods",
      "Dunder methods",
      "Dataclasses",
      "Properties",
    ],
    "collections-generics": [
      "Lists",
      "Tuples",
      "Sets",
      "Dictionaries",
      "Collections module",
    ],
    "maps-sets": [
      "Dictionaries",
      "Sets & frozensets",
      "defaultdict & Counter",
    ],
    "exception-handling": [
      "try/except/else/finally",
      "Exception types",
      "Custom exceptions",
      "Raising exceptions",
    ],
    "modules-imports": [
      "import statements",
      "Packages & __init__.py",
      "Standard library",
      "Relative imports",
    ],
    "package-management": [
      "pip & PyPI",
      "Virtual environments",
      "requirements.txt & pyproject.toml",
      "conda basics",
    ],
    "inheritance-polymorphism": [
      "Inheritance & super()",
      "Multiple inheritance & MRO",
      "Duck typing & polymorphism",
      "Abstract base classes",
    ],
    "interfaces-abstract-classes": [
      "ABC & abstractmethod",
      "Protocols (PEP 544)",
      "Duck typing",
    ],
    "unit-testing": [
      "pytest basics",
      "Fixtures & parametrize",
      "unittest module",
      "Mocking (unittest.mock)",
    ],
    "code-quality-linting": [
      "PEP 8 & flake8",
      "Black formatter",
      "mypy type checking",
      "ruff",
    ],
    "design-patterns": [
      "Decorators as patterns",
      "Factory & singleton in Python",
      "Context managers",
      "Metaclass patterns",
    ],
    "performance-optimization": [
      "Profiling (cProfile)",
      "List comprehensions",
      "Avoiding loops (vectorization)",
      "Caching (lru_cache)",
    ],
    "scope-closures": [
      "LEGB rule",
      "nonlocal & global",
      "Closures in Python",
      "Lambdas & scoping",
    ],
  },

  typescript: {
    "functions-scope": [
      "Function type annotations",
      "Optional & default parameters",
      "Rest parameters",
      "Overloads",
      "Type guards & narrowing",
      "Generics on functions",
    ],
    "collections-generics": [
      "Arrays & tuples",
      "Generics on collections",
      "Utility types (Partial, Pick)",
    ],
    "maps-sets": [
      "Map & Set with types",
      "ReadonlyMap & ReadonlySet",
      "Record<K, V>",
    ],
    "modules-imports": [
      "ES modules with types",
      "Module resolution & paths",
      "Declaration files (d.ts)",
    ],
    "package-management": [
      "npm with TypeScript",
      "@types packages",
      "Bundlers (Vite/Webpack)",
    ],
    "inheritance-polymorphism": [
      "Classes & implements",
      "Abstract classes",
      "Interface extension",
    ],
    "interfaces-abstract-classes": [
      "Interfaces & type aliases",
      "Structural typing",
      "Abstract classes",
    ],
    "unit-testing": [
      "Vitest with TypeScript",
      "ts-jest",
      "Type testing",
    ],
    "code-quality-linting": [
      "typescript-eslint",
      "Strict mode",
      "tsc --noEmit in CI",
    ],
  },

  golang: {
    "functions-scope": [
      "Function declarations",
      "Multiple return values",
      "Named returns",
      "Variadic functions",
      "Function values & closures",
      "Recursion",
    ],
    "classes-objects": [
      "Structs",
      "Methods on types",
      "Pointer vs value receivers",
      "Composition",
    ],
    "collections-generics": [
      "Slices",
      "Maps",
      "Arrays",
      "Generic collections (Go 1.18+)",
    ],
    "maps-sets": [
      "Maps",
      "Set patterns with maps",
      "sync.Map",
    ],
    "exception-handling": [
      "Error values",
      "Creating & wrapping errors",
      "Panic & recover",
      "Deferred error handling",
    ],
    "modules-imports": [
      "Packages & imports",
      "Go modules & go.mod",
      "Standard library",
      "Publishing packages",
    ],
    "package-management": [
      "go get & modules",
      "Version management",
      "Vendoring",
    ],
    "inheritance-polymorphism": [
      "Composition over inheritance",
      "Interface embedding",
      "Interface satisfaction",
    ],
    "interfaces-abstract-classes": [
      "Interfaces",
      "Empty interface (any)",
      "Type assertions",
      "Interface embedding",
    ],
    "unit-testing": [
      "testing package",
      "Table-driven tests",
      "Benchmarks",
      "Fuzzing",
    ],
    "code-quality-linting": [
      "gofmt & goimports",
      "go vet",
      "staticcheck",
    ],
    "design-patterns": [
      "Idiomatic Go composition",
      "Options pattern",
      "Middleware pattern",
      "Worker pool pattern",
    ],
    "performance-optimization": [
      "Profiling (pprof)",
      "Escape analysis",
      "Avoiding allocations",
      "Benchmarks",
    ],
    "scope-closures": [
      "Scoping in Go",
      "Closures & goroutines",
      "Variable shadowing",
    ],
  },

  rust: {
    "functions-scope": [
      "Function declarations",
      "Return values & unit type",
      "Closures",
      "Iterators & higher-order functions",
      "Recursion",
    ],
    "classes-objects": [
      "Structs",
      "Enums",
      "Methods (impl blocks)",
      "Associated functions",
    ],
    "collections-generics": [
      "Vec",
      "HashMap & BTreeMap",
      "HashSet",
      "Iterators & adapters",
      "Generics on collections",
    ],
    "maps-sets": [
      "HashMap & BTreeMap",
      "HashSet & BTreeSet",
      "Entry API",
    ],
    "exception-handling": [
      "Result type",
      "The ? operator",
      "Option handling",
      "panic! & unwrap/expect",
      "Custom error types",
    ],
    "modules-imports": [
      "Modules & visibility",
      "Crates & crates.io",
      "Cargo features",
      "Workspaces",
    ],
    "package-management": [
      "Cargo & crates.io",
      "Cargo.toml & Cargo.lock",
      "Dependency management",
    ],
    "inheritance-polymorphism": [
      "Traits as interfaces",
      "Trait objects (dyn)",
      "Composition with generics",
    ],
    "interfaces-abstract-classes": [
      "Traits",
      "Trait bounds",
      "Trait objects",
      "Default methods",
    ],
    "unit-testing": [
      "cargo test & doctests",
      "Integration tests",
      "Property testing (proptest)",
    ],
    "code-quality-linting": [
      "Clippy",
      "rustfmt",
      "cargo audit",
    ],
    "design-patterns": [
      "Builder pattern with Rust types",
      "Newtype pattern",
      "RAII & Drop",
      "Error handling patterns",
    ],
    "performance-optimization": [
      "Zero-cost abstractions",
      "Memory layout optimization",
      "Profiling (perf, cargo-flamegraph)",
      "Avoiding clones",
    ],
    "scope-closures": [
      "Ownership & scopes",
      "Borrowing & lifetimes",
      "Closure captures",
    ],
  },

  csharp: {
    "functions-scope": [
      "Method declarations & overloads",
      "Parameters (ref, out, params)",
      "Local functions & lambdas",
      "Variable scope & shadowing",
    ],
    "collections-generics": [
      "List<T> & Dictionary<TKey,TValue>",
      "HashSet<T> & Queue<T>",
      "LINQ over collections",
    ],
    "maps-sets": [
      "Dictionary<TKey, TValue>",
      "HashSet<T>",
      "SortedDictionary & SortedSet",
    ],
    "exception-handling": [
      "try/catch/finally",
      "Exception types & filtering",
      "Custom exceptions",
      "NullReferenceException & null safety",
    ],
    "modules-imports": [
      "Namespaces & usings",
      "Assemblies",
      "Project references",
    ],
    "package-management": [
      "NuGet packages",
      "Package sources",
      "dotnet restore",
    ],
    "inheritance-polymorphism": [
      "Inheritance & base",
      "Virtual & override",
      "Interfaces & implementations",
      "Records & structs",
    ],
    "interfaces-abstract-classes": [
      "Interfaces",
      "Abstract classes",
      "IEnumerable & IEnumerator",
    ],
    "unit-testing": [
      "xUnit & NUnit",
      "Moq mocking",
      "dotnet test",
    ],
    "code-quality-linting": [
      "Roslyn analyzers",
      ".editorconfig",
      "StyleCop",
    ],
    "design-patterns": [
      "DI & IoC containers",
      "Factory & singleton",
      "Observer & events",
      "Repository pattern",
    ],
    "performance-optimization": [
      "Span<T> & Memory<T>",
      "Avoiding allocations",
      "Profiling (dotnet-trace)",
      "Async performance",
    ],
    "scope-closures": [
      "Scoping rules",
      "Closures & captures",
      "Delegates & lambdas",
    ],
  },

  kotlin: {
    "functions-scope": [
      "Function declarations",
      "Default & named arguments",
      "Extension functions",
      "Lambdas & higher-order functions",
      "Local functions & closures",
    ],
    "classes-objects": [
      "Classes & constructors",
      "Data classes",
      "Sealed classes",
      "Object & companion object",
      "Properties & backing fields",
    ],
    "collections-generics": [
      "Lists, sets & maps",
      "Sequences (lazy collections)",
      "Collection operations",
      "Generics & variance",
    ],
    "maps-sets": [
      "List, Set & Map",
      "Mutable vs immutable",
      "Sequence & lazy evaluation",
    ],
    "exception-handling": [
      "try/catch/finally",
      "Kotlin exceptions",
      "Null safety instead of exceptions",
      "Result handling",
    ],
    "modules-imports": [
      "Packages & imports",
      "Gradle modules",
      "Kotlin Multiplatform modules",
    ],
    "package-management": [
      "Gradle dependencies",
      "Maven Central & JitPack",
    ],
    "inheritance-polymorphism": [
      "Inheritance & open classes",
      "Abstract classes & interfaces",
      "Delegation",
    ],
    "interfaces-abstract-classes": [
      "Interfaces",
      "Abstract classes",
      "Functional interfaces",
    ],
    "unit-testing": [
      "kotlin.test & JUnit",
      "MockK",
      "Coroutines testing",
    ],
    "code-quality-linting": [
      "ktlint",
      "detekt",
      "IntelliJ inspections",
    ],
    "design-patterns": [
      "Scope functions (let, run, apply)",
      "Delegation pattern",
      "Factory & singleton in Kotlin",
      "Coroutines-based patterns",
    ],
    "performance-optimization": [
      "Inline functions & reified types",
      "Avoiding allocations",
      "Coroutines over threads",
    ],
    "scope-closures": [
      "Scoping & shadowing",
      "Closures & capture",
      "Scope functions",
    ],
  },

  swift: {
    "functions-scope": [
      "Function declarations",
      "Parameters & return values",
      "Default & variadic parameters",
      "Closures & capture lists",
      "Higher-order functions",
    ],
    "classes-objects": [
      "Structs vs classes",
      "Properties & stored values",
      "Computed properties",
      "Initializers",
      "Access control",
    ],
    "collections-generics": [
      "Arrays",
      "Dictionaries",
      "Sets",
      "Generics & associated types",
    ],
    "maps-sets": [
      "Dictionaries",
      "Sets",
      "Collection methods",
    ],
    "exception-handling": [
      "Error protocol",
      "throw & throws",
      "do-catch & try variants",
      "Custom error types",
    ],
    "modules-imports": [
      "Frameworks & targets",
      "import statements",
      "Swift Package Manager",
    ],
    "package-management": [
      "SPM dependencies",
      "Package products & targets",
    ],
    "inheritance-polymorphism": [
      "Inheritance & subclassing",
      "Protocols & protocol-oriented design",
      "Extension polymorphism",
    ],
    "interfaces-abstract-classes": [
      "Protocols",
      "Protocol extensions",
      "Protocol composition",
    ],
    "unit-testing": [
      "XCTest",
      "Swift Testing",
      "Mocking (Cuckoo)",
    ],
    "code-quality-linting": [
      "SwiftLint",
      "SwiftFormat",
      "Access control review",
    ],
    "design-patterns": [
      "MVVM with SwiftUI",
      "Delegate pattern",
      "Singleton & DI",
      "Protocol-oriented design",
    ],
    "performance-optimization": [
      "Value semantics & copy-on-write",
      "Instruments profiling",
      "Avoiding retain cycles",
    ],
    "scope-closures": [
      "Scoping rules",
      "Closures & capture lists",
      "Escaping closures",
    ],
  },

  dart: {
    "functions-scope": [
      "Function declarations",
      "Named & positional parameters",
      "Anonymous functions & closures",
      "Arrow syntax",
      "Higher-order functions",
    ],
    "classes-objects": [
      "Classes & constructors",
      "Named & factory constructors",
      "Getters & setters",
      "Mixins",
    ],
    "collections-generics": [
      "Lists, sets & maps",
      "Collection spread & control-flow",
      "Generics",
      "Records & patterns (Dart 3)",
    ],
    "maps-sets": [
      "Maps & map literals",
      "Sets",
      "Collection operations",
    ],
    "exception-handling": [
      "try/catch/finally",
      "Exception types",
      "Custom exceptions",
      "Error handling in async",
    ],
    "modules-imports": [
      "import & export",
      "Packages & pub",
      "Core libraries (dart:io, dart:convert)",
    ],
    "package-management": [
      "pub.dev packages",
      "pubspec.yaml",
      "Dependency constraints",
    ],
    "inheritance-polymorphism": [
      "Inheritance & overrides",
      "Abstract classes & interfaces",
      "Mixins",
    ],
    "interfaces-abstract-classes": [
      "Abstract classes",
      "Implicit interfaces",
      "Mixins as composition",
    ],
    "unit-testing": [
      "test package & expect",
      "Mockito",
      "dart test",
    ],
    "code-quality-linting": [
      "dart analyze",
      "dart format",
      "Effective Dart",
    ],
    "design-patterns": [
      "Factory constructors",
      "Repository pattern",
      "Provider/Riverpod state patterns",
    ],
    "performance-optimization": [
      "Isolates for concurrency",
      "Const & final",
      "Avoiding rebuilds",
    ],
    "scope-closures": [
      "Scoping rules",
      "Closures & capture",
    ],
  },

  php: {
    "functions-scope": [
      "Function declarations",
      "Parameters & return values",
      "Default & nullable parameters",
      "Type hints & strict types",
      "Anonymous functions & closures",
      "Generators",
    ],
    "classes-objects": [
      "Classes & objects",
      "Properties & methods",
      "Constructors & property promotion",
      "Encapsulation & visibility",
      "Traits",
    ],
    "collections-generics": [
      "Indexed & associative arrays",
      "Array functions",
      "Spl structures",
    ],
    "maps-sets": [
      "Associative arrays",
      "SplObjectStorage",
      "Array keys & hashing",
    ],
    "exception-handling": [
      "Exceptions (try/catch)",
      "Error types",
      "Custom exceptions",
      "Error reporting & logging",
    ],
    "modules-imports": [
      "Namespaces",
      "use & autoloading",
      "PSR-4",
      "require & include",
    ],
    "package-management": [
      "Composer & Packagist",
      "Autoloading",
      "Version constraints",
    ],
    "inheritance-polymorphism": [
      "Inheritance & extends",
      "Abstract classes & interfaces",
      "Traits for composition",
    ],
    "interfaces-abstract-classes": [
      "Interfaces",
      "Abstract classes",
      "Dependency injection basics",
    ],
    "unit-testing": [
      "PHPUnit",
      "Pest",
      "Test doubles & mocks",
    ],
    "code-quality-linting": [
      "PHP CS Fixer",
      "PHPStan & Psalm",
      "PSR-12 style",
    ],
    "design-patterns": [
      "Factory & singleton",
      "Repository & service patterns",
      "Observer patterns",
    ],
    "performance-optimization": [
      "Opcache & caching",
      "Profiling (Xdebug, Blackfire)",
      "Database query optimization",
    ],
    "scope-closures": [
      "Variable scope",
      "Closures & use",
      "Static variables",
    ],
  },

  ruby: {
    "functions-scope": [
      "Method definitions",
      "Parameters & default values",
      "Splat & keyword arguments",
      "Blocks, procs & lambdas",
      "Yield & block_given?",
    ],
    "classes-objects": [
      "Classes & objects",
      "Instance & class methods",
      "Access control",
      "Modules & mixins",
    ],
    "collections-generics": [
      "Arrays",
      "Hashes",
      "Ranges",
      "Enumerable power",
    ],
    "maps-sets": [
      "Hashes",
      "Sets (require 'set')",
      "Hash default values",
    ],
    "exception-handling": [
      "begin/rescue/ensure",
      "Raise & custom exceptions",
      "Standard exceptions",
    ],
    "modules-imports": [
      "require & load",
      "Modules & namespacing",
      "RubyGems",
    ],
    "package-management": [
      "RubyGems & gems",
      "Gemfile & Bundler",
      "Gem versions",
    ],
    "inheritance-polymorphism": [
      "Inheritance",
      "Modules & mixins",
      "Duck typing",
    ],
    "interfaces-abstract-classes": [
      "Modules as interfaces",
      "Mixins & concerns",
      "Duck typing",
    ],
    "unit-testing": [
      "RSpec",
      "Minitest",
      "Test doubles",
    ],
    "code-quality-linting": [
      "RuboCop",
      "StandardRB",
      "Ruby style guide",
    ],
    "design-patterns": [
      "Metaprogramming patterns",
      "Factory & singleton",
      "Observer (Observable)",
    ],
    "performance-optimization": [
      "Profiling (ruby-prof)",
      "Memoization",
      "Avoiding allocations",
    ],
    "scope-closures": [
      "Variable scope",
      "Blocks & closures",
      "Binding & eval",
    ],
  },

  r: {
    "functions-scope": [
      "Function definitions",
      "Arguments & defaults",
      "Return values",
      "Lexical scoping",
      "Anonymous functions",
      "Closures in R",
    ],
    "classes-objects": [
      "S3 object system",
      "S4 & R6 classes",
      "Attributes & classes",
    ],
    "collections-generics": [
      "Vectors",
      "Lists",
      "Data frames",
      "Matrices & arrays",
    ],
    "maps-sets": [
      "Named lists",
      "Data frames as maps",
      "Environments as hashes",
    ],
    "exception-handling": [
      "tryCatch & stop",
      "Warning vs error",
      "Condition handling",
    ],
    "modules-imports": [
      "library & require",
      "Packages",
      "Namespaces",
    ],
    "package-management": [
      "CRAN & install.packages",
      "renv for reproducibility",
      "Package versions",
    ],
    "inheritance-polymorphism": [
      "S3 classes & dispatch",
      "S4 formal classes",
      "R6 reference classes",
    ],
    "interfaces-abstract-classes": [
      "Generic functions (UseMethod)",
      "S4 setClass & setMethod",
    ],
    "unit-testing": [
      "testthat",
      "Expectations & fixtures",
      "R CMD check",
    ],
    "code-quality-linting": [
      "lintr",
      "R style guide",
      "Roxygen2 documentation",
    ],
    "design-patterns": [
      "Tidyverse patterns",
      "Functional pipelines",
      "Reactive patterns (Shiny)",
    ],
    "performance-optimization": [
      "Vectorization",
      "Profiling (profvis)",
      "Avoiding copies",
    ],
    "scope-closures": [
      "Lexical scoping",
      "Closures & environments",
      "Environments in depth",
    ],
  },

  scala: {
    "functions-scope": [
      "Function definitions",
      "Default & named parameters",
      "Partial functions",
      "Higher-order functions",
      "Closures",
      "Currying & partially applied functions",
    ],
    "classes-objects": [
      "Classes & objects",
      "Case classes",
      "Traits & mixins",
      "Companion objects",
    ],
    "collections-generics": [
      "List, Vector, Map, Set",
      "Immutable collections",
      "Collection operations",
      "Option, Either, Try",
    ],
    "maps-sets": [
      "Map & Set",
      "Immutable vs mutable",
      "Sorted maps",
    ],
    "exception-handling": [
      "try/catch/finally",
      "Option vs exceptions",
      "Either & Try types",
      "Custom exceptions",
    ],
    "modules-imports": [
      "Packages & imports",
      "Objects as modules",
      "sbt dependencies",
    ],
    "package-management": [
      "sbt & Maven dependencies",
      "Scala versions & cross-builds",
    ],
    "inheritance-polymorphism": [
      "Traits & mixins",
      "Inheritance & abstract classes",
      "Type classes",
    ],
    "interfaces-abstract-classes": [
      "Traits",
      "Abstract classes",
      "Type classes & given instances",
    ],
    "unit-testing": [
      "ScalaTest / MUnit",
      "Property-based testing (ScalaCheck)",
      "ZIO Test",
    ],
    "code-quality-linting": [
      "Scalafmt",
      "Scalafix",
      "WartRemover",
    ],
    "design-patterns": [
      "Type class pattern",
      "Reader & effect patterns",
      "Algebraic data types",
    ],
    "performance-optimization": [
      "Immutable data structures",
      "Tail recursion",
      "Effect batching",
    ],
    "scope-closures": [
      "Scoping rules",
      "Closures & capture",
      "Implicit scope",
    ],
  },

  perl: {
    "functions-scope": [
      "Subroutine definitions",
      "Parameters (@_)",
      "Return values & wantarray",
      "Lexical vs package variables",
      "Anonymous subs & closures",
    ],
    "classes-objects": [
      "Packages & modules",
      "bless & object orientation",
      "Moose/Moo classes",
      "Roles",
    ],
    "collections-generics": [
      "Arrays",
      "Hashes",
      "References & nested structures",
      "Hash of arrays idiom",
    ],
    "maps-sets": [
      "Hashes",
      "Hash of hashes",
      "Set patterns with hashes",
    ],
    "exception-handling": [
      "eval & die",
      "warnings & strict",
      "Try::Tiny",
    ],
    "modules-imports": [
      "use & require",
      "Packages & namespaces",
      "CPAN modules",
    ],
    "package-management": [
      "CPAN & cpanm",
      "Carton & local::lib",
    ],
    "inheritance-polymorphism": [
      "Inheritance via @ISA",
      "Roles & mixins",
      "Duck typing in Perl",
    ],
    "interfaces-abstract-classes": [
      "Roles as interfaces",
      "Method dispatch",
    ],
    "unit-testing": [
      "Test::More",
      "TAP output",
      "Test::Deep",
    ],
    "code-quality-linting": [
      "perlcritic",
      "perltidy",
      "warnings & strict",
    ],
    "design-patterns": [
      "Idiomatic Perl patterns",
      "Factory via blessed refs",
      "Callback patterns",
    ],
    "performance-optimization": [
      "Benchmark module",
      "Avoiding regex backtracking",
      "Profiling (Devel::NYTProf)",
    ],
    "scope-closures": [
      "Lexical vs dynamic scope",
      "Closures & anonymous subs",
      "our vs my",
    ],
  },
};
