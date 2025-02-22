import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setThirdLevel } from '@/redux/actions';
import CurrentPageContainer from '@/components/CurrentPageContainer';

const GeneralSettings = () => {
  const { t } = useTranslation(['settings']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menus = [
    { path: '/settings/general/color', title: t('general.color.title') },
    { path: '/settings/general/language', title: t('general.languageTitle') },
    { path: '/settings/general/light', title: t('general.light.title') },
    { path: '/settings/general/sound', title: t('general.sound.title') },
  ];

  const [position, setPosition] = useState(0);
  const dispatchSetThirdLevel = useCallback(
    (position: number) => dispatch(setThirdLevel(position + 1)),
    [dispatch]
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
      handleTap={handleTap}
      swipeLeft={swipeLeft}
      swipeRight={swipeRight}
    >
      {label.title}
    </CurrentPageContainer>
  );
};

export default GeneralSettings;
