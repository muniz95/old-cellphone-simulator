import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSecondLevel } from '@/redux/actions';
import { SimNumber } from '@/interfaces/simNumber';
import service from '@/services/simNumber.service';
import { say } from '@/utils/sound';

const useSimServices = () => {
  const [simNumbers, setSimNumbers] = useState<SimNumber[]>([]);
  const [currentSimNumber, setCurrentSimNumber] = useState<SimNumber>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSecondLevel(0));
    setSimNumbers(service.getSimNumbers());
  }, [dispatch]);

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
