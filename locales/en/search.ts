import type { TranslationShape } from "@/locales/types";

export const search = {
  placeholder: "Search services, courses, and topics...",
  description: "Search government services, categories, courses, and civic topics.",
  idle: {
    title: "Search Civic Bangladesh",
    description:
      "Find a government service, a category, a course, or a civic topic.",
    hint: "Try SSC, attestation, or road safety.",
  },
  noResults: {
    title: "No matching results",
    description:
      "Try another word, or browse the sample service and course catalogs.",
    browseServices: "Browse services",
    browseCourses: "Browse courses",
  },
  groups: {
    services: "Government services",
    categories: "Categories",
    courses: "Courses",
    topics: "Civic topics",
  },
  service: {
    course: "Course",
    noCourse: "No course in this sample yet",
    price: "৳{amount}",
    free: "Free",
    certificate: "Certificate",
    noCertificate: "No certificate",
    official: "View Official Service",
    officialNote:
      "Opens the national portal. Civic Bangladesh does not process applications.",
  },
  category: {
    guides: "{count} sample guides",
  },
} as const;

export type SearchTranslations = TranslationShape<typeof search>;
