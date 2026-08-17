"use client";

import { Clock, ExternalLink, Landmark } from "lucide-react";

import { cn } from "@/lib/utils";
import { OFFICIAL_GOVERNMENT_PORTAL_HREF } from "@/data/government-services";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function formatOfficialDate(iso: string, locale: "en" | "bn") {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(
    locale === "bn" ? "bn-BD" : "en-GB",
    { day: "numeric", month: "short", year: "numeric" },
  );
}

interface ServiceInformationSourceProps {
  verifiedAuthorityName?: string | null;
  lastUpdated?: string | null;
  href?: string;
  className?: string;
}

function ServiceInformationSource({
  verifiedAuthorityName = null,
  lastUpdated = null,
  href = OFFICIAL_GOVERNMENT_PORTAL_HREF,
  className,
}: ServiceInformationSourceProps) {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.serviceSource;
  const sourceName = verifiedAuthorityName?.trim()
    ? verifiedAuthorityName
    : copy.portalName;
  const noteId = "service-information-source-note";

  return (
    <aside
      id="information-source"
      aria-labelledby="information-source-heading"
      className={cn(
        "scroll-mt-28 rounded-card bg-surface p-6 shadow-card ring-1 ring-border",
        className,
      )}
    >
      <p
        id="information-source-heading"
        className="text-sm font-semibold text-primary"
      >
        {copy.title}
      </p>

      <dl className="mt-5 flex flex-col gap-5">
        <div>
          <dt className="flex items-center gap-2 text-sm font-medium text-text-secondary">
            <Landmark className="size-4 text-primary" aria-hidden />
            {copy.sourceLabel}
          </dt>
          <dd
            className={cn(
              "mt-2 text-base font-semibold text-foreground",
              isBangla && "leading-[1.45]",
            )}
          >
            {sourceName}
          </dd>
        </div>
        {lastUpdated ? (
          <div>
            <dt className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Clock className="size-4 text-primary" aria-hidden />
              {copy.lastUpdatedLabel}
            </dt>
            <dd className="mt-2 text-sm text-foreground">
              {formatTemplate(copy.lastUpdatedValue, {
                date: formatOfficialDate(lastUpdated, locale),
              })}
            </dd>
          </div>
        ) : null}
      </dl>

      <p
        className={cn(
          "mt-5 text-sm text-text-secondary",
          isBangla && "leading-[1.75]",
        )}
      >
        {copy.notAuthority}
      </p>
      <p
        id={noteId}
        className={cn(
          "mt-2 text-xs text-text-secondary",
          isBangla && "leading-[1.75]",
        )}
      >
        {copy.note}
      </p>

      <Button asChild variant="outline" className="mt-5 h-11 w-full rounded-btn">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby={noteId}
        >
          {copy.viewOfficial}
          <ExternalLink className="size-4" aria-hidden />
        </a>
      </Button>
    </aside>
  );
}

export { ServiceInformationSource };
export type { ServiceInformationSourceProps };
