import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import useSecondLevel from '@/features/clock/hooks/use-second-level';
import { resetUiStore, useUiStore } from '@/stores/ui-store';

describe('useSecondLevel', () => {
  beforeEach(() => {
    resetUiStore();
  });

  it('should dispatch setSecondLevel action', () => {
    renderHook(() => useSecondLevel());

    expect(useUiStore.getState().secondLevel).toBe(1);
  });
});
