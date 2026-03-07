export type CalculatorOperator = '+' | '-' | '*' | '/';

export const CALCULATOR_PRECEDENCE: Record<CalculatorOperator, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
};
