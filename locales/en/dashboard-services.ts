import type { TranslationShape } from "@/locales/types";

export const dashboardServices = {
  eyebrow: "My services",
  title: "Service learning tracker",
  description:
    "Track the government services you are learning about on Civic Bangladesh. This page records preparation — not an official application.",
  sampleNote:
    "Sample tracker for one learner. Saved lists, views, and course progress are demo fields — not a live account.",
  jump: {
    label: "On this page",
    saved: "Saved services",
    recent: "Recently viewed",
    enrolled: "Enrolled courses",
    preparation: "Preparation status",
    certificates: "Related certificates",
  },
  distinction: {
    learningTitle: "Learning status",
    learningBody:
      "How far you have prepared on Civic Bangladesh: saved, learning, ready to apply, or course completed. This is our sample learning record.",
    officialTitle: "Official application status",
    officialBody:
      "Civic Bangladesh is not connected to a government application API. We cannot show whether you applied, paid, or received a result. Confirm that on the official portal.",
    officialLabel: "Not connected",
    officialHint: "No government API is connected. This is not an application tracker.",
  },
  status: {
    label: "Learning status",
    officialLabel: "Official application status",
    saved: "Saved",
    learning: "Learning",
    readyToApply: "Ready to apply",
    completedCourse: "Completed course",
    notConnected: "Not connected",
  },
  stats: {
    saved: "{count} saved",
    learning: "{count} learning",
    ready: "{count} ready to apply",
  },
  saved: {
    title: "Saved services",
    description:
      "Services you kept for later. Saving here does not start a government application.",
    emptyTitle: "No saved services in this sample",
    emptyDescription: "Open a service page and keep it here when that control exists.",
    view: "View service",
  },
  recent: {
    title: "Recently viewed",
    description: "Services opened in this sample journey. Dates are demo fields.",
    viewedOn: "Viewed {date} (sample)",
    emptyTitle: "No recently viewed services",
    emptyDescription: "Services you open can appear here as a sample history.",
  },
  enrolled: {
    title: "Enrolled service courses",
    description:
      "Civic Bangladesh courses linked to a government service. Course progress is ours — not a government enrolment.",
    lessons: "{completed} of {total} lessons",
    continue: "Continue",
    review: "Review",
    emptyTitle: "No enrolled service courses",
    emptyDescription: "Start a preparation course from a service page.",
  },
  preparation: {
    title: "Application preparation status",
    description:
      "Your Civic Bangladesh learning status beside official application status. Only the learning column can change here.",
    service: "Service",
    course: "Related course",
    apply: "Apply on Official Portal",
    learn: "Continue learning",
    emptyTitle: "No services in this tracker",
    emptyDescription: "Save a service or start a course to track preparation.",
  },
  certificates: {
    title: "Related certificates",
    description:
      "Civic Bangladesh learning credentials for services in this tracker. They are not government certificates.",
    civicCourse: "Civic education course",
    view: "View certificate",
    viewAll: "All certificates",
    emptyTitle: "No related certificates in this sample",
    emptyDescription:
      "Complete a service course that includes a Civic Bangladesh learning credential.",
  },
  cta: {
    browse: "Browse services",
  },
} as const;

export type DashboardServicesTranslations = TranslationShape<
  typeof dashboardServices
>;
