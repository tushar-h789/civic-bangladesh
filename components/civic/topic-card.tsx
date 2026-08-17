import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type TopicCardVariant = "tall" | "wide" | "standard";

interface TopicCardProps {
  href: string;
  image: string;
  imageAlt: string;
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  lessonCount: ReactNode;
  cta: ReactNode;
  index?: string;
  variant?: TopicCardVariant;
  className?: string;
}

function TopicCard({
  href,
  image,
  imageAlt,
  icon,
  title,
  description,
  lessonCount,
  cta,
  index,
  variant = "standard",
  className,
}: TopicCardProps) {
  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-card shadow-card ring-1 ring-border",
        variant === "tall" && "min-h-112 sm:min-h-128",
        variant === "wide" && "min-h-80 sm:min-h-96",
        variant === "standard" && "min-h-96",
        className,
      )}
    >
      <Link href={href} className="absolute inset-0 outline-none">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes={
            variant === "wide"
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-700 ease-standard group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-text via-text/55 to-text/15"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <span className="flex size-11 items-center justify-center rounded-btn bg-white/15 text-white">
              {icon}
            </span>
            {index && (
              <span className="text-sm font-semibold text-white/75">{index}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h3
              className={cn(
                "font-semibold text-balance text-white",
                variant === "wide" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
              )}
            >
              {title}
            </h3>
            <p className="max-w-md text-body text-white/80">{description}</p>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-white/70">{lessonCount}</p>
              <span className="inline-flex h-10 items-center gap-1.5 rounded-btn bg-white px-4 text-button font-medium text-primary">
                {cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export { TopicCard };
export type { TopicCardProps, TopicCardVariant };
