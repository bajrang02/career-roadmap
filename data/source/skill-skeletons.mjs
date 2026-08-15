// ─────────────────────────────────────────────────────────────────────────────
// Skill roadmap skeleton templates.
// Each category has a template that encodes the requested structure
// (Skill → Foundations → Basics → Core Concepts → Intermediate → Advanced →
// Best Practices → Real-world Projects → Interview Prep → Certifications →
// Resources → Practice Problems → Industry Applications). Programming
// languages follow the exact topic list from the brief (installation, IDE
// setup, syntax … design patterns, projects, interview questions).
// Per-skill `topics` extras fill the distinctive bits (e.g. Rust's ownership).
// Skeleton format matches data/source/skeletons.mjs: [{ t, k: [string | {t,k,o}] }]
// ─────────────────────────────────────────────────────────────────────────────

const t = (topics, key, def = []) => [...(topics?.[key] ?? def)];

// ── Programming languages ────────────────────────────────────────────────────
export function languageSkeleton(name, topics = {}) {
  return [
    { t: "Getting Started", k: ["Installation & Setup", "IDE & Tooling", `Hello World in ${name}`, "Running & Debugging", ...t(topics, "setup", ["Version / Package Manager"])] },
    { t: "Syntax & Fundamentals", k: ["Syntax Basics", "Variables & Constants", "Data Types", "Operators & Expressions", "Input & Output", ...t(topics, "fundamentals")] },
    { t: "Control Flow", k: ["Conditionals", "Loops", "Functions & Scope", ...t(topics, "control")] },
    { t: "Data Structures", k: ["Arrays", "Strings", "Collections & Generics", "Maps & Sets", ...t(topics, "data")] },
    { t: "Object-Oriented Programming", k: ["Classes & Objects", "Encapsulation", "Inheritance & Polymorphism", "Interfaces & Abstract Classes", ...t(topics, "oop")] },
    { t: "Exceptions & Files", k: ["Exception Handling", "File Handling & I/O", ...t(topics, "io")] },
    { t: "Modules & Ecosystem", k: ["Modules & Imports", "Libraries", "Package Management", ...t(topics, "modules")] },
    { t: "Testing & Debugging", k: ["Unit Testing", "Debugging Techniques", "Code Quality & Linting", ...t(topics, "testing")] },
    { t: "Best Practices & Patterns", k: ["Code Style & Conventions", "Design Patterns", "Performance Optimization", "Documentation", ...t(topics, "best")] },
    { t: "Projects", k: [...t(topics, "projects", ["Beginner: CLI Application", "Intermediate: Data-Driven App", "Portfolio-Grade Project"])] },
    { t: "Interview Preparation", k: ["Core Revision", "Coding Practice (LeetCode-style)", "Common Interview Questions", "Language-Specific Gotchas"] },
    { t: "Certifications", k: [...t(topics, "certs", [`${name} Official Certification Path`, "Community Certifications"])] },
    { t: "Resources", k: ["Official Documentation", "Recommended Books & Courses", "Communities & Forums"] },
    { t: "Practice Problems", k: ["Beginner Exercises", "Intermediate Challenges", "Advanced Problems", "Real-World Problem Sets"] },
    { t: "Industry Applications", k: [...t(topics, "industry", [`${name} in Production`, "Career Paths & Next Steps"])] },
  ];
}

// ── Web development / frameworks ─────────────────────────────────────────────
// Every web-template skill (HTML, CSS, React, Express, GraphQL…) ships its own
// correct topics, so the skeleton must NOT inject framework-only topics
// ("Props & Data Flow", "Client Routing", "Lifecycle / Hooks") into subjects
// where they don't belong — a pure CSS roadmap having "State Management" or
// a Flask roadmap having "Client Routing" is curriculum contamination.
// Content sections therefore carry ONLY the skill's own topics.
export function webSkeleton(name, topics = {}) {
  return [
    { t: "Getting Started", k: [...t(topics, "setup")] },
    { t: "Core Concepts", k: [`${name} Fundamentals`, ...t(topics, "core")] },
    { t: "Styling & Layout", k: [...t(topics, "styling")] },
    { t: "State & Data", k: [...t(topics, "state")] },
    { t: "Routing & Navigation", k: [...t(topics, "routing")] },
    { t: "Intermediate Topics", k: [...t(topics, "intermediate")] },
    { t: "Advanced Topics", k: [...t(topics, "advanced")] },
    { t: "Best Practices", k: [...t(topics, "best")] },
    { t: "Projects", k: [...t(topics, "projects", ["Beginner: To-Do / Notes App", "Intermediate: Dashboard App", "Portfolio-Grade: Full Application"])] },
    { t: "Interview Preparation", k: ["Core Revision", "Coding & Take-Home Practice", "Common Interview Questions", "Framework-Specific Gotchas"] },
    { t: "Certifications", k: [...t(topics, "certs", [`${name} Certification Path`, "Community Certifications"])] },
    { t: "Resources", k: ["Official Documentation", "Recommended Courses & Books", "Communities & Forums"] },
    { t: "Practice Problems", k: ["Beginner Exercises", "Intermediate Challenges", "Advanced Problems", "Build-Something Projects"] },
    { t: "Industry Applications", k: [...t(topics, "industry", [`${name} in Production`, "Career Paths & Next Steps"])] },
  ];
}

