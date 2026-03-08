import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { FeatureModule } from '@/app/modules/feature-module';

const SettingsPage = lazy(
  () => import('@/features/settings/ui/pages/settings-page')
);
const GeneralSettingsPage = lazy(
  () => import('@/features/settings/ui/pages/general-settings-page')
);
const ColorSettingsPage = lazy(
  () => import('@/features/settings/ui/pages/color-settings-page')
);
const LanguageSettingsPage = lazy(
  () => import('@/features/settings/ui/pages/language-settings-page')
);
const LightSettingsPage = lazy(
  () => import('@/features/settings/ui/pages/light-settings-page')
);
const SoundSettingsPage = lazy(
  () => import('@/features/settings/ui/pages/sound-settings-page')
);
const RestoreFactorySettingsPage = lazy(
  () => import('@/features/settings/ui/pages/restore-factory-settings-page')
);

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
