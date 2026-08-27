import type { Metadata } from "next";

import { RoadmapPage } from "@/components/roadmap/roadmap-page";
import { roadmap as enRoadmap } from "@/locales/en/roadmap";

export const metadata: Metadata = {
  title: enRoadmap.meta.title,
  description: enRoadmap.meta.description,
};

export default function RoadmapRoute() {
  return <RoadmapPage />;
}
