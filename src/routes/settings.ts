import Settings from "../views/Settings";
// import PhoneBookAddName from "../views/Settings/PhoneBookAddName";
// import PhoneBookSearch from "../views/Settings/PhoneBookSearch";
import RestoreFactorySettings from "../views/Settings/RestoreFactorySettings";

const routes = [
  { path: "/settings", exact: true, component: Settings },
  // { path: "/settings/addname", exact: false, component: PhoneBookAddName },
  // { path: "/settings/search", exact: false, component: PhoneBookSearch },
  { path: "/settings/restore", exact: false, component: RestoreFactorySettings },
];

export default routes;
