import {
  CALCULATOR_KEYS,
  CalculatorKey,
} from '@/features/calculator/application/keys';
import S from '@/features/calculator/ui/styled';

interface CalculatorKeyboardProps {
  onAppend: (value: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onEvaluate: () => void;
}

const handleKeyPress = (
  key: CalculatorKey,
  handlers: CalculatorKeyboardProps
) => {
  switch (key.action) {
    case 'append':
      if (key.value) {
        handlers.onAppend(key.value);
      }
      break;
    case 'clear':
      handlers.onClear();
      break;
    case 'backspace':
      handlers.onBackspace();
      break;
    case 'evaluate':
      handlers.onEvaluate();
      break;
    case 'noop':
      break;
  }
};

const CalculatorKeyboard = (handlers: CalculatorKeyboardProps) => {
  return (
    <S.KeyboardContainer>
      {CALCULATOR_KEYS.map((key) => (
        <S.Key
          key={key.id}
          onClick={() => handleKeyPress(key, handlers)}
          aria-label={key.label || 'empty'}
        >
          {key.label}
        </S.Key>
      ))}
    </S.KeyboardContainer>
  );
};

export default CalculatorKeyboard;
