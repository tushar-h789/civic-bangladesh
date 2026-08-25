"use client";

import * as React from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { CourseAccess, CourseDifficulty } from "@/data/civic-courses";
import {
  COURSE_CATALOG_CATEGORY_KEYS,
  COURSE_DIFFICULTY_KEYS,
  COURSE_DURATION_FILTER_KEYS,
  COURSE_TYPE_KEYS,
  catalogCourseHref,
  countCoursesInCategory,
  durationBucket,
  getCourseCatalog,
  type CourseCatalogCategoryKey,
  type CourseDurationFilterKey,
  type CourseTypeKey,
} from "@/data/course-catalog";
import { serviceHref } from "@/data/government-services";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useTranslation } from "@/hooks/use-translation";
import { getCourseCopy } from "@/lib/get-course-copy";
import { SEARCH_DEBOUNCE_MS } from "@/lib/search-catalog";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { SearchInput } from "@/components/common/search-input";
import { CatalogCourseCard } from "@/components/learning/catalog-course-card";
import {
  CATEGORY_ALL,
  CourseCategoryNav,
} from "@/components/learning/course-category-nav";
import { CoursesHero } from "@/components/learning/courses-hero";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const PAGE_SIZE = 6;
const ALL = CATEGORY_ALL;
const CATALOG = getCourseCatalog();

