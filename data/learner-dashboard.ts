import { ASSESSMENT_PASS_COUNT } from "@/data/course-assessment";
import type { CertificateLearnerKey } from "@/data/certificates";
import type { SampleServiceKey } from "@/data/government-services";

export const DASHBOARD_COURSE_STATUS_KEYS = ["current", "completed"] as const;

export type DashboardCourseStatus =
  (typeof DASHBOARD_COURSE_STATUS_KEYS)[number];

export const DASHBOARD_ASSESSMENT_STATUS_KEYS = ["pending", "passed"] as const;

export type DashboardAssessmentStatus =
  (typeof DASHBOARD_ASSESSMENT_STATUS_KEYS)[number];

export const DASHBOARD_SERVICE_STATUS_KEYS = ["learning", "prepared"] as const;

export type DashboardServiceStatus =
  (typeof DASHBOARD_SERVICE_STATUS_KEYS)[number];

export const DASHBOARD_BADGE_KEYS = [
  "firstHabit",
  "queueKeeper",
  "servicePrep",
  "scoreBuilder",
] as const;

export type DashboardBadgeKey = (typeof DASHBOARD_BADGE_KEYS)[number];

export type DashboardCourseProgress = {
  courseSlug: string;
  status: DashboardCourseStatus;
  completedLessons: number;
};

export type DashboardAssessment = {
  courseSlug: string;
  status: DashboardAssessmentStatus;
  correct: number | null;
};

export type DashboardServiceFollow = {
  serviceKey: SampleServiceKey;
  status: DashboardServiceStatus;
};

/**
 * Sample learner snapshot for the dashboard. Progress, assessments,
 * and badges are demo fields — not a live account.
 */
export const SAMPLE_LEARNER_DASHBOARD = {
  learnerKey: "amina" as CertificateLearnerKey,
  courses: [
    {
      courseSlug: "fertilizer-support-prep",
      status: "current",
      completedLessons: 2,
    },
    {
      courseSlug: "bank-solvency-letter-prep",
      status: "current",
      completedLessons: 3,
    },
    {
      courseSlug: "everyday-civic-sense",
      status: "current",
      completedLessons: 5,
    },
    {
      courseSlug: "ssc-certificate-attestation-prep",
      status: "completed",
      completedLessons: 6,
    },
    {
      courseSlug: "character-certificate-prep",
      status: "completed",
      completedLessons: 4,
    },
    {
      courseSlug: "road-safety-habits",
      status: "completed",
      completedLessons: 10,
    },
  ] satisfies readonly DashboardCourseProgress[],
  services: [
    { serviceKey: "fertilizerSupport", status: "learning" },
    { serviceKey: "bankSolvency", status: "learning" },
    { serviceKey: "sscAttestation", status: "prepared" },
    { serviceKey: "characterCertificate", status: "prepared" },
  ] satisfies readonly DashboardServiceFollow[],
  assessments: [
    { courseSlug: "fertilizer-support-prep", status: "pending", correct: null },
    {
      courseSlug: "bank-solvency-letter-prep",
      status: "pending",
      correct: null,
    },
    { courseSlug: "everyday-civic-sense", status: "pending", correct: null },
    {
      courseSlug: "ssc-certificate-attestation-prep",
      status: "passed",
      correct: 5,
    },
    {
      courseSlug: "character-certificate-prep",
      status: "passed",
      correct: 5,
    },
    { courseSlug: "road-safety-habits", status: "passed", correct: 4 },
  ] satisfies readonly DashboardAssessment[],
  certificateIds: [
    "cb-ssc-attestation-20260801",
    "cb-character-certificate-20260718",
    "cb-road-safety-20260803",
  ] as const,
  badges: [
    "firstHabit",
    "queueKeeper",
    "servicePrep",
    "scoreBuilder",
  ] satisfies readonly DashboardBadgeKey[],
} as const;

export const DASHBOARD_PASS_COUNT = ASSESSMENT_PASS_COUNT;
