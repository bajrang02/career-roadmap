import { SKILL_COUNT, TOTAL_TOPICS, listRoadmaps } from "@/lib/data-catalog";
import { RoadmapsBrowser } from "@/components/careers/roadmaps-browser";

export default function RoadmapsPage() {
  return (
    <RoadmapsBrowser roadmaps={listRoadmaps()} skillCount={SKILL_COUNT} totalTopics={TOTAL_TOPICS} />
  );
}
