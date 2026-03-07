import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useContacts from '@/entities/contact/api/use-contacts';
import { filterContactsByName } from '@/features/phone-book/domain/use-cases';
import { usePhoneBookThirdLevel } from '@/features/phone-book/infrastructure/controllers/use-phone-book-third-level';

export const useSearchController = () => {
  usePhoneBookThirdLevel();

  const [search, setSearch] = useState('');
  const [contacts] = useContacts();
  const filteredContacts = useMemo(
    () => filterContactsByName(contacts, search),
    [contacts, search]
  );

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  }, []);

  return {
    search,
    contacts: filteredContacts,
    handleSearch,
  };
};
