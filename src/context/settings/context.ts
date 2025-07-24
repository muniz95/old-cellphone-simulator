import defaults from '@/defaults';
import { createContext, Dispatch, SetStateAction } from 'react';

type SettingsContextType = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  notificationLevel: number;
  setNotificationLevel: Dispatch<SetStateAction<number>>;
  alarmLevel: number;
  setAlarmLevel: Dispatch<SetStateAction<number>>;
  ringLevel: number;
  setRingLevel: Dispatch<SetStateAction<number>>;
  backlightLevel: number;
  setBacklightLevel: Dispatch<SetStateAction<number>>;
  inactivityTime: number;
  setInactivityTime: Dispatch<SetStateAction<number>>;
};

export const settingsContext: SettingsContextType = {
  color: defaults.settings.color,
  setColor: () => {},
  language: defaults.settings.language,
  setLanguage: () => {},
  notificationLevel: defaults.settings.notificationLevel,
  setNotificationLevel: () => {},
  alarmLevel: defaults.settings.alarmLevel,
  setAlarmLevel: () => {},
  ringLevel: defaults.settings.ringLevel,
  setRingLevel: () => {},
  backlightLevel: defaults.settings.backlightLevel,
  setBacklightLevel: () => {},
  inactivityTime: defaults.settings.inactivityTime,
  setInactivityTime: () => {},
};

export const SettingsContext =
  createContext<SettingsContextType>(settingsContext);
