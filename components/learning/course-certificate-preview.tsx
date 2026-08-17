import { Award } from "lucide-react";

import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/layout/brand-logo";

interface CourseCertificatePreviewProps {
  courseTitle: string;
  copy: {
    previewEyebrow: string;
    heading: string;
    awardedTo: string;
    sampleName: string;
    courseLabel: string;
    issuer: string;
    notGovernment: string;
  };
  logoAlt: string;
  isBangla?: boolean;
}

function CourseCertificatePreview({
  courseTitle,
  copy,
  logoAlt,
  isBangla = false,
}: CourseCertificatePreviewProps) {
  return (
    <figure className="mx-auto w-full max-w-3xl">
      <div className="rounded-card bg-primary p-1.5 shadow-card sm:p-2">
        <div className="rounded-[14px] bg-surface px-6 py-8 sm:px-10 sm:py-12">
          <div className="flex flex-col items-center gap-5 text-center">
            <BrandLogo alt={logoAlt} height={28} />
            <p
              className={cn(
                "text-xs font-semibold text-primary",
                !isBangla && "tracking-wide uppercase",
              )}
            >
              {copy.previewEyebrow}
            </p>
            <div className="flex size-12 items-center justify-center rounded-full bg-light-green text-primary">
              <Award className="size-6" aria-hidden />
            </div>
            <h3 className="text-2xl font-semibold text-balance text-foreground sm:text-3xl">
              {copy.heading}
            </h3>
            <p className="text-sm text-text-secondary">{copy.awardedTo}</p>
            <p
              className={cn(
                "text-xl font-semibold text-foreground",
                isBangla && "leading-tight",
              )}
            >
              {copy.sampleName}
            </p>
            <div className="h-px w-24 bg-border" aria-hidden />
            <p className="text-xs font-medium text-text-secondary">
              {copy.courseLabel}
            </p>
            <p
              className={cn(
                "max-w-lg text-base font-semibold text-balance text-foreground",
                isBangla && "leading-[1.7]",
              )}
            >
              {courseTitle}
            </p>
            <p
              className={cn(
                "max-w-md text-sm text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.issuer}
            </p>
          </div>
        </div>
      </div>
      <figcaption
        className={cn(
          "mt-4 text-center text-sm text-text-secondary",
          isBangla && "leading-[1.75]",
        )}
      >
        {copy.notGovernment}
      </figcaption>
    </figure>
  );
}

export { CourseCertificatePreview };
export type { CourseCertificatePreviewProps };
