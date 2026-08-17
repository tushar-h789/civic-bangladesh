export type Locale = "en" | "bn";

export const LOCALES: Locale[] = ["en", "bn"];

export const DEFAULT_LOCALE: Locale = "bn";

export const LOCALE_LABELS: Record<Locale, { native: string; english: string }> = {
  en: { native: "English", english: "English" },
  bn: { native: "বাংলা", english: "Bangla" },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value != null && (LOCALES as string[]).includes(value);
}

/**
 * Widens a `typeof someTranslationObject` (often declared `as const` for
 * nice autocomplete on the English source) down to a structural shape —
 * every leaf becomes `string` instead of its literal value. Used so other
 * locales are only required to match the *shape* (same keys, string
 * values) rather than the exact English text.
 */
export type TranslationShape<T> = T extends string
  ? string
  : { [K in keyof T]: TranslationShape<T[K]> };
