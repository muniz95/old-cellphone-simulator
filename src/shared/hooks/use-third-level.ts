import { useEffect } from 'react';
import { useUiStore } from '@/stores/ui-store';

const useThirdLevel = (position: number) => {
  const setThirdLevel = useUiStore((state) => state.setThirdLevel);

  useEffect(() => {
    setThirdLevel(position + 1);
  }, [position, setThirdLevel]);
};

export default useThirdLevel;
