import { configureStore } from "@reduxjs/toolkit";
import reducer from "../src/redux/reducers";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import React from "react";
import { PreloadedState } from "@reduxjs/toolkit";

interface RenderWithProviderOptions {
  preloadedState?: PreloadedState<typeof reducer>;
  store?: ReturnType<typeof configureStore>;
  [key: string]: any;
}

export const renderWithProvider = (
  ui,
  {
    preloadedState,
    store = configureStore({ reducer, preloadedState }),
    ...renderOptions
  }: RenderWithProviderOptions = {}
) => {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}