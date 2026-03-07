import { RouteObject } from 'react-router-dom';
import { FeatureModule } from '@/app/modules/feature-module';
import SettingsPage from '@/features/settings/ui/pages/settings-page';
import GeneralSettingsPage from '@/features/settings/ui/pages/general-settings-page';
import ColorSettingsPage from '@/features/settings/ui/pages/color-settings-page';
import LanguageSettingsPage from '@/features/settings/ui/pages/language-settings-page';
import LightSettingsPage from '@/features/settings/ui/pages/light-settings-page';
import SoundSettingsPage from '@/features/settings/ui/pages/sound-settings-page';
import RestoreFactorySettingsPage from '@/features/settings/ui/pages/restore-factory-settings-page';

const routes: RouteObject[] = [
  { path: '/settings', element: <SettingsPage /> },
  { path: '/settings/general', element: <GeneralSettingsPage /> },
  { path: '/settings/general/color', element: <ColorSettingsPage /> },
  { path: '/settings/general/language', element: <LanguageSettingsPage /> },
  { path: '/settings/general/light', element: <LightSettingsPage /> },
  { path: '/settings/general/sound', element: <SoundSettingsPage /> },
  { path: '/settings/restore', element: <RestoreFactorySettingsPage /> },
];

export const settingsModule: FeatureModule = {
  id: 'settings',
  basePath: '/settings',
  routes,
  registerMenuEntry: () => [
    {
      path: '/settings',
      titleKey: 'settingsTitle',
      namespace: 'home',
    },
  ],
};
