import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDetail } from "@/components/learning/course-detail";
import {
  getCatalogCourseBySlug,
  getCourseCatalog,
} from "@/data/course-catalog";
import { en } from "@/locales/en";
import { getCourseCopy } from "@/lib/get-course-copy";

type CoursePageProps = {
  params: Promise<{ courseSlug: string }>;
};

export function generateStaticParams() {
  return getCourseCatalog().map((course) => ({
    courseSlug: course.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCatalogCourseBySlug(courseSlug);

  if (!course) {
    return { title: "Course | Civic Bangladesh" };
  }

  const item = getCourseCopy(course, en);

  return {
    title: `${item.title} | Civic Bangladesh`,
    description: item.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseSlug } = await params;
  const course = getCatalogCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  return <CourseDetail slug={course.slug} />;
}
