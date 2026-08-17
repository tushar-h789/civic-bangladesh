"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type {
  Scenario,
  ScenarioPlayerCopy,
  ScenarioResult,
} from "@/types/scenario";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ScenarioPlayerProps {
  scenarios: Scenario[];
  copy: ScenarioPlayerCopy;
  className?: string;
  onComplete?: (results: ScenarioResult[]) => void;
}

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function choiceLetter(index: number) {
  return String.fromCharCode(65 + index);
}

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function ScenarioPlayer({
  scenarios,
  copy,
  className,
  onComplete,
}: ScenarioPlayerProps) {
  const [index, setIndex] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [revealed, setRevealed] = React.useState(false);
  const [complete, setComplete] = React.useState(false);
  const [results, setResults] = React.useState<Array<ScenarioResult | null>>(
    () => scenarios.map(() => null),
  );

  const idPrefix = React.useId();
  const promptId = `${idPrefix}-prompt`;
  const explanationId = `${idPrefix}-explanation`;
  const total = scenarios.length;
  const scenario = scenarios[index];
  const isLast = index === total - 1;
  const selectedIsCorrect =
    selectedId != null && selectedId === scenario?.correctChoiceId;
  const correctCount = results.filter((result) => result?.correct).length;
  const progressValue = complete
    ? 100
    : ((index + (revealed ? 1 : 0)) / Math.max(total, 1)) * 100;
  const progressLabel = formatTemplate(copy.progress, {
    current: complete ? total : index + 1,
    total,
  });

  const confirm = () => {
    if (!scenario || !selectedId || revealed) return;

    const result: ScenarioResult = {
      scenarioId: scenario.id,
      choiceId: selectedId,
      correct: selectedId === scenario.correctChoiceId,
    };

    setResults((current) => {
      const next = [...current];
      next[index] = result;
      return next;
    });
    setRevealed(true);
  };

  const goNext = () => {
    if (!revealed) return;

    if (isLast) {
      const finished = results.filter(
        (result): result is ScenarioResult => result != null,
      );
      setComplete(true);
      onComplete?.(finished);
      return;
    }

    setIndex((current) => current + 1);
    setSelectedId(null);
    setRevealed(false);
  };

  const restart = () => {
    setIndex(0);
    setSelectedId(null);
    setRevealed(false);
    setComplete(false);
    setResults(scenarios.map(() => null));
  };

  if (!scenario) return null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border",
        className,
      )}
    >
      <div className="flex flex-col lg:min-h-144 lg:flex-row">
        <div className="relative min-h-64 overflow-hidden sm:min-h-80 lg:w-[46%] lg:min-h-full">
          <Image
            src={
              complete
                ? (scenarios[scenarios.length - 1]?.image ?? scenario.image)
                : scenario.image
            }
            alt={
              complete
                ? (scenarios[scenarios.length - 1]?.imageAlt ??
                  scenario.imageAlt)
                : scenario.imageAlt
            }
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-text via-text/35 to-text/10"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
            <div>
              <p className="text-sm font-semibold text-white/70">
                {complete ? progressLabel : formatIndex(index)}
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {complete
                  ? copy.completeTitle
                  : (scenario.topicLabel ?? progressLabel)}
              </p>
            </div>
            <ol className="flex list-none gap-1.5 p-0" aria-hidden="true">
              {scenarios.map((item, itemIndex) => (
                <li
                  key={item.id}
                  className={cn(
                    "h-1 w-7 rounded-full",
                    complete ||
                      itemIndex < index ||
                      (itemIndex === index && revealed)
                      ? "bg-white"
                      : itemIndex === index
                        ? "bg-white/80"
                        : "bg-white/30",
                  )}
                />
              ))}
            </ol>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-primary">
                {complete
                  ? copy.completeTitle
                  : (scenario.topicLabel ?? copy.choiceGroupLabel)}
              </p>
              <p className="text-sm tabular-nums text-text-secondary">
                {progressLabel}
              </p>
            </div>
            <Progress
              value={progressValue}
              aria-label={progressLabel}
              className="bg-border"
            />
          </div>

          {complete ? (
            <CompletePanel
              scenarios={scenarios}
              results={results}
              copy={copy}
              correctCount={correctCount}
              onRestart={restart}
            />
          ) : (
            <>
              <p
                className="text-xl font-semibold text-balance text-foreground sm:text-2xl in-[.font-bengali]:leading-[1.45]"
                id={promptId}
              >
                {scenario.prompt}
              </p>

              <div
                role="radiogroup"
                aria-labelledby={promptId}
                aria-label={copy.choiceGroupLabel}
                aria-describedby={revealed ? explanationId : undefined}
                className="flex flex-col gap-2.5"
                onKeyDown={(event) => {
                  if (revealed) return;
                  const ids = scenario.choices.map((choice) => choice.id);
                  const current = selectedId ? ids.indexOf(selectedId) : -1;
                  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                    event.preventDefault();
                    const next = current < 0 ? 0 : (current + 1) % ids.length;
                    setSelectedId(ids[next] ?? null);
                  }
                  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    const next = current <= 0 ? ids.length - 1 : current - 1;
                    setSelectedId(ids[next] ?? null);
                  }
                  if (event.key === "Enter" && selectedId) {
                    event.preventDefault();
                    confirm();
                  }
                }}
              >
                {scenario.choices.map((choice, choiceIndex) => {
                  const isSelected = selectedId === choice.id;
                  const isCorrectChoice =
                    choice.id === scenario.correctChoiceId;
                  const showCorrect = revealed && isCorrectChoice;
                  const showIncorrect =
                    revealed && isSelected && !isCorrectChoice;

                  return (
                    <button
                      key={choice.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-disabled={revealed}
                      tabIndex={
                        revealed
                          ? -1
                          : isSelected ||
                              (selectedId == null && choiceIndex === 0)
                            ? 0
                            : -1
                      }
                      onClick={() => {
                        if (revealed) return;
                        setSelectedId(choice.id);
                      }}
                      className={cn(
                        "flex w-full items-start gap-3.5 rounded-btn border px-3.5 py-3.5 text-left transition-colors duration-200 ease-standard",
                        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                        revealed && "pointer-events-none",
                        !revealed &&
                          !isSelected &&
                          "border-border bg-background hover:border-primary/35 hover:bg-light-green/70",
                        !revealed &&
                          isSelected &&
                          "border-primary bg-light-green ring-1 ring-primary",
                        showCorrect && "border-success bg-success/10",
                        showIncorrect && "border-error bg-error/10",
                        revealed &&
                          !showCorrect &&
                          !showIncorrect &&
                          "border-border bg-background text-text-secondary",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md text-sm font-semibold",
                          !revealed &&
                            !isSelected &&
                            "border border-border bg-surface text-text-secondary",
                          !revealed &&
                            isSelected &&
                            "bg-primary text-primary-foreground",
                          showCorrect && "bg-success text-white",
                          showIncorrect && "bg-error text-white",
                          revealed &&
                            !showCorrect &&
                            !showIncorrect &&
                            "border border-border bg-surface text-text-secondary",
                        )}
                      >
                        {showCorrect ? (
                          <Check className="size-4" aria-hidden />
                        ) : showIncorrect ? (
                          <X className="size-4" aria-hidden />
                        ) : (
                          choiceLetter(choiceIndex)
                        )}
                      </span>
                      <span className="pt-0.5 text-body text-foreground in-[.font-bengali]:leading-[1.7]">
                        {choice.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                aria-live="polite"
                className={cn(
                  "overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-standard",
                  revealed
                    ? "grid grid-rows-[1fr] opacity-100"
                    : "grid grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0">
                  {revealed && (
                    <div
                      id={explanationId}
                      className={cn(
                        "rounded-btn border-l-2 px-4 py-3",
                        selectedIsCorrect
                          ? "border-success bg-success/10"
                          : "border-warning bg-warning/10",
                      )}
                    >
                      <p
                        className={cn(
                          "text-sm font-semibold",
                          selectedIsCorrect ? "text-success" : "text-warning",
                        )}
                      >
                        {selectedIsCorrect ? copy.correct : copy.incorrect}
                      </p>
                      <p className="mt-1 text-xs font-semibold tracking-wide text-text-secondary uppercase">
                        {copy.explanationLabel}
                      </p>
                      <p className="mt-1 text-body text-foreground in-[.font-bengali]:leading-[1.75]">
                        {scenario.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
                {!revealed ? (
                  <>
                    <p className="min-h-5 text-sm text-text-secondary">
                      {selectedId ? "" : copy.confirmHint}
                    </p>
                    <Button
                      type="button"
                      size="lg"
                      disabled={!selectedId}
                      onClick={confirm}
                      className="h-11 rounded-btn px-5 text-button text-primary-foreground cursor-pointer"
                    >
                      {copy.confirm}
                    </Button>
                  </>
                ) : (
                  <>
                    <span />
                    <Button
                      type="button"
                      size="lg"
                      onClick={goNext}
                      className="h-11 rounded-btn px-5 text-button text-primary-foreground cursor-pointer"
                    >
                      {isLast ? copy.finish : copy.next}
                      <ArrowRight className="size-4" aria-hidden />
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CompletePanel({
  scenarios,
  results,
  copy,
  correctCount,
  onRestart,
}: {
  scenarios: Scenario[];
  results: Array<ScenarioResult | null>;
  copy: ScenarioPlayerCopy;
  correctCount: number;
  onRestart: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <p className="mt-1 text-body text-text-secondary in-[.font-bengali]:leading-[1.75]">
          {copy.completeDescription}
        </p>
        <p className="mt-4 text-sm font-semibold text-primary">
          {formatTemplate(copy.scoreLabel, {
            score: correctCount,
            total: scenarios.length,
          })}
        </p>
      </div>

      <ol className="flex list-none flex-col gap-2 p-0">
        {scenarios.map((item, itemIndex) => {
          const result = results[itemIndex];
          const ok = Boolean(result?.correct);

          return (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-btn border border-border bg-background px-3.5 py-3"
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-md",
                  ok ? "bg-success/10 text-success" : "bg-error/10 text-error",
                )}
              >
                {ok ? (
                  <Check className="size-4" aria-hidden />
                ) : (
                  <X className="size-4" aria-hidden />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground">
                  {item.topicLabel ?? formatIndex(itemIndex)}
                </span>
                <span className="block truncate text-sm text-text-secondary">
                  {item.prompt}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={onRestart}
        className="mt-auto h-11 rounded-btn px-5 text-button"
      >
        <RotateCcw className="size-4" aria-hidden />
        {copy.restart}
      </Button>
    </div>
  );
}

export { ScenarioPlayer };
export type { ScenarioPlayerProps };
