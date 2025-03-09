import { ChangeEvent, useEffect, useState } from 'react';
import service from '@/services/contact.service';
import { Contact } from '@/interfaces/contact';

const usePhoneBookSearch = () => {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  useEffect(() => {
    setContacts(service.getContacts());
  }, []);

  return {
    search,
    contacts,
    handleSearch,
  };
};

export default usePhoneBookSearch;
