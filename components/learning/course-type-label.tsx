import { cn } from "@/lib/utils";
import {
  isCivicCourseType,
  type CourseTypeKey,
} from "@/data/course-types";

function CourseTypeLabel({
  type,
  label,
  className,
}: {
  type: CourseTypeKey;
  label: string;
  className?: string;
}) {
  const civic = isCivicCourseType(type);

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

export { CourseTypeLabel };
