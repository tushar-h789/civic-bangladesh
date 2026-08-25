import type { TranslationShape } from "@/locales/types";

export const certificates = {
  title: "Learning certificates",
  description:
    "Sample Civic Bangladesh credentials for courses you can complete on this site. They record learning here. They are not government certificates.",
  sampleNote:
    "Sample catalog only. These credentials do not stamp papers, replace a licence, or confirm a government application.",
  heroImageAlt:
    "A Civic Bangladesh course workspace — learning records, not government stamps",
  pricingNote:
    "We do not sell a government stamp. Paid learning here is a Civic Bangladesh credential or a preparation course, only where this catalog already supports it.",
  pricingCta: "How we price courses",
  stats: {
    samples: "{count} sample credentials",
    notGovernment: "Not government certificates",
  },
  jump: {
    label: "On this page",
    list: "Sample certificates",
    how: "How they work",
    notThis: "What this is not",
    more: "Keep learning",
  },
  list: {
    title: "Sample certificates",
    description:
      "Sample records for Civic Bangladesh courses. Names, dates, and IDs are catalog fields, not a live enrolment roll.",
    showing: "{count} credentials",
    emptyTitle: "No certificates in this sample",
    emptyDescription:
      "Complete a course that includes a Civic Bangladesh learning credential. It can then appear here as a sample record.",
    cta: "View certificate",
    earnedOn: "Completed {date}",
  },
  how: {
    title: "How these certificates work",
    description:
      "Finish a course that includes a credential. What you get is a Civic Bangladesh learning record — not a government stamp.",
    complete: {
      title: "Finish a course",
      body: "Only courses that include a credential can show a sample certificate here.",
    },
    credential: {
      title: "A learning record",
      body: "The certificate shows you completed that Civic Bangladesh course.",
    },
    visit: {
      title: "It is not official paper",
      body: "It does not stamp, licence, attest, or change a government application.",
    },
  },
  notThis: {
    title: "What this is not",
    description:
      "Keep the line clear. Civic Bangladesh issues a learning credential, not a government certificate.",
    notGovernment: {
      title: "Not a government certificate",
      body: "It does not replace an official stamp, licence, attestation, or portal result.",
    },
    notStamp: {
      title: "Not a stamp you can buy",
      body: "Civic Bangladesh does not sell a government seal or process an application.",
    },
    notLive: {
      title: "Not a live enrolment record",
      body: "Names, dates, and IDs on this page are sample catalog fields.",
    },
  },
  more: {
    title: "Courses that can include a credential",
    description:
      "Browse preparation and civic courses. A certificate appears only where the catalog says it is included.",
    courses: {
      title: "Courses",
      body: "See which Civic Bangladesh courses include a learning credential.",
      cta: "Open courses",
    },
    pricing: {
      title: "Pricing",
      body: "How we price Civic Bangladesh courses. This is not a government fee.",
      cta: "How we price courses",
    },
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
