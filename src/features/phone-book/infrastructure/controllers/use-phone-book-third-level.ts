import { useEffect } from 'react';
import { useUiStore } from '@/app/state/ui-store';

export const usePhoneBookThirdLevel = () => {
  const setThirdLevel = useUiStore((state) => state.setThirdLevel);

  useEffect(() => {
    setThirdLevel(1);
  }, [setThirdLevel]);
};
