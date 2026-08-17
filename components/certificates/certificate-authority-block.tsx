import Image from "next/image";

import { cn } from "@/lib/utils";
import type { CertificateIssuingAuthority } from "@/data/certificate-authority";

type AuthorityCopy = {
  name: string;
  role: string;
  statement: string;
  pendingOfficial: string;
  markAlt: string;
};

interface CertificateAuthorityBlockProps {
  config: CertificateIssuingAuthority;
  copy: AuthorityCopy;
  label: string;
  isBangla?: boolean;
  compact?: boolean;
}

/**
 * Configurable issuing-authority area. Swap `CERTIFICATE_ISSUING_AUTHORITY`
 * and locale copy when an officially approved mark is provided.
 * Never renders a government seal unless that approved branding is supplied.
 */
function CertificateAuthorityBlock({
  config,
  copy,
  label,
  isBangla = false,
  compact = false,
}: CertificateAuthorityBlockProps) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-btn bg-light-green ring-1 ring-border",
          compact ? "h-10 w-16 px-1.5" : "h-12 w-20 px-2",
        )}
      >
        {config.markSrc ? (
          <Image
            src={config.markSrc}
            alt={copy.markAlt}
            width={compact ? 72 : 92}
            height={compact ? 14 : 18}
            className="h-auto w-full object-contain"
          />
        ) : (
          <span className="text-[10px] font-medium text-text-secondary">
            {label}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-text-secondary">{label}</p>
        <p
          className={cn(
            "font-semibold text-foreground",
            compact ? "text-sm" : "text-sm",
            isBangla && "leading-tight",
          )}
        >
          {copy.name}
        </p>
        <p className="text-xs text-text-secondary">{copy.role}</p>
        <p
          className={cn(
            "mt-1 text-xs text-text-secondary",
            isBangla && "leading-[1.7]",
          )}
        >
          {config.officialBrandingProvided
            ? copy.statement
            : copy.pendingOfficial}
        </p>
      </div>
    </div>
  );
}

export { CertificateAuthorityBlock };
export type { CertificateAuthorityBlockProps };