// ── Data science / AI tools & libraries ──────────────────────────────────────
export function dataSkeleton(name, topics = {}) {
  return [
    { t: "Foundations", k: ["Python for Data Science", "Environment Setup (Jupyter)", "Data Science Workflow", ...t(topics, "foundations")] },
    { t: "Core Library", k: [`${name} Basics`, "Core Data Structures", "Key Functions & Methods", ...t(topics, "core")] },
    { t: "Working with Data", k: ["Loading & Cleaning Data", "Transforming & Filtering", "Handling Missing Values", ...t(topics, "data")] },
    { t: "Analysis & Visualization", k: ["Exploratory Analysis", "Statistical Methods", "Visualization Techniques", ...t(topics, "viz")] },
    { t: "Modeling", k: ["Feature Engineering", "Model Selection", "Training & Evaluation", ...t(topics, "modeling")] },
    { t: "Advanced Topics", k: [...t(topics, "advanced", ["Advanced Techniques"])] },
    { t: "Production & MLOps", k: ["Model Deployment", "Pipelines & Automation", "Monitoring & Drift", ...t(topics, "mlops")] },
    { t: "Best Practices", k: ["Reproducible Workflows", "Code Quality for Data", "Ethics & Bias", ...t(topics, "best")] },
    { t: "Projects", k: [...t(topics, "projects", ["Beginner: Exploratory Analysis", "Intermediate: End-to-End Pipeline", "Portfolio-Grade: Applied Project"])] },
    { t: "Interview Preparation", k: ["Core Revision", "Statistics & ML Fundamentals", "Common Interview Questions", "Case Study Practice"] },
    { t: "Certifications", k: [...t(topics, "certs", ["Industry Certification Path", "Community Certifications"])] },
    { t: "Resources", k: ["Official Documentation", "Recommended Courses & Books", "Datasets & Communities"] },
    { t: "Practice Problems", k: ["Beginner Exercises", "Kaggle-Style Challenges", "Advanced Problems", "Real Datasets"] },
    { t: "Industry Applications", k: [...t(topics, "industry", [`${name} in Production`, "Career Paths & Next Steps"])] },
  ];
}

// ── Databases ────────────────────────────────────────────────────────────────
export function databaseSkeleton(name, topics = {}) {
  return [
    { t: "Getting Started", k: ["Installation & Setup", "First Connection", "CLI / GUI Tools", ...t(topics, "setup")] },
    { t: "Core Concepts", k: ["Data Modeling", "Tables & Schema", "CRUD Operations", "Data Types", ...t(topics, "core")] },
    { t: "Queries", k: ["Selecting & Filtering", "Joins & Relationships", "Aggregations & Grouping", ...t(topics, "queries")] },
    { t: "Indexing & Performance", k: ["Indexes", "Query Optimization", "EXPLAIN / Profiling", ...t(topics, "perf")] },
    { t: "Advanced Topics", k: ["Transactions & Concurrency", "Replication & Clustering", "Backup & Recovery", ...t(topics, "advanced")] },
    { t: "Security & Administration", k: ["Access Control", "Encryption", "Monitoring & Maintenance", ...t(topics, "admin")] },
    { t: "Integration", k: ["Drivers & Connection Pools", "ORM Integration", "Caching Patterns", ...t(topics, "integration")] },
    { t: "Best Practices", k: ["Schema Design Patterns", "Migration Workflows", "Cost & Capacity Planning", ...t(topics, "best")] },
    { t: "Projects", k: [...t(topics, "projects", ["Beginner: Schema Design", "Intermediate: CRUD Application", "Portfolio-Grade: Optimized System"])] },
    { t: "Interview Preparation", k: ["Core Revision", "SQL / Query Practice", "Common Interview Questions", "System Design (Database)"] },
    { t: "Certifications", k: [...t(topics, "certs", [`${name} Certification Path`, "Community Certifications"])] },
    { t: "Resources", k: ["Official Documentation", "Recommended Courses & Books", "Communities & Forums"] },
    { t: "Practice Problems", k: ["Beginner Exercises", "Intermediate Queries", "Advanced Scenarios", "Real-World Workloads"] },
    { t: "Industry Applications", k: [...t(topics, "industry", [`${name} in Production`, "Career Paths & Next Steps"])] },
  ];
}

