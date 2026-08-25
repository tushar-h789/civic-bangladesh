import type { ReactNode } from "react";
import Image from "next/image";
import { BookOpen, Files, Landmark } from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import {
  SAMPLE_GOVERNMENT_SERVICES,
  SERVICE_CATEGORY_KEYS,
} from "@/data/government-services";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";

const HERO_IMAGE = "/images/home/courses-hero-service-v2.png";

interface ServicesHeroCopy {
  eyebrow: string;
  title: string;
  description: string;
  sampleNote: string;
  hero: {
    imageAlt: string;
    prepareFirst: string;
    stats: {
      services: string;
      categories: string;
    };
  };
}

interface ServicesHeroProps {
  copy: ServicesHeroCopy;
  homeLabel: string;
  servicesLabel: string;
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

function ServicesHero({
  copy,
  homeLabel,
  servicesLabel,
  isBangla,
}: ServicesHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-text">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={HERO_IMAGE}
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

      <Container className="relative flex flex-col gap-4 pt-8 pb-10 sm:gap-5 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14">
        <Breadcrumb
          tone="onPrimary"
          className="text-sm sm:text-base"
          items={[
            { label: homeLabel, href: ROUTES.home },
            { label: servicesLabel },
          ]}
        />

        <div className="flex max-w-xl flex-col gap-3 rounded-2xl bg-text/50 p-4 ring-1 ring-white/15 backdrop-blur-md sm:p-5">
          <h1
            className={cn(
              "text-[1.75rem] leading-[1.28] font-semibold text-balance text-white sm:text-[2.125rem] sm:leading-snug lg:text-4xl lg:leading-[1.2]",
              isBangla && "leading-[1.32] sm:leading-[1.3]",
            )}
          >
            {copy.title}
          </h1>
          <p
            className={cn(
              "text-base text-white/85 sm:text-body",
              isBangla && "leading-[1.75] sm:leading-[1.8]",
            )}
          >
            {copy.description}
          </p>
          <p
            className={cn(
              "text-sm text-white/70 sm:text-base",
              isBangla && "leading-[1.7] sm:leading-[1.75]",
            )}
          >
            {copy.sampleNote}
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            <HeroStat
              icon={<Files className="size-3.5" aria-hidden />}
              label={formatTemplate(copy.hero.stats.services, {
                count: SAMPLE_GOVERNMENT_SERVICES.length,
              })}
            />
            <HeroStat
              icon={<Landmark className="size-3.5" aria-hidden />}
              label={formatTemplate(copy.hero.stats.categories, {
                count: SERVICE_CATEGORY_KEYS.length,
              })}
            />
            <HeroStat
              icon={<BookOpen className="size-3.5" aria-hidden />}
              label={copy.hero.prepareFirst}
            />
          </ul>
        </div>
      </Container>

      <span className="sr-only">{copy.hero.imageAlt}</span>
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

export { ServicesHero };
export type { ServicesHeroProps };
