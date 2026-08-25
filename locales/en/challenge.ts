import type { TranslationShape } from "@/locales/types";

export const challenge = {
  featured: {
    kicker: "Featured challenge",
    title: "30 Days. 30 Better Habits.",
    description:
      "One small civic habit each day. No slogans — just the next honest action on the street, on a bus, or in a queue.",
    duration: "30 days",
    imageAlt: "Neighbors planting a sapling together on a roadside",
  },
  progress: {
    label: "{completed} of {total} days kept",
    sampleNote: "Sample journey — example progress, not live tracking.",
  },
  today: {
    kicker: "Today",
    minutes: "{count} min",
  },
  states: {
    completed: "Kept",
    today: "Today",
    missed: "Missed",
    upcoming: "Upcoming",
  },
  preview: {
    day: "Day {day}",
    completedBody: "You kept this habit in the sample journey.",
    missedBody:
      "This day was missed. The challenge still works if you keep the next one.",
    upcomingBody: "This habit comes later in the 30 days.",
    todayBody: "A short action you can finish today.",
  },
  cta: {
    today: "Do today’s habit",
    continue: "Continue the challenge",
    browse: "See all 30 days",
  },
  categories: {
    cleanliness: {
      title: "Cleanliness",
      description: "Keep shared streets, bins, and drains usable.",
    },
    traffic: {
      title: "Traffic",
      description: "Wait, look, and give way so streets stay safer.",
    },
    environment: {
      title: "Environment",
      description: "Protect water, trees, and what we throw away.",
    },
    publicSpace: {
      title: "Public space",
      description: "Leave parks, paths, and stops clearer for the next person.",
    },
    socialResponsibility: {
      title: "Social responsibility",
      description: "Treat people in queues, on buses, and in public with care.",
    },
  },
  page: {
    title: "Practice a habit. Finish a lesson.",
    description:
      "Civic challenges are small actions in real places. Learning challenges are preparation tasks on this site. Neither is a government application, and learning challenges are not a game.",
    sampleNote:
      "Sample catalog. Habit days and course progress are demo fields — not live tracking.",
    heroImageAlt: "Neighbors planting a sapling together on a roadside",
    jump: {
      label: "On this page",
      civic: "Civic challenges",
      learning: "Learning challenges",
    },
    civic: {
      title: "Civic challenges",
      description:
        "Five kinds of everyday habit. The 30-day journey on the homepage uses these same categories.",
      openDay: "Open the 30-day journey",
      days: "{count} habits",
      filterLabel: "Habit type",
      all: "All types",
      calendarHint:
        "Pick a day to read the habit. Marking it kept stays on this visit only — it is not saved to an account.",
      markKept: "Mark as kept this visit",
      markedNote: "Marked kept on this visit — not live tracking.",
      keptInCategory: "{kept} of {total} kept",
      jumpToday: "Today’s habit",
      lockedUpcoming: "This day comes later in the sample journey.",
    },
    learning: {
      title: "Learning challenges",
      description:
        "Quiet preparation tasks. Finish a lesson, a course video, an assessment, or a Civic Bangladesh learning credential. This is study progress — not points, streaks, or a government result.",
      sampleNote: "Sample progress for one learner. Not a live account.",
      related: "Related course",
      progress: "{completed} of {total}",
      filterLabel: "Task status",
      all: "All tasks",
      pathLabel: "Preparation path",
      selectHint:
        "Choose a task to open the related course. This is sample study progress — not a game and not a government result.",
      doneOf: "{completed} of {total} sample tasks finished",
      step: "Step {index}",
    },
  },
  learningItems: {
    civicLesson: {
      title: "Complete a civic lesson",
      description:
        "Finish the next free civic lesson. Core civic education stays free.",
      cta: "Continue the lesson",
      ctaDone: "Review the lesson",
    },
    serviceVideo: {
      title: "Complete a government service video",
      description:
        "Watch the next Civic Bangladesh preparation video for a government service. It is our course video — not an official government film.",
      cta: "Continue the video",
      ctaDone: "Review the video",
    },
    serviceAssessment: {
      title: "Complete a service assessment",
      description:
        "Take the short check at the end of a service course. It confirms you understood how to prepare. It is not a government exam or result.",
      cta: "Open the assessment",
      ctaDone: "Review the assessment",
    },
    earnCertificate: {
      title: "Earn a certificate",
      description:
        "Complete a course that includes a Civic Bangladesh learning credential. It is not a government certificate.",
      cta: "View the credential",
      ctaDone: "View the credential",
    },
  },
  learningStatus: {
    notStarted: "Not started",
    inProgress: "In progress",
    completed: "Completed",
  },
  calendar: {
    label: "30-day progress",
    legendCompleted: "Kept",
    legendToday: "Today",
    legendMissed: "Missed",
    legendUpcoming: "Upcoming",
    dayLabel: "Day {day}, {title}, {status}",
  },
  habits: {
    1: {
      title: "Use the bin",
      summary:
        "If you have something to throw away, put it in a bin — not on the road.",
    },
    2: {
      title: "Wait for green",
      summary: "Even if the road looks empty, wait for the light. Then cross.",
    },
    3: {
      title: "Stay in line",
      summary: "Keep your place in a queue. A line is a rule we share.",
    },
    4: {
      title: "Offer your seat",
      summary:
        "If someone older or unwell is standing, stand up and offer the seat.",
    },
    5: {
      title: "Keep the footpath clear",
      summary: "Don’t leave a bike, bag, or stall where people need to walk.",
    },
    6: {
      title: "Speak with care",
      summary: "In public, keep your voice steady. Respect costs nothing.",
    },
    7: {
      title: "Carry your own bag",
      summary:
        "Take a bag to the shop so you are not asking for extra plastic.",
    },
    8: {
      title: "Horn only if needed",
      summary: "Use the horn for safety — not to rush someone.",
    },
    9: {
      title: "Help with directions",
      summary: "If someone looks lost, stop and point the way if you can.",
    },
    10: {
      title: "Don’t spit on the street",
      summary:
        "The street is shared. Keep it clean enough for a child to walk.",
    },
    11: {
      title: "Don’t waste water",
      summary: "Close a tap that is running without use. Water is not endless.",
    },
    12: {
      title: "Give way at the crossing",
      summary: "Slow down and let people finish crossing before you move.",
    },
    13: {
      title: "Don’t block the bus door",
      summary: "Stand aside so others can get on and off. The ride is shared.",
    },
    14: {
      title: "Pick up one piece of litter",
      summary: "If it is safe, pick up one thing that is not yours and bin it.",
    },
    15: {
      title: "Thank someone who serves",
      summary: "A conductor, a cleaner, a guard — say thank you once, clearly.",
    },
    16: {
      title: "Don’t dump in the drain",
      summary: "Drains flood when we treat them as bins. Find a proper place.",
    },
    17: {
      title: "Keep phone calls quiet",
      summary: "On a bus or in a line, keep the call short and low.",
    },
    18: {
      title: "Park without blocking",
      summary: "Leave space for a rickshaw, a wheelchair, and the next car.",
    },
    19: {
      title: "Share the sidewalk",
      summary:
        "Walk so an older person or a child can pass without stepping into the road.",
    },
    20: {
      title: "Don’t throw from vehicles",
      summary: "Hold the wrapper until you find a bin. The road is not a bin.",
    },
    21: {
      title: "Leave the park cleaner",
      summary:
        "Take your packets with you. Leave the bench and the grass as you found them.",
    },
    22: {
      title: "Don’t spread a rumor",
      summary:
        "If you did not check it, don’t forward it. Online is still public.",
    },
    23: {
      title: "Arrive on time",
      summary:
        "Be on time for a shared appointment. Waiting is a cost you pass to others.",
    },
    24: {
      title: "Leave the bench as you found it",
      summary:
        "Don’t carve, pile bags, or leave food. The next person sits after you.",
    },
    25: {
      title: "Quiet streets after dark",
      summary:
        "In a residential lane at night, keep the horn and the music down.",
    },
    26: {
      title: "Help a lost child",
      summary:
        "Stay with them in a public place and look for a parent or staff nearby.",
    },
    27: {
      title: "Don’t waste food",
      summary:
        "Take what you will eat. Leftovers on a stall table still cost someone.",
    },
    28: {
      title: "Tell someone about a leak",
      summary:
        "If a public tap is running, tell a caretaker or a neighbor who can close it.",
    },
    29: {
      title: "Water a roadside tree",
      summary: "If a young tree looks dry, give it a little water on your way.",
    },
    30: {
      title: "Pass one habit on",
      summary:
        "Tell one younger person one habit you kept. Civic sense spreads by example.",
    },
  },
} as const;

export type ChallengeTranslations = TranslationShape<typeof challenge>;
