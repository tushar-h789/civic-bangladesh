import {
  CIVIC_CURRICULUM,
  SERVICE_PREP_LESSONS,
  SERVICE_PREP_MODULE_KEYS,
  isCivicCurriculumKey,
} from "@/data/course-curriculum";
import type { CatalogCourse } from "@/data/course-catalog";
import type { Dictionary } from "@/locales";

export type CurriculumLesson = {
  key: string;
  title: string;
};

export type CourseCurriculumModule = {
  key: string;
  title: string;
  body: string;
  lessons: CurriculumLesson[];
};

export function getCurriculumModules(
  course: CatalogCourse,
  t: Dictionary,
): CourseCurriculumModule[] {
  const copy = t.courseDetail;

  if (course.type === "servicePrep") {
    return SERVICE_PREP_MODULE_KEYS.map((key) => {
      const moduleCopy = copy.curriculum.servicePrep[key];
      const lessonKeys = SERVICE_PREP_LESSONS[key];

      return {
        key,
        title: moduleCopy.title,
        body: moduleCopy.body,
        lessons: lessonKeys.map((lessonKey) => {
          const lessons = moduleCopy.lessons as Record<string, string>;
          return { key: lessonKey, title: lessons[lessonKey] };
        }),
      };
    });
  }

  if (course.civicKey && isCivicCurriculumKey(course.civicKey)) {
    const structure = CIVIC_CURRICULUM[course.civicKey];
    const civicCopy = copy.curriculum.civic[course.civicKey];

    return (
      Object.entries(structure) as Array<[string, readonly string[]]>
    ).map(([moduleKey, lessonKeys]) => {
      const moduleCopy = civicCopy[moduleKey as keyof typeof civicCopy] as {
        title: string;
        body: string;
        lessons: Record<string, string>;
      };

      return {
        key: moduleKey,
        title: moduleCopy.title,
        body: moduleCopy.body,
        lessons: lessonKeys.map((lessonKey) => ({
          key: lessonKey,
          title: moduleCopy.lessons[lessonKey],
        })),
      };
    });
  }

  return [];
}
