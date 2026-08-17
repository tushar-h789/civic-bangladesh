"use client";

import Link from "next/link";
import { ArrowRight, Award, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { certificateHref } from "@/data/certificates";
import type { ServiceLearningStatus } from "@/data/dashboard-services";
import { OFFICIAL_GOVERNMENT_PORTAL_HREF } from "@/data/government-services";
import { SAMPLE_LEARNER_DASHBOARD } from "@/data/learner-dashboard";
import { useTranslation } from "@/hooks/use-translation";
import {
  countLearningByStatus,
  getEnrolledServiceCourses,
  getPreparationServices,
  getRecentlyViewedServices,
  getRelatedServiceCertificates,
  getSavedServices,
} from "@/lib/get-dashboard-services-view";
import { Badge } from "@/components/common/badge";
import { Breadcrumb } from "@/components/common/breadcrumb";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { SectionHeader } from "@/components/common/section-header";
import { DashboardLane } from "@/components/dashboard/dashboard-lane";
import { DashboardSubnav } from "@/components/dashboard/dashboard-subnav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function learningStatusVariant(status: ServiceLearningStatus) {
  switch (status) {
    case "saved":
      return "outline" as const;
    case "learning":
      return "info" as const;
    case "readyToApply":
      return "warning" as const;
    case "completedCourse":
      return "success" as const;
  }
}

