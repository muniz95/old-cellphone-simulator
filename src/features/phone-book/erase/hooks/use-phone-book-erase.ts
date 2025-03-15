import { useCallback, useContext, useState } from 'react';
import vibration from '@/utils/vibration';
import { Contact } from '@/interfaces/contact';
import { GlobalContext } from '@/context/global/context';
import useContacts from '@/hooks/persistence/use-contacts';

const usePhoneBookErase = () => {
  const { openModal } = useContext(GlobalContext);
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
