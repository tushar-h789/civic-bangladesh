"use client";

import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Ban,
  Banknote,
  BookOpen,
  GraduationCap,
  Landmark,
  ScrollText,
  Stamp,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { getEarnedCertificates } from "@/data/certificates";
import {
  getCertificateView,
  getCertificatesHowItems,
  getCertificatesMoreItems,
  getCertificatesNotItems,
} from "@/lib/get-certificate-view";
import { useTranslation } from "@/hooks/use-translation";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { CertificateCard } from "@/components/certificates/certificate-card";

const HERO_IMAGE = "/images/home/civic-courses-hero-v3.png";

const HOW_ICONS = {
  complete: GraduationCap,
  credential: ScrollText,
  visit: Ban,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const NOT_ICONS = {
  notGovernment: Landmark,
  notStamp: Stamp,
  notLive: Award,
} as const satisfies Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

const MORE_ICONS = {
  courses: BookOpen,
  pricing: Banknote,
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

function CertificatesList() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.certificates;
  const views = getEarnedCertificates()
    .map((entry) => getCertificateView(entry, t, locale))
    .filter((view) => view != null);
  const howItems = getCertificatesHowItems(t);
  const notItems = getCertificatesNotItems(t);
  const moreItems = getCertificatesMoreItems(t);

  const jumpLinks = [
    { href: "#certificates-list", label: copy.jump.list },
    { href: "#certificates-how", label: copy.jump.how },
    { href: "#certificates-not", label: copy.jump.notThis },
    { href: "#certificates-more", label: copy.jump.more },
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
              { label: t.nav.resources.certificates },
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
                icon={<Award className="size-3.5" aria-hidden />}
                label={formatTemplate(copy.stats.samples, {
                  count: views.length,
                })}
              />
              <HeroChip
                icon={<Landmark className="size-3.5" aria-hidden />}
                label={copy.stats.notGovernment}
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
          <CertificatesBodySection
            id="certificates-list"
            headingId="certificates-list-heading"
            title={copy.list.title}
            description={copy.list.description}
            meta={formatTemplate(copy.list.showing, { count: views.length })}
            isBangla={isBangla}
          >
            {views.length === 0 ? (
              <div className="rounded-card bg-background p-6 text-center ring-1 ring-border">
                <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-light-green text-primary">
                  <Award className="size-5" aria-hidden />
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {copy.list.emptyTitle}
                </h3>
                <p
                  className={cn(
                    "mt-1.5 text-sm text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {copy.list.emptyDescription}
                </p>
              </div>
            ) : (
              <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
                {views.map((view) => (
                  <li key={view.entry.id}>
                    <CertificateCard
                      view={view}
                      copy={copy}
                      isBangla={isBangla}
                    />
                  </li>
                ))}
              </ul>
            )}
          </CertificatesBodySection>

          <CertificatesBodySection
            id="certificates-how"
            headingId="certificates-how-heading"
            title={copy.how.title}
            description={copy.how.description}
            isBangla={isBangla}
          >
            <ol className="m-0 grid list-none gap-0 p-0 sm:grid-cols-3">
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
          </CertificatesBodySection>

          <CertificatesBodySection
            id="certificates-not"
            headingId="certificates-not-heading"
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
          </CertificatesBodySection>

          <CertificatesBodySection
            id="certificates-more"
            headingId="certificates-more-heading"
            title={copy.more.title}
            description={copy.more.description}
            isBangla={isBangla}
          >
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
              {moreItems.map((item) => {
                const Icon = MORE_ICONS[item.key];

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
          </CertificatesBodySection>
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

function CertificatesBodySection({
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
  meta?: string;
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
          {meta ? (
            <p className="text-sm font-medium text-text-secondary sm:pt-1.5">
              {meta}
            </p>
          ) : null}
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

export { CertificatesList };
