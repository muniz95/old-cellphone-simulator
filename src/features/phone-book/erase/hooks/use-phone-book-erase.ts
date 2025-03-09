import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/actions';
import service from '@/services/contact.service';
import vibration from '@/utils/vibration';
import { Contact } from '@/interfaces/contact';

const usePhoneBookErase = () => {
  const dispatch = useDispatch();
  const dispatchOpenModal = useCallback(
    () => dispatch(openModal()),
    [dispatch]
  );

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
