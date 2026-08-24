"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, GraduationCap } from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";

const PROGRAMS = [
  {
    key: "schools",
    href: ROUTES.schools,
    image: "/images/home/institutions-schools.jpg",
    icon: GraduationCap,
  },
  {
    key: "organizations",
    href: ROUTES.organizations,
    image: "/images/home/institutions-organizations.jpg",
    icon: Building2,
  },
] as const;

function HomeInstitutions() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const section = t.home.forInstitutions;

  return (
    <section
      aria-labelledby="institutions-heading"
      className={cn(
        "bg-background py-section-mobile md:py-section-tablet lg:py-section-desktop",
        isBangla && "font-bengali",
      )}
    >
      <Container>
        <SectionHeader
          title={<span id="institutions-heading">{section.title}</span>}
          description={section.description}
        />

        <ul className="mt-10 grid list-none gap-5 p-0 sm:mt-12 lg:mt-14 lg:grid-cols-2 lg:gap-6">
          {PROGRAMS.map((program, index) => {
            const item = section[program.key];
            const Icon: ComponentType<{
              className?: string;
              "aria-hidden"?: boolean;
            }> = program.icon;
            const indexLabel = String(index + 1).padStart(2, "0");

            return (
              <li key={program.key}>
                <Link
                  href={program.href}
                  className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border outline-none transition-shadow duration-200 ease-standard hover:shadow-card-hover focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <div className="relative aspect-16/10 overflow-hidden sm:aspect-5/3">
                    <Image
                      src={program.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-standard group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-text/75 via-text/25 to-transparent"
                    />
                    <span className="absolute top-4 left-4 flex size-11 items-center justify-center rounded-btn bg-surface text-primary shadow-card ring-1 ring-border">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span
                      aria-hidden
                      className="absolute right-4 bottom-10 text-4xl font-semibold tracking-tight text-white/35 sm:bottom-12 sm:text-5xl"
                    >
                      {indexLabel}
                    </span>
                  </div>

                  <div className="relative z-10 -mt-10 mx-4 mb-4 flex flex-1 flex-col rounded-card bg-surface p-5 ring-1 ring-border sm:mx-5 sm:mb-5 sm:p-6">
                    <h3 className="text-xl font-semibold text-balance text-foreground sm:text-2xl">
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-body text-text-secondary",
                        isBangla && "leading-[1.7]",
                      )}
                    >
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-btn bg-primary px-5 text-button font-medium text-primary-foreground sm:w-fit">
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
      </Container>
    </section>
  );
}

export { HomeInstitutions };
