import { useCallback, useState } from 'react';
import vibration from '@/shared/lib/vibration';
import { Contact } from '@/entities/contact/model/contact';
import useContacts from '@/entities/contact/api/use-contacts';
import { useUiStore } from '@/stores/ui-store';

const usePhoneBookErase = () => {
  const openModal = useUiStore((state) => state.openModal);
  const dispatchOpenModal = useCallback(() => openModal(), [openModal]);

  const [contacts, setContacts] = useContacts();
  const [currentContact, setCurrentContact] = useState<Contact>();

  const removeContact = () => {
    if (!currentContact) return;
    try {
      setContacts(contacts.filter((x) => x.id === currentContact.id));
      vibration.success();
      dispatchOpenModal();
    } catch (error) {
      alert(error);
    }
  };

  return {
    contacts,
    setContacts,
    currentContact,
    setCurrentContact,
    removeContact,
  };
};

export default usePhoneBookErase;
