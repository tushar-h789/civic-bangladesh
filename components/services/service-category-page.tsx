"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, Files, ListTree, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { catalogCourseHref } from "@/data/civic-courses";
import {
  SERVICE_CATEGORY_PAGES,
  countCategoryDirectoryNames,
  getPopularCategoryListings,
  getCategoryListings,
  getRelatedCoursesForCategory,
  isDirectoryStubKey,
  serviceCategoryHrefFromKey,
  type CategoryListing,
} from "@/data/service-categories";
import {
  OFFICIAL_GOVERNMENT_PORTAL_HREF,
  SERVICE_CATEGORY_KEYS,
  countServicesInCategory,
  serviceHref,
  type SampleGovernmentService,
  type ServiceCategoryKey,
} from "@/data/government-services";
import { useTranslation } from "@/hooks/use-translation";
import { getCourseCopy } from "@/lib/get-course-copy";
import { getGovernmentServiceCardModel } from "@/lib/get-government-service-card";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { SectionHeader } from "@/components/common/section-header";
import { CatalogCourseCard } from "@/components/learning/catalog-course-card";
import { CategoryDirectoryCard } from "@/components/services/category-directory-card";
import { GovernmentServiceCardFromModel } from "@/components/services/government-service-card";
import { ServiceCategoryHero } from "@/components/services/service-category-hero";
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

