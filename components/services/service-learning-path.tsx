"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  ClipboardCheck,
  ListChecks,
  PlayCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

export const SERVICE_LEARNING_STEP_KEYS = [
  "service",
  "know",
  "course",
  "assessment",
  "certificate",
] as const;

export type ServiceLearningStepKey =
  (typeof SERVICE_LEARNING_STEP_KEYS)[number];

export type ServiceLearningVariant = "full" | "compact" | "search";

export type ServiceLearningCurrent = "service" | "course";

interface ServiceLearningPathProps {
  serviceTitle: string;
  serviceHref: string;
  courseTitle: string;
  courseHref: string;
  /**
   * `full` — service detail / course detail
   * `compact` — related services / dashboard
   * `search` — search results (non-interactive inner content)
   */
  variant?: ServiceLearningVariant;
  current?: ServiceLearningCurrent;
  dense?: boolean;
  className?: string;
}

const STEP_ICONS = {
  service: Building2,
  know: ListChecks,
  course: PlayCircle,
  assessment: ClipboardCheck,
  certificate: Award,
} as const;

/**
 * Signature Civic Bangladesh pattern: a government service is paired
 * with the course that teaches how to prepare for it. Civic Bangladesh
 * does not process the official application.
 */
function ServiceLearningPath({
  serviceTitle,
  serviceHref,
  courseTitle,
  courseHref,
  variant = "full",
  current,
  dense = false,
  className,
}: ServiceLearningPathProps) {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.serviceLearning;

  if (variant === "search") {
    return (
      <div className={cn("flex min-w-0 flex-col gap-1 py-0.5", className)}>
        <p className="text-xs font-semibold text-primary">{copy.title}</p>
        <p className="truncate text-sm font-medium text-foreground">
          {serviceTitle}
          <span className="mx-1.5 text-primary" aria-hidden>
            →
          </span>
          {courseTitle}
        </p>
        <p className="truncate text-xs text-text-secondary">{copy.promise}</p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <article
        className={cn(
          "flex h-full flex-col gap-3 rounded-card bg-surface p-4 ring-1 ring-border sm:p-5",
          className,
        )}
      >
        <p className="text-xs font-semibold text-primary">{copy.title}</p>
        <PairHeadline
          serviceLabel={copy.pair.service}
          courseLabel={copy.pair.course}
          serviceTitle={serviceTitle}
          courseTitle={courseTitle}
          serviceHref={serviceHref}
          courseHref={courseHref}
          current={current}
          isBangla={isBangla}
        />
        <p
          className={cn(
            "mt-auto text-sm text-text-secondary",
            isBangla && "leading-[1.7]",
          )}
        >
          {copy.promise}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={serviceHref}
            className="inline-flex h-9 items-center rounded-btn bg-light-green px-3 text-sm font-semibold text-primary outline-none hover:bg-light-green/80 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {copy.cta.viewService}
          </Link>
          <Link
            href={courseHref}
            className="inline-flex h-9 items-center rounded-btn bg-primary px-3 text-sm font-semibold text-primary-foreground outline-none hover:opacity-95 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {copy.cta.startCourse}
            <ArrowRight className="ml-1 size-3.5" aria-hidden />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "rounded-card bg-surface shadow-card ring-1 ring-border",
        dense ? "p-4 sm:p-5" : "p-5 sm:p-6",
        className,
      )}
    >
      <div className={cn("flex flex-col", dense ? "gap-2" : "gap-3")}>
        <h2
          className={cn(
            "text-xl font-semibold text-foreground sm:text-2xl",
            isBangla && "leading-tight",
          )}
        >
          {copy.title}
        </h2>
        <p
          className={cn(
            "max-w-2xl text-body text-text-secondary",
            isBangla && "leading-[1.8]",
          )}
        >
          {copy.promise}
        </p>
      </div>

      <div className={cn(dense ? "mt-4" : "mt-5", "grid gap-3 sm:grid-cols-2")}>
        <PairCard
          href={serviceHref}
          eyebrow={copy.pair.service}
          title={serviceTitle}
          cta={copy.cta.viewService}
          active={current === "service"}
          hereLabel={copy.youAreHere}
          isBangla={isBangla}
        />
        <PairCard
          href={courseHref}
          eyebrow={copy.pair.course}
          title={courseTitle}
          cta={copy.cta.startCourse}
          active={current === "course"}
          hereLabel={copy.youAreHere}
          isBangla={isBangla}
        />
      </div>

      <ol className={cn(dense ? "mt-4" : "mt-6", "m-0 grid list-none gap-0 p-0 sm:grid-cols-5")}>
        {SERVICE_LEARNING_STEP_KEYS.map((key, index) => {
          const step = copy.steps[key];
          const Icon = STEP_ICONS[key];
          const last = index === SERVICE_LEARNING_STEP_KEYS.length - 1;
          const isCurrent =
            (key === "service" && current === "service") ||
            (key === "course" && current === "course");

          return (
            <li
              key={key}
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "relative flex gap-3 sm:flex-col sm:items-center sm:px-2 sm:text-center",
                !last &&
                  "sm:after:absolute sm:after:top-5 sm:after:left-[calc(50%+1.35rem)] sm:after:right-[-50%] sm:after:h-px sm:after:bg-border sm:after:content-['']",
              )}
            >
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ring-4 ring-surface",
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : "bg-light-green text-primary",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </span>
                {last ? null : (
                  <span
                    aria-hidden
                    className="my-1 w-px min-h-5 flex-1 bg-border sm:hidden"
                  />
                )}
              </div>
              <div className={cn("min-w-0 sm:pt-2.5 sm:pb-0", dense ? "pb-3" : "pb-5")}>
                <p className="text-sm font-semibold text-foreground">
                  {step.title}
                </p>
                <p
                  className={cn(
                    "mt-1 text-xs text-text-secondary",
                    isBangla && "leading-[1.65]",
                  )}
                >
                  {step.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <div
        className={cn(
          dense ? "mt-4 pt-3" : "mt-5 pt-4",
          "border-t border-border text-sm text-text-secondary",
          isBangla && "leading-[1.75]",
        )}
      >
        <p>{copy.disclaimer}</p>
        <p className="mt-1">{copy.certificateNote}</p>
      </div>
    </article>
  );
}

function PairHeadline({
  serviceLabel,
  courseLabel,
  serviceTitle,
  courseTitle,
  serviceHref,
  courseHref,
  current,
  isBangla,
}: {
  serviceLabel: string;
  courseLabel: string;
  serviceTitle: string;
  courseTitle: string;
  serviceHref: string;
  courseHref: string;
  current?: ServiceLearningCurrent;
  isBangla: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-primary">
        {serviceLabel}
        <span className="mx-1.5" aria-hidden>
          →
        </span>
        {courseLabel}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <Link
          href={serviceHref}
          className={cn(
            "min-w-0 text-base font-semibold text-balance text-foreground outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50",
            current === "service" && "text-primary",
            isBangla && "leading-[1.45]",
          )}
        >
          {serviceTitle}
        </Link>
        <ArrowRight
          className="mt-1 hidden size-4 shrink-0 text-primary sm:block"
          aria-hidden
        />
        <Link
          href={courseHref}
          className={cn(
            "min-w-0 text-base font-semibold text-balance text-foreground outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50",
            current === "course" && "text-primary",
            isBangla && "leading-[1.45]",
          )}
        >
          {courseTitle}
        </Link>
      </div>
    </div>
  );
}

function PairCard({
  href,
  eyebrow,
  title,
  cta,
  active,
  hereLabel,
  isBangla,
}: {
  href: string;
  eyebrow: string;
  title: string;
  cta: string;
  active?: boolean;
  hereLabel: string;
  isBangla: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-w-0 cursor-pointer flex-col justify-between gap-3 rounded-card bg-background p-4 outline-none ring-1 ring-border transition-shadow duration-200 ease-standard hover:shadow-card focus-visible:ring-3 focus-visible:ring-ring/50",
        active && "bg-light-green ring-primary",
      )}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold text-primary">{eyebrow}</p>
          {active ? (
            <span className="rounded-btn bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {hereLabel}
            </span>
          ) : null}
        </div>
        <p
          className={cn(
            "mt-2 text-base font-semibold text-balance text-foreground",
            isBangla && "leading-[1.45]",
          )}
        >
          {title}
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        {cta}
        <ArrowRight className="size-3.5" aria-hidden />
      </span>
    </Link>
  );
}

export { ServiceLearningPath };
export type { ServiceLearningPathProps };
