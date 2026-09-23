// ─────────────────────────────────────────────────────────────────────────────
// CareerRoadmaps — Concept-Level Resource Library
//
// Bridges hand-curated TOPIC_RESOURCES (compound keys like "python-functions")
// and the v2 curriculum's generic topic labels ("Functions & Scope",
// "Control Flow & Logic", …) that appear across hundreds of career roadmaps.
//
// Selection is technology-aware: the roadmap's slug (or skill category)
// selects the stack variant, so a Java roadmap's "Functions & Scope" gets
// Oracle's Java docs, not Python's. Every URL is a direct content page —
// never a homepage, never a search URL, never a provider root.
//
// Exported API:
//   CONCEPT_RESOURCES       — { conceptKey: [{ title, url, type, qualityScore }] }
//   resolveConcepts(labels) — ordered concept keys for a topic label
//   pickConceptResources(labels, stack) — curated record set for a topic
//
// Run-standalone: node concept-resources.mjs --selftest
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync } from "node:fs";
import { BATCH2, BATCH2_ALIASES } from "./concept-batch2.mjs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Technology stacks ────────────────────────────────────────────────────────
// slug/subcategory fragments → stack id. First match wins.
const STACK_PATTERNS = [
  // Cloud providers and data/ML frameworks come FIRST: they are more specific
  // than the generic "sql"/"python" buckets below, and first match wins.
  { stack: "aws", re: /\b(aws|amazon web services|ec2|s3|lambda|solutions architect)\b/ },
  { stack: "azure", re: /\b(azure|az-\d|entra)\b/ },
  { stack: "gcp", re: /\b(gcp|google cloud|google cloud platform)\b/ },
  { stack: "pytorch", re: /\b(pytorch|torch|torchvision)\b/ },
  { stack: "tensorflow", re: /\b(tensorflow|keras|tflite|tf\.js|tensorflow\.js)\b/ },
  { stack: "huggingface", re: /\b(hugging\s?face|huggingface)\b/ },
  { stack: "mongodb", re: /\b(mongodb|mongo)\b/ },
  { stack: "postgresql", re: /\b(postgres|postgresql|psql)\b/ },
  { stack: "mysql", re: /\b(mysql|mariadb)\b/ },
  { stack: "matlab", re: /\b(matlab|simulink|mathworks|octave)\b/ },
  { stack: "graphql", re: /\b(graphql|apollo|relay)\b/ },
  { stack: "python", re: /\b(python|django|flask|fastapi|pandas|numpy)\b/ },
  { stack: "javascript", re: /\b(javascript|js)\b/ },
  { stack: "typescript", re: /\b(typescript)\b/ },
  { stack: "react", re: /\b(react|nextjs|next\.js|redux)\b/ },
  { stack: "angular", re: /\b(angular)\b/ },
  { stack: "vue", re: /\b(vue|nuxt)\b/ },
  { stack: "node", re: /\b(node|express|nestjs)\b/ },
  { stack: "java", re: /\b(java|spring|spring-boot)\b/ },
  { stack: "csharp", re: /\b(c#|csharp|\.net|dotnet|asp\.net)\b/ },
  { stack: "cpp", re: /\b(c\+\+|cpp)\b/ },
  { stack: "c", re: /\b(c-programming|embedded-c|^c$)\b/ },
  { stack: "go", re: /\b(go|golang)\b/ },
  { stack: "rust", re: /\b(rust)\b/ },
  { stack: "kotlin", re: /\b(kotlin)\b/ },
  { stack: "swift", re: /\b(swift|ios)\b/ },
  { stack: "dart", re: /\b(dart|flutter)\b/ },
  { stack: "php", re: /\b(php|laravel)\b/ },
  { stack: "ruby", re: /\b(ruby|rails)\b/ },
  { stack: "sql", re: /\b(sql|postgres|mysql|database|db)\b/ },
];

export function detectStack(...textParts) {
  const text = textParts.filter(Boolean).join(" ").toLowerCase();
  for (const { stack, re } of STACK_PATTERNS) {
    if (re.test(text)) return stack;
  }
  return null;
}

// ── The concept library ──────────────────────────────────────────────────────
// conceptKey: normalized topic/section label slug.
// Each entry: { title, url, type, qualityScore } — url must be a DIRECT page.
// Optional `stack` variants: { variant: { stackId: [records] }, default: [records] }
// A record without variants applies to every technology.
const LIB = {
  // ── Language-agnostic programming concepts ─────────────────────────────
  "variables-data-types": {
    stack: {
      python: [
        { title: "Python Data Types — Official Docs", url: "https://docs.python.org/3/library/stdtypes.html", type: "official-doc", qualityScore: 5 },
        { title: "W3Schools — Python Variables", url: "https://www.w3schools.com/python/python_variables.asp", type: "tutorial", qualityScore: 3 },
      ],
      javascript: [
        { title: "JavaScript Data Structures — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures", type: "official-doc", qualityScore: 5 },
        { title: "JavaScript.info — Variables", url: "https://javascript.info/variables", type: "tutorial", qualityScore: 5 },
      ],
      typescript: [
        { title: "TypeScript Everyday Types — Handbook", url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html", type: "official-doc", qualityScore: 5 },
      ],
      java: [
        { title: "Oracle Java Tutorials — Variables", url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html", type: "official-doc", qualityScore: 5 },
        { title: "Java Primitive Data Types — GeeksforGeeks", url: "https://www.geeksforgeeks.org/data-types-in-java/", type: "tutorial", qualityScore: 3 },
      ],
      csharp: [
        { title: "C# Types — Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/", type: "official-doc", qualityScore: 5 },
      ],
      cpp: [
        { title: "C++ Variables & Types — LearnCpp", url: "https://www.learncpp.com/cpp-tutorial/objects-and-variables/", type: "tutorial", qualityScore: 5 },
        { title: "C++ Data Types — cppreference", url: "https://en.cppreference.com/w/cpp/language/types", type: "official-doc", qualityScore: 5 },
      ],
      c: [
        { title: "C Variables — Learn-C.org", url: "https://www.learn-c.org/en/Variables", type: "tutorial", qualityScore: 4 },
        { title: "C Data Types — GeeksforGeeks", url: "https://www.geeksforgeeks.org/data-types-in-c/", type: "tutorial", qualityScore: 3 },
      ],
      go: [
        { title: "A Tour of Go — Variables", url: "https://go.dev/tour/basics/6", type: "official-doc", qualityScore: 5 },
        { title: "Go Data Types — Go by Example", url: "https://gobyexample.com/variables", type: "tutorial", qualityScore: 4 },
      ],
      rust: [
        { title: "The Rust Book — Variables & Mutability", url: "https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html", type: "official-doc", qualityScore: 5 },
      ],
      kotlin: [
        { title: "Kotlin Basic Types — Official Docs", url: "https://kotlinlang.org/docs/basic-types.html", type: "official-doc", qualityScore: 5 },
      ],
      swift: [
        { title: "The Swift Programming Language — Basic Operators & Types", url: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/", type: "official-doc", qualityScore: 5 },
      ],
      dart: [
        { title: "Dart Language Tour — Variables", url: "https://dart.dev/language/variables", type: "official-doc", qualityScore: 5 },
      ],
      php: [
        { title: "PHP Variables — Official Manual", url: "https://www.php.net/manual/en/language.variables.basics.php", type: "official-doc", qualityScore: 5 },
      ],
      ruby: [
        { title: "Ruby Variables — Official Docs", url: "https://docs.ruby-lang.org/en/master/syntax/rdoc/ref_doc/variables_rdoc.html", type: "official-doc", qualityScore: 4 },
      ],
    },
    // No stack-agnostic default: variables differ per language — a wrong-
    // language link is worse than none. Stack variants above cover the
    // detectable cases; others fall through to the builder's next tier.
    default: [],
  },

  "control-flow": {
    stack: {
      python: [
        { title: "Python Control Flow — Official Docs", url: "https://docs.python.org/3/tutorial/controlflow.html", type: "official-doc", qualityScore: 5 },
        { title: "Python if/else — W3Schools", url: "https://www.w3schools.com/python/python_conditions.asp", type: "tutorial", qualityScore: 3 },
      ],
      javascript: [
        { title: "Control Flow & Error Handling — MDN Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling", type: "official-doc", qualityScore: 5 },
        { title: "JavaScript.info — Conditional Operators", url: "https://javascript.info/ifelse", type: "tutorial", qualityScore: 5 },
      ],
      java: [
        { title: "Oracle Java Tutorials — Control Flow", url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html", type: "official-doc", qualityScore: 5 },
      ],
      cpp: [
        { title: "C++ Conditionals — LearnCpp", url: "https://www.learncpp.com/cpp-tutorial/if-statements-and-initialization/", type: "tutorial", qualityScore: 5 },
      ],
      c: [
        { title: "Control Structures in C — Learn-C.org", url: "https://www.learn-c.org/en/If...Else", type: "tutorial", qualityScore: 4 },
      ],
      go: [
        { title: "A Tour of Go — Control Structures", url: "https://go.dev/tour/flowcontrol/1", type: "official-doc", qualityScore: 5 },
      ],
      rust: [
        { title: "The Rust Book — Control Flow", url: "https://doc.rust-lang.org/book/ch03-05-control-flow.html", type: "official-doc", qualityScore: 5 },
      ],
      csharp: [
        { title: "C# Selection Statements — Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/selection-statements", type: "official-doc", qualityScore: 5 },
      ],
    },
    default: [],
  },

  "functions": {
    stack: {
      python: [
        { title: "Python Functions — Official Docs", url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions", type: "official-doc", qualityScore: 5 },
        { title: "Real Python — Defining Functions", url: "https://realpython.com/defining-your-own-python-function/", type: "tutorial", qualityScore: 4 },
      ],
      javascript: [
        { title: "Functions — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions", type: "official-doc", qualityScore: 5 },
        { title: "JavaScript.info — Functions", url: "https://javascript.info/function-basics", type: "tutorial", qualityScore: 5 },
      ],
      typescript: [
        { title: "TypeScript Functions — Handbook", url: "https://www.typescriptlang.org/docs/handbook/2/functions.html", type: "official-doc", qualityScore: 5 },
      ],
      java: [
        { title: "Oracle Java Tutorials — Defining Methods", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html", type: "official-doc", qualityScore: 5 },
      ],
      cpp: [
        { title: "C++ Functions — LearnCpp", url: "https://www.learncpp.com/cpp-tutorial/introduction-to-functions/", type: "tutorial", qualityScore: 5 },
      ],
      c: [
        { title: "Functions in C — Learn-C.org", url: "https://www.learn-c.org/en/Functions", type: "tutorial", qualityScore: 5 },
      ],
      go: [
        { title: "A Tour of Go — Functions", url: "https://go.dev/tour/basics/4", type: "official-doc", qualityScore: 5 },
      ],
      rust: [
        { title: "The Rust Book — Functions", url: "https://doc.rust-lang.org/book/ch03-03-how-functions-work.html", type: "official-doc", qualityScore: 5 },
      ],
      csharp: [
        { title: "C# Methods — Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/methods", type: "official-doc", qualityScore: 5 },
      ],
    },
    default: [],
  },

  "oop": {
    stack: {
      python: [
        { title: "Python Classes — Official Docs", url: "https://docs.python.org/3/tutorial/classes.html", type: "official-doc", qualityScore: 5 },
        { title: "Real Python — OOP in Python 3", url: "https://realpython.com/python3-object-oriented-programming/", type: "tutorial", qualityScore: 4 },
      ],
      javascript: [
        { title: "JavaScript Classes — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes", type: "official-doc", qualityScore: 5 },
      ],
      java: [
        { title: "Oracle Java Tutorials — Classes & Objects", url: "https://docs.oracle.com/javase/tutorial/java/concepts/", type: "official-doc", qualityScore: 5 },
        { title: "Java OOP Concepts — Baeldung", url: "https://www.baeldung.com/java-oop", type: "tutorial", qualityScore: 4 },
      ],
      cpp: [
        { title: "C++ Classes — LearnCpp", url: "https://www.learncpp.com/cpp-tutorial/classes-and-class-members/", type: "tutorial", qualityScore: 5 },
      ],
      csharp: [
        { title: "C# Classes — Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/classes", type: "official-doc", qualityScore: 5 },
      ],
      kotlin: [
        { title: "Kotlin Classes & Objects — Official Docs", url: "https://kotlinlang.org/docs/classes.html", type: "official-doc", qualityScore: 5 },
      ],
    },
    default: [],
  },

  "inheritance": {
    stack: {
      python: [
        { title: "Python Inheritance — Official Docs", url: "https://docs.python.org/3/tutorial/classes.html#inheritance", type: "official-doc", qualityScore: 5 },
        { title: "Real Python — Inheritance & Composition", url: "https://realpython.com/inheritance-composition-python/", type: "tutorial", qualityScore: 4 },
      ],
      java: [
        { title: "Oracle Java Tutorials — Inheritance", url: "https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html", type: "official-doc", qualityScore: 5 },
      ],
      javascript: [
        { title: "Inheritance & Prototype Chain — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain", type: "official-doc", qualityScore: 5 },
      ],
      cpp: [
        { title: "C++ Inheritance — LearnCpp", url: "https://www.learncpp.com/cpp-tutorial/introduction-to-inheritance/", type: "tutorial", qualityScore: 5 },
      ],
      csharp: [
        { title: "C# Inheritance — Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/inheritance", type: "official-doc", qualityScore: 5 },
      ],
    },
    default: [],
  },

  "arrays-strings": {
    stack: {
      python: [
        { title: "Python Lists — Official Docs", url: "https://docs.python.org/3/tutorial/introduction.html#lists", type: "official-doc", qualityScore: 5 },
        { title: "Python Strings — W3Schools", url: "https://www.w3schools.com/python/python_strings.asp", type: "tutorial", qualityScore: 3 },
      ],
      javascript: [
        { title: "JavaScript Arrays — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array", type: "official-doc", qualityScore: 5 },
        { title: "JavaScript Strings — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String", type: "official-doc", qualityScore: 5 },
      ],
      java: [
        { title: "Oracle Java Tutorials — Arrays", url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html", type: "official-doc", qualityScore: 5 },
      ],
      cpp: [
        { title: "C++ Arrays — LearnCpp", url: "https://www.learncpp.com/cpp-tutorial/introduction-to-arrays/", type: "tutorial", qualityScore: 5 },
        { title: "std::string — cppreference", url: "https://en.cppreference.com/w/cpp/string", type: "official-doc", qualityScore: 5 },
      ],
      c: [
        { title: "C Arrays — Learn-C.org", url: "https://www.learn-c.org/en/Arrays", type: "tutorial", qualityScore: 4 },
      ],
      go: [
        { title: "Go Slices — Go by Example", url: "https://gobyexample.com/slices", type: "tutorial", qualityScore: 4 },
      ],
    },
    default: [],
  },

  "error-handling": {
    stack: {
      python: [
        { title: "Python Errors & Exceptions — Official Docs", url: "https://docs.python.org/3/tutorial/errors.html", type: "official-doc", qualityScore: 5 },
        { title: "Real Python — Python Exceptions", url: "https://realpython.com/courses/python-exceptions/", type: "tutorial", qualityScore: 4 },
      ],
      javascript: [
        { title: "try…catch — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch", type: "official-doc", qualityScore: 5 },
      ],
      java: [
        { title: "Oracle Java Tutorials — Exceptions", url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html", type: "official-doc", qualityScore: 5 },
      ],
      cpp: [
        { title: "C++ Exceptions — LearnCpp", url: "https://www.learncpp.com/cpp-tutorial/basic-exception-handling/", type: "tutorial", qualityScore: 5 },
      ],
      go: [
        { title: "Go Error Handling — Go by Example", url: "https://gobyexample.com/errors", type: "tutorial", qualityScore: 4 },
      ],
      csharp: [
        { title: "C# Exceptions — Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/standard/exceptions/", type: "official-doc", qualityScore: 5 },
      ],
    },
    default: [],
  },

  "testing": {
    stack: {
      python: [
        { title: "pytest — Official Documentation", url: "https://docs.pytest.org/en/stable/", type: "official-doc", qualityScore: 5 },
        { title: "unittest — Python Docs", url: "https://docs.python.org/3/library/unittest.html", type: "official-doc", qualityScore: 5 },
      ],
      javascript: [
        { title: "Jest — Getting Started", url: "https://jestjs.io/docs/getting-started", type: "official-doc", qualityScore: 5 },
        { title: "Vitest — Getting Started", url: "https://vitest.dev/guide/", type: "official-doc", qualityScore: 5 },
      ],
      java: [
        { title: "JUnit 5 User Guide", url: "https://junit.org/junit5/docs/current/user-guide/", type: "official-doc", qualityScore: 5 },
      ],
      go: [
        { title: "Go Testing — Go by Example", url: "https://gobyexample.com/testing", type: "tutorial", qualityScore: 4 },
      ],
    },
    default: [
      { title: "Software Testing — GeeksforGeeks", url: "https://www.geeksforgeeks.org/software-testing-basics/", type: "tutorial", qualityScore: 3 },
    ],
    // Security roadmaps test differently: the OWASP guide, not generic QA.
    security: [
      { title: "OWASP — Web Security Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/", type: "official-doc", qualityScore: 5 },
    ],
  },

  "git-version-control": {
    default: [
      { title: "Git — Official Documentation", url: "https://git-scm.com/doc", type: "official-doc", qualityScore: 5 },
      { title: "Learn Git Branching (interactive)", url: "https://learngitbranching.js.org/", type: "interactive", qualityScore: 5 },
      { title: "Pro Git Book (free)", url: "https://git-scm.com/book/en/v2", type: "book", qualityScore: 5 },
    ],
  },

  // ── Data structures & algorithms (language-agnostic) ────────────────────
  "data-structures-algorithms": {
    default: [
      { title: "Data Structures — GeeksforGeeks", url: "https://www.geeksforgeeks.org/data-structures/", type: "reference", qualityScore: 4 },
      { title: "VisuAlgo — Visualising Data Structures", url: "https://visualgo.net/en", type: "interactive", qualityScore: 4 },
    ],
  },
  "linear-data-structures": {
    default: [
      { title: "Arrays & Linked Lists — GeeksforGeeks", url: "https://www.geeksforgeeks.org/overview-of-data-structures-set-1-linear-data-structures/", type: "reference", qualityScore: 4 },
    ],
  },
  "stacks-queues": {
    default: [
      { title: "Stack Data Structure — GeeksforGeeks", url: "https://www.geeksforgeeks.org/stack-data-structure/", type: "reference", qualityScore: 4 },
      { title: "Queue Data Structure — GeeksforGeeks", url: "https://www.geeksforgeeks.org/queue-data-structure/", type: "reference", qualityScore: 4 },
    ],
  },
  "trees-graphs": {
    default: [
      { title: "Binary Tree — GeeksforGeeks", url: "https://www.geeksforgeeks.org/binary-tree-data-structure/", type: "reference", qualityScore: 4 },
      { title: "Graph & Traversals — VisuAlgo", url: "https://visualgo.net/en/dfsbfs", type: "interactive", qualityScore: 4 },
    ],
  },
  "sorting-searching": {
    default: [
      { title: "Sorting Algorithms — GeeksforGeeks", url: "https://www.geeksforgeeks.org/sorting-algorithms/", type: "reference", qualityScore: 4 },
      { title: "Sorting (visualized) — Toptal", url: "https://www.toptal.com/developers/sorting-algorithms", type: "interactive", qualityScore: 4 },
    ],
  },
  "algorithm-complexity": {
    default: [
      { title: "Big-O Cheat Sheet", url: "https://www.bigocheatsheet.com/", type: "reference", qualityScore: 4 },
      { title: "Time Complexity — GeeksforGeeks", url: "https://www.geeksforgeeks.org/time-complexities-of-all-sorting-algorithms/", type: "reference", qualityScore: 3 },
    ],
  },
  "dynamic-programming": {
    default: [
      { title: "Dynamic Programming — GeeksforGeeks", url: "https://www.geeksforgeeks.org/dynamic-programming/", type: "reference", qualityScore: 4 },
    ],
  },

  // ── Databases & SQL ──────────────────────────────────────────────────────
  "sql-fundamentals": {
    default: [
      { title: "SQLBolt — Learn SQL (interactive)", url: "https://sqlbolt.com/", type: "interactive", qualityScore: 5 },
      { title: "SQL Tutorial — W3Schools", url: "https://www.w3schools.com/sql/", type: "tutorial", qualityScore: 3 },
    ],
  },
  // Stack-specific: the old default pointed at the W3Schools SQL site root — a
  // landing page, not a design lesson. Each variant is a DIRECT, verified page.
  "database-design": {
    stack: {
      mongodb: [
        { title: "MongoDB Manual — Data Modeling Introduction", url: "https://www.mongodb.com/docs/manual/core/data-modeling-introduction/", type: "official-doc", qualityScore: 5 },
      ],
      postgresql: [
        { title: "PostgreSQL — Data Definition", url: "https://www.postgresql.org/docs/current/ddl.html", type: "official-doc", qualityScore: 5 },
      ],
      mysql: [
        { title: "MySQL — Data Definition Statements", url: "https://dev.mysql.com/doc/refman/8.4/en/sql-data-definition-statements.html", type: "official-doc", qualityScore: 5 },
      ],
      azure: [
        { title: "Azure Architecture Center — Relational Data Guide", url: "https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/", type: "official-doc", qualityScore: 4 },
      ],
    },
    default: [
      { title: "Relational Database Course — freeCodeCamp", url: "https://www.freecodecamp.org/learn/relational-database/", type: "course", qualityScore: 4 },
    ],
  },
  "relational-concepts": {
    default: [
      { title: "Relational Databases — PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-sample-database/", type: "tutorial", qualityScore: 3 },
    ],
  },
  "nosql": {
    default: [
      { title: "What Is NoSQL? NoSQL Databases Explained — MongoDB", url: "https://www.mongodb.com/resources/basics/databases/nosql-explained", type: "official-doc", qualityScore: 4 },
    ],
  },
  "acid-transactions": {
    default: [
      { title: "ACID Properties — GeeksforGeeks", url: "https://www.geeksforgeeks.org/acid-properties-in-dbms/", type: "reference", qualityScore: 3 },
    ],
  },
  "normalization": {
    default: [
      { title: "Normalization (1NF–3NF) — GeeksforGeeks", url: "https://www.geeksforgeeks.org/normal-forms-in-dbms/", type: "reference", qualityScore: 4 },
    ],
  },

  // ── Backend / APIs ────────────────────────────────────────────────────────
  "api-design": {
    default: [
      { title: "RESTful API Design — Microsoft", url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design", type: "official-doc", qualityScore: 4 },
      { title: "OpenAPI/Swagger Docs", url: "https://swagger.io/docs/", type: "official-doc", qualityScore: 5 },
    ],
  },
  "rest-apis": {
    default: [
      { title: "REST API Tutorial — RESTfulAPI.net", url: "https://restfulapi.net/", type: "reference", qualityScore: 4 },
    ],
  },
  "microservices": {
    default: [
      { title: "Microservices — Martin Fowler", url: "https://martinfowler.com/articles/microservices.html", type: "reference", qualityScore: 5 },
    ],
  },
  "authentication-authorization": {
    default: [
      { title: "OAuth 2.0 — Official Site", url: "https://oauth.net/2/", type: "official-doc", qualityScore: 5 },
      { title: "JWT Handbook", url: "https://jwt.io/introduction", type: "reference", qualityScore: 4 },
    ],
  },

  // ── DevOps & cloud ────────────────────────────────────────────────────────
  "docker-containers": {
    default: [
      { title: "Docker — Get Started (official)", url: "https://docs.docker.com/get-started/", type: "official-doc", qualityScore: 5 },
      { title: "Docker Curriculum (free)", url: "https://docker-curriculum.com/", type: "tutorial", qualityScore: 4 },
    ],
  },
  "cicd-pipelines": {
    default: [
      { title: "GitHub Actions — Official Docs", url: "https://docs.github.com/en/actions", type: "official-doc", qualityScore: 5 },
      { title: "Jenkins — User Documentation", url: "https://www.jenkins.io/doc/", type: "official-doc", qualityScore: 5 },
    ],
  },
  "monitoring-observability": {
    default: [
      { title: "Prometheus — Getting Started", url: "https://prometheus.io/docs/prometheus/latest/getting_started/", type: "official-doc", qualityScore: 5 },
      { title: "Grafana — Documentation", url: "https://grafana.com/docs/grafana/latest/", type: "official-doc", qualityScore: 5 },
    ],
  },
  "cloud-concepts": {
    stack: {
      aws: [
        { title: "AWS — What is Cloud Computing", url: "https://aws.amazon.com/what-is-cloud-computing/", type: "official-doc", qualityScore: 4 },
        { title: "AWS Skill Builder — Cloud Essentials", url: "https://skillbuilder.aws/", type: "course", qualityScore: 5 },
      ],
      azure: [
        { title: "Azure Fundamentals — Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/", type: "course", qualityScore: 5 },
      ],
      gcp: [
        { title: "Google Cloud Skills Boost", url: "https://www.cloudskillsboost.google/", type: "course", qualityScore: 5 },
      ],
    },
    default: [
      { title: "Cloud Computing — NIST Definition", url: "https://csrc.nist.gov/publications/detail/sp/800-145/final", type: "official-doc", qualityScore: 4 },
    ],
  },

  // ── System design ────────────────────────────────────────────────────────
  "system-design": {
    default: [
      { title: "System Design Primer — GitHub (donnemartin)", url: "https://github.com/donnemartin/system-design-primer", type: "reference", qualityScore: 5 },
    ],
  },
  "distributed-systems": {
    default: [
      { title: "Distributed Systems — MIT 6.824 Notes", url: "https://pdos.csail.mit.edu/6.824/", type: "reference", qualityScore: 4 },
    ],
  },
  "operating-systems": {
    default: [
      { title: "Operating Systems — GeeksforGeeks", url: "https://www.geeksforgeeks.org/operating-systems/", type: "reference", qualityScore: 4 },
      { title: "OSTEP — Operating Systems: Three Easy Pieces (free book)", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/", type: "book", qualityScore: 5 },
    ],
  },
  "networking": {
    default: [
      { title: "Computer Networking — GeeksforGeeks", url: "https://www.geeksforgeeks.org/basics-computer-networking/", type: "reference", qualityScore: 4 },
      { title: "Beej's Guide to Network Programming", url: "https://beej.us/guide/bgnet/", type: "book", qualityScore: 4 },
    ],
  },

  // ── Professional / career ────────────────────────────────────────────────
  "career-development": {
    default: [
      { title: "Tech Interview Handbook", url: "https://techinterviewhandbook.org/", type: "reference", qualityScore: 4 },
    ],
  },
  // ── Cloud provider fundamentals (per-provider DIRECT pages) ────────────────
  "aws-core-services": {
    stack: {
      aws: [
        { title: "Amazon EC2 User Guide", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html", type: "official-doc", qualityScore: 5 },
        { title: "Amazon S3 User Guide", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html", type: "official-doc", qualityScore: 5 },
        { title: "Amazon RDS User Guide", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "vpc-networking": {
    stack: {
      aws: [
        { title: "Amazon VPC — How It Works", url: "https://docs.aws.amazon.com/vpc/latest/userguide/how-it-works.html", type: "official-doc", qualityScore: 5 },
      ],
      azure: [
        { title: "Azure Virtual Network Documentation", url: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview", type: "official-doc", qualityScore: 5 },
      ],
      gcp: [
        { title: "VPC Networks Overview — Google Cloud", url: "https://cloud.google.com/vpc/docs/vpc", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "iam-security": {
    stack: {
      aws: [
        { title: "AWS IAM User Guide — Policies and Permissions", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html", type: "official-doc", qualityScore: 5 },
      ],
      azure: [
        { title: "Microsoft Entra ID Documentation", url: "https://learn.microsoft.com/en-us/entra/identity/", type: "official-doc", qualityScore: 5 },
        { title: "Azure Role-Based Access Control (RBAC)", url: "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview", type: "official-doc", qualityScore: 5 },
      ],
      gcp: [
        { title: "Cloud Identity and Access Management (IAM)", url: "https://cloud.google.com/iam/docs/overview", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "cost-optimization": {
    stack: {
      aws: [
        { title: "AWS Well-Architected — Cost Optimization Pillar", url: "https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html", type: "official-doc", qualityScore: 5 },
      ],
      azure: [
        { title: "Azure Well-Architected — Cost Optimization", url: "https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/", type: "official-doc", qualityScore: 5 },
      ],
      gcp: [
        { title: "Google Cloud — Cost Optimization", url: "https://cloud.google.com/architecture/framework/cost-optimization", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "containers-eks": {
    stack: {
      aws: [
        { title: "Amazon EKS User Guide", url: "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html", type: "official-doc", qualityScore: 5 },
      ],
      azure: [
        { title: "Azure Kubernetes Service (AKS) Documentation", url: "https://learn.microsoft.com/en-us/azure/aks/", type: "official-doc", qualityScore: 5 },
      ],
      gcp: [
        { title: "Google Kubernetes Engine Documentation", url: "https://cloud.google.com/kubernetes-engine/docs", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "serverless-functions": {
    stack: {
      aws: [
        { title: "AWS Lambda Developer Guide", url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html", type: "official-doc", qualityScore: 5 },
      ],
      azure: [
        { title: "Azure Functions Documentation", url: "https://learn.microsoft.com/en-us/azure/azure-functions/", type: "official-doc", qualityScore: 5 },
      ],
      gcp: [
        { title: "Cloud Run Documentation", url: "https://cloud.google.com/run/docs", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "cloud-monitoring": {
    stack: {
      aws: [
        { title: "Amazon CloudWatch User Guide", url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html", type: "official-doc", qualityScore: 5 },
      ],
      azure: [
        { title: "Azure Monitor Documentation", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/", type: "official-doc", qualityScore: 5 },
      ],
      gcp: [
        { title: "Cloud Monitoring Documentation", url: "https://cloud.google.com/monitoring/docs", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "azure-identity": {
    stack: {
      azure: [
        { title: "Microsoft Entra ID Documentation", url: "https://learn.microsoft.com/en-us/entra/identity/", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "azure-core-services": {
    stack: {
      azure: [
        { title: "Azure Virtual Machines Documentation", url: "https://learn.microsoft.com/en-us/azure/virtual-machines/", type: "official-doc", qualityScore: 5 },
        { title: "Azure Blob Storage Documentation", url: "https://learn.microsoft.com/en-us/azure/storage/blobs/", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "gcp-core-services": {
    stack: {
      gcp: [
        { title: "Compute Engine Documentation", url: "https://cloud.google.com/compute/docs", type: "official-doc", qualityScore: 5 },
        { title: "Cloud Storage Documentation", url: "https://cloud.google.com/storage/docs", type: "official-doc", qualityScore: 5 },
      ],
    },
  },

  // ── Deep-learning frameworks ────────────────────────────────────────────────
  "pytorch-tensors": {
    stack: {
      pytorch: [
        { title: "PyTorch — Tensors Tutorial", url: "https://pytorch.org/tutorials/beginner/basics/tensorqs_tutorial.html", type: "official-doc", qualityScore: 5 },
        { title: "PyTorch — Autograd Mechanics", url: "https://pytorch.org/docs/stable/notes/autograd.html", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "pytorch-modules": {
    stack: {
      pytorch: [
        { title: "PyTorch — Build the Neural Network (nn.Module)", url: "https://pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "training-loops": {
    stack: {
      pytorch: [
        { title: "PyTorch — Optimization Loop", url: "https://pytorch.org/tutorials/beginner/basics/optimization_tutorial.html", type: "official-doc", qualityScore: 5 },
      ],
      tensorflow: [
        { title: "TensorFlow — Training Loops Guide", url: "https://www.tensorflow.org/guide/keras/writing_a_training_loop_from_scratch", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "vision-models": {
    stack: {
      pytorch: [
        { title: "PyTorch — TorchVision Transforms", url: "https://pytorch.org/vision/stable/transforms.html", type: "official-doc", qualityScore: 5 },
      ],
      tensorflow: [
        { title: "TensorFlow — Convolutional Neural Network Tutorial", url: "https://www.tensorflow.org/tutorials/images/cnn", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "transformers-nlp": {
    stack: {
      huggingface: [
        { title: "Hugging Face — Transformers Quick Tour", url: "https://huggingface.co/docs/transformers/quicktour", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "tensorflow-core": {
    stack: {
      tensorflow: [
        { title: "TensorFlow — Tensors Guide", url: "https://www.tensorflow.org/guide/tensor", type: "official-doc", qualityScore: 5 },
        { title: "TensorFlow — Keras Sequential API", url: "https://www.tensorflow.org/guide/keras/sequential_model", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "model-serving": {
    stack: {
      tensorflow: [
        { title: "TensorFlow Lite — Overview", url: "https://www.tensorflow.org/lite/guide", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "browser-ml": {
    stack: {
      tensorflow: [
        { title: "TensorFlow.js — Tutorials", url: "https://www.tensorflow.org/js/tutorials", type: "official-doc", qualityScore: 5 },
      ],
    },
  },

  // ── ML practice-level concepts ──────────────────────────────────────────────
  "supervised-learning": {
    default: [
      { title: "scikit-learn — Supervised Learning Guide", url: "https://scikit-learn.org/stable/supervised_learning.html", type: "official-doc", qualityScore: 5 },
    ],
  },
  "model-evaluation": {
    default: [
      { title: "scikit-learn — Model Evaluation & Metrics", url: "https://scikit-learn.org/stable/modules/model_evaluation.html", type: "official-doc", qualityScore: 5 },
    ],
  },
  "feature-engineering": {
    default: [
      { title: "scikit-learn — Preprocessing Data", url: "https://scikit-learn.org/stable/modules/preprocessing.html", type: "official-doc", qualityScore: 5 },
    ],
  },

  // ── Database operations ─────────────────────────────────────────────────────
  "crud-operations": {
    stack: {
      mongodb: [
        { title: "MongoDB Manual — CRUD Operations", url: "https://www.mongodb.com/docs/manual/crud/", type: "official-doc", qualityScore: 5 },
      ],
      postgresql: [
        { title: "PostgreSQL Tutorial — Data Manipulation (DML)", url: "https://www.postgresql.org/docs/current/dml.html", type: "official-doc", qualityScore: 5 },
      ],
      mysql: [
        { title: "MySQL Reference — Data Manipulation Statements", url: "https://dev.mysql.com/doc/refman/8.4/en/sql-data-manipulation-statements.html", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "aggregation-pipeline": {
    stack: {
      mongodb: [
        { title: "MongoDB Manual — Aggregation Pipeline", url: "https://www.mongodb.com/docs/manual/core/aggregation-pipeline/", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "connection-pooling": {
    stack: {
      postgresql: [
        { title: "PostgreSQL — Connection Configuration (pooling)", url: "https://www.postgresql.org/docs/current/runtime-config-connection.html", type: "official-doc", qualityScore: 5 },
      ],
    },
  },
  "schema-migrations": {
    stack: {
      postgresql: [
        { title: "PostgreSQL — Data Definition (DDL)", url: "https://www.postgresql.org/docs/current/ddl.html", type: "official-doc", qualityScore: 5 },
      ],
      mysql: [
        { title: "MySQL Reference — Data Definition Statements", url: "https://dev.mysql.com/doc/refman/8.4/en/sql-data-definition-statements.html", type: "official-doc", qualityScore: 5 },
      ],
    },
  },

  // ── Career-readiness nodes on topical roadmaps ─────────────────────────────­
  "portfolio-proof-of-work": {
    default: [
      { title: "GitHub Docs — About READMEs", url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes", type: "official-doc", qualityScore: 4 },
    ],
  },
  "resume-linkedin": {
    default: [
      { title: "LinkedIn Help — Profile Best Practices", url: "https://www.linkedin.com/help/linkedin/answer/a507508", type: "reference", qualityScore: 3 },
    ],
  },
};

// ── Verified batch merges ────────────────────────────────────────────────────
// Long-tail entries researched label-by-label and confirmed live + direct by
// probe-url-set.mjs (which records the LIVE page title, never a guess).
//
// Merge rules, deliberately conservative:
//   · a key the curated library does not have is added (neutral `default`);
//   · a curated key that has stack variants but NO neutral default gains one,
//     which is what lets a language-agnostic career roadmap
//     ("Variables & Data Types" on software-engineer) resolve at all;
//   · an existing default is NEVER overwritten — a batch may not silently
//     replace a curated page.
const BATCH_DIR = new URL(".", import.meta.url);
let batchAdded = 0;
let batchSkipped = 0;
for (const file of readdirSync(BATCH_DIR).filter((f) => /^concept-batch.*\.library\.json$/.test(f)).sort()) {
  let batch;
  try {
    batch = JSON.parse(readFileSync(new URL(file, BATCH_DIR), "utf8"));
  } catch {
    continue;
  }
  for (const [key, entry] of Object.entries(batch)) {
    const incoming = entry?.default;
    if (!Array.isArray(incoming) || incoming.length === 0) continue;
    const stacks = Array.isArray(entry.stacks) ? entry.stacks : null;
    const existing = LIB[key];

    // A stack-scoped batch entry ("Sets" is Ruby's Set class, not Redis's)
    // merges into the stack variants only, so it can never answer a node on a
    // different technology's roadmap.
    if (stacks) {
      if (!existing) {
        LIB[key] = { stack: {} };
        batchAdded++;
      }
      if (!LIB[key].stack) LIB[key].stack = {};
      for (const s of stacks) {
        if (!LIB[key].stack[s]) {
          LIB[key].stack[s] = incoming;
          batchAdded++;
        } else {
          batchSkipped++;
        }
      }
      continue;
    }

    if (!existing) {
      LIB[key] = { default: incoming };
      batchAdded++;
    } else if (!existing.default || existing.default.length === 0) {
      existing.default = incoming;
      batchAdded++;
    } else {
      batchSkipped++;
    }
  }
}

// ── Selection helpers ────────────────────────────────────────────────────────
const norm = (s) =>
  String(s ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const CONCEPT_ALIASES = {
  "variables-data-types": ["variables-and-data-types", "variables", "data-types", "primitive-types", "type-systems"],
  "control-flow": ["control-flow-logic", "conditionals-loops", "loops-conditionals", "flow-control", "control-structures"],
  "functions": ["functions-scope", "function-basics", "methods", "defining-functions", "functions-parameters"],
  "oop": ["object-oriented-programming", "classes-objects", "oop-basics", "oop-concepts", "classes"],
  "inheritance": ["inheritance-polymorphism", "polymorphism", "oop-inheritance"],
  "arrays-strings": ["arrays", "strings", "arrays-lists", "lists-strings", "collections-arrays"],
  "error-handling": ["exceptions", "exception-handling", "error-handling-debugging", "debugging-errors"],
  "testing": ["testing-strategies", "unit-testing", "test-automation", "software-testing", "test-frameworks"],
  "git-version-control": ["version-control-git", "git", "version-control", "git-github"],
  "data-structures-algorithms": ["dsa", "algorithms", "data-structures"],
  "linear-data-structures": ["arrays-linked-lists", "linear-structures"],
  "stacks-queues": ["stack-queue", "stacks", "queues"],
  "trees-graphs": ["trees", "graphs", "graph-trees", "binary-trees"],
  "sorting-searching": ["sorting", "searching", "sort-search"],
  "algorithm-complexity": ["big-o", "complexity-analysis", "time-complexity"],
  "sql-fundamentals": ["sql", "sql-basics", "sql-queries", "querying-data"],
  "database-design": ["db-design", "schema-design", "database-management"],
  "relational-concepts": ["relational-database-concepts", "relational-databases", "rdbms-concepts", "relational-model"],
  "nosql": ["nosql-overview", "nosql-databases"],
  "api-design": ["api-development", "rest-api-design", "api-architecture"],
  "rest-apis": ["rest", "restful-apis"],
  "microservices": ["microservices-architecture", "service-architecture"],
  "authentication-authorization": ["auth", "authentication", "authorization", "oauth-jwt"],
  "docker-containers": ["containerization", "docker", "containers", "docker-fundamentals"],
  "cicd-pipelines": ["ci-cd", "cicd", "ci-cd-pipelines", "continuous-integration", "pipelines", "ci-cd-pipeline"],
  "monitoring-observability": ["monitoring-logging", "observability", "metrics-logging", "monitoring"],
  "cloud-concepts": ["cloud-deployment", "cloud-platforms", "cloud-computing"],
  "system-design": ["system-design-fundamentals", "designing-large-systems"],
  "distributed-systems": ["distributed-computing"],
  "operating-systems": ["os-fundamentals", "os-concepts"],
  "networking": ["networking-fundamentals", "networking-deep-dive", "computer-networks", "network-protocols"],
  // ── Cloud provider fundamentals ──────────────────────────────────────────
  "aws-core-services": ["aws-core-services-ec2-s3-rds", "core-services-ec2-s3-rds", "aws-services", "aws", "amazon-web-services"],
  "vpc-networking": ["vpc-networking", "virtual-networks", "vpc", "cloud-networking-fundamentals", "networking-vpc"],
  "iam-security": ["iam-security", "iam", "identity-access-management", "cloud-iam"],
  "cost-optimization": ["cost-optimization", "cloud-cost-management", "cost-management"],
  "containers-eks": ["ecs-eks-container-services", "aks-container-services", "gke-kubernetes", "container-services", "managed-kubernetes"],
  "serverless-functions": ["lambda-serverless", "azure-functions", "cloud-functions-cloud-run", "serverless", "functions-as-a-service"],
  "cloud-monitoring": ["cloudwatch-monitoring", "cloud-monitoring-logging", "monitoring-observability"],
  "azure-identity": ["entra-id-security", "entra-id", "azure-ad", "active-directory", "microsoft-entra-id", "entra-id-and-security"],
  "azure-core-services": ["azure-core-services-vms-blob-storage-sql", "azure-core-services", "azure-compute-storage", "azure", "microsoft-azure"],
  "gcp-core-services": ["gcp-core-services-compute-engine-cloud-storage", "gcp-core-services", "google-cloud-services", "gcp", "google-cloud", "google-cloud-platform"],
  // ── Deep-learning frameworks ─────────────────────────────────────────────
  "pytorch-tensors": ["tensors-autograd", "pytorch-tensors-autograd", "tensors-gradients"],
  "pytorch-modules": ["nn-module-custom-layers", "nn-module", "custom-layers", "neural-network-modules"],
  "training-loops": ["training-loops-optimizers", "training-optimization-pipeline", "training-loop", "optimizers", "model-training-pipeline"],
  "vision-models": ["computer-vision-torchvision", "computer-vision", "cnn-architectures", "image-classification"],
  "transformers-nlp": ["nlp-hugging-face", "nlp-huggingface", "transformers", "nlp-pipelines"],
  "tensorflow-core": ["tensors-eager-execution", "keras-high-level-api", "keras", "tensorflow-basics"],
  "model-serving": ["tensorflow-lite-serving", "tensorflow-lite", "model-deployment-serving", "tflite"],
  "browser-ml": ["tensorflow-js-browser-ml", "tensorflow-js", "tfjs", "browser-ml"],
  // ── ML concepts ──────────────────────────────────────────────────────────
  "supervised-learning": ["classification-algorithms", "regression-clustering", "supervised-algorithms", "classification-regression"],
  "model-evaluation": ["model-evaluation-selection", "scikit-learn-best-practices", "model-selection", "evaluation-metrics"],
  "feature-engineering": ["feature-engineering-pipelines", "feature-engineering-pipeline", "feature-pipelines"],
  // ── Database operations ──────────────────────────────────────────────────
  "crud-operations": ["crud-operations", "crud", "document-crud"],
  "aggregation-pipeline": ["aggregation-pipeline", "aggregations", "mongo-aggregation"],
  "connection-pooling": ["connection-pooling", "connection-pools", "pooling"],
  "schema-migrations": ["migrations", "schema-migrations", "database-migrations"],
  // ── Career-readiness nodes ───────────────────────────────────────────────
  "portfolio-proof-of-work": ["portfolio-walkthrough", "portfolio-proof-of-work", "portfolio-review"],
  "resume-linkedin": ["resume-linkedin", "resume-and-linkedin", "linkedin-profile"],
};

// ── Concept batch 2 ─────────────────────────────────────────────────────────
// Verified additions that close the systematic pockets of uncovered nodes.
// A `stacks` entry is technology-scoped: it is selectable ONLY when the node's
// own context names that stack, so a generic label ("Constraints", "Indexing &
// Performance") can never receive another technology's documentation.
for (const [key, e] of Object.entries(BATCH2)) {
  // `items` ships more than one direct page for a concept whose correct source
  // depends on the branch (HDL design entry → a VHDL and a Verilog tutorial).
  const toPick = (i) => ({ title: i.title, url: i.url, type: i.type, qualityScore: i.qualityScore });
  const picks = (e.items ?? [e]).map(toPick);
  const entry = LIB[key] ?? (LIB[key] = {});
  if (e.stackItems) {
    // Same concept, a DIFFERENT correct page per stack (matrix operations is
    // NumPy for Python and MathWorks for MATLAB).
    entry.stack = entry.stack ?? {};
    for (const [s, items] of Object.entries(e.stackItems)) entry.stack[s] = entry.stack[s] ?? items.map(toPick);
  } else if (Array.isArray(e.stacks) && e.stacks.length) {
    entry.stack = entry.stack ?? {};
    for (const s of e.stacks) entry.stack[s] = entry.stack[s] ?? picks;
  } else if (!entry.default?.length) {
    entry.default = picks;
  }
}
for (const [alias, target] of Object.entries(BATCH2_ALIASES)) {
  if (!target) continue;
  const list = CONCEPT_ALIASES[target] ?? (CONCEPT_ALIASES[target] = []);
  if (!list.includes(alias)) list.push(alias);
}

/** Ordered concept keys for a topic label (specific → loose). */
export function resolveConcepts(label) {
  const key = norm(label);
  if (!key) return [];
  const out = [];
  if (LIB[key]) out.push(key);
  for (const [concept, aliases] of Object.entries(CONCEPT_ALIASES)) {
    if (concept === key) continue;
    if (aliases.includes(key) && LIB[concept]) out.push(concept);
    // token-boundary containment: "design-patterns" matches "design-patterns" already; "react-hooks" not matched to "hooks"
    else if (LIB[concept] && (key.includes(concept) || concept.includes(key))) {
      // require whole-token overlap to avoid nonsense matches
      const kt = key.split("-"), ct = concept.split("-");
      const shared = kt.filter((t) => ct.includes(t));
      if (shared.length >= Math.min(2, ct.length)) out.push(concept);
    }
  }
  return [...new Set(out)];
}

/** Pick curated resources for a topic label given roadmap context text. */
// Some concept keys are ambiguous across disciplines: "testing" means SOFTWARE
// testing here, but materials/automotive/biomedical roadmaps have "Testing"
// sections (Mechanical Testing, Biocompatibility Testing, A/B Testing on UX…).
// A guarded concept only resolves when the roadmap context matches.
const CONCEPT_CONTEXT_GUARDS = new Map([
  ["testing", /\b(software|web|mobile|qa|sdet|frontend|backend|full-stack|python|javascript|typescript|java|node|react|angular|vue|php|ruby|csharp|cpp|golang|go|dart|flutter|kotlin|swift|computing|devops|api|automation)\b/],
  // "Arrays & Strings" is a programming-fundamentals concept, but its alias
  // list includes the token "strings" — which made the Redis skill roadmap's
  // "Strings" topic inherit an array-data-structure page alongside the correct
  // Redis string-type page. Only language/programming contexts may claim it.
  ["arrays-strings", /\b(software|programming|python|javascript|typescript|java|node|cpp|c-sharp|csharp|go|rust|php|ruby|dart|kotlin|swift|data-structures|algorithms|computer-science|full-stack|frontend|backend|api|computing)\b/],
]);

// A context-only guard is not enough: an AEROSPACE roadmap has a section called
// "Software & Simulation", so the surrounding text looked like software and
// "Wind Tunnel Testing" received the software-testing library. When the LABEL
// itself names physical/process/statistical testing, the software-testing
// concept is never applicable regardless of section naming.
const CONCEPT_LABEL_BLOCK = new Map([
  ["testing", /\b(wind tunnel|soil|materials?|tensile|fatigue|biocompat|hydrostatic|non.?destructive|ndt|pressure|crash|emission|corrosion|leak|vibration|impact|thermal|cryogenic|chemical|physical|mechanical|environmental|a\/b|hypothesis|usability|acceptance|field|in situ)\b/i],
]);

export function pickConceptResources(label, contextText) {
  const stack = detectStack(contextText);
  const context = String(contextText || "").toLowerCase();
  const out = [];
  for (const concept of resolveConcepts(label)) {
    const guard = CONCEPT_CONTEXT_GUARDS.get(concept);
    if (guard && !guard.test(context)) continue; // wrong domain — skip
    const block = CONCEPT_LABEL_BLOCK.get(concept);
    if (block && block.test(String(label ?? ""))) continue; // label names another domain — skip
    const entry = LIB[concept];
    if (!entry) continue;
    const variant = entry.security && /\b(secur|pentest|vulnerab|exploit|threat|ethical hack)/.test(context)
      ? entry.security
      // `stack ?? "any"`: a stack-scoped entry may declare an "any" variant for
      // nodes whose context names no stack at all (a generic "Distributed
      // Training" node), without opening a stack-agnostic `default` that would
      // also serve the WRONG stack.
      : (entry.stack?.[stack ?? "any"] ?? entry.stack?.any);
    if (variant) out.push(...variant);
    else if (entry.default?.length) out.push(...entry.default);
    // No stack detected and no stack-agnostic default → skip. A wrong-
    // language resource is worse than no resource (the builder's later
    // tiers / search fallback handle the gap instead).
    if (out.length >= 3) break;
  }
  return out.slice(0, 3);
}

/** Concept keys present in the library (for coverage stats). */
export function libraryKeys() {
  return Object.keys(LIB);
}

// ── Selftest ─────────────────────────────────────────────────────────────────
if (process.argv[1] && process.argv[1].endsWith("concept-resources.mjs")) {
  console.log("Concept library keys:", libraryKeys().length);
  const samples = [
    ["Functions & Scope", "java spring backend"],
    ["Variables & Data Types", "python"],
    ["Control Flow & Logic", "javascript"],
    ["Relational Database Concepts", "sql postgres"],
    ["CI/CD Pipelines", "devops docker"],
    ["Totally Unrelated Topic", "mechanical cad"],
  ];
  for (const [label, ctx] of samples) {
    const picks = pickConceptResources(label, ctx);
    console.log(`\n${label} [${ctx}] →`);
    for (const p of picks) console.log(`  ${p.qualityScore} · ${p.title} · ${p.url}`);
  }
}
