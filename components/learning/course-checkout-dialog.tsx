"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { learnCourseHref } from "@/data/civic-courses";
import type { CatalogCourse } from "@/data/course-catalog";
import { useTranslation } from "@/hooks/use-translation";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

interface CourseCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: CatalogCourse;
  title: string;
  imageAlt: string;
  priceLabel: string;
}

function CourseCheckoutDialog({
  open,
  onOpenChange,
  course,
  title,
  imageAlt,
  priceLabel,
}: CourseCheckoutDialogProps) {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.courseCheckout;
  const isFree = course.priceBdt == null;
  const [opening, setOpening] = React.useState(false);

  function handleOpenChange(next: boolean) {
    if (!next) setOpening(false);
    onOpenChange(next);
  }

  function openLessons() {
    setOpening(true);
    router.push(learnCourseHref(course.slug));
  }

  const includes = [
    formatTemplate(copy.lessons, { count: course.lessons }),
    copy.quiz,
    copy.assessment,
    course.hasCertificate ? copy.certificate : copy.noCertificate,
  ];

  const notIncluded = [
    copy.notIncluded.governmentFee,
    copy.notIncluded.officialClass,
    copy.notIncluded.portal,
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={!opening}
        aria-busy={opening}
        className={cn(
          "max-h-[min(92vh,44rem)] gap-0 overflow-y-auto rounded-card bg-surface p-0 sm:max-w-lg",
          isBangla && "font-bengali",
        )}
      >
        <DialogHeader className="gap-3 border-b border-border px-5 py-5 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 pr-8">
            <Badge variant="info" className="h-6 px-2.5">
              {copy.sampleBadge}
            </Badge>
          </div>
          <DialogTitle className="text-xl font-semibold text-balance text-foreground">
            {isFree ? copy.freeTitle : copy.title}
          </DialogTitle>
          <DialogDescription
            className={cn(
              "text-sm text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            {isFree ? copy.freeDescription : copy.description}
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-5 px-5 py-5 sm:px-6"
          onSubmit={(event) => {
            event.preventDefault();
            openLessons();
          }}
        >
          <div className="overflow-hidden rounded-card ring-1 ring-border">
            <div className="flex gap-3 bg-background p-3">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-btn sm:size-20">
                <Image
                  src={course.image}
                  alt={imageAlt}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1 py-0.5">
                <p className="text-xs font-medium text-text-secondary">
                  {copy.order}
                </p>
                <p
                  className={cn(
                    "mt-1 text-sm font-semibold text-balance text-foreground",
                    isBangla && "leading-[1.55]",
                  )}
                >
                  {title}
                </p>
              </div>
            </div>
            <dl className="m-0 grid gap-2 border-t border-border bg-surface px-4 py-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-text-secondary">{copy.fee}</dt>
                <dd className="m-0 text-right font-semibold text-foreground">
                  {priceLabel}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-text-secondary">{copy.notCharged}</dt>
                <dd className="m-0 text-right text-foreground">
                  {copy.chargedHere}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">
              {copy.includesTitle}
            </p>
            <ul className="mt-3 m-0 flex list-none flex-col gap-2 p-0">
              {includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span className={cn(isBangla && "leading-[1.75]")}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">
              {copy.notIncludedTitle}
            </p>
            <ul className="mt-3 m-0 flex list-none flex-col gap-2 p-0">
              {notIncluded.map((item) => (
                <li
                  key={item}
                  className="text-sm text-text-secondary"
                >
                  <span className={cn(isBangla && "leading-[1.75]")}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p
            className={cn(
              "text-sm text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            {copy.philosophy}
          </p>

          <p
            className={cn(
              "flex gap-2 rounded-btn bg-light-green p-3 text-sm text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <span>{copy.sampleNote}</span>
          </p>

          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={ROUTES.pricing}
              className="text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {copy.pricingCta}
            </Link>
            <Button
              type="submit"
              disabled={opening}
              className="h-11 rounded-btn px-5 text-button text-primary-foreground"
            >
              {opening
                ? copy.opening
                : isFree
                  ? copy.startFree
                  : copy.openLessons}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { CourseCheckoutDialog };
export type { CourseCheckoutDialogProps };
