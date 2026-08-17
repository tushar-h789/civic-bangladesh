export const TERMS_ABOUT_KEYS = ["usingTheSite", "whoItIsFor"] as const;

export type TermsAboutKey = (typeof TERMS_ABOUT_KEYS)[number];

export const TERMS_NOT_KEYS = [
  "notPortal",
  "notAdvice",
  "notPartnership",
  "notPurchase",
] as const;

export type TermsNotKey = (typeof TERMS_NOT_KEYS)[number];

export const TERMS_CONTENT_KEYS = [
  "sampleCatalog",
  "confirmOfficial",
  "courses",
  "certificates",
] as const;

export type TermsContentKey = (typeof TERMS_CONTENT_KEYS)[number];

export const TERMS_USE_KEYS = [
  "prepareThenApply",
  "doNotPresentAsOfficial",
  "doNotMisuse",
  "schoolsOrgs",
] as const;

export type TermsUseKey = (typeof TERMS_USE_KEYS)[number];

export const TERMS_LEAVE_KEYS = ["youtube", "officialPortal"] as const;

export type TermsLeaveKey = (typeof TERMS_LEAVE_KEYS)[number];
