import S from './styled';
import Blink from '@/components/Blink';
import { useBatteryStatus } from './hooks/use-battery-status';

const BatteryStatus = () => {
  const { getInterval, getVisibility } = useBatteryStatus();

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
