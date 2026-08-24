"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { HOME_SCENARIOS } from "@/data/civic-scenarios";
import { useTranslation } from "@/hooks/use-translation";
import { Container } from "@/components/common/container";
import { SectionHeader } from "@/components/common/section-header";
import { ScenarioPlayer } from "@/components/common/scenario-player";
import type { Scenario } from "@/types/scenario";

function HomeScenarios() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const section = t.home.whatWouldYouDo;
  const items = t.scenarios.items;

  const scenarios = useMemo<Scenario[]>(
    () =>
      HOME_SCENARIOS.map((entry) => {
        const copy = items[entry.key];
        const choiceLabels = copy.choices as Record<string, string>;

        return {
          id: entry.key,
          image: entry.image,
          imageAlt: copy.imageAlt,
          prompt: copy.prompt,
          topicLabel: copy.topic,
          explanation: copy.explanation,
          correctChoiceId: entry.correctChoiceId,
          choices: entry.choiceIds.map((id) => ({
            id,
            label: choiceLabels[id],
          })),
        };
      }),
    [items],
  );

  return (
    <section
      aria-labelledby="what-would-you-do-heading"
      className={cn(
        "bg-background py-10 md:py-12 lg:py-14",
        isBangla && "font-bengali",
      )}
    >
      <Container>
        <SectionHeader
          className="gap-3"
          title={
            <span id="what-would-you-do-heading">{section.title}</span>
          }
          description={section.description}
        />

        <div className="mt-5">
          <ScenarioPlayer scenarios={scenarios} copy={t.scenarios.player} />
        </div>
      </Container>
    </section>
  );
}

export { HomeScenarios };
