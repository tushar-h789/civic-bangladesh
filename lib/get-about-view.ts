import {
  ABOUT_AUDIENCE_HREF,
  ABOUT_AUDIENCE_KEYS,
  ABOUT_JOURNEY_KEYS,
  ABOUT_NOT_KEYS,
  ABOUT_PILLAR_HREF,
  ABOUT_PILLAR_KEYS,
  ABOUT_SERVICE_PATH_KEYS,
  ABOUT_START_HREF,
  ABOUT_START_KEYS,
} from "@/data/about";
import type { Dictionary } from "@/locales";

export function getAboutPillars(t: Dictionary) {
  return ABOUT_PILLAR_KEYS.map((key) => ({
    key,
    href: ABOUT_PILLAR_HREF[key],
    title: t.about.pillars[key].title,
    body: t.about.pillars[key].body,
    cta: t.about.pillars[key].cta,
    imageAlt: t.about.pillars[key].imageAlt,
  }));
}

export function getAboutJourney(t: Dictionary) {
  return ABOUT_JOURNEY_KEYS.map((key) => ({
    key,
    title: t.about.journey[key].title,
    body: t.about.journey[key].body,
  }));
}

export function getAboutServicePath(t: Dictionary) {
  return ABOUT_SERVICE_PATH_KEYS.map((key) => ({
    key,
    title: t.about.servicePath[key].title,
    body: t.about.servicePath[key].body,
  }));
}

export function getAboutAudience(t: Dictionary) {
  return ABOUT_AUDIENCE_KEYS.map((key) => ({
    key,
    href: ABOUT_AUDIENCE_HREF[key],
    title: t.about.who[key].title,
    body: t.about.who[key].body,
    cta: t.about.who[key].cta,
  }));
}

export function getAboutNotItems(t: Dictionary) {
  return ABOUT_NOT_KEYS.map((key) => ({
    key,
    title: t.about.notThis[key].title,
    body: t.about.notThis[key].body,
  }));
}

export function getAboutStartItems(t: Dictionary) {
  return ABOUT_START_KEYS.map((key) => ({
    key,
    href: ABOUT_START_HREF[key],
    title: t.about.start[key].title,
    body: t.about.start[key].body,
    cta: t.about.start[key].cta,
  }));
}
