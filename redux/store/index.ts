import { configureStore } from "@reduxjs/toolkit";

import accessibilityReducer from "@/redux/slices/accessibility-slice";
import localeReducer from "@/redux/slices/locale-slice";

export const store = configureStore({
  reducer: {
    accessibility: accessibilityReducer,
    locale: localeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
