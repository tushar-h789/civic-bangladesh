import { ROUTES } from "@/constants/routes";
import { civicTopicHref, type CivicTopicSlug } from "@/data/civic-topics";

export type StoryKind = "citizen" | "student" | "community";

export const STORY_KINDS = ["citizen", "student", "community"] as const;

/**
 * Featured stories for the homepage and /stories. These are sample
 * teaching narratives — not official case studies or government accounts.
 */
export const FEATURED_STORIES = [
  {
    key: "seatOnTheBus",
    slug: "the-seat-i-stood-up-from",
    kind: "citizen",
    image: "/images/home/intro-people.png",
    topicSlug: "public-transport",
  },
  {
    key: "clearCorridor",
    slug: "our-class-keeps-the-corridor-clear",
    kind: "student",
    image: "/images/topics/topic-spaces.png",
    topicSlug: "public-spaces",
  },
  {
    key: "paintedLane",
    slug: "we-painted-the-lane-together",
    kind: "community",
    image: "/images/topics/topic-community.png",
    topicSlug: "community-responsibility",
  },
] as const satisfies ReadonlyArray<{
  key: string;
  slug: string;
  kind: StoryKind;
  image: string;
  topicSlug: CivicTopicSlug;
}>;

export type FeaturedStoryKey = (typeof FEATURED_STORIES)[number]["key"];
export type FeaturedStorySlug = (typeof FEATURED_STORIES)[number]["slug"];

export function firstSearchParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parseStoryKind(
  value: string | string[] | undefined,
): StoryKind | undefined {
  const kind = firstSearchParam(value);
  if (kind === "citizen" || kind === "student" || kind === "community") {
    return kind;
  }
  return undefined;
}

export function getStoryBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return FEATURED_STORIES.find((story) => story.slug === slug);
}

export function storyHref(slug: string) {
  return `${ROUTES.stories}?story=${slug}#story-reading`;
}

export function storiesKindHref(kind?: StoryKind) {
  if (!kind) return ROUTES.stories;
  return `${ROUTES.stories}?kind=${kind}`;
}

export function storyTopicHref(topicSlug: CivicTopicSlug) {
  return civicTopicHref(topicSlug);
}
