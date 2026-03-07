import { RouteObject } from 'react-router-dom';
import { FeatureModule } from '@/app/modules/feature-module';
import TonesPage from '@/features/tones/ui/pages/tones-page';

const routes: RouteObject[] = [{ path: '/tones', element: <TonesPage /> }];

export const tonesModule: FeatureModule = {
  id: 'tones',
  basePath: '/tones',
  routes,
  registerMenuEntry: () => [
    {
      path: '/tones',
      titleKey: 'tonesTitle',
      namespace: 'home',
    },
  ],
};
