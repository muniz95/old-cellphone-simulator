import { RouteObject } from "react-router-dom";
import Settings from "../views/Settings";
// import PhoneBookAddName from "../views/Settings/PhoneBookAddName";
// import PhoneBookSearch from "../views/Settings/PhoneBookSearch";
import RestoreFactorySettings from "../views/Settings/RestoreFactorySettings";

const routes: RouteObject[] = [
  { path: "/settings", element: <Settings /> },
  // { path: "/settings/addname", exact: false, element: <PhoneBookAddName /> },
  // { path: "/settings/search", exact: false, element: <PhoneBookSearch /> },
  { path: "/settings/restore", element: <RestoreFactorySettings /> },
];

export default routes;
