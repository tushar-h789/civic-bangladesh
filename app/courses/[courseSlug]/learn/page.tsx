import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CoursePlayer } from "@/components/learning/course-player";
import {
  getCatalogCourseBySlug,
  getCourseCatalog,
} from "@/data/course-catalog";
import { getCourseCopy } from "@/lib/get-course-copy";
import { en } from "@/locales/en";

type LearnPageProps = {
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
}: LearnPageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCatalogCourseBySlug(courseSlug);

  if (!course) {
    return { title: "Learn | Civic Bangladesh" };
  }

  const item = getCourseCopy(course, en);

  return {
    title: `${item.title} · Learn | Civic Bangladesh`,
    description: item.description,
  };
}

export default async function CourseLearnPage({ params }: LearnPageProps) {
  const { courseSlug } = await params;
  const course = getCatalogCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  return <CoursePlayer slug={course.slug} />;
}
