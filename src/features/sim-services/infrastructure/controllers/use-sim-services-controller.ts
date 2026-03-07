import { useCallback, useEffect, useState } from 'react';
import { SimNumber } from '@/entities/sim-number/model/sim-number';
import useLocalStorage from '@/shared/hooks/use-local-storage';
import { say } from '@/shared/lib/sound';
import {
  getSelectedSimServiceMessage,
  hasSelectedSimService,
} from '@/features/sim-services/domain/use-cases';
import { useUiStore } from '@/stores/ui-store';

export const useSimServicesController = () => {
  const [simNumbers] = useLocalStorage<SimNumber[]>('simNumbers', []);
  const [currentSimNumber, setCurrentSimNumber] = useState<SimNumber | null>(
    null
  );
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);

  useEffect(() => {
    setSecondLevel(0);
  }, [setSecondLevel]);

  const play = useCallback(() => {
    const message = getSelectedSimServiceMessage(currentSimNumber);
    if (!message) return;
    say(message);
  }, [currentSimNumber]);

  return {
    simNumbers,
    currentSimNumber,
    setCurrentSimNumber,
    canPlay: hasSelectedSimService(currentSimNumber),
    play,
  };
};
