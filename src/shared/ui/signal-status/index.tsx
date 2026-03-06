import React from 'react';
import S from './styled';

const SignalStatus = () => {
  return (
    <S.SignalStatus className="noselect">
      <S.StatusBar>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</S.StatusBar>
      <br />
      <S.StatusBar>&nbsp;&nbsp;&nbsp;&nbsp;</S.StatusBar>
      <br />
      <S.StatusBar>&nbsp;&nbsp;&nbsp;</S.StatusBar>
      <br />
      <S.StatusBar>&nbsp;&nbsp;</S.StatusBar>
      <br />
      <S.StatusBar>&nbsp;</S.StatusBar>
      <br />S
    </S.SignalStatus>
  );
};

export default SignalStatus;
