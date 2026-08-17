import type { Metadata } from "next";

import { CivicLearningHub } from "@/components/civic/civic-learning-hub";

export const metadata: Metadata = {
  title: "Civic Learning | Civic Bangladesh",
  description:
    "Free civic education on road sense, cleanliness, public space, transport, and community responsibility. Civic Bangladesh teaches habits — it is not a government class.",
};

export default function CivicLearningPage() {
  return <CivicLearningHub />;
}
