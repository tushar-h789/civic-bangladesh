import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/common/progress-bar";

interface CampaignCardProps {
  href: string;
  image: string;
  imageAlt: string;
  title: ReactNode;
  location: ReactNode;
  participants: ReactNode;
  progress: number;
  progressLabel: ReactNode;
  cta: ReactNode;
  className?: string;
}

function CampaignCard({
  href,
  image,
  imageAlt,
  title,
  location,
  participants,
  progress,
  progressLabel,
  cta,
  className,
}: CampaignCardProps) {
  return (
    <article
      className={cn(
        "group h-full overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border transition-shadow duration-200 ease-standard hover:shadow-card-hover",
        className,
      )}
    >
      <Link
        href={href}
        className="flex h-full cursor-pointer flex-col outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-standard group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-text/60 via-text/15 to-transparent"
          />
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-btn bg-surface px-3 py-1.5 text-sm font-semibold text-primary ring-1 ring-border">
            <MapPin className="size-3.5 shrink-0" aria-hidden />
            {location}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-balance text-foreground sm:text-xl">
            {title}
          </h3>

          <p className="mt-3 inline-flex items-center gap-2 text-body text-text-secondary">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
              <Users className="size-4" aria-hidden />
            </span>
            {participants}
          </p>

          <div className="mt-4">
            <ProgressBar
              value={progress}
              label={progressLabel}
              showValue={false}
            />
          </div>

          <div className="mt-auto pt-5">
            <span className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-btn bg-primary px-4 text-button font-medium text-primary-foreground">
              {cta}
              <ArrowRight
                className="size-4 transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export { CampaignCard };
export type { CampaignCardProps };
