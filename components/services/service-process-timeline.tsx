import {
  FolderOpen,
  LogIn,
  PenLine,
  Search,
  Send,
  Upload,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SERVICE_PROCESS_STEP_KEYS,
  type ServiceProcessStepKey,
} from "@/data/government-services";

const STEP_ICONS = {
  prepare: FolderOpen,
  login: LogIn,
  fill: PenLine,
  upload: Upload,
  submit: Send,
  track: Search,
} as const;

interface ServiceProcessTimelineProps {
  steps: Record<ServiceProcessStepKey, { title: string; body: string }>;
  isBangla?: boolean;
}

function stepNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function ServiceProcessTimeline({
  steps,
  isBangla = false,
}: ServiceProcessTimelineProps) {
  return (
    <ol className="relative m-0 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
      {SERVICE_PROCESS_STEP_KEYS.map((key, index) => {
        const step = steps[key];
        const Icon = STEP_ICONS[key];

        return (
          <li key={key}>
            <article className="flex h-full flex-col gap-4 rounded-card bg-surface p-5 shadow-card ring-1 ring-border sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="flex size-11 items-center justify-center rounded-btn bg-light-green text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-semibold tracking-wide text-primary">
                  {stepNumber(index)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-balance text-foreground">
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm text-text-secondary",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {step.body}
                </p>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}

export { ServiceProcessTimeline };
