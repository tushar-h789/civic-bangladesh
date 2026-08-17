"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { ROUTES } from "@/constants/routes";
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

function HomeHero() {
  const { t, locale } = useTranslation();
  const hero = t.home.hero;
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
    <section className="relative z-10 isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-primary">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={HERO_POSTER}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {motionEnabled ? (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-standard",
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
      </Container>
    </section>
  );
}

export { HomeHero };
