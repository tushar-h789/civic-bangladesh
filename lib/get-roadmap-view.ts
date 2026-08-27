import {
  ROADMAP_ACCESS_TIER_KEYS,
  ROADMAP_BRANCH_CATEGORY,
  ROADMAP_BRANCH_CHILDREN,
  ROADMAP_BRANCH_GRID,
  ROADMAP_BRANCH_HREF,
  ROADMAP_BRANCH_KEYS,
  ROADMAP_CHILD_EXTERNAL,
  ROADMAP_CHILD_HREF,
  ROADMAP_CIVIC_EXAMPLE_KEYS,
  ROADMAP_COURSE_TYPE_KEYS,
  ROADMAP_FREE_ITEM_KEYS,
  ROADMAP_IMPACT_KEYS,
  ROADMAP_INSTITUTION_KEYS,
  ROADMAP_LEGEND_KEYS,
  ROADMAP_PREMIUM_ITEM_KEYS,
  ROADMAP_SERVICE_EXAMPLE_KEYS,
  ROADMAP_SERVICE_FLOW_KEYS,
  ROADMAP_VISITOR_JOURNEY_KEYS,
  ROADMAP_WORKS_KEYS,
  type RoadmapBranchKey,
} from "@/data/roadmap";
import type { Dictionary } from "@/locales";

export function getRoadmapLegend(t: Dictionary) {
  return ROADMAP_LEGEND_KEYS.map((key) => ({
    key,
    label: t.roadmap.legend[key],
  }));
}

export function getRoadmapVisitorJourney(t: Dictionary) {
  return ROADMAP_VISITOR_JOURNEY_KEYS.map((key) => ({
    key,
    label: t.roadmap.visitorJourney[key],
  }));
}

export function getRoadmapBranches(t: Dictionary) {
  return ROADMAP_BRANCH_KEYS.map((key) => ({
    key,
    category: ROADMAP_BRANCH_CATEGORY[key],
    href: ROADMAP_BRANCH_HREF[key],
    grid: ROADMAP_BRANCH_GRID[key],
    title: t.roadmap.map.branches[key].title,
    description: t.roadmap.map.branches[key].description,
    cta: t.roadmap.map.branches[key].cta,
    secondary: key === "adminAnalytics",
    children: ROADMAP_BRANCH_CHILDREN[key].map((childKey) => ({
      key: childKey,
      label: t.roadmap.map.children[childKey as keyof typeof t.roadmap.map.children],
      href: ROADMAP_CHILD_HREF[childKey] ?? "#",
      external: ROADMAP_CHILD_EXTERNAL.has(childKey),
    })),
  }));
}

export function getRoadmapWorksSteps(t: Dictionary) {
  return ROADMAP_WORKS_KEYS.map((key, index) => ({
    key,
    step: index + 1,
    title: t.roadmap.works[key].title,
    body: t.roadmap.works[key].body,
  }));
}

export function getRoadmapServiceFlow(t: Dictionary) {
  return ROADMAP_SERVICE_FLOW_KEYS.map((key) => ({
    key,
    label: t.roadmap.serviceFlow[key],
  }));
}

export function getRoadmapCourseTypes(t: Dictionary) {
  return ROADMAP_COURSE_TYPE_KEYS.map((key) => ({
    key,
    title: t.roadmap.courseTypes[key].title,
    purpose: t.roadmap.courseTypes[key].purpose,
    cta: t.roadmap.courseTypes[key].cta,
    examples:
      key === "civic"
        ? ROADMAP_CIVIC_EXAMPLE_KEYS.map((exampleKey) => ({
            key: exampleKey,
            label:
              t.roadmap.courseTypes.civicExamples[
                exampleKey as keyof typeof t.roadmap.courseTypes.civicExamples
              ],
          }))
        : ROADMAP_SERVICE_EXAMPLE_KEYS.map((exampleKey) => ({
            key: exampleKey,
            label:
              t.roadmap.courseTypes.serviceExamples[
                exampleKey as keyof typeof t.roadmap.courseTypes.serviceExamples
              ],
          })),
  }));
}

export function getRoadmapAccessTiers(t: Dictionary) {
  return ROADMAP_ACCESS_TIER_KEYS.map((tier) => ({
    tier,
    title: t.roadmap.access[tier],
    items:
      tier === "free"
        ? ROADMAP_FREE_ITEM_KEYS.map((key) => ({
            key,
            label: t.roadmap.access.freeItems[key],
          }))
        : ROADMAP_PREMIUM_ITEM_KEYS.map((key) => ({
            key,
            label: t.roadmap.access.premiumItems[key],
          })),
  }));
}

export function getRoadmapInstitutions(t: Dictionary) {
  return ROADMAP_INSTITUTION_KEYS.map((key) => ({
    key,
    title: t.roadmap.institutions[key].title,
    body: t.roadmap.institutions[key].body,
  }));
}

export function getRoadmapImpactSteps(t: Dictionary) {
  return ROADMAP_IMPACT_KEYS.map((key) => ({
    key,
    label: t.roadmap.impact[key],
  }));
}

export type RoadmapBranchView = ReturnType<typeof getRoadmapBranches>[number];

export function isRoadmapBranchKey(value: string): value is RoadmapBranchKey {
  return (ROADMAP_BRANCH_KEYS as readonly string[]).includes(value);
}
