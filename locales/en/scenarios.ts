import type { TranslationShape } from "@/locales/types";

export const scenarios = {
  player: {
    progress: "{current} / {total}",
    choiceGroupLabel: "Your choice",
    confirm: "Confirm",
    confirmHint: "Choose one answer first.",
    correct: "That’s civic sense",
    incorrect: "A better choice",
    explanationLabel: "Why",
    next: "Next situation",
    finish: "See how you did",
    restart: "Try again",
    completeTitle: "These situations are done",
    completeDescription:
      "Civic sense is this small: one honest choice, then another, in ordinary places.",
    scoreLabel: "{score} of {total} thoughtful choices",
  },
  items: {
    dustbin: {
      topic: "Cleanliness",
      prompt:
        "There is a dustbin by the road, and some litter lying close to it. What would you do?",
      imageAlt: "A person placing waste into a public bin on a clean lane",
      choices: {
        pass: "Walk past and leave it",
        bin: "Pick it up and put it in the bin",
        wait: "Wait for a cleaner to come",
        kick: "Kick it off to the side",
      },
      explanation:
        "The bin is right there. Putting the litter in takes a moment, and the street stays cleaner for everyone. You do not need to wait for someone else.",
    },
    crossing: {
      topic: "Road & Traffic",
      prompt:
        "You are late. The light is red, but the road looks empty. What would you do?",
      imageAlt:
        "Pedestrians using a zebra crossing while vehicles wait at a red light",
      choices: {
        rush: "Cross quickly while no car is coming",
        wait: "Wait, then use the crossing",
        follow: "Go if other people go",
        wave: "Wave at cars to stop and walk through",
      },
      explanation:
        "An empty road can still be dangerous. Waiting for the light and using the crossing keeps you — and drivers — safer. Rules work when we keep them on quiet days too.",
    },
    queue: {
      topic: "Social Responsibility",
      prompt:
        "There is a line at the bus stop. Someone is cutting in front. What would you do?",
      imageAlt: "People waiting calmly in a public queue",
      choices: {
        cut: "Cut in as well, so I am not last",
        stay: "Stay in my place in the line",
        shout: "Shout at them until they move",
        leave: "Leave angry and skip the bus",
      },
      explanation:
        "A line is a shared rule. Staying in place keeps the stop fair. Cutting back, or turning the moment into a fight, makes the wait harder for everyone.",
    },
    seat: {
      topic: "Respect People",
      prompt:
        "You are sitting on the bus. An older person is standing nearby. What would you do?",
      imageAlt: "A young man offering his seat to an elderly woman on a public bench",
      choices: {
        phone: "Keep sitting and look at my phone",
        offer: "Stand up and offer the seat",
        other: "Tell someone else to get up",
        sleep: "Pretend to be asleep",
      },
      explanation:
        "A seat is a small kindness with a big effect. Offering it is respect you can show in a few seconds — without asking someone else to do it for you.",
    },
  },
} as const;

export type ScenariosTranslations = TranslationShape<typeof scenarios>;
