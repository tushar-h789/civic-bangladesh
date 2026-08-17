import { ROUTES } from "@/constants/routes";
import {
  CIVIC_VIDEO_TOPIC_KEYS,
  civicVideoTopicSlug,
  videosTopicHref,
} from "@/data/civic-learning";
import type { CivicTopicKey } from "@/data/civic-topics";
import { getCivicShortVideos } from "@/lib/get-civic-learning-view";
import type { Dictionary } from "@/locales";

export function getVideosCatalog(t: Dictionary, topicKey?: CivicTopicKey) {
  const videos = getCivicShortVideos(t);
  return topicKey
    ? videos.filter((video) => video.topicKey === topicKey)
    : videos;
}

export function getVideoTopicFilters(t: Dictionary) {
  return [
    { topicKey: undefined, href: videosTopicHref(), label: t.videos.filter.all },
    ...CIVIC_VIDEO_TOPIC_KEYS.map((key) => ({
      topicKey: key,
      href: videosTopicHref(civicVideoTopicSlug(key)),
      label: t.home.topics.items[key].title,
    })),
  ];
}

export function getVideosHowItems(t: Dictionary) {
  const keys = ["pick", "hosted", "notHosted", "thenPractice"] as const;

  return keys.map((key) => ({
    key,
    title: t.videos.how[key].title,
    body: t.videos.how[key].body,
  }));
}

export function getVideosNotItems(t: Dictionary) {
  const keys = ["notGovernment", "notChannel", "notApplication"] as const;

  return keys.map((key) => ({
    key,
    title: t.videos.notThis[key].title,
    body: t.videos.notThis[key].body,
  }));
}

export function getVideosMoreItems(t: Dictionary) {
  return [
    {
      key: "civicLearning" as const,
      href: `${ROUTES.learn}#short-videos`,
      title: t.videos.more.civicLearning.title,
      body: t.videos.more.civicLearning.body,
      cta: t.videos.more.civicLearning.cta,
    },
    {
      key: "courses" as const,
      href: ROUTES.courses,
      title: t.videos.more.courses.title,
      body: t.videos.more.courses.body,
      cta: t.videos.more.courses.cta,
    },
    {
      key: "stories" as const,
      href: ROUTES.stories,
      title: t.videos.more.stories.title,
      body: t.videos.more.stories.body,
      cta: t.videos.more.stories.cta,
    },
  ];
}
