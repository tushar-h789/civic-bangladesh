import { ROUTES } from "@/constants/routes";

/**
 * Sample civic participation score for the homepage.
 * Numbers are an example journey — not a live account or a moral grade.
 */
export const SAMPLE_CIVIC_SCORE = {
  score: 82,
  max: 100,
  levelKey: "responsibleCitizen",
  breakdown: [
    { key: "learning", value: 90, href: ROUTES.learn },
    { key: "challenges", value: 78, href: ROUTES.challenges },
    { key: "quiz", value: 84, href: ROUTES.quiz },
    { key: "community", value: 76, href: ROUTES.community },
  ],
} as const;

export type CivicScoreBreakdownKey =
  (typeof SAMPLE_CIVIC_SCORE.breakdown)[number]["key"];
