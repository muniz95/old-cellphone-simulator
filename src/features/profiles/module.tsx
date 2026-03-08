import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { FeatureModule } from '@/app/modules/feature-module';

const ProfilesPage = lazy(
  () => import('@/features/profiles/ui/pages/profiles-page')
);

const routes: RouteObject[] = [
  { path: '/profiles', element: <ProfilesPage /> },
];

export const profilesModule: FeatureModule = {
  id: 'profiles',
  basePath: '/profiles',
  routes,
  registerMenuEntry: () => [
    {
      path: '/profiles',
      titleKey: 'profilesTitle',
      namespace: 'home',
    },
  ],
};
