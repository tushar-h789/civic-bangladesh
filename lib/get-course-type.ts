import type { CourseTypeKey } from "@/data/course-types";
import type { Dictionary } from "@/locales";

export function getCourseTypeCopy(type: CourseTypeKey, t: Dictionary) {
  return t.courseTypes[type];
}

export function getCourseTypeLabel(type: CourseTypeKey, t: Dictionary) {
  return t.courseTypes[type].label;
}

export function getCourseTypePurpose(type: CourseTypeKey, t: Dictionary) {
  return t.courseTypes[type].purpose;
}

export function getCourseTypeExamples(type: CourseTypeKey, t: Dictionary) {
  return Object.values(t.courseTypes[type].examples);
}
