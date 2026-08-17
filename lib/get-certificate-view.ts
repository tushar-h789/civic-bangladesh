import { CERTIFICATE_ISSUING_AUTHORITY } from "@/data/certificate-authority";
import {
  formatCertificateDate,
  type SampleCertificate,
} from "@/data/certificates";
import { getCatalogCourseBySlug } from "@/data/course-catalog";
import { getServiceBySlug } from "@/data/government-services";
import { getCourseCopy } from "@/lib/get-course-copy";
import type { Dictionary } from "@/locales";
import type { Locale } from "@/locales/types";

export function getCertificateView(
  entry: SampleCertificate,
  t: Dictionary,
  locale: Locale,
) {
  const course = getCatalogCourseBySlug(entry.courseSlug);
  if (!course) return null;

  const courseCopy = getCourseCopy(course, t);
  const relatedService = course.relatedServiceSlug
    ? getServiceBySlug(course.relatedServiceSlug)
    : undefined;
  const relatedServiceTitle = relatedService
    ? t.services.items[relatedService.key].title
    : null;
  const authorityConfig = CERTIFICATE_ISSUING_AUTHORITY;
  const authorityCopy = t.certificates.authority[authorityConfig.localeKey];
  const verification = t.certificates.verification[entry.verification];

  return {
    entry,
    course,
    courseTitle: courseCopy.title,
    courseImageAlt: courseCopy.imageAlt,
    relatedService,
    relatedServiceTitle,
    learnerName: t.certificates.learners[entry.learnerKey],
    completedOnLabel: formatCertificateDate(entry.completedOn, locale),
    verification,
    authorityConfig,
    authorityCopy,
  };
}

export type CertificateView = NonNullable<ReturnType<typeof getCertificateView>>;
