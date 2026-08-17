import { civicTopicHref } from "@/data/civic-topics";

/**
 * Sample civic promises. Selection is local to the visit —
 * not an account, a government oath, or a backend save.
 */
export const CIVIC_PROMISES = [
  {
    key: "useTheBin",
    topicSlug: "cleanliness",
  },
  {
    key: "waitYourTurn",
    topicSlug: "social-responsibility",
  },
  {
    key: "speakWithCare",
    topicSlug: "digital-citizenship",
  },
] as const;

export type CivicPromiseKey = (typeof CIVIC_PROMISES)[number]["key"];

export function parseCivicPromiseKey(
  value: string | string[] | undefined,
): CivicPromiseKey | undefined {
  const key = Array.isArray(value) ? value[0] : value;
  return CIVIC_PROMISES.some((item) => item.key === key)
    ? (key as CivicPromiseKey)
    : undefined;
}

export function civicPromiseTopicHref(
  topicSlug: (typeof CIVIC_PROMISES)[number]["topicSlug"],
) {
  return civicTopicHref(topicSlug);
}
