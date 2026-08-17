export const ACCESSIBILITY_TOGGLE_KEYS = [
  "highContrast",
  "monochrome",
  "invertColors",
  "highlightLinks",
  "highlightHeadings",
  "largeCursor",
  "reduceMotion",
] as const;

export type AccessibilityToggleKey =
  (typeof ACCESSIBILITY_TOGGLE_KEYS)[number];

export const ACCESSIBILITY_HOW_KEYS = [
  "button",
  "saved",
  "motion",
  "language",
] as const;

export type AccessibilityHowKey = (typeof ACCESSIBILITY_HOW_KEYS)[number];

export const ACCESSIBILITY_LIMIT_KEYS = [
  "notGovernment",
  "notAudit",
  "notPortal",
  "notHelpline",
] as const;

export type AccessibilityLimitKey =
  (typeof ACCESSIBILITY_LIMIT_KEYS)[number];
