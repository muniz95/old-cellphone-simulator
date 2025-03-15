import { useState, useEffect, useContext } from 'react';
import { SimNumber } from '@/interfaces/simNumber';
import service from '@/services/simNumber.service';
import { say } from '@/utils/sound';
import { GlobalContext } from '@/context/global/context';

const useSimServices = () => {
  const [simNumbers, setSimNumbers] = useState<SimNumber[]>([]);
  const [currentSimNumber, setCurrentSimNumber] = useState<SimNumber>();

  const { setSecondLevel } = useContext(GlobalContext);

  useEffect(() => {
    setSecondLevel(0);
    setSimNumbers(service.getSimNumbers());
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
