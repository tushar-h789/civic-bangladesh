import type { TranslationShape } from "@/locales/types";

export const stories = {
  title: "Stories that teach a habit",
  description:
    "Short civic stories from everyday Bangladesh. They are sample teaching stories — not news reports, interviews, or government case studies.",
  sampleNote:
    "This catalog has three sample stories. Names and places are for reading. They are not verified accounts.",
  heroImageAlt: "Neighbors sharing a public place they look after together",
  jump: {
    label: "On this page",
    stories: "Sample stories",
    practice: "Practice a habit",
  },
  notice: {
    title: "Sample stories for learning",
    body: "Each story shows one small civic choice. Civic Bangladesh wrote them to teach a habit. They are not official success stories.",
  },
  filter: {
    label: "Show",
    all: "All",
    showing: "{count} sample stories",
  },
  reading: {
    sampleBadge: "Sample story",
    habitLabel: "The habit",
    topicCta: "Practice this in civic learning",
    backCta: "All sample stories",
  },
  missing: {
    title: "That story is not in this sample",
    description:
      "This catalog has three teaching stories. Pick one below. Nothing here is an official case study.",
  },
  list: {
    title: "Three sample stories",
    description:
      "Citizen, student, and community. Read one, then try the habit the same day.",
  },
  practice: {
    title: "Turn a story into a habit",
    description:
      "Stories inspire. Practice happens on the street, in a queue, and in a class.",
    civicLearning: {
      title: "Civic learning",
      body: "Free topics on roads, queues, parks, buses, and shared places.",
      cta: "Open civic learning",
    },
    challenges: {
      title: "Challenges",
      body: "Small civic actions you can keep for a day, then a month.",
      cta: "Open challenges",
    },
    campaigns: {
      title: "Campaigns",
      body: "Community actions people can join. They are not government programmes.",
      cta: "Open campaigns",
    },
    promise: {
      title: "Civic promise",
      body: "Pick one small habit and keep it this week. It is not saved to an account.",
      cta: "Make a civic promise",
    },
  },
  kinds: {
    citizen: "Citizen",
    student: "Student",
    community: "Community",
  },
  byline: "{name} · {place}",
  cta: "Read story",
  items: {
    seatOnTheBus: {
      title: "The seat I stood up from",
      excerpt:
        "The bus was full. An older woman was holding the rail. I stood up. It took ten seconds. The ride felt different after that.",
      name: "Fahim",
      place: "Dhaka",
      imageAlt:
        "A young man offering his seat to an elderly woman on a public bench",
      one: "The bus was standing room only. An older woman held the rail by the door. I had a seat. I stood up. She sat down. Nobody made a speech. The rest of the ride felt lighter.",
      two: "Civic sense is often ten seconds. A seat, a little space, a quieter voice. The journey belongs to everyone on it.",
      habit: "Offer a seat when someone needs it more than you do.",
    },
    clearCorridor: {
      title: "Our class keeps the corridor clear",
      excerpt:
        "Bags used to block the school hall. We made a rule: bags against the wall, path in the middle. Now everyone can walk.",
      name: "Nabila, Class 8",
      place: "Rajshahi",
      imageAlt: "An open public plaza with trees and people walking",
      one: "Bags used to sit in the middle of our school hall. People stepped over them. One week we agreed: bags against the wall, a clear path in the middle.",
      two: "The next morning the corridor felt wider. No one had to wait for a teacher to fix it. A shared rule is a small kindness you can keep every day.",
      habit: "Keep shared paths clear so everyone can walk.",
    },
    paintedLane: {
      title: "We painted the lane together",
      excerpt:
        "The wall by our lane was marked and dull. Neighbors brought brushes. One Saturday later, the lane felt like ours again.",
      name: "Neighbors",
      place: "Chattogram",
      imageAlt: "Neighbors painting a school wall together",
      one: "The wall by our lane was marked and dull. A few neighbors brought brushes one Saturday. We did not wait for a programme. We painted what we could reach.",
      two: "By afternoon the lane looked cared for. The work was ordinary. The feeling was not. A shared place changes when the people who use it show up together.",
      habit: "Care for a shared place with the people who use it.",
    },
  },
} as const;

export type StoriesTranslations = TranslationShape<typeof stories>;
