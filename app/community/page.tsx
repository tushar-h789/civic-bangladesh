import type { Metadata } from "next";

import { CommunityPage } from "@/components/community/community-page";

export const metadata: Metadata = {
  title: "Community | Civic Bangladesh",
  description:
    "Take part through civic campaigns, stories, promises, and challenges. Civic Bangladesh has no live member feed, and it is not a government community portal.",
};

export default function CommunityRoute() {
  return <CommunityPage />;
}
