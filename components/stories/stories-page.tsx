"use client";

import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BookOpenText,
  HeartHandshake,
  Landmark,
  ListChecks,
  MapPin,
  Megaphone,
  Newspaper,
  Sparkles,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { getStoryBySlug, type StoryKind } from "@/data/civic-stories";
import { useTranslation } from "@/hooks/use-translation";
import {
  getStoriesHowItems,
  getStoriesNotItems,
  getStoriesPractice,
  getStoryKindFilters,
  getStoryViews,
} from "@/lib/get-stories-view";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/home/intro-spaces.png";

const HOW_ICONS = {
  read: BookOpenText,
  habit: Sparkles,
  practice: ListChecks,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const NOT_ICONS = {
  notNews: Newspaper,
  notOfficial: Landmark,
  notVerified: Users,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

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
  const howItems = getStoriesHowItems(t);
  const notItems = getStoriesNotItems(t);
  const practice = getStoriesPractice(t);

  const jumpLinks = [
    { href: "#stories-list", label: copy.jump.stories },
    { href: "#stories-how", label: copy.jump.how },
    { href: "#stories-not", label: copy.jump.notThis },
    { href: "#stories-practice", label: copy.jump.practice },
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
              { label: t.nav.resources.stories },
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
                icon={<BookOpenText className="size-3.5" aria-hidden />}
                label={formatTemplate(copy.stats.stories, {
                  count: allViews.length,
                })}
              />
              <HeroChip
                icon={<Users className="size-3.5" aria-hidden />}
                label={copy.stats.kinds}
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
          {(selectedView || selectedMissing) && (
            <section
              id="story-reading"
              aria-labelledby="story-reading-heading"
              className="scroll-mt-28"
            >
              {selectedView ? (
                <article className="overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border">
                  <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
                    <div className="relative min-h-52 overflow-hidden sm:min-h-72 lg:min-h-full">
                      <Image
                        src={selectedView.image}
                        alt={selectedView.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="flex flex-col gap-3 p-4 sm:p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-btn bg-light-green px-2.5 py-1 text-xs font-semibold text-primary">
                          {selectedView.kindLabel}
                        </span>
                        <span className="rounded-btn bg-background px-2.5 py-1 text-xs font-medium text-text-secondary ring-1 ring-border">
                          {copy.reading.sampleBadge}
                        </span>
                      </div>
                      <h2
                        id="story-reading-heading"
                        className={cn(
                          "text-xl font-semibold text-balance text-foreground sm:text-2xl",
                          isBangla && "leading-tight",
                        )}
                      >
                        {selectedView.title}
                      </h2>
                      <p className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
                        <MapPin className="size-3.5 text-primary" aria-hidden />
                        {selectedView.byline}
                      </p>
                      <p
                        className={cn(
                          "text-sm text-text-secondary sm:text-base",
                          isBangla && "leading-[1.8]",
                        )}
                      >
                        {selectedView.one}
                      </p>
                      <p
                        className={cn(
                          "text-sm text-text-secondary sm:text-base",
                          isBangla && "leading-[1.8]",
                        )}
                      >
                        {selectedView.two}
                      </p>
                      <div className="rounded-btn bg-light-green px-3 py-2.5">
                        <p className="text-xs font-semibold text-primary">
                          {copy.reading.habitLabel}
                        </p>
                        <p
                          className={cn(
                            "mt-1 text-sm font-medium text-foreground",
                            isBangla && "leading-[1.7]",
                          )}
                        >
                          {selectedView.habit}
                        </p>
                      </div>
                      <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row sm:flex-wrap">
                        <Button asChild className="h-11 rounded-btn">
                          <Link href={selectedView.topicHref}>
                            {copy.reading.topicCta}
                            <ArrowRight className="size-3.5" aria-hidden />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="h-11 rounded-btn"
                        >
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
            </section>
          )}

          <StoriesBodySection
            id="stories-list"
            headingId="stories-list-heading"
            title={copy.list.title}
            description={copy.list.description}
            meta={formatTemplate(copy.filter.showing, { count: views.length })}
            isBangla={isBangla}
          >
            <nav aria-label={copy.filter.label} className="mb-4">
              <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                {filters.map((filter) => {
                  const isActive = filter.kind === selectedKind;

                  return (
                    <li key={filter.kind ?? "all"}>
                      <Link
                        href={filter.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "inline-flex h-9 items-center rounded-btn px-3 text-sm font-medium outline-none ring-1 transition-colors duration-200 ease-standard focus-visible:ring-3 focus-visible:ring-ring/50",
                          isActive
                            ? "bg-primary text-primary-foreground ring-primary"
                            : "bg-background text-text-secondary ring-border hover:bg-light-green hover:text-primary",
                        )}
                      >
                        {filter.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {views.map((story) => (
                <li key={story.key} id={story.slug}>
                  <StoryClipCard
                    href={story.href}
                    image={story.image}
                    imageAlt={story.imageAlt}
                    kind={story.kindLabel}
                    title={story.title}
                    excerpt={story.excerpt}
                    byline={story.byline}
                    cta={copy.cta}
                    selected={selectedView?.slug === story.slug}
                    isBangla={isBangla}
                  />
                </li>
              ))}
            </ul>
          </StoriesBodySection>

          <StoriesBodySection
            id="stories-how"
            headingId="stories-how-heading"
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
          </StoriesBodySection>

          <StoriesBodySection
            id="stories-not"
            headingId="stories-not-heading"
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
          </StoriesBodySection>

          <StoriesBodySection
            id="stories-practice"
            headingId="stories-practice-heading"
            title={copy.practice.title}
            description={copy.practice.description}
            isBangla={isBangla}
          >
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
              {practice.map((item) => {
                const Icon = PRACTICE_ICONS[item.key];

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
          </StoriesBodySection>
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

function StoriesBodySection({
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

function StoryClipCard({
  href,
  image,
  imageAlt,
  kind,
  title,
  excerpt,
  byline,
  cta,
  selected,
  isBangla,
}: {
  href: string;
  image: string;
  imageAlt: string;
  kind: string;
  title: string;
  excerpt: string;
  byline: string;
  cta: string;
  selected: boolean;
  isBangla: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card bg-background ring-1 ring-border",
        selected && "ring-2 ring-primary",
      )}
    >
      <Link
        href={href}
        className="flex h-full cursor-pointer flex-col outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-standard group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-text/45 via-transparent to-text/10"
          />
          <span className="absolute top-3 left-3 rounded-btn bg-white/90 px-2 py-0.5 text-xs font-semibold text-primary">
            {kind}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <h3
            className={cn(
              "text-base font-semibold text-balance text-foreground",
              isBangla && "leading-[1.45]",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "line-clamp-2 text-sm text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            {excerpt}
          </p>
          <p className="text-xs text-text-secondary">{byline}</p>
          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary">
            {cta}
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}

export { StoriesPage };
