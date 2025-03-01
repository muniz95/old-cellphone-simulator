import React from 'react';
import BatteryStatus from '../../../src/components/BatteryStatus';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { batteryLevel, isRecharging } from '../../../src/redux/reducers/battery';

function renderWithProvider(
  ui,
  {
    preloadedState = {
      isRecharging: false, batteryLevel: 90
    },
    store = configureStore({ reducer: combineReducers({ batteryLevel, isRecharging }), preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

describe('BatteryStatus', () => {
  it('renders correctly', () => {
    const { container } = renderWithProvider(<BatteryStatus />);
    expect(container).toBeTruthy();
  });
});