type CategoryFilter = typeof ALL | CourseCatalogCategoryKey;
type TypeFilter = typeof ALL | CourseTypeKey;
type AccessFilter = typeof ALL | CourseAccess;
type DurationFilter = typeof ALL | CourseDurationFilterKey;
type DifficultyFilter = typeof ALL | CourseDifficulty;
type CertificateFilter = typeof ALL | "yes" | "no";
type SortKey = "featured" | "title" | "price" | "duration";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function CoursesCatalog({
  initialType,
}: {
  initialType?: CourseTypeKey;
}) {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.courses;
  const nav = t.nav;
  const learning = t.learning;

  const [query, setQuery] = React.useState("");
  const searchQuery = useDebouncedValue(
    query,
    SEARCH_DEBOUNCE_MS,
    query.trim().length === 0,
  );
  const [category, setCategory] = React.useState<CategoryFilter>(ALL);
  const [type, setType] = React.useState<TypeFilter>(initialType ?? ALL);
  const [access, setAccess] = React.useState<AccessFilter>(ALL);
  const [duration, setDuration] = React.useState<DurationFilter>(ALL);
  const [difficulty, setDifficulty] = React.useState<DifficultyFilter>(ALL);
  const [certificate, setCertificate] = React.useState<CertificateFilter>(ALL);
  const [sort, setSort] = React.useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const resultSetKey = [
    category,
    type,
    access,
    duration,
    difficulty,
    certificate,
    searchQuery,
    sort,
  ].join("|");
  const [pagination, setPagination] = React.useState({
    key: resultSetKey,
    count: PAGE_SIZE,
  });
  const visibleCount =
    pagination.key === resultSetKey ? pagination.count : PAGE_SIZE;

  const categoryCounts = React.useMemo(() => {
    return Object.fromEntries(
      COURSE_CATALOG_CATEGORY_KEYS.map((key) => [
        key,
        countCoursesInCategory(key),
      ]),
    ) as Record<CourseCatalogCategoryKey, number>;
  }, []);

  const extraFilterCount = [
    type !== ALL,
    access !== ALL,
    duration !== ALL,
    difficulty !== ALL,
    certificate !== ALL,
  ].filter(Boolean).length;

  const drawerFilterCount = extraFilterCount + (category !== ALL ? 1 : 0);

  function clearExtraFilters() {
    setType(ALL);
    setAccess(ALL);
    setDuration(ALL);
    setDifficulty(ALL);
    setCertificate(ALL);
  }

  function clearAllFilters() {
    setCategory(ALL);
    clearExtraFilters();
  }

  const results = React.useMemo(() => {
    const needle = searchQuery.trim().toLowerCase();
    const collator = new Intl.Collator(locale === "bn" ? "bn" : "en", {
      sensitivity: "base",
    });

    const filtered = CATALOG.filter((course) => {
      if (category !== ALL && course.category !== category) return false;
      if (type !== ALL && course.type !== type) return false;
      if (access !== ALL && course.access !== access) return false;
      if (duration !== ALL && durationBucket(course.hours) !== duration) {
        return false;
      }
      if (difficulty !== ALL && course.difficulty !== difficulty) return false;
      if (certificate === "yes" && !course.hasCertificate) return false;
      if (certificate === "no" && course.hasCertificate) return false;

      if (!needle) return true;

      const item = getCourseCopy(course, t);
      const relatedTitle = course.relatedServiceKey
        ? t.services.items[course.relatedServiceKey].title
        : "";
      const haystack = [
        item.title,
        item.description,
        copy.categories.items[course.category],
        copy.types[course.type],
        copy.instructors[course.instructor],
        relatedTitle,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });

    return [...filtered].sort((left, right) => {
      if (sort === "title") {
        return collator.compare(
          getCourseCopy(left, t).title,
          getCourseCopy(right, t).title,
        );
      }
      if (sort === "price") {
        const leftPrice = left.priceBdt ?? -1;
        const rightPrice = right.priceBdt ?? -1;
        return leftPrice - rightPrice;
      }
      if (sort === "duration") {
        return left.hours - right.hours;
      }
      return 0;
    });
  }, [
    access,
    category,
    certificate,
    copy.categories.items,
    copy.instructors,
    copy.types,
    difficulty,
    duration,
    locale,
    searchQuery,
    sort,
    t,
    type,
  ]);

  const visibleResults = results.slice(0, visibleCount);
  const remaining = Math.max(0, results.length - visibleResults.length);

  const extraFilterProps = {
    copy,
    learning,
    type,
    access,
    duration,
    difficulty,
    certificate,
    onTypeChange: setType,
    onAccessChange: setAccess,
    onDurationChange: setDuration,
    onDifficultyChange: setDifficulty,
    onCertificateChange: setCertificate,
  } as const;

  const categoryNavProps = {
    copy,
    selected: category,
    counts: categoryCounts,
    totalCount: CATALOG.length,
    onSelect: setCategory,
  };

  const isCivicCatalog = type === "civic";

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <CoursesHero
        copy={copy}
        homeLabel={nav.links.home}
        coursesLabel={nav.links.courses}
        isBangla={isBangla}
        type={type === ALL ? "all" : type}
      />

      <section className="bg-background pt-0 pb-10 md:pb-12 lg:pb-14">
        <Container className="-mt-6 lg:-mt-8 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[20rem_minmax(0,1fr)] xl:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-card bg-surface p-4 shadow-card ring-1 ring-border">
              <CourseCategoryNav {...categoryNavProps} />
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-5">
            <p
              className={cn(
                "rounded-card px-4 py-3 text-body text-text-secondary ring-1 ring-border",
                isCivicCatalog
                  ? "bg-surface"
                  : "bg-light-green text-sm",
                isBangla && "leading-[1.75]",
              )}
            >
              {isCivicCatalog ? copy.civicCatalog.note : copy.pricingNote}{" "}
              <Link
                href={ROUTES.pricing}
                className="font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {copy.pricingCta}
              </Link>
            </p>
            <div className="flex flex-col gap-4 rounded-card bg-surface p-4 shadow-card ring-1 ring-border sm:p-5">
              <SearchInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onClear={() => setQuery("")}
                placeholder={
                  isCivicCatalog
                    ? copy.civicCatalog.searchPlaceholder
                    : copy.search.placeholder
                }
                aria-label={copy.search.label}
                containerClassName="w-full"
                className="h-11 rounded-btn bg-background text-body"
              />

              <div className="flex flex-wrap items-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 rounded-btn lg:hidden"
                  onClick={() => setFiltersOpen(true)}
                >
                  <SlidersHorizontal className="size-4" aria-hidden />
                  {copy.filters.open}
                  {drawerFilterCount > 0 ? (
                    <span className="tabular-nums text-text-secondary">
                      ({drawerFilterCount})
                    </span>
                  ) : null}
                </Button>

                <FilterSelect
                  label={copy.sort.label}
                  value={sort}
                  onValueChange={(value) => setSort(value as SortKey)}
                  className="w-full sm:w-48"
                >
                  <SelectItem value="featured">{copy.sort.featured}</SelectItem>
                  <SelectItem value="title">{copy.sort.title}</SelectItem>
                  <SelectItem value="price">{copy.sort.price}</SelectItem>
                  <SelectItem value="duration">{copy.sort.duration}</SelectItem>
                </FilterSelect>
              </div>

              <div className="hidden lg:block">
                <CourseExtraFilters {...extraFilterProps} />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2
                id="course-results-heading"
                className="text-xl font-semibold text-foreground sm:text-2xl"
              >
                {isCivicCatalog
                  ? copy.civicCatalog.resultsTitle
                  : copy.results.title}
              </h2>
              <p
                aria-live="polite"
                className="text-sm font-semibold text-primary"
              >
                {formatTemplate(copy.results.showing, {
                  shown: visibleResults.length,
                  total: results.length,
                })}
              </p>
            </div>

            {results.length === 0 ? (
              <EmptyState
                title={copy.results.emptyTitle}
                description={copy.results.emptyDescription}
                action={
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearAllFilters}
                  >
                    {copy.filters.clear}
                  </Button>
                }
              />
            ) : (
              <>
                <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
                  {visibleResults.map((course) => {
                    const item = getCourseCopy(course, t);
                    const relatedTitle = course.relatedServiceKey
                      ? t.services.items[course.relatedServiceKey].title
                      : undefined;

                    return (
                      <li key={course.key}>
                        <CatalogCourseCard
                          href={catalogCourseHref(course.slug)}
                          image={course.image}
                          imageAlt={item.imageAlt}
                          title={item.title}
                          description={
                            isCivicCatalog ? item.description : undefined
                          }
                          variant={isCivicCatalog ? "editorial" : "default"}
                          relatedServiceHref={
                            isCivicCatalog
                              ? undefined
                              : course.relatedServiceSlug
                                ? serviceHref(course.relatedServiceSlug)
                                : undefined
                          }
                          relatedServiceLabel={copy.card.relatedService}
                          relatedServiceTitle={relatedTitle}
                          access={course.access}
                          accessLabel={copy.access[course.access]}
                          duration={formatTemplate(learning.duration, {
                            hours: course.hours,
                          })}
                          lessons={formatTemplate(learning.lessons, {
                            count: course.lessons,
                          })}
                          instructor={copy.instructors[course.instructor]}
                          instructorRole={copy.card.instructorRole}
                          price={
                            course.priceBdt == null
                              ? copy.card.free
                              : formatTemplate(copy.card.price, {
                                  amount: course.priceBdt,
                                })
                          }
                          certificate={learning.certificate.included}
                          hasCertificate={course.hasCertificate}
                          rating={
                            course.rating
                              ? formatTemplate(copy.card.rating, {
                                  average: course.rating.average.toFixed(1),
                                  count: course.rating.count,
                                })
                              : undefined
                          }
                          cta={copy.card.cta}
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

                {remaining > 0 ? (
                  <div className="flex flex-col items-center gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="h-11 rounded-btn px-5 text-button"
                      onClick={() =>
                        setPagination({
                          key: resultSetKey,
                          count: visibleCount + PAGE_SIZE,
                        })
                      }
                    >
                      {copy.results.loadMore}
                    </Button>
                    <p className="text-sm text-text-secondary">
                      {formatTemplate(copy.results.remaining, {
                        count: remaining,
                      })}
                    </p>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </Container>
      </section>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent
          side="left"
          className="w-full gap-0 bg-background sm:max-w-md"
        >
          <SheetHeader className="border-b border-border">
            <SheetTitle>{copy.filters.drawerTitle}</SheetTitle>
            <SheetDescription>
              {copy.filters.drawerDescription}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
            <CourseCategoryNav {...categoryNavProps} />
            <div className="border-t border-border pt-4">
              <CourseExtraFilters {...extraFilterProps} />
            </div>
          </div>
          <SheetFooter className="border-t border-border">
            {drawerFilterCount > 0 ? (
              <Button type="button" variant="ghost" onClick={clearAllFilters}>
                {copy.filters.clear}
              </Button>
            ) : null}
            <Button
              type="button"
              className="text-primary-foreground"
              onClick={() => setFiltersOpen(false)}
            >
              {copy.filters.apply}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function CourseExtraFilters({
  copy,
  learning,
  type,
  access,
  duration,
  difficulty,
  certificate,
  onTypeChange,
  onAccessChange,
  onDurationChange,
  onDifficultyChange,
  onCertificateChange,
}: {
  copy: CoursesCatalogCopy;
  learning: ReturnType<typeof useTranslation>["t"]["learning"];
  type: TypeFilter;
  access: AccessFilter;
  duration: DurationFilter;
  difficulty: DifficultyFilter;
  certificate: CertificateFilter;
  onTypeChange: (value: TypeFilter) => void;
  onAccessChange: (value: AccessFilter) => void;
  onDurationChange: (value: DurationFilter) => void;
  onDifficultyChange: (value: DifficultyFilter) => void;
  onCertificateChange: (value: CertificateFilter) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <FilterSelect
        label={copy.filters.type}
        value={type}
        onValueChange={(value) => onTypeChange(value as TypeFilter)}
      >
        <SelectItem value={ALL}>{copy.filters.all}</SelectItem>
        {COURSE_TYPE_KEYS.map((key) => (
          <SelectItem key={key} value={key}>
            {copy.types[key]}
          </SelectItem>
        ))}
      </FilterSelect>
      <FilterSelect
        label={copy.filters.access}
        value={access}
        onValueChange={(value) => onAccessChange(value as AccessFilter)}
      >
        <SelectItem value={ALL}>{copy.filters.all}</SelectItem>
        <SelectItem value="free">{copy.access.free}</SelectItem>
        <SelectItem value="premium">{copy.access.premium}</SelectItem>
      </FilterSelect>
      <FilterSelect
        label={copy.filters.duration}
        value={duration}
        onValueChange={(value) => onDurationChange(value as DurationFilter)}
      >
        <SelectItem value={ALL}>{copy.filters.all}</SelectItem>
        {COURSE_DURATION_FILTER_KEYS.map((key) => (
          <SelectItem key={key} value={key}>
            {copy.duration[key]}
          </SelectItem>
        ))}
      </FilterSelect>
      <FilterSelect
        label={copy.filters.difficulty}
        value={difficulty}
        onValueChange={(value) => onDifficultyChange(value as DifficultyFilter)}
      >
        <SelectItem value={ALL}>{copy.filters.all}</SelectItem>
        {COURSE_DIFFICULTY_KEYS.map((key) => (
          <SelectItem key={key} value={key}>
            {learning.difficulty[key]}
          </SelectItem>
        ))}
      </FilterSelect>
      <FilterSelect
        label={copy.filters.certificate}
        value={certificate}
        onValueChange={(value) =>
          onCertificateChange(value as CertificateFilter)
        }
      >
        <SelectItem value={ALL}>{copy.filters.all}</SelectItem>
        <SelectItem value="yes">{copy.certificateFilter.yes}</SelectItem>
        <SelectItem value="no">{copy.certificateFilter.no}</SelectItem>
      </FilterSelect>
    </div>
  );
}

type CoursesCatalogCopy = ReturnType<typeof useTranslation>["t"]["courses"];

function FilterSelect({
  label,
  value,
  onValueChange,
  className,
  children,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const id = React.useId();

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-none sm:w-44",
        className,
      )}
    >
      <label htmlFor={id} className="text-xs font-medium text-text-secondary">
        {label}
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} className="h-9 w-full rounded-btn bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper" align="start" className="max-w-80">
          {children}
        </SelectContent>
      </Select>
    </div>
  );
}

export { CoursesCatalog };
