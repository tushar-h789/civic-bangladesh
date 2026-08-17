import { ROUTES } from "@/constants/routes";
import {
  PRIVACY_CLEAR_KEYS,
  PRIVACY_LEAVE_KEYS,
  PRIVACY_NOT_KEYS,
  PRIVACY_STORED_HREF,
  PRIVACY_STORED_KEYS,
} from "@/data/privacy";
import type { Dictionary } from "@/locales";

export function getPrivacyStoredItems(t: Dictionary) {
  return PRIVACY_STORED_KEYS.map((key) => ({
    key,
    href: PRIVACY_STORED_HREF[key],
    title: t.privacy.stored[key].title,
    body: t.privacy.stored[key].body,
    cta:
      key === "accessibility" ? t.privacy.stored.accessibility.cta : null,
  }));
}

export function getPrivacyNotItems(t: Dictionary) {
  return PRIVACY_NOT_KEYS.map((key) => ({
    key,
    title: t.privacy.notCollected[key].title,
    body: t.privacy.notCollected[key].body,
  }));
}

export function getPrivacyLeaveItems(t: Dictionary) {
  return PRIVACY_LEAVE_KEYS.map((key) => ({
    key,
    title: t.privacy.leaving[key].title,
    body: t.privacy.leaving[key].body,
  }));
}

export function getPrivacyClearItems(t: Dictionary) {
  return PRIVACY_CLEAR_KEYS.map((key) => ({
    key,
    href: key === "accessibility" ? ROUTES.accessibility : null,
    title: t.privacy.clear[key].title,
    body: t.privacy.clear[key].body,
    cta: key === "accessibility" ? t.privacy.clear.accessibility.cta : null,
  }));
}
