import { ROUTES } from "@/constants/routes";
import type { CourseAccess, CourseDifficulty } from "@/data/civic-courses";

export const SERVICE_CATEGORY_KEYS = [
  "outboundAttestation",
  "certificatesPermits",
  "registrationLicence",
  "education",
  "landLease",
  "financeBank",
  "agricultureFertilizer",
  "personalApplications",
  "other",
] as const;

export type ServiceCategoryKey = (typeof SERVICE_CATEGORY_KEYS)[number];

export const SERVICE_CITIZEN_TYPE_KEYS = [
  "general",
  "student",
  "outbound",
  "landowner",
  "farmer",
  "business",
] as const;

export type ServiceCitizenTypeKey = (typeof SERVICE_CITIZEN_TYPE_KEYS)[number];

export const SERVICE_ORGANIZATION_KEYS = [
  "attestationOffices",
  "educationOffices",
  "landOffices",
  "financeOffices",
  "agricultureOffices",
  "localGovOffices",
] as const;

export type ServiceOrganizationKey = (typeof SERVICE_ORGANIZATION_KEYS)[number];

export type ServiceFeeType = "free" | "paid";

export type ServiceApplicationMethod = "online" | "office" | "mixed";

export type ServiceDocumentSpec = {
  key: string;
  required: boolean;
};

export type SampleServiceCourse = {
  priceBdt: number;
  hours: number;
  lessons: number;
  difficulty: CourseDifficulty;
  hasCertificate: boolean;
  slug: string;
  image: string;
  access: CourseAccess;
};

/**
 * National portal homepage for leaving Civic Bangladesh.
 * Not a service-specific application URL — confirm the exact form there.
 */
export const OFFICIAL_GOVERNMENT_PORTAL_HREF = "https://www.bangladesh.gov.bd";

/**
 * Official information source for a catalog service.
 * `verifiedAuthorityName` and `officialLastUpdated` must stay empty
 * unless a real government office or publication date is confirmed.
 * Do not copy Civic Bangladesh sample catalog dates into last updated.
 */
export type ServiceOfficialSourceFields = {
  verifiedAuthorityName?: string;
  officialLastUpdated?: string;
  officialServiceHref?: string;
};

export const SERVICE_PROCESS_STEP_KEYS = [
  "prepare",
  "login",
  "fill",
  "upload",
  "submit",
  "track",
] as const;

export type ServiceProcessStepKey = (typeof SERVICE_PROCESS_STEP_KEYS)[number];

export const SERVICE_INSTRUCTION_KEYS = [
  "confirmOfficial",
  "matchingNames",
  "keepCopies",
  "governmentFees",
] as const;

export type ServiceInstructionKey = (typeof SERVICE_INSTRUCTION_KEYS)[number];

export const SERVICE_CATEGORY_GROUPS = [
  {
    key: "documents",
    categories: ["outboundAttestation", "certificatesPermits"],
  },
  {
    key: "licensing",
    categories: ["registrationLicence"],
  },
  {
    key: "education",
    categories: ["education"],
  },
  {
    key: "landEconomy",
    categories: ["landLease", "financeBank", "agricultureFertilizer"],
  },
  {
    key: "personal",
    categories: ["personalApplications", "other"],
  },
] as const satisfies ReadonlyArray<{
  key: string;
  categories: readonly ServiceCategoryKey[];
}>;

export type ServiceCategoryGroupKey =
  (typeof SERVICE_CATEGORY_GROUPS)[number]["key"];

/**
 * Sample government-service catalog for discovery and preparation.
 * Not an official list. Document counts, processing times, fee type,
 * and organization labels are demo catalog fields — not government data.
 */
