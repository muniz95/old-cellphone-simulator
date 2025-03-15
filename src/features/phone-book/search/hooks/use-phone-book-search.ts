import { ChangeEvent, useState } from 'react';
import useContacts from '@/hooks/persistence/use-contacts';

const usePhoneBookSearch = () => {
  const [search, setSearch] = useState('');
  const [contacts] = useContacts();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return {
    search,
    contacts,
    handleSearch,
  };
};

export default usePhoneBookSearch;
