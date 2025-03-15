import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useSecondLevel from '@/features/clock/hooks/use-second-level';
import { GlobalContextProvider } from '@/context/global/provider';
import { useContext } from 'react';
import { GlobalContext } from '@/context/global/context';

describe('useSecondLevel', () => {
  it('should dispatch setSecondLevel action', () => {
    const { result } = renderHook(
      () => {
        useSecondLevel();
        return useContext(GlobalContext);
      },
      {
        wrapper: ({ children }) => (
          <GlobalContextProvider>{children}</GlobalContextProvider>
        ),
      }
    );

    expect(result.current.secondLevel).toBe(1);
  });
});
