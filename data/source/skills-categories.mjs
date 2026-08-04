// Skill browsing categories. `id` is referenced by each skill's `categories`
// array; the first entry in a skill's categories list is its primary label.

export const SKILL_CATEGORIES = [
  { id: "programming", label: "Programming Languages", icon: "💻", description: "Core programming languages — syntax, tooling, patterns and projects." },
  { id: "frontend", label: "Frontend", icon: "🌐", description: "HTML, CSS and the JavaScript frameworks that power what users see." },
  { id: "backend", label: "Backend", icon: "🛠️", description: "Server frameworks, runtimes and APIs that power applications." },
  { id: "databases", label: "Databases", icon: "🗄️", description: "Relational and NoSQL databases — modeling, queries, performance and ops." },
  { id: "data", label: "AI & Data Science", icon: "🤖", description: "Libraries and practices for analysis, machine learning and generative AI." },
  { id: "devops", label: "Cloud & DevOps", icon: "☁️", description: "Version control, CI/CD, containers, cloud platforms and infrastructure." },
  { id: "security", label: "Cybersecurity", icon: "🛡️", description: "Networking, offensive and defensive security, forensics and cryptography." },
  { id: "engineering", label: "Engineering Software", icon: "⚙️", description: "CAD, CAE, BIM, GIS and industrial automation software workflows." },
  { id: "design", label: "Design", icon: "🎨", description: "Design, motion and media tools — from Figma to Blender to DaVinci." },
  { id: "office", label: "Productivity", icon: "📋", description: "Documents, spreadsheets, project management and team collaboration." },
];

export const SKILL_CATEGORY_MAP = Object.fromEntries(SKILL_CATEGORIES.map((c) => [c.id, c]));
