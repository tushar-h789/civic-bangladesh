import { FEATURED_CAMPAIGNS, campaignHref } from "@/data/civic-campaigns";
import {
  COMMUNITY_GROUP_HREF,
  COMMUNITY_GROUP_KEYS,
  COMMUNITY_HOW_KEYS,
  COMMUNITY_NOT_KEYS,
  COMMUNITY_WAY_HREF,
  COMMUNITY_WAY_KEYS,
} from "@/data/community";
import type { Dictionary } from "@/locales";

export function getCommunityWays(t: Dictionary) {
  return COMMUNITY_WAY_KEYS.map((key) => ({
    key,
    href: COMMUNITY_WAY_HREF[key],
    title: t.community.ways[key].title,
    body: t.community.ways[key].body,
    cta: t.community.ways[key].cta,
  }));
}

export function getCommunityHowItems(t: Dictionary) {
  return COMMUNITY_HOW_KEYS.map((key) => ({
    key,
    title: t.community.how[key].title,
    body: t.community.how[key].body,
  }));
}

export function getCommunityNotItems(t: Dictionary) {
  return COMMUNITY_NOT_KEYS.map((key) => ({
    key,
    title: t.community.notThis[key].title,
    body: t.community.notThis[key].body,
  }));
}

export function getCommunityGroups(t: Dictionary) {
  return COMMUNITY_GROUP_KEYS.map((key) => ({
    key,
    href: COMMUNITY_GROUP_HREF[key],
    title: t.community.groups[key].title,
    body: t.community.groups[key].body,
    cta: t.community.groups[key].cta,
  }));
}

export function getCommunityCampaigns(t: Dictionary) {
  return FEATURED_CAMPAIGNS.map((campaign) => {
    const item = t.campaigns.items[campaign.key];

    return {
      key: campaign.key,
      href: campaignHref(campaign.slug),
      image: campaign.image,
      imageAlt: item.imageAlt,
      title: item.title,
      location: item.location,
      progress: campaign.progress,
      participants: campaign.participants,
    };
  });
}
