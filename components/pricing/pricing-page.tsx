"use client";

import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  BookOpen,
  Building2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Landmark,
  Megaphone,
  School,
  ShieldCheck,
  Stamp,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import {
  getPricingNeverItems,
  getPricingValues,
  getPrimaryRevenueProduct,
  getSecondaryRevenueProducts,
} from "@/lib/get-pricing-view";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/home/intro-people.png";

const VALUE_ICONS = {
  lowCost: Banknote,
  transparent: ShieldCheck,
  citizenFriendly: Handshake,
  noUpsell: HeartHandshake,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const NEVER_ICONS = {
  governmentFee: Landmark,
  officialResult: Stamp,
  coreCivic: BookOpen,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const SECONDARY_ICONS = {
  civicPremium: GraduationCap,
  certificateServices: Landmark,
  institutional: Building2,
  schools: School,
  organizations: Building2,
  campaigns: Megaphone,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function PricingPage() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.pricing;
  const values = getPricingValues(t);
  const neverItems = getPricingNeverItems(t);
  const primary = getPrimaryRevenueProduct(t);
  const secondary = getSecondaryRevenueProducts(t);

  const jumpLinks = [
    { href: "#primary-product", label: copy.jump.primary },
    { href: "#pricing-values", label: copy.jump.values },
    { href: "#pricing-never", label: copy.jump.notThis },
    { href: "#secondary-offerings", label: copy.jump.secondary },
  ];

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <section className="relative isolate overflow-hidden bg-text">
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
          className="absolute inset-0 bg-linear-to-r from-text/80 via-text/50 to-text/20 lg:from-text/75 lg:via-text/40 lg:to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-text/70 via-transparent to-text/25"
        />

        <Container className="relative flex flex-col gap-4 pt-6 pb-7 sm:pt-7 sm:pb-8 lg:pt-8 lg:pb-8">
          <Breadcrumb
            tone="onPrimary"
            className="text-sm sm:text-base"
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.nav.resources.pricing },
            ]}
          />

          <div className="flex max-w-2xl flex-col gap-3 rounded-2xl bg-text/50 p-4 ring-1 ring-white/15 backdrop-blur-md sm:gap-3.5 sm:p-5">
            <h1
              className={cn(
                "text-[1.75rem] leading-[1.28] font-semibold text-balance text-white sm:text-[2.125rem] sm:leading-snug lg:text-4xl lg:leading-[1.2]",
                isBangla && "leading-[1.32] sm:leading-[1.3]",
              )}
            >
              {copy.title}
            </h1>
            <p
              className={cn(
                "text-base text-white/85 sm:text-body",
                isBangla && "leading-[1.8]",
              )}
            >
              {copy.description}
            </p>
            <p
              className={cn(
                "text-sm text-white/70",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.sampleNote}
            </p>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              <HeroChip
                icon={<Banknote className="size-3.5" aria-hidden />}
                label={formatTemplate(copy.stats.paid, {
                  count: primary.paidCount,
                })}
              />
              <HeroChip
                icon={<ShieldCheck className="size-3.5" aria-hidden />}
                label={copy.stats.noPayment}
              />
            </ul>
          </div>

          <nav aria-label={copy.jump.label}>
            <p className="text-sm font-semibold text-white">
              {copy.jump.label}
            </p>
            <ol className="mt-2 flex list-none flex-wrap gap-1.5 p-0">
              {jumpLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex h-8 items-center rounded-btn bg-white/10 px-3 text-sm font-medium text-white/90 ring-1 ring-white/15 transition-colors duration-200 ease-standard hover:bg-white/18 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Container>
        <span className="sr-only">{copy.heroImageAlt}</span>
      </section>

      <div className="bg-background py-6 md:py-7 lg:py-8">
        <Container className="flex flex-col gap-3 sm:gap-4">
          <PricingBodySection
            id="primary-product"
            headingId="primary-product-heading"
            title={primary.title}
            description={primary.description}
            isBangla={isBangla}
          >
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
              <div className="rounded-card bg-background p-4 ring-1 ring-border sm:p-5">
                <p
                  className={cn(
                    "text-sm text-text-secondary sm:text-base",
                    isBangla && "leading-[1.8]",
                  )}
                >
                  {primary.usefulness}
                </p>
                <p className="mt-4 text-sm font-semibold text-foreground">
                  {copy.primary.feeLabel}
                </p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {formatTemplate(copy.range.value, {
                    min: primary.feeMin,
                    max: primary.feeMax,
                  })}
                </p>
                <p
                  className={cn(
                    "mt-1.5 text-sm text-text-secondary",
                    isBangla && "leading-[1.7]",
                  )}
                >
                  {formatTemplate(copy.range.hint, {
                    count: primary.paidCount,
                  })}
                </p>
                <Button asChild className="mt-4 h-11 w-fit rounded-btn">
                  <Link href={primary.href}>
                    {primary.cta}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </Button>
              </div>
              <div className="rounded-card bg-light-green p-4 sm:p-5">
                <p className="text-sm font-semibold text-foreground">
                  {copy.range.label}
                </p>
                <p
                  className={cn(
                    "mt-2 text-sm text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {copy.paymentNote}
                </p>
              </div>
            </div>
          </PricingBodySection>

          <PricingBodySection
            id="pricing-values"
            headingId="pricing-values-heading"
            title={copy.values.title}
            description={copy.values.description}
            isBangla={isBangla}
          >
            <ol className="m-0 grid list-none gap-0 p-0 sm:grid-cols-4">
              {values.map((item, index) => {
                const Icon = VALUE_ICONS[item.key];
                const last = index === values.length - 1;

                return (
                  <li
                    key={item.key}
                    className={cn(
                      "relative flex gap-3 sm:flex-col sm:items-center sm:px-2 sm:text-center",
                      !last &&
                        "sm:after:absolute sm:after:top-5 sm:after:left-[calc(50%+1.35rem)] sm:after:right-[-50%] sm:after:h-px sm:after:bg-border sm:after:content-['']",
                    )}
                  >
                    <div className="flex flex-col items-center">
                      <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-light-green text-primary ring-4 ring-surface">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      {last ? null : (
                        <span
                          aria-hidden
                          className="my-1 w-px min-h-5 flex-1 bg-border sm:hidden"
                        />
                      )}
                    </div>
                    <div className="min-w-0 pb-4 sm:pt-2.5 sm:pb-0">
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p
                        className={cn(
                          "mt-1 text-xs text-text-secondary",
                          isBangla && "leading-[1.65]",
                        )}
                      >
                        {item.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </PricingBodySection>

          <PricingBodySection
            id="pricing-never"
            headingId="pricing-never-heading"
            title={copy.never.title}
            description={copy.never.description}
            isBangla={isBangla}
          >
            <ul className="m-0 divide-y divide-border overflow-hidden rounded-card bg-background ring-1 ring-border">
              {neverItems.map((item) => {
                const Icon = NEVER_ICONS[item.key];

                return (
                  <li
                    key={item.key}
                    className="flex items-start gap-3 px-3.5 py-3 sm:items-center"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p
                        className={cn(
                          "mt-0.5 text-sm text-text-secondary",
                          isBangla && "leading-[1.7]",
                        )}
                      >
                        {item.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </PricingBodySection>

          <PricingBodySection
            id="secondary-offerings"
            headingId="secondary-offerings-heading"
            title={copy.secondary.title}
            description={copy.secondary.description}
            isBangla={isBangla}
          >
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {secondary.map((product) => {
                const Icon = SECONDARY_ICONS[product.key];

                return (
                  <li key={product.key}>
                    <Link
                      href={product.href}
                      className="flex h-full cursor-pointer flex-col gap-3 rounded-card bg-background p-4 outline-none ring-1 ring-border transition-shadow duration-200 ease-standard hover:shadow-card focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className="flex size-9 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <p className="text-sm font-semibold text-foreground">
                        {product.title}
                      </p>
                      <p
                        className={cn(
                          "text-sm text-text-secondary",
                          isBangla && "leading-[1.7]",
                        )}
                      >
                        {product.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {product.cta}
                        <ArrowRight className="size-3.5" aria-hidden />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </PricingBodySection>
        </Container>
      </div>
    </div>
  );
}

function HeroChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <li className="inline-flex max-w-full items-center gap-1.5 rounded-btn bg-white/12 px-2.5 py-1 text-sm font-medium text-white ring-1 ring-white/15">
      {icon}
      <span>{label}</span>
    </li>
  );
}

function PricingBodySection({
  id,
  headingId,
  title,
  description,
  isBangla,
  children,
}: {
  id: string;
  headingId: string;
  title: string;
  description: string;
  isBangla: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-28">
      <article className="rounded-card bg-surface p-4 shadow-card ring-1 ring-border sm:p-5">
        <h2
          id={headingId}
          className={cn(
            "text-xl font-semibold text-foreground sm:text-2xl",
            isBangla && "leading-tight",
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "mt-1.5 max-w-2xl text-body text-text-secondary",
            isBangla && "leading-[1.8]",
          )}
        >
          {description}
        </p>
        <div className="mt-4">{children}</div>
      </article>
    </section>
  );
}

export { PricingPage };
