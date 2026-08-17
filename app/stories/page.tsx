import type { Metadata } from "next";

import {
  firstSearchParam,
  parseStoryKind,
} from "@/data/civic-stories";
import { StoriesPage } from "@/components/stories/stories-page";

export const metadata: Metadata = {
  title: "Stories | Civic Bangladesh",
  description:
    "Sample civic stories that teach everyday habits. These are teaching stories, not news reports, interviews, or government case studies.",
};

export default async function StoriesRoute({
  searchParams,
}: {
  searchParams: Promise<{ story?: string | string[]; kind?: string | string[] }>;
}) {
  const params = await searchParams;

  return (
    <StoriesPage
      selectedSlug={firstSearchParam(params.story)}
      selectedKind={parseStoryKind(params.kind)}
    />
  );
}
