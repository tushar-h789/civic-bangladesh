"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  ListChecks,
  Megaphone,
  ShieldAlert,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { getStoryBySlug, type StoryKind } from "@/data/civic-stories";
import { useTranslation } from "@/hooks/use-translation";
import {
  getStoriesPractice,
  getStoryKindFilters,
  getStoryViews,
} from "@/lib/get-stories-view";
import { Badge } from "@/components/common/badge";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { SectionHeader } from "@/components/common/section-header";
import { StoryCard } from "@/components/community/story-card";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/home/intro-spaces.png";

const PRACTICE_ICONS = {
  civicLearning: BookOpen,
  challenges: ListChecks,
  campaigns: Megaphone,
  promise: HeartHandshake,
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

function StoriesPage({
  selectedSlug,
  selectedKind,
}: {
  selectedSlug?: string;
  selectedKind?: StoryKind;
}) {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.stories;
  const selectedStory = getStoryBySlug(selectedSlug);
  const selectedMissing = Boolean(selectedSlug) && !selectedStory;
  const allViews = getStoryViews(t);
  const views = selectedKind
    ? allViews.filter((story) => story.kind === selectedKind)
    : allViews;
  const selectedView = selectedStory
    ? allViews.find((story) => story.slug === selectedStory.slug)
    : undefined;
  const filters = getStoryKindFilters(t);
  const practice = getStoriesPractice(t);

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
              { label: t.nav.resources.stories },
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
                  href="#stories-list"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.stories}
                </a>
              </li>
              <li>
                <a
                  href="#stories-practice"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.practice}
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
            aria-labelledby="stories-notice-heading"
          >
            <ShieldAlert
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <div className="min-w-0">
              <h2
                id="stories-notice-heading"
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

      {(selectedView || selectedMissing) && (
        <section
          id="story-reading"
          aria-labelledby="story-reading-heading"
          className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
        >
          <Container>
            {selectedView ? (
              <article className="overflow-hidden rounded-card bg-surface ring-1 ring-border">
                <div className="grid lg:grid-cols-2">
                  <div className="relative min-h-64 overflow-hidden sm:min-h-80 lg:min-h-full">
                    <Image
                      src={selectedView.image}
                      alt={selectedView.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="flex flex-col p-5 sm:p-8 lg:p-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="info">{selectedView.kindLabel}</Badge>
                      <Badge variant="outline">{copy.reading.sampleBadge}</Badge>
                    </div>
                    <h2
                      id="story-reading-heading"
                      className={cn(
                        "mt-4 text-section-heading font-semibold text-balance text-foreground",
                        isBangla && "leading-tight",
                      )}
                    >
                      {selectedView.title}
                    </h2>
                    <p className="mt-2 text-sm text-text-secondary">
                      {selectedView.byline}
                    </p>
                    <p
                      className={cn(
                        "mt-6 text-body text-text-secondary",
                        isBangla && "leading-[1.8]",
                      )}
                    >
                      {selectedView.one}
                    </p>
                    <p
                      className={cn(
                        "mt-4 text-body text-text-secondary",
                        isBangla && "leading-[1.8]",
                      )}
                    >
                      {selectedView.two}
                    </p>
                    <p
                      className={cn(
                        "mt-6 text-base font-semibold text-foreground",
                        isBangla && "leading-[1.45]",
                      )}
                    >
                      {copy.reading.habitLabel}
                    </p>
                    <p
                      className={cn(
                        "mt-2 text-sm text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {selectedView.habit}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Button asChild className="w-fit text-primary-foreground">
                        <Link href={selectedView.topicHref}>
                          {copy.reading.topicCta}
                          <ArrowRight className="size-4" aria-hidden />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-fit">
                        <Link href={ROUTES.stories}>
                          {copy.reading.backCta}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ) : (
              <EmptyState
                title={
                  <span id="story-reading-heading">{copy.missing.title}</span>
                }
                description={copy.missing.description}
                action={
                  <Button asChild variant="outline">
                    <Link href={ROUTES.stories}>{copy.reading.backCta}</Link>
                  </Button>
                }
              />
            )}
          </Container>
        </section>
      )}

      <section
        id="stories-list"
        aria-labelledby="stories-list-heading"
        className={cn(
          "scroll-mt-28 py-section-mobile md:py-section-tablet lg:py-section-desktop",
          selectedView || selectedMissing ? "bg-light-green" : "bg-background",
        )}
      >
        <Container>
          <SectionHeader
            title={<span id="stories-list-heading">{copy.list.title}</span>}
            description={copy.list.description}
          />

          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label={copy.filter.label}>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {filters.map((filter) => {
                  const isActive = filter.kind === selectedKind;

                  return (
                    <li key={filter.kind ?? "all"}>
                      <Link
                        href={filter.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "inline-flex h-9 items-center rounded-btn px-3 text-sm font-medium outline-none ring-1 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                          isActive
                            ? "bg-primary text-primary-foreground ring-primary"
                            : "bg-surface text-text-secondary ring-border hover:bg-light-green hover:text-primary",
                        )}
                      >
                        {filter.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <p className="text-sm text-text-secondary">
              {formatTemplate(copy.filter.showing, { count: views.length })}
            </p>
          </div>

          <ul className="mt-8 grid list-none gap-4 p-0 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {views.map((story) => (
              <li key={story.key} id={story.slug}>
                <StoryCard
                  href={story.href}
                  image={story.image}
                  imageAlt={story.imageAlt}
                  kind={story.kindLabel}
                  title={story.title}
                  excerpt={story.excerpt}
                  byline={story.byline}
                  cta={copy.cta}
                  className={
                    selectedView?.slug === story.slug
                      ? "ring-2 ring-primary"
                      : undefined
                  }
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="stories-practice"
        aria-labelledby="stories-practice-heading"
        className={cn(
          "scroll-mt-28 py-section-mobile md:py-section-tablet lg:py-section-desktop",
          selectedView || selectedMissing ? "bg-background" : "bg-light-green",
        )}
      >
        <Container>
          <SectionHeader
            title={
              <span id="stories-practice-heading">{copy.practice.title}</span>
            }
            description={copy.practice.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {practice.map((item) => {
              const Icon = PRACTICE_ICONS[item.key];

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

export { StoriesPage };
