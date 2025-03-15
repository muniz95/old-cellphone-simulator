import S from './styled';
import Blink from '@/components/Blink';
import { isBetween } from '@/utils/helpers';
import { useEffect, useState } from 'react';

type Indicator = 'empty' | 'halfEmpty' | 'half' | 'halfFull' | 'full';
const indicatorLevelValues = {
  empty: { min: 0, max: 20 },
  halfEmpty: { min: 21, max: 40 },
  half: { min: 41, max: 60 },
  halfFull: { min: 61, max: 80 },
  full: { min: 81, max: 100 },
};

const BatteryStatus = () => {
  const [isRecharging, setIsRecharging] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0);
  const increase = () => {
    setBatteryLevel((state) => state + 1);
  };
  const decrease = () => {
    setBatteryLevel((state) => state - 1);
  };
  const getInterval = (indicatorLevel: Indicator) => {
    const { min, max } = indicatorLevelValues[indicatorLevel];
    if (isRecharging) {
      return isBetween(batteryLevel, min, max) ? 1000 : 0;
    }
    return 0;
  };
  const getVisibility = (indicatorLevel: Indicator) =>
    batteryLevel >= indicatorLevelValues[indicatorLevel].min;

  useEffect(() => {
    if (timeSpentOnPage % 1000 === 0) {
      if (isRecharging) {
        increase();
      } else {
        decrease();
      }
    }
  }, [timeSpentOnPage, isRecharging]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpentOnPage((state) => state + 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (batteryLevel <= 15) setIsRecharging(true);
    if (batteryLevel === 100) setIsRecharging(false);
  }, [batteryLevel]);

  return (
    <S.BatteryStatus className="noselect">
      <Blink interval={getInterval('full')}>
        <S.StatusBar isVisible={getVisibility('full')}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </S.StatusBar>
        <br />
      </Blink>
      <Blink interval={getInterval('halfFull')}>
        <S.StatusBar isVisible={getVisibility('halfFull')}>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </S.StatusBar>
        <br />
      </Blink>
      <Blink interval={getInterval('half')}>
        <S.StatusBar isVisible={getVisibility('half')}>
          &nbsp;&nbsp;&nbsp;
        </S.StatusBar>
        <br />
      </Blink>
      <Blink interval={getInterval('halfEmpty')}>
        <S.StatusBar isVisible={getVisibility('halfEmpty')}>
          &nbsp;&nbsp;
        </S.StatusBar>
        <br />
      </Blink>
      <Blink interval={getInterval('empty')}>
        <S.StatusBar isVisible={getVisibility('empty')}>&nbsp;</S.StatusBar>
        <br />
      </Blink>
      B
    </S.BatteryStatus>
  );
};

export default BatteryStatus;
