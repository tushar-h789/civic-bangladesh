import * as React from "react";

import { cn } from "@/lib/utils";

interface ProgressRingProps extends React.ComponentProps<"div"> {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  label?: React.ReactNode;
}

function ProgressRing({
  value,
  max = 100,
  size = 96,
  strokeWidth = 8,
  showValue = true,
  label,
  children,
  className,
  ...props
}: ProgressRingProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      data-slot="progress-ring"
      role="meter"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-primary transition-[stroke-dashoffset] duration-500 ease-standard"
        />
      </svg>
      {(children || showValue || label) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          {children ?? (
            <>
              {showValue && (
                <span className="text-lg font-semibold text-foreground">
                  {Math.round(percentage)}%
                </span>
              )}
              {label && (
                <span className="text-xs text-text-secondary">{label}</span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export { ProgressRing };
