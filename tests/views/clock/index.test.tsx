import React from 'react';
import Clock from '../../../src/views/Clock';
import { describe, expect, it } from 'vitest';
import { renderWithProvider } from '../../utils';

describe('BatteryStatus', () => {
  it('renders correctly', () => {
    const { container } = renderWithProvider(<Clock />);
    expect(container).toBeTruthy();
  });
});