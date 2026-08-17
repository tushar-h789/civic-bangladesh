import type { TranslationShape } from "@/locales/types";

export const score = {
  sampleNote: "Sample score — example numbers, not a live account.",
  scoreOverMax: "{score} / {max}",
  levelLabel: "Level",
  breakdownLabel: "Where this comes from",
  cta: "Keep participating",
  levels: {
    responsibleCitizen: {
      title: "Responsible Citizen",
      hint: "You are building a habit of showing up. That is the work.",
    },
  },
  categories: {
    learning: {
      title: "Learning",
      hint: "A few more lessons will raise this.",
    },
    challenges: {
      title: "Challenges",
      hint: "Try the next small habit when you can.",
    },
    quiz: {
      title: "Quiz",
      hint: "A short quiz keeps what you learned close at hand.",
    },
    community: {
      title: "Community",
      hint: "Join one conversation. Participation grows from there.",
    },
  },
} as const;

export type ScoreTranslations = TranslationShape<typeof score>;
