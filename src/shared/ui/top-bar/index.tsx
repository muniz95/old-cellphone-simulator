import { useEffect, useState } from 'react';
import S from './styled';
import PageIndicator from '../page-indicator';

const TopBar = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <S.TopBarContainer>
      <div>Lock</div>
      <PageIndicator />
      <div>{`${date.toLocaleTimeString().slice(0, 5)}`}</div>
    </S.TopBarContainer>
  );
};

export default TopBar;
