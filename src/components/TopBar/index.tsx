import { useEffect, useState } from 'react';
import S from './styled';
import PageIndicator from '../PageIndicator';

const TopBar = () => {
  const [date, setDate] = useState(new Date());
  const tick = () => {
    setDate(new Date());
  };
  const timerID = setInterval(tick, 1000);

  useEffect(() => {
    return () => clearInterval(timerID);
  });

  return (
    <S.TopBarContainer className="noselect">
      <div>Lock</div>
      <PageIndicator />
      <div>{`${date.toLocaleTimeString().slice(0, 5)}`}</div>
    </S.TopBarContainer>
  );
};

export default TopBar;
