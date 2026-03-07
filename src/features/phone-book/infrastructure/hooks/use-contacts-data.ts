import { SetStateAction, useCallback, useEffect } from 'react';
import { Contact } from '@/features/phone-book/domain/contact';
import useContacts from '@/features/phone-book/infrastructure/persistence/use-contacts';
import { useContactsStore } from '@/features/phone-book/state/contacts-store';

const resolveContacts = (
  value: SetStateAction<Contact[]>,
  currentContacts: Contact[]
) => (typeof value === 'function' ? value(currentContacts) : value);

const useContactsData = () => {
  const [storedContacts, setStoredContacts] = useContacts();
  const contacts = useContactsStore((state) => state.contacts);
  const hydrated = useContactsStore((state) => state.hydrated);
  const hydrate = useContactsStore((state) => state.hydrate);
  const setContactsStore = useContactsStore((state) => state.setContacts);

  useEffect(() => {
    if (!hydrated) {
      hydrate(storedContacts);
    }
  }, [hydrate, hydrated, storedContacts]);

  const currentContacts = hydrated ? contacts : storedContacts;
  const setContacts = useCallback(
    (value: SetStateAction<Contact[]>) => {
      const nextContacts = resolveContacts(value, currentContacts);
      setContactsStore(nextContacts);
      setStoredContacts(nextContacts);
    },
    [currentContacts, setContactsStore, setStoredContacts]
  );

  return [currentContacts, setContacts] as const;
};

export default useContactsData;
