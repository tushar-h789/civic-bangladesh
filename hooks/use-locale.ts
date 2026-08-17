"use client";

import { useCallback, useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { hydrateLocale, setLocale as setLocaleAction } from "@/redux/slices/locale-slice";
import { isLocale, type Locale } from "@/locales/types";

const STORAGE_KEY = "civic-bangladesh:locale";

function readPersistedLocale(): Locale | undefined {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(raw) ? raw : undefined;
  } catch {
    return undefined;
  }
}

function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Locale preference still works for the session even if it can't be saved.
  }
}

/**
 * Owns locale hydration (persisted preference), keeps `<html lang>` in
 * sync, and persists future changes. Safe to call from multiple
 * components — hydration only runs once.
 */
function useLocale() {
  const dispatch = useAppDispatch();
  const { locale, hydrated } = useAppSelector((state) => state.locale);
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (hasHydrated.current) return;
    hasHydrated.current = true;
    dispatch(hydrateLocale(readPersistedLocale()));
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = locale;
    document.documentElement.classList.toggle("locale-bn", locale === "bn");
    persistLocale(locale);
  }, [locale, hydrated]);

  const setLocale = useCallback(
    (next: Locale) => dispatch(setLocaleAction(next)),
    [dispatch]
  );

  return { locale, setLocale };
}

export { useLocale };
