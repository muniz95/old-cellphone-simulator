import React from 'react';
import BatteryStatus from '../../../src/components/BatteryStatus';
import { describe, expect, it } from 'vitest';
import { renderWithProvider } from '../../utils';

describe('BatteryStatus', () => {
  it('renders correctly', () => {
    const { container } = renderWithProvider(<BatteryStatus />);
    expect(container).toBeTruthy();
  });
});