import type { Metadata } from "next";

import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About | Civic Bangladesh",
  description:
    "Civic Bangladesh is an independent civic-education and government-service learning platform. We help you prepare. We do not process government applications.",
};

export default function AboutRoute() {
  return <AboutPage />;
}
