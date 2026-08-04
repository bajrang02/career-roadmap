import { Hero } from "@/components/landing/hero";
import {
  Categories,
  CTA,
  FeaturedRoadmaps,
  Features,
  HowItWorks,
  NodeLegend,
  RecentlyUpdated,
  SkillCategories,
} from "@/components/landing/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NodeLegend />
      <FeaturedRoadmaps />
      <Categories />
      <SkillCategories />
      <RecentlyUpdated />
      <HowItWorks />
      <Features />
      <CTA />
    </>
  );
}
