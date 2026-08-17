import { ROUTES } from "@/constants/routes";

/**
 * Featured campaigns. Participant counts and progress are sample
 * figures — not live campaign statistics or government data.
 */
export const FEATURED_CAMPAIGNS = [
  {
    key: "cleanLanes",
    slug: "clean-lanes-week",
    image: "/images/topics/topic-cleanliness.png",
    participants: 1240,
    progress: 68,
  },
  {
    key: "giveWay",
    slug: "give-way-at-the-crossing",
    image: "/images/home/intro-rules.png",
    participants: 860,
    progress: 42,
  },
  {
    key: "roadsideTrees",
    slug: "plant-a-roadside-tree",
    image: "/images/home/intro-responsibility.png",
    participants: 510,
    progress: 81,
  },
] as const;

export type FeaturedCampaignKey = (typeof FEATURED_CAMPAIGNS)[number]["key"];

export function campaignHref(slug: string) {
  return `${ROUTES.campaigns}#${slug}`;
}
