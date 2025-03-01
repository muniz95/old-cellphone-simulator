export const evaluatePostfix = (postfix: string[]): number | null => {
  const stack: number[] = [];

  for (const token of postfix) {
    if (/\d+(\.\d+)?/.test(token)) {
      stack.push(parseFloat(token));
    } else if (/[+\-*/]/.test(token)) {
      if (stack.length < 2) {
        return null; // Invalid postfix expression
      }
      const b = stack.pop()!;
      const a = stack.pop()!;
      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          if (b === 0) {
            return null; // Division by zero
          }
          stack.push(a / b);
          break;
      }
    }
  }

  if (stack.length !== 1) {
    return null; // Invalid postfix expression
  }

  return stack.pop()!;
};
