import type { Metadata } from "next";

import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";

export const metadata: Metadata = {
  title: "Your learning | Civic Bangladesh",
  description:
    "Sample dashboard for civic learning and government-service preparation. Civic Bangladesh does not process government applications.",
};

export default function ProfilePage() {
  return <LearnerDashboard />;
}
