"use client";

import type { ComponentType } from "react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  Check,
  HeartHandshake,
  Landmark,
  Leaf,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import {
  CIVIC_CHALLENGE_CATEGORY_KEYS,
  type CivicChallengeCategoryKey,
} from "@/data/challenge-types";
import {
  THIRTY_DAY_CHALLENGE,
  getCivicHabitCategory,
  getDayStatus,
  type DayStatus,
} from "@/data/civic-challenge";
import { useTranslation } from "@/hooks/use-translation";
import { getCivicChallengeGroups } from "@/lib/get-challenges-view";
import { Badge } from "@/components/common/badge";
import { Container } from "@/components/common/container";
import { ProgressBar } from "@/components/common/progress-bar";
import { ProgressRing } from "@/components/common/progress-ring";
import { SectionHeader } from "@/components/common/section-header";
import { ChallengeTypeLabel } from "@/components/challenge/challenge-type-label";
import { Button } from "@/components/ui/button";

const DAYS = Array.from(
  { length: THIRTY_DAY_CHALLENGE.totalDays },
  (_, index) => index + 1,
);

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

type FilterKey = "all" | CivicChallengeCategoryKey;

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function CivicChallengesSection() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.challenge;
  const page = copy.page.civic;
  const civicGroups = getCivicChallengeGroups(t);
  const { currentDay, totalDays, image } = THIRTY_DAY_CHALLENGE;

  const [selectedDay, setSelectedDay] = useState<number>(currentDay);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [visitKept, setVisitKept] = useState<number[]>([]);

  const completedDays = useMemo(() => {
    return Array.from(
      new Set([...THIRTY_DAY_CHALLENGE.completedDays, ...visitKept]),
    );
  }, [visitKept]);

  function statusFor(day: number): DayStatus {
    return getDayStatus(
      day,
      currentDay,
      completedDays,
      THIRTY_DAY_CHALLENGE.missedDays,
    );
  }

  const selectedStatus = statusFor(selectedDay);
  const selectedHabit = copy.habits[selectedDay as keyof typeof copy.habits];
  const selectedCategory = getCivicHabitCategory(selectedDay);
  const minutes = THIRTY_DAY_CHALLENGE.minutes[selectedDay - 1] ?? 5;
  const canMark =
    (selectedStatus === "today" || selectedStatus === "missed") &&
    !completedDays.includes(selectedDay);
  const previewBody =
    selectedStatus === "completed"
      ? copy.preview.completedBody
      : selectedStatus === "missed"
        ? copy.preview.missedBody
        : selectedStatus === "today"
          ? copy.preview.todayBody
          : copy.preview.upcomingBody;

  const visibleGroups =
    filter === "all"
      ? civicGroups
      : civicGroups.filter((group) => group.key === filter);

  const keptThisVisit = visitKept.includes(selectedDay);

  function selectCategory(key: FilterKey) {
    setFilter(key);
    if (key === "all") {
      setSelectedDay(currentDay);
      return;
    }
    if (getCivicHabitCategory(currentDay) === key) {
      setSelectedDay(currentDay);
      return;
    }
    const first = civicGroups.find((group) => group.key === key)?.days[0];
    if (first) setSelectedDay(first.day);
  }

  return (
    <section
      id="civic-challenges"
      aria-labelledby="civic-challenges-heading"
      className="scroll-mt-28 bg-transparent py-10 md:py-12 lg:py-14"
    >
      <Container>
        <SectionHeader
          className="gap-3"
          title={<span id="civic-challenges-heading">{page.title}</span>}
          description={page.description}
          actions={
            <Button asChild variant="outline">
              <Link href={`${ROUTES.home}#thirty-day-challenge-heading`}>
                {page.openDay}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          }
        />
        <p
          className={cn(
            "mt-4 text-body text-text-secondary",
            isBangla && "leading-[1.75]",
          )}
        >
          {t.challengeTypes.civic.purpose}
        </p>
        <p
          className={cn(
            "mt-2 text-body text-text-secondary",
            isBangla && "leading-[1.75]",
          )}
        >
          {copy.progress.sampleNote}
        </p>

        <article className="mt-5 overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border">
          <div className="grid lg:grid-cols-12">
            <div className="relative min-h-52 sm:min-h-64 lg:col-span-5 lg:min-h-full">
              <Image
                src={image}
                alt={copy.featured.imageAlt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-text via-text/40 to-text/10"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                <div>
                  <ChallengeTypeLabel
                    type="civic"
                    label={t.challengeTypes.civic.label}
                    className="w-fit bg-white/14 text-white ring-1 ring-white/25"
                  />
                  <p className="mt-2 text-sm font-semibold text-white/80">
                    {copy.featured.kicker}
                  </p>
                  <p
                    className={cn(
                      "mt-1 max-w-xs text-body text-white",
                      isBangla && "leading-[1.45]",
                    )}
                  >
                    {copy.featured.title}
                  </p>
                </div>
                <div className="rounded-full bg-white p-1 shadow-card">
                  <ProgressRing
                    value={completedDays.length}
                    max={totalDays}
                    size={80}
                    label={
                      <span className="sr-only">
                        {formatTemplate(copy.progress.label, {
                          completed: completedDays.length,
                          total: totalDays,
                        })}
                      </span>
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:p-6 lg:col-span-7 lg:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-primary">
                  {copy.categories[selectedCategory].title}
                </p>
                <span className="text-border" aria-hidden>
                  /
                </span>
                <p className="text-sm font-semibold text-primary">
                  {selectedStatus === "today"
                    ? copy.today.kicker
                    : copy.states[selectedStatus]}
                </p>
                <span className="text-border" aria-hidden>
                  /
                </span>
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
                  {selectedHabit.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-body text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {selectedHabit.summary}
                </p>
                <p
                  className={cn(
                    "mt-2 text-body text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {previewBody}
                </p>
              </div>

              <ProgressBar
                value={completedDays.length}
                max={totalDays}
                showValue={false}
                label={formatTemplate(copy.progress.label, {
                  completed: completedDays.length,
                  total: totalDays,
                })}
              />

              <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {canMark ? (
                  <Button
                    type="button"
                    className="h-11 w-fit rounded-btn px-5 text-button text-primary-foreground"
                    onClick={() =>
                      setVisitKept((days) =>
                        days.includes(selectedDay)
                          ? days
                          : [...days, selectedDay],
                      )
                    }
                  >
                    <Check className="size-4" aria-hidden />
                    {page.markKept}
                  </Button>
                ) : selectedStatus === "completed" ? (
                  <p
                    className={cn(
                      "text-body text-text-secondary",
                      isBangla && "leading-[1.75]",
                    )}
                  >
                    {keptThisVisit
                      ? page.markedNote
                      : copy.preview.completedBody}
                  </p>
                ) : (
                  <p
                    className={cn(
                      "text-body text-text-secondary",
                      isBangla && "leading-[1.75]",
                    )}
                  >
                    {page.lockedUpcoming}
                  </p>
                )}
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-fit rounded-btn"
                  onClick={() => {
                    setFilter("all");
                    setSelectedDay(currentDay);
                  }}
                >
                  {page.jumpToday}
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-border bg-background/80 px-5 py-5 sm:px-6 sm:py-6 lg:px-7">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {copy.calendar.label}
                </p>
                <p
                  className={cn(
                    "mt-1 text-body text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {page.calendarHint}
                </p>
              </div>
              <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-sm text-text-secondary">
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
                const dayStatus = statusFor(day);
                const dayHabit = copy.habits[day as keyof typeof copy.habits];
                const selected = day === selectedDay;
                const dimmed =
                  filter !== "all" && getCivicHabitCategory(day) !== filter;

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
                    onClick={() => {
                      setSelectedDay(day);
                      if (filter !== "all") {
                        setFilter(getCivicHabitCategory(day));
                      }
                    }}
                    className={cn(
                      "relative flex aspect-square cursor-pointer items-center justify-center rounded-btn text-sm font-medium transition-colors duration-200 ease-standard",
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
                      dimmed && "opacity-35",
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </article>

        <div className="mt-6">
          <p className="text-sm font-semibold text-foreground">
            {page.filterLabel}
          </p>
          <div
            role="tablist"
            aria-label={page.filterLabel}
            className="mt-3 flex flex-wrap gap-2"
          >
            <FilterChip
              selected={filter === "all"}
              onClick={() => selectCategory("all")}
            >
              {page.all}
            </FilterChip>
            {CIVIC_CHALLENGE_CATEGORY_KEYS.map((key) => (
              <FilterChip
                key={key}
                selected={filter === key}
                onClick={() => selectCategory(key)}
              >
                {copy.categories[key].title}
              </FilterChip>
            ))}
          </div>
        </div>

        <ul className="mt-5 grid list-none gap-4 p-0 lg:grid-cols-2 lg:gap-5">
          {visibleGroups.map((group) => {
            const Icon = CATEGORY_ICONS[group.key];
            const kept = group.days.filter((habit) =>
              completedDays.includes(habit.day),
            ).length;

            return (
              <li key={group.key}>
                <article
                  className={cn(
                    "flex h-full flex-col rounded-card bg-surface p-5 ring-1 transition-shadow duration-200 ease-standard sm:p-6",
                    filter === group.key
                      ? "ring-primary shadow-card"
                      : "ring-border",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => selectCategory(group.key)}
                    className="flex w-full cursor-pointer items-start gap-3 rounded-btn text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <ChallengeTypeLabel
                        type="civic"
                        label={t.challengeTypes.civic.label}
                      />
                      <h3
                        className={cn(
                          "mt-2 text-xl font-semibold text-foreground",
                          isBangla && "leading-[1.45]",
                        )}
                      >
                        {group.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-1 text-body text-text-secondary",
                          isBangla && "leading-[1.75]",
                        )}
                      >
                        {group.description}
                      </p>
                      <p className="mt-2 text-sm font-medium text-primary">
                        {formatTemplate(page.keptInCategory, {
                          kept,
                          total: group.days.length,
                        })}
                      </p>
                    </div>
                  </button>
                  <ul className="mt-4 m-0 flex list-none flex-col gap-1 border-t border-border p-0 pt-4">
                    {group.days.map((habit) => {
                      const active = habit.day === selectedDay;
                      const status = statusFor(habit.day);

                      return (
                        <li key={habit.day}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDay(habit.day);
                              setFilter(group.key);
                            }}
                            className={cn(
                              "flex w-full cursor-pointer items-start justify-between gap-3 rounded-btn px-2 py-2 text-left outline-none transition-colors duration-200 ease-standard",
                              "focus-visible:ring-3 focus-visible:ring-ring/50",
                              active ? "bg-light-green" : "hover:bg-background",
                            )}
                          >
                            <div className="min-w-0">
                              <p className="text-base font-medium text-foreground">
                                {formatTemplate(copy.preview.day, {
                                  day: habit.day,
                                })}
                                <span aria-hidden>: </span>
                                {habit.title}
                              </p>
                              <p
                                className={cn(
                                  "mt-0.5 text-body text-text-secondary",
                                  isBangla && "leading-[1.7]",
                                )}
                              >
                                {habit.summary}
                              </p>
                            </div>
                            <Badge
                              variant={
                                status === "completed"
                                  ? "success"
                                  : status === "today"
                                    ? "info"
                                    : "outline"
                              }
                              className="h-6 shrink-0 px-2.5"
                            >
                              {copy.states[status]}
                            </Badge>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function FilterChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center rounded-btn px-4 text-button font-medium outline-none transition-colors duration-200 ease-standard",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        selected
          ? "bg-primary text-primary-foreground"
          : "bg-surface text-text-secondary ring-1 ring-border hover:bg-light-green hover:text-primary",
      )}
    >
      {children}
    </button>
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

export { CivicChallengesSection };
