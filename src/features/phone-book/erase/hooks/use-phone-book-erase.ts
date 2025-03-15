import { useCallback, useContext, useEffect, useState } from 'react';
import service from '@/services/contact.service';
import vibration from '@/utils/vibration';
import { Contact } from '@/interfaces/contact';
import { GlobalContext } from '@/context/global/context';

const usePhoneBookErase = () => {
  const { openModal } = useContext(GlobalContext);
  const dispatchOpenModal = useCallback(() => openModal(), [openModal]);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentContact, setCurrentContact] = useState<Contact>();

  const removeContact = () => {
    if (!currentContact) return;
    try {
      service.removeContact({
        name: '',
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
  };

  useEffect(() => {
    setContacts(service.getContacts());
  }, []);

  return {
    contacts,
    setContacts,
    currentContact,
    setCurrentContact,
    removeContact,
  };
};

export default usePhoneBookErase;
