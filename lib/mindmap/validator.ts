import { RoadmapNode, NodeType, NodeDetails, Resource, ProjectRef } from "@/lib/types";

function generateSafeId(base: string, seen: Set<string>): string {
  if (!seen.has(base)) {
    seen.add(base);
    return base;
  }
  let i = 1;
  while (seen.has(`${base}-${i}`)) {
    i++;
  }
  const newId = `${base}-${i}`;
  seen.add(newId);
  return newId;
}

export function validateAndRepairRoadmap(root: RoadmapNode): RoadmapNode {
  const seenIds = new Set<string>();

  function validateNode(node: Partial<RoadmapNode>, ancestors: Set<string>): RoadmapNode {
    // 1. Ensure basic fields exist
    const label = node.label || "Untitled Node";
    const type = (node.type || "topic") as NodeType;
    const optional = !!node.optional;
    
    // 2. ID deduplication
    const idBase = node.id || label.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "node";
    const id = generateSafeId(idBase, seenIds);

    // 3. Cycle prevention
    const currentAncestors = new Set(ancestors);
    currentAncestors.add(id);

    // 4. Safe details
    const d = node.details || ({} as Partial<NodeDetails>);
    const details: NodeDetails = {
      description: d.description || "",
      whyLearn: d.whyLearn || "",
      prerequisites: Array.isArray(d.prerequisites) ? d.prerequisites : [],
      objectives: Array.isArray(d.objectives) ? d.objectives : [],
      difficulty: d.difficulty || "Beginner",
      estimatedTime: d.estimatedTime || "1-2 hours",
      resources: Array.isArray(d.resources) ? (d.resources as Resource[]) : [],
      projects: Array.isArray(d.projects) ? (d.projects as ProjectRef[]) : [],
      interviewQuestions: Array.isArray(d.interviewQuestions) ? d.interviewQuestions : [],
      careerRelevance: d.careerRelevance || "",
      commonMistakes: Array.isArray(d.commonMistakes) ? d.commonMistakes : [],
      tips: Array.isArray(d.tips) ? d.tips : [],
      nextTopics: Array.isArray(d.nextTopics) ? d.nextTopics : [],
      optional: !!d.optional,
    };

    // 5. Valid children & circular link breaking
    const safeChildren: RoadmapNode[] = [];
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        if (!child) continue;
        
        // Prevent circular links (if a child is already an ancestor)
        if (child.id && currentAncestors.has(child.id)) {
          console.warn(`[Validator] Broke circular link: ${child.id} is an ancestor of ${id}`);
          continue;
        }

        safeChildren.push(validateNode(child, currentAncestors));
      }
    }

    return {
      id,
      label,
      type,
      optional,
      details,
      children: safeChildren,
    };
  }

  return validateNode(root, new Set());
}
