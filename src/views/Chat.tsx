import { useCallback, useContext, useEffect } from 'react';
import useTranslation from '@/hooks/use-translation';
import { GlobalContext } from '@/context/global/context';

const Chat = () => {
  const { t } = useTranslation(['chat']);
  const { setSecondLevel } = useContext(GlobalContext);
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
