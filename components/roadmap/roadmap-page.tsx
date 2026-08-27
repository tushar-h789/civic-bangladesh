"use client";

import * as React from "react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  ChevronDown,
  GraduationCap,
  HeartHandshake,
  Landmark,
  LayoutDashboard,
  ListChecks,
  Megaphone,
  PlayCircle,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { OFFICIAL_GOVERNMENT_PORTAL_HREF, serviceHref } from "@/data/government-services";
import { coursesCatalogHref } from "@/data/course-catalog";
import type { Dictionary } from "@/locales";
import {
  ROADMAP_EXAMPLE_SERVICE_SLUG,
  type RoadmapBranchKey,
  type RoadmapLegendKey,
} from "@/data/roadmap";
import { useTranslation } from "@/hooks/use-translation";
import {
  getRoadmapAccessTiers,
  getRoadmapBranches,
  getRoadmapCourseTypes,
  getRoadmapImpactSteps,
  getRoadmapInstitutions,
  getRoadmapLegend,
  getRoadmapServiceFlow,
  getRoadmapVisitorJourney,
  getRoadmapWorksSteps,
  type RoadmapBranchView,
} from "@/lib/get-roadmap-view";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/home/intro-environment.png";

const BRANCH_ICONS: Record<
  RoadmapBranchKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  civicLearning: HeartHandshake,
  governmentServices: Landmark,
  courses: GraduationCap,
  challenges: ListChecks,
  campaigns: Megaphone,
  storiesVideos: PlayCircle,
  community: Users,
  myJourney: LayoutDashboard,
  schoolsOrganizations: Building2,
  adminAnalytics: BarChart3,
};

const LEGEND_DOT: Record<RoadmapLegendKey, string> = {
  learn: "bg-primary",
  services: "bg-secondary",
  courses: "bg-primary/70 ring-2 ring-primary/30",
  participate: "bg-success",
  community: "bg-secondary/80",
  personalProgress: "bg-surface ring-2 ring-primary",
};

function RoadmapPage() {
  const { t, locale } = useTranslation();
  const isBangla = locale === "bn";
  const copy = t.roadmap;
  const legend = getRoadmapLegend(t);
  const visitorJourney = getRoadmapVisitorJourney(t);
  const branches = getRoadmapBranches(t);
  const worksSteps = getRoadmapWorksSteps(t);
  const serviceFlow = getRoadmapServiceFlow(t);
  const courseTypes = getRoadmapCourseTypes(t);
  const accessTiers = getRoadmapAccessTiers(t);
  const institutions = getRoadmapInstitutions(t);
  const impactSteps = getRoadmapImpactSteps(t);

  return (
    <div className={cn(isBangla && "font-bengali")}>
      <RoadmapHero copy={copy} isBangla={isBangla} homeLabel={t.nav.links.home} />

      <div className="relative bg-background">
        <RoadmapBackground />

        <div className="relative py-6 md:py-7 lg:py-8">
          <Container className="flex flex-col gap-3 sm:gap-4">
            <RoadmapVisitorStrip
              label={copy.visitorJourney.label}
              items={visitorJourney}
              isBangla={isBangla}
            />

            <RoadmapLegendSection
              title={copy.legend.title}
              description={copy.legend.description}
              items={legend}
              isBangla={isBangla}
            />

            <RoadmapEcosystemSection
              copy={copy.map}
              branches={branches}
              isBangla={isBangla}
            />

            <RoadmapWorksSection
              title={copy.works.title}
              description={copy.works.description}
              steps={worksSteps}
              isBangla={isBangla}
            />

            <RoadmapServiceFlowSection
              copy={copy.serviceFlow}
              steps={serviceFlow}
              isBangla={isBangla}
            />

            <RoadmapCourseTypesSection
              title={copy.courseTypes.title}
              description={copy.courseTypes.description}
              items={courseTypes}
              isBangla={isBangla}
            />

            <RoadmapAccessSection
              title={copy.access.title}
              description={copy.access.description}
              tiers={accessTiers}
              isBangla={isBangla}
            />

            <RoadmapInstitutionsSection
              copy={copy.institutions}
              items={institutions}
              isBangla={isBangla}
            />

            <RoadmapImpactSection
              title={copy.impact.title}
              description={copy.impact.description}
              steps={impactSteps}
              isBangla={isBangla}
            />
          </Container>
        </div>
      </div>
    </div>
  );
}

