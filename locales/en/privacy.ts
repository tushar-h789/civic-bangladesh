import type { TranslationShape } from "@/locales/types";

export const privacy = {
  eyebrow: "Support",
  title: "Privacy on Civic Bangladesh",
  description:
    "This site is a learning platform. It does not process government applications, and it does not take payments. A few preferences can stay on this device.",
  sampleNote:
    "This page describes Civic Bangladesh as it works now. It is not a government privacy notice, and it is not a live account or payment policy.",
  heroImageAlt: "People sharing a calm public space with room to move",
  jump: {
    label: "On this page",
    stored: "On this device",
    notCollected: "What we do not collect",
    leaving: "When you leave this site",
    clear: "How to clear",
    more: "More",
  },
  notice: {
    title: "Not a government privacy notice",
    body: "Civic Bangladesh does not receive your application file. If you apply on the official portal, that portal’s own privacy rules apply — not this page.",
  },
  stored: {
    eyebrow: "This browser",
    title: "What can stay on this device",
    description:
      "These preferences are saved in this browser so the site can remember how you like to use it. They are not sent to a government office.",
    language: {
      title: "Language",
      body: "Bangla or English, from the language switcher in the header or footer. Bangla is the default.",
    },
    accessibility: {
      title: "Accessibility settings",
      body: "Text size, contrast, motion, and related display choices. You can change or reset them on the Accessibility page.",
      cta: "Open accessibility",
    },
  },
  notCollected: {
    eyebrow: "Limits",
    title: "What Civic Bangladesh does not collect here",
    description:
      "There is no Civic Bangladesh server on this site taking personal files, payments, or application status.",
    applications: {
      title: "Government applications",
      body: "We do not submit, store, or track a government application. Prepare here, then apply on the official portal.",
    },
    payments: {
      title: "Payments",
      body: "Course fees shown in the catalog are our learning prices. This website does not take card, bKash, or other payment details.",
    },
    nid: {
      title: "NID or other identity papers",
      body: "Sample guides may name papers an office often asks for. We do not collect scans, numbers, or copies of those papers.",
    },
    accounts: {
      title: "A live account",
      body: "Profile and dashboard pages are sample learning records for demonstrating the product. They are not a live personal file we keep about you.",
    },
    analytics: {
      title: "Our own tracking tools",
      body: "Civic Bangladesh does not run a separate analytics, ad, or marketing pixel on this site.",
    },
  },
  leaving: {
    eyebrow: "Other websites",
    title: "When you leave Civic Bangladesh",
    description:
      "Some buttons open another site. That site has its own rules. We do not receive what you do there.",
    youtube: {
      title: "Course videos",
      body: "If a lesson plays a YouTube video, YouTube may set its own cookies and follow its own privacy policy. Civic Bangladesh does not see that as an application file.",
    },
    officialPortal: {
      title: "Official government portal",
      body: "Apply on Official Portal opens the national portal (bangladesh.gov.bd). Confirm how that site uses information there. Civic Bangladesh does not process the application.",
    },
  },
  clear: {
    eyebrow: "Your controls",
    title: "How to clear what this browser saved",
    description:
      "You do not need to message a ministry. These choices stay on the device you are using.",
    browser: {
      title: "Clear site data in the browser",
      body: "Removing this site’s stored data in your browser also removes the saved language and accessibility preferences.",
    },
    accessibility: {
      title: "Reset display settings",
      body: "The Accessibility page can reset text size, contrast, and related options without leaving Civic Bangladesh.",
      cta: "Open accessibility",
    },
  },
  more: {
    eyebrow: "Related",
    title: "Other Civic Bangladesh pages",
    description:
      "How to use the site, how pages look, and the terms for using Civic Bangladesh.",
    helpCta: "Open Help Center",
    accessibilityCta: "Open accessibility",
    termsCta: "Open terms",
  },
} as const;

export type PrivacyTranslations = TranslationShape<typeof privacy>;
