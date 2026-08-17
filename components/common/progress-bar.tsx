import * as React from "react";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps extends React.ComponentProps<"div"> {
  value: number;
  max?: number;
  label?: React.ReactNode;
  showValue?: boolean;
}

function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  className,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div data-slot="progress-bar" className={cn("flex flex-col gap-2", className)} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium text-foreground">{label}</span>}
          {showValue && <span className="text-text-secondary">{Math.round(percentage)}%</span>}
        </div>
      )}
      <Progress value={percentage} />
    </div>
  );
}

export { ProgressBar };
