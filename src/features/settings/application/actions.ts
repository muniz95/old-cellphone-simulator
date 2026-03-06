import { FeedbackPort, SettingsStorePort } from '@/features/settings/application/ports';
import {
  restoreDefaults,
  selectColor,
  setLanguage,
  updateLightSettings,
  updateSoundLevels,
} from '@/features/settings/domain/use-cases';

export const saveColorSelection = (
  store: SettingsStorePort,
  feedback: FeedbackPort,
  color: string
) => {
  const current = store.read();
  const next = selectColor(current, color);
  store.write(next);
  feedback.success();

  return next;
};

export const saveLanguageSelection = (
  store: SettingsStorePort,
  feedback: FeedbackPort,
  language: string
) => {
  const current = store.read();
  const next = setLanguage(current, language);
  store.write(next);
  feedback.success();

  return next;
};

export const saveSoundPreferences = (
  store: SettingsStorePort,
  feedback: FeedbackPort,
  values: { notificationLevel: number; alarmLevel: number; ringLevel: number }
) => {
  const current = store.read();
  const next = updateSoundLevels(current, values);
  store.write(next);
  feedback.success();

  return next;
};

export const saveLightPreferences = (
  store: SettingsStorePort,
  feedback: FeedbackPort,
  values: { backlightLevel: number; inactivityTime: number }
) => {
  const current = store.read();
  const next = updateLightSettings(current, values);
  store.write(next);
  feedback.success();

  return next;
};

export const resetSettingsToDefaults = (
  store: SettingsStorePort,
  feedback: FeedbackPort
) => {
  const next = restoreDefaults();
  store.write(next);
  feedback.reset();

  return next;
};
