"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Building2,
  ClipboardCheck,
  ListChecks,
  PlayCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { Badge } from "@/components/common/badge";

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
          "flex h-full flex-col gap-4 rounded-card bg-surface p-5 shadow-card ring-1 ring-border",
          className,
        )}
      >
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          {copy.eyebrow}
        </p>
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
        <ol className="m-0 flex list-none items-center gap-1 p-0">
          {SERVICE_LEARNING_STEP_KEYS.map((key, index) => {
            const Icon = STEP_ICONS[key];
            const isAnchor = key === "service" || key === "course";

            return (
              <li key={key} className="flex items-center gap-1">
                {index > 0 ? (
                  <ArrowRight className="size-3 text-primary/50" aria-hidden />
                ) : null}
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-btn",
                    isAnchor
                      ? "bg-primary text-primary-foreground"
                      : "bg-light-green text-primary",
                  )}
                  title={copy.steps[key].title}
                >
                  <Icon className="size-3.5" aria-hidden />
                  <span className="sr-only">{copy.steps[key].title}</span>
                </span>
              </li>
            );
          })}
        </ol>
        <p
          className={cn(
            "text-sm text-text-secondary",
            isBangla && "leading-[1.7]",
          )}
        >
          {copy.promise}
        </p>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "rounded-card bg-surface p-5 shadow-card ring-1 ring-border sm:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <Badge variant="info" className="h-6 w-fit px-2.5">
          {copy.eyebrow}
        </Badge>
        <h2
          className={cn(
            "text-xl font-semibold text-balance text-foreground sm:text-2xl",
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

      <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-stretch">
        <PairCard
          href={serviceHref}
          eyebrow={copy.pair.service}
          title={serviceTitle}
          cta={copy.cta.viewService}
          active={current === "service"}
          isBangla={isBangla}
        />
        <div className="flex items-center justify-center text-primary">
          <ArrowDown className="size-5 sm:hidden" aria-hidden />
          <ArrowRight className="hidden size-5 sm:block" aria-hidden />
          <span className="sr-only">→</span>
        </div>
        <PairCard
          href={courseHref}
          eyebrow={copy.pair.course}
          title={courseTitle}
          cta={copy.cta.startCourse}
          active={current === "course"}
          isBangla={isBangla}
        />
      </div>

      <ol className="mt-6 m-0 grid list-none gap-3 p-0 sm:grid-cols-5">
        {SERVICE_LEARNING_STEP_KEYS.map((key, index) => {
          const step = copy.steps[key];
          const Icon = STEP_ICONS[key];
          const href =
            key === "service"
              ? serviceHref
              : key === "course"
                ? courseHref
                : undefined;
          const isCurrent =
            (key === "service" && current === "service") ||
            (key === "course" && current === "course");

            return (
              <li key={key} className="relative flex flex-col">
                {index > 0 ? (
                  <ArrowDown
                    className="mx-auto mb-2 size-4 text-primary sm:hidden"
                    aria-hidden
                  />
                ) : null}
                <StepNode
                href={href}
                number={String(index + 1).padStart(2, "0")}
                icon={<Icon className="size-4" aria-hidden />}
                title={step.title}
                body={step.body}
                active={isCurrent}
                isBangla={isBangla}
              />
            </li>
          );
        })}
      </ol>

      <div
        className={cn(
          "mt-6 border-t border-border pt-4 text-sm text-text-secondary",
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
  isBangla,
}: {
  href: string;
  eyebrow: string;
  title: string;
  cta: string;
  active?: boolean;
  isBangla: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-w-0 flex-col justify-between gap-3 rounded-card bg-light-green p-4 outline-none ring-1 ring-transparent transition-shadow duration-200 ease-standard hover:shadow-card focus-visible:ring-3 focus-visible:ring-ring/50",
        active && "ring-primary",
      )}
    >
      <div>
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          {eyebrow}
        </p>
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

function StepNode({
  href,
  number,
  icon,
  title,
  body,
  active,
  isBangla,
}: {
  href?: string;
  number: string;
  icon: ReactNode;
  title: string;
  body: string;
  active?: boolean;
  isBangla: boolean;
}) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-btn",
            href
              ? "bg-primary text-primary-foreground"
              : "bg-light-green text-primary",
          )}
        >
          {icon}
        </span>
        <span className="text-xs font-semibold text-primary">{number}</span>
      </div>
      <p className="mt-3 text-sm font-semibold text-foreground">{title}</p>
      <p
        className={cn(
          "mt-1 text-xs text-text-secondary",
          isBangla && "leading-[1.7]",
        )}
      >
        {body}
      </p>
    </>
  );

  const className = cn(
    "flex h-full flex-col rounded-card bg-background p-4 ring-1 ring-border",
    active && "ring-primary",
    href &&
      "outline-none transition-shadow duration-200 ease-standard hover:shadow-card focus-visible:ring-3 focus-visible:ring-ring/50",
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

export { ServiceLearningPath };
export type { ServiceLearningPathProps };
