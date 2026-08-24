"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  ClipboardList,
  Info,
  RotateCcw,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  ASSESSMENT_PASS_COUNT,
  didPassAssessment,
  scoreAssessment,
  type AssessmentQuestion,
} from "@/data/course-assessment";
import { Badge } from "@/components/common/badge";
import { ProgressBar } from "@/components/common/progress-bar";
import { CourseCertificatePreview } from "@/components/learning/course-certificate-preview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

type AssessmentCopy = {
  title: string;
  sampleBadge: string;
  instructions: {
    title: string;
    lead: string;
    count: string;
    pass: string;
    retry: string;
    notExam: string;
    start: string;
  };
  progress: string;
  next: string;
  back: string;
  submit: string;
  results: {
    title: string;
    score: string;
    scoreValue: string;
    passMark: string;
    passedBadge: string;
    failedBadge: string;
    passTitle: string;
    passBody: string;
    failTitle: string;
    failBody: string;
    retry: string;
    reviewTitle: string;
    yourAnswer: string;
    correctAnswer: string;
    completedTitle: string;
    certificateAvailable: string;
    viewCertificate: string;
    closeCertificate: string;
    noCertificate: string;
    backToCourse: string;
    sampleNote: string;
  };
};

type CertificateCopy = {
  previewEyebrow: string;
  heading: string;
  awardedTo: string;
  sampleName: string;
  courseLabel: string;
  issuer: string;
  notGovernment: string;
};

type AssessmentPhase = "instructions" | "question" | "results";

interface CourseAssessmentProps {
  questions: AssessmentQuestion[];
  hasCertificate: boolean;
  alreadyPassed: boolean;
  courseTitle: string;
  courseHref: string;
  certificateHref?: string;
  copy: AssessmentCopy;
  certificateCopy: CertificateCopy;
  logoAlt: string;
  isBangla: boolean;
  onPassed: () => void;
}

