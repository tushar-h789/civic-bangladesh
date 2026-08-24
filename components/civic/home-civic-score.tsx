"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  Repeat,
  UsersRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SAMPLE_CIVIC_SCORE,
  type CivicScoreBreakdownKey,
} from "@/data/civic-score";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { ProgressRing } from "@/components/common/progress-ring";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const CATEGORY_ICONS: Record<
  CivicScoreBreakdownKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  learning: BookOpen,
  challenges: Repeat,
  quiz: HelpCircle,
  community: UsersRound,
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

function HomeCivicScore() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const section = t.home.civicScore;
  const copy = t.score;
  const { score, max, breakdown } = SAMPLE_CIVIC_SCORE;
  const level = copy.levels.responsibleCitizen;
  const scoreText = formatTemplate(copy.scoreOverMax, { score, max });

  return (
    <section
      aria-labelledby="civic-score-heading"
      className={cn(
        "bg-background py-10 md:py-12 lg:py-14",
        isBangla && "font-bengali",
      )}
    >
      <Container>
        <SectionHeader
          className="gap-3"
          title={<span id="civic-score-heading">{section.title}</span>}
          description={section.description}
        />

        <article className="mt-5 overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border">
          <div className="grid lg:grid-cols-12">
            <div className="flex flex-col items-center justify-center gap-4 bg-light-green px-5 py-8 sm:px-8 lg:col-span-5 lg:py-10">
              <ProgressRing
                value={score}
                max={max}
                size={180}
                strokeWidth={9}
                showValue={false}
                aria-label={scoreText}
              >
                <p className="text-4xl font-semibold tabular-nums text-foreground sm:text-5xl">
                  {score}
                </p>
                <p className="mt-1 text-sm text-text-secondary">/ {max}</p>
              </ProgressRing>

              <div className="text-center">
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {copy.levelLabel}
                </p>
                <h3
                  className={cn(
                    "mt-1.5 text-xl font-semibold text-foreground sm:text-2xl",
                    isBangla && "leading-[1.45]",
                  )}
                >
                  {level.title}
                </h3>
                <p
                  className={cn(
                    "mt-1.5 max-w-xs text-sm text-text-secondary",
                    isBangla && "leading-[1.7]",
                  )}
                >
                  {level.hint}
                </p>
              </div>

              <p className="text-sm text-text-secondary">{copy.sampleNote}</p>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:p-6 lg:col-span-7 lg:p-7">
              <p className="text-sm font-semibold text-foreground">
                {copy.breakdownLabel}
              </p>

              <ul className="flex list-none flex-col gap-2 p-0">
                {breakdown.map((item) => {
                  const Icon = CATEGORY_ICONS[item.key];
                  const category = copy.categories[item.key];

                  return (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        className="group flex flex-col gap-1.5 rounded-btn px-3 py-2.5 transition-colors duration-200 ease-standard hover:bg-light-green focus-visible:bg-light-green focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary group-hover:bg-surface">
                            <Icon className="size-4" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1 font-medium text-foreground">
                            {category.title}
                          </span>
                          <span className="text-sm font-semibold tabular-nums text-primary">
                            {item.value}
                          </span>
                        </div>
                        <Progress
                          value={item.value}
                          aria-hidden
                          className="h-1.5 bg-border"
                        />
                        <p
                          className={cn(
                            "text-sm text-text-secondary",
                            isBangla && "leading-[1.7]",
                          )}
                        >
                          {category.hint}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Button
                asChild
                size="lg"
                className="mt-auto h-11 w-fit rounded-btn px-5 text-button text-primary-foreground"
              >
                <Link href={ROUTES.learn}>
                  {copy.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}

export { HomeCivicScore };
