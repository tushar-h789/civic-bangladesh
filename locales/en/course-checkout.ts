import type { TranslationShape } from "@/locales/types";

export const courseCheckout = {
  sampleBadge: "Sample preview",
  sampleNote:
    "No money is taken on this page. This is a Civic Bangladesh catalog preview — not a government payment, and not a live checkout.",
  title: "What this course includes",
  freeTitle: "Start this free course",
  description:
    "See the Civic Bangladesh course fee and what you get. You can open the sample lessons without paying on this site.",
  freeDescription:
    "This course has no Civic Bangladesh fee. Open the first lesson when you are ready. Any government application still happens on the official portal.",
  order: "Course",
  fee: "Civic Bangladesh course fee",
  notCharged: "On this website",
  chargedHere: "No payment",
  includesTitle: "What you can use",
  notIncludedTitle: "What this is not",
  notIncluded: {
    governmentFee: "Not a government application fee.",
    officialClass: "Not an official government class.",
    portal: "Not a place to submit the application.",
  },
  lessons: "{count} video lessons",
  quiz: "Practice quiz",
  assessment: "Final assessment",
  certificate: "Civic Bangladesh learning credential",
  noCertificate: "No course certificate in this catalog item",
  openLessons: "Open the sample lessons",
  startFree: "Open the first lesson",
  opening: "Opening the first lesson…",
  pricingCta: "How we price courses",
  philosophy:
    "Fees stay low and listed in Taka. Core civic education stays free. Nothing is added to the cart on the way to a lesson.",
} as const;

export type CourseCheckoutTranslations = TranslationShape<typeof courseCheckout>;
