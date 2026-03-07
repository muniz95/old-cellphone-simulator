import { useCallback, useEffect, useState } from 'react';
import { evaluateExpression } from '@/features/calculator/domain/use-cases';
import { useUiStore } from '@/app/state/ui-store';

export const useCalculatorController = () => {
  const [expression, setExpression] = useState('');
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);

  useEffect(() => {
    setSecondLevel(1);
  }, [setSecondLevel]);

  const append = useCallback((char: string) => {
    setExpression((current) => `${current}${char}`);
  }, []);

  const clear = useCallback(() => {
    setExpression('');
  }, []);

  const backspace = useCallback(() => {
    setExpression((current) => current.slice(0, -1));
  }, []);

  const evaluate = useCallback(() => {
    const result = evaluateExpression(expression);
    setExpression(result !== null ? result.toString() : '');
  }, [expression]);

  return {
    expression,
    append,
    clear,
    backspace,
    evaluate,
  };
};
