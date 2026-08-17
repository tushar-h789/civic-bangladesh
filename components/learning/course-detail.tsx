"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Banknote,
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
import {
  COURSE_INCLUDE_KEYS,
} from "@/data/course-curriculum";
import {
  getCatalogCourseBySlug,
  type CatalogCourse,
} from "@/data/course-catalog";
import {
  getServiceBySlug,
  serviceHref,
} from "@/data/government-services";
import { getGovernmentServiceCardModel } from "@/lib/get-government-service-card";
import { getCourseCopy } from "@/lib/get-course-copy";
import { getCurriculumModules } from "@/lib/get-curriculum";
import { useTranslation } from "@/hooks/use-translation";
import { CourseTypeLabel } from "@/components/learning/course-type-label";
import { Badge } from "@/components/common/badge";
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
      <section className="relative overflow-hidden bg-light-green pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24">
        <Container className="flex flex-col gap-8">
          <Breadcrumb
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.nav.links.courses, href: ROUTES.courses },
              { label: item.title },
            ]}
          />

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_22rem] xl:grid-cols-[minmax(0,1.5fr)_24rem] xl:gap-12">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <CourseTypeLabel
                  type={course.type}
                  label={t.courseTypes[course.type].label}
                />
                <Badge variant="info" className="h-6 px-2.5">
                  {t.courses.categories.items[course.category]}
                </Badge>
                <Badge variant="outline" className="h-6 px-2.5">
                  {copy.sampleBadge}
                </Badge>
                {relatedItem ? (
                  <Badge variant="outline" className="h-6 px-2.5">
                    <Link
                      href={serviceHref(relatedService!.slug)}
                      className="outline-none hover:underline"
                    >
                      {relatedItem.title}
                    </Link>
                  </Badge>
                ) : null}
              </div>

              {relatedItem ? (
                <p className="text-sm font-medium text-primary">
                  {copy.relatedService}: {relatedItem.title}
                </p>
              ) : (
                <p className="text-sm text-text-secondary">
                  {t.courseTypes[course.type].purpose}
                </p>
              )}

              <h1
                className={cn(
                  "text-hero-mobile font-semibold text-balance text-foreground lg:text-5xl",
                  isBangla && "leading-tight",
                )}
              >
                {item.title}
              </h1>
              <p
                className={cn(
                  "max-w-2xl text-body text-text-secondary",
                  isBangla && "leading-[1.8]",
                )}
              >
                {item.description}
              </p>

              <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4">
                <MetaChip
                  icon={<Banknote className="size-4" aria-hidden />}
                  label={copy.meta.price}
                  value={priceLabel}
                />
                <MetaChip
                  icon={<Clock className="size-4" aria-hidden />}
                  label={copy.meta.duration}
                  value={durationLabel}
                />
                <MetaChip
                  icon={<BookOpen className="size-4" aria-hidden />}
                  label={copy.meta.lessons}
                  value={lessonsLabel}
                />
                <MetaChip
                  icon={<Award className="size-4" aria-hidden />}
                  label={copy.meta.certificate}
                  value={certificateLabel}
                />
              </ul>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  type="button"
                  className="h-12 rounded-btn px-6 text-button text-primary-foreground"
                  onClick={() => setCheckoutOpen(true)}
                >
                  {copy.cta.enroll}
                </Button>
                {relatedService ? (
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-btn bg-surface px-6 text-button"
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
              </div>
            </div>

            <aside className="overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border lg:sticky lg:top-24">
              <div className="relative aspect-16/10">
                <Image
                  src={course.image}
                  alt={item.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 p-6">
                <div>
                  <p className="text-sm text-text-secondary">{copy.meta.price}</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
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
                  <UserRound className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>
                    <span className="block font-medium text-foreground">
                      {t.courses.instructors[course.instructor]}
                    </span>
                    <span className="text-xs">{t.courses.card.instructorRole}</span>
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
                  <Button asChild variant="outline" className="h-11 rounded-btn">
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

          <nav
            aria-label={copy.onThisPage}
            className="border-t border-primary/15 pt-5"
          >
            <p className="text-sm font-semibold text-primary">
              {copy.onThisPage}
            </p>
            <ol className="mt-3 flex list-none flex-wrap items-center gap-x-5 gap-y-2 p-0">
              {jumpLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-text-secondary transition-colors duration-200 ease-standard hover:text-primary"
                  >
                    <span className="text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mx-2 text-border">/</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Container>
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
              "mt-4 max-w-2xl text-sm text-text-secondary",
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

function MetaChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="rounded-btn bg-surface px-3 py-2.5 ring-1 ring-border">
      <p className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
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
