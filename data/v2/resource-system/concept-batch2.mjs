// ─────────────────────────────────────────────────────────────────────────────
// Concept library — batch 2
//
// Each entry closes a class of *uncovered node* found by
// data/audit-node-coverage.mjs: a leaf topic/subtopic whose best available
// resource was still a provider landing page.
//
// Rules followed for every row:
//   * the URL is a DIRECT page that teaches the concept — never a homepage,
//     never a search page;
//   * the key is the node label normalised the way the resolver normalises it
//     (lowercase, non-alphanumerics → "-"), so it resolves without aliases;
//   * GENERIC keys carry `stacks`, so a technology-specific page can only be
//     selected when the node's own context names that technology. "Constraints"
//     in a CAD section must not receive PostgreSQL's constraints chapter, and
//     "Indexing & Performance" must not receive MongoDB's index docs.
//
// Verified by: node data/v2/resource-system/probe-concept-batch2.mjs
// ─────────────────────────────────────────────────────────────────────────────

/** Technology-specific: only selectable when the node context names the stack. */
const DB_RELATIONAL = ["postgresql", "mysql", "sqlite", "sql"];
const WEB_API = ["javascript", "typescript", "node", "react", "angular", "vue", "php", "ruby"];

export const BATCH2 = {
  // ── PostgreSQL ─────────────────────────────────────────────────────────────
  "postgresql": { title: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/current/index.html", type: "official-doc", qualityScore: 5 },
  "postgresql-setup-configuration": { title: "PostgreSQL — Server Configuration", url: "https://www.postgresql.org/docs/current/runtime-config.html", type: "official-doc", qualityScore: 5, stacks: ["postgresql", "sql"] },
  "advanced-sql-window-functions": { title: "PostgreSQL — Window Functions Tutorial", url: "https://www.postgresql.org/docs/current/tutorial-window.html", type: "official-doc", qualityScore: 5, stacks: ["postgresql", "sql"] },
  "indexing-performance-tuning": { title: "PostgreSQL — Indexes", url: "https://www.postgresql.org/docs/current/indexes.html", type: "official-doc", qualityScore: 5, stacks: ["postgresql", "sql"] },
  "jsonb-advanced-features": { title: "PostgreSQL — JSON Types and Functions", url: "https://www.postgresql.org/docs/current/datatype-json.html", type: "official-doc", qualityScore: 5, stacks: ["postgresql", "sql"] },
  "postgresql-administration": { title: "PostgreSQL — Server Administration", url: "https://www.postgresql.org/docs/current/admin.html", type: "official-doc", qualityScore: 5, stacks: ["postgresql", "sql"] },
  "query-optimization": { title: "PostgreSQL — Performance Tips", url: "https://www.postgresql.org/docs/current/performance-tips.html", type: "official-doc", qualityScore: 5, stacks: DB_RELATIONAL },
  "index-design": { title: "PostgreSQL — Indexes", url: "https://www.postgresql.org/docs/current/indexes.html", type: "official-doc", qualityScore: 5, stacks: DB_RELATIONAL },
  "constraints": { title: "PostgreSQL — Constraints", url: "https://www.postgresql.org/docs/current/ddl-constraints.html", type: "official-doc", qualityScore: 5, stacks: DB_RELATIONAL },
  "relationships": { title: "PostgreSQL — Foreign Keys", url: "https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK", type: "official-doc", qualityScore: 5, stacks: DB_RELATIONAL },

  // ── MySQL ──────────────────────────────────────────────────────────────────
  "mysql": { title: "MySQL Reference Manual", url: "https://dev.mysql.com/doc/refman/8.4/en/", type: "official-doc", qualityScore: 5 },
  "mysql-setup-configuration": { title: "MySQL — Installing and Upgrading MySQL", url: "https://dev.mysql.com/doc/refman/8.4/en/installing.html", type: "official-doc", qualityScore: 5, stacks: ["mysql"] },
  "sql-queries-optimization": { title: "MySQL — Optimization and Indexes", url: "https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html", type: "official-doc", qualityScore: 5, stacks: ["mysql"] },
  "indexing-strategies": { title: "MySQL — Optimization and Indexes", url: "https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html", type: "official-doc", qualityScore: 5, stacks: ["mysql"] },
  "replication-clustering": { title: "MySQL — Replication", url: "https://dev.mysql.com/doc/refman/8.4/en/replication.html", type: "official-doc", qualityScore: 5, stacks: ["mysql"] },
  "mysql-administration": { title: "MySQL — MySQL Server Administration", url: "https://dev.mysql.com/doc/refman/8.4/en/server-administration.html", type: "official-doc", qualityScore: 5, stacks: ["mysql"] },

  // ── MongoDB ────────────────────────────────────────────────────────────────
  "mongodb": { title: "MongoDB Manual", url: "https://www.mongodb.com/docs/manual/", type: "official-doc", qualityScore: 5 },
  "document-model-crud": { title: "MongoDB — CRUD Operations", url: "https://www.mongodb.com/docs/manual/crud/", type: "official-doc", qualityScore: 5, stacks: ["mongodb"] },
  "indexing-performance": { title: "MongoDB — Indexes (Indexing & Performance)", url: "https://www.mongodb.com/docs/manual/indexes/", type: "official-doc", qualityScore: 5, stacks: ["mongodb"] },
  "sharding-replication": { title: "MongoDB — Sharding and Replication", url: "https://www.mongodb.com/docs/manual/sharding/", type: "official-doc", qualityScore: 5, stacks: ["mongodb"] },
  "data-types-structures": { title: "MongoDB — BSON Types (Data Types & Structures)", url: "https://www.mongodb.com/docs/manual/reference/bson-types/", type: "official-doc", qualityScore: 5, stacks: ["mongodb"] },

  // ── SQLite ─────────────────────────────────────────────────────────────────
  "sqlite": { title: "SQLite Documentation", url: "https://www.sqlite.org/docs.html", type: "official-doc", qualityScore: 5 },
  "sqlite-fundamentals": { title: "SQLite — SQL Syntax", url: "https://www.sqlite.org/lang.html", type: "official-doc", qualityScore: 5, stacks: ["sqlite", "sql"] },
  "embedded-database-patterns": { title: "SQLite — Appropriate Uses For SQLite", url: "https://www.sqlite.org/whentouse.html", type: "official-doc", qualityScore: 5, stacks: ["sqlite", "sql"] },
  "sqlite-in-applications": { title: "SQLite — Introduction To The SQLite Interface", url: "https://www.sqlite.org/cintro.html", type: "official-doc", qualityScore: 5, stacks: ["sqlite", "sql"] },
  "performance-limitations": { title: "SQLite — Limits In SQLite (Performance & Limitations)", url: "https://www.sqlite.org/limits.html", type: "official-doc", qualityScore: 5, stacks: ["sqlite", "sql"] },

  // ── Data warehousing ───────────────────────────────────────────────────────
  "slowly-changing-dimensions": { title: "dbt — Snapshots (Slowly Changing Dimensions Type 2)", url: "https://docs.getdbt.com/docs/build/snapshots", type: "official-doc", qualityScore: 5, stacks: ["sql", "postgresql", "mysql", "python", "any"] },

  // ── Machine learning & data science ────────────────────────────────────────
  "scikit-learn": { title: "scikit-learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html", type: "official-doc", qualityScore: 5 },
  "backpropagation": { title: "Stanford CS231n — Backpropagation, Intuitions", url: "https://cs231n.github.io/optimization-2/", type: "course", qualityScore: 5 },
  "distributed-training": { title: "PyTorch — Distributed Training Overview", url: "https://pytorch.org/tutorials/beginner/dist_overview.html", type: "official-doc", qualityScore: 5, stacks: ["pytorch", "any"] },
  "time-series-analysis": { title: "Forecasting: Principles and Practice (free book)", url: "https://otexts.com/fpp3/", type: "book", qualityScore: 5 },
  "probability-statistics": { title: "Khan Academy — Statistics and Probability", url: "https://www.khanacademy.org/math/statistics-probability", type: "course", qualityScore: 4 },
  "linear-algebra": { title: "MIT OpenCourseWare — Linear Algebra (18.06)", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", type: "course", qualityScore: 5 },
  // Matrix operations are language-neutral as a topic but the right page is not:
  // a MATLAB roadmap must not receive NumPy (it did, before this was scoped).
  "matrix-operations": {
    stackItems: {
      python: [{ title: "NumPy — Linear Algebra Routines (Matrix Operations)", url: "https://numpy.org/doc/stable/reference/routines.linalg.html", type: "official-doc", qualityScore: 5 }],
      matlab: [{ title: "MATLAB — Linear Algebra", url: "https://www.mathworks.com/help/matlab/linear-algebra.html", type: "official-doc", qualityScore: 5 }],
      any: [{ title: "Khan Academy — Matrices", url: "https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:matrices", type: "course", qualityScore: 4 }],
    },
  },
  "svd": { title: "NumPy — Singular Value Decomposition (numpy.linalg.svd)", url: "https://numpy.org/doc/stable/reference/generated/numpy.linalg.svd.html", type: "official-doc", qualityScore: 5 },
  "natural-language-processing": { title: "Hugging Face — Natural Language Processing Course", url: "https://huggingface.co/learn/nlp-course/chapter1/1", type: "course", qualityScore: 5 },
  "causal-inference": { title: "Causal Inference for the Brave and True — Introduction to Causality", url: "https://matheusfacure.github.io/python-causality-handbook/01-Introduction-To-Causality.html", type: "book", qualityScore: 5 },
  "generative-models": { title: "Lilian Weng — What are Diffusion Models?", url: "https://lilianweng.github.io/posts/2021-07-11-diffusion-models/", type: "article", qualityScore: 5 },
  "embedding-models": { title: "Hugging Face — Getting Started with Embeddings", url: "https://huggingface.co/blog/getting-started-with-embeddings", type: "article", qualityScore: 5 },
  "similarity-search": { title: "Pinecone — Vector Similarity Measures", url: "https://www.pinecone.io/learn/vector-similarity/", type: "article", qualityScore: 4 },
  "hybrid-search": { title: "Pinecone — Hybrid Search", url: "https://www.pinecone.io/learn/hybrid-search-intro/", type: "article", qualityScore: 4 },
  "a-b-test-analysis": { title: "Evan Miller — A/B Testing", url: "https://www.evanmiller.org/ab-testing/", type: "article", qualityScore: 4 },

  // ── Web platform & APIs ────────────────────────────────────────────────────
  "cors": { title: "MDN — Cross-Origin Resource Sharing (CORS)", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS", type: "official-doc", qualityScore: 5 },
  "file-uploads": { title: "MDN — File API (file uploads)", url: "https://developer.mozilla.org/en-US/docs/Web/API/File_API", type: "official-doc", qualityScore: 5, stacks: [...WEB_API, "any"] },
  "data-validation": { title: "MDN — Client-side form validation (data validation)", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation", type: "official-doc", qualityScore: 5, stacks: WEB_API },
  "idempotency": { title: "MDN — Idempotent", url: "https://developer.mozilla.org/en-US/docs/Glossary/Idempotent", type: "official-doc", qualityScore: 5, stacks: WEB_API },
  "loops-for-while-do-while": { title: "MDN — Loops and iteration", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration", type: "official-doc", qualityScore: 5, stacks: ["javascript", "typescript", "node"] },
  "rate-limiting": { title: "Google Cloud — Rate-limiting strategies and techniques", url: "https://cloud.google.com/architecture/rate-limiting-strategies-techniques", type: "article", qualityScore: 5 },
  "openapi-swagger": { title: "OpenAPI Specification — Getting Started (Swagger)", url: "https://swagger.io/docs/specification/v3_0/about/", type: "official-doc", qualityScore: 5 },
  "pagination": { title: "Microsoft Learn — Web API design best practices (pagination)", url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design", type: "official-doc", qualityScore: 4 },
  "performance-profiling": { title: "Chrome DevTools — Performance panel (profiling)", url: "https://developer.chrome.com/docs/devtools/performance/", type: "official-doc", qualityScore: 5, stacks: WEB_API },
  "code-quality": { title: "Refactoring.Guru — Refactoring Techniques", url: "https://refactoring.guru/refactoring/techniques", type: "tutorial", qualityScore: 4 },
  "repository-pattern": { title: "Martin Fowler — Repository", url: "https://martinfowler.com/eaaCatalog/repository.html", type: "article", qualityScore: 5 },
  // GraphQL-only: a Power BI "Subscriptions" node (report subscriptions) must
  // not receive the GraphQL spec, which is exactly what happened unscoped.
  "resolvers": { title: "GraphQL — Execution (Resolvers)", url: "https://graphql.org/learn/execution/", type: "official-doc", qualityScore: 5, stacks: ["graphql"] },
  "subscriptions": { title: "GraphQL — Queries and Subscriptions", url: "https://graphql.org/learn/queries/", type: "official-doc", qualityScore: 4, stacks: ["graphql"] },
  "n-1-problem": { title: "Prisma — Relation Queries (the N+1 problem)", url: "https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries", type: "official-doc", qualityScore: 4 },
  "rollback-strategies": { title: "Kubernetes — Rolling Back a Deployment (rollback strategies)", url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment", type: "official-doc", qualityScore: 5, stacks: ["kubernetes", "docker", "any"] },
  "schema-validation": { title: "JSON Schema — Getting Started Step-By-Step (schema validation)", url: "https://json-schema.org/learn/getting-started-step-by-step", type: "official-doc", qualityScore: 5 },

  // ── Testing ────────────────────────────────────────────────────────────────
  "page-object-model": { title: "Selenium — Page Object Models", url: "https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/", type: "official-doc", qualityScore: 5 },

  // ── Tooling that previously inherited an unrelated parent resource ────────
  // These labels used to inherit whatever their parent topic resolved to
  // (ESLint/Prettier/Husky showed a refactoring guide; experiment tracking and
  // reproducibility showed Git docs), which is exactly the "labelled fallback
  // is not direct coverage" case.
  "eslint": { title: "ESLint — Getting Started", url: "https://eslint.org/docs/latest/use/getting-started", type: "official-doc", qualityScore: 5, stacks: ["javascript", "typescript", "react", "angular", "vue", "node", "any"] },
  "prettier": { title: "Prettier — Documentation", url: "https://prettier.io/docs/en/", type: "official-doc", qualityScore: 5, stacks: ["javascript", "typescript", "react", "angular", "vue", "node", "any"] },
  "husky-lint-staged": { title: "Husky — Git Hooks Documentation", url: "https://typicode.github.io/husky/", type: "official-doc", qualityScore: 5, stacks: ["javascript", "typescript", "node", "any"] },
  "experiment-tracking": { title: "MLflow — Tracking Experiments", url: "https://mlflow.org/docs/latest/tracking.html", type: "official-doc", qualityScore: 5, stacks: ["python", "pytorch", "tensorflow", "any"] },
  "notebook-versioning": { title: "DVC — Versioning Data and Models", url: "https://dvc.org/doc/use-cases/versioning-data-and-models", type: "official-doc", qualityScore: 5, stacks: ["python", "any"] },
  "reproducibility": { title: "PyTorch — Reproducibility", url: "https://pytorch.org/docs/stable/notes/randomness.html", type: "official-doc", qualityScore: 5, stacks: ["python", "pytorch", "tensorflow", "any"] },

  // ── Security ───────────────────────────────────────────────────────────────
  "security-best-practices": { title: "OWASP Top 10 — Web Application Security Risks", url: "https://owasp.org/www-project-top-ten/", type: "official-doc", qualityScore: 5 },
  "secrets-management": { title: "OWASP — Secrets Management Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html", type: "official-doc", qualityScore: 5 },
  "malware-types": { title: "MITRE ATT&CK — Enterprise Techniques (malware types)", url: "https://attack.mitre.org/techniques/enterprise/", type: "official-doc", qualityScore: 5 },

  // ── .NET ───────────────────────────────────────────────────────────────────
  "asp-net-core": { title: "Microsoft Learn — ASP.NET Core Documentation", url: "https://learn.microsoft.com/en-us/aspnet/core/", type: "official-doc", qualityScore: 5 },

  // ── Hardware & game engines ────────────────────────────────────────────────
  // HDL design entry is taught per language, and these roadmaps offer both
  // Xilinx/Vivado and Intel Quartus branches, so ship both a VHDL and a Verilog
  // tutorial rather than one language's docs to every branch.
  "hdl-design-entry": {
    items: [
      { title: "VHDLwhiz — Basic VHDL Tutorials (HDL design entry)", url: "https://vhdlwhiz.com/basic-vhdl-tutorials/", type: "tutorial", qualityScore: 4 },
      { title: "ChipVerify — Verilog Tutorial (HDL design entry)", url: "https://www.chipverify.com/verilog/verilog-tutorial", type: "tutorial", qualityScore: 4 },
    ],
  },
  "unity": { title: "Unity Learn — Unity Essentials Pathway", url: "https://learn.unity.com/pathway/unity-essentials", type: "course", qualityScore: 5 },
  "unreal-engine": { title: "Unreal Engine Documentation", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/", type: "official-doc", qualityScore: 5 },
  "material-editor": { title: "Unreal Engine — Material Editor User Guide", url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-material-editor-user-guide", type: "official-doc", qualityScore: 5, stacks: ["unreal", "any"] },

  // ── GIS ────────────────────────────────────────────────────────────────────
  "spatial-analysis": { title: "QGIS — Vector Analysis Algorithms (spatial analysis)", url: "https://docs.qgis.org/latest/en/docs/user_manual/processing_algs/qgis/vectoranalysis.html", type: "official-doc", qualityScore: 5 },
};

/**
 * Label variants → existing concept key.
 * A `null` value is an explicit "do not map" (recorded so the decision is
 * visible in review rather than silently absent).
 */
export const BATCH2_ALIASES = {
  "ab-test-analysis": "a-b-test-analysis",
  "sql-window-functions": "advanced-sql-window-functions",
  "mysql-replication": "replication-clustering",
  "mongodb-crud": "document-model-crud",
  "mongodb-indexes": "indexing-performance",
};
