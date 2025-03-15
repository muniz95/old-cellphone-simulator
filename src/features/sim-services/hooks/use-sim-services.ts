import { useState, useEffect, useContext } from 'react';
import { SimNumber } from '@/interfaces/simNumber';
import { say } from '@/utils/sound';
import { GlobalContext } from '@/context/global/context';
import useLocalStorage from '@/hooks/use-local-storage';

const useSimServices = () => {
  const [simNumbers] = useLocalStorage<SimNumber[]>('simNumbers', []);
  const [currentSimNumber, setCurrentSimNumber] = useState<SimNumber>();

  const { setSecondLevel } = useContext(GlobalContext);

  useEffect(() => {
    setSecondLevel(0);
  }, [setSecondLevel]);

  const play = () => {
    if (!currentSimNumber) return;
    say(currentSimNumber?.message);
  };

  return {
    simNumbers,
    currentSimNumber,
    setCurrentSimNumber,
    play,
  };
};

export default useSimServices;
