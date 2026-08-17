import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const FONT_SCALE_MIN = 100;
export const FONT_SCALE_MAX = 150;
export const FONT_SCALE_STEP = 10;

export interface AccessibilityState {
  /** Percentage, relative to the default 100%. Only affects text size, not layout/spacing. */
  fontScale: number;
  highContrast: boolean;
  monochrome: boolean;
  invertColors: boolean;
  largeCursor: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  reduceMotion: boolean;
  /** True once persisted/system preferences have been loaded on the client. */
  hydrated: boolean;
}

export const defaultAccessibilityState: AccessibilityState = {
  fontScale: FONT_SCALE_MIN,
  highContrast: false,
  monochrome: false,
  invertColors: false,
  largeCursor: false,
  highlightLinks: false,
  highlightHeadings: false,
  reduceMotion: false,
  hydrated: false,
};

const accessibilitySlice = createSlice({
  name: "accessibility",
  initialState: defaultAccessibilityState,
  reducers: {
    increaseFontSize(state) {
      state.fontScale = Math.min(
        FONT_SCALE_MAX,
        state.fontScale + FONT_SCALE_STEP,
      );
    },
    decreaseFontSize(state) {
      state.fontScale = Math.max(
        FONT_SCALE_MIN,
        state.fontScale - FONT_SCALE_STEP,
      );
    },
    resetFontSize(state) {
      state.fontScale = defaultAccessibilityState.fontScale;
    },
    toggleHighContrast(state) {
      state.highContrast = !state.highContrast;
    },
    toggleMonochrome(state) {
      state.monochrome = !state.monochrome;
    },
    toggleInvertColors(state) {
      state.invertColors = !state.invertColors;
    },
    toggleLargeCursor(state) {
      state.largeCursor = !state.largeCursor;
    },
    toggleHighlightLinks(state) {
      state.highlightLinks = !state.highlightLinks;
    },
    toggleHighlightHeadings(state) {
      state.highlightHeadings = !state.highlightHeadings;
    },
    toggleReduceMotion(state) {
      state.reduceMotion = !state.reduceMotion;
    },
    // Full reset to library defaults, regardless of system preferences.
    resetAccessibility() {
      return { ...defaultAccessibilityState, hydrated: true };
    },
    // Merges persisted localStorage values and/or detected system
    // preferences (e.g. prefers-reduced-motion) on first client mount.
    hydrate(
      state,
      action: PayloadAction<Partial<Omit<AccessibilityState, "hydrated">>>,
    ) {
      return { ...state, ...action.payload, hydrated: true };
    },
  },
});

export const {
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
  hydrate,
} = accessibilitySlice.actions;

export default accessibilitySlice.reducer;
