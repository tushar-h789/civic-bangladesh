import { catalogCourseHref, learnCourseHref } from "@/data/civic-courses";
import { SAMPLE_CIVIC_SCORE } from "@/data/civic-score";
import { THIRTY_DAY_CHALLENGE } from "@/data/civic-challenge";
import {
  getCertificateById,
  type SampleCertificate,
} from "@/data/certificates";
import {
  CIVIC_ASSESSMENT_QUESTION_KEYS,
  SERVICE_ASSESSMENT_QUESTION_KEYS,
} from "@/data/course-assessment";
import { getCatalogCourseBySlug, type CatalogCourse } from "@/data/course-catalog";
import {
  getServiceByKey,
  getServiceBySlug,
  serviceHref,
  type SampleGovernmentService,
} from "@/data/government-services";
import {
  SAMPLE_LEARNER_DASHBOARD,
  type DashboardAssessment,
  type DashboardAssessmentStatus,
  type DashboardBadgeKey,
  type DashboardCourseProgress,
  type DashboardCourseStatus,
  type DashboardServiceFollow,
  type DashboardServiceStatus,
} from "@/data/learner-dashboard";
import { getCourseCopy } from "@/lib/get-course-copy";
import type { Dictionary } from "@/locales";

export type DashboardCourseView = {
  progress: DashboardCourseProgress;
  course: CatalogCourse;
  title: string;
  href: string;
  learnHref: string;
  status: DashboardCourseStatus;
  completedLessons: number;
  totalLessons: number;
  percent: number;
  isServicePrep: boolean;
  relatedService: SampleGovernmentService | null;
  relatedServiceTitle: string | null;
  relatedServiceHref: string | null;
};

export type DashboardServiceView = {
  follow: DashboardServiceFollow;
  service: SampleGovernmentService;
  title: string;
  href: string;
  status: DashboardServiceStatus;
  courseTitle: string | null;
  courseHref: string | null;
};

export type DashboardAssessmentView = {
  entry: DashboardAssessment;
  title: string;
  href: string;
  status: DashboardAssessmentStatus;
  isServicePrep: boolean;
  correct: number | null;
  total: number;
};

export function getDashboardCourses(t: Dictionary): DashboardCourseView[] {
  return SAMPLE_LEARNER_DASHBOARD.courses.flatMap((progress) => {
    const view = toCourseView(progress, t);
    return view ? [view] : [];
  });
}

export function getContinueLearningCourses(t: Dictionary) {
  return getDashboardCourses(t).filter(
    (item) => item.status === "current" && item.isServicePrep,
  );
}

export function getDashboardServices(t: Dictionary): DashboardServiceView[] {
  return SAMPLE_LEARNER_DASHBOARD.services.flatMap((follow) => {
    const service = getServiceByKey(follow.serviceKey);
    if (!service) return [];

    const course = service.course
      ? getCatalogCourseBySlug(service.course.slug)
      : null;
    const courseCopy = course ? getCourseCopy(course, t) : null;

    return [
      {
        follow,
        service,
        title: t.services.items[service.key].title,
        href: serviceHref(service.slug),
        status: follow.status,
        courseTitle: courseCopy?.title ?? null,
        courseHref: course ? catalogCourseHref(course.slug) : null,
      },
    ];
  });
}

export function getDashboardAssessments(t: Dictionary): DashboardAssessmentView[] {
  return SAMPLE_LEARNER_DASHBOARD.assessments.flatMap((entry) => {
    const course = getCatalogCourseBySlug(entry.courseSlug);
    if (!course) return [];

    const copy = getCourseCopy(course, t);
    const isServicePrep = course.type === "servicePrep";
    const total = isServicePrep
      ? SERVICE_ASSESSMENT_QUESTION_KEYS.length
      : CIVIC_ASSESSMENT_QUESTION_KEYS.length;

    return [
      {
        entry,
        title: copy.title,
        href: learnCourseHref(course.slug),
        status: entry.status,
        isServicePrep,
        correct: entry.correct,
        total,
      },
    ];
  });
}

export function getDashboardCertificates(): SampleCertificate[] {
  return SAMPLE_LEARNER_DASHBOARD.certificateIds.flatMap((id) => {
    const entry = getCertificateById(id);
    return entry ? [entry] : [];
  });
}

export function getDashboardBadges(): readonly DashboardBadgeKey[] {
  return SAMPLE_LEARNER_DASHBOARD.badges;
}

export function getDashboardCivicSnapshot() {
  return {
    score: SAMPLE_CIVIC_SCORE,
    challenge: THIRTY_DAY_CHALLENGE,
    keptDays: THIRTY_DAY_CHALLENGE.completedDays.length,
  };
}

function toCourseView(
  progress: DashboardCourseProgress,
  t: Dictionary,
): DashboardCourseView | null {
  const course = getCatalogCourseBySlug(progress.courseSlug);
  if (!course) return null;

  const copy = getCourseCopy(course, t);
  const relatedService = course.relatedServiceSlug
    ? (getServiceBySlug(course.relatedServiceSlug) ?? null)
    : null;
  const totalLessons = course.lessons;
  const completedLessons =
    progress.status === "completed"
      ? totalLessons
      : Math.min(progress.completedLessons, totalLessons);
  const percent =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  return {
    progress,
    course,
    title: copy.title,
    href: catalogCourseHref(course.slug),
    learnHref: learnCourseHref(course.slug),
    status: progress.status,
    completedLessons,
    totalLessons,
    percent,
    isServicePrep: course.type === "servicePrep",
    relatedService,
    relatedServiceTitle: relatedService
      ? t.services.items[relatedService.key].title
      : null,
    relatedServiceHref: relatedService ? serviceHref(relatedService.slug) : null,
  };
}
