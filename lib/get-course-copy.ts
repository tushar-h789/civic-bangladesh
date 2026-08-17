import type { CatalogCourse } from "@/data/course-catalog";
import type { Dictionary } from "@/locales";

export function getCourseCopy(course: CatalogCourse, t: Dictionary) {
  if (course.civicKey) {
    const item = t.learning.items[course.civicKey];
    return {
      title: item.title,
      description: item.description,
      imageAlt: item.catalogImageAlt,
    };
  }

  const serviceKey = course.relatedServiceKey;
  if (serviceKey == null) {
    return {
      title: course.slug,
      description: "",
      imageAlt: t.courses.card.imageAlt,
    };
  }

  const guide = t.serviceGuides[serviceKey];
  const item = t.services.items[serviceKey];
  const courseCopy = "course" in guide ? guide.course : undefined;

  return {
    title: courseCopy?.title ?? item.title,
    description: courseCopy?.description ?? item.description,
    imageAlt: courseCopy?.imageAlt ?? t.courses.card.imageAlt,
  };
}
