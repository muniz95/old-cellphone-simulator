import { ChangeEvent, useState, useCallback } from 'react';
import { Contact } from '@/entities/contact/model/contact';
import vibration from '@/shared/lib/vibration';
import useContacts from '@/entities/contact/api/use-contacts';

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
