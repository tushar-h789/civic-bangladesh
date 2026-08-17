import type { TranslationShape } from "@/locales/types";

export const help = {
  eyebrow: "Support",
  title: "Help using Civic Bangladesh",
  description:
    "Find the next page, learn how this site works, and know what we cannot do. This is Civic Bangladesh help — not a government helpdesk.",
  sampleNote:
    "No live chat, ticket queue, or ministry phone number is offered here. For an application, use the official government portal.",
  heroImageAlt:
    "People finding their way through a calm public place together",
  jump: {
    label: "On this page",
    start: "Start here",
    steps: "How to prepare",
    limits: "What we can help with",
    site: "Using this site",
    official: "Official portal",
  },
  notice: {
    title: "Not a government helpdesk",
    body: "Civic Bangladesh cannot change an application, quote an official fee, or speak for a ministry. We can show you where to learn, and where to apply.",
  },
  tasks: {
    eyebrow: "Start here",
    title: "What do you want to do?",
    description:
      "Open a Civic Bangladesh page. None of these submit a government file.",
    findService: {
      title: "Find a government service",
      body: "Browse the sample catalog, see papers to prepare, then apply on the official portal.",
      cta: "Open services",
    },
    startCourse: {
      title: "Start a course",
      body: "Short civic lessons, or affordable preparation for one government service.",
      cta: "Open courses",
    },
    civicLearning: {
      title: "Learn civic habits",
      body: "Everyday civic sense — roads, cleanliness, public space, and responsibility.",
      cta: "Open civic learning",
    },
    readFaq: {
      title: "Read common questions",
      body: "Short answers about this platform, courses, certificates, and sample catalogs.",
      cta: "Open FAQ",
    },
    seePricing: {
      title: "See course fees",
      body: "How Civic Bangladesh prices learning. Course fees are not government fees.",
      cta: "Open pricing",
    },
    tryChallenge: {
      title: "Practice a challenge",
      body: "Small civic habits in real places, or quiet learning tasks on this site.",
      cta: "Open challenges",
    },
  },
  steps: {
    eyebrow: "Government service learning",
    title: "Prepare here. Apply there.",
    description:
      "The product path is learning and preparation. The application itself stays on the official portal.",
    discover: {
      title: "Find the service",
      body: "Search or browse Government Services. The catalog is a sample for learning — not a complete official list.",
    },
    learn: {
      title: "Read the guide",
      body: "See who it is for, which papers are listed, and common mistakes. Confirm every fact on the official portal before you go.",
    },
    prepare: {
      title: "Take a course if you want",
      body: "A service course is optional preparation — video, checklist, and a practice assessment. It does not file your application.",
    },
    apply: {
      title: "Apply on the official portal",
      body: "Use Apply on Official Portal. That opens the national portal. Civic Bangladesh does not submit or process the file.",
    },
  },
  limits: {
    eyebrow: "Limits",
    title: "What this help center covers",
    description:
      "Stay honest about the line between Civic Bangladesh and government offices.",
    canTitle: "We can help you",
    cannotTitle: "We cannot",
    can: {
      explainPlatform: "Explain how Civic Bangladesh works, in Bangla or English.",
      pointToPages: "Point you to services, courses, civic lessons, and the FAQ.",
      sampleVsOfficial:
        "Label sample catalogs so they are not mistaken for live government records.",
      languageAndAccess:
        "Show you language, search, and accessibility controls on this site.",
    },
    cannot: {
      processApplication: "Submit, track, or speed up a government application.",
      officialFees:
        "Invent a government fee, processing time, or office phone number.",
      ministryPhone:
        "Run a ministry helpline, live chat, or official complaint desk.",
      changeGovernmentFile:
        "Stamp papers, issue a licence, or change a government file.",
    },
  },
  site: {
    eyebrow: "This website",
    title: "Using Civic Bangladesh",
    description: "Controls that already exist on the site. No extra account is required to read.",
    language: {
      title: "Bangla and English",
      body: "Use the language switcher in the header or footer. Bangla is the default.",
    },
    search: {
      title: "Search",
      body: "The Search button in the header looks across Civic Bangladesh pages, sample services, and courses — not a government search portal.",
    },
    accessibility: {
      title: "Accessibility settings",
      body: "Open the accessibility control on any page to change text size, contrast, motion, and related options. Preferences stay on this device.",
    },
    sampleLabels: {
      title: "Sample catalogs",
      body: "When a page says sample, treat facts as learning examples. Confirm official rules on the government portal.",
    },
  },
  more: {
    eyebrow: "Still stuck",
    title: "More Civic Bangladesh support",
    description:
      "There is no ticket form or support inbox on this page. The FAQ is the next place to look.",
    faqTitle: "Frequently asked questions",
    faqBody:
      "If your question is about what Civic Bangladesh is, course fees, or certificates, start there.",
    faqCta: "Open the FAQ",
  },
  official: {
    eyebrow: "Government application",
    title: "Need the official portal?",
    description:
      "Questions about your file, office, or government fee belong on the national portal — not here.",
    cta: "Apply on Official Portal",
    prepareCta: "Explore services first",
    note: "Opens the national portal (bangladesh.gov.bd). Civic Bangladesh does not submit or process your application.",
  },
} as const;

export type HelpTranslations = TranslationShape<typeof help>;
