"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { ChallengeTypeLabel } from "@/components/challenge/challenge-type-label";
import { CivicChallengesSection } from "@/components/challenge/civic-challenges-section";
import { LearningChallengesSection } from "@/components/challenge/learning-challenges-section";

const HERO_IMAGE = "/images/home/intro-responsibility.png";

function ChallengesHub() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.challenge.page;

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <section className="relative isolate overflow-hidden bg-primary">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_center]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-text/90 via-text/72 to-text/30"
        />

        <Container className="relative flex flex-col gap-8 pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
          <Breadcrumb
            tone="onPrimary"
            items={[
              { label: t.nav.links.home, href: ROUTES.home },
              { label: t.nav.links.challenges },
            ]}
          />
          <div className="flex max-w-2xl flex-col gap-5">
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
                "max-w-xl text-base text-white/70",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.sampleNote}
            </p>
            <div className="flex flex-wrap gap-2">
              <ChallengeTypeLabel
                type="civic"
                label={t.challengeTypes.civic.label}
                className="bg-white/12 text-white ring-1 ring-white/20"
              />
              <ChallengeTypeLabel
                type="learning"
                label={t.challengeTypes.learning.label}
                className="bg-white/12 text-white ring-1 ring-white/20"
              />
            </div>
          </div>
          <nav aria-label={copy.jump.label}>
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-base">
              <li>
                <a
                  href="#civic-challenges"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.civic}
                </a>
              </li>
              <li>
                <a
                  href="#learning-challenges"
                  className="font-medium text-white/85 outline-none hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50"
                >
                  {copy.jump.learning}
                </a>
              </li>
            </ul>
          </nav>
        </Container>
        <span className="sr-only">{copy.heroImageAlt}</span>
      </section>

      <CivicChallengesSection />
      <LearningChallengesSection />
    </div>
  );
}

export { ChallengesHub };
