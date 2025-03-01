export const infixToPostfix = (tokens: string[]): string[] | null => {
  const output: string[] = [];
  const stack: string[] = [];
  const precedence: { [key: string]: number } = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  for (const token of tokens) {
    if (/\d+(\.\d+)?/.test(token)) {
      output.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        output.push(stack.pop()!);
      }
      if (stack.length === 0 || stack.pop() !== '(') {
        return null; // Mismatched parentheses
      }
    } else if (/[+\-*/]/.test(token)) {
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== '(' &&
        precedence[token] <= precedence[stack[stack.length - 1]]
      ) {
        output.push(stack.pop()!);
      }
      stack.push(token);
    }
  }

  while (stack.length > 0) {
    if (stack[stack.length - 1] === '(') {
      return null; // Mismatched parentheses
    }
    output.push(stack.pop()!);
  }

  return output;
};
