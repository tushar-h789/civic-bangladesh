"use client";

import * as React from "react";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SAMPLE_GOVERNMENT_SERVICES,
  SERVICE_CATEGORY_KEYS,
  SERVICE_CITIZEN_TYPE_KEYS,
  SERVICE_ORGANIZATION_KEYS,
  countServicesInCategory,
  type ServiceCategoryKey,
  type ServiceCitizenTypeKey,
  type ServiceFeeType,
  type ServiceOrganizationKey,
} from "@/data/government-services";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { getGovernmentServiceCardModel } from "@/lib/get-government-service-card";
import { SEARCH_DEBOUNCE_MS } from "@/lib/search-catalog";
import { useTranslation } from "@/hooks/use-translation";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { SearchInput } from "@/components/common/search-input";
import { GovernmentServiceCardFromModel } from "@/components/services/government-service-card";
import { ServicesHero } from "@/components/services/services-hero";
import {
  CATEGORY_ALL,
  ServiceCategoryNav,
} from "@/components/services/service-category-nav";
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

type CourseFilter = typeof ALL | "yes" | "no";
type FeeFilter = typeof ALL | ServiceFeeType;
type CitizenFilter = typeof ALL | ServiceCitizenTypeKey;
type OrganizationFilter = typeof ALL | ServiceOrganizationKey;
type SortKey = "featured" | "title" | "courseFirst" | "documents";
type ViewKey = "grid" | "list";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function ServicesDiscovery() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.services;
  const nav = t.nav;

  const [query, setQuery] = React.useState("");
  const searchQuery = useDebouncedValue(
    query,
    SEARCH_DEBOUNCE_MS,
    query.trim().length === 0,
  );
  const [citizenType, setCitizenType] = React.useState<CitizenFilter>(ALL);
  const [organization, setOrganization] =
    React.useState<OrganizationFilter>(ALL);
  const [fee, setFee] = React.useState<FeeFilter>(ALL);
  const [course, setCourse] = React.useState<CourseFilter>(ALL);
  const [sort, setSort] = React.useState<SortKey>("featured");
  const [view, setView] = React.useState<ViewKey>("grid");
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const resultSetKey = [
    citizenType,
    organization,
    fee,
    course,
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
      SERVICE_CATEGORY_KEYS.map((key) => [key, countServicesInCategory(key)]),
    ) as Record<ServiceCategoryKey, number>;
  }, []);

  const extraFilterCount = [
    citizenType !== ALL,
    organization !== ALL,
    fee !== ALL,
    course !== ALL,
  ].filter(Boolean).length;

  const drawerFilterCount = extraFilterCount;

  function clearExtraFilters() {
    setCitizenType(ALL);
    setOrganization(ALL);
    setFee(ALL);
    setCourse(ALL);
  }

  function clearAllFilters() {
    clearExtraFilters();
  }

  const results = React.useMemo(() => {
    const needle = searchQuery.trim().toLowerCase();
    const collator = new Intl.Collator(locale === "bn" ? "bn" : "en", {
      sensitivity: "base",
    });

    const filtered = SAMPLE_GOVERNMENT_SERVICES.filter((service) => {
      if (
        citizenType !== ALL &&
        !service.citizenTypes.some((type) => type === citizenType)
      ) {
        return false;
      }
      if (organization !== ALL && service.organization !== organization) {
        return false;
      }
      if (fee !== ALL && service.feeType !== fee) return false;
      if (course === "yes" && service.course == null) return false;
      if (course === "no" && service.course != null) return false;

      if (!needle) return true;

      const item = copy.items[service.key];
      const categoryTitle = copy.categoryItems[service.category].title;
      const haystack = [item.title, item.description, categoryTitle]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });

    return [...filtered].sort((left, right) => {
      if (sort === "title") {
        return collator.compare(
          copy.items[left.key].title,
          copy.items[right.key].title,
        );
      }
      if (sort === "courseFirst") {
        return Number(Boolean(right.course)) - Number(Boolean(left.course));
      }
      if (sort === "documents") {
        return left.documentCount - right.documentCount;
      }
      return 0;
    });
  }, [
    citizenType,
    copy,
    course,
    fee,
    locale,
    organization,
    searchQuery,
    sort,
  ]);

  const visibleResults = results.slice(0, visibleCount);
  const remaining = Math.max(0, results.length - visibleResults.length);

  const extraFilterProps = {
    copy,
    citizenType,
    organization,
    fee,
    course,
    onCitizenTypeChange: setCitizenType,
    onOrganizationChange: setOrganization,
    onFeeChange: setFee,
    onCourseChange: setCourse,
  } as const;

  const categoryNavProps = {
    copy,
    selected: ALL as typeof CATEGORY_ALL,
    counts: categoryCounts,
    totalCount: SAMPLE_GOVERNMENT_SERVICES.length,
  };

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <ServicesHero
        copy={copy}
        homeLabel={nav.links.home}
        servicesLabel={nav.links.governmentServices}
        isBangla={isBangla}
      />

      <section className="bg-background pt-0 pb-8 md:pb-10">
        <Container className="-mt-5 lg:-mt-6 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-5 xl:grid-cols-[18.5rem_minmax(0,1fr)] xl:gap-6">
          <aside
            id="service-categories"
            className="hidden scroll-mt-28 lg:block"
          >
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-card bg-surface p-4 shadow-card ring-1 ring-border">
              <ServiceCategoryNav {...categoryNavProps} />
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-4">
            <p
              className={cn(
                "rounded-card bg-light-green px-4 py-2.5 text-sm text-text-secondary ring-1 ring-border sm:text-body",
                isBangla && "leading-[1.7]",
              )}
            >
              {copy.sampleNote}
            </p>
            <div
              id="service-search"
              className="flex scroll-mt-28 flex-col gap-3 rounded-card bg-surface p-3 shadow-card ring-1 ring-border sm:p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <SearchInput
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onClear={() => setQuery("")}
                  placeholder={copy.search.placeholder}
                  aria-label={copy.search.label}
                  containerClassName="w-full min-w-0 flex-1"
                  className="h-10 rounded-btn bg-background pl-10 text-body"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 shrink-0 rounded-btn lg:hidden"
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
                <div className="ml-auto hidden items-center gap-1 rounded-btn bg-background p-1 ring-1 ring-border sm:flex">
                  <ViewToggle
                    pressed={view === "grid"}
                    label={copy.view.grid}
                    onClick={() => setView("grid")}
                  >
                    <LayoutGrid className="size-4" aria-hidden />
                  </ViewToggle>
                  <ViewToggle
                    pressed={view === "list"}
                    label={copy.view.list}
                    onClick={() => setView("list")}
                  >
                    <List className="size-4" aria-hidden />
                  </ViewToggle>
                </div>
              </div>

              <div className="hidden lg:block">
                <ServiceExtraFilters {...extraFilterProps} />
              </div>

              <ServiceFilterChips
                copy={copy}
                citizenType={citizenType}
                organization={organization}
                fee={fee}
                course={course}
                onClearCitizen={() => setCitizenType(ALL)}
                onClearOrganization={() => setOrganization(ALL)}
                onClearFee={() => setFee(ALL)}
                onClearCourse={() => setCourse(ALL)}
                onClearAll={clearAllFilters}
              />
            </div>

            <div className="flex flex-wrap items-end justify-between gap-2">
              <div className="min-w-0">
                <h2
                  id="service-results-heading"
                  className="text-lg font-semibold text-foreground sm:text-xl"
                >
                  {copy.results.title}
                </h2>
                <p
                  aria-live="polite"
                  className="mt-0.5 text-sm text-text-secondary"
                >
                  {formatTemplate(copy.results.showing, {
                    shown: visibleResults.length,
                    total: results.length,
                  })}
                </p>
              </div>
              <div className="flex w-full flex-wrap items-end gap-2 sm:w-auto">
                <FilterSelect
                  label={copy.sort.label}
                  value={sort}
                  onValueChange={(value) => setSort(value as SortKey)}
                  className="w-full sm:w-52"
                >
                  <SelectItem value="featured">{copy.sort.featured}</SelectItem>
                  <SelectItem value="title">{copy.sort.title}</SelectItem>
                  <SelectItem value="courseFirst">
                    {copy.sort.courseFirst}
                  </SelectItem>
                  <SelectItem value="documents">
                    {copy.sort.documents}
                  </SelectItem>
                </FilterSelect>
                <div className="flex items-center gap-1 rounded-btn bg-surface p-1 ring-1 ring-border sm:hidden">
                  <ViewToggle
                    pressed={view === "grid"}
                    label={copy.view.grid}
                    onClick={() => setView("grid")}
                  >
                    <LayoutGrid className="size-4" aria-hidden />
                  </ViewToggle>
                  <ViewToggle
                    pressed={view === "list"}
                    label={copy.view.list}
                    onClick={() => setView("list")}
                  >
                    <List className="size-4" aria-hidden />
                  </ViewToggle>
                </div>
              </div>
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
                <ul
                  className={cn(
                    "grid list-none gap-4 p-0",
                    view === "grid" && "sm:grid-cols-2",
                  )}
                >
                  {visibleResults.map((service) => {
                    return (
                      <li key={service.key}>
                        <GovernmentServiceCardFromModel
                          variant={view === "list" ? "compact" : "default"}
                          isolateOfficialCta
                          model={getGovernmentServiceCardModel(service, t)}
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
            <ServiceCategoryNav {...categoryNavProps} />
            <div className="border-t border-border pt-4">
              <ServiceExtraFilters {...extraFilterProps} />
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

function ServiceExtraFilters({
  copy,
  citizenType,
  organization,
  fee,
  course,
  onCitizenTypeChange,
  onOrganizationChange,
  onFeeChange,
  onCourseChange,
}: {
  copy: ServicesDiscoveryCopy;
  citizenType: CitizenFilter;
  organization: OrganizationFilter;
  fee: FeeFilter;
  course: CourseFilter;
  onCitizenTypeChange: (value: CitizenFilter) => void;
  onOrganizationChange: (value: OrganizationFilter) => void;
  onFeeChange: (value: FeeFilter) => void;
  onCourseChange: (value: CourseFilter) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
      <FilterSelect
        label={copy.filters.citizenType}
        value={citizenType}
        onValueChange={(value) => onCitizenTypeChange(value as CitizenFilter)}
      >
        <SelectItem value={ALL}>{copy.filters.all}</SelectItem>
        {SERVICE_CITIZEN_TYPE_KEYS.map((key) => (
          <SelectItem key={key} value={key}>
            {copy.citizenTypes[key]}
          </SelectItem>
        ))}
      </FilterSelect>
      <FilterSelect
        label={copy.filters.organization}
        value={organization}
        onValueChange={(value) =>
          onOrganizationChange(value as OrganizationFilter)
        }
      >
        <SelectItem value={ALL}>{copy.filters.all}</SelectItem>
        {SERVICE_ORGANIZATION_KEYS.map((key) => (
          <SelectItem key={key} value={key}>
            {copy.organizations[key]}
          </SelectItem>
        ))}
      </FilterSelect>
      <FilterSelect
        label={copy.filters.fee}
        value={fee}
        onValueChange={(value) => onFeeChange(value as FeeFilter)}
      >
        <SelectItem value={ALL}>{copy.filters.all}</SelectItem>
        <SelectItem value="free">{copy.fee.free}</SelectItem>
        <SelectItem value="paid">{copy.fee.paid}</SelectItem>
      </FilterSelect>
      <FilterSelect
        label={copy.filters.course}
        value={course}
        onValueChange={(value) => onCourseChange(value as CourseFilter)}
      >
        <SelectItem value={ALL}>{copy.filters.all}</SelectItem>
        <SelectItem value="yes">{copy.courseFilter.yes}</SelectItem>
        <SelectItem value="no">{copy.courseFilter.no}</SelectItem>
      </FilterSelect>
    </div>
  );
}

function ServiceFilterChips({
  copy,
  citizenType,
  organization,
  fee,
  course,
  onClearCitizen,
  onClearOrganization,
  onClearFee,
  onClearCourse,
  onClearAll,
}: {
  copy: ServicesDiscoveryCopy;
  citizenType: CitizenFilter;
  organization: OrganizationFilter;
  fee: FeeFilter;
  course: CourseFilter;
  onClearCitizen: () => void;
  onClearOrganization: () => void;
  onClearFee: () => void;
  onClearCourse: () => void;
  onClearAll: () => void;
}) {
  const chips: { key: string; label: string; onClear: () => void }[] = [];

  if (citizenType !== ALL) {
    chips.push({
      key: "citizen",
      label: copy.citizenTypes[citizenType],
      onClear: onClearCitizen,
    });
  }
  if (organization !== ALL) {
    chips.push({
      key: "org",
      label: copy.organizations[organization],
      onClear: onClearOrganization,
    });
  }
  if (fee !== ALL) {
    chips.push({
      key: "fee",
      label: copy.fee[fee],
      onClear: onClearFee,
    });
  }
  if (course !== ALL) {
    chips.push({
      key: "course",
      label: copy.courseFilter[course],
      onClear: onClearCourse,
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onClear}
          className="inline-flex h-8 items-center gap-1.5 rounded-btn bg-light-green px-2.5 text-sm font-medium text-primary outline-none ring-1 ring-border transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {chip.label}
          <X className="size-3.5" aria-hidden />
          <span className="sr-only">{copy.filters.clear}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-sm font-medium text-text-secondary underline-offset-2 outline-none hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {copy.filters.clear}
      </button>
    </div>
  );
}

type ServicesDiscoveryCopy = ReturnType<typeof useTranslation>["t"]["services"];

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
        "flex min-w-0 w-full flex-col gap-1",
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

function ViewToggle({
  pressed,
  label,
  onClick,
  children,
}: {
  pressed: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-pressed={pressed}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "rounded-btn",
        pressed &&
          "bg-light-green text-primary hover:bg-light-green hover:text-primary",
      )}
    >
      {children}
    </Button>
  );
}

export { ServicesDiscovery };
