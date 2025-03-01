import { describe, it, expect } from 'vitest';
import { tokenize } from '../../../../src/utils/tokenize';

describe('tokenize', () => {
  it('should tokenize a valid expression', () => {
    const expression = '3 + 5 * (2 - 8)';
    const tokens = tokenize(expression);
    expect(tokens).toEqual(['3', '+', '5', '*', '(', '2', '-', '8', ')']);
  });

  it('should return null for an invalid character', () => {
    const expression = '3 + 5a';
    const tokens = tokenize(expression);
    expect(tokens).toBeNull();
  });
});
