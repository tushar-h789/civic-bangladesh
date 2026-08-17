import {
  CIVIC_CHALLENGE_CATEGORY_KEYS,
  type CivicChallengeCategoryKey,
  type LearningChallengeStatus,
} from "@/data/challenge-types";
import {
  THIRTY_DAY_CHALLENGE,
  getCivicHabitCategory,
  getCivicHabitsByCategory,
  getDayStatus,
} from "@/data/civic-challenge";
import { getCatalogCourseBySlug } from "@/data/course-catalog";
import { LEARNING_CHALLENGES } from "@/data/learning-challenges";
import { getCourseCopy } from "@/lib/get-course-copy";
import type { Dictionary } from "@/locales";

export function getCivicChallengeGroups(t: Dictionary) {
  return CIVIC_CHALLENGE_CATEGORY_KEYS.map((key) => {
    const days = getCivicHabitsByCategory(key);
    const copy = t.challenge.categories[key];

    return {
      key,
      title: copy.title,
      description: copy.description,
      days: days.map((day) => {
        const habit = t.challenge.habits[day as keyof typeof t.challenge.habits];
        return {
          day,
          title: habit.title,
          summary: habit.summary,
          status: getDayStatus(day),
          minutes: THIRTY_DAY_CHALLENGE.minutes[day - 1] ?? 5,
        };
      }),
    };
  });
}

export function getSelectedCivicHabit(day: number, t: Dictionary) {
  const habit = t.challenge.habits[day as keyof typeof t.challenge.habits];
  const category = getCivicHabitCategory(day);

  return {
    day,
    title: habit.title,
    summary: habit.summary,
    category,
    categoryTitle: t.challenge.categories[category].title,
    status: getDayStatus(day),
    minutes: THIRTY_DAY_CHALLENGE.minutes[day - 1] ?? 5,
  };
}

export function getLearningChallengeViews(t: Dictionary) {
  return LEARNING_CHALLENGES.flatMap((entry) => {
    const course = getCatalogCourseBySlug(entry.courseSlug);
    if (!course) return [];

    const courseCopy = getCourseCopy(course, t);
    const item = t.challenge.learningItems[entry.key];
    const total =
      entry.key === "earnCertificate" || entry.key === "serviceAssessment"
        ? 1
        : course.lessons;
    const completed = Math.min(entry.completed, total);
    const status: LearningChallengeStatus = entry.status;
    const percent =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return [
      {
        key: entry.key,
        status,
        href: entry.href,
        title: item.title,
        description: item.description,
        cta: status === "completed" ? item.ctaDone : item.cta,
        courseTitle: courseCopy.title,
        courseImage: course.image,
        courseImageAlt: courseCopy.imageAlt,
        completed,
        total,
        percent,
        showProgress: status === "inProgress" && total > 1,
      },
    ];
  });
}

export type CivicChallengeCategoryKeyView = CivicChallengeCategoryKey;
