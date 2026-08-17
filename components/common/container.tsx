import * as React from "react";

import { cn } from "@/lib/utils";

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="container"
      className={cn(
        "relative z-10 mx-auto w-full max-w-content px-4 sm:px-6 lg:px-(--container-padding-inline)",
        className,
      )}
      {...props}
    />
  );
}

export { Container };
