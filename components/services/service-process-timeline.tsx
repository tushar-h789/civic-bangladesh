import { FolderOpen, LogIn, PenLine, Search, Send, Upload } from "lucide-react";

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

function ServiceProcessTimeline({
  steps,
  isBangla = false,
}: ServiceProcessTimelineProps) {
  return (
    <ol className="m-0 flex list-none flex-col p-0">
      {SERVICE_PROCESS_STEP_KEYS.map((key, index) => {
        const step = steps[key];
        const Icon = STEP_ICONS[key];
        const last = index === SERVICE_PROCESS_STEP_KEYS.length - 1;

        return (
          <li key={key} className="flex gap-4">
            <div className="flex w-10 shrink-0 flex-col items-center">
              <span className="flex size-10 items-center justify-center rounded-btn bg-light-green text-primary">
                <Icon className="size-4" aria-hidden />
              </span>
              {last ? null : (
                <span
                  aria-hidden
                  className="mt-1 mb-1 w-px flex-1 min-h-6 bg-border"
                />
              )}
            </div>
            <div className={cn("min-w-0 flex-1", last ? "pb-0" : "pb-6")}>
              <p className="text-xs font-semibold text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-0.5 text-base font-semibold text-foreground sm:text-lg">
                {step.title}
              </h3>
              <p
                className={cn(
                  "mt-1 text-sm text-text-secondary sm:text-body",
                  isBangla && "leading-[1.75]",
                )}
              >
                {step.body}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export { ServiceProcessTimeline };
