"use client";

import type { ComponentType } from "react";
import {
  BusFront,
  CarFront,
  HeartHandshake,
  Landmark,
  Leaf,
  Smartphone,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { CIVIC_TOPICS, civicTopicHref, type CivicTopicKey } from "@/data/civic-topics";
import { useTranslation } from "@/hooks/use-translation";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import {
  TopicCard,
  type TopicCardVariant,
} from "@/components/civic/topic-card";

const TOPIC_ICONS: Record<
  CivicTopicKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  roadTraffic: CarFront,
  cleanliness: Sparkles,
  environment: Leaf,
  publicSpaces: Landmark,
  publicTransport: BusFront,
  socialResponsibility: HeartHandshake,
  digitalCitizenship: Smartphone,
  communityResponsibility: UsersRound,
};

const TOPIC_ROWS: { keys: CivicTopicKey[]; variant: TopicCardVariant; columns: string }[] =
  [
    {
      keys: ["roadTraffic", "cleanliness", "environment"],
      variant: "tall",
      columns: "sm:grid-cols-2 lg:grid-cols-3",
    },
    {
      keys: ["publicSpaces", "publicTransport"],
      variant: "wide",
      columns: "lg:grid-cols-2",
    },
    {
      keys: ["socialResponsibility", "digitalCitizenship", "communityResponsibility"],
      variant: "standard",
      columns: "sm:grid-cols-2 lg:grid-cols-3",
    },
  ];

function formatCount(template: string, count: number) {
  return template.replace("{count}", String(count));
}

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function HomeTopics() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.home.topics;

  return (
    <section
      aria-labelledby="civic-topics-heading"
      className={cn(
        "bg-light-green py-10 md:py-12 lg:py-14",
        isBangla && "font-bengali",
      )}
    >
      <Container>
        <SectionHeader
          className="gap-3"
          title={<span id="civic-topics-heading">{copy.title}</span>}
          description={copy.description}
          actions={
            <p className="text-sm font-semibold text-primary">
              {formatCount(copy.topicCount, CIVIC_TOPICS.length)}
            </p>
          }
        />

        <div className="mt-5 flex flex-col gap-3">
          {TOPIC_ROWS.map((row) => (
            <ul
              key={row.variant}
              className={cn("grid list-none gap-3 p-0", row.columns)}
            >
              {row.keys.map((key) => {
                const topic = CIVIC_TOPICS.find((entry) => entry.key === key);
                if (!topic) return null;

                const Icon = TOPIC_ICONS[key];
                const item = copy.items[key];
                const index = CIVIC_TOPICS.findIndex((entry) => entry.key === key);

                return (
                  <li key={key}>
                    <TopicCard
                      href={civicTopicHref(topic.slug)}
                      variant={row.variant}
                      image={topic.image}
                      imageAlt={item.imageAlt}
                      index={formatIndex(index)}
                      icon={<Icon className="size-5" aria-hidden />}
                      title={item.title}
                      description={item.description}
                      lessonCount={formatCount(copy.lessonCount, topic.lessonCount)}
                      cta={copy.cta}
                    />
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { HomeTopics };
