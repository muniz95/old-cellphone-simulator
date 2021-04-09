import React, { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { setSecondLevel } from "../../redux/actions";
import S from "./styled";

const Calculator = () => {
  const [expression, setExpression] = React.useState("");
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setExpression(expression => `${expression}${(e.target as HTMLDivElement).innerText}`);
  }
  const clear = () => setExpression("");
  const back = () => setExpression(x => `${x.slice(0, x.length-1)}`);

  const evaluate = () => {
    // const sanitizedExpression = expression.replaceAll("x", "*");
    // const result = eval(sanitizedExpression);
    // setExpression(result);
  }
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = React.useCallback(
    (position) => dispatch(setSecondLevel(position+1)),
    [dispatch]
  );
  
  React.useEffect(() => {
    dispatchSetSecondLevel(0);
    
  }, [dispatchSetSecondLevel]);

  return (
    <div className="home">
      <div>
        <textarea name="calculator" id="calculator" value={expression} />
      </div>
      <S.KeyboardContainer>
        <S.Key onClick={clear}>
          <div>CC</div>
        </S.Key>
        <S.Key/>
        <S.Key/>
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
          <div>x</div>
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
  )
};

export default Calculator;
