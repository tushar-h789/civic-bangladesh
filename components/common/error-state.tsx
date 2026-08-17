import * as React from "react";
import { AlertTriangleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ErrorStateProps extends Omit<React.ComponentProps<"div">, "title"> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  action?: React.ReactNode;
}

function ErrorState({
  icon,
  title = "Something went wrong",
  description = "Please try again in a moment.",
  onRetry,
  retryLabel = "Try again",
  action,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      data-slot="error-state"
      className={cn(
        "flex flex-col items-center gap-3 rounded-card border border-border bg-background px-6 py-16 text-center",
        className
      )}
      {...props}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-error/10 text-error">
        {icon ?? <AlertTriangleIcon className="size-6" />}
      </span>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && <p className="max-w-sm text-sm text-text-secondary">{description}</p>}
      {(onRetry || action) && (
        <div className="mt-2 flex items-center gap-3">
          {onRetry && (
            <Button variant="outline" onClick={onRetry}>
              {retryLabel}
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  );
}

export { ErrorState };
