import type { TranslationShape } from "@/locales/types";

export const challengeTypes = {
  civic: {
    label: "Civic Challenge",
    purpose:
      "Practice a small civic habit in a real place — a street, a queue, a park.",
  },
  learning: {
    label: "Learning Challenge",
    purpose:
      "Finish a preparation task on Civic Bangladesh. This is study progress — not a game, and not a government result.",
  },
} as const;

export type ChallengeTypesTranslations = TranslationShape<
  typeof challengeTypes
>;
