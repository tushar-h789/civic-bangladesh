"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  BookOpen,
  Building2,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Landmark,
  ListChecks,
  ScrollText,
  ShieldAlert,
  Stamp,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type {
  AboutAudienceKey,
  AboutNotKey,
  AboutPillarKey,
  AboutStartKey,
} from "@/data/about";
import { OFFICIAL_GOVERNMENT_PORTAL_HREF } from "@/data/government-services";
import { useTranslation } from "@/hooks/use-translation";
import {
  getAboutAudience,
  getAboutJourney,
  getAboutNotItems,
  getAboutPillars,
  getAboutServicePath,
  getAboutStartItems,
} from "@/lib/get-about-view";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/home/intro-environment.png";

const PILLAR_IMAGES: Record<AboutPillarKey, string> = {
  civic: "/images/home/intro-responsibility.png",
  services: "/images/home/intro-rules.png",
};

const AUDIENCE_ICONS: Record<
  AboutAudienceKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  citizens: Users,
  students: GraduationCap,
  teachers: BookOpen,
  schools: Building2,
  organizations: HeartHandshake,
};

const NOT_ICONS: Record<
  AboutNotKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  notPortal: Landmark,
  notPartnership: Ban,
  notOfficialCert: Stamp,
};

const START_ICONS: Record<
  AboutStartKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  civicLearning: HeartHandshake,
  services: ScrollText,
  courses: GraduationCap,
  challenges: ListChecks,
};

