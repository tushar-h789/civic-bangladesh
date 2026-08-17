import type { Metadata } from "next";

import { CampaignsHub } from "@/components/campaign/campaigns-hub";

export const metadata: Metadata = {
  title: "Campaigns | Civic Bangladesh",
  description:
    "Civic campaigns people can join for free. Partnerships would support awareness — they are not sold as sponsorship slots on this page.",
};

export default function CampaignsPage() {
  return <CampaignsHub />;
}
