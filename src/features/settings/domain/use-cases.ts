import {
  DEFAULT_SETTINGS,
  COLOR_OPTIONS,
  LANGUAGE_OPTIONS,
} from '@/features/settings/domain/constants';
import { SettingsPreferences } from '@/features/settings/domain/types';

const clamp = (value: number, min: number, max: number) => {
  const nextValue = Number.isNaN(value) ? min : value;
  return Math.min(max, Math.max(min, nextValue));
};

export const clampSoundLevel = (value: number) => clamp(value, 0, 100);

export const clampBacklightLevel = (value: number) => clamp(value, 20, 100);

export const clampInactivityTime = (value: number) => clamp(value, 30, 300);

export const isSupportedLanguage = (language: string) => {
  return LANGUAGE_OPTIONS.some((option) => option.iso639 === language);
};

export const selectColor = (
  preferences: SettingsPreferences,
  color: string
): SettingsPreferences => {
  const colorExists = COLOR_OPTIONS.some((option) => option.rgb === color);
  if (!colorExists) return preferences;

  return {
    ...preferences,
    color,
  };
};

export const setLanguage = (
  preferences: SettingsPreferences,
  language: string
): SettingsPreferences => {
  if (!isSupportedLanguage(language)) return preferences;

  return {
    ...preferences,
    language,
  };
};

export const updateSoundLevels = (
  preferences: SettingsPreferences,
  values: { notificationLevel: number; alarmLevel: number; ringLevel: number }
): SettingsPreferences => {
  return {
    ...preferences,
    notificationLevel: clampSoundLevel(values.notificationLevel),
    alarmLevel: clampSoundLevel(values.alarmLevel),
    ringLevel: clampSoundLevel(values.ringLevel),
  };
};

export const updateLightSettings = (
  preferences: SettingsPreferences,
  values: { backlightLevel: number; inactivityTime: number }
): SettingsPreferences => {
  return {
    ...preferences,
    backlightLevel: clampBacklightLevel(values.backlightLevel),
    inactivityTime: clampInactivityTime(values.inactivityTime),
  };
};

export const restoreDefaults = (): SettingsPreferences => ({
  ...DEFAULT_SETTINGS,
});
