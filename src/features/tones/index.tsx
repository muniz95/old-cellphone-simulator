import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSecondLevel } from '../../redux/actions';
import { useTranslation } from 'react-i18next';
import { usePlayRingtone } from './hooks/use-play-ringtone';
import { TonesComponent } from './components/tones-component';

const Tones = () => {
  const { t } = useTranslation(['tones']);
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = useCallback(
    (position: number) => dispatch(setSecondLevel(position + 1)),
    [dispatch]
  );

  useEffect(() => {
    dispatchSetSecondLevel(0);
  }, [dispatchSetSecondLevel]);

  usePlayRingtone();

  return <TonesComponent title={t('title')} />;
};

export default Tones;
