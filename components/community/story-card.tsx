import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/common/badge";

interface StoryCardProps {
  href: string;
  image: string;
  imageAlt: string;
  kind: ReactNode;
  title: ReactNode;
  excerpt: ReactNode;
  byline: ReactNode;
  cta: ReactNode;
  className?: string;
}

function StoryCard({
  href,
  image,
  imageAlt,
  kind,
  title,
  excerpt,
  byline,
  cta,
  className,
}: StoryCardProps) {
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
            className="absolute inset-0 bg-linear-to-t from-text/55 via-text/10 to-transparent"
          />
          <Badge
            variant="info"
            className="absolute top-3 left-3 h-7 bg-surface px-2.5 font-semibold text-primary ring-1 ring-border"
          >
            {kind}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-balance text-foreground sm:text-xl">
            {title}
          </h3>
          <p className="mt-2 line-clamp-3 text-body text-text-secondary">
            {excerpt}
          </p>
          <p className="mt-3 text-base text-text-secondary">{byline}</p>
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

export { StoryCard };
export type { StoryCardProps };
