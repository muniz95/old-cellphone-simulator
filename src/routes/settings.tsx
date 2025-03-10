import { RouteObject } from 'react-router-dom';
import Settings from '@/features/settings';
import RestoreFactorySettings from '@/features/settings/RestoreFactorySettings';
import GeneralSettings from '@/features/settings/general';
import ColorSettings from '@/features/settings/general/color';
import LanguageSettings from '@/features/settings/general/language';
import SoundSettings from '@/features/settings/general/sound';
import LightSettings from '@/features/settings/general/light';

const routes: RouteObject[] = [
  { path: '/settings', element: <Settings /> },
  { path: '/settings/general', element: <GeneralSettings /> },
  { path: '/settings/general/color', element: <ColorSettings /> },
  { path: '/settings/general/language', element: <LanguageSettings /> },
  { path: '/settings/general/light', element: <LightSettings /> },
  { path: '/settings/general/sound', element: <SoundSettings /> },
  { path: '/settings/restore', element: <RestoreFactorySettings /> },
];

export default routes;
