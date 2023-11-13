import { RouteObject } from "react-router-dom";
import mainRoutes from "./main";
import phoneBookRoutes from "./phoneBook";
import settingsRoutes from "./settings";

const routes: RouteObject[] = [
  ...mainRoutes,
  ...phoneBookRoutes,
  ...settingsRoutes,
];

export default routes;
