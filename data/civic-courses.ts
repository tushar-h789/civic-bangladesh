import { ROUTES } from "@/constants/routes";

export type CourseAccess = "free" | "premium";
export type CourseDifficulty = "beginner" | "intermediate" | "advanced";

/**
 * Featured course catalog. Lesson counts, duration, and access
 * are sample curriculum — not live enrolment data.
 */
export const FEATURED_COURSES = [
  {
    key: "everydayCivic",
    slug: "everyday-civic-sense",
    access: "free",
    hours: 2,
    lessons: 8,
    difficulty: "beginner",
    hasCertificate: false,
    image: "/images/home/intro-spaces.png",
  },
  {
    key: "roadSafety",
    slug: "road-safety-habits",
    access: "free",
    hours: 3,
    lessons: 10,
    difficulty: "beginner",
    hasCertificate: true,
    image: "/images/topics/topic-road.png",
  },
  {
    key: "communityFacilitation",
    slug: "community-facilitation",
    access: "premium",
    hours: 6,
    lessons: 12,
    difficulty: "intermediate",
    hasCertificate: true,
    image: "/images/topics/topic-community.png",
  },
] as const satisfies ReadonlyArray<{
  key: string;
  slug: string;
  access: CourseAccess;
  hours: number;
  lessons: number;
  difficulty: CourseDifficulty;
  hasCertificate: boolean;
  image: string;
}>;

export type FeaturedCourseKey = (typeof FEATURED_COURSES)[number]["key"];

export function courseHref(slug: string) {
  return catalogCourseHref(slug);
}

export function catalogCourseHref(slug: string) {
  return `${ROUTES.courses}/${slug}`;
}

export function learnCourseHref(slug: string) {
  return `${ROUTES.courses}/${slug}/learn`;
}
