import bangladeshMapImage from "@/public/images/home/bangladesh-map.png";
import type { CivicChallengeCategoryKey } from "@/data/challenge-types";

export { CIVIC_CHALLENGE_CATEGORY_KEYS } from "@/data/challenge-types";
export type { CivicChallengeCategoryKey } from "@/data/challenge-types";

/**
 * Sample 30-day civic habit challenge for the homepage.
 * Progress is an example journey — not live tracking or official data.
 * Each day belongs to one civic challenge category.
 */
export const THIRTY_DAY_CHALLENGE = {
  slug: "30-better-habits",
  totalDays: 30,
  currentDay: 12,
  image: "/images/home/intro-responsibility.png",
  mapImage: bangladeshMapImage,
  completedDays: [1, 2, 3, 5, 6, 7, 8, 10, 11],
  missedDays: [4, 9],
  minutes: [
    5, 5, 5, 5, 8, 5, 10, 5, 8, 5, 5, 8, 5, 10, 5, 8, 5, 8, 8, 5, 10, 8, 5, 5,
    5, 10, 5, 8, 10, 8,
  ],
} as const;

export const CIVIC_HABIT_CATEGORY_BY_DAY = {
  1: "cleanliness",
  2: "traffic",
  3: "socialResponsibility",
  4: "socialResponsibility",
  5: "publicSpace",
  6: "socialResponsibility",
  7: "environment",
  8: "traffic",
  9: "socialResponsibility",
  10: "cleanliness",
  11: "environment",
  12: "traffic",
  13: "publicSpace",
  14: "cleanliness",
  15: "socialResponsibility",
  16: "environment",
  17: "publicSpace",
  18: "publicSpace",
  19: "publicSpace",
  20: "cleanliness",
  21: "publicSpace",
  22: "socialResponsibility",
  23: "socialResponsibility",
  24: "publicSpace",
  25: "publicSpace",
  26: "socialResponsibility",
  27: "environment",
  28: "environment",
  29: "environment",
  30: "socialResponsibility",
} as const satisfies Record<number, CivicChallengeCategoryKey>;

export type CivicHabitDay = keyof typeof CIVIC_HABIT_CATEGORY_BY_DAY;

export function getCivicHabitCategory(day: number): CivicChallengeCategoryKey {
  return (
    CIVIC_HABIT_CATEGORY_BY_DAY[
      day as keyof typeof CIVIC_HABIT_CATEGORY_BY_DAY
    ] ?? "socialResponsibility"
  );
}

export function getCivicHabitsByCategory(category: CivicChallengeCategoryKey) {
  return (
    Object.entries(CIVIC_HABIT_CATEGORY_BY_DAY) as Array<
      [string, CivicChallengeCategoryKey]
    >
  )
    .filter(([, key]) => key === category)
    .map(([day]) => Number(day));
}

export type DayStatus = "completed" | "today" | "missed" | "upcoming";

export function getDayStatus(
  day: number,
  currentDay = THIRTY_DAY_CHALLENGE.currentDay,
  completedDays: readonly number[] = THIRTY_DAY_CHALLENGE.completedDays,
  missedDays: readonly number[] = THIRTY_DAY_CHALLENGE.missedDays,
): DayStatus {
  if (completedDays.includes(day)) return "completed";
  if (missedDays.includes(day)) return "missed";
  if (day === currentDay) return "today";
  if (day < currentDay) return "missed";
  return "upcoming";
}
