import {
  PRIMARY_REVENUE_KEY,
  PRICING_VALUE_KEYS,
  REVENUE_PRODUCT_HREF,
  SECONDARY_REVENUE_KEYS,
  countPaidServicePrepCourses,
  getSamplePaidCourseFeeRange,
} from "@/data/pricing";
import type { Dictionary } from "@/locales";

export function getPricingValues(t: Dictionary) {
  return PRICING_VALUE_KEYS.map((key) => ({
    key,
    title: t.pricing.values[key].title,
    body: t.pricing.values[key].body,
  }));
}

export function getPrimaryRevenueProduct(t: Dictionary) {
  const copy = t.pricing.products[PRIMARY_REVENUE_KEY];
  const fees = getSamplePaidCourseFeeRange();

  return {
    key: PRIMARY_REVENUE_KEY,
    href: REVENUE_PRODUCT_HREF[PRIMARY_REVENUE_KEY],
    title: copy.title,
    description: copy.description,
    usefulness: copy.usefulness,
    cta: copy.cta,
    feeMin: fees.min,
    feeMax: fees.max,
    paidCount: countPaidServicePrepCourses(),
  };
}

export function getSecondaryRevenueProducts(t: Dictionary) {
  return SECONDARY_REVENUE_KEYS.map((key) => {
    const copy = t.pricing.products[key];

    return {
      key,
      href: REVENUE_PRODUCT_HREF[key],
      title: copy.title,
      description: copy.description,
      usefulness: copy.usefulness,
      cta: copy.cta,
    };
  });
}
