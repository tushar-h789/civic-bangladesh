"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown, ClipboardList } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { ROUTES } from "@/constants/routes";
import { coursesCatalogHref } from "@/data/course-catalog";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

const HERO_VIDEO = "/videos/hero-civic.mp4";
const HERO_POSTER = "/videos/hero-civic-poster.jpg";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("a11y-reduce-motion")
  );
}

const HERO_SLIDE_MS = 5500;

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function HomeHero() {
  const { t, locale } = useTranslation();
  const hero = t.home.hero;
  const paths = t.home.featuredCourses.paths;
  const isBangla = locale === "bn";
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [motionEnabled, setMotionEnabled] = React.useState(false);
  const [videoReady, setVideoReady] = React.useState(false);

  React.useEffect(() => {
    const update = () => {
      const enabled = !prefersReducedMotion();
      setMotionEnabled(enabled);
      if (!enabled) setVideoReady(false);
    };
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
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    const play = () => {
      video.play().catch(() => {});
    };
    play();
  }, [motionEnabled, videoReady]);

  return (
    <section className="relative z-10 isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-text">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={HERO_POSTER}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] lg:object-center"
        />
        {motionEnabled ? (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-[70%_center] transition-opacity duration-700 ease-standard lg:object-center",
              videoReady ? "opacity-100" : "opacity-0",
            )}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HERO_POSTER}
            disablePictureInPicture
            disableRemotePlayback
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => setVideoReady(true)}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <span className="sr-only">{hero.videoAlt}</span>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 bg-linear-to-r from-text via-text/70 to-text/20 lg:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 bg-linear-to-t from-text/80 via-transparent to-text/25"
      />

      <Container className="relative z-30 flex min-h-[calc(100svh-4.5rem)] flex-col justify-center py-14 sm:py-18 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-7">
            <HeroHeadlineSlider
              slides={[hero.slides.slogan.lines, hero.slides.oneStop.lines]}
              label={hero.slides.label}
              goTo={hero.slides.goTo}
              isBangla={isBangla}
              motionEnabled={motionEnabled}
            />

            <p
              className={cn(
                "hero-copy-motion hero-copy-motion-delay-1 max-w-xl text-body text-white/88 sm:text-lg",
                isBangla && "font-bengali leading-[1.8]",
              )}
            >
              {hero.description}
            </p>

            <div className="hero-copy-motion hero-copy-motion-delay-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 px-7 text-button bg-white text-primary hover:bg-light-green"
              >
                <Link href={ROUTES.learn}>
                  {hero.primaryCta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7 text-button border-white/60 bg-transparent text-white hover:bg-white/12 hover:text-white"
              >
                <Link href={ROUTES.challenges}>{hero.secondaryCta}</Link>
              </Button>
            </div>
          </div>

          <div className="hero-copy-motion hero-copy-motion-delay-3 flex flex-col gap-3 lg:col-span-5">
            <HeroPillar
              href={coursesCatalogHref("civic")}
              icon={BookOpen}
              title={paths.civic.title}
              hint={hero.pillars.civic.hint}
              isBangla={isBangla}
            />
            <HeroPillar
              href={coursesCatalogHref("servicePrep")}
              icon={ClipboardList}
              title={paths.servicePrep.title}
              hint={hero.pillars.service.hint}
              isBangla={isBangla}
            />
          </div>
        </div>
      </Container>

      <a
        href="#purpose"
        className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 text-white/65 outline-none transition-colors duration-200 ease-standard hover:text-white focus-visible:ring-3 focus-visible:ring-white/50 lg:flex"
        aria-label={t.home.purpose.heading}
      >
        <ChevronDown className="size-7" aria-hidden />
      </a>
    </section>
  );
}

function HeroHeadlineSlider({
  slides,
  label,
  goTo,
  isBangla,
  motionEnabled,
}: {
  slides: readonly (readonly string[])[];
  label: string;
  goTo: string;
  isBangla: boolean;
  motionEnabled: boolean;
}) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (!motionEnabled || paused || slides.length < 2) return;

    const id = window.setTimeout(() => {
      if (document.visibilityState === "hidden") return;
      setIndex((current) => (current + 1) % slides.length);
    }, HERO_SLIDE_MS);

    return () => window.clearTimeout(id);
  }, [index, motionEnabled, paused, slides.length]);

  const goToSlide = (next: number) => {
    setIndex((next + slides.length) % slides.length);
  };

  return (
    <div
      className="hero-copy-motion flex flex-col gap-4"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative">
        {slides.map((lines, slideIndex) => {
          const active = slideIndex === index;
          const Heading = active ? "h1" : "p";

          return (
            <div
              key={lines.join(" ")}
              className={cn(
                "transition-opacity duration-1000 ease-standard",
                active
                  ? "relative z-10 opacity-100"
                  : "pointer-events-none absolute inset-x-0 top-0 z-0 opacity-0",
              )}
              aria-hidden={!active}
            >
              <Heading
                className={cn(
                  "text-hero-mobile font-semibold tracking-tight text-white lg:text-hero-desktop lg:leading-[1.1]",
                  isBangla && "font-bengali leading-[1.15]",
                )}
              >
                {lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </Heading>
            </div>
          );
        })}
      </div>

      <div
        className="flex items-center gap-2"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goToSlide(index + 1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goToSlide(index - 1);
          }
        }}
      >
        {slides.map((lines, slideIndex) => {
          const selected = slideIndex === index;

          return (
            <button
              key={lines.join(" ")}
              type="button"
              aria-current={selected}
              aria-label={formatTemplate(goTo, { n: slideIndex + 1 })}
              className="h-8 cursor-pointer rounded-btn px-0.5 outline-none focus-visible:ring-3 focus-visible:ring-white/50"
              onClick={() => goToSlide(slideIndex)}
            >
              <span className="block h-px w-8 overflow-hidden bg-white/25 sm:w-10">
                <span
                  key={`${slideIndex}-${index}`}
                  className={cn(
                    "block h-full origin-left bg-white",
                    selected && motionEnabled
                      ? "animate-[hero-headline-progress_5.5s_linear_forwards]"
                      : selected
                        ? "scale-x-100"
                        : "scale-x-0",
                  )}
                  style={
                    selected && paused
                      ? { animationPlayState: "paused" }
                      : undefined
                  }
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HeroPillar({
  href,
  icon: Icon,
  title,
  hint,
  isBangla,
}: {
  href: string;
  icon: typeof BookOpen;
  title: string;
  hint: string;
  isBangla: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex cursor-pointer items-start gap-4 rounded-card bg-surface p-5 shadow-card ring-1 ring-border outline-none transition-shadow duration-200 ease-standard hover:shadow-card-hover focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-6"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-btn bg-light-green text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-semibold text-foreground">
          {title}
        </span>
        <span
          className={cn(
            "mt-1 block text-body text-text-secondary",
            isBangla && "leading-[1.7]",
          )}
        >
          {hint}
        </span>
      </span>
      <ArrowRight
        className="mt-1 size-5 shrink-0 text-primary transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}

export { HomeHero };
