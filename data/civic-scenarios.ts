/**
 * Homepage “What would you do?” situations. Images are existing
 * civic photos — not staged government material. Correct answers
 * live here so locale files only hold copy.
 */
export const HOME_SCENARIOS = [
  {
    key: "dustbin",
    image: "/images/topics/topic-cleanliness.png",
    choiceIds: ["pass", "bin", "wait", "kick"],
    correctChoiceId: "bin",
  },
  {
    key: "crossing",
    image: "/images/home/intro-rules.png",
    choiceIds: ["rush", "wait", "follow", "wave"],
    correctChoiceId: "wait",
  },
  {
    key: "queue",
    image: "/images/topics/topic-social.png",
    choiceIds: ["cut", "stay", "shout", "leave"],
    correctChoiceId: "stay",
  },
  {
    key: "seat",
    image: "/images/home/intro-people.png",
    choiceIds: ["phone", "offer", "other", "sleep"],
    correctChoiceId: "offer",
  },
] as const;

export type HomeScenarioKey = (typeof HOME_SCENARIOS)[number]["key"];
