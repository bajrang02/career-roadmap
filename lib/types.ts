export type NodeType =
  | "career"
  | "section"
  | "subsection"
  | "topic"
  | "concept"
  | "projects"
  | "project"
  | "optional"
  | "advanced"
  | "interview"
  | "achievement"
  | "choice";

export type ResourceKind =
  | "docs"
  | "course"
  | "video"
  | "article"
  | "book"
  | "practice"
  | "cheatsheet"
  | "repo"
  | "community"
  | "certification"
  | "search"
  | "tutorial"
  | "reference"
  | "guide"
  | "paper"
  | "project"
  | "template";

/** Human-readable learning-resource categories shown in the Resources tab.
 *  Chosen to match the platform taxonomy (Official docs, Beginner tutorial,
 *  Reference, Course, Interactive tutorial, Article, Book, Cheat sheet…). */
export type ResourceType =
  | "Official Documentation"
  | "Reference Documentation"
  | "Beginner Tutorial"
  | "Intermediate Tutorial"
  | "Advanced Guide"
  | "Course"
  | "Interactive Tutorial"
  | "Article"
  | "Book"
  | "Cheat Sheet"
  | "Video"
  | "Practice"
  | "Community"
  | "Repository"
  | "Certification"
  | "Web Search"
  | "PDF Search"
  | "Book Search"
  | "Study Search";

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Resource {
  title: string;
  url: string;
  /** machine-friendly kind (dot color + legacy grouping) */
  kind: ResourceKind;
  /** human-friendly category label shown in the UI */
  type: ResourceType;
  /** display name of the source (MDN, W3Schools, LeetCode…) */
  provider: string;
  description: string;
  difficulty?: DifficultyLevel;
  estimatedTime?: string;
  /** true when the source is the official documentation / vendor platform */
  isOfficial: boolean;
  /** for generated search resources — the topic-specific search query (e.g. `filetype:pdf "C pointers" programming notes`) */
  query?: string;
}

export interface PracticeItem {
  title: string;
  platform: string;
  url: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  /** skills this exercise trains, e.g. ["JOIN", "GROUP BY"] */
  skills: string[];
  description: string;
}

export interface ProjectRef {
  title: string;
  description: string;
  goal?: string;
  skills?: string[];
  duration?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced" | "Real-world" | "Portfolio-worthy";
  features?: string[];
  extensions?: string[];
  outcomes?: string[];
  /** concrete requirements the project must satisfy */
  requirements?: string[];
}

export interface CheatSheet {
  quickRevision?: string[];
  importantCommands?: string[];
  commonSyntax?: string[];
  bestPractices?: string[];
  usefulShortcuts?: string[];
}

export interface StructuredOverview {
  whatIsIt: string;
  whyMatters: string[];
  youWillLearn: string[];
  whereUsed: string[];
  prerequisites: string[];
  outcome: string;
}

export interface NodeDetails {
  description: string;
  /** structured What is it? / Why it matters / You'll learn / Where it's used / Prerequisites / Outcome */
  overview?: StructuredOverview;
  whyLearn: string;
  prerequisites: string[];
  objectives: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  estimatedTime: string;
  resources: Resource[];
  /** curated hands-on practice links — the "Practice This Topic" tab */
  practice: PracticeItem[];
  projects: ProjectRef[];
  interviewQuestions: string[];
  exercises?: string[];
  careerRelevance: string;
  commonMistakes: string[];
  tips: string[];
  nextTopics: string[];
  checkpoints?: string[];
  cheatSheet?: CheatSheet;
  /** ids into the shared certifications catalog — only when a credential is
   *  genuinely relevant to this node (empty = no recognized certification) */
  certIds?: string[];
  optional?: boolean;
}

export interface CertificationLink {
  title: string;
  url: string;
  /** docs | course | practice | article */
  kind: "docs" | "course" | "practice" | "article";
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  level: string;
  officialUrl: string;
  examName: string;
  skills: string[];
  careers: string[];
  topics: string[];
  prerequisites: string[];
  prep: CertificationLink[];
  practice: CertificationLink[];
  related: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  prepTime: string;
  what: string;
  who: string;
  when: string;
  learnFirst: string;
  validates: string[];
  roles: string[];
  /** "Free" (credential free to earn) | "Paid exam" (exam/assessment fee required) */
  cost: "Free" | "Paid exam";
  /** verified official free learning/preparation exists (NOT the credential itself) */
  freePrep: boolean;
}

