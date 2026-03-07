import { RouteObject } from 'react-router-dom';
import mainRoutes from './main';
import { phoneBookModule } from '@/features/phone-book/module';
import { settingsModule } from '@/features/settings/module';
import startupRoutes from './startup';

const routes: RouteObject[] = [
  ...mainRoutes,
  ...phoneBookModule.routes,
  ...settingsModule.routes,
];

export const startupRoute: RouteObject[] = [...startupRoutes];

export default routes;
