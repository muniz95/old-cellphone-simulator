import { RouteObject } from "react-router-dom";
import PhoneBook from "../views/PhoneBook";
import PhoneBookAddName from "../views/PhoneBook/PhoneBookAddName";
import PhoneBookSearch from "../views/PhoneBook/PhoneBookSearch";

const routes: RouteObject[] = [
  { path: "/phonebook/addname", element: <PhoneBookAddName /> },
  { path: "/phonebook/search", element: <PhoneBookSearch /> },
  { path: "/phonebook", element: <PhoneBook /> },
];

export default routes;
