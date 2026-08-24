"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { FEATURED_CAMPAIGNS, campaignHref } from "@/data/civic-campaigns";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { CampaignCard } from "@/components/campaign/campaign-card";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function HomeFeaturedCampaigns() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const section = t.home.featuredCampaigns;
  const copy = t.campaigns;
  const numberLocale = locale === "bn" ? "bn-BD" : "en-US";

  return (
    <section
      aria-labelledby="featured-campaigns-heading"
      className={cn(
        "bg-background py-10 md:py-12 lg:py-14",
        isBangla && "font-bengali",
      )}
    >
      <Container>
        <SectionHeader
          className="gap-3"
          title={<span id="featured-campaigns-heading">{section.title}</span>}
          description={section.description}
          actions={
            <Link
              href={ROUTES.campaigns}
              className="inline-flex items-center gap-1.5 text-base font-semibold text-primary outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {section.viewAll}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />

        <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_CAMPAIGNS.map((campaign) => {
            const item = copy.items[campaign.key];

            return (
              <li key={campaign.key}>
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
      </Container>
    </section>
  );
}

export { HomeFeaturedCampaigns };
