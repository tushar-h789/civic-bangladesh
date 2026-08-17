"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { CIVIC_PROMISES, type CivicPromiseKey } from "@/data/civic-promises";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function HomeCivicPromise() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const section = t.home.civicPromise;
  const copy = t.promise;
  const [selected, setSelected] = React.useState<CivicPromiseKey>(
    CIVIC_PROMISES[0].key,
  );
  const [confirmed, setConfirmed] = React.useState(false);
  const chosen = copy.items[selected];

  function handleConfirm() {
    setConfirmed(true);
  }

  return (
    <section
      aria-labelledby="civic-promise-heading"
      className={cn(
        "bg-text py-section-mobile md:py-section-tablet lg:py-section-desktop",
        isBangla && "font-bengali",
      )}
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="civic-promise-heading"
            className="text-section-heading font-semibold text-balance text-white"
          >
            {section.title}
          </h2>
          <p
            className={cn(
              "mt-5 text-body text-white/75",
              isBangla && "leading-[1.75]",
            )}
          >
            {section.description}
          </p>
        </div>

        <article className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-card bg-surface shadow-card sm:mt-12">
          {confirmed ? (
            <div className="flex flex-col items-center gap-5 px-6 py-10 text-center sm:px-10 sm:py-12">
              <p className="text-sm font-semibold text-primary">
                {copy.confirmed}
              </p>
              <h3
                className={cn(
                  "text-xl font-semibold text-foreground sm:text-2xl",
                  isBangla && "leading-[1.45]",
                )}
              >
                {chosen.title}
              </h3>
              <p
                className={cn(
                  "max-w-md text-body text-text-secondary",
                  isBangla && "leading-[1.7]",
                )}
              >
                {chosen.description}
              </p>
              <p className="text-xs text-text-secondary">{copy.sampleNote}</p>
              <Button
                asChild
                size="lg"
                className="h-11 rounded-btn px-5 text-button text-primary-foreground"
              >
                <Link href={ROUTES.challenges}>
                  {copy.practiceCta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          ) : (
            <form
              className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10"
              onSubmit={(event) => {
                event.preventDefault();
                handleConfirm();
              }}
            >
              <RadioGroup
                value={selected}
                onValueChange={(value) => setSelected(value as CivicPromiseKey)}
                className="gap-3"
                aria-label={section.title}
              >
                {CIVIC_PROMISES.map((item) => {
                  const promise = copy.items[item.key];
                  const inputId = `civic-promise-${item.key}`;

                  return (
                    <label
                      key={item.key}
                      htmlFor={inputId}
                      className={cn(
                        "flex cursor-pointer items-start gap-4 rounded-card p-4 ring-1 ring-border transition-colors duration-200 ease-standard",
                        selected === item.key
                          ? "bg-light-green ring-primary"
                          : "bg-background hover:bg-light-green/60",
                      )}
                    >
                      <RadioGroupItem
                        id={inputId}
                        value={item.key}
                        className="mt-1"
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block font-semibold text-foreground",
                            isBangla && "leading-[1.45]",
                          )}
                        >
                          {promise.title}
                        </span>
                        <span
                          className={cn(
                            "mt-1 block text-sm text-text-secondary",
                            isBangla && "leading-[1.7]",
                          )}
                        >
                          {promise.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </RadioGroup>

              <Button
                type="submit"
                size="lg"
                className="h-11 w-fit rounded-btn px-5 text-button text-primary-foreground"
              >
                {copy.cta}
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </form>
          )}
        </article>
      </Container>
    </section>
  );
}

export { HomeCivicPromise };
