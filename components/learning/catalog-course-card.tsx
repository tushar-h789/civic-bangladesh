import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Clock,
  Star,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { CourseAccess } from "@/data/civic-courses";
import type { CourseTypeKey } from "@/data/course-types";
import { Badge } from "@/components/common/badge";
import { CourseTypeLabel } from "@/components/learning/course-type-label";

interface CatalogCourseCardProps {
  href: string;
  image: string;
  imageAlt: string;
  title: ReactNode;
  relatedServiceHref?: string;
  relatedServiceLabel?: ReactNode;
  relatedServiceTitle?: ReactNode;
  access: CourseAccess;
  accessLabel: ReactNode;
  duration: ReactNode;
  lessons: ReactNode;
  instructor: ReactNode;
  instructorRole: ReactNode;
  price: ReactNode;
  certificate?: ReactNode;
  hasCertificate: boolean;
  rating?: ReactNode;
  cta: ReactNode;
  courseType?: CourseTypeKey;
  courseTypeLabel?: string;
  typePurpose?: ReactNode;
  description?: ReactNode;
  variant?: "default" | "editorial";
  className?: string;
}

function CatalogCourseCard({
  href,
  image,
  imageAlt,
  title,
  relatedServiceHref: _relatedServiceHref,
  relatedServiceLabel,
  relatedServiceTitle,
  access,
  accessLabel,
  duration,
  lessons,
  instructor,
  instructorRole: _instructorRole,
  price,
  certificate,
  hasCertificate,
  rating,
  cta,
  courseType,
  courseTypeLabel,
  typePurpose,
  description,
  variant = "default",
  className,
}: CatalogCourseCardProps) {
  if (variant === "editorial") {
    return (
      <Link
        href={href}
        className={cn(
          "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border outline-none transition-shadow duration-200 ease-standard hover:shadow-card-hover focus-visible:ring-3 focus-visible:ring-ring/50",
          className,
        )}
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-standard group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-text/70 via-text/20 to-transparent"
          />
          <Badge
            variant={access === "free" ? "success" : "warning"}
            className="absolute top-3 left-3 h-7 px-2.5 font-semibold"
          >
            {accessLabel}
          </Badge>
        </div>
        <div className="relative z-10 -mt-7 mx-3 mb-3 flex flex-1 flex-col rounded-card bg-surface p-4 ring-1 ring-border">
          {courseType && courseTypeLabel ? (
            <CourseTypeLabel
              type={courseType}
              label={courseTypeLabel}
              className="self-start"
            />
          ) : null}
          <h3 className="mt-2 text-lg font-semibold text-balance text-foreground">
            {title}
          </h3>
          {description ? (
            <p className="mt-2 line-clamp-2 flex-1 text-sm text-text-secondary">
              {description}
            </p>
          ) : null}
          <ul className="mt-3 m-0 flex list-none flex-wrap gap-2 p-0">
            <MetaChip icon={BookOpen}>{lessons}</MetaChip>
            <MetaChip icon={Clock}>{duration}</MetaChip>
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-lg font-semibold tracking-tight text-primary">
              {price}
            </p>
            <span className="inline-flex h-10 w-fit items-center gap-1.5 rounded-btn bg-primary px-4 text-button font-medium text-primary-foreground">
              {cta}
              <ArrowRight
                className="size-4 transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full cursor-pointer flex-col overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border outline-none transition-shadow duration-200 ease-standard hover:shadow-card-hover focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-standard group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-text/55 via-text/10 to-transparent"
        />
        <Badge
          variant={access === "free" ? "success" : "warning"}
          className="absolute top-3 left-3 h-7 px-2.5 font-semibold"
        >
          {accessLabel}
        </Badge>
        {courseType && courseTypeLabel ? (
          <CourseTypeLabel
            type={courseType}
            label={courseTypeLabel}
            className="absolute bottom-3 left-3 bg-surface text-primary ring-1 ring-border"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {relatedServiceTitle ? (
          <p className="mb-1.5 line-clamp-1 text-xs font-medium text-text-secondary">
            <span className="sr-only">{relatedServiceLabel}: </span>
            {relatedServiceTitle}
          </p>
        ) : typePurpose ? (
          <p className="mb-1.5 text-xs text-text-secondary">{typePurpose}</p>
        ) : null}
        <h3 className="text-lg font-semibold text-balance text-foreground">
          {title}
        </h3>

        <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
          <MetaChip icon={BookOpen}>{lessons}</MetaChip>
          <MetaChip icon={Clock}>{duration}</MetaChip>
          {hasCertificate && certificate ? (
            <MetaChip icon={Award} emphasis>
              {certificate}
            </MetaChip>
          ) : null}
        </ul>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-secondary">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <UserRound className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate font-medium text-foreground">
              {instructor}
            </span>
          </span>
          {rating ? (
            <span className="inline-flex items-center gap-1">
              <Star
                className="size-3.5 shrink-0 fill-primary text-primary"
                aria-hidden
              />
              <span>{rating}</span>
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-4">
          <p className="text-xl font-semibold tracking-tight text-primary">
            {price}
          </p>
          <span className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-btn bg-primary px-4 text-button font-medium text-primary-foreground">
            {cta}
            <ArrowRight
              className="size-4 transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

function MetaChip({
  icon: Icon,
  children,
  emphasis = false,
}: {
  icon: typeof Clock;
  children: ReactNode;
  emphasis?: boolean;
}) {
  return (
    <li
      className={cn(
        "inline-flex items-center gap-1.5 rounded-btn px-2.5 py-1 text-sm",
        emphasis
          ? "bg-success/10 font-medium text-success"
          : "bg-light-green text-primary",
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

export { CatalogCourseCard };
export type { CatalogCourseCardProps };