function ServicesDashboard() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.dashboardServices;
  const learnerName = t.certificates.learners[SAMPLE_LEARNER_DASHBOARD.learnerKey];
  const saved = getSavedServices(t);
  const recent = getRecentlyViewedServices(t, locale);
  const enrolled = getEnrolledServiceCourses(t);
  const preparation = getPreparationServices(t);
  const certificates = getRelatedServiceCertificates(t, locale);
  const counts = countLearningByStatus(t);
  const jump = [
    { href: "#saved-services", label: copy.jump.saved },
    { href: "#recently-viewed", label: copy.jump.recent },
    { href: "#enrolled-courses", label: copy.jump.enrolled },
    { href: "#preparation-status", label: copy.jump.preparation },
    { href: "#related-certificates", label: copy.jump.certificates },
  ];

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <section className="bg-light-green pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24">
        <Container className="flex flex-col gap-8">
          <Breadcrumb
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.dashboard.eyebrow, href: ROUTES.profile },
              { label: copy.eyebrow },
            ]}
          />
          <DashboardSubnav />
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-primary">{copy.eyebrow}</p>
              <Badge variant="outline" className="h-6 px-2.5">
                {t.certificates.document.sampleBadge}
              </Badge>
            </div>
            <p
              className={cn(
                "mt-4 text-sm text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {formatTemplate(t.dashboard.greeting, { name: learnerName })}
            </p>
            <h1
              className={cn(
                "mt-2 text-hero-mobile font-semibold text-balance text-foreground lg:text-5xl",
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
                "mt-3 text-sm text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.sampleNote}
            </p>
          </div>

          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            <HeroStat>
              {formatTemplate(copy.stats.saved, { count: counts.saved })}
            </HeroStat>
            <HeroStat>
              {formatTemplate(copy.stats.learning, { count: counts.learning })}
            </HeroStat>
            <HeroStat>
              {formatTemplate(copy.stats.ready, { count: counts.readyToApply })}
            </HeroStat>
          </ul>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-card bg-surface p-5 ring-1 ring-border">
              <DashboardLane>{copy.distinction.learningTitle}</DashboardLane>
              <p
                className={cn(
                  "mt-3 text-sm text-text-secondary",
                  isBangla && "leading-[1.75]",
                )}
              >
                {copy.distinction.learningBody}
              </p>
            </article>
            <article className="rounded-card bg-surface p-5 ring-1 ring-border">
              <div className="flex flex-wrap items-center gap-2">
                <DashboardLane>{copy.distinction.officialTitle}</DashboardLane>
                <Badge variant="outline" className="h-6 px-2.5">
                  {copy.distinction.officialLabel}
                </Badge>
              </div>
              <p
                className={cn(
                  "mt-3 text-sm text-text-secondary",
                  isBangla && "leading-[1.75]",
                )}
              >
                {copy.distinction.officialBody}
              </p>
            </article>
          </div>

          <nav aria-label={copy.jump.label}>
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-sm">
              {jump.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <section
        id="saved-services"
        aria-labelledby="saved-services-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={t.dashboard.lanes.service}
            title={<span id="saved-services-heading">{copy.saved.title}</span>}
            description={copy.saved.description}
            actions={
              <Button asChild variant="outline">
                <Link href={ROUTES.governmentServices}>{copy.cta.browse}</Link>
              </Button>
            }
          />
          {saved.length === 0 ? (
            <div className="mt-8 sm:mt-10">
              <EmptyState
                title={copy.saved.emptyTitle}
                description={copy.saved.emptyDescription}
                action={
                  <Button asChild variant="outline">
                    <Link href={ROUTES.governmentServices}>
                      {copy.cta.browse}
                    </Link>
                  </Button>
                }
              />
            </div>
          ) : (
            <ul className="mt-8 grid list-none gap-4 p-0 sm:mt-10 lg:grid-cols-2">
              {saved.map((item) => (
                <li key={item.service.key}>
                  <ServiceTrackCard
                    title={item.title}
                    href={item.href}
                    categoryTitle={item.categoryTitle}
                    courseTitle={item.courseTitle}
                    courseHref={item.courseHref}
                    learningStatus={item.learningStatus}
                    learningLabel={copy.status[item.learningStatus]}
                    officialLabel={copy.status.notConnected}
                    officialHint={copy.distinction.officialHint}
                    statusCopy={copy.status}
                    viewLabel={copy.saved.view}
                    isBangla={isBangla}
                  />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section
        id="recently-viewed"
        aria-labelledby="recently-viewed-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={t.dashboard.lanes.service}
            title={
              <span id="recently-viewed-heading">{copy.recent.title}</span>
            }
            description={copy.recent.description}
          />
          {recent.length === 0 ? (
            <div className="mt-8 sm:mt-10">
              <EmptyState
                title={copy.recent.emptyTitle}
                description={copy.recent.emptyDescription}
              />
            </div>
          ) : (
            <ul className="mt-8 m-0 flex list-none flex-col gap-3 p-0 sm:mt-10">
              {recent.map((item) => (
                <li key={`${item.service.key}-${item.viewedOn}`}>
                  <article className="flex flex-col gap-3 rounded-card bg-surface p-4 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        {item.learningStatus ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
                            {copy.status.label}
                            <Badge
                              variant={learningStatusVariant(item.learningStatus)}
                              className="h-6 px-2.5"
                            >
                              {copy.status[item.learningStatus]}
                            </Badge>
                          </span>
                        ) : null}
                        <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
                          {copy.status.officialLabel}
                          <Badge variant="outline" className="h-6 px-2.5">
                            {copy.status.notConnected}
                          </Badge>
                        </span>
                      </div>
                      <h3
                        className={cn(
                          "mt-2 text-base font-semibold text-balance text-foreground",
                          isBangla && "leading-[1.45]",
                        )}
                      >
                        <Link
                          href={item.href}
                          className="outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        {formatTemplate(copy.recent.viewedOn, {
                          date: item.viewedOnLabel,
                        })}
                      </p>
                    </div>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {copy.saved.view}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section
        id="enrolled-courses"
        aria-labelledby="enrolled-courses-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={t.dashboard.lanes.service}
            title={
              <span id="enrolled-courses-heading">{copy.enrolled.title}</span>
            }
            description={copy.enrolled.description}
          />
          {enrolled.length === 0 ? (
            <div className="mt-8 sm:mt-10">
              <EmptyState
                title={copy.enrolled.emptyTitle}
                description={copy.enrolled.emptyDescription}
                action={
                  <Button asChild variant="outline">
                    <Link href={ROUTES.governmentServices}>
                      {copy.cta.browse}
                    </Link>
                  </Button>
                }
              />
            </div>
          ) : (
            <ul className="mt-8 grid list-none gap-4 p-0 sm:mt-10 lg:grid-cols-2">
              {enrolled.map((item) => (
                <li key={item.course.slug}>
                  <Card className="h-full gap-0 rounded-card py-0 ring-border">
                    <CardHeader className="gap-3 pt-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <DashboardLane>{t.dashboard.lanes.service}</DashboardLane>
                        {item.learningStatus ? (
                          <Badge
                            variant={learningStatusVariant(item.learningStatus)}
                            className="h-6 px-2.5"
                          >
                            {copy.status[item.learningStatus]}
                          </Badge>
                        ) : null}
                      </div>
                      {item.serviceHref && item.serviceTitle ? (
                        <p className="text-xs text-text-secondary">
                          <Link
                            href={item.serviceHref}
                            className="font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                          >
                            {item.serviceTitle}
                          </Link>
                          <span className="mx-1.5" aria-hidden>
                            →
                          </span>
                          <span>{t.serviceLearning.pair.course}</span>
                        </p>
                      ) : null}
                      <CardTitle className="text-lg font-semibold text-balance">
                        <Link
                          href={item.href}
                          className="outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          {item.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2 pt-4">
                      <p className="text-sm text-text-secondary">
                        {formatTemplate(copy.enrolled.lessons, {
                          completed: item.completedLessons,
                          total: item.totalLessons,
                        })}
                      </p>
                      <Progress value={item.percent} />
                    </CardContent>
                    <CardFooter className="mt-auto justify-end border-border">
                      <Button asChild>
                        <Link href={item.learnHref}>
                          {item.status === "current"
                            ? copy.enrolled.continue
                            : copy.enrolled.review}
                          <ArrowRight className="size-4" aria-hidden />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section
        id="preparation-status"
        aria-labelledby="preparation-status-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={t.dashboard.lanes.service}
            title={
              <span id="preparation-status-heading">
                {copy.preparation.title}
              </span>
            }
            description={copy.preparation.description}
          />
          {preparation.length === 0 ? (
            <div className="mt-8 sm:mt-10">
              <EmptyState
                title={copy.preparation.emptyTitle}
                description={copy.preparation.emptyDescription}
                action={
                  <Button asChild variant="outline">
                    <Link href={ROUTES.governmentServices}>
                      {copy.cta.browse}
                    </Link>
                  </Button>
                }
              />
            </div>
          ) : (
            <ul className="mt-8 m-0 flex list-none flex-col gap-3 p-0 sm:mt-10">
              {preparation.map((item) => (
                <li key={item.service.key}>
                  <article className="rounded-card bg-surface p-4 ring-1 ring-border sm:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <p className="text-xs text-text-secondary">
                          {item.categoryTitle}
                        </p>
                        <h3
                          className={cn(
                            "mt-1 text-base font-semibold text-balance text-foreground",
                            isBangla && "leading-[1.45]",
                          )}
                        >
                          <Link
                            href={item.href}
                            className="outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        {item.courseTitle && item.courseHref ? (
                          <p className="mt-1 text-sm text-text-secondary">
                            {copy.preparation.course}
                            <span aria-hidden>: </span>
                            <Link
                              href={item.courseHref}
                              className="font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                            >
                              {item.courseTitle}
                            </Link>
                          </p>
                        ) : null}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 lg:max-w-xl lg:flex-1">
                        <StatusField
                          label={copy.status.label}
                          value={copy.status[item.learningStatus]}
                          variant={learningStatusVariant(item.learningStatus)}
                          isBangla={isBangla}
                        />
                        <StatusField
                          label={copy.status.officialLabel}
                          value={copy.status.notConnected}
                          hint={copy.distinction.officialHint}
                          variant="outline"
                          isBangla={isBangla}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.learnHref ? (
                        <Button asChild size="sm">
                          <Link href={item.learnHref}>
                            {copy.preparation.learn}
                            <ArrowRight className="size-3.5" aria-hidden />
                          </Link>
                        </Button>
                      ) : null}
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={OFFICIAL_GOVERNMENT_PORTAL_HREF}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {copy.preparation.apply}
                          <ExternalLink className="size-3.5" aria-hidden />
                        </a>
                      </Button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section
        id="related-certificates"
        aria-labelledby="related-certificates-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={t.certificates.document.credential}
            title={
              <span id="related-certificates-heading">
                {copy.certificates.title}
              </span>
            }
            description={copy.certificates.description}
            actions={
              <Button asChild variant="outline">
                <Link href={ROUTES.certificates}>
                  {copy.certificates.viewAll}
                </Link>
              </Button>
            }
          />
          {certificates.length === 0 ? (
            <div className="mt-8 sm:mt-10">
              <EmptyState
                title={copy.certificates.emptyTitle}
                description={copy.certificates.emptyDescription}
              />
            </div>
          ) : (
            <ul className="mt-8 m-0 flex list-none flex-col gap-3 p-0 sm:mt-10">
              {certificates.map((view) => (
                <li key={view.entry.id}>
                  <article className="flex flex-col gap-3 rounded-card bg-surface p-4 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Award className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p
                          className={cn(
                            "text-base font-semibold text-balance text-foreground",
                            isBangla && "leading-[1.45]",
                          )}
                        >
                          {view.courseTitle}
                        </p>
                        <p className="mt-1 text-sm text-text-secondary">
                          {view.relatedServiceTitle ??
                            copy.certificates.civicCourse}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={certificateHref(view.entry.id)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {copy.certificates.view}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </div>
  );
}

function HeroStat({ children }: { children: string }) {
  return (
    <li className="inline-flex items-center rounded-btn bg-surface px-3 py-1.5 text-sm font-medium text-foreground ring-1 ring-border">
      {children}
    </li>
  );
}

function StatusField({
  label,
  value,
  hint,
  variant,
  isBangla,
}: {
  label: string;
  value: string;
  hint?: string;
  variant: "outline" | "info" | "warning" | "success";
  isBangla: boolean;
}) {
  return (
    <div className="rounded-btn bg-background px-3 py-3 ring-1 ring-border">
      <p className="text-xs font-medium text-text-secondary">{label}</p>
      <div className="mt-2">
        <Badge variant={variant} className="h-6 px-2.5">
          {value}
        </Badge>
      </div>
      {hint ? (
        <p
          className={cn(
            "mt-2 text-xs text-text-secondary",
            isBangla && "leading-[1.7]",
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function ServiceTrackCard({
  title,
  href,
  categoryTitle,
  courseTitle,
  courseHref,
  learningStatus,
  learningLabel,
  officialLabel,
  officialHint,
  statusCopy,
  viewLabel,
  isBangla,
}: {
  title: string;
  href: string;
  categoryTitle: string;
  courseTitle: string | null;
  courseHref: string | null;
  learningStatus: ServiceLearningStatus;
  learningLabel: string;
  officialLabel: string;
  officialHint: string;
  statusCopy: { label: string; officialLabel: string };
  viewLabel: string;
  isBangla: boolean;
}) {
  return (
    <article className="flex h-full flex-col rounded-card bg-surface p-4 ring-1 ring-border">
      <p className="text-xs text-text-secondary">{categoryTitle}</p>
      <h3
        className={cn(
          "mt-1 text-base font-semibold text-balance text-foreground",
          isBangla && "leading-[1.45]",
        )}
      >
        <Link
          href={href}
          className="outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {title}
        </Link>
      </h3>
      {courseTitle && courseHref ? (
        <p className="mt-1 text-sm text-text-secondary">
          <Link
            href={courseHref}
            className="font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {courseTitle}
          </Link>
        </p>
      ) : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <StatusField
          label={statusCopy.label}
          value={learningLabel}
          variant={learningStatusVariant(learningStatus)}
          isBangla={isBangla}
        />
        <StatusField
          label={statusCopy.officialLabel}
          value={officialLabel}
          hint={officialHint}
          variant="outline"
          isBangla={isBangla}
        />
      </div>
      <Link
        href={href}
        className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {viewLabel}
        <ArrowRight className="size-3.5" aria-hidden />
      </Link>
    </article>
  );
}

export { ServicesDashboard };
