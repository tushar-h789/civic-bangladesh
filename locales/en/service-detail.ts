import type { TranslationShape } from "@/locales/types";

export const serviceDetail = {
  sampleBadge: "Sample catalog",
  catalogNote:
    "This page is for learning and preparation. Civic Bangladesh does not process government applications.",
  onThisPage: "On this page",
  jump: {
    quick: "Quick info",
    about: "About",
    documents: "Documents",
    process: "Process",
    learning: "Learning path",
    course: "Course",
    related: "Related",
    apply: "Apply",
    source: "Source",
  },
  officialPortalNote:
    "Opens the national portal (bangladesh.gov.bd). Confirm the exact service there. Civic Bangladesh does not submit or process your application.",
  cta: {
    applyOfficial: "Apply on Official Portal",
    learnService: "Learn This Service",
    startCourse: "Start Course",
  },
  quick: {
    title: "Quick Information",
    description:
      "Sample catalog facts. Confirm every item on the official portal before you apply.",
    who: "Who can apply",
    documents: "Required documents",
    fee: "Government fee",
    time: "Processing time",
    method: "Application method",
  },
  fee: {
    paid: "A government fee usually applies. Confirm the amount on the official portal — this is not a Civic Bangladesh fee. (sample)",
    free: "This catalog lists no government fee. Confirm on the official portal before you go. (sample)",
  },
  methods: {
    online: "Online on the official portal (sample)",
    office: "In person at the office (sample)",
    mixed: "Start online, then visit the office if asked (sample)",
  },
  about: {
    title: "About This Service",
  },
  documents: {
    title: "Required Documents",
    description:
      "A personal prep checklist. Confirm the official list on the government portal.",
    required: "Required",
    optional: "Optional",
    format: "Accepted format",
    notes: "Notes",
    markPrepared: "Mark as prepared on this visit",
    prepared: "{prepared} of {total} marked prepared",
    sampleNote:
      "Document names and formats are sample catalog fields, not an official gazette.",
  },
  process: {
    title: "How the Process Works",
    description:
      "A typical path. Your official portal may differ. Civic Bangladesh cannot complete these steps for you.",
    steps: {
      prepare: {
        title: "Prepare documents",
        body: "Gather the papers in the checklist. Check names, dates, and copies before you start.",
      },
      login: {
        title: "Create / Login",
        body: "Create an account or log in on the official portal if the service is online.",
      },
      fill: {
        title: "Fill application",
        body: "Fill the form so names and numbers match your papers exactly.",
      },
      upload: {
        title: "Upload documents",
        body: "Upload scans only if the official portal asks. Keep originals ready for office visits.",
      },
      submit: {
        title: "Submit",
        body: "Submit only on the official portal. Civic Bangladesh cannot submit for you.",
      },
      track: {
        title: "Track application",
        body: "Save any tracking number from the official portal and follow it there.",
      },
    },
  },
  instructions: {
    title: "Important Instructions",
    description: "Read these before you apply on the official portal.",
    items: {
      confirmOfficial: {
        title: "Confirm every fact on the official portal",
        body: "Fees, papers, and timing on this page are sample catalog notes. The office or portal you use may ask for something different.",
      },
      matchingNames: {
        title: "Keep names and spellings the same",
        body: "Use the same spelling on your NID, certificates, and the form. Small mismatches are a common reason for delay.",
      },
      keepCopies: {
        title: "Make copies before you go",
        body: "Keep a photocopy and a clear scan of each paper. Do not give away your only original unless the office asks and gives a receipt.",
      },
      governmentFees: {
        title: "Pay government fees only to government",
        body: "Civic Bangladesh never collects a government service fee. If someone asks you to pay Civic Bangladesh for an official stamp, stop and use the official portal.",
      },
    },
  },
  mistakes: {
    title: "Common Mistakes",
    description:
      "Preparation mistakes people often make. Sample notes for learning — not an official rejection list.",
  },
  course: {
    title: "Learn this service",
    description:
      "A short Civic Bangladesh course. It teaches preparation. It is not a government class, and the certificate is a Civic Bangladesh learning credential — not a government certificate.",
    price: "৳{amount}",
    imageAlt: "A citizen preparing papers for a government service",
  },
  official: {
    title: "For the official application",
    description:
      "When you are ready, apply on the official government portal. Civic Bangladesh does not receive, review, or process your application.",
  },
} as const;

export type ServiceDetailTranslations = TranslationShape<typeof serviceDetail>;
