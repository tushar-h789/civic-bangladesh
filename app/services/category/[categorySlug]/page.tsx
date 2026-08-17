import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceCategoryPage } from "@/components/services/service-category-page";
import { SERVICE_CATEGORY_KEYS } from "@/data/government-services";
import {
  SERVICE_CATEGORY_PAGES,
  getCategoryKeyBySlug,
} from "@/data/service-categories";
import { en } from "@/locales/en";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export function generateStaticParams() {
  return SERVICE_CATEGORY_KEYS.map((key) => ({
    categorySlug: SERVICE_CATEGORY_PAGES[key].slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryKeyBySlug(categorySlug);

  if (!category) {
    return { title: "Service category | Civic Bangladesh" };
  }

  const title = en.services.categoryItems[category].title;
  const description = en.serviceCategory.pages[category].lead;

  return {
    title: `${title} | Civic Bangladesh`,
    description,
  };
}

export default async function ServiceCategoryRoute({
  params,
}: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getCategoryKeyBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  return <ServiceCategoryPage category={category} />;
}
