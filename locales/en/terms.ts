import type { TranslationShape } from "@/locales/types";

export const terms = {
  eyebrow: "Support",
  title: "Terms of use",
  description:
    "These terms are for using Civic Bangladesh as a learning website. They are not government regulations, and they do not replace the rules of any official portal.",
  sampleNote:
    "This page describes Civic Bangladesh as it works now. It is not a ministry circular, a paid contract, or legal advice.",
  heroImageAlt: "People following a clear public path together",
  jump: {
    label: "On this page",
    about: "Using this site",
    notThis: "What this is not",
    content: "Learning content",
    yourUse: "Your use",
    leaving: "Other websites",
    more: "More",
  },
  notice: {
    title: "Not government terms",
    body: "Civic Bangladesh is an independent learning platform. These terms do not bind a ministry, and they do not change how you apply on the official government portal.",
  },
  about: {
    eyebrow: "The website",
    title: "Using Civic Bangladesh",
    description:
      "By browsing this site you use a civic-education and government-service learning platform. You can read without creating a live account.",
    usingTheSite: {
      title: "What you can do here",
      body: "Learn civic habits, browse sample service guides, take preparation courses, and practice challenges. Apply for a government service on the official portal — not on this site.",
    },
    whoItIsFor: {
      title: "Who it is for",
      body: "Everyday citizens, students, teachers, schools, and organizations that want civic learning or service preparation. Named government partners would only appear after official confirmation.",
    },
  },
  notThis: {
    eyebrow: "Limits",
    title: "What these terms are not",
    description:
      "Keep the line clear between Civic Bangladesh and government offices.",
    notPortal: {
      title: "Not the official portal",
      body: "This website does not process applications, collect government fees, or issue government certificates, licences, or stamps.",
    },
    notAdvice: {
      title: "Not legal or official advice",
      body: "Guides are for learning and preparation. Confirm the current office, form, fee, and papers on the official portal before you apply.",
    },
    notPartnership: {
      title: "Not a government partnership",
      body: "Service categories and sample directories are for browsing. They are not signed programmes, tenders, or ministry endorsements.",
    },
    notPurchase: {
      title: "Not a checkout",
      body: "Listed course fees are Civic Bangladesh learning prices. This site does not take payment, and a sample preview is not a purchase.",
    },
  },
  content: {
    eyebrow: "On this site",
    title: "Learning content",
    description:
      "Catalogs, progress, and credentials are Civic Bangladesh learning materials unless a page says otherwise.",
    sampleCatalog: {
      title: "Sample catalogs",
      body: "Service lists, demo dashboards, and demo progress are labelled as sample so they are not mistaken for live government records.",
    },
    confirmOfficial: {
      title: "Confirm official facts",
      body: "Fees, times, and documents on a service page are for preparation. Trust a verified official source on that page, or confirm on the national portal.",
    },
    courses: {
      title: "Courses",
      body: "Civic lessons stay free at the core. Paid service-preparation courses teach you to get ready. Completing a course does not file an application.",
    },
    certificates: {
      title: "Certificates",
      body: "A Civic Bangladesh certificate is a learning credential from this platform. It does not stamp papers, replace a licence, or prove a government office accepted your file.",
    },
  },
  yourUse: {
    eyebrow: "Your part",
    title: "How to use this site fairly",
    description:
      "Use Civic Bangladesh to learn and prepare. Do not present it as a government office.",
    prepareThenApply: {
      title: "Prepare here, apply there",
      body: "Use the guides and courses to get ready, then apply on the official portal. Civic Bangladesh does not submit the file for you.",
    },
    doNotPresentAsOfficial: {
      title: "Do not present our materials as official",
      body: "Do not show a Civic Bangladesh certificate, sample guide, or screenshot as a government stamp, circular, or application result.",
    },
    doNotMisuse: {
      title: "Do not misuse the platform",
      body: "Do not copy sample pages as fake government forms, impersonate a ministry, or use this site to mislead someone about an official process.",
    },
    schoolsOrgs: {
      title: "Schools and organizations",
      body: "A class or workplace may share public civic lessons. That is shared learning — not a ministry curriculum or a confirmed government programme.",
    },
  },
  leaving: {
    eyebrow: "Other websites",
    title: "When you leave Civic Bangladesh",
    description:
      "Some buttons open another site. That site has its own terms. We do not receive what you do there.",
    youtube: {
      title: "Course videos",
      body: "If a lesson plays a YouTube video, YouTube’s terms and privacy rules apply to that player. Playing a video is not an application.",
    },
    officialPortal: {
      title: "Official government portal",
      body: "Apply on Official Portal opens the national portal (bangladesh.gov.bd). That portal’s own terms apply to the application. Civic Bangladesh does not process it.",
    },
  },
  more: {
    eyebrow: "Related",
    title: "Other Civic Bangladesh pages",
    description:
      "How information stays on this device, and how to use the site.",
    privacyCta: "Open privacy",
    helpCta: "Open Help Center",
    faqCta: "Open FAQ",
  },
} as const;

export type TermsTranslations = TranslationShape<typeof terms>;