function RoadmapHero({
  copy,
  isBangla,
  homeLabel,
}: {
  copy: Dictionary["roadmap"];
  isBangla: boolean;
  homeLabel: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-text">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_center]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-text/82 via-text/52 to-text/20 lg:from-text/78 lg:via-text/42 lg:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-text/72 via-transparent to-text/25"
      />

      <Container className="relative flex min-h-[min(72svh,640px)] flex-col justify-center gap-4 pt-6 pb-8 sm:pt-7 sm:pb-9 lg:pt-8">
        <Breadcrumb
          tone="onPrimary"
          className="text-sm sm:text-base"
          items={[
            { label: homeLabel, href: ROUTES.home },
            { label: copy.hero.eyebrow },
          ]}
        />

        <div className="flex max-w-3xl flex-col gap-3 rounded-2xl bg-text/50 p-4 ring-1 ring-white/15 backdrop-blur-md sm:gap-3.5 sm:p-5">
          <p className="text-sm font-semibold tracking-wide text-white/80 uppercase">
            {copy.hero.eyebrow}
          </p>
          <h1
            className={cn(
              "text-[1.75rem] leading-[1.28] font-semibold text-balance text-white sm:text-[2.125rem] sm:leading-snug lg:text-[2.75rem] lg:leading-[1.18]",
              isBangla && "leading-[1.32] sm:leading-[1.3]",
            )}
          >
            {copy.hero.titleAlt}
          </h1>
          <p
            className={cn(
              "text-base text-white/85 sm:text-body",
              isBangla && "leading-[1.8]",
            )}
          >
            {copy.hero.descriptionAlt}
          </p>
          <p
            className={cn(
              "text-sm text-white/70",
              isBangla && "leading-[1.75]",
            )}
          >
            {copy.hero.sampleNote}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-btn bg-white/12 px-2.5 py-1 text-sm font-medium text-white ring-1 ring-white/15">
              <BookOpen className="size-3.5" aria-hidden />
              {copy.hero.platformAreas}
            </span>
          </div>
        </div>

        <a
          href="#roadmap-ecosystem"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/75 outline-none transition-colors hover:text-white focus-visible:ring-3 focus-visible:ring-white/50"
        >
          {copy.hero.scrollHint}
          <ArrowDown className="size-4 animate-bounce" aria-hidden />
        </a>
      </Container>
      <span className="sr-only">{copy.hero.heroImageAlt}</span>
    </section>
  );
}

function RoadmapBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(11,107,79,0.06),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(20,125,100,0.05),transparent_40%)]" />
      <svg
        className="absolute inset-0 size-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="roadmap-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#roadmap-grid)" className="text-primary" />
      </svg>
    </div>
  );
}

function RoadmapBodySection({
  id,
  headingId,
  title,
  description,
  isBangla,
  children,
}: {
  id?: string;
  headingId: string;
  title: string;
  description: string;
  isBangla: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-28">
      <article className="rounded-card bg-surface p-4 shadow-card ring-1 ring-border sm:p-5">
        <h2
          id={headingId}
          className={cn(
            "text-xl font-semibold text-foreground sm:text-2xl",
            isBangla && "leading-tight",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-1.5 max-w-3xl text-body text-text-secondary",
              isBangla && "leading-[1.8]",
            )}
          >
            {description}
          </p>
        ) : null}
        <div className="mt-4">{children}</div>
      </article>
    </section>
  );
}

