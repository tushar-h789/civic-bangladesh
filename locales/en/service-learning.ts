import type { TranslationShape } from "@/locales/types";

export const serviceLearning = {
  title: "How this service and course fit together",
  promise:
    "This course shows you how to prepare for this government service.",
  youAreHere: "You are here",
  disclaimer:
    "Civic Bangladesh helps you prepare. Apply on the official portal — we do not process the application.",
  certificateNote:
    "The certificate is a Civic Bangladesh learning certificate, not a government certificate.",
  pair: {
    service: "Government service",
    course: "Learning course",
  },
  steps: {
    service: {
      title: "Government service",
      body: "The official service you are getting ready for.",
    },
    know: {
      title: "What you need to know",
      body: "Which papers, which steps, and which mistakes to avoid.",
    },
    course: {
      title: "This course",
      body: "A short Civic Bangladesh course. It is not a government class.",
    },
    assessment: {
      title: "A short check",
      body: "See if you understood how to prepare.",
    },
    certificate: {
      title: "Certificate",
      body: "A Civic Bangladesh learning certificate — not a government one.",
    },
  },
  cta: {
    viewService: "View service",
    startCourse: "Start course",
  },
  related: {
    title: "Related services",
    description:
      "Other services in this sample catalog that also have a preparation course.",
  },
  search: {
    group: "Service learning",
  },
} as const;

export type ServiceLearningTranslations = TranslationShape<
  typeof serviceLearning
>;
