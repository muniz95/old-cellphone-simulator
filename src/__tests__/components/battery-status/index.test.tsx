import { describe, expect, it } from 'vitest';
import BatteryStatus from '@/shared/ui/battery-status';
import { render } from '@testing-library/react';

describe('BatteryStatus', () => {
  it('renders correctly', () => {
    const { container } = render(<BatteryStatus />);
    expect(container).toBeTruthy();
  });
});
