import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://career-roadmaps.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Device-local, per-visitor views — nothing for a crawler to index.
        
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
