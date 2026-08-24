"use client";

import type { ComponentType } from "react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BusFront,
  CarFront,
  ExternalLink,
  HeartHandshake,
  Landmark,
  Leaf,
  Play,
  Smartphone,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import {
  CIVIC_TOPICS,
  civicTopicAnchor,
  type CivicTopicKey,
} from "@/data/civic-topics";
import { THIRTY_DAY_CHALLENGE } from "@/data/civic-challenge";
import type { CivicRecommendedPathKey } from "@/data/civic-learning";
import { ChallengeTypeLabel } from "@/components/challenge/challenge-type-label";
import { CIVIC_PROMISES, type CivicPromiseKey } from "@/data/civic-promises";
import { useTranslation } from "@/hooks/use-translation";
import {
  getCivicFeaturedLessons,
  getCivicHubQuizzes,
  getCivicHubScenarios,
  getCivicRecommendedPaths,
  getCivicShortVideos,
} from "@/lib/get-civic-learning-view";
import { Badge } from "@/components/common/badge";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { SectionHeader } from "@/components/common/section-header";
import { ScenarioPlayer } from "@/components/common/scenario-player";
import {
  TopicCard,
  type TopicCardVariant,
} from "@/components/civic/topic-card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const HERO_IMAGE = "/images/home/civic-learning-hero-livable.png";

const TOPIC_ICONS: Record<
  CivicTopicKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  roadTraffic: CarFront,
  cleanliness: Sparkles,
  environment: Leaf,
  publicSpaces: Landmark,
  publicTransport: BusFront,
  socialResponsibility: HeartHandshake,
  digitalCitizenship: Smartphone,
  communityResponsibility: UsersRound,
};

const RECOMMENDED_ICONS: Record<
  CivicRecommendedPathKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  startHere: Sparkles,
  practiceStreets: CarFront,
  leadAGroup: UsersRound,
};

