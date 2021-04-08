import mainRoutes from "./main";
import phoneBookRoutes from "./phoneBook";
import settingsRoutes from "./settings";

const routes = [
  ...mainRoutes,
  ...phoneBookRoutes,
  ...settingsRoutes,
];

export default routes;
