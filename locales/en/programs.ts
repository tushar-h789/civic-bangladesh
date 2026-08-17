import type { TranslationShape } from "@/locales/types";

export const programs = {
  sampleNote:
    "Sample program page. This is not a live enrolment, not a government mandate, and not a purchase.",
  noPurchase:
    "There is no package to buy on this page. When a program is offered for real, Civic Bangladesh will discuss it calmly — without a checkout here.",
  pricingCta: "How we price courses",
  civicCta: "See free civic lessons",
  schools: {
    eyebrow: "Schools",
    title: "Civic learning a class can use",
    description:
      "Short lessons and civic challenges for teachers. Core civic education stays free. A school program is an optional extra, not a government requirement.",
    heroImageAlt: "Families walking a calm neighborhood street in the evening",
    usefulnessTitle: "What a class can do with this",
    usefulness: {
      lessons: "Use free civic lessons on habits, roads, and shared places.",
      challenges: "Practice small civic challenges together, without a game layer.",
      prep: "If older students need a government service later, point them to a preparation course — they still apply on the official portal.",
    },
    notThisTitle: "What this is not",
    notThis: {
      mandate: "Not a ministry curriculum or an official school circular.",
      shop: "Not a store for textbooks, kits, or government forms.",
      payment: "Not a place to pay school fees or course bundles.",
    },
  },
  organizations: {
    eyebrow: "Organizations",
    title: "Civic learning for a team",
    description:
      "Materials a workplace, NGO, or CSR program can share. This is Civic Bangladesh learning — not an official government partnership.",
    heroImageAlt: "People waiting calmly in a public queue",
    usefulnessTitle: "What a team can use",
    usefulness: {
      shared: "Share the same civic lessons the public already sees.",
      servicePrep:
        "Offer affordable government-service preparation courses as study, not as an application desk.",
      package:
        "Ask later about an institutional learning path for a group. Fees would be discussed when that offering is real.",
    },
    notThisTitle: "What this is not",
    notThis: {
      partnership: "Not a confirmed government partnership or tender.",
      csrSeal: "Not an official CSR certificate from any ministry.",
      checkout: "Not a cart for seats, licences, or sponsorship slots.",
    },
    csr: {
      title: "CSR programs",
      body: "A CSR team can support civic learning or a public campaign. Support is a conversation, not a product added at checkout.",
    },
    institutional: {
      title: "Institutional learning packages",
      body: "A sample idea for a school, NGO, or workplace that wants a shared path. It would reuse public courses — not a private government channel.",
    },
  },
} as const;

export type ProgramsTranslations = TranslationShape<typeof programs>;
