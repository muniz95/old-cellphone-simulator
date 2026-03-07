import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render } from '@testing-library/react';
import ClockPage from '@/features/clock/ui/pages/clock-page';

describe('Clock', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it('renders correctly', () => {
    const { container } = render(<ClockPage />);
    expect(container).toBeTruthy();
  });

  it('displays the current time', () => {
    vi.setSystemTime(new Date('2021-01-01T12:00:00'));
    const { container } = render(<ClockPage />);
    expect(container.querySelector('#time')?.innerHTML).eq('12:00:00');
  });

  it('advances time correctly', () => {
    vi.setSystemTime(new Date('2021-01-01T10:00:00'));
    const { container } = render(<ClockPage />);
    expect(container.querySelector('#time')?.innerHTML).eq('10:00:00');
    act(() => {
      vi.advanceTimersByTime(2 * 60 * 60 * 1000);
    });
    expect(container.querySelector('#time')?.innerHTML).eq('12:00:00');
  });
});
