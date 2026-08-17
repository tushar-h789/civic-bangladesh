import type { TranslationShape } from "@/locales/types";

export const certificates = {
  title: "Learning credentials",
  description:
    "Sample Civic Bangladesh certificates for courses you can complete on this site. They record learning here. They are not government certificates.",
  sampleNote:
    "Sample catalog only. These credentials do not stamp papers, replace a licence, or confirm a government application.",
  pricingNote:
    "We do not sell a government stamp. Certificate-related paid learning is a Civic Bangladesh credential or a preparation course, only where this catalog already supports it.",
  pricingCta: "How we price courses",
  list: {
    title: "Earned certificates",
    showing: "{count} sample credentials",
    emptyTitle: "No certificates in this catalog",
    emptyDescription:
      "Complete a course that includes a Civic Bangladesh learning credential, then it can appear here as a sample record.",
    cta: "View certificate",
    earnedOn: "Completed {date}",
  },
  card: {
    imageAlt: "Preview of a Civic Bangladesh learning credential",
    relatedService: "Related service",
    civicCourse: "Civic education course",
  },
  detail: {
    title: "Certificate",
    factsTitle: "Credential details",
    learner: "Learner",
    course: "Course",
    relatedService: "Related government service",
    noRelatedService: "Not tied to a government service",
    completedOn: "Completion date",
    certificateId: "Certificate ID",
    verification: "Verification status",
    issuingAuthority: "Issuing authority",
    openCourse: "Open course",
    openService: "View government service",
    backToList: "All certificates",
    qrHint:
      "A live verification QR can sit in this box when a check is connected. This square is a placeholder.",
  },
  document: {
    credential: "Learning credential",
    heading: "Certificate of Completion",
    awardedTo: "This certifies that",
    completed: "has completed the Civic Bangladesh course",
    relatedPrefix: "Prepared in relation to",
    sampleBadge: "Sample credential",
  },
  verification: {
    sampleRecorded: {
      label: "Recorded on Civic Bangladesh",
      note: "This is a sample record of a learning credential. It is not government verification.",
    },
  },
  learners: {
    amina: "Amina Rahman",
  },
  authority: {
    label: "Issued by",
    civicBangladesh: {
      name: "Civic Bangladesh",
      role: "Learning platform",
      statement:
        "Issued by Civic Bangladesh as a learning credential — not a government certificate.",
      pendingOfficial:
        "An officially approved issuing authority and mark can be placed in this area when provided. This is not a government seal.",
      markAlt: "Civic Bangladesh",
    },
  },
  qr: {
    label: "Verification",
    placeholder: "QR placeholder",
  },
  notGovernment:
    "This is not a government certificate. It does not replace an official stamp, licence, attestation, or portal result.",
} as const;

export type CertificatesTranslations = TranslationShape<typeof certificates>;
