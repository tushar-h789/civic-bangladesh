import type { TranslationShape } from "@/locales/types";

export const serviceLearning = {
  eyebrow: "Service learning",
  title: "Government Service → Learning Course",
  promise:
    "This course teaches you how to prepare for this specific government service.",
  disclaimer:
    "Civic Bangladesh prepares you. Apply on the official portal — we do not process the application.",
  certificateNote:
    "The certificate is a Civic Bangladesh learning credential, not a government certificate.",
  pair: {
    service: "Government Service",
    course: "Learning Course",
  },
  steps: {
    service: {
      title: "Government Service",
      body: "The official service you are getting ready for.",
    },
    know: {
      title: "What you need to know",
      body: "Papers, steps, and common mistakes — for preparation.",
    },
    course: {
      title: "Video Course",
      body: "A short Civic Bangladesh course. Not a government class.",
    },
    assessment: {
      title: "Assessment",
      body: "Check that you understood how to prepare.",
    },
    certificate: {
      title: "Certificate",
      body: "A Civic Bangladesh learning credential.",
    },
  },
  cta: {
    viewService: "View service",
    startCourse: "Start Course",
  },
  related: {
    title: "Related services",
    description:
      "Other sample catalog services that have a matching preparation course.",
  },
  search: {
    group: "Service learning",
  },
} as const;

export type ServiceLearningTranslations = TranslationShape<
  typeof serviceLearning
>;
