import type { TranslationShape } from "@/locales/types";

export const common = {
  languageSwitcher: {
    label: "Language",
    selectLanguage: "Select language",
  },
  actions: {
    reset: "Reset",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
  },
  scrollToTop: "Back to top",
} as const;

export type CommonTranslations = TranslationShape<typeof common>;
