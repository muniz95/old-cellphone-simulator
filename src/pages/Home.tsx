import { useCallback, useEffect, useMemo, useState } from 'react';
import useTranslation from '@/shared/hooks/use-translation';
import { useNavigate } from 'react-router-dom';
import CurrentPageContainer from '@/shared/ui/current-page-container';
import { useUiStore } from '@/stores/ui-store';
import { buildHomeMenu } from '@/app/modules/home-menu';

const Home = () => {
  const { t } = useTranslation(['home']);
  const setFirstLevel = useUiStore((state) => state.setFirstLevel);
  const resetLevels = useUiStore((state) => state.resetLevels);
  const navigate = useNavigate();
  const dispatchSetFirstLevel = useCallback(
    (position: number) => setFirstLevel(position + 1),
    [setFirstLevel]
  );
  const menus = useMemo(() => buildHomeMenu(t), [t]);
  const [position, setPosition] = useState(0);

  const handleTap = () => {
    navigate(menus[position].path);
  };

  const swipeLeft = () => {
    setPosition(position === menus.length - 1 ? 0 : position + 1);
  };

  const swipeRight = () => {
    setPosition(position === 0 ? menus.length - 1 : position - 1);
  };

  useEffect(() => {
    dispatchSetFirstLevel(position);
  }, [dispatchSetFirstLevel, position]);

  useEffect(() => {
    resetLevels();
  }, [resetLevels]);

  const label = menus[position];
  return (
    <CurrentPageContainer
      onTap={handleTap}
      onSwipedLeft={swipeLeft}
      onSwipedRight={swipeRight}
    >
      {label.title}
    </CurrentPageContainer>
  );
};

export default Home;
