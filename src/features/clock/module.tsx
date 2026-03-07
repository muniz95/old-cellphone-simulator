import { RouteObject } from 'react-router-dom';
import { FeatureModule } from '@/app/modules/feature-module';
import ClockPage from '@/features/clock/ui/pages/clock-page';

const routes: RouteObject[] = [{ path: '/clock', element: <ClockPage /> }];

export const clockModule: FeatureModule = {
  id: 'clock',
  basePath: '/clock',
  routes,
  registerMenuEntry: () => [
    {
      path: '/clock',
      titleKey: 'clockTitle',
      namespace: 'home',
    },
  ],
};
