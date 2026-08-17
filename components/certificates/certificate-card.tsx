import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";

import { cn } from "@/lib/utils";
import { certificateHref } from "@/data/certificates";
import { Badge } from "@/components/common/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import type { CertificateView } from "@/lib/get-certificate-view";
import type { Dictionary } from "@/locales";

interface CertificateCardProps {
  view: CertificateView;
  copy: Dictionary["certificates"];
  isBangla?: boolean;
}

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function CertificateCard({
  view,
  copy,
  isBangla = false,
}: CertificateCardProps) {
  const href = certificateHref(view.entry.id);

  return (
    <Card hoverable className="h-full gap-0 rounded-card py-0 ring-border">
      <Link
        href={href}
        className="block overflow-hidden rounded-t-card bg-primary p-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div className="flex aspect-16/10 flex-col items-center justify-center gap-2 bg-surface px-4 text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-light-green text-primary">
            <Award className="size-5" aria-hidden />
          </span>
          <p
            className={cn(
              "text-[11px] font-semibold text-primary",
              !isBangla && "tracking-wide uppercase",
            )}
          >
            {copy.document.credential}
          </p>
          <p
            className={cn(
              "line-clamp-2 text-sm font-semibold text-balance text-foreground",
              isBangla && "leading-[1.55]",
            )}
          >
            {view.learnerName}
          </p>
        </div>
      </Link>

      <CardHeader className="gap-2 pt-5">
        <Badge variant="info" className="h-6 w-fit px-2.5">
          {copy.document.sampleBadge}
        </Badge>
        <CardTitle className="text-lg font-semibold text-balance text-foreground">
          <Link
            href={href}
            className="outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {view.courseTitle}
          </Link>
        </CardTitle>
        <p className="text-xs text-text-secondary">
          {view.relatedServiceTitle ?? copy.card.civicCourse}
        </p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-1.5 pt-1 text-sm text-text-secondary">
        <p>
          {formatTemplate(copy.list.earnedOn, { date: view.completedOnLabel })}
        </p>
        <p className="break-all text-xs tracking-wide">{view.entry.id}</p>
      </CardContent>

      <CardFooter className="mt-auto justify-end border-border">
        <Link
          href={href}
          className="inline-flex h-10 items-center gap-1.5 rounded-btn bg-primary px-4 text-button font-medium text-primary-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {copy.list.cta}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </CardFooter>
    </Card>
  );
}

export { CertificateCard };
export type { CertificateCardProps };
