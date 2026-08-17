import type { Metadata } from "next";

import { PricingPage } from "@/components/pricing/pricing-page";

export const metadata: Metadata = {
  title: "Pricing | Civic Bangladesh",
  description:
    "Low-cost, transparent Civic Bangladesh course fees. Government service preparation is the main paid product. Core civic education stays free. No payments are taken on this site.",
};

export default function PricingRoute() {
  return <PricingPage />;
}
