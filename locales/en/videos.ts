import type { TranslationShape } from "@/locales/types";

export const videos = {
  title: "Short civic videos",
  description:
    "A few minutes on one everyday habit. These are Civic Bangladesh learning clips — not government films, and not a TV channel.",
  sampleNote:
    "Six sample clips. Two can play here. The others teach the habit with a still photo until a video file is ready.",
  heroImageAlt:
    "Pedestrians using a zebra crossing while vehicles wait at a red light",
  stats: {
    clips: "{count} sample clips",
    ready: "{count} ready to play",
  },
  jump: {
    label: "On this page",
    clips: "Sample clips",
    how: "How to watch",
    notThis: "What this is not",
    more: "Keep learning",
  },
  notice: {
    title: "Sample clips. Not government films.",
    body: "A hosted clip plays in YouTube’s player. YouTube may set its own cookies. Playing a video is not an application, and it is not a ministry broadcast.",
  },
  filter: {
    label: "Topic",
    all: "All topics",
    showing: "{count} clips",
  },
  watching: {
    sampleBadge: "Sample clip",
    hostedNote:
      "This player is YouTube. Pressing play does not file an application.",
    missingTitle: "This clip is not ready to play yet",
    missingBody:
      "The title is in this sample so you can still learn the habit. There is no video file here, and we have not invented a government film to fill the gap.",
    youtubeCta: "Watch on YouTube",
    topicCta: "Open this civic topic",
    courseCta: "Open the related course",
    backCta: "Back to all clips",
  },
  missing: {
    title: "That clip is not in this sample",
    description:
      "This page has six teaching clips. Choose one below. None of them is an official government film.",
  },
  list: {
    title: "Sample clips",
    description:
      "Roads, cleanliness, trees, buses, queues, and a shared wall. Watch one, then keep the habit the same day.",
    readyToPlay: "Ready to play",
    photoOnly: "Photo only for now",
  },
  how: {
    title: "How to use these clips",
    description:
      "Watch, then practice. Confirm any official service step on the government portal — not in the player.",
    pick: {
      title: "Choose a short clip",
      body: "Each title teaches one habit. The minutes shown are sample lengths.",
    },
    hosted: {
      title: "Some clips play here",
      body: "If a course already has a video, we reuse that same file. YouTube’s own terms apply to the player.",
    },
    notHosted: {
      title: "Some clips are still photos",
      body: "Those cards still teach the habit. We do not invent a government film to stand in.",
    },
    thenPractice: {
      title: "Then practice the habit",
      body: "Open the related topic, a free course, or a challenge. Watching is not a certificate.",
    },
  },
  notThis: {
    title: "What this is not",
    description:
      "Civic Bangladesh helps you learn. It does not speak for a government office.",
    notGovernment: {
      title: "Not government films",
      body: "These clips are not ministry broadcasts or official training cinema.",
    },
    notChannel: {
      title: "Not an official YouTube channel",
      body: "Reusing a course video does not mean Civic Bangladesh speaks for a government office on YouTube.",
    },
    notApplication: {
      title: "Not an application desk",
      body: "Playing a video does not file papers, pay a fee, or change an official status.",
    },
  },
  more: {
    title: "Keep learning after the clip",
    description:
      "A video lasts a few minutes. The habit lives on the street, in a queue, and in a class.",
    civicLearning: {
      title: "Civic learning",
      body: "Free topics, lessons, and the same short clips in context.",
      cta: "Open civic learning",
    },
    courses: {
      title: "Courses",
      body: "Longer civic and service-preparation lessons, including the two clips that can play here.",
      cta: "Open courses",
    },
    stories: {
      title: "Stories",
      body: "Short teaching stories about the same everyday choices.",
      cta: "Open stories",
    },
  },
} as const;

export type VideosTranslations = TranslationShape<typeof videos>;
