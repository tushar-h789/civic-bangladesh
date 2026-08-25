"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";

function DashboardSubnav({
  tone = "default",
}: {
  tone?: "default" | "onPrimary";
}) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const items = [
    { href: ROUTES.profile, label: t.dashboard.nav.overview },
    { href: ROUTES.dashboardServices, label: t.dashboard.nav.services },
  ];
  const onPrimary = tone === "onPrimary";

  return (
    <nav aria-label={t.dashboard.eyebrow}>
      <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex h-8 items-center rounded-btn px-3 text-sm font-medium outline-none transition-colors duration-200 ease-standard focus-visible:ring-3 focus-visible:ring-ring/50",
                  onPrimary
                    ? active
                      ? "bg-white text-primary"
                      : "bg-white/10 text-white/90 ring-1 ring-white/15 hover:bg-white/18 hover:text-white"
                    : active
                      ? "bg-light-green text-primary"
                      : "bg-surface text-text-secondary ring-1 ring-border hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { DashboardSubnav };
