import { useState } from 'react';

export const useGlobalState = () => {
  const [firstLevel, setFirstLevel] = useState(1);
  const [secondLevel, setSecondLevel] = useState(0);
  const [thirdLevel, setThirdLevel] = useState(0);
  const [fourthLevel, setFourthLevel] = useState(0);
  const [fifthLevel, setFifthLevel] = useState(0);
  const [backlightLevel, setBacklightLevel] = useState(80);

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
  };
};
