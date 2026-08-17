"use client";

import { useAppSelector } from "@/redux/hooks";
import { bn, en, type Dictionary, type Locale } from "@/locales";

const dictionaries: Record<Locale, Dictionary> = { en, bn };

/**
 * Returns the centralized translation dictionary for the current locale.
 * `t` is the typed dictionary itself (e.g. `t.accessibility.title`)
 * rather than a string-key lookup function, so every usage is checked
 * and autocompleted by TypeScript — a missing/renamed key is a compile
 * error, not a silent runtime fallback.
 */
function useTranslation() {
  const locale = useAppSelector((state) => state.locale.locale);

  return { locale, t: dictionaries[locale] };
}

export { useTranslation };
