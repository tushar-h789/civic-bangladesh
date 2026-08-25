import type { ReactNode } from "react";
import Image from "next/image";
import { BookOpen, GraduationCap, Landmark, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import {
  COURSE_CATALOG_CATEGORY_KEYS,
  getCourseCatalog,
  type CourseTypeKey,
} from "@/data/course-catalog";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";

const HERO_IMAGE_DEFAULT = "/images/home/courses-hero-service-v2.png";
const HERO_IMAGE_CIVIC = "/images/home/civic-courses-hero-v3.png";

interface CoursesHeroCopy {
  eyebrow: string;
  title: string;
  description: string;
  sampleNote: string;
  types: {
    civic: string;
    servicePrep: string;
  };
  hero: {
    imageAlt: string;
    prepareFirst: string;
    stats: {
      courses: string;
      categories: string;
    };
    civic: {
      eyebrow: string;
      title: string;
      description: string;
      sampleNote: string;
      imageAlt: string;
      prepareFirst: string;
      stats: {
        courses: string;
        free: string;
      };
    };
  };
}

interface CoursesHeroProps {
  copy: CoursesHeroCopy;
  homeLabel: string;
  coursesLabel: string;
  isBangla: boolean;
  type?: CourseTypeKey | "all";
}

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function CoursesHero({
  copy,
  homeLabel,
  coursesLabel,
  isBangla,
  type = "all",
}: CoursesHeroProps) {
  const isCivic = type === "civic";
  const catalog = getCourseCatalog();
  const civicCount = catalog.filter((course) => course.type === "civic").length;
  const civic = copy.hero.civic;

  const breadcrumb = [
    { label: homeLabel, href: ROUTES.home },
    {
      label: coursesLabel,
      href: type === "all" ? undefined : ROUTES.courses,
    },
    ...(type === "civic" ? [{ label: copy.types.civic }] : []),
    ...(type === "servicePrep" ? [{ label: copy.types.servicePrep }] : []),
  ];

  const title = isCivic ? civic.title : copy.title;
  const description = isCivic ? civic.description : copy.description;
  const sampleNote = isCivic ? civic.sampleNote : copy.sampleNote;
  const imageAlt = isCivic ? civic.imageAlt : copy.hero.imageAlt;
  const imageSrc = isCivic ? HERO_IMAGE_CIVIC : HERO_IMAGE_DEFAULT;

  return (
    <section className="relative isolate overflow-hidden bg-text">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-text/55 via-text/20 to-transparent lg:from-text/40 lg:via-text/10"
      />

      <Container className="relative flex flex-col gap-6 pt-12 pb-14 sm:gap-8 sm:pt-16 sm:pb-20 lg:min-h-112 lg:justify-center lg:pt-20 lg:pb-24">
        <Breadcrumb
          tone="onPrimary"
          className="text-sm sm:text-base"
          items={breadcrumb}
        />

        <div className="flex max-w-xl flex-col gap-4 rounded-2xl bg-text/50 p-5 ring-1 ring-white/15 backdrop-blur-md sm:gap-5 sm:p-7 lg:max-w-xl">
          <h1
            className={cn(
              "text-[1.75rem] leading-[1.28] font-semibold text-balance text-white sm:text-[2.125rem] sm:leading-snug lg:text-4xl lg:leading-[1.2]",
              isBangla && "leading-[1.32] sm:leading-[1.3]",
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "text-base text-white/85 sm:text-body",
              isBangla && "leading-[1.75] sm:leading-[1.8]",
            )}
          >
            {description}
          </p>
          <p
            className={cn(
              "text-sm text-white/70 sm:text-base",
              isBangla && "leading-[1.7] sm:leading-[1.75]",
            )}
          >
            {sampleNote}
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0 sm:gap-2.5">
            {isCivic ? (
              <>
                <HeroStat
                  icon={<BookOpen className="size-3.5" aria-hidden />}
                  label={formatTemplate(civic.stats.courses, {
                    count: civicCount,
                  })}
                />
                <HeroStat
                  icon={<Sparkles className="size-3.5" aria-hidden />}
                  label={civic.stats.free}
                />
              </>
            ) : (
              <>
                <HeroStat
                  icon={<BookOpen className="size-3.5" aria-hidden />}
                  label={formatTemplate(copy.hero.stats.courses, {
                    count: catalog.length,
                  })}
                />
                <HeroStat
                  icon={<Landmark className="size-3.5" aria-hidden />}
                  label={formatTemplate(copy.hero.stats.categories, {
                    count: COURSE_CATALOG_CATEGORY_KEYS.length,
                  })}
                />
                <HeroStat
                  icon={<GraduationCap className="size-3.5" aria-hidden />}
                  label={copy.hero.prepareFirst}
                />
              </>
            )}
          </ul>
        </div>
      </Container>

      <span className="sr-only">{imageAlt}</span>
    </section>
  );
}

function HeroStat({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <li className="inline-flex max-w-full items-center gap-1.5 rounded-btn bg-white/12 px-2.5 py-1 text-sm font-medium text-white ring-1 ring-white/15 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-base">
      {icon}
      <span>{label}</span>
    </li>
  );
}

export { CoursesHero };
export type { CoursesHeroProps };
