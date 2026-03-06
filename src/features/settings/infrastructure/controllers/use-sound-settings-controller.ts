import { useCallback, useEffect, useState } from 'react';
import { saveSoundPreferences } from '@/features/settings/application/actions';
import { useFeedbackPort } from '@/features/settings/infrastructure/adapters/use-feedback-port';
import { usePageIndicatorPort } from '@/features/settings/infrastructure/adapters/use-page-indicator-port';
import { useSettingsStorePort } from '@/features/settings/infrastructure/adapters/use-settings-store-port';

export const useSoundSettingsController = () => {
  const store = useSettingsStorePort();
  const feedback = useFeedbackPort();
  const { setFourth } = usePageIndicatorPort();

  const settings = store.read();
  const [notificationLevel, setNotificationLevel] = useState(
    settings.notificationLevel
  );
  const [alarmLevel, setAlarmLevel] = useState(settings.alarmLevel);
  const [ringLevel, setRingLevel] = useState(settings.ringLevel);

  useEffect(() => {
    setFourth(3);
  }, [setFourth]);

  const save = useCallback(() => {
    saveSoundPreferences(store, feedback, {
      notificationLevel,
      alarmLevel,
      ringLevel,
    });
  }, [alarmLevel, feedback, notificationLevel, ringLevel, store]);

  return {
    notificationLevel,
    setNotificationLevel,
    alarmLevel,
    setAlarmLevel,
    ringLevel,
    setRingLevel,
    save,
  };
};
