"use client";

import * as React from "react";
import { SearchIcon } from "lucide-react";

import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { SiteSearchDialog } from "@/components/search/site-search-dialog";

/**
 * Site-wide search, opened from the navbar trigger or Cmd/Ctrl+K.
 * Results cover government services, categories, courses, and civic topics.
 */
function NavbarSearch() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const navText = t.nav;

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        aria-label={navText.search.trigger}
        className="text-text-secondary max-2xl:size-9 max-2xl:p-0 2xl:w-52 2xl:justify-start"
      >
        <SearchIcon />
        <span className="hidden 2xl:inline">{t.search.placeholder}</span>
        <kbd className="ml-auto hidden items-center gap-0.5 rounded-sm border border-border bg-muted px-1.5 py-0.5 text-xs text-text-secondary 2xl:inline-flex">
          ⌘K
        </kbd>
      </Button>

      <SiteSearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export { NavbarSearch };
