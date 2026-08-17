import { ROUTES } from "@/constants/routes";
import { getCourseCatalog, type CatalogCourse } from "@/data/course-catalog";
import {
  SERVICE_CATEGORY_KEYS,
  getServiceByKey,
  getServicesInCategory,
  type SampleGovernmentService,
  type ServiceCategoryKey,
} from "@/data/government-services";

/**
 * Sample directory names that are not full catalog guides.
 * Titles live in locales. Do not attach fees, times, or document lists.
 */
export const CATEGORY_DIRECTORY_STUB_KEYS = [
  "unmarriedCertificate",
  "bankStatement",
  "propertyAccount",
  "hscCertificate",
  "drivingLicence",
  "medicalCertificate",
  "nid",
  "affidavit",
  "translatedDocuments",
] as const;

export type CategoryDirectoryStubKey =
  (typeof CATEGORY_DIRECTORY_STUB_KEYS)[number];

export const CATEGORY_FAQ_KEYS = [
  "officialPortal",
  "civicDoesNotApply",
  "sampleDirectory",
  "courseFees",
  "outboundWhat",
  "outboundList",
] as const;

export type CategoryFaqKey = (typeof CATEGORY_FAQ_KEYS)[number];

export type CategoryDirectoryEntry = {
  key: string;
  catalogServiceKey: SampleGovernmentService["key"] | null;
};

type CategoryPageConfig = {
  slug: string;
  popularKeys: readonly string[];
  directory: readonly CategoryDirectoryEntry[];
  faqKeys: readonly CategoryFaqKey[];
};

/**
 * Structured sample category pages. Directory entries are browsing names.
 * Only `catalogServiceKey` points at a real sample guide — never invent
 * missing service facts for the rest.
 */
export const SERVICE_CATEGORY_PAGES = {
  outboundAttestation: {
    slug: "outbound-certificate-attestation",
    popularKeys: [
      "sscCertificate",
      "hscCertificate",
      "characterCertificate",
      "nid",
    ],
    directory: [
      { key: "unmarriedCertificate", catalogServiceKey: null },
      { key: "bankStatement", catalogServiceKey: null },
      { key: "propertyAccount", catalogServiceKey: null },
      { key: "sscCertificate", catalogServiceKey: "sscAttestation" },
      { key: "hscCertificate", catalogServiceKey: null },
      { key: "drivingLicence", catalogServiceKey: null },
      { key: "medicalCertificate", catalogServiceKey: null },
      { key: "nid", catalogServiceKey: null },
      { key: "characterCertificate", catalogServiceKey: "characterCertificate" },
      { key: "affidavit", catalogServiceKey: null },
      { key: "translatedDocuments", catalogServiceKey: null },
    ],
    faqKeys: [
      "outboundWhat",
      "outboundList",
      "officialPortal",
      "civicDoesNotApply",
      "sampleDirectory",
      "courseFees",
    ],
  },
  certificatesPermits: {
    slug: "certificates-permits",
    popularKeys: ["characterCertificate"],
    directory: [
      { key: "characterCertificate", catalogServiceKey: "characterCertificate" },
    ],
    faqKeys: [
      "officialPortal",
      "civicDoesNotApply",
      "sampleDirectory",
      "courseFees",
    ],
  },
  registrationLicence: {
    slug: "registration-and-licences",
    popularKeys: ["tradeLicence"],
    directory: [{ key: "tradeLicence", catalogServiceKey: "tradeLicence" }],
    faqKeys: [
      "officialPortal",
      "civicDoesNotApply",
      "sampleDirectory",
      "courseFees",
    ],
  },
  education: {
    slug: "education",
    popularKeys: ["boardCertificate"],
    directory: [
      { key: "boardCertificate", catalogServiceKey: "boardCertificate" },
    ],
    faqKeys: [
      "officialPortal",
      "civicDoesNotApply",
      "sampleDirectory",
      "courseFees",
    ],
  },
  landLease: {
    slug: "land-and-lease",
    popularKeys: ["landMutation"],
    directory: [{ key: "landMutation", catalogServiceKey: "landMutation" }],
    faqKeys: [
      "officialPortal",
      "civicDoesNotApply",
      "sampleDirectory",
      "courseFees",
    ],
  },
  financeBank: {
    slug: "finance-and-banking",
    popularKeys: ["bankSolvency"],
    directory: [{ key: "bankSolvency", catalogServiceKey: "bankSolvency" }],
    faqKeys: [
      "officialPortal",
      "civicDoesNotApply",
      "sampleDirectory",
      "courseFees",
    ],
  },
  agricultureFertilizer: {
    slug: "agriculture-and-fertilizer",
    popularKeys: ["fertilizerSupport"],
    directory: [
      { key: "fertilizerSupport", catalogServiceKey: "fertilizerSupport" },
    ],
    faqKeys: [
      "officialPortal",
      "civicDoesNotApply",
      "sampleDirectory",
      "courseFees",
    ],
  },
  personalApplications: {
    slug: "personal-applications",
    popularKeys: ["birthCertificate"],
    directory: [
      { key: "birthCertificate", catalogServiceKey: "birthCertificate" },
    ],
    faqKeys: [
      "officialPortal",
      "civicDoesNotApply",
      "sampleDirectory",
      "courseFees",
    ],
  },
  other: {
    slug: "other",
    popularKeys: ["generalSupport"],
    directory: [{ key: "generalSupport", catalogServiceKey: "generalSupport" }],
    faqKeys: [
      "officialPortal",
      "civicDoesNotApply",
      "sampleDirectory",
      "courseFees",
    ],
  },
} as const satisfies Record<ServiceCategoryKey, CategoryPageConfig>;

