import { ChangeEvent, useCallback, useState } from 'react';
import { Contact } from '@/entities/contact/model/contact';
import useContacts from '@/entities/contact/api/use-contacts';
import vibration from '@/shared/lib/vibration';
import { replaceContact } from '@/features/phone-book/domain/use-cases';
import { usePhoneBookThirdLevel } from '@/features/phone-book/infrastructure/controllers/use-phone-book-third-level';
import { useUiStore } from '@/stores/ui-store';

export const useEditController = () => {
  usePhoneBookThirdLevel();

  const [contacts, setContacts] = useContacts();
  const [currentContact, setCurrentContact] = useState<Contact>();
  const [name, setName] = useState('');
  const openModal = useUiStore((state) => state.openModal);

  const selectContact = useCallback((contact: Contact) => {
    setCurrentContact(contact);
    setName(contact.name);
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  }, []);

  const saveContact = useCallback(() => {
    if (!currentContact || !name.trim()) return;

    try {
      const updatedContact = {
        ...currentContact,
        name: name.trim(),
      };

      setContacts(replaceContact(contacts, updatedContact));
      setCurrentContact(updatedContact);
      vibration.success();
      openModal();
    } catch (error) {
      alert(error);
    }
  }, [contacts, currentContact, name, openModal, setContacts]);

  return {
    contacts,
    name,
    handleChange,
    saveContact,
    selectContact,
  };
};
