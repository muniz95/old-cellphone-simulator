import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setThirdLevel } from '@/redux/actions';

const useThirdLevel = (position: number) => {
  const dispatch = useDispatch();
  const dispatchSetThirdLevel = useCallback(
    (position: number) => dispatch(setThirdLevel(position + 1)),
    [dispatch]
  );

  useEffect(() => {
    dispatchSetThirdLevel(position);
  }, [dispatchSetThirdLevel, position]);
};

export default useThirdLevel;
