import type { SampleServiceKey } from "@/data/government-services";

export const SERVICE_LEARNING_STATUS_KEYS = [
  "saved",
  "learning",
  "readyToApply",
  "completedCourse",
] as const;

export type ServiceLearningStatus =
  (typeof SERVICE_LEARNING_STATUS_KEYS)[number];

/**
 * Official application tracking is not available until a real government
 * API is connected. Do not invent submitted/under-review states.
 */
export const OFFICIAL_APPLICATION_STATUS = "notConnected" as const;

export type OfficialApplicationStatus = typeof OFFICIAL_APPLICATION_STATUS;

export type RecentlyViewedService = {
  serviceKey: SampleServiceKey;
  viewedOn: string;
};

/**
 * Sample service-tracking snapshot for /dashboard/services.
 * Learning status is Civic Bangladesh preparation only.
 */
export const SAMPLE_SERVICE_TRACKER = {
  savedKeys: ["landMutation", "tradeLicence"] as const satisfies readonly SampleServiceKey[],
  recentlyViewed: [
    { serviceKey: "sscAttestation", viewedOn: "2026-08-15" },
    { serviceKey: "fertilizerSupport", viewedOn: "2026-08-14" },
    { serviceKey: "birthCertificate", viewedOn: "2026-08-13" },
    { serviceKey: "bankSolvency", viewedOn: "2026-08-12" },
  ] as const satisfies readonly RecentlyViewedService[],
  enrolledCourseSlugs: [
    "fertilizer-support-prep",
    "bank-solvency-letter-prep",
    "ssc-certificate-attestation-prep",
    "character-certificate-prep",
  ] as const,
  learningByService: {
    landMutation: "saved",
    tradeLicence: "saved",
    fertilizerSupport: "learning",
    bankSolvency: "learning",
    sscAttestation: "readyToApply",
    characterCertificate: "completedCourse",
  } as const satisfies Record<string, ServiceLearningStatus>,
} as const;
