import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useSecondLevelController } from '@/features/clock/infrastructure/controllers/use-second-level-controller';
import { resetUiStore, useUiStore } from '@/stores/ui-store';

describe('useSecondLevel', () => {
  beforeEach(() => {
    resetUiStore();
  });

  it('should dispatch setSecondLevel action', () => {
    renderHook(() => useSecondLevelController());

    expect(useUiStore.getState().secondLevel).toBe(1);
  });
});
