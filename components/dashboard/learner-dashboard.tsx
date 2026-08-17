"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";

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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { ProgressRing } from "@/components/common/progress-ring";
import { SectionHeader } from "@/components/common/section-header";
import { DashboardLane } from "@/components/dashboard/dashboard-lane";
import { DashboardSubnav } from "@/components/dashboard/dashboard-subnav";
import { CourseTypeLabel } from "@/components/learning/course-type-label";
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
      <section className="bg-light-green pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24">
        <Container className="flex flex-col gap-8">
          <Breadcrumb
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
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
              {formatTemplate(copy.greeting, { name: learnerName })}
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
              {formatTemplate(copy.stats.continue, {
                count: continueCourses.length,
              })}
            </HeroStat>
            <HeroStat>
              {formatTemplate(copy.stats.services, { count: services.length })}
            </HeroStat>
            <HeroStat>
              {formatTemplate(copy.stats.score, {
                score: civic.score.score,
              })}
            </HeroStat>
          </ul>

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
        id="continue-learning"
        aria-labelledby="continue-learning-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.continue.eyebrow}
            title={
              <span id="continue-learning-heading">{copy.continue.title}</span>
            }
            description={copy.continue.description}
          />
          {continueCourses.length === 0 ? (
            <div className="mt-8 sm:mt-10">
              <EmptyState
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
            </div>
          ) : (
            <ul className="mt-8 grid list-none gap-4 p-0 sm:mt-10 lg:grid-cols-2">
              {continueCourses.map((item) => (
                <li key={item.course.slug}>
                  <Card className="h-full gap-0 rounded-card py-0 ring-border">
                    <CardHeader className="gap-3 pt-5">
                      <DashboardLane>{copy.lanes.service}</DashboardLane>
                      {item.relatedServiceHref && item.relatedServiceTitle ? (
                        <p className="text-xs text-text-secondary">
                          <Link
                            href={item.relatedServiceHref}
                            className="font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                          >
                            {item.relatedServiceTitle}
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
                        {formatTemplate(copy.continue.lessons, {
                          completed: item.completedLessons,
                          total: item.totalLessons,
                        })}
                      </p>
                      <Progress value={item.percent} />
                    </CardContent>
                    <CardFooter className="mt-auto justify-end border-border">
                      <Button asChild>
                        <Link href={item.learnHref}>
                          {copy.continue.cta}
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

      <section className="bg-background pb-section-mobile md:pb-section-tablet lg:pb-section-desktop">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-10">
          <div id="my-services" className="scroll-mt-28" aria-labelledby="my-services-heading">
            <SectionHeader
              eyebrow={copy.services.eyebrow}
              title={<span id="my-services-heading">{copy.services.title}</span>}
              description={copy.services.description}
              actions={
                <Button asChild variant="outline">
                  <Link href={ROUTES.dashboardServices}>
                    {copy.services.viewAll}
                  </Link>
                </Button>
              }
            />
            {services.length === 0 ? (
              <div className="mt-8">
                <EmptyState
                  className="py-10"
                  title={copy.services.emptyTitle}
                  description={copy.services.emptyDescription}
                />
              </div>
            ) : (
              <ul className="mt-8 m-0 flex list-none flex-col gap-3 p-0">
                {services.map((item) => (
                  <li key={item.service.key}>
                    <article className="rounded-card bg-surface p-4 ring-1 ring-border">
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
          </div>

          <div id="course-progress" className="scroll-mt-28" aria-labelledby="course-progress-heading">
            <SectionHeader
              eyebrow={copy.courses.eyebrow}
              title={
                <span id="course-progress-heading">{copy.courses.title}</span>
              }
              description={copy.courses.description}
            />
            {courses.length === 0 ? (
              <div className="mt-8">
                <EmptyState
                  className="py-10"
                  title={copy.courses.emptyTitle}
                  description={copy.courses.emptyDescription}
                  action={
                    <Button asChild variant="outline">
                      <Link href={ROUTES.courses}>{copy.courses.browse}</Link>
                    </Button>
                  }
                />
              </div>
            ) : (
              <ul className="mt-8 m-0 flex list-none flex-col gap-3 p-0">
                {courses.map((item) => (
                  <li key={item.course.slug}>
                    <article className="rounded-card bg-surface p-4 ring-1 ring-border">
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
          </div>
        </Container>
      </section>

      <section
        id="assessments"
        aria-labelledby="assessments-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.assessments.eyebrow}
            title={
              <span id="assessments-heading">{copy.assessments.title}</span>
            }
            description={copy.assessments.description}
          />
          {assessments.length === 0 ? (
            <div className="mt-8 sm:mt-10">
              <EmptyState
                title={copy.assessments.emptyTitle}
                description={copy.assessments.emptyDescription}
              />
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-2">
              <AssessmentGroup
                title={copy.assessments.pending}
                empty={pendingAssessments.length === 0}
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
        </Container>
      </section>

      <section
        id="certificates"
        aria-labelledby="dashboard-certificates-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.certificates.eyebrow}
            title={
              <span id="dashboard-certificates-heading">
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
          {certificateViews.length === 0 ? (
            <div className="mt-8 sm:mt-10">
              <EmptyState
                title={copy.certificates.emptyTitle}
                description={copy.certificates.emptyDescription}
              />
            </div>
          ) : (
            <ul className="mt-8 m-0 flex list-none flex-col gap-3 p-0 sm:mt-10">
              {certificateViews.map((view) => (
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
        </Container>
      </section>

      <section
        id="civic-progress"
        aria-labelledby="civic-progress-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.civic.eyebrow}
            title={
              <span id="civic-progress-heading">{copy.civic.title}</span>
            }
            description={copy.civic.description}
          />
          <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3">
            <article className="flex flex-col items-center gap-4 rounded-card bg-surface p-6 text-center ring-1 ring-border">
              <DashboardLane>{copy.civic.scoreTitle}</DashboardLane>
              <ProgressRing
                value={civic.score.score}
                max={civic.score.max}
                size={140}
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

            <article className="flex flex-col gap-4 rounded-card bg-surface p-6 ring-1 ring-border">
              <ChallengeTypeLabel
                type="civic"
                label={t.challengeTypes.civic.label}
              />
              <DashboardLane>{copy.civic.challengeTitle}</DashboardLane>
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
              <Button asChild variant="outline" className="mt-auto w-fit">
                <Link href={ROUTES.challenges}>
                  {copy.civic.challengeCta}
                </Link>
              </Button>
            </article>

            <article className="flex flex-col gap-4 rounded-card bg-surface p-6 ring-1 ring-border">
              <DashboardLane>{copy.civic.badgesTitle}</DashboardLane>
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

function AssessmentGroup({
  title,
  empty,
  isBangla,
  children,
}: {
  title: string;
  empty: boolean;
  isBangla: boolean;
  children: ReactNode;
}) {
  return (
    <div className="rounded-card bg-surface p-5 ring-1 ring-border">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {empty ? (
        <p
          className={cn(
            "mt-3 text-sm text-text-secondary",
            isBangla && "leading-[1.75]",
          )}
        >
          —
        </p>
      ) : (
        <ul className="mt-4 m-0 flex list-none flex-col gap-3 p-0">{children}</ul>
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
    <li className="border-t border-border pt-3 first:border-t-0 first:pt-0">
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
