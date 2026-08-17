import { ROUTES } from "@/constants/routes";
import { getCourseCatalog } from "@/data/course-catalog";

export const CERTIFICATE_VERIFICATION_STATUS_KEYS = [
  "sampleRecorded",
] as const;

export type CertificateVerificationStatusKey =
  (typeof CERTIFICATE_VERIFICATION_STATUS_KEYS)[number];

export const CERTIFICATE_LEARNER_KEYS = ["amina"] as const;

export type CertificateLearnerKey = (typeof CERTIFICATE_LEARNER_KEYS)[number];

export type SampleCertificate = {
  id: string;
  courseSlug: string;
  learnerKey: CertificateLearnerKey;
  completedOn: string;
  verification: CertificateVerificationStatusKey;
};

/**
 * Sample earned-credential catalog for the certificates pages.
 * Not live enrolment records. Dates and IDs are demo fields.
 */
export const SAMPLE_EARNED_CERTIFICATES: readonly SampleCertificate[] = [
  {
    id: "cb-ssc-attestation-20260801",
    courseSlug: "ssc-certificate-attestation-prep",
    learnerKey: "amina",
    completedOn: "2026-08-01",
    verification: "sampleRecorded",
  },
  {
    id: "cb-transcript-attestation-20260722",
    courseSlug: "academic-transcript-attestation-prep",
    learnerKey: "amina",
    completedOn: "2026-07-22",
    verification: "sampleRecorded",
  },
  {
    id: "cb-character-certificate-20260718",
    courseSlug: "character-certificate-prep",
    learnerKey: "amina",
    completedOn: "2026-07-18",
    verification: "sampleRecorded",
  },
  {
    id: "cb-trade-licence-20260805",
    courseSlug: "trade-licence-preparation",
    learnerKey: "amina",
    completedOn: "2026-08-05",
    verification: "sampleRecorded",
  },
  {
    id: "cb-board-certificate-20260630",
    courseSlug: "board-certificate-copy-prep",
    learnerKey: "amina",
    completedOn: "2026-06-30",
    verification: "sampleRecorded",
  },
  {
    id: "cb-land-mutation-20260710",
    courseSlug: "land-mutation-preparation",
    learnerKey: "amina",
    completedOn: "2026-07-10",
    verification: "sampleRecorded",
  },
  {
    id: "cb-bank-solvency-20260808",
    courseSlug: "bank-solvency-letter-prep",
    learnerKey: "amina",
    completedOn: "2026-08-08",
    verification: "sampleRecorded",
  },
  {
    id: "cb-birth-certificate-20260812",
    courseSlug: "birth-certificate-preparation",
    learnerKey: "amina",
    completedOn: "2026-08-12",
    verification: "sampleRecorded",
  },
  {
    id: "cb-road-safety-20260803",
    courseSlug: "road-safety-habits",
    learnerKey: "amina",
    completedOn: "2026-08-03",
    verification: "sampleRecorded",
  },
  {
    id: "cb-community-facilitation-20260809",
    courseSlug: "community-facilitation",
    learnerKey: "amina",
    completedOn: "2026-08-09",
    verification: "sampleRecorded",
  },
];

export function certificateHref(id: string) {
  return `${ROUTES.certificates}/${id}`;
}

export function getEarnedCertificates() {
  return SAMPLE_EARNED_CERTIFICATES.filter((entry) => {
    const course = getCourseCatalog().find(
      (item) => item.slug === entry.courseSlug,
    );
    return course?.hasCertificate === true;
  });
}

export function getCertificateById(id: string) {
  return getEarnedCertificates().find((entry) => entry.id === id);
}

export function getCertificateByCourseSlug(courseSlug: string) {
  return getEarnedCertificates().find((entry) => entry.courseSlug === courseSlug);
}

export function formatCertificateDate(isoDate: string, locale: "en" | "bn") {
  return new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${isoDate}T00:00:00`));
}
