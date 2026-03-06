import { useState, useEffect } from 'react';
import { SimNumber } from '@/entities/sim-number/model/sim-number';
import { say } from '@/shared/lib/sound';
import useLocalStorage from '@/shared/hooks/use-local-storage';
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
