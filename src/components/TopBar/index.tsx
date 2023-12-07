import React from 'react';
import S from './styled';
import PageIndicator from '../PageIndicator';

const TopBar = () => {
  const [date, setDate] = React.useState(new Date());
  const tick = () => {
    setDate(new Date());
  }
  const timerID: NodeJS.Timer = setInterval(tick, 1000);

  React.useEffect(() => {
    return () => clearInterval(timerID);
  });

  return (
    <S.TopBarContainer className="noselect">
      <div>Lock</div>
      <PageIndicator />
      <div>{`${date.toLocaleTimeString().slice(0, 5)}`}</div>
    </S.TopBarContainer>
  );
}

export default TopBar;
