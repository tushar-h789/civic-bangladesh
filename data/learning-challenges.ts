import { ROUTES } from "@/constants/routes";
import { learnCourseHref } from "@/data/civic-courses";
import { certificateHref } from "@/data/certificates";
import type { LearningChallengeStatus } from "@/data/challenge-types";

/**
 * Sample learning challenges. These are preparation tasks on Civic
 * Bangladesh — not a game, not points, and not government results.
 */
export const LEARNING_CHALLENGES = [
  {
    key: "civicLesson",
    status: "inProgress",
    courseSlug: "everyday-civic-sense",
    href: learnCourseHref("everyday-civic-sense"),
    completed: 5,
  },
  {
    key: "serviceVideo",
    status: "inProgress",
    courseSlug: "fertilizer-support-prep",
    href: learnCourseHref("fertilizer-support-prep"),
    completed: 2,
  },
  {
    key: "serviceAssessment",
    status: "notStarted",
    courseSlug: "bank-solvency-letter-prep",
    href: learnCourseHref("bank-solvency-letter-prep"),
    completed: 0,
  },
  {
    key: "earnCertificate",
    status: "completed",
    courseSlug: "ssc-certificate-attestation-prep",
    href: certificateHref("cb-ssc-attestation-20260801"),
    completed: 1,
  },
] as const satisfies ReadonlyArray<{
  key: string;
  status: LearningChallengeStatus;
  courseSlug: string;
  href: string;
  completed: number;
}>;

export type LearningChallengeKey = (typeof LEARNING_CHALLENGES)[number]["key"];

export function learningChallengesHref() {
  return `${ROUTES.challenges}#learning-challenges`;
}

export function civicChallengesHref() {
  return `${ROUTES.challenges}#civic-challenges`;
}
