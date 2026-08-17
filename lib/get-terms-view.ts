import {
  TERMS_ABOUT_KEYS,
  TERMS_CONTENT_KEYS,
  TERMS_LEAVE_KEYS,
  TERMS_NOT_KEYS,
  TERMS_USE_KEYS,
} from "@/data/terms";
import type { Dictionary } from "@/locales";

export function getTermsAboutItems(t: Dictionary) {
  return TERMS_ABOUT_KEYS.map((key) => ({
    key,
    title: t.terms.about[key].title,
    body: t.terms.about[key].body,
  }));
}

export function getTermsNotItems(t: Dictionary) {
  return TERMS_NOT_KEYS.map((key) => ({
    key,
    title: t.terms.notThis[key].title,
    body: t.terms.notThis[key].body,
  }));
}

export function getTermsContentItems(t: Dictionary) {
  return TERMS_CONTENT_KEYS.map((key) => ({
    key,
    title: t.terms.content[key].title,
    body: t.terms.content[key].body,
  }));
}

export function getTermsUseItems(t: Dictionary) {
  return TERMS_USE_KEYS.map((key) => ({
    key,
    title: t.terms.yourUse[key].title,
    body: t.terms.yourUse[key].body,
  }));
}

export function getTermsLeaveItems(t: Dictionary) {
  return TERMS_LEAVE_KEYS.map((key) => ({
    key,
    title: t.terms.leaving[key].title,
    body: t.terms.leaving[key].body,
  }));
}
