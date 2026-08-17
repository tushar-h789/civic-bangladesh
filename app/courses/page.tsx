import type { Metadata } from "next";

import { CoursesCatalog } from "@/components/learning/courses-catalog";
import { parseCoursesCatalogType } from "@/data/course-catalog";

export const metadata: Metadata = {
  title: "Courses | Civic Bangladesh",
  description:
    "Learn the government-service application process through video, guides, and assessment. Civic Bangladesh courses are affordable preparation — not official government classes.",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialType = parseCoursesCatalogType(params.type);

  return (
    <CoursesCatalog
      key={initialType ?? "all"}
      initialType={initialType}
    />
  );
}
