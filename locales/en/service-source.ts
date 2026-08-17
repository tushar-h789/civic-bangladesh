import type { TranslationShape } from "@/locales/types";

export const serviceSource = {
  title: "Information source",
  sourceLabel: "Source",
  portalName: "Official Government Service Portal",
  lastUpdatedLabel: "Last Updated",
  lastUpdatedValue: "{date}",
  viewOfficial: "View Official Service",
  notAuthority:
    "Civic Bangladesh is not a government authority. This page is preparation, not the official service.",
  note: "Opens the national portal (bangladesh.gov.bd) unless a verified office link is shown. Confirm the exact service there. Civic Bangladesh does not process applications.",
} as const;

export type ServiceSourceTranslations = TranslationShape<typeof serviceSource>;
