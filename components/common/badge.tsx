import * as React from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Badge as BaseBadge, badgeVariants } from "@/components/ui/badge";

type BaseBadgeProps = React.ComponentProps<typeof BaseBadge>;
type BaseVariant = VariantProps<typeof badgeVariants>["variant"];
type CivicVariant = "success" | "warning" | "info";

interface BadgeProps extends Omit<BaseBadgeProps, "variant"> {
  variant?: BaseVariant | CivicVariant;
}

// Civic Bangladesh status variants, mapped onto DESIGN_RULES.md tokens.
// Not part of the base shadcn Badge since these are product-specific
// (course/challenge status, verification state, etc.) rather than
// generic UI variants.
const civicVariantClassName: Record<CivicVariant, string> = {
  success: "bg-success/10 text-success [a]:hover:bg-success/20",
  warning: "bg-warning/10 text-warning [a]:hover:bg-warning/20",
  info: "bg-light-green text-primary [a]:hover:bg-light-green/80",
};

function Badge({ variant = "default", className, ...props }: BadgeProps) {
  if (variant === "success" || variant === "warning" || variant === "info") {
    return (
      <BaseBadge
        variant="outline"
        className={cn("border-transparent", civicVariantClassName[variant], className)}
        {...props}
      />
    );
  }

  return <BaseBadge variant={variant} className={className} {...props} />;
}

export { Badge };
