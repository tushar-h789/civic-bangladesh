import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom `text-*` tokens in globals.css are font sizes (text-button,
 * text-body, …). Default tailwind-merge treats unknown `text-*` as
 * colors, which would drop `text-primary-foreground` on green buttons.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-button",
        "text-body",
        "text-small",
        "text-section-heading",
        "text-hero-mobile",
        "text-hero-desktop",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
