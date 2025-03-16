import { createContext, Dispatch, SetStateAction } from 'react';

export type SettingsContextType = {
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
  color: '#c0b400',
  setColor: () => {},
  language: 'en',
  setLanguage: () => {},
  notificationLevel: 50,
  setNotificationLevel: () => {},
  alarmLevel: 50,
  setAlarmLevel: () => {},
  ringLevel: 50,
  setRingLevel: () => {},
  backlightLevel: 80,
  setBacklightLevel: () => {},
  inactivityTime: 60,
  setInactivityTime: () => {},
};

export const SettingsContext =
  createContext<SettingsContextType>(settingsContext);
