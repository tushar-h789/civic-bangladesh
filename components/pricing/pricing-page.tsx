"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Building2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Landmark,
  Megaphone,
  School,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import {
  getPrimaryRevenueProduct,
  getPricingValues,
  getSecondaryRevenueProducts,
} from "@/lib/get-pricing-view";
import { Badge } from "@/components/common/badge";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/home/intro-people.png";

const VALUE_ICONS = {
  lowCost: Banknote,
  transparent: ShieldCheck,
  citizenFriendly: Handshake,
  noUpsell: HeartHandshake,
} as const;

const SECONDARY_ICONS: Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  civicPremium: GraduationCap,
  certificateServices: Landmark,
  institutional: Building2,
  schools: School,
  organizations: Building2,
  campaigns: Megaphone,
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

function PricingPage() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.pricing;
  const values = getPricingValues(t);
  const primary = getPrimaryRevenueProduct(t);
  const secondary = getSecondaryRevenueProducts(t);
  const neverItems = [
    copy.never.items.governmentFee,
    copy.never.items.officialResult,
    copy.never.items.coreCivic,
  ];

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
              { label: t.nav.resources.pricing },
            ]}
          />
          <div className="flex max-w-2xl flex-col gap-5">
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
                  href="#pricing-values"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.values}
                </a>
              </li>
              <li>
                <a
                  href="#primary-product"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.primary}
                </a>
              </li>
              <li>
                <a
                  href="#secondary-offerings"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.secondary}
                </a>
              </li>
            </ul>
          </nav>
        </Container>
        <span className="sr-only">{copy.heroImageAlt}</span>
      </section>

      <section
        id="pricing-values"
        aria-labelledby="pricing-values-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="pricing-values-heading">{copy.values.title}</span>}
            description={copy.values.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {values.map((value) => {
              const Icon = VALUE_ICONS[value.key];

              return (
                <li key={value.key}>
                  <article className="flex h-full flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
                    <span className="flex size-10 items-center justify-center rounded-btn bg-light-green text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <h3
                      className={cn(
                        "mt-4 text-lg font-semibold text-foreground",
                        isBangla && "leading-[1.45]",
                      )}
                    >
                      {value.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-sm text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {value.body}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>

          <article className="mt-8 rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
            <h3 className="text-base font-semibold text-foreground">
              {copy.never.title}
            </h3>
            <ul className="mt-3 m-0 flex list-none flex-col gap-2 p-0">
              {neverItems.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "text-sm text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p
              className={cn(
                "mt-4 text-sm text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.paymentNote}
            </p>
          </article>
        </Container>
      </section>

      <section
        id="primary-product"
        aria-labelledby="primary-product-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="primary-product-heading">{primary.title}</span>}
            description={primary.description}
          />
          <article className="mt-10 overflow-hidden rounded-card bg-surface ring-1 ring-border sm:mt-12">
            <div className="grid lg:grid-cols-12">
              <div className="flex flex-col gap-4 p-6 sm:p-8 lg:col-span-8">
                <Badge variant="info" className="h-6 w-fit px-2.5">
                  {copy.primary.badge}
                </Badge>
                <p
                  className={cn(
                    "text-body text-text-secondary",
                    isBangla && "leading-[1.8]",
                  )}
                >
                  {primary.usefulness}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {copy.primary.feeLabel}
                </p>
                <p className="text-2xl font-semibold text-foreground">
                  {formatTemplate(copy.range.value, {
                    min: primary.feeMin,
                    max: primary.feeMax,
                  })}
                </p>
                <p
                  className={cn(
                    "text-xs text-text-secondary",
                    isBangla && "leading-[1.7]",
                  )}
                >
                  {formatTemplate(copy.range.hint, {
                    count: primary.paidCount,
                  })}
                </p>
                <Button asChild className="mt-2 w-fit text-primary-foreground">
                  <Link href={primary.href}>
                    {primary.cta}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </div>
              <div className="border-t border-border bg-light-green p-6 sm:p-8 lg:col-span-4 lg:border-t-0 lg:border-l">
                <p className="text-sm font-semibold text-foreground">
                  {copy.range.label}
                </p>
                <p
                  className={cn(
                    "mt-3 text-sm text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {copy.sampleNote}
                </p>
              </div>
            </div>
          </article>
        </Container>
      </section>

      <section
        id="secondary-offerings"
        aria-labelledby="secondary-offerings-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={
              <span id="secondary-offerings-heading">
                {copy.secondary.title}
              </span>
            }
            description={copy.secondary.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 lg:grid-cols-2 lg:gap-5">
            {secondary.map((product) => {
              const Icon = SECONDARY_ICONS[product.key] ?? Building2;

              return (
                <li key={product.key}>
                  <article className="flex h-full flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
                    <div className="flex items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <Badge variant="outline" className="h-6 px-2.5">
                          {copy.secondary.badge}
                        </Badge>
                        <h3
                          className={cn(
                            "mt-2 text-lg font-semibold text-foreground",
                            isBangla && "leading-[1.45]",
                          )}
                        >
                          {product.title}
                        </h3>
                      </div>
                    </div>
                    <p
                      className={cn(
                        "mt-3 text-sm text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {product.description}
                    </p>
                    <p
                      className={cn(
                        "mt-2 text-sm text-foreground",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {product.usefulness}
                    </p>
                    <Link
                      href={product.href}
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {product.cta}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </div>
  );
}

export { PricingPage };
