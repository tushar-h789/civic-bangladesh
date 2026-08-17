import { ROUTES } from "@/constants/routes";

export const HELP_TASK_KEYS = [
  "findService",
  "startCourse",
  "civicLearning",
  "readFaq",
  "seePricing",
  "tryChallenge",
] as const;

export type HelpTaskKey = (typeof HELP_TASK_KEYS)[number];

export const HELP_TASK_HREF: Record<HelpTaskKey, string> = {
  findService: ROUTES.governmentServices,
  startCourse: ROUTES.courses,
  civicLearning: ROUTES.learn,
  readFaq: ROUTES.faq,
  seePricing: ROUTES.pricing,
  tryChallenge: ROUTES.challenges,
};

export const HELP_STEP_KEYS = [
  "discover",
  "learn",
  "prepare",
  "apply",
] as const;

export type HelpStepKey = (typeof HELP_STEP_KEYS)[number];

export const HELP_CAN_KEYS = [
  "explainPlatform",
  "pointToPages",
  "sampleVsOfficial",
  "languageAndAccess",
] as const;

export type HelpCanKey = (typeof HELP_CAN_KEYS)[number];

export const HELP_CANNOT_KEYS = [
  "processApplication",
  "officialFees",
  "ministryPhone",
  "changeGovernmentFile",
] as const;

export type HelpCannotKey = (typeof HELP_CANNOT_KEYS)[number];

export const HELP_SITE_GUIDE_KEYS = [
  "language",
  "search",
  "accessibility",
  "sampleLabels",
] as const;

export type HelpSiteGuideKey = (typeof HELP_SITE_GUIDE_KEYS)[number];
