export const ASSESSMENT_OPTION_KEYS = ["a", "b", "c"] as const;

export type AssessmentOptionKey = (typeof ASSESSMENT_OPTION_KEYS)[number];

export const SERVICE_ASSESSMENT_QUESTION_KEYS = [
  "officialPortal",
  "matchingNames",
  "governmentFees",
  "learningCredential",
  "missingPaper",
] as const;

export type ServiceAssessmentQuestionKey =
  (typeof SERVICE_ASSESSMENT_QUESTION_KEYS)[number];

export const CIVIC_ASSESSMENT_QUESTION_KEYS = [
  "sharedPlaces",
  "queues",
  "lookingOut",
  "practice",
  "notGovernment",
] as const;

export type CivicAssessmentQuestionKey =
  (typeof CIVIC_ASSESSMENT_QUESTION_KEYS)[number];

/** Correct answers required to pass. Sample catalog rule, not a live exam. */
export const ASSESSMENT_PASS_COUNT = 4;

export type AssessmentQuestion = {
  id: string;
  prompt: string;
  options: ReadonlyArray<{ key: AssessmentOptionKey; label: string }>;
  answer: AssessmentOptionKey;
  why: string;
};

export function scoreAssessment(
  questions: readonly AssessmentQuestion[],
  answers: Record<string, string>,
) {
  return questions.reduce(
    (total, question) =>
      total + (answers[question.id] === question.answer ? 1 : 0),
    0,
  );
}

export function didPassAssessment(correct: number) {
  return correct >= ASSESSMENT_PASS_COUNT;
}
