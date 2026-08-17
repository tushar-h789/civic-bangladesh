import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Clock, Gauge } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CourseAccess } from "@/data/civic-courses";
import type { CourseTypeKey } from "@/data/course-types";
import { Badge } from "@/components/common/badge";
import { CourseTypeLabel } from "@/components/learning/course-type-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";

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
    <Card
      hoverable
      className={cn(
        "group h-full gap-0 rounded-card py-0 ring-border",
        className,
      )}
    >
      <Link
        href={href}
        className="flex h-full flex-col rounded-card outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-standard group-hover:scale-105"
          />
          <Badge
            variant={access === "free" ? "success" : "warning"}
            className="absolute top-3 left-3 h-6 px-2.5"
          >
            {accessLabel}
          </Badge>
        </div>

        <CardHeader className="gap-2 pt-5">
          {courseType && courseTypeLabel ? (
            <CourseTypeLabel type={courseType} label={courseTypeLabel} />
          ) : null}
          {typePurpose ? (
            <p className="text-xs text-text-secondary">{typePurpose}</p>
          ) : null}
          <CardTitle className="text-lg font-semibold text-balance text-foreground">
            {title}
          </CardTitle>
          <CardDescription className="text-body text-text-secondary">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col pt-2">
          <ul className="mt-auto grid list-none grid-cols-2 gap-x-3 gap-y-2.5 p-0 text-sm text-text-secondary">
            <MetaItem icon={Clock}>{duration}</MetaItem>
            <MetaItem icon={BookOpen}>{lessons}</MetaItem>
            <MetaItem icon={Gauge}>{difficulty}</MetaItem>
            <MetaItem
              icon={Award}
              className={hasCertificate ? "text-success" : undefined}
            >
              {certificate}
            </MetaItem>
          </ul>
        </CardContent>

        <CardFooter
          className={cn(
            "mt-auto gap-3 border-border",
            price ? "justify-between" : undefined,
          )}
        >
          {price ? (
            <span className="text-sm font-semibold text-foreground">{price}</span>
          ) : null}
          <span className="inline-flex h-10 items-center gap-1.5 rounded-btn bg-primary px-4 text-button font-medium text-primary-foreground">
            {cta}
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </CardFooter>
      </Link>
    </Card>
  );
}

function MetaItem({
  icon: Icon,
  children,
  className,
}: {
  icon: typeof Clock;
  children: ReactNode;
  className?: string;
}) {
  return (
    <li className={cn("inline-flex items-center gap-2", className)}>
      <Icon className="size-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

export { CourseCard };
export type { CourseCardProps };
