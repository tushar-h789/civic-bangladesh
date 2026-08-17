import type { CatalogCourse } from "@/data/course-catalog";
import {
  ASSESSMENT_OPTION_KEYS,
  CIVIC_ASSESSMENT_QUESTION_KEYS,
  SERVICE_ASSESSMENT_QUESTION_KEYS,
  type AssessmentOptionKey,
  type AssessmentQuestion,
} from "@/data/course-assessment";
import type { Dictionary } from "@/locales";

type QuestionCopy = {
  prompt: string;
  a: string;
  b: string;
  c: string;
  answer: string;
  why: string;
};

function toQuestion(id: string, copy: QuestionCopy): AssessmentQuestion {
  return {
    id,
    prompt: copy.prompt,
    options: ASSESSMENT_OPTION_KEYS.map((key) => ({
      key,
      label: copy[key],
    })),
    answer: copy.answer as AssessmentOptionKey,
    why: copy.why,
  };
}

/**
 * Shared final assessment for every catalog course.
 * Service-prep courses use one question bank so the experience stays consistent.
 */
export function getCourseAssessmentQuestions(
  course: CatalogCourse,
  t: Dictionary,
): AssessmentQuestion[] {
  if (course.type === "servicePrep") {
    const bank = t.courseLearn.assessment.serviceQuestions;
    return SERVICE_ASSESSMENT_QUESTION_KEYS.map((key) =>
      toQuestion(key, bank[key]),
    );
  }

  const bank = t.courseLearn.assessment.civicQuestions;
  return CIVIC_ASSESSMENT_QUESTION_KEYS.map((key) =>
    toQuestion(key, bank[key]),
  );
}
