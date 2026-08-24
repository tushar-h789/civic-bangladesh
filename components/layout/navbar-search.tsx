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
        size="icon"
        onClick={() => setOpen(true)}
        aria-label={navText.search.trigger}
        className="size-10 shrink-0 rounded-btn border-border bg-surface text-foreground shadow-none hover:bg-light-green hover:text-primary 2xl:h-10 2xl:w-auto 2xl:gap-2 2xl:px-3"
      >
        <SearchIcon className="size-4" />
        <span className="hidden text-base font-medium 2xl:inline">
          {navText.search.trigger}
        </span>
      </Button>

      <SiteSearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export { NavbarSearch };
