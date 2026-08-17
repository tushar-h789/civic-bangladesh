import { ROUTES } from "@/constants/routes";

export const FAQ_GROUP_KEYS = [
  "about",
  "services",
  "learning",
  "certificates",
  "challenges",
  "organizations",
  "usingTheSite",
] as const;

export type FaqGroupKey = (typeof FAQ_GROUP_KEYS)[number];

export const FAQ_ITEM_KEYS = [
  "whatIs",
  "isGovernmentSite",
  "whoIsItFor",
  "languages",
  "canIApplyHere",
  "whereDoIApply",
  "areFactsOfficial",
  "isListComplete",
  "officialPortalButton",
  "twoKindsOfLearning",
  "isCivicFree",
  "whatCostsMoney",
  "paymentOnSite",
  "howToStart",
  "governmentCertificate",
  "whatItRecords",
  "twoChallengeTypes",
  "isChallengeOfficial",
  "schoolsAndOrgs",
  "governmentPartner",
  "howToSearch",
  "sampleCatalog",
  "stillStuck",
] as const;

export type FaqItemKey = (typeof FAQ_ITEM_KEYS)[number];

export const FAQ_ITEMS: readonly {
  key: FaqItemKey;
  group: FaqGroupKey;
}[] = [
  { key: "whatIs", group: "about" },
  { key: "isGovernmentSite", group: "about" },
  { key: "whoIsItFor", group: "about" },
  { key: "languages", group: "about" },
  { key: "canIApplyHere", group: "services" },
  { key: "whereDoIApply", group: "services" },
  { key: "areFactsOfficial", group: "services" },
  { key: "isListComplete", group: "services" },
  { key: "officialPortalButton", group: "services" },
  { key: "twoKindsOfLearning", group: "learning" },
  { key: "isCivicFree", group: "learning" },
  { key: "whatCostsMoney", group: "learning" },
  { key: "paymentOnSite", group: "learning" },
  { key: "howToStart", group: "learning" },
  { key: "governmentCertificate", group: "certificates" },
  { key: "whatItRecords", group: "certificates" },
  { key: "twoChallengeTypes", group: "challenges" },
  { key: "isChallengeOfficial", group: "challenges" },
  { key: "schoolsAndOrgs", group: "organizations" },
  { key: "governmentPartner", group: "organizations" },
  { key: "howToSearch", group: "usingTheSite" },
  { key: "sampleCatalog", group: "usingTheSite" },
  { key: "stillStuck", group: "usingTheSite" },
];

export const FAQ_RELATED_KEYS = [
  "services",
  "courses",
  "civicLearning",
  "pricing",
  "challenges",
] as const;

export type FaqRelatedKey = (typeof FAQ_RELATED_KEYS)[number];

export const FAQ_RELATED_HREF: Record<FaqRelatedKey, string> = {
  services: ROUTES.governmentServices,
  courses: ROUTES.courses,
  civicLearning: ROUTES.learn,
  pricing: ROUTES.pricing,
  challenges: ROUTES.challenges,
};

export function faqGroupHref(group: FaqGroupKey) {
  return `#faq-${group}`;
}

export function getFaqItemsInGroup(group: FaqGroupKey) {
  return FAQ_ITEMS.filter((item) => item.group === group);
}
