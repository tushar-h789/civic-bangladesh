import type { TranslationShape } from "@/locales/types";

export const pricing = {
  title: "Clear fees. Useful learning.",
  description:
    "Civic Bangladesh stays affordable. Core civic education is free. Paid products help you prepare — they are not government fees, and nothing is sold with pressure.",
  sampleNote:
    "Sample pricing page. Listed amounts are Civic Bangladesh catalog course fees — not government fees, and not a live payment.",
  heroImageAlt:
    "People learning together how to prepare papers for a government service",
  jump: {
    label: "On this page",
    values: "How we price",
    primary: "Main paid product",
    secondary: "Other offerings",
  },
  values: {
    title: "How we price",
    description:
      "The fee should be easy to understand before you start. Usefulness comes first. There is no countdown, no bundle trap, and no payment on this site yet.",
    lowCost: {
      title: "Low-cost",
      body: "Paid courses are kept in a small Taka range so a citizen can prepare without a heavy extra cost.",
    },
    transparent: {
      title: "Transparent",
      body: "The course fee is listed in Taka, on the course. Government office fees are separate and only shown when an official source exists.",
    },
    citizenFriendly: {
      title: "Citizen-friendly",
      body: "You can read what is included, what is free, and what still happens on the official portal — in plain language.",
    },
    noUpsell: {
      title: "No aggressive upselling",
      body: "We do not push extras, fake scarcity, or a second product on the way to a lesson. If a paid course is useful, you can choose it.",
    },
  },
  never: {
    title: "What you never pay Civic Bangladesh for",
    items: {
      governmentFee: "A government application fee or stamp.",
      officialResult: "An official result, licence, or attestation.",
      coreCivic: "Core civic education — that stays free.",
    },
  },
  paymentNote:
    "Civic Bangladesh does not take payments on this website yet. There is no checkout to complete, and no sample transaction to confirm.",
  range: {
    label: "Sample catalog fees",
    value: "৳{min}–৳{max}",
    hint: "{count} paid courses in this sample catalog. Fertilizer support preparation is free in the same list.",
  },
  products: {
    servicePrep: {
      title: "Affordable government service preparation courses",
      description:
        "Our main paid product. Short videos, document checklists, and a practice assessment so you can prepare for one government service — then apply on the official portal.",
      usefulness:
        "You leave knowing which papers to keep ready, which mistakes delay a file, and where the official application happens.",
      cta: "Browse preparation courses",
    },
    civicPremium: {
      title: "Civic premium courses",
      description:
        "Extra depth for teachers and organisers, on top of free civic lessons. Premium does not lock everyday civic education.",
      usefulness:
        "Use it when you need to run a session with a group — not to unlock basic civic sense.",
      cta: "See civic learning",
    },
    certificateServices: {
      title: "Certificate-related learning",
      description:
        "Civic Bangladesh learning credentials, and preparation for government certificate services, only where this catalog already supports them. We do not sell a government stamp.",
      usefulness:
        "A course credential records that you completed preparation here. It is not an official certificate.",
      cta: "View sample credentials",
    },
    institutional: {
      title: "Institutional learning packages",
      description:
        "A sample offering for a school, NGO, or workplace that wants a structured civic or service-learning path. Fees are discussed when a program is real.",
      usefulness:
        "A shared plan for a group, using the same courses and materials citizens already see — not a private government channel.",
      cta: "Read about organization programs",
    },
    schools: {
      title: "School programs",
      description:
        "Short civic lessons and challenges a teacher can use with a class. Core civic education stays free.",
      usefulness:
        "A classroom can practice everyday habits without buying a game or a government kit.",
      cta: "Explore school programs",
    },
    organizations: {
      title: "Organization programs",
      description:
        "Civic learning for teams, NGOs, and CSR programs. This is not an official government partnership.",
      usefulness:
        "A workplace can share the same civic materials the public uses, without a sales pitch on every page.",
      cta: "Explore organization programs",
    },
    campaigns: {
      title: "Campaign partnerships",
      description:
        "Civic campaigns people can join for free. A partnership would support awareness — it is not a paid boost sold on this page.",
      usefulness:
        "Join a public habit campaign, or read how an organization could support one later. No sponsorship checkout.",
      cta: "See campaigns",
    },
  },
  primary: {
    badge: "Primary",
    feeLabel: "Sample course fees",
  },
  secondary: {
    title: "Also available, without pressure",
    description:
      "These sit beside the main preparation courses. None of them replace free civic education, and none of them process a government application.",
    badge: "Secondary",
  },
} as const;

export type PricingTranslations = TranslationShape<typeof pricing>;