// ── DevOps & cloud ───────────────────────────────────────────────────────────
export function devopsSkeleton(name, topics = {}) {
  return [
    { t: "Foundations", k: ["Core Concepts & Architecture", "CLI & Terminal", "Environment Setup", ...t(topics, "foundations")] },
    { t: "Core Skills", k: [`${name} Basics`, "Essential Commands", "Configuration & Files", ...t(topics, "core")] },
    { t: "Automation", k: ["Scripting (Bash/Python)", "Infrastructure as Code", "Configuration Management", ...t(topics, "automation")] },
    { t: "CI/CD & Delivery", k: ["Pipeline Design", "Build & Test Automation", "Deployment Strategies", ...t(topics, "cicd")] },
    { t: "Containers & Orchestration", k: ["Containerization", "Orchestration", "Service Networking", ...t(topics, "containers")] },
    { t: "Cloud & Services", k: ["Cloud Fundamentals", "Compute, Storage & Networking", "Serverless & Managed Services", ...t(topics, "cloud")] },
    { t: "Monitoring & Reliability", k: ["Observability (Metrics/Logs/Traces)", "Alerting & Incident Response", "SLOs & Reliability", ...t(topics, "monitoring")] },
    { t: "Security & Best Practices", k: ["Security Hardening", "Secrets Management", "Cost Optimization", ...t(topics, "security")] },
    { t: "Projects", k: [...t(topics, "projects", ["Beginner: Local Setup & Scripts", "Intermediate: Automated Pipeline", "Portfolio-Grade: Production Deployment"])] },
    { t: "Interview Preparation", k: ["Core Revision", "Hands-On Scenario Practice", "Common Interview Questions", "Architecture Discussions"] },
    { t: "Certifications", k: [...t(topics, "certs", [`${name} Certification Path`, "Community Certifications"])] },
    { t: "Resources", k: ["Official Documentation", "Recommended Courses & Books", "Communities & Forums"] },
    { t: "Practice Problems", k: ["Beginner Exercises", "Intermediate Scenarios", "Advanced Projects", "Real-World Incidents"] },
    { t: "Industry Applications", k: [...t(topics, "industry", [`${name} in Production`, "Career Paths & Next Steps"])] },
  ];
}

// ── Cyber security ───────────────────────────────────────────────────────────
export function securitySkeleton(name, topics = {}) {
  return [
    { t: "Foundations", k: ["Networking Fundamentals", "Linux Essentials", "Setting Up a Lab (VMs/Containers)", ...t(topics, "foundations")] },
    { t: "Reconnaissance", k: ["Information Gathering", "Scanning & Enumeration", "OSINT", ...t(topics, "recon")] },
    { t: "Exploitation", k: ["Vulnerability Analysis", "Exploitation Techniques", "Post-Exploitation", ...t(topics, "exploit")] },
    { t: "Web & App Security", k: ["OWASP Top 10", "Web Exploitation", "API Security", ...t(topics, "web")] },
    { t: "Defensive Security", k: ["Detection & Monitoring", "Incident Response", "Hardening", ...t(topics, "defense")] },
    { t: "Forensics & Malware", k: ["Digital Forensics", "Malware Analysis", "Reverse Engineering", ...t(topics, "forensics")] },
    { t: "Cryptography", k: ["Symmetric & Asymmetric Crypto", "Hashing & Signatures", "TLS & PKI", ...t(topics, "crypto")] },
    { t: "Ethics & Reporting", k: ["Legal & Ethical Boundaries", "Vulnerability Disclosure", "Report Writing", ...t(topics, "ethics")] },
    { t: "Projects", k: [...t(topics, "projects", ["Beginner: Lab Setup & Scans", "Intermediate: CTF / Lab Challenge", "Portfolio-Grade: Full Assessment"])] },
    { t: "Interview Preparation", k: ["Core Revision", "Hands-On Challenge Practice", "Common Interview Questions", "Methodology Walkthroughs"] },
    { t: "Certifications", k: [...t(topics, "certs", [`${name} Certification Path`, "Community Certifications"])] },
    { t: "Resources", k: ["Official Documentation", "Recommended Courses & Books", "CTF Platforms & Communities"] },
    { t: "Practice Problems", k: ["Beginner Lab Exercises", "CTF Challenges", "Advanced Scenarios", "Real-World Case Studies"] },
    { t: "Industry Applications", k: [...t(topics, "industry", [`${name} in the Field`, "Career Paths & Next Steps"])] },
  ];
}

