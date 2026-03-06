import { useCallback, useEffect } from 'react';
import useTranslation from '@/hooks/use-translation';
import { useUiStore } from '@/stores/ui-store';

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
  return <div className="home">{t('title')}</div>;
};

export default Chat;
