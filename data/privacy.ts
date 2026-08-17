import { ROUTES } from "@/constants/routes";

export const PRIVACY_STORED_KEYS = ["language", "accessibility"] as const;

export type PrivacyStoredKey = (typeof PRIVACY_STORED_KEYS)[number];

export const PRIVACY_STORED_HREF: Record<PrivacyStoredKey, string | null> = {
  language: null,
  accessibility: ROUTES.accessibility,
};

export const PRIVACY_NOT_KEYS = [
  "applications",
  "payments",
  "nid",
  "accounts",
  "analytics",
] as const;

export type PrivacyNotKey = (typeof PRIVACY_NOT_KEYS)[number];

export const PRIVACY_LEAVE_KEYS = ["youtube", "officialPortal"] as const;

export type PrivacyLeaveKey = (typeof PRIVACY_LEAVE_KEYS)[number];

export const PRIVACY_CLEAR_KEYS = ["browser", "accessibility"] as const;

export type PrivacyClearKey = (typeof PRIVACY_CLEAR_KEYS)[number];
