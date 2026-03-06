import { useContext } from 'react';
import { SettingsStorePort } from '@/features/settings/application/ports';
import { SettingsContext } from '@/context/settings/context';

export const useSettingsStorePort = (): SettingsStorePort => {
  const {
    color,
    language,
    notificationLevel,
    alarmLevel,
    ringLevel,
    backlightLevel,
    inactivityTime,
    setColor,
    setLanguage,
    setNotificationLevel,
    setAlarmLevel,
    setRingLevel,
    setBacklightLevel,
    setInactivityTime,
  } = useContext(SettingsContext);

  return {
    read: () => ({
      color,
      language,
      notificationLevel,
      alarmLevel,
      ringLevel,
      backlightLevel,
      inactivityTime,
    }),
    write: (preferences) => {
      setColor(preferences.color);
      setLanguage(preferences.language);
      setNotificationLevel(preferences.notificationLevel);
      setAlarmLevel(preferences.alarmLevel);
      setRingLevel(preferences.ringLevel);
      setBacklightLevel(preferences.backlightLevel);
      setInactivityTime(preferences.inactivityTime);
    },
  };
};
