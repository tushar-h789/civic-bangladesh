"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  GraduationCap,
  IdCard,
  Landmark,
  LayoutGrid,
  MapPinned,
  Plane,
  ScrollText,
  Sprout,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import {
  SERVICE_CATEGORY_GROUPS,
  type ServiceCategoryKey,
} from "@/data/government-services";
import { serviceCategoryHrefFromKey } from "@/data/service-categories";
import type { ServicesTranslations } from "@/locales/en/services";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CATEGORY_ICONS: Record<
  ServiceCategoryKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  outboundAttestation: Plane,
  certificatesPermits: ScrollText,
  registrationLicence: BadgeCheck,
  education: GraduationCap,
  landLease: MapPinned,
  financeBank: Landmark,
  agricultureFertilizer: Sprout,
  personalApplications: IdCard,
  other: LayoutGrid,
};

const ALL = "all";
const OPEN_GROUPS = SERVICE_CATEGORY_GROUPS.map((group) => group.key);

interface ServiceCategoryNavProps {
  copy: ServicesTranslations;
  selected: typeof ALL | ServiceCategoryKey;
  counts: Record<ServiceCategoryKey, number>;
  totalCount: number;
  onSelect?: (category: typeof ALL | ServiceCategoryKey) => void;
}

function formatCount(template: string, count: number) {
  return template.replace("{count}", String(count));
}

function ServiceCategoryNav({
  copy,
  selected,
  counts,
  totalCount,
  onSelect,
}: ServiceCategoryNavProps) {
  return (
    <nav aria-label={copy.categories.title} className="flex flex-col gap-3">
      <div className="border-b border-border pb-3">
        <p className="text-sm font-semibold text-foreground">
          {copy.categories.title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-text-secondary">
          {copy.categories.description}
        </p>
      </div>

      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        <li>
          <CategoryButton
            icon={LayoutGrid}
            label={copy.categories.all}
            count={formatCount(copy.categories.count, totalCount)}
            selected={selected === ALL}
            href={onSelect ? undefined : ROUTES.governmentServices}
            onSelect={onSelect ? () => onSelect(ALL) : undefined}
          />
        </li>
      </ul>

      <Accordion
        type="multiple"
        defaultValue={[...OPEN_GROUPS]}
        className="gap-0"
      >
        {SERVICE_CATEGORY_GROUPS.map((group) => (
          <AccordionItem
            key={group.key}
            value={group.key}
            className="border-border"
          >
            <AccordionTrigger className="rounded-btn px-2 py-2 text-xs font-semibold text-text-secondary hover:no-underline hover:text-foreground">
              {copy.groups[group.key]}
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <ul className="flex list-none flex-col gap-1 p-0">
                {group.categories.map((key) => {
                  const count = counts[key];
                  const Icon = CATEGORY_ICONS[key];

                  return (
                    <li key={key}>
                      <CategoryButton
                        icon={Icon}
                        label={copy.categoryItems[key].shortTitle}
                        title={copy.categoryItems[key].title}
                        count={
                          count > 0
                            ? formatCount(copy.categories.count, count)
                            : undefined
                        }
                        selected={selected === key}
                        href={
                          onSelect ? undefined : serviceCategoryHrefFromKey(key)
                        }
                        onSelect={
                          onSelect
                            ? () => onSelect(selected === key ? ALL : key)
                            : undefined
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </nav>
  );
}

function CategoryButton({
  label,
  title,
  count,
  selected,
  onSelect,
  href,
  icon: Icon,
}: {
  label: string;
  title?: string;
  count?: string;
  selected: boolean;
  onSelect?: () => void;
  href?: string;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  const className = cn(
    "flex w-full items-start gap-2.5 rounded-btn border-l-[3px] px-2.5 py-2 text-left text-sm transition-colors duration-200 ease-standard",
    "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
    selected
      ? "border-l-primary bg-light-green font-semibold text-primary"
      : "border-l-transparent text-foreground hover:bg-muted",
  );

  const content = (
    <>
      {Icon ? (
        <span
          className={cn(
            "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-btn",
            selected
              ? "bg-surface text-primary ring-1 ring-border"
              : "bg-light-green text-primary",
          )}
        >
          <Icon className="size-4" aria-hidden />
        </span>
      ) : null}
      <span className="min-w-0 flex-1 pt-1 leading-snug">{label}</span>
      {count ? (
        <span
          className={cn(
            "mt-1 inline-flex min-w-7 shrink-0 items-center justify-center rounded-full px-2 py-0.5 text-xs tabular-nums",
            selected
              ? "bg-surface font-semibold text-primary"
              : "bg-muted text-text-secondary",
          )}
        >
          {count}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        title={title}
        aria-current={selected ? "page" : undefined}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      title={title}
      aria-pressed={selected}
      className={className}
      onClick={onSelect}
    >
      {content}
    </button>
  );
}

export { ServiceCategoryNav };
export { ALL as CATEGORY_ALL };
