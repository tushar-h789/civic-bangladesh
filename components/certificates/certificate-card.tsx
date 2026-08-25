import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";

import { cn } from "@/lib/utils";
import { certificateHref } from "@/data/certificates";
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
    <article className="group flex h-full flex-col overflow-hidden rounded-card bg-background ring-1 ring-border">
      <Link
        href={href}
        className="flex h-full cursor-pointer flex-col outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div className="relative flex aspect-16/10 flex-col items-center justify-center gap-2 overflow-hidden bg-light-green px-4 text-center">
          <span className="absolute top-3 left-3 rounded-btn bg-white/90 px-2 py-0.5 text-xs font-semibold text-primary">
            {copy.document.sampleBadge}
          </span>
          <span className="flex size-10 items-center justify-center rounded-full bg-surface text-primary ring-1 ring-border">
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
        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <h3
            className={cn(
              "text-base font-semibold text-balance text-foreground",
              isBangla && "leading-[1.45]",
            )}
          >
            {view.courseTitle}
          </h3>
          <p className="text-xs text-text-secondary">
            {view.relatedServiceTitle ?? copy.card.civicCourse}
          </p>
          <p
            className={cn(
              "text-sm text-text-secondary",
              isBangla && "leading-[1.7]",
            )}
          >
            {formatTemplate(copy.list.earnedOn, {
              date: view.completedOnLabel,
            })}
          </p>
          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary">
            {copy.list.cta}
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}

export { CertificateCard };
export type { CertificateCardProps };
