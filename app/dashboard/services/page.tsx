import type { Metadata } from "next";

import { ServicesDashboard } from "@/components/dashboard/services-dashboard";

export const metadata: Metadata = {
  title: "Service learning tracker | Civic Bangladesh",
  description:
    "Track government services you are learning about. Learning status is Civic Bangladesh preparation only. Official application status is not connected.",
};

export default function DashboardServicesPage() {
  return <ServicesDashboard />;
}
