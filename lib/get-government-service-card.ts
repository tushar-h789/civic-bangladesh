import { catalogCourseHref } from "@/data/civic-courses";
import {
  getServiceOfficialSource,
  serviceHref,
  type SampleGovernmentService,
} from "@/data/government-services";
import { serviceCategoryHrefFromKey } from "@/data/service-categories";
import type { Dictionary } from "@/locales";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

export type GovernmentServiceCardModel = {
  href: string;
  officialHref: string;
  title: string;
  category: string;
  categoryHref: string;
  authority: string;
  description: string;
  documents: string;
  processingTime: string;
  governmentFee: string;
  course: {
    label: string;
    price: string;
    href: string;
  } | null;
};

export function getGovernmentServiceCardModel(
  service: SampleGovernmentService,
  t: Dictionary,
): GovernmentServiceCardModel {
  const item = t.services.items[service.key];
  const source = getServiceOfficialSource(service);
  const copy = t.services.card;
  const course = service.course
    ? {
        label: copy.courseIndicator,
        price:
          service.course.access === "free"
            ? copy.courseFree
            : formatTemplate(copy.coursePrice, {
                amount: service.course.priceBdt,
              }),
        href: catalogCourseHref(service.course.slug),
      }
    : null;

  return {
    href: serviceHref(service.slug),
    officialHref: source.href,
    title: item.title,
    category: t.services.categoryItems[service.category].title,
    categoryHref: serviceCategoryHrefFromKey(service.category),
    authority: source.verifiedAuthorityName ?? t.serviceSource.portalName,
    description: item.description,
    documents: formatTemplate(copy.documents, {
      count: service.documentCount,
    }),
    processingTime: item.processingTime,
    governmentFee:
      service.feeType === "paid" ? copy.feePaid : copy.feeFree,
    course,
  };
}
