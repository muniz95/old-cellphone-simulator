import { useCallback, useEffect, useMemo, useState } from 'react';
import useTranslation from '@/shared/hooks/use-translation';
import { useNavigate } from 'react-router-dom';
import CurrentPageContainer from '@/shared/ui/current-page-container';
import { useUiStore } from '@/app/state/ui-store';
import { buildHomeMenu } from '@/app/modules/home-menu';

const clampPosition = (position: number, length: number) => {
  if (length <= 0) return 0;
  if (position < 0) return 0;
  if (position > length - 1) return length - 1;
  return position;
};

const Home = () => {
  const { t } = useTranslation(['home']);
  const firstLevel = useUiStore((state) => state.firstLevel);
  const setFirstLevel = useUiStore((state) => state.setFirstLevel);
  const resetLevels = useUiStore((state) => state.resetLevels);
  const navigate = useNavigate();
  const dispatchSetFirstLevel = useCallback(
    (position: number) => setFirstLevel(position + 1),
    [setFirstLevel]
  );
  const menus = useMemo(() => buildHomeMenu(t), [t]);
  const [position, setPosition] = useState(() =>
    clampPosition(firstLevel > 0 ? firstLevel - 1 : 0, menus.length)
  );

  useEffect(() => {
    const nextPosition = clampPosition(
      firstLevel > 0 ? firstLevel - 1 : 0,
      menus.length
    );
    setPosition((current) =>
      current === nextPosition ? current : nextPosition
    );
  }, [firstLevel, menus.length]);

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
