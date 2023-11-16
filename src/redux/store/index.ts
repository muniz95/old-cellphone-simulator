import reducer, { RootState } from "../reducers";
import { PreloadedState, configureStore } from "@reduxjs/toolkit";

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer,
    preloadedState
  })
}

export const store = configureStore({reducer});

export type AppStore = ReturnType<typeof setupStore>;
