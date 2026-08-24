"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  HeartHandshake,
  Landmark,
  ListChecks,
  Megaphone,
  MessageSquareOff,
  ShieldAlert,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type {
  CommunityGroupKey,
  CommunityNotKey,
  CommunityWayKey,
} from "@/data/community";
import { useTranslation } from "@/hooks/use-translation";
import {
  getCommunityCampaigns,
  getCommunityGroups,
  getCommunityHowItems,
  getCommunityNotItems,
  getCommunityWays,
} from "@/lib/get-community-view";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/topics/topic-community.png";

const WAY_ICONS: Record<
  CommunityWayKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  campaigns: Megaphone,
  stories: BookOpen,
  promise: HeartHandshake,
  challenges: ListChecks,
};

const NOT_ICONS: Record<
  CommunityNotKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  notFeed: MessageSquareOff,
  notDirectory: Users,
  notGovernment: Landmark,
};

const GROUP_ICONS: Record<
  CommunityGroupKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  schools: Building2,
  organizations: HeartHandshake,
  topic: BookOpen,
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

function CommunityPage() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.community;
  const ways = getCommunityWays(t);
  const campaigns = getCommunityCampaigns(t);
  const howItems = getCommunityHowItems(t);
  const notItems = getCommunityNotItems(t);
  const groups = getCommunityGroups(t);
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
          className="absolute inset-0 bg-linear-to-r from-text/90 via-text/72 to-text/30"
        />

        <Container className="relative flex flex-col gap-8 pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
          <Breadcrumb
            tone="onPrimary"
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.nav.resources.community },
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
                "max-w-xl text-base text-white/70",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.sampleNote}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                className="inline-flex h-12 items-center gap-2 rounded-btn bg-white px-6 text-button text-primary hover:bg-light-green"
              >
                <Link href={ROUTES.campaigns}>
                  {copy.ways.campaigns.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="inline-flex h-12 items-center gap-2 rounded-btn border-white/40 bg-transparent px-6 text-button text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={ROUTES.civicPromise}>
                  {copy.ways.promise.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
          <nav aria-label={copy.jump.label}>
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-base">
              {(
                [
                  ["community-ways", copy.jump.ways],
                  ["community-campaigns", copy.jump.campaigns],
                  ["community-how", copy.jump.how],
                  ["community-not", copy.jump.notThis],
                  ["community-groups", copy.jump.groups],
                ] as const
              ).map(([href, label]) => (
                <li key={href}>
                  <a
                    href={`#${href}`}
                    className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
        <span className="sr-only">{copy.heroImageAlt}</span>
      </section>

      <section className="bg-background pt-8 pb-0 md:pt-10">
        <Container>
          <aside
            className="flex gap-3 rounded-card bg-light-green p-5 ring-1 ring-border sm:p-6"
            aria-labelledby="community-notice-heading"
          >
            <ShieldAlert
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <div className="min-w-0">
              <h2
                id="community-notice-heading"
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
        id="community-ways"
        aria-labelledby="community-ways-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="community-ways-heading">{copy.ways.title}</span>}
            description={copy.ways.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {ways.map((item) => {
              const Icon = WAY_ICONS[item.key];

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
                    <Link
                      href={item.href}
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {item.cta}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        id="community-campaigns"
        aria-labelledby="community-campaigns-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={
              <span id="community-campaigns-heading">
                {copy.campaigns.title}
              </span>
            }
            description={copy.campaigns.description}
            actions={
              <Link
                href={ROUTES.campaigns}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {copy.campaigns.browseCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            }
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {campaigns.map((campaign) => (
              <li key={campaign.key}>
                <CampaignCard
                  href={campaign.href}
                  image={campaign.image}
                  imageAlt={campaign.imageAlt}
                  title={campaign.title}
                  location={campaign.location}
                  participants={formatTemplate(t.campaigns.participants, {
                    count: campaign.participants.toLocaleString(numberLocale),
                  })}
                  progress={campaign.progress}
                  progressLabel={formatTemplate(t.campaigns.progress, {
                    percent: campaign.progress,
                  })}
                  cta={t.campaigns.cta}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="community-how"
        aria-labelledby="community-how-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="community-how-heading">{copy.how.title}</span>}
            description={copy.how.description}
          />
          <ol className="mt-10 m-0 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {howItems.map((item, index) => (
              <li key={item.key}>
                <article className="flex h-full flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:p-6">
                  <p className="text-sm font-semibold tabular-nums text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className={cn(
                      "mt-3 text-lg font-semibold text-foreground",
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
            ))}
          </ol>
        </Container>
      </section>

      <section
        id="community-not"
        aria-labelledby="community-not-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="community-not-heading">{copy.notThis.title}</span>}
            description={copy.notThis.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 lg:grid-cols-3 lg:gap-5">
            {notItems.map((item) => {
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
        id="community-groups"
        aria-labelledby="community-groups-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={
              <span id="community-groups-heading">{copy.groups.title}</span>
            }
            description={copy.groups.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 lg:grid-cols-3 lg:gap-5">
            {groups.map((item) => {
              const Icon = GROUP_ICONS[item.key];

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
                    <Link
                      href={item.href}
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {item.cta}
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

export { CommunityPage };
