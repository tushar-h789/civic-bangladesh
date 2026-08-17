/**
 * Canonical course types for Civic Bangladesh.
 * Civic courses teach everyday civic habits.
 * Service courses teach preparation for a government service.
 * Visual labels live in locales; this file owns the keys and helpers.
 */
export const COURSE_TYPE_KEYS = ["civic", "servicePrep"] as const;

export type CourseTypeKey = (typeof COURSE_TYPE_KEYS)[number];

export function isCivicCourseType(type: CourseTypeKey) {
  return type === "civic";
}

export function isServiceCourseType(type: CourseTypeKey) {
  return type === "servicePrep";
}

export function isCourseTypeKey(value: string): value is CourseTypeKey {
  return (COURSE_TYPE_KEYS as readonly string[]).includes(value);
}

export function courseTypeFromRelatedService(
  relatedServiceKey: string | null | undefined,
): CourseTypeKey {
  return relatedServiceKey ? "servicePrep" : "civic";
}
