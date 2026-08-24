import type { Metadata } from "next";

import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "Organization programs | Civic Bangladesh",
  description:
    "Civic learning for teams, NGOs, and CSR programs. Institutional packages are discussed when real — nothing is sold on this page.",
};

export default function OrganizationsPage() {
  return (
    <ProgramPage
      kind="organizations"
      heroImage="/images/home/institutions-organizations.jpg"
    />
  );
}
