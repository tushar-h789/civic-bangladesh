"use client";

import * as React from "react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  HeartHandshake,
  IdCard,
  Landmark,
  ListChecks,
  Stamp,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { CivicPromiseKey } from "@/data/civic-promises";
import { useTranslation } from "@/hooks/use-translation";
import {
  getCivicPromiseHowItems,
  getCivicPromiseItems,
  getCivicPromiseMoreItems,
  getCivicPromiseNotItems,
} from "@/lib/get-promise-view";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const HERO_IMAGE = "/images/home/intro-cleaner.png";

const HOW_ICONS = {
  pick: Check,
  keep: Calendar,
  practice: ListChecks,
  visitOnly: Clock,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const NOT_ICONS = {
  notOath: Landmark,
  notAccount: IdCard,
  notCertificate: Stamp,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const MORE_ICONS = {
  civicLearning: BookOpen,

  challenges: ListChecks,
  stories: HeartHandshake,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function CivicPromisePage({
  initialPromise,
}: {
  initialPromise?: CivicPromiseKey;
}) {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.promise;
  const page = copy.page;
  const items = getCivicPromiseItems(t);
  const howItems = getCivicPromiseHowItems(t);
  const notItems = getCivicPromiseNotItems(t);
  const moreItems = getCivicPromiseMoreItems(t);
  const [selected, setSelected] = React.useState<CivicPromiseKey>(
    initialPromise ?? items[0].key,
  );
  const [confirmed, setConfirmed] = React.useState(false);
  const chosen = items.find((item) => item.key === selected) ?? items[0];

  const jumpLinks = [
    { href: "#promise-choose", label: page.jump.choose },
    { href: "#promise-how", label: page.jump.how },
    { href: "#promise-not", label: page.jump.notThis },
    { href: "#promise-more", label: page.jump.more },
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
              { label: t.nav.resources.civicPromise },
            ]}
          />

          <div className="flex max-w-2xl flex-col gap-3 rounded-2xl bg-text/50 p-4 ring-1 ring-white/15 backdrop-blur-md sm:gap-3.5 sm:p-5">
            <h1
              className={cn(
                "text-[1.75rem] leading-[1.28] font-semibold text-balance text-white sm:text-[2.125rem] sm:leading-snug lg:text-4xl lg:leading-[1.2]",
                isBangla && "leading-[1.32] sm:leading-[1.3]",
              )}
            >
              {page.title}
            </h1>
            <p
              className={cn(
                "text-base text-white/85 sm:text-body",
                isBangla && "leading-[1.8]",
              )}
            >
              {page.description}
            </p>
            <p
              className={cn(
                "text-sm text-white/70",
                isBangla && "leading-[1.75]",
              )}
            >
              {page.sampleNote}
            </p>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              <HeroChip
                icon={<HeartHandshake className="size-3.5" aria-hidden />}
                label={formatTemplate(page.stats.habits, {
                  count: items.length,
                })}
              />
              <HeroChip
                icon={<Clock className="size-3.5" aria-hidden />}
                label={page.stats.visit}
              />
            </ul>
            <div>
              <Button
                asChild
                className="h-11 rounded-btn bg-white px-5 text-button text-primary hover:bg-light-green"
              >
                <a href="#promise-choose">
                  {page.jump.choose}
                  <ArrowRight className="size-3.5" aria-hidden />
                </a>
              </Button>
            </div>
          </div>

          <nav aria-label={page.jump.label}>
            <p className="text-sm font-semibold text-white">
              {page.jump.label}
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
        <span className="sr-only">{page.heroImageAlt}</span>
      </section>

      <div className="bg-background py-6 md:py-7 lg:py-8">
        <Container className="flex flex-col gap-3 sm:gap-4">
          <PromiseBodySection
            id="promise-choose"
            headingId="promise-choose-heading"
            title={page.choose.title}
            description={page.choose.description}
            isBangla={isBangla}
          >
            {confirmed ? (
              <div className="rounded-card bg-background p-4 ring-1 ring-border sm:p-5">
                <p className="text-sm font-semibold text-primary">
                  {copy.confirmed}
                </p>
                <h3
                  className={cn(
                    "mt-2 text-lg font-semibold text-foreground sm:text-xl",
                    isBangla && "leading-[1.45]",
                  )}
                >
                  {chosen.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm text-text-secondary sm:text-base",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {chosen.description}
                </p>
                <p
                  className={cn(
                    "mt-3 rounded-btn bg-light-green px-3 py-2.5 text-sm text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {copy.sampleNote}
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Button asChild className="h-11 rounded-btn">
                    <Link href={ROUTES.challenges}>
                      {copy.practiceCta}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-btn"
                  >
                    <Link href={chosen.topicHref}>
                      {page.choose.topicCta}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </Button>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmed(false)}
                  className="mt-3 cursor-pointer text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {page.choose.chooseAnother}
                </button>
              </div>
            ) : (
              <form
                className="flex flex-col gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setConfirmed(true);
                }}
              >
                <RadioGroup
                  value={selected}
                  onValueChange={(value) =>
                    setSelected(value as CivicPromiseKey)
                  }
                  className="gap-2"
                  aria-label={page.choose.title}
                >
                  {items.map((item) => {
                    const inputId = `page-civic-promise-${item.key}`;

                    return (
                      <label
                        key={item.key}
                        htmlFor={inputId}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-card bg-background p-3.5 ring-1 ring-border transition-colors duration-200 ease-standard",
                          selected === item.key
                            ? "bg-light-green ring-primary"
                            : "hover:bg-light-green/60",
                        )}
                      >
                        <RadioGroupItem
                          id={inputId}
                          value={item.key}
                          className="mt-1"
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              "block font-semibold text-foreground",
                              isBangla && "leading-[1.45]",
                            )}
                          >
                            {item.title}
                          </span>
                          <span
                            className={cn(
                              "mt-1 block text-sm text-text-secondary",
                              isBangla && "leading-[1.7]",
                            )}
                          >
                            {item.description}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </RadioGroup>
                <Button type="submit" className="h-11 w-fit rounded-btn">
                  {copy.cta}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Button>
              </form>
            )}
          </PromiseBodySection>

          <PromiseBodySection
            id="promise-how"
            headingId="promise-how-heading"
            title={page.how.title}
            description={page.how.description}
            isBangla={isBangla}
          >
            <ol className="m-0 grid list-none gap-0 p-0 sm:grid-cols-4">
              {howItems.map((item, index) => {
                const Icon = HOW_ICONS[item.key];
                const last = index === howItems.length - 1;

                return (
                  <li
                    key={item.key}
                    className={cn(
                      "relative flex gap-3 sm:flex-col sm:items-center sm:px-2 sm:text-center",
                      !last &&
                        "sm:after:absolute sm:after:top-5 sm:after:left-[calc(50%+1.35rem)] sm:after:right-[-50%] sm:after:h-px sm:after:bg-border sm:after:content-['']",
                    )}
                  >
                    <div className="flex flex-col items-center">
                      <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-light-green text-primary ring-4 ring-surface">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      {last ? null : (
                        <span
                          aria-hidden
                          className="my-1 w-px min-h-5 flex-1 bg-border sm:hidden"
                        />
                      )}
                    </div>
                    <div className="min-w-0 pb-4 sm:pt-2.5 sm:pb-0">
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
          </PromiseBodySection>

          <PromiseBodySection
            id="promise-not"
            headingId="promise-not-heading"
            title={page.notThis.title}
            description={page.notThis.description}
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
          </PromiseBodySection>

          <PromiseBodySection
            id="promise-more"
            headingId="promise-more-heading"
            title={page.more.title}
            description={page.more.description}
            isBangla={isBangla}
          >
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3">
              {moreItems.map((item) => {
                const Icon = MORE_ICONS[item.key];

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
          </PromiseBodySection>
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

function PromiseBodySection({
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

export { CivicPromisePage };
