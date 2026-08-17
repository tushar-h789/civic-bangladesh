"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { ROUTES } from "@/constants/routes";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

const SLIDE_INTERVAL_MS = 6500;

const SLIDES = [
  {
    src: "/images/home/hero-shaheed-minar.png",
    key: "shaheedMinar",
  },
  {
    src: "/images/home/hero-smriti-soudho.png",
    key: "smritiSoudho",
  },
  {
    src: "/images/home/hero-ahsan-manzil.png",
    key: "ahsanManzil",
  },
  {
    src: "/images/home/hero-sixty-dome.png",
    key: "sixtyDome",
  },
  {
    src: "/images/home/hero-bangladesh.png",
    key: "countryside",
  },
] as const;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("a11y-reduce-motion")
  );
}

function HomeHero() {
  const { t, locale } = useTranslation();
  const hero = t.home.hero;
  const isBangla = locale === "bn";
  const [active, setActive] = React.useState(0);
  const [motionEnabled, setMotionEnabled] = React.useState(true);

  React.useEffect(() => {
    const update = () => setMotionEnabled(!prefersReducedMotion());
    update();

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", update);
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!motionEnabled) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [motionEnabled]);

  const activeSlide = SLIDES[active];
  const activeLabel = hero.slides[activeSlide.key];

  return (
    <section className="relative z-10 isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-primary">
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDES.map((slide, index) => {
          const isActive = index === active;

          return (
            <Image
              key={slide.src}
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className={cn(
                "object-cover object-center transition-[opacity,transform] duration-1000 ease-standard",
                isActive
                  ? "z-10 opacity-100 translate-x-0 scale-100"
                  : "z-0 opacity-0 translate-x-8 scale-105",
              )}
            />
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 bg-linear-to-r from-primary/88 via-primary/62 to-primary/18"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 bg-linear-to-t from-text/55 via-transparent to-text/20"
      />

      <Container className="relative z-30 flex min-h-[calc(100svh-4rem)] flex-col justify-end py-16 sm:py-20 lg:justify-center lg:py-24">
        <div className="flex max-w-3xl flex-col gap-6">
          <div className="hero-copy-motion flex flex-col gap-3">
            <h1
              className={cn(
                "text-hero-mobile font-semibold text-white lg:text-hero-desktop",
                isBangla && "font-bengali",
              )}
            >
              {hero.headline}
            </h1>
            <p
              className={cn(
                "text-xl font-medium text-white/85 sm:text-2xl",
                !isBangla && "font-bengali",
              )}
            >
              {hero.headlineSecondary}
            </p>
          </div>

          <p
            className={cn(
              "hero-copy-motion hero-copy-motion-delay-1 max-w-xl text-body text-white/80",
              isBangla && "font-bengali",
            )}
          >
            {hero.description}
          </p>

          <div className="hero-copy-motion hero-copy-motion-delay-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-12 px-6 text-button bg-white text-primary hover:bg-light-green"
            >
              <Link href={ROUTES.learn}>{hero.primaryCta}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-6 text-button border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={ROUTES.challenges}>{hero.secondaryCta}</Link>
            </Button>
          </div>
        </div>

        <div className="hero-copy-motion hero-copy-motion-delay-3 mt-10 flex flex-col gap-3 sm:mt-14">
          <p
            className={cn(
              "text-sm font-medium text-white/80",
              isBangla && "font-bengali",
            )}
            aria-live="polite"
          >
            {activeLabel}
          </p>
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label={hero.sliderLabel}
          >
            {SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`${hero.goToSlide} ${hero.slides[slide.key]}`}
                onClick={() => setActive(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-standard",
                  index === active
                    ? "w-8 bg-white"
                    : "w-3 bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export { HomeHero };
