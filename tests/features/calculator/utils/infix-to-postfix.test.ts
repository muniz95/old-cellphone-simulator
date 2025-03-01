import { describe, it, expect } from 'vitest';
import { infixToPostfix } from '../../../../src/utils/infix-to-postfix';

describe('infixToPostfix', () => {
  it('should convert infix to postfix', () => {
    const tokens = ['3', '+', '5', '*', '(', '2', '-', '8', ')'];
    const postfix = infixToPostfix(tokens);
    expect(postfix).toEqual(['3', '5', '2', '8', '-', '*', '+']);
  });

  it('should return null for mismatched parentheses', () => {
    const tokens = ['3', '+', '5', '*', '(', '2', '-', '8'];
    const postfix = infixToPostfix(tokens);
    expect(postfix).toBeNull();
  });
});
