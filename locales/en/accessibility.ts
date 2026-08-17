import type { TranslationShape } from "@/locales/types";

export const accessibility = {
  trigger: "Open accessibility settings",
  title: "Accessibility settings",
  description:
    "Customize how Civic Bangladesh looks and behaves. Preferences are saved on this device.",
  textSize: {
    label: "Text size",
    decrease: "Decrease font size",
    increase: "Increase font size",
    reset: "Reset font size",
  },
  toggles: {
    highContrast: {
      label: "High contrast",
      description: "Stronger contrast between text and background.",
    },
    monochrome: {
      label: "Monochrome",
      description: "Removes color from the whole page.",
    },
    invertColors: {
      label: "Invert colors",
      description: "Inverts page colors; photos stay unaffected.",
    },
    highlightLinks: {
      label: "Highlight links",
      description: "Outlines and underlines every link on the page.",
    },
    highlightHeadings: {
      label: "Highlight headings",
      description: "Outlines every heading so page structure is easy to scan.",
    },
    largeCursor: {
      label: "Large cursor",
      description: "Shows a bigger, high-contrast cursor.",
    },
    reduceMotion: {
      label: "Reduce motion",
      description:
        "Turns off animations and transitions. Also follows your system setting automatically.",
    },
  },
  resetAll: "Reset all settings",
  page: {
    eyebrow: "Support",
    title: "Accessibility on Civic Bangladesh",
    description:
      "Change how this site looks on your device. These controls belong to Civic Bangladesh. They do not change a government portal.",
    sampleNote:
      "Preferences are saved on this device. This page is not a government accessibility statement, and it is not a published WCAG audit.",
    heroImageAlt: "A calm public path that is easy to follow",
    jump: {
      label: "On this page",
      settings: "Settings",
      how: "How it works",
      limits: "What this is not",
      more: "More support",
    },
    notice: {
      title: "Civic Bangladesh display settings",
      body: "Use the round button at the bottom left of any page, or the controls below. They do not speak for a ministry, and they do not make an official website more readable.",
    },
    settings: {
      eyebrow: "On this device",
      title: "Change how pages look",
      description:
        "The same options as the accessibility button. Text size, contrast, motion, and highlights apply across Civic Bangladesh on this browser.",
      textSizeHint: "From {min}% to {max}%. Only text size changes — not spacing or layout.",
    },
    how: {
      eyebrow: "This website",
      title: "How accessibility works here",
      description: "What these controls actually do, and where they stop.",
      button: {
        title: "A button on every page",
        body: "The accessibility icon stays at the bottom left. Open it from any Civic Bangladesh page, including this one.",
      },
      saved: {
        title: "Saved on this device",
        body: "Choices are stored in this browser. They are not tied to a Civic Bangladesh account, and they are not sent to a government office.",
      },
      motion: {
        title: "Motion follows your system too",
        body: "If your device asks to reduce motion, Civic Bangladesh starts with motion reduced. You can still turn the control on or off here.",
      },
      language: {
        title: "Bangla and English",
        body: "Language is separate from these display settings. Use the language switcher in the header or footer. Bangla is the default.",
      },
    },
    limits: {
      eyebrow: "Limits",
      title: "What this page is not",
      description:
        "We describe the controls that exist on Civic Bangladesh. We do not publish a government accessibility certificate here.",
      items: {
        notGovernment:
          "Not an official accessibility statement for any ministry or national portal.",
        notAudit: "Not a WCAG certification or a completed third-party audit published on this page.",
        notPortal:
          "Does not change contrast, type, or forms on bangladesh.gov.bd or other government sites.",
        notHelpline:
          "Not an accessibility helpdesk, complaint office, or assistive-technology vendor.",
      },
    },
    more: {
      eyebrow: "Next",
      title: "Need help using the site?",
      description:
        "For how Civic Bangladesh works, open Help. For short answers, open the FAQ.",
      helpCta: "Open Help Center",
      faqCta: "Open FAQ",
    },
  },
} as const;

export type AccessibilityTranslations = TranslationShape<typeof accessibility>;
