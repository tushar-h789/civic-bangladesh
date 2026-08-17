import type { NavTranslations } from "@/locales/en/nav";
import { ROUTES } from "@/constants/routes";

export interface NavLink {
  label: string;
  href: string;
  emphasis?: boolean;
}

export function getPrimaryNavLinks(nav: NavTranslations): NavLink[] {
  return [
    { label: nav.links.home, href: ROUTES.home },
    { label: nav.links.civicLearning, href: ROUTES.learn },
    {
      label: nav.links.governmentServices,
      href: ROUTES.governmentServices,
      emphasis: true,
    },
    { label: nav.links.courses, href: ROUTES.courses },
    { label: nav.links.challenges, href: ROUTES.challenges },
  ];
}

export function getResourceNavLinks(nav: NavTranslations): NavLink[] {
  return [
    { label: nav.resources.videos, href: ROUTES.videos },
    { label: nav.resources.stories, href: ROUTES.stories },
    { label: nav.resources.civicPromise, href: ROUTES.civicPromise },
    { label: nav.resources.community, href: ROUTES.community },
    { label: nav.resources.certificates, href: ROUTES.certificates },
    { label: nav.resources.pricing, href: ROUTES.pricing },
    { label: nav.resources.faq, href: ROUTES.faq },
  ];
}

export function getSearchNavPages(nav: NavTranslations): NavLink[] {
  return [
    ...getPrimaryNavLinks(nav),
    { label: nav.links.about, href: ROUTES.about },
    { label: nav.resources.trigger, href: ROUTES.resources },
    { label: nav.more.schools, href: ROUTES.schools },
    { label: nav.more.organizations, href: ROUTES.organizations },
    { label: nav.more.campaigns, href: ROUTES.campaigns },
    { label: nav.helpCenter, href: ROUTES.help },
    { label: nav.accessibility, href: ROUTES.accessibility },
    { label: nav.privacy, href: ROUTES.privacy },
    { label: nav.terms, href: ROUTES.terms },
    ...getResourceNavLinks(nav),
  ];
}

export function isActivePath(pathname: string, href: string) {
  if (href === ROUTES.home) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isLearnerArea(pathname: string) {
  return (
    isActivePath(pathname, ROUTES.profile) || pathname.startsWith("/dashboard")
  );
}
