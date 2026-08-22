import type { MetadataRoute } from "next";
import { listRoadmaps, roadmapIndex } from "@/lib/data-catalog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://career-roadmaps.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(roadmapIndex.lastUpdated || Date.now());

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/careers`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/skills`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/roadmaps`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Every roadmap is statically pre-rendered, so all of them belong here.
  const roadmapRoutes: MetadataRoute.Sitemap = listRoadmaps().map((r) => ({
    url: `${SITE_URL}/roadmap/${r.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: r.kind === "career" ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...roadmapRoutes];
}