// ── Engineering software (CAD/CAE/FEA/BIM/GIS/automation) ────────────────────
export function engineeringSkeleton(name, topics = {}) {
  return [
    { t: "Getting Started", k: ["Installation & System Requirements", "Licensing & Setup", "First Launch & Configuration", ...t(topics, "setup")] },
    { t: "Interface & Navigation", k: ["Workspace & Panels", "Toolbars & Shortcuts", "Units & Project Setup", ...t(topics, "interface")] },
    { t: "Essential Tools", k: ["Core Modeling / Drawing Tools", "Editing & Modification Tools", "Layers & Organization", ...t(topics, "tools")] },
    { t: "Core Workflow", k: ["Beginner Workflow", "From Concept to Deliverable", "Templates & Libraries", ...t(topics, "workflow")] },
    { t: "Advanced Features", k: ["Advanced Modeling Techniques", "Automation & Customization", "Interoperability & Formats", ...t(topics, "advanced")] },
    { t: "Industry Standards", k: ["Standards & Codes", "Documentation & Deliverables", "Quality & Review", ...t(topics, "standards")] },
    { t: "Professional Tips", k: ["Efficiency Tips & Shortcuts", "Best Practices", "Common Pitfalls", ...t(topics, "tips")] },
    { t: "Projects", k: [...t(topics, "projects", ["Beginner: Guided Tutorial Project", "Intermediate: Realistic Deliverable", "Portfolio-Grade: Industry-Style Project"])] },
    { t: "Resources & Certifications", k: [...t(topics, "certs", ["Official Certification Path", "Vendor Training & Community"])] },
    { t: "Industry Applications", k: [...t(topics, "industry", [`${name} in Industry`, "Career Paths & Next Steps"])] },
  ];
}

// ── Design tools ─────────────────────────────────────────────────────────────
export function designSkeleton(name, topics = {}) {
  return [
    { t: "Getting Started", k: ["Installation & Setup", "Interface & Workspace", "Project Setup", ...t(topics, "setup")] },
    { t: "Essential Tools", k: ["Core Tools & Panels", "Selection & Transformation", "Layers & Organization", ...t(topics, "tools")] },
    { t: "Core Workflows", k: ["Beginner Project", "Design Process", "Export & Delivery", ...t(topics, "workflow")] },
    { t: "Advanced Techniques", k: ["Advanced Effects", "Automation & Actions", "Templates & Assets", ...t(topics, "advanced")] },
    { t: "Best Practices", k: ["Design Principles", "File Organization", "Collaboration", ...t(topics, "best")] },
    { t: "Projects", k: [...t(topics, "projects", ["Beginner: Guided Project", "Intermediate: Real Client Brief", "Portfolio-Grade: Showcase Piece"])] },
    { t: "Resources & Certifications", k: [...t(topics, "certs", ["Official Certification Path", "Community & Tutorials"])] },
    { t: "Industry Applications", k: [...t(topics, "industry", [`${name} in the Industry`, "Career Paths & Next Steps"])] },
  ];
}

// ── Office & productivity ────────────────────────────────────────────────────
export function officeSkeleton(name, topics = {}) {
  return [
    { t: "Getting Started", k: ["Installation & Setup", "Interface & Navigation", "First Document / Project", ...t(topics, "setup")] },
    { t: "Core Features", k: ["Essential Tools", "Formatting & Layout", "Saving & Sharing", ...t(topics, "core")] },
    { t: "Advanced Features", k: ["Advanced Functions & Features", "Templates & Styles", "Data & Formulas", ...t(topics, "advanced")] },
    { t: "Automation & Integrations", k: ["Automation / Macros", "Integrations & Add-ons", "Collaboration Features", ...t(topics, "automation")] },
    { t: "Best Practices", k: ["Efficiency Tips", "Organization", "Common Pitfalls", ...t(topics, "best")] },
    { t: "Projects", k: [...t(topics, "projects", ["Beginner: Guided Project", "Intermediate: Real-World Task", "Portfolio-Grade: Complex Deliverable"])] },
    { t: "Resources & Certifications", k: [...t(topics, "certs", ["Official Certification Path", "Community & Tutorials"])] },
    { t: "Industry Applications", k: [...t(topics, "industry", [`${name} in the Workplace`, "Career Paths & Next Steps"])] },
  ];
}

// ── dispatcher ───────────────────────────────────────────────────────────────
export const SKILL_SKELETON_BUILDERS = {
  language: languageSkeleton,
  web: webSkeleton,
  data: dataSkeleton,
  database: databaseSkeleton,
  devops: devopsSkeleton,
  security: securitySkeleton,
  engineering: engineeringSkeleton,
  design: designSkeleton,
  office: officeSkeleton,
};
