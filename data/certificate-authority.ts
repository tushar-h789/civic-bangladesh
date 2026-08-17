/**
 * Issuing-authority slot for Civic Bangladesh learning credentials.
 *
 * This is not a government seal. Do not place a national emblem, ministry
 * crest, or any invented official mark here.
 *
 * When an officially approved authority and branding are provided:
 * 1. Set `officialBrandingProvided` to true
 * 2. Point `markSrc` at the approved mark file
 * 3. Add matching copy under `certificates.authority[localeKey]`
 *
 * Until then, the certificate shows Civic Bangladesh as the learning
 * issuer and a pending note in the authority area.
 */
export const CERTIFICATE_AUTHORITY_LOCALE_KEYS = ["civicBangladesh"] as const;

export type CertificateAuthorityLocaleKey =
  (typeof CERTIFICATE_AUTHORITY_LOCALE_KEYS)[number];

export type CertificateIssuingAuthority = {
  localeKey: CertificateAuthorityLocaleKey;
  /** Brand or approved mark. Never a government seal unless officially supplied. */
  markSrc: string | null;
  officialBrandingProvided: boolean;
};

export const CERTIFICATE_ISSUING_AUTHORITY: CertificateIssuingAuthority = {
  localeKey: "civicBangladesh",
  markSrc: "/images/common/logo.png",
  officialBrandingProvided: false,
};
