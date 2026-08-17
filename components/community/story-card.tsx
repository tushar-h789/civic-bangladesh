import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/common/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";

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
    <Card
      hoverable
      className={cn(
        "group h-full gap-0 rounded-card py-0 ring-border",
        className,
      )}
    >
      <Link
        href={href}
        className="flex h-full flex-col rounded-card outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-standard group-hover:scale-105"
          />
          <Badge variant="info" className="absolute top-3 left-3 h-6 px-2.5">
            {kind}
          </Badge>
        </div>

        <CardHeader className="gap-2 pt-5">
          <CardTitle className="text-lg font-semibold text-balance text-foreground">
            {title}
          </CardTitle>
          <CardDescription className="text-body text-text-secondary">
            {excerpt}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-auto pt-2">
          <p className="text-sm text-text-secondary">{byline}</p>
        </CardContent>

        <CardFooter className="mt-auto justify-between gap-3 border-border">
          <span className="inline-flex h-10 items-center gap-1.5 rounded-btn bg-primary px-4 text-button font-medium text-primary-foreground">
            {cta}
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </CardFooter>
      </Link>
    </Card>
  );
}

export { StoryCard };
export type { StoryCardProps };
