import S from './styled';
import { useBottomBarNavigation } from './hooks/use-bottom-bar-navigation';

const BottomBar = () => {
  const { goBack, goHome } = useBottomBarNavigation();
  return (
    <S.BottomBarContainer>
      <div onClick={() => goHome()}>O</div>
      <div onClick={() => goBack()}>&lt;</div>
    </S.BottomBarContainer>
  );
};

export default BottomBar;
