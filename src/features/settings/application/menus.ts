import { SettingsMenuItem } from '@/features/settings/domain/types';

export const buildSettingsMenu = (
  t: (key: string, options?: { ns?: string }) => string
): SettingsMenuItem[] => {
  return [
    { path: '/settings/call', title: t('callTitle') },
    { path: '/settings/general', title: t('general.title') },
    { path: '/settings/security', title: t('securityTitle') },
    { path: '/settings/restore', title: t('restore.title') },
  ];
};

export const buildGeneralSettingsMenu = (
  t: (key: string, options?: { ns?: string }) => string
): SettingsMenuItem[] => {
  return [
    { path: '/settings/general/color', title: t('general.color.title') },
    { path: '/settings/general/language', title: t('general.languageTitle') },
    { path: '/settings/general/light', title: t('general.light.title') },
    { path: '/settings/general/sound', title: t('general.sound.title') },
  ];
};
