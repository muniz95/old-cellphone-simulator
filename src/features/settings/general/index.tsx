import { useCallback, useContext, useEffect, useState } from 'react';
import useTranslation from '@/hooks/use-translation';
import { useNavigate } from 'react-router';
import CurrentPageContainer from '@/components/CurrentPageContainer';
import { GlobalContext } from '@/context/global/context';

const GeneralSettings = () => {
  const { t } = useTranslation(['settings']);
  const { setThirdLevel } = useContext(GlobalContext);
  const navigate = useNavigate();

  const menus = [
    { path: '/settings/general/color', title: t('general.color.title') },
    { path: '/settings/general/language', title: t('general.languageTitle') },
    { path: '/settings/general/light', title: t('general.light.title') },
    { path: '/settings/general/sound', title: t('general.sound.title') },
  ];

  const [position, setPosition] = useState(0);
  const dispatchSetThirdLevel = useCallback(
    (position: number) => setThirdLevel(position + 1),
    [setThirdLevel]
  );

  useEffect(() => {
    dispatchSetThirdLevel(position);
  }, [dispatchSetThirdLevel, position]);

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
    dispatchSetThirdLevel(0);
  });

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

export default GeneralSettings;
