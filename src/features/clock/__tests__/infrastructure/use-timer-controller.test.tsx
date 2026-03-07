import { useTimerController } from '@/features/clock/infrastructure/controllers/use-timer-controller';
import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.useFakeTimers();

describe('useTimer', () => {
  it('should update the date every second', () => {
    const { result } = renderHook(() => useTimerController());

    const initialDate = result.current;
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).not.toBe(initialDate);
  });
});
