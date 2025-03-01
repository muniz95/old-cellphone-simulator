export const tokenize = (expression: string): string[] | null => {
  const cleanedExpression = expression.replace(/\s+/g, '');
  const tokens: string[] = [];
  let currentNumber = '';

  for (const char of cleanedExpression) {
    if (/\d|\./.test(char)) {
      currentNumber += char;
    } else if (/[+\-*/()]/.test(char)) {
      if (currentNumber) {
        tokens.push(currentNumber);
        currentNumber = '';
      }
      tokens.push(char);
    } else {
      return null; // Invalid character
    }
  }

  if (currentNumber) {
    tokens.push(currentNumber);
  }

  return tokens;
};
