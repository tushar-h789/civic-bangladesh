import type { TranslationShape } from "@/locales/types";

export const campaigns = {
  eyebrow: "Campaigns",
  title: "Civic campaigns you can join",
  description:
    "Community actions for cleaner lanes, safer crossings, and shared care. These are civic campaigns, not government programs. Joining is free.",
  sampleNote:
    "Sample campaigns. Participant counts and progress are demo figures — not live statistics.",
  heroImageAlt: "Neighbors planting a sapling together on a roadside",
  partnership: {
    title: "Campaign partnerships",
    description:
      "An organization can support a public awareness campaign. Support would be a conversation with Civic Bangladesh — not a sponsorship slot sold on this page.",
    note: "No partnership is confirmed here. This is not an official government campaign.",
    pricingCta: "How we price other offerings",
  },
  participants: "{count} people (sample)",
  progress: "{percent}% of sample goal",
  cta: "Join campaign",
  items: {
    cleanLanes: {
      title: "Clean Lanes Week",
      location: "Dhaka",
      imageAlt: "A person placing waste into a public bin on a clean lane",
    },
    giveWay: {
      title: "Give Way at the Crossing",
      location: "Chattogram",
      imageAlt:
        "Pedestrians using a zebra crossing while vehicles wait at a red light",
    },
    roadsideTrees: {
      title: "Plant a Roadside Tree",
      location: "Rajshahi",
      imageAlt: "Neighbors planting a sapling together on a roadside",
    },
  },
} as const;

export type CampaignsTranslations = TranslationShape<typeof campaigns>;
