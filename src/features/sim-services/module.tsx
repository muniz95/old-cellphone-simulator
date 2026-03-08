import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { FeatureModule } from '@/app/modules/feature-module';

const SimServicesPage = lazy(
  () => import('@/features/sim-services/ui/pages/sim-services-page')
);

const routes: RouteObject[] = [
  { path: '/simservices', element: <SimServicesPage /> },
];

export const simServicesModule: FeatureModule = {
  id: 'sim-services',
  basePath: '/simservices',
  routes,
  registerMenuEntry: () => [
    {
      path: '/simservices',
      titleKey: 'simservicesTitle',
      namespace: 'home',
    },
  ],
};
