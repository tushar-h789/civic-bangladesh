"use client";

import type { ReactNode, SyntheticEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
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
  const dense =
    variant === "compact" ||
    variant === "search-result" ||
    variant === "mobile";
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
      variant={variant === "featured" ? "default" : "outline"}
      className={cn(
        "h-10 rounded-btn text-button",
        variant === "featured" && "text-primary-foreground",
        (variant === "mobile" || variant === "featured") && "w-full sm:w-auto",
      )}
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
        "h-full gap-0 rounded-card py-0 ring-border",
        variant === "compact" && "sm:flex-row sm:items-stretch",
        variant === "featured" && "shadow-card",
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
            "gap-3",
            variant === "featured" ? "pt-6 sm:pt-7" : "pt-5",
            variant === "compact" && "sm:flex-1 sm:pr-4",
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="info" className="h-6 px-2.5">
              {category}
            </Badge>
          </div>
          <CardTitle
            className={cn(
              "font-semibold text-balance text-foreground",
              variant === "featured"
                ? "text-xl sm:text-2xl"
                : "text-lg",
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
          <p className="flex items-start gap-1.5 text-xs text-text-secondary">
            <Landmark className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            <span>
              <span className="font-medium text-foreground/80">
                {t.serviceSource.sourceLabel}:
              </span>{" "}
              {authority}
            </span>
          </p>
          <CardDescription
            className={cn(
              "text-body text-text-secondary",
              dense && "line-clamp-2",
              isBangla && "leading-[1.75]",
            )}
          >
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent
          className={cn(
            "flex flex-1 flex-col gap-3 pt-4",
            variant === "compact" && "sm:max-w-xs sm:justify-center sm:pt-5",
            variant === "featured" && "px-6 sm:px-7",
          )}
        >
          <ul
            className={cn(
              "m-0 grid list-none gap-2 p-0",
              stacked && variant !== "mobile" && "sm:grid-cols-3",
              variant === "compact" && "grid-cols-1",
              variant === "mobile" && "grid-cols-1",
            )}
          >
            {facts.map((fact) => {
              const Icon = fact.icon;

              return (
                <li key={fact.key}>
                  <p className="flex h-full items-start gap-2 rounded-btn bg-light-green px-3 py-2.5">
                    <Icon
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-text-secondary">
                        {fact.label}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block text-sm font-medium text-foreground",
                          isBangla && "leading-[1.7]",
                        )}
                      >
                        {fact.value}
                      </span>
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>

          {course ? (
            <p
              className={cn(
                "mt-auto border-t border-border pt-3 text-xs text-text-secondary",
                isBangla && "leading-[1.7]",
              )}
            >
              {course.label}
              <span aria-hidden> · </span>
              {course.price}
              {course.href ? (
                <>
                  <span aria-hidden> · </span>
                  <Link
                    href={course.href}
                    className="font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {copy.viewCourse}
                  </Link>
                </>
              ) : null}
            </p>
          ) : (
            <div className="mt-auto" />
          )}
        </CardContent>
      </div>

      <CardFooter
        className={cn(
          "mt-auto flex-col items-stretch gap-3 border-border sm:flex-row sm:items-center sm:justify-between",
          variant === "compact" &&
            "sm:w-52 sm:shrink-0 sm:flex-col sm:justify-center sm:border-t-0 sm:border-l",
          variant === "featured" && "px-6 py-5 sm:px-7",
          variant === "mobile" && "flex-col",
        )}
      >
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {copy.cta}
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
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
