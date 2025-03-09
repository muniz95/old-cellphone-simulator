import { openModal } from '@/redux/actions';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useDispatchOpenModal = () => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(openModal()), [dispatch]);
};
