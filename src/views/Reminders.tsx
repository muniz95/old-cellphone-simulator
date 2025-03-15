import { useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '@/context/global/context';

const Reminders = () => {
  const { t } = useTranslation(['reminders']);
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

export default Reminders;
