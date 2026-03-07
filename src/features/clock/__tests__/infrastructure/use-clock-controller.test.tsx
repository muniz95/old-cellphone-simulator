import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { resetUiStore, useUiStore } from '@/app/state/ui-store';
import { useClockController } from '@/features/clock/infrastructure/controllers/use-clock-controller';

describe('useClockController', () => {
  beforeEach(() => {
    resetUiStore();
  });

  it('sets the second level to first position', () => {
    renderHook(() => useClockController());

    expect(useUiStore.getState().secondLevel).toBe(1);
  });

  it('returns a formatted time label', () => {
    const { result } = renderHook(() => useClockController());

    expect(typeof result.current.timeLabel).toBe('string');
    expect(result.current.timeLabel.length).toBeGreaterThan(0);
  });
});
