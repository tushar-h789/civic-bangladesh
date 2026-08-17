import { ROUTES } from "@/constants/routes";
import {
  FEATURED_COURSES,
  catalogCourseHref,
  type CourseAccess,
  type CourseDifficulty,
  type FeaturedCourseKey,
} from "@/data/civic-courses";
import {
  SAMPLE_GOVERNMENT_SERVICES,
  type SampleServiceKey,
} from "@/data/government-services";
import { isCourseTypeKey, type CourseTypeKey } from "@/data/course-types";

export {
  COURSE_TYPE_KEYS,
  isCourseTypeKey,
  type CourseTypeKey,
} from "@/data/course-types";

export const COURSE_CATALOG_CATEGORY_KEYS = [
  "outbound",
  "licence",
  "certificates",
  "education",
  "business",
  "personal",
  "other",
] as const;

export type CourseCatalogCategoryKey =
  (typeof COURSE_CATALOG_CATEGORY_KEYS)[number];

export const COURSE_DIFFICULTY_KEYS = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

export const COURSE_DURATION_FILTER_KEYS = ["short", "medium", "long"] as const;

export type CourseDurationFilterKey =
  (typeof COURSE_DURATION_FILTER_KEYS)[number];

export const COURSE_INSTRUCTOR_KEYS = ["maya", "arif", "nabila"] as const;

export type CourseInstructorKey = (typeof COURSE_INSTRUCTOR_KEYS)[number];

export type CourseRating = {
  average: number;
  count: number;
};

const SERVICE_CATEGORY_MAP: Record<SampleServiceKey, CourseCatalogCategoryKey> =
  {
    sscAttestation: "outbound",
    transcriptAttestation: "outbound",
    characterCertificate: "certificates",
    tradeLicence: "licence",
    boardCertificate: "education",
    landMutation: "other",
    bankSolvency: "business",
    fertilizerSupport: "other",
    birthCertificate: "personal",
    generalSupport: "other",
  };

const SERVICE_INSTRUCTOR: Record<SampleServiceKey, CourseInstructorKey> = {
  sscAttestation: "maya",
  transcriptAttestation: "maya",
  characterCertificate: "arif",
  tradeLicence: "nabila",
  boardCertificate: "maya",
  landMutation: "arif",
  bankSolvency: "nabila",
  fertilizerSupport: "arif",
  birthCertificate: "nabila",
  generalSupport: "arif",
};

const SERVICE_RATING: Record<SampleServiceKey, CourseRating | null> = {
  sscAttestation: { average: 4.8, count: 214 },
  transcriptAttestation: { average: 4.7, count: 163 },
  characterCertificate: { average: 4.5, count: 88 },
  tradeLicence: { average: 4.6, count: 141 },
  boardCertificate: { average: 4.4, count: 72 },
  landMutation: { average: 4.5, count: 96 },
  bankSolvency: { average: 4.3, count: 54 },
  fertilizerSupport: null,
  birthCertificate: { average: 4.7, count: 119 },
  generalSupport: null,
};

const CIVIC_COURSE_META: Record<
  FeaturedCourseKey,
  {
    category: CourseCatalogCategoryKey;
    instructor: CourseInstructorKey;
    rating: CourseRating | null;
    priceBdt: number | null;
    image: string;
  }
> = {
  everydayCivic: {
    category: "other",
    instructor: "arif",
    rating: { average: 4.6, count: 91 },
    priceBdt: null,
    image: "/images/courses/everyday-civic.jpg",
  },
  roadSafety: {
    category: "other",
    instructor: "maya",
    rating: { average: 4.7, count: 156 },
    priceBdt: null,
    image: "/images/courses/road-safety.jpg",
  },
  communityFacilitation: {
    category: "other",
    instructor: "nabila",
    rating: null,
    priceBdt: 199,
    image: "/images/courses/community-facilitation.jpg",
  },
};

