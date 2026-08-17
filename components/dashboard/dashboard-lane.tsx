import { cn } from "@/lib/utils";

function DashboardLane({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold tracking-wide text-primary uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export { DashboardLane };
