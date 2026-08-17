import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import { OFFICIAL_GOVERNMENT_PORTAL_HREF } from "@/data/government-services";
import { Badge } from "@/components/common/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";

interface CategoryDirectoryCardProps {
  title: string;
  description: string;
  badge: string;
  noGuide: string;
  confirmOfficial: string;
  isBangla?: boolean;
}

function CategoryDirectoryCard({
  title,
  description,
  badge,
  noGuide,
  confirmOfficial,
  isBangla = false,
}: CategoryDirectoryCardProps) {
  return (
    <Card hoverable className="h-full gap-0 rounded-card py-0 ring-border">
      <CardHeader className="gap-3 pt-5">
        <Badge variant="outline" className="h-6 px-2.5">
          {badge}
        </Badge>
        <CardTitle className="text-lg font-semibold text-balance text-foreground">
          {title}
        </CardTitle>
        <CardDescription
          className={cn(
            "text-body text-text-secondary",
            isBangla && "leading-[1.8]",
          )}
        >
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col pt-4">
        <p
          className={cn(
            "rounded-btn bg-light-green px-3 py-2.5 text-sm font-medium text-primary",
            isBangla && "leading-[1.75]",
          )}
        >
          {noGuide}
        </p>
      </CardContent>

      <CardFooter className="mt-auto border-border">
        <a
          href={OFFICIAL_GOVERNMENT_PORTAL_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-1.5 rounded-btn bg-primary px-4 text-button font-medium text-primary-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {confirmOfficial}
          <ExternalLink className="size-4" aria-hidden />
        </a>
      </CardFooter>
    </Card>
  );
}

export { CategoryDirectoryCard };
export type { CategoryDirectoryCardProps };
