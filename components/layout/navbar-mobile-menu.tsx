"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { ROUTES } from "@/constants/routes";
import {
  getPrimaryNavLinks,
  getResourceNavLinks,
  isActivePath,
  isLearnerArea,
} from "@/constants/nav";
import { BrandLogo } from "@/components/layout/brand-logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function NavbarMobileMenu() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();
  const navText = t.nav;
  const primaryLinks = [
    ...getPrimaryNavLinks(navText),
    { label: navText.links.about, href: ROUTES.about },
  ];
  const resourceLinks = getResourceNavLinks(navText);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label={navText.mobileMenu.open}
        className="size-10 rounded-btn xl:hidden"
      >
        <MenuIcon />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col gap-0 sm:max-w-sm"
        >
          <SheetHeader className="border-b border-border">
            <SheetTitle className="sr-only">{navText.brandName}</SheetTitle>
            <BrandLogo alt={navText.brandName} height={36} />
          </SheetHeader>

          <nav
            aria-label={navText.brandName}
            className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
          >
            <Button asChild className="mb-3 w-full text-primary-foreground">
              <SheetClose asChild>
                <Link href={ROUTES.governmentServices}>
                  {navText.primaryCta}
                </Link>
              </SheetClose>
            </Button>

            <ul className="flex flex-col gap-1">
              {primaryLinks.map((link) => {
                const active = isActivePath(pathname, link.href);

                return (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-btn px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted",
                          "emphasis" in link &&
                            link.emphasis &&
                            "font-semibold text-primary",
                          active && "bg-light-green text-primary",
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 mb-1 px-3 text-sm font-semibold tracking-wide text-text-secondary uppercase">
              {navText.mobileMenu.resourcesSectionLabel}
            </p>
            <ul className="flex flex-col gap-1">
              {resourceLinks.map((link) => {
                const active = isActivePath(pathname, link.href);

                return (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-btn px-3 py-2.5 text-base text-foreground transition-colors hover:bg-muted",
                          active && "bg-light-green text-primary",
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
              <LanguageSwitcher className="w-full justify-center" />
              <Button
                asChild
                variant="outline"
                className={cn(
                  "w-full",
                  isLearnerArea(pathname) &&
                    "border-primary/30 bg-light-green text-primary",
                )}
              >
                <SheetClose asChild>
                  <Link href={ROUTES.profile}>{navText.auth.profile}</Link>
                </SheetClose>
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

export { NavbarMobileMenu };
