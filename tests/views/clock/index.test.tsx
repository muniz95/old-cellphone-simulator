import React from 'react';
import Clock from '../../../src/views/Clock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithProvider } from '../../utils';
import { act } from '@testing-library/react';

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
    const { container } = renderWithProvider(<Clock />);
    expect(container).toBeTruthy();
  });

  it('displays the current time', () => {
    vi.setSystemTime(new Date('2021-01-01T12:00:00'));
    const { container } = renderWithProvider(<Clock />);
    expect(container.querySelector('#time')?.innerHTML).eq('12:00:00');
  });

  it('advances time correctly', () => {
    vi.setSystemTime(new Date('2021-01-01T10:00:00'));
    const { container } = renderWithProvider(<Clock />);
    expect(container.querySelector('#time')?.innerHTML).eq('10:00:00');
    act(() => {
      vi.advanceTimersByTime(2 * 60 * 60 * 1000);
    });
    expect(container.querySelector('#time')?.innerHTML).eq('12:00:00');
  });
});
