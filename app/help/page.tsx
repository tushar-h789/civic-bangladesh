import type { Metadata } from "next";

import { HelpPage } from "@/components/help/help-page";

export const metadata: Metadata = {
  title: "Help Center | Civic Bangladesh",
  description:
    "Help using Civic Bangladesh: find a service, start a course, and apply on the official portal. This is not a government helpdesk, and we do not process applications.",
};

export default function HelpRoute() {
  return <HelpPage />;
}
