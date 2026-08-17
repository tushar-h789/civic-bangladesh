import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_LOCALE, type Locale } from "@/locales/types";

export interface LocaleState {
  locale: Locale;
  /** True once the persisted/browser-detected locale has been loaded on the client. */
  hydrated: boolean;
}

export const defaultLocaleState: LocaleState = {
  locale: DEFAULT_LOCALE,
  hydrated: false,
};

const localeSlice = createSlice({
  name: "locale",
  initialState: defaultLocaleState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
    hydrateLocale(state, action: PayloadAction<Locale | undefined>) {
      if (action.payload) {
        state.locale = action.payload;
      }
      state.hydrated = true;
    },
  },
});

export const { setLocale, hydrateLocale } = localeSlice.actions;
export default localeSlice.reducer;
