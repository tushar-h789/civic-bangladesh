import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Star, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CourseAccess } from "@/data/civic-courses";
import type { CourseTypeKey } from "@/data/course-types";
import { Badge } from "@/components/common/badge";
import { CourseTypeLabel } from "@/components/learning/course-type-label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";

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
  className?: string;
}

function CatalogCourseCard({
  href,
  image,
  imageAlt,
  title,
  relatedServiceHref,
  relatedServiceLabel,
  relatedServiceTitle,
  access,
  accessLabel,
  duration,
  lessons,
  instructor,
  instructorRole,
  price,
  certificate,
  hasCertificate,
  rating,
  cta,
  courseType,
  courseTypeLabel,
  typePurpose,
  className,
}: CatalogCourseCardProps) {
  return (
    <Card
      hoverable
      className={cn(
        "group h-full gap-0 rounded-card py-0 ring-border",
        className,
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Link
          href={href}
          className="absolute inset-0 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-standard group-hover:scale-105"
          />
        </Link>
        <Badge
          variant={access === "free" ? "success" : "info"}
          className="pointer-events-none absolute top-3 left-3 h-6 px-2.5"
        >
          {accessLabel}
        </Badge>
        {hasCertificate && certificate ? (
          <Badge
            variant="success"
            className="pointer-events-none absolute top-3 right-3 h-6 px-2.5"
          >
            {certificate}
          </Badge>
        ) : null}
      </div>

      <CardHeader className="gap-2 pt-5">
        {courseType && courseTypeLabel ? (
          <CourseTypeLabel type={courseType} label={courseTypeLabel} />
        ) : null}
        {relatedServiceHref && relatedServiceTitle ? (
          <p className="text-xs text-text-secondary">
            <span className="sr-only">{relatedServiceLabel}: </span>
            <Link
              href={relatedServiceHref}
              className="font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {relatedServiceTitle}
            </Link>
          </p>
        ) : typePurpose ? (
          <p className="text-xs text-text-secondary">{typePurpose}</p>
        ) : null}
        <CardTitle className="text-lg font-semibold text-balance text-foreground">
          <Link
            href={href}
            className="outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 pt-2">
        <ul className="grid list-none grid-cols-2 gap-x-3 gap-y-2.5 p-0 text-sm text-text-secondary">
          <MetaItem icon={BookOpen}>{lessons}</MetaItem>
          <MetaItem icon={Clock}>{duration}</MetaItem>
        </ul>
        <p className="inline-flex items-start gap-2 text-sm text-text-secondary">
          <UserRound className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span className="min-w-0">
            <span className="block font-medium text-foreground">
              {instructor}
            </span>
            <span className="block text-xs">{instructorRole}</span>
          </span>
        </p>
        {rating ? (
          <p className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
            <Star className="size-4 shrink-0" aria-hidden />
            <span>{rating}</span>
          </p>
        ) : null}
      </CardContent>

      <CardFooter className="mt-auto justify-between gap-3 border-border">
        <p className="text-sm font-semibold text-foreground">{price}</p>
        <Link
          href={href}
          className="inline-flex h-10 items-center gap-1.5 rounded-btn bg-primary px-4 text-button font-medium text-primary-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {cta}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </CardFooter>
    </Card>
  );
}

function MetaItem({
  icon: Icon,
  children,
}: {
  icon: typeof Clock;
  children: ReactNode;
}) {
  return (
    <li className="inline-flex items-center gap-2">
      <Icon className="size-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

export { CatalogCourseCard };
export type { CatalogCourseCardProps };