function AboutPage() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.about;
  const pillars = getAboutPillars(t);
  const journey = getAboutJourney(t);
  const servicePath = getAboutServicePath(t);
  const audience = getAboutAudience(t);
  const notItems = getAboutNotItems(t);
  const startItems = getAboutStartItems(t);

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <section className="relative isolate overflow-hidden bg-primary">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_center]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-text/90 via-text/72 to-text/30"
        />

        <Container className="relative flex flex-col gap-8 pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
          <Breadcrumb
            tone="onPrimary"
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.nav.links.about },
            ]}
          />
          <div className="flex max-w-2xl flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h1
                className={cn(
                  "text-hero-mobile font-semibold text-balance text-white lg:text-5xl",
                  isBangla && "leading-tight",
                )}
              >
                {copy.title}
              </h1>
              <p
                className={cn(
                  "text-xl font-medium text-white/85 sm:text-2xl",
                  !isBangla && "font-bengali",
                )}
              >
                {copy.titleSecondary}
              </p>
            </div>
            <p
              className={cn(
                "max-w-xl text-body text-white/85",
                isBangla && "leading-[1.8]",
              )}
            >
              {copy.description}
            </p>
            <p
              className={cn(
                "max-w-xl text-base text-white/70",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.sampleNote}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                className="inline-flex h-12 items-center gap-2 rounded-btn bg-white px-6 text-button text-primary hover:bg-light-green"
              >
                <Link href={ROUTES.learn}>
                  {copy.pillars.civic.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="inline-flex h-12 items-center gap-2 rounded-btn border-white/40 bg-transparent px-6 text-button text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={ROUTES.governmentServices}>
                  {copy.pillars.services.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
          <nav aria-label={copy.jump.label}>
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-base">
              {(
                [
                  ["about-pillars", copy.jump.pillars],
                  ["about-journey", copy.jump.journey],
                  ["about-who", copy.jump.who],
                  ["about-not", copy.jump.notThis],
                  ["about-start", copy.jump.start],
                  ["about-official", copy.jump.official],
                ] as const
              ).map(([href, label]) => (
                <li key={href}>
                  <a
                    href={`#${href}`}
                    className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
        <span className="sr-only">{copy.heroImageAlt}</span>
      </section>

      <section className="bg-background pt-8 pb-0 md:pt-10">
        <Container>
          <aside
            className="flex gap-3 rounded-card bg-light-green p-5 ring-1 ring-border sm:p-6"
            aria-labelledby="about-notice-heading"
          >
            <ShieldAlert
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <div className="min-w-0">
              <h2
                id="about-notice-heading"
                className="text-base font-semibold text-foreground"
              >
                {copy.notice.title}
              </h2>
              <p
                className={cn(
                  "mt-2 text-sm text-text-secondary",
                  isBangla && "leading-[1.75]",
                )}
              >
                {copy.notice.body}
              </p>
            </div>
          </aside>
        </Container>
      </section>

      <section
        id="about-pillars"
        aria-labelledby="about-pillars-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="about-pillars-heading">{copy.pillars.title}</span>}
            description={copy.pillars.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 lg:grid-cols-2 lg:gap-5">
            {pillars.map((pillar) => (
              <li key={pillar.key}>
                <article className="flex h-full flex-col overflow-hidden rounded-card bg-surface ring-1 ring-border">
                  <div className="relative min-h-52 overflow-hidden sm:min-h-64">
                    <Image
                      src={PILLAR_IMAGES[pillar.key]}
                      alt={pillar.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3
                      className={cn(
                        "text-xl font-semibold text-foreground",
                        isBangla && "leading-[1.45]",
                      )}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-sm text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {pillar.body}
                    </p>
                    <Link
                      href={pillar.href}
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {pillar.cta}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="about-journey"
        aria-labelledby="about-journey-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="about-journey-heading">{copy.journey.title}</span>}
            description={copy.journey.description}
          />
          <ol className="mt-10 m-0 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {journey.map((step, index) => (
              <li key={step.key}>
                <article className="flex h-full flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
                  <p className="text-sm font-semibold tabular-nums text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className={cn(
                      "mt-3 text-lg font-semibold text-foreground",
                      isBangla && "leading-[1.45]",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm text-text-secondary",
                      isBangla && "leading-[1.75]",
                    )}
                  >
                    {step.body}
                  </p>
                </article>
              </li>
            ))}
          </ol>

          <div className="mt-12 sm:mt-16">
            <SectionHeader
              title={
                <span id="about-service-path-heading">
                  {copy.servicePath.title}
                </span>
              }
              description={copy.servicePath.description}
            />
            <ol className="mt-10 m-0 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {servicePath.map((step, index) => (
                <li key={step.key}>
                  <article className="flex h-full flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
                    <p className="text-sm font-semibold tabular-nums text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className={cn(
                        "mt-3 text-lg font-semibold text-foreground",
                        isBangla && "leading-[1.45]",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-sm text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {step.body}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section
        id="about-who"
        aria-labelledby="about-who-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="about-who-heading">{copy.who.title}</span>}
            description={copy.who.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {audience.map((item) => {
              const Icon = AUDIENCE_ICONS[item.key];

              return (
                <li key={item.key}>
                  <article className="flex h-full flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <h3
                      className={cn(
                        "mt-4 text-lg font-semibold text-foreground",
                        isBangla && "leading-[1.45]",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-sm text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {item.body}
                    </p>
                    <Link
                      href={item.href}
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {item.cta}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        id="about-not"
        aria-labelledby="about-not-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="about-not-heading">{copy.notThis.title}</span>}
            description={copy.notThis.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 lg:grid-cols-3 lg:gap-5">
            {notItems.map((item) => {
              const Icon = NOT_ICONS[item.key];

              return (
                <li key={item.key}>
                  <article className="flex h-full flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <h3
                      className={cn(
                        "mt-4 text-lg font-semibold text-foreground",
                        isBangla && "leading-[1.45]",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-sm text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {item.body}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        id="about-start"
        aria-labelledby="about-start-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="about-start-heading">{copy.start.title}</span>}
            description={copy.start.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {startItems.map((item) => {
              const Icon = START_ICONS[item.key];

              return (
                <li key={item.key}>
                  <article className="flex h-full flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <h3
                      className={cn(
                        "mt-4 text-lg font-semibold text-foreground",
                        isBangla && "leading-[1.45]",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-sm text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {item.body}
                    </p>
                    <Link
                      href={item.href}
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {item.cta}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        id="about-official"
        aria-labelledby="about-official-heading"
        className="scroll-mt-28 bg-primary py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <h2
                id="about-official-heading"
                className="text-section-heading font-semibold text-balance text-white"
              >
                {copy.official.title}
              </h2>
              <p
                className={cn(
                  "mt-4 text-body text-white/80",
                  isBangla && "leading-[1.8]",
                )}
              >
                {copy.official.description}
              </p>
              <p
                className={cn(
                  "mt-4 text-sm text-white/80",
                  isBangla && "leading-[1.75]",
                )}
              >
                <span className="font-medium text-white">
                  {t.serviceSource.sourceLabel}:
                </span>{" "}
                {t.serviceSource.portalName}
              </p>
              <p
                id="about-official-portal-note"
                className={cn(
                  "mt-3 text-base text-white/70",
                  isBangla && "leading-[1.75]",
                )}
              >
                {copy.official.note}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-stretch">
              <Button
                asChild
                className="inline-flex h-12 items-center gap-2 rounded-btn bg-white px-6 text-button text-primary hover:bg-light-green"
              >
                <a
                  href={OFFICIAL_GOVERNMENT_PORTAL_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby="about-official-portal-note"
                >
                  {copy.official.cta}
                  <ExternalLink className="size-4" aria-hidden />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="inline-flex h-12 items-center gap-2 rounded-btn border-white/40 bg-transparent px-6 text-button text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={ROUTES.governmentServices}>
                  {copy.official.prepareCta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export { AboutPage };
