"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Info,
  Lightbulb,
  ListChecks,
  PlayCircle,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { catalogCourseHref } from "@/data/civic-courses";
import { COURSE_INCLUDE_KEYS } from "@/data/course-curriculum";
import {
  getCatalogCourseBySlug,
  type CatalogCourse,
} from "@/data/course-catalog";
import { getServiceBySlug, serviceHref } from "@/data/government-services";
import { getGovernmentServiceCardModel } from "@/lib/get-government-service-card";
import { getCourseCopy } from "@/lib/get-course-copy";
import { getCurriculumModules } from "@/lib/get-curriculum";
import { useTranslation } from "@/hooks/use-translation";
import { CourseTypeLabel } from "@/components/learning/course-type-label";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { CourseCertificatePreview } from "@/components/learning/course-certificate-preview";
import { CourseCheckoutDialog } from "@/components/learning/course-checkout-dialog";
import { CourseCurriculum } from "@/components/learning/course-curriculum";
import { GovernmentServiceCardFromModel } from "@/components/services/government-service-card";
import { ServiceLearningPath } from "@/components/services/service-learning-path";
import { Button } from "@/components/ui/button";

const INCLUDE_ICONS = {
  video: PlayCircle,
  guide: ListChecks,
  examples: Lightbulb,
  assessment: ClipboardCheck,
  certificate: Award,
} as const;

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function CourseDetail({ slug }: { slug: string }) {
  const { t, locale } = useTranslation();
  const [checkoutOpen, setCheckoutOpen] = React.useState(false);
  const isBangla = locale === "bn";
  const course = getCatalogCourseBySlug(slug);

  if (!course) return null;

  const copy = t.courseDetail;
  const item = getCourseCopy(course, t);
  const relatedService = course.relatedServiceSlug
    ? getServiceBySlug(course.relatedServiceSlug)
    : undefined;
  const relatedItem = relatedService
    ? t.services.items[relatedService.key]
    : undefined;
  const priceLabel =
    course.priceBdt == null
      ? t.courses.card.free
      : formatTemplate(t.courses.card.price, { amount: course.priceBdt });
  const certificateLabel = course.hasCertificate
    ? t.learning.certificate.included
    : t.learning.certificate.notIncluded;
  const durationLabel = formatTemplate(t.learning.duration, {
    hours: course.hours,
  });
  const lessonsLabel = formatTemplate(t.learning.lessons, {
    count: course.lessons,
  });
  const modules = getCurriculumModules(course, t);
  const outcomes = getOutcomeList(course, copy);

  const jumpLinks = [
    { href: "#what-you-will-learn", label: copy.jump.learn },
    { href: "#curriculum", label: copy.jump.curriculum },
    { href: "#includes", label: copy.jump.includes },
    ...(relatedService
      ? [{ href: "#related-service", label: copy.jump.service }]
      : []),
    { href: "#certificate", label: copy.jump.certificate },
  ];

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <section className="relative isolate overflow-hidden bg-text">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={course.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
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

        <Container className="relative flex flex-col gap-6 pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14">
          <Breadcrumb
            tone="onPrimary"
            className="text-sm sm:text-base"
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.nav.links.courses, href: ROUTES.courses },
              { label: item.title },
            ]}
          />

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-8">
            <div className="flex max-w-3xl flex-col gap-4 rounded-2xl bg-text/50 p-4 ring-1 ring-white/15 backdrop-blur-md sm:gap-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <CourseTypeLabel
                  type={course.type}
                  label={t.courseTypes[course.type].label}
                  className="bg-white/12 text-white ring-1 ring-white/15"
                />
                <span className="inline-flex h-7 items-center rounded-btn bg-white/8 px-2.5 text-sm font-medium text-white/80 ring-1 ring-white/10">
                  {copy.sampleBadge}
                </span>
              </div>

              {relatedItem && relatedService ? (
                <p className="text-sm font-medium text-white/80">
                  {copy.relatedService}:{" "}
                  <Link
                    href={serviceHref(relatedService.slug)}
                    className="text-white underline-offset-2 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {relatedItem.title}
                  </Link>
                </p>
              ) : (
                <p className="text-sm text-white/70">
                  {t.courseTypes[course.type].purpose}
                </p>
              )}

              <h1
                className={cn(
                  "text-[1.75rem] leading-[1.28] font-semibold text-balance text-white sm:text-[2.125rem] sm:leading-snug lg:text-4xl lg:leading-[1.2]",
                  isBangla && "leading-[1.32] sm:leading-[1.3]",
                )}
              >
                {item.title}
              </h1>
              <p
                className={cn(
                  "text-base text-white/85 sm:text-body",
                  isBangla && "leading-[1.8]",
                )}
              >
                {item.description}
              </p>

              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                <HeroChip
                  icon={<Clock className="size-3.5" aria-hidden />}
                  label={durationLabel}
                />
                <HeroChip
                  icon={<BookOpen className="size-3.5" aria-hidden />}
                  label={lessonsLabel}
                />
                <HeroChip
                  icon={<Award className="size-3.5" aria-hidden />}
                  label={certificateLabel}
                />
              </ul>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  type="button"
                  className="h-12 rounded-btn bg-white px-6 text-button text-primary hover:bg-light-green"
                  onClick={() => setCheckoutOpen(true)}
                >
                  {copy.cta.enroll}
                </Button>
                {relatedService ? (
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-btn border-white/25 bg-white/10 px-6 text-button text-white hover:bg-white/18 hover:text-white"
                  >
                    <Link href={serviceHref(relatedService.slug)}>
                      {copy.cta.viewService}
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>

            <aside className="overflow-hidden rounded-card bg-surface/95 shadow-card ring-1 ring-white/20 backdrop-blur-md lg:sticky lg:top-24">
              <div className="flex flex-col gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-sm text-text-secondary">
                    {copy.meta.price}
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-primary">
                    {priceLabel}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-xs text-text-secondary",
                      isBangla && "leading-[1.7]",
                    )}
                  >
                    {copy.feeNote}
                  </p>
                </div>
                <p className="inline-flex items-start gap-2 text-sm text-text-secondary">
                  <UserRound
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span>
                    <span className="block font-medium text-foreground">
                      {t.courses.instructors[course.instructor]}
                    </span>
                    <span className="text-xs">
                      {t.courses.card.instructorRole}
                    </span>
                  </span>
                </p>
                <Button
                  type="button"
                  className="h-11 rounded-btn text-button text-primary-foreground"
                  onClick={() => setCheckoutOpen(true)}
                >
                  {copy.cta.enroll}
                </Button>
                {relatedService ? (
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-btn"
                  >
                    <Link href={serviceHref(relatedService.slug)}>
                      {copy.cta.viewService}
                    </Link>
                  </Button>
                ) : null}
                <Link
                  href={ROUTES.pricing}
                  className="text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {copy.cta.pricing}
                </Link>
                <p
                  className={cn(
                    "flex gap-2 text-sm text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  <Info
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  {copy.catalogNote}
                </p>
              </div>
            </aside>
          </div>

          <nav aria-label={copy.onThisPage} className="pt-1">
            <p className="text-sm font-semibold text-white">
              {copy.onThisPage}
            </p>
            <ol className="mt-2.5 flex list-none flex-wrap gap-2 p-0">
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
        <span className="sr-only">{item.imageAlt}</span>
      </section>

      {relatedService && relatedItem ? (
        <section
          aria-labelledby="course-learning-heading"
          className="bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
        >
          <Container>
            <h2 id="course-learning-heading" className="sr-only">
              {t.serviceLearning.title}
            </h2>
            <ServiceLearningPath
              variant="full"
              current="course"
              serviceTitle={relatedItem.title}
              serviceHref={serviceHref(relatedService.slug)}
              courseTitle={item.title}
              courseHref={catalogCourseHref(course.slug)}
            />
          </Container>
        </section>
      ) : null}

      <section
        id="what-you-will-learn"
        aria-labelledby="outcomes-heading"
        className="scroll-mt-28 bg-surface py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="outcomes-heading">{copy.outcomes.title}</span>}
            description={copy.outcomes.description}
          />
          <ul className="mt-8 grid list-none gap-3 p-0 sm:mt-10 sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-3 rounded-card bg-light-green p-5"
              >
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  aria-hidden
                />
                <p
                  className={cn(
                    "text-body text-foreground",
                    isBangla && "leading-[1.8]",
                  )}
                >
                  {outcome}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="curriculum"
        aria-labelledby="curriculum-heading"
        className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="curriculum-heading">{copy.curriculum.title}</span>}
            description={copy.curriculum.description}
          />
          <p
            className={cn(
              "mt-4 max-w-2xl text-base text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            {copy.curriculum.sampleNote}
          </p>
          <div className="mt-8 sm:mt-10">
            <CourseCurriculum
              modules={modules}
              moduleLabel={copy.curriculum.moduleLabel}
              lessonsLabel={copy.curriculum.lessons}
              isBangla={isBangla}
            />
          </div>
        </Container>
      </section>

      <section
        id="includes"
        aria-labelledby="includes-heading"
        className="scroll-mt-28 bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            title={<span id="includes-heading">{copy.includes.title}</span>}
            description={copy.includes.description}
          />
          <ul className="mt-8 grid list-none gap-4 p-0 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {COURSE_INCLUDE_KEYS.map((key) => {
              const included = key !== "certificate" || course.hasCertificate;
              const Icon = INCLUDE_ICONS[key];
              const itemCopy = copy.includes.items[key];

              return (
                <li key={key}>
                  <article
                    className={cn(
                      "flex h-full flex-col gap-3 rounded-card bg-surface p-5 shadow-card ring-1 ring-border",
                      !included && "opacity-70",
                    )}
                  >
                    <span className="flex size-11 items-center justify-center rounded-btn bg-light-green text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">
                      {itemCopy.title}
                    </h3>
                    <p
                      className={cn(
                        "text-sm text-text-secondary",
                        isBangla && "leading-[1.75]",
                      )}
                    >
                      {included ? itemCopy.body : copy.includes.notInCourse}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {relatedService && relatedItem ? (
        <section
          id="related-service"
          aria-labelledby="related-service-heading"
          className="scroll-mt-28 bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
        >
          <Container>
            <SectionHeader
              title={
                <span id="related-service-heading">{copy.related.title}</span>
              }
              description={copy.related.description}
            />
            <div className="mt-8 max-w-xl sm:mt-10">
              <GovernmentServiceCardFromModel
                variant="featured"
                model={getGovernmentServiceCardModel(relatedService, t)}
              />
            </div>
          </Container>
        </section>
      ) : null}

      <section
        id="certificate"
        aria-labelledby="certificate-heading"
        className="scroll-mt-28 bg-surface py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          {course.hasCertificate ? (
            <>
              <SectionHeader
                title={
                  <span id="certificate-heading">{copy.certificate.title}</span>
                }
                description={copy.certificate.description}
              />
              <div className="mt-10 sm:mt-12">
                <CourseCertificatePreview
                  courseTitle={item.title}
                  copy={copy.certificate}
                  logoAlt={t.nav.brandName}
                  isBangla={isBangla}
                />
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-xl text-center">
              <h2
                id="certificate-heading"
                className="text-section-heading font-semibold text-balance text-foreground"
              >
                {copy.certificate.noCertificateTitle}
              </h2>
              <p
                className={cn(
                  "mt-3 text-body text-text-secondary",
                  isBangla && "leading-[1.8]",
                )}
              >
                {copy.certificate.noCertificateBody}
              </p>
            </div>
          )}
        </Container>
      </section>

      <CourseCheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        course={course}
        title={item.title}
        imageAlt={item.imageAlt}
        priceLabel={priceLabel}
      />
    </div>
  );
}

function HeroChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="inline-flex max-w-full items-center gap-1.5 rounded-btn bg-white/12 px-2.5 py-1 text-sm font-medium text-white ring-1 ring-white/15">
      {icon}
      <span>{label}</span>
    </li>
  );
}

function getOutcomeList(
  course: CatalogCourse,
  copy: ReturnType<typeof useTranslation>["t"]["courseDetail"],
) {
  if (course.civicKey) {
    return Object.values(copy.outcomes.civic[course.civicKey]);
  }

  return Object.values(copy.outcomes.servicePrep);
}

export { CourseDetail };
