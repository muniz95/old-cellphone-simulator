import { useContext, useEffect } from 'react';
import { GlobalContext } from '@/context/global/context';

const useThirdLevel = (position: number) => {
  const { setThirdLevel } = useContext(GlobalContext);

  useEffect(() => {
    setThirdLevel(position + 1);
  }, [position, setThirdLevel]);
};

export default useThirdLevel;
