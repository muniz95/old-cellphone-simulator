import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CurrentPageContainer from '@/components/CurrentPageContainer';
import { GlobalContext } from '@/context/global/context';

const Home = () => {
  const { t } = useTranslation(['home']);
  const {
    setFirstLevel,
    setSecondLevel,
    setThirdLevel,
    setFourthLevel,
    setFifthLevel,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const dispatchSetFirstLevel = useCallback(
    (position: number) => setFirstLevel(position + 1),
    [setFirstLevel]
  );
  const dispatchResetPageIndicator = useCallback(() => {
    setSecondLevel(0);
    setThirdLevel(0);
    setFourthLevel(0);
    setFifthLevel(0);
  }, [setFifthLevel, setFourthLevel, setSecondLevel, setThirdLevel]);
  const [menus] = useState([
    { path: '/phonebook', title: t('phonebookTitle') },
    { path: '/messages', title: t('messagesTitle') },
    { path: '/chat', title: t('chatTitle') },
    { path: '/callregister', title: t('callregisterTitle') },
    { path: '/tones', title: t('tonesTitle') },
    { path: '/settings', title: t('settingsTitle') },
    { path: '/calldivert', title: t('calldivertTitle') },
    { path: '/games', title: t('gamesTitle') },
    { path: '/calculator', title: t('calculatorTitle') },
    { path: '/reminders', title: t('remindersTitle') },
    { path: '/clock', title: t('clockTitle') },
    { path: '/profiles', title: t('profilesTitle') },
    { path: '/simservices', title: t('simservicesTitle') },
  ]);
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

  useEffect(dispatchResetPageIndicator);

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
