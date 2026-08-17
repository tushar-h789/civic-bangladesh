import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CourseCurriculumModule } from "@/lib/get-curriculum";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function stepNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function CourseCurriculum({
  modules,
  moduleLabel,
  lessonsLabel,
  isBangla = false,
}: {
  modules: CourseCurriculumModule[];
  moduleLabel: string;
  lessonsLabel: string;
  isBangla?: boolean;
}) {
  const openByDefault = modules[0]?.key;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={openByDefault}
      className="gap-0 overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-border"
    >
      {modules.map((module, index) => (
        <AccordionItem
          key={module.key}
          value={module.key}
          className="border-border px-5 sm:px-6"
        >
          <AccordionTrigger className="items-start py-5 text-left hover:no-underline">
            <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="text-sm font-semibold tracking-wide text-primary">
                {formatTemplate(moduleLabel, { number: stepNumber(index) })}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold text-foreground">
                  {module.title}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-sm font-normal text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {module.body}
                </span>
              </span>
              <span className="text-xs font-medium text-text-secondary">
                {formatTemplate(lessonsLabel, { count: module.lessons.length })}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            <ol className="m-0 flex list-none flex-col gap-2 p-0">
              {module.lessons.map((lesson, lessonIndex) => (
                <li
                  key={`${module.key}-${lessonIndex}`}
                  className="flex items-start gap-3 rounded-btn bg-light-green px-3 py-2.5 text-sm text-foreground"
                >
                  <Play
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span className={cn(isBangla && "leading-[1.75]")}>
                    {lesson.title}
                  </span>
                </li>
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { CourseCurriculum };
