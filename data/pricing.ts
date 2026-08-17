import { ROUTES } from "@/constants/routes";
import { getCourseCatalog } from "@/data/course-catalog";

/**
 * Sample Civic Bangladesh pricing. Amounts are our course fees from
 * the catalog — not government fees, and not live payment rates.
 */
export const PRICING_VALUE_KEYS = [
  "lowCost",
  "transparent",
  "citizenFriendly",
  "noUpsell",
] as const;

export type PricingValueKey = (typeof PRICING_VALUE_KEYS)[number];

export const PRIMARY_REVENUE_KEY = "servicePrep" as const;

export type PrimaryRevenueKey = typeof PRIMARY_REVENUE_KEY;

export const SECONDARY_REVENUE_KEYS = [
  "civicPremium",
  "certificateServices",
  "institutional",
  "schools",
  "organizations",
  "campaigns",
] as const;

export type SecondaryRevenueKey = (typeof SECONDARY_REVENUE_KEYS)[number];

export type RevenueProductKey = PrimaryRevenueKey | SecondaryRevenueKey;

export const REVENUE_PRODUCT_HREF: Record<RevenueProductKey, string> = {
  servicePrep: ROUTES.courses,
  civicPremium: ROUTES.learn,
  certificateServices: ROUTES.certificates,
  institutional: `${ROUTES.organizations}#institutional-packages`,
  schools: ROUTES.schools,
  organizations: ROUTES.organizations,
  campaigns: `${ROUTES.campaigns}#partnerships`,
};

export function getSamplePaidCourseFeeRange() {
  const amounts = getCourseCatalog()
    .map((course) => course.priceBdt)
    .filter((amount): amount is number => amount != null && amount > 0);

  if (amounts.length === 0) {
    return { min: 0, max: 0, count: 0 };
  }

  return {
    min: Math.min(...amounts),
    max: Math.max(...amounts),
    count: amounts.length,
  };
}

export function countPaidServicePrepCourses() {
  return getCourseCatalog().filter(
    (course) => course.type === "servicePrep" && course.priceBdt != null,
  ).length;
}