export type CategoryListing =
  | {
      entryKey: string;
      type: "catalog";
      service: SampleGovernmentService;
    }
  | {
      entryKey: string;
      type: "listed";
    };

export function serviceCategoryHref(slug: string) {
  return `${ROUTES.governmentServices}/category/${slug}`;
}

export function serviceCategoryHrefFromKey(category: ServiceCategoryKey) {
  return serviceCategoryHref(SERVICE_CATEGORY_PAGES[category].slug);
}

/** Sample popular list on a category page — not an official government ranking. */
export function samplePopularServicesHref() {
  return `${serviceCategoryHrefFromKey("outboundAttestation")}#popular-services-heading`;
}

export function getServiceCategorySlug(category: ServiceCategoryKey) {
  return SERVICE_CATEGORY_PAGES[category].slug;
}

export function getCategoryKeyBySlug(slug: string) {
  return SERVICE_CATEGORY_KEYS.find(
    (key) => SERVICE_CATEGORY_PAGES[key].slug === slug,
  );
}

export function getCategoryListings(
  category: ServiceCategoryKey,
): CategoryListing[] {
  const page = SERVICE_CATEGORY_PAGES[category];
  const listings: CategoryListing[] = [];
  const shown = new Set<SampleGovernmentService["key"]>();

  for (const entry of page.directory) {
    if (entry.catalogServiceKey) {
      const service = getServiceByKey(entry.catalogServiceKey);
      if (!service) continue;
      listings.push({
        entryKey: entry.key,
        type: "catalog",
        service,
      });
      shown.add(service.key);
      continue;
    }

    listings.push({ entryKey: entry.key, type: "listed" });
  }

  for (const service of getServicesInCategory(category)) {
    if (shown.has(service.key)) continue;
    listings.push({
      entryKey: service.key,
      type: "catalog",
      service,
    });
  }

  return listings;
}

export function getPopularCategoryListings(category: ServiceCategoryKey) {
  const popular = new Set<string>(SERVICE_CATEGORY_PAGES[category].popularKeys);
  return getCategoryListings(category).filter((listing) =>
    popular.has(listing.entryKey),
  );
}

export function countCategoryDirectoryNames(category: ServiceCategoryKey) {
  return SERVICE_CATEGORY_PAGES[category].directory.length;
}

export function getRelatedCoursesForCategory(
  category: ServiceCategoryKey,
): CatalogCourse[] {
  const serviceKeys = new Set<SampleGovernmentService["key"]>(
    getServicesInCategory(category).map((service) => service.key),
  );

  for (const listing of getCategoryListings(category)) {
    if (listing.type === "catalog") {
      serviceKeys.add(listing.service.key);
    }
  }

  return getCourseCatalog().filter((course) => {
    return (
      course.relatedServiceKey != null &&
      serviceKeys.has(course.relatedServiceKey)
    );
  });
}

export function isDirectoryStubKey(
  key: string,
): key is CategoryDirectoryStubKey {
  return (CATEGORY_DIRECTORY_STUB_KEYS as readonly string[]).includes(key);
}
