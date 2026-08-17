import {
  Award,
  CheckCircle2,
  ClipboardCheck,
  Lock,
  PlayCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { PlayerItem, PlayerItemStatus } from "@/data/course-player";
import { playerItemStatus } from "@/data/course-player";
import { Badge } from "@/components/common/badge";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

type GroupedModule = {
  key: string;
  title: string;
  items: Array<PlayerItem & { index: number; status: PlayerItemStatus }>;
};

function groupPlaylist(
  items: PlayerItem[],
  completedCount: number,
): GroupedModule[] {
  const groups: GroupedModule[] = [];

  items.forEach((item, index) => {
    const status = playerItemStatus(index, completedCount);
    const last = groups.at(-1);
    if (last?.key === item.moduleKey) {
      last.items.push({ ...item, index, status });
      return;
    }
    groups.push({
      key: item.moduleKey,
      title: item.moduleTitle,
      items: [{ ...item, index, status }],
    });
  });

  return groups;
}

function CoursePlayerNav({
  items,
  completedCount,
  activeId,
  labels,
  isBangla,
  onSelect,
}: {
  items: PlayerItem[];
  completedCount: number;
  activeId: string;
  labels: {
    curriculum: string;
    locked: string;
    current: string;
    completed: string;
    duration: string;
    lockedHint: string;
  };
  isBangla: boolean;
  onSelect: (index: number) => void;
}) {
  const groups = groupPlaylist(items, completedCount);

  return (
    <nav aria-label={labels.curriculum} className="flex flex-col gap-4">
      {groups.map((group) => (
        <div key={group.key}>
          <p className="px-1 text-xs font-semibold tracking-wide text-text-secondary uppercase">
            {group.title}
          </p>
          <ul className="mt-2 flex list-none flex-col gap-1 p-0">
            {group.items.map((item) => {
              const active = item.id === activeId;
              const locked = item.status === "locked";

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    disabled={locked}
                    aria-current={active ? "true" : undefined}
                    title={locked ? labels.lockedHint : item.title}
                    onClick={() => onSelect(item.index)}
                    className={cn(
                      "flex w-full items-start gap-2.5 rounded-btn px-2 py-2 text-left text-sm transition-colors duration-200 ease-standard",
                      "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                      locked && "cursor-not-allowed opacity-60",
                      active && "bg-light-green font-semibold text-primary",
                      !active && !locked && "text-foreground hover:bg-muted",
                    )}
                  >
                    <LessonStatusIcon
                      kind={item.kind}
                      status={item.status}
                      active={active}
                    />
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block leading-snug",
                          isBangla && "leading-[1.7]",
                        )}
                      >
                        {item.title}
                      </span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs font-normal text-text-secondary">
                        {formatTemplate(labels.duration, {
                          minutes: item.durationMin,
                        })}
                        {item.status === "current" ? (
                          <Badge variant="info" className="h-5 px-1.5 text-[10px]">
                            {labels.current}
                          </Badge>
                        ) : null}
                        {item.status === "completed" ? (
                          <span>{labels.completed}</span>
                        ) : null}
                        {item.status === "locked" ? (
                          <span>{labels.locked}</span>
                        ) : null}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function LessonStatusIcon({
  kind,
  status,
  active,
}: {
  kind: PlayerItem["kind"];
  status: PlayerItemStatus;
  active: boolean;
}) {
  const className = cn(
    "mt-0.5 size-4 shrink-0",
    status === "completed" && "text-success",
    status === "current" && "text-primary",
    status === "locked" && "text-text-secondary",
  );

  if (status === "locked") {
    return <Lock className={className} aria-hidden />;
  }
  if (status === "completed") {
    return <CheckCircle2 className={className} aria-hidden />;
  }
  if (kind === "quiz") {
    return <ClipboardCheck className={className} aria-hidden />;
  }
  if (kind === "assessment") {
    return <Award className={className} aria-hidden />;
  }
  return (
    <PlayCircle
      className={cn(className, active && "fill-primary/10")}
      aria-hidden
    />
  );
}

export { CoursePlayerNav };
