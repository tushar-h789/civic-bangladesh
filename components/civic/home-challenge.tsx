"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { THIRTY_DAY_CHALLENGE, getCivicHabitCategory, getDayStatus } from "@/data/civic-challenge";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import { Container } from "@/components/common/container";
import { ProgressBar } from "@/components/common/progress-bar";
import { ChallengeTypeLabel } from "@/components/challenge/challenge-type-label";
import { Button } from "@/components/ui/button";

const DAYS = Array.from(
  { length: THIRTY_DAY_CHALLENGE.totalDays },
  (_, index) => index + 1,
);

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function HomeChallenge() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const section = t.home.thirtyDayChallenge;
  const copy = t.challenge;
  const { currentDay, totalDays, completedDays, image, mapImage } =
    THIRTY_DAY_CHALLENGE;
  const [selectedDay, setSelectedDay] = React.useState<number>(currentDay);

  const status = getDayStatus(selectedDay);
  const habit = copy.habits[selectedDay as keyof typeof copy.habits];
  const categoryKey = getCivicHabitCategory(selectedDay);
  const categoryTitle = copy.categories[categoryKey].title;
  const minutes = THIRTY_DAY_CHALLENGE.minutes[selectedDay - 1] ?? 5;
  const completedCount = completedDays.length;
  const ctaLabel = status === "today" ? copy.cta.today : copy.cta.continue;
  const previewBody =
    status === "completed"
      ? copy.preview.completedBody
      : status === "missed"
        ? copy.preview.missedBody
        : status === "today"
          ? copy.preview.todayBody
          : copy.preview.upcomingBody;

  return (
    <section
      aria-labelledby="thirty-day-challenge-heading"
      className={cn(
        "relative z-10 bg-text pt-8 pb-section-mobile md:pt-10 md:pb-section-tablet lg:pt-12 lg:pb-section-desktop",
        isBangla && "font-bengali",
      )}
    >
      <Container>
        <div className="max-w-2xl">
          <h2
            id="thirty-day-challenge-heading"
            className="text-section-heading font-semibold text-balance text-white"
          >
            {section.title}
          </h2>
          <p
            className={cn(
              "mt-5 text-body text-white/75",
              isBangla && "leading-[1.75]",
            )}
          >
            {section.description}
          </p>
        </div>

        <div className="relative mt-8 sm:mt-10 lg:mt-12">
          <div className="mb-1 flex justify-center lg:absolute lg:right-0 lg:bottom-full lg:mb-0 lg:block">
            <Image
              src={mapImage}
              alt={section.mapAlt}
              className="h-44 w-44 object-contain object-bottom sm:h-52 sm:w-52 lg:h-64 lg:w-64"
            />
          </div>

          <article className="overflow-hidden rounded-card bg-surface shadow-card">
            <div className="grid lg:grid-cols-12">
              <div className="relative min-h-64 sm:min-h-80 lg:col-span-5 lg:min-h-full">
                <Image
                  src={image}
                  alt={copy.featured.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-text via-text/40 to-text/10"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-7">
                  <ChallengeTypeLabel
                    type="civic"
                    label={t.challengeTypes.civic.label}
                    className="w-fit bg-white/14 text-white ring-1 ring-white/25"
                  />
                  <p className="text-sm font-semibold text-white/70">
                    {copy.featured.kicker}
                  </p>
                  <p className="text-sm text-white/80">
                    {copy.featured.duration}
                  </p>
                  <p
                    className={cn(
                      "max-w-sm text-sm text-white/75",
                      isBangla && "leading-[1.7]",
                    )}
                  >
                    {copy.featured.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6 p-6 sm:p-8 lg:col-span-7 lg:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <ChallengeTypeLabel
                    type="civic"
                    label={t.challengeTypes.civic.label}
                  />
                  <p className="text-sm text-text-secondary">{categoryTitle}</p>
                  <span className="text-border">/</span>
                  <p className="text-sm font-semibold text-primary">
                    {status === "today"
                      ? copy.today.kicker
                      : copy.states[status]}
                  </p>
                  <span className="text-border">/</span>
                  <p className="text-sm text-text-secondary">
                    {formatTemplate(copy.preview.day, { day: selectedDay })}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {formatTemplate(copy.today.minutes, { count: minutes })}
                  </p>
                </div>

                <div>
                  <h3
                    className={cn(
                      "text-xl font-semibold text-balance text-foreground sm:text-2xl",
                      isBangla && "leading-[1.45]",
                    )}
                  >
                    {habit.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-body text-text-secondary",
                      isBangla && "leading-[1.75]",
                    )}
                  >
                    {habit.summary}
                  </p>
                  <p
                    className={cn(
                      "mt-3 text-sm text-text-secondary",
                      isBangla && "leading-[1.7]",
                    )}
                  >
                    {previewBody}
                  </p>
                </div>

                <ProgressBar
                  value={completedCount}
                  max={totalDays}
                  showValue={false}
                  label={formatTemplate(copy.progress.label, {
                    completed: completedCount,
                    total: totalDays,
                  })}
                />
                <p className="text-sm text-text-secondary">
                  {copy.progress.sampleNote}
                </p>

                <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    asChild
                    size="lg"
                    className="h-11 rounded-btn px-5 text-button text-primary-foreground"
                  >
                    <Link href={ROUTES.challenges}>
                      {ctaLabel}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-border bg-background/60 px-6 py-6 sm:px-8 sm:py-8 lg:px-10">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <p className="text-sm font-semibold text-foreground">
                  {copy.calendar.label}
                </p>
                <ul className="flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-xs text-text-secondary">
                  <LegendDot
                    className="bg-primary"
                    label={copy.calendar.legendCompleted}
                  />
                  <LegendDot
                    className="bg-light-green ring-1 ring-primary"
                    label={copy.calendar.legendToday}
                  />
                  <LegendDot
                    className="border border-dashed border-border"
                    label={copy.calendar.legendMissed}
                  />
                  <LegendDot
                    className="border border-border bg-background"
                    label={copy.calendar.legendUpcoming}
                  />
                </ul>
              </div>

              <div
                role="radiogroup"
                aria-label={copy.calendar.label}
                className="grid grid-cols-6 gap-1.5 sm:grid-cols-10 sm:gap-2"
              >
                {DAYS.map((day) => {
                  const dayStatus = getDayStatus(day);
                  const dayHabit = copy.habits[day as keyof typeof copy.habits];
                  const selected = day === selectedDay;

                  return (
                    <button
                      key={day}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-current={dayStatus === "today" ? "true" : undefined}
                      aria-label={formatTemplate(copy.calendar.dayLabel, {
                        day,
                        title: dayHabit.title,
                        status: copy.states[dayStatus],
                      })}
                      onClick={() => setSelectedDay(day)}
                      className={cn(
                        "relative flex aspect-square items-center justify-center rounded-btn text-sm font-medium transition-colors duration-200 ease-standard",
                        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                        dayStatus === "completed" &&
                          "bg-primary text-primary-foreground",
                        dayStatus === "today" &&
                          "bg-light-green text-primary ring-1 ring-primary",
                        dayStatus === "missed" &&
                          "border border-dashed border-border bg-surface text-text-secondary",
                        dayStatus === "upcoming" &&
                          "border border-border bg-background text-text-secondary",
                        selected &&
                          "ring-2 ring-primary ring-offset-2 ring-offset-background",
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <li className="inline-flex items-center gap-1.5">
      <span aria-hidden className={cn("size-2.5 rounded-sm", className)} />
      {label}
    </li>
  );
}

export { HomeChallenge };
