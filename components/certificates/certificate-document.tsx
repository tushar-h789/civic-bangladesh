import { Award } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/common/badge";
import { CertificateAuthorityBlock } from "@/components/certificates/certificate-authority-block";
import type { CertificateView } from "@/lib/get-certificate-view";
import type { Dictionary } from "@/locales";

const QR_CELLS = [
  1, 1, 1, 1, 0, 1, 1,
  1, 0, 0, 1, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1,
  1, 1, 0, 1, 0, 1, 1,
  0, 1, 1, 0, 1, 0, 0,
  1, 0, 1, 1, 0, 1, 1,
  1, 1, 0, 1, 1, 0, 1,
] as const;

interface CertificateDocumentProps {
  view: CertificateView;
  copy: Dictionary["certificates"];
  isBangla?: boolean;
}

function CertificateDocument({
  view,
  copy,
  isBangla = false,
}: CertificateDocumentProps) {
  return (
    <figure className="w-full">
      <article className="relative overflow-hidden rounded-card bg-primary p-1 shadow-card">
        <div className="relative bg-surface px-5 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 rounded-[14px] ring-1 ring-primary/20"
          />
          <Corner className="top-5 left-5 border-t-2 border-l-2" />
          <Corner className="top-5 right-5 border-t-2 border-r-2" />
          <Corner className="bottom-5 left-5 border-b-2 border-l-2" />
          <Corner className="right-5 bottom-5 border-r-2 border-b-2" />

          <div className="relative flex flex-col gap-8">
            <header className="flex flex-col items-center gap-3 text-center">
              <Badge variant="info" className="h-6 px-2.5">
                {copy.document.sampleBadge}
              </Badge>
              <p
                className={cn(
                  "text-xs font-semibold text-primary",
                  !isBangla && "tracking-[0.18em] uppercase",
                )}
              >
                {copy.document.credential}
              </p>
              <span className="flex size-12 items-center justify-center rounded-full bg-light-green text-primary">
                <Award className="size-6" aria-hidden />
              </span>
              <h2
                className={cn(
                  "text-2xl font-semibold text-balance text-foreground sm:text-3xl lg:text-4xl",
                  isBangla && "leading-tight",
                )}
              >
                {copy.document.heading}
              </h2>
            </header>

            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-sm text-text-secondary">
                {copy.document.awardedTo}
              </p>
              <p
                className={cn(
                  "text-2xl font-semibold text-foreground sm:text-3xl",
                  isBangla && "leading-tight",
                )}
              >
                {view.learnerName}
              </p>
              <div className="mt-2 h-px w-24 bg-border" aria-hidden />
              <p className="mt-2 max-w-xl text-sm text-text-secondary">
                {copy.document.completed}
              </p>
              <p
                className={cn(
                  "max-w-2xl text-lg font-semibold text-balance text-foreground sm:text-xl",
                  isBangla && "leading-[1.55]",
                )}
              >
                {view.courseTitle}
              </p>
              {view.relatedServiceTitle ? (
                <p
                  className={cn(
                    "max-w-xl text-sm text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {copy.document.relatedPrefix}: {view.relatedServiceTitle}
                </p>
              ) : null}
            </div>

            <dl className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
              <Meta
                label={copy.detail.completedOn}
                value={view.completedOnLabel}
              />
              <Meta
                label={copy.detail.certificateId}
                value={view.entry.id}
                mono
              />
              <Meta
                label={copy.detail.verification}
                value={view.verification.label}
              />
            </dl>

            <div className="grid items-end gap-6 border-t border-border pt-6 sm:grid-cols-[minmax(0,1fr)_auto]">
              <CertificateAuthorityBlock
                config={view.authorityConfig}
                copy={view.authorityCopy}
                label={copy.authority.label}
                isBangla={isBangla}
              />
              <QrPlaceholder
                label={copy.qr.label}
                placeholder={copy.qr.placeholder}
              />
            </div>
          </div>
        </div>
      </article>
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

function Meta({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs font-medium text-text-secondary">{label}</dt>
      <dd
        className={cn(
          "mt-1 text-sm font-semibold text-foreground",
          mono && "break-all tracking-wide",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute size-7 border-primary", className)}
    />
  );
}

function QrPlaceholder({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="justify-self-start sm:justify-self-end">
      <p className="mb-1.5 text-center text-[11px] font-medium text-text-secondary">
        {label}
      </p>
      <div
        className="relative flex size-28 flex-col items-center justify-center rounded-btn bg-background p-2 ring-1 ring-dashed ring-border"
        aria-hidden
      >
        <div className="grid size-full grid-cols-7 grid-rows-7 gap-px opacity-40">
          {QR_CELLS.map((cell, index) => (
            <span
              key={index}
              className={cn("rounded-[1px]", cell ? "bg-text" : "bg-transparent")}
            />
          ))}
        </div>
        <span className="absolute inset-x-2 bottom-1.5 text-center text-[9px] font-medium text-text-secondary">
          {placeholder}
        </span>
      </div>
    </div>
  );
}

export { CertificateDocument };
export type { CertificateDocumentProps };