function CourseAssessment({
  questions,
  hasCertificate,
  alreadyPassed,
  courseTitle,
  courseHref,
  certificateHref,
  copy,
  certificateCopy,
  logoAlt,
  isBangla,
  onPassed,
}: CourseAssessmentProps) {
  const [phase, setPhase] = React.useState<AssessmentPhase>(
    alreadyPassed ? "results" : "instructions",
  );
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [certificateOpen, setCertificateOpen] = React.useState(false);

  const total = questions.length;
  const question = questions[index];
  const selected = question ? answers[question.id] : undefined;
  const correct = scoreAssessment(questions, answers);
  const passed = alreadyPassed || didPassAssessment(correct);
  const showReview = Object.keys(answers).length === total;

  function start() {
    setPhase("question");
    setIndex(0);
    setAnswers({});
  }

  function goBack() {
    setIndex((current) => Math.max(0, current - 1));
  }

  function goNext() {
    if (!question || !selected) return;
    if (index < total - 1) {
      setIndex((current) => current + 1);
      return;
    }
    const nextScore = scoreAssessment(questions, answers);
    if (didPassAssessment(nextScore)) {
      onPassed();
    }
    setPhase("results");
  }

  function retry() {
    setPhase("instructions");
    setIndex(0);
    setAnswers({});
  }

  if (total === 0 || !question) return null;

  return (
    <div className="rounded-card bg-surface shadow-card ring-1 ring-border">
      {phase === "instructions" ? (
        <Instructions
          copy={copy}
          total={total}
          isBangla={isBangla}
          onStart={start}
        />
      ) : null}

      {phase === "question" ? (
        <QuestionStep
          copy={copy}
          question={question}
          index={index}
          total={total}
          selected={selected}
          isBangla={isBangla}
          onSelect={(value) =>
            setAnswers((current) => ({ ...current, [question.id]: value }))
          }
          onBack={goBack}
          onNext={goNext}
        />
      ) : null}

      {phase === "results" ? (
        <Results
          copy={copy}
          questions={questions}
          answers={answers}
          correct={correct}
          total={total}
          passed={passed}
          showReview={showReview}
          hasCertificate={hasCertificate}
          alreadyPassed={alreadyPassed && !showReview}
          courseHref={courseHref}
          certificateHref={certificateHref}
          isBangla={isBangla}
          onRetry={retry}
          onViewCertificate={() => setCertificateOpen(true)}
        />
      ) : null}

      {hasCertificate && !certificateHref ? (
        <Dialog open={certificateOpen} onOpenChange={setCertificateOpen}>
          <DialogContent
            className={cn(
              "max-h-[min(92vh,48rem)] overflow-y-auto rounded-card bg-surface sm:max-w-3xl",
              isBangla && "font-bengali",
            )}
          >
            <DialogHeader>
              <DialogTitle>{copy.results.certificateAvailable}</DialogTitle>
              <DialogDescription>{copy.results.sampleNote}</DialogDescription>
            </DialogHeader>
            <CourseCertificatePreview
              courseTitle={courseTitle}
              copy={certificateCopy}
              logoAlt={logoAlt}
              isBangla={isBangla}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-btn"
                onClick={() => setCertificateOpen(false)}
              >
                {copy.results.closeCertificate}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}

function Instructions({
  copy,
  total,
  isBangla,
  onStart,
}: {
  copy: AssessmentCopy;
  total: number;
  isBangla: boolean;
  onStart: () => void;
}) {
  const points = [
    formatTemplate(copy.instructions.count, { count: total }),
    formatTemplate(copy.instructions.pass, { pass: ASSESSMENT_PASS_COUNT }),
    copy.instructions.retry,
    copy.instructions.notExam,
  ];

  return (
    <div className="flex flex-col gap-6 p-5 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="info" className="h-6 px-2.5">
          {copy.sampleBadge}
        </Badge>
      </div>
      <div>
        <p className="text-sm font-semibold text-primary">{copy.title}</p>
        <h2
          className={cn(
            "mt-2 text-xl font-semibold text-balance text-foreground sm:text-2xl",
            isBangla && "leading-tight",
          )}
        >
          {copy.instructions.title}
        </h2>
        <p
          className={cn(
            "mt-3 max-w-2xl text-body text-text-secondary",
            isBangla && "leading-[1.8]",
          )}
        >
          {copy.instructions.lead}
        </p>
      </div>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-3 rounded-btn bg-background p-4 ring-1 ring-border"
          >
            <ClipboardList
              className="mt-0.5 size-4 shrink-0 text-primary"
              aria-hidden
            />
            <span
              className={cn(
                "text-sm text-foreground",
                isBangla && "leading-[1.75]",
              )}
            >
              {point}
            </span>
          </li>
        ))}
      </ul>
      <div>
        <Button
          type="button"
          className="h-11 rounded-btn px-5 text-button text-primary-foreground"
          onClick={onStart}
        >
          {copy.instructions.start}
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

function QuestionStep({
  copy,
  question,
  index,
  total,
  selected,
  isBangla,
  onSelect,
  onBack,
  onNext,
}: {
  copy: AssessmentCopy;
  question: AssessmentQuestion;
  index: number;
  total: number;
  selected: string | undefined;
  isBangla: boolean;
  onSelect: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const isLast = index === total - 1;
  const progressLabel = formatTemplate(copy.progress, {
    current: index + 1,
    total,
  });

  return (
    <form
      className="flex flex-col gap-6 p-5 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      <div>
        <p className="text-sm font-medium text-text-secondary">
          {progressLabel}
        </p>
        <ProgressBar
          className="mt-3"
          value={index + (selected ? 1 : 0)}
          max={total}
          label={copy.title}
          showValue={false}
        />
      </div>

      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend
          className={cn(
            "text-lg font-semibold text-balance text-foreground",
            isBangla && "leading-[1.55]",
          )}
        >
          {question.prompt}
        </legend>
        <RadioGroup
          value={selected}
          onValueChange={onSelect}
          className="mt-4 gap-2"
          aria-label={question.prompt}
        >
          {question.options.map((option) => {
            const inputId = `${question.id}-${option.key}`;
            const checked = selected === option.key;

            return (
              <label
                key={option.key}
                htmlFor={inputId}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-card p-4 ring-1 transition-colors duration-200 ease-standard",
                  checked
                    ? "bg-light-green ring-primary"
                    : "bg-background ring-border hover:bg-light-green/60",
                )}
              >
                <RadioGroupItem
                  id={inputId}
                  value={option.key}
                  className="mt-1"
                />
                <span
                  className={cn(
                    "text-sm text-foreground",
                    isBangla && "leading-[1.75]",
                  )}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </RadioGroup>
      </fieldset>

      <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          disabled={index === 0}
          onClick={onBack}
          className="h-11 rounded-btn px-5 text-button"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {copy.back}
        </Button>
        <Button
          type="submit"
          disabled={!selected}
          className="h-11 rounded-btn px-5 text-button text-primary-foreground"
        >
          {isLast ? copy.submit : copy.next}
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </form>
  );
}

function Results({
  copy,
  questions,
  answers,
  correct,
  total,
  passed,
  showReview,
  hasCertificate,
  alreadyPassed,
  courseHref,
  certificateHref,
  isBangla,
  onRetry,
  onViewCertificate,
}: {
  copy: AssessmentCopy;
  questions: AssessmentQuestion[];
  answers: Record<string, string>;
  correct: number;
  total: number;
  passed: boolean;
  showReview: boolean;
  hasCertificate: boolean;
  alreadyPassed: boolean;
  courseHref: string;
  certificateHref?: string;
  isBangla: boolean;
  onRetry: () => void;
  onViewCertificate: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 p-5 sm:p-8">
      {passed ? (
        <div className="rounded-card bg-light-green p-5 ring-1 ring-primary/15 sm:p-6">
          <Badge variant="success" className="h-6 px-2.5">
            {copy.results.passedBadge}
          </Badge>
          <h2
            className={cn(
              "mt-3 text-2xl font-semibold text-balance text-foreground",
              isBangla && "leading-tight",
            )}
          >
            {copy.results.completedTitle}
          </h2>
          {hasCertificate ? (
            <p className="mt-2 text-sm font-semibold text-primary">
              {copy.results.certificateAvailable}
            </p>
          ) : (
            <p
              className={cn(
                "mt-2 text-sm text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {copy.results.noCertificate}
            </p>
          )}
          <p
            className={cn(
              "mt-3 max-w-2xl text-sm text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            {copy.results.passBody}
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {hasCertificate && certificateHref ? (
              <Button
                asChild
                className="h-11 rounded-btn px-5 text-button text-primary-foreground"
              >
                <Link href={certificateHref}>
                  <Award className="size-4" aria-hidden />
                  {copy.results.viewCertificate}
                </Link>
              </Button>
            ) : hasCertificate ? (
              <Button
                type="button"
                className="h-11 rounded-btn px-5 text-button text-primary-foreground"
                onClick={onViewCertificate}
              >
                <Award className="size-4" aria-hidden />
                {copy.results.viewCertificate}
              </Button>
            ) : null}
            <Button
              asChild
              variant={hasCertificate ? "outline" : "default"}
              className={cn(
                "h-11 rounded-btn px-5 text-button",
                !hasCertificate && "text-primary-foreground",
              )}
            >
              <Link href={courseHref}>{copy.results.backToCourse}</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-card bg-background p-5 ring-1 ring-border sm:p-6">
          <Badge variant="warning" className="h-6 px-2.5">
            {copy.results.failedBadge}
          </Badge>
          <h2
            className={cn(
              "mt-3 text-xl font-semibold text-balance text-foreground",
              isBangla && "leading-tight",
            )}
          >
            {copy.results.failTitle}
          </h2>
          <p
            className={cn(
              "mt-3 max-w-2xl text-sm text-text-secondary",
              isBangla && "leading-[1.75]",
            )}
          >
            {copy.results.failBody}
          </p>
        </div>
      )}

      {!alreadyPassed ? (
        <div>
          <p className="text-sm font-semibold text-foreground">
            {copy.results.title}
          </p>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-btn bg-background p-4 ring-1 ring-border">
              <dt className="text-xs text-text-secondary">
                {copy.results.score}
              </dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">
                {formatTemplate(copy.results.scoreValue, { correct, total })}
              </dd>
            </div>
            <div className="rounded-btn bg-background p-4 ring-1 ring-border">
              <dt className="text-xs text-text-secondary">
                {formatTemplate(copy.results.passMark, {
                  pass: ASSESSMENT_PASS_COUNT,
                })}
              </dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">
                {passed ? copy.results.passedBadge : copy.results.failedBadge}
              </dd>
            </div>
          </dl>
        </div>
      ) : null}

      {showReview ? (
        <div>
          <p className="text-sm font-semibold text-foreground">
            {copy.results.reviewTitle}
          </p>
          <ol className="mt-3 m-0 flex list-none flex-col gap-3 p-0">
            {questions.map((question, questionIndex) => {
              const chosen = answers[question.id];
              const isCorrect = chosen === question.answer;
              const chosenLabel =
                question.options.find((option) => option.key === chosen)
                  ?.label ?? chosen;
              const correctLabel =
                question.options.find(
                  (option) => option.key === question.answer,
                )?.label ?? question.answer;

              return (
                <li
                  key={question.id}
                  className="rounded-card bg-background p-4 ring-1 ring-border"
                >
                  <p
                    className={cn(
                      "text-sm font-medium text-foreground",
                      isBangla && "leading-[1.75]",
                    )}
                  >
                    {questionIndex + 1}. {question.prompt}
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-sm",
                      isCorrect ? "text-success" : "text-warning",
                    )}
                  >
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="size-4" aria-hidden />
                        {copy.results.yourAnswer}: {chosenLabel}
                      </span>
                    ) : (
                      <>
                        {copy.results.yourAnswer}: {chosenLabel}
                        <span className="mt-1 block text-foreground">
                          {copy.results.correctAnswer}: {correctLabel}
                        </span>
                      </>
                    )}
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-sm text-text-secondary",
                      isBangla && "leading-[1.75]",
                    )}
                  >
                    {question.why}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}

      {!passed ? (
        <div>
          <Button
            type="button"
            className="h-11 rounded-btn px-5 text-button text-primary-foreground"
            onClick={onRetry}
          >
            <RotateCcw className="size-4" aria-hidden />
            {copy.results.retry}
          </Button>
        </div>
      ) : null}

      <p
        className={cn(
          "flex gap-2 text-base text-text-secondary",
          isBangla && "leading-[1.75]",
        )}
      >
        <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <span>{copy.results.sampleNote}</span>
      </p>
    </div>
  );
}

export { CourseAssessment };
export type { CourseAssessmentProps };
