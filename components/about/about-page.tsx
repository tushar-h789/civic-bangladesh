"use client";

import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  BookOpen,
  Building2,
  ClipboardCheck,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Landmark,
  ListChecks,
  ScrollText,
  Search,
  Sparkles,
  Stamp,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type {
  AboutAudienceKey,
  AboutJourneyKey,
  AboutNotKey,
  AboutServicePathKey,
} from "@/data/about";
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

const HERO_IMAGE = "/images/home/intro-environment.png";

const PILLAR_IMAGES = {
  civic: "/images/home/intro-responsibility.png",
  services: "/images/home/intro-rules.png",
} as const;

const JOURNEY_ICONS = {
  learn: BookOpen,
  practice: ListChecks,
  participate: Users,
  inspire: Sparkles,
  impact: HeartHandshake,
} as const satisfies Record<
  AboutJourneyKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const SERVICE_PATH_ICONS = {
  find: Search,
  learnProcess: ScrollText,
  course: GraduationCap,
  assess: ClipboardCheck,
  credential: Stamp,
  apply: Landmark,
} as const satisfies Record<
  AboutServicePathKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const AUDIENCE_ICONS = {
  citizens: Users,
  students: GraduationCap,
  teachers: BookOpen,
  schools: Building2,
  organizations: HeartHandshake,
} as const satisfies Record<
  AboutAudienceKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const NOT_ICONS = {
  notPortal: Landmark,
  notPartnership: Ban,
  notOfficialCert: Stamp,
} as const satisfies Record<
  AboutNotKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const START_ICONS = {
  civicLearning: HeartHandshake,
  services: ScrollText,
  courses: GraduationCap,
  challenges: ListChecks,
  official: ExternalLink,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

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

  const jumpLinks = [
    { href: "#about-pillars", label: copy.jump.pillars },
    { href: "#about-journey", label: copy.jump.journey },
    { href: "#about-not", label: copy.jump.notThis },
    { href: "#about-start", label: copy.jump.start },
  ];

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <section className="relative isolate overflow-hidden bg-text">
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
          className="absolute inset-0 bg-linear-to-r from-text/80 via-text/50 to-text/20 lg:from-text/75 lg:via-text/40 lg:to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-text/70 via-transparent to-text/25"
        />

        <Container className="relative flex flex-col gap-4 pt-6 pb-7 sm:pt-7 sm:pb-8 lg:pt-8 lg:pb-8">
          <Breadcrumb
            tone="onPrimary"
            className="text-sm sm:text-base"
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.nav.links.about },
            ]}
          />

          <div className="flex max-w-2xl flex-col gap-3 rounded-2xl bg-text/50 p-4 ring-1 ring-white/15 backdrop-blur-md sm:gap-3.5 sm:p-5">
            <h1
              className={cn(
                "text-[1.75rem] leading-[1.28] font-semibold text-balance text-white sm:text-[2.125rem] sm:leading-snug lg:text-4xl lg:leading-[1.2]",
                isBangla && "leading-[1.32] sm:leading-[1.3]",
              )}
            >
              {copy.title}
            </h1>
            <p
              className={cn(
                "text-base font-medium text-white/85 sm:text-lg",
                !isBangla && "font-bengali",
              )}
            >
              {copy.titleSecondary}
            </p>
            <p
              className={cn(
                "text-base text-white/85 sm:text-body",
                isBangla && "leading-[1.8]",
              )}
            >
              {copy.description}
            </p>
            <p
              className={cn(
                "text-sm text-white/70",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.sampleNote}
            </p>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              <HeroChip
                icon={<HeartHandshake className="size-3.5" aria-hidden />}
                label={copy.stats.independent}
              />
              <HeroChip
                icon={<Landmark className="size-3.5" aria-hidden />}
                label={copy.stats.notOffice}
              />
            </ul>
          </div>

          <nav aria-label={copy.jump.label}>
            <p className="text-sm font-semibold text-white">
              {copy.jump.label}
            </p>
            <ol className="mt-2 flex list-none flex-wrap gap-1.5 p-0">
              {jumpLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex h-8 items-center rounded-btn bg-white/10 px-3 text-sm font-medium text-white/90 ring-1 ring-white/15 transition-colors duration-200 ease-standard hover:bg-white/18 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Container>
        <span className="sr-only">{copy.heroImageAlt}</span>
      </section>

      <div className="bg-background py-6 md:py-7 lg:py-8">
        <Container className="flex flex-col gap-3 sm:gap-4">
          <AboutBodySection
            id="about-pillars"
            headingId="about-pillars-heading"
            title={copy.pillars.title}
            description={copy.pillars.description}
            isBangla={isBangla}
          >
            <ul className="m-0 grid list-none gap-3 p-0 lg:grid-cols-2">
              {pillars.map((pillar) => (
                <li key={pillar.key}>
                  <article className="flex h-full flex-col overflow-hidden rounded-card bg-background ring-1 ring-border">
                    <div className="relative min-h-40 overflow-hidden sm:min-h-48">
                      <Image
                        src={PILLAR_IMAGES[pillar.key]}
                        alt={pillar.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5 p-4">
                      <h3
                        className={cn(
                          "text-base font-semibold text-foreground sm:text-lg",
                          isBangla && "leading-[1.45]",
                        )}
                      >
                        {pillar.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-text-secondary",
                          isBangla && "leading-[1.75]",
                        )}
                      >
                        {pillar.body}
                      </p>
                      <Link
                        href={pillar.href}
                        className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        {pillar.cta}
                        <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </AboutBodySection>

          <AboutBodySection
            id="about-journey"
            headingId="about-journey-heading"
            title={copy.journey.title}
            description={copy.journey.description}
            isBangla={isBangla}
          >
            <CircleStepper
              items={journey.map((item) => ({
                ...item,
                Icon: JOURNEY_ICONS[item.key],
              }))}
              columnsClass="lg:grid-cols-5"
              isBangla={isBangla}
            />
          </AboutBodySection>

          <AboutBodySection
            id="about-service-path"
            headingId="about-service-path-heading"
            title={copy.servicePath.title}
            description={copy.servicePath.description}
            isBangla={isBangla}
          >
            <CircleStepper
              items={servicePath.map((item) => ({
                ...item,
                Icon: SERVICE_PATH_ICONS[item.key],
              }))}
              columnsClass="lg:grid-cols-6"
              isBangla={isBangla}
            />
          </AboutBodySection>

          <AboutBodySection
            id="about-who"
            headingId="about-who-heading"
            title={copy.who.title}
            description={copy.who.description}
            isBangla={isBangla}
          >
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {audience.map((item) => {
                const Icon = AUDIENCE_ICONS[item.key];

                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="flex h-full cursor-pointer flex-col gap-3 rounded-card bg-background p-4 outline-none ring-1 ring-border transition-shadow duration-200 ease-standard hover:shadow-card focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className="flex size-9 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p
                        className={cn(
                          "text-sm text-text-secondary",
                          isBangla && "leading-[1.7]",
                        )}
                      >
                        {item.body}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {item.cta}
                        <ArrowRight className="size-3.5" aria-hidden />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </AboutBodySection>

          <AboutBodySection
            id="about-not"
            headingId="about-not-heading"
            title={copy.notThis.title}
            description={copy.notThis.description}
            isBangla={isBangla}
          >
            <ul className="m-0 divide-y divide-border overflow-hidden rounded-card bg-background ring-1 ring-border">
              {notItems.map((item) => {
                const Icon = NOT_ICONS[item.key];

                return (
                  <li
                    key={item.key}
                    className="flex items-start gap-3 px-3.5 py-3 sm:items-center"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p
                        className={cn(
                          "mt-0.5 text-sm text-text-secondary",
                          isBangla && "leading-[1.7]",
                        )}
                      >
                        {item.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </AboutBodySection>

          <AboutBodySection
            id="about-start"
            headingId="about-start-heading"
            title={copy.start.title}
            description={copy.start.description}
            isBangla={isBangla}
          >
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {startItems.map((item) => {
                const Icon = START_ICONS[item.key];
                const className =
                  "flex h-full cursor-pointer flex-col gap-3 rounded-card bg-background p-4 outline-none ring-1 ring-border transition-shadow duration-200 ease-standard hover:shadow-card focus-visible:ring-3 focus-visible:ring-ring/50";
                const inner = (
                  <>
                    <span className="flex size-9 items-center justify-center rounded-btn bg-light-green text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p
                      className={cn(
                        "text-sm text-text-secondary",
                        isBangla && "leading-[1.7]",
                      )}
                    >
                      {item.body}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {item.cta}
                      {item.external ? (
                        <ExternalLink className="size-3.5" aria-hidden />
                      ) : (
                        <ArrowRight className="size-3.5" aria-hidden />
                      )}
                    </span>
                  </>
                );

                return (
                  <li key={item.key}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link href={item.href} className={className}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </AboutBodySection>
        </Container>
      </div>
    </div>
  );
}

function HeroChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <li className="inline-flex max-w-full items-center gap-1.5 rounded-btn bg-white/12 px-2.5 py-1 text-sm font-medium text-white ring-1 ring-white/15">
      {icon}
      <span>{label}</span>
    </li>
  );
}

function CircleStepper({
  items,
  columnsClass,
  isBangla,
}: {
  items: {
    key: string;
    title: string;
    body: string;
    Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  }[];
  columnsClass: string;
  isBangla: boolean;
}) {
  return (
    <ol className={cn("m-0 grid list-none gap-0 p-0", columnsClass)}>
      {items.map((item, index) => {
        const last = index === items.length - 1;

        return (
          <li
            key={item.key}
            className={cn(
              "relative flex gap-3 lg:flex-col lg:items-center lg:px-1.5 lg:text-center",
              !last &&
                "lg:after:absolute lg:after:top-5 lg:after:left-[calc(50%+1.35rem)] lg:after:right-[-50%] lg:after:h-px lg:after:bg-border lg:after:content-['']",
            )}
          >
            <div className="flex flex-col items-center">
              <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-light-green text-primary ring-4 ring-surface">
                <item.Icon className="size-4" aria-hidden />
              </span>
              {last ? null : (
                <span
                  aria-hidden
                  className="my-1 w-px min-h-5 flex-1 bg-border lg:hidden"
                />
              )}
            </div>
            <div className="min-w-0 pb-4 lg:pt-2.5 lg:pb-0">
              <p className="text-sm font-semibold text-foreground">
                {item.title}
              </p>
              <p
                className={cn(
                  "mt-1 text-xs text-text-secondary",
                  isBangla && "leading-[1.65]",
                )}
              >
                {item.body}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function AboutBodySection({
  id,
  headingId,
  title,
  description,
  isBangla,
  children,
}: {
  id: string;
  headingId: string;
  title: string;
  description: string;
  isBangla: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-28">
      <article className="rounded-card bg-surface p-4 shadow-card ring-1 ring-border sm:p-5">
        <h2
          id={headingId}
          className={cn(
            "text-xl font-semibold text-foreground sm:text-2xl",
            isBangla && "leading-tight",
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "mt-1.5 max-w-2xl text-body text-text-secondary",
            isBangla && "leading-[1.8]",
          )}
        >
          {description}
        </p>
        <div className="mt-4">{children}</div>
      </article>
    </section>
  );
}

export { AboutPage };
