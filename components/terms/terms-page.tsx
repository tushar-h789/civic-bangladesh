"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Ban,
  BookOpen,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileWarning,
  GraduationCap,
  Landmark,
  Scale,
  ShieldAlert,
  Stamp,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type {
  TermsAboutKey,
  TermsContentKey,
  TermsLeaveKey,
  TermsNotKey,
  TermsUseKey,
} from "@/data/terms";
import { useTranslation } from "@/hooks/use-translation";
import {
  getTermsAboutItems,
  getTermsContentItems,
  getTermsLeaveItems,
  getTermsNotItems,
  getTermsUseItems,
} from "@/lib/get-terms-view";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/home/intro-responsibility.png";

const ABOUT_ICONS: Record<
  TermsAboutKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  usingTheSite: BookOpen,
  whoItIsFor: Users,
};

const NOT_ICONS: Record<
  TermsNotKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  notPortal: Landmark,
  notAdvice: Scale,
  notPartnership: Building2,
  notPurchase: Ban,
};

const CONTENT_ICONS: Record<
  TermsContentKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  sampleCatalog: FileWarning,
  confirmOfficial: CheckCircle2,
  courses: GraduationCap,
  certificates: Award,
};

const USE_ICONS: Record<
  TermsUseKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  prepareThenApply: ArrowRight,
  doNotPresentAsOfficial: Stamp,
  doNotMisuse: ShieldAlert,
  schoolsOrgs: Users,
};

const LEAVE_ICONS: Record<
  TermsLeaveKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  youtube: ExternalLink,
  officialPortal: ExternalLink,
};

function TermsCard({
  icon: Icon,
  title,
  body,
  isBangla,
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  body: string;
  isBangla: boolean;
}) {
  return (
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
        {title}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm text-text-secondary",
          isBangla && "leading-[1.75]",
        )}
      >
        {body}
      </p>
    </article>
  );
}

function TermsPage() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.terms;
  const about = getTermsAboutItems(t);
  const notThis = getTermsNotItems(t);
  const content = getTermsContentItems(t);
  const yourUse = getTermsUseItems(t);
  const leaving = getTermsLeaveItems(t);

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
              { label: t.footer.links.terms },
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
              {(
                [
                  ["about", copy.jump.about],
                  ["not-this", copy.jump.notThis],
                  ["content", copy.jump.content],
                  ["your-use", copy.jump.yourUse],
                  ["leaving", copy.jump.leaving],
                  ["more", copy.jump.more],
                ] as const
              ).map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#terms-${id}`}
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
            aria-labelledby="terms-notice-heading"
          >
            <ShieldAlert
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <div className="min-w-0">
              <h2
                id="terms-notice-heading"
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
        id="terms-about"
        aria-labelledby="terms-about-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.about.eyebrow}
            title={<span id="terms-about-heading">{copy.about.title}</span>}
            description={copy.about.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {about.map((item) => (
              <li key={item.key}>
                <TermsCard
                  icon={ABOUT_ICONS[item.key]}
                  title={item.title}
                  body={item.body}
                  isBangla={isBangla}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="terms-not-this"
        aria-labelledby="terms-not-this-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.notThis.eyebrow}
            title={
              <span id="terms-not-this-heading">{copy.notThis.title}</span>
            }
            description={copy.notThis.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {notThis.map((item) => (
              <li key={item.key}>
                <TermsCard
                  icon={NOT_ICONS[item.key]}
                  title={item.title}
                  body={item.body}
                  isBangla={isBangla}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="terms-content"
        aria-labelledby="terms-content-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.content.eyebrow}
            title={
              <span id="terms-content-heading">{copy.content.title}</span>
            }
            description={copy.content.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {content.map((item) => (
              <li key={item.key}>
                <TermsCard
                  icon={CONTENT_ICONS[item.key]}
                  title={item.title}
                  body={item.body}
                  isBangla={isBangla}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="terms-your-use"
        aria-labelledby="terms-your-use-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.yourUse.eyebrow}
            title={
              <span id="terms-your-use-heading">{copy.yourUse.title}</span>
            }
            description={copy.yourUse.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {yourUse.map((item) => (
              <li key={item.key}>
                <TermsCard
                  icon={USE_ICONS[item.key]}
                  title={item.title}
                  body={item.body}
                  isBangla={isBangla}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="terms-leaving"
        aria-labelledby="terms-leaving-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.leaving.eyebrow}
            title={
              <span id="terms-leaving-heading">{copy.leaving.title}</span>
            }
            description={copy.leaving.description}
          />
          <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {leaving.map((item) => (
              <li key={item.key}>
                <TermsCard
                  icon={LEAVE_ICONS[item.key]}
                  title={item.title}
                  body={item.body}
                  isBangla={isBangla}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="terms-more"
        aria-labelledby="terms-more-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.more.eyebrow}
            title={<span id="terms-more-heading">{copy.more.title}</span>}
            description={copy.more.description}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild className="w-fit text-primary-foreground">
              <Link href={ROUTES.privacy}>
                {copy.more.privacyCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-fit">
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

export { TermsPage };
