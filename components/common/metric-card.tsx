import * as React from "react";
import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/common/card";

interface MetricCardTrend {
  direction: "up" | "down" | "neutral";
  value: string;
}

interface MetricCardProps extends React.ComponentProps<"div"> {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: React.ReactNode;
  trend?: MetricCardTrend;
  description?: React.ReactNode;
}

const trendConfig = {
  up: { icon: TrendingUpIcon, className: "text-success" },
  down: { icon: TrendingDownIcon, className: "text-error" },
  neutral: { icon: MinusIcon, className: "text-text-secondary" },
} as const;

function MetricCard({
  label,
  value,
  icon,
  trend,
  description,
  className,
  ...props
}: MetricCardProps) {
  return (
    <Card className={cn("h-full", className)} {...props}>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-text-secondary">{label}</span>
          {icon && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
              {icon}
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-foreground">{value}</span>
          {trend && <MetricTrend trend={trend} />}
        </div>
        {description && <p className="text-sm text-text-secondary">{description}</p>}
      </CardContent>
    </Card>
  );
}

function MetricTrend({ trend }: { trend: MetricCardTrend }) {
  const { icon: Icon, className } = trendConfig[trend.direction];

  return (
    <span className={cn("inline-flex items-center gap-0.5 text-xs font-medium", className)}>
      <Icon className="size-3.5" />
      {trend.value}
    </span>
  );
}

export { MetricCard };
