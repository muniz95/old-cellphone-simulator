import { SettingsPreferences } from '@/features/settings/domain/types';

export interface SettingsStorePort {
  read: () => SettingsPreferences;
  write: (preferences: SettingsPreferences) => void;
}

export interface FeedbackPort {
  success: () => void;
  reset: () => void;
}

export interface PageIndicatorPort {
  setSecond: (position: number) => void;
  setThird: (position: number) => void;
  setFourth: (position: number) => void;
}
