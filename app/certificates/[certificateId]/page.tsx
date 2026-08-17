import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CertificateDetail } from "@/components/certificates/certificate-detail";
import {
  getCertificateById,
  getEarnedCertificates,
} from "@/data/certificates";
import { getCatalogCourseBySlug } from "@/data/course-catalog";
import { getCourseCopy } from "@/lib/get-course-copy";
import { en } from "@/locales/en";

type CertificatePageProps = {
  params: Promise<{ certificateId: string }>;
};

export function generateStaticParams() {
  return getEarnedCertificates().map((entry) => ({
    certificateId: entry.id,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: CertificatePageProps): Promise<Metadata> {
  const { certificateId } = await params;
  const entry = getCertificateById(certificateId);

  if (!entry) {
    return { title: "Certificate | Civic Bangladesh" };
  }

  const course = getCatalogCourseBySlug(entry.courseSlug);
  const title = course ? getCourseCopy(course, en).title : entry.id;

  return {
    title: `${title} · Certificate | Civic Bangladesh`,
    description:
      "A Civic Bangladesh learning credential. This is not a government certificate.",
  };
}

export default async function CertificatePage({ params }: CertificatePageProps) {
  const { certificateId } = await params;
  const entry = getCertificateById(certificateId);

  if (!entry) {
    notFound();
  }

  return <CertificateDetail certificateId={entry.id} />;
}
