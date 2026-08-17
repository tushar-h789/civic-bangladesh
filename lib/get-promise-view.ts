import { ROUTES } from "@/constants/routes";
import { CIVIC_PROMISES, civicPromiseTopicHref } from "@/data/civic-promises";
import type { Dictionary } from "@/locales";

const HOW_KEYS = ["pick", "keep", "practice", "visitOnly"] as const;
const NOT_KEYS = ["notOath", "notAccount", "notCertificate"] as const;

export function getCivicPromiseItems(t: Dictionary) {
  return CIVIC_PROMISES.map((item) => ({
    key: item.key,
    topicHref: civicPromiseTopicHref(item.topicSlug),
    title: t.promise.items[item.key].title,
    description: t.promise.items[item.key].description,
  }));
}

export function getCivicPromiseHowItems(t: Dictionary) {
  return HOW_KEYS.map((key) => ({
    key,
    title: t.promise.page.how[key].title,
    body: t.promise.page.how[key].body,
  }));
}

export function getCivicPromiseNotItems(t: Dictionary) {
  return NOT_KEYS.map((key) => ({
    key,
    title: t.promise.page.notThis[key].title,
    body: t.promise.page.notThis[key].body,
  }));
}

export function getCivicPromiseMoreItems(t: Dictionary) {
  return [
    {
      key: "civicLearning" as const,
      href: ROUTES.learn,
      title: t.promise.page.more.civicLearning.title,
      body: t.promise.page.more.civicLearning.body,
      cta: t.promise.page.more.civicLearning.cta,
    },
    {
      key: "challenges" as const,
      href: ROUTES.challenges,
      title: t.promise.page.more.challenges.title,
      body: t.promise.page.more.challenges.body,
      cta: t.promise.page.more.challenges.cta,
    },
    {
      key: "stories" as const,
      href: ROUTES.stories,
      title: t.promise.page.more.stories.title,
      body: t.promise.page.more.stories.body,
      cta: t.promise.page.more.stories.cta,
    },
  ];
}
