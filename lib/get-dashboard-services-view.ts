import { catalogCourseHref, learnCourseHref } from "@/data/civic-courses";
import {
  OFFICIAL_APPLICATION_STATUS,
  SAMPLE_SERVICE_TRACKER,
  type OfficialApplicationStatus,
  type ServiceLearningStatus,
} from "@/data/dashboard-services";
import { getCatalogCourseBySlug, type CatalogCourse } from "@/data/course-catalog";
import {
  getServiceByKey,
  serviceHref,
  type SampleGovernmentService,
  type SampleServiceKey,
} from "@/data/government-services";
import { getCourseCopy } from "@/lib/get-course-copy";
import { getDashboardCourses, getDashboardCertificates } from "@/lib/get-dashboard-view";
import { getCertificateView, type CertificateView } from "@/lib/get-certificate-view";
import type { Dictionary } from "@/locales";
import type { Locale } from "@/locales/types";

export type TrackedServiceView = {
  service: SampleGovernmentService;
  title: string;
  href: string;
  categoryTitle: string;
  learningStatus: ServiceLearningStatus;
  officialStatus: OfficialApplicationStatus;
  courseTitle: string | null;
  courseHref: string | null;
  learnHref: string | null;
};

export type RecentServiceView = {
  service: SampleGovernmentService;
  title: string;
  href: string;
  viewedOn: string;
  viewedOnLabel: string;
  learningStatus: ServiceLearningStatus | null;
};

export type EnrolledServiceCourseView = {
  course: CatalogCourse;
  title: string;
  href: string;
  learnHref: string;
  serviceTitle: string | null;
  serviceHref: string | null;
  status: "current" | "completed";
  completedLessons: number;
  totalLessons: number;
  percent: number;
  learningStatus: ServiceLearningStatus | null;
};

function formatViewedOn(isoDate: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${isoDate}T00:00:00`));
}

function toTrackedService(
  key: SampleServiceKey,
  t: Dictionary,
  learningStatus: ServiceLearningStatus,
): TrackedServiceView | null {
  const service = getServiceByKey(key);
  if (!service) return null;

  const course = service.course
    ? getCatalogCourseBySlug(service.course.slug)
    : null;
  const courseCopy = course ? getCourseCopy(course, t) : null;

  return {
    service,
    title: t.services.items[service.key].title,
    href: serviceHref(service.slug),
    categoryTitle: t.services.categoryItems[service.category].title,
    learningStatus,
    officialStatus: OFFICIAL_APPLICATION_STATUS,
    courseTitle: courseCopy?.title ?? null,
    courseHref: course ? catalogCourseHref(course.slug) : null,
    learnHref: course ? learnCourseHref(course.slug) : null,
  };
}

export function getSavedServices(t: Dictionary) {
  return SAMPLE_SERVICE_TRACKER.savedKeys.flatMap((key) => {
    const status = SAMPLE_SERVICE_TRACKER.learningByService[key] ?? "saved";
    const view = toTrackedService(key, t, status);
    return view ? [view] : [];
  });
}

export function getRecentlyViewedServices(t: Dictionary, locale: Locale) {
  return SAMPLE_SERVICE_TRACKER.recentlyViewed.flatMap((entry) => {
    const service = getServiceByKey(entry.serviceKey);
    if (!service) return [];

    const learningStatus =
      entry.serviceKey in SAMPLE_SERVICE_TRACKER.learningByService
        ? SAMPLE_SERVICE_TRACKER.learningByService[
            entry.serviceKey as keyof typeof SAMPLE_SERVICE_TRACKER.learningByService
          ]
        : null;

    return [
      {
        service,
        title: t.services.items[service.key].title,
        href: serviceHref(service.slug),
        viewedOn: entry.viewedOn,
        viewedOnLabel: formatViewedOn(entry.viewedOn, locale),
        learningStatus,
      } satisfies RecentServiceView,
    ];
  });
}

export function getEnrolledServiceCourses(t: Dictionary): EnrolledServiceCourseView[] {
  const enrolled = new Set<string>(SAMPLE_SERVICE_TRACKER.enrolledCourseSlugs);
  const learningByService = SAMPLE_SERVICE_TRACKER.learningByService;

  return getDashboardCourses(t).flatMap((item) => {
    if (!item.isServicePrep || !enrolled.has(item.course.slug)) return [];

    const serviceKey = item.course.relatedServiceKey;
    const learningStatus =
      serviceKey && serviceKey in learningByService
        ? learningByService[serviceKey as keyof typeof learningByService]
        : null;

    return [
      {
        course: item.course,
        title: item.title,
        href: item.href,
        learnHref: item.learnHref,
        serviceTitle: item.relatedServiceTitle,
        serviceHref: item.relatedServiceHref,
        status: item.status,
        completedLessons: item.completedLessons,
        totalLessons: item.totalLessons,
        percent: item.percent,
        learningStatus,
      },
    ];
  });
}

export function getPreparationServices(t: Dictionary) {
  return (
    Object.entries(SAMPLE_SERVICE_TRACKER.learningByService) as Array<
      [SampleServiceKey, ServiceLearningStatus]
    >
  ).flatMap(([key, status]) => {
    const view = toTrackedService(key, t, status);
    return view ? [view] : [];
  });
}

export function getRelatedServiceCertificates(
  t: Dictionary,
  locale: Locale,
): CertificateView[] {
  return getDashboardCertificates().flatMap((entry) => {
    const view = getCertificateView(entry, t, locale);
    if (!view?.relatedService) return [];
    return [view];
  });
}

export function countLearningByStatus(t: Dictionary) {
  const rows = getPreparationServices(t);
  return {
    saved: rows.filter((row) => row.learningStatus === "saved").length,
    learning: rows.filter((row) => row.learningStatus === "learning").length,
    readyToApply: rows.filter((row) => row.learningStatus === "readyToApply")
      .length,
    completedCourse: rows.filter(
      (row) => row.learningStatus === "completedCourse",
    ).length,
  };
}
