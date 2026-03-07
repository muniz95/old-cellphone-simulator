import { useEffect } from 'react';
import { useUiStore } from '@/app/state/ui-store';

export const useSecondLevelController = () => {
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);

  useEffect(() => {
    setSecondLevel(1);
  }, [setSecondLevel]);
};
