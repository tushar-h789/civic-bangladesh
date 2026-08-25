"use client";

import type { ComponentType } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  ClipboardCheck,
  PlayCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  LEARNING_CHALLENGE_STATUS_KEYS,
  type LearningChallengeStatus,
} from "@/data/challenge-types";
import type { LearningChallengeKey } from "@/data/learning-challenges";
import { useTranslation } from "@/hooks/use-translation";
import { getLearningChallengeViews } from "@/lib/get-challenges-view";
import { Badge } from "@/components/common/badge";
import { Container } from "@/components/common/container";
import { ProgressBar } from "@/components/common/progress-bar";
import { ProgressRing } from "@/components/common/progress-ring";
import { SectionHeader } from "@/components/common/section-header";
import { ChallengeTypeLabel } from "@/components/challenge/challenge-type-label";
import { Button } from "@/components/ui/button";

const LEARNING_ICONS: Record<
  LearningChallengeKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  civicLesson: BookOpen,
  serviceVideo: PlayCircle,
  serviceAssessment: ClipboardCheck,
  earnCertificate: Award,
};

type StatusFilter = "all" | LearningChallengeStatus;

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

function LearningChallengesSection() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const page = t.challenge.page.learning;
  const items = getLearningChallengeViews(t);
  const firstActive =
    items.find((item) => item.status === "inProgress") ?? items[0];

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedKey, setSelectedKey] = useState<LearningChallengeKey>(
    firstActive?.key ?? "civicLesson",
  );

  const visible =
    statusFilter === "all"
      ? items
      : items.filter((item) => item.status === statusFilter);
  const selected =
    visible.find((item) => item.key === selectedKey) ??
    visible[0] ??
    items.find((item) => item.key === selectedKey) ??
    items[0];

  const finishedCount = items.filter(
    (item) => item.status === "completed",
  ).length;
  const inProgressCount = items.filter(
    (item) => item.status === "inProgress",
  ).length;

  if (!selected) return null;

  const SelectedIcon = LEARNING_ICONS[selected.key];
  const selectedIndex = items.findIndex((item) => item.key === selected.key);

  function applyFilter(next: StatusFilter) {
    setStatusFilter(next);
    const nextVisible =
      next === "all"
        ? items
        : items.filter((item) => item.status === next);
    if (
      nextVisible.length > 0 &&
      !nextVisible.some((item) => item.key === selectedKey)
    ) {
      setSelectedKey(nextVisible[0].key);
    }
  }

  return (
    <section
      id="learning-challenges"
      aria-labelledby="learning-challenges-heading"
      className="scroll-mt-28 relative z-10 isolate overflow-hidden bg-light-green py-10 md:py-12 lg:py-14"
    >
      <Container>
        <SectionHeader
          className="gap-3"
          title={
            <span id="learning-challenges-heading">{page.title}</span>
          }
          description={page.description}
        />
        <p
          className={cn(
            "mt-4 text-body text-text-secondary",
            isBangla && "leading-[1.75]",
          )}
        >
          {t.challengeTypes.learning.purpose}
        </p>
        <p
          className={cn(
            "mt-2 text-body text-text-secondary",
            isBangla && "leading-[1.75]",
          )}
        >
          {page.sampleNote}
        </p>

        <article className="mt-5 overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border">
          <div className="grid lg:grid-cols-12">
            <div className="relative min-h-56 sm:min-h-72 lg:col-span-5 lg:min-h-full">
              <Image
                src={selected.courseImage}
                alt={selected.courseImageAlt}
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
                    type="learning"
                    label={t.challengeTypes.learning.label}
                    className="w-fit bg-white/14 text-white ring-1 ring-white/25"
                  />
                  <p className="mt-2 text-sm font-semibold text-white/80">
                    {formatTemplate(page.step, {
                      index: formatIndex(selectedIndex),
                    })}
                  </p>
                  <p
                    className={cn(
                      "mt-1 max-w-xs text-xl font-semibold text-white",
                      isBangla && "leading-[1.45]",
                    )}
                  >
                    {selected.title}
                  </p>
                </div>
                <div className="rounded-full bg-white p-1 shadow-card">
                  <ProgressRing
                    value={finishedCount}
                    max={items.length}
                    size={80}
                    label={
                      <span className="sr-only">
                        {formatTemplate(page.doneOf, {
                          completed: finishedCount,
                          total: items.length,
                        })}
                      </span>
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:p-6 lg:col-span-7 lg:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex size-10 items-center justify-center rounded-btn bg-light-green text-primary">
                  <SelectedIcon className="size-5" aria-hidden />
                </span>
                <Badge
                  variant={
                    selected.status === "completed"
                      ? "success"
                      : selected.status === "inProgress"
                        ? "info"
                        : "outline"
                  }
                  className="h-6 px-2.5"
                >
                  {t.challenge.learningStatus[selected.status]}
                </Badge>
              </div>

              <div>
                <h3
                  className={cn(
                    "text-xl font-semibold text-balance text-foreground sm:text-2xl",
                    isBangla && "leading-[1.45]",
                  )}
                >
                  {selected.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-body text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {selected.description}
                </p>
                <p
                  className={cn(
                    "mt-2 text-body text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {page.related}
                  <span aria-hidden>: </span>
                  <span className="font-medium text-foreground">
                    {selected.courseTitle}
                  </span>
                </p>
              </div>

              {selected.showProgress ? (
                <ProgressBar
                  value={selected.completed}
                  max={selected.total}
                  showValue={false}
                  label={formatTemplate(page.progress, {
                    completed: selected.completed,
                    total: selected.total,
                  })}
                />
              ) : (
                <ProgressBar
                  value={finishedCount}
                  max={items.length}
                  showValue={false}
                  label={formatTemplate(page.doneOf, {
                    completed: finishedCount,
                    total: items.length,
                  })}
                />
              )}

              <p
                className={cn(
                  "text-body text-text-secondary",
                  isBangla && "leading-[1.75]",
                )}
              >
                {page.selectHint}
              </p>

              <Button asChild className="mt-auto h-11 w-fit rounded-btn px-5 text-button">
                <Link href={selected.href}>
                  {selected.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>

          <div className="border-t border-border bg-background/80 px-5 py-5 sm:px-6 sm:py-6 lg:px-7">
            <p className="text-sm font-semibold text-foreground">
              {page.pathLabel}
            </p>
            <ol className="relative mt-4 m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4">
              {items.map((item, index) => {
                const Icon = LEARNING_ICONS[item.key];
                const active = item.key === selected.key;

                return (
                  <li key={item.key} className="relative">
                    {index < items.length - 1 ? (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute top-5 left-[calc(50%+1.25rem)] hidden h-px w-[calc(100%-0.75rem)] border-t border-dashed border-primary/40 sm:block"
                      />
                    ) : null}
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setSelectedKey(item.key);
                        setStatusFilter("all");
                      }}
                      className={cn(
                        "relative z-10 flex w-full cursor-pointer flex-col items-start gap-2 rounded-card bg-surface p-3 text-left ring-1 outline-none transition-shadow duration-200 ease-standard",
                        "focus-visible:ring-3 focus-visible:ring-ring/50",
                        active
                          ? "ring-primary shadow-card"
                          : "ring-border hover:bg-light-green/60",
                      )}
                    >
                      <span className="flex size-10 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="text-xs font-semibold text-primary">
                        {formatTemplate(page.step, {
                          index: formatIndex(index),
                        })}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-semibold text-foreground",
                          isBangla && "leading-[1.4]",
                        )}
                      >
                        {item.title}
                      </span>
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
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </article>

        <div className="mt-6">
          <p className="text-sm font-semibold text-foreground">
            {page.filterLabel}
          </p>
          <p
            className={cn(
              "mt-1 text-body text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            {formatTemplate(page.doneOf, {
              completed: finishedCount,
              total: items.length,
            })}
            {inProgressCount > 0 ? (
              <>
                <span aria-hidden> · </span>
                {t.challenge.learningStatus.inProgress}: {inProgressCount}
              </>
            ) : null}
          </p>
          <div
            role="tablist"
            aria-label={page.filterLabel}
            className="mt-3 flex flex-wrap gap-2"
          >
            <FilterChip
              selected={statusFilter === "all"}
              onClick={() => applyFilter("all")}
            >
              {page.all}
            </FilterChip>
            {LEARNING_CHALLENGE_STATUS_KEYS.map((status) => (
              <FilterChip
                key={status}
                selected={statusFilter === status}
                onClick={() => applyFilter(status)}
              >
                {t.challenge.learningStatus[status]}
              </FilterChip>
            ))}
          </div>
        </div>

        <ul className="mt-5 grid list-none gap-4 p-0 lg:grid-cols-2">
          {visible.map((item, index) => {
            const Icon = LEARNING_ICONS[item.key];
            const active = item.key === selected.key;
            const sourceIndex = items.findIndex(
              (entry) => entry.key === item.key,
            );

            return (
              <li key={item.key}>
                <article
                  className={cn(
                    "flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card ring-1 transition-shadow duration-200 ease-standard",
                    active ? "ring-primary" : "ring-border",
                  )}
                >
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedKey(item.key)}
                    className="flex cursor-pointer flex-col text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={item.courseImage}
                        alt={item.courseImageAlt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-text/70 via-text/20 to-transparent"
                      />
                      <span className="absolute top-3 left-3 inline-flex h-8 items-center rounded-btn bg-surface px-3 text-sm font-semibold text-primary ring-1 ring-border">
                        {t.challenge.learningStatus[item.status]}
                      </span>
                      <span
                        aria-hidden
                        className="absolute right-3 bottom-8 text-4xl font-semibold tracking-tight text-white/35"
                      >
                        {formatIndex(sourceIndex >= 0 ? sourceIndex : index)}
                      </span>
                    </div>
                  </button>
                  <div className="relative z-10 -mt-8 mx-3 mb-3 flex flex-1 flex-col rounded-card bg-surface p-4 ring-1 ring-border sm:mx-4 sm:mb-4 sm:p-5">
                    <button
                      type="button"
                      onClick={() => setSelectedKey(item.key)}
                      className="flex cursor-pointer items-start gap-3 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3
                        className={cn(
                          "text-xl font-semibold text-balance text-foreground",
                          isBangla && "leading-[1.35]",
                        )}
                      >
                        {item.title}
                      </h3>
                    </button>
                    <p
                      className={cn(
                        "mt-2 flex-1 text-body text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {item.description}
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      {page.related}
                      <span aria-hidden>: </span>
                      <span className="font-medium text-foreground">
                        {item.courseTitle}
                      </span>
                    </p>
                    {item.showProgress ? (
                      <div className="mt-3">
                        <ProgressBar
                          value={item.completed}
                          max={item.total}
                          showValue={false}
                          label={formatTemplate(page.progress, {
                            completed: item.completed,
                            total: item.total,
                          })}
                        />
                      </div>
                    ) : null}
                    <Button asChild className="mt-3 h-10 w-fit rounded-btn">
                      <Link href={item.href}>
                        {item.cta}
                        <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </Button>
                  </div>
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
          : "bg-surface text-text-secondary ring-1 ring-border hover:bg-background hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}

export { LearningChallengesSection };
