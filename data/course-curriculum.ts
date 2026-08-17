import type { FeaturedCourseKey } from "@/data/civic-courses";

export const SERVICE_PREP_MODULE_KEYS = [
  "aboutService",
  "documents",
  "fillForm",
  "upload",
  "submitTrack",
  "mistakes",
] as const;

export type ServicePrepModuleKey = (typeof SERVICE_PREP_MODULE_KEYS)[number];

export const SERVICE_PREP_LESSONS = {
  aboutService: ["whatItIs", "whoItIsFor"],
  documents: ["checklist", "formats"],
  fillForm: ["matchNames", "readFields"],
  upload: ["scanClear", "fileSize"],
  submitTrack: ["submitOfficial", "saveNumber"],
  mistakes: ["commonErrors"],
} as const satisfies Record<ServicePrepModuleKey, readonly string[]>;

export const CIVIC_CURRICULUM = {
  everydayCivic: {
    habits: ["street", "queue"],
    places: ["park", "shared"],
    responsibility: ["smallActs"],
    practice: ["daily"],
  },
  roadSafety: {
    crossing: ["look", "useCrossing"],
    waiting: ["patience"],
    lookingOut: ["others"],
    practice: ["habit"],
  },
  communityFacilitation: {
    prepare: ["plan", "materials"],
    runSession: ["welcome", "pace"],
    includeAll: ["voices"],
    followUp: ["nextStep"],
  },
} as const;

export type CivicCurriculumKey = keyof typeof CIVIC_CURRICULUM;

export const COURSE_INCLUDE_KEYS = [
  "video",
  "guide",
  "examples",
  "assessment",
  "certificate",
] as const;

export type CourseIncludeKey = (typeof COURSE_INCLUDE_KEYS)[number];

export const SERVICE_PREP_OUTCOME_KEYS = [
  "understand",
  "papers",
  "names",
  "upload",
  "submit",
  "mistakes",
] as const;

export function isCivicCurriculumKey(
  key: FeaturedCourseKey,
): key is CivicCurriculumKey {
  return key in CIVIC_CURRICULUM;
}
