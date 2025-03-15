import { useCallback, useState, ChangeEvent, useContext } from 'react';
import service from '@/services/contact.service';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';

export const usePhoneBookAddNameHooks = () => {
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
        service.insertContact({
          name,
          number: Date.now().toString(),
          isServiceNumber: false,
        });
        vibration.success();
        dispatchOpenModal();
      } catch (error) {
        alert(error);
      }
    },
    dispatchSetThirdLevel,
  };
};
