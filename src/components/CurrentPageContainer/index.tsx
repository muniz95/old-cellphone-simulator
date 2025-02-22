import { ReactElement } from 'react';
import S from './styled';

interface IProps {
  children: ReactElement | ReactElement[] | string;
  handleTap: () => void;
  swipeLeft: () => void;
  swipeRight: () => void;
}

const CurrentPageContainer = ({ children }: IProps) => (
  <S.Container>{children}</S.Container>
);

export default CurrentPageContainer;
