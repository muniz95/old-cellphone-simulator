import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSecondLevel } from '../../redux/actions';
import S from './styled';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setExpression(
      (expression) => `${expression}${(e.target as HTMLDivElement).innerHTML}`
    );
  };
  const clear = () => setExpression('');
  const back = () => setExpression((x) => `${x.slice(0, x.length - 1)}`);

  const evaluate = () => {
    const tokens = tokenize(expression);
    if (!tokens) {
      return null; // Tokenization failed
    }

    const postfix = infixToPostfix(tokens);
    if (!postfix) {
      return null; // Conversion to postfix failed
    }

    const result = evaluatePostfix(postfix);
    setExpression(result ? result.toString() : '');
  };

  const tokenize = (expression: string): string[] | null => {
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

  const infixToPostfix = (tokens: string[]): string[] | null => {
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

  const evaluatePostfix = (postfix: string[]): number | null => {
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

  const dispatch = useDispatch();
  const dispatchSetSecondLevel = useCallback(
    (position: number) => dispatch(setSecondLevel(position + 1)),
    [dispatch]
  );

  useEffect(() => {
    dispatchSetSecondLevel(0);
  }, [dispatchSetSecondLevel]);

  return (
    <div className="home">
      <div>
        <textarea name="calculator" id="calculator" defaultValue={expression} />
      </div>
      <S.KeyboardContainer>
        <S.Key onClick={clear}>
          <div>CC</div>
        </S.Key>
        <S.Key />
        <S.Key />
        <S.Key onClick={back}>
          <div>c</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>1</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>2</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>3</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>+</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>4</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>5</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>6</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>-</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>7</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>8</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>9</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>*</div>
        </S.Key>
        <S.Key onClick={evaluate}>
          <div>=</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>0</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>.</div>
        </S.Key>
        <S.Key onClick={handleClick}>
          <div>/</div>
        </S.Key>
      </S.KeyboardContainer>
    </div>
  );
};

export default Calculator;
