import { useState } from 'react';
import { tokenize } from '../utils/tokenize';
import { infixToPostfix } from '../utils/infix-to-postfix';
import { evaluatePostfix } from '../utils/evaluate-postfix';

export const useCalculator = () => {
  const [expression, setExpression] = useState('');

  const handleClick = (char: string) => {
    setExpression((prev) => `${prev}${char}`);
  };

  const clear = () => setExpression('');
  const back = () => setExpression((prev) => prev.slice(0, -1));

  const evaluate = () => {
    const tokens = tokenize(expression);
    if (!tokens) return null;

    const postfix = infixToPostfix(tokens);
    if (!postfix) return null;

    const result = evaluatePostfix(postfix);
    setExpression(result ? result.toString() : '');
  };

  return { expression, handleClick, clear, back, evaluate };
};
