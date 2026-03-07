import { useCallback, useEffect } from 'react';
import useTranslation from '@/shared/hooks/use-translation';
import { useUiStore } from '@/app/state/ui-store';

const CallDivert = () => {
  const { t } = useTranslation(['calldivert']);
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

export default CallDivert;
