import { RouteObject } from "react-router-dom";
import mainRoutes from "./main";
import phoneBookRoutes from "./phoneBook";
import settingsRoutes from "./settings";
import startupRoutes from "./startup";

const routes: RouteObject[] = [
  ...mainRoutes,
  ...phoneBookRoutes,
  ...settingsRoutes,
];

export const startupRoute: RouteObject[] = [
  ...startupRoutes
];

export default routes;
