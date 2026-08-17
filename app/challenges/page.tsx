import type { Metadata } from "next";

import { ChallengesHub } from "@/components/challenge/challenges-hub";

export const metadata: Metadata = {
  title: "Challenges | Civic Bangladesh",
  description:
    "Civic challenges for everyday habits, and learning challenges for course preparation. Learning challenges are study progress — not a game or a government result.",
};

export default function ChallengesPage() {
  return <ChallengesHub />;
}
