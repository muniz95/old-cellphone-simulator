import { settingsContext } from '../context';
import useLocalStorage from '@/hooks/use-local-storage';

type SettingsStateType = typeof settingsContext;

export const useSettingsState = () => {
  const [alarmLevel, setAlarmLevel] = useLocalStorage(
    'alarmLevel',
    settingsContext.alarmLevel
  );
  const [backlightLevel, setBacklightLevel] = useLocalStorage(
    'backlightLevel',
    settingsContext.backlightLevel
  );
  const [color, setColor] = useLocalStorage('color', settingsContext.color);
  const [language, setLanguage] = useLocalStorage(
    'language',
    settingsContext.language
  );
  const [notificationLevel, setNotificationLevel] = useLocalStorage(
    'notificationLevel',
    settingsContext.notificationLevel
  );
  const [ringLevel, setRingLevel] = useLocalStorage(
    'ringLevel',
    settingsContext.ringLevel
  );
  const [inactivityTime, setInactivityTime] = useLocalStorage(
    'inactivityTime',
    settingsContext.inactivityTime
  );

  const hook: SettingsStateType = {
    alarmLevel,
    setAlarmLevel,
    backlightLevel,
    setBacklightLevel,
    color,
    setColor,
    language,
    setLanguage,
    notificationLevel,
    setNotificationLevel,
    ringLevel,
    setRingLevel,
    inactivityTime,
    setInactivityTime,
  };

  return hook;
};
