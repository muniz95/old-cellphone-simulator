import { useSelector } from 'react-redux';
import S from './styled';
import { RootState } from '../../redux/reducers';
import Blink from '../Blink';

const BatteryStatus = () => {
  const { isRecharging, batteryLevel } = useSelector((state: RootState) => state);
  return (
    <S.BatteryStatus className="noselect">
      <Blink interval={1000}>
        <S.StatusBar>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</S.StatusBar><br />
      </Blink>
      <Blink interval={0}>
        <S.StatusBar>&nbsp;&nbsp;&nbsp;&nbsp;</S.StatusBar><br />
      </Blink>
      <Blink interval={0}>
        <S.StatusBar>&nbsp;&nbsp;&nbsp;</S.StatusBar><br />
      </Blink>
      <Blink interval={0}>
        <S.StatusBar>&nbsp;&nbsp;</S.StatusBar><br />
      </Blink>
      <Blink interval={0}>
        <S.StatusBar>&nbsp;</S.StatusBar><br />
      </Blink>
      B
    </S.BatteryStatus>
  );
}

export default BatteryStatus;