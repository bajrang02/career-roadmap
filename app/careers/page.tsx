import { Suspense } from "react";
import { CAREER_DOMAINS, listCareers } from "@/lib/data-catalog";
import { CareersBrowser } from "@/components/careers/careers-browser";

export default function CareersPage() {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <CareersBrowser careers={listCareers()} domains={CAREER_DOMAINS} />
    </Suspense>
  );
}
