import { cn } from "@/lib/utils";
import {
  isCivicChallengeType,
  type ChallengeTypeKey,
} from "@/data/challenge-types";

function ChallengeTypeLabel({
  type,
  label,
  className,
}: {
  type: ChallengeTypeKey;
  label: string;
  className?: string;
}) {
  const civic = isCivicChallengeType(type);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-btn px-2.5 py-1 text-xs font-semibold tracking-wide uppercase",
        civic
          ? "bg-light-green text-primary"
          : "bg-background text-primary ring-1 ring-border",
        className,
      )}
    >
      {label}
    </span>
  );
}

export { ChallengeTypeLabel };
