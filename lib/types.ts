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
  | "certification";

export interface Resource {
  title: string;
  url: string;
  kind: ResourceKind;
}

export interface ProjectRef {
  title: string;
  description: string;
}

export interface NodeDetails {
  description: string;
  whyLearn: string;
  prerequisites: string[];
  objectives: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  estimatedTime: string;
  resources: Resource[];
  projects: ProjectRef[];
  interviewQuestions: string[];
  careerRelevance: string;
  commonMistakes: string[];
  tips: string[];
  nextTopics: string[];
  optional?: boolean;
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
