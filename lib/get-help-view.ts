import {
  HELP_CAN_KEYS,
  HELP_CANNOT_KEYS,
  HELP_SITE_GUIDE_KEYS,
  HELP_STEP_KEYS,
  HELP_TASK_HREF,
  HELP_TASK_KEYS,
} from "@/data/help";
import type { Dictionary } from "@/locales";

export function getHelpTasks(t: Dictionary) {
  return HELP_TASK_KEYS.map((key) => ({
    key,
    href: HELP_TASK_HREF[key],
    title: t.help.tasks[key].title,
    body: t.help.tasks[key].body,
    cta: t.help.tasks[key].cta,
  }));
}

export function getHelpSteps(t: Dictionary) {
  return HELP_STEP_KEYS.map((key) => ({
    key,
    title: t.help.steps[key].title,
    body: t.help.steps[key].body,
  }));
}

export function getHelpCanItems(t: Dictionary) {
  return HELP_CAN_KEYS.map((key) => t.help.limits.can[key]);
}

export function getHelpCannotItems(t: Dictionary) {
  return HELP_CANNOT_KEYS.map((key) => t.help.limits.cannot[key]);
}

export function getHelpSiteGuides(t: Dictionary) {
  return HELP_SITE_GUIDE_KEYS.map((key) => ({
    key,
    title: t.help.site[key].title,
    body: t.help.site[key].body,
  }));
}
