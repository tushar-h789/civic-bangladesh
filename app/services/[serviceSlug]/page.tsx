import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/services/service-detail";
import {
  SAMPLE_GOVERNMENT_SERVICES,
  getServiceBySlug,
} from "@/data/government-services";
import { en } from "@/locales/en";

type ServicePageProps = {
  params: Promise<{ serviceSlug: string }>;
};

export function generateStaticParams() {
  return SAMPLE_GOVERNMENT_SERVICES.map((service) => ({
    serviceSlug: service.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return { title: "Service | Civic Bangladesh" };
  }

  const item = en.services.items[service.key];

  return {
    title: `${item.title} | Civic Bangladesh`,
    description: item.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail slug={service.slug} />;
}
