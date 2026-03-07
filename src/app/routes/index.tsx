import { RouteObject } from 'react-router-dom';
import { featureRoutes } from '@/app/modules/registry';
import mainRoutes from './main';

const routes: RouteObject[] = [...mainRoutes, ...featureRoutes];

export default routes;
