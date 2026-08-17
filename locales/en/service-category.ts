import type { TranslationShape } from "@/locales/types";

export const serviceCategory = {
  eyebrow: "Service category",
  sampleBadge: "Sample catalog",
  sampleNote:
    "Sample category page for learning and preparation — not an official government list. Civic Bangladesh does not process applications.",
  hero: {
    imageAlt:
      "A citizen preparing papers before visiting a government service office",
    prepareFirst: "Prepare here. Apply on the official government portal.",
    stats: {
      guides: "{count} sample guides",
      listed: "{count} related names in this sample directory",
    },
  },
  explanation: {
    eyebrow: "About this category",
    title: "What this category covers",
  },
  popular: {
    eyebrow: "Start here",
    title: "Popular services",
    description:
      "A short sample of names people often look for here. This is not an official ranking.",
  },
  all: {
    eyebrow: "Browse",
    title: "All services",
    description:
      "Sample guides where we have one, plus related names in this directory. Names without a guide have no invented fees or steps.",
  },
  courses: {
    eyebrow: "Learn first",
    title: "Related courses",
    description:
      "Civic Bangladesh courses linked to services in this category. Course fees are ours, not government fees.",
    emptyTitle: "No related course in this sample yet",
    emptyDescription:
      "You can still browse the course catalog. Confirm the official process on the government portal.",
    browse: "Browse courses",
  },
  faqs: {
    eyebrow: "Questions",
    title: "Frequently asked questions",
    description:
      "Short answers about this sample catalog. Confirm current rules on the official portal.",
    items: {
      officialPortal: {
        question: "Is this the official government portal?",
        answer:
          "No. Civic Bangladesh is a learning platform. Apply on the official government portal. Confirm the exact office, form, and fee there.",
      },
      civicDoesNotApply: {
        question: "Can Civic Bangladesh submit my application?",
        answer:
          "No. We help you prepare. We do not collect government fees, process applications, or issue government certificates.",
      },
      sampleDirectory: {
        question: "Is this a complete list of services?",
        answer:
          "No. This is a sample directory for browsing. Offices may ask for different papers. Missing names here does not mean a service does not exist.",
      },
      courseFees: {
        question: "Are the course prices government fees?",
        answer:
          "No. Course prices are Civic Bangladesh learning fees. Government fees, if any, must be confirmed on the official portal.",
      },
      outboundWhat: {
        question: "What is certificate attestation for going abroad?",
        answer:
          "Attestation means an office checks and stamps a paper so another office can trust it. The exact office and steps depend on the paper and the country. Confirm this on the official portal — we do not publish an official process here.",
      },
      outboundList: {
        question: "Why are some papers only listed by name?",
        answer:
          "This sample catalog only adds fees, documents, and steps when we already have a preparation guide. Other names are listed so you can recognise them. Confirm each one on the official portal.",
      },
    },
  },
  directory: {
    badge: "Listed name",
    noGuide: "No Civic Bangladesh guide in this sample yet.",
    confirmOfficial: "View Official Service",
    items: {
      unmarriedCertificate: {
        title: "Unmarried certificate",
        description:
          "A personal status paper sometimes asked when going abroad. Confirm the office and papers on the official portal.",
      },
      bankStatement: {
        title: "Bank statement / certificate",
        description:
          "A bank paper is sometimes asked with attestation files. Confirm what your bank and the office require.",
      },
      propertyAccount: {
        title: "Property account",
        description:
          "A property or asset paper is sometimes asked for travel files. Confirm the exact document name on the official portal.",
      },
      hscCertificate: {
        title: "HSC certificate",
        description:
          "Higher Secondary certificate papers are often attested for study or work abroad. This sample has no separate HSC guide yet.",
      },
      drivingLicence: {
        title: "Driving licence",
        description:
          "A driving licence is sometimes included in attestation files. Confirm whether your case needs it.",
      },
      medicalCertificate: {
        title: "Medical certificate",
        description:
          "A medical paper is sometimes asked for travel or work files. Confirm the issuing office for your case.",
      },
      nid: {
        title: "National ID (NID)",
        description:
          "NID is often used to identify the applicant. This listing is a name only — not an NID application guide.",
      },
      affidavit: {
        title: "Affidavit",
        description:
          "A sworn statement is sometimes asked with other papers. Confirm the format with the office that requested it.",
      },
      translatedDocuments: {
        title: "Translated documents",
        description:
          "Some offices ask for a translation of a certificate. Confirm language, translator, and stamping rules on the official portal.",
      },
    },
  },
  pages: {
    outboundAttestation: {
      lead: "Prepare common certificate names used when going abroad. Sample guides are included only where this catalog already has them.",
      explanation: [
        "People going abroad are often asked to attest academic and personal papers. This page groups those names in one place so you can see what this sample catalog covers.",
        "Where Civic Bangladesh has a preparation guide, you can open it and learn the papers step by step. Other names are listed only so you can recognise them. We do not invent fees, processing times, or official document lists for missing guides.",
        "Always confirm the current office, form, and fee on the official government portal before you apply.",
      ],
    },
    certificatesPermits: {
      lead: "Sample guides for common certificates and permits. Not an official list of every certificate in Bangladesh.",
      explanation: [
        "This category is for certificates, attestations, NOCs, and permits that people often prepare at local offices.",
        "This sample catalog currently has a preparation guide where one exists. Confirm the office and papers for your case on the official portal.",
      ],
    },
    registrationLicence: {
      lead: "Get ready for trade and other local registrations using the sample guides in this catalog.",
      explanation: [
        "Registration and licence visits usually need identity papers and proof of place or business. This category collects the sample guides we have for that kind of visit.",
        "It is not a complete list of licences. Confirm the current form and fee on the official portal.",
      ],
    },
    education: {
      lead: "Board and student document preparation from this sample catalog.",
      explanation: [
        "Education offices often ask for identity papers and the original or a copy of a board document. This category shows the sample guides we have.",
        "Confirm board rules on the official portal. Civic Bangladesh does not issue board certificates.",
      ],
    },
    landLease: {
      lead: "Prepare for mutation and other land-office visits using this sample catalog.",
      explanation: [
        "Land visits often need deeds, khatian, and tax papers. This category shows the sample guide we have for mutation preparation.",
        "Land rules can change by office. Confirm your papers on the official portal before you go.",
      ],
    },
    financeBank: {
      lead: "Letters and papers often needed for banks and finance offices, from this sample catalog.",
      explanation: [
        "Banks and finance offices ask for identity and account papers. This category shows the sample guide we have.",
        "Your bank may ask for different papers. Confirm with the bank and on the official portal.",
      ],
    },
    agricultureFertilizer: {
      lead: "Sample preparation for support and papers farmers are often asked to bring.",
      explanation: [
        "This category is for agriculture support visits in this sample catalog. It is not a government subsidy list.",
        "Confirm current support rules on the official portal. Civic Bangladesh does not process farmer applications.",
      ],
    },
    personalApplications: {
      lead: "Birth, identity, and other personal applications from this sample catalog.",
      explanation: [
        "Personal applications often start with identity papers. This category shows the sample guides we have.",
        "It is not a complete civil-registration list. Confirm the office on the official portal.",
      ],
    },
    other: {
      lead: "General preparation when a service does not fit the groups above.",
      explanation: [
        "Use this category when you are not sure which group to start with. The sample guide here is a basic visit checklist.",
        "If you know the service name, search the full catalog or confirm it on the official portal.",
      ],
    },
  },
  official: {
    title: "Apply on the official portal",
    description:
      "Civic Bangladesh helps you prepare. Applications are submitted on the official government portal, not here.",
    cta: "Apply on Official Portal",
    note: "Opens the national portal (bangladesh.gov.bd). Confirm the exact service there.",
  },
  otherCategories: {
    title: "Other categories",
  },
} as const;

export type ServiceCategoryTranslations = TranslationShape<typeof serviceCategory>;
