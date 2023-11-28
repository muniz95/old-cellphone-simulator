import { RouteObject } from "react-router-dom";
import Settings from "views/Settings";
import RestoreFactorySettings from "views/Settings/RestoreFactorySettings";
import GeneralSettings from "views/Settings/General";
import ColorSettings from "views/Settings/General/Color";
import LanguageSettings from "views/Settings/General/Language";

const routes: RouteObject[] = [
  { path: "/settings", element: <Settings /> },
  { path: "/settings/general", element: <GeneralSettings /> },
  { path: "/settings/general/color", element: <ColorSettings /> },
  { path: "/settings/general/language", element: <LanguageSettings /> },
  { path: "/settings/restore", element: <RestoreFactorySettings /> },
];

export default routes;
