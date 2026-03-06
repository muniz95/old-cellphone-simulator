import { useCallback, useEffect, useState } from 'react';
import { saveLightPreferences } from '@/features/settings/application/actions';
import { useFeedbackPort } from '@/features/settings/infrastructure/adapters/use-feedback-port';
import { usePageIndicatorPort } from '@/features/settings/infrastructure/adapters/use-page-indicator-port';
import { useSettingsStorePort } from '@/features/settings/infrastructure/adapters/use-settings-store-port';

export const useLightSettingsController = () => {
  const store = useSettingsStorePort();
  const feedback = useFeedbackPort();
  const { setFourth } = usePageIndicatorPort();

  const settings = store.read();
  const [backlightLevel, setBacklightLevel] = useState(settings.backlightLevel);
  const [inactivityTime, setInactivityTime] = useState(settings.inactivityTime);

  useEffect(() => {
    setFourth(2);
  }, [setFourth]);

  const save = useCallback(() => {
    saveLightPreferences(store, feedback, { backlightLevel, inactivityTime });
  }, [backlightLevel, feedback, inactivityTime, store]);

  return {
    backlightLevel,
    setBacklightLevel,
    inactivityTime,
    setInactivityTime,
    save,
  };
};
