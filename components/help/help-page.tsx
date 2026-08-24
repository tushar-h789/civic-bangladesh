"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  CircleHelp,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Languages,
  ListChecks,
  ScrollText,
  Search,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { HelpTaskKey } from "@/data/help";
import { OFFICIAL_GOVERNMENT_PORTAL_HREF } from "@/data/government-services";
import { useTranslation } from "@/hooks/use-translation";
import {
  getHelpCanItems,
  getHelpCannotItems,
  getHelpSiteGuides,
  getHelpSteps,
  getHelpTasks,
} from "@/lib/get-help-view";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/home/intro-safer.png";

const TASK_ICONS: Record<
  HelpTaskKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  findService: ScrollText,
  startCourse: GraduationCap,
  civicLearning: HeartHandshake,
  readFaq: CircleHelp,
  seePricing: Banknote,
  tryChallenge: ListChecks,
};

function HelpPage() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.help;
  const tasks = getHelpTasks(t);
  const steps = getHelpSteps(t);
  const canItems = getHelpCanItems(t);
  const cannotItems = getHelpCannotItems(t);
  const siteGuides = getHelpSiteGuides(t);

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
              { label: t.footer.links.helpCenter },
            ]}
          />
          <div className="flex max-w-2xl flex-col gap-5">
            <p className="text-sm font-semibold tracking-wide text-white/75 uppercase">
              {copy.eyebrow}
            </p>
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
          </div>
          <nav aria-label={copy.jump.label}>
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-base">
              <li>
                <a
                  href="#help-start"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.start}
                </a>
              </li>
              <li>
                <a
                  href="#help-steps"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.steps}
                </a>
              </li>
              <li>
                <a
                  href="#help-limits"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.limits}
                </a>
              </li>
              <li>
                <a
                  href="#help-site"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.site}
                </a>
              </li>
              <li>
                <a
                  href="#help-official"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.official}
                </a>
              </li>
            </ul>
          </nav>
        </Container>
        <span className="sr-only">{copy.heroImageAlt}</span>
      </section>

      <section className="bg-background pt-8 pb-0 md:pt-10">
        <Container>
          <aside
            className="flex gap-3 rounded-card bg-light-green p-5 ring-1 ring-border sm:p-6"
            aria-labelledby="help-notice-heading"
          >
            <ShieldAlert
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <div className="min-w-0">
              <h2
                id="help-notice-heading"
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
        id="help-start"
        aria-labelledby="help-start-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.tasks.eyebrow}
            title={<span id="help-start-heading">{copy.tasks.title}</span>}
            description={copy.tasks.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {tasks.map((task) => {
              const Icon = TASK_ICONS[task.key];

              return (
                <li key={task.key}>
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
                      {task.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-sm text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {task.body}
                    </p>
                    <Link
                      href={task.href}
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {task.cta}
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
        id="help-steps"
        aria-labelledby="help-steps-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.steps.eyebrow}
            title={<span id="help-steps-heading">{copy.steps.title}</span>}
            description={copy.steps.description}
          />
          <ol className="mt-10 m-0 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((step, index) => (
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
        </Container>
      </section>

      <section
        id="help-limits"
        aria-labelledby="help-limits-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.limits.eyebrow}
            title={<span id="help-limits-heading">{copy.limits.title}</span>}
            description={copy.limits.description}
          />
          <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-2 lg:gap-5">
            <article className="rounded-card bg-surface p-6 ring-1 ring-border sm:p-8">
              <h3 className="text-xl font-semibold text-foreground">
                {copy.limits.canTitle}
              </h3>
              <ul className="mt-6 m-0 flex list-none flex-col gap-3 p-0">
                {canItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "text-sm text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-card bg-surface p-6 ring-1 ring-border sm:p-8">
              <h3 className="text-xl font-semibold text-foreground">
                {copy.limits.cannotTitle}
              </h3>
              <ul className="mt-6 m-0 flex list-none flex-col gap-3 p-0">
                {cannotItems.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      "text-sm text-text-secondary",
                      isBangla && "leading-[1.75]",
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <section
        id="help-site"
        aria-labelledby="help-site-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.site.eyebrow}
            title={<span id="help-site-heading">{copy.site.title}</span>}
            description={copy.site.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {siteGuides.map((guide) => (
              <li key={guide.key}>
                <article className="flex h-full flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                    {guide.key === "language" ? (
                      <Languages className="size-4" aria-hidden />
                    ) : guide.key === "search" ? (
                      <Search className="size-4" aria-hidden />
                    ) : guide.key === "accessibility" ? (
                      <ShieldCheck className="size-4" aria-hidden />
                    ) : (
                      <CircleHelp className="size-4" aria-hidden />
                    )}
                  </span>
                  <h3
                    className={cn(
                      "mt-4 text-lg font-semibold text-foreground",
                      isBangla && "leading-[1.45]",
                    )}
                  >
                    {guide.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm text-text-secondary",
                      isBangla && "leading-[1.75]",
                    )}
                  >
                    {guide.body}
                  </p>
                </article>
              </li>
            ))}
          </ul>

          <article
            id="help-more"
            className="mt-6 scroll-mt-28 rounded-card bg-surface p-6 ring-1 ring-border sm:mt-8 sm:p-8"
            aria-labelledby="help-more-heading"
          >
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              {copy.more.eyebrow}
            </p>
            <h3
              id="help-more-heading"
              className="mt-2 text-xl font-semibold text-foreground"
            >
              {copy.more.title}
            </h3>
            <p
              className={cn(
                "mt-3 max-w-2xl text-sm text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.more.description}
            </p>
            <p
              className={cn(
                "mt-4 text-base font-semibold text-foreground",
                isBangla && "leading-[1.45]",
              )}
            >
              {copy.more.faqTitle}
            </p>
            <p
              className={cn(
                "mt-2 max-w-2xl text-sm text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.more.faqBody}
            </p>
            <Button asChild className="mt-5 w-fit text-primary-foreground">
              <Link href={ROUTES.faq}>
                {copy.more.faqCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </article>
        </Container>
      </section>

      <section
        id="help-official"
        aria-labelledby="help-official-heading"
        className="scroll-mt-28 bg-primary py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-sm font-semibold text-white/80">
                <ShieldCheck className="size-4" aria-hidden />
                {copy.official.eyebrow}
              </p>
              <h2
                id="help-official-heading"
                className="mt-3 text-section-heading font-semibold text-balance text-white"
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
                id="help-official-portal-note"
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
                  aria-describedby="help-official-portal-note"
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

export { HelpPage };
