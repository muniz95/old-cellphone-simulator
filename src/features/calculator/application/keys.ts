export interface CalculatorKey {
  id: string;
  label: string;
  action: 'clear' | 'backspace' | 'evaluate' | 'append' | 'noop';
  value?: string;
}

export const CALCULATOR_KEYS: CalculatorKey[] = [
  { id: 'clear', label: 'CC', action: 'clear' },
  { id: 'empty-1', label: '', action: 'noop' },
  { id: 'empty-2', label: '', action: 'noop' },
  { id: 'backspace', label: 'c', action: 'backspace' },
  { id: 'one', label: '1', action: 'append', value: '1' },
  { id: 'two', label: '2', action: 'append', value: '2' },
  { id: 'three', label: '3', action: 'append', value: '3' },
  { id: 'plus', label: '+', action: 'append', value: '+' },
  { id: 'four', label: '4', action: 'append', value: '4' },
  { id: 'five', label: '5', action: 'append', value: '5' },
  { id: 'six', label: '6', action: 'append', value: '6' },
  { id: 'minus', label: '-', action: 'append', value: '-' },
  { id: 'seven', label: '7', action: 'append', value: '7' },
  { id: 'eight', label: '8', action: 'append', value: '8' },
  { id: 'nine', label: '9', action: 'append', value: '9' },
  { id: 'multiply', label: '*', action: 'append', value: '*' },
  { id: 'evaluate', label: '=', action: 'evaluate' },
  { id: 'zero', label: '0', action: 'append', value: '0' },
  { id: 'dot', label: '.', action: 'append', value: '.' },
  { id: 'divide', label: '/', action: 'append', value: '/' },
];
