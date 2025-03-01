export const renderWithProvider = (
  ui,
  {
    preloadedState = {
      isRecharging: false, batteryLevel: 90
    },
    store = configureStore({ reducer: reducer, preloadedState }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}