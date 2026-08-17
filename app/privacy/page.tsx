import type { Metadata } from "next";

import { PrivacyPage } from "@/components/privacy/privacy-page";

export const metadata: Metadata = {
  title: "Privacy | Civic Bangladesh",
  description:
    "How Civic Bangladesh handles privacy: language and accessibility preferences can stay on this device. We do not process government applications or take payments on this site.",
};

export default function PrivacyRoute() {
  return <PrivacyPage />;
}
