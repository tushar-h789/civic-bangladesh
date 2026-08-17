import type { TranslationShape } from "@/locales/types";

export const dashboard = {
  eyebrow: "Dashboard",
  title: "Your learning",
  greeting: "Hello, {name}",
  description:
    "Civic learning and government-service preparation in one place. Civic Bangladesh helps you learn. It does not process government applications.",
  sampleNote:
    "Sample dashboard for one learner. Progress, scores, and badges are demo fields — not a live account.",
  lanes: {
    service: "Government service learning",
    civic: "Civic learning",
    both: "Civic and service learning",
  },
  jump: {
    label: "On this page",
    continue: "Continue learning",
    services: "My services",
    courses: "Course progress",
    assessments: "Assessments",
    certificates: "Certificates",
    civic: "Civic progress",
  },
  nav: {
    overview: "Your learning",
    services: "My services",
  },
  stats: {
    continue: "{count} service courses in progress",
    services: "{count} services",
    score: "Civic Score {score}",
  },
  continue: {
    eyebrow: "Government service learning",
    title: "Continue learning",
    description:
      "Service courses you have started. Finish the lessons here, then apply on the official portal.",
    lessons: "{completed} of {total} lessons",
    cta: "Continue",
    emptyTitle: "No service course in progress",
    emptyDescription:
      "Open a government service with a preparation course when you are ready to start.",
    browse: "Browse services",
  },
  services: {
    eyebrow: "Government service learning",
    title: "My services",
    description:
      "Government services you are learning about. This is preparation, not an application list.",
    learning: "Learning",
    prepared: "Prepared",
    course: "Course",
    view: "View service",
    viewAll: "Track all services",
    emptyTitle: "No services in this sample yet",
    emptyDescription: "Start a service preparation course to see it here.",
  },
  courses: {
    eyebrow: "Civic and service learning",
    title: "Course progress",
    description:
      "Current and completed Civic Bangladesh courses. Service courses prepare you for a government service. Civic courses teach everyday habits.",
    current: "In progress",
    completed: "Completed",
    service: "Service course",
    civic: "Civic course",
    lessons: "{completed} of {total} lessons",
    ctaCurrent: "Continue",
    ctaCompleted: "Review",
    emptyTitle: "No course progress in this sample",
    emptyDescription: "Browse courses to start learning.",
    browse: "Browse courses",
  },
  assessments: {
    eyebrow: "Civic and service learning",
    title: "Assessments",
    description:
      "Short checks at the end of a course. They confirm preparation, not a government result.",
    pending: "Pending",
    passed: "Passed",
    score: "{correct} of {total}",
    ctaPending: "Take assessment",
    ctaPassed: "Review course",
    emptyTitle: "No assessments in this sample",
    emptyDescription: "Assessments appear when a course includes one.",
  },
  certificates: {
    eyebrow: "Civic Bangladesh credentials",
    title: "Certificates",
    description:
      "Learning credentials you have earned here. They are not government certificates.",
    viewAll: "All certificates",
    emptyTitle: "No certificates in this sample",
    emptyDescription:
      "Complete a course that includes a Civic Bangladesh learning credential.",
  },
  civic: {
    eyebrow: "Civic learning",
    title: "Civic progress",
    description:
      "Habits, challenges, and a sample Civic Score. This is not a grade on your character.",
    scoreTitle: "Civic Score",
    challengeTitle: "30-day challenge",
    challengeProgress: "Day {current} of {total}",
    challengeKept: "{count} days kept in this sample",
    challengeCta: "Continue the challenge",
    badgesTitle: "Badges",
    badgesNote: "Civic Bangladesh participation badges — not government awards.",
    badges: {
      firstHabit: {
        title: "First habit",
        body: "Started the 30-day challenge.",
      },
      queueKeeper: {
        title: "Queue keeper",
        body: "Kept a shared-line habit.",
      },
      servicePrep: {
        title: "Service prep",
        body: "Started a government-service course.",
      },
      scoreBuilder: {
        title: "Score builder",
        body: "Reached a sample Civic Score of 80.",
      },
    },
  },
} as const;

export type DashboardTranslations = TranslationShape<typeof dashboard>;
