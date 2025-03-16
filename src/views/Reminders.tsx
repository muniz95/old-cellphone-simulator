import { useCallback, useContext, useEffect } from 'react';
import useTranslation from '@/hooks/use-translation';
import { GlobalContext } from '@/context/global/context';

const Reminders = () => {
  const { setSecondLevel } = useContext(GlobalContext);
  const { t } = useTranslation(['reminders']);
  const dispatchSetSecondLevel = useCallback(
    (position: number) => setSecondLevel(position + 1),
    [setSecondLevel]
  );

  useEffect(() => {
    dispatchSetSecondLevel(0);
  }, [dispatchSetSecondLevel]);
  return <div className="home">{t('title')}</div>;
};

export default Reminders;
