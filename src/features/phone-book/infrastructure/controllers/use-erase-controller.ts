import { useCallback, useState } from 'react';
import { Contact } from '@/entities/contact/model/contact';
import useContacts from '@/entities/contact/api/use-contacts';
import vibration from '@/shared/lib/vibration';
import { removeContactFromList } from '@/features/phone-book/domain/use-cases';
import { usePhoneBookThirdLevel } from '@/features/phone-book/infrastructure/controllers/use-phone-book-third-level';
import { useUiStore } from '@/stores/ui-store';

export const useEraseController = () => {
  usePhoneBookThirdLevel();

  const [contacts, setContacts] = useContacts();
  const [currentContact, setCurrentContact] = useState<Contact>();
  const openModal = useUiStore((state) => state.openModal);

  const removeContact = useCallback(() => {
    if (!currentContact) return;

    try {
      setContacts(removeContactFromList(contacts, currentContact));
      setCurrentContact(undefined);
      vibration.success();
      openModal();
    } catch (error) {
      alert(error);
    }
  }, [contacts, currentContact, openModal, setContacts]);

  return {
    contacts,
    currentContact,
    setCurrentContact,
    removeContact,
  };
};
