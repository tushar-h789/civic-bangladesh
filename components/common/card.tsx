import * as React from "react";

import { cn } from "@/lib/utils";
import { Card as BaseCard } from "@/components/ui/card";

interface CardProps extends React.ComponentProps<typeof BaseCard> {
  /** Adds the DESIGN_RULES.md card shadow on hover, for clickable/interactive cards. */
  hoverable?: boolean;
}

function Card({ hoverable = false, className, ...props }: CardProps) {
  return (
    <BaseCard
      className={cn(
        hoverable &&
          "shadow-card transition-shadow duration-200 ease-standard hover:shadow-card-hover",
        className
      )}
      {...props}
    />
  );
}

export { Card };
export {
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
