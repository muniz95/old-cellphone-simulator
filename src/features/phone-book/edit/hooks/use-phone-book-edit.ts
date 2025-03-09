import { ChangeEvent, useState, useEffect, useCallback } from 'react';
import service from '@/services/contact.service';
import { Contact } from '@/interfaces/contact';
import vibration from '@/utils/vibration';

export const usePhoneBookEdit = (dispatchOpenModal: () => void) => {
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentContact, setCurrentContact] = useState<Contact>();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }, []);

  const saveContact = useCallback(() => {
    if (!currentContact) return;
    try {
      service.updateContact({
        name,
        number: currentContact.number,
        id: currentContact.id,
        date: currentContact.date,
        isServiceNumber: false,
      });
      vibration.success();
      dispatchOpenModal();
    } catch (error) {
      alert(error);
    }
  }, [name, currentContact, dispatchOpenModal]);

  useEffect(() => {
    setContacts(service.getContacts());
  }, []);

  return {
    name,
    contacts,
    currentContact,
    handleChange,
    saveContact,
    setCurrentContact,
  };
};
