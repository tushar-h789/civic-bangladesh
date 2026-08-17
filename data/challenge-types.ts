/**
 * Challenge kinds for Civic Bangladesh.
 * Civic challenges are everyday habits.
 * Learning challenges are preparation tasks on this platform —
 * not a game, and not a government application tracker.
 */
export const CHALLENGE_TYPE_KEYS = ["civic", "learning"] as const;

export type ChallengeTypeKey = (typeof CHALLENGE_TYPE_KEYS)[number];

export function isCivicChallengeType(type: ChallengeTypeKey) {
  return type === "civic";
}

export function isLearningChallengeType(type: ChallengeTypeKey) {
  return type === "learning";
}

export const CIVIC_CHALLENGE_CATEGORY_KEYS = [
  "cleanliness",
  "traffic",
  "environment",
  "publicSpace",
  "socialResponsibility",
] as const;

export type CivicChallengeCategoryKey =
  (typeof CIVIC_CHALLENGE_CATEGORY_KEYS)[number];

export const LEARNING_CHALLENGE_STATUS_KEYS = [
  "notStarted",
  "inProgress",
  "completed",
] as const;

export type LearningChallengeStatus =
  (typeof LEARNING_CHALLENGE_STATUS_KEYS)[number];
