import type { TranslationShape } from "@/locales/types";

export const courseTypes = {
  civic: {
    label: "Civic Learning",
    purpose: "Teach civic awareness and responsible behavior.",
    examplesLabel: "Examples",
    examples: {
      roadSafety: "Road Safety",
      cleanCity: "Clean City",
      environment: "Environmental Responsibility",
      digital: "Digital Citizenship",
    },
  },
  servicePrep: {
    label: "Government service learning",
    purpose:
      "Teach citizens how to prepare for a specific government service.",
    examplesLabel: "Examples",
    examples: {
      ssc: "SSC Certificate Attestation",
      btrc: "BTRC Application Preparation",
      nid: "NID Attestation",
      driving: "Driving License Attestation",
    },
  },
} as const;

export type CourseTypesTranslations = TranslationShape<typeof courseTypes>;
