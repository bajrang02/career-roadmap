import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { careerBySlug, listRoadmaps } from "@/lib/data-catalog";
import { getRoadmapServer } from "@/lib/roadmap-server";
import { RoadmapViewer } from "@/components/roadmap/roadmap-viewer";
import { RoadmapSkeleton } from "@/components/roadmap/roadmap-skeleton";

type PageProps = { params: Promise<{ slug: string }> };

// Pre-render every roadmap at build time — static HTML, zero server round-trip
// per visit, and roadmap data is fetched/validated once during the build.
export function generateStaticParams() {
  return listRoadmaps().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const career = careerBySlug(slug);
  if (!career) return { title: "Roadmap not found" };
  return {
    title: `${career.title} Roadmap`,
    description: `${career.tagline} — an interactive ${career.difficulty.toLowerCase()}-level career roadmap with ${career.topicCount} topics, ${career.projectCount} projects and interview preparation.`,
    openGraph: {
      title: `${career.title} Roadmap`,
      description: career.tagline,
      type: "website",
    },
  };
}

export default async function RoadmapPage({ params }: PageProps) {
  const { slug } = await params;
  const career = careerBySlug(slug);
  if (!career) notFound();
  // fetch + validate once at build (static), then pass to the client viewer —
  // no client-side fetch waterfall or runtime validation. Reads the generated
  // JSON from disk so roadmap data stays out of the webpack bundle graph.
  const roadmap = getRoadmapServer(slug);
  return (
    <Suspense fallback={<RoadmapSkeleton />}>
      <RoadmapViewer
        slug={slug}
        roadmap={roadmap}
        roadmapList={listRoadmaps().map((r) => ({
          slug: r.slug,
          title: r.title,
          icon: r.icon,
          learnable: r.learnable,
          nodeCount: r.nodeCount,
        }))}
      />
    </Suspense>
  );
}
