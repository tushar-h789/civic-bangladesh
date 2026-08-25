import * as React from "react";
import { SearchIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SearchInputProps extends Omit<
  React.ComponentProps<typeof Input>,
  "type"
> {
  onClear?: () => void;
  containerClassName?: string;
}

function SearchInput({
  className,
  containerClassName,
  onClear,
  value,
  ...props
}: SearchInputProps) {
  const hasValue =
    typeof value === "string" ? value.length > 0 : Boolean(value);

  return (
    <div className={cn("relative flex items-center", containerClassName)}>
      <SearchIcon className="pointer-events-none absolute left-3.5 size-4 text-text-secondary" />
      <Input
        type="text"
        value={value}
        className={cn("pl-10", onClear && hasValue && "pr-10", className)}
        {...props}
      />
      {onClear && hasValue && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-2.5 flex size-4 items-center justify-center text-text-secondary transition-colors hover:text-foreground"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  );
}

export { SearchInput };