export const SAMPLE_GOVERNMENT_SERVICES = [
  {
    key: "sscAttestation",
    slug: "ssc-certificate-attestation",
    category: "outboundAttestation",
    citizenTypes: ["student", "outbound"],
    organization: "attestationOffices",
    feeType: "paid",
    applicationMethod: "mixed",
    catalogUpdated: "2026-08-01",
    documentCount: 6,
    documents: [
      { key: "originalSsc", required: true },
      { key: "photocopySsc", required: true },
      { key: "nidOrBirth", required: true },
      { key: "passportCopy", required: true },
      { key: "photo", required: true },
      { key: "applicationForm", required: false },
    ],
    course: {
      priceBdt: 199,
      hours: 2,
      lessons: 6,
      difficulty: "beginner",
      hasCertificate: true,
      slug: "ssc-certificate-attestation-prep",
      image: "/images/courses/ssc-attestation.jpg",
      access: "premium",
    },
  },
  {
    key: "transcriptAttestation",
    slug: "academic-transcript-attestation",
    category: "outboundAttestation",
    citizenTypes: ["student", "outbound"],
    organization: "attestationOffices",
    feeType: "paid",
    applicationMethod: "mixed",
    catalogUpdated: "2026-08-01",
    documentCount: 5,
    documents: [
      { key: "originalTranscript", required: true },
      { key: "photocopyTranscript", required: true },
      { key: "nid", required: true },
      { key: "photo", required: true },
      { key: "universityLetter", required: false },
    ],
    course: {
      priceBdt: 149,
      hours: 2,
      lessons: 5,
      difficulty: "beginner",
      hasCertificate: true,
      slug: "academic-transcript-attestation-prep",
      image: "/images/courses/transcript-attestation.jpg",
      access: "premium",
    },
  },
  {
    key: "characterCertificate",
    slug: "character-certificate-preparation",
    category: "certificatesPermits",
    citizenTypes: ["general", "student"],
    organization: "localGovOffices",
    feeType: "paid",
    applicationMethod: "office",
    catalogUpdated: "2026-07-20",
    documentCount: 4,
    documents: [
      { key: "nid", required: true },
      { key: "photo", required: true },
      { key: "applicationForm", required: true },
      { key: "localRecommendation", required: false },
    ],
    course: {
      priceBdt: 99,
      hours: 2,
      lessons: 4,
      difficulty: "beginner",
      hasCertificate: true,
      slug: "character-certificate-prep",
      image: "/images/courses/character-certificate.jpg",
      access: "premium",
    },
  },
  {
    key: "tradeLicence",
    slug: "trade-licence-preparation",
    category: "registrationLicence",
    citizenTypes: ["business"],
    organization: "localGovOffices",
    feeType: "paid",
    applicationMethod: "mixed",
    catalogUpdated: "2026-08-01",
    documentCount: 7,
    documents: [
      { key: "nid", required: true },
      { key: "holdingTax", required: true },
      { key: "rentDeed", required: true },
      { key: "photo", required: true },
      { key: "tradeName", required: true },
      { key: "previousLicence", required: false },
      { key: "tin", required: false },
    ],
    course: {
      priceBdt: 249,
      hours: 3,
      lessons: 8,
      difficulty: "intermediate",
      hasCertificate: true,
      slug: "trade-licence-preparation",
      image: "/images/courses/trade-licence.jpg",
      access: "premium",
    },
  },
  {
    key: "boardCertificate",
    slug: "board-certificate-copy-preparation",
    category: "education",
    citizenTypes: ["student"],
    organization: "educationOffices",
    feeType: "paid",
    applicationMethod: "mixed",
    catalogUpdated: "2026-07-12",
    documentCount: 4,
    documents: [
      { key: "nid", required: true },
      { key: "originalOrCopy", required: true },
      { key: "photo", required: true },
      { key: "policeGd", required: false },
    ],
    course: {
      priceBdt: 99,
      hours: 2,
      lessons: 4,
      difficulty: "beginner",
      hasCertificate: true,
      slug: "board-certificate-copy-prep",
      image: "/images/courses/board-certificate.jpg",
      access: "premium",
    },
  },
  {
    key: "landMutation",
    slug: "land-mutation-preparation",
    category: "landLease",
    citizenTypes: ["landowner"],
    organization: "landOffices",
    feeType: "paid",
    applicationMethod: "mixed",
    catalogUpdated: "2026-08-01",
    documentCount: 8,
    documents: [
      { key: "nid", required: true },
      { key: "deed", required: true },
      { key: "khatian", required: true },
      { key: "taxReceipt", required: true },
      { key: "photo", required: true },
      { key: "mapCopy", required: true },
      { key: "inheritance", required: false },
      { key: "warish", required: false },
    ],
    course: {
      priceBdt: 199,
      hours: 3,
      lessons: 8,
      difficulty: "intermediate",
      hasCertificate: true,
      slug: "land-mutation-preparation",
      image: "/images/courses/land-mutation.jpg",
      access: "premium",
    },
  },
  {
    key: "bankSolvency",
    slug: "bank-solvency-letter-preparation",
    category: "financeBank",
    citizenTypes: ["general", "outbound"],
    organization: "financeOffices",
    feeType: "paid",
    applicationMethod: "office",
    catalogUpdated: "2026-06-30",
    documentCount: 5,
    documents: [
      { key: "nid", required: true },
      { key: "accountStatement", required: true },
      { key: "photo", required: true },
      { key: "applicationForm", required: true },
      { key: "tin", required: false },
    ],
    course: {
      priceBdt: 129,
      hours: 2,
      lessons: 5,
      difficulty: "beginner",
      hasCertificate: true,
      slug: "bank-solvency-letter-prep",
      image: "/images/courses/bank-solvency.jpg",
      access: "premium",
    },
  },
  {
    key: "fertilizerSupport",
    slug: "fertilizer-support-preparation",
    category: "agricultureFertilizer",
    citizenTypes: ["farmer"],
    organization: "agricultureOffices",
    feeType: "free",
    applicationMethod: "mixed",
    catalogUpdated: null,
    documentCount: 3,
    documents: [
      { key: "nid", required: true },
      { key: "landProof", required: true },
      { key: "farmerCard", required: false },
    ],
    course: {
      priceBdt: 0,
      hours: 1,
      lessons: 3,
      difficulty: "beginner",
      hasCertificate: false,
      slug: "fertilizer-support-prep",
      image: "/images/courses/fertilizer-support.jpg",
      access: "free",
    },
  },
  {
    key: "birthCertificate",
    slug: "birth-certificate-preparation",
    category: "personalApplications",
    citizenTypes: ["general"],
    organization: "localGovOffices",
    feeType: "paid",
    applicationMethod: "mixed",
    catalogUpdated: "2026-08-01",
    documentCount: 4,
    documents: [
      { key: "hospitalNote", required: true },
      { key: "parentNid", required: true },
      { key: "witness", required: true },
      { key: "photo", required: false },
    ],
    course: {
      priceBdt: 99,
      hours: 2,
      lessons: 5,
      difficulty: "beginner",
      hasCertificate: true,
      slug: "birth-certificate-preparation",
      image: "/images/courses/birth-certificate.jpg",
      access: "premium",
    },
  },
  {
    key: "generalSupport",
    slug: "general-service-preparation",
    category: "other",
    citizenTypes: ["general"],
    organization: "localGovOffices",
    feeType: "free",
    applicationMethod: "office",
    catalogUpdated: null,
    documentCount: 2,
    documents: [
      { key: "nid", required: true },
      { key: "requestLetter", required: false },
    ],
    course: null,
  },
] as const satisfies ReadonlyArray<
  {
    key: string;
    slug: string;
    category: ServiceCategoryKey;
    citizenTypes: readonly ServiceCitizenTypeKey[];
    organization: ServiceOrganizationKey;
    feeType: ServiceFeeType;
    applicationMethod: ServiceApplicationMethod;
    catalogUpdated: string | null;
    documentCount: number;
    documents: readonly ServiceDocumentSpec[];
    course: SampleServiceCourse | null;
  } & ServiceOfficialSourceFields
