import * as React from "react";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FilterBarProps extends React.ComponentProps<"div"> {
  search?: React.ReactNode;
  activeCount?: number;
  onClearAll?: () => void;
  clearLabel?: string;
}

function FilterBar({
  search,
  activeCount = 0,
  onClearAll,
  clearLabel = "Clear filters",
  children,
  className,
  ...props
}: FilterBarProps) {
  return (
    <div
      data-slot="filter-bar"
      className={cn(
        "flex flex-col gap-3 rounded-card border border-border bg-card p-3 sm:flex-row sm:flex-wrap sm:items-center",
        className
      )}
      {...props}
    >
      {search && <div className="w-full sm:w-64">{search}</div>}
      <div className="flex flex-1 flex-wrap items-center gap-2">{children}</div>
      {onClearAll && activeCount > 0 && (
        <Button variant="ghost" size="sm" onClick={onClearAll} className="shrink-0">
          <XIcon />
          {clearLabel}
          <span className="text-text-secondary">({activeCount})</span>
        </Button>
      )}
    </div>
  );
}

export { FilterBar };
