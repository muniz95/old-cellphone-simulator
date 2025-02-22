import { ReactElement } from 'react';
import S from './styled';
import useSwipe from '@/hooks/use-swipe';

interface IProps {
  children: ReactElement | ReactElement[] | string;
  onTap: () => void;
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

const CurrentPageContainer = ({
  children,
  onTap,
  onSwipedLeft,
  onSwipedRight,
}: IProps) => {
  const swipeHandlers = useSwipe({
    onSwipedLeft,
    onSwipedRight,
    onTap,
  });
  return <S.Container {...swipeHandlers}>{children}</S.Container>;
};

export default CurrentPageContainer;
