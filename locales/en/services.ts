import type { TranslationShape } from "@/locales/types";

export const services = {
  eyebrow: "Government Services",
  title: "Find a Government Service",
  description:
    "Find the government service you need, learn which papers to prepare, and get ready step by step.",
  sampleNote:
    "Sample catalog for learning and preparation — not an official government list. Document counts and processing times are demo fields, not official figures.",
  hero: {
    imageAlt:
      "A young man helping an elderly woman understand an application form in a Bangladesh public service waiting hall",
    prepareFirst:
      "Prepare here. Apply on the official government portal.",
    stats: {
      services: "{count} sample services",
      categories: "{count} categories",
    },
  },
  search: {
    placeholder: "Search services...",
    label: "Search government services",
    clear: "Clear search",
  },
  filters: {
    category: "Service category",
    citizenType: "Citizen type",
    organization: "Ministry / organization",
    fee: "Free / paid service",
    course: "Course available",
    all: "All",
    clear: "Clear filters",
    open: "Filters",
    drawerTitle: "Filter services",
    drawerDescription: "Choose a category and narrow this sample catalog.",
    apply: "Show results",
  },
  fee: {
    free: "Free service",
    paid: "Paid service",
  },
  courseFilter: {
    yes: "With a course",
    no: "No course yet",
  },
  categories: {
    title: "Service categories",
    description: "Catalog groups for browsing — not official partnerships.",
    all: "All services",
    count: "{count}",
  },
  groups: {
    documents: "Documents & attestation",
    licensing: "Registration",
    education: "Education",
    landEconomy: "Land, farming & finance",
    personal: "Personal & other",
  },
  sort: {
    label: "Sort",
    featured: "Catalog order",
    title: "Title A–Z",
    courseFirst: "Course first",
    documents: "Fewer documents first",
  },
  view: {
    grid: "Card view",
    list: "List view",
  },
  results: {
    title: "Sample services",
    count: "{count} in this catalog",
    showing: "Showing {shown} of {total}",
    emptyTitle: "No matching services",
    emptyDescription: "Try another search or clear the filters.",
    loadMore: "Load more",
    remaining: "{count} more in this catalog",
  },
  card: {
    documents: "{count} documents (sample)",
    documentsLabel: "Required documents",
    processingLabel: "Processing time",
    feeLabel: "Government fee",
    feePaid:
      "A government fee usually applies. Confirm the amount on the official portal. (sample)",
    feeFree:
      "No government fee listed here. Confirm on the official portal. (sample)",
    feePaidShort: "Usually applies (sample)",
    feeFreeShort: "None listed (sample)",
    feeConfirm: "Confirm on the official portal",
    courseIndicator: "Preparation course",
    coursePrice: "Civic Bangladesh course ৳{amount}",
    courseFree: "Free Civic Bangladesh course",
    viewCourse: "View course",
    noCourse: "No preparation course in this sample",
    courseAvailable: "Preparation course",
    cta: "View Service",
    applyOfficial: "Apply on Official Portal",
  },
  categoryItems: {
    outboundAttestation: {
      title: "Certificate attestation for citizens going abroad",
      shortTitle: "Going abroad",
      description:
        "Prepare papers for academic and personal certificate attestation.",
    },
    certificatesPermits: {
      title: "Certificates, attestations, NOCs and permits",
      shortTitle: "Certificates & permits",
      description:
        "Learn what is usually asked for common certificates and permits.",
    },
    registrationLicence: {
      title: "Registration and licences",
      shortTitle: "Registration & licences",
      description: "Get ready for trade and other local registrations.",
    },
    education: {
      title: "Education",
      shortTitle: "Education",
      description: "Board, school, and student document preparation.",
    },
    landLease: {
      title: "Land and lease",
      shortTitle: "Land & lease",
      description: "Prepare for mutation and other land-office visits.",
    },
    financeBank: {
      title: "Finance and banking",
      shortTitle: "Finance & banking",
      description:
        "Letters and papers often needed for banks and finance offices.",
    },
    agricultureFertilizer: {
      title: "Agriculture and fertilizer",
      shortTitle: "Agriculture",
      description: "Support and papers farmers are often asked to bring.",
    },
    personalApplications: {
      title: "Personal applications and permits",
      shortTitle: "Personal applications",
      description: "Birth, identity, and other personal applications.",
    },
    other: {
      title: "Other",
      shortTitle: "Other",
      description:
        "General preparation when the service does not fit a group above.",
    },
  },
  citizenTypes: {
    general: "Any citizen",
    student: "Student",
    outbound: "Going abroad",
    landowner: "Landowner",
    farmer: "Farmer",
    business: "Business owner",
  },
  organizations: {
    attestationOffices: "Attestation offices (sample)",
    educationOffices: "Education offices (sample)",
    landOffices: "Land offices (sample)",
    financeOffices: "Finance offices (sample)",
    agricultureOffices: "Agriculture offices (sample)",
    localGovOffices: "Local government offices (sample)",
  },
  items: {
    sscAttestation: {
      title: "SSC certificate attestation — step by step",
      description:
        "A short preparation path for students going abroad who need an SSC certificate attested. Not an official application.",
      processingTime: "7–15 working days (sample)",
    },
    transcriptAttestation: {
      title: "Academic transcript attestation — step by step",
      description:
        "What to gather before you seek transcript attestation. Civic Bangladesh prepares you; the office does the work.",
      processingTime: "10–20 working days (sample)",
    },
    characterCertificate: {
      title: "Character certificate — what to prepare",
      description:
        "A simple checklist for a common local character certificate request.",
      processingTime: "3–7 working days (sample)",
    },
    tradeLicence: {
      title: "Trade licence — preparation course",
      description:
        "Papers and common mistakes before a trade-licence visit. Affordable prep, not a government fee.",
      processingTime: "7–14 working days (sample)",
    },
    boardCertificate: {
      title: "Board certificate copy — what to bring",
      description:
        "Prepare a request for a board certificate copy without treating this as the board office itself.",
      processingTime: "5–12 working days (sample)",
    },
    landMutation: {
      title: "Land mutation — step by step",
      description:
        "A citizen-friendly outline of papers often needed for mutation. Sample timing only.",
      processingTime: "15–30 working days (sample)",
    },
    bankSolvency: {
      title: "Bank solvency letter — what banks often ask",
      description:
        "A preparation list for a solvency letter. Confirm details with your bank.",
      processingTime: "3–10 working days (sample)",
    },
    fertilizerSupport: {
      title: "Fertilizer support — papers to prepare",
      description:
        "A short guide to documents farmers are often asked to keep ready.",
      processingTime: "2–5 working days (sample)",
    },
    birthCertificate: {
      title: "Birth certificate — preparation",
      description:
        "What families often need to have ready for a birth-certificate request.",
      processingTime: "5–10 working days (sample)",
    },
    generalSupport: {
      title: "General service visit — how to prepare",
      description:
        "A basic checklist when you are not sure which counter to start with.",
      processingTime: "Varies (sample)",
    },
  },
} as const;

export type ServicesTranslations = TranslationShape<typeof services>;
