import type { TranslationShape } from "@/locales/types";

export const courses = {
  eyebrow: "Courses",
  title: "Learn the Service. Do It Right.",
  description:
    "Prepare for a government service with video lessons, a clear guide, and a short assessment — then apply on the official portal.",
  sampleNote:
    "A sample Civic Bangladesh catalog. Fees are our course fees, kept affordable. They are not government fees, and these are not official government classes.",
  pricingNote:
    "Paid courses prepare you for government services. Essential civic education stays free. Prices are in Taka. We do not use countdown offers or extra products on the way to a lesson.",
  pricingCta: "How we set course prices",
  civicCatalog: {
    note: "Core civic education stays free. One sample course is extra depth for teachers and organisers. Fees, if any, are Civic Bangladesh course fees — not government fees.",
    resultsTitle: "Civic courses",
    searchPlaceholder: "Search civic courses...",
    filterTitle: "Filter civic courses",
    filterDescription:
      "Narrow by free or paid, duration, difficulty, and certificate — not by government service type.",
  },
  hero: {
    imageAlt:
      "A young man helping an elderly woman understand an application form in a bright Bangladesh public service waiting hall",
    prepareFirst: "Learn here. Apply on the official portal.",
    stats: {
      courses: "{count} sample courses",
      categories: "{count} categories",
    },
    civic: {
      eyebrow: "Civic Learning",
      title: "Learn the habits that keep Bangladesh livable.",
      description:
        "Free civic courses on roads, shared places, cleanliness, and digital care. Practical habits — not a government class.",
      sampleNote:
        "Sample Civic Learning catalog. Core civic education stays free. This is Civic Bangladesh, not an official government course.",
      imageAlt:
        "A young man in Bangladesh placing litter into a public waste bin on a tree-lined city sidewalk",
      prepareFirst: "Essential civic education stays free.",
      stats: {
        courses: "{count} civic courses",
        free: "Free core courses",
      },
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
    description: "Pick a group to browse this sample catalog.",
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
