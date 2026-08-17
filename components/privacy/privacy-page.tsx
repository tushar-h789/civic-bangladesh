"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  Ban,
  CreditCard,
  Eraser,
  ExternalLink,
  FileWarning,
  IdCard,
  Languages,
  Monitor,
  ShieldAlert,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type {
  PrivacyClearKey,
  PrivacyLeaveKey,
  PrivacyNotKey,
  PrivacyStoredKey,
} from "@/data/privacy";
import { useTranslation } from "@/hooks/use-translation";
import {
  getPrivacyClearItems,
  getPrivacyLeaveItems,
  getPrivacyNotItems,
  getPrivacyStoredItems,
} from "@/lib/get-privacy-view";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/home/intro-people.png";

const STORED_ICONS: Record<
  PrivacyStoredKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  language: Languages,
  accessibility: Accessibility,
};

const NOT_ICONS: Record<
  PrivacyNotKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  applications: FileWarning,
  payments: CreditCard,
  nid: IdCard,
  accounts: UserRound,
  analytics: Ban,
};

const LEAVE_ICONS: Record<
  PrivacyLeaveKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  youtube: ExternalLink,
  officialPortal: ExternalLink,
};

const CLEAR_ICONS: Record<
  PrivacyClearKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  browser: Eraser,
  accessibility: Monitor,
};

function PrivacyPage() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.privacy;
  const stored = getPrivacyStoredItems(t);
  const notCollected = getPrivacyNotItems(t);
  const leaving = getPrivacyLeaveItems(t);
  const clearItems = getPrivacyClearItems(t);

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
            className="object-cover object-[60%_center]"
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
              { label: t.footer.links.privacy },
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
                "max-w-xl text-sm text-white/70",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.sampleNote}
            </p>
          </div>
          <nav aria-label={copy.jump.label}>
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-sm">
              <li>
                <a
                  href="#privacy-stored"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.stored}
                </a>
              </li>
              <li>
                <a
                  href="#privacy-not-collected"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.notCollected}
                </a>
              </li>
              <li>
                <a
                  href="#privacy-leaving"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.leaving}
                </a>
              </li>
              <li>
                <a
                  href="#privacy-clear"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.clear}
                </a>
              </li>
              <li>
                <a
                  href="#privacy-more"
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
            aria-labelledby="privacy-notice-heading"
          >
            <ShieldAlert
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <div className="min-w-0">
              <h2
                id="privacy-notice-heading"
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
        id="privacy-stored"
        aria-labelledby="privacy-stored-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.stored.eyebrow}
            title={
              <span id="privacy-stored-heading">{copy.stored.title}</span>
            }
            description={copy.stored.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {stored.map((item) => {
              const Icon = STORED_ICONS[item.key];

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
                    {item.href && item.cta ? (
                      <Link
                        href={item.href}
                        className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        {item.cta}
                        <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        id="privacy-not-collected"
        aria-labelledby="privacy-not-collected-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.notCollected.eyebrow}
            title={
              <span id="privacy-not-collected-heading">
                {copy.notCollected.title}
              </span>
            }
            description={copy.notCollected.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {notCollected.map((item) => {
              const Icon = NOT_ICONS[item.key];

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
        id="privacy-leaving"
        aria-labelledby="privacy-leaving-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.leaving.eyebrow}
            title={
              <span id="privacy-leaving-heading">{copy.leaving.title}</span>
            }
            description={copy.leaving.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {leaving.map((item) => {
              const Icon = LEAVE_ICONS[item.key];

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
        id="privacy-clear"
        aria-labelledby="privacy-clear-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.clear.eyebrow}
            title={<span id="privacy-clear-heading">{copy.clear.title}</span>}
            description={copy.clear.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {clearItems.map((item) => {
              const Icon = CLEAR_ICONS[item.key];

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
                    {item.href && item.cta ? (
                      <Link
                        href={item.href}
                        className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        {item.cta}
                        <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        id="privacy-more"
        aria-labelledby="privacy-more-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.more.eyebrow}
            title={<span id="privacy-more-heading">{copy.more.title}</span>}
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
              <Link href={ROUTES.accessibility}>
                {copy.more.accessibilityCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-fit">
              <Link href={ROUTES.terms}>
                {copy.more.termsCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

export { PrivacyPage };
