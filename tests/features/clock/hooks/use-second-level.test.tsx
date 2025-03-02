import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import useSecondLevel from '../../../../src/features/clock/hooks/use-second-level';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../../../../src/redux/reducers';

const store = configureStore({ reducer });

describe('useSecondLevel', () => {
  it('should dispatch setSecondLevel action', () => {
    renderHook(() => useSecondLevel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(store.getState().secondLevel).toBe(1);
  });
});
