import defaults from '@/shared/config/defaults/settings';
import {
  ColorOption,
  LanguageOption,
  SettingsPreferences,
} from '@/features/settings/domain/types';

export const DEFAULT_SETTINGS: SettingsPreferences = {
  ...defaults,
};

export const COLOR_OPTIONS: ColorOption[] = [
  { titleKey: 'general.color.default', rgb: '#c0b400' },
  { titleKey: 'general.color.blue', rgb: '#0d48eb' },
  { titleKey: 'general.color.gray', rgb: '#c7c7c7' },
  { titleKey: 'general.color.green', rgb: '#46c000' },
  { titleKey: 'general.color.orange', rgb: '#f3a34c' },
  { titleKey: 'general.color.purple', rgb: '#f74bda' },
  { titleKey: 'general.color.red', rgb: '#f53737' },
  { titleKey: 'general.color.teal', rgb: '#3785eb' },
  { titleKey: 'general.color.yellow', rgb: '#f5e93e' },
];

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { title: 'Deustch', iso639: 'de' },
  { title: 'English', iso639: 'en' },
  { title: 'Español', iso639: 'es' },
  { title: 'Esperanto', iso639: 'eo' },
  { title: 'Français', iso639: 'fr' },
  { title: 'Italiano', iso639: 'it' },
  { title: 'Polski', iso639: 'pl' },
  { title: 'Português', iso639: 'pt' },
  { title: 'русский', iso639: 'ru' },
];
