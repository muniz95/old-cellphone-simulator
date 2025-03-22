import { useCallback, useContext, useEffect } from 'react';
import useTranslation from '@/hooks/use-translation';
import { TonesComponent } from './components/tones-component';
import { GlobalContext } from '@/context/global/context';
import { useTones } from './hooks/use-tones';

const Tones = () => {
  const { t } = useTranslation(['tones']);
  const { setSecondLevel } = useContext(GlobalContext);
  const { tones } = useTones();
  const dispatchSetSecondLevel = useCallback(
    (position: number) => setSecondLevel(position + 1),
    [setSecondLevel]
  );

  useEffect(() => {
    dispatchSetSecondLevel(0);
  }, [dispatchSetSecondLevel]);

  return <TonesComponent title={t('title')} tones={tones} />;
};

export default Tones;
