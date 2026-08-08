import { roadmapIndex } from "@/lib/data-catalog";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default function DashboardPage() {
  return <DashboardView roadmaps={roadmapIndex.roadmaps} />;
}
