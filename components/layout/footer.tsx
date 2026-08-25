"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { ROUTES } from "@/constants/routes";
import { coursesCatalogHref } from "@/data/course-catalog";
import { samplePopularServicesHref } from "@/data/service-categories";
import { Container } from "@/components/common/container";
import { BrandLogo } from "@/components/layout/brand-logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  id: string;
  title: string;
  links: FooterLink[];
}

function FooterColumn({ id, title, links }: FooterColumnProps) {
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className="text-base font-semibold text-foreground">
        {title}
      </h2>
      <ul className="mt-3 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={`${link.label}:${link.href}`}>
            <Link
              href={link.href}
              className="text-base text-text-secondary transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Footer() {
  const { t, locale } = useTranslation();
  const nav = t.nav;
  const footerText = t.footer;
  const year = new Date().getFullYear();
  const isBangla = locale === "bn";
  const links = footerText.links;

  const civicBangladeshLinks: FooterLink[] = [
    { label: links.about, href: ROUTES.about },
    { label: links.civicLearning, href: ROUTES.learn },
    {
      label: links.civicChallenges,
      href: `${ROUTES.challenges}#civic-challenges`,
    },
    { label: links.civicPromise, href: ROUTES.civicPromise },
  ];

  const governmentServiceLinks: FooterLink[] = [
    { label: links.allServices, href: ROUTES.governmentServices },
    {
      label: links.serviceCategories,
      href: `${ROUTES.governmentServices}#service-categories`,
    },
    {
      label: links.popularServices,
      href: samplePopularServicesHref(),
    },
    {
      label: links.serviceSearch,
      href: `${ROUTES.governmentServices}#service-search`,
    },
  ];

  const learningLinks: FooterLink[] = [
    { label: links.allCourses, href: ROUTES.courses },
    {
      label: links.serviceCourses,
      href: coursesCatalogHref("servicePrep"),
    },
    { label: links.civicCourses, href: coursesCatalogHref("civic") },
    { label: links.certificates, href: ROUTES.certificates },
  ];

  const supportLinks: FooterLink[] = [
    { label: links.faq, href: ROUTES.faq },
    { label: links.helpCenter, href: ROUTES.help },
    { label: links.accessibility, href: ROUTES.accessibility },
    { label: links.privacy, href: ROUTES.privacy },
    { label: links.terms, href: ROUTES.terms },
  ];

  const organizationLinks: FooterLink[] = [
    { label: links.schools, href: ROUTES.schools },
    { label: links.organizations, href: ROUTES.organizations },
    {
      label: links.partnerships,
      href: `${ROUTES.campaigns}#partnerships`,
    },
  ];

  // Named placeholders only — no hrefs, no invented official accounts,
  // and no government destinations.
  const socialPlaceholders = [
    footerText.social.facebook,
    footerText.social.x,
    footerText.social.youtube,
    footerText.social.instagram,
  ];

  return (
    <footer className="relative z-10 isolate mt-auto w-full border-t border-border bg-card">
      <Container className="flex flex-col gap-12 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-10 xl:flex-row xl:gap-12">
          <div className="flex flex-col gap-4 xl:w-72 xl:shrink-0">
            <Link href={ROUTES.home} className="inline-flex items-center">
              <BrandLogo alt={nav.brandName} height={48} />
            </Link>
            <p
              className={cn(
                "text-base font-medium text-primary",
                isBangla && "font-bengali",
              )}
            >
              {footerText.brand.tagline}
            </p>
            <p
              className={cn(
                "max-w-sm text-base text-text-secondary",
                isBangla && "font-bengali",
              )}
            >
              {footerText.brand.description}
            </p>

            <div className="mt-2 flex flex-col gap-2">
              <p className="text-sm font-semibold tracking-wide text-text-secondary uppercase">
                {footerText.social.title}
              </p>
              <ul className="flex flex-wrap gap-2">
                {socialPlaceholders.map((platform) => (
                  <li key={platform}>
                    <span
                      role="link"
                      aria-disabled="true"
                      aria-label={`${platform} — ${footerText.social.comingSoon}`}
                      title={`${platform} — ${footerText.social.comingSoon}`}
                      className="inline-flex cursor-not-allowed items-center rounded-btn border border-border px-3 py-1.5 text-sm font-medium text-text-secondary opacity-70"
                    >
                      {platform}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            <FooterColumn
              id="footer-civic-bangladesh"
              title={footerText.columns.civicBangladesh}
              links={civicBangladeshLinks}
            />
            <FooterColumn
              id="footer-government-services"
              title={footerText.columns.governmentServices}
              links={governmentServiceLinks}
            />
            <FooterColumn
              id="footer-learning"
              title={footerText.columns.learning}
              links={learningLinks}
            />
            <FooterColumn
              id="footer-support"
              title={footerText.columns.support}
              links={supportLinks}
            />
            <FooterColumn
              id="footer-organizations"
              title={footerText.columns.organizations}
              links={organizationLinks}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-text-secondary">
            © {year} {nav.brandName}. {footerText.copyright}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-base text-text-secondary">
              {footerText.language.label}
            </span>
            <LanguageSwitcher className="h-9 px-3 text-base" />
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
