import { RouteObject } from 'react-router-dom';
import PhoneBook from '@/features/phone-book';
import PhoneBookAddName from '@/features/phone-book/add-name';
import PhoneBookSearch from '@/features/phone-book/search';
import PhoneBookEdit from '@/features/phone-book/PhoneBookEdit';
import PhoneBookServiceNos from '@/features/phone-book/PhoneBookServiceNos';
import PhoneBookErase from '@/features/phone-book/PhoneBookErase';

const routes: RouteObject[] = [
  { path: '/phonebook/addname', element: <PhoneBookAddName /> },
  { path: '/phonebook/edit', element: <PhoneBookEdit /> },
  { path: '/phonebook/erase', element: <PhoneBookErase /> },
  { path: '/phonebook/search', element: <PhoneBookSearch /> },
  { path: '/phonebook/servicenos', element: <PhoneBookServiceNos /> },
  { path: '/phonebook', element: <PhoneBook /> },
];

export default routes;
