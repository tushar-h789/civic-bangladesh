"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { FEATURED_CAMPAIGNS, campaignHref } from "@/data/civic-campaigns";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/home/intro-responsibility.png";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function CampaignsHub() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.campaigns;
  const numberLocale = locale === "bn" ? "bn-BD" : "en-US";

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
          className="absolute inset-0 bg-linear-to-r from-text/90 via-text/72 to-text/28"
        />
        <Container className="relative flex flex-col gap-8 pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
          <Breadcrumb
            tone="onPrimary"
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.nav.more.campaigns },
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
        </Container>
        <span className="sr-only">{copy.heroImageAlt}</span>
      </section>

      <section className="bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop">
        <Container>
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {FEATURED_CAMPAIGNS.map((campaign) => {
              const item = copy.items[campaign.key];

              return (
                <li key={campaign.key} id={campaign.slug}>
                  <CampaignCard
                    href={campaignHref(campaign.slug)}
                    image={campaign.image}
                    imageAlt={item.imageAlt}
                    title={item.title}
                    location={item.location}
                    participants={formatTemplate(copy.participants, {
                      count: campaign.participants.toLocaleString(numberLocale),
                    })}
                    progress={campaign.progress}
                    progressLabel={formatTemplate(copy.progress, {
                      percent: campaign.progress,
                    })}
                    cta={copy.cta}
                  />
                </li>
              );
            })}
          </ul>

          <article
            id="partnerships"
            className="mt-10 rounded-card bg-light-green p-6 ring-1 ring-border sm:mt-12 sm:p-8"
          >
            <SectionHeader
              title={copy.partnership.title}
              description={copy.partnership.description}
            />
            <p
              className={cn(
                "mt-4 max-w-2xl text-sm text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.partnership.note}
            </p>
            <Button asChild variant="outline" className="mt-6 w-fit">
              <Link href={ROUTES.pricing}>
                {copy.partnership.pricingCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </article>
        </Container>
      </section>
    </div>
  );
}

export { CampaignsHub };
