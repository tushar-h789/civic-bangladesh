"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CarFront,
  ClipboardCheck,
  HeartHandshake,
  Landmark,
  Leaf,
  PlayCircle,
  Sparkles,
  Award,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { CivicChallengeCategoryKey } from "@/data/challenge-types";
import { THIRTY_DAY_CHALLENGE } from "@/data/civic-challenge";
import { useTranslation } from "@/hooks/use-translation";
import {
  getCivicChallengeGroups,
  getLearningChallengeViews,
} from "@/lib/get-challenges-view";
import { Badge } from "@/components/common/badge";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { ChallengeTypeLabel } from "@/components/challenge/challenge-type-label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const HERO_IMAGE = "/images/home/intro-responsibility.png";

const CATEGORY_ICONS: Record<
  CivicChallengeCategoryKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  cleanliness: Sparkles,
  traffic: CarFront,
  environment: Leaf,
  publicSpace: Landmark,
  socialResponsibility: HeartHandshake,
};

const LEARNING_ICONS = {
  civicLesson: BookOpen,
  serviceVideo: PlayCircle,
  serviceAssessment: ClipboardCheck,
  earnCertificate: Award,
} as const;

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function ChallengesHub() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.challenge.page;
  const civicGroups = getCivicChallengeGroups(t);
  const learning = getLearningChallengeViews(t);
  const kept = THIRTY_DAY_CHALLENGE.completedDays.length;

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
              { label: t.nav.links.challenges },
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
            <div className="flex flex-wrap gap-2">
              <ChallengeTypeLabel
                type="civic"
                label={t.challengeTypes.civic.label}
                className="bg-white/12 text-white ring-1 ring-white/20"
              />
              <ChallengeTypeLabel
                type="learning"
                label={t.challengeTypes.learning.label}
                className="bg-white/12 text-white ring-1 ring-white/20"
              />
            </div>
          </div>
          <nav aria-label={copy.jump.label}>
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-base">
              <li>
                <a
                  href="#civic-challenges"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.civic}
                </a>
              </li>
              <li>
                <a
                  href="#learning-challenges"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.learning}
                </a>
              </li>
            </ul>
          </nav>
        </Container>
        <span className="sr-only">{copy.heroImageAlt}</span>
      </section>

      <section
        id="civic-challenges"
        aria-labelledby="civic-challenges-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={
              <span id="civic-challenges-heading">{copy.civic.title}</span>
            }
            description={copy.civic.description}
            actions={
              <Button asChild variant="outline">
                <Link href={`${ROUTES.home}#thirty-day-challenge-heading`}>
                  {copy.civic.openDay}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            }
          />
          <p className="mt-4 text-sm text-text-secondary">
            {t.challengeTypes.civic.purpose}
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            {formatTemplate(t.challenge.progress.label, {
              completed: kept,
              total: THIRTY_DAY_CHALLENGE.totalDays,
            })}
            <span aria-hidden> · </span>
            {t.challenge.progress.sampleNote}
          </p>

          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 lg:grid-cols-2 lg:gap-5">
            {civicGroups.map((group) => {
              const Icon = CATEGORY_ICONS[group.key];

              return (
                <li key={group.key}>
                  <article className="flex h-full flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
                    <div className="flex items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <ChallengeTypeLabel
                          type="civic"
                          label={t.challengeTypes.civic.label}
                        />
                        <h3
                          className={cn(
                            "mt-2 text-lg font-semibold text-foreground",
                            isBangla && "leading-[1.45]",
                          )}
                        >
                          {group.title}
                        </h3>
                        <p
                          className={cn(
                            "mt-1 text-sm text-text-secondary",
                            isBangla && "leading-[1.75]",
                          )}
                        >
                          {group.description}
                        </p>
                        <p className="mt-2 text-xs font-medium text-text-secondary">
                          {formatTemplate(copy.civic.days, {
                            count: group.days.length,
                          })}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-4 m-0 flex list-none flex-col gap-2 border-t border-border p-0 pt-4">
                      {group.days.map((habit) => (
                        <li
                          key={habit.day}
                          className="flex items-start justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {formatTemplate(t.challenge.preview.day, {
                                day: habit.day,
                              })}
                              <span aria-hidden>: </span>
                              {habit.title}
                            </p>
                            <p
                              className={cn(
                                "mt-0.5 text-xs text-text-secondary",
                                isBangla && "leading-[1.7]",
                              )}
                            >
                              {habit.summary}
                            </p>
                          </div>
                          <Badge
                            variant={
                              habit.status === "completed"
                                ? "success"
                                : habit.status === "today"
                                  ? "info"
                                  : "outline"
                            }
                            className="h-6 shrink-0 px-2.5"
                          >
                            {t.challenge.states[habit.status]}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        id="learning-challenges"
        aria-labelledby="learning-challenges-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={
              <span id="learning-challenges-heading">
                {copy.learning.title}
              </span>
            }
            description={copy.learning.description}
          />
          <p className="mt-4 text-sm text-text-secondary">
            {t.challengeTypes.learning.purpose}
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            {copy.learning.sampleNote}
          </p>

          <ul className="mt-10 m-0 flex list-none flex-col gap-3 p-0 sm:mt-12">
            {learning.map((item) => {
              const Icon = LEARNING_ICONS[item.key];

              return (
                <li key={item.key}>
                  <article className="grid gap-4 rounded-card bg-surface p-4 ring-1 ring-border sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-stretch sm:p-0">
                    <div className="relative hidden overflow-hidden sm:block sm:min-h-36">
                      <Image
                        src={item.courseImage}
                        alt={item.courseImageAlt}
                        fill
                        sizes="8.5rem"
                        className="rounded-l-card object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col gap-3 sm:py-5 sm:pr-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <ChallengeTypeLabel
                          type="learning"
                          label={t.challengeTypes.learning.label}
                        />
                        <Badge
                          variant={
                            item.status === "completed"
                              ? "success"
                              : item.status === "inProgress"
                                ? "info"
                                : "outline"
                          }
                          className="h-6 px-2.5"
                        >
                          {t.challenge.learningStatus[item.status]}
                        </Badge>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <h3
                            className={cn(
                              "text-base font-semibold text-foreground",
                              isBangla && "leading-[1.45]",
                            )}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={cn(
                              "mt-1 text-sm text-text-secondary",
                              isBangla && "leading-[1.75]",
                            )}
                          >
                            {item.description}
                          </p>
                          <p className="mt-2 text-xs text-text-secondary">
                            {copy.learning.related}
                            <span aria-hidden>: </span>
                            <span className="font-medium text-foreground">
                              {item.courseTitle}
                            </span>
                          </p>
                        </div>
                      </div>
                      {item.showProgress ? (
                        <div>
                          <p className="text-xs text-text-secondary">
                            {formatTemplate(copy.learning.progress, {
                              completed: item.completed,
                              total: item.total,
                            })}
                          </p>
                          <Progress className="mt-2" value={item.percent} />
                        </div>
                      ) : null}
                      <div>
                        <Button asChild size="sm">
                          <Link href={item.href}>
                            {item.cta}
                            <ArrowRight className="size-3.5" aria-hidden />
                          </Link>
                        </Button>
                      </div>
                    </div>
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

export { ChallengesHub };
