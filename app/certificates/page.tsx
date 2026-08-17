import type { Metadata } from "next";

import { CertificatesList } from "@/components/certificates/certificates-list";

export const metadata: Metadata = {
  title: "Certificates | Civic Bangladesh",
  description:
    "Sample Civic Bangladesh learning credentials. These are not government certificates.",
};

export default function CertificatesPage() {
  return <CertificatesList />;
}
