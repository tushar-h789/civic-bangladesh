"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { FEATURED_STORIES, storyHref } from "@/data/civic-stories";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { StoryCard } from "@/components/community/story-card";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function HomeStories() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const section = t.home.stories;
  const copy = t.stories;

  return (
    <section
      aria-labelledby="stories-heading"
      className={cn(
        "bg-light-green py-section-mobile md:py-section-tablet lg:py-section-desktop",
        isBangla && "font-bengali",
      )}
    >
      <Container>
        <SectionHeader
          title={<span id="stories-heading">{section.title}</span>}
          description={section.description}
          actions={
            <Link
              href={ROUTES.stories}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {section.viewAll}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />

        <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {FEATURED_STORIES.map((story) => {
            const item = copy.items[story.key];

            return (
              <li key={story.key}>
                <StoryCard
                  href={storyHref(story.slug)}
                  image={story.image}
                  imageAlt={item.imageAlt}
                  kind={copy.kinds[story.kind]}
                  title={item.title}
                  excerpt={item.excerpt}
                  byline={formatTemplate(copy.byline, {
                    name: item.name,
                    place: item.place,
                  })}
                  cta={copy.cta}
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export { HomeStories };
