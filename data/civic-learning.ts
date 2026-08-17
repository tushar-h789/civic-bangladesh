import { catalogCourseHref } from "@/data/civic-courses";
import { ROUTES } from "@/constants/routes";
import { CIVIC_TOPICS, type CivicTopicKey } from "@/data/civic-topics";

export const CIVIC_FEATURED_LESSONS = [
  {
    key: "crossingWithCare",
    topicKey: "roadTraffic",
    minutes: 8,
    image: "/images/topics/topic-road.png",
    courseSlug: "road-safety-habits",
  },
  {
    key: "leaveNoLitter",
    topicKey: "cleanliness",
    minutes: 6,
    image: "/images/topics/topic-cleanliness.png",
    courseSlug: "everyday-civic-sense",
  },
  {
    key: "treesAndWater",
    topicKey: "environment",
    minutes: 10,
    image: "/images/topics/topic-environment.png",
    courseSlug: null,
  },
  {
    key: "sharedParks",
    topicKey: "publicSpaces",
    minutes: 7,
    image: "/images/topics/topic-spaces.png",
    courseSlug: "everyday-civic-sense",
  },
  {
    key: "kindRide",
    topicKey: "publicTransport",
    minutes: 8,
    image: "/images/topics/topic-transport.png",
    courseSlug: null,
  },
  {
    key: "speakOnline",
    topicKey: "digitalCitizenship",
    minutes: 6,
    image: "/images/topics/topic-digital.png",
    courseSlug: null,
  },
  {
    key: "waitYourTurn",
    topicKey: "socialResponsibility",
    minutes: 7,
    image: "/images/topics/topic-social.png",
    courseSlug: "everyday-civic-sense",
  },
  {
    key: "neighborsTogether",
    topicKey: "communityResponsibility",
    minutes: 9,
    image: "/images/topics/topic-community.png",
    courseSlug: "community-facilitation",
  },
] as const satisfies ReadonlyArray<{
  key: string;
  topicKey: CivicTopicKey;
  minutes: number;
  image: string;
  courseSlug: string | null;
}>;

export type CivicFeaturedLessonKey = (typeof CIVIC_FEATURED_LESSONS)[number]["key"];

/**
 * Short civic clips for the learning hub and /videos. YouTube ids are
 * only reused from existing civic course lessons — not invented
 * government films.
 */
export const CIVIC_SHORT_VIDEOS = [
  {
    key: "waitForGreen",
    slug: "wait-for-green",
    topicKey: "roadTraffic",
    minutes: 3,
    image: "/images/home/intro-rules.png",
    youtubeId: "Rt1h0jcXgGA",
    courseSlug: "road-safety-habits",
  },
  {
    key: "useTheBinClip",
    slug: "two-steps-to-the-bin",
    topicKey: "cleanliness",
    minutes: 2,
    image: "/images/topics/topic-cleanliness.png",
    youtubeId: null,
    courseSlug: "everyday-civic-sense",
  },
  {
    key: "plantTogether",
    slug: "plant-together",
    topicKey: "environment",
    minutes: 4,
    image: "/images/home/intro-responsibility.png",
    youtubeId: null,
    courseSlug: null,
  },
  {
    key: "offerASeat",
    slug: "offer-a-seat",
    topicKey: "publicTransport",
    minutes: 3,
    image: "/images/home/intro-people.png",
    youtubeId: null,
    courseSlug: null,
  },
  {
    key: "queueCalmly",
    slug: "queue-calmly",
    topicKey: "socialResponsibility",
    minutes: 3,
    image: "/images/topics/topic-social.png",
    youtubeId: null,
    courseSlug: "everyday-civic-sense",
  },
  {
    key: "neighborsPaint",
    slug: "care-for-a-shared-wall",
    topicKey: "communityResponsibility",
    minutes: 4,
    image: "/images/topics/topic-community.png",
    youtubeId: "oIMQjkUOe8A",
    courseSlug: "community-facilitation",
  },
] as const satisfies ReadonlyArray<{
  key: string;
  slug: string;
  topicKey: CivicTopicKey;
  minutes: number;
  image: string;
  youtubeId: string | null;
  courseSlug: string | null;
}>;

export type CivicShortVideoKey = (typeof CIVIC_SHORT_VIDEOS)[number]["key"];
export type CivicShortVideoSlug = (typeof CIVIC_SHORT_VIDEOS)[number]["slug"];

