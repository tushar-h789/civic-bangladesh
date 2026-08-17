import type { TranslationShape } from "@/locales/types";

export const learning = {
  access: {
    free: "Free",
    premium: "Premium",
  },
  certificate: {
    included: "Certificate",
    notIncluded: "No certificate",
  },
  difficulty: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  },
  duration: "{hours} hr",
  lessons: "{count} lessons",
  cta: "View course",
  items: {
    everydayCivic: {
      title: "Everyday Civic Sense",
      description:
        "The small daily habits that keep streets, queues, and shared places livable. Free for everyone.",
      imageAlt: "A clean tree-lined public walkway in a Bangladesh city park",
      catalogImageAlt: "People waiting calmly in a public service queue",
    },
    roadSafety: {
      title: "Road Safety Habits",
      description:
        "Crossing, waiting, and looking out for others — a short free course with a completion certificate.",
      imageAlt:
        "A Dhaka street with rickshaws, cars, and people using a crossing",
      catalogImageAlt:
        "Pedestrians using a zebra crossing on a Dhaka street with rickshaws",
    },
    communityFacilitation: {
      title: "Community Facilitation",
      description:
        "Extra depth for teachers and organisers: how to run civic practice with a group. Premium on top of free civic education.",
      imageAlt: "Neighbors painting a school wall together",
      catalogImageAlt:
        "A facilitator sitting with neighbors around a table in a community room",
    },
  },
} as const;

export type LearningTranslations = TranslationShape<typeof learning>;
