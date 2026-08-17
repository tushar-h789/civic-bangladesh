import { catalogCourseHref } from "@/data/civic-courses";
import { CIVIC_TOPICS, civicTopicHref } from "@/data/civic-topics";
import { getCourseCatalog } from "@/data/course-catalog";
import type { CourseTypeKey } from "@/data/course-types";
import {
  SAMPLE_GOVERNMENT_SERVICES,
  SERVICE_CATEGORY_KEYS,
  countServicesInCategory,
  serviceHref,
  type SampleGovernmentService,
  type ServiceCategoryKey,
} from "@/data/government-services";
import {
  SERVICE_CATEGORY_PAGES,
  isDirectoryStubKey,
  serviceCategoryHrefFromKey,
} from "@/data/service-categories";
import { getCourseCopy } from "@/lib/get-course-copy";
import type { Dictionary } from "@/locales";

export const SEARCH_MIN_QUERY_LENGTH = 2;
export const SEARCH_DEBOUNCE_MS = 280;

export type SearchServiceHit = {
  id: string;
  key: SampleGovernmentService["key"];
  href: string;
  title: string;
  categoryTitle: string;
  course: {
    title: string;
    href: string;
    priceBdt: number | null;
    hasCertificate: boolean;
  } | null;
};

export type SearchCategoryHit = {
  id: string;
  href: string;
  title: string;
  description: string;
  guideCount: number;
};

export type SearchCourseHit = {
  id: string;
  href: string;
  title: string;
  priceBdt: number | null;
  hasCertificate: boolean;
  type: CourseTypeKey;
};

export type SearchTopicHit = {
  id: string;
  href: string;
  title: string;
};

export type SiteSearchResults = {
  services: SearchServiceHit[];
  categories: SearchCategoryHit[];
  courses: SearchCourseHit[];
  topics: SearchTopicHit[];
};

type Ranked<T> = { score: number; item: T };

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFC")
    .replace(/[-_/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function keyToWords(key: string) {
  return key.replace(/([A-Z])/g, " $1").toLowerCase();
}

function scoreHaystack(needle: string, title: string, extra: string) {
  const normalizedTitle = normalize(title);
  if (!needle) return 0;
  if (normalizedTitle === needle) return 100;
  if (normalizedTitle.startsWith(needle)) return 80;
  if (normalizedTitle.includes(needle)) return 55;
  if (normalize(extra).includes(needle)) return 25;
  return 0;
}

function takeRanked<T>(items: Ranked<T>[], limit: number) {
  return [...items]
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export function hasSearchResults(results: SiteSearchResults) {
  return (
    results.services.length > 0 ||
    results.categories.length > 0 ||
    results.courses.length > 0 ||
    results.topics.length > 0
  );
}

export function searchSiteCatalog(
  query: string,
  t: Dictionary,
): SiteSearchResults {
  const needle = normalize(query);

  if (needle.length < SEARCH_MIN_QUERY_LENGTH) {
    return { services: [], categories: [], courses: [], topics: [] };
  }

  const services = searchServices(needle, t);
  const matchedServiceKeys = new Set(services.map((hit) => hit.key));

  return {
    services,
    categories: searchCategories(needle, t),
    courses: searchCourses(needle, t, matchedServiceKeys),
    topics: searchTopics(needle, t),
  };
}

function searchServices(needle: string, t: Dictionary) {
  const ranked: Ranked<SearchServiceHit>[] = [];

  for (const service of SAMPLE_GOVERNMENT_SERVICES) {
    const item = t.services.items[service.key];
    const categoryTitle = t.services.categoryItems[service.category].title;
    const courseCopy = courseCopyForService(service, t);
    const extra = [
      item.description,
      categoryTitle,
      service.slug,
      keyToWords(service.key),
      courseCopy?.title ?? "",
    ].join(" ");
    const score = scoreHaystack(needle, item.title, extra);

    if (score <= 0) continue;

    ranked.push({
      score,
      item: {
        id: `service:${service.key}`,
        key: service.key,
        href: serviceHref(service.slug),
        title: item.title,
        categoryTitle,
        course: courseCopy,
      },
    });
  }

  return takeRanked(ranked, 6);
}

function courseCopyForService(
  service: SampleGovernmentService,
  t: Dictionary,
): SearchServiceHit["course"] {
  if (service.course == null) return null;

  const guide = t.serviceGuides[service.key];
  const item = t.services.items[service.key];
  const courseTitle =
    "course" in guide && guide.course ? guide.course.title : item.title;
  const priceBdt =
    service.course.access === "free" ? null : service.course.priceBdt;

  return {
    title: courseTitle,
    href: catalogCourseHref(service.course.slug),
    priceBdt,
    hasCertificate: service.course.hasCertificate,
  };
}

function searchCategories(needle: string, t: Dictionary) {
  const ranked: Ranked<SearchCategoryHit>[] = [];

  for (const key of SERVICE_CATEGORY_KEYS) {
    const item = t.services.categoryItems[key];
    const page = SERVICE_CATEGORY_PAGES[key];
    const directoryTitles = page.directory.flatMap((entry) => {
      if (entry.catalogServiceKey) {
        return [t.services.items[entry.catalogServiceKey].title];
      }
      if (isDirectoryStubKey(entry.key)) {
        return [t.serviceCategory.directory.items[entry.key].title];
      }
      return [];
    });
    const extra = [
      item.shortTitle,
      item.description,
      page.slug,
      keyToWords(key),
      ...directoryTitles,
    ].join(" ");
    const score = scoreHaystack(needle, item.title, extra);

    if (score <= 0) continue;

    ranked.push({
      score,
      item: {
        id: `category:${key}`,
        href: serviceCategoryHrefFromKey(key),
        title: item.title,
        description: item.description,
        guideCount: countServicesInCategory(key),
      },
    });
  }

  return takeRanked(ranked, 4);
}

function searchCourses(
  needle: string,
  t: Dictionary,
  matchedServiceKeys: Set<string>,
) {
  const ranked: Ranked<SearchCourseHit>[] = [];

  for (const course of getCourseCatalog()) {
    if (
      course.relatedServiceKey != null &&
      matchedServiceKeys.has(course.relatedServiceKey)
    ) {
      continue;
    }

    const copy = getCourseCopy(course, t);
    const relatedTitle = course.relatedServiceKey
      ? t.services.items[course.relatedServiceKey].title
      : "";
    const extra = [
      copy.description,
      course.slug,
      relatedTitle,
      t.courseTypes[course.type].label,
      t.courseTypes[course.type].purpose,
    ].join(" ");
    const score = scoreHaystack(needle, copy.title, extra);

    if (score <= 0) continue;

    ranked.push({
      score,
      item: {
        id: `course:${course.slug}`,
        href: catalogCourseHref(course.slug),
        title: copy.title,
        priceBdt: course.priceBdt,
        hasCertificate: course.hasCertificate,
        type: course.type,
      },
    });
  }

  return takeRanked(ranked, 5);
}

function searchTopics(needle: string, t: Dictionary) {
  const ranked: Ranked<SearchTopicHit>[] = [];

  for (const topic of CIVIC_TOPICS) {
    const item = t.home.topics.items[topic.key];
    const extra = [item.description, topic.slug, keyToWords(topic.key)].join(
      " ",
    );
    const score = scoreHaystack(needle, item.title, extra);

    if (score <= 0) continue;

    ranked.push({
      score,
      item: {
        id: `topic:${topic.key}`,
        href: civicTopicHref(topic.slug),
        title: item.title,
      },
    });
  }

  return takeRanked(ranked, 4);
}
