import { GlobalContext } from '@/context/global/context';
import { useCallback, useContext, useEffect } from 'react';
import useTranslation from '@/hooks/use-translation';

const Games = () => {
  const { t } = useTranslation(['games']);
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

export default Games;
