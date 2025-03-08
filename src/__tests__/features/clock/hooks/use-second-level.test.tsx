import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '@/redux/reducers';
import useSecondLevel from '@/features/clock/hooks/use-second-level';

const store = configureStore({ reducer });

describe('useSecondLevel', () => {
  it('should dispatch setSecondLevel action', () => {
    renderHook(() => useSecondLevel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(store.getState().secondLevel).toBe(1);
  });
});
