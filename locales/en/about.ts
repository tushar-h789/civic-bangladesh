import type { TranslationShape } from "@/locales/types";

export const about = {
  title: "Better Citizens. Better Bangladesh.",
  titleSecondary: "সচেতন নাগরিক, সুন্দর বাংলাদেশ।",
  description:
    "A civic-education and government-service learning platform. We help people build everyday civic habits and prepare to use government services correctly.",
  sampleNote:
    "Civic Bangladesh is an independent learning platform. It is not the official government application portal, and it does not process applications.",
  heroImageAlt: "A Bangladesh landscape people share and look after",
  jump: {
    label: "On this page",
    pillars: "Two pillars",
    journey: "How learning works",
    who: "Who it is for",
    notThis: "What we are not",
    start: "Start here",
    official: "Official portal",
  },
  notice: {
    title: "Independent learning. Not a government office.",
    body: "We prepare citizens. The application itself happens on the official government portal. Named government partners would only appear after official confirmation.",
  },
  pillars: {
    title: "Civic learning and service preparation",
    description:
      "Both matter. One does not replace the other. Core civic education stays free.",
    civic: {
      title: "Civic education",
      body: "Everyday habits: roads, cleanliness, public space, transport, digital citizenship, and community responsibility. The civic journey is Learn → Practice → Participate → Inspire → Impact.",
      cta: "Open civic learning",
      imageAlt: "Neighbors planting a sapling together on a roadside",
    },
    services: {
      title: "Government service learning",
      body: "Find a service, learn the papers and process, take a short preparation course, then apply on the official portal. Civic Bangladesh does not submit the file.",
      cta: "Open government services",
      imageAlt: "People following a public process in order",
    },
  },
  journey: {
    title: "How civic learning works",
    description:
      "Small, consistent choices — not slogans. Practice on this site, then in real places.",
    learn: {
      title: "Learn",
      body: "Short free lessons on civic sense and everyday responsibility.",
    },
    practice: {
      title: "Practice",
      body: "Scenarios, quizzes, and civic challenges you can keep in daily life.",
    },
    participate: {
      title: "Participate",
      body: "Join a civic challenge or a public campaign people can join for free.",
    },
    inspire: {
      title: "Inspire",
      body: "Share a habit with a class, a workplace, or a neighbourhood — without pretending it is official.",
    },
    impact: {
      title: "Impact",
      body: "Safer streets, cleaner shared places, and more care in queues, on buses, and online.",
    },
  },
  servicePath: {
    title: "How service preparation works",
    description:
      "Prepare here. Apply there. A course credential records learning on Civic Bangladesh — not a government stamp.",
    find: {
      title: "Find a service",
      body: "Browse the sample catalog. It is for learning — not a complete official list.",
    },
    learnProcess: {
      title: "Learn the process",
      body: "Read who it is for, which papers are listed, and common mistakes. Confirm facts on the official portal.",
    },
    course: {
      title: "Watch a course",
      body: "Optional, affordable preparation. Course fees are ours, not government fees.",
    },
    assess: {
      title: "Complete an assessment",
      body: "A practice check on this site. It is not an official exam result.",
    },
    credential: {
      title: "Earn a learning credential",
      body: "Where the catalog includes one, a Civic Bangladesh certificate records that you finished preparation here.",
    },
    apply: {
      title: "Apply on the official portal",
      body: "Use Apply on Official Portal. Civic Bangladesh does not process the application.",
    },
  },
  who: {
    title: "Who Civic Bangladesh is for",
    description:
      "Anyone who wants civic habits or help preparing for a government service. A school or workplace can share the public lessons.",
    citizens: {
      title: "Everyday citizens",
      body: "Learn a habit, or prepare papers before you visit an office.",
      cta: "Civic learning",
    },
    students: {
      title: "Students and young people",
      body: "Short lessons and service-preparation courses you can follow at your own pace.",
      cta: "Browse courses",
    },
    teachers: {
      title: "Teachers",
      body: "Free civic lessons a class can use. This is not a ministry curriculum.",
      cta: "Civic learning",
    },
    schools: {
      title: "Schools",
      body: "Shared civic learning for a class. Optional programmes are not a government mandate.",
      cta: "Schools",
    },
    organizations: {
      title: "Organizations",
      body: "Teams, NGOs, and CSR programmes can share civic learning. That is not an official partnership.",
      cta: "Organizations",
    },
  },
  notThis: {
    title: "What Civic Bangladesh is not",
    description:
      "We stay visually and legally independent from the official government portal.",
    notPortal: {
      title: "Not the official application portal",
      body: "We do not collect government fees, process files, or track an official application status.",
    },
    notPartnership: {
      title: "Not a confirmed government partner",
      body: "Service categories are a catalog for browsing. No ministry, office, or tender is claimed here.",
    },
    notOfficialCert: {
      title: "Not a government certificate office",
      body: "A credential from this site records Civic Bangladesh learning. It does not stamp papers or replace a licence.",
    },
  },
  start: {
    title: "Choose a path",
    description:
      "Stay on Civic Bangladesh to learn. Use the official portal when you are ready to apply.",
    civicLearning: {
      title: "Civic learning",
      body: "Free topics, scenarios, and the civic promise.",
      cta: "Open civic learning",
    },
    services: {
      title: "Government services",
      body: "Sample guides so you can prepare papers first.",
      cta: "Open services",
    },
    courses: {
      title: "Courses",
      body: "Civic lessons and affordable service preparation.",
      cta: "Open courses",
    },
    challenges: {
      title: "Challenges",
      body: "Small civic habits and quiet learning tasks.",
      cta: "Open challenges",
    },
  },
  official: {
    title: "Apply on the official portal",
    description:
      "Civic Bangladesh prepares you. The application happens on the national government portal. Confirm the exact service, office, and fee there.",
    cta: "Apply on Official Portal",
    prepareCta: "Explore services first",
    note: "Opens the national portal (bangladesh.gov.bd). Civic Bangladesh does not submit or process your application.",
  },
} as const;

export type AboutTranslations = TranslationShape<typeof about>;
