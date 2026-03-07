import CalculatorKeyboard from '@/features/calculator/ui/components/calculator-keyboard';
import { useCalculatorController } from '@/features/calculator/infrastructure/controllers/use-calculator-controller';
import S from '@/features/calculator/ui/styled';

const CalculatorPage = () => {
  const { expression, append, clear, backspace, evaluate } =
    useCalculatorController();

  return (
    <S.PageContainer>
      <div>
        <textarea
          name="calculator"
          id="calculator"
          value={expression}
          readOnly
        />
      </div>
      <CalculatorKeyboard
        onAppend={append}
        onClear={clear}
        onBackspace={backspace}
        onEvaluate={evaluate}
      />
    </S.PageContainer>
  );
};

export default CalculatorPage;
