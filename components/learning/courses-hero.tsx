import type { ReactNode } from "react";
import Image from "next/image";
import { BookOpen, GraduationCap, Landmark } from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import {
  COURSE_CATALOG_CATEGORY_KEYS,
  getCourseCatalog,
} from "@/data/course-catalog";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";

const HERO_IMAGE = "/images/home/intro-people.png";

interface CoursesHeroCopy {
  eyebrow: string;
  title: string;
  description: string;
  sampleNote: string;
  hero: {
    imageAlt: string;
    prepareFirst: string;
    stats: {
      courses: string;
      categories: string;
    };
  };
}

interface CoursesHeroProps {
  copy: CoursesHeroCopy;
  homeLabel: string;
  coursesLabel: string;
  isBangla: boolean;
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
}: CoursesHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] lg:object-[68%_center]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-primary/94 via-primary/78 to-primary/28"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-text/45 via-transparent to-text/20"
      />

      <Container className="relative flex flex-col gap-8 pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <Breadcrumb
          tone="onPrimary"
          items={[
            { label: homeLabel, href: ROUTES.home },
            { label: coursesLabel },
          ]}
        />

        <div className="flex max-w-2xl flex-col gap-5">
          <p
            className={cn(
              "text-sm font-medium text-white/80",
              !isBangla && "tracking-wide uppercase",
            )}
          >
            {copy.eyebrow}
          </p>
          <h1
            className={cn(
              "text-hero-mobile font-semibold text-balance text-white lg:text-5xl",
              isBangla && "leading-tight",
            )}
          >
            {copy.title}
          </h1>
          <p
            className={cn(
              "max-w-xl text-body text-white/85",
              isBangla && "leading-[1.8]",
            )}
          >
            {copy.description}
          </p>
          <p
            className={cn(
              "max-w-xl text-sm text-white/70",
              isBangla && "leading-[1.75]",
            )}
          >
            {copy.sampleNote}
          </p>
        </div>

        <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
          <HeroStat
            icon={<BookOpen className="size-3.5" aria-hidden />}
            label={formatTemplate(copy.hero.stats.courses, {
              count: getCourseCatalog().length,
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
        </ul>
      </Container>

      <span className="sr-only">{copy.hero.imageAlt}</span>
    </section>
  );
}

function HeroStat({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <li className="inline-flex max-w-full items-center gap-2 rounded-btn bg-white/12 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/15">
      {icon}
      <span>{label}</span>
    </li>
  );
}

export { CoursesHero };
export type { CoursesHeroProps };
