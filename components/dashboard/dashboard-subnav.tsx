"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";

function DashboardSubnav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const items = [
    { href: ROUTES.profile, label: t.dashboard.nav.overview },
    { href: ROUTES.dashboardServices, label: t.dashboard.nav.services },
  ];

  return (
    <nav aria-label={t.dashboard.eyebrow}>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center rounded-btn px-3 py-1.5 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  active
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
