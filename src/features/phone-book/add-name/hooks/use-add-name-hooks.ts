import { useCallback, useState, ChangeEvent, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/actions';
import service from '@/services/contact.service';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';

export const usePhoneBookAddNameHooks = () => {
  const dispatch = useDispatch();

  const { setThirdLevel } = useContext(GlobalContext);
  const dispatchSetThirdLevel = useCallback(
    (position: number) => setThirdLevel(position + 1),
    [setThirdLevel]
  );

  const dispatchOpenModal = useCallback(
    () => dispatch(openModal()),
    [dispatch]
  );

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
