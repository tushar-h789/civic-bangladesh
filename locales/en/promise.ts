import type { TranslationShape } from "@/locales/types";

export const promise = {
  cta: "I make this promise",
  confirmed: "This is your promise for this visit.",
  sampleNote:
    "Not saved to an account. Come back and choose it again whenever you need the reminder.",
  practiceCta: "Practice it in the 30-day challenge",
  items: {
    useTheBin: {
      title: "I will use the bin",
      description: "Waste goes in a bin — not on the street, drain, or park.",
    },
    waitYourTurn: {
      title: "I will wait my turn",
      description:
        "In queues, at crossings, and on the road, I will not push past others.",
    },
    speakWithCare: {
      title: "I will speak with care",
      description:
        "Online and offline, I will treat people with the dignity I want myself.",
    },
  },
  page: {
    title: "Make your Civic Promise",
    description:
      "Pick one small habit. Keep it this week, in real places. This is a personal reminder — not a government oath, and not a saved account.",
    sampleNote:
      "The promise stays on this visit. Civic Bangladesh does not store it, and it does not create a certificate.",
    heroImageAlt: "A person placing waste into a public bin on a clean lane",
    jump: {
      label: "On this page",
      choose: "Choose a habit",
      how: "How it works",
      notThis: "What this is not",
      more: "Practice",
    },
    notice: {
      title: "A reminder for this visit",
      body: "Choose one habit you can keep this week. Refreshing the page clears it. Nothing here is filed with a government office.",
    },
    choose: {
      title: "Pick one habit",
      description:
        "Three sample promises. Choose the one you can actually keep — on the street, in a queue, or online.",
      chooseAnother: "Choose a different promise",
      topicCta: "Practice this in civic learning",
    },
    how: {
      title: "One habit. This week.",
      description:
        "A Civic Promise is a short reminder you give yourself. It is not a campaign you join, and it is not tracked as a score.",
      pick: {
        title: "Pick one",
        body: "Three everyday habits. One is enough. You can change it on this visit.",
      },
      keep: {
        title: "Keep it this week",
        body: "Use the bin. Wait your turn. Speak with care. The work happens in real places, not on this page.",
      },
      practice: {
        title: "Practice daily if you want",
        body: "The 30-day challenge can hold the habit for a month. Challenge progress on this site is sample, not a live record.",
      },
      visitOnly: {
        title: "It stays on this visit",
        body: "Civic Bangladesh does not save the promise to a profile. Come back and choose it again when you need the reminder.",
      },
    },
    notThis: {
      title: "What a Civic Promise is not",
      description:
        "Keep the line clear. This pledge is for you — not for an office or a certificate.",
      notOath: {
        title: "Not a government oath",
        body: "This is not a legal pledge, a ministry programme, or an official citizen registration.",
      },
      notAccount: {
        title: "Not saved to an account",
        body: "There is no promise history on a profile. Choosing one does not create a login.",
      },
      notCertificate: {
        title: "Not a certificate",
        body: "Making a promise does not earn a Civic Bangladesh credential, and it does not stamp any government paper.",
      },
    },
    more: {
      title: "Keep the habit going",
      description:
        "A promise is a start. Practice it in a challenge, a lesson, or a short story.",
      civicLearning: {
        title: "Civic learning",
        body: "Free topics on cleanliness, queues, speech, and shared places.",
        cta: "Open civic learning",
      },
      challenges: {
        title: "Challenges",
        body: "Small civic actions you can keep for a day, then a month.",
        cta: "Open challenges",
      },
      stories: {
        title: "Stories",
        body: "Sample teaching stories about everyday civic choices.",
        cta: "Open stories",
      },
    },
  },
} as const;

export type PromiseTranslations = TranslationShape<typeof promise>;
