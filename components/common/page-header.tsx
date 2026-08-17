import * as React from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
}

function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn("flex flex-col gap-4 border-b border-border pb-6", className)}
      {...props}
    >
      {breadcrumb}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          {eyebrow && (
            <span className="text-sm font-semibold tracking-wide text-primary uppercase">
              {eyebrow}
            </span>
          )}
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">{title}</h1>
          {description && (
            <p className="max-w-2xl text-body text-text-secondary">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>
        )}
      </div>
    </div>
  );
}

export { PageHeader };
