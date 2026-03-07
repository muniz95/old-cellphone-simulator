import { useEffect } from 'react';
import { useUiStore } from '@/stores/ui-store';

export const useSecondLevelController = () => {
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);

  useEffect(() => {
    setSecondLevel(1);
  }, [setSecondLevel]);
};
