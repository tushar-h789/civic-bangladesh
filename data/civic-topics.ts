import { ROUTES } from "@/constants/routes";

/**
 * Civic topic catalog used by the homepage and later learn surfaces.
 * `lessonCount` is placeholder curriculum size until real lessons exist —
 * not official or government data.
 */
export const CIVIC_TOPICS = [
  {
    key: "roadTraffic",
    slug: "road-traffic",
    lessonCount: 8,
    image: "/images/topics/topic-road.png",
  },
  {
    key: "cleanliness",
    slug: "cleanliness",
    lessonCount: 6,
    image: "/images/topics/topic-cleanliness.png",
  },
  {
    key: "environment",
    slug: "environment",
    lessonCount: 10,
    image: "/images/topics/topic-environment.png",
  },
  {
    key: "publicSpaces",
    slug: "public-spaces",
    lessonCount: 7,
    image: "/images/topics/topic-spaces.png",
  },
  {
    key: "publicTransport",
    slug: "public-transport",
    lessonCount: 8,
    image: "/images/topics/topic-transport.png",
  },
  {
    key: "socialResponsibility",
    slug: "social-responsibility",
    lessonCount: 9,
    image: "/images/topics/topic-social.png",
  },
  {
    key: "digitalCitizenship",
    slug: "digital-citizenship",
    lessonCount: 6,
    image: "/images/topics/topic-digital.png",
  },
  {
    key: "communityResponsibility",
    slug: "community-responsibility",
    lessonCount: 7,
    image: "/images/topics/topic-community.png",
  },
] as const;

export type CivicTopicKey = (typeof CIVIC_TOPICS)[number]["key"];
export type CivicTopicSlug = (typeof CIVIC_TOPICS)[number]["slug"];

export function civicTopicAnchor(slug: string) {
  return `topic-${slug}`;
}

export function civicTopicHref(slug: string) {
  return `${ROUTES.learn}#${civicTopicAnchor(slug)}`;
}
