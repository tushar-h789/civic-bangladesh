import type { CourseCurriculumModule } from "@/lib/get-curriculum";

export type PlayerItemKind = "video" | "quiz" | "assessment";

export type PlayerItemStatus = "completed" | "current" | "locked";

export type PlayerItem = {
  id: string;
  kind: PlayerItemKind;
  moduleKey: string;
  moduleTitle: string;
  title: string;
  durationMin: number;
};

export function buildPlayerPlaylist(
  modules: CourseCurriculumModule[],
  labels: { quizModule: string; quizTitle: string; assessmentTitle: string },
): PlayerItem[] {
  const items: PlayerItem[] = [];

  modules.forEach((module, moduleIndex) => {
    module.lessons.forEach((lesson, lessonIndex) => {
      items.push({
        id: `${module.key}.${lesson.key}`,
        kind: "video",
        moduleKey: module.key,
        moduleTitle: module.title,
        title: lesson.title,
        durationMin: 4 + ((moduleIndex + lessonIndex) % 3),
      });
    });

    if (moduleIndex === 1) {
      items.push({
        id: "quiz",
        kind: "quiz",
        moduleKey: "quiz",
        moduleTitle: labels.quizModule,
        title: labels.quizTitle,
        durationMin: 8,
      });
    }
  });

  items.push({
    id: "assessment",
    kind: "assessment",
    moduleKey: "assessment",
    moduleTitle: labels.assessmentTitle,
    title: labels.assessmentTitle,
    durationMin: 12,
  });

  return items;
}

export function playerItemStatus(
  index: number,
  completedCount: number,
): PlayerItemStatus {
  if (index < completedCount) return "completed";
  if (index === completedCount) return "current";
  return "locked";
}
