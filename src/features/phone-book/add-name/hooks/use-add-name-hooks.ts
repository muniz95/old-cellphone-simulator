import { useCallback, useState, ChangeEvent, useContext } from 'react';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';
import useLocalStorage from '@/hooks/use-local-storage';
import { Contact } from '@/interfaces/contact';

export const usePhoneBookAddNameHooks = () => {
  const [contacts, setContacts] = useLocalStorage<Contact[]>('contacts', []);
  const { setThirdLevel, openModal } = useContext(GlobalContext);
  const dispatchSetThirdLevel = useCallback(
    (position: number) => setThirdLevel(position + 1),
    [setThirdLevel]
  );

  const dispatchOpenModal = useCallback(() => openModal(), [openModal]);

  const [name, setName] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  return {
    name,
    handleChange,
    saveContact: () => {
      try {
        contacts.push({
          name,
          number: Date.now().toString(),
          isServiceNumber: false,
        });
        setContacts(contacts);
        vibration.success();
        dispatchOpenModal();
      } catch (error) {
        alert(error);
      }
    },
    dispatchSetThirdLevel,
  };
};