function RoadmapVisitorStrip({
  label,
  items,
  isBangla,
}: {
  label: string;
  items: { key: string; label: string }[];
  isBangla: boolean;
}) {
  return (
    <RoadmapBodySection
      headingId="roadmap-visitor-heading"
      title={label}
      description=""
      isBangla={isBangla}
    >
      <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
        {items.map((item, index) => (
          <li key={item.key} className="flex items-center gap-1.5">
            <span className="inline-flex h-8 items-center rounded-btn bg-background px-3 text-sm font-medium text-foreground ring-1 ring-border">
              {item.label}
            </span>
            {index < items.length - 1 ? (
              <ArrowRight className="size-3.5 shrink-0 text-text-secondary" aria-hidden />
            ) : null}
          </li>
        ))}
      </ol>
    </RoadmapBodySection>
  );
}

function RoadmapLegendSection({
  title,
  description,
  items,
  isBangla,
}: {
  title: string;
  description: string;
  items: { key: RoadmapLegendKey; label: string }[];
  isBangla: boolean;
}) {
  return (
    <RoadmapBodySection
      headingId="roadmap-legend-heading"
      title={title}
      description={description}
      isBangla={isBangla}
    >
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {items.map((item) => (
          <li key={item.key}>
            <span className="inline-flex items-center gap-2 rounded-btn bg-background px-3 py-1.5 text-sm font-medium text-foreground ring-1 ring-border">
              <span
                className={cn("size-2.5 shrink-0 rounded-full", LEGEND_DOT[item.key])}
                aria-hidden
              />
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </RoadmapBodySection>
  );
}

function RoadmapEcosystemSection({
  copy,
  branches,
  isBangla,
}: {
  copy: Dictionary["roadmap"]["map"];
  branches: RoadmapBranchView[];
  isBangla: boolean;
}) {
  const [active, setActive] = React.useState<RoadmapBranchKey | null>(null);
  const [hovered, setHovered] = React.useState<RoadmapBranchKey | null>(null);

  const focusBranch = active ?? hovered;
  const activeBranch = branches.find((branch) => branch.key === active);

  return (
    <RoadmapBodySection
      id="roadmap-ecosystem"
      headingId="roadmap-ecosystem-heading"
      title={copy.title}
      description={copy.description}
      isBangla={isBangla}
    >
      <div className="hidden lg:block">
        <div className="relative mx-auto max-w-5xl">
          <svg
            viewBox="0 0 960 640"
            className="pointer-events-none absolute inset-0 size-full"
            aria-hidden="true"
          >
            {branches.map((branch) => {
              const x = (branch.grid.col - 0.5) * 320;
              const y = (branch.grid.row - 0.5) * 160;
              const highlighted = focusBranch === branch.key;
              const visible = focusBranch == null || highlighted;

              return (
                <line
                  key={branch.key}
                  x1="480"
                  y1="320"
                  x2={String(x)}
                  y2={String(y)}
                  className={cn(
                    "transition-all duration-300 ease-standard motion-reduce:transition-none",
                    highlighted ? "stroke-primary" : visible ? "stroke-border" : "stroke-border/35",
                  )}
                  strokeWidth={highlighted ? 2 : 1}
                />
              );
            })}
          </svg>

          <div className="relative grid grid-cols-3 grid-rows-4 gap-4">
            {branches.map((branch) => (
              <RoadmapBranchCard
                key={branch.key}
                branch={branch}
                copy={copy}
                isBangla={isBangla}
                expanded={active === branch.key}
                dimmed={focusBranch != null && focusBranch !== branch.key}
                highlighted={focusBranch === branch.key}
                onToggle={() =>
                  setActive((current) =>
                    current === branch.key ? null : branch.key,
                  )
                }
                onHover={(value) => setHovered(value)}
                className={cn(
                  branch.grid.col === 1 && "col-start-1",
                  branch.grid.col === 2 && "col-start-2",
                  branch.grid.col === 3 && "col-start-3",
                  branch.grid.row === 1 && "row-start-1",
                  branch.grid.row === 2 && "row-start-2",
                  branch.grid.row === 3 && "row-start-3",
                  branch.grid.row === 4 && "row-start-4",
                  branch.secondary && "opacity-90",
                )}
              />
            ))}

            <div className="pointer-events-none col-start-2 row-start-2 flex flex-col items-center justify-center rounded-card bg-surface px-4 py-5 text-center shadow-card ring-2 ring-primary/20">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                {copy.centerTitle}
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {copy.centerSubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 lg:hidden">
        {branches.map((branch) => (
          <div key={branch.key}>
            <RoadmapBranchCard
              branch={branch}
              copy={copy}
              isBangla={isBangla}
              expanded={active === branch.key}
              dimmed={false}
              highlighted={active === branch.key}
              onToggle={() =>
                setActive((current) =>
                  current === branch.key ? null : branch.key,
                )
              }
              onHover={() => undefined}
              mobile
            />
            {active === branch.key ? (
              <RoadmapBranchDetails
                branch={branch}
                copy={copy}
                isBangla={isBangla}
                onClose={() => setActive(null)}
                className="mt-2"
              />
            ) : null}
          </div>
        ))}
      </div>

      {activeBranch ? (
        <RoadmapBranchDetails
          branch={activeBranch}
          copy={copy}
          isBangla={isBangla}
          onClose={() => setActive(null)}
          className="hidden lg:block"
        />
      ) : null}
    </RoadmapBodySection>
  );
}

function RoadmapBranchCard({
  branch,
  copy,
  isBangla,
  expanded,
  dimmed,
  highlighted,
  onToggle,
  onHover,
  className,
  mobile = false,
}: {
  branch: RoadmapBranchView;
  copy: Dictionary["roadmap"]["map"];
  isBangla: boolean;
  expanded: boolean;
  dimmed: boolean;
  highlighted: boolean;
  onToggle: () => void;
  onHover: (key: RoadmapBranchKey | null) => void;
  className?: string;
  mobile?: boolean;
}) {
  const Icon = BRANCH_ICONS[branch.key];

  return (
    <article
      className={cn(
        "relative z-20 transition-all duration-300 ease-standard motion-reduce:transition-none",
        dimmed && "opacity-55",
        highlighted && "scale-[1.02]",
        className,
        mobile && branch.secondary && "opacity-90",
      )}
      onMouseEnter={() => onHover(branch.key)}
      onMouseLeave={() => onHover(null)}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={`roadmap-branch-${branch.key}`}
        onClick={onToggle}
        className={cn(
          "flex w-full cursor-pointer flex-col gap-2 rounded-card bg-background p-3.5 text-left ring-1 outline-none transition-shadow duration-200 ease-standard focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-4",
          highlighted ? "shadow-card-hover ring-primary/35" : "ring-border shadow-card",
        )}
      >
        <span className="flex items-start gap-3">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-btn",
              branch.secondary ? "bg-background ring-1 ring-border" : "bg-light-green text-primary",
            )}
          >
            <Icon className="size-4" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span
                className={cn("size-2 shrink-0 rounded-full", LEGEND_DOT[branch.category])}
                aria-hidden
              />
              <span className="text-base font-semibold text-foreground">{branch.title}</span>
            </span>
            <span
              className={cn(
                "mt-1 block text-sm text-text-secondary",
                isBangla && "leading-[1.75]",
              )}
            >
              {branch.description}
            </span>
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-text-secondary transition-transform duration-200",
              expanded && "rotate-180",
            )}
            aria-hidden
          />
        </span>
        <span className="text-xs font-medium text-primary">
          {expanded ? copy.collapse : copy.expand}
        </span>
      </button>
    </article>
  );
}

