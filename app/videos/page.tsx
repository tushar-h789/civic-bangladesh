import type { Metadata } from "next";

import {
  parseCivicVideoSlug,
  parseCivicVideoTopicKey,
} from "@/data/civic-learning";
import { VideosPage } from "@/components/videos/videos-page";

export const metadata: Metadata = {
  title: "Videos | Civic Bangladesh",
  description:
    "Short civic learning clips. These are sample Civic Bangladesh videos, not official government films. Two clips reuse existing course videos on YouTube.",
};

export default async function VideosRoute({
  searchParams,
}: {
  searchParams: Promise<{ video?: string | string[]; topic?: string | string[] }>;
}) {
  const params = await searchParams;

  return (
    <VideosPage
      selectedSlug={parseCivicVideoSlug(params.video)}
      selectedTopic={parseCivicVideoTopicKey(params.topic)}
    />
  );
}
