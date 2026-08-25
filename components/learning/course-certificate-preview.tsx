import { Award } from "lucide-react";

import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/layout/brand-logo";

interface CourseCertificatePreviewProps {
  courseTitle: string;
  copy: {
    sampleBadge: string;
    previewEyebrow: string;
    heading: string;
    awardedTo: string;
    sampleName: string;
    courseLabel: string;
    issuer: string;
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
    <figure className="relative overflow-hidden rounded-card bg-background ring-1 ring-border">
      <span className="absolute top-3 right-3 rounded-btn bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
        {copy.sampleBadge}
      </span>
      <div className="border-b-4 border-primary px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <BrandLogo alt={logoAlt} height={24} />
          <p className="text-xs font-semibold text-primary">
            {copy.previewEyebrow}
          </p>
          <span className="flex size-10 items-center justify-center rounded-btn bg-light-green text-primary">
            <Award className="size-5" aria-hidden />
          </span>
          <h3 className="text-xl font-semibold text-balance text-foreground sm:text-2xl">
            {copy.heading}
          </h3>
          <p className="text-sm text-text-secondary">{copy.awardedTo}</p>
          <p
            className={cn(
              "text-lg font-semibold text-foreground",
              isBangla && "leading-tight",
            )}
          >
            {copy.sampleName}
          </p>
          <div className="h-px w-16 bg-border" aria-hidden />
          <p className="text-xs font-medium text-text-secondary">
            {copy.courseLabel}
          </p>
          <p
            className={cn(
              "max-w-md text-sm font-semibold text-balance text-foreground",
              isBangla && "leading-[1.7]",
            )}
          >
            {courseTitle}
          </p>
          <p
            className={cn(
              "max-w-sm text-xs text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            {copy.issuer}
          </p>
        </div>
      </div>
    </figure>
  );
}

export { CourseCertificatePreview };
export type { CourseCertificatePreviewProps };
