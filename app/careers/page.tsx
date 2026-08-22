import { Suspense } from "react";
import { CAREER_DOMAINS, listCareers } from "@/lib/data-catalog";
import { CareersBrowser } from "@/components/careers/careers-browser";
import { BrowserSkeleton } from "@/components/careers/browser-skeleton";

export const metadata = {
  title: "Explore every career",
  description:
    "Browse every technical career roadmap by domain, difficulty and path length — software, AI, security, cloud, engineering and more.",
};

export default function CareersPage() {
  return (
    <Suspense fallback={<BrowserSkeleton title="careers" />}>
      <CareersBrowser careers={listCareers()} domains={CAREER_DOMAINS} />
    </Suspense>
  );
}
