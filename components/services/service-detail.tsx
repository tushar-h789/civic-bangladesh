"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Banknote,
  BookOpen,
  Building2,
  Clock,
  ExternalLink,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { catalogCourseHref } from "@/data/civic-courses";
import {
  OFFICIAL_GOVERNMENT_PORTAL_HREF,
  SERVICE_INSTRUCTION_KEYS,
  getRelatedServices,
  getServiceBySlug,
  getServiceOfficialSource,
  serviceHref,
} from "@/data/government-services";
import { serviceCategoryHrefFromKey } from "@/data/service-categories";
import { useTranslation } from "@/hooks/use-translation";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { CourseCard } from "@/components/learning/course-card";
import { ServiceDocumentChecklist } from "@/components/services/service-document-checklist";
import { ServiceInformationSource } from "@/components/services/service-information-source";
import { ServiceLearningPath } from "@/components/services/service-learning-path";
import { ServiceProcessTimeline } from "@/components/services/service-process-timeline";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function ServiceDetail({ slug }: { slug: string }) {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const service = getServiceBySlug(slug);

  if (!service) return null;

  const listing = t.services;
  const copy = t.serviceDetail;
  const guide = t.serviceGuides[service.key];
  const item = listing.items[service.key];
  const categoryShort = listing.categoryItems[service.category].shortTitle;
  const heroImage =
    service.course?.image ?? "/images/home/courses-hero-service-v2.png";
  const officialSource = getServiceOfficialSource(service);
  const guideCourse = "course" in guide ? guide.course : null;
  const documentItems = guide.documents as Record<
    string,
    { name: string; format: string; notes: string }
  >;
  const learnHref = service.course ? "#service-learning" : "#about";
  const relatedServices = getRelatedServices(service.slug);
  const jumpLinks = [
    { href: "#information-source", label: copy.jump.source },
    { href: "#quick-info", label: copy.jump.quick },
    { href: "#about", label: copy.jump.about },
    ...(service.course
      ? [{ href: "#service-learning", label: copy.jump.learning }]
      : []),
    { href: "#documents", label: copy.jump.documents },
    { href: "#process", label: copy.jump.process },
    { href: "#instructions", label: copy.instructions.title },
    { href: "#mistakes", label: copy.mistakes.title },
    ...(service.course
      ? [{ href: "#related-course", label: copy.jump.course }]
      : []),
    ...(relatedServices.length > 0
      ? [{ href: "#related-services", label: copy.jump.related }]
      : []),
    { href: "#official-apply", label: copy.jump.apply },
  ];

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <section className="relative isolate overflow-hidden bg-text">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={heroImage}
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
              {
                label: t.nav.links.governmentServices,
                href: ROUTES.governmentServices,
              },
              { label: item.title },
            ]}
          />

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-8">
            <div className="flex max-w-3xl flex-col gap-4 rounded-2xl bg-text/50 p-4 ring-1 ring-white/15 backdrop-blur-md sm:gap-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={serviceCategoryHrefFromKey(service.category)}
                  className="inline-flex h-7 items-center rounded-btn bg-white/12 px-2.5 text-sm font-medium text-white ring-1 ring-white/15 outline-none hover:bg-white/18 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {categoryShort}
                </Link>
                <span className="inline-flex h-7 items-center rounded-btn bg-white/8 px-2.5 text-sm font-medium text-white/80 ring-1 ring-white/10">
                  {copy.sampleBadge}
                </span>
              </div>

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
              <p
                className={cn(
                  "text-sm text-white/70 sm:text-base",
                  isBangla && "leading-[1.75]",
                )}
              >
                {copy.catalogNote}
              </p>

              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                <HeroChip
                  icon={<FileText className="size-3.5" aria-hidden />}
                  label={formatTemplate(listing.card.documents, {
                    count: service.documentCount,
                  })}
                />
                <HeroChip
                  icon={<Clock className="size-3.5" aria-hidden />}
                  label={item.processingTime}
                />
                <HeroChip
                  icon={<Banknote className="size-3.5" aria-hidden />}
                  label={
                    service.feeType === "paid"
                      ? listing.card.feePaidShort
                      : listing.card.feeFreeShort
                  }
                />
              </ul>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                <OfficialPortalButton onPrimary>
                  {copy.cta.applyOfficial}
                </OfficialPortalButton>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-btn border-white/25 bg-white/10 px-6 text-button text-white hover:bg-white/18 hover:text-white"
                >
                  <a href={learnHref}>
                    <BookOpen className="size-4" aria-hidden />
                    {copy.cta.learnService}
                  </a>
                </Button>
              </div>
            </div>

            <ServiceInformationSource
              verifiedAuthorityName={officialSource.verifiedAuthorityName}
              lastUpdated={officialSource.lastUpdated}
              href={officialSource.href}
              className="bg-surface/95 backdrop-blur-md"
            />
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
      </section>

      <section
        id="quick-info"
        aria-labelledby="quick-info-heading"
        className="scroll-mt-28 bg-background pt-10 pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
      >
        <Container>
          <SectionHeader
            title={<span id="quick-info-heading">{copy.quick.title}</span>}
            description={copy.quick.description}
            className="gap-4"
          />

          <div className="mt-6 rounded-card bg-surface p-4 shadow-card ring-1 ring-border sm:mt-8 sm:p-6">
            <div className="flex gap-4 border-b border-border pb-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                <Users className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-secondary">
                  {copy.quick.who}
                </p>
                <p
                  className={cn(
                    "mt-1 text-base font-semibold text-pretty text-foreground sm:text-lg",
                    isBangla && "leading-[1.7]",
                  )}
                >
                  {guide.whoCanApply}
                </p>
              </div>
            </div>

            <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-4">
              <QuickFactCard
                icon={<FileText className="size-4" aria-hidden />}
                label={copy.quick.documents}
                value={formatTemplate(listing.card.documents, {
                  count: service.documentCount,
                })}
                isBangla={isBangla}
              />
              <QuickFactCard
                icon={<Clock className="size-4" aria-hidden />}
                label={copy.quick.time}
                value={item.processingTime}
                isBangla={isBangla}
              />
              <QuickFactCard
                icon={<Banknote className="size-4" aria-hidden />}
                label={copy.quick.fee}
                value={
                  service.feeType === "paid"
                    ? listing.card.feePaidShort
                    : listing.card.feeFreeShort
                }
                hint={listing.card.feeConfirm}
                isBangla={isBangla}
              />
              <QuickFactCard
                icon={<Building2 className="size-4" aria-hidden />}
                label={copy.quick.method}
                value={copy.methods[service.applicationMethod]}
                isBangla={isBangla}
              />
            </ul>
          </div>
        </Container>
      </section>

      <section
        id="about"
        aria-labelledby="about-heading"
        className="scroll-mt-28 bg-background pb-10 md:pb-12 lg:pb-14"
      >
        <Container>
          <SectionHeader
            title={<span id="about-heading">{copy.about.title}</span>}
            className="gap-4"
          />
          <div className="mt-6 flex gap-4 rounded-card bg-surface p-5 shadow-card ring-1 ring-border sm:mt-8 sm:p-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
              <BookOpen className="size-5" aria-hidden />
            </span>
            <p
              className={cn(
                "min-w-0 text-body text-foreground",
                isBangla && "leading-[1.85]",
              )}
            >
              {guide.about}
            </p>
          </div>
        </Container>
      </section>

      {service.course && guideCourse ? (
        <section
          id="service-learning"
          aria-labelledby="service-learning-heading"
          className="scroll-mt-28 bg-background pb-10 md:pb-12 lg:pb-14"
        >
          <Container>
            <h2 id="service-learning-heading" className="sr-only">
              {t.serviceLearning.title}
            </h2>
            <ServiceLearningPath
              variant="full"
              current="service"
              serviceTitle={item.title}
              serviceHref={serviceHref(service.slug)}
              courseTitle={guideCourse.title}
              courseHref={catalogCourseHref(service.course.slug)}
            />
          </Container>
        </section>
      ) : null}

      <section
        id="documents"
        aria-labelledby="documents-heading"
        className="scroll-mt-28 bg-background pb-10 md:pb-12 lg:pb-14"
      >
        <Container>
          <SectionHeader
            title={<span id="documents-heading">{copy.documents.title}</span>}
            description={copy.documents.description}
            className="gap-4"
          />
          <p
            className={cn(
              "mt-3 max-w-2xl text-sm text-text-secondary",
              isBangla && "leading-[1.7]",
            )}
          >
            {copy.documents.sampleNote}
          </p>
          <div className="mt-6 sm:mt-8">
            <ServiceDocumentChecklist
              documents={service.documents}
              items={documentItems}
              labels={copy.documents}
              isBangla={isBangla}
            />
          </div>
        </Container>
      </section>

      <section
        id="process"
        aria-labelledby="process-heading"
        className="scroll-mt-28 bg-background pb-10 md:pb-12 lg:pb-14"
      >
        <Container>
          <SectionHeader
            title={<span id="process-heading">{copy.process.title}</span>}
            description={copy.process.description}
            className="gap-4"
          />
          <div className="mt-6 rounded-card bg-surface p-5 shadow-card ring-1 ring-border sm:mt-8 sm:p-6">
            <ServiceProcessTimeline
              steps={copy.process.steps}
              isBangla={isBangla}
            />
          </div>
        </Container>
      </section>

      <section
        id="instructions"
        aria-labelledby="instructions-heading"
        className="scroll-mt-28 bg-background pb-10 md:pb-12 lg:pb-14"
      >
        <Container>
          <SectionHeader
            title={
              <span id="instructions-heading">{copy.instructions.title}</span>
            }
            description={copy.instructions.description}
            className="gap-4"
          />
          <Accordion
            type="single"
            collapsible
            defaultValue={SERVICE_INSTRUCTION_KEYS[0]}
            className="mt-6 overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border sm:mt-8"
          >
            {SERVICE_INSTRUCTION_KEYS.map((key, index) => {
              const instruction = copy.instructions.items[key];

              return (
                <AccordionItem
                  key={key}
                  value={key}
                  className="border-border px-4 sm:px-5"
                >
                  <AccordionTrigger className="py-4 text-left text-base font-semibold text-foreground hover:no-underline">
                    <span className="flex flex-1 items-center gap-3 pr-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-btn bg-light-green text-sm font-semibold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {instruction.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent
                    className={cn(
                      "ps-11 pb-4 text-body text-text-secondary",
                      isBangla && "leading-[1.8]",
                    )}
                  >
                    <p>{instruction.body}</p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </Container>
      </section>

      <section
        id="mistakes"
        aria-labelledby="mistakes-heading"
        className="scroll-mt-28 bg-background pb-10 md:pb-12 lg:pb-14"
      >
        <Container>
          <SectionHeader
            title={<span id="mistakes-heading">{copy.mistakes.title}</span>}
            description={copy.mistakes.description}
            className="gap-4"
          />
          <ul className="mt-6 m-0 flex list-none flex-col divide-y divide-border overflow-hidden rounded-card bg-surface ring-1 ring-border p-0 sm:mt-8">
            {guide.mistakes.map((mistake, index) => (
              <li key={mistake.title} className="flex gap-4 p-4 sm:p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-warning/10 text-warning">
                  <AlertTriangle className="size-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-warning">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 text-base font-semibold text-foreground sm:text-lg">
                    {mistake.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-sm text-text-secondary",
                      isBangla && "leading-[1.75]",
                    )}
                  >
                    {mistake.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {service.course && guideCourse ? (
        <section
          id="related-course"
          aria-labelledby="related-course-heading"
          className="scroll-mt-28 bg-background pb-10 md:pb-12 lg:pb-14"
        >
          <Container>
            <div className="rounded-card bg-surface p-5 shadow-card ring-1 ring-border sm:p-6 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-8">
              <div className="mb-6 flex max-w-xl flex-col gap-3 lg:mb-0">
                <h2
                  id="related-course-heading"
                  className="text-xl font-semibold text-balance text-foreground sm:text-2xl"
                >
                  {copy.course.title}
                </h2>
                <p
                  className={cn(
                    "text-body text-text-secondary",
                    isBangla && "leading-[1.8]",
                  )}
                >
                  {copy.course.description}
                </p>
              </div>
              <CourseCard
                href={catalogCourseHref(service.course.slug)}
                image={service.course.image}
                imageAlt={copy.course.imageAlt}
                title={guideCourse.title}
                description={guideCourse.description}
                access={service.course.access}
                accessLabel={t.learning.access[service.course.access]}
                duration={formatTemplate(t.learning.duration, {
                  hours: service.course.hours,
                })}
                lessons={formatTemplate(t.learning.lessons, {
                  count: service.course.lessons,
                })}
                difficulty={t.learning.difficulty[service.course.difficulty]}
                certificate={
                  service.course.hasCertificate
                    ? t.learning.certificate.included
                    : t.learning.certificate.notIncluded
                }
                hasCertificate={service.course.hasCertificate}
                courseType="servicePrep"
                courseTypeLabel={t.courseTypes.servicePrep.label}
                price={
                  service.course.access === "free"
                    ? t.learning.access.free
                    : formatTemplate(copy.course.price, {
                        amount: service.course.priceBdt,
                      })
                }
                cta={copy.cta.startCourse}
              />
            </div>
          </Container>
        </section>
      ) : null}

      {relatedServices.length > 0 ? (
        <section
          id="related-services"
          aria-labelledby="related-services-heading"
          className="scroll-mt-28 bg-background pb-10 md:pb-12 lg:pb-14"
        >
          <Container>
            <SectionHeader
              title={
                <span id="related-services-heading">
                  {t.serviceLearning.related.title}
                </span>
              }
              description={t.serviceLearning.related.description}
              className="gap-4"
            />
            <ul className="mt-6 grid list-none gap-3 p-0 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => {
                const relatedItem = listing.items[related.key];
                const relatedGuide = t.serviceGuides[related.key];
                const relatedCourseTitle =
                  "course" in relatedGuide && relatedGuide.course
                    ? relatedGuide.course.title
                    : relatedItem.title;

                if (!related.course) return null;

                return (
                  <li key={related.key}>
                    <ServiceLearningPath
                      variant="compact"
                      serviceTitle={relatedItem.title}
                      serviceHref={serviceHref(related.slug)}
                      courseTitle={relatedCourseTitle}
                      courseHref={catalogCourseHref(related.course.slug)}
                    />
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      ) : null}

      <section
        id="official-apply"
        aria-labelledby="official-apply-heading"
        className="scroll-mt-28 bg-primary py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-sm font-semibold text-white/80">
                <ShieldCheck className="size-4" aria-hidden />
                {copy.jump.apply}
              </p>
              <h2
                id="official-apply-heading"
                className="mt-3 text-section-heading font-semibold text-balance text-white"
              >
                {copy.official.title}
              </h2>
              <p
                className={cn(
                  "mt-4 text-body text-white/80",
                  isBangla && "leading-[1.8]",
                )}
              >
                {copy.official.description}
              </p>
              <p
                className={cn(
                  "mt-4 text-sm text-white/80",
                  isBangla && "leading-[1.75]",
                )}
              >
                <span className="font-medium text-white">
                  {t.serviceSource.sourceLabel}:
                </span>{" "}
                {officialSource.verifiedAuthorityName ??
                  t.serviceSource.portalName}
              </p>
              <p
                id="official-portal-note"
                className={cn(
                  "mt-3 text-base text-white/70",
                  isBangla && "leading-[1.75]",
                )}
              >
                {copy.officialPortalNote}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-stretch">
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-btn border-white/40 bg-transparent px-6 text-button text-white hover:bg-white/10 hover:text-white"
              >
                <a
                  href={officialSource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby="official-portal-note"
                >
                  {t.serviceSource.viewOfficial}
                  <ExternalLink className="size-4" aria-hidden />
                </a>
              </Button>
              <OfficialPortalButton
                ariaDescribedBy="official-portal-note"
                onPrimary
              >
                {copy.cta.applyOfficial}
              </OfficialPortalButton>
            </div>
          </div>
        </Container>
      </section>
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

function OfficialPortalButton({
  children,
  ariaDescribedBy,
  onPrimary = false,
}: {
  children: ReactNode;
  ariaDescribedBy?: string;
  onPrimary?: boolean;
}) {
  return (
    <Button
      asChild
      className={cn(
        "h-12 rounded-btn px-6 text-button",
        onPrimary
          ? "bg-white text-primary hover:bg-light-green"
          : "text-primary-foreground",
      )}
    >
      <a
        href={OFFICIAL_GOVERNMENT_PORTAL_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={ariaDescribedBy}
      >
        {children}
        <ExternalLink className="size-4" aria-hidden />
      </a>
    </Button>
  );
}

function QuickFactCard({
  icon,
  label,
  value,
  hint,
  isBangla = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string;
  isBangla?: boolean;
}) {
  return (
    <li>
      <div className="flex h-full flex-col gap-3 rounded-btn bg-background p-4 ring-1 ring-border">
        <span className="flex size-9 items-center justify-center rounded-btn bg-light-green text-primary">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium text-text-secondary">{label}</p>
          <p
            className={cn(
              "mt-1 text-sm font-semibold text-pretty text-foreground sm:text-base",
              isBangla && "leading-[1.55]",
            )}
          >
            {value}
          </p>
          {hint ? (
            <p
              className={cn(
                "mt-1 text-xs text-text-secondary",
                isBangla && "leading-[1.6]",
              )}
            >
              {hint}
            </p>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export { ServiceDetail };
