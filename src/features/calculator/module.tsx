import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { FeatureModule } from '@/app/modules/feature-module';

const CalculatorPage = lazy(
  () => import('@/features/calculator/ui/pages/calculator-page')
);

const routes: RouteObject[] = [
  { path: '/calculator', element: <CalculatorPage /> },
];

export const calculatorModule: FeatureModule = {
  id: 'calculator',
  basePath: '/calculator',
  routes,
  registerMenuEntry: () => [
    {
      path: '/calculator',
      titleKey: 'calculatorTitle',
      namespace: 'home',
    },
  ],
};
