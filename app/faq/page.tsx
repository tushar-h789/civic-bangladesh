import type { Metadata } from "next";

import { FaqPage } from "@/components/faq/faq-page";

export const metadata: Metadata = {
  title: "FAQ | Civic Bangladesh",
  description:
    "Answers about Civic Bangladesh: civic learning, government-service preparation, courses, and certificates. This is not the official government portal, and we do not process applications.",
};

export default function FaqRoute() {
  return <FaqPage />;
}
