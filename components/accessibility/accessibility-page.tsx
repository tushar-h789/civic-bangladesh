"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  Blend,
  Contrast,
  Heading,
  Languages,
  Link2,
  Minimize2,
  MousePointer2,
  Palette,
  RotateCcw,
  Save,
  ShieldAlert,
  Type,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { AccessibilityHowKey } from "@/data/accessibility-page";
import { useAccessibility } from "@/hooks/use-accessibility";
import { useTranslation } from "@/hooks/use-translation";
import {
  getAccessibilityHowItems,
  getAccessibilityLimits,
  getAccessibilityToggles,
} from "@/lib/get-accessibility-page";
import {
  FONT_SCALE_MAX,
  FONT_SCALE_MIN,
} from "@/redux/slices/accessibility-slice";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const HERO_IMAGE = "/images/home/intro-rules.png";

const HOW_ICONS: Record<
  AccessibilityHowKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  button: Accessibility,
  saved: Save,
  motion: Contrast,
  language: Languages,
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

function AccessibilityPage() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const a11y = t.accessibility;
  const copy = a11y.page;
  const howItems = getAccessibilityHowItems(t);
  const limits = getAccessibilityLimits(t);
  const toggles = getAccessibilityToggles(t);
  const {
    state,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
    toggleMonochrome,
    toggleInvertColors,
    toggleHighlightLinks,
    toggleHighlightHeadings,
    toggleLargeCursor,
    toggleReduceMotion,
    resetAccessibility,
  } = useAccessibility();

  const toggleHandlers = {
    highContrast: toggleHighContrast,
    monochrome: toggleMonochrome,
    invertColors: toggleInvertColors,
    highlightLinks: toggleHighlightLinks,
    highlightHeadings: toggleHighlightHeadings,
    largeCursor: toggleLargeCursor,
    reduceMotion: toggleReduceMotion,
  } as const;

  const toggleChecked = {
    highContrast: state.highContrast,
    monochrome: state.monochrome,
    invertColors: state.invertColors,
    highlightLinks: state.highlightLinks,
    highlightHeadings: state.highlightHeadings,
    largeCursor: state.largeCursor,
    reduceMotion: state.reduceMotion,
  } as const;

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
              { label: t.footer.links.accessibility },
            ]}
          />
          <div className="flex max-w-2xl flex-col gap-5">
            <p className="text-sm font-semibold tracking-wide text-white/75 uppercase">
              {copy.eyebrow}
            </p>
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
              <li>
                <a
                  href="#a11y-settings"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.settings}
                </a>
              </li>
              <li>
                <a
                  href="#a11y-how"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.how}
                </a>
              </li>
              <li>
                <a
                  href="#a11y-limits"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.limits}
                </a>
              </li>
              <li>
                <a
                  href="#a11y-more"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.more}
                </a>
              </li>
            </ul>
          </nav>
        </Container>
        <span className="sr-only">{copy.heroImageAlt}</span>
      </section>

      <section className="bg-background pt-8 pb-0 md:pt-10">
        <Container>
          <aside
            className="flex gap-3 rounded-card bg-light-green p-5 ring-1 ring-border sm:p-6"
            aria-labelledby="a11y-notice-heading"
          >
            <ShieldAlert
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <div className="min-w-0">
              <h2
                id="a11y-notice-heading"
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

      <section
        id="a11y-settings"
        aria-labelledby="a11y-settings-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container className="max-w-3xl">
          <SectionHeader
            eyebrow={copy.settings.eyebrow}
            title={
              <span id="a11y-settings-heading">{copy.settings.title}</span>
            }
            description={copy.settings.description}
          />

          <div className="mt-10 overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border sm:mt-12">
            <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <Type className="size-4 text-primary" aria-hidden />
                  {a11y.textSize.label}
                </p>
                <p
                  className={cn(
                    "mt-1 text-sm text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {formatTemplate(copy.settings.textSizeHint, {
                    min: FONT_SCALE_MIN,
                    max: FONT_SCALE_MAX,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={decreaseFontSize}
                  disabled={state.fontScale <= FONT_SCALE_MIN}
                  aria-label={a11y.textSize.decrease}
                >
                  <span aria-hidden="true" className="text-sm font-semibold">
                    A−
                  </span>
                </Button>
                <span
                  className="min-w-12 text-center text-sm font-semibold tabular-nums text-foreground"
                  aria-live="polite"
                >
                  {state.fontScale}%
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={increaseFontSize}
                  disabled={state.fontScale >= FONT_SCALE_MAX}
                  aria-label={a11y.textSize.increase}
                >
                  <span aria-hidden="true" className="text-sm font-semibold">
                    A+
                  </span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetFontSize}
                  disabled={state.fontScale === FONT_SCALE_MIN}
                  aria-label={a11y.textSize.reset}
                >
                  {t.common.actions.reset}
                </Button>
              </div>
            </div>

            <ul className="m-0 flex list-none flex-col divide-y divide-border p-0">
              {toggles.map((item) => {
                const id = `a11y-page-${item.key}`;

                return (
                  <li key={item.key} className="flex items-start gap-4 px-5 py-4 sm:px-6">
                    <ToggleIcon toggleKey={item.key} />
                    <div className="min-w-0 flex-1">
                      <Label
                        htmlFor={id}
                        className="text-base font-semibold text-foreground"
                      >
                        {item.label}
                      </Label>
                      <p
                        className={cn(
                          "mt-1 text-sm text-text-secondary",
                          isBangla && "leading-[1.75]",
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      id={id}
                      checked={toggleChecked[item.key]}
                      onCheckedChange={toggleHandlers[item.key]}
                    />
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-border p-5 sm:p-6">
              <Button
                type="button"
                variant="outline"
                onClick={resetAccessibility}
                className="w-full sm:w-fit"
              >
                <RotateCcw className="size-4" aria-hidden />
                {a11y.resetAll}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="a11y-how"
        aria-labelledby="a11y-how-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.how.eyebrow}
            title={<span id="a11y-how-heading">{copy.how.title}</span>}
            description={copy.how.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {howItems.map((item) => {
              const Icon = HOW_ICONS[item.key];

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
        id="a11y-limits"
        aria-labelledby="a11y-limits-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.limits.eyebrow}
            title={<span id="a11y-limits-heading">{copy.limits.title}</span>}
            description={copy.limits.description}
          />
          <ul className="mt-10 m-0 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {limits.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface p-5 text-sm text-text-secondary ring-1 ring-border sm:p-6"
              >
                <p className={cn(isBangla && "leading-[1.75]")}>{item}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="a11y-more"
        aria-labelledby="a11y-more-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.more.eyebrow}
            title={<span id="a11y-more-heading">{copy.more.title}</span>}
            description={copy.more.description}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild className="w-fit text-primary-foreground">
              <Link href={ROUTES.help}>
                {copy.more.helpCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-fit">
              <Link href={ROUTES.faq}>
                {copy.more.faqCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

function ToggleIcon({
  toggleKey,
}: {
  toggleKey: ReturnType<typeof getAccessibilityToggles>[number]["key"];
}) {
  const className = "mt-1 size-4 shrink-0 text-primary";

  switch (toggleKey) {
    case "highContrast":
      return <Contrast className={className} aria-hidden />;
    case "monochrome":
      return <Palette className={className} aria-hidden />;
    case "invertColors":
      return <Blend className={className} aria-hidden />;
    case "highlightLinks":
      return <Link2 className={className} aria-hidden />;
    case "highlightHeadings":
      return <Heading className={className} aria-hidden />;
    case "largeCursor":
      return <MousePointer2 className={className} aria-hidden />;
    case "reduceMotion":
      return <Minimize2 className={className} aria-hidden />;
  }
}

export { AccessibilityPage };
