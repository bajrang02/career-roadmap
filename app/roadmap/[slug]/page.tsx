import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { careerBySlug } from "@/lib/data-loader";
import { RoadmapViewer } from "@/components/roadmap/roadmap-viewer";

type PageProps = { params: Promise<{ slug: string }> };

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
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <RoadmapViewer slug={slug} />
    </Suspense>
  );
}
