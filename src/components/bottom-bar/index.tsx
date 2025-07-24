import React from 'react';
import { useNavigate } from 'react-router';
import S from './styled';

const BottomBar = () => {
  const navigate = useNavigate();
  return (
    <S.BottomBarContainer className="noselect">
      <div onClick={() => navigate('/', { replace: true })}>O</div>
      <div onClick={() => navigate(-1)}>&lt;</div>
    </S.BottomBarContainer>
  );
};

export default BottomBar;
