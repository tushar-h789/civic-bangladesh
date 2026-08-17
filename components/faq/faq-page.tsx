"use client";

import * as React from "react";
import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CircleHelp,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Landmark,
  ScrollText,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { FAQ_ITEMS, type FaqGroupKey } from "@/data/faq";
import { OFFICIAL_GOVERNMENT_PORTAL_HREF } from "@/data/government-services";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useTranslation } from "@/hooks/use-translation";
import {
  filterFaqGroups,
  getFaqGroups,
  getFaqRelatedPages,
} from "@/lib/get-faq-view";
import { SEARCH_DEBOUNCE_MS } from "@/lib/search-catalog";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { SearchInput } from "@/components/common/search-input";
import { SectionHeader } from "@/components/common/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/home/intro-people.png";

const GROUP_ICONS: Record<
  FaqGroupKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  about: Landmark,
  services: ScrollText,
  learning: GraduationCap,
  certificates: Award,
  challenges: HeartHandshake,
  organizations: Building2,
  usingTheSite: CircleHelp,
};

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function FaqPage() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.faq;
  const groups = getFaqGroups(t);
  const related = getFaqRelatedPages(t);
  const totalCount = FAQ_ITEMS.length;

  const [query, setQuery] = React.useState("");
  const searchQuery = useDebouncedValue(
    query,
    SEARCH_DEBOUNCE_MS,
    query.trim().length === 0,
  );
  const [openItems, setOpenItems] = React.useState<string[]>([
    FAQ_ITEMS[0].key,
  ]);

  const visibleGroups = React.useMemo(
    () => filterFaqGroups(groups, searchQuery),
    [groups, searchQuery],
  );
  const shownCount = visibleGroups.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );
  const isFiltering = searchQuery.trim().length > 0;
  const accordionValue = isFiltering
    ? visibleGroups.flatMap((group) => group.items.map((item) => item.key))
    : openItems;

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
            className="object-cover object-[60%_center]"
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
              { label: t.nav.resources.faq },
            ]}
          />
          <div className="flex max-w-2xl flex-col gap-5">
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
                "max-w-xl text-sm text-white/70",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.sampleNote}
            </p>
          </div>
          <nav aria-label={copy.jump.label}>
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-sm">
              <li>
                <a
                  href="#faq-questions"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.questions}
                </a>
              </li>
              <li>
                <a
                  href="#faq-related"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.related}
                </a>
              </li>
              <li>
                <a
                  href="#faq-official"
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

      <section
        id="faq-questions"
        aria-labelledby="faq-questions-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <h2 id="faq-questions-heading" className="sr-only">
            {copy.jump.questions}
          </h2>
          <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[18rem_minmax(0,1fr)] xl:gap-12">
          <aside className="hidden lg:block">
            <nav
              aria-label={copy.jump.questions}
              className="sticky top-24 rounded-card bg-surface p-4 shadow-card ring-1 ring-border"
            >
              <p className="text-sm font-semibold text-foreground">
                {copy.jump.questions}
              </p>
              <ul className="mt-3 flex list-none flex-col gap-1 p-0">
                {groups.map((group) => {
                  const Icon = GROUP_ICONS[group.key];

                  return (
                    <li key={group.key}>
                      <a
                        href={group.href}
                        className="flex items-center gap-2.5 rounded-btn px-2 py-2 text-sm text-foreground outline-none transition-colors hover:bg-muted hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <span className="min-w-0 leading-snug">
                          {group.title}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className="flex min-w-0 flex-col gap-10">
            <div className="rounded-card bg-surface p-4 shadow-card ring-1 ring-border sm:p-5">
              <SearchInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onClear={() => setQuery("")}
                placeholder={copy.search.placeholder}
                aria-label={copy.search.label}
                containerClassName="w-full"
                className="h-11 rounded-btn bg-background text-body"
              />
              <p
                aria-live="polite"
                className="mt-3 text-sm font-semibold text-primary"
              >
                {formatTemplate(copy.search.showing, {
                  shown: shownCount,
                  total: totalCount,
                })}
              </p>
            </div>

            <nav
              aria-label={copy.jump.questions}
              className="lg:hidden"
            >
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {groups.map((group) => (
                  <li key={group.key}>
                    <a
                      href={group.href}
                      className="inline-flex rounded-btn bg-surface px-3 py-1.5 text-sm font-medium text-foreground ring-1 ring-border outline-none hover:text-primary hover:ring-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {visibleGroups.length === 0 ? (
              <EmptyState
                icon={<CircleHelp className="size-6" aria-hidden />}
                title={copy.search.emptyTitle}
                description={copy.search.emptyDescription}
                action={
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setQuery("")}
                  >
                    {copy.search.clear}
                  </Button>
                }
              />
            ) : (
              visibleGroups.map((group) => {
                const Icon = GROUP_ICONS[group.key];

                return (
                  <div
                    key={group.key}
                    id={`faq-${group.key}`}
                    className="scroll-mt-28"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-xl font-semibold text-foreground">
                          {group.title}
                        </h2>
                        <p
                          className={cn(
                            "mt-1 text-sm text-text-secondary",
                            isBangla && "leading-[1.75]",
                          )}
                        >
                          {group.description}
                        </p>
                      </div>
                    </div>

                    <Accordion
                      type="multiple"
                      value={accordionValue}
                      onValueChange={(next) => {
                        if (!isFiltering) setOpenItems(next);
                      }}
                      className="mt-5 gap-0 overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border"
                    >
                      {group.items.map((item) => (
                        <AccordionItem
                          key={item.key}
                          value={item.key}
                          className="border-border px-5 sm:px-6"
                        >
                          <AccordionTrigger className="items-start py-5 text-left text-base font-semibold hover:no-underline">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p
                              className={cn(
                                "text-body text-text-secondary",
                                isBangla && "leading-[1.8]",
                              )}
                            >
                              {item.answer}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                );
              })
            )}
          </div>
          </div>
        </Container>
      </section>

      <section
        id="faq-related"
        aria-labelledby="faq-related-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={
              <span id="faq-related-heading">{copy.related.title}</span>
            }
            description={copy.related.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {related.map((page) => (
              <li key={page.key}>
                <article className="flex h-full flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
                  <h3
                    className={cn(
                      "text-lg font-semibold text-foreground",
                      isBangla && "leading-[1.45]",
                    )}
                  >
                    {page.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm text-text-secondary",
                      isBangla && "leading-[1.75]",
                    )}
                  >
                    {page.body}
                  </p>
                  <Link
                    href={page.href}
                    className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {page.title}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="faq-official"
        aria-labelledby="faq-official-heading"
        className="scroll-mt-28 bg-primary py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <h2
                id="faq-official-heading"
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
                id="faq-official-portal-note"
                className={cn(
                  "mt-3 text-sm text-white/70",
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
                  aria-describedby="faq-official-portal-note"
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

export { FaqPage };