export const CIVIC_VIDEO_TOPIC_KEYS = [
  ...new Set(CIVIC_SHORT_VIDEOS.map((video) => video.topicKey)),
] as CivicTopicKey[];

export function getCivicVideoBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return CIVIC_SHORT_VIDEOS.find((video) => video.slug === slug);
}

export function parseCivicVideoSlug(
  value: string | string[] | undefined,
): string | undefined {
  const slug = Array.isArray(value) ? value[0] : value;
  return slug || undefined;
}

export function parseCivicVideoTopicKey(
  value: string | string[] | undefined,
): CivicTopicKey | undefined {
  const slug = Array.isArray(value) ? value[0] : value;
  if (!slug) return undefined;
  const topic = CIVIC_TOPICS.find((entry) => entry.slug === slug);
  if (!topic) return undefined;
  return CIVIC_VIDEO_TOPIC_KEYS.includes(topic.key) ? topic.key : undefined;
}

export function civicVideoTopicSlug(topicKey: CivicTopicKey) {
  return CIVIC_TOPICS.find((entry) => entry.key === topicKey)?.slug ?? topicKey;
}

export const CIVIC_HUB_QUIZZES = [
  {
    key: "roadHabits",
    topicKey: "roadTraffic",
    questions: [
      {
        key: "redLight",
        image: "/images/home/intro-rules.png",
        choiceIds: ["rush", "wait", "wave"],
        correctChoiceId: "wait",
      },
      {
        key: "zebra",
        image: "/images/topics/topic-road.png",
        choiceIds: ["phone", "look", "run"],
        correctChoiceId: "look",
      },
      {
        key: "horn",
        image: "/images/home/intro-safer.png",
        choiceIds: ["always", "needed", "never"],
        correctChoiceId: "needed",
      },
    ],
  },
  {
    key: "cleanStreets",
    topicKey: "cleanliness",
    questions: [
      {
        key: "bin",
        image: "/images/topics/topic-cleanliness.png",
        choiceIds: ["pass", "bin", "kick"],
        correctChoiceId: "bin",
      },
      {
        key: "drain",
        image: "/images/home/intro-environment.png",
        choiceIds: ["pour", "keep", "hide"],
        correctChoiceId: "keep",
      },
      {
        key: "park",
        image: "/images/home/intro-cleaner.png",
        choiceIds: ["leave", "carry", "bury"],
        correctChoiceId: "carry",
      },
    ],
  },
  {
    key: "digitalCare",
    topicKey: "digitalCitizenship",
    questions: [
      {
        key: "share",
        image: "/images/topics/topic-digital.png",
        choiceIds: ["forward", "check", "stack"],
        correctChoiceId: "check",
      },
      {
        key: "comment",
        image: "/images/topics/topic-social.png",
        choiceIds: ["mock", "kind", "pile"],
        correctChoiceId: "kind",
      },
      {
        key: "help",
        image: "/images/home/intro-people.png",
        choiceIds: ["laugh", "show", "ignore"],
        correctChoiceId: "show",
      },
    ],
  },
] as const;

export type CivicHubQuizKey = (typeof CIVIC_HUB_QUIZZES)[number]["key"];

export const CIVIC_RECOMMENDED_PATHS = [
  {
    key: "startHere",
    courseSlug: "everyday-civic-sense",
    image: "/images/home/intro-spaces.png",
  },
  {
    key: "practiceStreets",
    courseSlug: "road-safety-habits",
    image: "/images/topics/topic-road.png",
  },
  {
    key: "leadAGroup",
    courseSlug: "community-facilitation",
    image: "/images/topics/topic-community.png",
  },
] as const;

export type CivicRecommendedPathKey =
  (typeof CIVIC_RECOMMENDED_PATHS)[number]["key"];

export function youtubeWatchHref(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function civicVideoHref(slug: string) {
  return `${ROUTES.videos}?video=${slug}#video-watching`;
}

export function videosTopicHref(topicSlug?: string) {
  if (!topicSlug) return ROUTES.videos;
  return `${ROUTES.videos}?topic=${topicSlug}`;
}

export function civicLessonHref(courseSlug: string | null, topicSlug: string) {
  return courseSlug ? catalogCourseHref(courseSlug) : `${ROUTES.learn}#topic-${topicSlug}`;
}
