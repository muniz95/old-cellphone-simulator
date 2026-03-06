import { useCallback, useEffect } from 'react';
import { useUiStore } from '@/stores/ui-store';

const useSecondLevel = () => {
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);
  const dispatchSetSecondLevel = useCallback(
    (position: number) => setSecondLevel(position + 1),
    [setSecondLevel]
  );

  useEffect(() => {
    dispatchSetSecondLevel(0);
  }, [dispatchSetSecondLevel]);
};

export default useSecondLevel;
