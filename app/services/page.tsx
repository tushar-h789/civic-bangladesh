import type { Metadata } from "next";

import { ServicesDiscovery } from "@/components/services/services-discovery";

export const metadata: Metadata = {
  title: "Find a Government Service | Civic Bangladesh",
  description:
    "Find a government service, learn which papers to prepare, and get ready step by step. Civic Bangladesh is a learning platform, not an official government portal.",
};

export default function ServicesPage() {
  return <ServicesDiscovery />;
}