export interface RoadmapNode {
  id: string;
  label: string;
  type: NodeType;
  optional: boolean;
  details: NodeDetails;
  children: RoadmapNode[];
  options?: RoadmapNode[];
  recommended?: string;
}

export interface ExamMeta {
  stages: string[];
  pattern: string;
}

/** Roadmap kind — career paths vs. standalone skill/technology roadmaps. */
export type RoadmapKind = "career" | "skill";

/** Career grouping domain used to organize careers into browsable categories. */
export type CareerDomain =
  | "Software Development"
  | "Artificial Intelligence & Data"
  | "Cybersecurity"
  | "Cloud & DevOps"
  | "Database & Infrastructure"
  | "Game & Graphics"
  | "UI/UX & Design"
  | "Mobile Development"
  | "Data & Business"
  | "QA & Testing"
  | "Blockchain & Web3"
  | "IoT & Robotics"
  | "Electronics & Embedded"
  | "Engineering";

/** Skill category grouping used to browse skill roadmaps (e.g. Programming
 *  Languages, Databases, Design Tools…). Only meaningful for kind === "skill". */
export interface SkillCategoryMeta {
  id: string;
  label: string;
  icon: string;
  description: string;
  /** number of skill roadmaps in this category (derived from the index) */
  count?: number;
}

export interface CareerMeta {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  kind: RoadmapKind;
  /** career taxonomy ("it"/"non-it") for careers; "skill" for skill roadmaps */
  category: "it" | "non-it" | "skill";
  /** career grouping domain, e.g. "Software Development" (careers only) */
  domain: string;
  /** skill browsing category, e.g. "Programming Languages" (skills only) */
  skillCategory: string;
  industry: string;
  icon: string;
  color: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  duration: string;
  durationHours: number;
  salary: string;
  demand: string;
  demandLevel: number;
  prerequisites: string[];
  certifications: string[];
  tools: string[];
  softSkills: string[];
  portfolioIdeas: string[];
  specializations: string[];
  examMeta: ExamMeta | null;
  // New Career Guidance & Interview Prep
  jobRoles?: string[];
  responsibilities?: string[];
  relatedCareers?: string[];
  interviewRoadmap?: string[];
  portfolioStructure?: string[];
  resumeTips?: string[];
}

export interface RoadmapStats {
  totalNodes: number;
  sections: number;
  subsections: number;
  topics: number;
  concepts: number;
  projects: number;
  advanced: number;
  learnable: number;
  estimatedHours: number;
  keywords: string[];
}

export interface Roadmap {
  meta: CareerMeta;
  stats: RoadmapStats;
  root: RoadmapNode;
}

export interface RoadmapIndexEntry {
  title: string;
  icon: string;
  color: string;
  kind: RoadmapKind;
  category: "it" | "non-it" | "skill";
  domain: string;
  skillCategory: string;
  industry: string;
  difficulty: string;
  duration: string;
  durationHours: number;
  salary: string;
  demand: string;
  demandLevel: number;
  nodeCount: number;
  topicCount: number;
  projectCount: number;
  learnable: number;
  estimatedHours: number;
  tagline: string;
}

export interface RoadmapIndex {
  lastUpdated: string;
  roadmaps: Record<string, RoadmapIndexEntry>;
}

export interface SearchEntry {
  slug: string;
  title: string;
  icon: string;
  kind: RoadmapKind;
  category: "it" | "non-it" | "skill";
  domain: string;
  skillCategory: string;
  industry: string;
  keywords: string[];
}

export interface SearchResult {
  slug: string;
  title: string;
  icon: string;
  kind: RoadmapKind;
  category: "it" | "non-it" | "skill";
  skillCategory: string;
  industry: string;
  matched: string;
}
