"use client";

import * as React from "react";
import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  IdCard,
  Landmark,
  ListChecks,
  ShieldAlert,
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
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const HERO_IMAGE = "/images/home/intro-cleaner.png";

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
              { label: t.nav.resources.civicPromise },
            ]}
          />
          <div className="flex max-w-2xl flex-col gap-5">
            <h1
              className={cn(
                "text-hero-mobile font-semibold text-balance text-white lg:text-5xl",
                isBangla && "leading-tight",
              )}
            >
              {page.title}
            </h1>
            <p
              className={cn(
                "max-w-xl text-body text-white/85",
                isBangla && "leading-[1.8]",
              )}
            >
              {page.description}
            </p>
            <p
              className={cn(
                "max-w-xl text-base text-white/70",
                isBangla && "leading-[1.75]",
              )}
            >
              {page.sampleNote}
            </p>
            <Button
              asChild
              className="inline-flex h-12 w-fit items-center gap-2 rounded-btn bg-white px-6 text-button text-primary hover:bg-light-green"
            >
              <a href="#promise-choose">
                {page.jump.choose}
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>
          </div>
          <nav aria-label={page.jump.label}>
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-base">
              {(
                [
                  ["promise-choose", page.jump.choose],
                  ["promise-how", page.jump.how],
                  ["promise-not", page.jump.notThis],
                  ["promise-more", page.jump.more],
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
        <span className="sr-only">{page.heroImageAlt}</span>
      </section>

      <section className="bg-background pt-8 pb-0 md:pt-10">
        <Container>
          <aside
            className="flex gap-3 rounded-card bg-light-green p-5 ring-1 ring-border sm:p-6"
            aria-labelledby="promise-notice-heading"
          >
            <ShieldAlert
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <div className="min-w-0">
              <h2
                id="promise-notice-heading"
                className="text-base font-semibold text-foreground"
              >
                {page.notice.title}
              </h2>
              <p
                className={cn(
                  "mt-2 text-sm text-text-secondary",
                  isBangla && "leading-[1.75]",
                )}
              >
                {page.notice.body}
              </p>
            </div>
          </aside>
        </Container>
      </section>

      <section
        id="promise-choose"
        aria-labelledby="promise-choose-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={
              <span id="promise-choose-heading">{page.choose.title}</span>
            }
            description={page.choose.description}
          />

          <article className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border sm:mt-12">
            {confirmed ? (
              <div className="flex flex-col items-center gap-5 px-6 py-10 text-center sm:px-10 sm:py-12">
                <p className="text-sm font-semibold text-primary">
                  {copy.confirmed}
                </p>
                <h3
                  className={cn(
                    "text-xl font-semibold text-foreground sm:text-2xl",
                    isBangla && "leading-[1.45]",
                  )}
                >
                  {chosen.title}
                </h3>
                <p
                  className={cn(
                    "max-w-md text-body text-text-secondary",
                    isBangla && "leading-[1.7]",
                  )}
                >
                  {chosen.description}
                </p>
                <p
                  className={cn(
                    "max-w-md text-sm text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {copy.sampleNote}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="h-11 rounded-btn px-5 text-button text-primary-foreground"
                  >
                    <Link href={ROUTES.challenges}>
                      {copy.practiceCta}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-11">
                    <Link href={chosen.topicHref}>
                      {page.choose.topicCta}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </Button>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmed(false)}
                  className="text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {page.choose.chooseAnother}
                </button>
              </div>
            ) : (
              <form
                className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10"
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
                  className="gap-3"
                  aria-label={page.choose.title}
                >
                  {items.map((item) => {
                    const inputId = `page-civic-promise-${item.key}`;

                    return (
                      <label
                        key={item.key}
                        htmlFor={inputId}
                        className={cn(
                          "flex cursor-pointer items-start gap-4 rounded-card p-4 ring-1 ring-border transition-colors duration-200 ease-standard",
                          selected === item.key
                            ? "bg-light-green ring-primary"
                            : "bg-background hover:bg-light-green/60",
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
                <Button
                  type="submit"
                  size="lg"
                  className="h-11 w-fit rounded-btn px-5 text-button text-primary-foreground"
                >
                  {copy.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              </form>
            )}
          </article>
        </Container>
      </section>

      <section
        id="promise-how"
        aria-labelledby="promise-how-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="promise-how-heading">{page.how.title}</span>}
            description={page.how.description}
          />
          <ol className="mt-10 m-0 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {howItems.map((item, index) => (
              <li key={item.key}>
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
            ))}
          </ol>
        </Container>
      </section>

      <section
        id="promise-not"
        aria-labelledby="promise-not-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={
              <span id="promise-not-heading">{page.notThis.title}</span>
            }
            description={page.notThis.description}
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
        id="promise-more"
        aria-labelledby="promise-more-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="promise-more-heading">{page.more.title}</span>}
            description={page.more.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 lg:grid-cols-3 lg:gap-5">
            {moreItems.map((item) => {
              const Icon = MORE_ICONS[item.key];

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
    </div>
  );
}

export { CivicPromisePage };