const COURSE_YOUTUBE_IDS: Record<string, string> = {
  sscAttestation: "6WS7l4RU4xg",
  transcriptAttestation: "aeo6wFs0ESQ",
  characterCertificate: "4I7RwB4aRx4",
  tradeLicence: "XaiaJq_y4mg",
  boardCertificate: "Ms_BfElpgys",
  landMutation: "aE-m3_tQKpk",
  bankSolvency: "3cgA6BkeAX8",
  fertilizerSupport: "rF3TsZyEIUI",
  birthCertificate: "0zYj-3LNLO4",
  roadSafety: "Rt1h0jcXgGA",
  communityFacilitation: "oIMQjkUOe8A",
};

export type CatalogCourse = {
  key: string;
  slug: string;
  type: CourseTypeKey;
  category: CourseCatalogCategoryKey;
  instructor: CourseInstructorKey;
  rating: CourseRating | null;
  relatedServiceSlug: string | null;
  relatedServiceKey: SampleServiceKey | null;
  civicKey: FeaturedCourseKey | null;
  access: CourseAccess;
  hours: number;
  lessons: number;
  difficulty: CourseDifficulty;
  hasCertificate: boolean;
  image: string;
  priceBdt: number | null;
  youtubeVideoId: string | null;
};

/**
 * Sample learning catalog. Prices are Civic Bangladesh course fees,
 * not government fees. Ratings are demo catalog fields.
 */
export function getCourseCatalog(): CatalogCourse[] {
  const serviceCourses = SAMPLE_GOVERNMENT_SERVICES.flatMap((service) => {
    if (service.course == null) return [];

    const priceBdt =
      service.course.access === "free" ? null : service.course.priceBdt;

    return [
      {
        key: service.key,
        slug: service.course.slug,
        type: "servicePrep" as const,
        category: SERVICE_CATEGORY_MAP[service.key],
        instructor: SERVICE_INSTRUCTOR[service.key],
        rating: SERVICE_RATING[service.key],
        relatedServiceSlug: service.slug,
        relatedServiceKey: service.key,
        civicKey: null,
        access: service.course.access,
        hours: service.course.hours,
        lessons: service.course.lessons,
        difficulty: service.course.difficulty,
        hasCertificate: service.course.hasCertificate,
        image: service.course.image,
        priceBdt,
        youtubeVideoId: COURSE_YOUTUBE_IDS[service.key] ?? null,
      },
    ];
  });

  const civicCourses = FEATURED_COURSES.map((course) => {
    const meta = CIVIC_COURSE_META[course.key];

    return {
      key: course.key,
      slug: course.slug,
      type: "civic" as const,
      category: meta.category,
      instructor: meta.instructor,
      rating: meta.rating,
      relatedServiceSlug: null,
      relatedServiceKey: null,
      civicKey: course.key,
      access: course.access,
      hours: course.hours,
      lessons: course.lessons,
      difficulty: course.difficulty,
      hasCertificate: course.hasCertificate,
      image: meta.image,
      priceBdt: meta.priceBdt,
      youtubeVideoId: COURSE_YOUTUBE_IDS[course.key] ?? null,
    };
  });

  return [...serviceCourses, ...civicCourses];
}

export function countCoursesInCategory(category: CourseCatalogCategoryKey) {
  return getCourseCatalog().filter((course) => course.category === category)
    .length;
}

export function getCatalogCourseBySlug(slug: string) {
  return getCourseCatalog().find((course) => course.slug === slug);
}

/** Homepage sample: one service-prep course and two free civic courses. */
export const HOME_FEATURED_COURSE_SLUGS = [
  "ssc-certificate-attestation-prep",
  "everyday-civic-sense",
  "road-safety-habits",
] as const;

export function getHomeFeaturedCourses(): CatalogCourse[] {
  return HOME_FEATURED_COURSE_SLUGS.flatMap((slug) => {
    const course = getCatalogCourseBySlug(slug);
    return course ? [course] : [];
  });
}

export function durationBucket(hours: number): CourseDurationFilterKey {
  if (hours <= 2) return "short";
  if (hours <= 4) return "medium";
  return "long";
}

export function coursesCatalogHref(type?: CourseTypeKey) {
  if (!type) return ROUTES.courses;
  return `${ROUTES.courses}?type=${type}`;
}

export function parseCoursesCatalogType(
  value: string | string[] | undefined,
): CourseTypeKey | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !isCourseTypeKey(raw)) return undefined;
  return raw;
}

export { catalogCourseHref };
