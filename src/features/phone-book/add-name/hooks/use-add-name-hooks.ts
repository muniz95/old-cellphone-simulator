import { useCallback, useState, ChangeEvent } from 'react';
import vibration from '@/shared/lib/vibration';
import useContacts from '@/entities/contact/api/use-contacts';
import { useUiStore } from '@/stores/ui-store';

export const usePhoneBookAddNameHooks = () => {
  const [contacts, setContacts] = useContacts();
  const setThirdLevel = useUiStore((state) => state.setThirdLevel);
  const openModal = useUiStore((state) => state.openModal);
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
        setContacts([
          ...contacts,
          {
            name,
            number: Date.now().toString(),
            isServiceNumber: false,
          },
        ]);
        vibration.success();
        dispatchOpenModal();
      } catch (error) {
        alert(error);
      }
    },
    dispatchSetThirdLevel,
  };
};
