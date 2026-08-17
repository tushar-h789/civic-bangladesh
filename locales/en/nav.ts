import type { TranslationShape } from "@/locales/types";

export const nav = {
  brandName: "Civic Bangladesh",
  links: {
    home: "Home",
    civicLearning: "Civic Learning",
    governmentServices: "Government Services",
    courses: "Courses",
    challenges: "Challenges",
    about: "About",
  },
  resources: {
    trigger: "Resources",
    videos: "Videos",
    stories: "Stories",
    civicPromise: "Civic Promise",
    community: "Community",
    faq: "FAQ",
    certificates: "Certificates",
    pricing: "Pricing",
  },
  more: {
    campaigns: "Campaigns",
    schools: "Schools",
    organizations: "Organizations",
  },
  search: {
    trigger: "Search",
    placeholder: "Search Civic Bangladesh...",
    empty: "No results found.",
    groupPages: "Pages",
    shortcutHint: "Press",
  },
  auth: {
    login: "Log in",
    profile: "Profile",
  },
  primaryCta: "Explore Services",
  helpCenter: "Help Center",
  accessibility: "Accessibility",
  privacy: "Privacy",
  terms: "Terms",
  mobileMenu: {
    open: "Open menu",
    close: "Close menu",
    resourcesSectionLabel: "Resources",
  },
} as const;

export type NavTranslations = TranslationShape<typeof nav>;
