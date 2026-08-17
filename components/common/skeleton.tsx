import * as React from "react";

import { cn } from "@/lib/utils";
import { Skeleton as BaseSkeleton } from "@/components/ui/skeleton";

function Skeleton(props: React.ComponentProps<typeof BaseSkeleton>) {
  return <BaseSkeleton {...props} />;
}

interface SkeletonTextProps extends React.ComponentProps<"div"> {
  lines?: number;
}

function SkeletonText({ lines = 3, className, ...props }: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <BaseSkeleton
          key={index}
          className={cn("h-4", index === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

function SkeletonCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-card border border-border bg-card p-4",
        className
      )}
      {...props}
    >
      <BaseSkeleton className="h-32 w-full rounded-btn" />
      <BaseSkeleton className="h-4 w-3/4" />
      <BaseSkeleton className="h-4 w-1/2" />
    </div>
  );
}

export { Skeleton, SkeletonText, SkeletonCard };
