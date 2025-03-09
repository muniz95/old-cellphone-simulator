import useTimer from '@/features/clock/hooks/use-timer';
import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.useFakeTimers();

describe('useTimer', () => {
  it('should update the date every second', () => {
    const { result } = renderHook(() => useTimer());

    const initialDate = result.current;
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).not.toBe(initialDate);
  });
});
