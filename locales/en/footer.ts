import type { TranslationShape } from "@/locales/types";

export const footer = {
  brand: {
    tagline: "Better Citizens. Better Bangladesh.",
    description:
      "A civic-awareness, civic-learning and civic-engagement platform for Bangladesh.",
  },
  columns: {
    civicBangladesh: "Civic Bangladesh",
    governmentServices: "Government Services",
    learning: "Learning",
    support: "Support",
    organizations: "Organizations",
  },
  links: {
    about: "About",
    civicLearning: "Civic Learning",
    civicChallenges: "Civic Challenges",
    civicPromise: "Civic Promise",
    allServices: "All Services",
    serviceCategories: "Service Categories",
    popularServices: "Popular Services",
    serviceSearch: "Service Search",
    allCourses: "All Courses",
    serviceCourses: "Service Courses",
    civicCourses: "Civic Courses",
    certificates: "Certificates",
    faq: "FAQ",
    helpCenter: "Help Center",
    accessibility: "Accessibility",
    privacy: "Privacy",
    terms: "Terms",
    schools: "Schools",
    organizations: "Organizations",
    partnerships: "Partnerships",
  },
  social: {
    title: "Follow us",
    comingSoon: "Coming soon",
    facebook: "Facebook",
    x: "X",
    youtube: "YouTube",
    instagram: "Instagram",
  },
  language: {
    label: "Language",
  },
  copyright: "All rights reserved.",
} as const;

export type FooterTranslations = TranslationShape<typeof footer>;
