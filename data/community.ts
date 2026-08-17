import { ROUTES } from "@/constants/routes";
import { civicTopicHref } from "@/data/civic-topics";

export const COMMUNITY_WAY_KEYS = [
  "campaigns",
  "stories",
  "promise",
  "challenges",
] as const;

export type CommunityWayKey = (typeof COMMUNITY_WAY_KEYS)[number];

export const COMMUNITY_WAY_HREF: Record<CommunityWayKey, string> = {
  campaigns: ROUTES.campaigns,
  stories: ROUTES.stories,
  promise: ROUTES.civicPromise,
  challenges: ROUTES.challenges,
};

export const COMMUNITY_HOW_KEYS = [
  "join",
  "practice",
  "inspire",
  "share",
] as const;

export type CommunityHowKey = (typeof COMMUNITY_HOW_KEYS)[number];

export const COMMUNITY_NOT_KEYS = [
  "notFeed",
  "notDirectory",
  "notGovernment",
] as const;

export type CommunityNotKey = (typeof COMMUNITY_NOT_KEYS)[number];

export const COMMUNITY_GROUP_KEYS = ["schools", "organizations", "topic"] as const;

export type CommunityGroupKey = (typeof COMMUNITY_GROUP_KEYS)[number];

export const COMMUNITY_GROUP_HREF: Record<CommunityGroupKey, string> = {
  schools: ROUTES.schools,
  organizations: ROUTES.organizations,
  topic: civicTopicHref("community-responsibility"),
};
