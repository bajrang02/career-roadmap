import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "generated");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is missing.");
  console.error("Usage: GEMINI_API_KEY=your_key node data/curriculum-generator.mjs");
  process.exit(1);
}

const SYSTEM_PROMPT = `
You are an expert curriculum designer and software engineer.
Your task is to generate a deeply nested (5-7 levels), highly detailed JSON roadmap for a given career or skill.

The JSON MUST conform EXACTLY to the following TypeScript interfaces. Do NOT wrap the JSON in markdown blocks like \`\`\`json. Return raw JSON.

type NodeType = "career" | "section" | "subsection" | "topic" | "concept" | "projects" | "project" | "optional" | "advanced" | "interview" | "achievement" | "choice";

interface Resource {
  title: string;
  url: string;
  kind: "docs" | "course" | "video" | "article" | "book" | "practice" | "cheatsheet" | "repo" | "community" | "certification";
}

interface ProjectRef {
  title: string;
  description: string;
  goal?: string;
  skills?: string[];
  duration?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced" | "Real-world" | "Portfolio-worthy";
}

interface NodeDetails {
  description: string;
  whyLearn: string;
  prerequisites: string[]; // e.g. ["Must know basic HTML", "Understanding of variables"]
  objectives: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  estimatedTime: string;
  resources: Resource[];
  projects: ProjectRef[];
  interviewQuestions: string[];
  exercises?: string[]; // Hands-on tasks, e.g. ["Write a script that loops 10 times", "Fix this bug"]
  careerRelevance: string;
  commonMistakes: string[];
  tips: string[];
  nextTopics: string[];
  optional?: boolean;
}

interface RoadmapNode {
  id: string; // unique lowercase-kebab-id
  label: string; // The display name
  type: NodeType;
  optional: boolean;
  details: NodeDetails;
  children: RoadmapNode[]; // This is where you nest! Create 5-7 levels of depth.
}

// The root of the JSON should be:
interface Roadmap {
  id: string;
  title: string;
  description: string;
  root: RoadmapNode;
}

REQUIREMENTS:
1. Expansion: The curriculum MUST be 5-7 levels deep (e.g. Domain -> Module -> Topic -> Subtopic -> Concept). 
2. Details: EVERY node MUST have complete, rich \`details\` including \`exercises\`, \`interviewQuestions\`, and \`projects\`. Do NOT use generic descriptions.
3. Relevance: Filter out irrelevant topics (e.g. no backend topics in a frontend roadmap).
4. No Markdown: Output ONLY valid JSON.
`;

async function generateCurriculum(topicName, type = "skill") {
  console.log(`Generating curriculum for: ${topicName}...`);
  
  const prompt = \`Please generate the full curriculum roadmap for "\${topicName}". This is a \${type} roadmap.\`;
  
  const response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\${GEMINI_API_KEY}\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      }
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(\`API Error: \${response.status} - \${text}\`);
  }

  const data = await response.json();
  const rawText = data.candidates[0].content.parts[0].text;
  
  try {
    const json = JSON.parse(rawText);
    return json;
  } catch (e) {
    console.error("Failed to parse JSON. Raw output:", rawText);
    throw e;
  }
}

async function main() {
  if (!existsSync(OUT)) {
    mkdirSync(OUT, { recursive: true });
  }

  // Example: generate just one to test
  const topic = process.argv[2] || "Git";
  const type = process.argv[3] || "skill";
  
  try {
    const roadmap = await generateCurriculum(topic, type);
    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const outputPath = join(OUT, \`\${slug}.json\`);
    
    writeFileSync(outputPath, JSON.stringify(roadmap, null, 2));
    console.log(\`✅ Successfully generated and saved to \${outputPath}\`);
  } catch (e) {
    console.error("Generation failed:", e);
  }
}

main();
