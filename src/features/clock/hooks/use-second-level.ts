import { GlobalContext } from '@/context/global/context';
import { useCallback, useContext, useEffect } from 'react';

const useSecondLevel = () => {
  const { setSecondLevel } = useContext(GlobalContext);
  const dispatchSetSecondLevel = useCallback(
    (position: number) => setSecondLevel(position + 1),
    [setSecondLevel]
  );

  useEffect(() => {
    dispatchSetSecondLevel(0);
  }, [dispatchSetSecondLevel]);
};

export default useSecondLevel;
