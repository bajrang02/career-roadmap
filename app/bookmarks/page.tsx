import { roadmapIndex } from "@/lib/data-catalog";
import { BookmarksView } from "@/components/dashboard/bookmarks-view";

export default function BookmarksPage() {
  return <BookmarksView roadmaps={roadmapIndex.roadmaps} />;
}
