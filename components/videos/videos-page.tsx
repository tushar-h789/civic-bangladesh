"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  BookOpen,
  Clapperboard,
  ExternalLink,
  GraduationCap,
  Landmark,
  Play,
  ShieldAlert,
  Tv,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import {
  getCivicVideoBySlug,
} from "@/data/civic-learning";
import type { CivicTopicKey } from "@/data/civic-topics";
import { useTranslation } from "@/hooks/use-translation";
import { getCivicShortVideos } from "@/lib/get-civic-learning-view";
import {
  getVideoTopicFilters,
  getVideosCatalog,
  getVideosHowItems,
  getVideosMoreItems,
  getVideosNotItems,
} from "@/lib/get-videos-view";
import { Badge } from "@/components/common/badge";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/topics/topic-road.png";

const NOT_ICONS = {
  notGovernment: Landmark,
  notChannel: Tv,
  notApplication: Ban,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const MORE_ICONS = {
  civicLearning: BookOpen,
  courses: GraduationCap,
  stories: Clapperboard,
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

function VideosPage({
  selectedSlug,
  selectedTopic,
}: {
  selectedSlug?: string;
  selectedTopic?: CivicTopicKey;
}) {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.videos;
  const clips = t.civicLearning.videos;
  const selectedRecord = getCivicVideoBySlug(selectedSlug);
  const selectedMissing = Boolean(selectedSlug) && !selectedRecord;
  const allVideos = getCivicShortVideos(t);
  const videos = getVideosCatalog(t, selectedTopic);
  const selectedVideo = selectedRecord
    ? allVideos.find((video) => video.slug === selectedRecord.slug)
    : undefined;
  const filters = getVideoTopicFilters(t);
  const howItems = getVideosHowItems(t);
  const notItems = getVideosNotItems(t);
  const moreItems = getVideosMoreItems(t);

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
              { label: t.nav.resources.videos },
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
              {(
                [
                  ["videos-list", copy.jump.clips],
                  ["videos-how", copy.jump.how],
                  ["videos-not", copy.jump.notThis],
                  ["videos-more", copy.jump.more],
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
            aria-labelledby="videos-notice-heading"
          >
            <ShieldAlert
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <div className="min-w-0">
              <h2
                id="videos-notice-heading"
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

      {(selectedVideo || selectedMissing) && (
        <section
          id="video-watching"
          aria-labelledby="video-watching-heading"
          className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
        >
          <Container>
            {selectedVideo ? (
              <article className="overflow-hidden rounded-card bg-surface ring-1 ring-border">
                {selectedVideo.youtubeId ? (
                  <div className="overflow-hidden bg-text">
                    <div className="relative aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                        title={selectedVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute inset-0 size-full border-0"
                      />
                    </div>
                    <p
                      className={cn(
                        "px-4 py-2.5 text-center text-xs text-white/70",
                        isBangla && "leading-[1.7]",
                      )}
                    >
                      {copy.watching.hostedNote}
                    </p>
                  </div>
                ) : (
                  <div className="relative min-h-52 overflow-hidden sm:min-h-72">
                    <Image
                      src={selectedVideo.image}
                      alt={selectedVideo.imageAlt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                <div className="flex flex-col p-5 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="info">{selectedVideo.topicTitle}</Badge>
                    <Badge variant="outline">{copy.watching.sampleBadge}</Badge>
                  </div>
                  <h2
                    id="video-watching-heading"
                    className={cn(
                      "mt-4 text-section-heading font-semibold text-balance text-foreground",
                      isBangla && "leading-tight",
                    )}
                  >
                    {selectedVideo.title}
                  </h2>
                  <p
                    className={cn(
                      "mt-3 max-w-2xl text-body text-text-secondary",
                      isBangla && "leading-[1.8]",
                    )}
                  >
                    {selectedVideo.description}
                  </p>
                  <p className="mt-3 text-sm font-medium text-text-secondary">
                    {formatTemplate(clips.minutes, {
                      count: selectedVideo.minutes,
                    })}
                  </p>
                  {!selectedVideo.youtubeId ? (
                    <>
                      <p
                        className={cn(
                          "mt-6 text-base font-semibold text-foreground",
                          isBangla && "leading-[1.45]",
                        )}
                      >
                        {copy.watching.missingTitle}
                      </p>
                      <p
                        className={cn(
                          "mt-2 max-w-2xl text-sm text-text-secondary",
                          isBangla && "leading-[1.75]",
                        )}
                      >
                        {copy.watching.missingBody}
                      </p>
                    </>
                  ) : null}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {selectedVideo.youtubeHref ? (
                      <Button asChild className="w-fit text-primary-foreground">
                        <a
                          href={selectedVideo.youtubeHref}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {copy.watching.youtubeCta}
                          <ExternalLink className="size-4" aria-hidden />
                        </a>
                      </Button>
                    ) : null}
                    <Button
                      asChild
                      variant={selectedVideo.youtubeHref ? "outline" : "default"}
                      className={cn(
                        "w-fit",
                        !selectedVideo.youtubeHref && "text-primary-foreground",
                      )}
                    >
                      <Link href={selectedVideo.topicHref}>
                        {copy.watching.topicCta}
                        <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </Button>
                    {selectedVideo.courseHref ? (
                      <Button asChild variant="outline" className="w-fit">
                        <Link href={selectedVideo.courseHref}>
                          {copy.watching.courseCta}
                          <ArrowRight className="size-4" aria-hidden />
                        </Link>
                      </Button>
                    ) : null}
                    <Button asChild variant="outline" className="w-fit">
                      <Link href={ROUTES.videos}>{copy.watching.backCta}</Link>
                    </Button>
                  </div>
                </div>
              </article>
            ) : (
              <EmptyState
                title={
                  <span id="video-watching-heading">{copy.missing.title}</span>
                }
                description={copy.missing.description}
                action={
                  <Button asChild variant="outline">
                    <Link href={ROUTES.videos}>{copy.watching.backCta}</Link>
                  </Button>
                }
              />
            )}
          </Container>
        </section>
      )}

      <section
        id="videos-list"
        aria-labelledby="videos-list-heading"
        className={cn(
          "scroll-mt-28 py-section-mobile md:py-section-tablet lg:py-section-desktop",
          selectedVideo || selectedMissing ? "bg-light-green" : "bg-background",
        )}
      >
        <Container>
          <SectionHeader
            title={<span id="videos-list-heading">{copy.list.title}</span>}
            description={copy.list.description}
          />

          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label={copy.filter.label}>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {filters.map((filter) => {
                  const isActive = filter.topicKey === selectedTopic;

                  return (
                    <li key={filter.topicKey ?? "all"}>
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
              {formatTemplate(copy.filter.showing, { count: videos.length })}
            </p>
          </div>

          <ul className="mt-8 grid list-none gap-4 p-0 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {videos.map((video) => (
              <li key={video.key} id={video.slug}>
                <VideoClipCard
                  href={video.href}
                  image={video.image}
                  imageAlt={video.imageAlt}
                  kicker={video.topicTitle}
                  title={video.title}
                  description={video.description}
                  meta={formatTemplate(clips.minutes, { count: video.minutes })}
                  cta={clips.watch}
                  badge={clips.sampleBadge}
                  hosted={Boolean(video.youtubeId)}
                  selected={selectedVideo?.slug === video.slug}
                  isBangla={isBangla}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="videos-how"
        aria-labelledby="videos-how-heading"
        className={cn(
          "scroll-mt-28 py-section-mobile md:py-section-tablet lg:py-section-desktop",
          selectedVideo || selectedMissing ? "bg-background" : "bg-light-green",
        )}
      >
        <Container>
          <SectionHeader
            title={<span id="videos-how-heading">{copy.how.title}</span>}
            description={copy.how.description}
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
        id="videos-not"
        aria-labelledby="videos-not-heading"
        className={cn(
          "scroll-mt-28 py-section-mobile md:py-section-tablet lg:py-section-desktop",
          selectedVideo || selectedMissing ? "bg-light-green" : "bg-background",
        )}
      >
        <Container>
          <SectionHeader
            title={<span id="videos-not-heading">{copy.notThis.title}</span>}
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
        id="videos-more"
        aria-labelledby="videos-more-heading"
        className={cn(
          "scroll-mt-28 py-section-mobile md:py-section-tablet lg:py-section-desktop",
          selectedVideo || selectedMissing ? "bg-background" : "bg-light-green",
        )}
      >
        <Container>
          <SectionHeader
            title={<span id="videos-more-heading">{copy.more.title}</span>}
            description={copy.more.description}
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

function VideoClipCard({
  href,
  image,
  imageAlt,
  kicker,
  title,
  description,
  meta,
  cta,
  badge,
  hosted,
  selected,
  isBangla,
}: {
  href: string;
  image: string;
  imageAlt: string;
  kicker: string;
  title: string;
  description: string;
  meta: string;
  cta: string;
  badge: string;
  hosted: boolean;
  selected: boolean;
  isBangla: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border",
        selected && "ring-2 ring-primary",
      )}
    >
      <Link
        href={href}
        className="flex h-full flex-col outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
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
            className="absolute inset-0 bg-linear-to-t from-text/40 via-transparent to-text/10"
          />
          {hosted ? (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-card">
                <Play className="size-5 fill-current" aria-hidden />
              </span>
            </span>
          ) : null}
          <Badge
            variant="outline"
            className="absolute top-3 left-3 h-6 bg-white/90 px-2.5"
          >
            {badge}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <p className="text-xs font-semibold text-primary">{kicker}</p>
          <h3
            className={cn(
              "text-lg font-semibold text-balance text-foreground",
              isBangla && "leading-[1.45]",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "text-sm text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            {description}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-3">
            <p className="text-sm font-medium text-text-secondary">{meta}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              {cta}
              <ArrowRight className="size-3.5" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export { VideosPage };
