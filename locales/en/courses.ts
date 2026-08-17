import type { TranslationShape } from "@/locales/types";

export const courses = {
  eyebrow: "Courses",
  title: "Learn the Service. Do It Right.",
  description:
    "Learn the government-service application process simply — through video, guides, and assessment.",
  sampleNote:
    "Sample catalog of Civic Bangladesh courses. Fees are our course fees, kept affordable — not government fees, and not an official government class.",
  pricingNote:
    "Government service preparation is our main paid product. Core civic education stays free. Fees are listed in Taka. Nothing is sold with a countdown or a second product on the way to a lesson.",
  pricingCta: "How we price courses",
  hero: {
    imageAlt:
      "People learning together how to prepare papers for a government service",
    prepareFirst: "Learn here. Apply on the official government portal.",
    stats: {
      courses: "{count} sample courses",
      categories: "{count} categories",
    },
  },
  search: {
    placeholder: "Search courses...",
    label: "Search courses",
    clear: "Clear search",
  },
  filters: {
    category: "Service category",
    type: "Course type",
    access: "Free / premium",
    duration: "Duration",
    difficulty: "Difficulty",
    certificate: "Certificate available",
    all: "All",
    clear: "Clear filters",
    open: "Filters",
    drawerTitle: "Filter courses",
    drawerDescription: "Choose a category and narrow this sample catalog.",
    apply: "Show results",
  },
  types: {
    servicePrep: "Service Learning",
    civic: "Civic Learning",
  },
  access: {
    free: "Free",
    premium: "Paid course",
  },
  duration: {
    short: "Up to 2 hours",
    medium: "3–4 hours",
    long: "5 hours or more",
  },
  certificateFilter: {
    yes: "With a certificate",
    no: "No certificate",
  },
  categories: {
    title: "Course categories",
    description: "Groups for browsing this sample catalog.",
    all: "All courses",
    count: "{count}",
    items: {
      outbound: "Services for citizens going abroad",
      licence: "Licences and registration",
      certificates: "Certificates and attestations",
      education: "Education services",
      business: "Business services",
      personal: "Personal applications",
      other: "Other",
    },
  },
  sort: {
    label: "Sort",
    featured: "Catalog order",
    title: "Title A–Z",
    price: "Price, low to high",
    duration: "Shorter first",
  },
  results: {
    title: "Sample courses",
    showing: "Showing {shown} of {total}",
    emptyTitle: "No matching courses",
    emptyDescription: "Try another search or clear the filters.",
    loadMore: "Load more",
    remaining: "{count} more in this catalog",
  },
  card: {
    relatedService: "Related service",
    instructorRole: "Civic Bangladesh tutor (sample)",
    price: "৳{amount}",
    free: "Free",
    rating: "{average} · {count} reviews (sample)",
    imageAlt: "A Civic Bangladesh course thumbnail",
    cta: "Start Course",
  },
  instructors: {
    maya: "Maya Rahman",
    arif: "Arif Chowdhury",
    nabila: "Nabila Hossain",
  },
} as const;

export type CoursesTranslations = TranslationShape<typeof courses>;
