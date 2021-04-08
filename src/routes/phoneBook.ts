import PhoneBook from "../views/PhoneBook";
import PhoneBookAddName from "../views/PhoneBook/PhoneBookAddName";
import PhoneBookSearch from "../views/PhoneBook/PhoneBookSearch";

const routes = [
  { path: "/phonebook/addname", exact: true, component: PhoneBookAddName },
  { path: "/phonebook/search", exact: true, component: PhoneBookSearch },
  { path: "/phonebook", exact: true, component: PhoneBook },
];

export default routes;
