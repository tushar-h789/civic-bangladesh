"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { catalogCourseHref } from "@/data/civic-courses";
import { getCertificateById } from "@/data/certificates";
import { serviceHref } from "@/data/government-services";
import { getCertificateView } from "@/lib/get-certificate-view";
import { useTranslation } from "@/hooks/use-translation";
import { Badge } from "@/components/common/badge";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { CertificateDocument } from "@/components/certificates/certificate-document";
import { Button } from "@/components/ui/button";

function CertificateDetail({ certificateId }: { certificateId: string }) {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.certificates;
  const entry = getCertificateById(certificateId);
  const view = entry ? getCertificateView(entry, t, locale) : null;

  if (!view) return null;

  const courseHref = catalogCourseHref(view.course.slug);
  const relatedServiceHref = view.relatedService
    ? serviceHref(view.relatedService.slug)
    : null;

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <section className="bg-light-green pt-10 pb-12 md:pt-12 md:pb-16">
        <Container className="flex flex-col gap-6">
          <Breadcrumb
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.nav.resources.certificates, href: ROUTES.certificates },
              { label: view.courseTitle },
            ]}
          />
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="info" className="h-6 px-2.5">
              {copy.document.sampleBadge}
            </Badge>
            <Badge variant="success" className="h-6 px-2.5">
              {view.verification.label}
            </Badge>
          </div>
          <div className="max-w-3xl">
            <h1
              className={cn(
                "text-hero-mobile font-semibold text-balance text-foreground lg:text-5xl",
                isBangla && "leading-tight",
              )}
            >
              {copy.detail.title}
            </h1>
            <p
              className={cn(
                "mt-4 text-body text-text-secondary",
                isBangla && "leading-[1.8]",
              )}
            >
              {view.courseTitle}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] xl:gap-14">
          <CertificateDocument
            view={view}
            copy={copy}
            isBangla={isBangla}
          />

          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
            <div className="rounded-card bg-surface p-6 shadow-card ring-1 ring-border">
              <h2 className="text-sm font-semibold text-foreground">
                {copy.detail.factsTitle}
              </h2>
              <dl className="mt-4 flex flex-col gap-4 text-sm">
                <Fact label={copy.detail.learner} value={view.learnerName} />
                <Fact label={copy.detail.course} value={view.courseTitle} />
                <Fact
                  label={copy.detail.relatedService}
                  value={
                    view.relatedServiceTitle ?? copy.detail.noRelatedService
                  }
                />
                <Fact
                  label={copy.detail.completedOn}
                  value={view.completedOnLabel}
                />
                <Fact
                  label={copy.detail.certificateId}
                  value={view.entry.id}
                  mono
                />
                <Fact
                  label={copy.detail.verification}
                  value={view.verification.label}
                />
                <Fact
                  label={copy.detail.issuingAuthority}
                  value={view.authorityCopy.name}
                />
              </dl>
              <p
                className={cn(
                  "mt-4 text-xs text-text-secondary",
                  isBangla && "leading-[1.7]",
                )}
              >
                {view.verification.note}
              </p>
            </div>

            <p
              className={cn(
                "flex gap-2 rounded-btn bg-light-green p-4 text-sm text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>{copy.detail.qrHint}</span>
            </p>

            <div className="flex flex-col gap-2">
              <Button
                asChild
                className="h-11 rounded-btn text-button text-primary-foreground"
              >
                <Link href={courseHref}>
                  {copy.detail.openCourse}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              {relatedServiceHref ? (
                <Button asChild variant="outline" className="h-11 rounded-btn">
                  <Link href={relatedServiceHref}>
                    {copy.detail.openService}
                  </Link>
                </Button>
              ) : null}
              <Button asChild variant="ghost" className="h-11 rounded-btn">
                <Link href={ROUTES.certificates}>
                  <ArrowLeft className="size-4" aria-hidden />
                  {copy.detail.backToList}
                </Link>
              </Button>
            </div>
          </aside>
        </Container>
      </section>
    </div>
  );
}

function Fact({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs text-text-secondary">{label}</dt>
      <dd
        className={cn(
          "mt-1 font-medium text-foreground",
          mono && "break-all text-xs tracking-wide",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

export { CertificateDetail };
