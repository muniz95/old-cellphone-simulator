import { useCallback, useEffect } from 'react';
import useTranslation from '@/shared/hooks/use-translation';
import { useUiStore } from '@/app/state/ui-store';
import HomeScreen from '@/shared/ui/home-screen';

const Chat = () => {
  const { t } = useTranslation(['chat']);
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);
  const dispatchSetSecondLevel = useCallback(
    (position: number) => setSecondLevel(position + 1),
    [setSecondLevel]
  );

  useEffect(() => {
    dispatchSetSecondLevel(0);
  }, [dispatchSetSecondLevel]);
  return <HomeScreen>{t('title')}</HomeScreen>;
};

export default Chat;
