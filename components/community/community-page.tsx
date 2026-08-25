"use client";

import type { ComponentType, ReactNode } from "react";
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
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type {
  CommunityGroupKey,
  CommunityHowKey,
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

const HOW_ICONS: Record<
  CommunityHowKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  join: Megaphone,
  practice: HeartHandshake,
  inspire: BookOpen,
  share: Users,
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

  const jumpLinks = [
    { href: "#community-ways", label: copy.jump.ways },
    { href: "#community-campaigns", label: copy.jump.campaigns },
    { href: "#community-how", label: copy.jump.how },
    { href: "#community-not", label: copy.jump.notThis },
    { href: "#community-groups", label: copy.jump.groups },
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
              { label: t.nav.resources.community },
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
                icon={<Users className="size-3.5" aria-hidden />}
                label={copy.stats.ways}
              />
              <HeroChip
                icon={<MessageSquareOff className="size-3.5" aria-hidden />}
                label={copy.stats.noFeed}
              />
            </ul>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                className="h-11 rounded-btn bg-white px-5 text-button text-primary hover:bg-light-green"
              >
                <Link href={ROUTES.campaigns}>
                  {copy.ways.campaigns.cta}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-btn border-white/40 bg-transparent px-5 text-button text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={ROUTES.civicPromise}>
                  {copy.ways.promise.cta}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </Button>
            </div>
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
          <CommunityBodySection
            id="community-ways"
            headingId="community-ways-heading"
            title={copy.ways.title}
            description={copy.ways.description}
            isBangla={isBangla}
          >
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
              {ways.map((item) => {
                const Icon = WAY_ICONS[item.key];

                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="flex h-full cursor-pointer flex-col gap-3 rounded-card bg-background p-4 outline-none ring-1 ring-border transition-shadow duration-200 ease-standard hover:shadow-card focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className="flex size-9 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p
                        className={cn(
                          "text-sm text-text-secondary",
                          isBangla && "leading-[1.7]",
                        )}
                      >
                        {item.body}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {item.cta}
                        <ArrowRight className="size-3.5" aria-hidden />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </CommunityBodySection>

          <CommunityBodySection
            id="community-campaigns"
            headingId="community-campaigns-heading"
            title={copy.campaigns.title}
            description={copy.campaigns.description}
            meta={
              <Link
                href={ROUTES.campaigns}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {copy.campaigns.browseCta}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            }
            isBangla={isBangla}
          >
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
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
                    className="bg-background shadow-none"
                  />
                </li>
              ))}
            </ul>
          </CommunityBodySection>

          <CommunityBodySection
            id="community-how"
            headingId="community-how-heading"
            title={copy.how.title}
            description={copy.how.description}
            isBangla={isBangla}
          >
            <ol className="m-0 grid list-none gap-0 p-0 sm:grid-cols-4">
              {howItems.map((item, index) => {
                const Icon = HOW_ICONS[item.key];
                const last = index === howItems.length - 1;

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
          </CommunityBodySection>

          <CommunityBodySection
            id="community-not"
            headingId="community-not-heading"
            title={copy.notThis.title}
            description={copy.notThis.description}
            isBangla={isBangla}
          >
            <ul className="m-0 divide-y divide-border overflow-hidden rounded-card bg-background ring-1 ring-border">
              {notItems.map((item) => {
                const Icon = NOT_ICONS[item.key];

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
          </CommunityBodySection>

          <CommunityBodySection
            id="community-groups"
            headingId="community-groups-heading"
            title={copy.groups.title}
            description={copy.groups.description}
            isBangla={isBangla}
          >
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3">
              {groups.map((item) => {
                const Icon = GROUP_ICONS[item.key];

                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="flex h-full cursor-pointer flex-col gap-3 rounded-card bg-background p-4 outline-none ring-1 ring-border transition-shadow duration-200 ease-standard hover:shadow-card focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className="flex size-9 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p
                        className={cn(
                          "text-sm text-text-secondary",
                          isBangla && "leading-[1.7]",
                        )}
                      >
                        {item.body}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {item.cta}
                        <ArrowRight className="size-3.5" aria-hidden />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </CommunityBodySection>
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

function CommunityBodySection({
  id,
  headingId,
  title,
  description,
  meta,
  isBangla,
  children,
}: {
  id: string;
  headingId: string;
  title: string;
  description: string;
  meta?: ReactNode;
  isBangla: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-28">
      <article className="rounded-card bg-surface p-4 shadow-card ring-1 ring-border sm:p-5">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h2
            id={headingId}
            className={cn(
              "text-xl font-semibold text-foreground sm:text-2xl",
              isBangla && "leading-tight",
            )}
          >
            {title}
          </h2>
          {meta ? <div className="sm:pt-1.5">{meta}</div> : null}
        </div>
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

export { CommunityPage };
