"use client";

import { Award } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { getEarnedCertificates } from "@/data/certificates";
import { getCertificateView } from "@/lib/get-certificate-view";
import { useTranslation } from "@/hooks/use-translation";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { CertificateCard } from "@/components/certificates/certificate-card";

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

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <section className="bg-light-green pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24">
        <Container className="flex flex-col gap-8">
          <Breadcrumb
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.nav.resources.certificates },
            ]}
          />
          <div className="max-w-3xl">
            <h1
              className={cn(
                "text-hero-mobile font-semibold text-balance text-foreground lg:text-5xl",
                isBangla && "leading-tight",
              )}
            >
              {copy.title}
            </h1>
            <p
              className={cn(
                "mt-4 text-body text-text-secondary",
                isBangla && "leading-[1.8]",
              )}
            >
              {copy.description}
            </p>
            <p
              className={cn(
                "mt-3 text-base text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.sampleNote}
            </p>
            <p
              className={cn(
                "mt-3 text-base text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.pricingNote}{" "}
              <Link
                href={ROUTES.pricing}
                className="font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {copy.pricingCta}
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="earned-certificates-heading"
        className="bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={
              <span id="earned-certificates-heading">{copy.list.title}</span>
            }
            description={formatTemplate(copy.list.showing, {
              count: views.length,
            })}
          />

          {views.length === 0 ? (
            <div className="mt-10 max-w-xl rounded-card bg-surface p-8 text-center shadow-card ring-1 ring-border">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-light-green text-primary">
                <Award className="size-6" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                {copy.list.emptyTitle}
              </h2>
              <p
                className={cn(
                  "mt-2 text-sm text-text-secondary",
                  isBangla && "leading-[1.75]",
                )}
              >
                {copy.list.emptyDescription}
              </p>
            </div>
          ) : (
            <ul className="mt-10 grid list-none gap-5 p-0 sm:grid-cols-2 xl:grid-cols-3">
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
        </Container>
      </section>
    </div>
  );
}

export { CertificatesList };
