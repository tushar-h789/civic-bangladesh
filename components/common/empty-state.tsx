import * as React from "react";
import { InboxIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps extends Omit<React.ComponentProps<"div">, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center gap-3 rounded-card border border-dashed border-border bg-background px-6 py-16 text-center",
        className
      )}
      {...props}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-light-green text-primary">
        {icon ?? <InboxIcon className="size-6" />}
      </span>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && <p className="max-w-sm text-sm text-text-secondary">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export { EmptyState };
