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
      className="gap-0 overflow-hidden rounded-card bg-background ring-1 ring-border"
    >
      {modules.map((module, index) => (
        <AccordionItem
          key={module.key}
          value={module.key}
          className="border-border px-4 sm:px-5"
        >
          <AccordionTrigger className="items-start py-4 text-left hover:no-underline">
            <span className="flex min-w-0 flex-1 items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-btn bg-light-green text-xs font-semibold text-primary">
                {stepNumber(index)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-base font-semibold text-foreground">
                    {module.title}
                  </span>
                  <span className="text-xs font-medium text-text-secondary">
                    {formatTemplate(lessonsLabel, {
                      count: module.lessons.length,
                    })}
                  </span>
                </span>
                <span className="sr-only">
                  {formatTemplate(moduleLabel, { number: stepNumber(index) })}
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
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pl-12 sm:pl-[3.25rem]">
            <ol className="m-0 flex list-none flex-col gap-0 border-l border-border p-0">
              {module.lessons.map((lesson, lessonIndex) => (
                <li
                  key={`${module.key}-${lessonIndex}`}
                  className="relative flex items-start gap-3 py-2 pl-4 text-sm text-foreground"
                >
                  <span
                    aria-hidden
                    className="absolute top-3.5 -left-px size-1.5 rounded-full bg-primary"
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
