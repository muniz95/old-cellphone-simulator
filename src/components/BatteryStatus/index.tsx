import React from 'react';
import S from './styled';

const BatteryStatus = () => {
  return (
    <S.BatteryStatus className="noselect">
      <S.StatusBar>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</S.StatusBar><br />
      <S.StatusBar>&nbsp;&nbsp;&nbsp;&nbsp;</S.StatusBar><br />
      <S.StatusBar>&nbsp;&nbsp;&nbsp;</S.StatusBar><br />
      <S.StatusBar>&nbsp;&nbsp;</S.StatusBar><br />
      <S.StatusBar>&nbsp;</S.StatusBar><br />
              B
    </S.BatteryStatus>
  );
}

export default BatteryStatus;