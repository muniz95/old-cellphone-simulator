import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSecondLevel } from '@/redux/actions';
import { useCalculator } from '../hooks/use-calculator';
import S from '../styled';

const Calculator = () => {
  const { expression, handleClick, clear, back, evaluate } = useCalculator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSecondLevel(1));
  }, [dispatch]);

  return (
    <div className="home">
      <div>
        <textarea
          name="calculator"
          id="calculator"
          value={expression}
          readOnly
        />
      </div>
      <S.KeyboardContainer>
        <S.Key onClick={clear}>CC</S.Key>
        <S.Key />
        <S.Key />
        <S.Key onClick={back}>c</S.Key>
        <S.Key onClick={() => handleClick('1')}>1</S.Key>
        <S.Key onClick={() => handleClick('2')}>2</S.Key>
        <S.Key onClick={() => handleClick('3')}>3</S.Key>
        <S.Key onClick={() => handleClick('+')}>+</S.Key>
        <S.Key onClick={() => handleClick('4')}>4</S.Key>
        <S.Key onClick={() => handleClick('5')}>5</S.Key>
        <S.Key onClick={() => handleClick('6')}>6</S.Key>
        <S.Key onClick={() => handleClick('-')}>-</S.Key>
        <S.Key onClick={() => handleClick('7')}>7</S.Key>
        <S.Key onClick={() => handleClick('8')}>8</S.Key>
        <S.Key onClick={() => handleClick('9')}>9</S.Key>
        <S.Key onClick={() => handleClick('*')}>*</S.Key>
        <S.Key onClick={evaluate}>=</S.Key>
        <S.Key onClick={() => handleClick('0')}>0</S.Key>
        <S.Key onClick={() => handleClick('.')}>.</S.Key>
        <S.Key onClick={() => handleClick('/')}>/</S.Key>
      </S.KeyboardContainer>
    </div>
  );
};

export default Calculator;
