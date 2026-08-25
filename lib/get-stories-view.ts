import { ROUTES } from "@/constants/routes";
import {
  FEATURED_STORIES,
  STORY_KINDS,
  storyHref,
  storyTopicHref,
  storiesKindHref,
  type StoryKind,
} from "@/data/civic-stories";
import type { Dictionary } from "@/locales";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

export function getStoryViews(t: Dictionary, kind?: StoryKind) {
  const stories = kind
    ? FEATURED_STORIES.filter((story) => story.kind === kind)
    : FEATURED_STORIES;

  return stories.map((story) => {
    const item = t.stories.items[story.key];

    return {
      key: story.key,
      slug: story.slug,
      kind: story.kind,
      kindLabel: t.stories.kinds[story.kind],
      href: storyHref(story.slug),
      image: story.image,
      imageAlt: item.imageAlt,
      title: item.title,
      excerpt: item.excerpt,
      byline: formatTemplate(t.stories.byline, {
        name: item.name,
        place: item.place,
      }),
      one: item.one,
      two: item.two,
      habit: item.habit,
      topicHref: storyTopicHref(story.topicSlug),
    };
  });
}

export function getStoryKindFilters(t: Dictionary) {
  return [
    { kind: undefined, href: storiesKindHref(), label: t.stories.filter.all },
    ...STORY_KINDS.map((kind) => ({
      kind,
      href: storiesKindHref(kind),
      label: t.stories.kinds[kind],
    })),
  ];
}

export function getStoriesHowItems(t: Dictionary) {
  const keys = ["read", "habit", "practice"] as const;

  return keys.map((key) => ({
    key,
    title: t.stories.how[key].title,
    body: t.stories.how[key].body,
  }));
}

export function getStoriesNotItems(t: Dictionary) {
  const keys = ["notNews", "notOfficial", "notVerified"] as const;

  return keys.map((key) => ({
    key,
    title: t.stories.notThis[key].title,
    body: t.stories.notThis[key].body,
  }));
}

export function getStoriesPractice(t: Dictionary) {
  return [
    {
      key: "civicLearning" as const,
      href: ROUTES.learn,
      title: t.stories.practice.civicLearning.title,
      body: t.stories.practice.civicLearning.body,
      cta: t.stories.practice.civicLearning.cta,
    },
    {
      key: "challenges" as const,
      href: ROUTES.challenges,
      title: t.stories.practice.challenges.title,
      body: t.stories.practice.challenges.body,
      cta: t.stories.practice.challenges.cta,
    },
    {
      key: "campaigns" as const,
      href: ROUTES.campaigns,
      title: t.stories.practice.campaigns.title,
      body: t.stories.practice.campaigns.body,
      cta: t.stories.practice.campaigns.cta,
    },
    {
      key: "promise" as const,
      href: ROUTES.civicPromise,
      title: t.stories.practice.promise.title,
      body: t.stories.practice.promise.body,
      cta: t.stories.practice.promise.cta,
    },
  ];
}
