import { ChangeEvent, useState, useCallback } from 'react';
import { Contact } from '@/interfaces/contact';
import vibration from '@/utils/vibration';
import useContacts from '@/hooks/persistence/use-contacts';

export const usePhoneBookEdit = (dispatchOpenModal: () => void) => {
  const [name, setName] = useState('');
  const [contacts, setContacts] = useContacts();
  const [currentContact, setCurrentContact] = useState<Contact>();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }, []);

  const saveContact = useCallback(() => {
    if (!currentContact) return;
    try {
      const filteredContacts = contacts.filter(
        (x) => x.id !== currentContact.id
      );
      filteredContacts.push(currentContact);
      setContacts(filteredContacts);
      vibration.success();
      dispatchOpenModal();
    } catch (error) {
      alert(error);
    }
  }, [currentContact, contacts, setContacts, dispatchOpenModal]);

  return {
    name,
    contacts,
    currentContact,
    handleChange,
    saveContact,
    setCurrentContact,
  };
};
