import { describe, expect, it } from 'vitest';
import {
  getSelectedSimServiceMessage,
  hasSelectedSimService,
} from '@/features/sim-services/domain/use-cases';

describe('sim-services domain use-cases', () => {
  it('detects if a service is selected', () => {
    expect(hasSelectedSimService(undefined)).toBe(false);
    expect(hasSelectedSimService(null)).toBe(false);
    expect(
      hasSelectedSimService({
        id: 'id-1',
        name: 'Provider',
        number: 100,
        message: 'Message',
      })
    ).toBe(true);
  });

  it('returns selected service message or null', () => {
    expect(getSelectedSimServiceMessage(undefined)).toBeNull();
    expect(getSelectedSimServiceMessage(null)).toBeNull();
    expect(
      getSelectedSimServiceMessage({
        id: 'id-1',
        name: 'Provider',
        number: 100,
        message: 'This is your provider.',
      })
    ).toBe('This is your provider.');
  });
});
