import type { TranslationShape } from "@/locales/types";

export const community = {
  title: "Take part with others",
  description:
    "Join in through campaigns, stories, promises, and challenges. This is shared civic practice — not a live social network, and not a government ward portal.",
  sampleNote:
    "There is no member feed or chat here. Campaign counts that mention community are sample figures.",
  heroImageAlt: "Neighbors painting a school wall together",
  stats: {
    ways: "4 ways to take part",
    noFeed: "No live feed or chat",
  },
  jump: {
    label: "On this page",
    ways: "Ways to take part",
    campaigns: "Sample campaigns",
    how: "How it works",
    notThis: "What this is not",
    groups: "Schools and teams",
  },
  notice: {
    title: "Participation, not a live forum",
    body: "Civic Bangladesh does not run a discussion board, member directory, or neighbourhood registry here. You take part through the pages already on this site.",
  },
  ways: {
    title: "Ways to take part",
    description:
      "Each path is already on Civic Bangladesh. None of them files anything with a government office.",
    campaigns: {
      title: "Join a civic campaign",
      body: "Sample community actions for cleaner lanes, safer crossings, and shared care. They are not government programmes.",
      cta: "Open campaigns",
    },
    stories: {
      title: "Read community stories",
      body: "Short teaching stories about everyday choices. They are sample narratives — not news or official case studies.",
      cta: "Open stories",
    },
    promise: {
      title: "Make a civic promise",
      body: "Pick one small habit for this visit. It is not saved to an account, and it is not a government oath.",
      cta: "Open Civic Promise",
    },
    challenges: {
      title: "Keep a civic challenge",
      body: "Small habits you can practice for a day or a month. Challenge progress on this site is sample, not a live record.",
      cta: "Open challenges",
    },
  },
  campaigns: {
    title: "Sample campaigns",
    description:
      "The same sample campaigns as the campaigns page. Participant counts are demo figures.",
    browseCta: "Browse all campaigns",
  },
  how: {
    title: "How community works here",
    description:
      "Practice a habit, then share it with a class, a lane, or a workplace — without pretending it is official.",
    join: {
      title: "Join a shared action",
      body: "Pick a campaign or a challenge. Joining on this site is learning and practice, not a government registration.",
    },
    practice: {
      title: "Keep the habit yourself",
      body: "A Civic Promise or a daily challenge stays with you. The work happens on the street, in a queue, and online.",
    },
    inspire: {
      title: "Learn from a story",
      body: "Sample stories show one small choice. They are written to teach — not to rank people or neighbourhoods.",
    },
    share: {
      title: "Share it with a group",
      body: "A class or team can use the public civic lessons. That is shared learning, not a ministry programme.",
    },
  },
  notThis: {
    title: "What this is not",
    description:
      "Civic Bangladesh is not a live public forum and not a government office.",
    notFeed: {
      title: "Not a live social feed",
      body: "You cannot post, comment, or message other people here. There is no member chat on this website.",
    },
    notDirectory: {
      title: "Not a people directory",
      body: "This page does not list citizens, volunteers, or local groups. Names in sample stories are for reading only.",
    },
    notGovernment: {
      title: "Not a government community portal",
      body: "Civic Bangladesh does not register a ward, union, or neighbourhood, and it does not run an official civic body.",
    },
  },
  groups: {
    title: "If you bring a class or a team",
    description:
      "Schools and organisations can share the same public civic lessons. Optional programmes are discussed when they are real — nothing is sold on this page.",
    schools: {
      title: "Schools",
      body: "Free civic lessons a class can use. Not a ministry curriculum.",
      cta: "Open schools",
    },
    organizations: {
      title: "Organizations",
      body: "Teams, NGOs, and CSR programmes can share civic learning. That is not an official partnership.",
      cta: "Open organizations",
    },
    topic: {
      title: "Community responsibility",
      body: "A free civic topic on taking ownership of a shared place with the people who use it.",
      cta: "Open the topic",
    },
  },
} as const;

export type CommunityTranslations = TranslationShape<typeof community>;
