import { describe, expect, it } from 'vitest';
import BatteryStatus from '@/shared/ui/battery-status';
import { renderWithProvider } from '@/__tests__/utils';

describe('BatteryStatus', () => {
  it('renders correctly', () => {
    const { container } = renderWithProvider(<BatteryStatus />);
    expect(container).toBeTruthy();
  });
});
