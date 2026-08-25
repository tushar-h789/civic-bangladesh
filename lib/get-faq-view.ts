import {
  FAQ_GROUP_KEYS,
  FAQ_ITEMS,
  FAQ_RELATED_KEYS,
  FAQ_RELATED_HREF,
  faqGroupHref,
  type FaqGroupKey,
  type FaqItemKey,
} from "@/data/faq";
import { OFFICIAL_GOVERNMENT_PORTAL_HREF } from "@/data/government-services";
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
  key: (typeof FAQ_RELATED_KEYS)[number] | "official";
  href: string;
  title: string;
  body: string;
  cta: string;
  external?: boolean;
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
  const sitePages = FAQ_RELATED_KEYS.map((key) => ({
    key,
    href: FAQ_RELATED_HREF[key],
    title: t.faq.related[key].title,
    body: t.faq.related[key].body,
    cta: t.faq.related[key].cta,
  }));

  return [
    ...sitePages,
    {
      key: "official",
      href: OFFICIAL_GOVERNMENT_PORTAL_HREF,
      title: t.faq.related.official.title,
      body: t.faq.related.official.body,
      cta: t.faq.related.official.cta,
      external: true,
    },
  ];
}

export function getFaqHowItems(t: Dictionary) {
  const keys = ["search", "civic", "apply"] as const;

  return keys.map((key) => ({
    key,
    title: t.faq.how[key].title,
    body: t.faq.how[key].body,
  }));
}

export function getFaqNotItems(t: Dictionary) {
  const keys = ["notHelpdesk", "notRules", "notApply"] as const;

  return keys.map((key) => ({
    key,
    title: t.faq.notThis[key].title,
    body: t.faq.notThis[key].body,
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
