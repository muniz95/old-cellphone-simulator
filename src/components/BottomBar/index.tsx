import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import S from "./styled";

const BottomBar = ({history}: RouteComponentProps) => {
  return (
    <S.BottomBarContainer className="noselect">
      <div onClick={() => history.replace("/")}>O</div>
      <div onClick={history.goBack}>&lt;</div>
    </S.BottomBarContainer>
  );
}

export default withRouter(BottomBar);
