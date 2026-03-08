import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { FeatureModule } from '@/app/modules/feature-module';

const PhoneBookPage = lazy(
  () => import('@/features/phone-book/ui/pages/phone-book-page')
);
const AddNamePage = lazy(
  () => import('@/features/phone-book/ui/pages/add-name-page')
);
const SearchPage = lazy(
  () => import('@/features/phone-book/ui/pages/search-page')
);
const EditPage = lazy(() => import('@/features/phone-book/ui/pages/edit-page'));
const ServiceNumbersPage = lazy(
  () => import('@/features/phone-book/ui/pages/service-numbers-page')
);
const ErasePage = lazy(
  () => import('@/features/phone-book/ui/pages/erase-page')
);

const routes: RouteObject[] = [
  { path: '/phonebook/addname', element: <AddNamePage /> },
  { path: '/phonebook/edit', element: <EditPage /> },
  { path: '/phonebook/erase', element: <ErasePage /> },
  { path: '/phonebook/search', element: <SearchPage /> },
  { path: '/phonebook/servicenos', element: <ServiceNumbersPage /> },
  { path: '/phonebook', element: <PhoneBookPage /> },
];

export const phoneBookModule: FeatureModule = {
  id: 'phone-book',
  basePath: '/phonebook',
  routes,
  registerMenuEntry: () => [
    {
      path: '/phonebook',
      titleKey: 'phonebookTitle',
      namespace: 'home',
    },
  ],
};
