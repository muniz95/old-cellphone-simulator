import { describe, it, expect } from 'vitest';
import { evaluatePostfix } from '../../../../src/utils/evaluate-postfix';

describe('evaluatePostfix', () => {
  it('should evaluate a valid postfix expression', () => {
    const postfix = ['3', '5', '2', '8', '-', '*', '+'];
    const result = evaluatePostfix(postfix);
    expect(result).toBe(-13);
  });

  it('should return null for division by zero', () => {
    const postfix = ['3', '0', '/'];
    const result = evaluatePostfix(postfix);
    expect(result).toBeNull();
  });
});
