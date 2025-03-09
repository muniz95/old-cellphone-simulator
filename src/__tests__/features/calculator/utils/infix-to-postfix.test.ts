import { infixToPostfix } from '@/features/calculator/utils/infix-to-postfix';
import { describe, it, expect } from 'vitest';

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
