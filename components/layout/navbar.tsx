"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { ROUTES } from "@/constants/routes";
import {
  getPrimaryNavLinks,
  getResourceNavLinks,
  isActivePath,
  isLearnerArea,
} from "@/constants/nav";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Container } from "@/components/common/container";
import { BrandLogo } from "@/components/layout/brand-logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { NavbarSearch } from "@/components/layout/navbar-search";
import { NavbarMobileMenu } from "@/components/layout/navbar-mobile-menu";

const utilityButtonClassName =
  "h-10 rounded-btn border-border bg-surface px-3 text-base text-foreground shadow-none hover:bg-light-green hover:text-primary";

function navLinkClassName(active: boolean) {
  return cn(
    "inline-flex h-10 shrink-0 items-center rounded-btn px-3 text-base font-medium whitespace-nowrap transition-colors duration-200 ease-standard",
    active
      ? "bg-light-green text-primary"
      : "text-text-secondary hover:bg-light-green/70 hover:text-primary",
  );
}

/**
 * Shared header for every page (mounted once in app/layout.tsx).
 * Full desktop nav from `xl`. Below that: logo, search, CTA, drawer.
 */
function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const navText = t.nav;
  const primaryLinks = getPrimaryNavLinks(navText);
  const resourceLinks = getResourceNavLinks(navText);
  const resourcesActive = resourceLinks.some((link) =>
    isActivePath(pathname, link.href),
  );
  const aboutActive = isActivePath(pathname, ROUTES.about);
  const moreOpen = resourcesActive || aboutActive;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur supports-backdrop-filter:bg-surface/90">
      <Container className="flex h-18 items-center gap-3 2xl:gap-4">
        <Link
          href={ROUTES.home}
          className="flex shrink-0 items-center rounded-btn outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <BrandLogo
            alt={navText.brandName}
            height={48}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav
          aria-label={navText.brandName}
          className="hidden flex-1 items-center gap-1 overflow-visible xl:flex"
        >
          {primaryLinks.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={navLinkClassName(active)}
              >
                {link.label}
              </Link>
            );
          })}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  navLinkClassName(moreOpen),
                  "gap-1 data-[state=open]:bg-light-green data-[state=open]:text-primary",
                )}
              >
                {navText.resources.trigger}
                <ChevronDownIcon className="size-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-52 p-1.5">
              {resourceLinks.map((link) => (
                <DropdownMenuItem
                  key={link.href}
                  asChild
                  className="rounded-btn px-3 py-2.5 text-base"
                >
                  <Link
                    href={link.href}
                    aria-current={
                      isActivePath(pathname, link.href) ? "page" : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="rounded-btn px-3 py-2.5 text-base">
                <Link
                  href={ROUTES.about}
                  aria-current={aboutActive ? "page" : undefined}
                >
                  {navText.links.about}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <NavbarSearch />
          <div className="hidden xl:block">
            <LanguageSwitcher compact className={utilityButtonClassName} />
          </div>
          <Button
            asChild
            variant="outline"
            className={cn(
              "hidden xl:inline-flex",
              utilityButtonClassName,
              isLearnerArea(pathname) &&
                "border-primary/30 bg-light-green text-primary",
            )}
          >
            <Link href={ROUTES.profile}>{navText.auth.profile}</Link>
          </Button>
          <Button
            asChild
            className="hidden h-10 whitespace-nowrap rounded-btn px-4 text-base text-primary-foreground sm:inline-flex"
          >
            <Link href={ROUTES.governmentServices}>{navText.primaryCta}</Link>
          </Button>
          <NavbarMobileMenu />
        </div>
      </Container>
    </header>
  );
}

export { Navbar };
