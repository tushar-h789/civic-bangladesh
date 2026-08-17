import {
  ACCESSIBILITY_HOW_KEYS,
  ACCESSIBILITY_LIMIT_KEYS,
  ACCESSIBILITY_TOGGLE_KEYS,
} from "@/data/accessibility-page";
import type { Dictionary } from "@/locales";

export function getAccessibilityToggles(t: Dictionary) {
  return ACCESSIBILITY_TOGGLE_KEYS.map((key) => ({
    key,
    label: t.accessibility.toggles[key].label,
    description: t.accessibility.toggles[key].description,
  }));
}

export function getAccessibilityHowItems(t: Dictionary) {
  return ACCESSIBILITY_HOW_KEYS.map((key) => ({
    key,
    title: t.accessibility.page.how[key].title,
    body: t.accessibility.page.how[key].body,
  }));
}

export function getAccessibilityLimits(t: Dictionary) {
  return ACCESSIBILITY_LIMIT_KEYS.map(
    (key) => t.accessibility.page.limits.items[key],
  );
}
