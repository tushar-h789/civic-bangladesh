import { ROUTES } from "@/constants/routes";
import { HOME_SCENARIOS } from "@/data/civic-scenarios";
import {
  CIVIC_FEATURED_LESSONS,
  CIVIC_HUB_QUIZZES,
  CIVIC_RECOMMENDED_PATHS,
  CIVIC_SHORT_VIDEOS,
  civicLessonHref,
  civicVideoHref,
  youtubeWatchHref,
} from "@/data/civic-learning";
import { catalogCourseHref } from "@/data/civic-courses";
import { CIVIC_TOPICS, civicTopicHref } from "@/data/civic-topics";
import { getCatalogCourseBySlug } from "@/data/course-catalog";
import { getCourseCopy } from "@/lib/get-course-copy";
import type { Dictionary } from "@/locales";
import type { Scenario } from "@/types/scenario";

export function getCivicHubScenarios(t: Dictionary): Scenario[] {
  const items = t.scenarios.items;

  return HOME_SCENARIOS.map((entry) => {
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
  });
}

export function getCivicFeaturedLessons(t: Dictionary) {
  return CIVIC_FEATURED_LESSONS.map((lesson) => {
    const topic = CIVIC_TOPICS.find((entry) => entry.key === lesson.topicKey);
    const copy = t.civicLearning.lessons.items[lesson.key];

    return {
      ...lesson,
      title: copy.title,
      description: copy.description,
      imageAlt: copy.imageAlt,
      topicTitle: t.home.topics.items[lesson.topicKey].title,
      href: civicLessonHref(lesson.courseSlug, topic?.slug ?? lesson.topicKey),
    };
  });
}

export function getCivicShortVideos(t: Dictionary) {
  return CIVIC_SHORT_VIDEOS.map((video) => {
    const copy = t.civicLearning.videos.items[video.key];
    const topic = CIVIC_TOPICS.find((entry) => entry.key === video.topicKey);

    return {
      ...video,
      title: copy.title,
      description: copy.description,
      imageAlt: copy.imageAlt,
      topicTitle: t.home.topics.items[video.topicKey].title,
      topicHref: topic ? civicTopicHref(topic.slug) : ROUTES.learn,
      href: civicVideoHref(video.slug),
      youtubeHref: video.youtubeId ? youtubeWatchHref(video.youtubeId) : null,
      courseHref: video.courseSlug ? catalogCourseHref(video.courseSlug) : null,
      external: false,
    };
  });
}

export function getCivicHubQuizzes(t: Dictionary) {
  return CIVIC_HUB_QUIZZES.map((quiz) => {
    const copy = t.civicLearning.quizzes.items[quiz.key];
    const questionCopy = copy.questions as Record<
      string,
      {
        prompt: string;
        imageAlt: string;
        explanation: string;
        choices: Record<string, string>;
      }
    >;

    return {
      key: quiz.key,
      topicKey: quiz.topicKey,
      topicTitle: t.home.topics.items[quiz.topicKey].title,
      title: copy.title,
      description: copy.description,
      imageAlt: copy.imageAlt,
      image: quiz.questions[0]?.image ?? "",
      questionCount: quiz.questions.length,
      scenarios: quiz.questions.map((question) => {
        const item = questionCopy[question.key];
        const choiceLabels = item.choices;

        return {
          id: `${quiz.key}-${question.key}`,
          image: question.image,
          imageAlt: item.imageAlt,
          prompt: item.prompt,
          topicLabel: copy.title,
          explanation: item.explanation,
          correctChoiceId: question.correctChoiceId,
          choices: question.choiceIds.map((id) => ({
            id,
            label: choiceLabels[id],
          })),
        } satisfies Scenario;
      }),
    };
  });
}

export function getCivicRecommendedPaths(t: Dictionary) {
  return CIVIC_RECOMMENDED_PATHS.flatMap((path) => {
    const course = getCatalogCourseBySlug(path.courseSlug);
    if (!course) return [];

    const courseCopy = getCourseCopy(course, t);
    const copy = t.civicLearning.recommended.items[path.key];

    return [
      {
        ...path,
        title: copy.title,
        description: copy.description,
        imageAlt: copy.imageAlt,
        kicker: copy.kicker,
        href: catalogCourseHref(course.slug),
        courseTitle: courseCopy.title,
        access: course.access,
      },
    ];
  });
}
