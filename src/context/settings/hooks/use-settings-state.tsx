import { useState } from 'react';
import { settingsContext } from '../context';

type SettingsStateType = typeof settingsContext;

export const useSettingsState = () => {
  const [alarmLevel, setAlarmLevel] = useState(settingsContext.alarmLevel);
  const [backlightLevel, setBacklightLevel] = useState(
    settingsContext.backlightLevel
  );
  const [color, setColor] = useState(settingsContext.color);
  const [language, setLanguage] = useState(settingsContext.language);
  const [notificationLevel, setNotificationLevel] = useState(
    settingsContext.notificationLevel
  );
  const [ringLevel, setRingLevel] = useState(settingsContext.ringLevel);
  const [inactivityTime, setInactivityTime] = useState(
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
