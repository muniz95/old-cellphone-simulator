import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useTranslation from '@/hooks/use-translation';
import CurrentPageContainer from '@/components/CurrentPageContainer';
import { GlobalContext } from '@/context/global/context';

const Settings = () => {
  const { t } = useTranslation(['settings']);
  const navigate = useNavigate();
  const [menus] = useState([
    { path: '/settings/call', title: t('callTitle') },
    { path: '/settings/general', title: t('general.title') },
    { path: '/settings/security', title: t('securityTitle') },
    { path: '/settings/restore', title: t('restore.title') },
  ]);
  const [position, setPosition] = useState(0);

  const { setSecondLevel } = useContext(GlobalContext);
  const dispatchSetSecondLevel = useCallback(
    (position: number) => setSecondLevel(position + 1),
    [setSecondLevel]
  );

  useEffect(() => {
    dispatchSetSecondLevel(position);
  }, [dispatchSetSecondLevel, position]);

  const handleTap = () => {
    navigate(menus[position].path);
  };

  const swipeLeft = () => {
    setPosition(position === menus.length - 1 ? 0 : position + 1);
  };

  const swipeRight = () => {
    setPosition(position === 0 ? menus.length - 1 : position - 1);
  };

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

export default Settings;