>;

export type SampleServiceKey =
  (typeof SAMPLE_GOVERNMENT_SERVICES)[number]["key"];

export type SampleGovernmentService =
  (typeof SAMPLE_GOVERNMENT_SERVICES)[number] & ServiceOfficialSourceFields;

export function getServiceOfficialSource(service: SampleGovernmentService) {
  return {
    href: service.officialServiceHref ?? OFFICIAL_GOVERNMENT_PORTAL_HREF,
    verifiedAuthorityName: service.verifiedAuthorityName ?? null,
    lastUpdated: service.officialLastUpdated ?? null,
  };
}

export function serviceHref(slug: string) {
  return `${ROUTES.governmentServices}/${slug}`;
}

export function getServiceBySlug(slug: string): SampleGovernmentService | undefined {
  return SAMPLE_GOVERNMENT_SERVICES.find((service) => service.slug === slug);
}

export function getServiceByKey(key: string): SampleGovernmentService | undefined {
  return SAMPLE_GOVERNMENT_SERVICES.find((service) => service.key === key);
}

export function getServicesInCategory(category: ServiceCategoryKey) {
  return SAMPLE_GOVERNMENT_SERVICES.filter(
    (service) => service.category === category,
  );
}

export function getServicesWithCourses() {
  return SAMPLE_GOVERNMENT_SERVICES.filter(
    (
      service,
    ): service is (typeof SAMPLE_GOVERNMENT_SERVICES)[number] & {
      course: SampleServiceCourse;
    } => service.course != null,
  );
}

export function getRelatedServices(slug: string, limit = 3) {
  const current = getServiceBySlug(slug);
  if (!current) return [];

  const others = getServicesWithCourses().filter(
    (service) => service.slug !== slug,
  );
  const sameCategory = others.filter(
    (service) => service.category === current.category,
  );
  const rest = others.filter(
    (service) => service.category !== current.category,
  );

  return [...sameCategory, ...rest].slice(0, limit);
}

export function countServicesInCategory(category: ServiceCategoryKey) {
  return SAMPLE_GOVERNMENT_SERVICES.filter(
    (service) => service.category === category,
  ).length;
}
