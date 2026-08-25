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
  ExternalLink,
  FileText,
  Info,
  Landmark,
  Lightbulb,
  ListChecks,
  MinusCircle,
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
import {
  getServiceBySlug,
  getServiceOfficialSource,
  serviceHref,
} from "@/data/government-services";
import { getCourseCopy } from "@/lib/get-course-copy";
import { getCurriculumModules } from "@/lib/get-curriculum";
import { useTranslation } from "@/hooks/use-translation";
import { CourseTypeLabel } from "@/components/learning/course-type-label";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { CourseCertificatePreview } from "@/components/learning/course-certificate-preview";
import { CourseCheckoutDialog } from "@/components/learning/course-checkout-dialog";
import { CourseCurriculum } from "@/components/learning/course-curriculum";
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

        <Container className="relative flex flex-col gap-4 pt-6 pb-7 sm:pt-7 sm:pb-8 lg:pt-8 lg:pb-8">
          <Breadcrumb
            tone="onPrimary"
            className="text-sm sm:text-base"
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.nav.links.courses, href: ROUTES.courses },
              { label: item.title },
            ]}
          />

          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-5">
            <div className="flex max-w-3xl flex-col gap-3 rounded-2xl bg-text/50 p-4 ring-1 ring-white/15 backdrop-blur-md sm:gap-3.5 sm:p-5">
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
              <div className="flex flex-col gap-3 p-4 sm:p-5">
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

          <nav aria-label={copy.onThisPage}>
            <p className="text-sm font-semibold text-white">
              {copy.onThisPage}
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
        <span className="sr-only">{item.imageAlt}</span>
      </section>

      <div className="bg-background py-6 md:py-7 lg:py-8">
        <Container className="flex flex-col gap-3 sm:gap-4">
          {relatedService && relatedItem ? (
            <section aria-labelledby="course-learning-heading">
              <h2 id="course-learning-heading" className="sr-only">
                {t.serviceLearning.title}
              </h2>
              <ServiceLearningPath
                variant="full"
                current="course"
                dense
                serviceTitle={relatedItem.title}
                serviceHref={serviceHref(relatedService.slug)}
                courseTitle={item.title}
                courseHref={catalogCourseHref(course.slug)}
              />
            </section>
          ) : null}

          <CourseBodySection
            id="what-you-will-learn"
            headingId="outcomes-heading"
            title={copy.outcomes.title}
            description={copy.outcomes.description}
            isBangla={isBangla}
          >
            <ol className="m-0 grid list-none gap-x-6 gap-y-2.5 p-0 sm:grid-cols-2">
              {outcomes.map((outcome, index) => (
                <li key={outcome} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-btn bg-light-green text-xs font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p
                    className={cn(
                      "text-sm text-foreground sm:text-base",
                      isBangla && "leading-[1.8]",
                    )}
                  >
                    {outcome}
                  </p>
                </li>
              ))}
            </ol>
          </CourseBodySection>

          <CourseBodySection
            id="curriculum"
            headingId="curriculum-heading"
            title={copy.curriculum.title}
            description={copy.curriculum.description}
            meta={formatTemplate(copy.curriculum.summary, {
              modules: modules.length,
              lessons: modules.reduce(
                (count, module) => count + module.lessons.length,
                0,
              ),
            })}
            isBangla={isBangla}
          >
            <CourseCurriculum
              modules={modules}
              moduleLabel={copy.curriculum.moduleLabel}
              lessonsLabel={copy.curriculum.lessons}
              isBangla={isBangla}
            />
            <p
              className={cn(
                "mt-2 text-xs text-text-secondary",
                isBangla && "leading-[1.7]",
              )}
            >
              {copy.curriculum.sampleNote}
            </p>
          </CourseBodySection>

          <CourseBodySection
            id="includes"
            headingId="includes-heading"
            title={copy.includes.title}
            description={copy.includes.description}
            isBangla={isBangla}
          >
            <ul className="m-0 divide-y divide-border overflow-hidden rounded-card bg-background ring-1 ring-border">
              {COURSE_INCLUDE_KEYS.map((key) => {
                const included = key !== "certificate" || course.hasCertificate;
                const Icon = INCLUDE_ICONS[key];
                const itemCopy = copy.includes.items[key];

                return (
                  <li
                    key={key}
                    className="flex items-start gap-3 px-3.5 py-2.5 sm:items-center"
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-btn",
                        included
                          ? "bg-light-green text-primary"
                          : "bg-background text-text-secondary ring-1 ring-border",
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {itemCopy.title}
                      </p>
                      <p
                        className={cn(
                          "mt-0.5 text-sm text-text-secondary",
                          isBangla && "leading-[1.7]",
                        )}
                      >
                        {itemCopy.body}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1 text-xs font-semibold",
                        included ? "text-primary" : "text-text-secondary",
                      )}
                    >
                      {included ? (
                        <CheckCircle2 className="size-3.5" aria-hidden />
                      ) : (
                        <MinusCircle className="size-3.5" aria-hidden />
                      )}
                      {included
                        ? copy.includes.inCourse
                        : copy.includes.notInCourse}
                    </span>
                  </li>
                );
              })}
            </ul>
          </CourseBodySection>

          {relatedService && relatedItem ? (
            <RelatedServicePanel
              headingId="related-service-heading"
              copy={copy.related}
              serviceTitle={relatedItem.title}
              serviceHref={serviceHref(relatedService.slug)}
              officialHref={getServiceOfficialSource(relatedService).href}
              authority={
                getServiceOfficialSource(relatedService)
                  .verifiedAuthorityName ?? t.serviceSource.portalName
              }
              documents={formatTemplate(t.services.card.documents, {
                count: relatedService.documentCount,
              })}
              processingTime={relatedItem.processingTime}
              fee={
                relatedService.feeType === "paid"
                  ? t.services.card.feePaidShort
                  : t.services.card.feeFreeShort
              }
              labels={{
                authority: t.serviceSource.sourceLabel,
                documents: t.services.card.documentsLabel,
                time: t.services.card.processingLabel,
                fee: t.services.card.feeLabel,
              }}
              officialNote={t.serviceDetail.officialPortalNote}
              isBangla={isBangla}
            />
          ) : null}

          <section
            id="certificate"
            aria-labelledby="certificate-heading"
            className="scroll-mt-28"
          >
            <article className="rounded-card bg-surface p-4 shadow-card ring-1 ring-border sm:p-5">
              {course.hasCertificate ? (
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
                  <div>
                    <h2
                      id="certificate-heading"
                      className={cn(
                        "text-xl font-semibold text-foreground sm:text-2xl",
                        isBangla && "leading-tight",
                      )}
                    >
                      {copy.certificate.title}
                    </h2>
                    <p
                      className={cn(
                        "mt-2 max-w-xl text-body text-text-secondary",
                        isBangla && "leading-[1.8]",
                      )}
                    >
                      {copy.certificate.description}
                    </p>
                    <div className="mt-4 space-y-2.5">
                      <p className="text-sm font-semibold text-foreground">
                        {copy.certificate.meaningTitle}
                      </p>
                      <ul className="m-0 flex list-none flex-col gap-2 p-0">
                        <li className="flex items-start gap-2 text-sm text-text-secondary">
                          <CheckCircle2
                            className="mt-0.5 size-4 shrink-0 text-primary"
                            aria-hidden
                          />
                          <span className={cn(isBangla && "leading-[1.75]")}>
                            {copy.certificate.meaningIs}
                          </span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-text-secondary">
                          <MinusCircle
                            className="mt-0.5 size-4 shrink-0 text-text-secondary"
                            aria-hidden
                          />
                          <span className={cn(isBangla && "leading-[1.75]")}>
                            {copy.certificate.meaningIsNot}
                          </span>
                        </li>
                      </ul>
                      <p
                        className={cn(
                          "rounded-btn bg-background px-3 py-2.5 text-sm text-text-secondary ring-1 ring-border",
                          isBangla && "leading-[1.75]",
                        )}
                      >
                        {copy.certificate.notGovernment}
                      </p>
                    </div>
                  </div>
                  <CourseCertificatePreview
                    courseTitle={item.title}
                    copy={copy.certificate}
                    logoAlt={t.nav.brandName}
                    isBangla={isBangla}
                  />
                </div>
              ) : (
                <div>
                  <h2
                    id="certificate-heading"
                    className="text-xl font-semibold text-foreground sm:text-2xl"
                  >
                    {copy.certificate.noCertificateTitle}
                  </h2>
                  <p
                    className={cn(
                      "mt-2 max-w-xl text-body text-text-secondary",
                      isBangla && "leading-[1.8]",
                    )}
                  >
                    {copy.certificate.noCertificateBody}
                  </p>
                </div>
              )}
            </article>
          </section>
        </Container>
      </div>

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

