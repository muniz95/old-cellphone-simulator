import { ReactNode, useEffect, useState } from 'react';
import S from './styled';

interface TopBarProps {
  lockLabel?: string;
  pageIndicator: ReactNode;
}

const TopBar = ({ lockLabel = 'Lock', pageIndicator }: TopBarProps) => {
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
      <div>{lockLabel}</div>
      {pageIndicator}
      <div>{`${date.toLocaleTimeString().slice(0, 5)}`}</div>
    </S.TopBarContainer>
  );
};

export default TopBar;
