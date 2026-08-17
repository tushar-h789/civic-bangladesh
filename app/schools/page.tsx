import type { Metadata } from "next";

import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "School programs | Civic Bangladesh",
  description:
    "Civic lessons and challenges a class can use. Core civic education stays free. There is no package to buy on this page.",
};

export default function SchoolsPage() {
  return (
    <ProgramPage kind="schools" heroImage="/images/home/intro-safer.png" />
  );
}
