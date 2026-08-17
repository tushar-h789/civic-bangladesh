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
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";

const PROGRAMS = [
  {
    key: "schools",
    href: ROUTES.schools,
    image: "/images/home/intro-safer.png",
    icon: GraduationCap,
  },
  {
    key: "organizations",
    href: ROUTES.organizations,
    image: "/images/topics/topic-social.png",
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

        <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 lg:mt-14 lg:grid-cols-2 lg:gap-5">
          {PROGRAMS.map((program) => {
            const item = section[program.key];
            const Icon: ComponentType<{
              className?: string;
              "aria-hidden"?: boolean;
            }> = program.icon;

            return (
              <li key={program.key}>
                <Card
                  hoverable
                  className="group h-full gap-0 rounded-card py-0 ring-border"
                >
                  <Link
                    href={program.href}
                    className="flex h-full flex-col rounded-card outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={program.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-standard group-hover:scale-105"
                      />
                    </div>

                    <CardHeader className="gap-3 pt-6">
                      <span className="flex size-11 items-center justify-center rounded-btn bg-light-green text-primary">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <CardTitle className="text-xl font-semibold text-balance text-foreground sm:text-2xl">
                        {item.title}
                      </CardTitle>
                      <CardDescription
                        className={cn(
                          "text-body text-text-secondary",
                          isBangla && "leading-[1.7]",
                        )}
                      >
                        {item.description}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter className="mt-auto border-border">
                      <span className="inline-flex h-10 items-center gap-1.5 rounded-btn bg-primary px-4 text-button font-medium text-primary-foreground">
                        {item.cta}
                        <ArrowRight className="size-4" aria-hidden />
                      </span>
                    </CardFooter>
                  </Link>
                </Card>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export { HomeInstitutions };
