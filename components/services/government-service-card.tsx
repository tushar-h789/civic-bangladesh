"use client";

import type { ReactNode, SyntheticEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  BookOpen,
  Clock,
  ExternalLink,
  FileText,
  Landmark,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { Badge } from "@/components/common/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { Button } from "@/components/ui/button";

export type GovernmentServiceCardVariant =
  | "default"
  | "featured"
  | "compact"
  | "search-result"
  | "mobile";

export type GovernmentServiceCardProps = {
  variant?: GovernmentServiceCardVariant;
  href: string;
  officialHref: string;
  title: string;
  category: ReactNode;
  authority: string;
  description: string;
  documents: string;
  processingTime: string;
  governmentFee: string;
  course?: {
    label: string;
    price: string;
    href?: string;
  } | null;
  className?: string;
  isolateOfficialCta?: boolean;
};

function stopRowSelect(event: SyntheticEvent) {
  event.stopPropagation();
}

function GovernmentServiceCard({
  variant = "default",
  href,
  officialHref,
  title,
  category,
  authority,
  description,
  documents,
  processingTime,
  governmentFee,
  course = null,
  className,
  isolateOfficialCta = false,
}: GovernmentServiceCardProps) {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.services.card;
  const officialNote = t.serviceDetail.officialPortalNote;
  const stacked = variant === "mobile" || variant === "default";
  const officialHandlers = isolateOfficialCta
    ? { onPointerDown: stopRowSelect, onClick: stopRowSelect }
    : undefined;

  const facts = [
    {
      key: "documents",
      icon: FileText,
      label: copy.documentsLabel,
      value: documents,
    },
    {
      key: "time",
      icon: Clock,
      label: copy.processingLabel,
      value: processingTime,
    },
    {
      key: "fee",
      icon: Banknote,
      label: copy.feeLabel,
      value: governmentFee,
    },
  ] as const;

  if (variant === "search-result") {
    return (
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col gap-1.5",
          isBangla && "font-bengali",
          className,
        )}
      >
        <p
          className={cn(
            "text-sm font-medium text-balance text-foreground",
            isBangla && "leading-[1.45]",
          )}
        >
          {title}
        </p>
        <p className="text-xs text-text-secondary">
          {category}
          <span aria-hidden> · </span>
          {authority}
        </p>
        <p
          className={cn(
            "line-clamp-2 text-xs text-text-secondary",
            isBangla && "leading-[1.7]",
          )}
        >
          {description}
        </p>
        <p className="text-xs text-text-secondary">
          {documents}
          <span aria-hidden> · </span>
          {processingTime}
          <span aria-hidden> · </span>
          {governmentFee}
        </p>
        {course ? (
          <p className="text-xs text-text-secondary">
            {course.label}
            <span aria-hidden> · </span>
            {course.price}
          </p>
        ) : null}
        <a
          href={officialHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="search-official-portal-note"
          className="mt-0.5 inline-flex w-fit items-center gap-1 text-xs font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
          {...officialHandlers}
        >
          {copy.applyOfficial}
          <ExternalLink className="size-3" aria-hidden />
        </a>
      </div>
    );
  }

  const officialButton = (
    <Button
      asChild
      variant="outline"
      className="h-11 min-h-11 w-full rounded-btn px-3 text-button sm:flex-1"
    >
      <a
        href={officialHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${copy.applyOfficial}. ${officialNote}`}
        {...officialHandlers}
      >
        {copy.applyOfficial}
        <ExternalLink className="size-4" aria-hidden />
      </a>
    </Button>
  );

  return (
    <Card
      hoverable
      className={cn(
        "h-full gap-0 overflow-hidden rounded-card py-0 ring-border",
        variant === "compact" && "sm:flex-row sm:items-stretch",
        isBangla && "font-bengali",
        className,
      )}
    >
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          variant === "compact" && "sm:flex-row",
        )}
      >
        <CardHeader
          className={cn(
            "gap-2.5",
            variant === "featured" ? "pt-5 sm:pt-6" : "pt-5",
            variant === "compact" && "sm:flex-1 sm:pr-4",
          )}
        >
          <Badge
            variant="info"
            className="h-6 max-w-full self-start truncate px-2.5"
          >
            {category}
          </Badge>
          <CardTitle
            className={cn(
              "font-semibold text-balance text-foreground",
              variant === "featured"
                ? "text-xl sm:text-2xl"
                : "text-lg leading-snug",
              isBangla && "leading-[1.45]",
            )}
          >
            <Link
              href={href}
              className="outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {title}
            </Link>
          </CardTitle>
          <p className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Landmark className="size-3.5 shrink-0 text-primary" aria-hidden />
            <span className="min-w-0 truncate">
              <span className="font-medium text-foreground">
                {t.serviceSource.sourceLabel}:
              </span>{" "}
              {authority}
            </span>
          </p>
          <CardDescription
            className={cn(
              "line-clamp-2 text-sm text-text-secondary sm:text-body",
              isBangla && "leading-[1.75]",
            )}
          >
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent
          className={cn(
            "flex flex-1 flex-col gap-3 pt-1 pb-1",
            variant === "compact" && "sm:max-w-xs sm:justify-center sm:pt-4",
            variant === "featured" && "px-6 sm:px-7",
          )}
        >
          <ul
            className={cn(
              "m-0 grid list-none gap-2 p-0",
              stacked && variant !== "mobile" && "grid-cols-1 sm:grid-cols-3",
              variant === "compact" && "grid-cols-1",
              variant === "mobile" && "grid-cols-1",
            )}
          >
            {facts.map((fact) => {
              const Icon = fact.icon;
              const isFee = fact.key === "fee";

              return (
                <li key={fact.key} className="min-w-0">
                  <div className="flex h-full flex-col gap-2 rounded-btn bg-background p-3 ring-1 ring-border">
                    <span className="flex size-8 items-center justify-center rounded-btn bg-light-green text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-text-secondary">
                        {fact.label}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block text-sm font-semibold text-foreground",
                          isBangla && "leading-[1.45]",
                        )}
                      >
                        {fact.value}
                      </span>
                      {isFee ? (
                        <span className="mt-1 block text-xs text-text-secondary">
                          {copy.feeConfirm}
                        </span>
                      ) : null}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {course ? (
            <Link
              href={course.href ?? href}
              className={cn(
                "mt-auto flex items-center gap-3 rounded-btn bg-light-green px-3 py-2.5 text-sm outline-none ring-1 ring-primary/10 transition-colors hover:bg-light-green/80 focus-visible:ring-3 focus-visible:ring-ring/50",
                isBangla && "leading-normal",
              )}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-btn bg-surface text-primary">
                <BookOpen className="size-4" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-primary">
                  {course.label}
                </span>
                <span className="block text-text-secondary">
                  {course.price}
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 font-medium text-primary">
                {copy.viewCourse}
                <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </Link>
          ) : (
            <div className="mt-auto" />
          )}
        </CardContent>
      </div>

      <CardFooter
        className={cn(
          "mt-auto flex-col items-stretch gap-2 border-border bg-surface py-4 sm:flex-row sm:items-stretch",
          variant === "compact" &&
            "sm:w-52 sm:shrink-0 sm:flex-col sm:justify-center sm:border-t-0 sm:border-l",
          variant === "featured" && "px-6 py-4 sm:px-7",
          variant === "mobile" && "flex-col",
        )}
      >
        <Button
          asChild
          className="h-11 min-h-11 w-full rounded-btn text-button text-primary-foreground sm:flex-1"
        >
          <Link href={href}>
            {copy.cta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
        {officialButton}
      </CardFooter>
    </Card>
  );
}

export { GovernmentServiceCard };

function GovernmentServiceCardFromModel({
  model,
  variant = "default",
  className,
  isolateOfficialCta = false,
}: {
  model: {
    href: string;
    officialHref: string;
    title: string;
    category: string;
    categoryHref: string;
    authority: string;
    description: string;
    documents: string;
    processingTime: string;
    governmentFee: string;
    course: GovernmentServiceCardProps["course"];
  };
  variant?: GovernmentServiceCardVariant;
  className?: string;
  isolateOfficialCta?: boolean;
}) {
  return (
    <GovernmentServiceCard
      variant={variant}
      href={model.href}
      officialHref={model.officialHref}
      title={model.title}
      category={
        variant === "search-result" ? (
          model.category
        ) : (
          <Link
            href={model.categoryHref}
            className="outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {model.category}
          </Link>
        )
      }
      authority={model.authority}
      description={model.description}
      documents={model.documents}
      processingTime={model.processingTime}
      governmentFee={model.governmentFee}
      course={model.course}
      className={className}
      isolateOfficialCta={isolateOfficialCta}
    />
  );
}

export { GovernmentServiceCardFromModel };
