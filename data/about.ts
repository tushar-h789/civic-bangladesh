import { ROUTES } from "@/constants/routes";

export const ABOUT_PILLAR_KEYS = ["civic", "services"] as const;

export type AboutPillarKey = (typeof ABOUT_PILLAR_KEYS)[number];

export const ABOUT_PILLAR_HREF: Record<AboutPillarKey, string> = {
  civic: ROUTES.learn,
  services: ROUTES.governmentServices,
};

export const ABOUT_JOURNEY_KEYS = [
  "learn",
  "practice",
  "participate",
  "inspire",
  "impact",
] as const;

export type AboutJourneyKey = (typeof ABOUT_JOURNEY_KEYS)[number];

export const ABOUT_SERVICE_PATH_KEYS = [
  "find",
  "learnProcess",
  "course",
  "assess",
  "credential",
  "apply",
] as const;

export type AboutServicePathKey = (typeof ABOUT_SERVICE_PATH_KEYS)[number];

export const ABOUT_AUDIENCE_KEYS = [
  "citizens",
  "students",
  "teachers",
  "schools",
  "organizations",
] as const;

export type AboutAudienceKey = (typeof ABOUT_AUDIENCE_KEYS)[number];

export const ABOUT_AUDIENCE_HREF: Record<AboutAudienceKey, string> = {
  citizens: ROUTES.learn,
  students: ROUTES.courses,
  teachers: ROUTES.learn,
  schools: ROUTES.schools,
  organizations: ROUTES.organizations,
};

export const ABOUT_NOT_KEYS = [
  "notPortal",
  "notPartnership",
  "notOfficialCert",
] as const;

export type AboutNotKey = (typeof ABOUT_NOT_KEYS)[number];

export const ABOUT_START_KEYS = [
  "civicLearning",
  "services",
  "courses",
  "challenges",
] as const;

export type AboutStartKey = (typeof ABOUT_START_KEYS)[number];

export const ABOUT_START_HREF: Record<AboutStartKey, string> = {
  civicLearning: ROUTES.learn,
  services: ROUTES.governmentServices,
  courses: ROUTES.courses,
  challenges: ROUTES.challenges,
};
