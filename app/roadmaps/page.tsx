import { Suspense } from "react";
import { SKILL_COUNT, TOTAL_TOPICS, listRoadmaps } from "@/lib/data-catalog";
import { RoadmapsBrowser } from "@/components/careers/roadmaps-browser";
import { BrowserSkeleton } from "@/components/careers/browser-skeleton";

export const metadata = {
  title: "Every learning roadmap",
  description:
    "Browse every career path and skill roadmap in one place — search by name, category or domain.",
};

export default function RoadmapsPage() {
  return (
    <Suspense fallback={<BrowserSkeleton title="Every learning roadmap" />}>
      <RoadmapsBrowser roadmaps={listRoadmaps()} skillCount={SKILL_COUNT} totalTopics={TOTAL_TOPICS} />
    </Suspense>
  );
}
