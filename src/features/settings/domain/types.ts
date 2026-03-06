export interface SettingsPreferences {
  color: string;
  language: string;
  notificationLevel: number;
  alarmLevel: number;
  ringLevel: number;
  backlightLevel: number;
  inactivityTime: number;
}

export interface ColorOption {
  titleKey: string;
  rgb: string;
}

export interface LanguageOption {
  title: string;
  iso639: string;
}

export interface SettingsMenuItem {
  path: string;
  title: string;
}