function RoadmapBranchDetails({
  branch,
  copy,
  isBangla,
  onClose,
  className,
}: {
  branch: RoadmapBranchView;
  copy: Dictionary["roadmap"]["map"];
  isBangla: boolean;
  onClose: () => void;
  className?: string;
}) {
  return (
    <div
      id={`roadmap-branch-${branch.key}`}
      className={cn(
        "mt-4 rounded-card bg-background p-4 ring-1 ring-primary/20 sm:p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{branch.title}</h3>
          {branch.secondary ? (
            <p className="mt-1 text-sm text-text-secondary">{copy.adminNote}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-text-secondary outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {copy.collapse}
        </button>
      </div>
      <p className={cn("mt-2 text-sm text-text-secondary", isBangla && "leading-[1.75]")}>
        {branch.description}
      </p>
      <p className="mt-3 text-sm font-semibold text-foreground">{copy.childPages}</p>
      <ul className="mt-2 flex list-none flex-wrap gap-1.5 p-0">
        {branch.children.map((child) => (
          <li key={child.key}>
            {child.external ? (
              <a
                href={child.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center rounded-btn bg-light-green/60 px-2.5 text-sm font-medium text-primary outline-none hover:bg-light-green focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {child.label}
              </a>
            ) : (
              <Link
                href={child.href}
                className="inline-flex h-8 items-center rounded-btn bg-light-green/60 px-2.5 text-sm font-medium text-primary outline-none hover:bg-light-green focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {child.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Button asChild>
          <Link href={branch.href}>
            {branch.cta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function RoadmapWorksSection({
  title,
  description,
  steps,
  isBangla,
}: {
  title: string;
  description: string;
  steps: { key: string; step: number; title: string; body: string }[];
  isBangla: boolean;
}) {
  return (
    <RoadmapBodySection
      headingId="roadmap-works-heading"
      title={title}
      description={description}
      isBangla={isBangla}
    >
      <ol className="m-0 grid list-none gap-3 p-0 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.key} className="relative">
            <article className="flex h-full flex-col gap-2 rounded-card bg-background p-4 ring-1 ring-border">
              <p className="text-sm font-semibold text-primary">
                {String(step.step).padStart(2, "0")}
              </p>
              <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
              <p className={cn("text-sm text-text-secondary", isBangla && "leading-[1.75]")}>
                {step.body}
              </p>
            </article>
            {index < steps.length - 1 ? (
              <ArrowRight
                className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 text-border lg:block"
                aria-hidden
              />
            ) : null}
          </li>
        ))}
      </ol>
    </RoadmapBodySection>
  );
}

function RoadmapServiceFlowSection({
  copy,
  steps,
  isBangla,
}: {
  copy: Dictionary["roadmap"]["serviceFlow"];
  steps: { key: string; label: string }[];
  isBangla: boolean;
}) {
  const exampleHref = serviceHref(ROADMAP_EXAMPLE_SERVICE_SLUG);

  return (
    <RoadmapBodySection
      headingId="roadmap-service-flow-heading"
      title={copy.title}
      description={copy.description}
      isBangla={isBangla}
    >
      <div className="rounded-card bg-light-green/50 p-4 ring-1 ring-border sm:p-5">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          {copy.exampleLabel}
        </p>
        <p className={cn("mt-1 text-base font-semibold text-foreground", isBangla && "leading-[1.45]")}>
          {copy.exampleTitle}
        </p>
        <p className={cn("mt-1 text-sm text-text-secondary", isBangla && "leading-[1.75]")}>
          {copy.exampleNote}
        </p>
      </div>
      <ol className="mt-4 m-0 flex list-none flex-col gap-0 p-0 lg:flex-row lg:flex-wrap lg:items-stretch">
        {steps.map((step, index) => (
          <li key={step.key} className="flex flex-1 min-w-[140px] flex-col items-center lg:flex-row">
            <div className="flex w-full flex-col items-center gap-1 rounded-card bg-background px-3 py-3 text-center ring-1 ring-border">
              <span className="flex size-8 items-center justify-center rounded-full bg-light-green text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-foreground">{step.label}</p>
            </div>
            {index < steps.length - 1 ? (
              <ArrowDown className="my-1 size-4 text-border lg:hidden" aria-hidden />
            ) : null}
            {index < steps.length - 1 ? (
              <ArrowRight className="mx-1 hidden size-4 shrink-0 text-border lg:block" aria-hidden />
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild variant="outline">
          <Link href={exampleHref}>{copy.exampleLabel}</Link>
        </Button>
        <Button asChild variant="outline">
          <a href={OFFICIAL_GOVERNMENT_PORTAL_HREF} target="_blank" rel="noopener noreferrer">
            {copy.officialCta}
          </a>
        </Button>
      </div>
    </RoadmapBodySection>
  );
}

function RoadmapCourseTypesSection({
  title,
  description,
  items,
  isBangla,
}: {
  title: string;
  description: string;
  items: ReturnType<typeof getRoadmapCourseTypes>;
  isBangla: boolean;
}) {
  return (
    <RoadmapBodySection
      headingId="roadmap-course-types-heading"
      title={title}
      description={description}
      isBangla={isBangla}
    >
      <ul className="m-0 grid list-none gap-3 p-0 lg:grid-cols-2">
        {items.map((item) => (
          <li key={item.key}>
            <article className="flex h-full flex-col gap-3 rounded-card bg-background p-4 ring-1 ring-border">
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className={cn("text-sm text-text-secondary", isBangla && "leading-[1.75]")}>
                {item.purpose}
              </p>
              <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                {item.examples.map((example) => (
                  <li
                    key={example.key}
                    className="rounded-btn bg-light-green/60 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {example.label}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-auto w-fit">
                <Link href={coursesCatalogHref(item.key === "civic" ? "civic" : "servicePrep")}>
                  {item.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </article>
          </li>
        ))}
      </ul>
    </RoadmapBodySection>
  );
}

function RoadmapAccessSection({
  title,
  description,
  tiers,
  isBangla,
}: {
  title: string;
  description: string;
  tiers: ReturnType<typeof getRoadmapAccessTiers>;
  isBangla: boolean;
}) {
  return (
    <RoadmapBodySection
      headingId="roadmap-access-heading"
      title={title}
      description={description}
      isBangla={isBangla}
    >
      <div className="grid gap-3 lg:grid-cols-2">
        {tiers.map((tier) => (
          <article
            key={tier.tier}
            className={cn(
              "rounded-card p-4 ring-1 ring-border",
              tier.tier === "free" ? "bg-light-green/40" : "bg-background",
            )}
          >
            <h3 className="text-lg font-semibold text-foreground">{tier.title}</h3>
            <ul className="mt-3 m-0 flex list-none flex-col gap-2 p-0">
              {tier.items.map((item) => (
                <li key={item.key} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {item.label}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </RoadmapBodySection>
  );
}

function RoadmapInstitutionsSection({
  copy,
  items,
  isBangla,
}: {
  copy: Dictionary["roadmap"]["institutions"];
  items: ReturnType<typeof getRoadmapInstitutions>;
  isBangla: boolean;
}) {
  return (
    <RoadmapBodySection
      headingId="roadmap-institutions-heading"
      title={copy.title}
      description={copy.description}
      isBangla={isBangla}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.key}
            className="rounded-card bg-background p-4 text-center ring-1 ring-border"
          >
            <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
            <p className={cn("mt-1 text-sm text-text-secondary", isBangla && "leading-[1.75]")}>
              {item.body}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-center text-sm font-medium text-primary">{copy.hubLabel}</p>
    </RoadmapBodySection>
  );
}

function RoadmapImpactSection({
  title,
  description,
  steps,
  isBangla,
}: {
  title: string;
  description: string;
  steps: { key: string; label: string }[];
  isBangla: boolean;
}) {
  return (
    <RoadmapBodySection
      headingId="roadmap-impact-heading"
      title={title}
      description={description}
      isBangla={isBangla}
    >
      <ol className="m-0 flex list-none flex-col items-center gap-2 p-0 sm:flex-row sm:flex-wrap sm:justify-center">
        {steps.map((step, index) => (
          <li key={step.key} className="flex flex-col items-center sm:flex-row">
            <span className="inline-flex h-10 items-center rounded-btn bg-light-green px-4 text-sm font-semibold text-primary ring-1 ring-primary/15">
              {step.label}
            </span>
            {index < steps.length - 1 ? (
              <ArrowDown className="my-1 size-4 text-border sm:hidden" aria-hidden />
            ) : null}
            {index < steps.length - 1 ? (
              <ArrowRight className="mx-2 hidden size-4 text-border sm:block" aria-hidden />
            ) : null}
          </li>
        ))}
      </ol>
    </RoadmapBodySection>
  );
}

export { RoadmapPage };

