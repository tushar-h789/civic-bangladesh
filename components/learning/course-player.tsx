"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  ListChecks,
  Pause,
  Play,
  SlidersHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { catalogCourseHref } from "@/data/civic-courses";
import { getCatalogCourseBySlug } from "@/data/course-catalog";
import {
  certificateHref,
  getCertificateByCourseSlug,
} from "@/data/certificates";
import {
  buildPlayerPlaylist,
  playerItemStatus,
  type PlayerItem,
} from "@/data/course-player";
import { serviceHref } from "@/data/government-services";
import { getCourseAssessmentQuestions } from "@/lib/get-assessment-questions";
import { getCourseCopy } from "@/lib/get-course-copy";
import { getCurriculumModules } from "@/lib/get-curriculum";
import { useTranslation } from "@/hooks/use-translation";
import { Badge } from "@/components/common/badge";
import { ProgressBar } from "@/components/common/progress-bar";
import { CourseAssessment } from "@/components/learning/course-assessment";
import { CoursePlayerNav } from "@/components/learning/course-player-nav";
import { CourseTypeLabel } from "@/components/learning/course-type-label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function CoursePlayer({ slug }: { slug: string }) {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const course = getCatalogCourseBySlug(slug);
  const copy = t.courseLearn;
  const playlist = course
    ? buildPlayerPlaylist(getCurriculumModules(course, t), {
        quizModule: copy.quiz,
        quizTitle: copy.quizUi.title,
        assessmentTitle: copy.assessment.title,
      })
    : [];
  const [completedCount, setCompletedCount] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [curriculumOpen, setCurriculumOpen] = React.useState(false);
  const [notes, setNotes] = React.useState<Record<string, string>>({});
  const [assessmentPassed, setAssessmentPassed] = React.useState(false);

  if (!course || playlist.length === 0) return null;

  const item = getCourseCopy(course, t);
  const lesson = playlist[activeIndex];
  const status = playerItemStatus(activeIndex, completedCount);
  const isLast = activeIndex >= playlist.length - 1;
  const isAssessment = lesson.kind === "assessment";
  const nextHref = catalogCourseHref(course.slug);
  const earnedCertificate = getCertificateByCourseSlug(course.slug);
  const durationLabel = formatTemplate(copy.duration, {
    minutes: lesson.durationMin,
  });
  const kindLabel =
    lesson.kind === "assessment" ? copy.assessment.title : copy[lesson.kind];
  const keyPoints = getKeyPoints(lesson.kind, copy);

  function selectLesson(index: number) {
    if (playerItemStatus(index, completedCount) === "locked") return;
    setActiveIndex(index);
    setPlaying(false);
    setCurriculumOpen(false);
  }

  function handleAssessmentPassed() {
    setAssessmentPassed(true);
    setCompletedCount(playlist.length);
  }

  function goNext() {
    if (activeIndex < completedCount) {
      setActiveIndex(Math.min(activeIndex + 1, playlist.length - 1));
      setPlaying(false);
      return;
    }
    if (completedCount < playlist.length) {
      const nextIndex = Math.min(completedCount + 1, playlist.length - 1);
      setCompletedCount((count) => Math.min(count + 1, playlist.length));
      setActiveIndex(nextIndex);
      setPlaying(false);
    }
  }

  const navProps = {
    items: playlist,
    completedCount,
    activeId: lesson.id,
    labels: {
      curriculum: copy.curriculum,
      locked: copy.locked,
      current: copy.current,
      completed: copy.completed,
      duration: copy.duration,
      lockedHint: copy.lockedHint,
    },
    isBangla,
    onSelect: selectLesson,
  } as const;

  return (
    <div className={cn("bg-background", isBangla && "font-bengali")}>
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-content flex-col gap-3 px-4 py-3 sm:px-6 lg:px-(--container-padding-inline)">
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="ghost" className="h-9 rounded-btn px-2">
              <Link href={catalogCourseHref(course.slug)}>
                <ArrowLeft className="size-4" aria-hidden />
                {copy.back}
              </Link>
            </Button>
            <div className="min-w-0 flex-1">
              <div className="mb-1">
                <CourseTypeLabel
                  type={course.type}
                  label={t.courseTypes[course.type].label}
                />
              </div>
              <p className="truncate text-sm font-semibold text-foreground">
                {item.title}
              </p>
              <p className="truncate text-sm text-text-secondary">
                {copy.sampleNote}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="h-9 rounded-btn lg:hidden"
              onClick={() => setCurriculumOpen(true)}
            >
              <SlidersHorizontal className="size-4" aria-hidden />
              {copy.openCurriculum}
            </Button>
          </div>
          <ProgressBar
            value={completedCount}
            max={playlist.length}
            label={formatTemplate(copy.progress, {
              completed: completedCount,
              total: playlist.length,
            })}
            showValue={false}
          />
        </div>
      </div>

      <div
        className={cn(
          "mx-auto grid w-full max-w-content items-start gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:px-(--container-padding-inline) xl:gap-8",
          !isAssessment && "xl:grid-cols-[17.5rem_minmax(0,1fr)_16.5rem]",
        )}
      >
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-card bg-surface p-4 shadow-card ring-1 ring-border">
            <p className="mb-3 text-sm font-semibold text-foreground">
              {copy.curriculum}
            </p>
            <CoursePlayerNav {...navProps} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-6">
          {isAssessment ? (
            <CourseAssessment
              questions={getCourseAssessmentQuestions(course, t)}
              hasCertificate={course.hasCertificate}
              alreadyPassed={assessmentPassed}
              courseTitle={item.title}
              courseHref={nextHref}
              certificateHref={
                earnedCertificate
                  ? certificateHref(earnedCertificate.id)
                  : undefined
              }
              copy={copy.assessment}
              certificateCopy={t.courseDetail.certificate}
              logoAlt={t.nav.brandName}
              isBangla={isBangla}
              onPassed={handleAssessmentPassed}
            />
          ) : (
            <>
              <LessonStage
                key={lesson.id}
                lesson={lesson}
                image={course.image}
                imageAlt={item.imageAlt}
                youtubeVideoId={course.youtubeVideoId}
                playing={playing}
                onTogglePlay={() => setPlaying((value) => !value)}
                copy={copy}
                isBangla={isBangla}
              />

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="info" className="h-6 px-2.5">
                    {kindLabel}
                  </Badge>
                  <span className="text-sm text-text-secondary">
                    {durationLabel}
                  </span>
                </div>
                <h1
                  className={cn(
                    "text-xl font-semibold text-balance text-foreground lg:text-2xl",
                    isBangla && "leading-tight",
                  )}
                >
                  {lesson.title}
                </h1>
                <p
                  className={cn(
                    "text-body text-text-secondary",
                    isBangla && "leading-[1.8]",
                  )}
                >
                  {lesson.kind === "video"
                    ? formatTemplate(copy.description.video, {
                        lesson: lesson.title,
                        module: lesson.moduleTitle,
                      })
                    : copy.description[lesson.kind]}
                </p>
              </div>

              <Tabs defaultValue="points" className="gap-4">
                <TabsList variant="line" className="w-full justify-start">
                  <TabsTrigger value="points">{copy.keyPoints.title}</TabsTrigger>
                  <TabsTrigger value="resources">
                    {copy.resources.title}
                  </TabsTrigger>
                  <TabsTrigger value="notes">{copy.notes.title}</TabsTrigger>
                </TabsList>
                <TabsContent value="points">
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {keyPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden
                        />
                        <span className={cn(isBangla && "leading-[1.75]")}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="resources">
                  <p
                    className={cn(
                      "mb-3 text-sm text-text-secondary",
                      isBangla && "leading-[1.75]",
                    )}
                  >
                    {copy.resources.sample}
                  </p>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    <li>
                      <SampleResource label={copy.resources.checklist} />
                    </li>
                    <li>
                      <SampleResource label={copy.resources.guide} />
                    </li>
                    {course.relatedServiceSlug ? (
                      <li>
                        <Link
                          href={serviceHref(course.relatedServiceSlug)}
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          <ListChecks className="size-4" aria-hidden />
                          {copy.resources.service}
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                </TabsContent>
                <TabsContent value="notes">
                  <Textarea
                    value={notes[lesson.id] ?? ""}
                    onChange={(event) =>
                      setNotes((current) => ({
                        ...current,
                        [lesson.id]: event.target.value,
                      }))
                    }
                    placeholder={copy.notes.placeholder}
                    className="min-h-28 rounded-btn bg-surface"
                    aria-label={copy.notes.title}
                  />
                  <p
                    className={cn(
                      "mt-2 text-xs text-text-secondary",
                      isBangla && "leading-[1.7]",
                    )}
                  >
                    {copy.notes.sample}
                  </p>
                </TabsContent>
              </Tabs>

              <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-text-secondary">
                  {isLast
                    ? copy.next.finish
                    : playlist[activeIndex + 1]
                      ? playlist[activeIndex + 1].title
                      : copy.next.label}
                </p>
                {isLast && status === "completed" ? (
                  <Button
                    asChild
                    className="h-11 rounded-btn text-primary-foreground"
                  >
                    <Link href={nextHref}>
                      {copy.next.finish}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </Button>
                ) : isLast ? (
                  <Button
                    type="button"
                    className="h-11 rounded-btn text-primary-foreground"
                    onClick={goNext}
                  >
                    {copy.next.markComplete}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="h-11 rounded-btn text-primary-foreground"
                    onClick={goNext}
                  >
                    {status === "current"
                      ? copy.next.markComplete
                      : copy.next.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                )}
              </div>
            </>
          )}
        </div>

        {isAssessment ? null : (
          <aside className="hidden xl:block">
          <div className="sticky top-24 flex flex-col gap-4 rounded-card bg-surface p-5 shadow-card ring-1 ring-border">
            <p className="text-sm font-semibold text-foreground">
              {copy.description.title}
            </p>
            <dl className="flex flex-col gap-3 text-sm">
              <div>
                <dt className="text-text-secondary">{kindLabel}</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {lesson.moduleTitle}
                </dd>
              </div>
              <div>
                <dt className="text-text-secondary">
                  {t.courseDetail.meta.duration}
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {durationLabel}
                </dd>
              </div>
              <div>
                <dt className="text-text-secondary">
                  {t.courseDetail.meta.instructor}
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {t.courses.instructors[course.instructor]}
                </dd>
              </div>
            </dl>
            <ul className="m-0 flex list-none flex-col gap-2 border-t border-border p-0 pt-4">
              {keyPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm text-text-secondary"
                >
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span className={cn(isBangla && "leading-[1.75]")}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        )}
      </div>

      <Sheet open={curriculumOpen} onOpenChange={setCurriculumOpen}>
        <SheetContent side="left" className="w-full bg-background sm:max-w-sm">
          <SheetHeader className="border-b border-border">
            <SheetTitle>{copy.curriculum}</SheetTitle>
            <SheetDescription>{copy.sampleNote}</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">
            <CoursePlayerNav {...navProps} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function LessonStage({
  lesson,
  image,
  imageAlt,
  youtubeVideoId,
  playing,
  onTogglePlay,
  copy,
  isBangla,
}: {
  lesson: PlayerItem;
  image: string;
  imageAlt: string;
  youtubeVideoId: string | null;
  playing: boolean;
  onTogglePlay: () => void;
  copy: ReturnType<typeof useTranslation>["t"]["courseLearn"];
  isBangla: boolean;
}) {
  if (lesson.kind === "quiz") {
    return <QuizPanel copy={copy.quizUi} isBangla={isBangla} />;
  }

  if (youtubeVideoId) {
    return (
      <div className="overflow-hidden rounded-card bg-text shadow-card">
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        </div>
        <p
          className={cn(
            "px-4 py-2.5 text-center text-xs text-white/70",
            isBangla && "leading-[1.7]",
          )}
        >
          {copy.player.sample}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card bg-text shadow-card">
      <div className="relative aspect-video">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1280px) 50vw, 100vw"
          className={cn(
            "object-cover transition-opacity duration-300",
            playing ? "opacity-30" : "opacity-50",
          )}
        />
        <div className="absolute inset-0 bg-text/40" aria-hidden />
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={playing ? copy.player.pause : copy.player.play}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white outline-none focus-visible:ring-3 focus-visible:ring-white/60"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
            {playing ? (
              <Pause className="size-7" aria-hidden />
            ) : (
              <Play className="size-7 translate-x-0.5" aria-hidden />
            )}
          </span>
          <span className="text-sm font-medium">
            {playing ? copy.player.playing : copy.player.play}
          </span>
        </button>
        <p className="sr-only">{imageAlt}</p>
      </div>
      <p
        className={cn(
          "px-4 py-2.5 text-center text-xs text-white/70",
          isBangla && "leading-[1.7]",
        )}
      >
        {copy.player.sample}
      </p>
    </div>
  );
}

function SampleResource({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <FileText className="size-4" aria-hidden />
      {label}
    </button>
  );
}

type QuestionCopy = {
  prompt: string;
  a: string;
  b: string;
  c: string;
  answer: string;
  why: string;
};

function QuizPanel({
  copy,
  isBangla,
}: {
  copy: ReturnType<typeof useTranslation>["t"]["courseLearn"]["quizUi"];
  isBangla: boolean;
}) {
  return (
    <QuestionSet
      title={copy.title}
      note={undefined}
      questions={[copy.q1, copy.q2]}
      submitLabel={copy.submit}
      correctLabel={copy.correct}
      reviewLabel={copy.review}
      isBangla={isBangla}
    />
  );
}

function QuestionSet({
  title,
  note,
  questions,
  submitLabel,
  correctLabel,
  reviewLabel,
  isBangla,
}: {
  title: string;
  note?: string;
  questions: QuestionCopy[];
  submitLabel: string;
  correctLabel: string;
  reviewLabel: string;
  isBangla: boolean;
}) {
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="rounded-card bg-surface p-5 shadow-card ring-1 ring-border sm:p-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {note ? (
        <p
          className={cn(
            "mt-2 text-sm text-text-secondary",
            isBangla && "leading-[1.75]",
          )}
        >
          {note}
        </p>
      ) : null}
      <ol className="mt-5 flex list-none flex-col gap-6 p-0">
        {questions.map((question, index) => {
          const selected = answers[index];
          const isCorrect = selected === question.answer;

          return (
            <li key={question.prompt}>
              <p
                className={cn(
                  "text-sm font-medium text-foreground",
                  isBangla && "leading-[1.75]",
                )}
              >
                {index + 1}. {question.prompt}
              </p>
              <RadioGroup
                value={selected}
                onValueChange={(value) => {
                  setChecked(false);
                  setAnswers((current) => ({ ...current, [index]: value }));
                }}
                className="mt-3"
              >
                {(["a", "b", "c"] as const).map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-start gap-2.5 rounded-btn px-2 py-1.5 text-sm hover:bg-muted"
                  >
                    <RadioGroupItem value={option} className="mt-0.5" />
                    <span className={cn(isBangla && "leading-[1.75]")}>
                      {question[option]}
                    </span>
                  </label>
                ))}
              </RadioGroup>
              {checked && selected ? (
                <p
                  className={cn(
                    "mt-2 text-sm",
                    isCorrect ? "text-success" : "text-warning",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {isCorrect ? correctLabel : reviewLabel} — {question.why}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
      <Button
        type="button"
        variant="outline"
        className="mt-5 h-10 rounded-btn"
        onClick={() => setChecked(true)}
      >
        {submitLabel}
      </Button>
    </div>
  );
}

function getKeyPoints(
  kind: PlayerItem["kind"],
  copy: ReturnType<typeof useTranslation>["t"]["courseLearn"],
) {
  if (kind === "quiz") {
    return [copy.keyPoints.quiz1, copy.keyPoints.quiz2, copy.keyPoints.quiz3];
  }
  if (kind === "assessment") {
    return [
      copy.keyPoints.assessment1,
      copy.keyPoints.assessment2,
      copy.keyPoints.assessment3,
    ];
  }
  return [copy.keyPoints.video1, copy.keyPoints.video2, copy.keyPoints.video3];
}

export { CoursePlayer };
