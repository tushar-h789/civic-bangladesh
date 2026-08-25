"use client";

import * as React from "react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Ban,
  Banknote,
  BookOpen,
  Building2,
  CircleHelp,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Landmark,
  ScrollText,
  Search,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { FAQ_ITEMS, type FaqGroupKey } from "@/data/faq";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useTranslation } from "@/hooks/use-translation";
import {
  filterFaqGroups,
  getFaqGroups,
  getFaqHowItems,
  getFaqNotItems,
  getFaqRelatedPages,
} from "@/lib/get-faq-view";
import { SEARCH_DEBOUNCE_MS } from "@/lib/search-catalog";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { SearchInput } from "@/components/common/search-input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/home/intro-people.png";

const GROUP_ICONS = {
  about: Landmark,
  services: ScrollText,
  learning: GraduationCap,
  certificates: Award,
  challenges: HeartHandshake,
  organizations: Building2,
  usingTheSite: CircleHelp,
} as const satisfies Record<
  FaqGroupKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const HOW_ICONS = {
  search: Search,
  civic: CircleHelp,
  apply: Landmark,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const NOT_ICONS = {
  notHelpdesk: Ban,
  notRules: ScrollText,
  notApply: Landmark,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const RELATED_ICONS = {
  services: ScrollText,
  courses: GraduationCap,
  civicLearning: BookOpen,
  pricing: Banknote,
  challenges: HeartHandshake,
  official: ExternalLink,
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

function FaqPage() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.faq;
  const groups = getFaqGroups(t);
  const howItems = getFaqHowItems(t);
  const notItems = getFaqNotItems(t);
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

  const jumpLinks = [
    { href: "#faq-questions", label: copy.jump.questions },
    { href: "#faq-how", label: copy.jump.how },
    { href: "#faq-not", label: copy.jump.notThis },
    { href: "#faq-related", label: copy.jump.related },
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
              { label: t.nav.resources.faq },
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
                icon={<CircleHelp className="size-3.5" aria-hidden />}
                label={formatTemplate(copy.stats.questions, {
                  count: totalCount,
                })}
              />
              <HeroChip
                icon={<Ban className="size-3.5" aria-hidden />}
                label={copy.stats.notHelpdesk}
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
          <FaqBodySection
            id="faq-questions"
            headingId="faq-questions-heading"
            title={copy.list.title}
            description={copy.list.description}
            meta={formatTemplate(copy.search.showing, {
              shown: shownCount,
              total: totalCount,
            })}
            isBangla={isBangla}
          >
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onClear={() => setQuery("")}
              placeholder={copy.search.placeholder}
              aria-label={copy.search.label}
              containerClassName="w-full"
              className="h-11 rounded-btn bg-background text-body"
            />

            <nav aria-label={copy.jump.questions} className="mt-4">
              <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                {groups.map((group) => (
                  <li key={group.key}>
                    <a
                      href={group.href}
                      className="inline-flex h-9 items-center rounded-btn bg-background px-3 text-sm font-medium text-text-secondary ring-1 ring-border outline-none transition-colors duration-200 ease-standard hover:bg-light-green hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {visibleGroups.length === 0 ? (
              <div className="mt-4">
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
              </div>
            ) : (
              <div className="mt-5 flex flex-col gap-5">
                {visibleGroups.map((group) => {
                  const Icon = GROUP_ICONS[group.key];

                  return (
                    <div
                      key={group.key}
                      id={`faq-${group.key}`}
                      className="scroll-mt-28"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold text-foreground">
                            {group.title}
                          </h3>
                          <p
                            className={cn(
                              "mt-0.5 text-sm text-text-secondary",
                              isBangla && "leading-[1.7]",
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
                        className="mt-3 gap-0 overflow-hidden rounded-card bg-background ring-1 ring-border"
                      >
                        {group.items.map((item) => (
                          <AccordionItem
                            key={item.key}
                            value={item.key}
                            className="border-border px-4 sm:px-5"
                          >
                            <AccordionTrigger className="items-start py-4 text-left text-sm font-semibold hover:no-underline sm:text-base">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p
                                className={cn(
                                  "text-sm text-text-secondary sm:text-body",
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
                })}
              </div>
            )}
          </FaqBodySection>

          <FaqBodySection
            id="faq-how"
            headingId="faq-how-heading"
            title={copy.how.title}
            description={copy.how.description}
            isBangla={isBangla}
          >
            <ol className="m-0 grid list-none gap-0 p-0 sm:grid-cols-3">
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
          </FaqBodySection>

          <FaqBodySection
            id="faq-not"
            headingId="faq-not-heading"
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
          </FaqBodySection>

          <FaqBodySection
            id="faq-related"
            headingId="faq-related-heading"
            title={copy.related.title}
            description={copy.related.description}
            isBangla={isBangla}
          >
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((page) => {
                const Icon = RELATED_ICONS[page.key];
                const className =
                  "flex h-full cursor-pointer flex-col gap-3 rounded-card bg-background p-4 outline-none ring-1 ring-border transition-shadow duration-200 ease-standard hover:shadow-card focus-visible:ring-3 focus-visible:ring-ring/50";

                const inner = (
                  <>
                    <span className="flex size-9 items-center justify-center rounded-btn bg-light-green text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {page.title}
                    </p>
                    <p
                      className={cn(
                        "text-sm text-text-secondary",
                        isBangla && "leading-[1.7]",
                      )}
                    >
                      {page.body}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {page.cta}
                      {page.external ? (
                        <ExternalLink className="size-3.5" aria-hidden />
                      ) : (
                        <ArrowRight className="size-3.5" aria-hidden />
                      )}
                    </span>
                  </>
                );

                return (
                  <li key={page.key}>
                    {page.external ? (
                      <a
                        href={page.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link href={page.href} className={className}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </FaqBodySection>
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

function FaqBodySection({
  id,
  headingId,
  title,
  description,
  meta,
  isBangla,
  children,
}: {
  id: string;
  headingId: string;
  title: string;
  description: string;
  meta?: string;
  isBangla: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-28">
      <article className="rounded-card bg-surface p-4 shadow-card ring-1 ring-border sm:p-5">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h2
            id={headingId}
            className={cn(
              "text-xl font-semibold text-foreground sm:text-2xl",
              isBangla && "leading-tight",
            )}
          >
            {title}
          </h2>
          {meta ? (
            <p className="text-sm font-medium text-text-secondary sm:pt-1.5">
              {meta}
            </p>
          ) : null}
        </div>
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

export { FaqPage };
