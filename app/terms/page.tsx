import type { Metadata } from "next";

import { TermsPage } from "@/components/terms/terms-page";

export const metadata: Metadata = {
  title: "Terms of use | Civic Bangladesh",
  description:
    "Terms for using Civic Bangladesh as a learning website. This is not a government portal, not a paid contract, and not legal advice. Apply on the official government portal.",
};

export default function TermsRoute() {
  return <TermsPage />;
}