const TOPIC_ROWS: {
  keys: CivicTopicKey[];
  variant: TopicCardVariant;
  columns: string;
}[] = [
  {
    keys: ["roadTraffic", "cleanliness", "environment"],
    variant: "tall",
    columns: "sm:grid-cols-2 lg:grid-cols-3",
  },
  {
    keys: ["publicSpaces", "publicTransport"],
    variant: "wide",
    columns: "lg:grid-cols-2",
  },
  {
    keys: [
      "socialResponsibility",
      "digitalCitizenship",
      "communityResponsibility",
    ],
    variant: "standard",
    columns: "sm:grid-cols-2 lg:grid-cols-3",
  },
];

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function CivicLearningHub() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.civicLearning;
  const lessons = getCivicFeaturedLessons(t);
  const videos = getCivicShortVideos(t);
  const quizzes = getCivicHubQuizzes(t);
  const recommended = getCivicRecommendedPaths(t);
  const scenarios = useMemo(() => getCivicHubScenarios(t), [t]);
  const [activeQuizKey, setActiveQuizKey] = useState(quizzes[0]?.key ?? "");
  const activeQuiz =
    quizzes.find((quiz) => quiz.key === activeQuizKey) ?? quizzes[0];
  const todayHabit =
    t.challenge.habits[
      THIRTY_DAY_CHALLENGE.currentDay as keyof typeof t.challenge.habits
    ];

  const jump = [
    { href: "#civic-topics", label: copy.jump.topics },
    { href: "#featured-lessons", label: copy.jump.lessons },
    { href: "#short-videos", label: copy.jump.videos },
    { href: "#civic-scenarios", label: copy.jump.scenarios },
    { href: "#civic-quizzes", label: copy.jump.quizzes },
    { href: "#civic-challenges", label: copy.jump.challenges },
    { href: "#civic-promise", label: copy.jump.promise },
    { href: "#recommended-learning", label: copy.jump.recommended },
  ];

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
            className="object-cover object-[68%_center]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-text/82 via-text/45 to-text/15"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-text/50 via-transparent to-text/20"
        />

        <Container className="relative flex flex-col gap-5 pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16">
          <Breadcrumb
            tone="onPrimary"
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.nav.links.civicLearning },
            ]}
          />

          <div className="flex max-w-2xl flex-col gap-3">
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 px-6 text-button bg-white text-primary hover:bg-light-green"
              >
                <a href="#civic-topics">{copy.hero.primaryCta}</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-6 text-button border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={ROUTES.challenges}>{copy.hero.secondaryCta}</Link>
              </Button>
            </div>
          </div>

          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
            <HeroStat>
              {formatTemplate(copy.stats.topics, {
                count: CIVIC_TOPICS.length,
              })}
            </HeroStat>
            <HeroStat>{copy.stats.lessons}</HeroStat>
            <HeroStat>{copy.stats.challenge}</HeroStat>
            <HeroStat>{copy.hero.freeNote}</HeroStat>
          </ul>

          <nav aria-label={copy.jump.label}>
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-base">
              {jump.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
        <span className="sr-only">{copy.hero.imageAlt}</span>
      </section>

      <section
        id="civic-topics"
        aria-labelledby="civic-topics-heading"
        className="scroll-mt-28 bg-light-green py-10 md:py-12 lg:py-14"
      >
        <Container>
          <SectionHeader
            className="gap-3"
            title={<span id="civic-topics-heading">{copy.topics.title}</span>}
            description={copy.topics.description}
          />
          <div className="mt-5 flex flex-col gap-3">
            {TOPIC_ROWS.map((row) => (
              <ul
                key={row.variant}
                className={cn("grid list-none gap-3 p-0", row.columns)}
              >
                {row.keys.map((key) => {
                  const topic = CIVIC_TOPICS.find((entry) => entry.key === key);
                  if (!topic) return null;

                  const Icon = TOPIC_ICONS[key];
                  const item = t.home.topics.items[key];
                  const index = CIVIC_TOPICS.findIndex(
                    (entry) => entry.key === key,
                  );
                  const relatedLesson = lessons.find(
                    (lesson) => lesson.topicKey === key,
                  );

                  return (
                    <li
                      key={key}
                      id={civicTopicAnchor(topic.slug)}
                      className="scroll-mt-28"
                    >
                      <TopicCard
                        href={relatedLesson?.href ?? "#featured-lessons"}
                        variant={row.variant}
                        image={topic.image}
                        imageAlt={item.imageAlt}
                        index={formatIndex(index)}
                        icon={<Icon className="size-5" aria-hidden />}
                        title={item.title}
                        description={item.description}
                        lessonCount={formatTemplate(copy.topics.lessonCount, {
                          count: topic.lessonCount,
                        })}
                        cta={copy.topics.cta}
                      />
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="featured-lessons"
        aria-labelledby="featured-lessons-heading"
        className="scroll-mt-28 bg-background py-10 md:py-12 lg:py-14"
      >
        <Container>
          <SectionHeader
            className="gap-3"
            title={
              <span id="featured-lessons-heading">{copy.lessons.title}</span>
            }
            description={copy.lessons.description}
          />
          {lessons.length === 0 ? (
            <div className="mt-5">
              <EmptyState
                title={copy.lessons.emptyTitle}
                description={copy.lessons.emptyDescription}
              />
            </div>
          ) : (
            <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson) => (
                <li key={lesson.key}>
                  <StoryCard
                    href={lesson.href}
                    image={lesson.image}
                    imageAlt={lesson.imageAlt}
                    kicker={lesson.topicTitle}
                    title={lesson.title}
                    description={lesson.description}
                    meta={formatTemplate(copy.lessons.minutes, {
                      count: lesson.minutes,
                    })}
                    cta={copy.lessons.cta}
                    isBangla={isBangla}
                  />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section
        id="short-videos"
        aria-labelledby="short-videos-heading"
        className="scroll-mt-28 bg-light-green py-10 md:py-12 lg:py-14"
      >
        <Container>
          <SectionHeader
            className="gap-3"
            title={<span id="short-videos-heading">{copy.videos.title}</span>}
            description={copy.videos.description}
            actions={
              <Button asChild variant="outline">
                <Link href={ROUTES.videos}>{copy.videos.browse}</Link>
              </Button>
            }
          />
          {videos.length === 0 ? (
            <div className="mt-5">
              <EmptyState
                title={copy.videos.emptyTitle}
                description={copy.videos.emptyDescription}
              />
            </div>
          ) : (
            <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <li key={video.key}>
                  <StoryCard
                    href={video.href}
                    image={video.image}
                    imageAlt={video.imageAlt}
                    kicker={video.topicTitle}
                    title={video.title}
                    description={video.description}
                    meta={formatTemplate(copy.videos.minutes, {
                      count: video.minutes,
                    })}
                    cta={copy.videos.watch}
                    badge={copy.videos.sampleBadge}
                    play
                    external={video.external}
                    isBangla={isBangla}
                  />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section
        id="civic-scenarios"
        aria-labelledby="civic-scenarios-heading"
        className="scroll-mt-28 bg-background py-10 md:py-12 lg:py-14"
      >
        <Container>
          <SectionHeader
            className="gap-3"
            title={
              <span id="civic-scenarios-heading">{copy.scenarios.title}</span>
            }
            description={copy.scenarios.description}
          />
          <div className="mt-5">
            <ScenarioPlayer scenarios={scenarios} copy={t.scenarios.player} />
          </div>
        </Container>
      </section>

      <section
        id="civic-quizzes"
        aria-labelledby="civic-quizzes-heading"
        className="scroll-mt-28 relative z-10 isolate overflow-hidden bg-light-green py-10 md:py-12 lg:py-14"
      >
        <Container>
          <SectionHeader
            className="gap-3"
            title={<span id="civic-quizzes-heading">{copy.quizzes.title}</span>}
            description={copy.quizzes.description}
          />
          <p
            className={cn(
              "mt-4 text-base text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            {copy.quizzes.sampleNote}
          </p>
          {quizzes.length === 0 || !activeQuiz ? (
            <div className="mt-5">
              <EmptyState
                title={copy.quizzes.emptyTitle}
                description={copy.quizzes.emptyDescription}
              />
            </div>
          ) : (
            <div className="mt-5 grid gap-3 lg:grid-cols-12">
              <ul className="m-0 flex list-none flex-col gap-3 p-0 lg:col-span-4">
                {quizzes.map((quiz) => {
                  const selected = quiz.key === activeQuiz.key;

                  return (
                    <li key={quiz.key}>
                      <button
                        type="button"
                        onClick={() => setActiveQuizKey(quiz.key)}
                        aria-pressed={selected}
                        className={cn(
                          "w-full rounded-card p-4 text-left ring-1 transition-colors duration-200 ease-standard",
                          "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                          selected
                            ? "bg-surface ring-primary"
                            : "bg-surface/70 ring-border hover:bg-surface",
                        )}
                      >
                        <p className="text-xs font-semibold text-primary">
                          {quiz.topicTitle}
                        </p>
                        <p
                          className={cn(
                            "mt-1 text-base font-semibold text-foreground",
                            isBangla && "leading-[1.45]",
                          )}
                        >
                          {quiz.title}
                        </p>
                        <p
                          className={cn(
                            "mt-1 text-sm text-text-secondary",
                            isBangla && "leading-[1.7]",
                          )}
                        >
                          {quiz.description}
                        </p>
                        <p className="mt-2 text-xs font-medium text-text-secondary">
                          {formatTemplate(copy.quizzes.questions, {
                            count: quiz.questionCount,
                          })}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="lg:col-span-8">
                <ScenarioPlayer
                  key={activeQuiz.key}
                  scenarios={activeQuiz.scenarios}
                  copy={t.scenarios.player}
                />
              </div>
            </div>
          )}
        </Container>
      </section>

      <section
        id="civic-challenges"
        aria-labelledby="civic-challenges-heading"
        className="scroll-mt-28 relative z-10 bg-text py-10 md:py-12 lg:py-14"
      >
        <Container>
          <div className="grid gap-5 lg:grid-cols-12 lg:items-start lg:gap-6">
            <div className="lg:col-span-5">
              <ChallengeTypeLabel
                type="civic"
                label={t.challengeTypes.civic.label}
                className="bg-white/12 text-white ring-1 ring-white/25"
              />
              <h2
                id="civic-challenges-heading"
                className="mt-3 text-section-heading font-semibold text-balance text-white"
              >
                {copy.challenges.title}
              </h2>
              <p
                className={cn(
                  "mt-3 text-body text-white/75",
                  isBangla && "leading-[1.75]",
                )}
              >
                {copy.challenges.description}
              </p>
            </div>
            <article className="overflow-hidden rounded-card bg-surface shadow-card lg:col-span-7">
              <div className="grid sm:grid-cols-2">
                <div className="relative min-h-56 sm:min-h-full">
                  <Image
                    src={THIRTY_DAY_CHALLENGE.image}
                    alt={t.challenge.featured.imageAlt}
                    fill
                    sizes="(min-width: 640px) 25vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-text/50 via-transparent to-text/10"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5 sm:p-6">
                  <ChallengeTypeLabel
                    type="civic"
                    label={t.challengeTypes.civic.label}
                  />
                  <p className="text-sm font-semibold text-primary">
                    {copy.challenges.todayLabel}
                  </p>
                  <h3
                    className={cn(
                      "text-xl font-semibold text-balance text-foreground",
                      isBangla && "leading-[1.45]",
                    )}
                  >
                    {todayHabit.title}
                  </h3>
                  <p
                    className={cn(
                      "text-body text-text-secondary",
                      isBangla && "leading-[1.75]",
                    )}
                  >
                    {todayHabit.summary}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {t.challenge.progress.sampleNote}
                  </p>
                  <Button
                    asChild
                    className="mt-auto w-fit text-primary-foreground"
                  >
                    <Link href={ROUTES.challenges}>
                      {copy.challenges.cta}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          </div>
          <article className="mt-4 rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
            <ChallengeTypeLabel
              type="learning"
              label={t.challengeTypes.learning.label}
            />
            <p
              className={cn(
                "mt-3 max-w-2xl text-sm text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {t.challengeTypes.learning.purpose}
            </p>
            <Button asChild variant="outline" className="mt-3 w-fit">
              <Link href={`${ROUTES.challenges}#learning-challenges`}>
                {t.challenge.page.jump.learning}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </article>
        </Container>
      </section>

      <section
        id="civic-promise"
        aria-labelledby="civic-promise-heading"
        className="scroll-mt-28 bg-background py-10 md:py-12 lg:py-14"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="civic-promise-heading"
              className="text-section-heading font-semibold text-balance text-foreground"
            >
              {copy.promise.title}
            </h2>
            <p
              className={cn(
                "mt-3 text-body text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.promise.description}
            </p>
          </div>
          <HubCivicPromise isBangla={isBangla} />
        </Container>
      </section>

      <section
        id="recommended-learning"
        aria-labelledby="recommended-learning-heading"
        className="scroll-mt-28 border-t border-border bg-transparent py-10 md:py-12 lg:py-14"
      >
        <Container>
          <SectionHeader
            className="gap-3"
            title={
              <span id="recommended-learning-heading">
                {copy.recommended.title}
              </span>
            }
            description={copy.recommended.description}
          />
          <p
            className={cn(
              "mt-4 text-base text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            {copy.recommended.sampleNote}
          </p>
          <ul className="mt-5 grid list-none gap-4 p-0 lg:grid-cols-3">
            {recommended.map((path, index) => {
              const Icon = RECOMMENDED_ICONS[path.key];

              return (
                <li key={path.key}>
                  <Link
                    href={path.href}
                    className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border outline-none transition-shadow duration-200 ease-standard hover:shadow-card-hover focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={path.image}
                        alt={path.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-standard group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-text/70 via-text/20 to-transparent"
                      />
                      <span className="absolute top-3 left-3 inline-flex h-8 items-center rounded-btn bg-surface px-3 text-sm font-semibold text-primary ring-1 ring-border">
                        {t.learning.access[path.access]}
                      </span>
                      <span
                        aria-hidden
                        className="absolute right-3 bottom-8 text-4xl font-semibold tracking-tight text-white/35"
                      >
                        {formatIndex(index)}
                      </span>
                    </div>
                    <div className="relative z-10 -mt-8 mx-3 mb-3 flex flex-1 flex-col rounded-card bg-surface p-4 ring-1 ring-border sm:mx-4 sm:mb-4 sm:p-5">
                      <p className="text-xs font-semibold text-primary">
                        {path.kicker}
                      </p>
                      <div className="mt-2 flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <h3
                          className={cn(
                            "text-xl font-semibold text-balance text-foreground",
                            isBangla && "leading-[1.35]",
                          )}
                        >
                          {path.title}
                        </h3>
                      </div>
                      <p
                        className={cn(
                          "mt-2 flex-1 text-body text-text-secondary",
                          isBangla && "leading-[1.75]",
                        )}
                      >
                        {path.description}
                      </p>
                      <span className="mt-3 inline-flex h-10 w-fit items-center gap-1.5 rounded-btn bg-primary px-4 text-button font-medium text-primary-foreground">
                        {copy.recommended.cta}
                        <ArrowRight
                          className="size-4 transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </div>
  );
}

function HeroStat({ children }: { children: string }) {
  return (
    <li className="inline-flex max-w-full items-center rounded-btn bg-white/12 px-3 py-1.5 text-base font-medium text-white ring-1 ring-white/15">
      {children}
    </li>
  );
}

function StoryCard({
  href,
  image,
  imageAlt,
  kicker,
  title,
  description,
  meta,
  cta,
  badge,
  play = false,
  external = false,
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
  badge?: string;
  play?: boolean;
  external?: boolean;
  isBangla: boolean;
}) {
  const media = (
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
      {play ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-card">
            <Play className="size-5 fill-current" aria-hidden />
          </span>
        </span>
      ) : null}
      {badge ? (
        <Badge
          variant="outline"
          className="absolute top-3 left-3 h-6 bg-white/90 px-2.5"
        >
          {badge}
        </Badge>
      ) : null}
    </div>
  );

  const body = (
    <>
      {media}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
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
            {external ? (
              <ExternalLink className="size-3.5" aria-hidden />
            ) : (
              <ArrowRight className="size-3.5" aria-hidden />
            )}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border">
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full flex-col outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {body}
        </a>
      ) : (
        <Link
          href={href}
          className="flex h-full flex-col outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {body}
        </Link>
      )}
    </article>
  );
}

function HubCivicPromise({ isBangla }: { isBangla: boolean }) {
  const { t } = useTranslation();
  const copy = t.promise;
  const [selected, setSelected] = useState<CivicPromiseKey>(
    CIVIC_PROMISES[0].key,
  );
  const [confirmed, setConfirmed] = useState(false);
  const chosen = copy.items[selected];

  if (confirmed) {
    return (
      <article className="mx-auto mt-5 max-w-3xl overflow-hidden rounded-card bg-surface shadow-card">
        <div className="flex flex-col items-center gap-3 px-5 py-8 text-center sm:px-8 sm:py-10">
          <p className="text-sm font-semibold text-primary">{copy.confirmed}</p>
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
          <p className="text-sm text-text-secondary">{copy.sampleNote}</p>
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
        </div>
      </article>
    );
  }

  return (
    <article className="mx-auto mt-5 max-w-3xl overflow-hidden rounded-card bg-surface shadow-card">
      <form
        className="flex flex-col gap-4 p-5 sm:p-6 lg:p-7"
        onSubmit={(event) => {
          event.preventDefault();
          setConfirmed(true);
        }}
      >
        <RadioGroup
          value={selected}
          onValueChange={(value) => setSelected(value as CivicPromiseKey)}
          className="gap-2"
        >
          {CIVIC_PROMISES.map((item) => {
            const promise = copy.items[item.key];
            const inputId = `hub-civic-promise-${item.key}`;

            return (
              <label
                key={item.key}
                htmlFor={inputId}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-card p-3 ring-1 ring-border transition-colors duration-200 ease-standard",
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
                    {promise.title}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-sm text-text-secondary",
                      isBangla && "leading-[1.7]",
                    )}
                  >
                    {promise.description}
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
    </article>
  );
}

export { CivicLearningHub };
