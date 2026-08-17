import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
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
    <Card
      hoverable
      className={cn(
        "group h-full gap-0 rounded-card py-0 ring-border",
        className,
      )}
    >
      <Link
        href={href}
        className="flex flex-1 flex-col rounded-t-card outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-standard group-hover:scale-105"
          />
        </div>

        <CardHeader className="gap-3 pt-5">
          <CardTitle className="text-lg font-semibold text-balance text-foreground">
            {title}
          </CardTitle>
          <p className="inline-flex items-center gap-2 text-sm text-text-secondary">
            <MapPin className="size-4 shrink-0" aria-hidden />
            {location}
          </p>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-4 pt-2">
          <p className="inline-flex items-center gap-2 text-sm text-text-secondary">
            <Users className="size-4 shrink-0" aria-hidden />
            {participants}
          </p>
        </CardContent>
      </Link>

      <CardContent className="pt-0">
        <ProgressBar
          value={progress}
          label={progressLabel}
          showValue={false}
        />
      </CardContent>

      <CardFooter className="mt-auto border-border">
        <Link
          href={href}
          className="inline-flex h-10 items-center gap-1.5 rounded-btn bg-primary px-4 text-button font-medium text-primary-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {cta}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </CardFooter>
    </Card>
  );
}

export { CampaignCard };
export type { CampaignCardProps };
