"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";

const PILLARS = [
  { key: "people", src: "/images/home/intro-people.png" },
  { key: "spaces", src: "/images/home/intro-spaces.png" },
  { key: "rules", src: "/images/home/intro-rules.png" },
  { key: "environment", src: "/images/home/intro-environment.png" },
] as const;

const OUTCOMES = [
  { key: "safer", src: "/images/home/intro-safer.png" },
  { key: "cleaner", src: "/images/home/intro-cleaner.png" },
  { key: "responsibility", src: "/images/home/intro-responsibility.png" },
] as const;

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function HomeIntroduction() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const civicSense = t.home.civicSense;
  const whyItMatters = t.home.whyItMatters;

  return (
    <>
      <section
        aria-labelledby="civic-sense-heading"
        className={cn(
          "bg-background py-10 md:py-12 lg:py-14",
          isBangla && "font-bengali",
        )}
      >
        <Container>
          <SectionHeader
            className="gap-3"
            title={<span id="civic-sense-heading">{civicSense.title}</span>}
            description={civicSense.description}
          />

          <nav
            aria-label={civicSense.title}
            className="mt-5 border-y border-border py-3"
          >
            <ol className="flex list-none flex-wrap items-center gap-x-4 gap-y-1.5 p-0 sm:gap-x-6">
              {PILLARS.map(({ key }, index) => (
                <li key={key}>
                  <a
                    href={`#civic-pillar-${key}`}
                    className="text-sm font-medium text-text-secondary transition-colors duration-200 ease-standard hover:text-primary"
                  >
                    <span className="text-primary">{formatIndex(index)}</span>
                    <span className="mx-2 text-border">/</span>
                    {civicSense.pillars[key].title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-5 flex flex-col gap-3 lg:grid lg:grid-cols-12 lg:gap-3">
            {PILLARS.slice(0, 3).map(({ key, src }, index) => {
              const isFeatured = key === "people";

              return (
                <PillarTile
                  key={key}
                  id={`civic-pillar-${key}`}
                  number={formatIndex(index)}
                  src={src}
                  sizes={
                    isFeatured
                      ? "(min-width: 1024px) 58vw, 100vw"
                      : "(min-width: 1024px) 42vw, 100vw"
                  }
                  title={civicSense.pillars[key].title}
                  description={civicSense.pillars[key].description}
                  practice={civicSense.pillars[key].practice}
                  practiceLabel={civicSense.practiceLabel}
                  imageAlt={civicSense.pillars[key].imageAlt}
                  isBangla={isBangla}
                  className={
                    isFeatured
                      ? "lg:col-span-7 lg:row-span-2 lg:h-full"
                      : "lg:col-span-5"
                  }
                  imageClassName={
                    isFeatured
                      ? "min-h-64 lg:min-h-0 lg:flex-1"
                      : "min-h-44 lg:min-h-52"
                  }
                />
              );
            })}
          </div>

          <div className="mt-3">
            <PillarTile
              id="civic-pillar-environment"
              number="04"
              src={PILLARS[3].src}
              sizes="100vw"
              title={civicSense.pillars.environment.title}
              description={civicSense.pillars.environment.description}
              practice={civicSense.pillars.environment.practice}
              practiceLabel={civicSense.practiceLabel}
              imageAlt={civicSense.pillars.environment.imageAlt}
              isBangla={isBangla}
              imageClassName="min-h-52 sm:min-h-64 lg:min-h-72"
            />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="why-it-matters-heading"
        className={cn("relative z-10 bg-text", isBangla && "font-bengali")}
      >
        <Container className="py-10 md:py-12 lg:py-14">
          <div className="max-w-2xl">
            <h2
              id="why-it-matters-heading"
              className="text-section-heading font-semibold text-balance text-white"
            >
              {whyItMatters.title}
            </h2>
            <p
              className={cn(
                "mt-3 text-body text-white/75",
                isBangla && "leading-[1.75]",
              )}
            >
              {whyItMatters.description}
            </p>
          </div>

          <ol className="mt-6 grid list-none gap-3 p-0 lg:grid-cols-3">
            {OUTCOMES.map(({ key, src }, index) => {
              const outcome = whyItMatters.outcomes[key];
              const number = formatIndex(index);

              return (
                <li key={key}>
                  <article className="group relative min-h-80 overflow-hidden rounded-card sm:min-h-96">
                    <Image
                      src={src}
                      alt={outcome.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-standard group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-text via-text/55 to-text/10"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 sm:p-6">
                      <p className="text-sm font-semibold text-white/70">
                        {number}
                      </p>
                      <h3 className="text-2xl font-semibold text-white">
                        {outcome.title}
                      </h3>
                      <p
                        className={cn(
                          "text-body text-white/80",
                          isBangla && "leading-[1.75]",
                        )}
                      >
                        {outcome.description}
                      </p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>
    </>
  );
}

function PillarTile({
  id,
  number,
  src,
  sizes,
  title,
  description,
  practice,
  practiceLabel,
  imageAlt,
  isBangla,
  className,
  imageClassName,
}: {
  id: string;
  number: string;
  src: string;
  sizes: string;
  title: string;
  description: string;
  practice: string;
  practiceLabel: string;
  imageAlt: string;
  isBangla: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <article
      id={id}
      className={cn(
        "group flex scroll-mt-24 flex-col overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", imageClassName)}>
        <Image
          src={src}
          alt={imageAlt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-standard group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-text/25 via-transparent to-text/5"
        />
      </div>

      <div className="flex flex-col justify-center gap-2 p-4 sm:p-5">
        <p className="text-sm font-semibold text-primary">{number}</p>
        <h3 className="text-xl font-semibold text-balance text-foreground sm:text-2xl">
          {title}
        </h3>
        <p
          className={cn(
            "text-body text-text-secondary",
            isBangla && "leading-[1.7]",
          )}
        >
          {description}
        </p>
        <p className="border-l-2 border-primary pl-3">
          <span className="block text-xs font-semibold text-primary">
            {practiceLabel}
          </span>
          <span
            className={cn(
              "mt-1 block text-sm text-foreground",
              isBangla && "leading-[1.7]",
            )}
          >
            {practice}
          </span>
        </p>
      </div>
    </article>
  );
}

export { HomeIntroduction };
