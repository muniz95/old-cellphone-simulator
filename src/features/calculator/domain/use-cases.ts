import {
  CALCULATOR_PRECEDENCE,
  CalculatorOperator,
} from '@/features/calculator/domain/types';

const isNumber = (token: string) => /\d+(\.\d+)?/.test(token);
const isOperator = (token: string): token is CalculatorOperator =>
  /[+\-*/]/.test(token);

export const tokenize = (expression: string): string[] | null => {
  const cleanedExpression = expression.replace(/\s+/g, '');
  const tokens: string[] = [];
  let currentNumber = '';

  for (const char of cleanedExpression) {
    if (/\d|\./.test(char)) {
      currentNumber += char;
      continue;
    }

    if (/[+\-*/()]/.test(char)) {
      if (currentNumber) {
        tokens.push(currentNumber);
        currentNumber = '';
      }

      tokens.push(char);
      continue;
    }

    return null;
  }

  if (currentNumber) {
    tokens.push(currentNumber);
  }

  return tokens;
};

export const infixToPostfix = (tokens: string[]): string[] | null => {
  const output: string[] = [];
  const stack: string[] = [];

  for (const token of tokens) {
    if (isNumber(token)) {
      output.push(token);
      continue;
    }

    if (token === '(') {
      stack.push(token);
      continue;
    }

    if (token === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        output.push(stack.pop()!);
      }

      if (stack.length === 0 || stack.pop() !== '(') {
        return null;
      }

      continue;
    }

    if (isOperator(token)) {
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== '(' &&
        CALCULATOR_PRECEDENCE[token] <=
          CALCULATOR_PRECEDENCE[stack[stack.length - 1] as CalculatorOperator]
      ) {
        output.push(stack.pop()!);
      }

      stack.push(token);
    }
  }

  while (stack.length > 0) {
    if (stack[stack.length - 1] === '(') {
      return null;
    }

    output.push(stack.pop()!);
  }

  return output;
};

export const evaluatePostfix = (postfix: string[]): number | null => {
  const stack: number[] = [];

  for (const token of postfix) {
    if (isNumber(token)) {
      stack.push(parseFloat(token));
      continue;
    }

    if (isOperator(token)) {
      if (stack.length < 2) {
        return null;
      }

      const right = stack.pop()!;
      const left = stack.pop()!;

      switch (token) {
        case '+':
          stack.push(left + right);
          break;
        case '-':
          stack.push(left - right);
          break;
        case '*':
          stack.push(left * right);
          break;
        case '/':
          if (right === 0) {
            return null;
          }

          stack.push(left / right);
          break;
      }
    }
  }

  if (stack.length !== 1) {
    return null;
  }

  return stack[0];
};

export const evaluateExpression = (expression: string): number | null => {
  const tokens = tokenize(expression);
  if (!tokens) return null;

  const postfix = infixToPostfix(tokens);
  if (!postfix) return null;

  return evaluatePostfix(postfix);
};
