import { useCallback, useState } from 'react';
import { Contact } from '@/features/phone-book/domain/contact';
import useContactsData from '@/features/phone-book/infrastructure/hooks/use-contacts-data';
import vibration from '@/shared/lib/vibration';
import { removeContactFromList } from '@/features/phone-book/domain/use-cases';
import { usePhoneBookThirdLevel } from '@/features/phone-book/infrastructure/controllers/use-phone-book-third-level';
import { useUiStore } from '@/app/state/ui-store';

export const useEraseController = () => {
  usePhoneBookThirdLevel();

  const [contacts, setContacts] = useContactsData();
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
