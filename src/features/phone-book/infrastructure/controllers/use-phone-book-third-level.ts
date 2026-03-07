import { useEffect } from 'react';
import { useUiStore } from '@/stores/ui-store';

export const usePhoneBookThirdLevel = () => {
  const setThirdLevel = useUiStore((state) => state.setThirdLevel);

  useEffect(() => {
    setThirdLevel(1);
  }, [setThirdLevel]);
};
