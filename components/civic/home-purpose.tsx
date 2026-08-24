"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Compass,
  GraduationCap,
  Landmark,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

type Focus = "mission" | "vision" | null;
type StageKey = "learn" | "understand" | "act" | "impact";

const STAGES: {
  key: StageKey;
  icon: typeof BookOpen;
}[] = [
  { key: "learn", icon: BookOpen },
  { key: "understand", icon: Landmark },
  { key: "act", icon: Compass },
  { key: "impact", icon: Users },
];

function HomePurpose() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.home.purpose;
  const [focus, setFocus] = React.useState<Focus>(null);

  return (
    <section
      id="purpose"
      aria-labelledby="purpose-heading"
      className={cn(
        "relative overflow-hidden bg-light-green/55 py-section-mobile md:py-section-tablet lg:py-section-desktop",
        isBangla && "font-bengali",
      )}
    >
      <div
        aria-hidden="true"
        className="purpose-grid pointer-events-none absolute inset-0 opacity-40"
      />

      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8 xl:gap-x-16">
          <header className="purpose-copy-motion max-w-xl lg:col-span-5">
            <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
              {copy.eyebrow}
            </p>
            <h2
              id="purpose-heading"
              className="mt-3 text-section-heading font-semibold text-balance text-text"
            >
              {copy.heading}
            </h2>
            <p
              className={cn(
                "mt-5 max-w-lg text-body text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.description}
            </p>
          </header>

          <PurposeCard
            kind="mission"
            label={copy.mission.label}
            body={copy.mission.body}
            active={focus === "mission"}
            isBangla={isBangla}
            onFocusChange={setFocus}
            className="purpose-copy-motion purpose-copy-delay-1 lg:col-span-5 lg:row-start-2"
          />

          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-4 lg:row-start-1">
            <PurposeVisual copy={copy} focus={focus} isBangla={isBangla} />
          </div>

          <PurposeCard
            kind="vision"
            label={copy.vision.label}
            body={copy.vision.body}
            active={focus === "vision"}
            isBangla={isBangla}
            onFocusChange={setFocus}
            className="purpose-copy-motion purpose-copy-delay-2 lg:col-span-5 lg:row-start-3"
          />

          <div className="purpose-copy-motion purpose-copy-delay-3 flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-5 lg:row-start-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-btn px-5 text-button"
            >
              <Link href={ROUTES.about}>{copy.primaryCta}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-11 rounded-btn px-5 text-button text-primary-foreground"
            >
              <Link href={ROUTES.learn}>{copy.secondaryCta}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PurposeCard({
  kind,
  label,
  body,
  active,
  isBangla,
  onFocusChange,
  className,
}: {
  kind: "mission" | "vision";
  label: string;
  body: string;
  active: boolean;
  isBangla: boolean;
  onFocusChange: (value: Focus) => void;
  className?: string;
}) {
  return (
    <article
      className={cn("max-w-xl", className)}
      onMouseEnter={() => onFocusChange(kind)}
      onMouseLeave={() => onFocusChange(null)}
    >
      <button
        type="button"
        aria-pressed={active}
        aria-describedby={`purpose-${kind}-body`}
        onFocus={() => onFocusChange(kind)}
        onBlur={() => onFocusChange(null)}
        className={cn(
          "w-full rounded-card border bg-surface p-5 text-left shadow-card transition-[border-color,box-shadow,transform] duration-300 ease-standard sm:p-6",
          active
            ? "border-primary shadow-card-hover"
            : "border-border hover:border-primary/40",
        )}
      >
        <span className="text-sm font-semibold text-primary">{label}</span>
        <span
          id={`purpose-${kind}-body`}
          className={cn(
            "mt-2 block text-body text-text",
            isBangla && "leading-[1.7]",
          )}
        >
          {body}
        </span>
      </button>
    </article>
  );
}

function PurposeVisual({
  copy,
  focus,
  isBangla,
}: {
  copy: {
    visualLabel: string;
    futureLine: string;
    mission: { highlight: string };
    vision: { highlight: string };
    stages: Record<StageKey, { chapter: string; label: string; body: string }>;
  };
  focus: Focus;
  isBangla: boolean;
}) {
  return (
    <div
      aria-label={copy.visualLabel}
      className="relative overflow-hidden rounded-card border border-border bg-surface shadow-card"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_oklch,var(--color-light-green)_80%,transparent),transparent_58%)]" />
      <Image
        src="/images/home/bangladesh-map.png"
        alt=""
        width={420}
        height={560}
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-[-12%] h-[78%] w-auto opacity-[0.12] lg:right-[-4%]"
      />

      <div className="relative flex flex-col gap-6 p-5 sm:p-7 lg:p-8">
        <div className="flex flex-wrap gap-2">
          <HighlightChip
            active={focus === "mission"}
            label={copy.mission.highlight}
            icon={GraduationCap}
          />
          <HighlightChip
            active={focus === "vision"}
            label={copy.vision.highlight}
            icon={Users}
          />
        </div>

        <ol className="relative m-0 flex list-none flex-col gap-0 p-0">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-7 bottom-7 left-[1.125rem] z-0 w-0 -translate-x-px border-l-2 border-dashed border-primary/40 sm:top-8 sm:bottom-8 sm:left-[1.375rem]"
          />

          {STAGES.map((stage, index) => {
            const Icon = stage.icon;
            const item = copy.stages[stage.key];

            return (
              <li
                key={stage.key}
                className="relative flex gap-3.5 py-2.5 sm:gap-4 sm:py-3"
              >
                <span
                  className={cn(
                    "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border bg-surface text-primary sm:size-11",
                    index === STAGES.length - 1
                      ? "border-accent-red/50"
                      : "border-primary/25",
                  )}
                >
                  <Icon className="size-4 sm:size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-xs font-semibold tracking-[0.12em] text-text-secondary uppercase">
                    {item.chapter}
                  </p>
                  <p className="mt-0.5 text-base font-semibold text-text sm:text-lg">
                    {item.label}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-sm text-text-secondary",
                      isBangla && "leading-[1.7]",
                    )}
                  >
                    {item.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <p
          className={cn(
            "border-t border-border pt-4 text-sm font-medium text-primary",
            isBangla && "leading-[1.7]",
          )}
        >
          {copy.futureLine}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <span className="purpose-float absolute top-24 right-8 flex size-11 items-center justify-center rounded-card border border-border bg-surface shadow-card">
          <BookOpen className="size-4 text-primary" />
        </span>
        <span className="purpose-float purpose-float-delay absolute right-16 bottom-28 flex size-11 items-center justify-center rounded-card border border-border bg-surface shadow-card">
          <Landmark className="size-4 text-secondary" />
        </span>
        <span className="purpose-float absolute right-8 bottom-12 flex size-10 items-center justify-center rounded-full border border-primary/25 bg-surface shadow-card">
          <Users className="size-4 text-primary" />
        </span>
      </div>
    </div>
  );
}

function HighlightChip({
  active,
  label,
  icon: Icon,
}: {
  active: boolean;
  label: string;
  icon: typeof Users;
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-btn border px-2.5 py-1.5 text-xs font-medium transition-colors duration-300 ease-standard",
        active
          ? "border-primary bg-light-green text-primary"
          : "border-border bg-background text-text-secondary",
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </span>
  );
}

export { HomePurpose };
