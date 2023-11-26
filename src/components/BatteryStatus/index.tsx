import { useSelector } from 'react-redux';
import S from './styled';
import { RootState } from '../../redux/reducers';
import Blink from '../Blink';
import { isBetween } from '../../utils/helpers';

type Indicator = 'empty' | 'halfEmpty' | 'half' | 'halfFull' | 'full';
const indicatorLevelValues = {
  empty: { min: 0, max: 20 },
  halfEmpty: { min: 21, max: 40 },
  half: { min: 41, max: 60 },
  halfFull: { min: 61, max: 80 },
  full: { min: 81, max: 100 },
}

const BatteryStatus = () => {
  const { isRecharging, batteryLevel } = useSelector((state: RootState) => state);
  const getInterval = (indicatorLevel: Indicator) => {
    const { min, max } = indicatorLevelValues[indicatorLevel];
    if (isRecharging) {
      return isBetween(batteryLevel, min, max)
        ? 1000
        : 0;
    }
    return 0;
  };
  const getVisibility = (indicatorLevel: Indicator) =>
    batteryLevel >= indicatorLevelValues[indicatorLevel].min;

  return (
    <S.BatteryStatus className="noselect">
      <Blink interval={getInterval('full')}>
        <S.StatusBar isVisible={getVisibility('full')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</S.StatusBar><br />
      </Blink>
      <Blink interval={getInterval('halfFull')}>
        <S.StatusBar isVisible={getVisibility('halfFull')}>&nbsp;&nbsp;&nbsp;&nbsp;</S.StatusBar><br />
      </Blink>
      <Blink interval={getInterval('half')}>
        <S.StatusBar isVisible={getVisibility('half')}>&nbsp;&nbsp;&nbsp;</S.StatusBar><br />
      </Blink>
      <Blink interval={getInterval('halfEmpty')}>
        <S.StatusBar isVisible={getVisibility('halfEmpty')}>&nbsp;&nbsp;</S.StatusBar><br />
      </Blink>
      <Blink interval={getInterval('empty')}>
        <S.StatusBar isVisible={getVisibility('empty')}>&nbsp;</S.StatusBar><br />
      </Blink>
      B
    </S.BatteryStatus>
  );
}

export default BatteryStatus;