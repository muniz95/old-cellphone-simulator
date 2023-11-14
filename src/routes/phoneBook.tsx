import { RouteObject } from "react-router-dom";
import PhoneBook from "../views/PhoneBook";
import PhoneBookAddName from "../views/PhoneBook/PhoneBookAddName";
import PhoneBookSearch from "../views/PhoneBook/PhoneBookSearch";
import PhoneBookEdit from "../views/PhoneBook/PhoneBookEdit";

const routes: RouteObject[] = [
  { path: "/phonebook/addname", element: <PhoneBookAddName /> },
  { path: "/phonebook/edit", element: <PhoneBookEdit /> },
  { path: "/phonebook/search", element: <PhoneBookSearch /> },
  { path: "/phonebook", element: <PhoneBook /> },
];

export default routes;
