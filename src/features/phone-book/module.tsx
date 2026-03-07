import { RouteObject } from 'react-router-dom';
import { FeatureModule } from '@/app/modules/feature-module';
import PhoneBookPage from '@/features/phone-book/ui/pages/phone-book-page';
import AddNamePage from '@/features/phone-book/ui/pages/add-name-page';
import SearchPage from '@/features/phone-book/ui/pages/search-page';
import EditPage from '@/features/phone-book/ui/pages/edit-page';
import ServiceNumbersPage from '@/features/phone-book/ui/pages/service-numbers-page';
import ErasePage from '@/features/phone-book/ui/pages/erase-page';

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
