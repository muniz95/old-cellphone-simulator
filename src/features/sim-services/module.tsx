import { RouteObject } from 'react-router-dom';
import { FeatureModule } from '@/app/modules/feature-module';
import SimServicesPage from '@/features/sim-services/ui/pages/sim-services-page';

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
