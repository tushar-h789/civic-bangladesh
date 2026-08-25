"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  ClipboardCheck,
  Landmark,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { certificateHref } from "@/data/certificates";
import { SAMPLE_LEARNER_DASHBOARD } from "@/data/learner-dashboard";
import { useTranslation } from "@/hooks/use-translation";
import { getCertificateView } from "@/lib/get-certificate-view";
import {
  getContinueLearningCourses,
  getDashboardAssessments,
  getDashboardBadges,
  getDashboardCertificates,
  getDashboardCivicSnapshot,
  getDashboardCourses,
  getDashboardServices,
} from "@/lib/get-dashboard-view";
import { Badge } from "@/components/common/badge";
import { ChallengeTypeLabel } from "@/components/challenge/challenge-type-label";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { ProgressRing } from "@/components/common/progress-ring";
import { DashboardSubnav } from "@/components/dashboard/dashboard-subnav";
import { CourseTypeLabel } from "@/components/learning/course-type-label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const HERO_IMAGE = "/images/home/civic-courses-hero-v3.png";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function LearnerDashboard() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.dashboard;
  const learnerName = t.certificates.learners[SAMPLE_LEARNER_DASHBOARD.learnerKey];
  const continueCourses = getContinueLearningCourses(t);
  const services = getDashboardServices(t);
  const courses = getDashboardCourses(t);
  const assessments = getDashboardAssessments(t);
  const pendingAssessments = assessments.filter((item) => item.status === "pending");
  const passedAssessments = assessments.filter((item) => item.status === "passed");
  const certificateViews = getDashboardCertificates()
    .map((entry) => getCertificateView(entry, t, locale))
    .filter((view) => view != null);
  const civic = getDashboardCivicSnapshot();
  const badges = getDashboardBadges();
  const jump = [
    { href: "#continue-learning", label: copy.jump.continue },
    { href: "#my-services", label: copy.jump.services },
    { href: "#course-progress", label: copy.jump.courses },
    { href: "#assessments", label: copy.jump.assessments },
    { href: "#certificates", label: copy.jump.certificates },
    { href: "#civic-progress", label: copy.jump.civic },
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
              { label: copy.eyebrow },
            ]}
          />

          <DashboardSubnav tone="onPrimary" />

          <div className="flex max-w-2xl flex-col gap-3 rounded-2xl bg-text/50 p-4 ring-1 ring-white/15 backdrop-blur-md sm:gap-3.5 sm:p-5">
            <p className="text-sm font-medium text-white/80">
              {formatTemplate(copy.greeting, { name: learnerName })}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <h1
                className={cn(
                  "text-[1.75rem] leading-[1.28] font-semibold text-balance text-white sm:text-[2.125rem] sm:leading-snug lg:text-4xl lg:leading-[1.2]",
                  isBangla && "leading-[1.32] sm:leading-[1.3]",
                )}
              >
                {copy.title}
              </h1>
              <Badge
                variant="outline"
                className="h-6 border-white/25 bg-white/10 px-2.5 text-white"
              >
                {t.certificates.document.sampleBadge}
              </Badge>
            </div>
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
                icon={<BookOpen className="size-3.5" aria-hidden />}
                label={formatTemplate(copy.stats.continue, {
                  count: continueCourses.length,
                })}
              />
              <HeroChip
                icon={<Landmark className="size-3.5" aria-hidden />}
                label={formatTemplate(copy.stats.services, {
                  count: services.length,
                })}
              />
              <HeroChip
                icon={<Award className="size-3.5" aria-hidden />}
                label={formatTemplate(copy.stats.score, {
                  score: civic.score.score,
                })}
              />
            </ul>
          </div>

          <nav aria-label={copy.jump.label}>
            <p className="text-sm font-semibold text-white">{copy.jump.label}</p>
            <ol className="mt-2 flex list-none flex-wrap gap-1.5 p-0">
              {jump.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex h-8 items-center rounded-btn bg-white/10 px-3 text-sm font-medium text-white/90 ring-1 ring-white/15 transition-colors duration-200 ease-standard hover:bg-white/18 hover:text-white"
                  >
                    {item.label}
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
          <DashboardBodySection
            id="continue-learning"
            headingId="continue-learning-heading"
            title={copy.continue.title}
            description={copy.continue.description}
            isBangla={isBangla}
          >
            {continueCourses.length === 0 ? (
              <EmptyState
                className="py-8"
                title={copy.continue.emptyTitle}
                description={copy.continue.emptyDescription}
                action={
                  <Button asChild variant="outline">
                    <Link href={ROUTES.governmentServices}>
                      {copy.continue.browse}
                    </Link>
                  </Button>
                }
              />
            ) : (
              <ul className="m-0 grid list-none gap-3 p-0 lg:grid-cols-2">
                {continueCourses.map((item) => (
                  <li key={item.course.slug}>
                    <article className="flex h-full flex-col rounded-card bg-background p-4 ring-1 ring-border">
                      <p className="text-xs font-medium text-text-secondary">
                        {copy.lanes.service}
                      </p>
                      {item.relatedServiceHref && item.relatedServiceTitle ? (
                        <p className="mt-1 text-xs text-text-secondary">
                          <Link
                            href={item.relatedServiceHref}
                            className="font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                          >
                            {item.relatedServiceTitle}
                          </Link>
                        </p>
                      ) : null}
                      <h3
                        className={cn(
                          "mt-2 text-base font-semibold text-balance text-foreground sm:text-lg",
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
                      <p className="mt-3 text-sm text-text-secondary">
                        {formatTemplate(copy.continue.lessons, {
                          completed: item.completedLessons,
                          total: item.totalLessons,
                        })}
                      </p>
                      <Progress className="mt-2" value={item.percent} />
                      <div className="mt-4">
                        <Link
                          href={item.learnHref}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          {copy.continue.cta}
                          <ArrowRight className="size-3.5" aria-hidden />
                        </Link>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </DashboardBodySection>

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
            <DashboardBodySection
              id="my-services"
              headingId="my-services-heading"
              title={copy.services.title}
              description={copy.services.description}
              isBangla={isBangla}
              action={
                <Link
                  href={ROUTES.dashboardServices}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {copy.services.viewAll}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              }
            >
              {services.length === 0 ? (
                <EmptyState
                  className="py-8"
                  title={copy.services.emptyTitle}
                  description={copy.services.emptyDescription}
                />
              ) : (
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {services.map((item) => (
                    <li key={item.service.key}>
                      <article className="rounded-card bg-background p-3.5 ring-1 ring-border">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Badge
                              variant={
                                item.status === "learning" ? "info" : "success"
                              }
                              className="h-6 px-2.5"
                            >
                              {copy.services[item.status]}
                            </Badge>
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
                            {item.courseTitle && item.courseHref ? (
                              <p className="mt-1 text-sm text-text-secondary">
                                {copy.services.course}
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
                          <Link
                            href={item.href}
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                          >
                            {copy.services.view}
                            <ArrowRight className="size-3.5" aria-hidden />
                          </Link>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              )}
            </DashboardBodySection>

            <DashboardBodySection
              id="course-progress"
              headingId="course-progress-heading"
              title={copy.courses.title}
              description={copy.courses.description}
              isBangla={isBangla}
            >
              {courses.length === 0 ? (
                <EmptyState
                  className="py-8"
                  title={copy.courses.emptyTitle}
                  description={copy.courses.emptyDescription}
                  action={
                    <Button asChild variant="outline">
                      <Link href={ROUTES.courses}>{copy.courses.browse}</Link>
                    </Button>
                  }
                />
              ) : (
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {courses.map((item) => (
                    <li key={item.course.slug}>
                      <article className="rounded-card bg-background p-3.5 ring-1 ring-border">
                        <div className="flex flex-wrap items-center gap-2">
                          <CourseTypeLabel
                            type={item.course.type}
                            label={t.courseTypes[item.course.type].label}
                          />
                          <Badge
                            variant={
                              item.status === "current" ? "info" : "success"
                            }
                            className="h-6 px-2.5"
                          >
                            {copy.courses[item.status]}
                          </Badge>
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
                        <p className="mt-2 text-sm text-text-secondary">
                          {formatTemplate(copy.courses.lessons, {
                            completed: item.completedLessons,
                            total: item.totalLessons,
                          })}
                        </p>
                        <Progress className="mt-2" value={item.percent} />
                        <div className="mt-3">
                          <Link
                            href={item.learnHref}
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                          >
                            {item.status === "current"
                              ? copy.courses.ctaCurrent
                              : copy.courses.ctaCompleted}
                            <ArrowRight className="size-3.5" aria-hidden />
                          </Link>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              )}
            </DashboardBodySection>
          </div>

          <DashboardBodySection
            id="assessments"
            headingId="assessments-heading"
            title={copy.assessments.title}
            description={copy.assessments.description}
            isBangla={isBangla}
          >
            {assessments.length === 0 ? (
              <EmptyState
                className="py-8"
                title={copy.assessments.emptyTitle}
                description={copy.assessments.emptyDescription}
              />
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                <AssessmentGroup
                  title={copy.assessments.pending}
                  empty={pendingAssessments.length === 0}
                  emptyLabel={copy.assessments.nonePending}
                  isBangla={isBangla}
                >
                  {pendingAssessments.map((item) => (
                    <AssessmentRow
                      key={item.entry.courseSlug}
                      title={item.title}
                      lane={
                        item.isServicePrep
                          ? t.courseTypes.servicePrep.label
                          : t.courseTypes.civic.label
                      }
                      meta={copy.assessments.pending}
                      href={item.href}
                      cta={copy.assessments.ctaPending}
                      isBangla={isBangla}
                    />
                  ))}
                </AssessmentGroup>
                <AssessmentGroup
                  title={copy.assessments.passed}
                  empty={passedAssessments.length === 0}
                  emptyLabel={copy.assessments.nonePassed}
                  isBangla={isBangla}
                >
                  {passedAssessments.map((item) => (
                    <AssessmentRow
                      key={item.entry.courseSlug}
                      title={item.title}
                      lane={
                        item.isServicePrep
                          ? t.courseTypes.servicePrep.label
                          : t.courseTypes.civic.label
                      }
                      meta={
                        item.correct == null
                          ? copy.assessments.passed
                          : `${copy.assessments.passed} · ${formatTemplate(copy.assessments.score, { correct: item.correct, total: item.total })}`
                      }
                      href={item.href}
                      cta={copy.assessments.ctaPassed}
                      isBangla={isBangla}
                    />
                  ))}
                </AssessmentGroup>
              </div>
            )}
          </DashboardBodySection>

          <DashboardBodySection
            id="certificates"
            headingId="dashboard-certificates-heading"
            title={copy.certificates.title}
            description={copy.certificates.description}
            isBangla={isBangla}
            action={
              <Link
                href={ROUTES.certificates}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {copy.certificates.viewAll}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            }
          >
            {certificateViews.length === 0 ? (
              <EmptyState
                className="py-8"
                title={copy.certificates.emptyTitle}
                description={copy.certificates.emptyDescription}
              />
            ) : (
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {certificateViews.map((view) => (
                  <li key={view.entry.id}>
                    <article className="flex flex-col gap-3 rounded-card bg-background p-3.5 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between">
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
                              t.certificates.card.civicCourse}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={certificateHref(view.entry.id)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        {t.certificates.list.cta}
                        <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </DashboardBodySection>

          <DashboardBodySection
            id="civic-progress"
            headingId="civic-progress-heading"
            title={copy.civic.title}
            description={copy.civic.description}
            isBangla={isBangla}
          >
            <div className="grid gap-3 lg:grid-cols-3">
              <article className="flex flex-col items-center gap-3 rounded-card bg-background p-4 text-center ring-1 ring-border">
                <p className="text-sm font-semibold text-foreground">
                  {copy.civic.scoreTitle}
                </p>
                <ProgressRing
                  value={civic.score.score}
                  max={civic.score.max}
                  size={128}
                  strokeWidth={8}
                  aria-label={formatTemplate(t.score.scoreOverMax, {
                    score: civic.score.score,
                    max: civic.score.max,
                  })}
                />
                <p className="text-sm font-medium text-foreground">
                  {t.score.levels[civic.score.levelKey].title}
                </p>
                <p className="text-xs text-text-secondary">{t.score.sampleNote}</p>
              </article>

              <article className="flex flex-col gap-3 rounded-card bg-background p-4 ring-1 ring-border">
                <ChallengeTypeLabel
                  type="civic"
                  label={t.challengeTypes.civic.label}
                />
                <p className="text-sm font-semibold text-foreground">
                  {copy.civic.challengeTitle}
                </p>
                <p
                  className={cn(
                    "text-lg font-semibold text-foreground",
                    isBangla && "leading-[1.45]",
                  )}
                >
                  {formatTemplate(copy.civic.challengeProgress, {
                    current: civic.challenge.currentDay,
                    total: civic.challenge.totalDays,
                  })}
                </p>
                <p className="text-sm text-text-secondary">
                  {formatTemplate(copy.civic.challengeKept, {
                    count: civic.keptDays,
                  })}
                </p>
                <Progress
                  value={Math.round(
                    (civic.challenge.currentDay / civic.challenge.totalDays) * 100,
                  )}
                />
                <p className="text-xs text-text-secondary">
                  {t.challenge.progress.sampleNote}
                </p>
                <Link
                  href={ROUTES.challenges}
                  className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {copy.civic.challengeCta}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </article>

              <article className="flex flex-col gap-3 rounded-card bg-background p-4 ring-1 ring-border">
                <p className="text-sm font-semibold text-foreground">
                  {copy.civic.badgesTitle}
                </p>
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {badges.map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Award className="size-3.5" aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {copy.civic.badges[key].title}
                        </p>
                        <p
                          className={cn(
                            "text-xs text-text-secondary",
                            isBangla && "leading-[1.7]",
                          )}
                        >
                          {copy.civic.badges[key].body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto text-xs text-text-secondary">
                  {copy.civic.badgesNote}
                </p>
              </article>
            </div>
          </DashboardBodySection>
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

function DashboardBodySection({
  id,
  headingId,
  title,
  description,
  isBangla,
  action,
  children,
}: {
  id: string;
  headingId: string;
  title: string;
  description: string;
  isBangla: boolean;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-28">
      <article className="rounded-card bg-surface p-4 shadow-card ring-1 ring-border sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 max-w-2xl">
            <h2
              id={headingId}
              className={cn(
                "text-xl font-semibold text-foreground sm:text-2xl",
                isBangla && "leading-tight",
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                "mt-1.5 text-body text-text-secondary",
                isBangla && "leading-[1.8]",
              )}
            >
              {description}
            </p>
          </div>
          {action}
        </div>
        <div className="mt-4">{children}</div>
      </article>
    </section>
  );
}

function AssessmentGroup({
  title,
  empty,
  emptyLabel,
  isBangla,
  children,
}: {
  title: string;
  empty: boolean;
  emptyLabel: string;
  isBangla: boolean;
  children: ReactNode;
}) {
  return (
    <div className="rounded-card bg-background p-4 ring-1 ring-border">
      <div className="flex items-center gap-2">
        <ClipboardCheck className="size-4 text-primary" aria-hidden />
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>
      {empty ? (
        <p
          className={cn(
            "mt-3 text-sm text-text-secondary",
            isBangla && "leading-[1.75]",
          )}
        >
          {emptyLabel}
        </p>
      ) : (
        <ul className="mt-4 m-0 flex list-none flex-col gap-0 p-0">{children}</ul>
      )}
    </div>
  );
}

function AssessmentRow({
  title,
  lane,
  meta,
  href,
  cta,
  isBangla,
}: {
  title: string;
  lane: string;
  meta: string;
  href: string;
  cta: string;
  isBangla: boolean;
}) {
  return (
    <li className="border-t border-border py-3 first:border-t-0 first:pt-0 last:pb-0">
      <p className="text-xs text-text-secondary">{lane}</p>
      <p
        className={cn(
          "mt-1 text-sm font-semibold text-foreground",
          isBangla && "leading-[1.45]",
        )}
      >
        {title}
      </p>
      <p className="mt-1 text-xs text-text-secondary">{meta}</p>
      <Link
        href={href}
        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {cta}
        <ArrowRight className="size-3.5" aria-hidden />
      </Link>
    </li>
  );
}

export { LearnerDashboard };
