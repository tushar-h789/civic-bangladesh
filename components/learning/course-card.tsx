import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Clock, Gauge } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CourseAccess } from "@/data/civic-courses";
import type { CourseTypeKey } from "@/data/course-types";
import { Badge } from "@/components/common/badge";
import { CourseTypeLabel } from "@/components/learning/course-type-label";

interface CourseCardProps {
  href: string;
  image: string;
  imageAlt: string;
  title: ReactNode;
  description: ReactNode;
  access: CourseAccess;
  accessLabel: ReactNode;
  duration: ReactNode;
  lessons: ReactNode;
  difficulty: ReactNode;
  certificate: ReactNode;
  hasCertificate: boolean;
  price?: ReactNode;
  cta: ReactNode;
  courseType?: CourseTypeKey;
  courseTypeLabel?: string;
  typePurpose?: ReactNode;
  className?: string;
}

function CourseCard({
  href,
  image,
  imageAlt,
  title,
  description,
  access,
  accessLabel,
  duration,
  lessons,
  difficulty,
  certificate,
  hasCertificate,
  price,
  cta,
  courseType,
  courseTypeLabel,
  typePurpose,
  className,
}: CourseCardProps) {
  return (
    <article
      className={cn(
        "group h-full overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border transition-shadow duration-200 ease-standard hover:shadow-card-hover",
        className,
      )}
    >
      <Link
        href={href}
        className="flex h-full cursor-pointer flex-col outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
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

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {typePurpose ? (
            <p className="mb-2 text-sm text-text-secondary">{typePurpose}</p>
          ) : null}
          <h3 className="text-lg font-semibold text-balance text-foreground sm:text-xl">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-body text-text-secondary">
            {description}
          </p>

          <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
            <MetaChip icon={Clock}>{duration}</MetaChip>
            <MetaChip icon={BookOpen}>{lessons}</MetaChip>
            <MetaChip icon={Gauge}>{difficulty}</MetaChip>
            {hasCertificate ? (
              <MetaChip icon={Award} emphasis>
                {certificate}
              </MetaChip>
            ) : null}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-5">
            {price ? (
              <p className="text-xl font-semibold tracking-tight text-primary">
                {price}
              </p>
            ) : null}
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
    </article>
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

export { CourseCard };
export type { CourseCardProps };
