import { useCallback, useEffect } from 'react';
import useTranslation from '@/shared/hooks/use-translation';
import { TonesComponent } from './components/tones-component';
import { useTones } from './hooks/use-tones';
import { useUiStore } from '@/stores/ui-store';

const Tones = () => {
  const { t } = useTranslation(['tones']);
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);
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
