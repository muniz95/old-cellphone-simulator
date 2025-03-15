import { GlobalContext } from '@/context/global/context';
import { useCallback, useContext } from 'react';

export const useDispatchOpenModal = () => {
  const { openModal } = useContext(GlobalContext);

  return useCallback(() => openModal(), [openModal]);
};
