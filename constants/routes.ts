/**
 * Centralized route paths. Destination pages are built in later prompts —
 * linking to them here now keeps the navbar (and anything else) from ever
 * hardcoding a path string, so adding/renaming a route only touches this file.
 */
export const ROUTES = {
  home: "/",
  learn: "/civic-learning",
  governmentServices: "/services",
  courses: "/courses",
  pricing: "/pricing",
  challenges: "/challenges",
  civicChallenge: "/civic-challenge",
  civicPromise: "/civic-promise",
  campaigns: "/campaigns",
  stories: "/stories",
  community: "/community",
  quiz: "/quiz",
  videos: "/videos",
  schools: "/schools",
  organizations: "/organizations",
  about: "/about",
  resources: "/resources",
  faq: "/faq",
  help: "/help",
  csr: "/csr",
  accessibility: "/accessibility",
  privacy: "/privacy",
  terms: "/terms",
  login: "/login",
  profile: "/profile",
  dashboardServices: "/dashboard/services",
  certificates: "/certificates",
} as const;

export type RouteKey = keyof typeof ROUTES;
