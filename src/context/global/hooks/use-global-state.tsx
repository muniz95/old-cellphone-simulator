import { useState } from 'react';
import { defaultContext } from '../context';

type GlobalStateType = typeof defaultContext;

export const useGlobalState = () => {
  const [firstLevel, setFirstLevel] = useState(defaultContext.firstLevel);
  const [secondLevel, setSecondLevel] = useState(defaultContext.secondLevel);
  const [thirdLevel, setThirdLevel] = useState(defaultContext.thirdLevel);
  const [fourthLevel, setFourthLevel] = useState(defaultContext.fourthLevel);
  const [fifthLevel, setFifthLevel] = useState(defaultContext.fifthLevel);
  const [backlightLevel, setBacklightLevel] = useState(
    defaultContext.backlightLevel
  );
  const [color, setColor] = useState(defaultContext.color);

  return {
    firstLevel,
    setFirstLevel,
    secondLevel,
    setSecondLevel,
    thirdLevel,
    setThirdLevel,
    fourthLevel,
    setFourthLevel,
    fifthLevel,
    setFifthLevel,
    backlightLevel,
    setBacklightLevel,
    color,
    setColor,
  } as GlobalStateType;
};