function ServiceCategoryPage({ category }: { category: ServiceCategoryKey }) {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const listing = t.services;
  const copy = t.serviceCategory;
  const pageCopy = copy.pages[category];
  const categoryTitle = listing.categoryItems[category].title;
  const catalogCount = countServicesInCategory(category);
  const directoryCount = countCategoryDirectoryNames(category);
  const popular = getPopularCategoryListings(category);
  const allListings = getCategoryListings(category);
  const relatedCourses = getRelatedCoursesForCategory(category);
  const faqKeys = SERVICE_CATEGORY_PAGES[category].faqKeys;
  const otherCategories = SERVICE_CATEGORY_KEYS.filter((key) => key !== category);

  const stats = [
    ...(catalogCount > 0
      ? [
          {
            icon: <Files className="size-3.5" aria-hidden />,
            label: formatTemplate(copy.hero.stats.guides, {
              count: catalogCount,
            }),
          },
        ]
      : []),
    ...(directoryCount > 0
      ? [
          {
            icon: <ListTree className="size-3.5" aria-hidden />,
            label: formatTemplate(copy.hero.stats.listed, {
              count: directoryCount,
            }),
          },
        ]
      : []),
  ];

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <ServiceCategoryHero
        copy={{
          eyebrow: copy.eyebrow,
          title: categoryTitle,
          description: pageCopy.lead,
          sampleNote: copy.sampleNote,
          sampleBadge: copy.sampleBadge,
          hero: copy.hero,
        }}
        homeLabel={t.nav.links.home}
        servicesLabel={t.nav.links.governmentServices}
        servicesHref={ROUTES.governmentServices}
        stats={stats}
        isBangla={isBangla}
      />

      <section
        aria-labelledby="category-explanation-heading"
        className="bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container className="max-w-3xl">
          <SectionHeader
            eyebrow={copy.explanation.eyebrow}
            title={
              <span id="category-explanation-heading">
                {copy.explanation.title}
              </span>
            }
          />
          <div className="mt-8 flex flex-col gap-4 sm:mt-10">
            {pageCopy.explanation.map((paragraph) => (
              <p
                key={paragraph}
                className={cn(
                  "text-body text-text-secondary",
                  isBangla && "leading-[1.8]",
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop">
        <Container className="flex flex-col gap-16 lg:gap-20">
          {popular.length > 0 ? (
            <div className="scroll-mt-28">
              <SectionHeader
                eyebrow={copy.popular.eyebrow}
                title={
                  <span id="popular-services-heading">
                    {copy.popular.title}
                  </span>
                }
                description={copy.popular.description}
              />
              <ListingGrid
                listings={popular}
                renderListing={(item) =>
                  renderListing(item, t, copy, isBangla, "featured")
                }
              />
            </div>
          ) : null}

          <div>
            <SectionHeader
              eyebrow={copy.all.eyebrow}
              title={<span id="all-services-heading">{copy.all.title}</span>}
              description={copy.all.description}
            />
            <ListingGrid
              listings={allListings}
                renderListing={(item) =>
                  renderListing(item, t, copy, isBangla, "default")
                }
            />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="related-courses-heading"
        className="bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <SectionHeader
            eyebrow={copy.courses.eyebrow}
            title={
              <span id="related-courses-heading">{copy.courses.title}</span>
            }
            description={copy.courses.description}
          />
          {relatedCourses.length === 0 ? (
            <div className="mt-8 sm:mt-10">
              <EmptyState
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
            <ul className="mt-8 grid list-none gap-4 p-0 sm:mt-10 sm:grid-cols-2">
              {relatedCourses.map((course) => {
                const item = getCourseCopy(course, t);
                const relatedTitle = course.relatedServiceKey
                  ? listing.items[course.relatedServiceKey].title
                  : undefined;

                return (
                  <li key={course.key}>
                    <CatalogCourseCard
                      href={catalogCourseHref(course.slug)}
                      image={course.image}
                      imageAlt={item.imageAlt}
                      title={item.title}
                      relatedServiceHref={
                        course.relatedServiceSlug
                          ? serviceHref(course.relatedServiceSlug)
                          : undefined
                      }
                      relatedServiceLabel={t.courses.card.relatedService}
                      relatedServiceTitle={relatedTitle}
                      access={course.access}
                      accessLabel={t.courses.access[course.access]}
                      duration={formatTemplate(t.learning.duration, {
                        hours: course.hours,
                      })}
                      lessons={formatTemplate(t.learning.lessons, {
                        count: course.lessons,
                      })}
                      instructor={t.courses.instructors[course.instructor]}
                      instructorRole={t.courses.card.instructorRole}
                      price={
                        course.priceBdt == null
                          ? t.courses.card.free
                          : formatTemplate(t.courses.card.price, {
                              amount: course.priceBdt,
                            })
                      }
                      certificate={t.learning.certificate.included}
                      hasCertificate={course.hasCertificate}
                      rating={
                        course.rating
                          ? formatTemplate(t.courses.card.rating, {
                              average: course.rating.average.toFixed(1),
                              count: course.rating.count,
                            })
                          : undefined
                      }
                      cta={t.courses.card.cta}
                      courseType={course.type}
                      courseTypeLabel={t.courseTypes[course.type].label}
                      typePurpose={
                        course.type === "civic"
                          ? t.courseTypes.civic.purpose
                          : undefined
                      }
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </section>

      <section
        aria-labelledby="category-faqs-heading"
        className="bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container className="max-w-3xl">
          <SectionHeader
            eyebrow={copy.faqs.eyebrow}
            title={<span id="category-faqs-heading">{copy.faqs.title}</span>}
            description={copy.faqs.description}
          />
          <Accordion
            type="single"
            collapsible
            defaultValue={faqKeys[0]}
            className="mt-8 gap-0 overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border sm:mt-10"
          >
            {faqKeys.map((key) => {
              const item = copy.faqs.items[key];

              return (
                <AccordionItem
                  key={key}
                  value={key}
                  className="border-border px-5 sm:px-6"
                >
                  <AccordionTrigger className="items-start py-5 text-left text-base font-semibold hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p
                      className={cn(
                        "text-body text-text-secondary",
                        isBangla && "leading-[1.8]",
                      )}
                    >
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </Container>
      </section>

      <section
        aria-labelledby="official-apply-heading"
        className="bg-primary py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-sm font-semibold text-white/80">
                <ShieldCheck className="size-4" aria-hidden />
                {copy.official.cta}
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
                {t.serviceSource.portalName}
              </p>
              <p
                id="category-official-portal-note"
                className={cn(
                  "mt-3 text-base text-white/70",
                  isBangla && "leading-[1.75]",
                )}
              >
                {copy.official.note}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-stretch">
              <Button
                asChild
                variant="outline"
                className="inline-flex h-12 items-center gap-2 rounded-btn border-white/40 bg-transparent px-6 text-button text-white hover:bg-white/10 hover:text-white"
              >
                <a
                  href={OFFICIAL_GOVERNMENT_PORTAL_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby="category-official-portal-note"
                >
                  {t.serviceSource.viewOfficial}
                  <ExternalLink className="size-4" aria-hidden />
                </a>
              </Button>
              <Button
                asChild
                className="inline-flex h-12 items-center gap-2 rounded-btn bg-white px-6 text-button text-primary hover:bg-light-green"
              >
                <a
                  href={OFFICIAL_GOVERNMENT_PORTAL_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby="category-official-portal-note"
                >
                  {copy.official.cta}
                  <ExternalLink className="size-4" aria-hidden />
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="other-categories-heading"
        className="bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop"
      >
        <Container>
          <h2
            id="other-categories-heading"
            className="text-xl font-semibold text-foreground"
          >
            {copy.otherCategories.title}
          </h2>
          <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
            {otherCategories.map((key) => (
              <li key={key}>
                <Link
                  href={serviceCategoryHrefFromKey(key)}
                  className="inline-flex h-10 items-center rounded-btn bg-surface px-4 text-sm font-medium text-foreground ring-1 ring-border outline-none hover:bg-light-green hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {listing.categoryItems[key].shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}

function ListingGrid({
  listings,
  renderListing,
}: {
  listings: CategoryListing[];
  renderListing: (listing: CategoryListing) => ReactNode;
}) {
  return (
    <ul className="mt-8 grid list-none gap-4 p-0 sm:mt-10 sm:grid-cols-2">
      {listings.map((listing) => (
        <li key={listing.entryKey}>{renderListing(listing)}</li>
      ))}
    </ul>
  );
}

function renderListing(
  listing: CategoryListing,
  t: ReturnType<typeof useTranslation>["t"],
  copy: ReturnType<typeof useTranslation>["t"]["serviceCategory"],
  isBangla: boolean,
  variant: "default" | "featured",
) {
  if (listing.type === "catalog") {
    return (
      <CatalogServiceCard service={listing.service} t={t} variant={variant} />
    );
  }

  if (!isDirectoryStubKey(listing.entryKey)) return null;

  const item = copy.directory.items[listing.entryKey];

  return (
    <CategoryDirectoryCard
      title={item.title}
      description={item.description}
      badge={copy.directory.badge}
      noGuide={copy.directory.noGuide}
      confirmOfficial={copy.directory.confirmOfficial}
      isBangla={isBangla}
    />
  );
}

function CatalogServiceCard({
  service,
  t,
  variant,
}: {
  service: SampleGovernmentService;
  t: ReturnType<typeof useTranslation>["t"];
  variant: "default" | "featured";
}) {
  return (
    <GovernmentServiceCardFromModel
      variant={variant}
      model={getGovernmentServiceCardModel(service, t)}
    />
  );
}

export { ServiceCategoryPage };
