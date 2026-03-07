import { beforeEach, describe, expect, it, vi } from 'vitest';
import BatteryStatus from '@/shared/ui/battery-status';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';

const hookMock = vi.hoisted(() => ({
  getInterval: vi.fn(),
  getVisibility: vi.fn(),
}));

vi.mock('@/shared/ui/blink', () => ({
  default: ({
    interval,
    children,
  }: {
    interval: number;
    children: ReactNode;
  }) => (
    <div data-testid="blink" data-interval={interval}>
      {children}
    </div>
  ),
}));

vi.mock('@/shared/ui/battery-status/hooks/use-battery-status', () => ({
  useBatteryStatus: () => ({
    getInterval: hookMock.getInterval,
    getVisibility: hookMock.getVisibility,
  }),
}));

describe('BatteryStatus', () => {
  beforeEach(() => {
    hookMock.getInterval.mockImplementation(() => 0);
    hookMock.getVisibility.mockImplementation(() => true);
  });

  it('renders battery indicator container and label', () => {
    const { container } = render(<BatteryStatus />);

    expect(container).toBeTruthy();
    expect(container.textContent).toContain('B');
  });

  it('renders five blink segments (one per battery level)', () => {
    const { getAllByTestId } = render(<BatteryStatus />);

    expect(getAllByTestId('blink')).toHaveLength(5);
  });

  it('queries all indicator levels from battery hook helpers', () => {
    render(<BatteryStatus />);

    expect(hookMock.getInterval).toHaveBeenCalledWith('full');
    expect(hookMock.getInterval).toHaveBeenCalledWith('halfFull');
    expect(hookMock.getInterval).toHaveBeenCalledWith('half');
    expect(hookMock.getInterval).toHaveBeenCalledWith('halfEmpty');
    expect(hookMock.getInterval).toHaveBeenCalledWith('empty');

    expect(hookMock.getVisibility).toHaveBeenCalledWith('full');
    expect(hookMock.getVisibility).toHaveBeenCalledWith('halfFull');
    expect(hookMock.getVisibility).toHaveBeenCalledWith('half');
    expect(hookMock.getVisibility).toHaveBeenCalledWith('halfEmpty');
    expect(hookMock.getVisibility).toHaveBeenCalledWith('empty');
  });

  it('passes interval values from hook to blink segments', () => {
    const intervalByLevel = {
      full: 1000,
      halfFull: 900,
      half: 800,
      halfEmpty: 700,
      empty: 600,
    } as const;

    hookMock.getInterval.mockImplementation(
      (level: keyof typeof intervalByLevel) => intervalByLevel[level]
    );

    const { getAllByTestId } = render(<BatteryStatus />);

    const intervals = getAllByTestId('blink').map((node) =>
      Number(node.getAttribute('data-interval'))
    );

    expect(intervals).toEqual([1000, 900, 800, 700, 600]);
  });
});
