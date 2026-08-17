"use client";

import type { ComponentType } from "react";
import {
  BadgeCheck,
  Briefcase,
  GraduationCap,
  IdCard,
  LayoutGrid,
  Plane,
  ScrollText,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  COURSE_CATALOG_CATEGORY_KEYS,
  type CourseCatalogCategoryKey,
} from "@/data/course-catalog";
import type { CoursesTranslations } from "@/locales/en/courses";

const CATEGORY_ICONS: Record<
  CourseCatalogCategoryKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  outbound: Plane,
  licence: BadgeCheck,
  certificates: ScrollText,
  education: GraduationCap,
  business: Briefcase,
  personal: IdCard,
  other: LayoutGrid,
};

const ALL = "all";

interface CourseCategoryNavProps {
  copy: CoursesTranslations;
  selected: typeof ALL | CourseCatalogCategoryKey;
  counts: Record<CourseCatalogCategoryKey, number>;
  totalCount: number;
  onSelect: (category: typeof ALL | CourseCatalogCategoryKey) => void;
}

function formatCount(template: string, count: number) {
  return template.replace("{count}", String(count));
}

function CourseCategoryNav({
  copy,
  selected,
  counts,
  totalCount,
  onSelect,
}: CourseCategoryNavProps) {
  return (
    <nav aria-label={copy.categories.title} className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-semibold text-foreground">
          {copy.categories.title}
        </p>
        <p className="mt-1 text-xs text-text-secondary">
          {copy.categories.description}
        </p>
      </div>

      <CategoryButton
        label={copy.categories.all}
        count={formatCount(copy.categories.count, totalCount)}
        selected={selected === ALL}
        onSelect={() => onSelect(ALL)}
      />

      <ul className="flex list-none flex-col gap-1 p-0">
        {COURSE_CATALOG_CATEGORY_KEYS.map((key) => {
          const count = counts[key];
          const Icon = CATEGORY_ICONS[key];

          return (
            <li key={key}>
              <CategoryButton
                icon={Icon}
                label={copy.categories.items[key]}
                count={
                  count > 0
                    ? formatCount(copy.categories.count, count)
                    : undefined
                }
                selected={selected === key}
                onSelect={() => onSelect(selected === key ? ALL : key)}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function CategoryButton({
  label,
  count,
  selected,
  onSelect,
  icon: Icon,
}: {
  label: string;
  count?: string;
  selected: boolean;
  onSelect: () => void;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-btn px-2 py-2 text-left text-sm transition-colors duration-200 ease-standard",
        "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        selected
          ? "bg-light-green font-semibold text-primary"
          : "text-foreground hover:bg-muted",
      )}
      onClick={onSelect}
    >
      {Icon ? (
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-btn",
            selected
              ? "bg-surface text-primary"
              : "bg-light-green text-primary",
          )}
        >
          <Icon className="size-4" aria-hidden />
        </span>
      ) : null}
      <span className="min-w-0 flex-1 leading-snug">{label}</span>
      {count ? (
        <span className="tabular-nums text-xs text-text-secondary">
          {count}
        </span>
      ) : null}
    </button>
  );
}

export { CourseCategoryNav };
export { ALL as CATEGORY_ALL };
