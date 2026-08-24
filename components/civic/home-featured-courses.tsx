"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardList } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  catalogCourseHref,
  coursesCatalogHref,
  getHomeFeaturedCourses,
} from "@/data/course-catalog";
import { useTranslation } from "@/hooks/use-translation";
import { getCourseCopy } from "@/lib/get-course-copy";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { CourseCard } from "@/components/learning/course-card";

const COURSE_PATHS = [
  {
    key: "civic" as const,
    href: coursesCatalogHref("civic"),
    image: "/images/topics/topic-community.png",
    icon: BookOpen,
  },
  {
    key: "servicePrep" as const,
    href: coursesCatalogHref("servicePrep"),
    image: "/images/courses/transcript-attestation.jpg",
    icon: ClipboardList,
  },
] as const;

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function HomeFeaturedCourses() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const section = t.home.featuredCourses;
  const learning = t.learning;
  const courses = getHomeFeaturedCourses();

  return (
    <section
      aria-labelledby="featured-courses-heading"
      className={cn(
        "bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop",
        isBangla && "font-bengali",
      )}
    >
      <Container>
        <SectionHeader
          title={<span id="featured-courses-heading">{section.title}</span>}
          titleClassName="text-[1.375rem] leading-snug sm:text-2xl md:text-section-heading md:leading-[var(--text-section-heading--line-height)]"
          description={section.description}
          actions={
            <Link
              href={coursesCatalogHref()}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {section.viewAll}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />

        <ul className="mt-10 grid list-none gap-5 p-0 sm:mt-12 lg:mt-14 lg:grid-cols-2 lg:gap-6">
          {COURSE_PATHS.map((path, index) => {
            const item = section.paths[path.key];
            const Icon: ComponentType<{
              className?: string;
              "aria-hidden"?: boolean;
            }> = path.icon;
            const accessLabel =
              path.key === "civic"
                ? learning.access.free
                : learning.access.premium;
            const indexLabel = String(index + 1).padStart(2, "0");

            return (
              <li key={path.key}>
                <Link
                  href={path.href}
                  className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border outline-none transition-shadow duration-200 ease-standard hover:shadow-card-hover focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <div className="relative aspect-16/10 overflow-hidden sm:aspect-5/3">
                    <Image
                      src={path.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-standard group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-text/70 via-text/20 to-transparent"
                    />
                    <span className="absolute top-4 left-4 inline-flex h-8 items-center rounded-btn bg-surface px-3 text-sm font-semibold text-primary ring-1 ring-border">
                      {accessLabel}
                    </span>
                    <span
                      aria-hidden
                      className="absolute right-4 bottom-10 text-4xl font-semibold tracking-tight text-white/35 sm:bottom-12 sm:text-5xl"
                    >
                      {indexLabel}
                    </span>
                  </div>

                  <div className="relative z-10 -mt-10 mx-4 mb-4 flex flex-1 flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:mx-5 sm:mb-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="text-xl font-semibold text-balance text-foreground sm:text-2xl">
                        {item.title}
                      </h3>
                    </div>
                    <p
                      className={cn(
                        "mt-3 text-body text-text-secondary",
                        isBangla && "leading-[1.7]",
                      )}
                    >
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex h-11 w-fit items-center gap-1.5 rounded-btn bg-primary px-5 text-button font-medium text-primary-foreground">
                      {item.cta}
                      <ArrowRight
                        className="size-4 transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 sm:mt-14 lg:mt-16">
          <h3 className="text-xl font-semibold text-balance text-foreground sm:text-2xl">
            {section.featuredTitle}
          </h3>

          <ul className="mt-6 grid list-none gap-4 p-0 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {courses.map((course) => {
              const copy = getCourseCopy(course, t);
              const typeCopy = t.courseTypes[course.type];
              const price =
                course.priceBdt == null
                  ? t.courses.card.free
                  : formatTemplate(t.courses.card.price, {
                      amount: course.priceBdt,
                    });

              return (
                <li key={course.slug}>
                  <CourseCard
                    href={catalogCourseHref(course.slug)}
                    image={course.image}
                    imageAlt={copy.imageAlt}
                    title={copy.title}
                    description={copy.description}
                    access={course.access}
                    accessLabel={learning.access[course.access]}
                    duration={formatTemplate(learning.duration, {
                      hours: course.hours,
                    })}
                    lessons={formatTemplate(learning.lessons, {
                      count: course.lessons,
                    })}
                    difficulty={learning.difficulty[course.difficulty]}
                    certificate={
                      course.hasCertificate
                        ? learning.certificate.included
                        : learning.certificate.notIncluded
                    }
                    hasCertificate={course.hasCertificate}
                    price={price}
                    cta={learning.cta}
                    courseType={course.type}
                    courseTypeLabel={typeCopy.label}
                  />
                </li>
              );
            })}
          </ul>

          <p
            className={cn(
              "mt-6 max-w-3xl text-base text-text-secondary",
              isBangla && "leading-[1.7]",
            )}
          >
            {section.sampleNote}
          </p>
        </div>
      </Container>
    </section>
  );
}

export { HomeFeaturedCourses };
