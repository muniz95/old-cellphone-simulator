import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DIMMED_BACKLIGHT_LEVEL,
  useInactivityBacklight,
} from '@/app/hooks/use-inactivity-backlight';

describe('useInactivityBacklight', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('dims backlight after inactivity timeout', () => {
    const { result } = renderHook(() => useInactivityBacklight(80, 2));

    expect(result.current).toBe(80);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current).toBe(DIMMED_BACKLIGHT_LEVEL);
  });

  it('restores backlight on touch input and restarts inactivity timer', () => {
    const { result } = renderHook(() => useInactivityBacklight(70, 2));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current).toBe(DIMMED_BACKLIGHT_LEVEL);

    act(() => {
      window.dispatchEvent(new Event('touchstart'));
    });

    expect(result.current).toBe(70);

    act(() => {
      vi.advanceTimersByTime(1999);
    });

    expect(result.current).toBe(70);

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe(DIMMED_BACKLIGHT_LEVEL);
  });

  it('keeps configured brightness when inactivity timer is disabled', () => {
    const { result } = renderHook(() => useInactivityBacklight(65, 0));

    act(() => {
      vi.advanceTimersByTime(30_000);
    });

    expect(result.current).toBe(65);
  });
});
