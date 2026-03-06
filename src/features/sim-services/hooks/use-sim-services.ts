import { useState, useEffect } from 'react';
import { SimNumber } from '@/interfaces/simNumber';
import { say } from '@/utils/sound';
import useLocalStorage from '@/hooks/use-local-storage';
import { useUiStore } from '@/stores/ui-store';

const useSimServices = () => {
  const [simNumbers] = useLocalStorage<SimNumber[]>('simNumbers', []);
  const [currentSimNumber, setCurrentSimNumber] = useState<SimNumber>();

  const setSecondLevel = useUiStore((state) => state.setSecondLevel);

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
