import S from "./styled";
import Hammer from 'react-hammerjs-18';

interface IProps {
  children: React.ReactElement | React.ReactElement[] | string
  handleTap: () => void
  swipeLeft: () => void  
  swipeRight: () => void
}

const CurrentPageContainer = ({ children, handleTap, swipeLeft, swipeRight }: IProps) =>
  <Hammer onTap={handleTap}
    onSwipeLeft={swipeLeft}
    onSwipeRight={swipeRight}>
    <S.Container>
      {children}
    </S.Container>
  </Hammer>;

export default CurrentPageContainer;
