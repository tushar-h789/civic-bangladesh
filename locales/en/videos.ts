import type { TranslationShape } from "@/locales/types";

export const videos = {
  title: "Short civic videos",
  description:
    "Brief clips that teach one everyday habit. These are Civic Bangladesh learning clips — not official government films, and not a live TV channel.",
  sampleNote:
    "Six sample clips. Two reuse videos already used in Civic Bangladesh courses. The others are catalog titles without a hosted file yet.",
  heroImageAlt:
    "Pedestrians using a zebra crossing while vehicles wait at a red light",
  jump: {
    label: "On this page",
    clips: "Sample clips",
    how: "How to watch",
    notThis: "What this is not",
    more: "Keep learning",
  },
  notice: {
    title: "Sample clips. Not government films.",
    body: "A hosted clip plays on YouTube’s player. YouTube may set its own cookies. Playing a video is not an application, and it is not a ministry broadcast.",
  },
  filter: {
    label: "Topic",
    all: "All",
    showing: "{count} sample clips",
  },
  watching: {
    sampleBadge: "Sample clip",
    hostedNote:
      "This player is YouTube. Civic Bangladesh does not process an application when you press play.",
    missingTitle: "This clip is not hosted yet",
    missingBody:
      "The title is in the sample catalog so you can learn the habit. There is no Civic Bangladesh video file here, and we have not invented a government film to fill the gap.",
    youtubeCta: "Open on YouTube",
    topicCta: "Practice this in civic learning",
    courseCta: "Open the related course",
    backCta: "All sample clips",
  },
  missing: {
    title: "That clip is not in this sample",
    description:
      "This catalog has six teaching clips. Pick one below. Nothing here is an official government film.",
  },
  list: {
    title: "Six sample clips",
    description:
      "Roads, cleanliness, trees, buses, queues, and a shared wall. Watch one, then keep the habit the same day.",
  },
  how: {
    title: "A clip is a lesson, not an office",
    description:
      "Use these videos to remember one civic choice. Confirm any official service step on the national portal — not in the player.",
    pick: {
      title: "Pick a short clip",
      body: "Each title teaches one habit. Minutes are sample lengths for this catalog.",
    },
    hosted: {
      title: "Some clips play on YouTube",
      body: "Where a course lesson already has a video, we reuse that same file. YouTube’s own terms and privacy rules apply to the player.",
    },
    notHosted: {
      title: "Some titles have no file yet",
      body: "Those cards still teach the habit through the still image and the civic topic. We do not invent a government film to stand in.",
    },
    thenPractice: {
      title: "Then practice the habit",
      body: "Open the related civic topic, a free course, or a challenge. Watching is not a certificate.",
    },
  },
  notThis: {
    title: "What these videos are not",
    description:
      "Keep the line clear between Civic Bangladesh learning and anything official.",
    notGovernment: {
      title: "Not government films",
      body: "These clips are not ministry broadcasts, public-service announcements from an office, or official training cinema.",
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
    title: "After the clip",
    description:
      "A video is a few minutes. The habit lives on the street, in a queue, and in a class.",
    civicLearning: {
      title: "Civic learning",
      body: "Free topics, lessons, and the same short clips in context.",
      cta: "Open civic learning",
    },
    courses: {
      title: "Courses",
      body: "Longer civic and service-preparation lessons, including the two hosted clips.",
      cta: "Open courses",
    },
    stories: {
      title: "Stories",
      body: "Sample teaching stories about the same everyday choices.",
      cta: "Open stories",
    },
  },
} as const;

export type VideosTranslations = TranslationShape<typeof videos>;
