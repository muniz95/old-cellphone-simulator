import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSecondLevel } from '@/redux/actions';

const useSecondLevel = () => {
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = useCallback(
    (position: number) => dispatch(setSecondLevel(position + 1)),
    [dispatch]
  );

  useEffect(() => {
    dispatchSetSecondLevel(0);
  }, [dispatchSetSecondLevel]);
};

export default useSecondLevel;
