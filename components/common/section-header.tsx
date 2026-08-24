import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  actions?: React.ReactNode;
  titleClassName?: string;
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  actions,
  className,
  titleClassName,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        "flex flex-col gap-6",
        align === "left" && actions && "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex flex-col gap-3",
          align === "center" && "items-center text-center"
        )}
      >
        {eyebrow && (
          <span className="text-sm font-semibold tracking-wide text-primary uppercase">
            {eyebrow}
          </span>
        )}
        <h2
          className={cn(
            "text-section-heading text-balance font-semibold text-foreground",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "max-w-2xl text-body text-text-secondary",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
}

export { SectionHeader };
