"use client";

import { useCallback, useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  decreaseFontSize as decreaseFontSizeAction,
  hydrate,
  increaseFontSize as increaseFontSizeAction,
  resetAccessibility as resetAccessibilityAction,
  resetFontSize as resetFontSizeAction,
  toggleHighContrast as toggleHighContrastAction,
  toggleHighlightHeadings as toggleHighlightHeadingsAction,
  toggleHighlightLinks as toggleHighlightLinksAction,
  toggleInvertColors as toggleInvertColorsAction,
  toggleLargeCursor as toggleLargeCursorAction,
  toggleMonochrome as toggleMonochromeAction,
  toggleReduceMotion as toggleReduceMotionAction,
  type AccessibilityState,
} from "@/redux/slices/accessibility-slice";

const STORAGE_KEY = "civic-bangladesh:accessibility";

type PersistedAccessibilityState = Omit<AccessibilityState, "hydrated">;

function readPersistedState(): Partial<PersistedAccessibilityState> | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<PersistedAccessibilityState>) : null;
  } catch {
    // Storage may be unavailable (private browsing, disabled cookies, etc).
    return null;
  }
}

function persistState(state: AccessibilityState) {
  try {
    const persisted: PersistedAccessibilityState = {
      fontScale: state.fontScale,
      highContrast: state.highContrast,
      monochrome: state.monochrome,
      invertColors: state.invertColors,
      largeCursor: state.largeCursor,
      highlightLinks: state.highlightLinks,
      highlightHeadings: state.highlightHeadings,
      reduceMotion: state.reduceMotion,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  } catch {
    // Accessibility features still work for the session even if they
    // can't be saved (quota exceeded, private browsing, etc).
  }
}

function applyDomEffects(state: AccessibilityState) {
  const root = document.documentElement;

  root.style.setProperty("--a11y-font-scale", String(state.fontScale / 100));

  root.classList.toggle("a11y-high-contrast", state.highContrast);
  root.classList.toggle("a11y-monochrome", state.monochrome);
  root.classList.toggle("a11y-invert", state.invertColors);
  root.classList.toggle("a11y-large-cursor", state.largeCursor);
  root.classList.toggle("a11y-highlight-links", state.highlightLinks);
  root.classList.toggle("a11y-highlight-headings", state.highlightHeadings);
  root.classList.toggle("a11y-reduce-motion", state.reduceMotion);
}

/**
 * Central hook for the Civic Bangladesh accessibility system. Owns
 * hydration (persisted preferences + prefers-reduced-motion), applying
 * the resulting state to the DOM, and persisting future changes.
 * Safe to use from multiple components — hydration only runs once.
 */
function useAccessibility() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.accessibility);
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (hasHydrated.current) return;
    hasHydrated.current = true;

    const persisted = readPersistedState();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    dispatch(
      hydrate({
        reduceMotion: prefersReducedMotion,
        ...persisted,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (!state.hydrated) return;
    applyDomEffects(state);
    persistState(state);
  }, [state]);

  const increaseFontSize = useCallback(() => dispatch(increaseFontSizeAction()), [dispatch]);
  const decreaseFontSize = useCallback(() => dispatch(decreaseFontSizeAction()), [dispatch]);
  const resetFontSize = useCallback(() => dispatch(resetFontSizeAction()), [dispatch]);
  const toggleHighContrast = useCallback(
    () => dispatch(toggleHighContrastAction()),
    [dispatch]
  );
  const toggleMonochrome = useCallback(() => dispatch(toggleMonochromeAction()), [dispatch]);
  const toggleInvertColors = useCallback(
    () => dispatch(toggleInvertColorsAction()),
    [dispatch]
  );
  const toggleLargeCursor = useCallback(() => dispatch(toggleLargeCursorAction()), [dispatch]);
  const toggleHighlightLinks = useCallback(
    () => dispatch(toggleHighlightLinksAction()),
    [dispatch]
  );
  const toggleHighlightHeadings = useCallback(
    () => dispatch(toggleHighlightHeadingsAction()),
    [dispatch]
  );
  const toggleReduceMotion = useCallback(
    () => dispatch(toggleReduceMotionAction()),
    [dispatch]
  );
  const resetAccessibility = useCallback(
    () => dispatch(resetAccessibilityAction()),
    [dispatch]
  );

  return {
    state,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
    toggleMonochrome,
    toggleInvertColors,
    toggleLargeCursor,
    toggleHighlightLinks,
    toggleHighlightHeadings,
    toggleReduceMotion,
    resetAccessibility,
  };
}

export { useAccessibility };
