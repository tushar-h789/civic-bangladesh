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

function navLinkClassName(active: boolean, emphasis = false) {
  return cn(
    "rounded-btn px-2 py-2 text-sm font-medium whitespace-nowrap transition-colors 2xl:px-2.5",
    emphasis
      ? "text-primary hover:bg-light-green hover:text-primary"
      : "text-text-secondary hover:bg-muted hover:text-foreground",
    active && "bg-light-green text-primary hover:bg-light-green",
    emphasis && "font-semibold",
  );
}

/**
 * Shared header for every page (mounted once in app/layout.tsx).
 * Full desktop nav from `xl` (1280px). At 1024px and below it
 * collapses to logo, search, CTA, and a hamburger drawer.
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

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <Container className="flex h-16 items-center gap-2 xl:gap-3 2xl:gap-4">
        <Link href={ROUTES.home} className="flex min-w-0 shrink items-center">
          <BrandLogo
            alt={navText.brandName}
            height={36}
            priority
            className="h-8 w-auto max-w-full xl:h-9"
          />
        </Link>

        <nav
          aria-label={navText.brandName}
          className="hidden min-w-0 items-center gap-0.5 xl:flex"
        >
          {primaryLinks.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={navLinkClassName(active, link.emphasis)}
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
                size="sm"
                className={navLinkClassName(resourcesActive)}
              >
                {navText.resources.trigger}
                <ChevronDownIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-48">
              {resourceLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
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
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href={ROUTES.about}
            aria-current={aboutActive ? "page" : undefined}
            className={navLinkClassName(aboutActive)}
          >
            {navText.links.about}
          </Link>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 xl:gap-2">
          <NavbarSearch />
          <div className="hidden xl:block">
            <LanguageSwitcher />
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className={cn(
              "hidden xl:inline-flex",
              isLearnerArea(pathname) &&
                "border-primary/30 bg-light-green text-primary",
            )}
          >
            <Link href={ROUTES.profile}>{navText.auth.profile}</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="hidden whitespace-nowrap text-primary-foreground sm:inline-flex"
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
