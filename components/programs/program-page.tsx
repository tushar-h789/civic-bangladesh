"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

function ProgramPage({
  kind,
  heroImage,
}: {
  kind: "schools" | "organizations";
  heroImage: string;
}) {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const shared = t.programs;
  const copy = t.programs[kind];
  const usefulness = Object.values(copy.usefulness);
  const notThis = Object.values(copy.notThis);

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <section className="relative isolate overflow-hidden bg-primary">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={heroImage}
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
              { label: copy.eyebrow },
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
              {shared.sampleNote}
            </p>
          </div>
        </Container>
        <span className="sr-only">{copy.heroImageAlt}</span>
      </section>

      <section className="bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-card bg-surface p-6 ring-1 ring-border sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">
                {copy.usefulnessTitle}
              </h2>
              <ul className="mt-6 m-0 flex list-none flex-col gap-3 p-0">
                {usefulness.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "text-sm text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-card bg-surface p-6 ring-1 ring-border sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">
                {copy.notThisTitle}
              </h2>
              <ul className="mt-6 m-0 flex list-none flex-col gap-3 p-0">
                {notThis.map((item) => (
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
            </article>
          </div>

          {kind === "organizations" ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <ExtraCard
                id="institutional-packages"
                title={t.programs.organizations.institutional.title}
                body={t.programs.organizations.institutional.body}
                isBangla={isBangla}
              />
              <ExtraCard
                id="csr"
                title={t.programs.organizations.csr.title}
                body={t.programs.organizations.csr.body}
                isBangla={isBangla}
              />
            </div>
          ) : null}

          <p
            className={cn(
              "mt-8 max-w-2xl text-sm text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            {shared.noPurchase}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild className="w-fit text-primary-foreground">
              <Link href={ROUTES.pricing}>
                {shared.pricingCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-fit">
              <Link href={ROUTES.learn}>
                {shared.civicCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

function ExtraCard({
  id,
  title,
  body,
  isBangla,
}: {
  id?: string;
  title: ReactNode;
  body: ReactNode;
  isBangla: boolean;
}) {
  return (
    <article
      id={id}
      className="scroll-mt-28 rounded-card bg-light-green p-6 ring-1 ring-border sm:p-8"
    >
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p
        className={cn(
          "mt-3 text-sm text-text-secondary",
          isBangla && "leading-[1.75]",
        )}
      >
        {body}
      </p>
    </article>
  );
}

export { ProgramPage };
