import { useCallback, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/context/global/context';

const PageIndicator = () => {
  // const { firstLevel, secondLevel, thirdLevel, fourthLevel, fifthLevel } =
  //   useSelector((state: RootState) => state);
  const { firstLevel, secondLevel, thirdLevel, fourthLevel, fifthLevel } =
    useContext(GlobalContext);
  const [indicator, setIndicator] = useState('');
  const [firstLevelLabel, setFirstLevelLabel] = useState('');
  const [secondLevelLabel, setSecondLevelLabel] = useState('');
  const [thirdLevelLabel, setThirdLevelLabel] = useState('');
  const [fourthLevelLabel, setFourthLevelLabel] = useState('');
  const [fifthLevelLabel, setFifthLevelLabel] = useState('');

  const buildIndicator = useCallback(() => {
    setIndicator(
      firstLevelLabel +
        secondLevelLabel +
        thirdLevelLabel +
        fourthLevelLabel +
        fifthLevelLabel
    );
  }, [
    firstLevelLabel,
    secondLevelLabel,
    thirdLevelLabel,
    fourthLevelLabel,
    fifthLevelLabel,
  ]);

  useEffect(() => {
    setFirstLevelLabel(firstLevel === 0 ? '' : `${firstLevel}`);
  }, [firstLevel]);
  useEffect(() => {
    setSecondLevelLabel(secondLevel > 0 ? `-${secondLevel}` : '');
  }, [secondLevel]);
  useEffect(() => {
    setThirdLevelLabel(thirdLevel === 0 ? '' : `-${thirdLevel}`);
  }, [thirdLevel]);
  useEffect(() => {
    setFourthLevelLabel(fourthLevel === 0 ? '' : `-${fourthLevel}`);
  }, [fourthLevel]);
  useEffect(() => {
    setFifthLevelLabel(fifthLevel === 0 ? '' : `-${fifthLevel}`);
  }, [fifthLevel]);

  useEffect(() => {
    buildIndicator();
  }, [
    firstLevel,
    secondLevel,
    thirdLevel,
    fourthLevel,
    fifthLevel,
    buildIndicator,
  ]);
  // useEffect(buildIndicator);

  return <h6>{indicator}</h6>;
};

export default PageIndicator;
