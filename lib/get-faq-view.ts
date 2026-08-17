import {
  FAQ_GROUP_KEYS,
  FAQ_ITEMS,
  FAQ_RELATED_KEYS,
  FAQ_RELATED_HREF,
  faqGroupHref,
  type FaqGroupKey,
  type FaqItemKey,
} from "@/data/faq";
import type { Dictionary } from "@/locales";

export type FaqItemView = {
  key: FaqItemKey;
  group: FaqGroupKey;
  question: string;
  answer: string;
};

export type FaqGroupView = {
  key: FaqGroupKey;
  href: string;
  title: string;
  description: string;
  items: FaqItemView[];
};

export type FaqRelatedView = {
  key: (typeof FAQ_RELATED_KEYS)[number];
  href: string;
  title: string;
  body: string;
};

export function getFaqGroups(t: Dictionary): FaqGroupView[] {
  return FAQ_GROUP_KEYS.map((key) => ({
    key,
    href: faqGroupHref(key),
    title: t.faq.groups[key].title,
    description: t.faq.groups[key].description,
    items: FAQ_ITEMS.filter((item) => item.group === key).map((item) => ({
      key: item.key,
      group: item.group,
      question: t.faq.items[item.key].question,
      answer: t.faq.items[item.key].answer,
    })),
  }));
}

export function getFaqRelatedPages(t: Dictionary): FaqRelatedView[] {
  return FAQ_RELATED_KEYS.map((key) => ({
    key,
    href: FAQ_RELATED_HREF[key],
    title: t.faq.related[key].title,
    body: t.faq.related[key].body,
  }));
}

export function filterFaqGroups(
  groups: FaqGroupView[],
  query: string,
): FaqGroupView[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return groups;

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const haystack = [item.question, item.answer, group.title]
          .join(" ")
          .toLowerCase();
        return haystack.includes(needle);
      }),
    }))
    .filter((group) => group.items.length > 0);
}
