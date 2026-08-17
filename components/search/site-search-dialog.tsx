"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useTranslation } from "@/hooks/use-translation";
import {
  SEARCH_DEBOUNCE_MS,
  SEARCH_MIN_QUERY_LENGTH,
  hasSearchResults,
  searchSiteCatalog,
} from "@/lib/search-catalog";
import { EmptyState } from "@/components/common/empty-state";
import { SearchServiceResult } from "@/components/search/search-service-result";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const ITEM_CLASS =
  "items-start py-2.5 [&>svg:last-child]:hidden data-selected:bg-light-green";

function SiteSearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.search;
  const [query, setQuery] = React.useState("");
  const trimmed = query.trim();
  const debouncedQuery = useDebouncedValue(
    query,
    SEARCH_DEBOUNCE_MS,
    trimmed.length === 0,
  );
  const results = React.useMemo(
    () => searchSiteCatalog(debouncedQuery, t),
    [debouncedQuery, t],
  );
  const needle = debouncedQuery.trim();
  const showIdle = needle.length < SEARCH_MIN_QUERY_LENGTH;
  const showNoResults = !showIdle && !hasSearchResults(results);

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!next) setQuery("");
      onOpenChange(next);
    },
    [onOpenChange],
  );

  const goTo = React.useCallback(
    (href: string) => {
      handleOpenChange(false);
      router.push(href);
    },
    [handleOpenChange, router],
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={t.nav.search.trigger}
      description={copy.description}
      shouldFilter={false}
      className="sm:max-w-lg"
    >
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder={copy.placeholder}
      />
      <p id="search-official-portal-note" className="sr-only">
        {copy.service.officialNote}
      </p>
      <CommandList className="max-h-[min(24rem,65vh)]" aria-live="polite">
        {showIdle ? (
          <div className="px-3 py-8">
            <EmptyState
              icon={<SearchIcon className="size-6" />}
              title={copy.idle.title}
              description={`${copy.idle.description} ${copy.idle.hint}`}
              className="border-0 bg-transparent py-4 shadow-none"
            />
          </div>
        ) : null}

        {showNoResults ? (
          <div className="px-3 py-6">
            <EmptyState
              title={copy.noResults.title}
              description={copy.noResults.description}
              className="border-0 bg-transparent py-4 shadow-none"
              action={
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => goTo(ROUTES.governmentServices)}
                  >
                    {copy.noResults.browseServices}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => goTo(ROUTES.courses)}
                  >
                    {copy.noResults.browseCourses}
                  </Button>
                </div>
              }
            />
          </div>
        ) : null}

        {results.services.length > 0 ? (
          <CommandGroup heading={copy.groups.services}>
            {results.services.map((hit) => (
              <CommandItem
                key={hit.id}
                value={hit.id}
                onSelect={() => goTo(hit.href)}
                className={ITEM_CLASS}
              >
                <SearchServiceResult hit={hit} />
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}

        {results.categories.length > 0 ? (
          <CommandGroup heading={copy.groups.categories}>
            {results.categories.map((hit) => (
              <CommandItem
                key={hit.id}
                value={hit.id}
                onSelect={() => goTo(hit.href)}
                className={ITEM_CLASS}
              >
                <QuietResult
                  title={hit.title}
                  detail={
                    hit.guideCount > 0
                      ? formatTemplate(copy.category.guides, {
                          count: hit.guideCount,
                        })
                      : hit.description
                  }
                  isBangla={isBangla}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}

        {results.courses.length > 0 ? (
          <CommandGroup heading={copy.groups.courses}>
            {results.courses.map((hit) => (
              <CommandItem
                key={hit.id}
                value={hit.id}
                onSelect={() => goTo(hit.href)}
                className={ITEM_CLASS}
              >
                <QuietResult
                  title={hit.title}
                  detail={[
                    t.courseTypes[hit.type].label,
                    hit.priceBdt == null
                      ? copy.service.free
                      : formatTemplate(copy.service.price, {
                          amount: hit.priceBdt,
                        }),
                    hit.hasCertificate
                      ? copy.service.certificate
                      : copy.service.noCertificate,
                  ].join(" · ")}
                  isBangla={isBangla}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}

        {results.topics.length > 0 ? (
          <CommandGroup heading={copy.groups.topics}>
            {results.topics.map((hit) => (
              <CommandItem
                key={hit.id}
                value={hit.id}
                onSelect={() => goTo(hit.href)}
                className={ITEM_CLASS}
              >
                <QuietResult title={hit.title} isBangla={isBangla} />
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}
      </CommandList>
    </CommandDialog>
  );
}

function QuietResult({
  title,
  detail,
  isBangla,
}: {
  title: string;
  detail?: string;
  isBangla: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <p
        className={cn(
          "text-sm font-medium text-balance text-foreground",
          isBangla && "leading-[1.45]",
        )}
      >
        {title}
      </p>
      {detail ? <p className="text-xs text-text-secondary">{detail}</p> : null}
    </div>
  );
}

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

export { SiteSearchDialog };
