import { useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePlayRingtone } from './hooks/use-play-ringtone';
import { TonesComponent } from './components/tones-component';
import { GlobalContext } from '@/context/global/context';

const Tones = () => {
  const { t } = useTranslation(['tones']);
  const { setSecondLevel } = useContext(GlobalContext);
  const dispatchSetSecondLevel = useCallback(
    (position: number) => setSecondLevel(position + 1),
    [setSecondLevel]
  );

  useEffect(() => {
    dispatchSetSecondLevel(0);
  }, [dispatchSetSecondLevel]);

  usePlayRingtone();

  return <TonesComponent title={t('title')} />;
};

export default Tones;