function CourseBodySection({
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
  children: React.ReactNode;
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

function RelatedServicePanel({
  headingId,
  copy,
  serviceTitle,
  serviceHref,
  officialHref,
  authority,
  documents,
  processingTime,
  fee,
  labels,
  officialNote,
  isBangla,
}: {
  headingId: string;
  copy: {
    title: string;
    description: string;
    prepareFor: string;
    viewGuide: string;
    applyOfficial: string;
  };
  serviceTitle: string;
  serviceHref: string;
  officialHref: string;
  authority: string;
  documents: string;
  processingTime: string;
  fee: string;
  labels: {
    authority: string;
    documents: string;
    time: string;
    fee: string;
  };
  officialNote: string;
  isBangla: boolean;
}) {
  const facts = [
    { icon: Landmark, label: labels.authority, value: authority },
    { icon: FileText, label: labels.documents, value: documents },
    { icon: Clock, label: labels.time, value: processingTime },
    { icon: Banknote, label: labels.fee, value: fee },
  ] as const;

  return (
    <section
      id="related-service"
      aria-labelledby={headingId}
      className="scroll-mt-28"
    >
      <article className="rounded-card bg-surface p-4 shadow-card ring-1 ring-border sm:p-5">
        <h2
          id={headingId}
          className={cn(
            "text-xl font-semibold text-foreground sm:text-2xl",
            isBangla && "leading-tight",
          )}
        >
          {copy.title}
        </h2>
        <p
          className={cn(
            "mt-1.5 max-w-2xl text-body text-text-secondary",
            isBangla && "leading-[1.8]",
          )}
        >
          {copy.description}
        </p>

        <div className="mt-4 rounded-card bg-background p-3.5 ring-1 ring-border sm:p-4">
          <p className="text-xs font-semibold text-primary">
            {copy.prepareFor}
          </p>
          <p
            className={cn(
              "mt-1 text-lg font-semibold text-balance text-foreground",
              isBangla && "leading-[1.45]",
            )}
          >
            {serviceTitle}
          </p>
          <ul className="mt-3 m-0 grid list-none gap-2.5 p-0 sm:grid-cols-2">
            {facts.map((fact) => (
              <li key={fact.label} className="flex items-start gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                  <fact.icon className="size-3.5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-text-secondary">{fact.label}</p>
                  <p
                    className={cn(
                      "text-sm font-medium text-foreground",
                      isBangla && "leading-[1.55]",
                    )}
                  >
                    {fact.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button asChild className="h-11 rounded-btn">
              <Link href={serviceHref}>{copy.viewGuide}</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-btn">
              <a
                href={officialHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-describedby="course-related-official-note"
              >
                {copy.applyOfficial}
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </Button>
          </div>
          <p
            id="course-related-official-note"
            className={cn(
              "mt-2 text-xs text-text-secondary",
              isBangla && "leading-[1.7]",
            )}
          >
            {officialNote}
          </p>
        </div>
      </article>
    </section>
  );
}

function getOutcomeList(
  course: CatalogCourse,
  copy: ReturnType<typeof useTranslation>["t"]["courseDetail"],
) {
  if (course.civicKey) {
    return Object.values(copy.outcomes.civic[course.civicKey]) as string[];
  }

  return Object.values(copy.outcomes.servicePrep) as string[];
}

export { CourseDetail };
