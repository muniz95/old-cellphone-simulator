import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setFifthLevel,
  setFirstLevel,
  setFourthLevel,
  setSecondLevel,
  setThirdLevel,
} from '@/redux/actions';
import CurrentPageContainer from '@/components/CurrentPageContainer';

const Home = () => {
  const { t } = useTranslation(['home']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchSetFirstLevel = useCallback(
    (position: number) => dispatch(setFirstLevel(position + 1)),
    [dispatch]
  );
  const dispatchResetPageIndicator = useCallback(() => {
    dispatch(setSecondLevel(0));
    dispatch(setThirdLevel(0));
    dispatch(setFourthLevel(0));
    dispatch(setFifthLevel(0));
  }, [dispatch]);
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
      handleTap={handleTap}
      swipeLeft={swipeLeft}
      swipeRight={swipeRight}
    >
      {label.title}
    </CurrentPageContainer>
  );
};

export default Home;
